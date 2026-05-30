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

## セッション5 2026-05-30 07:00 JST（午後採点プレイヤー A11y + stale-closure 横展開確認）
- SKIP(横展開確認 done・追加バグなし): stale-closure タイマー同型パターンの他コンポーネント精査。
  components/ 配下の setTimeout/setInterval を全件 grep。コールバック prop に依存する自動消滅 effect は
  AchievementToast(S1修復)・FireworksBurst(S4修復)の2件のみで、いずれも修復済。CopilotPanel の
  toast は `toastTimerRef`(ref)で正しく実装。コピー系 setTimeout(copied リセット)はコールバック非依存で安全。
  CouponTracker/BadgeTracker の setInterval(30s)はコールバック非依存。AfternoonPlayer/QuizPlayer の
  経過時間 setInterval は updater 関数のみで安全。MilestoneToast は存在せず（worklog の推測は的外れ）。
  → stale-closure 同型バグの残存ゼロを実測確認。横展開 done。
- done: 【実バグ=A11y欠落】午後 AI 採点フォーム `AfternoonPlayer` の解答 textarea が字数制限違反時に
  `aria-invalid` を立てるのみで理由を説明せず、SR 利用者は字数制限の存在も現在文字数も知れなかった
  （WCAG 3.3.1 Error Identification 不足）。字数カウンタ span に `id` を付与し、制限のある設問の textarea から
  `aria-describedby` で参照（制限なし設問には付与しない）。/ コミット `7c01068`
  / 検証: typecheck=0・lint(err0, 既存ux-audit警告1のみ)・vitest 213緑(211+新規2)・build 全緑。
  新規 `__tests__/components/AfternoonPlayer.test.tsx`（aria-describedby が存在/idref が実在/制限なし設問は付与なし）
  を追加し、**aria-describedby 行を外すと当該テストが落ちる**ことを実測（崩れたら落ちる検証）。
  ※ AfternoonPlayer は午後AI採点(C軸差別化)の中核プレイヤー（`/[exam]/afternoon/[year]/[season]`）。
- done: 【実バグ=ARIA誤用】`AfternoonResultView` の業種別模範論述セレクタが
  `role="tablist"`/`role="tab"`/`aria-selected` を使うが、矢印キーのローピング tabindex も
  `aria-controls` も `tabpanel` も無く、WAI-ARIA タブパターンの暗黙契約を満たさないまま「タブ」を
  名乗っていた。codebase 既定のセグメント UI 慣用（mock-exam / 成功事例フィルタ等の `aria-pressed`
  トグルボタン）に統一し `role="group"` + `aria-pressed` へ是正。見た目・クリック挙動は不変。
  / コミット `92da152` / 検証: typecheck=0・lint(err0)・vitest 215緑(213+新規2)・build 全緑。
  新規 `__tests__/components/AfternoonResultView.test.tsx`（tab ロール不在/aria-pressed 初期状態/
  クリックで pressed と模範論述が切替）を追加し、**修正前は2件とも落ちる**ことを git stash で実測。
- done: 【実バグ=ラベル欠落】`EssayEditor` の論述 textarea（設問ア/イ/ウ）が CardTitle「設問X」と
  プログラム的に紐づかず、アクセシブルネームを一切持たない裸のコントロールだった（SR 利用者は
  どの設問の入力欄か聞けない＝WCAG 4.1.2/3.3.2 違反）。`aria-label="設問Xの論述"` を付与し、
  字数目安 span に id を付けて `aria-describedby` で参照。/ コミット `0dbd063`
  / 検証: typecheck=0・lint(err0)・vitest 216緑(215+新規1)・build 全緑。新規
  `__tests__/components/EssayEditor.test.tsx`（3 textarea が aria-label を持ち describedby idref が実在）を
  追加し、**修正前は落ちる**ことを git stash で実測。※ EssayEditor は論文添削(C軸/フェーズ4)の中核。
- done: 【実バグ=ラベル未関連付け】`StudyPlanClient`（/account/study-plan 学習プラン生成）の
  「受験する試験」`<select>` と「試験日」`<input type="date">` が、可視ラベルテキストは持つが
  `htmlFor` で関連付いておらず（label が wrap も htmlFor もしていない）、アクセシブルネーム不在だった
  （WCAG 1.3.1/4.1.2）。codebase 既定の `label[htmlFor]` + `control[id]` 方式で関連付け。
  / コミット `174fa2f` / 検証: typecheck=0・lint(err0)・vitest 218緑(216+新規2)・build 全緑。
  新規 `__tests__/components/StudyPlanClient.test.tsx`（getByLabelText で select/date を取得）を追加し、
  **修正前は2件とも落ちる**ことを git stash で実測。
- SKIP(他 select は適切): `<select>` 全6箇所を grep 監査。SearchClient(sr-only label+htmlFor)・
  NotificationSettings(htmlFor)・MockExamLanding(aria-label+wrap)・RankingClient(wrap label) は
  関連付け済。StudyPlanの2件のみ欠落していた（上記で修復）。
- SKIP(daytime候補・実害は限定的): `components/ui/tabs.tsx` の tab プリミティブは `aria-controls`+
  `role="tabpanel"`+`aria-labelledby` を持つ正当な実装だが、矢印キーのローピング tabindex 操作が未実装
  （WAI-ARIA APG 推奨）。各 tab は button でフォーカス可能・Tab キーで移動でき activate も動くため
  実害は限定的。アプリ横断で使われるため挙動変更は影響範囲が広く、夜間は安全側で SKIP。日中に矢印キー
  対応を検討する候補。

## セッション5 まとめ
- 実改善4件（A11y）+ SKIP3件（横展開確認/他select適切/tabsプリミティブ）。
  1. AfternoonPlayer: 字数制限を aria-describedby で SR 伝達（`7c01068`）
  2. AfternoonResultView: 壊れた tab パターン→aria-pressed トグルに是正（`92da152`）
  3. EssayEditor: 論述 textarea にアクセシブルネーム付与（`0dbd063`）
  4. StudyPlanClient: select/date のラベル関連付け（`174fa2f`）
- テーマ: フォームコントロールのアクセシブルネーム/ラベル欠落の一掃（午後採点・論文添削=C軸中核 + 学習プラン）。
  stale-closure 同型バグの横展開確認も完了（残存ゼロ）。
- 次セッションへ: 「裸のフォームコントロール/誤 ARIA」観点は主要画面を一巡。残候補は
  (a)tabsプリミティブの矢印キー対応(日中)、(b)他コンポーネントの aria-describedby/エラー説明の拡充、
  (c)パフォーマンス(bundle/ISR)観点の精査、(d)これまでの SKIP の再評価3周目。

## セッション6 2026-05-30 07:17 JST（placeholder-only 入力欄のアクセシブルネーム一掃 = S5 の残り）
- done: 【実バグ=ラベル欠落】`FeedbackGateModal` のコメント textarea が placeholder のみで
  アクセシブルネームを持たず、SR 利用者は用途を把握できなかった（placeholder はラベル代替に
  ならない / WCAG 4.1.2）。`aria-label` を付与。フィードバック駆動の無料枠解放フロー(§9 中核 UI)。
  / コミット `67da928` / 検証: typecheck=0・lint(err0, 既存ux-audit警告1のみ)・vitest 219緑(218+新規1)・
  build 全緑。新規 `__tests__/components/FeedbackGateModal.test.tsx`（getByLabelText で textarea 取得）を
  追加し、**aria-label を外すと落ちる**ことを git stash で実測（崩れたら落ちる検証）。
