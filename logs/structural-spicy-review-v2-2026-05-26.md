# 過去問AI 構造的激辛レビュー第2弾（CLI観点、忖度禁止） 2026-05-26

- 対象: `C:\Users\kanet\20260522\ipa-quiz-site` / main HEAD `f0dd2d3`（フェーズ12完了）
- 検証手段: 直接精読（route/schema/middleware/config）+ grep/find + `pnpm typecheck|lint|test` 実測 + 並列サブエージェント4本（SEO/a11y/テストCI/依存）
- ベースライン実測: **typecheck クリーン / lint 1警告（未追跡 `scripts/ux-audit-screenshots.mjs`）/ vitest 23ファイル133テスト全緑**
- ルール遵守: 「概ね健全」は不使用。各指摘にファイルパス:行番号+コード引用。穴がなければ検証根拠を明記。過大修正の罠は別掲。

---

## エグゼクティブサマリ（社長向け、容赦なく）

「8割研ぎ澄まし」は **表層に限れば妥当、骨格は過大評価**。ユーザーが見る画面（UX・SEO・型安全・依存衛生）はテスト付きで実際に堅い。だが「事故を止める仕組み」と「品質を守る仕組み」に致命的な穴が空いており、その2つが欠けたものを完成度8割とは呼べない。

### フェーズ10-12対応で実際に潰せた穴（実証済み）
- WelcomeModal 削除（参照0件） / timeSpentMs 列削除（schema・本番DB両方） / pnpm overrides 移行（lockに実反映、postcss 8.5.10・protobufjs 7.6.1 単一解決） / StudyRecord `@@unique` は **client提供 answeredAt のおかげで実効**（後述 A-1） / robots Host削除・QAPage単独化・meta答え先出し廃止（各テストで実証） / role=radio roving hook 本体は本物（テストも `document.activeElement` を実assert）。

### フェーズ10-12対応で「対応した」と言うには不完全/反証されたもの
- **フィードバック機構は二重どころか三重配線**。「フェーズ11で解消」は誤り。
- **AI上限env乖離**: 定数は10に統一されたが CLAUDE.md §10 が「現状30」のまま放置。
- **roving**: 周辺UIのみ。最優先と謳う午前四択（ChoiceButton）に未適用。
- **sitemap退行テスト**: 質問/exam/topic/blogは実証、main/books静的ルートは `return true` で素通り。

### 新たに検出した致命的問題 TOP5
1. **【最重要違反】APIコスト上限（月5万円で自動停止＋Slack）が実装されていない。** CLAUDE.md §0 が「承認なしの変更禁止」と明記する安全制御が、ライブAI経路に存在しない。
2. **CIが `pnpm test`・`pnpm lint` を一度も実行しない。** 133テストとESLintはローカル限定。退行防止テストに番人がいない。
3. **フィードバック基盤の構造腐敗。** 3エンドポイント並立、admin管理画面は本番で常時空、実フィードバックは揮発する console.log のみ。
4. **中核UI（午前四択）のa11yが最も弱い。** rovingは周辺、四択は `aria-pressed` 誤用で4タブストップ。tablist群もキーボード未対応。
5. **内部ドキュメントページが本番に出荷されている**（`/final-review-v3` は「24時間後削除」と自称しつつ残存）＋ `hashIp` が逆算容易な非暗号ハッシュ＋ contact メール平文ログ。

### 過大修正の罠（理論的だが実害なし → 無視推奨、詳細は末尾）
crossExam全走査（topicTags空で短絡）/ StatsCharts同名（中身は別物で重複でない）/ `learningResourceType:"Quiz"`（`@type`でなくプロパティ値）/ og:url 絶対相対混在（metadataBaseで解決）/ postcss override下限のみ。

---

## A. 前回構造レビュー指摘事項の対応実証

### A-1 フェーズ11+12対応の実証

**(1) フィードバック機構 — 反証: 三重配線で残存【影響度: 高 / 実害あり】**
「二重配線をフェーズ11で解消」は不正確。現状は3つの取り込み口が別スキーマ・別レート戦略・別保存で並立:
- `app/api/contact/route.ts:38` — `kind: feedback | question-comment | contact` を1本で処理。呼出元3つ（`app/contact/ContactForm.tsx:60`, `components/FeedbackGateModal.tsx:94`, `components/quiz/QuestionCommentBox.tsx:88`）。PIIマスク+共有レート制限。
- `app/api/question-feedback/route.ts:14` — 別系統で生存。呼出元 `components/quiz/QuestionFeedback.tsx:75`。`checkRateLimit({ ip, feedbackSubmitted: true })`（route:17）で**常に無制限レート**、turnstileなし。さらに `route.ts:38-39` で `hasComment`/`commentLen` のみログ＝**ユーザーが書いたコメント本文を保存せず破棄**。
- `app/api/feedback/route.ts` — **呼出元ゼロの死蔵エンドポイント**（grep で fetch 0件、型import と説明文のみ）。103行に壊れたjsonl writer＋独自レート制限＋永久 `setInterval`（route.ts:30-37）を内包。

