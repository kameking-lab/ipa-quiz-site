# Security Headers Final Report
Date: 2026-05-17
Production URL: https://www.kakomon-ai.jp/
PR: #223 — https://github.com/kameking-lab/ipa-quiz-site/pull/223
Merge SHA: 9d39a56b8d6635f602a8aaf6f979f095c3f79e36
main HEAD (at time of report): e2771e3

## Production Headers After Deploy (curl -sI https://www.kakomon-ai.jp/)

```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://vercel.live https://cdn.jsdelivr.net https://us-assets.i.posthog.com https://va.vercel-scripts.com; style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; img-src 'self' data: blob: https://*.ipa.go.jp; font-src 'self' https://cdn.jsdelivr.net; worker-src 'self'; manifest-src 'self'; object-src 'none'; connect-src 'self' https://generativelanguage.googleapis.com https://vercel.live wss://ws-us3.pusher.com wss://ws-eu.pusher.com https://us.i.posthog.com https://us-assets.i.posthog.com https://o4511300167860224.ingest.us.sentry.io https://va.vercel-scripts.com; frame-src https://vercel.live; frame-ancestors 'none'; base-uri 'self'; form-action 'self'; upgrade-insecure-requests
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Resource-Policy: same-site
Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), browsing-topics=()
Referrer-Policy: strict-origin-when-cross-origin
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
X-Content-Type-Options: nosniff
X-Dns-Prefetch-Control: on
X-Frame-Options: DENY
```

## Before / After Summary

BEFORE — CSP was missing:
  - object-src directive (fell back to default-src 'self'; now 'none')
  - worker-src directive (now 'self' — covers /sw.js PWA service worker)
  - manifest-src directive (now 'self' — covers /manifest.webmanifest)
  - va.vercel-scripts.com in script-src (Vercel Analytics was unwhitelisted)
  - va.vercel-scripts.com in connect-src (Vercel Analytics beacon was unwhitelisted)

AFTER — all gaps closed:
  - object-src 'none' ✅ (plugins/Flash XSS vector explicitly blocked)
  - worker-src 'self' ✅ (service worker load correctly authorized)
  - manifest-src 'self' ✅ (PWA manifest correctly authorized)
  - va.vercel-scripts.com in script-src ✅
  - va.vercel-scripts.com in connect-src ✅

## Non-CSP Headers Status (unchanged — already at maximum hardening)

- Strict-Transport-Security: max-age=63072000; includeSubDomains; preload ✅
- X-Frame-Options: DENY ✅
- X-Content-Type-Options: nosniff ✅
- Referrer-Policy: strict-origin-when-cross-origin ✅
- Permissions-Policy: camera/microphone/geolocation/payment/browsing-topics denied ✅
- Cross-Origin-Opener-Policy: same-origin ✅
- Cross-Origin-Resource-Policy: same-site ✅

## CSP Mode
Enforced (not Report-Only) — the existing enforced policy was improved directly.
Report-Only was not needed since the site already had an enforced CSP in production.

## Expected securityheaders.com Score
A+ — all 6 required headers present, CSP comprehensive, no deprecated headers.