- done: 【実バグ=ラベル欠落】`AfternoonGradingDemo`（/demo/afternoon 午後AI採点デモ）の解答 textarea が
  placeholder のみでアクセシブルネーム不在だった（EssayEditor 等は対応済なのにデモは欠落）。`aria-label="解答を入力"`
  を付与。C軸差別化の体験デモ。/ コミット `a4d62a3` / 検証: typecheck=0・lint(err0)・vitest 220緑(+新規1)・
  build 全緑。新規 `__tests__/components/AfternoonGradingDemo.test.tsx` を追加し、**git stash で落ちる**ことを実測。
- done: 【実バグ=ラベル欠落】`MetricsDashboard`（/admin/metrics）のカスタム期間ピッカーの2つの date input
  （開始/終了）がアクセシブルネーム不在で、SR 利用者はどちらの日付か判別できなかった（WCAG 4.1.2）。
  `aria-label="集計開始日"/"集計終了日"` を付与。/ コミット `195dc49` / 検証: typecheck=0・lint(err0)・
  vitest 222緑(+新規2)・build 全緑。新規 `__tests__/components/MetricsDashboard.test.tsx`（`buildMockMetrics`
  で range="custom" の initial を構築、マウント時 fetch は vi.stubGlobal で永久pending化して無害化、
  getByLabelText で2 input を取得）を追加し、**git stash で2件とも落ちる**ことを実測。
  ※ 当初「admin は低impact・テスト足場が重い」と判断したが、既存 `lib/admin/metrics/mock-data.ts` の
  `buildMockMetrics` で軽量にテスト可能と判明したため実施。
- SKIP(実害なし・既に充足): components/ の placeholder 付き input/textarea を全件監査（10ファイル）。
  QuestionFeedback(label htmlFor)・QuestionCommentBox(sr-only label htmlFor)・CopilotPanel(aria-label 多数)・
  EmailLeadCapture(aria-label)・TagInput(aria-label)・SearchClient/EssayEditor/AfternoonPlayer は対応済。
  欠落は上記3件のみで全て修復。→ placeholder-only な裸入力欄の残存ゼロを実測確認。
- SKIP(実害なし・既に安全): 外部リンク `target="_blank"` を全 .tsx で grep 監査。全箇所が
  `rel="noopener noreferrer"`（または noreferrer 単独=noopener を包含、affiliate は +sponsored）を持ち、
  reverse tabnabbing 等のリスクなし。修正対象ゼロ。

## セッション6 まとめ
- 実改善3件（A11y: フォームコントロールのアクセシブルネーム欠落の最終一掃）+ SKIP2件（入力欄全件監査/外部リンク監査）。
  1. FeedbackGateModal: コメント textarea に aria-label（`67da928`）
  2. AfternoonGradingDemo: 解答 textarea に aria-label（`a4d62a3`）
  3. MetricsDashboard: カスタム期間 date input 2件に aria-label（`195dc49`）
- S5 で始めた「裸のフォームコントロール一掃」をアプリ全体で完了（placeholder-only / 未関連付け の残存ゼロを実測）。
- 次セッションへ: フォームコントロールのアクセシブルネーム観点は **完全に一巡 done**。残候補は
  (a)tabsプリミティブの矢印キー対応(日中判断)、(b)パフォーマンス(bundle/ISR/N+1)観点の精査、
  (c)エラー説明/空状態の充実(aria-describedby のエラー文言拡充)、(d)これまでの SKIP 再評価。

## セッション7 2026-05-30 07:30 JST（ステータスメッセージ live region + stale-closure 横展開の lib/app 監査）
- done: 【実バグ=A11y欠落 WCAG 4.1.3】`EmailLeadCapture`（ホームのメール登録フォーム＝ユーザー獲得の中核導線）の
  送信結果トースト（成功/重複/失敗）が role/aria-live を一切持たず、かつ `{toast && <div>}` の条件付き
  マウント（live region が後から DOM 挿入される＝読み上げが不確実な anti-pattern）だったため、SR 利用者は
  登録の成否を全くフィードバックされなかった。home/footer 両 variant のトーストを **常設の
  `role="status" aria-live="polite"` live region** 化し、文言のみを出し入れする方式（codebase 既定の
  `ShareButtons.tsx:101-111` と同一の gold-standard パターン）に統一。視覚表示・レイアウトは不変。
  / コミット `8ac8960` / 検証: typecheck=0・lint(err0, 既存 ux-audit 警告1のみ)・vitest 223緑(222+新規1)・
  build 全緑。新規 `__tests__/components/EmailLeadCapture.test.tsx`（fetch を error 応答に stub し送信、
  結果文言が role="status"/aria-live="polite" の live region に反映されることを検証）を追加し、
  **修正前は `getByRole("status")` が見つからず落ちる**ことを git stash で実測（崩れたら落ちる検証）。
- SKIP(横展開確認 done・追加バグなし): stale-closure タイマー同型バグ（S1 AchievementToast / S4 FireworksBurst）の
  **lib/ と app/ への監査拡張**。S5 は `components/` のみ grep していたため `lib/streak/MilestoneToast.tsx` を
  見落としていた（S5 の「MilestoneToast は存在せず」は誤り＝**訂正**）。MilestoneToast は
  `useEffect(()=>{const t=setTimeout(onClose,8000);...},[onClose])` の同型形だが、親 `StreakTracker` は
  `toast` state 変化時のみ再レンダー（QuizPlayer のような経過時間 setInterval(1秒) の毎秒 setState を持たない）
  ため、表示中に onClose 参照が変わらず **タイマーは実際には発火する＝現状実害なし（latent のみ）**。
  lib/streak の StreakBadge(60s interval, callback非依存)・app/ の各 setTimeout/setInterval も
  全て callback非依存 or 関数updaterで安全。→ 同型「実害ある」バグの残存ゼロを確認。
  ※ MilestoneToast は過去2回実害化したクラスと同型のため、日中に防御的 ref 化を検討する候補として記録。
- SKIP(低/無害・日中候補): コピーボタンのコピー完了通知。`ReferralClient`/`QuizPlayer`(結果URLコピー)/
  `StreamSummary`/`SessionSummaryDialog`/`SocialShare`/`StreakCouponCard` はボタン自身のラベルを
  「コピー」→「コピーしました」に切替える方式で、SR への明示的アナウンスは無い（一方 `ShareButtons` は
  専用 sr-only live region で通知＝gold-standard）。ただしユーザーが直前に押した当該ボタン上の視覚変化で
  確認でき実害は限定的。6箇所への横展開は範囲が広く夜間は安全側で SKIP。日中に ShareButtons パターンへ統一を検討。
- SKIP(実害なし・既に成熟): 他のステータスメッセージ／aria-invalid フォーム監査。`ContactForm`(email/body)・
  `SchedulePlanner`(試験日)・`QuestionCommentBox`・`EmailSignInForm` は全て `aria-describedby`＋role="alert"
  で誤り文言を関連付け済。`app/settings/page.tsx` のトーストも role="status"/aria-live 保有。
  カスタムダイアログ（KeyboardShortcutsHelp・QuizPlayer の KeyboardShortcutHelp[inline 非modalで aria-modal=false 適切]・
  FeedbackGateModal[radix DialogContent]）も Escape/aria-modal/ラベルを適切に処理。raw `<img>` 2件とも alt 保有。
  → EmailLeadCapture が唯一の「role 完全欠落」outlier だった（上記で修復）。