**admin管理画面が本番で常時空（致命的）**: 実フィードバックは `/api/contact`・`/api/question-feedback` 経由で **console.log のみ**（`data/feedback/*.jsonl` には書かれない）。一方 `app/admin/feedback/page.tsx:32-56` と `app/api/admin/feedback/route.ts:10-34`（`loadEntries` が**逐語重複**）は `data/feedback/*.jsonl` を読む。同ディレクトリは `.gitkeep` のみで、唯一の書き手 `/api/feedback` は誰も叩かない上 Vercel read-only fs で `fs.appendFileSync` がサイレント失敗（route.ts:59-61 catch）。結果、管理画面は常に「まだフィードバックはありません」、CSVエクスポートも常に空。**フィードバック駆動モデルを掲げながら、集まったフィードバックを運用画面で読めない。**

**(2) Turnstile — 実経路あり、ただし fail-open 留保【影響度: 中 / 実害=本番設定依存】**
`lib/turnstile.ts` は実在し `/api/contact` の `contact` kind で検証実行（`app/api/contact/route.ts:67-75`）。フェーズ11で実経路化したのは事実。**ただし** `lib/turnstile.ts:15-20` は `TURNSTILE_SECRET_KEY` 未設定時に `{ ok: true, skipped: true }` を返す fail-open。本番で鍵が未設定なら、ウィジェットが表示されてもスパム保護はゼロ（console.warn のみ）。加えて `feedback`/`question-comment` kind には turnstile 検証がない（教育ミッション上の意図的判断だが、公開フォームが実質無防備）。漏洩可能性: 鍵未設定時のスパム/コスト増。

**(3) WelcomeModal — 対応済（実証）**: `grep "WelcomeModal"` 該当0件。削除完了。

**(4) pnpm.overrides — 対応済（実証）**: `pnpm-workspace.yaml:5-8` に `postcss: '>=8.5.10'` / `protobufjs: '^7.5.8'`。依存エージェントが lock 反映を確認（`pnpm-lock.yaml:7-9` の overrides ブロック一致、postcss@8.5.10・protobufjs@7.6.1 単一解決、別版混入0）。フェーズ11移行は効いている。

**(5) StudyRecord @@unique — 対応済（疑義を実証で反証）**: `prisma/schema.prisma` の StudyRecord に `@@unique([userId, questionId, answeredAt])` 宣言あり。当初「`answeredAt @default(now())` だと server now() でズレて重複排除が効かないのでは」と疑ったが、`app/api/account/history-sync/route.ts:72` が `answeredAt: new Date(e.at)`（**client提供の安定タイムスタンプ**）を使うため、`createMany({ skipDuplicates })`（route.ts:76-78）はDBレベルで正しく重複排除する。疑義は反証、対応は実効。

**(6) timeSpentMs — 対応済（実証）**: `prisma/schema.prisma` の StudyRecord は `id/userId/questionId/correct/answeredAt` のみ。本日のマイグレーション `20260527000000_remove_timespentms` を本番Neonに適用し `information_schema` で列消失を確認済み。

**(7) AI上限env乖離 — 不完全【影響度: 中 / 実害=ドキュメント信頼性】**: `lib/constants/ai-quota.ts` は `FREE_AI_DAILY_LIMIT = 10` でSSOT化され、CLAUDE.md §9も「初回10回」で一致。**だが CLAUDE.md §10「承認必須事項」は依然「無料枠の日次回数変更（現状 30）」**。SSOTを作りながら承認規程の数値が旧値のまま。どちらが正かを巡る将来の事故源。

**(8) role=radio roving — 部分対応（a11yエージェント実証）**: `lib/a11y/use-roving-radio.ts` は矢印4方向+Home/End+tabIndex管理を正しく実装、`__tests__/a11y/use-roving-radio.test.tsx` も `document.activeElement` を実assert（偽陰性でない）。だが (a) `move()`（use-roving-radio.ts:25-34）が `disabled` を考慮せず `CharacterSelector.tsx:16-35` で無効radioを選択しうる、(b) **最優先UIの午前四択 `components/quiz/ChoiceButton.tsx`/`QuizPlayer.tsx:393-411` は hook 未使用**（`aria-pressed` で4タブストップ）。適用先がキャラクター/テーマ/模試区分の周辺UIに留まる。

