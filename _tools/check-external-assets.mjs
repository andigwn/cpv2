import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

/**
 * Guards the built HTML against injected third-party content.
 *
 * Gambling / SEO-spam compromises show up as an unexpected script src or an outbound
 * anchor href pointing at a host you never chose. This scans every prerendered page and
 * fails the run when a host is not on the allowlist, so a bad build never ships.
 *
 * Usage: npm run build, then: node _tools/check-external-assets.mjs
 */

const APP_DIR = path.join(process.cwd(), ".next", "server", "app");

const ALLOWED_HOSTS = new Set([
  "www.google.com", // keyless Maps embed on /contact
  "maps.google.com", // "Buka di Google Maps" links
  "wa.me", // WhatsApp share and contact links
  "instagram.com",
  "facebook.com",
  "youtube.com",
  "linkedin.com",
]);

/**
 * The site's own origin is always acceptable. Canonical and Open Graph tags embed it
 * absolutely, and a local build resolves it to localhost because .env.local wins over
 * .env.production. Pass NEXT_PUBLIC_SITE_URL in CI to cover the production host too.
 */
const OWN_HOSTS = new Set(["localhost", "127.0.0.1", "[::1]"]);
try {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    OWN_HOSTS.add(new URL(process.env.NEXT_PUBLIC_SITE_URL).hostname);
  }
} catch {
  /* ignore a malformed value */
}

async function collectHtml(dir) {
  const found = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) found.push(...(await collectHtml(full)));
    else if (entry.name.endsWith(".html")) found.push(full);
  }
  return found;
}

const attrPattern = /(?:src|href)="(https?:\/\/[^"]+)"/g;

let files;
try {
  files = await collectHtml(APP_DIR);
} catch {
  console.error("Cannot read " + APP_DIR + ". Run the production build first.");
  process.exit(1);
}

const findings = [];
const seen = new Map();

for (const file of files) {
  const html = await readFile(file, "utf8");
  const rel = path.relative(process.cwd(), file);
  for (const match of html.matchAll(attrPattern)) {
    let host;
    try {
      // hostname, not host: the port must not make "localhost:3000" look foreign.
      host = new URL(match[1]).hostname;
    } catch {
      continue;
    }
    if (OWN_HOSTS.has(host) || ALLOWED_HOSTS.has(host)) {
      seen.set(host, (seen.get(host) ?? 0) + 1);
      continue;
    }
    const key = host + " <- " + rel;
    if (!findings.some((f) => f.key === key)) findings.push({ key, host, rel, url: match[1] });
  }
}

console.log("Scanned " + files.length + " prerendered HTML files.");
console.log("Allowed external hosts in use:");
if (seen.size === 0) console.log("  (none)");
for (const [host, count] of [...seen.entries()].sort()) console.log("  " + host + "  x" + count);

if (findings.length > 0) {
  console.error("");
  console.error("FAIL: unexpected external hosts found:");
  for (const f of findings) {
    console.error("  " + f.host + "  in " + f.rel);
    console.error("    " + f.url.slice(0, 160));
  }
  console.error("");
  console.error("If a host is legitimate, add it to ALLOWED_HOSTS here and to the CSP in next.config.ts.");
  process.exit(1);
}

console.log("");
console.log("OK: no unexpected external script or link hosts.");
