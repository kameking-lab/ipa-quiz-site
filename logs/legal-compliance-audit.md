# Legal Compliance Final Audit Report

Date: 2026-05-17
Branch: audit/legal-compliance-final
Scope: Early-access launch readiness — IPA copyright / privacy / disclaimers / Japanese statutes

## Scope of perspectives audited

1. IPA copyright (quotation scope, explanation translation, source attribution, trademark use)
2. Personal data protection (PIPA, PostHog/Vercel Analytics/LocalStorage disclosure, third-party transmission, cookies)
3. Educational contribution framing (free-of-charge, no overhype, no commercial bias)
4. Industry-specific essays (medical / pharma, finance / banking, public-sector defamation risk)
5. AI-generated content responsibility (AI-generated label, review structure, error reporting)
6. 景品表示法 / 特定商取引法 (no pass guarantees, free-service positioning)
7. Copyright notice (footer, third-party resource licensing)
8. Terms of service (terms / disclaimers)

## Pages inspected

- app/privacy/page.tsx (updated 2026-04-26) — comprehensive PostHog / Vercel Analytics / Gemini disclosure
- app/terms/page.tsx (updated 2026-05-02) — 11 articles, AI scoring disclaimer in Art. 9, affiliate in Art. 10
- app/about/page.tsx — AI content policy, review structure, pricing, attribution
- app/transparency/page.tsx — monthly cost reports, AI usage scope section
- app/license/page.tsx — IPA attribution policy, content reuse terms
- app/operator/page.tsx — operator info, IPA non-affiliation, trademark identification
- app/community-guidelines/page.tsx — prohibited conduct
- app/contact/page.tsx + ContactForm.tsx — anonymous-friendly form, privacy notice
- app/recommended-books/page.tsx — affiliate disclosure box
- app/layout.tsx — footer with IPA attribution, 5-column nav
- components/quiz/AiTransparencyDisclaimer.tsx — explanation-level AI disclaimer
- data/essays/sc/.../healthcare.ts — fictional case study, not medical advice
- app/essays/.../page.tsx — AI-generated warning box on each essay page

## Findings — Category 1: IPA copyright

OK. Footer (app/layout.tsx:253) shows "出典: IPA 情報処理技術者試験". /license clearly states IPA grants permission for educational use without fee. /operator explicitly states non-affiliation and trademark use is for identification only. Each problem page links to source PDF (per CLAUDE.md spec).

No issues detected.

## Findings — Category 2: Personal data protection

OK. /privacy comprehensively discloses:
- LocalStorage anonymous use, no server transmission
- PostHog event list with explicit non-collected list (names, emails, IPs, answer content, chat text)
- Vercel Analytics no-cookie design, IP hashed/country-level
- IP address in-memory only for rate limiting, never logged or persisted
- Login data collected via Google/GitHub/email link
- Data deletion paths (/settings, /account, GitHub Issues for account deletion)
- Block domains for opt-out documented

Minor observation: No explicit data-breach notification policy. Acceptable for volunteer educational project pre-launch but a future enhancement.

## Findings — Category 3: Educational contribution framing

OK. Multiple pages reinforce "ボランティア有志", "全機能無料", "教育貢献プロジェクト". No commercial puffery. No "合格保証" language anywhere (verified by grep — only "合否を保証しません" disclaimers in /terms).

No issues detected.

## Findings — Category 4: Industry-specific essays

Reviewed sample essay (data/essays/sc/2023-spring/pm2/q1/healthcare.ts). Content is a fictional incident-response case study at an unnamed hospital, written for SC (Security Specialist) exam preparation. Subject matter is information security and access control — **not medical advice, not pharmaceutical promotion**. 薬機法 / 医療法 are not triggered because:
- No drug or medical device is promoted
- No medical efficacy claim is made
- No real hospital/patient identifying details

The essay detail page (app/essays/.../[qnum]/page.tsx:220-230) already shows an AI-generated warning box clarifying it is not an official IPA model answer.

**Observation (not violation):** Industry essays cover medical/finance/public sectors using fictional scenarios. To strengthen reader expectation, a short note clarifying "the scenarios are fictional and do not constitute professional advice in the relevant industry" would be useful at the listing page (/essays/[exam]). Classified as improvement-recommended, not critical.

