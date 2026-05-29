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