### A-2 過大修正の検出（フェーズ12「実害なし」判定の再検証）

- **crossExam全走査: 判定は現時点で正当（無視継続OK）、ただし遅延地雷**。`app/q/.../page.tsx:195-203` は `q.topicTags.length > 0 ? ALL_QUESTIONS.filter(...) : []` で、現データの topicTags が空のため `.filter` は実行されず短絡する。フェーズ12「topicTags が空なので最適化不要」は事実。**ただし** ロードマップのフェーズ2-3「topicTag ベースの全試験横断弱点マップ」で tag が投入された瞬間、`/q/*` の各ページ生成で `ALL_QUESTIONS`（data配下479ファイル規模）の O(N) 全走査が発火する。今直す必要はないが「tag投入とセットで最適化必須」と申し送るべき。
- **sitemap 404: 質問/exam/topic/blogは実証、静的ルートは未検査**（SEO/テストエージェント一致）。`__tests__/seo/sitemap-resolvability.test.ts:36-68` はデータ駆動URLを実ルート解決関数で検証（本物）。だが同 `:69-70` が静的ルートと `/recommended-books*` を無条件 `return true`。404の主要因である「静的ルートのサイトマップ掲載と実ルートの不整合」は構造的に検出できない。フェーズ12の主目的（質問URL 404）は達成、退行テストとしては部分的偽陰性。

---

## B. 新たな構造的穴

### B-1 アーキテクチャ・設計
- **フィードバック三重配線**（A-1再掲、影響度高）。
- **ShareButtons 2分岐フォーク【中】**: `components/ShareButtons.tsx`（115行、`Props{url,text,hashtags?,compact?}`、Facebook対応、`x.com/intent`）と `components/seo/ShareButtons.tsx`（126行、`ShareButtonsProps{url,title,compact}`、Facebookなし、`twitter.com/intent`）。同名・同目的だがプロップ名（text vs title）・対応SNS・Xドメインまで乖離。`/q/*` は seo版、about/ExplanationCard/FeedbackGateModal は無印版。共有UXが画面で不統一。
- **CostTracker がライブ経路で未使用【高、E-1と連動】**: `lib/ai/cost-tracker.ts` は `scripts/parse-all.ts` でのみ使用。AIルート（copilot/essay-grade/generate-question/scoring）はimportすらしない。
- 単一責任の逸脱までは新規検出なし（循環依存は tsc が通っており未検出）。

### B-2 データフロー
- **IDOR: 検証済み健全**。`app/api/account/{bookmark-sync,custom-tag-sync,study-plan-sync,history-export,history-sync}/route.ts` 全てで `userId = session.user.id`（auth()由来）を使い、`where:{userId}`。リクエストボディ由来のuserIdは不在。越権アクセス不可。
- **essay-rate-limit はクライアント月次カウンタ【低】**: `lib/storage/essay-rate-limit.ts` は localStorage ベースで容易にバイパス可能。ただし実ゲートは `app/api/essay-grade/route.ts` のサーバ側 `checkRateLimit`+`checkIpRateLimit` なので致命的ではない（表示用と割り切れる）。
- Hydration mismatch は今回の精読範囲で具体例未検出（theme は `THEME_BOOTSTRAP_SCRIPT` を `dangerouslySetInnerHTML` で先行注入＝定石）。

### B-3 ルーティング・URL設計
- **内部ページの本番出荷【中、E-3連動】**: `app/final-review-v3/page.tsx`（`fs/promises` で内部レビューmdを描画、metadata「Final Review v3 (内部検討用)」「24時間後削除」と自称しつつ残存）、`app/strategy-discussion-v2/page.tsx`。noindex+robots Disallow だがURL直叩きで公開到達可能。`app/demo/{afternoon,essay-grading}/page.tsx` はデモ（意図的の可能性）。
- 404/エラーバウンダリは `app/error.tsx`/`app/global-error.tsx`/`app/not-found`（use-client一覧で error系確認）あり。網羅性の致命穴は未検出。

### B-4 設定ファイルの矛盾
- **CLAUDE.md §10「現状30」vs 実装10**（A-1(7)再掲）。
- **`prisma/schema.prisma:6` のコメント「本番 DB は未接続」が古い**【低】: 本日 Neon 本番へ全マイグレーション適用済み。スキーマ冒頭の前提コメントが実態と逆。
- `.env.example` と実環境変数の網羅性: `TURNSTILE_SECRET_KEY`/`SLACK_WEBHOOK_URL`/`RESEND_API_KEY`/`ADMIN_BASIC_USER|PASS` 等が散在。実装が参照するenvと example の一致は要・別途棚卸し（今回未完全照合）。
- tsconfig/next.config/package.json は typecheck・build が緑で整合（CI実測）。

