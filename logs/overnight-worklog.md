# 夜間自律改善 ワークログ（done / SKIP / 未解決の記録）

> 各セッションはここを読んで「続き」を判断する。新しい記録は**末尾に追記**。
> 形式: `[YYYY-MM-DD HH:MM] STATUS タスク — 詳細 / コミットSHA / 検証`
> STATUS = done(完了) / SKIP(実害なし or 範囲外) / 未解決(検証落ち・次回送り)

---

## セッション0（セットアップ・人間起動）2026-05-30 早朝 JST

- done: 復元点作成 — タグ `pre-overnight-20260530`（→ `ea2ca69`）push 済 / 本番デプロイ `ipa-quiz-site-1pczwwevy`
- done: `overnight-integration` ブランチ作成・push
- done: ベースライン全緑確認（typecheck/lint err0/test 205・32files/build すべて PASS）
- done: 本番 curl 実測（home 200 / admin 401 / ip 2,381 / blog ip-nani 2,381）→ `logs/overnight-baseline.md`
- 申し送り（重要・過大修正の罠回避）:
  - **P0-① /admin**: 本番で既に 401。コードが 401 を返すなら done。503 起因が env/KV なら SKIP。
  - **P0-② blog 2,398**: 本番で既に 2,381・ソースに 2,398 不在（logs/test のみ）。→ **SKIP（解決済み）**。
  - 残る実作業: **P0-③ バッジトースト自動消滅の E2E 検証**、**P0-④ Q&A dateCreated TZ付きISO化**、その後 **P1 スイープ**。
  - 作業ツリーに未追跡ファイル（前セッションの logs/*.md, `scripts/ux-audit-screenshots.mjs`, CRLF差分の
    BookmarkButton snap）あり。**これらをコミットに巻き込まない**こと。`git add <対象ファイルのみ>` で限定する。

---

## セッション1 以降（夜間ループが追記）
<!-- 以降、各セッションがここに done/SKIP/未解決 を追記していく -->

## セッション1 2026-05-30 05:42 JST
- done: P0-④ Q&A JSON-LD の日付を JST TZ付き ISO8601 化 — `lib/seo/question-jsonld.ts` に
  `toJstDateTimeISO()` を追加し dateCreated/datePublished/dateModified を `+09:00` 付与。
  / コミット `074fd8c` / 検証: typecheck・lint(err0)・test 205緑・build 全緑。
  `.next/server/app/q/ap/2024-autumn/am/q1.html` を grep し `dateCreated:"2024-10-21T00:00:00+09:00"`
  等 TZ付き出力を実測。e2e qa-schema.spec の日付正規表現(末尾アンカー無し)は影響なし。
- SKIP(実害なし): P0-① /admin 503→401 — `middleware.ts` のロジックは正。503 は
  `ADMIN_BASIC_USER`/`ADMIN_BASIC_PASS` env 未設定時のみの明示分岐(「未構成」を示す設計通り)。
  env 設定済みの本番は未認証で 401 を返す(セッション0 baseline で 401 実測済)。コード修正不要。
- done: P0-③ バッジトースト自動消滅の修復(実バグ発見) — `AchievementToast` の自動消滅 effect が
  `onClose` 同一性に依存。親 `QuizPlayer` の経過時間 `setInterval(1秒)` 再レンダーごとに inline onClose が
  新参照になり 5秒タイマーが毎秒リセットされ永遠に未発火 → トーストが回答後コントロールを覆い続けていた。
  onClose を ref 化し消滅タイマーを `paused` のみ依存に修正。/ コミット `536d9d1`
  / 検証: typecheck・lint(err0)・test 205緑・build 全緑。本番ビルドへ Playwright(`badge-toast-overlap.spec.ts`)
  に自動消滅回帰テストを追加し 4件緑。**修正前は当該E2Eが落ちることを実測**(ユニットは安定onCloseで通過=見逃し)。
- SKIP(ソース不在・デプロイ stale 起因): P0-② blog 2,398→2,381 — `{app,components,lib,data,content}` を
  glob grep し `2,398`/`2398` の実在ゼロを実測確認。コードに無いため夜間(コード)では直せない。
- → **P0 すべて done/SKIP 完了**。以降は P1 スイープへ。
- SKIP(実害なし): P1 領域1 ホーム `app/page.tsx` 一巡 — metadata 網羅(title/desc/canonical/OG/twitter)、
  問題数は SSOT(`question-counts.ts`/`exam-question-counts.ts`)由来、JSON-LD(WebSite/Org/ItemList)妥当、
  CTA レイアウトシフト対策コメント済。実害ある所見なし。
- SKIP(実害なし): P1 領域9 エラー/404 `app/error.tsx`・`app/not-found.tsx` 点検 — 両者とも
  next-action(再試行/トップ/問題を解く/試験区分リンク)、error は Sentry capture + エラーID 表示あり。良好。
  (補足: 404/error フッターの text-xs リンクはタップ領域がやや小さめだが低トラフィック2次導線のため夜間は SKIP)

## セッション1 まとめ
- 実改善2件(P0-④ JSON-LD TZ / P0-③ トースト自動消滅バグ修復=実バグ発見) + 検証SKIP4件。
- 次セッションへ: P1 領域2「問題ページ /q」から再開(領域1/9 は一巡 done)。

## セッション2 2026-05-30 05:54 JST（P1 領域2「問題ページ /q」スイープ）
- done: /q の死蔵 `opengraph-image.tsx` 削除 — generateMetadata が openGraph.images に
  `/api/og?type=question` を明示指定しており、ビルド成果物の og:image は全 /q ページで
  `/api/og` を指す。file-based の `opengraph-image.tsx` は上書きされ HTML から一切参照されない
  死蔵ルート(かつ日本語フォント未読込で潜在的に豆腐化リスク)。/ コミット `2f2f4cf`
  / 検証: typecheck/lint(err0)/test 205緑/build 全緑。ビルド後 .next を実測し当該ルート消滅・
  q1.html の og:image は `/api/og` のまま不変、HTML が opengraph-image を参照する件数=0 を確認。
- done: 年度別一覧 `/[exam]/[yearSeason]` に OG 画像付与 — `summary_large_image` を宣言しつつ
  openGraph.images も twitter.images も無く、SNS で画像なしカードだった(兄弟 /[exam] は画像あり)。
  `/api/og?type=exam` パターンで付与。/ コミット `b2f09ef`
  / 検証: 全緑。ビルド後 `ap/2024-autumn.html` を実測し og:image・twitter:image が `/api/og?type=exam` を指すことを確認。
- done: 分野別一覧 `/[exam]/topic/[topicSlug]` に OG 画像付与 — 同じ画像欠落バグ。
  `/api/og?type=topic` で付与。/ コミット `14ae850`
  / 検証: 全緑。ビルド後 topic ページ HTML を実測し og:image=`/api/og?type=topic&…` を確認。
- done: 共有/比較ページ2件に OG 画像付与 — `/og/streak/[days]`(連続学習共有専用ページ・影響大)に
  `/api/og?type=streak&streak={日数}`、`/why-kakomon-ai`(比較ページ)に `/api/og?type=feature`。
  / コミット `9be109b` / 検証: 全緑。why-kakomon-ai.html を実測し og:image=`/api/og?type=feature`。
  streak は動的ルートのため本番ビルドを localhost 起動し /og/streak/7 を curl、
  og:image=`/api/og?type=streak&…&streak=7` を実測。
- SKIP(実害なし/範囲外): `/[exam]/afternoon` 系2ページは twitter card 自体を宣言しておらず
  「画像欠落の壊れたカード」ではない(metadata は title/desc/canonical のみ)。OG 追加は機能追加で
  あり、かつ「練習用オリジナル問題」の低優先ページのため夜間は SKIP。
- SKIP(実害なし): /q 本体ページの `crossExamByTopic` は ALL_QUESTIONS(~14k) を毎レンダー走査するが
  ISR(revalidate=86400)でキャッシュされ TTFB 実害なし。same-exam リストは既に examPool 最適化済。

## セッション2 まとめ
- 実改善4件(OG 画像系: 死蔵ルート削除1 + 画像欠落カード修復3=計4ページ4区分) + SKIP2件。
- app 配下の `summary_large_image` without image 一掃完了(残ゼロを grep 実測)。
- 次セッションへ: P1 領域2「/q」のうち SEO/OG は一巡。次は領域2の A11y/パフォーマンス観点、
  または領域3「クイズ /quiz」へ。

## 2026-05-30 セッション記録（最終・正）
- 着手予定だった P1 領域4「情報系ページ OG 画像」は **対応不要（既に充足）** と判明。
  - /about, /contact, /privacy: openGraph に images が **既に存在**（about は ABOUT_OG_URL 等の定数経由）。
  - /terms: openGraph 自体を定義しておらず root layout の既定 OG 画像(/api/og)を継承するため問題なし。
  - /guide: ページ自体が存在しない（app/guide/page.tsx なし）。
  → 当初の「全5ページで OG 画像欠落」という監査は誤り（出力チャネル不安定時の壊れた読取りに基づく）。撤回。
- 全緑ゲート実測（ベースライン＝コード変更なしの状態）:
  typecheck=0 / lint=0（警告1件・既存の scripts/ux-audit-screenshots.mjs のみ）/ test=205 passed(32 files) / build=0。
  → **pnpm test は正常**（前セッション内で一時的に書いた「破損」記述は誤り。vitest.config は ./vitest.setup.ts を参照）。
- 本セッションはツール出力チャネルが激しくバースト/バッファ化し効率が著しく低下。**コード変更は無し**（行う必要がなかった）。
- 既存の未コミット M(snapshot/bat) は本セッションと無関係。ルート直下の不正名一時ファイル(tmp_snapdiff)は削除済。
- 次セッションへ: 領域4 は完了扱い。backlog の次の P1（A11y/パフォーマンス・/quiz 改善 等）へ進むこと。

## セッション3 2026-05-30 06:34 JST（P1 領域3〜8 A11y/SEO スイープ）
- done: 領域4「/challenge」A11y — デイリーチャレンジに解答結果の SR 通知を追加（実バグ=A11y欠落）。
  `/quiz`(QuizPlayer)・`/q`(QuestionAnswerCard) には正誤を伝える `role="status" aria-live="polite"`
  の sr-only 領域があるが `DailyChallengeClient` には無く、SR 利用者は解答後に正解/不正解を聞けなかった
  （視覚的バナー「正解！」「不正解（正解は X）」のみ・aria-live 外）。同一パターンの sr-only live 領域を
  追加。/ コミット `c0ac6cf` / 検証: typecheck=0・lint(err0, 既存ux-audit警告1のみ)・test 208緑(205+新規3)・
  build 全緑。新規テスト `__tests__/components/DailyChallengeClient.test.tsx`（正解/不正解/未解答の3ケース）が
  **修正前は status role 不在で3件とも落ちる**ことを git stash で実測（崩れたら落ちる検証）。
- SKIP(実害なし・既に充足): 領域5「/search」SEO/metadata — title/description/canonical 網羅、
  `role="search"`・label・facet の aria-pressed・sort の sr-only label・結果 ul の listitem 等 A11y 良好。
- SKIP(夜間は安全側・要日中判断): 領域5「/search」検索結果コンテナの aria-live 過剰通知 — 成功時の
  `<section aria-label="検索結果" aria-live="polite">`(SearchClient.tsx:980) が **結果 ul 全体**を包むため、
  キー入力デバウンス毎に最大~20件のスニペットを SR が読み上げる anti-pattern の懸念。ただし修正（count のみ
  live 化等）は通知消失の回帰リスクがあり、E2E での実測検証も困難。理論先行で実害確定に至らないため夜間は
  SKIP。**日中/人間レビューで対応を判断する候補**として記録（loading/empty 分岐の短文 live は適切）。
- SKIP(実害なし): 領域6「/mock-exam」MockExamRunner — タイマー集計(prevIndexRef)・再開(resumeFrom)・
  提出 confirm・回答状況グリッド aria-label・結果ビューの progressbar/aria-label 群すべて妥当。
  選択肢は単一選択だが aria-pressed トグルボタンで実装（radiogroup でないが許容範囲）。
- SKIP(実害なし・既に充足): 領域7「/account」robots — `app/account/layout.tsx` が `robots:{index:false}` を
  宣言し子ルート（badges/notifications/tutor/weakness/api-keys）も継承（Next.js metadata マージで robots 保持）。
- SKIP(実害なし・既に充足): 領域8「/blog」「/blog/[slug]」SEO — metadata 網羅・OG画像(/api/og?type=blog)・
  JSON-LD(@graph: Article/LearningResource/BreadcrumbList、howto は条件付き)・パンくず・関連記事/関連過去問・
  print 用出典すべて完備。外部リンクは全て rel="noopener noreferrer"（全 .tsx を grep 実測、漏れゼロ）。

## セッション3 まとめ
- 実改善1件（/challenge A11f SR通知欠落=実バグ修復、テスト3件付き）+ 監査 SKIP 6件（領域5,6,7,8）。
- 領域3〜8 を A11y/SEO 観点で一巡。コードは総じて成熟・高品質。明確な実害は /challenge の1件のみ。
- 次セッションへ: 領域3〜8 は一巡 done。残候補は (a)/search aria-live 過剰通知(日中判断)、
  (b)パフォーマンス観点（不要 "use client" 削減・bundle）の精査、(c)2周目で前回 SKIP の再評価。

## セッション4 2026-05-30 06:43 JST（2周目: 前回SKIP再評価 + パフォーマンス）
- done: 【前回SKIP再評価→実改善】領域5「/search」結果リストの冗長 aria-live 読み上げを是正。
  `ResultsPanel` の成功時 `<section aria-label="検索結果" aria-live="polite">` が結果 `<ul>`(最大~20件)
  全体を包んでおり、デバウンス入力ごとに全ヒット項目を SR が再読する anti-pattern だった
  （セッション3で「日中判断候補」としてSKIPしていた件）。section から aria-live を外し、件数のみを
  伝える sr-only `role="status" aria-live="polite"` 領域へ置換。件数通知は維持しつつ全項目の再読を解消。
  ローディング/0件分岐の短文 live はそのまま（適切）。/ コミット `235c07f`
  / 検証: typecheck=0・lint(err0, 既存ux-audit警告1のみ)・vitest 208緑・build 全緑。
  本番ビルドへ Playwright `user-journey-search.spec.ts` を実行し全14件緑。新規回帰テスト
  「結果コンテナが live region でない／件数 status が存在する」を追加（aria-live 復活＝崩れたら落ちる）。
- SKIP(実害なし・既に成熟): パフォーマンス観点「不要 "use client" 削減」— Explore で leaf 系を中心に走査も、
  "use client" 付きファイルは概ね hooks/イベント/framer-motion/ブラウザAPI を実使用しており死蔵ディレクティブ
  なし。純粋プレゼンテーション系（AiContentNotice 等多数）は既に server component として正しく実装済。
  唯一の境界候補 VercelAnalyticsWithPrivacy も third-party client wrapper の境界マーカーで適切。撤去対象ゼロ。
- done: 【実バグ修復】`FireworksBurst` の自動クリアタイマーが毎秒リセットされ発火しない不具合。
  親 QuizPlayer が経過時間 `setInterval(1秒)` で毎秒再レンダーし `onDone={() => setBurst(null)}` を
  inline で渡すため、effect 依存 `[active, duration, onDone]` の onDone 参照が毎秒変化→タイマー張り直し。
  「big」バースト(0.95s*1000+100=1050ms)は 1000ms 間隔より長く発火前に reset され続け、burst 状態が
  解除されず不可視オーバーレイ＋自走タイマーがセッション中残留（セッション1の AchievementToast と
  同じ stale-closure クラス＝同一修正パターン）。onDone を ref 化し依存を `[active, duration]` に限定。
  / コミット `f60ce8f` / 検証: typecheck=0・lint(err0)・vitest 211緑(208+新規3)・build 全緑。
  新規 `__tests__/components/FireworksBurst.test.tsx`（fake timer、再レンダーでタイマー不リセット）を追加し、
  **修正前は当該回帰テストが「got 0 times」で落ちる**ことを実測（崩れたら落ちる検証）。

## セッション4 まとめ
- 実改善2件（/search 冗長 aria-live 是正=前回SKIP再評価 / FireworksBurst 自走タイマー実バグ修復）+ SKIP1件（"use client"）。
- セッション1で見つけた stale-closure タイマーの同型バグが FireworksBurst にも潜んでいたのを発見・修復。
- 次セッションへ: 2周目継続。残候補は (c)他の SKIP 再評価、stale-closure 同型パターンの他コンポーネント横展開確認
  （MilestoneToast は親 StreakTracker が高頻度再レンダーしないか要確認）、bundle/ISR 観点の精査。
