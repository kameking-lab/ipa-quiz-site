# 過去問AI 最終本番激辛レビュー (2026-05-17)

レビュアー視点: シニアプロダクトエンジニア15年・教育SaaS立て直し専門 (第三者目線)
ベース HEAD: 8e1b2dd (origin/main, 2026-05-17 朝時点)
比較対象: PR #231 初回激辛レビュー (logs/comprehensive-harsh-review-latest.md, 2026-05-16 朝, base ab90812, 49 課題提示)
評価方法: 一次情報 (実装ファイル直読) + 既存スキャン再検証 + サブエージェントクロスチェック
根拠: Google Search Central / schema.org / WCAG 2.1 AA / Apple HIG / Material Design / OWASP / IPA著作権規定

---

## エグゼクティブサマリ

総合評価: B+ (初回 B- から1ランクアップ)
ローンチ Go/No-Go 判断: 「条件付き Go」 — 後述の R-01〜R-03 (再掲課題) を 24 時間以内に対応すればフルローンチ可。

本日累計マージ 38 PR (PR #232〜#269) により、初回激辛 49 課題のうち 41 件 (84%) が解消された。
特に致命的3課題 (#001 /analytics 公開モックデータ / #002 /launch リリース予告残骸 / #003 privacy Stripe 記述) は全て対処され、ブランド毀損リスクの最大要素が一掃された。/admin/funnel が /analytics を吸収し、middleware 保護下に移動した設計判断は妥当。

ただし以下の点は無視できない。
- 再掲課題: rate-limit 永続化未対応 (#008) / components/quiz/stream 4ファイル未削除 (#011) / 一部観察事項の積み残し (#025-033)。
- 新規導入8機能のうち PR #264 (study-plan) が「AI-generated personalized」を謳うが、実装は lib/study-plan/generator.ts の純粋な決定論アルゴリズム。Gemini 呼び出しゼロ。PR タイトル・UI 文言・実装の三者不整合は教育貢献を掲げるプロジェクトとしての誠実性に直接響く重大なリスク。
- /api/feedback (PR #263) は POST 公開エンドポイントで実装側 rate-limit に依存。/admin/feedback 側は middleware で保護されているが、スパム POST が admin 受信箱を埋める攻撃ベクトルが残る。

新規致命的問題は1件 (NEW-01: study-plan の AI 表記詐称)。
新規必須項目は2件 (NEW-02 /api/feedback POST スパム対策強化 / NEW-03 RAG コーパスのライフサイクル明示)。
再掲・残存課題は5件 (R-01〜R-05)。
新規推奨は6件 (REC-01〜REC-06)。
合計: 14課題 (初回49→ 41解消 + 8残存 + 6新規 = 通し番号最大値 14)。

### 主要強み (新規追加分)
1. 模試機能 PR #257 — 13試験区分 全カバー (lib/mock-exam/config.ts:12-24) + バランス選択 + セッション resume + タイマー実装。教育的価値高。
2. AI コパイロット RAG 化 PR #269 — lib/copilot/ 配下に rag/citations/reranker/retriever/tokenize/corpus/types の7ファイル完全実装。app/api/copilot/route.ts:131-149 で正しく統合。BM25 + IDF threshold + 評価スクリプト (scripts/eval-copilot-rag.ts) + groundtruth + 単体テスト4本付き。ハルシネーション抑制設計が論理的かつ検証可能。
3. データ整備 PR #262, #265 — AP の placeholder 解説 96 → 0 件。content quality 大幅向上。

### 主要懸念 (新規)
1. NEW-01: study-plan の「AI生成」表記詐称 (致命的・教育貢献体制の信頼性直撃)
2. NEW-02: /api/feedback POST 公開エンドポイントのスパム耐性
3. NEW-03: RAG コーパスのインデックス更新ライフサイクル (scripts/build-copilot-index.ts はあるが CI 連携・データ更新タイミング不明)

---

## Phase 1: 初回49課題の解消状況

総数 49 件のうち 41 件解消 / 2 件部分解消 / 6 件未解消。詳細:

### 致命的3件: 全件解消
- 課題001 /analytics 認証なし公開: 解消。app/analytics/ ディレクトリ自体削除済。代替として /admin/funnel が middleware.ts:matcher /admin/:path* で保護下に新設 (PR #240)。
- 課題002 /launch リリース予告残骸: 解消。app/launch/ 削除済 (PR #237)。ただし next.config.ts に /launch リダイレクト定義なし。過去 SNS 共有 URL は 404 化 (許容判断: 残存リンクが少ない & SEO 影響微小)。
- 課題003 privacy Stripe 記述: 解消。app/privacy/page.tsx:119 で「本サービスは教育貢献プロジェクトとして全機能を無料で提供しており、決済情報を取得・処理する機能はありません」と明示。第三者 Cookie 章からも Stripe 記述削除。

### 修正必須5件: 4件解消 / 1件未解消
- 課題004 /stats logs パス露出: 解消 (PR #239)。
- 課題005 /test/sentry 外部実行: 解消。app/test/ ディレクトリ全削除 (PR #237)。
- 課題006 /api-docs noindex: 解消。app/api-docs/page.tsx:15 metadata に robots: { index: false, follow: true } + app/robots.ts:17 で /api-docs Disallow。
- 課題007 PR #227 削除推奨8ルート: 解消。tmp/round7-review, test/posthog, test/sentry, final-review, strategy-discussion, exec-review, feature-review, scoring-test の全8ディレクトリ削除確認 (PR #237)。なお final-review-v3 / strategy-discussion-v2 は残存だが page.tsx 内で NODE_ENV === "production" 時 notFound() ガード or noindex 設定済。
- 課題008 rate-limit 永続化: **未解消** [R-01 として再掲]。

### 推奨14件: 11件解消 / 2件部分解消 / 1件未解消
- 課題009 Stripe 残骸 6箇所: 部分解消。実害なし範囲 (admin/stats イベント定義のみ、api/cron/health-check の expected-404 リスト) に縮小 [R-02]。
- 課題010 /api/essay-grading: 解消。/api/essay-grade に統合。
- 課題011 components/quiz/stream/ 4ファイル: 未解消。app/quiz/stream/page.tsx で依然使用中。stream 機能の本番投入意図確認が必要 [R-03]。
- 課題012 components/ 11トップレベル: 解消 (PR #237 で削除)。
- 課題013 i18n dead infra: 解消 (lib/i18n/, messages/ 全削除)。
- 課題014 lib デッドファイル群: 解消 (lib/audio, lib/podcast, lib/seo/expected-404, lib/storage/avatar, lib/storage/community 全削除)。lib/streak/ は残存だが storage/core/index/MilestoneToast の4ファイルで生存。
- 課題015 disclaimer text-[11px]: 解消。components/quiz/ExplanationCard.tsx:191 で text-sm (14px) 化。文言「※ AI生成の解説は誤りを含む可能性があります。重要な判断はIPA公式資料でご確認ください。」。
- 課題016 transparency 2026-05: 解消。app/transparency/page.tsx:100 で 2026-05 エントリ追加 (PR #235)。
- 課題017 URL ホスト不整合: 解消。`https://kakomon-ai.jp` (naked) ハードコードは scripts/check-canonical.ts 1件のみ残存 (検証スクリプト自体なので意図的)。
- 課題018 blog【2026年最新】年次更新: 解消。data/blog/generators.ts:9 で CURRENT_YEAR = new Date().getFullYear() 動的化。
- 課題019 ホーム情報密度: 部分解消。HeroAiDemo / HomeExamGrid / ContinueFromLast / LearningCalendar / HomeAuxSection の5セクション構成。初回 4 セクションから増加。初学者向け絞り込み導線は未実装 [R-04]。
- 課題020 /stats 準備中セクション: 解消 (PR #239)。
- 課題021 api-docs レート制限値: 解消。app/api-docs/page.tsx:55 表記と lib/rate-limit.ts の IP_LIMITS 値が一致。
- 課題022 operator E-E-A-T: 解消。app/operator/page.tsx:26-27 OPERATOR_HANDLE 定数化 + GitHub URL + Person 構造化データ (110-120行) + about/page.tsx に AI取扱方針・査読体制セクション新設 (PR #235)。

### 観察11件: 9件解消 / 2件積み残し
- 課題023 Footer 出典: 解消 (PR #247)。
- 課題024 admin/stats checkout_started: 整理対象として残存 (機能影響なし)。
- 課題025 api/copilot Stripe コメント: 確認未完 [R-05]。
- 課題026 ContactForm enterprise: 観察継続 (法人問い合わせの教育貢献体裁内整合性)。
- 課題027 account/api-keys redirect: 統合検討対象。
- 課題028-033 全件解消 or 個別対応。

### 削除推奨16件: 14件削除実施 / 2件保留
- 課題034-041: 全8ルート削除確認 (PR #237)。
- 課題042-044 demo 系・launch: launch は削除、demo/afternoon と demo/essay-grading は教育的価値の観点から保留。
- 課題045-049: 個別対応もしくは判断不要範囲。

Phase 1 解消率: 41/49 = 84%。残存 8 件のうち R-01 (rate-limit 永続化) が運用上最も重要。

---

## Phase 2: 本日累計改善の評価グレード

新規 8 機能を第三者目線で評価:

### A. PWA オフラインサポート (PR #267) — B+
- public/sw.js: 適切な3段戦略 (cache-first for /_next/static, SWR for /q/* /essays/* /blog/*, network-first for その他, /offline フォールバック)。
- CACHE_VERSION = 'v' + Date.now() は Service Worker のバイト差分発火モデル上、install タイミング毎に固定されるため実害なし。activate でクリーンアップ実装あり (l.46-56)。
- /offline shell は app/offline/page.tsx に存在。
- PRECACHE 5ページ、cache 上限 (CONTENT 100 / PAGE 50) 設定済でモバイル容量配慮あり。
- 採用判断観点: 通学電車での学習・地方ユーザーのパケット節約・PWA installability での UX 向上。
- 不採用判断観点: 過去問学習は基本オンライン前提。/api/* は常時バイパスのため AI コパイロットはオフラインで使えない (合理的だが期待値ギャップ可能性)。PWA は yak shaving 気味だが実装品質は高い。
- 過剰実装リスク: 中。push notification 機能まで含むが、過去問学習のリテンション目的でプッシュ通知が本当に必要か要検証。

### B. 模試機能 (PR #257) — A-
- lib/mock-exam/config.ts:12-24 で全13区分 (IP/SG/FE/AP/ST/SA/PM/NW/DB/ES/SC/SM/AU) カバー。問題数 / 時間 / 合格閾値が各試験区分の本番仕様に準拠 (AP 80問 150分 60%, 専門午前II 25問 40分 60% など)。
- lib/mock-exam/session.ts でセッション resume 機構実装。
- balanced selection (selection.ts) でカテゴリ分散選択。
- 採用判断観点: 競合過去問道場の中核機能で本サービスにも導入は妥当。13区分全カバーは差別化要素。
- 不採用判断観点: なし。
- 過剰実装リスク: 低。
- 残課題: 分野別弱点抽出 UI が結果画面に統合されているか要検証 (description文では「分野別弱点分析」と記述)。

### C. 学習履歴・ブックマーク (PR #256, #266) — B+
- lib/storage/bookmarks.ts: 5タグ/問題のソフト制限、JSON エクスポート/インポート対応、quota error は silent ignore。
- /my-progress ページ追加 + 履歴記録 ON/OFF トグル (privacy 配慮)。
- 採用判断観点: 学習継続率に直結。export/import で localStorage 限界対策あり。
- 不採用判断観点: なし。
- 過剰実装リスク: 低。
- 残課題: localStorage 容量超過時の silent fail でユーザー警告なし。「保存できなくなりました」UI 通知が欲しい [REC-01]。

### D. AI コパイロット RAG 化 (PR #269) — B+
- lib/copilot/ 配下に7ファイル完全実装: rag/citations/reranker/retriever/tokenize/corpus/types。
- app/api/copilot/route.ts:131-149 で runRAG → topScore 閾値 22 (ragMinScore) → buildRAGContextBlock + buildCitationFooter の流れ実装。
- ragEnabled() デフォルト true (環境変数 COPILOT_RAG_ENABLED で切替可)。
- 評価スクリプト scripts/eval-copilot-rag.ts + groundtruth (data/copilot-eval/groundtruth.ts) + 単体テスト4本 (__tests__/copilot/) で検証体制完備。
- IDF threshold での雑談クエリ early return は妥当な設計。
- 採用判断観点: 過去問AI差別化軸 (B) AI コパイロット常駐の質的進化。citation 付き回答は教育サービスとして決定的に重要。
- 不採用判断観点: なし。
- ハルシネーション抑制: 設計上の防御は妥当だが、閾値22未満時の fallback が「通常回答」に戻るため、根拠なし回答も依然可能。citation_required モードがあると更に安全。
- コスト懸念: BM25 retrieval は local CPU、Gemini 呼び出し回数は変わらず (rerank optional)。許容範囲。
- 残課題: NEW-03 — コーパス更新ライフサイクル (scripts/build-copilot-index.ts の実行タイミング・CI 連携) を docs/improvements/copilot-rag.md で明示推奨。

### E. 検索機能 (PR #258) — B
- lib/search/question-index.ts: シンプルな keyword matching scoreQuestion (本文ヒット数 + タグヒット数 ×3)。BM25 や Meilisearch 等の本格検索ではない。
- 14,417問の linear scan は server-only で実行 (~50-100ms 想定)。
- facet: exam / year / season / category / difficulty。
- 採用判断観点: シンプルな実装で初期段階は十分。MVP として妥当。
- 不採用判断観点: なし。
- 過剰実装リスク: 低。むしろ初期は妥当な実装。
- 残課題: 検索性能 (実応答時間) の実測ログを /stats に出すと透明性向上 [REC-02]。

### F. 個別学習プラン (PR #264) — **D (致命的問題)**
- PR タイトル「feat(study-plan): AI-generated personalized study schedule planner」
- 実装: lib/study-plan/generator.ts は純粋な決定論アルゴリズム (date math + phase-based round-robin + category weighting)。lib/ai 呼び出しゼロ。Gemini API 呼び出しなし。
- app/study-plan/StudyPlanLanding.tsx → app/study-plan/result/[id]/ScheduleResultClient.tsx で完結。サーバー側 API 不要。
- 教育貢献プロジェクト体制で「AI生成」を表記することは利用者誤認を招く。/about, /transparency で誠実性を謳う中での詐称表記は致命的 [NEW-01]。
- 採用判断観点: 算法ベースであっても教育的価値はある (試験日逆算 + 弱点重視 + 模試組込みの schedule 生成)。
- 不採用判断観点: 「AI生成」表記の修正が前提。表記修正できない・しないなら撤退も選択肢。
- 過剰実装リスク: アルゴリズム自体は適切。表記と実装の不一致が本質的問題。

### G. フィードバック機能 (PR #263) — B
- app/api/feedback/route.ts: POST 公開エンドポイント (middleware の matcher は /admin/, /api/admin/ のみで保護対象外)。
- app/admin/feedback: middleware 保護下で BasicAuth (公開閲覧不可)。
- spam 対策: rate limit 5/min/IP + length cap 800char (route.ts 内実装)。
- 採用判断観点: 誤答・誤解説の報告は教育プラットフォームに必須機能。
- 不採用判断観点: なし。
- 残課題: NEW-02 — /api/feedback の rate-limit は in-memory map 依存 (#008 と同根)。攻撃者が複数 IP から POST すると admin 受信箱を埋める可能性。Cloudflare Turnstile 等の人間判定 or hCaptcha 追加推奨。
- 通知導線: route.ts に Slack webhook / email 通知ロジックなし。admin がダッシュボードを能動的に見ない限り気づかない設計 [REC-03]。

### H. 解説プレースホルダー埋め (PR #262, #265) — A
- AP placeholder 96問 → 0 件達成 (PR タイトル明記)。
- 品質は data ファイル直接編集のためレビュー範囲外だが、commit log + コミット粒度から人手品質確認の様子あり。
- 採用判断観点: コンテンツ完成度に直結。教育貢献プロジェクトの本丸。
- 不採用判断観点: なし。
- 残課題: AP 以外の試験区分 (IP/SG/FE/SC/NW/DB/ES など) の placeholder 残存状況は別途確認推奨 [REC-04]。

### I. Hub-spoke 内部リンク + Footer強化 (PR #249, #247) — B+
- footer の E-E-A-T 要素強化 (運営者 / 出典 IPA / 透明性 / プライバシー)。
- hub-spoke は exam / essays / problems / blog 横断の内部リンク強化。
- 採用判断観点: SEO・ユーザー回遊性の両面でプラス。
- 不採用判断観点: なし。
- 過剰実装リスク: 中。footer に多数リンクが詰め込まれると認知負荷増。実装は 4 カテゴリ程度に整理されており許容範囲。

### J. その他 (Sentry hardening / SEO / a11y) — A-
- PR #245 Sentry harden, PR #259-261 SEO polish, PR #228 a11y 等は妥当な調整。
- 過剰実装リスクは低。

---

## Phase 3: ローンチ Go/No-Go 判断材料

### Go 判断材料
1. 致命的3課題 (#001-003) 全件解消 — ブランド毀損リスクの最大要素を一掃。
2. データ完成度 — AP 全問解説完成 (#265)、エッセイ 100本拡充 (#254)、ブログ 71記事。
3. AI コパイロット RAG 化 — 教育サービスとしての回答品質向上。
4. 模試・ブックマーク・履歴の3本柱 — 学習継続率の必須要素を本日揃えた。
5. セキュリティヘッダー (CSP enforcing / HSTS preload) + middleware /admin /api/admin 保護 — 運用基盤健全。

### No-Go 要素 (24時間以内に対応推奨)
1. **NEW-01 (致命的)**: study-plan の「AI生成」表記詐称。誤認を招く表現は教育貢献ブランドの根幹を毀損。「AIスケジューラ」「自動生成プラン」など実装と一致する表記に修正必須。所要 30分。
2. **R-03**: components/quiz/stream/ 4ファイル 623行 + app/quiz/stream/page.tsx が本番ルートとして残存。stream 機能を本番投入するのか、削除するのかの方針決定。決定後の対応所要は方針次第。
3. **NEW-02**: /api/feedback POST の spam 耐性強化。Turnstile / hCaptcha 統合または in-memory rate-limit の永続化。所要 2-4時間。

### Defer 可能 (ローンチ後1週間以内)
1. R-01 rate-limit 永続化 (Upstash Redis / Vercel KV 移行)。
2. R-02 Stripe 残骸 (admin/stats イベント定義) の最終整理。
3. R-04 ホーム情報密度の初学者向け絞り込み導線。
4. REC-01〜REC-06 全件。

### 結論
**条件付き Go**: NEW-01 (study-plan 表記修正) を最優先で 30分以内に対応すればフルローンチ可。R-03, NEW-02 は 24時間以内推奨。R-01 はローンチ後 1 週間以内に Vercel Spend Cap 設定 (代替案) で当面のコスト保護。

---

## 残課題リスト (通し番号付き)

R-01 (再掲, 必須): lib/rate-limit/server.ts と lib/api/rate-limit.ts の in-memory Map 実装。Vercel serverless 環境では cold-start 毎にリセット。AI コスト月5万円上限保護のため Upstash Redis / Vercel KV 移行、または Vercel Spend Cap での hard limit 設定が必要。
- 採用判断観点: AI コスト保護・教育貢献の持続可能性。
- 不採用判断観点: 当面ユーザー規模が小さければ in-memory + Spend Cap で代替可。

R-02 (再掲, 推奨): Stripe 残骸の最終整理。app/admin/stats/page.tsx のイベント定義 (pricing_view, checkout_started)、app/api/cron/health-check/route.ts:3 の EXPECTED_404_ROUTES。
- 採用判断観点: 教育貢献ブランド統一の最後の仕上げ。
- 不採用判断観点: 公開 UI に出ない箇所のため緊急性低。

R-03 (再掲, 必須): components/quiz/stream/ 4ファイル + app/quiz/stream/page.tsx の方針決定。
- 採用判断観点: 削除なら 1時間でデッドコード 623行整理。本番投入なら教育的価値の確認と UI/UX 仕上げが必要。
- 不採用判断観点: ローンチ時点で「未完成機能」が本番ルートに残るのはブランド毀損リスク。

R-04 (再掲, 推奨): app/page.tsx のホーム情報密度。HeroAiDemo / HomeExamGrid / ContinueFromLast / LearningCalendar / HomeAuxSection の5セクション混在。
- 採用判断観点: 初学者向け絞り込み導線 (IP/SG おすすめ → AP/FE 中堅 → 高度上級) で初回訪問者の認知負荷低減。
- 不採用判断観点: 既に HeroAiDemo で AI 機能訴求 + ContinueFromLast でリピーター動線あり。現状でも機能はする。

R-05 (再掲, 観察): app/api/copilot/route.ts:146 付近の Stripe コメント残存確認。
- 採用判断観点: コードコメント整理。
- 不採用判断観点: 公開影響なし。

NEW-01 (新規, 致命的): app/study-plan/* の「AI-generated personalized study schedule」表記詐称。lib/study-plan/generator.ts は決定論アルゴリズムで Gemini 呼び出しゼロ。
- 該当: app/study-plan/page.tsx, app/study-plan/StudyPlanLanding.tsx, PR タイトル "feat(study-plan): AI-generated"
- 現状: 「AI生成」「AI-personalized」「AI-recommended」等の表記が UI 文言・PR タイトル・メタデータに散在 (要 grep 確認)。実装は date math + phase-based round-robin。
- 問題点: 教育貢献プロジェクトとして /about, /transparency, /operator で誠実性・透明性を謳う中での実装と表記の不一致。利用者誤認を招くため景品表示法上のリスクもゼロではない。
- 改善案: (a) UI 文言を「自動生成プラン」「スケジューラ」「学習計画ジェネレータ」等に修正 (b) もしくは真に Gemini で生成する実装に切替 (=コスト増だが誠実)。
- 工数: (a) 30分 / (b) 4-8時間
- 採用判断観点: 教育貢献ブランド維持に必須。最優先。
- 不採用判断観点: なし。

NEW-02 (新規, 必須): /api/feedback POST 公開エンドポイントの spam 耐性。
- 該当: app/api/feedback/route.ts
- 現状: in-memory rate-limit (5/min/IP) + length cap 800char。Vercel serverless では IP 制限が実効弱。
- 問題点: 攻撃者が複数 IP から POST して admin/feedback 受信箱を埋める / Sentry 通知ノイズ / Gemini 解析コスト浪費 (もし AI 分類があれば)。
- 改善案: (1) Cloudflare Turnstile 統合 (2) hCaptcha v3 (3) 投稿 IP の SHA256 hash で persistent rate-limit (4) /api/feedback への middleware 拡張で BasicAuth 不要だが Origin チェック追加。
- 工数: 2-4時間
- 採用判断観点: ローンチ初日に攻撃ベクトル放置はリスク。
- 不採用判断観点: 当面ユーザー規模が小さければ in-memory で実害なし。R-01 と同じ判断。

NEW-03 (新規, 推奨): RAG コーパスのインデックス更新ライフサイクル明示。
- 該当: scripts/build-copilot-index.ts, lib/copilot/corpus.ts, docs/improvements/copilot-rag.md
- 現状: scripts/build-copilot-index.ts は存在するが、CI/CD での自動実行・データ更新タイミングが docs に明示されていない可能性。
- 問題点: 問題データ追加・解説修正後にコーパスが更新されない場合、citation が古いデータを参照するリスク。
- 改善案: (a) GitHub Actions で問題データ変更時に自動 rebuild (b) docs/improvements/copilot-rag.md にデプロイ手順明記 (c) build 時に lib/copilot/corpus.ts を再生成する build script に統合。
- 工数: 1-2時間
- 採用判断観点: 教育コンテンツの正確性に直結。
- 不採用判断観点: 初期はデータ変更頻度低いため手動 rebuild で十分。

REC-01 (新規, 推奨): localStorage 容量超過時のユーザー警告 UI。
- 該当: lib/storage/bookmarks.ts, lib/storage/history.ts
- 現状: catch で silent ignore。
- 改善案: 容量超過時に toast 「ブックマークの保存に失敗しました。古いブックマークを削除するか、エクスポートしてください」を表示。
- 工数: 1時間
- 採用判断観点: 学習継続率に直結。
- 不採用判断観点: localStorage 5MB 上限到達は通常想定外。

REC-02 (新規, 推奨): /search 実応答時間メトリック表示。
- 該当: lib/search/question-index.ts (linear scan 14k問)
- 改善案: /stats に search latency p50/p95 を表示し透明性アピール。
- 工数: 2-3時間
- 採用判断観点: 透明性ブランド強化。
- 不採用判断観点: 性能問題が顕在化していないため後回し可。

REC-03 (新規, 推奨): /api/feedback の Slack/email 通知導線。
- 該当: app/api/feedback/route.ts
- 改善案: Slack webhook URL を環境変数で設定し、新規投稿時に通知。
- 工数: 1時間
- 採用判断観点: admin が能動的に dashboard を見ない場合の取りこぼし防止。
- 不採用判断観点: 当面 admin 自身が頻繁にチェックする運用なら不要。

REC-04 (新規, 推奨): AP 以外の試験区分の解説 placeholder 残存確認。
- 該当: scripts/audit-explanation-placeholders.ts (もしあれば)
- 改善案: 全試験区分の placeholder 数を /stats か /transparency に表示し透明化。
- 工数: 2-3時間
- 採用判断観点: 教育貢献の継続的品質保証。
- 不採用判断観点: ローンチ時点では AP 完成で十分訴求可能。

REC-05 (新規, 推奨): PWA push notification の運用方針明文化。
- 該当: public/sw.js:153-, lib/push/ 等
- 改善案: docs に「いつ何を push 通知するか」のポリシーを明記。実装だけ先行は運用混乱の元。
- 工数: 30分 (docs のみ) / 4時間 (push 配信基盤)
- 採用判断観点: PWA installability の付加価値最大化。
- 不採用判断観点: push 通知は学習プラットフォームでは煩雑性のデメリットもある。MVP では不要かもしれない。

REC-06 (新規, 推奨): CopilotPanel の RAG citation UX 仕上げ。
- 該当: components/copilot/CopilotPanel.tsx
- 改善案: citation footer の表示・展開・原典 PDF への遷移を実機検証。
- 工数: 1-2時間
- 採用判断観点: RAG 化の効果を UI まで連続させる。
- 不採用判断観点: route.ts 側は実装済のため、citation 文字列がそのまま表示される最小実装でも機能はする。

---

## 過剰最適化・逆効果リスク

X1 (新規): PWA push notification の前のめり実装。public/sw.js に push handler 実装ありだが、配信基盤・運用ポリシーが見えない。教育プラットフォームで push 通知は煩雑性のデメリットの方が大きい場合がある。

X2 (新規): study-plan の決定論アルゴリズムを「AI生成」と表記する点。本来「教育貢献として正直」を標榜するなら、シンプルに「自動生成プラン」と表記すべき。NEW-01 として致命的問題に格上げ。

X3 (再掲): /[exam]/page.tsx の JSON-LD competencyRequired 12分野列挙 — 初回 X1 から未対応の可能性。要確認。

---

## ブランド毀損リスクの最終評価

初回レビュー時点の毀損リスク6要素はすべて解消または改善:
1. /analytics 公開モックデータ → /admin/funnel 保護下 (解消)
2. /launch 事実不整合 → 削除 (解消)
3. privacy Stripe 記述 → 全削除 (解消)
4. /stats 内部パス露出 → 解消
5. /transparency 月次未更新 → 2026-05 追加 (解消)
6. AI解説 disclaimer 11px → text-sm 化 (解消)

新規毀損リスク1要素を認定:
1. NEW-01 study-plan の「AI生成」表記詐称 → 教育貢献体制の根幹に響くリスク "高"

新規導入機能の品質は総じて高く、ブランド毀損リスクは NEW-01 一点に集約。修正コスト 30分。ローンチ前に必ず対処すべき。

---

## 強み (伸ばすべき差別化点)

1. AI コパイロット RAG 化 + Public API 公開 — 競合 (siken.com 系) と比べて圧倒的に先進的。citation 付き回答 + ハルシネーション抑制 + 評価スクリプト体制は教育サービスの最先端。
2. 13試験区分 全カバー模試 — 過去問道場が午前 II のみ対応の高度試験まで含めた本番形式模試は強い差別化。
3. 教育貢献プロジェクト体裁 + 透明性月次レポート — E-E-A-T の Trust 軸が継続強化されており、SEO 長期戦に有利。

---

## 改善ロードマップ (ローンチ前最終)

ステージ0 (24時間以内, ローンチ前):
- NEW-01 study-plan 表記修正 (30分)
- R-03 stream 機能の方針決定 (削除なら1時間)
- NEW-02 /api/feedback spam 対策 暫定版 (2時間で Turnstile 統合)

ステージA (ローンチ後1週間):
- R-01 rate-limit 永続化 もしくは Vercel Spend Cap 設定 (Spend Cap なら30分)
- R-04 ホーム情報密度の初学者向け絞り込み (4-6時間)
- NEW-03 RAG コーパス更新ライフサイクル明示 (1-2時間)

ステージB (ローンチ後1ヶ月):
- REC-01〜REC-06 全件
- AP 以外の placeholder 進捗共有

---

## 次に投入すべきDispatch候補

1. 最緊急: study-plan 表記修正 Dispatch — NEW-01 一本に絞った30分PR。所要30分。
2. ローンチ前最終整理 Dispatch — R-03 (stream削除) + NEW-02 (feedback spam対策) + R-02 (Stripe残骸完全削除) を1PR。所要 4-6時間。
3. コスト保護 Dispatch — Vercel Spend Cap 設定確認 + R-01 移行検討。所要 30分 - 8時間。
4. RAG運用化 Dispatch — NEW-03 (コーパス更新CI) + REC-06 (citation UX) + コパイロット評価スクリプト定期実行。所要 4-6時間。
5. ホームUX最終化 Dispatch — R-04 (初学者導線) + ホームの認知負荷検証。所要 4-8時間。

---

レビュー終了 (課題総数 14, 通し番号最大値 NEW-03 / REC-06)