## セッション7 まとめ
- 実改善1件（EmailLeadCapture: 送信結果を SR 通知＝WCAG 4.1.3 status messages 欠落の修復・テスト1件付き `8ac8960`）
  + SKIP3件（stale-closure lib/app 横展開監査=MilestoneToast 訂正・latent のみ / コピーボタン通知=日中候補 / 他フォーム&ダイアログ監査=成熟）。
- テーマ: 「ステータスメッセージ（成功/失敗の動的通知）の SR 可視性」観点でアプリを一巡。
  唯一 role 完全欠落だった EmailLeadCapture を gold-standard（ShareButtons の常設 live region）に統一。
- 次セッションへ: 残候補は (a)tabsプリミティブ矢印キー(日中)、(b)コピーボタン通知の統一(日中)、
  (c)MilestoneToast 防御的 ref 化(日中)、(d)パフォーマンス(bundle/ISR/N+1)観点の精査、(e)これまでの SKIP 再評価4周目。

## セッション8 2026-05-30 07:40 JST（内部リンク切れ＝indexable ページからの 404 リンク一掃）
- done: 【実バグ=SEO 内部リンク切れ】トピック索引 `/topics` の「その他のトピック」節が
  getAllTopics()（全74）をリンクするが、`/topics/[slug]` の generateStaticParams は
  getHubTopics(80,4)（count>=4 のハブ71のみ）+ dynamicParams=false だったため、ロングテール3件
  （事業継続マネジメント/変更管理/問題管理）が索引からリンクされているのに 404 を返していた。
  静的生成を getAllTopics() に揃えて索引のリンク先=生成セットを一致。dynamicParams=false は維持
  （実在しないスラッグは従来どおりハード404）。/ コミット `a0e0f16`
  / 検証: typecheck0/lint0/test224緑/build緑。.next 実測で74件全 prerender・旧404の3件が実コンテンツ
  付き HTML 出力を確認。回帰テスト `__tests__/seo/topics-static-params.test.ts`（generateStaticParams が
  getAllTopics 全件網羅。修正前は3件欠落で落ちることを git stash で実測）。
- done: 【実バグ=リンク切れ】試験ハブ `app/[exam]/page.tsx` の午後AI採点「Coming Soon」節の
  「通知設定」リンクが `/account/notifications`（page.tsx 不在＝404。NotificationSettings は /settings に描画）
  を指していた。実在する `/settings#notifications`（id="notifications" アンカー）へ修正。/ コミット `98d2cc9`
  / 検証: typecheck0/lint0/test226緑/build緑。.next 実測で db/es/nw 等の高度試験ハブが /settings#notifications を
  リンク・旧 /account/notifications がビルド成果物から消失を確認。回帰ガード
  `__tests__/navigation/no-dead-internal-links.test.ts`（page.tsx 不在ルートへ app からリンクしないこと。修正前は落ちる）。
- done: 【実バグ=SEO 内部リンク切れ・最大規模70件】`/glossary`(54/66) と `/keywords/[keyword]`(16/29) が
  編集データ relatedTopics タグを `/topics/{slug}` へ直リンクしていたが、これらタグの多くはどの問題にも
  未付与で getAllTopics() に不在 → dynamicParams=false の /topics/[slug] で 404。共通ヘルパ
  `topicLinkHref()`（lib/seo/topics.ts）を新設し、ハブが在るタグは /topics、無いタグは /search?q={tag}
  （実在ルート・当該語の検索）へフォールバックさせて 404 を解消。ハブ在りタグの挙動・見た目は不変。
  / コミット `cff75d9` / 検証: typecheck0/lint0/test229緑/build緑。.next 実測で glossary.html の
  /topics/XSS・/topics/OWASP が /search?q= へ、keywords/ai-copilot の /topics/AI が /search?q=AI へ移行を確認。
  回帰テスト `__tests__/seo/topic-link-href.test.ts`（curated relatedTopics が /topics へリンクするなら必ず
  実在＝404ゼロ。helper を /topics 固定に壊すと3件落ちることを実測）。
- SKIP(実害なし・code clarity のみ): `app/api/admin/deployment-status/route.ts` 等の
  `dynamic="force-dynamic"` + `revalidate=0` 併記。force-dynamic が優先され revalidate は無視されるため
  ランタイム影響ゼロ。過大修正の罠回避で SKIP。
- SKIP(残存ゼロ・監査 done): components/ 配下の静的内部リンク全数監査（Explore）— 上記以外の
  dead link は発見されず。/q ページの /topics リンクは問題の topicTags 由来で getAllTopics に必ず存在＝安全。

## セッション8 まとめ
- 実改善3件（すべて indexable ページからの 404 内部リンク切れ。計 70+4=74 件規模のリンク切れを解消）+ SKIP2件。
  1. /topics 索引のロングテール3件の 404 リンク（`a0e0f16`）
  2. 試験ハブの「通知設定」/account/notifications→/settings（`98d2cc9`）
  3. /glossary・/keywords の relatedTopics 70件の存在しない /topics リンク→/search フォールバック（`cff75d9`）
- テーマ: 「indexable ページからの内部リンク切れ（404）」観点でアプリを一巡。クロールバジェット浪費・UX 不良の実害を解消。
- 次セッションへ: 内部リンク切れ観点は一巡 done（残存ゼロを Explore で確認）。残候補は
  (a)tabsプリミティブ矢印キー(日中)、(b)コピーボタン通知統一(日中)、(c)MilestoneToast 防御的 ref 化(日中)、
  (d)パフォーマンス(bundle/ISR/N+1)観点、(e)SKIP 再評価4周目。

## セッション9 2026-05-30 08:11 JST（robots.txt × SNS og:image / sitemap・orphan 監査）
- done: 【実バグ=SNS シェア画像がサイト全体で欠落】`app/robots.ts` の `Disallow: /api/` が、
  全28ページ種別の og:image が指す画像生成エンドポイント `/api/og`(/result) まで巻き込んで遮断していた。
  robots.txt を尊重する Twitterbot / facebookexternalhit / LinkedInBot / Slackbot 等の SNS スクレイパは
  og:image を取得できず、X/Facebook/LinkedIn/Slack 等での共有時にカード画像が出ない状態だった
  （Twitter 公式も「robots.txt で画像 URL を許可せよ」と明記）。longest-match で勝つ `Allow: /api/og` を
  併記して許可（`/api/` 配下の他エンドポイントは Disallow 維持）。/ コミット `6d86a70`
  / 検証: typecheck0/lint0(既存ux-audit警告1のみ)/test230緑(+新規1)/build緑。本番ビルドを localhost 起動し
  `curl /robots.txt` で `Allow: /api/og` が `Disallow: /api/` より前・longest-match 成立を実測、
  `/api/og?type=exam` が 200 image/png を返すこと、`ap.html` の og:image が絶対URL
  `https://www.kakomon-ai.jp/api/og?...`（metadataBase 解決済）で当該エンドポイントを指すことを実測。
  回帰テスト `__tests__/seo/robots.test.ts`（allow に /api/og 在・経路長で Allow が Disallow に勝つ。
  Allow を外すと落ちる）。
- SKIP(実害なし・監査 done): sitemap × orphan/noindex 整合監査。`lib/seo/sitemap-xml.ts` の STATIC_ROUTES
  全33ルートが page.tsx 実在かつ indexable を確認（/topics の `index:false` は `all.length===0` の防御分岐のみで
  74トピック在の本番では index:true）。sitemap 未掲載の top-level ページ（api-docs/offline/review/account/
  bookmarks/essays/success-stories/settings/quiz/admin）は全て `robots:{index:false}` or 301 で正しく除外＝orphan ゼロ。
  topics sitemap は getHubTopics(71) で getAllTopics(74) の部分集合＝404 emit なし。robots Disallow と sitemap URL の衝突なし。
