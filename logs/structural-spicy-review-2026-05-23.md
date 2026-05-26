# 過去問AI 構造的激辛レビュー(CLI観点、忖度禁止) 2026-05-23

対象 HEAD: `04ea6f1`（フェーズ10完了時点）
検証手法: 全 TS/TSX 1,007 ファイルに対する grep/ripgrep/node 解析、主要ファイルの精読、
`pnpm typecheck/lint/test/audit` 実行、Prisma schema・next.config・package.json の突合。
※ Chrome agent が担う実ブラウザ操作・順位実測・競合比較は対象外。コード内部構造に集中。

---

## エグゼクティブサマリ(社長向け、容赦なく)

「8.5割研ぎ澄まされている」は、**見える層では概ね妥当だが、見えない層で過大評価**。

型安全性は極めて良好（`as any`/`: any` は全リポジトリで実質 0、`@ts-ignore` 0）、
`pnpm audit` 脆弱性 0、Prisma は全 FK に `onDelete: Cascade`、JSON-LD は `<` をエスケープ、
contact 経路は PII マスク＋IP ハッシュ。**表面品質（SEO/型/UX/a11y）は実勢 8〜8.5/10**。

一方、**構造・運用層は 6.5〜7/10**。過去フェーズの「削除」が残骸を量産し、機能チェーンが
半分死んでいる。ならして **7〜7.5割が妥当**。「研ぎ澄まし」を名乗るには内部の死蔵コードと
運用上の穴が多すぎる。

### コード内部から見えた致命的な穴（5件）

1. **フィードバック機構が二重化し、管理画面が「死んだ側」を見ている**。
   実フィードバックは `FeedbackGateModal → /api/contact`（console.log + Resend）に流れるが、
   管理画面 `/admin/feedback` は `data/feedback/*.jsonl` を読む（`app/admin/feedback/page.tsx:91`）。
   この JSONL に書き込むのは `/api/feedback`（`appendToJsonl` at `app/api/feedback/route.ts:99`）
   **のみ**で、`/api/feedback` を呼ぶクライアントは存在しない（grep 結果ゼロ）。
   → 運用者は「フィードバックが来ていない」と誤認する。実データは別経路に存在。
2. **スパム対策が実経路で完全に無効**。Turnstile 検証は `/api/feedback`（死亡）だけにあり、
   実経路 `/api/contact` には turnstile 検証が無い（`grep turnstile app/api/contact/route.ts` → 0）。
   `TurnstileWidget.tsx`（106行）はどこからもレンダリングされない。
   → フィードバック投稿は無防備。bot 投稿可能性 = 高。
3. **同一 LocalStorage キーを 2 コンポーネントが非互換スキーマで共有**。
   `LS_KEYS.questionFeedback`（`"ipa-quiz:question-feedback:v1"`）を、
   `QuestionFeedback.tsx`（`Record<string,{rating,ts}>`）と `QuestionCommentBox.tsx`
   （`QuestionComment[]`）が読み書き（前者 :15/:27、後者 :22/:32）。相互にデータを破壊する。
   → /q ページで評価 → /quiz でコメント、の往復でどちらかのデータが消える。
4. **サーバとクライアントで AI 上限が乖離しうる**。サーバは
   `FREE_INITIAL_LIMIT = parseLimit(process.env.FREE_INITIAL_LIMIT, FREE_AI_DAILY_LIMIT)`
   （`lib/rate-limit/server.ts:21`）と env 上書きを許すが、クライアント定数 `FREE_DAILY_LIMIT_CLIENT`
   は env 上書き不可（`lib/storage/rate-limit-client.ts:43`）。本番で env を設定すると
   バッジ「残り10」と実際の許可数が食い違う。フェーズ7/9 の「単一情報源」主張の穴。
5. **`pnpm.overrides` のセキュリティ pin が pnpm 10 で無視されている**。
   `package.json:99` の `"pnpm": {"overrides": {postcss, protobufjs}}` は pnpm 10.33 で読み込まれず、
   全コマンドで WARN 表示（`The "pnpm" field ... is no longer read`）。
   → postcss/protobufjs の脆弱性 pin が**効いていない**（要 pnpm-workspace.yaml 移行）。

### フェーズ10 の対応が不十分・不徹底な箇所

- フェーズ10 自体の実装品質は高い（Quiz schema は残骸ゼロ、counts は単一源化）。
  ただしフェーズ10 で**新たに死蔵 export を 2 つ追加**（`shouldShowTour`, `QUICKSTART_EXAMS`）。