---

## C. コード品質の穴

### C-1 型安全性 — 検証根拠（強い合格）
- `: any`/`as any`/`<any>` を app/components/lib で grep → **0件**。`@ts-ignore`/`@ts-expect-error`/`@ts-nocheck` → **0件**。strict は実効。
- `eslint-disable` 9件。うち `react-hooks/exhaustive-deps` 抑制4件（`MetricsDashboard.tsx:127`, `MockExamRunner.tsx:172`, `ViewTracker.tsx:16`, `QuizPlayer.tsx:598`, `theme-provider.tsx:61`, `SearchClient.tsx:333`）は stale closure バグの温床になりうる要注意箇所。残りは `no-img-element`/`no-html-link-for-pages` の正当な理由付き抑制。
- Zod 検証は全AIルート・contact・feedback で広範（`app/api/copilot/route.ts:18`, `essay-grade/route.ts:33` 等）。ランタイム検証カバレッジは良好。

### C-2 デッドコード
- `app/api/feedback/route.ts` 全体（呼出元0、A-1再掲）。
- `lib/ai/cost-tracker.ts` の `save()`（route.ts:102-117）は `logs/api-cost.json` へ `writeFileSync` するが Vercel では非永続。
- `data/feedback/*.jsonl` 経路一式が死（A-1）。
- 内部ページ（B-3）。

### C-3 テストカバレッジ — 詳細は K（致命的）
38 route中35本が無テスト。`lib/study-plan/generator.ts`・`lib/sync/{bookmark,custom-tag,study-plan}-sync.ts` 無テスト。

### C-4 命名・可読性
- **同名ファイル衝突**: `ShareButtons.tsx`×2（B-1、実体も別＝真の重複）、`StatsCharts.tsx`×2（`app/stats` は GSC系4関数 `ImpressionsTrendChart` 等、`app/transparency` は単一 `StatsCharts`＝**中身は別物で重複ではない**が import 時に紛らわしい）。
- マジックナンバーの放置は AI maxTokens（`copilot/route.ts:134-139` の180/440/900）等にあるが、いずれもコメント付きで意図明示。致命ではない。

---

## D. パフォーマンス悪化要因

### D-1 レンダリング負荷
- **`"use client"` が 138件**（`grep -rl '"use client"' app components lib` 実測）。フェーズ12の commit 80196c7 が4件削減した直後で138＝新機能追加で**純増**。レビュー基準時(2026-05-23)の128から+10。RSC優先（CLAUDE.md §7）に逆行。削減対応は焼け石に水。
- `lib/` にまで client 宣言が侵食（`lib/sync/*.ts`, `lib/streak/*.tsx`, `lib/motivation/session.ts` 等）。ライブラリ層が client 化するとツリーシェイク・サーバ実行の余地を失う。

### D-2 データ取得
- **history-sync が全履歴をメモリ展開【中】**: `app/api/account/history-sync/route.ts:58-61` が `prisma.studyRecord.findMany({ where:{userId} })` を無制限取得→Set化。ヘビーユーザー（数千回答）で毎同期に全行ロード。本番DBは現在0件なので顕在化していないが設計上の N増加リスク。
- N+1 の具体例は精読範囲で未検出（sync系は createMany/findMany のバッチ）。

### D-3 バンドルサイズ
- **アナリティクス二重マウント【中】**（依存エージェント）: `app/layout.tsx:125` `<PostHogProvider/>` と `:132` `<VercelAnalyticsWithPrivacy/>` が常時併載。`posthog-js`（数十KB級）+ `@vercel/analytics` の2SDKがクライアントに乗り、同一行動を別名計測（`lib/analytics/events.ts` の `quiz_start` 対 `lib/posthog.ts:28-33` の `quiz_started`）。「UX最速」を掲げる初期ロードを二重に重くする。
- `framer-motion`（^12.38）が `FireworksBurst.tsx`/`ComboCounter.tsx` の2ファイル装飾だけに導入【低】。

---

## E. セキュリティの穴