- SKIP(過大修正の罠・content編集回避): 試験ハブ `EXAM_META_DESC_DIVERSE` の meta description が全角120字超で
  日本語 SERP で末尾切れの可能性。ただし冒頭に試験名＋訴求が入る意図的な多様性マーケコピーであり「壊れ」ではない。
  夜間にコピーを短縮編集するのは overreach。日中に判断する候補として記録。
- done: 【perf=og:image 毎回再レンダー】`/api/og` が既定で `cache-control: max-age=0, must-revalidate` を
  返しており、SNS スクレイパ／Google 画像取得のたびにフォント取得＋satori 再レンダーが走り高コスト・低速
  （スクレイパのタイムアウト要因）だった。OG 画像はクエリ文字列で内容が一意に定まる決定的レスポンスのため、
  Next の file-based opengraph-image と同じ `public, immutable, no-transform, max-age=31536000` を明示。
  / コミット `215a541` / 検証: typecheck0/lint0/test230緑/build緑。本番ビルド localhost で修正前
  `max-age=0, must-revalidate` → 修正後 `public, immutable, max-age=31536000` を `curl -I` で実測、
  画像が 200 image/png を返し続けることを確認。robots 許可（6d86a70）と相補的。
- done: 【実バグ=結果シェア OG が 500 でレンダー不能】`/api/og/result` が複数子ノードを持つ非 flex の
  `<div>`（`{pct}%`・`{correct} 問正解 / {total} 問中`）を含み、satori が「display:flex を持たない多子 div」を
  拒否して 500（failed to pipe response）で画像生成に失敗していた。該当2箇所を単一文字列の子へ collapse して
  修復＋ long immutable キャッシュ付与。/ コミット `45f0e77` / 検証: typecheck0/lint0/test230緑/build緑。
  本番ビルド localhost で修正前は satori エラーで 500（サーバログ実測）→ 修正後 200 image/png（192KB）を返し、
  Read ツールでレンダー画像（IPA Quiz/AP バッジ・「80% 正答率」・「16 問正解 / 20 問中」・ブランド表記）が
  正しいことを目視確認。※当該ルートは現状ソース未参照（share.ts は /api/og 使用）＝壊れた公開ルートの非破壊是正。
  日中候補: 未参照なら削除も検討可（夜間は非破壊側＝機能化に倒した）。

## セッション9 まとめ
- 実改善3件（すべて OG/SNS シェア表面）+ SKIP2件（sitemap orphan 監査=クリーン / exam meta desc 長さ=content編集回避）。
  1. robots.txt: `Allow: /api/og` 明示で SNS スクレイパの og:image 取得を解禁（`6d86a70`・全28ページ種別に波及）
  2. /api/og: long immutable キャッシュ付与で再レンダーコスト削減（`215a541`）
  3. /api/og/result: satori 多子 div 500 バグ修復＋キャッシュ（`45f0e77`・現状未参照ルートの非破壊是正）
- テーマ: 「SNS シェア時の OG 画像の到達性・速度・健全性」をまとめて是正。robots 解禁→キャッシュ→壊れた result 修復の3段。
- 次セッションへ: OG/SNS 表面は一巡 done。残候補は (a)tabs矢印キー(日中)、(b)コピー通知統一(日中)、
  (c)MilestoneToast ref化(日中)、(d)exam meta desc 短縮(日中)、(e)/api/og/result 未参照なら削除検討(日中)、
  (f)パフォーマンス(bundle/ISR/N+1)観点の精査、(g)SKIP 再評価4周目。

## セッション10 2026-05-30 08:32 JST（データ可視化チャートの代替テキスト = WCAG 1.1.1 一巡）
- SKIP(no-op/実害なし): パフォーマンス(ISR/N+1)観点。Explore が `app/page.tsx`・`/modes/topic`・`/modes/year`
  に `export const revalidate` 追加を提案したが**いずれも無効**と実測判定。①home(`app/page.tsx`)は
  searchParams/cookies/headers いずれも未使用＝既に完全 static prerender 済(ALL_QUESTIONS フィルタはビルド時
  1回のみ)。revalidate 追加はむしろ不要な定期再生成を招くため逆効果。②/modes/topic・/modes/year は
  どちらも `searchParams`(exam切替) を読む＝Next.js が dynamic レンダリングを強制するため revalidate は
  no-op。ALL_QUESTIONS スキャンは O(14k)・数ms で top-traffic ページでもないため実害なし(理論先行)。
  → perf 観点は撤去/最適化対象ゼロ。
- done: 【実バグ=A11y欠落 WCAG 1.1.1】`/stats`(indexable) の recharts チャート4種(ContentByExam 棒/
  Impressions 折れ線/Feature 円/Referrer 円)が role/aria-label を持たず、SR 利用者は SVG 内の軸ラベル断片
  しか読めず図の意味を得られなかった。特に「試験区分別収録数」「90日表示回数推移」は本文に代替表現が無く
  図が唯一の表現。各ラッパ div に `role="img"`+説明ラベルを付与(AT が単一の名前付き画像として扱う・
  視覚/レイアウト不変・additive)。/ コミット `09885d4` / 検証: typecheck0/lint(err0)/test234緑(+新規4)/
  build緑。`.next/server/app/stats.html` に role="img"・aria-label 出力を実測。新規 `StatsCharts.test.tsx`
  (recharts を no-op mock し ResizeObserver 回避、getByRole("img",{name}) で4種検証)は role 除去で4件落ちる
  ことを git stash で実測(崩れたら落ちる検証)。
- done: 【同テーマ横展開】`/transparency`(indexable) の収録問題数(棒)・月次利用状況(折れ線)2チャートも
  同じ role/aria-label 欠落。本文に代替表現なし。各ラッパ div に付与。/ コミット `969e533`
  / 検証: typecheck0/lint(err0)/test236緑(+新規2)/build緑。新規 `TransparencyStatsCharts.test.tsx` は
  git stash で2件落ちることを実測。※当該チャートは `monthlySeries.length>0` でのみ描画され PostHog metrics は
  env-gated のためローカルビルド成果物には出ず(env 不可触)、コンポーネント単体テストで検証(同 role=img 方式は
  stats.html で実測済)。
- done: 【同テーマ横展開】`/ranking`(indexable) の得点率分布 BarChart も role/aria-label 欠落。分布データは
  図でしか提示されない。ラッパ div に付与。/ コミット `b581146` / 検証: typecheck0/lint(err0)/test237緑(+新規1)/
  build緑。`.next/server/app/ranking.html` に aria-label 出力を実測(無条件描画)。新規 `RankingClientChart.test.tsx`
  は git stash で落ちることを実測。
- SKIP(false positive): Explore が `RankingClient` の表示名 input/対象試験 select を「label が htmlFor 無しで
  未関連付け」と指摘したが**誤り**。両 `<label>` は control を**wrap**しており暗黙の関連付け(implicit label
  association)が成立=アクセシブルネームを持つ。S5 worklog も「RankingClient(wrap label) は関連付け済」と
  記録済(line 198-200)。修正不要。
- SKIP(noindex・テスト足場が重い・日中候補): `/account` 配下のチャート(`DashboardProgress`・
  `WeaknessHeatmapClient`)も同型の role=img 欠落だが、noindex かつ auth-gated で SEO impact ゼロ、
  コンポーネントが account コンテキスト/多数の localStorage hooks に依存しテスト足場が重い。今セッションの
  「public indexable チャート」テーマは /stats・/transparency・/ranking の3ページで完了。残りは別セッションで。

