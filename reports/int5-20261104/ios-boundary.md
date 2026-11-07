# INT5 iOS integration boundary

Base: ca99d7f72 (origin/release/batch1-20261105 after fetch; includes FX790).

Integrated fixed iOS head aaff4ba4d, including mobile/, codemagic.yaml, server/API and feedback-unlock dependencies, DB1 migrations. Retained batch1 dependency security pins, question numeric/ordering/descriptive support, pe-first tracing and official source labels. Common SEC1 cost-guard, normal-use fail-closed default, Gemini totalTokens and 4-route reservation/settlement patch are included from 7ab33c41a and the user-supplied patch. Historical batch1 runtime pins remain; batch2 accepted player pins are separate.

MOBILE_IAP_ENABLED unset keeps strictContentGateEnabled false and revenueCatAccess returns null before SQL. New mobile tables must be applied by DB1 procedure BEFORE enabling mobile or using mobile auth/account deletion. Existing public Web question, search and quiz routes do not require those tables with mobile disabled. Build only generates Prisma Client; it never applies migrations. DB1 SQL is raw, unchanged, and not added to schema.prisma. The feedback tables are dependencies already present in iOS history; enabling FEEDBACK_UNLOCK_ENABLED also requires its earlier migrations. No production DB connection or migration run in INT5.

AI routes and client consent were changed. CLAUDE.md section 7 requires one real Preview call and visual inspection (real AI, STOP, measured cost increment). Deployment is forbidden in INT5, so that check is outstanding and is a release prerequisite. Local mock checks cannot satisfy it.
