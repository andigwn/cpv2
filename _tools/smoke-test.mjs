/**
 * Development-only smoke test (NOT part of the app bundle).
 * Requests every route from a running production server and asserts the expected content
 * is present in the server-rendered HTML.
 *
 * Usage: node _tools/smoke-test.mjs [baseUrl]
 */
const base = process.argv[2] ?? "http://localhost:3111";

const ROUTES = [
  ["/", 200, ["Liburan Tak Terlupakan", "Aurora Waterpark", "Newswire", "Reservasi Sekarang"]],
  ["/about", 200, ["Tentang Kami", "Misi", "Visi", "Tim kepemimpinan"]],
  ["/services", 200, ["Layanan & Fasilitas", "Aurora Waterpark", "Paket menginap"]],
  ["/services/aurora-waterpark", 200, ["Aurora Waterpark", "7 zona", "Detail operasional"]],
  ["/services/aurora-convention-centre", 200, ["Aurora Convention Centre", "Ballroom"]],
  ["/works", 200, ["Portfolio", "Proyek yang kami kembangkan"]],
  ["/news", 200, ["Newswire", "Promo Liburan Sekolah"]],
  ["/news/promo-liburan-sekolah-2026", 200, ["Promo Liburan Sekolah", "Berita lainnya"]],
  ["/careers", 200, ["Karir", "Front Office Manager", "Tunjangan"]],
  ["/contact", 200, ["Kontak", "Kontak per departemen", "Pertanyaan yang sering diajukan"]],
  ["/robots.txt", 200, ["sitemap"]],
  ["/sitemap.xml", 200, ["/services/", "/news/"]],
  ["/halaman-tidak-ada", 404, ["Halaman tidak ditemukan"]],
];

/** Decodes the HTML entities Next emits so text assertions match the source copy. */
function decodeEntities(value) {
  return value
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&quot;|&#34;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ");
}

let failures = 0;

for (const [route, expectedStatus, expectations] of ROUTES) {
  try {
    const res = await fetch(`${base}${route}`, { redirect: "follow" });
    const html = decodeEntities(await res.text());
    const missing = expectations.filter((needle) => !html.includes(needle));
    const ok = res.status === expectedStatus && missing.length === 0;

    if (!ok) failures++;
    console.log(
      `${ok ? "PASS" : "FAIL"} ${String(res.status).padEnd(4)} ${route.padEnd(38)} ${Math.round(html.length / 1024)}kb${
        missing.length ? `  missing: ${missing.join(", ")}` : ""
      }${res.status !== expectedStatus ? `  expected ${expectedStatus}` : ""}`,
    );
  } catch (error) {
    failures++;
    console.log(`FAIL ERR  ${route.padEnd(38)} ${error.message}`);
  }
}

// Sanity-check that the hero background images referenced by the data layer exist.
const ASSETS = ["/images/qubu-resort-1.jpeg", "/images/logo.png"];

for (const asset of ASSETS) {
  try {
    const res = await fetch(`${base}${asset}`, { method: "HEAD" });
    const ok = res.status === 200;
    if (!ok) failures++;
    console.log(`${ok ? "PASS" : "FAIL"} ${String(res.status).padEnd(4)} ${asset}`);
  } catch (error) {
    failures++;
    console.log(`FAIL ERR  ${asset} ${error.message}`);
  }
}

console.log(failures === 0 ? "\nAll routes and assets OK." : `\n${failures} check(s) failed.`);
process.exit(failures === 0 ? 0 : 1);