## セッション10 まとめ
- 実改善3件(すべて WCAG 1.1.1 = データ可視化チャートの代替テキスト欠落の修復、各テスト付き)+ SKIP3件
  (perf=no-op実測 / ranking label=false positive / account charts=noindex・日中候補)。
  1. /stats 4チャートに role=img+aria-label(`09885d4`)
  2. /transparency 2チャートに role=img+aria-label(`969e533`)
  3. /ranking スコア分布チャートに role=img+aria-label(`b581146`)
- テーマ: 「indexable ページのデータ可視化チャートの代替テキスト(WCAG 1.1.1)」を全 public チャートページで一巡完了。
- 次セッションへ: public チャート a11y は一巡 done。残候補は (a)/account チャート(DashboardProgress/
  WeaknessHeatmap)の role=img 横展開、(b)tabs矢印キー(日中)、(c)コピー通知統一(日中)、(d)MilestoneToast ref化(日中)、
  (e)exam meta desc 短縮(日中)、(f)SKIP 再評価。

## セッション11 2026-05-30 08:53 JST（/account チャートの代替テキスト = WCAG 1.1.1 横展開・完了）
- done: 【実バグ=A11y欠落 WCAG 1.1.1】`/account` ダッシュボード `DashboardProgress` の「分野別習熟度」
  レーダーチャートが role/aria-label を持たず、SR 利用者は図の意味を得られなかった。当チャートの
  カテゴリ正答率は本文に代替表現が無く図が唯一の表現。ラッパ div に `role="img"`+説明ラベルを付与
  (additive・視覚/レイアウト不変)。/ コミット `e9d3710` / 検証: typecheck0・lint(err0, 既存ux-audit警告1のみ)・
  test238緑(+新規1)・build緑。新規 `DashboardProgress.test.tsx`(recharts no-op mock、空履歴で findByRole img)
  は **role 除去で落ちる**ことを git stash で実測(崩れたら落ちる検証)。
- done: 【同テーマ横展開】`/account/weakness` `WeaknessHeatmapClient` の分野別レーダーチャートも同じ
  role/aria-label 欠落。ラッパ div に付与し「下部の一覧でも確認できる」旨も明示(本ページは図の下に全分野
  正答率の text 代替が在る)。/ コミット `16bb265` / 検証: 全緑(test239)。新規 `WeaknessHeatmapClient.test.tsx`
  (3分野21回答の履歴を localStorage に投入しチャート描画→findByRole img)は git stash で落ちることを実測。
- done: 【同テーマ横展開】`/account/tutor` `TutorClient` の「直近30日の演習量」バーチャートも欠落。
  演習量推移は図でしか提示されない。ラッパ div に付与。/ コミット `8832c8a` / 検証: 全緑(test240)。
  新規 `TutorClient.test.tsx`(6回答の履歴で totalAttempts>=5 を満たしレポート描画→findByRole img)は
  git stash で落ちることを実測。
- SKIP(低価値・内部運用ツール・日中候補): `/admin/funnel`(FunnelCharts)・`/admin/metrics`(MetricsDashboard)の
  recharts チャートも role=img 欠落だが、admin は auth-gated・noindex の**運用者専用内部ダッシュボード**で
  公開 SR 利用者への影響は実質ゼロ。テスト足場も重い(metrics は mount 時 fetch)。公開面の WCAG 1.1.1 チャート
  alt-text テーマは public(S10)+account(S11)で**完全一巡 done**。admin は優先度低のため日中候補として記録。

## セッション11 まとめ
- 実改善3件(すべて WCAG 1.1.1 = /account データ可視化チャートの代替テキスト欠落、各テスト付き)+ SKIP1件(admin=内部運用ツール)。
  1. DashboardProgress 習熟度レーダーに role=img(`e9d3710`)
  2. WeaknessHeatmapClient 分野別レーダーに role=img(`16bb265`)
  3. TutorClient 演習量バーに role=img(`8832c8a`)
- テーマ: 「データ可視化チャートの代替テキスト(WCAG 1.1.1)」を public(S10)に続き **/account(noindex)でも一巡完了**。
  公開・認証両面の主要チャートを網羅。残るは admin 内部ダッシュボードのみ(低価値・SKIP)。
- 次セッションへ: チャート alt-text 観点は public+account 完了 done。残候補は (a)tabs矢印キー(日中)、
  (b)コピー通知統一(日中)、(c)MilestoneToast ref化(日中)、(d)exam meta desc 短縮(日中)、
  (e)admin チャート role=img(低優先)、(f)これまでの SKIP 再評価5周目。新観点の開拓も検討。

## セッション12 2026-05-30 09:15 JST（新観点: コンテナ要素の ARIA ロール/命名の是正）
- 監査(クリーン/SKIP): 既存の成熟領域を多クラス監査し実害バグの残存ゼロを確認 —
  ①アイコンのみボタンのアクセシブルネーム欠落(Explore 全数走査=残存ゼロ・全て aria-label/sr-only/可視テキスト保有)
  ②入力欄のモバイル属性(type=email/autoComplete 等は主要メール/連絡フォームで充足)
  ③パーセンテージのゼロ除算(QuizPlayer/StreamSummary 等は answered>0 や `|| 1` でガード済)
  ④localStorage JSON.parse の未ガード(lib/components/app 全件 try/catch 済)
  ⑤addEventListener のクリーンアップ漏れ(components 全件 return で removeEventListener)。
  → いずれも修正対象なし。11セッション分の蓄積でコードは総じて高品質。
- done: 【実バグ=ARIA 契約違反 WCAG/4.1.2】ホーム(最高トラフィック)`LearningCalendar` の学習量ヒートマップ
  コンテナが `role="img"` で、内部に各日の aria-label を持つ **focusable `<button>` 30個**を含んでいた。
  img ロールは子孫を presentational として支援技術のブラウズモードから隠すため、各日の詳細
  (日付・問題数・正答率)が SR 利用者に届かなかった。recharts チャート(非interactive SVG)の
  role=img とは別ケース。interactive 子を持つコンテナに正しい `role="group"` へ是正(要約ラベルは
  グループ名として保持)。/ コミット `c1de599` / 検証: typecheck0/lint(err0)/test242緑(+新規2)/build緑。
  新規 `LearningCalendar.test.tsx`(role=group 検証 + img でない退行ガード + 各日 button が公開される)は
  **role=img に戻すと2件とも落ちる**ことを実測(jsdom/aria-query でも img 下では button が隠れることを確認=実害裏付け)。
- done: 【実バグ=無効 ARIA / 方向付け欠落】`/account` ダッシュボード `LearningHeatmap` のコンテナ `<div>` が
  `aria-label="過去365日の学習ヒートマップ"` を持つが **role が無かった**。ARIA 仕様では role を持たない
  generic 要素は命名禁止(Naming Prohibited)で aria-label が多くの AT に無視され、ヒートマップの要約名が
  SR 利用者に届かなかった(子セルは aria-label 付き button で正しく公開済)。`role="group"` を付与し命名を
  有効化。/ コミット `6713bf0` / 検証: typecheck0/lint(err0)/test243緑(+新規1)/build緑。新規
  `LearningHeatmap.test.tsx`(findByRole group)は **role を外すと落ちる**ことを実測。
- SKIP(実害なし・冗長): `MockExamRunner` の時間配分タイル3つ(558/564/570行)も role 無し div への aria-label
  だが、内側の可視テキスト(「42秒」等)+ 直下の可視ラベル(「平均/問」「最長（問X）」「合計時間」)で情報が
  完全に伝わるため、aria-label が無視されても実害なし。過大修正の罠回避で SKIP。