- 「8.5割」は致命傷/即修正の14件に閉じた自己採点で、**過去フェーズの構造的負債を計上していない**。

### 即修正すべき構造的問題 TOP10
1. `/api/feedback`・`TurnstileWidget`・`lib/turnstile`・admin feedback 配線の死蔵チェーン除去 or 復活
2. `/api/contact` への turnstile 検証復活（スパム無防備の解消）
3. `questionFeedback` LS キー衝突の解消（別キー化＝承認要）
4. サーバ/クライアント AI 上限の env 同期 or 乖離明示
5. `pnpm.overrides` を pnpm 10 形式へ移行（セキュリティ pin 復活）
6. CLAUDE.md「1日30回」→「初回10回」修正（§120/§162/§215）
7. CLAUDE.md アフィリエイト env 名の修正（コードは `*_ASSOCIATE_TAG`/`*_AFFILIATE_ID`）
8. `.env.example` `NEXTAUTH_SECRET`→`AUTH_SECRET`、`NEXTAUTH_URL` 削除（auth 設定罠）
9. 死蔵コンポーネント削除（`WelcomeModal.tsx` 192行 ほか）
10. `StudyRecord` に `@@unique(userId,questionId,answeredAt)` 追加（skipDuplicates 実効化）

---

## A. アーキテクチャ・設計の穴

**A-1【矛盾・致命】二重フィードバック機構＋管理画面の誤配線**
`/api/contact`（実経路、`FeedbackGateModal.tsx:94` が POST）と `/api/feedback`（死亡、client 呼出ゼロ）が
並存。`/admin/feedback`（`page.tsx:91`）は後者だけが書く `data/feedback/*.jsonl` を表示。
影響: 運用者が実フィードバックを見落とす（運用事故確率=高）。工数: 中（配線統一 or 削除）。

**A-2【矛盾】サーバ/クライアント AI 上限の乖離**
`lib/rate-limit/server.ts:21` は `process.env.FREE_INITIAL_LIMIT` で上書き可、
`lib/storage/rate-limit-client.ts:43` は不可。env 設定時に表示と実挙動が食い違う。
影響: ユーザー混乱・サポートコスト。工数: 小（client も同一 env を読むか、env 廃止）。

**A-3【罠】`.env.example` の認証変数が v4 命名**
コードは `AUTH_SECRET`（`app/api/auth/[...nextauth]/route.ts:25`、next-auth v5）を読むが、
`.env.example` は `NEXTAUTH_SECRET`/`NEXTAUTH_URL`（v4）を記載。コピーした開発者は auth が 500。
影響: 新規環境構築の確実な失敗。工数: 小。

**A-4【過剰】`"use client"` 128 ファイル**
`grep -rln '"use client"'` = 128（app+components の約 4 割）。CLAUDE.md §7「サーバーコンポーネント優先・
use client は必要最小限」と乖離。影響: JS バンドル増・SSR 機会損失。工数: 大（個別精査）。

**A-5【穴】LocalStorage キー衝突（=エグゼ#3）**
`QuestionFeedback`/`QuestionCommentBox` が同一キーを非互換型で共有。データ破壊。工数: 小（新キー＝承認要）。

**A-6【放置】Turnstile/feedback の死蔵チェーン**（B-2/B-3/D-3 と重複）
PR #263→#306→#311 で構築したフィードバック+Turnstile UI を フェーズ9(#400)が
`FeedbackButton/FeedbackModal` 削除 → 周辺一式が孤児化。工数: 中。

---

## B. コード品質の穴

**B-1【放置・デッド】`WelcomeModal.tsx`（192行）が完全死蔵**
`grep -rn WelcomeModal` の参照は `lib/onboarding/state.ts:6` の**コメント**のみ。import ゼロ。
旧オンボーディングの残骸。影響: 保守者の混乱・192行の死荷重。工数: 小（削除）。

**B-2【デッド】`TurnstileWidget.tsx`（106行）消費者ゼロ**
`grep TurnstileWidget`（自身除く）= 0。`NEXT_PUBLIC_TURNSTILE_SITE_KEY` も未参照。工数: 小。

**B-3【デッド】`/api/feedback` route + `lib/turnstile.ts`**
`/api/feedback` POST を呼ぶ client ゼロ。`verifyTurnstileToken` は同 route のみが使用。
影響: 死蔵 API・誤解を招く admin 配線（A-1）。工数: 中。