### E-1 認証・認可
- **admin Basic認証は実在・健全（検証根拠）**: `middleware.ts` が matcher `["/admin/:path*","/api/admin/:path*"]` を HTTP Basic で保護。`timingSafeEqual`（定数時間比較）実装、env 未設定時は**503 で fail-closed**。
- **IDOR なし（検証根拠）**: B-2参照。
- **【最重要違反】APIコスト上限が未実装【高 / 財務リスク】**: CLAUDE.md §0 は「月間APIコストが5万円に達したら新規AIリクエストを自動停止しSlack通知。承認なしの変更禁止」と定める。しかし:
  - `app/api/copilot/route.ts` はコスト集計・上限チェックを一切持たない（CostTrackerをimportしない、line131の "budget" はトークン予算コメント）。
  - `lib/ai/cost-tracker.ts` は受動的集計のみ（上限・自動停止・Slackなし）で、利用は `scripts/parse-all.ts` のオフラインバッチだけ。
  - `notifySlack` は `app/api/cron/health-check/route.ts:71` のデプロイ死活監視専用。コスト超過通知ではない。
  - 月間コスト集計・5万円判定はコードベースに存在しない（`grep 50000|月間|monthly` の該当は essay回数/team mock/tutor統計で無関係）。
  - 唯一の歯止めは日次/IPレート制限のみ。`POST_FEEDBACK_AI_DAILY_LIMIT = 9999`（`lib/constants/ai-quota.ts`）のため、フィードバック投稿済ユーザーは1日9999回まで可能。フェーズ3で追加された essay-grade は割高な flash モデル+3×4000字入力で、コスト単価が §12 試算（flash-lite 0.055円/req）を大きく上回る。**最重要の安全弁が無いまま、より高コストな機能が増えている。**
- **turnstile fail-open**（A-1(2)）。

### E-2 入力検証 — 概ね検証根拠あり
- **XSS: `dangerouslySetInnerHTML` は2箇所のみで安全**。`app/layout.tsx:118`（静的定数 `THEME_BOOTSTRAP_SCRIPT`）、`components/seo/JsonLd.tsx:5`（`</` エスケープ済シリアライズ、SEOエージェント確認）。ユーザー入力経路なし。
- **SQLi: Prisma 経由で安全**。`$queryRawUnsafe` は本日の検証用 `.cjs`（削除済）以外に本番コード無し。AIルートは全て Zod スキーマで境界検証。
- ファイルアップロード: `app/student/StudentIdUpload.tsx` は blob URL のクライアントプレビューで、サーバ保存経路は精読範囲で未検出。

### E-3 機密情報の取扱い
- **`hashIp` が逆算容易な非暗号32bitハッシュ【中 / PII】**: `app/api/contact/route.ts:138-145` の `h = (h*31 + charCode)|0`。IPv4空間（2^32）に対し総当たりで即逆算でき、匿名化の実効はほぼゼロ。`ipHash` を「個人を特定しない」前提で運用すると誤り。
- **contact のメール平文ログ【中 / PII】**: `app/api/contact/route.ts:88-112`、contact kind は本人連絡のため maskPII を通さず、`console.log` で email/name/body を Vercel ログに平文出力。
- **内部ページ公開**（B-3）。
- ハードコード秘密は grep で未検出（`VERCEL_PROJECT_ID` は公開ID）。

---

## F. SEO実装の構造的検証（サブエージェント実証）

- **F-1 構造化データ**: `/q/*` は `QAPage + LearningResource + BreadcrumbList` の3ノードのみ（`lib/seo/question-jsonld.ts:120-163`）、`__tests__/seo/question-jsonld.test.ts:39` が `not.toContain("Quiz")` を厳密検証＝QAPage単独化は実証。**穴**: `FAQPage` を3ページ出力（`app/faq/page.tsx:52`, `app/features/[slug]/page.tsx:90`, `app/why-kakomon-ai/page.tsx:168`）が、GoogleのFAQリッチリザルト縮小（2023）でIPA非公式教育サイトには効かない死スキーマ【中】。`/mock-exam` のみ JSON-LD が2スクリプトに分裂（`page.tsx:76` + `MockExamLanding.tsx:147`）【低】。JSON-LD単体テストが `/q/*` 一本足で CollectionPage/Article/Course/ItemList/FAQPage 無検査。
- **F-2 メタデータ**: 全動的ルートに `generateMetadata` 存在、データ不在時 `robots:{index:false}`、essays/success-stories は `index:false,follow:false`（AI生成架空コンテンツのnoindex実装と一致）。`/q/*` description は158字キャップ+CTA保全（`lib/seo/question-meta.ts:32-40`、テスト実証）。穴: og:url の絶対/相対混在（`metadataBase` で解決＝実害なし）。
- **F-3 サイトマップ**: `app/sitemap.xml/route.ts` + `lib/seo/sitemap-xml.ts` のインデックス方式。年度追加は `getAvailableExams()` 起点で自動反映（`STATIC_ROUTES`/`RECOMMENDED_BOOKS_EXAMS` は手書き）。`pnpm test __tests__/seo` 27テスト全パス。穴: 退行テストが main/books 未検査+placeholder除外未保証（A-2再掲）【中】。
- **F-4 robots.txt**: `host:` 出力なし（`app/robots.ts`、`__tests__/seo/robots.test.ts:28` 検証）＝フェーズ10 Host削除実証。Sitemap URLは `SITE_BASE_URL`（`*.vercel.app` を拒否し本番ドメインへ）経由で整合。穴: Disallow一覧とサイトマップ除外一覧が二重手管理で乖離リスク（実害なし）。