- SKIP(クリーン): 同型「role の無い要素への aria-label / 誤 role」横展開監査。components/app の
  `<div|span|ul|ol|p ... aria-label>` を全数 grep。AfternoonResultView/ShareButtons/OnboardingTour/
  QuizPlayer/settings は適切な role(group/radiogroup/region) 保有。`<ul aria-labelledby>` 系の idref
  (result-categories/result-time/result-wrong)は全て実在(dangling なし)。修正は上記2件のみで残存ゼロ。

## セッション12 まとめ
- 実改善2件(コンテナ要素の ARIA ロール/命名の是正、各テスト付き)+ SKIP多数(多クラス監査=クリーン)。
  1. LearningCalendar: ヒートマップ role=img→group(interactive 子を隠す違反の是正、`c1de599`・ホーム=高トラフィック)
  2. LearningHeatmap: コンテナに role=group 付与(命名禁止 generic への aria-label を有効化、`6713bf0`・/account)
- 新観点「コンテナ要素の ARIA ロール/命名の妥当性」を開拓・一巡。recharts の role=img(非interactive=正)とは
  区別し、interactive 子を持つ/role 無しで命名する2パターンの実害を是正。同型の残存ゼロを grep 実測。
- 次セッションへ: ARIA ロール/命名観点は一巡 done。残候補は (a)tabs矢印キー(日中)、(b)コピー通知統一(日中)、
  (c)MilestoneToast ref化(日中)、(d)exam meta desc 短縮(日中)、(e)admin チャート role=img(低優先)、
  (f)dangling idref の app 全域スイープ(本セッションは mock-exam のみ確認)、(g)SKIP 再評価。

## セッション13 2026-05-30 09:17 JST（壊れた tab 契約 → aria-pressed トグル横展開 + 多クラス監査=クリーン）
- SKIP(クリーン・監査 done): dangling idref の app 全域スイープ(S12 で予告)。components/app の
  `aria-labelledby`/`aria-describedby` を全数 grep し、参照先 id の実在を確認。静的(footer-nav-*/
  offline-*-heading/learning-calendar-heading/topic-grid-heading/returning-header/attribute-filter-heading/
  existing-plans/new-plan/email-signin-error/contact-error/exam-date-error)・動的(section-${examKey}/
  week-${i}/essay-tab-${id}/essay-panel-${id}/qcomment-error-${questionId}/afternoon-${sub.label}-count/
  essay-${subKey}-count/tabs.tsx triggerId/result-categories/time/wrong)すべて実在 idref を指す。dangling ゼロ。
  EssayIndustryTabs は tabpanel が industries 全件・tab が INDUSTRY_ORDER 全件で型(EssayIndustryId=8値)
  と一致するため dangling 不可。
- SKIP(クリーン): 多クラスの read-only 監査をまとめて実施し実害バグの残存ゼロを確認 —
  ①form 内 `<button>`/`<Button>` の type 欠落(accidental submit)= 全7 form を精査、非 submit ボタンは
  全て type="button" 明示済(Button primitive は type 既定を持たないが各使用箇所で明示)。
  ②positive tabIndex(キーボード順の anti-pattern)= grep 残存ゼロ。
  ③skip-to-content リンク(WCAG 2.4.1)= layout に `#main-content` スキップリンク + `<div id="main-content" tabIndex=-1>` 既設。
  ④`<main>` ランドマーク欠落 = 全 page.tsx を精査、page 直書きが無い8ページも子 client component(DashboardTabs/
  QuizPlayer/StreamQuizPlayer/ReviewQuizClient/MockExamLanding/StudyPlanLanding/ScheduleResultClient/ChatShareView)で
  `<main>` を描画＝全ページに main 在。
  ⑤JSON-LD の XSS エスケープ = `JsonLd.tsx` は `</` ブレイクアウト対策に `<`→`<` 置換済(正)。
  ⑥essays 配下の SEO/OG = 全て robots index:false(noindex)で公開 SEO 対象外(詳細ページは OG 画像も保有)。
- done: 【実バグ=ARIA 契約違反 WCAG/4.1.2】`EssayIndustryTabs`(/essays 論述問題ページ・論文添削C軸)の業種別
  模範答案セレクタが role=tablist/tab/aria-selected/aria-controls/tabpanel を使うが、矢印キーのローピング
  tabindex を持たず WAI-ARIA タブパターンの暗黙契約(矢印ナビ)を満たさない不完全タブだった。**同一UI概念の
  姉妹コンポーネント `AfternoonResultView`(午後採点の業種別模範論述セレクタ)は S5 で既に role=group +
  aria-pressed トグルへ是正済**(`92da152`・テストにも明記)。codebase 既定のセグメント UI 慣用に統一。
  見た目・クリック挙動は不変。/ コミット `6e4fb97` / 検証: typecheck0/lint(err0)/test245緑(+新規2)/build緑。
  新規 `EssayIndustryTabs.test.tsx`(tab/tablist ロール不在・aria-pressed 初期状態・クリックで pressed と
  模範答案が切替)は **role=tab に戻すと2件とも落ちる**ことを git stash で実測(崩れたら落ちる検証)。
- done: 【同テーマ横展開・実バグ=ARIA 契約違反】`QuestionListWithFilter`(年度別一覧 /[exam]/[yearSeason]・
  **indexable**)の解答状況フィルター(全て/未解答のみ/不正解のみ)も role=tablist/tab/aria-selected を使うが
  aria-controls/tabpanel/矢印キーを持たない「フィルタトグル」だった。同じく role=group + aria-pressed へ統一。
  / コミット `8170b44` / 検証: typecheck0/lint(err0)/test247緑(+新規2)/build緑(2510 static pages)。
  新規 `QuestionListWithFilter.test.tsx`(localStorage 履歴を投入し answered>0 でフィルタ描画→tab ロール不在・
  aria-pressed トグル・切替)は **git stash で2件とも落ちる**ことを実測。
- → 残る role="tab" は `components/ui/tabs.tsx`(aria-controls+tabpanel+aria-labelledby 完備の正当なタブ
  primitive・矢印キーのみ未対応)のみ。S5 で「app 横断使用・実害限定的」として日中候補に SKIP 済で踏襲。
  aria-selected の残存も tabs.tsx の1件(正当使用)のみ＝orphan ゼロを grep 実測。

## セッション13 まとめ
- 実改善2件(壊れた tab 契約→aria-pressed トグルの横展開、各テスト付き)+ SKIP多数(dangling idref/form button type/
  positive tabIndex/skip link/main landmark/JSON-LD XSS/essays SEO=全てクリーン)。
  1. EssayIndustryTabs: 業種セレクタ role=tab→aria-pressed(`6e4fb97`・/essays 論文添削C軸)
  2. QuestionListWithFilter: 解答状況フィルター role=tab→aria-pressed(`8170b44`・indexable 年度別一覧)
- テーマ: S5(AfternoonResultView)で確立した「不完全タブ契約→aria-pressed トグル」の決定を、同型の残り2箇所へ
  横展開し完了。role="tab" は正当な共有 primitive(tabs.tsx)のみ残存=方針一貫。
- 次セッションへ: 壊れた tab 契約の横展開 done。残候補は (a)tabs.tsx 矢印キー(日中・app 横断で影響大)、
  (b)コピー通知統一(日中)、(c)MilestoneToast ref化(日中)、(d)exam meta desc 短縮(日中)、
  (e)admin チャート role=img(低優先)、(f)これまでの SKIP 再評価・新観点の開拓。コードは総じて高品質で
  夜間に安全な実害バグは枯渇傾向。