**B-4【デッド】未参照 export 4 件**
`shouldShowTour`（`lib/onboarding/state.ts:119`、フェーズ10 で孤児化）、
`QUICKSTART_EXAMS`（`lib/onboarding/recommended-paths.ts:4`、同）、
`SC_ESSAY_EXAM_CODES`/`SCEssayExamCode`（`lib/essays/load.ts:33,35`、`@deprecated` 明記だが消費者ゼロ）。
影響: API サーフェス汚染。工数: 小。

**B-5【穴】`react-hooks/exhaustive-deps` 抑制 6 箇所**
`MetricsDashboard.tsx:127`、`MockExamRunner.tsx:172`、`ViewTracker.tsx:16`、`QuizPlayer.tsx:598`、
`theme-provider.tsx:61`、`SearchClient.tsx:333`。各々 stale closure のリスク。工数: 中（個別検証）。

**B-positive【徹底検証根拠】型安全性は良好**
`as any`/`: any`/`<any>` は全リポジトリで `scripts/fix-question-data-types.ts:71` の 1 件のみ。
`@ts-ignore`/`@ts-expect-error` 0。アプリ層の型の穴は事実上なし（これは褒めではなく検証結果の明記）。

---

## C. パフォーマンス悪化要因

**C-1【穴】`/q/*` で 14k 件フルスキャンが毎レンダリング残存**
`app/q/[exam]/[yearSeason]/[section]/[qnum]/page.tsx:197` の `crossExamByTopic` は
`ALL_QUESTIONS.filter(...)`（約14,402件）を ISR 再生成のたびに実行。フェーズ7 で同一試験リストは
`QUESTIONS_BY_EXAM` 化したが、cross-exam は全走査のまま。工数: 小（topicTag 逆引き index 化）。

**C-2【過剰】client bundle 肥大要因（use client 128）**
A-4 と同根。SSR 可能な表示まで client 化している疑い。工数: 大。

**C-3【穴】`AiQuotaIndicator` の 15 秒ポーリング**
`components/AiQuotaIndicator.tsx`（`POLL_INTERVAL_MS = 15_000`）が copilot 開放中 setInterval。
LocalStorage 読取りだけなら storage イベント購読で十分。影響: 微小だが常時起動の無駄。工数: 小。

**C-4【穴】home の recommendationPool を毎レンダリング生成**
`app/page.tsx` で `ALL_QUESTIONS.filter(...).slice(0,200).map(...)` をリクエスト毎に構築。
SSG/ISR 化済みページなら許容だが、純粋関数なのでモジュールレベル memo 可能。工数: 小。

**C-5【穴】`/q` の問題解決が 2 度走る**
`generateMetadata` と本体が各々 `findQuestionByRoute` を呼ぶ（フェーズ7 で O(1) 化済みだが、
React `cache()` での明示的 dedup は未導入）。影響: 微小。工数: 小。

---

## D. セキュリティの穴

**D-1【穴】CSP に `script-src 'unsafe-inline'`**
`next.config.ts` の CSP は `'unsafe-inline'` を許可（theme bootstrap のため）。nonce 化していないため、
万一の注入点で inline script が実行可能。現状は注入点が見当たらない（JsonLd は `<` を `<` に
エスケープ：`components/seo/JsonLd.tsx:6`）ため実リスクは低だが、CSP の防御力は本来より弱い。
工数: 中（nonce 導入）。

**D-2【穴】`/api/feedback` が生 IP＋生コメントをログ/ディスクに書く**
`app/api/feedback/route.ts:99-100`：`entry = {ts, ip, ...payload}` を `console.log` ＋ `appendToJsonl`。
contact 経路（`maskPII`＋`hashIp`）と非対称。現在は死蔵 route だが、復活時に PII 漏洩の地雷。
工数: 小（復活時に mask/hash 適用）。

**D-3【穴・致命】実フィードバック経路にスパム対策なし**
`/api/contact`（実経路）に turnstile 検証なし（grep=0）。Turnstile は死亡 route 側にのみ存在（A-6）。
影響: bot 投稿無防備。Resend 連携時はメール爆撃の踏み台にもなりうる。工数: 中。

**D-positive【徹底検証根拠】**
SQL は Prisma パラメタライズのみ（生 SQL/`$queryRaw` の grep=0）。`dangerouslySetInnerHTML` は 2 箇所
（`layout.tsx:118` 静的定数、`JsonLd.tsx:5` エスケープ済）。contact は PII マスク＋IP ハッシュ。
admin は Basic 認証（`middleware.ts`）。重大な注入/認可境界の穴は検出されず。