---

## G. アクセシビリティ実装の構造的検証（サブエージェント実証）

- **G-1 ARIA**: `aria-expanded` のトグル整合は全箇所 state バインドで問題なし（`SiteHeader.tsx:110`, `SearchClient.tsx:572/588` 等、検証根拠）。**穴**: 四択UIが画面で `role="radio"`（`MockExamLanding.tsx:461`）と `aria-pressed`（`ChoiceButton.tsx:54`, `MockExamRunner.tsx:266`）に割れ、排他選択セマンティクスが不統一【中】。
- **G-2 キーボード**: roving hook 本体は仕様準拠+テスト本物。**穴**: (a) 最重要の午前四択が roving 未適用で4タブストップ（`QuizPlayer.tsx:393-411`）【高】、(b) `role="tablist"` 群（`components/ui/tabs.tsx:73-92`, `QuestionListWithFilter.tsx:222`, `AfternoonResultView.tsx:94`）が矢印キー未実装で `role="tab"` 宣言と実挙動が矛盾【高】、(c) `use-roving-radio.ts:25-34` の `move()` が disabled 非スキップ【中】。モーダルは Radix（`dialog.tsx:34`/`sheet.tsx:57`）でフォーカストラップ済（検証根拠）、ただし `QuizPlayer.tsx:518` の自作 `role=dialog aria-modal=false` はトラップなし【低】。
- **G-3 SR**: 画像altは妥当（lucideは `aria-hidden` 運用、検証根拠）。`QuizPlayer.tsx:414` の `role=status aria-live=polite sr-only` は良い実装。**穴**: `MockExamRunner.tsx:214` のタイマーが毎秒変わる `aria-label`（アンチパターン）【中】、`MockExamLanding.tsx:284` が大ブロック全体を `aria-live=polite` 化で過剰アナウンス【中】。

---

## H. ドキュメント・コメントの罠

- **H-1 CLAUDE.md**: §10「現状30」矛盾（A-1(7)）。§0コスト上限が実装と乖離＝ドキュメントが守られていない最重要規程（E-1）。自称「8割完成」の根拠資料そのものが実態とズレており、自己評価の信頼性を損なう。
- **H-2 README**: 今回未精読（別途棚卸し推奨）。env一覧の網羅性は B-4 と合わせ要確認。
- **H-3 インラインコメント**: `TODO`/`FIXME`/`HACK`/`XXX` は app/components/lib で **0件**（唯一の `XXX` ヒットは `lib/feedback/pii-masker.ts:31` の電話番号パターン記述で誤検出）。放置デバッグマーカーなし＝検証根拠。`prisma/schema.prisma:6` のコメントは古い（B-4）。

---

## I. 依存関係の罠（サブエージェント実証）

- **I-1 package.json**: dependencies 25件すべて実import確認＝**未使用依存0**（検証根拠）。`pnpm audit` は critical/high/moderate/low **全0**（検証根拠）。**穴**: アナリティクス二重（D-3）【中】、framer-motion 過剰投入【低】、`@types/node` が Node20系で5メジャー遅れ（`package.json:87` `^20` vs `engines.node >=22`）【中】、`next-auth: 5.0.0-beta.31` のベータ固定で本番認証が pre-release 依存【中】、`prisma` 6→7 ほか devツール群が1メジャー遅れ【低】。
- **I-2 lock**: `lockfileVersion: '9.0'`、`pnpm install --frozen-lockfile` 成功（package.json整合）。overrides 移行は実反映（A-1(4)）。
- **I-3 peer**: `pnpm why react` で react@19.2.6 単一インスタンス、unmet peer 0（検証根拠）。

---

## J. データベース・Prismaの構造的検証