## セッション14 2026-05-30 09:33 JST（新観点: クイズ keydown ハンドラが修飾キーを無視しブラウザ/OSショートカットを奪う）
- SKIP(過大修正の罠・実害なし=意図的設計): `lib/storage/history.ts` の `getRecentIds(n)` が
  `slice(-n*20)...slice(0,n*20)` で **n*20** 件返す件を精査(Explore が「n件返すべきバグ」と指摘)。
  だが `*20` は両所に**意図的**に書かれ、2呼び出し元が依存: ①filter.ts の「直近2回除外」(CLAUDE.md§11)は
  「直近2ラウンド(≒20問/ラウンド)」を除外する設計=n*20 が正 ②OfflineHome は getRecentIds(20)で
  重複entryをdedupして**20ユニーク**を得るため過剰fetchが必要。n件に変えると両機能が壊れる。
  最終 `.slice(0,n*20)` は冗長(no-op)だが無害。テストも intent を固定せず=仕様。→ 直さない(SKIP)。
- SKIP(理論のみ・実害なし): `shuffleChoices` の配列answer(`answer[0]`のみremap)/重複choice text(indexOf先頭一致)。
  data/questions/ を全grep し **配列answerの問題=0件**・4択で重複textも実質なし。現状実害ゼロ=SKIP。
- done: 【実バグ=UX/操作性 axis-A】`/q`(SEOランディングの解答プレイヤー)`QuestionAnswerCard` の数字キー選択が
  修飾キーを無視しており、**Ctrl/Cmd+1〜4(ブラウザのタブ切替)** が e.key="1".."4" に一致 → preventDefault+
  選択肢選択に化け、タブ切替を奪っていた。修飾キー(meta/ctrl/alt)時は早期return(Shiftはガードせず=他プレイヤーの
  "?"ヘルプ等に影響なし)。素の数字キーは維持。/ コミット `78e501d` / 検証: typecheck0/lint0/test248緑(+新規1)/
  build緑。新規テストは Ctrl+1・Cmd+2 で履歴非増・素の1で増を検証し、**git stash で落ちる**ことを実測。
- done: 【同テーマ横展開・実バグ】`/quiz` プレイヤー `QuizPlayer` の global keydown も同型。さらに
  **Ctrl/Cmd+R(再読込)** が `e.key==="r"`(スター切替)に一致して preventDefault され**再読込を奪う**最悪ケースを含む。
  同じ修飾キーガードを付与。/ コミット `a982ac0` / 検証: typecheck0/lint0/test252緑(+新規3)/build緑。
  新規 `QuizPlayer.keyboard.test`(next/navigation mock)は Ctrl+R/Cmd+R でスター不変・Ctrl+1で未選択・素のrで切替を
  検証し **git stash で3件落ちる**ことを実測(※2イベント相殺の落とし穴を回避し単一イベントで検証=テスト自体も修正)。
- done: 【同テーマ横展開・実バグ】ストリーム連続出題 `StreamQuizPlayer` の数字キーも同型(Ctrl/Cmd+1-4 奪取)。
  同じ修飾キーガードを付与し、3プレイヤー全ての修飾キー奪取を解消。/ コミット `1315006`
  / 検証: typecheck0/lint0/test254緑(+新規2)/build緑。新規テストは Ctrl+1/Cmd+2 で履歴非増・素の1で増を検証し
  **git stash で落ちる**ことを実測。
- SKIP(クリーン): 他の keydown ハンドラ全数監査(grep)。SiteHeader/CopilotPanel(×3)/Streamの内側ダイアログ=
  Escape のみ(preventDefaultなし・修飾と無関係で無害)。KeyboardShortcutsHelp は "?"(Shift+/)+Escape のみで
  ブラウザショートカットでない=無害。修飾キー奪取バグは上記3プレイヤーのみ=残存ゼロを確認。

## セッション14 まとめ
- 実改善3件(クイズ keydown ハンドラの修飾キー奪取バグ、各テスト付き)+ SKIP3件(getRecentIds=意図的設計/
  shuffleChoices=理論のみ/他keydown監査=クリーン)。
  1. QuestionAnswerCard: /q の数字キーが Ctrl/Cmd+1-4 を奪うのを防止(`78e501d`)
  2. QuizPlayer: /quiz の数字キー/r が Ctrl+R 再読込・Ctrl+1-4 を奪うのを防止(`a982ac0`)
  3. StreamQuizPlayer: 連続出題の数字キーが Ctrl/Cmd+1-4 を奪うのを防止(`1315006`)
- 新観点「global keydown が修飾キーを無視しブラウザ/OSショートカット(Ctrl+R再読込・Ctrl+1-4タブ切替)を奪う」を
  開拓・一巡。3プレイヤーに同型の修飾キーガードを横展開し完了。Escape/"?" 系ハンドラは無害と確認(残存ゼロ)。
- 次セッションへ: keydown 修飾キー観点 done。残候補は (a)tabs.tsx 矢印キー(日中・影響大)、(b)コピー通知統一(日中)、
  (c)MilestoneToast ref化(日中)、(d)exam meta desc 短縮(日中)、(e)admin チャート role=img(低優先)、
  (f)SKIP 再評価・新観点の開拓。夜間に安全な実害バグは枯渇傾向(lib ロジックは Hamilton 法選抜含め高品質)。

## セッション15 2026-05-30 09:51 JST（多数の新観点を監査=ほぼクリーン / admin チャート alt-text 最後の1件を是正）
- done: 【実バグ=A11y欠落 WCAG 1.1.1】`/admin/metrics` `MetricsDashboard` Section1 の日次推移 LineChart
  (DAU/解答数)が role/aria-label を持たず、近接する表・KPI にも時系列の代替表現が無いため SR 利用者は
  図の意味を得られなかった。ラッパ div に `role="img"`+説明ラベル「DAU と解答数の日次推移グラフ」を付与
  (additive・視覚/挙動不変)。S10/S11 で public/account チャートに適用した同パターンの admin 横展開。
  ※S11 は admin を「低価値・テスト足場が重い」で日中候補に SKIP していたが、足場(buildMockMetrics+fetch stub)は
  S6 で既に解決済のため実施。Section2 機能別バー・Section4 流入元円は**直下に同データの表があり**冗長なので
  付与しない(意図的に1チャートのみ)。FunnelCharts/FunnelDashboard のバーも text/表backed のため対象外。
  / コミット `1732868` / 検証: typecheck0・lint(err0, 既存ux-audit警告1のみ)・test255緑(+新規1)・build緑。
  既存 `MetricsDashboard.test.tsx`(fetch永久pending stub)に role=img 検証を追加し、**role を外すと
  getByRole("img",{name}) が見つからず落ちる**ことを実測(Edit で属性除去→1件fail→復元の手順で確認)。
  → これでチャート alt-text(WCAG 1.1.1)は public(S10)+account(S11)+admin(S15)で**全面完了**。残る admin の
  table/text-backed チャートは冗長表現があるため role=img 不要(過大修正の罠回避)。
- SKIP(クリーン): 見出し階層(WCAG 1.3.1/SEO)を indexable 全主要ページで監査(Explore)。home/exam/yearSeason/
  faq/blog/topics/keywords/search/features/about/success-stories/contact/privacy すべて h1 単一・レベル飛びなし。
- SKIP(クリーン): 画像 alt 監査。問題画像・raw img・next/image すべて意味のある alt 保有。唯一 /account の
  avatar が name 不在時に "avatar" フォールバック(noindex・auth-gated・エッジケースで実害僅少)=SKIP。
