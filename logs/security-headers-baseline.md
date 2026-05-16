# Security Headers Baseline Audit
Date: 2026-05-16
Production URL: https://www.kakomon-ai.jp/
Branch: chore/security-headers-hardening

## Current Headers (curl -sI https://www.kakomon-ai.jp/)

```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://vercel.live https://cdn.jsdelivr.net https://us-assets.i.posthog.com; style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; img-src 'self' data: blob: https://*.ipa.go.jp; font-src 'self' https://cdn.jsdelivr.net; connect-src 'self' https://generativelanguage.googleapis.com https://vercel.live wss://ws-us3.pusher.com wss://ws-eu.pusher.com https://us.i.posthog.com https://us-assets.i.posthog.com https://o4511300167860224.ingest.us.sentry.io; frame-src https://vercel.live; frame-ancestors 'none'; base-uri 'self'; form-action 'self'; upgrade-insecure-requests
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Resource-Policy: same-site
Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), browsing-topics=()
Referrer-Policy: strict-origin-when-cross-origin
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
X-Content-Type-Options: nosniff
X-Dns-Prefetch-Control: on
X-Frame-Options: DENY
```

## Gap Analysis

### Present and Correct
- Strict-Transport-Security: max-age=63072000 includeSubDomains preload (full)
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin
- Permissions-Policy: camera/microphone/geolocation/payment/browsing-topics denied
- Cross-Origin-Opener-Policy: same-origin
- Cross-Origin-Resource-Policy: same-site
- Content-Security-Policy: enforced (not report-only)
- poweredByHeader: false (no X-Powered-By leakage)

### CSP Gaps Identified
1. `object-src` not set — falls back to default-src 'self', should be 'none' (blocks plugins/Flash XSS vectors)
2. `worker-src` not set — /sw.js service worker exists; explicit 'self' needed
3. `manifest-src` not set — /manifest.webmanifest exists; explicit 'self' needed
4. `va.vercel-scripts.com` missing from script-src — Vercel Analytics (@vercel/analytics) uses this domain
5. `va.vercel-scripts.com` missing from connect-src — Vercel Analytics beacon endpoint

### Not Required / Intentionally Absent
- Content-Security-Policy-Report-Only: existing enforced CSP is already in place, improvements go directly to enforced header
- X-XSS-Protection: deprecated, correctly absent
- Google Fonts domains: next/font/google self-hosts at build time; preconnect hints in HTML are cosmetic only

## Planned Changes (next.config.js cspDirectives)

Add to existing CSP:
- object-src 'none'
- worker-src 'self'
- manifest-src 'self'
- va.vercel-scripts.com added to script-src
- va.vercel-scripts.com added to connect-src

No changes needed to non-CSP headers (all already at maximum hardening).