---

## E. SEO実装の構造的検証

**E-1【穴】JSON-LD のテストは /q ページのみ**
`__tests__/seo/question-jsonld.test.ts` は QAPage を検証するが、CollectionPage（success-stories/essays）、
Course、HowTo、LearningResource（exam hub）等のスキーマには単体テストなし。スキーマ回帰は無検知。工数: 中。

**E-2【放置】孤児 sitemap ルートが生存**
フェーズ10 で `/sitemap/essays.xml`・`/sitemap/success-stories.xml` を index から除外したが、
ルートハンドラ（`app/sitemap/essays.xml/route.ts` 等）は残存し 200 を返す。旧 URL を握る
クローラには noindex ページ URL を配り続ける。工数: 小（ルート削除 or 空 urlset 化）。

**E-3【過剰】noindex ページに構造化データを出力**
`/essays`・`/success-stories` は noindex（フェーズ10）だが、CollectionPage/Article JSON-LD を
出し続ける（`app/success-stories/page.tsx:63-`）。noindex ページの構造化データは Google が無視するため
純粋な無駄。工数: 小。

**E-4【穴】description 158字キャップは /q のみ厳密**
フェーズ10 で `lib/seo/question-meta.ts` の truncate を n 厳密化したが、他ページの
`generateMetadata`（exam hub 等）は手書き文字列で長さ未検証。テンプレ長超過の可能性。工数: 中。

**E-5【放置】sitemap の lastmod が手書きの固定日付**
`lib/seo/sitemap-xml.ts:29` `CONTENT_LAST_UPDATED = "2026-05-16"`、`:31` `STATIC_CONTENT_DATE = "2026-05-15"`
がハードコード。問題データや essay を更新しても `<lastmod>` は固定値のまま（一部は build 時刻に
フォールバックするが、STATIC_ROUTES と questions chunk は固定日）。クローラへ「更新なし」と
誤シグナル。試験回自動更新（`feat/exam-cycle-auto-update-pipeline`）とも非連動。工数: 小。

**E-positive【徹底検証根拠】**
`@type": "Quiz"` の残骸は全リポジトリで 0（フェーズ10 の重複解消は徹底）。canonical は
`tests/e2e/canonical.spec.ts` が約 50 パスをループ検証。BreadcrumbList は 29 ファイルで使用。
robots に `host` 無し（フェーズ10 で削除確認）。

---

## F. アクセシビリティ実装の構造的検証

**F-1【穴】`role="radio"`/`radiogroup` を素の button に付与、矢印キー操作なし**
`OnboardingTour.tsx`・`app/settings/page.tsx`・`MockExamLanding.tsx`・`CharacterSelector.tsx` の 4 箇所。
ARIA radio パターンは矢印キーでの roving が前提だが、`onKeyDown`（Arrow）実装なし。
SR は「ラジオボタン」と読み上げるが Tab でしか移動できず、期待挙動と乖離。工数: 中（roving tabindex 実装）。

**F-2【穴】キーボードショートカット overlay が Radix Dialog でない**
`QuizPlayer.tsx:526` 付近の overlay は素の div＋閉じる button（aria-label あり）だが、
focus trap / Esc 閉じが Radix のように保証されない。工数: 小。

**F-3【穴】`✕` 文字グリフをアイコン代わりに使用**
`QuizPlayer.tsx:537` は lucide ではなく文字 `✕`。button に aria-label があるため致命ではないが、
他の close（lucide `X`）と実装不統一。工数: 小（統一）。

**F-positive【徹底検証根拠】**
close button は調べた全箇所で `aria-label` 付与（`CopilotPanel.tsx:859`、`AchievementToast.tsx`、
`SessionSummaryDialog.tsx`、`QuizPlayer.tsx`）。`<img>` で alt 欠落は 0。`aria-live` 17 ファイル。
モーダルは概ね Radix Dialog（focus trap 内蔵）。a11y は総じて良好で、穴は上記の限定的なもの。

---

## G. ドキュメントとコメントの罠

**G-1【矛盾】CLAUDE.md「1日30回」× 実装「10回」**
CLAUDE.md `:120`/`:162`/`:215` は「無料 30 回/日」だが、実装は `FREE_AI_DAILY_LIMIT = 10`
（`lib/constants/ai-quota.ts`）。§12 のコスト見積（30回前提）も連動して陳腐化。工数: 小。