- **J-1 インデックス**: StudyRecord `@@index([userId, questionId])`（schema.prisma）は `@@unique([userId, questionId, answeredAt])` の左端プレフィックスと**冗長**【低】。Postgres は unique index を `(userId, questionId)` 前方一致クエリに使えるため、別建ての複合indexは書き込み増幅のみで読み取り利得が薄い。`@@index([userId, answeredAt])` は unique で代替できず正当。
- **onDelete**: 全リレーションで `onDelete: Cascade` 明示（User 削除時の整合）＝検証根拠、孤児レコードのリスクなし。
- **ユニーク制約**: Bookmark `@@unique([userId, questionId])`、CustomTag `@@unique([userId, name])`、StudyRecord（前述）と網羅。StudyPlan は `id` がアプリ生成PKで `@@unique` なし（payload JSON）＝設計上妥当。
- **J-2 マイグレーション**: `20260419000000_init` → `20260523000000_cloud_sync_models` → `20260526000000_studyrecord_unique` → `20260527000000_remove_timespentms` の4本。本日 `migrate status` が "Database schema is up to date!" で本番一致。`DROP COLUMN` はロールバック不可だがデータ0で実害なし。**穴**: `schema.prisma:6` コメントが「本番未接続」のまま（B-4）。
- **J-3 クエリ**: history-sync の無制限 findMany（D-2）。過剰 include は未検出。

---

## K. テスト・CIの構造的検証（サブエージェント実証＋自己確証）

- **K-2【最重要・自己確証】CIが vitest/lint を実行しない【高】**: `.github/workflows/` は `e2e.yml`/`essays-quality.yml`/`question-quality.yml`/`vercel-recovery.yml` の4本。`grep "vitest\|pnpm test\|pnpm lint"` の該当**0**。CIが回すのは install / typecheck / build / playwright e2e（`e2e.yml:31-43`）/ validate:questions（`question-quality.yml:34`）のみ。**133ユニットテストとESLintはPRゲートに不在。** CLAUDE.md §7「PR前に typecheck/build/test/lint 4つをパス」は CI で test・lint が担保されておらず常態的に規約違反。退行防止テストは「書いたが番人がいない」。
- **K-1 偽陰性テスト**:
  - `__tests__/db/studyrecord-unique.test.ts:11-17` は schema.prisma の**文字列grep**のみ（本体コメントが "CI has no live Postgres" と自認）。守るべき実dedupロジック（history-sync route の Set突合）には単体テストがなく、`${r.answeredAt.getTime()}` と `new Date(e.at)` のズレ退行を検出できない＝偽陰性寄り。
  - `__tests__/seo/no-hardcoded-counts.test.ts:9` は `FORBIDDEN = ["14,402",...]` の既知数値ブラックリスト式で、新規誤値（例 15000）を素通り。
  - `__tests__/api/{copilot,scoring,essay-grade}.test.ts` は `delete process.env.GEMINI_API_KEY` でモック短絡経路のみ検証、`copilot.test.ts:102` の `toBeTruthy()`/`toMatch(/^[01]$/)` は緩い。
  - 良いテスト（本物）: `use-roving-radio.test.tsx`（activeElement実assert）、`question-counts.test.ts`（実データreconcile）、`rag.test.ts`（実コーパス）。
- **Playwright E2E は存在・健全**: `tests/e2e/` に複数spec、`e2e.yml:43` で `pnpm e2e` 実行。

---

## 影響度マトリクス（高/中/低 × 修正工数）

**高インパクト × 低工数（最優先）**
- CI に `pnpm test`+`pnpm lint` を追加（`e2e.yml` の既存ジョブに2ステップ）— K-2
- CLAUDE.md §10「30」→「10」修正、§0コスト上限の実装状況を正直に追記、schema.prisma:6 コメント更新 — B-4/H-1
- 死蔵 `/api/feedback`＋`data/feedback` 経路の削除 or admin を `/api/contact` ログ源に再接続 — A-1

**高インパクト × 中〜大工数**
- APIコスト上限（月次集計＋¥50k自動停止＋Slack）の実装 — E-1（§0最重要、設計判断を伴う）
- 午前四択を `role=radiogroup`+roving へ（数字キーショートカット/`revealed`時の矢印競合に注意）— G-2

**中インパクト × 低〜中工数**
- turnstile を feedback/question-comment にも、または本番鍵を必ず設定 — A-1(2)
- `hashIp` を HMAC（秘密鍵）へ、contact メールのログ出力抑制 — E-3
- 内部ページ（final-review-v3/strategy-discussion-v2）の削除 — B-3
- アナリティクス二重計測の一本化 — D-3
- ShareButtons 2実装の統合 — B-1
- FAQPage 死スキーマ3件の撤去 — F-1
- tablist 群のキーボード対応 — G-2

