import type { NextConfig } from "next";

/**
 * Security headers sent with every response.
 *
 * The CSP deliberately keeps "unsafe-inline" for scripts: Next.js ships its hydration
 * payload as inline script tags and every page here is statically prerendered, so there
 * is no per-request nonce to attach. That still blocks the realistic attack — a remote
 * script tag pointing at a third-party (gambling / SEO-spam) host — because only
 * same-origin and inline scripts may execute. SECURITY.md documents the nonce upgrade.
 */
const CSP = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "media-src 'self'",
  "worker-src 'self' blob:",
  // The contact page embeds the keyless Google Maps iframe (output=embed).
  "frame-src https://www.google.com",
  // NOTE: "upgrade-insecure-requests" is deliberately NOT set. When the site is reached
  // over plain HTTP (a staging box, a LAN IP, or a container addressed by hostname), that
  // directive rewrites the CSS and JS requests to https://, which then fail and the page
  // renders with no stylesheet at all. Only enable it once the deployment is guaranteed
  // to be HTTPS-only.
].join("; ");

const securityHeaders: { key: string; value: string }[] =
  process.env.NODE_ENV === "production"
    ? [
        { key: "Content-Security-Policy", value: CSP },
        { key: "Strict-Transport-Security", value: "max-age=31536000" },
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "X-Frame-Options", value: "DENY" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        {
          key: "Permissions-Policy",
          value:
            "camera=(), microphone=(), geolocation=(), payment=(), usb=(), magnetometer=(), gyroscope=()",
        },
        { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
      ]
    : [];

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Do not advertise the framework in every response.
  poweredByHeader: false,

  // Development-only: allow the dev server to be reached through a container hostname
  // (e.g. the Playwright browser at host.docker.internal). Without this, Next blocks its
  // own dev resources as cross-origin and the dev client reloads the page repeatedly.
  allowedDevOrigins: ["host.docker.internal"],

  // Inside Docker (DOCKER_BUILD=1) emit a self-contained server bundle so the
  // runtime image only ships the traced production files — see `Dockerfile`.
  // Local `npm run build` / `npm run start` keep the default output.
  output: process.env.DOCKER_BUILD === "1" ? "standalone" : undefined,

  images: {
    // Every image ships from /public/images, so NO remote patterns are configured.
    // That is deliberate: /_next/image will fetch any URL it is handed, so an open
    // remotePatterns list turns the optimizer into an open proxy and lets anyone burn
    // CPU and bandwidth through this server. Add a host here — as narrowly as possible —
    // only when photography actually moves to a CDN or object storage.
    // The hero paints full-viewport photography at large sizes.
    deviceSizes: [360, 480, 640, 828, 1080, 1280, 1600, 1920, 2560],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    // Next 16 requires an explicit allowlist and only serves these values: a URL
    // carrying an unregistered quality is rejected with HTTP 400.
    //   75 -> photography and the hero (the LCP image)
    //   70 -> decorative section backgrounds, which always sit under a white overlay
    // Register any new value here before using it in a component.
    qualities: [70, 75],
  },

  /**
   * Cache policy for binary assets served straight from /public.
   *
   * Next serves these with "max-age=0", which forces a revalidation round trip on
   * every visit. The paths are not content-hashed, so the TTL stays moderate: a week
   * of freshness followed by a month of stale-while-revalidate.
   *
   * NOTE: this cannot cover /_next/image. The image optimizer writes its own
   * "Cache-Control: public, max-age=0, must-revalidate" *after* config headers are
   * applied (verified against the production container), so optimised images have to
   * be cached at the edge — see README section 9.4 for the Cloudflare / Nginx recipe.
   */
  async headers() {
    const assetCache = "public, max-age=604800, stale-while-revalidate=2592000";

    return [
      // Applied to every response. Spread conditionally: Next rejects any rule whose
      // "headers" array is empty ("Invalid header found"), and in development
      // securityHeaders is intentionally empty because the dev server needs eval and
      // websockets for hot reload.
      ...(securityHeaders.length > 0 ? [{ source: "/(.*)", headers: securityHeaders }] : []),
      { source: "/images/:path*", headers: [{ key: "Cache-Control", value: assetCache }] },
    ];
  },

  experimental: {
    // Tree-shake the icon set so only the icons actually used are bundled.
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
};

export default nextConfig;