**G-2【矛盾】CLAUDE.md アフィリエイト env 名がコードと不一致**
CLAUDE.md `:242` は `NEXT_PUBLIC_AMAZON_TAG`/`NEXT_PUBLIC_RAKUTEN_ID`、
コードは `NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG`/`NEXT_PUBLIC_RAKUTEN_AFFILIATE_ID`
（`data/recommended-books.ts:33,39`）。doc 通りに設定すると**タグ空＝アフィリエイト収益消失**。工数: 小。

**G-3【放置】`.env.example` に死蔵 env**
`NEXT_PUBLIC_TURNSTILE_SITE_KEY`/`TURNSTILE_SECRET_KEY` は機能死蔵（D-3）にも関わらず記載。
`FREE_INITIAL_LIMIT`/`POST_FEEDBACK_DAILY_LIMIT`/`BETA_MINUTE_LIMIT`（運用レバー）は逆に**未記載**。工数: 小。

**G-positive【徹底検証根拠】**
CLAUDE.md §3 のディレクトリ構造に、フェーズ9 削除済みの `quickstart`/`FeedbackModal`/
`motivation/video` への参照は無し（grep=0）。ディレクトリ記述は最新。

---

## H. 依存関係の罠

**H-1【穴】本番が `next-auth@5.0.0-beta.31`（beta）に依存**
`node_modules/next-auth` 実バージョン = 5.0.0-beta.31。本番認証を beta に依存＝API 破壊/脆弱性リスク。工数: 中（GA 待ち/固定）。

**H-2【穴・致命】`pnpm.overrides` が pnpm 10 で無視**
`package.json:99` の overrides（postcss/protobufjs の security pin）は pnpm 10.33 が読まず、
全コマンドで WARN。`pnpm-workspace.yaml` への移行が必要。pin 不発＝transitive 脆弱性露出。工数: 小。

**H-3【穴】死蔵 env 由来の依存（TURNSTILE）**
Turnstile 機能死蔵により `TURNSTILE_*` 関連コードが宙ぶらりん。工数: 小（B-2/B-3 と同時処理）。

**H-positive【徹底検証根拠】**
`pnpm audit` = 脆弱性 0。`dependencies` を 1 件ずつ grep した結果、未参照の本番依存は検出されず
（react-dom は暗黙参照）。重複機能ライブラリ（date-fns+dayjs 等）も無し。

---

## I. データベース・Prismaの構造的検証

**I-1【穴】`StudyRecord` に一意制約なし → `skipDuplicates` が無効**
`prisma/schema.prisma:131-145` の `StudyRecord` は `@@unique` なし。
`app/api/account/history-sync/route.ts:77` の `createMany({skipDuplicates:true})` は
一意制約が無いと**no-op**。実重複防止はアプリ層の read-then-filter（`:58-73`）のみで、
並行 sync 時に重複挿入の窓が残る。影響: 学習履歴・正答率の水増し。工数: 中（unique 追加＋移行）。

**I-2【放置・デッド列】`timeSpentMs` は read されるが write されない**
`history-export`（`route.ts:25,39`）は `timeSpentMs` を select/出力するが、
書き込み箇所が皆無（history-sync createMany は 4 列のみ設定）。常に null をエクスポートする死蔵列。工数: 小。

**I-3【過剰】`User @@index([plan])`**
`prisma/schema.prisma:49` の `plan`（free/premium の低カーディナリティ）への単独 index は
選択性が低く効果薄。書き込みコストのみ増。工数: 小（削除検討）。

**I-note【検証限界】本番スキーマ整合性は CLI から未確認**
`DATABASE_URL` 未設定のため `prisma migrate status` 不可。migration は 2 本
（`20260419000000_init`, `20260523000000_cloud_sync_models`）。prod drift は別途要確認。

---

## J. テスト・CIの構造的検証

**J-1【穴】PAID_MODE 依存テストが既定で全スキップ**
`tests/e2e/contact-enterprise.spec.ts:6,41` は `test.skip(!PAID_MODE, ...)`。既定 `PAID_MODE=false`
のため enterprise/pricing 経路は CI で**一度も実行されない**。実効カバレッジ 0。工数: 中。

**J-2【穴】cloud-sync E2E は劣化経路のみ検証**
`tests/e2e/cloud-sync.spec.ts:3-5` の通り CI は DATABASE_URL 無し・サインアウト前提。
実 DB への sync/merge/IDOR 防御（フェーズ9 #397 の核心）は E2E 未到達。
unit（`__tests__/sync/merge.test.ts`）はあるが、実 Prisma 経路の結合テストは欠落。工数: 大（DB 付き CI）。