**低インパクト（後回し可）**
- 冗長 index 削除（J-1）、`@types/node` 引き上げ（I-1）、use client 棚卸し（D-1）、history-sync の findMany ページング（D-2）

## 修正優先度 TOP20（即実装可能な順）
1. CIに vitest ステップ追加（K-2）
2. CIに eslint ステップ追加（K-2）
3. CLAUDE.md §10 の「30」を「10」に修正（A-1/B-4）
4. schema.prisma:6「本番未接続」コメント更新（B-4）
5. 死蔵 `/api/feedback` 削除（A-1/C-2）
6. admin/feedback を実フィードバック源（/api/contact ログ or DB）に再接続（A-1）
7. `app/final-review-v3`・`app/strategy-discussion-v2` 削除（B-3）
8. `hashIp` を HMAC 化（E-3）
9. contact メールのログ平文出力を抑制/マスク（E-3）
10. turnstile 本番鍵の設定確認＋未設定時の挙動明文化（A-1/E-1）
11. APIコスト月次集計の最小実装（記録の永続化先をDBへ）（E-1）
12. ¥50k到達時の自動停止＋Slack（E-1）
13. アナリティクスを PostHog/Vercel どちらかに一本化（D-3）
14. 午前四択の radiogroup+roving 化（G-2）
15. tablist 群の矢印キー対応 or role降格（G-2）
16. FAQPage 死スキーマ撤去（F-1）
17. ShareButtons 2実装統合（B-1）
18. sitemap 退行テストに静的ルート＆placeholder検査追加（A-2/F-3）
19. history-sync の findMany にページング/件数制限（D-2）
20. 冗長 index `@@index([userId, questionId])` 削除（J-1）

## 過大修正の罠（理論的指摘だが実害なし → 無視推奨）
- **crossExam 全走査**: topicTags 空で短絡。今は実害ゼロ。tag投入時に最適化（申し送りのみ）。
- **StatsCharts 同名**: 中身は別物（GSC系 vs transparency）で重複ではない。機械的統合は誤り。
- **`learningResourceType:"Quiz"`**（`app/mock-exam/page.tsx:65`）: `@type` でなくプロパティ値。フェーズ10のQuiz削除主張は正しい。
- **og:url の絶対/相対混在**: `metadataBase` で解決され実害なし。
- **postcss override が下限のみ**: 現状 8.5.10 固定で問題なし。安易な削除こそ再発リスク。
- **`lucide-react@1.16.0`/`lib/posthog.ts` 2ファイル**: タイポ/重複に見えるが正常（依存エージェント確認）。

---

## 結論（社長への忖度なしメッセージ）

「8割研ぎ澄まされている」は **表層8割・骨格5割の過大評価**。UX/SEO/型安全/依存衛生は、テストとデータで裏が取れる本物の作り込みがある（any 0件、audit 0件、QAPage単独化・robots・本番ドメイン解決はテスト付き）。だが完成度を名乗るなら必須の「事故を止める仕組み」が2つ欠けている。第一に、CLAUDE.md が最重要・変更禁止と明記した**月5万円のコスト自動停止が実装されていない**——歯止めは日次レートだけで、フィードバック後は1人9999回/日が通り、より高コストな論述採点まで増設済み。第二に、**CIがユニットテストもLintも回していない**ため、せっかくの133テストは退行を一件も止められない。加えてフィードバック基盤は三重配線の末に管理画面が常時空という運用不能状態。これらは「磨き」の問題ではなく「土台の穴」だ。逆に言えば、TOP4（CIにtest/lint追加・コスト上限・フィードバック再接続・四択a11y）は工数の割に効く。ここを塞げば「8割」は実態に追いつく。

### フェーズ13で潰すべき構造的問題
1. CIゲート整備（vitest+eslint）— 全テストの価値を有効化する前提
2. APIコスト上限の実装（§0遵守、永続集計＋自動停止＋Slack）
3. フィードバック基盤の一本化と admin 再接続
4. 中核UI（四択）のradiogroup+roving、tablist群のキーボード対応
5. ドキュメント整合（CLAUDE.md §10/§0、schema コメント）と内部ページ撤去

### 構造的に解決不可能・許容すべき項目
- in-memory レート制限のインスタンス分散（サーバレスの宿命、Redis移行はフェーズ4規模）
- next-auth ベータ依存（GA待ち、追跡のみ）
- crossExam 全走査（tag投入とセットで対応、今は短絡で無害）

---
出典: IPA 情報処理技術者試験 / 本レビューは実装を変更していない（読み取り専用調査）。