- SKIP(クリーン・既に成熟): prefers-reduced-motion(WCAG 2.3.3)。`globals.css:222-231` に包括的な
  `@media (prefers-reduced-motion: reduce)` ブロックが在り全 CSS animation/transition を抑制。無限ループ
  animation(hero-ai-demo 系・shimmer)も同ルールで停止。framer-motion(FireworksBurst/ComboCounter)は単発で
  ループ無し。HeroAiDemo は明示コメントで reduced-motion 尊重を記録。撤去/追加対象ゼロ。
- SKIP(実害なし=機能追加に相当): aria-current(WCAG 4.1.2)。`SiteHeader` 上位リンク5件は**視覚 active +
  aria-current 両方**を保有(正)。ドロップダウン項目/モバイルシート項目は**視覚 active も aria-current も
  両方無い**=視覚/プログラムの不一致(=実害)は存在しない。aria-current のみ追加は機能追加で夜間 overreach。
  `MobileBottomNav`/`QuizModeTabs`/`AfternoonPlayer` は aria-current 済。→ 不一致バグ残存ゼロ。
- SKIP(false positive・変更は SEO 有害): canonical URL 監査(Explore が modes/topic・modes/year で「collision」、
  quiz/stream・mock-exam で「hardcoded canonical」を HIGH で指摘も**全て誤読**)。①modes/topic は
  `code===DEFAULT_EXAM(ap)?"/modes/topic":"?exam={code}"` で、ap(=default・無paramと同一内容)を `/modes/topic` へ
  集約=**正しい重複コンテンツ正規化**(collision ではない)、別試験は self-canonical=正。②quiz/stream・mock-exam の
  base canonical 固定は**インタラクティブ tool ページの param 変種を無限 index させない意図的設計**=正。
  ③相対 openGraph.url は root layout の `metadataBase` で絶対化される(Next.js 仕様)=正。→ 変更すれば逆に
  SEO を害するため**直さない**。canonical 戦略は健全。
- SKIP(低/marginal): /account 非同期 UX(Explore)。①ApiKeysClient コピーボタンに連打 disabled ガード無し
  (clipboard は冪等・"コピー済" flicker のみ・noindex)②NotificationSettings sendTestEmail に finally 無し
  (各分岐で status 設定済・catch も処理・実バグでない)。どちらも実害 marginal=SKIP。

## セッション15 まとめ
- 実改善1件(admin 日次推移チャートに role=img=チャート alt-text テーマの最後の1件を是正、テスト付き `1732868`)
  + SKIP多数(見出し階層/画像alt/reduced-motion/aria-current/canonical/非同期UX=ほぼ全てクリーン or false positive)。
- 多数の新観点を監査した結果、コードは総じて極めて成熟。canonical の「collision」指摘は誤読(正しい正規化)で
  変更は有害と判断し回避(過大修正の罠を実地で回避)。チャート alt-text は public+account+admin で全面完了。
- 次セッションへ: 残候補は (a)tabs.tsx 矢印キー(日中・影響大)、(b)コピー通知統一(日中)、(c)MilestoneToast ref化(日中)、
  (d)exam meta desc 短縮(日中)。**夜間に安全な実害バグは枯渇(S1-S15 で a11y/SEO/OG/リンク/keydown/チャート/
  非同期UX を網羅一巡)。** 次は (e)未踏の機能ロジック観点(クイズ採点/履歴の境界条件)か (f)日中候補の慎重実施を検討。

## セッション16 2026-05-30 10:11 JST（新観点=機能ロジックの境界条件を監査 / ツール出力チャネル不調でコミット見送り）
- 状況: 本セッションは途中から **ツール出力チャネルが激しくバッファ化**(Bash/PowerShell/Read/Grep が
  軒並み空応答。短い `echo "...$(...)..."` のみ稀にフラッシュ、`pnpm` 等の長い出力は不可)。セッション3と同症状。
  → 全緑ゲート(typecheck/lint/test/build)と実測検証が観測不能のため、**コード変更はコミットせず見送り**(安全側)。
  着手していた修正は `git checkout -- lib/learning/analytics.ts` で破棄済(作業ツリーのトラッキング差分=0 を probe で実測確認)。
- 着手前に取れた実測(チャネル健全時): typecheck=0(PASS) / lint=0 err(既存 ux-audit 警告1のみ)。
- **【次セッションで実装+検証してほしい確定バグ・調査済み】** `lib/learning/analytics.ts:107-111` `daysUntil()` の
  JST境界 off-by-one:
  - 現状: `new Date(targetIso).getTime()` は date-only 文字列("2024-01-15"等)を **UTC深夜**として解釈し、生の `now` と
    `Math.ceil((target-now)/86_400_000)` で比較。→ JST 00:00〜09:00 の時間帯は残り日数が **常に1多い**。
    例: 試験当日朝(JST 00:30)に `daysUntil("試験日")` が 0 でなく 1 を返す。
  - 影響(実害): `app/account/tutor/TutorClient.tsx:198` → `buildExamMessage(daysLeft)` (同 286-297行)。
    試験当日の朝に「本日が試験日です」ではなく「試験まであと1日…」を表示。試験直前期の文言が1フェーズずれる。
    `app/account/study-plan/StudyPlanClient.tsx:36` の別実装 `daysUntil` は `today.setHours(0,0,0,0)`(端末ローカルTZ)
    で算出=本番(JST端末/Vercel)依存。こちらは別件・今回の対象外(lib版のみ修正対象)。
  - 確定した修正(codebase 既定の JST idiom = streak/core.ts `jstDateString`・daily-challenge.ts `jstChallengeDate`
    と同型: `+9h → toISOString().slice(0,10)`、両端を `T00:00:00Z` で parse して整数日 diff):
    ```ts
    export function daysUntil(targetIso: string, now = Date.now()): number {
      const targetDay = Date.parse(`${targetIso.slice(0, 10)}T00:00:00Z`);
      if (!Number.isFinite(targetDay)) return 0;
      const todayJst = new Date(now + 9 * 60 * 60 * 1000).toISOString().slice(0, 10);
      const todayDay = Date.parse(`${todayJst}T00:00:00Z`);
      return Math.max(0, Math.round((targetDay - todayDay) / 86_400_000));
    }
    ```
    検算: 試験当日朝(JST 00:30=UTC前日15:30)→ todayJst=試験日と一致 → 0(正)。午後の通常ケース(あと5日)も維持。
  - 回帰テスト(新規 `__tests__/lib/learning-daysUntil.test.ts` 等)で「JST 00:30 の now で試験当日=0」「JST 08:00 で
    あと5日(旧実装は6で落ちる)」を `now` 引数注入で検証(`daysUntil` は第2引数 now を受けるので fake time 不要)。
    **旧実装に戻すと落ちる**ことを実測すること(崩れたら落ちる検証)。
  - 注意: `lib/learning/analytics.ts` には既存の専用テストファイルが無い(grep 済)。新規作成でよい。
- 監査クリーン(Explore + 自己精査): history/filter/streak/scoring の他の境界条件は実害バグなし。
  MockExamRunner:413 `timings.indexOf(maxTimeSec)` は `nonZeroTimings.length>0` でガード済(latent のみ)。
  getRecentIds の n*20 は確定で意図的設計(S14 記録済)。
- 次セッションへ: **チャネルが健全なら最優先で上記 daysUntil を実装+全緑+回帰テストでコミット**(調査完了済・即着手可)。
  その後は日中候補(tabs矢印キー/コピー通知統一/MilestoneToast ref化/exam meta desc 短縮)か新観点の開拓。