**J-3【穴】lib 配下のユニットテスト網羅が不均一**
`lib/seo/sitemap-xml.ts`（sitemap 生成の中核）にテストなし。`generateMetadata`（/q 以外）にテストなし。
回帰検知の穴。工数: 中。

**J-4【放置】スナップショットテストの脆さ**
`__tests__/components/BookmarkButton.test.tsx:33` は `toMatchSnapshot()`。スナップショットは
意図せぬ差分（CRLF 含む）で揺れやすく、本レビュー中も再生成された。価値の割に保守コスト高。工数: 小。

---

## 影響度マトリクス（高/中/低 × 工数 大/中/小）

- 高影響 × 小工数（最優先）: H-2(pnpm overrides), G-1, G-2, A-3, B-1〜B-4, I-2, E-2, E-3
- 高影響 × 中工数: A-1(誤配線), D-3(スパム無防備), A-6(死蔵チェーン), I-1(unique制約)
- 高影響 × 大工数: J-2(DB付きCI)
- 中影響 × 小工数: A-2, A-5, C-1, C-3, C-4, F-2, F-3, G-3, I-3, J-4
- 中影響 × 中工数: D-1(CSP nonce), E-1, E-4, F-1, B-5, J-1, J-3, H-1
- 中影響 × 大工数: A-4/C-2(use client 削減)

---

## 修正優先度 TOP20（即実装可能順）

1. `pnpm.overrides` を pnpm-workspace.yaml へ移行（security pin 復活）
2. CLAUDE.md「1日30回」→「初回10回」（§120/162/215）
3. CLAUDE.md アフィリエイト env 名修正（収益直結）
4. `.env.example` `NEXTAUTH_SECRET`→`AUTH_SECRET`、`NEXTAUTH_URL` 削除
5. `WelcomeModal.tsx`（192行）削除
6. 未参照 export 4 件削除（shouldShowTour/QUICKSTART_EXAMS/SC_ESSAY_*）
7. `timeSpentMs` 死蔵列の write 実装 or 列削除
8. 孤児 sitemap ルート 2 本の削除
9. noindex ページの JSON-LD 出力停止
10. `/admin/feedback` を実データ源（contact 経路）に再配線
11. `/api/feedback`・`TurnstileWidget`・`lib/turnstile` の削除 or 復活判断
12. `/api/contact` に turnstile 検証復活（スパム対策）
13. `questionFeedback` LS キー衝突解消（別キー＝CLAUDE.md §LSキー方針につき承認要）
14. サーバ/クライアント AI 上限 env 同期
15. `StudyRecord @@unique(userId,questionId,answeredAt)` 追加
16. `/q` crossExamByTopic を topicTag 逆引き index 化
17. `.env.example` に運用レバー env（FREE_INITIAL_LIMIT 等）追記
18. role=radio 4 箇所に矢印キー roving 実装
19. lib/seo/sitemap-xml.ts のユニットテスト追加
20. PAID_MODE スキップ群の CI マトリクス化（PAID_MODE=true ジョブ）

---

## 結論(社長への忖度なしメッセージ)

「致命傷5＋即修正9を潰した」のは事実で、フェーズ10 の14件は質も高い。だが「8.5割研ぎ澄まし」は
**Chrome agent が見る表面の点数**であって、コード内部にはフェーズ過程で生まれた死蔵コードと
運用上の穴が積もっている。最も悪いのは「削除はするが配線は直さない」癖だ。フィードバック機構は
二重化し管理画面は空の方を見ている、スパム対策は実経路に存在しない、Turnstile 一式とモーダル
192行が宙に浮いている――これらは「研ぎ澄まし」ではなく「やり残し」だ。

構造的判定: **見た目 8.5割 / 内部 7割、ならして 7.5割**。型安全性・脆弱性・スキーマ設計は
本当に良い（褒めではなく検証結果）。だが「完璧に近い」と言うには、死蔵チェーンの除去と
運用配線の修復が先だ。

フェーズ11 で潰すべき構造的問題: ①死蔵フィードバック/Turnstile チェーンの除去 or 復活の意思決定、
②実経路のスパム対策、③LS キー衝突、④pnpm overrides 復活、⑤doc/env の整合。
許容してよい項目: use client 128（段階的でよい）、next-auth beta（GA 待ち）、
本番 DB 整合の CLI 未確認（GSC/Vercel 側で担保）。
