# Phase 3 — Local Build Verification (2026-05-16)

## Build status
`pnpm typecheck` → pass
`pnpm build` → pass
`pnpm lint` → 6 pre-existing errors in unrelated files (scripts/, quiz/); zero new lint findings in changed files.

## Generated HTML files (.next/server/app/essays/)

Index pages (6):
- essays/sc.html         67 KB
- essays/st.html         53 KB
- essays/sa.html         53 KB
- essays/pm.html         53 KB
- essays/sm.html         53 KB
- essays/au.html         53 KB

Detail pages (8):
- essays/sc/2025-spring/pm2/q1.html  (pre-existing)
- essays/sc/2024-spring/pm2/q1.html  (pre-existing)
- essays/sc/2023-spring/pm2/q1.html  (pre-existing)
- essays/st/2024-spring/pm2/q1.html  123 KB  (new)
- essays/sa/2024-spring/pm2/q1.html  126 KB  (new)
- essays/pm/2024-spring/pm2/q1.html  127 KB  (new)
- essays/sm/2024-autumn/pm2/q1.html  125 KB  (new)
- essays/au/2024-autumn/pm2/q1.html  125 KB  (new)

Each new detail page is 120-127 KB — essay text fully server-rendered into HTML (not soft-404).
Spot check on AU detail: 7 occurrences of "私が携わった" (one per industry intro + references in question context).

## Generated sitemap (.next/server/app/sitemap/essays.xml.body)

14 URL entries confirmed:
- /essays/sc, /essays/sc/{2023,2024,2025}-spring/pm2/q1
- /essays/st, /essays/st/2024-spring/pm2/q1
- /essays/sa, /essays/sa/2024-spring/pm2/q1
- /essays/pm, /essays/pm/2024-spring/pm2/q1
- /essays/sm, /essays/sm/2024-autumn/pm2/q1
- /essays/au, /essays/au/2024-autumn/pm2/q1

## Production deploy status (post-merge)

PR #200 merged to main at commit 826bf95.

Vercel deployment status: **rate-limited**
- description: "Deployment rate limited — retry in 24 hours."
- target_url: https://vercel.com/kameking-labs-projects?upgradeToPro=build-rate-limit
- Free-tier daily deploy cap hit. Production will auto-deploy when the rolling-24h window clears.

Production curl check (pre-deploy):
- /essays/sc/2024-spring/pm2/q1 → 200 (existing, OK)
- /essays/{st,sa,pm,sm,au}/2024-*/pm2/q1 → 404 (NOT YET DEPLOYED — expected; rate-limited)
- /sitemap/essays.xml → still shows old SC-only 4-entry version (4-entry, ~800 bytes, lastmod 14:31:06Z pre-merge)

Code is correct; production reflection blocked on Vercel rate-limit, not on a bug. Will deploy automatically.
