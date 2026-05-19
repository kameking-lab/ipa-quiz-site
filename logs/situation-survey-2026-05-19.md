# 現況調査レポート 2026-05-19

## 概要
- 調査日時: 2026-05-20T08:00 JST
- main HEAD SHA: 9cee629f14df01dd764abb4eabc9ef3d9c6440de
- 調査者: Dispatch Sonnet 4.6
- 調査方法: focused-hofstadter-e0736b ワークツリー（mainブランチ）で実施
- 注記: mainブランチは focused-hofstadter-e0736b ワークツリーに既にチェックアウト済み、最新pull確認済み

---

## A. ブランチ・PR状態

### main HEAD SHA
9cee629f14df01dd764abb4eabc9ef3d9c6440de

### PR #304 詳細
- number: 304
- title: feat(onboarding): new user tour + /quickstart hub + per-exam pages
- state: OPEN
- mergeable: MERGEABLE
- mergeStateStatus: UNSTABLE
- headRefName: feat/new-user-onboarding
- additions: 1250
- deletions: 3
- changedFiles: 10
- createdAt: 2026-05-19T11:51:23Z
- updatedAt: 2026-05-19T11:55:23Z
- statusCheckRollup:
  - E2E: FAILURE (completedAt 2026-05-19T11:55:53Z, run #76731445224)
  - Vercel: SUCCESS (Preview deployment OK)
  - Vercel Preview Comments: SUCCESS

### open PR一覧（3件）
- #304 feat(onboarding): new user tour + /quickstart hub + per-exam pages | feat/new-user-onboarding | 2026-05-19T11:51:23Z
- #268 feat(ingest): IPA PDF coverage audit + heuristic ingestion pipeline (Phase 0+1+3) | feat/ipa-pdf-comprehensive-ingest | 2026-05-17T00:04:58Z
- #78 feat(chat): add cloud sync and public share URL | feat/chat-cloud-sync | 2026-04-24T02:53:08Z

### 直近30マージPR一覧
- #303 feat(content): competitive marketing pages + 12 SEO long-tail blog articles | MERGED 2026-05-19T00:00:18Z
- #302 feat(motivation): learning streak + daily goal + badge system (LocalStorage) | MERGED 2026-05-18T23:39:55Z
- #301 feat(search): enhanced facets + real-time search + history + learning path integration | MERGED 2026-05-18T23:36:24Z
- #300 feat(admin): launch monitoring dashboard with PostHog/Vercel/GSC data integration | MERGED 2026-05-18T23:33:05Z
- #299 feat(copilot): streaming UX — instant partial response + progress indicator + stop button | MERGED 2026-05-18T23:29:56Z
- #298 feat(seo): enhanced structured data for success stories with AI-generated disclaimer | MERGED 2026-05-18T23:25:24Z
- #297 chore(launch): finalize copy-paste-ready launch artifacts for manual execution | MERGED 2026-05-18T23:21:30Z
- #296 feat(copilot): enhance citation UI/UX, related-question recommendation, question guidance | MERGED 2026-05-18T15:17:40Z
- #295 docs(seo): soft 404 resolution complete report | MERGED 2026-05-18T15:16:02Z
- #294 feat(mock-exam): enhanced result analysis, review path, history tracking | MERGED 2026-05-18T15:10:17Z
- #293 fix(seo): re-introduce dynamicParams=false on /blog /q /essays for proper HTTP 404 (Vercel Pro) | MERGED 2026-05-18T15:08:59Z
- #292 chore(bot): revive auto-improve bot with Vercel Pro adjustments | MERGED 2026-05-18T15:07:10Z
- #291 feat(monitoring): enable Vercel Analytics + Speed Insights with privacy-aware config | MERGED 2026-05-18T15:06:16Z
- #290 chore(launch): finalize launch artifacts, runbook, and monitoring dashboard | MERGED 2026-05-18T12:15:34Z
- #289 investigate(ops): vercel account block diagnosis and unblock procedure | MERGED 2026-05-18T12:13:46Z
- #288 fix(build): revert dynamicParams=false to restore Vercel production deployment | MERGED 2026-05-17T15:10:46Z
- #287 fix(workflow): graceful fallback when Vercel API daily deployment limit reached | MERGED 2026-05-17T13:49:12Z
- #286 fix(workflow): repair vercel-recovery API payload (repoId field) | MERGED 2026-05-17T13:46:49Z
- #285 chore(docs): align vercel-token-setup.md with actual token configuration | MERGED 2026-05-17T13:35:53Z
- #284 fix(deploy): workflow permissions + redirect-only stub cleanup (partial recovery) | MERGED 2026-05-17T11:43:37Z
- #283 fix(e2e): update study-plan heading assertion to match corrected disclosure text | MERGED 2026-05-17T10:03:39Z
- #282 fix(disclosure): correct AI generation labeling in study-plan to match actual implementation | MERGED 2026-05-17T09:56:07Z
- #281 docs: consolidate review package for owner morning review | MERGED 2026-05-17T08:42:44Z
- #280 test(e2e): add critical-path E2E coverage (131 passed, 3x consecutive) | MERGED 2026-05-17T06:21:56Z
- #279 feat(legal): add breach notification policy, simplified GDPR/CCPA section, and affiliate disclosure | MERGED 2026-05-17T05:15:45Z
- #278 feat(seo): crawl optimization v2 — sitemap/noindex consistency | MERGED 2026-05-17T04:45:17Z
- #277 fix: detect and repair side effects from 60+ recent PRs (PWA/LocalStorage/cache) | MERGED 2026-05-17T04:40:51Z
- #276 fix(e2e): return real 404 for nonexistent blog/essay/quiz URLs | MERGED 2026-05-17T04:29:39Z
- #275 chore(ops): Vercel deployment recovery monitoring & auto-retry | MERGED 2026-05-17T04:07:32Z
- #274 review: final pre-launch audit (49 prior issues + 60+ new PRs) | MERGED 2026-05-17T04:04:30Z

### alive marker 直近10件（logs/alive-*.log）
- alive-batch1-onboarding-cwv.log（2026-05-19 20:36 / 39B）— 最新
- alive-success-structured.log（2026-05-19 20:36 / 40B）
- alive-copilot-streaming.log（2026-05-19 20:36 / 188B）
- alive-competitive-content.log（2026-05-19 20:36 / 86B）
- alive-web-vitals.log（2026-05-19 08:13）
- alive-vercel-recovery.log（2026-05-19 08:13）
- alive-vercel-pro-analytics.log（2026-05-19 08:13）
- alive-vercel-block.log（2026-05-19 08:13）
- alive-ux-review.log（2026-05-19 08:13）
- alive-urgent-brand.log（2026-05-19 08:13）

最新 alive marker: alive-batch1-onboarding-cwv.log（2026-05-19 20:36 JST）

### 直近20コミット（git log --oneline -20）
```
9cee629 chore: alive marker for batch1 onboarding+cwv
18b0324 feat(content): competitive marketing pages + 12 SEO long-tail blog articles (#303)
5f94e90 feat(motivation): learning streak + daily goal + badge system (LocalStorage) (#302)
32db180 feat(search): enhanced facets + real-time search + history + learning path integration (#301)
1e04b70 feat(copilot): streaming UX — instant partial response + progress indicator + stop button (#299)
68e6250 feat(admin): launch monitoring dashboard with PostHog/Vercel/GSC data integration (#300)
cc83e66 feat(seo): enhanced structured data for success stories with AI-generated disclaimer (#298)
e910ae7 chore(launch): finalize copy-paste-ready launch artifacts for manual execution (#297)
d066e95 feat(copilot): enhance citation UI/UX, related-question recommendation, question guidance (#296)
f0f0f80 docs(seo): soft 404 resolution complete report (#295)
300a26c feat(mock-exam): enhanced result analysis, review path, history tracking (#294)
a674e88 fix(seo): re-introduce dynamicParams=false on /blog /q /essays for proper HTTP 404 (Vercel Pro) (#293)
ef37c2e chore(bot): revive auto-improve bot with Vercel Pro adjustments
eb20c53 feat(monitoring): enable Vercel Analytics + Speed Insights with privacy-aware config (#291)
9c35f4c Merge pull request #290 from kameking-lab/chore/launch-preparation-finalization
eeea382 chore(launch): finalize launch artifacts, runbook, and monitoring dashboard
b3a7653 Merge pull request #289 from kameking-lab/investigate/vercel-account-block
bcb3edd investigate(ops): vercel account block diagnosis and unblock procedure
755b6c9 chore: alive marker for vercel block investigation
30bdad8 chore: alive marker for launch preparation finalization
```

### リモートブランチ一覧（先頭30件）
origin/a11y/phase4-gaps, origin/audit/competitive-benchmark, origin/audit/internal-link-integrity,
origin/audit/legal-compliance-final, origin/audit/observation-screening,
origin/audit/questions-data-integrity, origin/audit/site-content-scan,
origin/audit/site-scan-round2, origin/chore/api-endpoint-cleanup,
origin/chore/auto-improve-bot-revival, origin/chore/delete-side-branch,
origin/chore/dependency-update, origin/chore/launch-preparation-finalization,
origin/chore/launch-readiness, origin/chore/phase1-docs, origin/chore/phase2-lint-cleanup,
origin/chore/redact-side-branch-logs, origin/chore/security-headers-hardening,
origin/chore/sentry-monitoring-hardening, origin/chore/seo-final-polish,
origin/chore/vercel-deployment-recovery, origin/chore/vercel-token-setup-doc-fix,
origin/chore/worktree-cleanup-20260510, origin/ci/fix-e2e-secrets-and-merge-196,
origin/claude/a11y-phase4, origin/claude/blissful-benz-6252b6,
origin/claude/busy-hugle-56c7a3, origin/claude/cleanup-phase2,
origin/claude/clever-hopper-eb04e0, origin/claude/clever-wright-aabdbb

---

## B. 本番URL HTTPステータス（実測値）

- https://www.kakomon-ai.jp/: 200 1.064s
- https://www.kakomon-ai.jp/quiz: 308 0.483s
- https://www.kakomon-ai.jp/quickstart: 404 0.352s ← PR#304未マージのため期待通り
- https://www.kakomon-ai.jp/quickstart/ap: 404 0.278s ← PR#304未マージのため期待通り
- https://www.kakomon-ai.jp/quickstart/fe: 404 0.068s ← PR#304未マージのため期待通り
- https://www.kakomon-ai.jp/quickstart/ip: 404 0.097s ← PR#304未マージのため期待通り
- https://www.kakomon-ai.jp/quickstart/sc: 404 0.278s ← PR#304未マージのため期待通り
- https://www.kakomon-ai.jp/why-kakomon-ai: 200 0.848s
- https://www.kakomon-ai.jp/mock-exam: 200 0.807s
- https://www.kakomon-ai.jp/search: 200 1.067s
- https://www.kakomon-ai.jp/success-stories: 200 1.425s
- https://www.kakomon-ai.jp/study-plan: 200 0.807s
- https://www.kakomon-ai.jp/my-progress: 200 1.196s
- https://www.kakomon-ai.jp/my-bookmarks: 404 0.081s ← 調査仕様のURL誤り。実URLは /bookmarks（200で存在）
- https://www.kakomon-ai.jp/features/copilot: 200 0.758s（app/features/[slug]/page.tsx 動的ルート）
- https://www.kakomon-ai.jp/features/mock-exam: 200 0.894s（同上）
- https://www.kakomon-ai.jp/features/study-plan: 200 0.713s（同上）
- https://www.kakomon-ai.jp/sitemap.xml: 200 0.316s（sitemapindex、子サイトマップ9本）
- https://www.kakomon-ai.jp/robots.txt: 200 0.296s

404検出サマリ:
- /quickstart/*（5件）: PR #304 未マージが直接原因。マージ次第解消。
- /my-bookmarks: 調査仕様URL誤り。実URLは /bookmarks で200確認済み。実質的な404ページはゼロ。

sitemapindex子サイトマップ: main, exams, topics, blog, books, essays, success-stories, questions/0, questions/1

---

## C. 機能ファイル存在確認

- app/quickstart/page.tsx: NOT FOUND（PR #304 未マージ）
- app/quickstart/[exam]/page.tsx: NOT FOUND（PR #304 未マージ）
- app/why-kakomon-ai/page.tsx: EXIST（18078B, 396行）
- app/features/copilot/page.tsx: NOT FOUND（app/features/[slug]/page.tsx として統合済、本番200確認）
- app/features/mock-exam/page.tsx: NOT FOUND（同上）
- app/features/study-plan/page.tsx: NOT FOUND（同上）
- app/features/page.tsx: EXIST
- app/features/[slug]/page.tsx: EXIST（動的ルート → copilot/mock-exam/study-plan は全200）
- app/admin/launch-monitoring/page.tsx: EXIST（12254B, 319行）
- app/admin/feedback/page.tsx: EXIST（5152B, 132行）
- app/admin/api-usage/page.tsx: EXIST（14344B, 315行）
- app/admin/funnel/page.tsx: EXIST（2186B, 54行）
- app/admin/deployment-status/page.tsx: EXIST（12129B, 322行）
- app/success-stories/page.tsx: EXIST（10522B, 249行）
- components/OnboardingTour*: NOT FOUND（PR #304 未マージ）
- lib/onboarding/（ディレクトリ）: NOT FOUND（PR #304 未マージ）
- public/manifest.json: NOT FOUND
- public/manifest.webmanifest: EXIST（1735B, 59行）← PWAはwebmanifest形式で存在
- public/sw.js: EXIST（6750B, 195行）
- app/api/feedback/route.ts: EXIST（2601B, 91行）
- app/api/copilot/route.ts: EXIST（13241B, 347行）

---

## D. 中期残課題の現状

### Stripe残骸残存箇所
grep -rn "STRIPE_|stripe" app/ lib/ --include="*.ts" --include="*.tsx" の結果: 0件
Stripe関連コードはapp/、lib/配下に完全不在。クリーンな状態。（残課題扱いだが既解決）

### /api/copilot 行数推移
現在: 347行
引継ぎ書記載: 623行 → 276行削減済み（PR #299 streaming UX でリファクタ済）
残課題扱いだが既解決。

### /api/feedback spam対策実装状況
- app/api/feedback/route.ts: EXIST（91行）
- turnstile / recaptcha / cloudflare-turnstile: grep結果0件
- スパム対策（Bot保護）は未実装

### rate-limit/KV実装状況
- lib/rate-limit.ts: Upstash Redis REST API を使用（コメント行に記載あり）
- lib/admin/launch-monitoring/data.ts: Upstash KVをAPIコスト集計用に参照（コメント）
- @upstash/redis: package.jsonのdependenciesには見当たらず（コメント内参照のみ確認）
- 実際のRedis接続有無は環境変数（UPSTASH_REDIS_REST_URL等）次第（未確認）

### Sentry設定状況
実装済み（no-op型アーキテクチャ）:
- sentry.client.config.ts: NEXT_PUBLIC_SENTRY_DSN 未設定時は init スキップ
- sentry.server.config.ts: SENTRY_DSN 未設定時は init スキップ
- sentry.edge.config.ts: SENTRY_DSN 未設定時は init スキップ
- lib/monitoring/sentry.ts: 独自 Envelope API 送信実装、DSN未設定でnoop
- instrumentation.ts: 存在確認済み
- @sentry/nextjs: ^10.53.1（package.json）
- 本番でのDSN設定有無は未確認

### 主要依存バージョン（package.json実測値）
- next: 16.2.6
- react: 19.2.6
- tailwindcss: ^4.3.0
- @sentry/nextjs: ^10.53.1
- posthog-js: ^1.373.5
- @vercel/analytics: ^2.0.1
- @vercel/speed-insights: ^2.0.0
- @upstash/redis: package.jsonに明示記載なし

---

## E. ローンチ準備物確認

- launch-execution-master.md: EXIST（8646B, 215行, 2026-05-19 08:21:41）
- twitter-launch-copy-paste.md: EXIST（5388B, 159行, 2026-05-19 08:21:41）
- note-launch-copy-paste.md: EXIST（8598B, 184行, 2026-05-19 08:21:41）
- gsc-submit-copy-paste.md: EXIST（6743B, 174行, 2026-05-19 08:21:41）
- bing-submit-copy-paste.md: EXIST（4843B, 143行, 2026-05-19 08:21:41）
- review-package-latest.md: EXIST（23954B, 404行, 2026-05-19 08:13:45）
- competitive-analysis.md: EXIST（20890B, 520行, 2026-05-19 08:13:45）
- legal-compliance-audit.md: EXIST（9135B, 146行, 2026-05-19 08:13:45）
- disaster-recovery-playbook.md: EXIST（18888B, 449行, 2026-05-19 08:13:45）
- soft-404-stop-report.md: NOT FOUND（logs/soft-404-resolution-complete.md は存在 → 別名で完了報告あり）
- vercel-deploy-investigation.md: EXIST（11050B, 172行, 2026-05-19 08:13:46）
- lighthouse-launch-baseline.md: NOT FOUND（Lighthouse計測未実施、タスク②未完了）

---

## F. テスト・品質

### テストファイル数
25ファイル（.spec.ts + .test.ts 合計）
- tests/e2e/: 20ファイル（smoke-routes, user-journey-quiz/blog/bookmark/copilot-rag/essays/mobile/mock-exam/progress/pwa/search/stats/study-plan/error, auth-session, admin-auth, canonical, contact-enterprise, pricing, pwa-offline）
- __tests__/: 5ファイル（copilot/citations, copilot/rag, copilot/reranker, copilot/retriever, storage/bookmarks）

### 直近10 CI実行結果
1. Vercel Deployment Recovery | main | success | 2026-05-19T22:54:06Z
2. Vercel Deployment Recovery | main | success | 2026-05-19T21:08:49Z
3. Vercel Deployment Recovery | main | success | 2026-05-19T19:30:05Z
4. Vercel Deployment Recovery | main | success | 2026-05-19T16:42:10Z
5. Vercel Deployment Recovery | main | success | 2026-05-19T12:32:09Z
6. E2E | feat/new-user-onboarding | failure | 2026-05-19T11:51:27Z ← PR #304のE2E
7. E2E | main | failure | 2026-05-19T11:36:50Z ← mainのE2Eベースラインが失敗
8. Vercel Deployment Recovery | main | success | 2026-05-19T08:52:29Z
9. Vercel Deployment Recovery | main | success | 2026-05-19T05:54:53Z
10. Vercel Deployment Recovery | main | success | 2026-05-19T04:21:16Z

重要: mainブランチのE2E（2026-05-19T11:36:50Z）が FAILURE。
#303マージ（competitive content）後の最初のE2Eが失敗しており、ベースラインが壊れている可能性。
PR #304のE2EもFAILUREであり、mainのE2Eが直っていないとPR #304のマージ判断ができない。
Vercel Deployment Recovery（インフラ監視）は全件success。

---

## G. Vercel deployment

### GitHub Workflows一覧（.github/workflows/）
- e2e.yml（1172B）
- essays-quality.yml（2164B）
- question-quality.yml（2638B）
- vercel-recovery.yml（6931B）

### 直近deployments（GitHub API、上位10件）
1. id=4741614215 | Preview | ref=dfee836d... | 2026-05-19T11:55:22Z（PR #304プレビュー）
2. id=4741455023 | Production | ref=9cee629f14df01dd764abb4eabc9ef3d9c6440de | 2026-05-19T11:40:55Z ← 最新本番
3. id=4737172601 | Preview | ref=fd49e7d1... | 2026-05-19T03:58:16Z
4. id=4735688669 | Production | ref=18b0324d... | 2026-05-19T00:13:17Z（#303マージ後）
5. id=4735627834 | Preview | ref=f8964966... | 2026-05-19T00:04:05Z
6. id=4735499334 | Preview | ref=ac93ab04... | 2026-05-18T23:45:16Z
7. id=4735495846 | Production | ref=5f94e903... | 2026-05-18T23:44:47Z（#302マージ後）
8. id=4735487807 | Preview | ref=0c1bd051... | 2026-05-18T23:43:33Z
9. id=4735468992 | Production | ref=32db1808... | 2026-05-18T23:40:42Z（#301マージ後）
10. id=4735466186 | Production | ref=1e04b707... | 2026-05-18T23:40:18Z（#299マージ後）

本番最新デプロイ（id=4741455023）のref=9cee629... はmain HEAD SHA と完全一致。
本番は最新mainと完全同期済み。

---

## H. 引継ぎ書との差分

引継ぎ書記載: 「PR #195-#303相当、約100本マージ完走」「PR #304 open」

### 引継ぎ書未記載オープンPR
- PR #268: feat(ingest): IPA PDF coverage audit + heuristic ingestion pipeline (Phase 0+1+3) | 2026-05-17T00:04:58Z
  PDFパイプライン実装PR。引継ぎ書作成タイミング（#303完走後）に既にオープンだったが未記載。
- PR #78: feat(chat): add cloud sync and public share URL | 2026-04-24T02:53:08Z
  約1ヶ月以上放置のオープンPR。クラウドSync機能の試作。引継ぎ書に記載なし。

### 引継ぎ書記載との不整合・予想外発見
- main E2E FAILURE: #303マージ後のmainが2026-05-19T11:36:50ZにE2E失敗。引継ぎ書では言及なし。
- copilot route.ts 347行: 引継ぎ書は「残課題」として記載していたが既に削減済み。
- Stripe完全撤去: 引継ぎ書で残課題とあったが実際は既にゼロ。

### 整合している点
- PR #303までマージ完了: 正確
- PR #304がOPEN: 正確（ただしE2E FAILUREの記載なし）
- ローンチ準備物一式揃い: 正確（lighthouse-baseline.mdを除く）

---

## 結論サマリ

本番サイト（kakomon-ai.jp）は正常稼働しており、主要機能ページは全200で応答している。
最新mainとVercel本番は完全同期（SHA一致: 9cee629f）。

唯一の明確なブロッカーはmainブランチのE2E失敗。2026-05-19T11:36:50Zに記録された#303マージ後の
E2Eが失敗しており、ベースラインが壊れた状態。PR #304のE2EもFAILUREだが、mainのE2E基盤が
壊れているため、PR側の問題なのかmain側の問題なのか切り分けが必要。

ローンチ準備物は launch-execution-master.md（215行）を含むコピペ投稿文まで全て揃っている。
lighthouse-launch-baseline.md のみ不在だがローンチブロッカーではない。

引継ぎ書が「残課題」と記載していたStripeコードは完全撤去済み。copilot route.tsも623行→347行に
削減済み。これらは既に解決済みで実際には残課題ではない。

スパム対策（/api/feedback への Turnstile/reCAPTCHA）は未実装のままだが本番サービス継続中のリスク。
PR #268（PDFパイプライン）と #78（クラウドSync）は長期オープンのまま放置状態。

即時実行可能な最短ローンチ経路: E2E失敗を修正 → PR #304マージ → launch-execution-master.mdの
手順に沿ってTwitter/note/GSC/Bing投稿。

---

## 推奨次アクション（順序付き）

1) mainブランチのE2E失敗原因を特定・修正（最優先ブロッカー）
   理由: PR #304のマージ判断にE2E通過が必要。mainが壊れた状態ではPR側の問題との切り分けもできない。
   #303（competitive content）追加後に最初のE2Eが落ちているため、smoke-routesか
   user-journey系のアサーション不整合が濃厚。e2e.ymlのログで特定。
   想定所要時間: 30〜60分

2) E2E修正後にPR #304をマージしローンチ実行
   理由: launch-execution-master.md に全手順揃い済み。Twitter/note/GSC/Bingの投稿文はコピペ準備完了。
   PR #304マージで /quickstart/* が解禁され新規ユーザーフロー（オンボーディングツアー）が本番に届く。
   想定所要時間: PR #304マージ10分 + ローンチ投稿15分

3) Lighthouse計測の実施（lighthouse-launch-baseline.md 生成）
   理由: ローンチ後のSEO・パフォーマンス基準値として必要。唯一の未完了ローンチ準備タスク。
   ローンチをブロックする必要はないが、ローンチ当日または翌日に実施推奨。
   想定所要時間: 30分

---
調査完了: 2026-05-20T08:00 JST