## Findings — Category 5: AI-generated content responsibility

OK. Multiple layers of disclosure:
- /terms Articles 2 and 9 (AI generation, AI scoring)
- /about "AI コンテンツ取扱方針・査読体制" section
- /transparency "AI 利用範囲と責任分界" section
- components/quiz/AiTransparencyDisclaimer.tsx on each explanation
- components/quiz/GenerateSimilar.tsx similar-question disclaimer
- Essays page amber warning box

Error-reporting flow points to /contact across pages.

No issues detected.

## Findings — Category 6: 景品表示法 / 特定商取引法

特商法: Currently the service offers no paid transaction (Stripe was deleted in PR #237, all pricing CTAs removed in PR #9 and PR #76). 特商法 11 条 / 通信販売 disclosure is only required when "販売条件" exist — for a fully free volunteer service, formal 特商法 disclosure is not legally required. However, /operator should explicitly state this reasoning to head off user confusion.

景品表示法: No prize-related claims, no superlatives ("業界最速" appears only in CLAUDE.md internal strategy doc, not in any public page — verified). "全機能無料" is factually true per the codebase (PAID_MODE=false default, no Stripe). Acceptable.

**Issue (improvement-recommended, not violation):** /operator could include a single line explaining that 特商法 disclosure does not apply because the service is fully free of charge with no commercial transactions. This reduces friction for cautious institutional users.

## Findings — Category 7: Copyright notice

OK. Footer attribution present (app/layout.tsx:251-272). /license page comprehensive. Per-page IPA source PDF link is on each question page.

No issues detected.

## Findings — Category 8: Terms of service / disclaimer scope

Strong overall. 11 articles covering scope, AI generation, disclaimer, prohibited conduct, attribution, jurisdiction, modification, feedback IP, AI scoring, affiliate, service positioning.

**Issue (improvement-recommended):** No explicit handling of:
- Intellectual property takedown requests (DMCA-style flow). Currently routed to /contact implicitly but not documented as a takedown path.
- Account / data deletion request flow when posthog/server is in scope (privacy mentions GitHub Issues; terms does not link).

## Issue classification

### Critical (legal violation likely if shipped)

None detected. Site already complies with applicable Japanese statutes for a free volunteer educational service.

### Improvement-recommended (low risk, but ship-worthy)

1. /operator should add a short notice stating 特商法 disclosure does not apply because the service is fully free with no commercial transactions, and direct paid-transaction inquiries to /contact (since none exist).
2. /terms should add a brief intellectual-property takedown / report flow paragraph that explicitly points to /contact for copyright or trademark concerns, including the volunteer team's response stance.
3. /essays/[exam] listing page should display a short note clarifying that industry scenarios in essays are fictional and do not constitute professional advice in the depicted industries.
4. Footer "法的情報" column lacks /operator link — operator info is a typical legal-section item and discovery is currently via /about or /transparency only.

### Observations (no action required pre-launch)

- No data-breach notification clause in /privacy. Acceptable for current scale; add when user count grows.
- No GDPR/CCPA-specific language. Acceptable as Japanese-only service.
- Affiliate disclosure is present on both /terms Art. 10 and /recommended-books, but no consolidated "affiliated pages" list. Acceptable.

## Phase 3 — Implementation plan

Apply changes:
1. app/operator/page.tsx — add 特商法 non-applicability note and route paid-transaction inquiries
2. app/terms/page.tsx — add Article 12 "知的財産権侵害の報告" pointing to /contact
3. app/essays/[exam]/page.tsx — add fictional-scenario notice near the page top
4. app/layout.tsx — add /operator link to footer 法的情報 column

No data schema changes. No new pages.

## Phase 4 — Verification

Run `pnpm typecheck`, `pnpm lint`, `pnpm build`. Spot-check new copy renders.

## Phase 5 — PR

Title: audit: legal compliance final check (IPA copyright/privacy/disclaimers)
Auto-merge enabled.

## Phase 6 — Production verification

Confirm production HEAD reflects the new copy on /operator, /terms, /essays/[exam], and footer.
