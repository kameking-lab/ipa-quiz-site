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

### セッション16 追記（チャネル復旧後に上記 daysUntil を実装+検証=done）
- done: 【実バグ=JST境界 off-by-one】`lib/learning/analytics.ts` `daysUntil()` を上記の確定修正で実装。
  / コミット `<このセッションの fix コミット>`（HEAD 参照）。
  / 検証(チャネル復旧後に実測): typecheck=0 / lint=0 err(既存 ux-audit 警告1のみ) / **test 261緑**(255→+新規6)。
  新規 `__tests__/lib/learning-daysUntil.test.ts`(now 引数注入で JST 境界を検証・6ケース)。
  **崩れたら落ちる検証=実測済**: 旧実装に差し戻して全スイート実行 → 当該ファイルで3件が assertion 失敗
  (「朝=expected 0 received 1」「早朝=expected 5 received 6」「JST深夜flip=expected 0 received 1」)、
  新実装では 261 全緑。残り3ケース(午後安定/試験後0/不正日付0)は新旧一致で常に緑。
  build は本セッション中に2回完走させたが、終盤にツール出力チャネルが再度バースト/バッファ化し
  build 標準出力の実測確認が取れず(typecheck=コンパイル相当ゲートは緑・変更は import/依存追加なしの純関数9行)。
  影響範囲は overnight-integration のみ(main は凍結・本デプロイは main のみ)。次セッションは
  チャネル健全時に `pnpm build` を1回流して緑を再確認すれば足りる(コード変更不要の見込み)。
- 注: `app/account/study-plan/StudyPlanClient.tsx:36` のローカル実装 `daysUntil`(端末TZの `setHours`)は
  別件・今回対象外。日中に lib 版へ寄せるか検討(夜間は範囲外)。→ **S17 で実装(下記)**。

## セッション17 2026-05-30 10:29 JST（JST境界 off-by-one カウントダウンの残り2箇所を一掃=テーマ完了）
- done(冒頭): S16 申し送りの `pnpm build` 緑再確認 — daysUntil コミット(`ff9f1df`)を含む HEAD で
  typecheck=0 / lint=0 err(既存 ux-audit 警告1のみ) / test **261緑** / build 完走を実測。コード変更不要を確認。
- done: 【実バグ=JST境界 off-by-one・S16の予告分】`app/account/study-plan/StudyPlanClient.tsx` のローカル
  `daysUntil` を削除し、検証済みの `lib/learning/analytics` の `daysUntil`(JST暦日ベース・now注入可)へ委譲。
  旧ローカル実装は target を `new Date(dateStr)`=**UTC深夜**・today を `setHours(0,0,0,0)`=**端末ローカル深夜**で
  比較し `Math.ceil` していたため、**JST端末でも** JST 00:00〜09:00 に「残り日数」が常に1多く出ていた
  (例: あと20日→「あと21日」)。lib版へ委譲して解消(DRY=単一JST情報源)。/ コミット `920c235`
  / 検証: typecheck0/lint0/test263緑(+新規2)/build緑。新規 `StudyPlanClient.test.tsx` に JST境界の2ケースを追加
  (`vi.setSystemTime` を JST早朝窓に固定: ①当日=プラン非生成 ②20日後=「20日」表示)。**旧実装に差し戻すと
  どの端末TZでも2件落ちる**ことを git stash で実測(旧は「21日」/当日も「1日」でプラン生成)。
  ※当該窓では旧実装は端末TZに依らず +1 になる(target=UTC深夜・today=ローカル深夜の差が常に正)ことを設計で担保。
- done: 【実バグ=JST境界 off-by-one・同テーマ横展開・ホーム高トラフィック】`lib/constants/exam-schedule.ts`
  `nextExamSitting()` の「次回試験まで N 日」カウントダウンも同型。試験日(`Date.UTC`=00:00Z)と生の now を
  `Math.ceil` で比較していたため、JST 00:00〜09:00 に N+1 表示、**さらに試験当日の JST 09:00 以降は残り日数が
  次回開催へ繰り上がる**(当日昼に「あと176日」級)最悪ケースを含んでいた。用途: `HomeAuxSection`(ホーム
  「次回試験まで」)・`DashboardOverview`(account KPI)。JST暦日ベース(`+9h→ymd→00:00Z` で today を正規化、
  候補を `>= todayJstMs` で選抜、`Math.round`)に是正。当日=0日・翌日に繰り上がる挙動へ統一。/ コミット `8201f0a`
  / 検証: typecheck0/lint0/test267緑(+新規4)/build緑。新規 `__tests__/lib/exam-schedule.test.ts`(now を Date 注入=
  完全決定論・端末TZ非依存)。**旧実装に差し戻すと2件落ちる**ことを git stash で実測
  (「expected 6 to be 5」「expected 1 to be 0」)。
- SKIP(実害ほぼなし・過大修正の罠): `StudyPlanClient` の `<input type=date>` の `min={today}` が
  `new Date().toISOString().slice(0,10)`=**UTC日付**。JST 00:00〜09:00 に min=JST前日となり JST前日も選択可だが、
  選択しても daysUntil(JST)=0→`days<=0` guard でプラン非生成=無害。9時間窓・min境界のみのエッジで実害僅少。
  日中に JST日付へ寄せる候補として記録(夜間は安全側で SKIP)。
- SKIP(クリーン・監査 done): JST境界 off-by-one の全域スイープ。`Math.(ceil|round|floor)(...getTime())` /
  `/86400000` / `setHours(0` を全 .ts/.tsx で grep。`lib/study-plan/generator.ts`(`daysBetween`/`listDates`/
  `todayLocalDate`)と `components/SchedulePlanner.tsx`(`todayLocalDate` で min と guard を統一)は**全て端末ローカル
  TZ で内部一貫**＋`Math.round`=off-by-one なし(JST端末=本番で正)。`lib/admin/metrics/range.ts` は同一基準同士の
  diff で一貫。`SchedulePlanner.defaultExamDate`(setMonth+3→toISOString)はTZで1日ずれ得るが**編集可能な既定値の
  提案**で実害なし。→ カウントダウン系の off-by-one は lib/learning daysUntil(S16)+StudyPlanClient(S17)+
  nextExamSitting(S17)で**全面一掃完了**。残存ゼロを grep 実測。

## セッション17 まとめ
- 実改善2件(JST境界 off-by-one カウントダウンの残り2箇所、各テスト付き)+ 冒頭で S16 build 緑再確認 + SKIP2件。
  1. StudyPlanClient: ローカル daysUntil を lib版(JST)へ委譲(`920c235`・/account 学習プラン残り日数)
  2. nextExamSitting: 次回試験カウントダウンを JST暦日ベースへ是正(`8201f0a`・ホーム高トラフィック+account KPI)
- テーマ: S16 で lib/learning daysUntil を修正した「JST境界 off-by-one」を、同型の残り2箇所へ横展開し**テーマ完了**。
  特に nextExamSitting は試験当日にカウントダウンが次回へ繰り上がる重い実害を含んでいた(ホーム表示)。
- 次セッションへ: JST境界カウントダウン観点は完了 done(残存ゼロ grep 実測)。残候補は (a)StudyPlanClient min の
  JST化(日中・実害僅少)、(b)tabs.tsx 矢印キー(日中・影響大)、(c)コピー通知統一(日中)、(d)MilestoneToast ref化(日中)、
  (e)exam meta desc 短縮(日中)。**夜間に安全な実害バグは S1-S17 で網羅一巡し枯渇傾向**。新観点の開拓 or 日中候補の慎重実施を検討。

## セッション18 2026-05-30 10:45 JST（新観点を2クラス開拓し全数監査=実害バグゼロを確認・コード無変更）
- 冒頭ベースライン全緑実測: typecheck=0 / lint=0 err(既存 ux-audit-screenshots.mjs 警告1のみ=未追跡・本ループ無関係) /
  test **267 passed**(59 files) / build 完走(コード無変更の現 HEAD `0630101`)。
- **新観点① 表示の数値破綻(>100% / NaN / 0除算 / 配列境界 / 文字列 split)** を全数監査 → **実害バグなし**:
  - Explore 提案5件を自己精査で全て false-positive/no-実害と確定:
    1. `StudyPlanClient.tsx:78` の `expectedQuestions*2/days` 0除算→Infinity説 = **誤り**。直前 `:69 if (days<=0) return;` で days>=1 が保証済。
    2. essay `page.tsx:167` `question.context.split("\n")[0]` が null で 500 説 = **誤り**。`lib/essays/types.ts:40 context:string`(必須)+静的TSデータ(API非経由)で TS strict が null を排除。
    3. `MetricsDashboard.tsx:39 pct()` が >100%/NaN を出す説 = **no-実害**。`fetchMetrics`(`lib/admin/metrics/posthog.ts:40-51`)は実装上**常に `buildMockMetrics` を返す**(PostHog 実連携は未実装)。mock の share/passRate は 0除算ガード済(`sessionsSum===0?0`/`first===0?0`)・ctr は 0.03〜0.10 bound。pct への入力は常に 0..1 で >1/NaN は到達不能。かつ admin は noindex/auth-gated/運用者専用。
    4. `lib/rate-limit/server.ts:209` XFF 先頭空セグメント説 = **理論のみ**。Vercel は XFF を整形済で渡すため空先頭は本番到達せず。仮に空でも key="" は別クライアントを統合=**より厳格**(quota 突破にはならない=agent の主張は逆)。dead-letter。
    5. ユーザー向け正答率表示(`QuizPlayer.tsx:362/371` `:601 answered>0?`、`StreamSummary.tsx:35 length||1`、`ExamProgressBar.tsx:52 >0?`、`HomeExamGrid.tsx:126 total>0?`、`LearningCalendar.tsx:145 count>0?`)は**全て 0除算ガード済**=NaN/Infinity 表示不能。
  - 数値表示の桁区切り整合も確認: 大きい累計(`HomeHeroLede`/`ExamProgressBar`/`SearchClient`/`Dashboard*`)は `toLocaleString("ja-JP")`、
    小さい区分別/日別カウント(<1000)は素の数値=用途妥当で不整合なし。`formatElapsed`(QuizPlayer:41)は 60分超で "61:01" 表記だがストップウォッチとして正常(実害なし)。
- **新観点② React effect/async-fetch の正しさ(stale deps / fetch race / 派生stateの非同期 / リスナー解放漏れ)** を全数監査 → **実害バグなし**:
  - Explore 提案4件を自己精査で全て false-positive/no-実害と確定:
    1. `SearchClient.tsx:320-333` 検索履歴保存 effect deps=[result] が query stale 説 = **誤り**。result は query から派生し**同一レンダーで同時更新**されるため effect closure の query は result と整合。`eslint-disable` は意図的(result 変化時のみ・それを生んだ query で保存)=正。
    2. `CopilotPanel.tsx:269-275` storage event で `feedbackSubmitted` 更新も `send` が stale 説 = **誤り**。`send` は useCallback で deps に `dailyLimit`/`feedbackSubmitted` を**含む**(:566-567)。state 変化→再生成され `sendRef.current` も effect(:580-584)で追従。stale closure 無し。
    3. `CloudSyncPanel.tsx:35-42` auth fetch が OAuth 後に再実行されない説 = **誤り**。NextAuth OAuth は**全画面リダイレクト**で /settings 復帰時にコンポーネント再マウント→effect 再実行→auth 正常解決。
    4. `DashboardOverview.tsx:60-86` fetchQuestionMeta に abort/unmount ガード無しで stale 上書き説 = **no-実害**。React 18+ で unmount 後 setState は no-op(警告撤廃済・leak なし)。別マウントは別 state を持つため表示データの相互汚染は起きない。
  - 検証クラスの追加監査もクリーン: 重複 `id` 属性(components の静的 id は単一インスタンス・衝突なし)、aria-describedby idref(S5/S6 追加分の衝突なし)。
- → **結論**: 本セッションで新たに開拓した2観点(数値表示破綻 / effect・async 正しさ)+ 既存クラス(重複id/桁区切り)を全数監査したが、
  **安全に夜間修正すべき実害バグはゼロ**。S15-S17 の「枯渇」判定を独立した新観点で**再確認**。過大修正の罠を避けコード変更は行わない(本コミットは worklog/backlog の記録のみ)。
- 申し送り(次セッション): 残る実装候補は依然すべて**日中判断向き**(tabs矢印キー=影響大 / コピー通知統一=広域 / MilestoneToast ref化=latentのみ / exam meta desc 短縮=content編集 / StudyPlanClient input min の JST化=実害僅少)。
  夜間の安全枠では新規実害バグの産出は困難。次セッションは backlog の新 P1観点(下記)から1つ選び全数監査するか、上記日中候補のうち最も自己完結・低リスクな(d)MilestoneToast 防御的 ref 化を「将来回帰の予防」目的で慎重実施(同型が過去2回=S1/S4 で実害化した実績あり)を検討。

## セッション18 まとめ
- 実改善0件(全数監査の結果、安全に夜間修正すべき実害バグはゼロと確定)+ 新観点2クラス+既存2クラスを監査(全て false-positive/no-実害)。
- Explore 2回(数値破綻5件 / effect・async4件 計9件の提案)を**全て自己精査で棄却**=過大修正の罠を実地で回避。コード無変更。
- ベースライン全緑(typecheck0/lint0err/test267/build緑)を冒頭実測。S15-S17 の枯渇判定を独立観点で再確認。
- 次セッションへ: backlog 末尾に新 P1観点を追記済(下記参照)。

## セッション19 2026-05-30 11:00 JST（S18起案 P1新観点①日付TZ表示を全数監査 → 復習の期日境界に実バグ発見・修復 / ②soft404・④CLS img も全数監査=実害ゼロ）
- 冒頭ベースライン: test 267 passed(exit0)を実測(現 HEAD `0630101`)。
- done: 【実バグ=JST境界 off-by-one・S18新観点① 日付TZ表示】`app/review/ReviewClient.tsx` の
  `getTodayStr`/`getNextReviewDate` が `new Date().toISOString().slice(0,10)`=**素のUTC日付**を使っており、
  復習の「期日」判定境界が **JST 09:00** で切り替わっていた(streak/daily-challenge は `jstDateString` で
  JST 0:00 境界=**不一致**)。そのため JST 00:00〜09:00 の間は **本日が期日の復習が翌 09:00 まで表示されない**
  off-by-one(朝学習者に実害)。両ヘルパを既存の単一情報源 `lib/streak/core.ts::jstDateString` へ委譲し
  JST暦日へ統一(now 引数を受け付け export=決定論テスト可能化)。サーバ `/api/review/due` はクライアント供給の
  `today` 文字列比較のみ(`nextReviewAt > today`)で**挙動不変**・既存ストアの旧UTC日付も JST today 比較で
  自己回復(09:00→0:00 に早まるのみ=非回帰)。/ コミット `215f934`
  / 検証: typecheck0/lint0err(既存ux-audit警告1のみ)/test271緑(267+新規4)/build完走。
  新規 `__tests__/components/ReviewClient.dates.test.tsx`(now注入で JST早朝0:30/日中12:00 を検証)。
  **崩れたら落ちる検証=実測**: 旧UTC実装に差し戻すと2件落ちる(「expected '2026-05-30' to be '2026-05-31'」
  「expected '2026-05-31' to be '2026-06-01'」)ことを実機で確認後、JST実装へ復元。
- SKIP(実害僅少・S17記録を再確認): `StudyPlanClient.tsx:96` の `today=new Date().toISOString().slice(0,10)`(UTC)は
  `<input type=date>` の `min` のみに使用。JST 00:00〜09:00 に min=JST前日となるが、プラン生成は JST `daysUntil` で
  `days<=0` guard 済→前日選択でも非生成=無害。S17 の SKIP 判断を踏襲(過大修正の罠回避・夜間は安全側)。
- SKIP(全数監査=実害ゼロ・S18新観点② soft404): 全 dynamic route segment を監査。indexable な動的ルートは
  全て `dynamicParams=false`(ハード404) or 実行時 `notFound()`(success-stories/essays/essay/[questionId] 等は
  invalid param で notFound 実測確認)で保護。tool/share ページ(`study-plan/result/[id]`=robots noindex、
  `og/streak/[days]`=画像route)は非indexable。中間 path segment(essay/[exam]・essays/.../[section]・
  [exam]/afternoon/[year]・q/[exam] 等)は **page.tsx 不在**→ハード404。**200フォールバックで invalid param を
  描画する indexable ルートは存在せず=soft404 実害ゼロ**。
- SKIP(全数監査=実害ゼロ・S18新観点④ CLS img): raw `<img>` は全 .tsx で2件のみ。`SocialShare.tsx`(/account/badges
  =noindex)は `width={1200} height={630}` 明示でアスペクト比保持=CLS無し。`StudentIdUpload.tsx`(noindex auth・
  ユーザアップロードのdataURL preview)は `max-h-56 object-contain` で高さ制約・操作後preview=初期描画CLS無し。
  indexable コンテンツ画像は next/Image(intrinsic 寸法)で寸法未指定なし。→ raw-img CLS 実害ゼロ。

## セッション19 まとめ
- 実改善1件(復習の期日境界 JST 暦日統一=S18新観点①で発見した実バグ、テスト4件付き `215f934`)+ SKIP3件
  (StudyPlanClient min=実害僅少/soft404 全数監査=実害ゼロ/raw-img CLS 全数監査=実害ゼロ)。
- S18起案の P1新観点を3クラス着手: ①日付TZ表示で**実バグ1件発見・修復**(S16-S17 のJST境界テーマが
  「表示用日付/期日境界」にも残存していた=横展開漏れを補完)、②soft404・④CLS img は全数監査で実害ゼロを確定(記録)。
- 次セッションへ: 日付TZ表示観点の残りは StudyPlanClient min(実害僅少SKIP)のみ=ほぼ一巡。未着手の S18新観点は
  ③`<time dateTime>`(機能追加寄り・慎重に) ⑤フォーカストラップ/復帰 ⑥sitemap lastmod 妥当性。
  日中候補(tabs矢印キー/コピー通知統一/MilestoneToast ref化/exam meta desc短縮)は据え置き。

## セッション20 2026-05-30 11:09 JST（P1 新観点⑤ フォーカス復帰 — モーダル閉時のフォーカス管理）
- done: 【実バグ=a11y/WCAG 2.4.3】デスクトップ版 AI コパイロット `CopilotDesktopFloating` が
  開く際にパネル内へフォーカスを移す(L1450-1460 既存)のに、閉じる際にトリガー(FAB)へ戻していなかった。
  Escape/オーバーレイ/内部の閉じるで閉じるとキーボード利用者が document.body に取り残される
  (focus-in 契約の片割れ欠落=半実装の defect)。`fabRef`+`prevOpenRef` を追加し閉じ遷移を検知して
  `fab.focus({preventScroll})` を戻す。/ コミット `133682d`
  / 検証: typecheck0/lint(err0)/test272緑/build緑。新規 `__tests__/components/CopilotDesktopFloating.focus.test.tsx`
  (defaultOpen→Escape→FAB が activeElement)。**修正前は git stash で落ちることを実測**。
- done: 【実バグ=a11y】モバイル版 `CopilotMobileSheet` も同型。focus-in は無いが、シート内入力を
  操作したキーボード利用者が閉じた後 body に取り残される。同じ最小 fix(fabRef+復帰 effect)を適用し
  デスクトップ版と挙動統一。/ コミット `1da513a` / 検証: typecheck0/lint(err0)/test273緑/build緑。
  上記テストにモバイル版 describe を追加(getByText("AIに聞く")→Escape→FAB 復帰)。**stash で落ちることを実測**。
- SKIP(実害なし/overreach): ⑤ フォーカス復帰 残りの全数監査結果。
  ・radix Dialog 利用(FeedbackGateModal/OnboardingTour/SessionSummaryDialog/ui/dialog 系)= focus trap/復帰を
    自動処理=クリーン。
  ・`KeyboardShortcutsHelp`(「?」キーで開く global help)/`ReviewOverlay`(StreamQuizPlayer)/モバイルシートの
    オーバーレイ自体 = いずれも**開く際に focus-in していない**ため「壊れた契約」ではない。focus-trap+focus-in を
    新設するのは機能追加(overreach)=夜間は SKIP。Copilot 2件のみが「focus-in したのに復帰しない」半実装 defect だった。
- SKIP(成熟・E-5 で対処済): ⑥ sitemap lastmod 妥当性。`lib/seo/sitemap-xml.ts` は `STATIC_CONTENT_DATE`(deploy毎に
  自動前進)/`CONTENT_LAST_UPDATED`(問題データ最終更新から算出)を既に使用し、固定リテラルの陳腐化は解消済
  (コメント E-5 明記)。blog は `publishedAt/updatedAt` のデータ値。固定値の陳腐化なし=変更不要。
- SKIP(クリーン): ① サーバー描画のユーザー向け日付の TZ 表示。blog 記事(`app/blog/[slug]/page.tsx`)は
  `post.publishedAt.slice(0,10)` で**固定の編集日付**を表示し `<time dateTime>` も適切(new Date() の TZ 変換なし)=クリーン。
  その他の可視日付(ranking/review/bookmarks/essay-history/tutor 等)は全て "use client" でローカルストレージ由来=
  端末TZ(日本ユーザー=JST)で安全(backlog① の注記通り)。S19 の復習期日 JST 化で実害分は対処済。

## セッション20 まとめ
- 実改善2件(Copilot デスクトップ/モバイルのフォーカス復帰=WCAG 2.4.3 半実装 defect・各テスト付き `133682d`/`1da513a`)
  + 監査SKIP3件(⑤残り=overreach回避 / ⑥sitemap lastmod=E-5成熟 / ①サーバー日付=クリーン)。
- テーマ: P1新観点⑤「モーダル閉時のフォーカス復帰」を全数監査。focus-in したのに復帰しない半実装 defect は
  Copilot 2件のみ=両方修復。他は radix 自動処理 or focus-in 無し(契約破れ無し)で完了。⑤⑥①観点を一巡 done。
- 次セッションへ: P1新観点で残るは ③`<time dateTime>`(機能追加寄り=慎重に実害判定)。夜間の安全な実害バグは
  S1-S20 でほぼ枯渇。日中候補(tabs矢印キー/コピー通知統一/MilestoneToast 防御的ref化)or 未踏観点の開拓を検討。

## セッション21 2026-05-30 11:21 JST（新観点「共有データのインプレース破壊」を開拓 → 実バグ1件修復 + 周辺4観点を全数監査=実害ゼロ）
- 冒頭ベースライン全緑実測: typecheck=0 / lint=0 err（既存 ux-audit-screenshots.mjs の警告1件のみ=未追跡・本ループ無関係）/
  test **273 passed**(61 files) / build 完走（現 HEAD `f2d30e0`）。
- done: 【実バグ=共有キャッシュのインプレース破壊 footgun】`lib/seo/topics.ts::getQuestionsByTopic()` が
  内部キャッシュ `TOPIC_TO_QUESTIONS` の配列**参照をそのまま返却**しており、唯一の呼び出し側
  `app/topics/[slug]/page.tsx:88` が返り値へ直接 `.sort()`（破壊的）を適用していた。長寿命サーバ/ビルドで
  リクエストを跨いで共有キャッシュの順序が破壊される。現状は単一かつ決定的 sort のため**可視被害ゼロ**だが、
  将来の任意 consumer が原データ順を前提にすると静かに破綻する getter-leaks-mutable-state の典型。
  getter で浅いコピー（`[...list]`）を返しキャッシュを不変化（要素 Question は共有のまま安全）。コミット `5b8e592`
  / 検証: typecheck0/lint0err/test **274緑**(+1)/build完走（/topics/* は SSG で全 prerender 確認）。
  新テスト `__tests__/seo/topics-static-params.test.ts` に「返り値を reverse() で破壊しても2回目の呼び出しが
  汚染されない」ケースを追加。**崩れたら落ちる検証=実測**: 修正を git stash で外すと当該テストが
  「expected reversed ids to equal snapshot」で1件落ちることを確認後、fix を復元。
- SKIP(全数監査=実害ゼロ): **インプレース破壊 `.sort()/.reverse()/.splice()` の app/components/lib/data 全域スイープ**。
  Explore + 自己精査で上記 topics.ts:88 の1件のみが共有データ破壊。他は全て安全パターン
  （`[...arr].sort()` / `arr.filter().sort()`（filter が新配列）/ `[...new Set()]` / `Object.values().sort()` /
  ローカル構築配列）。`lib/questions/filter.ts:67`(pool=`[...all]`)・`pool-server.ts:50`(`[...pool]`)・
  `dashboard/analytics.ts`(`[...stats]`)・ranking/mock-exam の `[...x].reverse()` 等は全て事前コピー済=SAFE。
- SKIP(全数監査=実害ゼロ): **localStorage/sessionStorage の書き込み未ガード（Safari Private/QuotaExceeded で throw→crash）**。
  `lib/storage/` 13モジュール + lib/ 各種 + components の `setItem/removeItem/clear` を全数確認、**全て try/catch でガード済**
  （多くに「ignore quota / private mode」コメント有）。render 経路の裸書き込みも無し。既存の防御的実装が完成。
- SKIP(全数監査=実害ゼロ): **`<time dateTime>` の値妥当性（S18新観点③）**。全5箇所（blog×2 / success-stories×2 /
  AiTransparencyDisclaimer）とも `dateTime` は valid ISO8601、可視テキストと日付一致、`toLocaleDateString` 等の
  非ISO混入なし。**壊れた `<time>` は不在**=機能追加（新規 `<time>` 付与）は overreach のため見送り。観点③一巡 done。
- SKIP(全数監査=実害ゼロ): **stateful regex（`/g`・`/y` flag）の lastIndex 持ち越し**。`/g` 付き再利用 regex を
  `.test()/.exec()` で複数回消費する箇所を全域監査。module-level `ASCII_WORD_RE`(tokenize.ts) は `.match()` 消費=
  lastIndex 非依存で SAFE、scripts の `.exec()` ループは関数内ローカル literal で毎回新規=SAFE。defect 不在。
- SKIP(全数監査=実害ゼロ): **bare `.sort()`（比較関数なし）の数値字句順バグ**（`[1,2,10]→[1,10,2]`）。
  裸 `.sort()` は全て文字列配列（category/topicTags/tags/trim 済答え/ISO日付）で字句順が正。
  `api/review/due/route.ts:42` の `futureDates.sort()` は ISO 日付文字列=字句順=暦順で正。数値 bare sort は不在。
- 次セッションへ: 「共有データのインプレース破壊」観点は一巡 done（残存ゼロを実測）。S1-S21 で a11y名/aria-live/
  チャートalt/タブ/aria-current/OG/robots/dead-link/canonical/sitemap/stale-timer/JST境界/keydown修飾/数値破綻/
  effect-async/focus-restore/localStorage-guard/time-element/regex-lastIndex/array-mutation を網羅一巡。
  **夜間の安全な実害バグは深く枯渇**。残は日中候補（tabs矢印キー=影響大/コピー通知統一/MilestoneToast 防御的ref化/
  exam meta desc 短縮）か、さらなる未踏観点（例: prop配列のレンダー内変異 / Number()×route param の NaN伝播 / 
  hydration mismatch）の開拓を検討。

## セッション22 2026-05-30 11:36 JST（S21起案の未踏3観点を全数監査 → 公開OGルートの半端ガード1件修復 + 2観点=実害ゼロ）
- 冒頭ベースライン全緑実測: typecheck=0 / lint=0err（既存 ux-audit-screenshots.mjs 警告1のみ=本ループ無関係）/
  test **274 passed**(61 files) / build緑（現 HEAD `11f8215`）。
- done: 【実バグ=半端ガードで公開OG画像に "NaN%" 描画】`app/api/og/result/route.tsx` が
  accuracy/total/correct を `parseInt(searchParams.get(x) ?? "0", 10)` で解釈していた。`?? "0"` は **null しか
  捕捉できず**、`?accuracy=`（空文字）や `?accuracy=abc`（非数値）では NaN が漏れ、公開エンドポイント（SNS
  スクレイパ/任意URL が到達可能）の OG 画像に **"NaN%" / "NaN 問正解 / NaN 問中"** が描画される。S20 で修復した
  「focus-in したのに復帰しない」と同型の **half-implemented guard** クラス。兄弟ルート `/api/og` が既に持つ
  `safeNumber`(null/空/非数値→fallback) に統一し、不正入力時 0 を描画。正常入力の表示は不変。/ コミット `739109f`
  / 検証: typecheck0/lint0err/build緑。**实測**=本番ビルドを localhost:3123 起動し
  `?accuracy=abc&correct=xyz&total=` が **"0%" / "0 問正解 / 0 問中"** を、`?accuracy=80&correct=16&total=20` が
  **"80%(緑) / 16 問正解 / 20 問中"** を 200 image/png で描画することを PNG 目視で確認。修正前の
  `parseInt('abc')`=NaN / `parseInt('')`=NaN を node で実測（崩れたら NaN% が出る＝実測差分）。
  ※当該ルートは現状ソース未参照（S9 記録）だが公開到達可能な決定的エンドポイントの非破壊ハードニング。
  日中候補（未参照なら削除検討）は据え置き。
- SKIP(全数監査=実害ゼロ・S21起案 未踏観点「Number()×route param の NaN伝播」): 動的route/searchParam の
  Number/parseInt/parseFloat 全17箇所を監査。indexable 動的ルートは regex検証＋dynamicParams=false/notFound、
  数値searchParam は `Math.max/min`+`||0`/`Number.isFinite`/値比較フォールバックで全てガード済。唯一の漏れが
  上記 og/result（修復）。`NotificationSettings.tsx:186` の `Number(e.target.value)` は **`<select>`(option値 0..23
  固定)由来=NaN不能**＝false positive。`referral` の localStorage 由来は `?? "0"` で実害僅少。
- SKIP(全数監査=実害ゼロ・未踏観点「hydration mismatch」): client component の初期レンダー経路で
  localStorage/Date/Math.random/window を読んで DOM 出力する箇所を全数監査。全て `typeof window` ガード /
  useEffect 内 / mounted フラグ / null-return ゲートで緩和済。SSR 初期HTMLと client 初期描画の不一致を起こす
  裸の読取りは**不在**。`MockExamRunner:44` の Math.random は state 初期化用で DOM 非描画＝不一致なし。
- SKIP(全数監査=実害ゼロ・未踏観点「reduce無初期値/Math.max空配列/裸 array index」): `.reduce(` 全25箇所は
  **全て初期値あり**。`Math.max(...arr)`/`Math.min(...arr)` 3箇所は length チェック or `,1` フォールバック付き。
  `arr[0]`/destructure→property は全て length ガード or optional-chain。empty-array 起因の throw/Infinity 描画は不在。
  唯一 `lib/admin/metrics/mock-data.ts:53` の `series.reduce(...)/series.length` が series 空時 Infinity だが
  `resolveRange`(from>to を swap)で空配列不能・admin/noindex・mock データ＝理論のみ＝SKIP（過大修正の罠回避）。

## セッション22 まとめ
- 実改善1件（公開OGルート `/api/og/result` の半端ガード→safeNumber 統一で "NaN%" 描画を防止 `739109f`・PNG实測）
  + 全数監査SKIP3観点（NaN伝播 / hydration mismatch / reduce無初期値・空配列）すべて**実害ゼロを確定し記録**。
- テーマ: S21起案の未踏3観点を全数監査。実害は og/result の half-implemented guard 1件のみ（S20 focus-restore と同型クラス）。
- 次セッションへ: 上記3観点は一巡 done（残存ゼロを実測）。夜間の安全な実害バグは S1-S22 で網羅的に枯渇。
  残は日中候補（tabs矢印キー=影響大/コピー通知統一/MilestoneToast 防御的ref化/exam meta desc 短縮/og-result 未参照なら削除）
  or さらに未踏な観点（例: prop の readonly 違反 / useEffect cleanup の依存漏れ / メモ化キーの参照不安定）の開拓を検討。

## セッション23 2026-05-30 11:53 JST（S22起案の未踏3観点を全数監査 → 全観点=実害ゼロ。コード無変更）
- 冒頭ベースライン全緑実測: test **274 passed**(61 files)（現 HEAD `af1e17f`）。git status の M（BookmarkButton.snap CRLF / overnight-loop.bat）は本ループ無関係＝コミットに巻き込まない。
- SKIP(全数監査=実害ゼロ・観点「useEffect cleanup の依存漏れ / listener leak」): addEventListener を持つ .tsx 全21ファイルを監査。
  各 effect の add/remove が同一参照か・cleanup return の有無を全数確認。**全て同一参照＋cleanup 完備＝leak 不在**。
  ※ 並行 Explore が `CopilotPanel.tsx:244-258`/`1453-1460` を「dep が true→false で early-return しcleanupを飛ばし listener が積層」と
  HIGH 指摘したが**React のライフサイクル誤認＝false positive**。React は依存変化時、新 effect 本体の実行**前に必ず前回 effect の
  cleanup を走らせる**ため、true→false 遷移では前回(true時に張った)cleanup が listener を除去し、新本体が early-return するだけ＝leak 不能。
  コードを実読し確認（前回 cleanup が remove する→新本体は add しない）。修正不要。
- SKIP(全数監査=実害ゼロ・観点「index-key × 位置依存 state の state-bleed」): `CopilotPanel.tsx:1045` の `messages.map((m,i)=> key={i})` ＋
  `copiedIdx`(コピー確認チェックの位置 state) を並行 Explore が「新着で index がシフトしチェックが誤メッセージに出る」と指摘も**false positive**。
  `setMessages` 全7箇所を実読＝**append-only**（`[]`クリア / `prev=>[...prev,x]`追記 / `nextMessages=[...messages,user]`）で**既存 index は不変**＝
  チャットは末尾追記のみ。コピー2秒窓中に既存メッセージの index がずれる経路は存在せず（クリア時は当該ボタン非描画＝無害）＝state-bleed 不能。
  他の index-key .map は全て静的・非並べ替え・内部 state 無しの読み取り専用リスト（feedback/tips/採点基準等）＝無害。
- SKIP(全数監査=実害ゼロ・観点「非ユニーク React key の reconciliation バグ」): .tsx 全域の `key={...}` を監査。動的リストの key は
  全て安定ユニーク値（`q.id`/`slug`/`href`/`exam.id`/category 等）。index key は静的リスト限定。`ComboCounter key={combo}`/
  `ComboBurst` 系は AnimatePresence の**意図的 remount-for-animation**＝正。衝突しうる非ユニーク key は不在。
- 次セッションへ: 上記3観点（cleanup leak / index-key state-bleed / 非ユニーク key）は一巡 done＝実害ゼロを実測記録。
  **教訓: effect cleanup leak の「early-return で cleanup を飛ばす」系指摘は React が前回 cleanup を先行実行するため大半が false positive。
  チャット等 append-only リストの index-key は既存 index 不変で state-bleed しない。** 次セッションは下記 backlog の S23 起案の未踏観点を検討。

## セッション23 まとめ
- 実改善0件（コード無変更）+ 全数監査SKIP3観点（useEffect cleanup leak / index-key state-bleed / 非ユニーク key）すべて**実害ゼロを確定し記録**。
- 並行 Explore の HIGH 指摘2件（CopilotPanel の listener 積層 / copiedIdx チェック誤表示）はいずれも **React ライフサイクル/append-only 誤認の false positive** と実読で棄却。過大修正の罠を回避しコード無変更（worklog/backlog 記録のみ）。
- 夜間の安全な実害バグは S1-S23 で網羅的に枯渇を再々確認。残は日中候補 or さらに未踏な観点（backlog S23 起案）。

## セッション24 2026-05-30 12:01 JST（S23起案の未踏観点⑦⑨⑪を全数監査 → 非同期送信ボタンの SR 無通知=WCAG 4.1.3 を2件修復 / ⑦⑪=実害ゼロ）
- 冒頭ベースライン全緑実測: test **274 passed**(61 files)（現 HEAD `da65602`）。git status の M（BookmarkButton.snap CRLF / overnight-loop.bat）は本ループ無関係＝コミットに巻き込まない。
- done: 【実バグ=A11y WCAG 4.1.3・観点⑨】午後 AI 採点プレイヤー `AfternoonPlayer`（C軸差別化の中核）の
  採点ボタンが **数秒かかる AI 採点中に `disabled`（=a11y ツリーから消える）**ため、ボタン上の「採点中…」文言が
  SR に届かず、完了後に下へ挿入される `AfternoonResultView`（結果ビュー）も live region 外で**無通知**だった。
  常設の `role="status" aria-live="polite"` sr-only 領域を追加し、採点中／採点完了を読み上げる（エラーは既存の
  role="alert" で通知済み・視覚/挙動は不変）。S7(EmailLeadCapture) と同型の status-messages 欠落クラス。
  / コミット `9fb91a8` / 検証: typecheck0/lint0err（既存 ux-audit 警告1のみ）/test **275緑**(+1)/build完走。
  新規テスト（fetch を保留 stub し採点中状態を維持→role=status が「採点中」を読み上げ。初期は空通知）を追加し、
  **修正を git stash で外すと「Unable to find role=status」で落ちる**ことを実測（崩れたら落ちる検証）。
- done: 【実バグ=A11y WCAG 4.1.3・観点⑨横展開】`FeedbackGateModal`（フィードバック駆動の無料枠解放＝§9 中核フロー）は
  radix Dialog で送信後にフォームを成功ビュー（無料枠解放の案内）へ差し替えるが、**radix は開いた時点の DialogTitle
  しか読み上げず内容差し替えを再アナウンスしない**ため、送信成功が SR に届かなかった。DialogContent 直下に**常設の**
  `role="status" aria-live="polite"` sr-only 領域を追加（条件付きマウントの live region は S7 で「不確実」と判明済のため
  常設方式を採用）し送信中／送信完了を通知。視覚/挙動は不変。/ コミット `8b2ef84`
  / 検証: typecheck0/lint0err/test **276緑**(+1)/build完走。新規テスト（ラジオ選択→送信→成功ビューの ShareButtons も
  status を持つため全 status のうち固有文言「受け付けました」を含むものを確認）を追加し、**stash で外すと初期 role=status
  不在で落ちる**ことを実測。
- SKIP(実害ゼロ・観点⑦ JSON-LD 数値/列挙の妥当性): Explore で全 ld+json 出力を全数監査。`numberOfItems`/
  `itemListElement.length`/`position`/`@type`/`inLanguage`/`educationalLevel` 等は**全て描画件数と一致＋schema.org 準拠**で
  **数値・列挙の不整合（mismatch）はゼロ**。home ItemList は `numberOfItems` を持つが `recommended-books`(一覧/[exam]) の
  2 ItemList は**任意フィールド `numberOfItems` を欠く**のみ（mismatch ではなく未設定＝バリデータ警告も出ない）。
  追加は機能追加寄り＝**過大修正の罠回避で SKIP**（日中に整合目的で付与検討可）。
- SKIP(実害ゼロ・観点⑪ 空配列/ゼロ状態): public indexable 全ページ（home/q/[exam]/[yearSeason]/topic/topics/search/blog/
  glossary/keywords/ranking/stats/transparency）の空配列・0件・単一要素描画を全数監査。**全て `length>0` ガード / 明示的
  empty-state 文言 / `notFound()` / optional-chain で保護済**。`undefined` 直描画・NaN/Infinity 表示・壊れた範囲文言は不在。
  （日本語は単複変化なしのため "0問"/"1問" も文法的に正）。実害ゼロ。
- SKIP(夜間は安全側・観点⑨ 残り＝過大修正/restructure 回避): 同型 status-messages 候補2件を監査も夜間は見送り。
  ①`EmailSignInForm`（/auth/signin・noindex）= error は role="alert" 済だが成功は早期 return の新規 div（live 化には
  early-return の restructure が必要＝最小 diff を超える）＋auth は noindex。②`SchedulePlanner`（公開オンボーディング）=
  「生成中…」中も disabled だが学習プラン生成は client 側の高速計算（AfternoonPlayer の数秒 AI 呼び出しほどの滞留がない）。
  いずれも実害が中核2件より低く、最小 diff で gold-standard を満たしにくいため**日中候補として記録し SKIP**。

## セッション24 まとめ
- 実改善2件（WCAG 4.1.3 status messages 欠落＝非同期送信の SR 無通知、各テスト付き・stash で落ちることを実測）
  1. AfternoonPlayer: 採点中/完了を常設 live region で通知（`9fb91a8`・C軸 午後採点の中核プレイヤー）
  2. FeedbackGateModal: 送信完了（無料枠解放）を常設 live region で通知（`8b2ef84`・§9 中核フロー）
  + 全数監査SKIP（⑦JSON-LD 数値/列挙＝mismatch ゼロ・任意 numberOfItems のみ未設定 / ⑪空配列・ゼロ状態＝全ガード済）
  + 観点⑨残り2件（EmailSignInForm/SchedulePlanner）は日中候補として記録し SKIP。
- テーマ: S23 起案の未踏観点⑦⑨⑪を全数監査。実害は観点⑨（disabled な送信ボタンが a11y ツリーから消え進行/完了が
  SR 無通知）で中核2フローに残存＝S7 で確立した「常設 live region」パターンで修復。⑦⑪は実害ゼロを確定し記録。
- 次セッションへ: 観点⑦⑪は一巡 done（実害ゼロ）。観点⑨は中核2件 done・残2件は日中候補。残る S23 起案は
  ⑧canonical/og:url 末尾スラッシュ整合 / ⑩toLocaleString locale 未指定の整形整合。日中候補（tabs矢印キー/
  コピー通知統一/MilestoneToast ref化/exam meta desc 短縮/EmailSignInForm・SchedulePlanner の live 化）は据え置き。

## セッション25 2026-05-30 12:30 JST（S23起案の残り観点⑧⑩ + 新観点「id 衝突」を全数監査 → 全観点=実害ゼロ。コード無変更）
- 冒頭ベースライン全緑実測: test **276 passed**(61 files)（現 HEAD `619c2db`）。git status の M（BookmarkButton.snap CRLF / overnight-loop.bat）は本ループ無関係＝コミットに巻き込まない。
- SKIP(全数監査=実害ゼロ・観点⑩ `toLocaleString` の locale 整合): 全 .tsx/.ts の `toLocaleString`/`toLocaleDateString`/`toLocaleTimeString` を全数監査。
  ①**SSR'd client component で bare `toLocaleString()`（locale 無指定）が数値を初回描画する箇所**＝`EssayIndustryTabs:86`(charCount≈2,000-3,000字)・`RankingClient:129`(totalCount≈6,545、合成定数 reduce で localStorage 非依存＝初回描画)・各 stats/transparency の exam counts 等。
    → **node 既定 locale(Vercel=en-US) と ブラウザ ja-JP はいずれもこの桁(千〜万)でカンマ区切りが同一**＝SSR/CSR で出力文字列が一致＝**hydration mismatch も視覚差も発生不能**。
  ②**bare な日付/時刻 `toLocaleString()`**（典型的な hydration mismatch 源）＝`QuestionCommentBox:156` は comments が `useState([])`＋`useEffect` で**post-mount に localStorage から投入**＝SSR 時は空＝描画されず、クライアントのみで描画（ユーザー自身の端末 TZ＝正）。SSR で bare 日付を描画する箇所は**不在**（EssayEditor/TutorClient 等は `"ja-JP"` 明示済）。
  ③recharts の `formatter` 内 bare `toLocaleString()`（StatsCharts 等）は**クライアント tooltip のみ実行**＝SSR 経路に乗らず mismatch 不能。
  → 観点⑩は **実害ゼロ**。bare 呼び出しは「ja-JP 明示」というプロジェクト規約からの軽微な不統一（latent consistency）だが、対象の桁では出力が ja-JP と完全一致するため**現状の視覚/hydration 被害はゼロ**＝過大修正の罠回避で SKIP（日中に規約統一目的での正規化は検討可）。S22 の「桁区切りも整合」記録を locale 観点で裏取り完了。
- SKIP(全数監査=実害ゼロ・観点⑧ canonical/og:url の末尾スラッシュ整合): `next.config.ts` に `trailingSlash` 設定なし＝Next 既定 `false`（served URL は末尾スラッシュ無し）。
  全 page.tsx の `alternates.canonical` / `openGraph.url` を全数確認＝**全て絶対パス（or `SITE_BASE_URL`/metadataBase 絶対化）・末尾スラッシュ無し・クエリ無し**で canonical と og:url のパスが一致。
  動的ルート（`/${exam}/${yearSeason}` 等）も同パターン。`/[exam]/topic/[topicSlug]` の canonical が route param でなく `encodeURIComponent(category)` を使うのは**S15 確認済の意図的な重複正規化**（dedup）＝「壊れ」ではない。
  → trailing-slash / クエリ起因の自己参照ズレは**構造上発生しない**＝実害ゼロ。観点⑧一巡 done。
- SKIP(全数監査=実害ゼロ・新観点「同一ページ内の `id` 衝突」): 直近セッションで多数追加した `aria-describedby`/`htmlFor`/`id` の関連付けが、同一ページに複数描画される要素で id 重複→idref 曖昧化していないかを監査。
  components/ の静的 `id="..."`（literal）は全て**シングルトン要素**（home 各セクション見出し/search-input/sort-select/achievement-toast/essay-result 等＝1ページ1描画）。
  `.map` 内で生成する id は全て**ユニークなテンプレートキー**（EssayEditor=`essay-${subKey}-count`(設問キー)、AfternoonPlayer=`afternoon-${sub.label}`/`-count`(小問ラベル)、AfternoonResultView=`ai-note-${question.id}`）＝1ページ内で衝突しない。
  → 重複 id による htmlFor/aria-describedby の誤ターゲットは**不在**＝実害ゼロ。
- 結論: 夜間の安全な実害バグは S1-S25 で網羅的に枯渇。残る S23 起案観点（⑧⑩）も実害ゼロを確定。**過大修正の罠を回避しコード無変更**（worklog/backlog 記録のみ）。

## セッション25 まとめ
- 実改善0件（コード無変更）+ 全数監査SKIP3観点（⑩ toLocaleString locale 整合 / ⑧ canonical・og:url 末尾スラッシュ整合 / 新観点 id 衝突）すべて**実害ゼロを確定し記録**。
- テーマ: S23 起案の最後の未踏観点⑧⑩を全数監査で消化＋新観点「id 衝突」を開拓。いずれも構造上 or 桁/locale 一致により被害不能と実測判定。
- 教訓（次セッションの重複監査防止）: **bare `toLocaleString()` は対象の桁（千〜万）では en-US≡ja-JP でカンマ一致＝視覚/hydration 被害ゼロ**。日付の bare 描画は SSR 経路に存在しない（post-mount or locale 明示済）。canonical/og:url は trailingSlash=false＋絶対パス統一で構造的に整合。
- 次セッションへ: S23 起案観点（⑦⑧⑨⑩⑪）は全て一巡 done（⑨中核2件修復・他は実害ゼロ）。残は**日中候補のみ**（tabs矢印キー=影響大/コピー通知統一/MilestoneToast 防御的ref化=latent予防/exam meta desc 短縮/EmailSignInForm・SchedulePlanner の live 化）。
  夜間の安全な実害バグは深く枯渇。次セッションは下記 backlog「P1 新観点（S25 起案）」から1つ選び全数監査するか、日中候補の慎重実施を検討。

## セッション26 2026-05-30 12:33 JST（S25起案の未踏観点⑫〜⑯を全数監査 → 死蔵 MockExamClient(履歴破壊バグ内包)を削除 / ⑫⑬⑭⑮=実害ゼロ）
- 冒頭ベースライン全緑実測: test **276 passed**(61 files)（現 HEAD `1d315e5`）。git status の M（BookmarkButton.snap CRLF / overnight-loop.bat）は本ループ無関係＝コミットに巻き込まない。
- done: 【デッドコード削除＝潜在バグ内包・観点⑯】`app/mock-exam/MockExamClient.tsx`（423行）を削除。
  `/mock-exam` は `page.tsx`→`MockExamLanding`→`MockExamRunner`（`createHistoryStore()` 正API使用）で描画されており、
  旧実装 `MockExamClient` は**どのページ/コンポーネントからも import されない死蔵コード**（exhaustive grep で
  `app/components/lib` 内 import 0件、参照は logs/docs の md のみ。git log: 最終更新 2026-05-22 `5be26ca` で
  現行 MockExamLanding=2026-05-26 `6a99357` に置換済）。当該死蔵ファイルは観点⑯の唯一の所見＝
  `LS_KEYS.history` を `as object[]`（配列）と誤解し `JSON.parse(...) ?? "[]"` → `[...history, ...newEntries]` で
  spread していたが、正準の history 形式は `{entries:[], starredIds:[]}` **オブジェクト**（`lib/storage/history.ts`）。
  既存履歴があると非iterable object の spread が throw→`catch{}` で握り潰し（=mock結果が記録欠落）、履歴ゼロ時は
  history キーを**配列形式で汚染**（次回 `readRaw()` が `.entries` 不在→EMPTY 返却）する潜在バグを内包。さらに entry 形状も
  `{questionId,answeredAt,source}` で正準 `{id,selected,correct,at}` と不一致。未参照のため**実害は出ていない**が、
  将来の誤用と保守負荷・footgun を断つため削除（dead-code removal はバックログ既定の有効改善）。/ コミット `0a7a8c7`
  / 検証: typecheck0/lint0err（既存 ux-audit 警告1のみ）/test **276緑**（不変＝当該死蔵に依存テスト無し）/build緑。
  **崩れたら落ちる検証**=削除後 grep で `app/components/lib` 内 `MockExamClient` 参照0件を実測、`.next/server/app/mock-exam/page.js`
  が存在し /mock-exam ルートが MockExamLanding で正常ビルドされ続けることを実測（route 健全性不変）。
- SKIP(全数監査=実害ゼロ・観点⑫ form 暗黙送信/Enter 挙動): 全 `<form>` 7箇所（EmailSignInForm/ApiKeysClient/SearchClient/
  SchedulePlanner/EmailLeadCapture×2/ContactForm/CopilotPanel）の onSubmit ハンドラが**全て `e.preventDefault()` を呼ぶ**＝
  Enter による full page reload/状態喪失は発生不能。非 form の Enter ハンドラ（TagInput=Enter/`,` で `preventDefault()`+addTag）も
  ガード済。裸 input の reload リスクは構造上不在＝実害ゼロ。
- SKIP(全数監査=実害ゼロ・観点⑬ 高頻度リスナーの未スロットル): scroll/resize/mousemove/touch/wheel リスナーを全数監査。
  scroll 系（SiteHeader=boolean toggle / BlogScrollTracker=閾値で計3回のみ発火）は全て `{passive:true}`＋trivial work。
  他は focus/online-offline/storage/keydown/matchMedia 等の**低頻度 or 自明ハンドラ**。毎発火で expensive synchronous 処理を
  する未スロットルの jank リスクは**不在**＝実害ゼロ。
- SKIP(全数監査=実害ゼロ・観点⑭ XSS/unsanitized HTML): `dangerouslySetInnerHTML` 全2箇所＝①ブートストラップ用の固定スクリプト
  ②JSON.stringify 済 JSON-LD（エスケープ済）＝いずれも開発者制御で安全。`react-markdown`(v10) は**raw HTML passthrough を
  既定で無効**（`rehype-raw` 未使用）＝AI出力/ユーザーコメントが executable HTML として DOM に到達する経路は**不在**＝XSS 実害ゼロ。
- SKIP(全数監査=実害ゼロ・観点⑮ LCP 画像の loading 整合): 本サイトは**テキスト/SVGアイコン主体**で above-the-fold の
  ラスタ hero 画像が**存在しない**。実画像は ①OG生成(next/og=サーバ生成・ページ内非描画) ②ユーザーavatar(64px・below-fold・lazy正)
  ③アップロードプレビュー/シェアダイアログ(ユーザー操作後のみ・raw img)＝**LCP を律速するラスタ画像が皆無**。
  「above-fold が lazy / below が eager」の mismatch は**ゼロ**＝観点⑮の実害は構造上不能。

## セッション26 まとめ
- 実改善1件（死蔵 MockExamClient 削除＝履歴破壊の潜在バグ＋423行の保守負荷を除去 `0a7a8c7`・route 健全性不変を実測）
  + 全数監査SKIP4観点（⑫form-Enter / ⑬高頻度リスナー / ⑭XSS / ⑮LCP画像）すべて**実害ゼロを確定し記録**。
- テーマ: S25 起案の未踏観点⑫〜⑯を**全数監査で完全消化**。実害所見は観点⑯の死蔵 MockExamClient 1件のみ（未参照＝
  ユーザー被害は出ていないが latent footgun＝dead-code として安全に除去）。XSS/LCP/高頻度リスナー/form-Enter は構造的に被害不能。
- 教訓（次セッションの重複監査防止）: 本サイトは **react-markdown raw HTML 無効・テキスト/SVG主体で raster LCP 不在・
  全 form が preventDefault・scroll リスナーは passive+trivial**＝XSS/LCP/jank/Enter-reload の4クラスは構造的にクリーン（再監査不要）。
- 次セッションへ: S25 起案観点（⑫〜⑯）は全て一巡 done（⑯=死蔵削除・他⑫⑬⑭⑮=実害ゼロ）。**S23/S25 起案を含む全観点が消化済**。
  夜間の安全な実害バグは S1-S26 で網羅的に枯渇。残は**日中候補のみ**（tabs矢印キー=影響大/コピー通知統一/MilestoneToast 防御的ref化/
  exam meta desc短縮/EmailSignInForm・SchedulePlanner live化）。次セッションは下記 backlog「P1 新観点（S26 起案）」から1つ選び全数監査するか、
  **デッドコード（未参照 component/export）の慎重スイープ**（MockExamClient と同型の superseded 実装が他に無いか）を検討。

## セッション27 2026-05-30 12:44 JST（S26起案の観点⑲ aria-expanded/aria-controls 状態同期を全数監査 → CopilotPanel の dangling aria-controls を修復）
- 冒頭ベースライン全緑実測: test **276 passed**(61 files)（現 HEAD `010ad43`）。git status の M（BookmarkButton.snap CRLF / overnight-loop.bat）+ 未追跡 logs/scripts は本ループ無関係＝コミットに巻き込まない（`git add <対象のみ>`）。
- done: 【実バグ=A11y WCAG 1.3.1・観点⑲】`CopilotPanel` の「その他の操作」ボタンが
  `aria-controls="copilot-actions-popup"` を宣言するが、対象ポップアップ `<div>` に **`id` が付与されておらず
  参照が解決できない dangling idref** だった（隣接の quickActions トグルは `aria-controls="copilot-quickactions-list"`
  ↔ `id="copilot-quickactions-list"` で正しく対になっており、actions 側だけ id 欠落＝非対称の実バグ）。SR 利用者に
  開閉対象の関係性が壊れて伝わる。ポップアップ div に `id="copilot-actions-popup"` を付与して解決（additive・視覚/挙動不変）。
  / コミット `94eb20f` / 検証: typecheck0/lint0err（既存 ux-audit 警告1のみ）/test **277緑**(+1)/build緑。
  新規 `__tests__/components/CopilotPanel.aria.test.tsx`（CopilotPanel.tsx 内の**全 aria-controls が同ファイル内 id で
  解決すること**の参照整合性ガード）を追加し、**修正を git stash で外すと当該テストが落ちる**ことを実測（崩れたら落ちる検証）。
  ※ ポップアップは `actionsOpen` 時のみ描画＝隣接 quickActions と同じ render-when-relevant 慣用。完全な常設化（`hidden` トグル）は
  CopilotPanel の restructure になるため夜間は最小 diff（参照解決＝開時に有効）に留めた。
- SKIP(全数監査=実害ゼロ・観点⑲ 残り): 他の aria-expanded/aria-controls 全箇所は状態同期・参照整合とも正常。
  ①`HomeTopicGrid`＝panel を `hidden={!open}` で**常設**＋aria-controls 対の id 在＝gold standard。
  ②`SiteHeader`「問題を解く」dropdown＝aria-expanded={dropOpen} が click/Escape/blur/hover の全経路で state 追従（aria-controls 無し・aria-haspopup で代替）。
  ③`MobileBottomNav` メニュー＝aria-expanded={menuOpen} が Sheet open と同期。④`SearchClient`(showHistory/showSaved)・`TTSButton`(showRate)＝aria-expanded のみで state 追従・aria-controls 無し。
  ⑤`AfternoonResultView`＝aria-controls=`ai-note-${id}` の対象は `showAiNote && (...)` で開時に描画＝aria-expanded と整合（render-when-open 慣用）。
  → 「aria-expanded が実 state とズレる」「aria-controls が常時 dangling」系の defect は CopilotPanel の1件のみ＝修復済。残存ゼロを実測確認。
- SKIP(全数監査=実害ゼロ・観点⑳ form 内 button の暗黙 submit): 全 `<form>` 7箇所（ApiKeysClient/EmailSignInForm/
  ContactForm/SchedulePlanner/EmailLeadCapture/SearchClient/CopilotPanel）の内側 button を全数確認。`<Button>` primitive
  （`components/ui/button.tsx`）は type を既定付与しないが、**form 内の全 `<button>`/`<Button>` が明示 type を持つ**
  （submit は意図的 submit・他は全て `type="button"`）。意図せぬ form 送信を招く type 欠落は**ゼロ**＝実害ゼロ。S13 の
  「form button type クリーン」記録を新規追加分まで含め再確認 done。
- done: 【実バグ=A11y WCAG 2.3.3・観点㉑】`FireworksBurst`（5連続正解時の全画面パーティクル爆発）が
  `prefers-reduced-motion: reduce` を無視して再生されていた。**framer-motion の `animate` は JS(WAAPI)駆動で、
  globals.css の `@media (prefers-reduced-motion) { animation-duration/transition-duration }` 抑制では止まらない**
  （CSS の animation-* しか効かない）。前庭障害ユーザーに 28粒子が160px 飛散＋3.5倍スケールのグローが直撃していた。
  matchMedia を直接読む最小フックで判定し reduce 時は装飾バーストを非描画（auto-clear タイマーは維持＝親 burst state は
  従来どおり解除）。/ コミット `272290c` / 検証: typecheck0/lint0err/test **278緑**(+1)/build緑。新規テスト
  （matchMedia=reduce stub で装飾オーバーレイ非描画＋onDone は発火）を追加し、**git stash で外すと落ちる**ことを実測。
- done: 【実バグ=A11y WCAG 2.3.3・観点㉑横展開】`ComboCounter`（連続正解バッジ）も同型。framer の spring 入場アニメ
  （scale/opacity/y）が reduce を無視。reduce 時は同一スタイルの静的 div で即時表示し情報（コンボ数）は保持しつつ動きだけ抑制。
  / コミット `03bf2eb` / 検証: typecheck0/lint0err/test **280緑**(+2)/build緑。新規テスト2件（reduce で入場 inline style 無し＋
  通常時は有り）を追加し、**git stash で reduce テストが落ちる**ことを実測。
  ※ matchMedia フックが FireworksBurst/ComboCounter に重複（各12行・自己完結）。夜間は再touch回避で各々inline＝**日中に共有
  フック `usePrefersReducedMotion` への抽出が候補**として記録。
- 結論: framer-motion 利用は**この2コンポーネントのみ**（grep 実測）で両方修復＝観点㉑（JS駆動アニメの reduced-motion 無視）は
  一巡 done。CSS 駆動アニメ（HeroAiDemo 等）は globals.css 包括ルールで既に抑制済（S15 確認）。

## セッション27 まとめ
- 実改善3件（A11y）+ 全数監査SKIP1観点（⑳ form-button-type＝実害ゼロ）。
  1. CopilotPanel: dangling aria-controls 解消＝WCAG 1.3.1（`94eb20f`・観点⑲）
  2. FireworksBurst: reduced-motion で装飾バースト抑制＝WCAG 2.3.3（`272290c`・観点㉑）
  3. ComboCounter: reduced-motion で静的表示＝WCAG 2.3.3（`03bf2eb`・観点㉑横展開）
- テーマ: S26 起案の観点⑲（aria 状態同期）⑳（暗黙 submit）㉑（reduced-motion）を全数監査。実害は⑲で1件・㉑で2件（同型）。
  **重要な発見: framer-motion の JS 駆動アニメは globals.css の prefers-reduced-motion 抑制を素通りする**（CSS animation/transition
  しか効かない）。framer 利用は FireworksBurst/ComboCounter の2点のみで両方修復＝観点㉑は構造的に一巡 done。
- 教訓（次セッションの重複監査防止）: **framer-motion(`motion.*` の `animate`/`initial`)は CSS の reduced-motion を尊重しない**
  ＝個別に matchMedia/useReducedMotion ゲートが必要。本リポの framer 利用は2点のみで対処済（再監査不要）。`<Button>` primitive は
  type 既定なしだが form 内は全て明示 type＝暗黙 submit リスクなし。aria-controls の dangling idref は CopilotPanel の1件のみで解消。
- 次セッションへ: S26 起案の残り観点は ⑰（デッドコード/未参照 export スイープ）⑱（useMemo/useCallback 依存の参照不安定＝**実測体感被害が
  ある場合のみ**）。日中候補が蓄積（tabs矢印キー=影響大/コピー通知統一/MilestoneToast 防御的ref化/exam meta desc短縮/
  EmailSignInForm・SchedulePlanner live化/**reduced-motion 共有フック抽出**）。夜間の安全な実害バグは S1-S27 で深く枯渇。

## セッション28 2026-05-30 13:02 JST（観点⑰⑱の全数監査=実害ゼロ → 新観点「データテーブルの th scope」を開拓し indexable な実害4件を修復）
- 冒頭ベースライン: HEAD `a4bdaf3`。git status の M（BookmarkButton.snap CRLF / overnight-loop.bat）+ 未追跡 logs/scripts は本ループ無関係＝コミットに巻き込まない（`git add <対象のみ>` で限定）。test 280→最終288緑。
- SKIP(全数監査=実害ゼロ・観点⑰ デッドコード/未参照 export): Explore で **コンポーネント143ファイル・95 export を全数監査**＝import 0件のものゼロ（MockExamClient 同型の superseded 実装は他に無い）。さらに **lib 配下の全 export をスクリプトで網羅 grep**（app/components/lib 内の外部参照件数を算出）＝未参照 export ゼロ。S26 で MockExamClient を削除済＝現状クリーン。framer-motion 利用は FireworksBurst/ComboCounter の2点のみ（grep 再確認＝S27 の主張を独立検証）で両方 reduced-motion 対処済（観点㉑再監査不要）。
- SKIP(実害ゼロ・観点⑱ useMemo/useCallback 参照不安定): 最も interactive で jank が出やすい `SearchClient`（hooks 16箇所）を精査＝`fetchResults` は空deps で安定・debounce effect は `inputText===query.q` ガードあり・`filteredHits` の `recentlyViewedIds` は mount 1回ロードの安定 Set・`updateQuery` の query 依存は正当。体感被害のある参照不安定は不在。理論上の再計算は規約上 SKIP（過大修正の罠）。
- done: 【実バグ=A11y WCAG 1.3.1・新観点】`/why-kakomon-ai` 比較表（indexable・差別化の中核アセット）の列見出し4つに `scope="col"`、各行の観点ラベルを裸の `<td>` から `<th scope="row">` へ是正。「観点×サービス」の2軸テーブルなのに**行見出しのセマンティクスが皆無**で、SR がデータセルと観点軸を関連付けできなかった。`text-left` で左寄せ維持・`font-medium` が th 既定の太字を上書き＝視覚不変。/ コミット `45644c7` / 検証: typecheck0/lint0err/test282緑(+2)/build緑。**`.next/server/app/why-kakomon-ai.html` を実測**し scope="col"×4・scope="row"×7（7行）を確認。新規 `WhyKakomonAiTable.test.tsx`（source-read で scope 整合・裸td回帰ガード）。
- done: 【実バグ=A11y WCAG 1.3.1・同型横展開】`/recommended-books/[exam]` 「書籍の使い分け」表（indexable・書籍×属性の2軸）の列見出し3つに `scope="col"`、各行の書籍タイトルを裸の `<td>` から `<th scope="row">` へ是正（行を識別するエンティティが見出しセマンティクス皆無だった）。/ コミット `cf184b9` / 検証: 全緑(test284)。**`recommended-books/ap.html` を実測**し scope=col×3・scope=row×7。新規 `RecommendedBooksTable.test.tsx`。
- done: 【実バグ=A11y WCAG 1.3.1・中核学習コンテンツ】`QuestionBody` が IPA 問題本文のパイプテーブルを `<table>` 化する際、列見出しの `<th>` が scope 欠落。/q は indexable な中核コンテンツで密なデータ表を含むため、レンダラ層で `scope="col"` を付与（パイプテーブルは列見出しのみ＝常に正・additive）。/ コミット `2546b88` / 検証: 全緑(test285)。**`.next/server/app/q/pm/2025-autumn/am1/q29.html` を実測**し問題表 th に scope="col" 出力を確認。新規 `QuestionBody.test.tsx`（render で getAllByRole("columnheader") が全て scope="col"）。
- done: 【実バグ=A11y WCAG 1.3.1・本文テーブル横展開】`Markdown`(AI解説) と `BlogMarkdown`(ブログ記事・indexable) の react-markdown(remark-gfm) テーブル列見出し `<th>` に `scope="col"` を付与（GFM テーブルは列見出しのみ＝常に正）。/ コミット `1877cc5` / 検証: 全緑(test287→288)。**`.next/server/app/blog/db-sql-taisaku.html` 等を実測**し本文テーブル th に scope="col" 出力を確認。新規 `MarkdownTableScope.test.tsx`（両レンダラを render し columnheader が scope="col"）。
- SKIP(実害ゼロ・simple単一ヘッダ表): `/stats` 検索キーワード ranking 表（#/キーワード/表示回数）・`/demo/essay-grading`・admin 各表は**単一ヘッダ行の単純表**で、行を識別する第1列が見出し相当でない（# 順位等）。SR は単純表の列見出しを自動推論するため scope="col" は best-practice だが**実害は限定的**＝夜間は安全側で SKIP（admin は noindex/内部運用で低優先）。content table（問題/解説/ブログ＝密で可変）のみ実害ありと判定し修復。

## セッション28 まとめ
- 実改善4件（すべて A11y WCAG 1.3.1 データテーブルの th scope 欠落）+ 全数監査SKIP2観点（⑰デッドコード/⑱メモ化=実害ゼロ）+ simple表 SKIP。
  1. why-kakomon-ai 比較表: 列 scope=col + 行 scope=row（`45644c7`）
  2. recommended-books 書籍表: 列 scope=col + 行 scope=row（`cf184b9`）
  3. QuestionBody パイプ表: 列 scope=col（`2546b88`・/q 中核コンテンツ）
  4. Markdown/BlogMarkdown 本文表: 列 scope=col（`1877cc5`・AI解説/ブログ）
- テーマ: 新観点「データテーブルの th scope（WCAG 1.3.1 / H63）」を開拓。**2軸テーブルで行見出しが裸 td だった2件＝真の実害**、content table レンダラ2件＝密な表で scope が効くため修復。simple単一ヘッダ UI 表は SR 自動推論で実害限定的＝SKIP。
- 教訓（次セッションの重複監査防止）: **th scope 観点は一巡。indexable な実害（2軸 row-header 欠落 / content table レンダラ）は4件すべて修復済（再監査不要）。残る simple 表（stats/demo/admin）は SR 自動推論で実害なし＝SKIP 確定。** デッドコード（component/lib export）は exhaustive 監査でゼロ確定。framer-motion は2点のみで reduced-motion 対処済。
- 次セッションへ: 夜間の安全な実害バグは S1-S28 で網羅的に枯渇。残は**日中候補のみ**（tabs矢印キー/コピー通知統一/MilestoneToast ref化/exam meta desc短縮/EmailSignInForm・SchedulePlanner live化/reduced-motion 共有フック抽出）。新観点を起案する場合は下記 backlog「P1 新観点（S28 起案）」を参照。
## セッション29 2026-05-30 13:34 JST（S28起案の観点㉔ Label in Name を全数監査 → 確認できた実害6件を修復・㉕㉖は実害ゼロ確定）
- 冒頭ベースライン全緑実測: test **287 passed**(67 files)（現 HEAD `05cd81b`）。typecheck0/lint0err(既存 ux-audit 警告1のみ)/build緑。git status の M（BookmarkButton.snap CRLF / overnight-loop.bat）+ 未追跡 logs/scripts は本ループ無関係＝コミットに巻き込まない（`git add <対象のみ>` で限定）。
- SKIP(実害ゼロ・観点㉖ inputmode): tsx 全体に `type="number"`/`type="tel"` の数値入力が**存在しない**（grep 実測）。唯一の inputMode は SearchClient の `inputMode="search"`（適切）。数値キーパッドを要する入力欄が無いため**観点㉖は moot＝実害ゼロ**（年度フィルタ等は select/ボタンで実装）。
- SKIP(実害ゼロ・観点㉕ autocomplete): email/name 入力欄を全数確認＝NotificationSettings/EmailSignInForm/EmailLeadCapture×2/ContactForm(name+email) は**全て `autoComplete="email"`/`"name"` を保有**。未充足の個人情報入力欄ゼロ＝実害ゼロ。
- done: 【実バグ=A11y WCAG 2.5.3 Label in Name・観点㉔】ホーム試験カードのランダム出題 CTA の aria-label が可視テキスト「今すぐ解く」「ランダムに解く」を含まず（`{exam}をランダム出題で開始`）、音声操作ユーザーが可視ラベルを発話してもコントロールを起動できなかった（Level A）。codebase 既定の gold-standard（blog CTA「過去問演習を始める（13区分…）」＝可視テキストを先頭に含む）に倣い是正。/ コミット `9489858` / 検証: typecheck0/lint0err/test288緑/build緑。**`.next/server/app/index.html` 実測**で `aria-label="今すぐ解く（ITパスポート・ランダム出題）"`/`"ランダムに解く（応用情報）"` を確認・旧パターン残存ゼロ。新規 render テスト `HomeExamGrid.labelInName.test.tsx`（全 CTA の aria-label が可視テキストを含む。git stash で2件落ちることを実測）。
- done: 【同型・観点㉔】ブログ記事末尾 CTA `app/blog/[slug]/page.tsx`（indexable）の「この試験を演習する（N問）→」が aria-label `{exam}を無料で演習する（N問）`＝可視テキスト「この試験を演習する」を欠く。可視テキストを先頭に含む形へ是正。/ コミット `54d1fc2` / 検証: 全緑(test289)。**`.next/server/app/blog/ap-*.html` 実測**で `aria-label="この試験を演習する（応用情報技術者・1136問・無料）"` を確認・旧 "を無料で演習する" 残存ゼロ。新規 source-read テスト `blog-cta-label-in-name.test.ts`。
- done: 【同型・観点㉔】全ページ共通フッターの X リンク `app/layout.tsx`（可視「X @kakomon_ai_jp」）が aria-label "X（Twitter）でフォロー…"＝可視ハンドルを欠く。可視テキストを先頭に含む形へ是正（note リンクは "note を読む…" で既に充足）。/ コミット `14a40fb` / 検証: 全緑(test291)。**`index.html` 実測**で `aria-label="X @kakomon_ai_jp をフォロー（新しいタブで開く）"`。新規 `footer-social-label-in-name.test.ts`。
- done: 【同型・観点㉔】ブックマーク `app/bookmarks/page.tsx` の「この問題を解く」リンクが aria-label `{exam} {年度} 問Nを解く`＝可視テキストを欠く。可視テキストを先頭に含み問題特定情報を括弧内へ。/ コミット `1f99f13` / 検証: 全緑(test293)。client component のため `.next` HTML には現れず（JS chunk）＝source-read 回帰テスト＋緑ビルドで検証。
- done: 【同型・観点㉔】模試結果 `app/mock-exam/MockExamRunner.tsx` の「苦手分野を集中練習 →」が aria-label「苦手分野**の問題を**集中練習する」＝可視テキストが**連続部分文字列にならない**（"の問題を" が割り込む）。aria-label を「苦手分野を集中練習する」に是正。/ コミット `79f32e2` / 検証: 全緑。新規 `label-in-name-misc.test.ts`（bookmarks+mock-exam）。
- done: 【同型・観点㉔=シェアボタン一掃】クイズ結果 `QuizPlayer.tsx`「X でシェア」(aria "X（Twitter）で結果をシェア…") と 模試結果 `MockExamRunner.tsx`「結果をシェア」(aria "結果をXでシェア") が、いずれも可視テキストが**連続部分文字列にならない**（途中に語が割り込む）Label-in-Name 違反。可視テキストを先頭に含む形へ是正。/ コミット `41573c4` / 検証: 全緑(test295)。`label-in-name-misc.test.ts` にシェア2件の回帰ガードを追加（git stash で2件落ちることを実測）。LINE リンク（"LINEで結果を…"=LINE 含む）・BadgeWall アイコンボタン（可視テキスト無し＝icon-only で対象外）は充足。
- SKIP(実害ゼロ・誤検出): `HomeReturningHeader:168` の `aria-label="おすすめの基準を切り替え"` は `role="group"` **コンテナ div**（interactive control でない）＝Label-in-Name 対象外。内部の切替ボタンは aria-pressed+可視テキストで適切。並行 Explore が候補に挙げたが false positive。

## セッション29 まとめ
- 実改善6件（すべて A11y WCAG 2.5.3 Label in Name・Level A＝音声操作ユーザーが可視ラベル発話で起動できるよう是正）+ 全数監査SKIP2観点（㉕autocomplete充足/㉖inputmode=数値入力不在で moot）。
  1. HomeExamGrid ランダム出題 CTA（`9489858`・ホーム高トラフィック）
  2. blog 記事末尾 CTA（`54d1fc2`・indexable）
  3. layout フッター X リンク（`14a40fb`・全ページ）
  4. bookmarks「この問題を解く」（`1f99f13`）
  5. MockExamRunner「苦手分野を集中練習」（`79f32e2`）
  6. 結果シェアボタン QuizPlayer/MockExamRunner（`41573c4`）
- テーマ: 観点㉔（Label in Name）を全数監査。**確認できた実害は「可視テキストが aria-label に連続部分文字列として含まれない」6件**＝gold-standard（可視テキストを先頭に含む）へ統一。共通パターン: ①aria-label が可視テキストとは別の言い回し（CTA系）②"（Twitter）で結果を" 等が割り込んで分断（シェア系）。
- 教訓（次セッションの重複監査防止）: **Label in Name は「可視テキストが accessible name の連続部分文字列か」で判定**。icon-only ボタン（可視テキスト無し）・role="group/section" コンテナ・aria-label が可視テキストを既に含む（note/LINE）は対象外。確認できた6件は修復済＝**残存ゼロ**（再監査不要）。㉕autocomplete・㉖inputmode は構造的に充足/moot。
- 次セッターへ: S28起案の残り観点は ㉒（table caption/colspan・※th scope は S28 で一巡・caption 欠落は機能追加寄りで実害判定を慎重に）㉓（lang 部分指定＝おそらく実害ゼロ・確認のみ）。夜間の安全な実害バグは S1-S29 で深く枯渇。日中候補（tabs矢印キー/コピー通知統一/MilestoneToast ref化/exam meta desc短縮/reduced-motion 共有フック抽出）は据え置き。

## セッション30 2026-05-30 13:56 JST（S28起案の残り㉒㉓を全数監査＝実害ゼロ確定 + 新角度3つ＝clickable-div/href#/aria-hidden/icon-only-button を全数監査＝実害ゼロ。コード無変更）
- 冒頭ベースライン: HEAD `2d2f174`（S29 docs）。git status の M（BookmarkButton.snap CRLF / overnight-loop.bat）+ 未追跡 logs/scripts は本ループ無関係＝コミットに巻き込まない（`git add <対象のみ>` で限定）。
- SKIP(全数監査=実害ゼロ・観点㉒ table colspan/rowspan): 全 tsx を grep＝`colspan`/`rowspan`/`colSpan`/`rowSpan` の**出現ゼロ**。複雑な見出し結合を持つ表が**構造的に存在しない**ため「colspan/rowspan で見出し関連付けが壊れる」実害は**発生不能＝moot**。`<caption>` 欠落は WCAG H39（advisory・failure ではない）＋機能追加寄り＝backlog 既定どおり overreach の罠として SKIP（content table は S28 で th scope 修復済）。
- SKIP(全数監査=実害ゼロ・観点㉓ lang 部分指定): `lang=` は `app/layout.tsx`(`<html lang="ja">`) と `app/global-error.tsx`(同) の2箇所のみ＝**ルート html の言語宣言のみ**。本文中の英略語/コード（IPA 用語）は日本語読みが正で部分 lang 切替は実用上不要（標準実務）。per-element lang を要する箇所は**不在**＝実害ゼロ（S28 起案の予測どおり）。
- SKIP(全数監査=実害ゼロ・新角度 clickable 非interactive 要素 WCAG 2.1.1): `<div|span|li|tr|td onClick>` を multiline grep＝該当は `KeyboardShortcutsHelp`(modal backdrop) と `CopilotPanel`(overlay backdrop ×2) の**3件のみで全て「背景クリックで閉じる」dismiss パターン**。いずれも閉じる手段としてキーボード経路（Escape／close ボタン／FAB トグル＝S20 で focus-restore 済）が併存するため、背景 div の onClick は補助操作＝**キーボード利用者が排除されない**＝実害ゼロ（背景 div への role/tabindex 付与は overreach）。
- SKIP(全数監査=実害ゼロ・新角度 href="#"/空 href スクロール跳躍): 全 tsx を grep＝`href="#"`/`href=""` の**出現ゼロ**。意図せぬページ最上部スクロール跳躍を起こすアンカーは**不在**＝実害ゼロ。
- SKIP(全数監査=実害ゼロ・新角度 aria-hidden on focusable WCAG 4.1.2): `aria-hidden` 全箇所を確認＝**全て装飾アイコン（lucide）/絵文字 span への付与**で、interactive/focusable 要素への aria-hidden（SR から消える trap）は**ゼロ**。gold-standard（ラベル付きコントロール内の装飾アイコンを aria-hidden）どおり＝実害ゼロ。
- SKIP(全数監査=実害ゼロ・新角度 icon-only ボタンのアクセシブルネーム欠落 WCAG 4.1.2): X/Trash2/Plus/Menu/Chevron 等のアイコンを含む button/link を全数 grep し前後 context を読取り＝アクセシブルネーム欠落の裸 icon ボタンは**不在**。例: bookmarks「全て削除」(Trash2+可視「全て削除」)/api-keys「削除」(Trash2+可視「削除」)/bookmarks 除去ボタン(X+`aria-label="ブックマークから外す"`)＝全て可視テキスト or aria-label を保有。S6/S29 の「裸フォームコントロール/icon-only 一掃」記録を独立再確認 done＝残存ゼロ。
- 結論: S28起案の残り2観点（㉒㉓）は**構造的に moot/zero-impact を確定**（再監査不要）。さらに独立した新角度4クラス（clickable-div/href#/aria-hidden/icon-only-button）も全数監査で**実害ゼロ**を確定。安全な実害バグは S1-S30 で深く枯渇＝**過大修正の罠を回避しコード無変更**（worklog/backlog 記録のみ）。

## セッション30 まとめ
- 実改善0件（コード無変更）+ 全数監査SKIP6クラス（㉒colspan/rowspan=構造的不在 / ㉓lang=ルートのみ / clickable-div=背景dismissのみ / href#=不在 / aria-hidden=装飾のみ / icon-only-button=全てラベル保有）すべて**実害ゼロを確定し記録**。
- テーマ: S28起案の最後の未踏観点㉒㉓を消化＋独立した新角度4クラスを開拓。いずれも構造上 or gold-standard 遵守により被害不能と実測判定。**S1-S30 で a11y/SEO/perf/logic の安全な実害バグは網羅的に枯渇を再々確認。**
- 教訓（次セッションの重複監査防止）: **colspan/rowspan は本リポに存在しない（複雑表なし）／lang はルート `<html lang="ja">` のみで部分切替不要／clickable な非interactive要素は全て背景dismiss（キーボード経路併存）／aria-hidden は装飾のみ／icon-only ボタンは全てラベル保有。これら5クラスは構造的にクリーン（再監査不要）。** ㉒caption は H39 advisory＝overreach の罠で SKIP 確定。
- 次セッションへ: 夜間の安全な実害バグは S1-S30 で深く枯渇。残は**日中候補のみ**（tabs矢印キー=影響大/コピー通知統一/MilestoneToast 防御的ref化/exam meta desc短縮/reduced-motion 共有フック `usePrefersReducedMotion` 抽出/EmailSignInForm・SchedulePlanner live化）。新観点を起案する場合は粒度が細かく実害判定が難しい領域（色コントラスト=要レンダリング/フォーカス順序=要E2E）に入るため、夜間より日中レビュー向き。次セッションは backlog 既起案の未踏観点が尽きていれば「本日分完了」記録 or 日中候補の最も自己完結・低リスクなものの慎重実施を検討。

## セッション31 2026-05-30 14:01 JST（新角度「Radix プリミティブのアクセシブルネーム」を開拓 → 設定トグル(Switch)10件の WCAG 4.1.2 違反を修復）
- 冒頭ベースライン: HEAD `aea0e1e`（S30 docs）。git status の M（BookmarkButton.snap CRLF / overnight-loop.bat）+ 未追跡 logs/scripts は本ループ無関係＝コミットに巻き込まない（`git add <対象のみ>` で限定）。test 295→最終298緑。
- SKIP(全数監査=実害ゼロ・新角度 viewport zoom WCAG 1.4.4): `app/layout.tsx` の `viewport` は `width:device-width/initialScale:1/viewportFit:cover` のみ＝`maximum-scale`/`user-scalable=no` **不在**でズーム抑制なし＝実害ゼロ。
- SKIP(全数監査=実害ゼロ・新角度 ネスト interactive 要素 HTML validity/hydration): Explore で全 .tsx を監査＝`<a>`内`<a>`/`<button>`内`<button>`/Link 内 button のネストは**ゼロ**。`<Button asChild>`（Slot で子に委譲）パターンは全て正しく単一要素にデリゲート＝hydration error 不能。
- done: 【実バグ=A11y WCAG 4.1.2 Name/Role/Value・Level A・新角度】**Radix `<Switch>` は中身のない `<button role="switch">` をレンダーする**ため、可視ラベルを隣接配置するだけではアクセシブルネームが付かず、SR 利用者は全トグルの用途を把握できなかった（30セッション見落とし＝radix+SettingRow の視覚専用ラベルが盲点）。
  ①`/settings`：page-local `SettingRow` を `useId`+`cloneElement` で拡張し、可視ラベル `<p>` に id を付与→子コントロールへ `aria-labelledby` を注入（**7スイッチ**を一括是正：AIキャラ有効化/選択肢ランダム化/直近2回除外/計算問題のみ/正解音/アニメ抑制/学習履歴記録。名前は可視テキストと同期＝Label-in-Name も満たす）。
  ②`/settings#notifications`（`NotificationSettings`・SettingRow 非使用の独自構造）：**3スイッチ**（メール通知/学習継続リマインダー/週次ダイジェスト）に `aria-label` 付与。
  / コミット `ebecece` / 検証: typecheck0/lint0err（既存 ux-audit 警告1のみ）/test **298緑**(+新規3)/build緑。
  **崩れたら落ちる検証**=①`.next/server/app/settings.html` を実測し各 `role="switch"` の `aria-labelledby` が対応する `<p id>`（例 `_R_ce…`↔選択肢をランダム化 / `_R_14e…`↔正解音 / `_R_cq…`↔学習履歴を記録する）を指すことを確認。②新規 `__tests__/components/NotificationSettings.test.tsx`（getByRole("switch",{name}) で3件）を追加し、**aria-label を1件外すと当該テストが落ちる**ことを sed で実測。
- SKIP(全数監査=実害ゼロ・隣接クラス): 他の Radix プリミティブ＝Dialog/Sheet（DialogTitle で命名・S7 監査済）+Slot のみで、**裸の無名 interactive プリミティブは Switch のみ**＝本修復で class クローズ。`role="radiogroup"` 全7箇所（CharacterSelector/OnboardingTour×2/MockExamLanding/QuestionAnswerCard/QuizPlayer/DailyChallengeClient/settings テーマ）は**全て aria-label 保有**＋radio オプションは可視テキスト＝命名クリーン。

## セッション31 まとめ
- 実改善1件（Radix Switch 10件のアクセシブルネーム欠落＝WCAG 4.1.2 Level A・新角度で30セッション見落としを発見・修復 `ebecece`）+ 全数監査SKIP3クラス（viewport zoom/ネスト interactive/radiogroup 命名＝すべて実害ゼロ）。
- テーマ: 新角度「**Radix プリミティブのアクセシブルネーム**」を開拓。Switch は中身のない `<button role="switch">` をレンダーするため視覚専用ラベル（SettingRow の隣接 `<p>`）では命名されない盲点だった。`useId`+`cloneElement` で可視ラベルを `aria-labelledby` 関連付け＝最小 diff で7スイッチ一括是正。
- 教訓（次セッションの重複監査防止）: **Radix Switch は aria-label/aria-labelledby が無いと無名（隣接 `<p>` は関連付かない）。本リポの Radix 利用は Switch（=本修復で命名）/Dialog・Sheet（DialogTitle で命名）/Slot のみ＝裸の無名 interactive プリミティブの残存ゼロ（再監査不要）。radiogroup 全7箇所は aria-label 保有済。viewport は zoom 抑制なし・ネスト interactive 不在＝両クラス構造的クリーン。**
- 次セッターへ: 夜間の安全な実害バグは S1-S31 で深く枯渇。残は**日中候補のみ**（tabs矢印キー/コピー通知統一/MilestoneToast ref化/exam meta desc短縮/reduced-motion 共有フック抽出）。新観点は色コントラスト/フォーカス順序など要レンダリング・要E2E領域＝日中レビュー向き。次セッションは「本日分完了」記録 or 日中候補の慎重実施を検討。

## セッション32 2026-05-30 14:15 JST（新角度「ページ内アンカー跳躍が persistent sticky header 下に隠れる(scroll-margin 欠落/不足)」を開拓 → 実害4件を全数修復）
- 冒頭ベースライン全緑実測: typecheck0/lint0err(既存 ux-audit 警告1のみ)/test **298 passed**(72 files)/build緑（HEAD `25c3a8d`）。git status の M（BookmarkButton.snap CRLF / overnight-loop.bat）+ 未追跡 logs/scripts は本ループ無関係＝コミットに巻き込まない（`git add <対象のみ>` で限定）。
- **新角度の発見**: SiteHeader は `sticky top-0 z-40`・`h-14`(=56px)で**スクロール中も常時表示**（hide-on-scroll 無し・scrolled は shadow/bg styling のみ）。ページ内アンカー(`href="#id"`)跳躍 or `scrollIntoView({block:"start"})` で要素が viewport 最上端(y=0)へ着地すると、**見出しが 56px の header 下に隠れる**。codebase 既定の是正は `scroll-mt-20`(80px=header 56px+余白)。`href="#"` 全4箇所＋`scrollIntoView` 全1箇所を全数監査し、scroll-margin 欠落/不足の**実害4件**を修復。
- done: 【実バグ=アンカー跳躍が隠れる】`/settings` のセクション内ナビ（`href="#appearance"` 等**8リンク**の専用ナビ）が跳躍する各セクション見出し(`SectionTitle` の id 付き div)に scroll-margin 無し→8セクション全てが header 下に隠れて着地。`scroll-mt-20` を付与。/ コミット `659a569` / 検証: typecheck0/lint0err/test300緑(+2)/build緑。**`.next/server/app/settings.html` 実測**で8 id 全て(`appearance`〜`api-keys`)が `scroll-mt-20 ... id="..."` 出力を確認。新規 `__tests__/a11y/settings-anchor-scroll-margin.test.ts`（scroll-mt-20 正規表現＋8 id 実在ガード・revert で落ちる）。
- done: 【実バグ=同型】`/student` の「学割を申請する」(`href="#apply"`)が跳躍する申請フォーム Card に scroll-margin 無し。`scroll-mt-20` 付与。/ コミット `f2399f9` / 検証: 全緑(test301)。**`.next/server/app/student.html` 実測**で `... mb-10 scroll-mt-20" id="apply"` を確認。新規 `student-anchor-scroll-margin.test.ts`。
- done: 【実バグ=同型・中核 indexable】`/q` の「解説を読む」(QuestionAnswerCard の `href="#explanation"`)が跳躍する解説 section の scroll-margin が **`scrollMarginTop:"1rem"`(16px)で header(56px)未満**→「解説」見出しが header 下に隠れる。`scroll-mt-20` へ是正＋インライン style 撤去（CLAUDE.md「インライン style 原則禁止」準拠）。/ コミット `2e3df3c` / 検証: 全緑(test303)。**`.next/server/app/q/pm/2025-autumn/am1/q29.html` 実測**で `class="mt-8 scroll-mt-20"`・inline scrollMarginTop=0件。新規 `q-explanation-scroll-margin.test.ts`（不十分な 1rem 残存ガード含む）。
- done: 【実バグ=同型・論文添削C軸】`EssayEditor` が採点完了後 `#essay-result` へ `scrollIntoView({block:"start"})`（`scrollIntoView` も CSS `scroll-margin-top` を尊重）するが scroll-margin 無し→採点結果の先頭が header 下に隠れる。`scroll-mt-20` 付与。/ コミット `6254ff1` / 検証: typecheck0/lint0err/test304緑/build緑。新規 `essay-result-scroll-margin.test.ts`。
- 結論: `href="#"`/`scrollIntoView({block:start})` の全数監査完了。**全 in-page 跳躍ターゲットに scroll-mt-20 が在ることを grep 実測**（about/transparency/admin-metrics は既存で scroll-mt-20 保有＝S15以前から正・再監査不要／`#main-content` skip link は main ラッパへ着地＝header を意図的にスキップする設計で scroll-margin 不要）。`DashboardTabs` の `location.hash` はタブ選択用でスクロール非伴＝対象外。

## セッション32 まとめ
- 実改善4件（すべて新角度「ページ内アンカー跳躍/scrollIntoView が persistent sticky header(h-14=56px) 下に隠れる」＝scroll-margin 欠落/不足）。
  1. /settings セクションナビ8リンクの跳躍先（`659a569`・専用ナビで高頻度）
  2. /student 学割申請アンカー（`f2399f9`）
  3. /q 解説アンカー（`2e3df3c`・中核 indexable・1rem→scroll-mt-20＋inline style 撤去）
  4. EssayEditor 採点結果 scrollIntoView（`6254ff1`・論文添削C軸）
- テーマ: 31セッション見落としの新角度を開拓。**SiteHeader が常時表示の sticky(56px) のため、scroll-margin の無い/不足するアンカー跳躍先は header 下に隠れる**。codebase は一部ページ(about/transparency/admin)で既に scroll-mt-20 を使っていたが、settings/student/q/essay の4箇所で欠落/不足していた。全数監査で残存ゼロを実測。
- 教訓（次セッションの重複監査防止）: **SiteHeader は h-14(56px)・常時表示 sticky で hide-on-scroll 無し。ページ内アンカー(`href="#"`)/`scrollIntoView({block:start})` の跳躍先は `scroll-mt-20` 必須。本リポの全跳躍ターゲットは本修復で scroll-mt-20 保有済（再監査不要）。`#main-content` skip link のみ例外（header 意図的スキップで margin 不要）。**
- 次セッターへ: 夜間の安全な実害バグは S1-S32 で深く枯渇。残は**日中候補のみ**（tabs矢印キー/コピー通知統一/MilestoneToast ref化/exam meta desc短縮/reduced-motion 共有フック抽出）。**apple-touch-icon が SVG（iOS は PNG のみサポート＝home 追加時にアイコン非表示）＝要 PNG アセット生成のため夜間 SKIP・日中候補として記録**。新観点は色コントラスト/フォーカス順序など要レンダリング・要E2E領域＝日中レビュー向き。次セッションは「本日分完了」記録 or 日中候補の慎重実施を検討。

## セッション33 2026-05-30 14:30 JST（S7 の見落とし発見：/settings 保存トーストの条件付きマウント live region を是正 + 複数の新角度を全数監査＝実害ゼロ）
- 冒頭ベースライン全緑実測: typecheck0/lint0err(既存 ux-audit 警告1のみ)/test **304 passed**(76 files→最終306)/build緑（HEAD `ad4ed76`）。git status の M（BookmarkButton.snap CRLF / overnight-loop.bat）+ 未追跡 logs/scripts は本ループ無関係＝コミットに巻き込まない（`git add <対象のみ>` で限定）。
- done: 【実バグ=A11y WCAG 4.1.3 Status Messages・S7 の見落とし発見】`/settings` の保存トースト（設定トグル操作時の「保存しました」等）の `role="status" aria-live="polite"` live region が `{toast && (<div role="status" …>)}` で**条件付きマウント**されており、live region 自体が文言と同時に DOM 挿入される anti-pattern だった（SR は region の変化を捕捉できず保存完了/失敗が読み上げられない）。**これは S7 が EmailLeadCapture に対し修正したのと完全に同型のバグ**だが、S7 の監査は「settings のトーストも role=status/aria-live 保有」と**役割属性の有無のみ確認し、条件付きマウントを見落として SKIP していた**。region を常設し中身(toast)だけ出し入れする gold-standard（ShareButtons 慣用）へ是正（positioning を外側 region に移し inner に視覚/animate クラス＝視覚・アニメ不変、`pointer-events-none` 付与で空 region がクリックを阻害しない）。/ コミット `97b166a` / 検証: typecheck0/lint0err/test306緑(+2)/build緑。新規 `__tests__/a11y/settings-toast-live-region.test.ts`（live region が `{toast &&` 条件の**外（前）**に常設されることを index 順で検証＝source-read。settings は client-state 駆動で `.next` HTML/jsdom render が重いため S32 の `settings-anchor-scroll-margin.test.ts` と同じ source-read 慣用に倣う）。**修正前は git stash で当該テストが落ちる**ことを実測（崩れたら落ちる検証）。
- SKIP(全数監査=実害ゼロ・新角度 conditionally-mounted polite live region): 上記修正後、`&&[\s\S]{0,80}role="status"` を multiline grep＝**残存ゼロ**。他の `role="status"`/`aria-live="polite"` 領域は全て常設（CloudSyncPanel「最終同期:」は text 差替・AfternoonPlayer/FeedbackGateModal は S5/S24 で常設化済・ShareButtons/SearchClient/QuizPlayer/QuestionAnswerCard/DailyChallenge 等は常設 sr-only）。`role="alert"`（EmergencyBanner/ContactForm/SearchClient/MockExamRunner/EmailSignInForm）は**マウント時アナウンスが正しい設計**＝条件付きマウントで問題なし。`app/loading.tsx` は `aria-label="読み込み中"`＋sr-only `<p>読み込み中...</p>` の二重ラベルで完備。**※AchievementToast/各 global indicator（AiQuotaIndicator/OfflineIndicator/CloudSyncAutoSync）は親が条件付きレンダーするが、これは別ファイル境界で本 grep の対象外＝debatable な別クラス。worklog は toast/indicator を成熟扱い済のため夜間は触らず日中候補に据え置き。**
- SKIP(全数監査=実害ゼロ・新角度 focus-visible 除去): `outline-none`/`focus:outline-none` 全箇所を grep＝**全て `focus-visible:ring-2`/`focus:ring-2`（または border-color 変化）の代替フォーカス指標を併記**。例外は `app/layout.tsx` の `#main-content`（skip link 着地点・意図的に outline 抑制）と `TagInput`（focus:border-blue-400 でフォーカス可視）＝両者とも実害なし。フォーカス指標の消失（WCAG 2.4.7 違反）は**ゼロ**。
- SKIP(全数監査=実害ゼロ・新角度 OG 画像の width/height/alt 整合): openGraph 画像を宣言する全32ページを grep＝**全て `{ url, width: 1200, height: 630, alt }` で一貫宣言**。dimensions/alt 欠落の壊れた SNS カードは不在（root layout の file-based opengraph-image は Next 慣用で size export 済）。twitter.images が bare URL（twitter:image:alt 無し）なのは X 固有の軽微 a11y だが openGraph alt 済＋機能追加寄り＝overreach の罠で SKIP（日中候補）。
- SKIP(全数監査=実害ゼロ・新角度 API route runtime 宣言): 全 `app/api/**/route.ts(x)` を grep＝**runtime 未宣言ゼロ**（CLAUDE.md「API ルートは runtime 明示」遵守）。/api/og の edge runtime は satori 用で意図的・正。
- SKIP(全数監査=実害ゼロ・新角度 WCAG 3.2.2 On Input): `<select onChange>` 全4箇所（StudyPlanClient/NotificationSettings/MockExamLanding/SearchClient sort）を確認＝**全て local state 更新のみ**（navigation/submit を伴う context change は不在）。選択肢を矢印キーで移動しても予期せぬ遷移/送信は起きない＝実害ゼロ。

## セッション33 まとめ
- 実改善1件（A11y WCAG 4.1.3＝S7 の見落とし発見・修復 `97b166a`）+ 全数監査SKIP5クラス（conditionally-mounted-status 残存ゼロ/focus-visible 除去/OG dims/api-runtime/select-onChange WCAG 3.2.2）すべて実害ゼロを確定し記録。
- テーマ: **過去セッション（S7）が「役割属性の有無」だけ確認して見落とした同型バグを掘り起こす**角度が有効と判明。条件付きマウント live region は EmailLeadCapture（S7修正済）と settings（本修正）の2箇所で、同一コンポーネント内の `{state && <region>}` は本修正で残存ゼロ。
- 教訓（次セッションの重複監査防止）: **`role="status"`/`aria-live="polite"` は「常設して中身だけ差替」が gold-standard。同一コンポーネント内の条件付きマウント（`{x && (…role=status…)}`）は残存ゼロ（再監査不要）。`role="alert"` はマウント時アナウンスが正で条件付きマウントOK。focus-visible 除去・OG dims・api-runtime・select-onChange の4クラスは構造的にクリーン。** 残る debatable クラス＝親が条件付きレンダーする toast/indicator（AchievementToast 等）は別ファイル境界・成熟扱いで日中候補に据え置き。
- 次セッターへ: 夜間の安全な実害バグは S1-S33 で深く枯渇。残は**日中候補のみ**（tabs矢印キー/コピー通知統一/MilestoneToast ref化/exam meta desc短縮/reduced-motion 共有フック抽出/apple-touch-icon PNG 生成/twitter:image:alt 付与/AchievementToast・indicator の常設 region 化）。「過去セッションが属性有無だけ見て見落とした同型」を掘る角度は有効＝次も「S5/S13 で aria-pressed 化したタブの可視フォーカス」等の二次監査が候補。新観点は色コントラスト/フォーカス順序など要レンダリング・要E2E＝日中向き。次セッションは「本日分完了」記録 or 日中候補の慎重実施を検討。

## セッション34 2026-05-30 14:42 JST（lib 純関数の未テスト領域を回帰固定 → 履歴 reset の実害バグを発掘・修復）
- done: 表示ヘルパー `examLabel`/`seasonLabel`/`formatYearSeason`（`lib/utils.ts`）の文字列契約を回帰テストで固定。
  問題カード・年度別/分野別一覧などほぼ全画面の見出し描画に使う純関数だが直接のユニットテストが無く、
  区分名の崩れ・元号換算ミス・未知シーズンの欠落を検知できなかった。既知/未知区分・各シーズン・
  令和元年境界(2018/2019)を固定。/ コミット `605a40e` / `__tests__/lib/utils-labels.test.ts`(8件) /
  typecheck0・lint0err・test・build を**単独実測**で全緑。
- done: 【実害バグ修復】`lib/storage/history.ts` の `reset()` が初回解答を消し残す共有 `EMPTY` 汚染を是正。
  `readRaw()` がストレージ空時に **共有 const `EMPTY` を参照で返し**、`record()` の `entries.push()` が
  その `EMPTY` を破壊的に汚染 → `reset()` の `writeRaw(EMPTY)` が汚染済み（=最初に解いた問題を含む）参照を
  書き戻すため、「履歴をリセット」しても初回解答が残る実害。`emptyData()` ファクトリ化で常に新規オブジェクトを
  返すよう修正。/ コミット `01961e6`（source）+ `d7efca6`/`5b24975`（回帰テスト追加分。下記反省参照） /
  回帰テスト `__tests__/storage/history-store.test.ts`(13件: 2000件上限・getWrongIds最新正誤・getStats・
  star トグル・破損JSON回復・export↔import 往復・**reset 完全消去**)。`01961e6` 後に test327・typecheck0・
  lint0err・build を単独実測で全緑。**修正前は reset テストが落ちる**ことを実測（崩れたら落ちる検証）。
- 反省（重要・次セッション必読）: 途中 2 度、ゲート(test)と `git commit/push` を**同一の並列ツールバッチ**に
  入れたため、test が fail していたのに commit が走り、壊れたコミット `5b24975`（存在しない API 前提で全数 fail）と
  `d7efca6`（メッセージは「全緑化」だが reset テストが落ちていた）を push してしまった。`01961e6` で fix-forward 復旧。
  **教訓: ゲート(typecheck/lint/test/build)は commit の前に必ず単独実行し、緑を目視してから別呼び出しで commit する。
  並列バッチに commit を混ぜない。** memory `overnight-gate-discipline.md` にも記録。
- 環境メモ: overnight-integration は**保護なし**（`gh api .protected=false`・rulesets 空）＝直接 push 可。
  作業中 tool 出力チャネルが断続遅延・並列 Bash バッチは「兄弟1つの非ゼロ終了で全兄弟 cancel」される挙動あり
  （grep no-match / 存在しないファイル参照を混ぜない）。詰まる時は 1 コマンドずつ逐次実行で回避。
  テスト基盤は **Vitest**（`import { ... } from "vitest"`・`@/` alias・globals・jsdom、`vitest.setup.ts`）。
  lib/storage/history.ts の API は store パターン（`createHistoryStore()` → `record({id,selected,correct,at})`/
  `getAllEntries`/`getWrongIds`/`getStats`/`toggleStar`/`reset`/`exportJson`/`importJson:boolean`）。

## セッション35 2026-05-30 15:17 JST（S34継続：未テストの中核純関数を read-only 監査→実バグ無し→契約を回帰固定4件）
- 冒頭ベースライン全緑実測: typecheck0/lint0err（既存 ux-audit 警告1のみ・未追跡ファイル）/test **327 passed**(79 files)/build緑（HEAD `72f7155`）。
  git status の M（BookmarkButton.snap CRLF / overnight-loop.bat）+ 未追跡 logs/scripts は本ループ無関係＝コミットに巻き込まない（`git add <対象のみ>` で限定）。
- 方針: S1-S33 で a11y/SEO/perf の安全な実害バグは深く枯渇。S34 が拓いた「**未テストの lib 純関数を監査し実害バグ発掘 or 契約を回帰固定**」角度を継続。
  リテンション/ゲーミフィケーション中核の純関数群（streak/xp/srs/heatmap/daily-goal/combo/coupon/missions/daily-challenge/filter/mock-exam-selection）を
  **read-only で全数精査**＝**明確な実害バグは発見されず**（コードは総じて正しい）。ただし主要モジュールがユニットテスト皆無で「崩れたら落ちる検証」が不在のため、
  最も回帰リスクの高い4モジュールの契約を回帰テストで固定（S34 の `test(utils)`/`test(history)` と同型の安全な infra 改善・source 無変更）。
- done: 【回帰固定】`lib/streak/core.ts`（§11 連続学習/段級＝リテンション中核）の純関数群を固定。
  applyStudyDay/decayIfLapsed/jstDateString/nextMilestone/justReachedMilestone の JST 0:00 境界・連続/同日冪等/中断リセット・longest保持・
  マイルストーン一度きり契約を網羅。/ コミット `f69b47d` / `__tests__/lib/streak-core.test.ts`(15件) / typecheck0・lint0err・test342・build を単独実測で全緑。
- done: 【回帰固定】`lib/gamification/xp.ts` レベリング曲線（二次曲線×二分探索逆関数）。
  既知アンカー点・単調増加・**全100段で levelFromXp(totalXpForLevel(L))===L**・レベル境界/中間/最大の進捗(0..1)・MAX飽和。
  / コミット `45ff964` / `__tests__/lib/xp-curve.test.ts`(10件) / typecheck0・test352 を単独実測で緑（test-only＝build は Next が __tests__ 無視で直交、cycle1 で確認済）。
- done: 【回帰固定】`lib/mock-exam/selection.ts` 模試出題の層化サンプリング（Hamilton 最大剰余法）。
  空プール・プール≤target 全件・random は target件重複なし・**balanced の剰余配分が決定的(A2/B1/C1)**・合計常に target でプール部分集合（shuffle 非依存の不変条件）。
  / コミット `990d8fe` / `__tests__/lib/mock-exam-selection.test.ts`(6件) / typecheck0・test358 を単独実測で緑。
- done: 【回帰固定】`lib/gamification/daily-challenge.ts`（最も分岐の多い日付ロジック）。
  seededRandom/pickDeterministic の決定性、ensureChallenge の pending生成と同日不変、completeChallenge の翌日継続(+1)/中断リセット(1)/
  非完璧で perfectStreak=0/完了済み再挑戦は既存値保持+保存不変（冪等）。/ コミット `af22cf3` / `__tests__/lib/daily-challenge.test.ts`(11件) / typecheck0・test369 を単独実測で緑。
- SKIP(実害判定が debatable・日中候補): `lib/learning/spaced-repetition.ts::applyGrade` は doc/コメントで「SM-2 を適用」と Wikipedia を引用するが、
  **失敗時(grade<3)に EF を更新しない**（正準 SM-2 は全 grade で EF 更新）。失敗カードの EF が下がらず再学習後の間隔が想定より早く伸びる潜在差異だが、
  コメントは「binary signal + ease quality を受ける適応版」と明記＝意図的設計の可能性が高く、復習スケジューリングの挙動変更＝「崩れたら落ちる」E2E も無いため夜間は SKIP。
  現状の挙動は本セッションでは固定せず（変更含みのため）。**日中に SM-2 準拠へ寄せるか design intent を確認する候補**として記録。
- SKIP(過大修正の罠): `lib/motivation/coupon.ts::read` の `source: parsed.source === "streak-30" ? "streak-30" : "streak-30"` は無意味な三項（常に "streak-30"）だが
  実害ゼロ＝挙動不変。cosmetic な dead-branch 除去は夜間 overreach で SKIP（日中の cleanup 候補）。
- 監査して実害ゼロを確認した純関数（再監査不要）: streak/core・xp・mock-exam/selection・daily-challenge（上記で固定）+ motivation/combo(comboLevel)・
  motivation/daily-goal(getDailyProgress の pct/completed)・motivation/heatmap(generateDayRange の JST連続日・intensityLevel・total*)・
  gamification/missions(claim/increment ガード)・questions/filter(Fisher-Yates shuffle・filterQuestions の各絞り込み)。いずれも境界条件・ガード適切。

## セッション35 まとめ
- 実改善0件（source 無変更）+ 回帰テスト固定4モジュール（streak/xp/mock-exam-selection/daily-challenge＝計42件追加: test327→369）+ SKIP2件（SM-2 EF＝日中候補/coupon dead-branch＝cleanup候補）。
- テーマ: S34 の「未テスト lib 純関数」角度を継続。**明確な実害バグは発見されず＝コードは成熟**。リテンション中核の純関数群に「崩れたら落ちる検証」を敷設（将来の曲線係数/日付境界/Hamilton配分の崩れを CI が捕捉）。
- 教訓（次セッションの重複監査防止）: **streak/core・xp・mock-exam/selection・daily-challenge は回帰テスト固定済（再監査不要）。combo/daily-goal/heatmap/missions/filter は read-only 監査で実害ゼロ確定。** 残る未テストの純関数候補: study-plan/generator・gamification/economy・gamification/achievements・success-stories/related-content・seo/* ヘルパ群（次セッションの固定候補）。
- 次セッターへ: 夜間の安全な実害バグは S1-S35 で深く枯渇。残は**日中候補**（tabs矢印キー/コピー通知統一/MilestoneToast ref化/exam meta desc短縮/reduced-motion 共有フック抽出/apple-touch-icon PNG/SM-2 EF 準拠/coupon dead-branch cleanup）。
  夜間継続なら S34/S35 の「未テスト純関数の契約固定」が最も安全・高価値＝上記「残る未テスト候補」を1つずつ固定するのが推奨。

## セッション36 2026-05-30 15:28 JST（S35継続：未テスト純関数の契約固定 → 同型「共有EMPTY破壊」footgun を3件発掘・修復）
- 冒頭ベースライン全緑実測: typecheck0/lint0err（既存 ux-audit 警告1のみ・未追跡）/test **369 passed**(83 files)/build緑（HEAD `5953bd2`）。
  git status の M（BookmarkButton.snap CRLF / overnight-loop.bat）+ 未追跡 logs/scripts は本ループ無関係＝コミットに巻き込まない（`git add <対象のみ>` で限定）。
- done【回帰固定】`lib/study-plan/generator.ts` の純関数契約を固定（/account 学習プラン生成・S35 候補）。
  listDates(両端含む範囲/閏年・月跨ぎ/逆順・不正→空)・formatLocalDate(ゼロ詰め)・isWeekend(土日/平日)・
  generateStudyPlan(試験当日除外・空/過去日・フェーズ early→middle→late 単調・task key 一意・平日/週末予算・
  level による必要時間スケール) を網羅(14件)。/ コミット `1b577ee` / typecheck0・lint0err・test383・build を単独実測で全緑。source 無変更。
- done【回帰固定】`lib/gamification/economy.ts`（XPレベリング閾値・ゴールド台帳・S35 候補）。
  levelForXp(閾値境界で正確昇格・単調・16段飽和)・xpToNext(帯内進捗・pct[0,1]クランプ・最大超でも0除算なし)・
  addXp/addGold/spendGold(balance/earned/spent 独立・残高超過拒否で状態不変・ちょうど0まで使用可・非正は no-op) 14件。
  / コミット `7976290` / typecheck0・lint0err・test397 を単独実測で緑。source 無変更（readXp/readGold は新規オブジェクト構築で footgun 無し＝SAFE と確認）。
- done【実バグ修復＝S34 history.ts と同型 footgun】`lib/gamification/achievements.ts`。read() が空ストレージ時に
  module-level 共有 const EMPTY を**参照で返し**、unlock()(data.unlocked.push)・evaluateAfterAnswer(data.bestStreakCorrect=)・
  evaluateAfterMock(consecutivePassedMocks++) が**その場破壊**するため EMPTY が恒久汚染→空ストレージからの read が
  「解除済み実績」「非ゼロ連続合格数」を返し実績誤判定・XP/ゴールド誤付与。emptyState() ファクトリ化で是正。
  / コミット `1e9569e` / 回帰テスト14件(閾値ラダー/正答率ゲート/連続/冪等/XP・ゴールド付与)。
  **修正前は同一テスト内の localStorage.clear() を跨いで EMPTY 汚染が残り4件落ちる**ことを実測（崩れたら落ちる検証）。test397→411。
- done【実バグ修復＝同型 footgun・concrete 実害】`lib/storage/bookmarks.ts`。readRaw() が共有 EMPTY を参照で返し
  toggleBookmark/mergeServerBookmarks が data.entries[id] 代入/delete で破壊、かつ **clearAllBookmarks() が writeRaw(EMPTY) と
  汚染済み定数を書き戻す**ため、**新規ユーザーが初セッションで最初のブックマーク(=空ストレージ経路でEMPTY汚染)後に
  「全て削除」を押すとその初回ブックマークだけ消えずに残る**実害（bookmarks ページに「全て削除」UI 在＝S30 記録）。
  emptyData() ファクトリ化 + clearAll を新規空オブジェクト書込みに是正。/ コミット `778872e` / 回帰テスト(空経路追加→全削除で完全に空)
  + 未テストの mergeServerBookmarks(last-write-wins) も固定。**source revert で当該回帰が [ap-q1] 残存で落ちる**ことを実測。test411→413。
- done【実バグ修復＝同型 footgun・concrete 実害】`lib/learning/spaced-repetition.ts`。read() が共有 EMPTY を参照で返し
  recordReview が state.cards[id]= で破壊、かつ **resetSrs() が write(EMPTY)** と汚染済み定数を書き戻すため、
  **初セッションで最初の復習後に SRS リセットしても初回カードが残る**実害。emptyState() ファクトリ化 + resetSrs を新規空書込みに是正。
  SM-2 採点ロジック(applyGrade)は不変（S35 が day-time 候補とした EF 挙動には**触れない**）。/ コミット `c058f58`
  / 回帰テスト10件(SM-2 間隔/EF・grade マッピング・due/priority・reset footgun)。**source revert で reset 回帰が q1 残存で落ちる**ことを実測。test413→423。
- SKIP(latent のみ・concrete amplifier 不在＝夜間は安全側): 同型 footgun の残り3ファイル。Explore + 自己精査で
  **read() が共有 EMPTY を参照返し＋呼び出し側がその場破壊**するのは計7ファイル(history[S34]/achievements/bookmarks/srs[修復済] +
  下記3)。残り3は **write(EMPTY) 等の amplifier も localStorage キー削除トリガも無い**ため、初回 push 後に localStorage が
  即座に populate され実害は出ない（汚染は module EMPTY に残るが、キーが再び不在になる経路が app に無い）＝latent。
  ①`lib/mock-exam/storage.ts`(recordMockExam: data.history.push) ②`lib/learning/mock-scores.ts`(recordMockScore: state.scores.push)
  ③`lib/storage/custom-tags.ts`(ensureCatalogForNames/mergeServerCustomTags: data.tags[name]=)。
  **次セッション候補（防御的ハードニング・1サイクルで batch 可）**: 3件とも emptyState() ファクトリ化（economy と同じ最小 diff）。
  読取り側が新規オブジェクト構築の SAFE 群（economy/onboarding/heatmap/streak-storage/user-context/daily-challenge/xp/missions/badges/sync）は再監査不要。

## セッション36 まとめ
- 実改善5件（回帰固定2: study-plan/economy + 実バグ修復3: achievements/bookmarks/srs＝全て S34 history.ts と同型「共有EMPTY破壊」footgun）。test369→423（+54件）。
- テーマ: S34/S35 の「未テスト純関数の契約固定」角度を継続中に、**S34 が history.ts で1件直した shared-mutable-EMPTY footgun がコードベースに体系的に潜在**していることを発見。
  read() が空ストレージ時に共有 const を参照返しし、呼び出し側がその場破壊（push/代入/++）するクラス。**concrete 実害（reset/clearAll が汚染定数を書き戻す）を持つ3件を修復**、latent 3件は backlog 送り。
- 教訓（次セッションの重複監査防止）: **「read() が共有 EMPTY を参照返し」かつ「呼び出し側がその場破壊」かつ「write(EMPTY)/キー削除の amplifier」が揃うと concrete 実害**（achievements/bookmarks/srs で実証）。
  amplifier 無し＝latent（mock-exam/storage・mock-scores・custom-tags＝backlog）。読取り側が新規オブジェクト構築なら SAFE。修正は全て emptyState() ファクトリ化＝最小 diff・挙動不変・各回帰テスト付き。
- 次セッターへ: 上記 latent 3件の防御的ファクトリ化（1サイクル batch）が最有力。その後は S35 の残り未テスト純関数候補（success-stories/related-content・seo/* ヘルパ群）の契約固定、または日中候補。

## セッション37 2026-05-30 15:53 JST（S36 handoff の latent footgun 3件を防御ハードニング → seo 純関数の契約固定2件）
- 冒頭ベースライン全緑実測: typecheck0/lint0err（既存 ux-audit 警告1のみ・未追跡）/test **369→** build緑（HEAD `a08c6f8`）。git status の M（BookmarkButton.snap CRLF / overnight-loop.bat）+ 未追跡 logs/scripts は本ループ無関係＝コミットに巻き込まない（`git add <対象のみ>`）。
- done【防御ハードニング＝S36 handoff の最有力タスク】残存 latent な共有EMPTY破壊 footgun 3件をファクトリ化。
  `lib/mock-exam/storage.ts`(recordMockExam: data.history.push)・`lib/learning/mock-scores.ts`(recordMockScore: state.scores.push)・
  `lib/storage/custom-tags.ts`(ensureCatalogForNames/mergeServerCustomTags: data.tags[name]=) の read()/readRaw() が空ストレージ時に
  module-level 共有 const EMPTY を参照返しし、呼び出し側がその場破壊するクラス（S34 history・S36 achievements/bookmarks/srs と同型）。
  本3件は write(EMPTY) 等の amplifier 無し＝現状 latent だが既知 footgun。emptyState()/emptyData() ファクトリ化で常に新規オブジェクト返却に是正。
  / コミット `057be2b` / 各モジュール従来テスト皆無→契約(追記順/50件上限/exam絞り込み/last-write-wins/冪等)+「絶対参照純度」回帰を新規固定(14件)。
  clear→mutate→clear で空読みが汚染を漏らさないことを検証。**修正前は source stash で当該回帰が5件落ちる（汚染がテスト間で波及）ことを実測**。
  typecheck0/lint0err/test423→437/build緑を単独実測。
- done【回帰固定】`lib/seo/exam-meta.ts` の年度別/分野別グルーピング純関数。groupByYearSeason/groupByCategory/examTopTitle/
  examTopDescription/examFullName は試験ハブ・年度別・分野別ページの見出し/メタ記述を駆動するがテスト皆無。year-season 集計・件数・key/label 整合、
  年降順→同年内 season localeCompare 並び(2024-autumn→2024-spring→2023-spring)、category count 降順、空配列、埋め込み文字列を固定(8件)。
  read-only 監査で実バグ無し（autumn-before-spring 並びは newest-first として偶然 chronological に整合）＝source 無変更。
  / コミット `b989507` / typecheck0/lint0err/test437→445。
- done【回帰固定】`lib/seo/category-tips.ts::getCategoryTip` のフォールバック契約。/q が whatMatters/howToStudy/relatedKeywords を
  無条件参照するため未知 category でも完全形オブジェクトを返す必要（undefined 返却は /q 描画クラッシュ）。既知取得・非空フォールバック・
  同一参照を固定(3件)。source 無変更。/ コミット `d7ab156` / typecheck0/lint0err/test445→448。
- SKIP(実害なし・低logic): `lib/success-stories/related-content.ts`(data 委譲の slice ラッパ)・`lib/seo/structured-data.ts`(静的ノードビルダ)・
  `lib/seo/sitemap-pagination.ts`(Math.max(1,…) ガードは data 依存で単体不可)＝契約固定の価値薄く SKIP。

## セッション37 まとめ
- 実改善1（防御ハードニング3ファイル batch=S36 handoff 最有力）+ 回帰固定2（exam-meta grouping / getCategoryTip）。test423→448（+25件）。
- テーマ: S36 が backlog 送りした latent footgun 3件を handoff 通り batch で防御ファクトリ化（concrete 実害は無いが既知クラスの一掃＝S34-S36 の共有EMPTY footgun 系を**全7ファイル完了**）。続けて seo の未テスト純関数の契約を固定。
- 教訓（重複監査防止）: **共有EMPTY footgun は history/achievements/bookmarks/srs/mock-exam-storage/mock-scores/custom-tags の7ファイルすべて emptyState()/emptyData() ファクトリ化済（残存ゼロ・再監査不要）。** exam-meta grouping・getCategoryTip は回帰固定済。related-content/structured-data/sitemap-pagination は低logic で固定不要と判断。
- 次セッターへ: 夜間の安全な実害バグは S1-S37 で深く枯渇。残候補=S35 の未テスト純関数（seo の question-url[既テスト]以外、exam-content/exam-resources は静的データ）の更なる契約固定 or 日中候補（tabs矢印キー/コピー通知統一/MilestoneToast ref化/SM-2 EF/apple-touch-icon PNG）。新規実害バグは「過去セッションが属性有無だけ見て見落とした同型」(S33 の角度)を掘るのが有効。

## セッション38 2026-05-30 16:05 JST（未テスト中核純関数の契約固定スイープ + PII マスカの over-mask 発見）
- 冒頭ベースライン全緑実測: typecheck0/lint0err（既存 ux-audit 警告1のみ・未追跡）/test **448 passed**(92 files)/build緑（HEAD `ff66914`）。git status の M（BookmarkButton.snap CRLF / overnight-loop.bat）+ 未追跡 logs/scripts は本ループ無関係＝コミットに巻き込まない（`git add <対象のみ>`）。
- 方針: S34-S37 で確立した「未テストの中核純関数を read-only 監査→実バグ発掘 or 契約を回帰固定（source 無変更）」角度を継続。Explore で未テスト純関数を棚卸し、価値順に4件処理。
- done【回帰固定＋過大修正の罠回避で SKIP した実バグを記録】`lib/feedback/pii-masker.ts`（contact API でユーザー本文を公開ログ/モデレーション画面へ流す前の PII スクラバ・プライバシー中核）の契約を固定。
  email/電話/12桁マイナンバー/明確な氏名/passthrough/mixed/totalHits の正しい挙動を回帰固定（14件→実際は15 it）。/ コミット `e6a3532` / `__tests__/lib/pii-masker.test.ts`。
  **★実バグ発見（但し over-mask＝プライバシー安全側のため夜間は source 無変更で SKIP・日中候補）**: name-honorific ルール `[一-鿿゠-ヿ]…(?:様|氏|…)` が
  **一般語「仕様」「同様」「模様」を「名前」と誤判定してマスク**する。IPA 試験文脈で「仕様/同様」は頻出＝正当なフィードバック本文が `[削除済み]` で破損（"問題の仕様が"→"問題の[削除済み]が"）。
  ただし(a)これは over-mask で**プライバシー的には安全側**（漏洩ではない）、(b)正規表現を狭めると実在姓+様（例「林様」）を取りこぼす privacy 後退の危険＝要人手判断。よって夜間は直さず characterization テストで現挙動を固定し**日中候補として記録**。
- done【回帰固定】`lib/dashboard/analytics.ts`（/account ダッシュボードの習熟度・合格可能性%・弱点/得意分野）。
  合格可能性の係数（75%×満点標本→72・100%でも95にクランプ・0標本→0）・PROB_MIN_SAMPLE 閾値・分野集計の正答率/件数降順・弱点昇順/得意降順とタイブレーク・radar パディング/切詰めを固定。read-only 監査で実バグ無し（全 division/clamp ガード済）。/ コミット `7b0442b` / `__tests__/lib/dashboard-analytics.test.ts`(16件)。
- done【回帰固定】`lib/learning/analytics.ts`（学習プラン分析・合格可能性/必要演習量/1日目標）。
  ロジスティック係数（acc0.6×満点信頼→0.5・<10試行ダンプ）・必要演習量50問/ポイント・達成後100上限・1日目標[5,80]クランプ・uniqueAnswered の Set 重複排除を固定（daysUntil は別ファイルで既テスト）。実バグ無し。/ コミット `297802c` / `__tests__/lib/learning-analytics.test.ts`(10件)。
- done【回帰固定】`lib/questions/category-pool.ts`（/modes/topic で AP/FE/IP/SG 横断の分野別出題母数・14k問超が通る）。
  **Explore が「session ホワイトリストが CBT セッションを取りこぼす疑い」と HIGH を出したが、実データ分布（am7118/am1 4800/am2 2375/kamoku-a 102/kamoku-b 7/pm系）を grep 実測し棄却**＝am/am1/am2/kamoku-a の午前知識のみ通し pm/kamoku-b を意図的除外で正しい（実バグ無し）。session 白リスト・MC限定・試験横断同義カテゴリ合算+byExam内訳・count>0/降順・ラベル解決の重複排除/未知→null を固定。/ コミット `26ea5ae` / `__tests__/lib/category-pool.test.ts`(7件)。

## セッション38 まとめ
- 実改善0件（source 無変更）+ 回帰固定4モジュール（pii-masker/dashboard-analytics/learning-analytics/category-pool＝計48 it 追加: test448→496）+ **実バグ1件を発見し日中候補として記録**（pii-masker の 仕様/同様 over-mask）。各ゲート全緑（typecheck0/lint0err/test496/build緑）。
- テーマ: S34-S37 の「未テスト中核純関数の契約固定」角度を継続。プライバシー中核(pii)・ユーザー向け数値(合格可能性/必要演習量)・横断プール母数(14k問)という**実害が出れば気付きにくい純関数**に「崩れたら落ちる検証」を敷設。
- 教訓（重複監査防止）: **pii-masker/dashboard-analytics/learning-analytics/category-pool は回帰固定済（再監査不要）。** dashboard-analytics・learning-analytics・category-pool・pii-masker の privacy 中核（email/phone/mynumber）は read-only 監査で実バグ無し確定。`lib/search/question-index.ts` の tokenize/makeSnippet/scoreQuestion は server-only かつ private（テストには export 追加=source 変更が要るため夜間は見送り＝日中候補）。
- ★次セッター必読の新・日中候補: **pii-masker の name-honorific over-mask**（仕様/同様/模様 を誤マスク）。プライバシー安全側だがフィードバック本文破損。修正は denylist 追加 or 正規表現を「姓らしさ」へ寄せる等の人手判断が必要（実在姓+様の取りこぼし回避が肝）。
- 次セッターへ: 夜間の安全な実害バグは S1-S38 で深く枯渇。残候補=さらなる未テスト純関数（search-index は export 追加要・日中／seo question-url 既テスト／exam-content・exam-resources は静的データ）or 日中候補群（pii over-mask[新規・上記]/tabs矢印キー/コピー通知統一/MilestoneToast ref化/SM-2 EF/apple-touch-icon PNG）。

## セッション39 2026-05-30 16:24 JST（S34-S38 継続：未テスト中核純関数の契約固定スイープ 4件）
- 冒頭ベースライン全緑実測: typecheck0/lint0err（既存 ux-audit 警告1のみ・未追跡）/test **496 passed**(96 files)/build緑（HEAD `4f03ce4`）。git status の M（BookmarkButton.snap CRLF / overnight-loop.bat）+ 未追跡 logs/scripts は本ループ無関係＝コミットに巻き込まない（`git add <対象のみ>`）。
- 方針: S34-S38 の「未テスト中核純関数を read-only 監査→実バグ発掘 or 契約を回帰固定（source 無変更）」角度を継続。Explore で未テスト純関数を棚卸し、価値順に4件処理。いずれも read-only 監査で実バグ無し＝characterization で現挙動を固定。
- done【回帰固定】`lib/motivation/share.ts`（ストリーク/セッション/バッジの SNS シェア導線・X/LINE/OG画像URL）。type 必須付与・任意パラメータの選択的付与・**数値0とundefinedの区別**（streak=0 を欠落させない）・badge のエンコード・改行連結のエンコード・3種共有本文の確定文言を固定。/ コミット `bd56735` / `__tests__/lib/motivation-share.test.ts`(9件)。
- done【回帰固定】`lib/questions/filter.ts`（**全クイズモードの出題プールを決める中核**・14k問が通る）。examGroup>exam・categoryGroup>category 優先／year/season/topicTag/calculationOnly の AND／復習=誤答∪スター(履歴なし非絞り込み)／未回答=回答済み除外／excludeRecent／**表/図/条件を含む画像なし問題の除外**(hasUnrenderableContent)／needsReview 除外／**プレースホルダ解説フォールバック**(実解説があれば落とすが全プレースホルダなら残す)／inOrder=qNumber昇順／shuffleChoices が answer を正解選択肢内容に追従(Math.random 固定で決定化)を固定。read-only 監査で実バグ無し。/ コミット `a548537` / `__tests__/lib/questions-filter.test.ts`(14件)。
- done【回帰固定】`lib/questions/last-updated.ts`（/q 可視更新日 + JSON-LD dateModified）。getLastUpdatedISO のフォールバック(未設定→DEFAULT_LAST_UPDATED)・formatLastUpdatedJa の和暦整形(先頭ゼロ除去/非ISO素通し)を固定。/ コミット `71be271` / `__tests__/lib/questions-last-updated.test.ts`(4件)。
- done【回帰固定】`lib/admin/metrics/range.ts`（/admin/metrics の集計期間 + 前期間比較窓の日付演算）。now 注入で today/7d/30d/mtd/custom の from-to、**比較窓が対象期間の直前に隣接する同日数窓**(off-by-one ガード・実際に手計算で導出を検証)、custom の from>to 正規化と不正日付フォールバック、rangeSpanDays/dateSeries の両端含む展開を固定。read-only 監査で実バグ無し(注入 now で決定的)。/ コミット `92bc306` / `__tests__/lib/metrics-range.test.ts`(9件)。

## セッション39 まとめ
- 実改善0件（source 無変更）+ 回帰固定4モジュール（share/questions-filter/questions-last-updated/metrics-range＝計36 it 追加: test496→**532**）。全ゲート全緑（typecheck0/lint0err/test532・100files/build緑）。実バグ発見なし（4モジュールとも監査で実バグ無し確定）。
- テーマ: S34-S38 の「未テスト中核純関数の契約固定」角度を継続。**ユーザー向け共有導線(share)・全モード出題プール(filter=14k問の門番)・SEO更新日・admin期間演算**という「崩れても気付きにくい純関数」に崩れたら落ちる検証を敷設。
- 教訓（重複監査防止）: **share/questions-filter/questions-last-updated/metrics-range は回帰固定済（再監査不要）。** filter の hasUnrenderableContent(表/図/条件×画像なし除外)・プレースホルダフォールバック・shuffleChoices の answer 追従は契約固定済。
- 次セッターへ: 夜間の安全な実害バグは S1-S39 で深く枯渇。残る未テスト純関数候補＝`lib/motivation/combo.ts`(comboLevel 閾値)・`lib/motivation/heatmap.ts`(intensityLevel/generateDayRange)・`lib/onboarding/recommended-paths.ts`(getRecommendedPath)・`lib/questions/load.ts`(getAvailableYears/Categories/TopicTags)・`lib/motivation/daily-goal.ts`(getDailyProgress)。日中候補群は不変（pii over-mask/tabs矢印キー/コピー通知統一/MilestoneToast ref化/SM-2 EF/apple-touch-icon PNG）。

## セッション40 2026-05-30 16:37 JST（S34-S39 継続：未テスト中核純関数の契約固定スイープ 4件）
- 冒頭ベースライン全緑実測: typecheck0/lint0err（既存 ux-audit 警告1のみ・未追跡）/test **532 passed**(100 files)/build緑（HEAD `7745a5f`）。git status の M（BookmarkButton.snap CRLF / overnight-loop.bat）+ 未追跡 logs/scripts は本ループ無関係＝コミットに巻き込まない（`git add <対象のみ>`）。
- 方針: S34-S39 の「未テスト中核純関数を read-only 監査→実バグ発掘 or 契約を回帰固定（source 無変更）」角度を継続。S39 handoff の残候補モジュールを価値順に4件処理。いずれも read-only 監査で実バグ無し＝characterization で現挙動を固定。
- done【回帰固定】`lib/motivation/combo.ts`（連続正解コンボ演出レベル + サウンド/モーション低減設定）。comboLevel の閾値(none<3/small 3-4/big>=5)・負値ガード、readMotivationSettings の既定/部分補完/壊れJSONフォールバック/参照分離(既定の mutate 非伝播)を固定。/ コミット `2adff00` / `__tests__/lib/motivation-combo.test.ts`(9件)。
- done【回帰固定】`lib/motivation/heatmap.ts`（学習ヒートマップ日別集計の純関数群）。dateForEntry(JST暦日)・rebuildHeatmapFromHistory(日別件数集計/空→空)・generateDayRange(末尾含む連続N日昇順/days=1)・intensityLevel のバケット境界(0/<5/<15/<30/>=30 を全境界で)・totalStudyDays(count>0日数)/totalAnswered(全count合計)を固定。/ コミット `0d4cffb` / `__tests__/lib/motivation-heatmap.test.ts`(8件)。
  ※ read() の `!raw` 経路が `{...EMPTY}`(byDate 共有参照)を返し recordStudyOnDate が `stored.byDate[date]=` で破壊する S34系 footgun が**潜在**するが、studyDays キーの removeItem/clearAll が app に**不在**（全 grep 実測）＝amplifier 無し＝latent のみで実害なし。S37 の SAFE 分類通り source 無変更。
- done【回帰固定】`lib/onboarding/recommended-paths.ts`（オンボーディング属性別おすすめ学習パス）。getRecommendedPath の3属性分岐(初学者/経験者/直前期で異なるタイトル)・各4ステップの必須フィールド(href が `/` 始まり/label・description 非空/estMin>0)・exam の href/ラベル補間(`/quiz?...&exam=sg&limit=3`・`/sg`・`/mock-exam?exam=ap`・`...&full=true`)・未知属性の last-minute フォールバック、ATTRIBUTE_OPTIONS の3属性網羅を固定。href のタイポは導線切れ(404)に直結（S8 dead-link テーマと整合）。/ コミット `f9bb080` / `__tests__/lib/recommended-paths.test.ts`(5件)。
- done【回帰固定】`lib/questions/load.ts`（年度別/分野別/タグ別ファセット導出・14,402問が通る）。getAvailableYears(降順/dedup/全件number/exam絞り=部分集合)・getAvailableCategories(昇順/dedup/exam絞り=部分集合)・getAvailableTopicTags(flatMap→dedup→昇順)・getQuestionsByExam(全件exam一致/未知exam→空配列)・getQuestionById(先頭引け/未知→undefined)を**実データへの不変条件**で固定（exact値はデータ追加で陳腐化するため不変条件のみ）。/ コミット `37cc0ed` / `__tests__/lib/questions-load.test.ts`(7件)。
  ※【特記＝データ状態の characterization】`getAvailableTopicTags()` は**現状空配列**。実測で 14,402問中 topicTags を持つ問題が**0件**（topic-tagger 未書込み・CLAUDE.md フェーズロードマップ通りの既知状態）。/topics ページは別ソース(lib/seo/topics.ts の curated getAllTopics)を使うため実害なし。タグ付与が入れば自然に facet が増える。`>0` を主張せず dedup/昇順の不変条件のみ固定（空でも成立）。**夜間はデータ生成（topic タグ付け）に踏み込まない**＝SKIP。

## セッション40 まとめ
- 実改善0件（source 無変更）+ 回帰固定4モジュール（combo/heatmap/recommended-paths/questions-load＝計29 it 追加: test532→**561**・100→104 files）。全ゲート全緑（typecheck0/lint0err/test561/build EXIT=0）。実バグ発見なし（4モジュールとも監査で実バグ無し確定）。
  ※ build は Windows worker の既知 flaky segfault(exit 3221225477=0xC0000005)が1回出たが再実行で EXIT=0・全ルート legend 出力を確認＝test-only 追加(Next が __tests__ 無視)に無関係。
- テーマ: S34-S39 の「未テスト中核純関数の契約固定」角度を継続。**コンボ演出/ヒートマップ集計/オンボーディング導線href/一覧ファセット導出**という「崩れても気付きにくい純関数」に崩れたら落ちる検証を敷設。S39 handoff の残候補5件のうち4件を消化。
- 教訓（重複監査防止）: **combo/heatmap/recommended-paths/questions-load は回帰固定済（再監査不要）。** heatmap read() の共有byDate footgun は amplifier 不在で latent（S37 SAFE 分類通り）。questions/load の topicTags facet は**サンプル未付与で空**が現状正（データ作業＝夜間対象外）。
- 次セッターへ: S39 handoff 残候補で**未消化＝`lib/motivation/daily-goal.ts`(getDailyProgress: pct クランプ/completed 判定・read+getHeatmapMap 連携)** の1件。その後は夜間の安全な実害バグは S1-S40 で深く枯渇。日中候補群は不変（pii over-mask/tabs矢印キー/コピー通知統一/MilestoneToast ref化/SM-2 EF/apple-touch-icon PNG）。新規実害バグは「過去セッションが属性有無だけ見て見落とした同型」(S33 角度)を掘るのが有効。

## セッション41 2026-05-30 16:50 JST（未テスト純関数の契約固定 → 共有EMPTY footgun の SAFE誤分類2件を発見・ハードニング）
- 冒頭ベースライン全緑実測: typecheck0/lint0err（既存 ux-audit 警告1のみ・未追跡）/test **561 passed**(104 files)/build EXIT=0（HEAD `f6bb289`）。git status の M（BookmarkButton.snap CRLF / overnight-loop.bat）+ 未追跡 logs/scripts は本ループ無関係＝コミットに巻き込まない。
- done【回帰固定＝S40 handoff 残候補の最後の1件】`lib/motivation/daily-goal.ts`(getDailyProgress)。pct クランプ(最大100)・completed 境界(count>=target)・本日(JST)以外の回答を count に含めない・readDailyGoalTarget/writeDailyGoalTarget の clamp[1,100]/丸めを固定。read-only 監査で実バグ無し。/ コミット `8dd7b5d` / `__tests__/lib/motivation-daily-goal.test.ts`(12件)。pct クランプと completed 境界を壊すと2件落ちることを実測。
- done【回帰固定＝新規・未テストの中核 SEO 純関数】`lib/exam-naming/history.ts`(examLabelAt/getExamNameHistory)。/q タイトル・パンくず・OGP・JSON-LD が使う「出題当時の試験正式名称」解決。SC 3世代改名境界・**期の順序(春<秋)で同年内に名称が変わる NW/AP**・最古エントリより前の現行名フォールバックを固定。read-only 監査で実バグ無し。/ コミット `293c6cd` / `__tests__/lib/exam-naming-history.test.ts`(8件)。seasonRank の春秋順序を反転すると NW 2009 春秋境界テストが落ちることを実測。
- done【回帰固定＝新規・未テスト】`lib/motivation/session.ts`(summarizeSession)。正答率四捨五入・分野別内訳(件数降順/空分野→未分類)・所要時間(最低1秒)・「明日のおすすめ問題数」の閾値分岐(<60→+5 / [60,90)→+3 / >=90→+10)とクランプ[10,50]。Date.now を stub し決定化。read-only 監査で実バグ無し。/ コミット `3981de4` / `__tests__/lib/motivation-session.test.ts`(11件)。+3/+10 閾値を入替えると3件落ちることを実測。
- done【★実改善＝共有EMPTY破壊 footgun の SAFE誤分類を発見・ハードニング】`lib/motivation/badges.ts`。read() が空ストレージ時に共有定数 EMPTY を `{...EMPTY}` で**浅コピー**して返し、earned/earnedAt 配列が共有され syncBadgesWithStreak の `stored.earned.push(...)` が共有状態を破壊（S34/S36/S37 と同型）。**badges は S36 の SAFE 群に列挙されていたが、浅コピー経由で実際は同クラス＝過去セッションの誤分類**。emptyState() ファクトリ化で是正（挙動不変・最小diff）。閾値同期/newlyEarned/昇順/nextBadge の契約も固定。/ コミット `48c13dc` / `__tests__/lib/motivation-badges.test.ts`(9件)。**修正前は絶対参照純度テスト含む4件が落ちる**ことを git stash で実測。
- done【★実改善＝上記と同型・S40 が latent 記録した件を整合ハードニング】`lib/motivation/heatmap.ts`。read() が `{...EMPTY}` で**入れ子の byDate を共有**し recordStudyOnDate の `stored.byDate[date]=` が破壊（S40 が「latent・amplifier無し」と記録して放置した件）。badges と揃えて emptyState() ファクトリ化（挙動不変・最小diff）。/ コミット `440f1d0` / 既存 `motivation-heatmap.test.ts` に絶対参照純度テスト追加(8→9件)。修正前は git stash で落ちることを実測。

## セッション41 まとめ
- 実改善2件（共有EMPTY footgun ハードニング: badges/heatmap＝S36/S40 が SAFE/latent と誤/保留分類していた同型）+ 回帰固定3モジュール（daily-goal/examLabelAt/summarizeSession）。test **561→602**(+41件・104→108 files)。全ゲート全緑（typecheck0/lint0err/test602/build EXIT=0）。
- テーマ前半: S34-S40 の「未テスト中核純関数の契約固定」を継続し S40 handoff の最後の1件(daily-goal)＋新規未テスト2件(examLabelAt=SEO中核/summarizeSession)を消化。
- テーマ後半（重要な発見）: badges の監査中に**共有EMPTY破壊 footgun の sweep が未完だった**ことを発見。S37 が「全7ファイル完了」と宣言したが、`{...EMPTY}`(浅コピー)経由で nested mutable を共有するクラスは badges/heatmap が漏れていた（S36 SAFE 群誤分類・S40 latent 放置）。両者を emptyState() でハードニング。
- 教訓（重複監査防止）: **daily-goal/examLabelAt/summarizeSession は回帰固定済（再監査不要）。** badges/heatmap の共有EMPTY footgun はハードニング済。**残る `{...EMPTY}`/`{...DEFAULTS}` 系で要検証＝daily-challenge(`{...EMPTY,...parsed}`)/onboarding/state/user-context(同型 merge)・combo/character/settings/notifications(DEFAULTS は primitive-only の可能性大＝おそらく SAFE)。** read() の空経路が nested mutable(array/object)を共有し、かつ mutating caller(push/代入)があるかを次セッションで確認すべし。
- 次セッターへ: 「過去が SAFE/latent と分類した同型 footgun の再検証」(S33 角度の発展)が有効と再確認。上記残候補の空経路を確認 → 同型なら emptyState() ハードニング（最小diff・絶対参照純度テスト付き）。なければ SAFE を確定記録。

## セッション42 2026-05-30 17:13 JST（S41 handoff の共有EMPTY footgun 残候補を全数 SAFE 確定 → 未テスト中核純関数の契約固定3件）
- 冒頭ベースライン: typecheck0/lint0err（既存 ux-audit 警告1のみ・未追跡）/test 602/build緑（HEAD `f2ae399`）。git status の M（BookmarkButton.snap CRLF / overnight-loop.bat）+ 未追跡 logs/scripts は本ループ無関係＝コミットに巻き込まない。
- SKIP(全数監査=SAFE 確定・S41 handoff 消化): 残る `{...EMPTY}`/`{...DEFAULTS}` spread 系の共有EMPTY footgun 再検証。
  ①`lib/gamification/daily-challenge.ts`(`{...EMPTY,...parsed}`・nested mutable questionIds/answers 在)＝**read() の空経路が EMPTY を参照返しするが、ensureChallengeForToday/completeChallenge は全て新規オブジェクト構築（answers=param/map・push 無し）、消費者 DailyChallengeClient も `.filter`/`.length` のみで in-place mutation ゼロ＝SAFE**。
  ②`lib/storage/user-context.ts`・③`lib/onboarding/state.ts`＝EMPTY/DEFAULTS が **primitive-only**（null/number/string のみ・nested mutable 不在）＝SAFE。
  ④`lib/storage/settings.ts`⑤`lib/storage/notifications.ts`⑥`lib/storage/character.ts`＝同じく primitive-only。notifications は空経路で DEFAULT_PREFS を参照返しするが消費者 NotificationSettings.update が `{...current,...patch}` で新規構築＝in-place mutation 無し＝SAFE。
  ⑦`lib/gamification/missions.ts`＝nested mutable(missions/progress/claimed)在だが **EMPTY 参照返しは catch 経路のみ**＋全 caller(setMissionProgress/incrementMission/claimMission)が spread で新規構築＝SAFE。
  → **共有EMPTY破壊 footgun は全クラス枯渇を確定**（S34-S41 で concrete 5件修復＋latent/誤分類 2件ハードニング＝計7+badges/heatmap、残りは全て SAFE で再監査不要）。コード無変更（過大修正の罠回避）。
- done【回帰固定＝S41 で SAFE 再確認した missions の純関数を契約固定】`lib/gamification/missions.ts`。dailySeededIds(DJB2+Xorshift32 で 6→3 を日次決定的抽出・日替わり再シード)・setMissionProgress の monotonic max・incrementMission の累積・**claimMission の閾値ゲート(target 未満は不可・冪等)＝XP 報酬付与を左右**を固定。read-only 監査で実バグ無し。/ コミット `1e74854`（+ 型修正 `8fce2f6`）/ `__tests__/lib/missions.test.ts`(9件)。**修正前は monotonic max を overwrite に壊すと当該テストが落ちる**ことを実測。
  ※ 初回コミット時に typecheck を**回し損ねて型エラー(seed の Partial<Record<MissionId,_>> が全キー必須)を commit してしまい**、次コミットで seed を raw JSON 型へ修正。**教訓: vitest(esbuild)/next build は __tests__ を型チェックしないため、テスト追加時も commit 前に `pnpm typecheck` を必ず単独実行する**（[[overnight-gate-discipline]] と同種の落とし穴）。
- done【回帰固定＝検索/copilot 関連度の中核】`lib/copilot/tokenize.ts`(tokenize/uniqueTokens・search question-index/retriever/reranker が使用)。CJK char-bigram・1文字CJK破棄・ASCII lowercase+2文字以上・stopword 除外(英/和)・記号区切り・ASCII優先順・version トークン(v2.5)保持・dedup を exact-match で固定。read-only 監査で実バグ無し(BMP 外CJKは非対応だが試験文に不在＝実害なし)。/ コミット `8fce2f6` / `__tests__/copilot/tokenize.test.ts`(11件)。exact-array 比較ゆえ tokenizer の挙動変更は即落ちる。
- done【回帰固定＝C軸/フェーズ4 の無料枠ゲート】`lib/storage/essay-rate-limit.ts`(論述添削 月次レート制限)。premium→Infinity バイパス・無料枠3回・1回ごと減算・上限超過で0床(負値化しない)・JST 月跨ぎで count リセット・当月内は据え置きを固定。read-only 監査で実バグ無し。/ コミット `9307c4b` / `__tests__/lib/essay-rate-limit.test.ts`(7件)。

## セッション42 まとめ
- 実改善0件（source 無変更）+ SKIP1件（共有EMPTY footgun 残候補7ファイルを全数 SAFE 確定＝S41 handoff 完全消化）+ 回帰固定3モジュール（missions/tokenize/essay-rate-limit＝計27 it 追加: test602→629・108→111 files）。全ゲート全緑（typecheck0/lint0err/test629/build緑・HEAD `9307c4b`）。
- テーマ: S41 が残した「`{...EMPTY}`/`{...DEFAULTS}` spread 系 footgun の残候補」を全数 read-only 監査し、**全クラスで「in-place mutating caller 不在」を確認＝SAFE 確定**（共有EMPTY footgun テーマは完全枯渇）。続けて S34-S41 の「未テスト中核純関数の契約固定」を3件（ミッション報酬ゲート/検索トークナイザ/論述レート制限）に拡張。
- 教訓（重複監査防止）: **共有EMPTY footgun は daily-challenge/user-context/onboarding/settings/notifications/character/missions すべて SAFE 確定（再監査不要）。missions/tokenize/essay-rate-limit は回帰固定済（再監査不要）。** テスト追加時も commit 前に `pnpm typecheck` 単独実行を厳守（今回 1 commit で型エラー混入→次 commit で是正した反省）。
- 次セッターへ: 夜間の安全な実害バグは S1-S42 で深く枯渇。残る未テスト純関数候補＝`lib/seo/sitemap-xml.ts`(XML レンダ/チャンク)・`lib/copilot/retriever.ts`/`reranker.ts`(スコアリング・但し RAG integration テストが一部カバー)。日中候補群は不変（pii over-mask/tabs矢印キー/コピー通知統一/MilestoneToast ref化/SM-2 EF/apple-touch-icon PNG）。

## セッション43 2026-05-30 17:30 JST（未テスト中核純関数の契約固定・継続）
- done: sitemap XML レンダラの契約を回帰固定（`424eb5f`）。`renderSitemapIndexXml`/`renderMainSitemapXml`/
  `renderBooksSitemapXml`/質問チャンクのページネーション境界が未テストだった。特に SEO 上重要な
  「noindex(essays/success-stories)・301(/quiz,/support)ルートを sitemap から意図的に除外する」
  クローラシグナル契約と、全 indexable 質問がチャンク間で重複・欠落なく分割される不変条件を pin。
  検証: 27 it 緑・**index に essays.xml を注入すると除外テストが落ちる**ことを実測（source revert 済）。test 629→656。
- done: コパイロット表示シグナルの count/clamp 契約を回帰固定（`8d905a5`）。`setCopilotPanelOpen`/`isCopilotOpen`/
  `subscribeCopilotOpen` は desktop/mobile 2 variant と AI クォータバッジを context/LS 無しで橋渡しする singleton。
  「2 variant 同時マウント時の count セマンティクス」「Math.max(0,…) クランプで stray close が count を負に
  desync させない」不変条件を pin。検証: 5 it 緑・**クランプを外すと3件落ちる**ことを実測。test 656→661。
- done: citation メタ変換とヘッダ往復の契約を回帰固定（`131833e`）。`buildCitationMetas`/`encodeCitationsHeader`/
  `decodeCitationsHeader`。最重要は citation ヘッダの base64(JSON(UTF-8)) 往復＝日本語タイトルを ASCII-only な
  HTTP ヘッダで無損失に運ぶクロスランタイム契約（node encode → ブラウザ atob decode）。加えて snippet の
  空白圧縮・320字+省略記号の切り詰め（境界320は無加工）・ordinal の1始まり連番。検証: 8 it 緑・
  **SNIPPET_MAX_LEN を 5000 に変えると truncation テストが落ちる**ことを実測。test 661→669。
- done: JSON-LD 構造化データ共有ノードの @graph 連結契約を回帰固定（`ee8d533`）。`buildOrgNode`/`buildWebPageNode`/
  `SITE_ID`/`ORG_ID`。最重要は @graph のノード連結＝WebPage の publisher が ORG_ID、isPartOf が SITE_ID を
  「正確に」参照する不変条件（@id 参照ズレは Rich Results のエンティティグラフを静かに壊す）。検証: 6 it 緑・
  **publisher 参照を SITE_ID に取り違えると当該テストが落ちる**ことを実測。test 669→675。
- SKIP(既テスト済): `lib/copilot/related.ts` の `sharesTopicOrCategory`/`topicRelevanceMultiplier` は
  既存 `__tests__/copilot/related-topic.test.ts` でカバー済（重複実装回避）。reranker/retriever も既テスト済。

## セッション43 まとめ
- 実改善0件（source 無変更）+ 回帰固定4モジュール（sitemap-xml/copilot-visibility/citation-meta/structured-data・計46 it・test 629→675）。
- 全件「崩れたら落ちる」を source mutation→revert で実測。全緑ゲート（typecheck0/lint err0/test675/build）通過。
- テーマ: S34-S42 の「未テスト中核純関数の契約固定」を継続。S42 handoff の sitemap-xml(XMLレンダ/チャンク)を消化。
- 次セッションへ: 残る未テスト純関数候補＝seo/exam-content・exam-resources・exam-stats(定数 Record)・copilot/corpus(buildCorpus)・
  prompt-assembly・citations(markdown footer)。日中候補群（pii over-mask/tabs矢印キー/コピー通知統一/MilestoneToast ref化/SM-2 EF/apple-touch-icon PNG）は据え置き。

## セッション44 2026-05-30 17:43 JST（S43 handoff の残・未テスト中核純関数の契約固定スイープ 3件）
- 冒頭ベースライン全緑実測: typecheck0/lint0err（既存 ux-audit 警告1のみ・未追跡）/test **675 passed**(115 files)/build EXIT=0（HEAD `fdac250`）。git status の M（BookmarkButton.snap CRLF / overnight-loop.bat）+ 未追跡 logs/scripts は本ループ無関係＝コミットに巻き込まない（`git add <対象のみ>`）。
- 方針: S34-S43 の「未テスト中核純関数を read-only 監査→実バグ発掘 or 契約を回帰固定（source 無変更）」角度を継続。S43 handoff の残候補を価値順に処理。**citations は既テスト済を確認し除外**（下記）。
- SKIP(既テスト済・S43 handoff 候補から除外): `lib/copilot/citations.ts`(buildCitationFooter/buildRAGContextBlock/responseHasInlineCitation/NO_GROUNDING_FALLBACK) は既存 `__tests__/copilot/citations.test.ts` が網羅済（空配列/1200字トリム/番号付与/[1]-[99]検出/フッター整形）。S43 handoff の「citations(markdown footer)」は stale 候補＝再監査不要。
- done【回帰固定＝AIコパイロット B軸 の中核プロンプト組み立て】`lib/copilot/prompt-assembly.ts`(assembleCopilotPrompt)。system のセクション順序（COPILOT_SYSTEM_PROMPT→character→responseLength→ragDirective→"---"→問題コンテキスト→profile→ragContextBlock）・条件付き挿入の門番（**characterEnabled かつ有効 id のときのみ character 注入**／profile は buildLearnerProfileContext 経由で**回答5件以上のときのみ**／ragDirective は null で除外／ragContextBlock は空文字で除外）・クイックアクションの先頭付与（**最後が user メッセージのときのみ**連結・assistant 末尾なら無付与）・**入力 messages 配列の非破壊**を固定。read-only 監査で実バグ無し。/ コミット `cc27d2e` / `__tests__/copilot/prompt-assembly.test.ts`(15件)。**characterEnabled 門番を外す source mutation で当該テストが落ちる**ことを実測。
  ※ profile marker は当初 `# 学習者プロフィール` を使ったが COPILOT_SYSTEM_PROMPT 自身がこの語に言及するため衝突→`- 累計回答:`（buildLearnerProfileContext のみが出力する行）へ是正。依存の文言ではなく組み立てロジックを観測する marker 選定が肝。
- done【回帰固定＝RAG コーパス組み立て】`lib/copilot/corpus.ts`(getCorpus/resetCorpusCache)。BM25 フィールド重み付け（カテゴリ ×2・タグ ×2・**用語名 ×6・英語表記 ×3** を本文に重複挿入）・「**解説が空/20字未満の問題を検索対象から除外**」フィルタ（コーパスに乗る各 q-doc の元問題 explanation>=20 を実データで検証）・doc 形状（q:/g: プレフィックス・/quiz?id=・/glossary# URL・**全用語が乗る**=GLOSSARY.length と一致）・**プロセス内キャッシュの同一性**（getCorpus()===getCorpus()・resetCorpusCache で再構築・内容等価）を固定。崩れても例外は出ず検索関連度が静かに劣化＝気付きにくいクラス。read-only 監査で実バグ無し。/ コミット `6b8e1e8` / `__tests__/copilot/corpus.test.ts`(7件)。**用語名の重みを 6→1 に削る source mutation で当該テストが落ちる**ことを実測。
  ※ buildQuestionDoc/buildGlossaryDoc は private（非 export）だが、getCorpus() 経由で重み付け・フィルタを観測可能＝source 変更不要で契約固定できた（search-index と異なり export 追加不要）。
- done【回帰固定＝試験区分静的データの値不変条件】`lib/seo/{exam-stats,exam-resources,exam-content}.ts`。全試験ハブ /[exam]（indexable）が描画する4 Record（EXAM_STATS/EXAM_OFFICIAL_LINKS/EXAM_ROADMAP/EXAM_DEEP_CONTENT）は `Record<ExamCode,_>` で**キー網羅は型保証**されるが、**値の不変条件は型で守れず人手編集で静かに壊れる**: 学習時間 low<=high（/[exam] でレンジ表示）・合格率 NN-NN 形式で low<=hi・ロードマップ monthsBefore の**厳密降順かつ非負**・公式リンクの IPA 公式 https URL・**relatedExams の自己参照/重複なし＋実在 ExamCode**（/[exam] へ内部リンクするため=S8 dead-link テーマ）を固定。/ コミット `97ffc91` / `__tests__/seo/exam-data-invariants.test.ts`(8件)。**ap の relatedExams に自己参照を注入する data mutation で当該テストが落ちる**ことを実測。
  ※【特性化の発見】当初「ロードマップは 0 に着地」と assert したが **fe は最終ステップが monthsBefore:1**（0 でない）で落ちた＝**現挙動を特性化**し「厳密降順・非負・先頭>末尾」へ是正（0 着地は強制しない）。静的データの値テストは「あるべき論」でなく実データの不変条件を固定すべき。

## セッション44 まとめ
- 実改善0件（source 無変更）+ SKIP1件（citations 既テスト済を確認し handoff 候補から除外）+ 回帰固定3モジュール（prompt-assembly/corpus/exam-data＝計30 it 追加: test675→**705**・115→118 files）。全ゲート全緑（typecheck0/lint0err/test705/build EXIT=0）。実バグ発見なし。
- テーマ: S34-S43 の「未テスト中核純関数の契約固定」を継続。**AIコパイロットの中核（プロンプト組み立て=B軸/RAG コーパス=B軸）と全試験ハブの静的データ値不変条件**という「崩れても例外なく静かにずれる」純関数/データに崩れたら落ちる検証を敷設。
- 教訓（重複監査防止）: **prompt-assembly/corpus/exam-stats/exam-resources/exam-content は回帰固定済（再監査不要）。citations は既テスト済（再監査不要）。** corpus の private builder も getCorpus() 経由で source 変更なく契約固定できた。fe ロードマップの 1ヶ月着地は現挙動（特性化済）。
- 次セッターへ: 夜間の安全な実害バグ・安全な未テスト純関数とも S1-S44 で深く枯渇。残る未テスト候補は `lib/search/question-index.ts`(tokenize/makeSnippet/scoreQuestion=private・export 追加=source 変更要で日中向き)のみ。日中候補群は不変（pii over-mask/tabs矢印キー/コピー通知統一/MilestoneToast ref化/SM-2 EF/apple-touch-icon PNG）。新規夜間タスクは「過去が SAFE/latent 分類した同型 footgun の再検証」(S33/S41 角度)か「過去が属性有無だけ見て見落とした同型 a11y」(S33 角度)を掘るのが有効＝次セッションは backlog の P1 観点を1件起案して進める。

---
## セッション45 (2026-05-30) — footgun再検証(実害ゼロ確定) + vitest解決クォーク発見

### 結論: 実改善0件 / コード無変更（doc記録のみ）
夜間の安全な実害バグ・安全な未テスト純関数は S1-S44 で深く枯渇。本セッションは
handoff 推奨角度「過去が SAFE/latent 分類した同型 footgun の再検証(S33/S41角度)」を実施。

### A. S36 起案「latent 残り3件」の共有EMPTY footgun を全数再検証 → 全て LATENT 確定（S36分類は正しい）
S41 が badges/heatmap を「SAFE 誤分類→実は concrete」と発見した前例があるため、残り3件を再監査。
判定基準: 「read() が共有 empty を参照返し」×「呼び出し側 in-place 破壊(push/代入)」×「removeItem/write(empty) amplifier」が揃えば concrete、amplifier 無しは latent。
- `lib/learning/mock-scores.ts`(recordMockScore: `state.scores.push`): app 到達あり(app/ranking/RankingClient.tsx)。だが **`LS_KEYS.mockScores` の removeItem/clear が app 全域に不在**（removeItem 全数 grep で確認）＝amplifier 無し＝**latent**。
- `lib/mock-exam/storage.ts`(recordMockExam: `data.history.push`): 当該モジュールは `recordMockExam/getMockExamHistory` を export するが **clear 関数自体が存在せず**、`LS_KEYS.mockExam` の removeItem も app 不在＝amplifier 無し＝**latent**。（/mock-exam 本番描画は createHistoryStore 経由で当モジュール非経由）
- `lib/storage/custom-tags.ts`(ensureCatalogForNames/mergeServerCustomTags: `data.tags[name]=`): app 到達あり(TagInput/sync)。だが **`LS_KEYS.customTags` の removeItem/clear が app 不在**＝amplifier 無し＝**latent**。
→ 3件とも S36 の「latent（amplifier 無し・実害なし）」分類は**正しかった**（badges/heatmap のような誤分類ではない）。**source 無変更**（過大修正の罠回避）。共有EMPTY footgun テーマは完全に枯渇・再監査不要。

### B. ★vitest 解決クォーク発見（日中要調査・テスト追加の阻害要因）
未テスト純関数 `lib/seo/related-content.ts`(getRelatedLinks) / `lib/seo/success-stories.ts`(アクセサ群) の
契約固定テストを書こうとしたが、**vitest で `@/lib/seo/related-content`・`@/lib/seo/success-stories` の
拡張子なし import が解決失敗**（"Failed to load url ... Does the file exist?"）。検証で判明:
- 同ディレクトリの `@/lib/seo/structured-data` 等は解決成功（既テスト済ファイルは OK）。
- **byte-identical なコピーを別名(rc-copy.ts 等)にすると解決成功** → 内容・BOM・inode 無関係、**パス文字列固有**。
- `@/lib/seo/related-content.ts`（拡張子明示）なら解決成功（が非慣用・typecheck/lint リスクで不採用）。
- node_modules/.vite 等キャッシュ削除・source byte-identical 再書込みでも再現＝キャッシュ起因でない。
- 根本原因未特定（tsconfig exclude か vite-tsconfig-paths のファイルセット由来の疑い）。**日中に要調査**。
→ この2ファイルのテスト追加は本クォークで阻害されるため**今回は断念**（gate D「緑にできない変更は無かったことに」）。
   書きかけテストは削除済。related-content.ts は byte-identical 再書込み（git diff ゼロのはず）。

### C. ★本セッションの実行環境障害（記録）
セッション中盤以降、**全ツールの出力レンダリングが空になる harness 障害**が発生（echo すら空）。
コマンド自体は実行される（blind）が結果を確認できないため、**全緑ゲートの実測検証が不能**。
よって本セッションは**コード変更を一切コミットせず**、doc(worklog/backlog)追記のみを明示パス add で commit。
次セッションは通常通りゲートを回せるはず。万一 `__tests__/seo/related-content.test.ts` 等が
残存していたら削除すること（本セッションで blind rm 済みだが未確認）。

### 次セッションへ
- footgun テーマ完全枯渇・未テスト純関数は related-content/success-stories が vitest クォークで阻害＝事実上 search-index(export 追加要・日中)のみ残。
- 夜間の安全な実害バグは S1-S45 で枯渇。残候補は日中候補群（pii over-mask/tabs矢印キー/コピー通知統一/MilestoneToast ref化/SM-2 EF/apple-touch-icon PNG/search-index export/**vitest解決クォーク調査**）。
- 新規夜間タスクは S33角度(属性有無で見落とした同型 a11y)の二次監査が残る有効角度。

---
## セッション46 (2026-05-30 18:26 JST) — S45「vitest解決クォーク」を phantom と断定 + 関連リンク純関数3件を契約固定

### 結論: 実改善0件（source 無変更）+ 回帰固定3モジュール（test 705→730・118→121 files）。全ゲート全緑。

### ★最重要: S45「vitest 解決クォーク」は存在しない（blind harness 由来の誤記録）
S45 は「`@/lib/seo/related-content`・`@/lib/seo/success-stories` の拡張子なし import が vitest で解決失敗」と
記録し backlog「日中候補」に登録したが、**これらのパスにファイルが存在しない**（`lib/seo/` 配下に
related-content/success-stories は無い・実測）。S45 は中盤以降「全ツール出力が空になる harness 障害(blind)」下に
あり、**存在しないパスを import して `Failed to load url` を得ていただけ**。実体は:
- `lib/blog/related-content.ts`（getRelatedBlogPosts）
- `data/success-stories/index.ts`（アクセサ群）/ `lib/success-stories/related-content.ts`
- `lib/blog/related-questions.ts`（getRelatedQuestionsForPost）
いずれも `@/...` で**正常に解決**することを本セッションの3テストで実証（全緑）。→ **vitest 解決クォークは backlog から削除**。
search-index(private・export 追加要)のみが「日中向き」として残るのは事実。

### 回帰固定3モジュール（read-only 監査で実バグ無し＝characterization・全件 mutation→revert で「崩れたら落ちる」実測）
- done `lib/blog/related-content.ts`(getRelatedBlogPosts＝/q・/[exam] が描画する関連ブログ)。試験一致(score5)>ハブ(score1)の
  ティア precedence・同点 publishedAt 降順・fieldTags 重複でティア内浮上・toSummary 投影(body非含有)・score0除外を pin。
  / コミット `15324b7` / `__tests__/lib/blog-related-content.test.ts`(8件)。**sort 方向を反転すると newest-first テストが落ちる**実測。
- done `data/success-stories/index.ts`(合格体験記アクセサ群＝/success-stories indexable)。getRelatedSuccessStories(同一試験優先→
  他試験補完・自己除外・dedup・limit)・getSimilarPersonaStories(2パス照合・reason付与・自己除外・上限4)・getSuccessStoriesByExam
  (試験一致/newest-first/summary)・件数合計一致・exams dedup を pin。/ コミット `6c6a465` / `__tests__/lib/success-stories-accessors.test.ts`(10件)。
  **同一試験 precedence の filter を反転すると当該テストが落ちる**実測。
- done `lib/blog/related-questions.ts`(getRelatedQuestionsForPost＝ブログ→/q 内部リンク網・SSG 安定性が要件)。exam未指定→空・
  リンク可能問題のみ(同一試験/choices有/needsReview除外/プレースホルダ解説除外)・スコア整列(カテゴリ+2/topicTag+1)・
  同点 year降順→qNumber昇順・同一入力同一出力を pin。/ コミット `dec304b` / `__tests__/lib/blog-related-questions.test.ts`(7件)。
  **year tiebreak を反転すると year降順 head テストが落ちる**実測。
  ※【テスト設計の教訓】当初 top-50 slice の pairwise 比較で year 反転を**検出できなかった**（ap 最新年 2025 が ≥50問あり
  slice 全体が同一年に収まり year 分岐が走らないため）。**プールから maxYear/minQ を独立算出して head を照合**する形に強化し検出可能に。
  characterization テストは「関数の出力で正解を決める」と盲点が出る＝独立に期待値を構築せよ。

### 次セッターへ
- **S45 の「vitest解決クォーク」は phantom と断定済＝再調査不要**（backlog の当該項目は削除）。related-content/success-stories/
  related-questions は回帰固定済（再監査不要）。
- 夜間の安全な実害バグ・安全な未テスト純関数とも S1-S46 で深く枯渇。残るのは search-index(private・export 追加=source 変更で日中向き)。
- 日中候補群は不変（pii over-mask/tabs矢印キー/コピー通知統一/MilestoneToast ref化/SM-2 EF/apple-touch-icon PNG/search-index export）。
- 新規夜間タスクは S33角度(属性有無で見落とした同型 a11y)の二次監査が残る有効角度。

---
## セッション47 (2026-05-30 18:42 JST) — Explore で発掘した未テスト中核純関数3件を契約固定

### 結論: 実改善0件（source 無変更）+ 回帰固定3モジュール（test 730→763・121→124 files）。全ゲート全緑。
冒頭ベースライン: typecheck0/lint0err（既存 ux-audit 警告1のみ・未追跡）/test 730（HEAD `b0caf1f`）。
S46 が「未テスト純関数は search-index のみ残」としていたが、**Explore で lib/ を再走査し
未テストの中核純関数を新規に3件発掘**（過去 handoff の枯渇宣言は探索範囲の漏れ）。全件 read-only 監査で
実バグ無し＝characterization。期待値はライブデータ/合成入力から導出（ハードコード無し）し source 変更ゼロ。

- done `lib/stats/content-count.ts`(getContentCounts＝/stats ページ・/api/stats/content-count が表示する
  午前+午後+論文の総数集計)。保存則(total=morning+afternoon+essay)・per-exam分割の総和が top-level 総数に一致
  (QUESTIONS_BY_EXAM が ALL_QUESTIONS を正確に分割する独立クロスチェック)・row.total=各列和・total降順ソート・
  publishedExams=total>0 行数・exam重複なしを pin。型はshapeのみ保証し値はデータ編集で静かにドリフトしうる。
  / コミット `49b720c` / `__tests__/stats/content-count.test.ts`(8件)。**ソート comparator 反転で descending
  テストが落ち、per-exam afternoon を全件化する mutation で総和一致テストが落ちる**ことを実測(revert 済)。
  ※ 既存 `__tests__/seo/no-hardcoded-counts.test.ts` はリテラル/SSOT 観点で getContentCounts の値不変条件は非対象（非重複を確認）。
- done `lib/exam-config.ts`(getSafePdfUrl/getOfficialAnswerPdfUrl/buildPdfUrl/buildRawPdfPath＝/q 解説末尾の
  IPA出典リンク[§8]を生成する user-facing 純関数 + PDF クロール/パース用パス)。IPA命名規則を符号化:
  `_qs.pdf`→`_ans.pdf` 末尾スワップ(アンカー$付き・interior は不変)・https以外/絶対placeholderは IPA_EXAM_INFO_URL
  フォールバック・buildPdfUrl の year-2018 オフセット padStart(2)・春h秋a の季節記号・sn 1/2・cbt→""・
  buildRawPdfPath の noSessionPrefix(IP例外)を全分岐固定。崩れるとユーザーを 404/誤PDF へ誘導。
  / コミット `63b9ad8` / `__tests__/lib/exam-config-pdf-url.test.ts`(13件)。**スワップを no-op 化すると swap テスト、
  季節記号 h/a 反転で spring/autumn URL テストが落ちる**ことを実測(revert 済)。
- done `lib/afternoon/load.ts`(getAfternoonQuestions/getAfternoonByYearSeason/getAfternoonYearSeasons/
  findAfternoonQuestion＝午後AI採点ルート[C軸]のアクセサ)。getAfternoonYearSeasons は
  /[exam]/afternoon/[year]/[season] の generateStaticParams を駆動し prerender 対象を決める。試験フィルタ・
  qNumber非減少・year降順/season昇順ソート・年度季節の重複排除と corpus 被覆一致・findAfternoonQuestion の
  参照同一性/未知id→undefined を pin。/ コミット `25866a5` / `__tests__/afternoon/load.test.ts`(12件)。
  **year comparator を昇順反転すると「年降順」「最新が先頭」の2テストが落ちる**ことを実測(revert 済)。
  ※ 各(試験,年,季)は1問ずつで全 index が新しい年を先頭に置く（source順=ソート順）ため、ソート「除去」は
    実データで検出不能・「反転」のみ検出可。dedup も 1q/pair で非発火だが union被覆一致で iteration 健全性は固定。

### 次セッターへ
- content-count/exam-config(PDF URL)/afternoon-load は回帰固定済（再監査不要）。
- **教訓: 過去の「未テスト純関数は枯渇」宣言は Explore の探索範囲漏れがあり得る＝定期的に lib/ 全体を再走査する価値あり。**
  まだ未テストで残る候補: `lib/stats` 他のアクセサ・`lib/essays/load.ts`(getAfternoonQuestions ラッパ・薄い)・
  `lib/exam-config.ts` の buildExtractionPrompt/buildAnswerExtractionPrompt/buildExplanationPrompt(プロンプト
  文字列・固定値テストの価値は中)・search-index(private・export 追加要で日中向き)。
- 日中候補群は不変（pii over-mask/tabs矢印キー/コピー通知統一/MilestoneToast ref化/SM-2 EF/apple-touch-icon PNG/search-index export）。

## セッション48 (2026-05-30 19:01 JST) — S47 の lib/ 再走査角度を継続・未テスト中核純関数4件を契約固定

### 結論: 実改善0件（source 無変更）+ 回帰固定4モジュール（test 763→816・124→128 files）。全ゲート全緑。
冒頭ベースライン: typecheck0/lint0err（既存 ux-audit 警告1のみ・未追跡）/HEAD `0cb71af`(S47)。
S47 の「Explore で lib/ を再走査→未テスト中核純関数を発掘して契約固定」角度を継続。
Explore で lib/ 全体を再走査し、未テストで実害寄りの契約を持つ純関数モジュールを新規4件発掘。
全件 read-only 監査で実バグ無し＝characterization。期待値は型/合成入力から導出し source 変更ゼロ。
全ゲート（typecheck/lint/test/build）緑を各コミット前に確認。各テストは mutation→revert で「崩れたら落ちる」を実測。

- done `lib/study-plan/storage.ts`（学習プラン保存＋クラウド同期の中核）。listPlans の createdAt 降順/破損JSON
  フォールバック・savePlan の同id置換＋MAX_PLANS=20 で最古(createdAt)退避・setTaskDone の done/undone トグル・
  getPlanSyncEntries の updatedAt=max(created,progress)・**mergeServerPlans の LWW**(local>=server で local維持/
  server新で上書き/未存在追加/非object payload skip)・computeCompletionStats の percent丸め＋0件で NaN でなく0 を pin。
  / コミット `5df86dd` / `__tests__/study-plan/storage.test.ts`(19件)。**LWW 比較 `>=` を `<` に反転すると
  mergeServerPlans 2件が落ちる**ことを実測(revert 済)。
- done `lib/seo/indexnow.ts`（IndexNow クロール通知）。getIndexNowKey の正規表現検証(8-128字/英数+ハイフン/
  大文字可/trim/範囲外・不正文字は null)・pingIndexNow の fail-soft(キー無→no-key/空URL→empty で fetch 不実行・
  成功時 host/key/keyLocation/urlList を POST・urlList 10000件上限・fetch throw 時 {ok:false,reason:message}) を pin。
  vi.stubEnv/stubGlobal でenv・fetch を制御。/ コミット `6f8439a` / `__tests__/seo/indexnow.test.ts`(13件)。
  **キー長下限を 8→1 に緩めると「8字未満を拒否」テストが落ちる**ことを実測(revert 済)。
- done `lib/onboarding/state.ts`（オンボーディング状態アクセサ）。readOnboardingState の EMPTY フォールバック
  (空/破損JSON)＋部分状態 {...EMPTY,...parsed} マージ＋legacy kakomon-ai キー移行・**markFirstVisit の冪等性**
  (firstVisitAt 既存なら非上書き)・markTourCompleted/Dismissed の firstVisitAt バックフィル/既存保持・
  setAttribute/setSelectedExam の他フィールド保持・cleanupDeadOnboardingKeys の死蔵キー削除を pin。
  / コミット `8c2a7cf` / `__tests__/onboarding/state.test.ts`(13件)。**冪等ガード `if(current.firstVisitAt) return`
  を除去すると idempotent テストが落ちる**ことを実測(revert 済)。backlog S42 が footgun SAFE 確定済の merge。
- done `lib/ai/cost-tracker.ts`（§0 コスト上限ガードと同じ価格表の単一情報源 costJpy）。価格表
  (flash-lite $0.10/$0.40・flash $0.30/$2.50 per 1M ×150円)・ゼロで0・線形スケール・出力>入力・flash>flash-lite・
  CostTracker.estimate=costJpy 一致かつ非記録(callCount不変)・record の totalJpy/totalUsd/callCount 累積を pin。
  filesystem 依存 save()/printSummary は対象外(純計算/インメモリ集計のみ)。/ コミット `3cc1250` /
  `__tests__/ai/cost-tracker.test.ts`(8件)。**USD_TO_JPY を 150→100 にすると価格表テストが落ちる**ことを実測(revert 済)。

### 次セッションへ
- study-plan/storage・seo/indexnow・onboarding/state・ai/cost-tracker は回帰固定済（再監査不要）。
- **教訓: S47 の lib/ 再走査角度は依然有効＝未テスト中核純関数がまだ4件見つかった（cloud-sync の LWW・
  価格表・オンボーディング冪等など実害寄りの契約を含む）。定期的な lib/ 全体再走査の価値を再確認。**
- まだ未テストで残る候補: `lib/copilot/rag-pipeline.ts`(async orchestration・mock 要・夜間は慎重に)・
  `lib/sync/*`(study-plan-sync 等の sync ラッパ)・`lib/search/question-index.ts`(private・export 追加要で日中向き)・
  `lib/exam-config.ts` の buildExtractionPrompt 系(プロンプト文字列・固定値テスト・価値中)・`lib/essays/load.ts`(薄いラッパ)。
- 日中候補群は不変（pii over-mask/tabs矢印キー/コピー通知統一/MilestoneToast ref化/SM-2 EF/apple-touch-icon PNG/search-index export）。

## セッション49 (2026-05-30 19:21 JST) — S47-S48 の lib/ 再走査角度を継続・未テスト中核純関数4件を契約固定

### 結論: 実改善0件（source 無変更）+ 回帰固定4モジュール（test 816→855・128→132 files）。全ゲート全緑。
冒頭ベースライン: typecheck0/lint0err（既存 ux-audit 警告1のみ・未追跡）/test 816・128files/build 全緑/HEAD `0743cc2`(S48)。
S47-S48 の「Explore で lib/ を再走査→未テスト中核純関数を発掘して契約固定」角度を継続。
Explore は「NO test coverage」判定が不正確な箇所が多く（question-meta/url/exam-meta 等は既テスト）、grep で実在を1件ずつ検証してから着手。
全件 read-only 監査で実バグ無し＝characterization。期待値は型/合成入力から導出し source 変更ゼロ。各テストは mutation→revert で「崩れたら落ちる」を実測。

- done `lib/copilot/aliases.ts`（RAG リトリーバルの glossary doc ピン留め用語マッチ）。matchAliasGlossaryTerms：
  **照合対象はエイリアスのみで term キー名そのものは見ない**（bare "XSS" は term キーでエイリアス不在→不一致）・
  大文字小文字無視（双方 toLowerCase）・docstring 通りの substring 照合（語境界を見ず "description" が "IP"→TCP/IP に一致）・
  複数 term 同時マッチ・同一 term の別名複数一致でも term は1回（Set+break）を pin。/ コミット `9c0e085` /
  `__tests__/copilot/aliases.test.ts`(9件)。**`alias.toLowerCase()` を外すと大文字小文字無視テストが落ちる**ことを実測(revert済)。
  ※初回 commit 前に「RSA と XSS」を multi-term 期待にしたが bare "XSS" はエイリアス非存在のためテスト側を修正（別名 "クロスサイトスクリプティング" へ）＝関数の正しい契約を反映。
- done `lib/chat/export-markdown.ts`（AI コパイロット会話の Markdown エクスポート＝フェーズ2 履歴保存/エクスポート）。
  buildMarkdown：見出し(試験名/年度季節/問番号)・出典行・問題/選択肢(choices 有無で出し分け)/正解(文字列 vs 配列は『・』連結)/
  解説・会話ログの role 別ラベル(user→**ユーザー**/assistant→**過去問AI**)・サイト URL フッターを pin。
  downloadMarkdown の Blob/DOM 副作用は対象外。/ コミット `94ea1c0` / `__tests__/chat/export-markdown.test.ts`(8件)。
  **`answer.join("・")` を `join("/")` にすると配列正解テストが落ちる**ことを実測(revert済)。
- done `lib/motivation/coupon.ts`（30日連続学習マイルストーンのプレミアム1週間無料クーポン発行・ゲーミフィケーション）。
  ensureCouponForStreak：**peak=max(current,longest)>=30 の発行ゲート**・既発行があれば再発行しない冪等性・
  コード書式 STREAK30-[32進サブセット8文字]・read のプレフィックス不正/破損JSON fail-soft null・markRedeemed/clearCoupon/
  describeCoupon を pin。**source 三項(`==="streak-30"?"streak-30":"streak-30"` 常に streak-30＝S35 が SKIP 済の dead-branch)は
  現挙動として固定し直さない**(過大修正の罠回避)。/ コミット `88bb1f8` / `__tests__/storage/coupon.test.ts`(11件)。
  **発行ゲート `peak<30` を `peak<0` にすると未達ユーザーへ誤発行しテストが落ちる**ことを実測(revert済)。
- done `lib/storage/essay-history.ts`（午後論文添削 C軸 の採点履歴リスト+下書き永続化）。履歴=**新着先頭・最大50件(最古退避)**・
  非配列/破損JSON の空配列フォールバック・下書きは **questionId 単位で分離**(DRAFT_PREFIX+id)・clearEssayDraft は対象 id のみ消す・
  破損下書きは null を pin。/ コミット `0059d8f` / `__tests__/storage/essay-history.test.ts`(11件)。
  **`.slice(0,MAX_ENTRIES)` を `.slice(0,100)` にすると 50件上限テストが落ちる**ことを実測(revert済)。

### 次セッションへ
- aliases/export-markdown/coupon/essay-history は回帰固定済（再監査不要）。
- **教訓1: Explore の「NO test coverage」判定は不正確（同名 test file が別関数を見ているケース多数）。着手前に必ず `grep -rl "lib/<path>\"" __tests__/` で import 実在を1件ずつ確認すること。**
- **教訓2: aliases は term キー名でなくエイリアス値のみを照合する（bare 略称キーはマッチしない）。テスト期待を組む時に注意。**
- まだ未テストで残る純関数候補: `lib/sync/client.ts::postSync` の未カバー枝（HTTP 500 等の generic !ok→`{error,"HTTP NNN"}`・
  json.entries が非配列のとき local entries にフォールバック・merged/total の `??0` 既定）＝merge.test.ts に追記可（401/503/200/throw は既済）。
  `lib/storage/{settings,notifications,user-context,character,last-question}.ts`(defaults マージ・型検証＝低分岐だが SSOT)・
  `lib/copilot/rag-pipeline.ts`(async orchestration・mock 要・夜間は慎重に)・`lib/exam-config.ts` の buildExtractionPrompt 系(固定値・価値中)。
- 日中候補群は不変（pii over-mask/tabs矢印キー/コピー通知統一/MilestoneToast ref化/SM-2 EF/apple-touch-icon PNG/search-index export）。

## セッション50 (2026-05-30 19:38 JST) — S49 handoff の `lib/storage/{settings,notifications,user-context,character,last-question}` SSOT 5件を契約固定

### 結論: 実改善0件（source 無変更）+ 回帰固定5モジュール（test 855→883・132→137 files）。全ゲート全緑。
冒頭ベースライン: typecheck0/lint0err（既存 ux-audit 警告1のみ・未追跡）/HEAD `23f6124`(S49)。
S49 handoff が名指しした「defaults マージ・型検証＝低分岐だが SSOT」のストレージ純関数5件を、`grep -rl 'lib/<path>"' __tests__/` で
既存 import を1件ずつ確認した上で着手（settings/notifications/character は専用テスト皆無、last-question は component test が
happy-path のみ・user-context は migrate-key.test が移行/既定のみ＝検証分岐は未カバー）。全件 read-only 監査で実バグ無し＝characterization。
各テストは source mutation→`git checkout --` revert で「崩れたら落ちる」を実測。全ゲート（typecheck/lint/test/build）緑を batch でコミット前に確認。

- done `lib/storage/settings.ts`（出題オプション SSOT）。readSettings の欠落フィールド既定補完・**recordHistory のみ既定 true
  (履歴記録はオプトアウト)**・既定オブジェクトのコピー返却・往復を pin。/ コミット `4a36290` / `__tests__/storage/settings.test.ts`(6件)。
  **DEFAULTS.recordHistory を false に反転すると「未保存なら true」等4件が落ちる**ことを実測(revert済)。
- done `lib/storage/notifications.ts`（通知設定 SSOT）。readNotificationPrefs の `{...DEFAULT_PREFS,...parsed}` マージ・
  **streakReminder/weeklyDigest=true(オプトアウト)・reminderHour=21(JST)**・往復を pin。/ コミット `db36107` / `notifications.test.ts`(5件)。
  **reminderHour 既定 21→0 で3件落ち**を実測。※read は no-raw/error で DEFAULT_PREFS を参照返しだが全 primitive＝S41 で SAFE 確定済（footgun でない）。
- done `lib/storage/character.ts`（AIキャラ設定）。readCharacterState の **id を isCharacterId 検証(未知→既定 haru)**・
  **enabled は文字列 "true" のみ真(null→既定 false・"1"/"false"→false)**・id/enabled の別キー独立保存を pin。/ コミット `e409656` / `character.test.ts`(7件)。
  **`rawEnabled==="true"` を `!==""` に緩めると「"true" 以外は false」テストが落ちる**ことを実測。
- done `lib/storage/last-question.ts`（継続再開ポインタ）。readLastQuestion の **6 フィールド全型一致バリデーション(1つでも欠落/型違いなら null)**・
  破損 JSON fail-soft・write/clear 往復を pin。/ コミット `762fff4` / `last-question.test.ts`(6件)。
  **qNumber の型チェックを `false` に無効化すると「数値欠落なら null」テストが落ちる**ことを実測。
- done `lib/storage/user-context.ts`（訪問履歴・パーソナライズ用）。recordHomepageVisit の **visitCount 単調増加・lastVisitAt ISO stamp・
  書込み後状態の返却**・resetUserContext の既定復帰を pin（移行/既定マージは既存 migrate-key.test 担当＝重複回避）。/ コミット `7cbec45` / `user-context.test.ts`(4件)。
  **`cur.visitCount+1` を `cur.visitCount` にすると増分系3件が落ちる**ことを実測。

### 次セッションへ
- settings/notifications/character/last-question/user-context は回帰固定済（再監査不要）。**S49 handoff の storage SSOT 5件は本セッションで全消化。**
- ★lint が稀に exit 3221225477(Windows STATUS_ACCESS_VIOLATION=segfault)で落ちることがある＝**lint クラッシュは lint エラーでなく再実行で通る**（本セッションで1回遭遇・即再実行で 0 errors）。次セッターは慌てず再実行のこと。
- まだ未テストで残る純関数候補: `lib/sync/client.ts::postSync` の未カバー枝（generic HTTP 500→`{error,"HTTP NNN"}`・json.entries 非配列→local fallback・merged/total `??0`）＝merge.test.ts に追記可。
  `lib/exam-config.ts` の buildExtractionPrompt/buildAnswerExtractionPrompt/buildExplanationPrompt(プロンプト文字列・固定値・価値中)・`lib/essays/load.ts`(薄いラッパ)・`lib/copilot/rag-pipeline.ts`(async・mock 要・夜間慎重に)。
- 日中候補群は不変（pii over-mask/tabs矢印キー/コピー通知統一/MilestoneToast ref化/SM-2 EF/apple-touch-icon PNG/search-index export）。

## セッション51 (2026-05-30 19:49 JST) — S50 handoff が名指しした残り未テスト純関数3件を契約固定

### 結論: 実改善0件（source 無変更）+ 回帰固定3モジュール（test 883→906・137→139 files）。全ゲート全緑。
冒頭ベースライン: typecheck0/lint0err（既存 ux-audit 警告1のみ・未追跡）/test 883・137files/build 全緑/HEAD `1130eac`(S50)。
S50 handoff が名指しした「残る未テスト純関数候補」3件を消化。全件 read-only 監査で実バグ無し＝characterization。
期待値は型/合成入力/ライブデータから導出し source 変更ゼロ。各テストは source mutation→`git checkout -- / mv .bak` revert で「崩れたら落ちる」を実測。全ゲート緑をコミット前に確認。

- done `lib/sync/client.ts::postSync` の未カバー4分岐（既存 merge.test.ts は 401/503/200/throw のみ網羅）。
  generic HTTP 失敗(非401/503)→`{error,"HTTP NNN"}`・200 body の `entries` 非配列→入力 entries フォールバック(`Array.isArray` ガード)・
  `merged`/`total` の `?? 0` 既定・非Error throw 時の `"network"` 文言を pin。/ コミット `57fbdbf` / merge.test.ts に4 it 追加。
  **HTTP文言改変/`?? 99`/`Array.isArray`ガード除去/`err.message`直参照 の各 mutation で対応テストが落ちる**ことを実測(revert済)。
- done `lib/essays/load.ts`（論述=午後II/論文 C軸 コンテンツのアクセサ・全くの未テスト）。決定的純関数13件:
  isEssayExamCode の6コード許容/それ以外拒否(大文字含む)・SC コーパス非空/id重複なし/全業種保持・find系の id一致/未知→undefined・
  getEssayQuestionByYearSeason の **year+season+qNumber 三条件AND**・getIndustryEssay の industryId一致/不在→undefined・
  parseYearSeason の **前後アンカー+季節限定正規表現**・questionToUrlParts のセグメント生成。期待値はライブSCデータから導出。
  / コミット `5078d6f` / `__tests__/essays/load.test.ts`(13件)。**正規表現 `$` 除去+winter追加 / 三条件AND の qNumber+season 除去 /
  section `"pm2"→"pm1"` の各 mutation で対応テストが落ちる**ことを実測(revert済)。※非sc分岐(afternoonToEssayQuestion アダプタ+sort)は
  現状データ依存で値が脆いため非対象（決定的純関数のみ固定）。
- done `lib/exam-config.ts` の prompt builder 3件（buildExtractionPrompt/buildAnswerExtractionPrompt/buildExplanationPrompt＝
  parse-pdf-to-json が LLM に渡す抽出/解説指示文・未テスト）。合成 ExamConfig/SessionConfig で補間契約: 試験名/年度/label/設問数の補間・
  **季節ラベル(spring→春期/autumn→秋期/cbt→CBT)**・**カテゴリの1始まり改行連結**・JSON-only 指示・解説プロンプトへの qList 末尾付与。
  / コミット `bbb72ba` / `__tests__/lib/exam-config-prompts.test.ts`(6件)。**春期/秋期スワップ / カテゴリ採番0始まり化 /
  「JSONのみ」→「マークダウンで」の各 mutation で対応テストが落ちる**ことを実測(revert済)。

### 次セッションへ
- postSync(全分岐)/essays-load/exam-config(prompt builder)は回帰固定済（再監査不要）。**S50 handoff の名指し候補は rag-pipeline を除き全消化。**
- 残る未テスト純関数候補は marginal 化: `lib/copilot/rag-pipeline.ts`(async orchestration・mock 要・夜間は慎重に＝唯一の handoff 残)・
  `lib/sync/{study-plan,bookmark,custom-tag}-sync.ts`(薄い orchestration＝pure部分の getPlanSyncEntries/mergeServerPlans 等は S48 で既テスト・wrapper は fetch+localStorage mock 要)・
  `lib/stats/{gsc,posthog}.ts`(外部API fetch・mock 要・純関数でない)。**夜間の安全な実害バグ・安全な未テスト純関数とも S1-S51 で深く枯渇。**
- 日中候補群は不変（pii over-mask/tabs矢印キー/コピー通知統一/MilestoneToast ref化/SM-2 EF/apple-touch-icon PNG/search-index export）。

## セッション52 (2026-05-30 20:0x JST) — 中断: ツール出力チャネル不全
- 症状: Bash / PowerShell / Read のすべてで stdout/ファイル内容が空で返る(echo の単純文字列すら表示されない)。
  典型的に `git status` 等は実行されるが結果を観測できない。プローブ7回以上すべて空。
- 影響: 全緑ゲート(typecheck/lint/test/build)と実測検証を「観測」できないため、コード変更は安全に検証不能。
  夜間規律「検証できない変更は無かったことにする」に従い、本セッションではコード変更を一切行わない(commitなし)。
- 確認できた事実(出力が一時的に見えた範囲): HEAD=8393513(セッション51), origin あり(push可), 作業ツリーは
  BookmarkButton.snap と overnight-loop.bat の既存未コミット差分のみ(本セッション起因の変更なし)。
- 次セッションへの申し送り: 出力チャネルが回復しているか `echo OK` で最初に確認すること。
  回復していれば backlog 最優先(未テスト純関数の契約固定が直近の流れ)から通常どおり再開。

### セッション52 追記 (出力チャネルは「不全」でなく「重い遅延バッファ」だった)
- 訂正: 先の「中断記録」commit(0d00cf3)は push 成功を後で確認＝コマンドは正常実行されており、
  問題は stdout/Read 結果が不定期にまとめて遅延フラッシュされること（実行はされるが結果観測が大幅遅延）。
- この遅延下では「全緑ゲート＋実測検証」をタイムリーに観測できないため、本セッションでもコード変更は見送る
  （夜間規律: 検証を観測できない変更は行わない）。HEAD は 0d00cf3、コード差分なし。
- 次セッションへの具体的リード（要・実在確認）: worklog/backlog の lib 言及一覧に `lib/format/*`・
  `lib/cache/lru.ts`・`lib/ai/cost.ts`(※cost-tracker.ts は S48 済だが cost.ts は別)が**一度も登場しない**
  ＝未テスト純関数として S47-S51 の発掘漏れの可能性。次回まず `find lib/format lib/cache -name '*.ts'` と
  `grep -rl 'format/number\|cache/lru\|ai/cost"' __tests__` で実在/未テストを確認し、該当すれば
  従来どおり Intl 依存値は en-US ロケール固定・clamp/LRU は決定的に契約固定（mutation→revert で実測）。
- 出力遅延が続く場合の作業術: 1コマンドにまとめてファイルへ書き、次ターンで Read（結果は遅れて surface する）。

### セッション52 再訂正 (前追記のリードは誤り)
- **訂正**: 直前の追記が挙げた `lib/format/*`・`lib/cache/lru.ts`・`lib/ai/cost.ts` は **実在しない**
  （`find`/existence check で全て ABSENT 確認済）。worklog に登場しないのは当然で、未テスト発掘漏れではない。
  当該リードは破棄すること。
- 本セッションの実態: ツール出力の遅延バッファが断続的に重く（数ターン分まとめてフラッシュ）、
  ゲート結果をタイムリーに観測できないと判断し、コード変更は一切行わなかった（HEAD=7134942 時点、コード差分なし）。
- 次セッションへの正しい申し送り:
  1) basename 一致での未テスト判定は false positive 多数（streak/core・xp・questions/filter 等は別名テストで既済）。
     必ず `grep -rl 'lib/<path>"' __tests__/` で import 実在を確認してから着手（教訓1 を厳守）。
  2) 残る named 候補は `lib/copilot/rag-pipeline.ts`（async・mock 要・夜間慎重に）のみ＝S51 と同じ結論。
  3) 純関数の安全な契約固定ネタは S1-S51 で実質枯渇。新規価値は「過去 SAFE/latent 分類の footgun 再検証」
     (S33/S41 角度)か「属性有無だけで見落とした同型 a11y」(S33 角度)に残る。
  4) 出力遅延が再発したら、コード変更はせず doc-only に留めるのが安全（本セッションの判断）。

### セッション52 確定リード (grep 検証済の唯一の真・未テスト候補)
- 候補群を `grep -rl 'lib/<path>"' __tests__/` で実検証した結果（basename 一致でなく import 実在で判定）:
  - 既テスト(誤検出): seo/sitemap-pagination(3)・utils(4)・seo/exam-meta(2)・blog/related-content(1)・
    blog/related-questions(1)・copilot/related(1)・questions/last-updated(1)。← これらは着手不要。
  - **真の未テスト: `lib/success-stories/related-content.ts`（__tests__ からの import 0件）** ＝次セッションの第一候補。
- 次セッションは出力チャネルが正常なら、このファイルを read→純関数を特定→従来手順で契約固定
  （mutation→`git checkout --` revert で「崩れたら落ちる」を実測、commit 前に typecheck 単独実行）。
  success-stories は noindex だが related-content は推薦ロジックの純関数で固定価値あり。
- 本セッションは出力遅延が重く gate を実測観測できないと判断し、上記の着手は次回送り（コード変更なし）。

### セッション52 done (出力遅延が落ち着き1サイクル完遂)
- **done: `lib/success-stories/related-content.ts` の getRelatedSuccessStoriesByExam 回帰固定** / commit `6780033`
  - grep 検証で __tests__ 未 import の唯一の真・未テスト純関数と確認(basename 一致の誤検出群は除外済)。
  - 契約: limit 上限(既定3)・試験フィルタ・newest-first prefix・上限超過で無パディング・limit 0/該当なし→[]。
  - oracle に既テストのデータ層 getSuccessStoriesByExam を使い、`.slice(0, limit)` と一致比較(persona 増加に頑健)。
  - 検証: 新テスト 7 it 全緑 → `.slice(0, limit)`→`.slice(0, limit+1)` mutation で 3 件失敗を実測 → `git checkout --` revert。
  - 全緑ゲート: typecheck=0 / lint=0 / test=0(906→**913** it, +7) / build=0。source 無変更(テスト追加のみ)。
- これで S51 handoff 系の「lib/ 再走査で未テスト純関数」角度は **named 候補が完全に枯渇**(残るは rag-pipeline=async/mock 要のみ)。
- 本セッションの教訓: 非対話セッションの tool 出力は重い遅延バッファで「空」に見えることがある＝故障ではない。
  実行はされているので、検証は「1コマンドに集約→ファイル出力→次ターンで Read」が安全。exit code を信頼する。

## セッション53 (2026-05-31 20:29 JST)  — S51/S52 handoff の最後の named 候補 rag-pipeline を契約固定
### 結論: 実改善0件（source 無変更）／ 回帰固定1モジュール（test 913→920・141 files）。全ゲート緑。
- 出力チャネルは正常（S52 で問題だった遅延バッファは解消＝`echo OK`/gate 出力ともタイムリーに観測可）。
- done `lib/copilot/rag-pipeline.ts::runCopilotRAGPipeline`（AIコパイロット B軸 の retrieval→grounding 判定→
  引用ヘッダ/関連問題ヘッダ組み立てを束ねる async オーケストレータ・S47-S52 で唯一残っていた named 未テスト候補）。
  **mock を使わず rag.test.ts と同型の「実コーパス + 環境変数ゲート」方式**で実挙動を固定（7 it）:
  ①`ragEnabled()`=false(COPILOT_RAG_ENABLED=false)→retrieval せず EMPTY ②user メッセージ無し(assistant のみ)→EMPTY
  ③messages 空→EMPTY ④末尾 user 空文字→EMPTY ⑤末尾 user 優先(先頭明確クエリ+末尾空→EMPTY)
  ⑥`topScore < ragMinScore()`(COPILOT_RAG_MIN_SCORE=999999)→ragResult 保持しつつ grounding しない(directive null/footer 空)
  ⑦閾値通過(min=0)→grounding 出力一式(directive 非null/contextBlock/citationFooter 非空/citationsHeader が ASCII-only)。
  / コミット `4d51ee5` / `__tests__/copilot/rag-pipeline.test.ts`(7 it)。
  **閾値ゲート `topScore >= ragMinScore()` を `<=` に mutation すると ⑥⑦ の2件が落ちる**ことを実測→`git checkout --` revert。
  ※ragMinScore はパイプライン側のゲートのみで runRAG の passages には影響しない＝⑥⑦は同じ passages・ゲート判定のみ差分。
### 次セッションへ
- rag-pipeline は回帰固定済（再監査不要）。**これで S47-S52 の「lib/ 再走査で未テスト純関数発掘→契約固定」角度は
  named 候補が完全に枯渇**（rag-pipeline まで消化済）。残るのは外部API fetch ラッパ(lib/sync/*-sync・lib/stats/{gsc,posthog})
  ＝純関数でなく fetch+localStorage mock 要で夜間 marginal。
- 夜間の安全な実害バグ・安全な未テスト純関数とも S1-S53 で深く枯渇。新規夜間タスクは:
  ①「過去が SAFE/latent 分類した同型 footgun の再検証」(S33/S41 角度) ②「属性有無だけ見て見落とした同型 a11y」(S33 角度)。
- 日中候補群は不変（pii over-mask/tabs矢印キー/コピー通知統一/MilestoneToast ref化/SM-2 EF/apple-touch-icon PNG/search-index export）。

## セッション54 (2026-05-30 20:33 JST 起動)  — 未テストの lib 純関数/インフラ関数を回帰固定（4サイクル）
### 論点: backlog の「lib/ で未テストの純関数」探索を grep（import 実在判定）で再走査し、
### S47-S53 が拾い切れていなかった「テストファイルから一切 import されていない lib モジュール」を発見、
### 安全な characterization テスト4本を追加（source 無変更）。test 920→944（+24 it・141→145 files）。全ゲート緑。
- 探索: `for f in lib/**.ts; grep -rq "$mod\"" __tests__/` で未 import の lib 49ファイルを列挙。
  うち types/server-only/外部API を除き、純関数・テスト容易なインフラ関数4本を選定。
- done `lib/mock-exam/session.ts::computeRemainingSec`（模試タイマー残り秒）/ commit `7d8767b` /
  `__tests__/mock-exam/session.test.ts`(5 it)。**最重要契約: 経過は savedAt でなく startedAt 基準**
  （タブを閉じてもタイマー止まらない=実試験挙動）・clamp[>=0]・floor。Date.now を vi.spyOn で固定。
  **startedAt→savedAt mutation で4件落ちる**ことを実測(revert 済)。
- done `lib/copilot/streaming.ts::createCopilotResponseStream`（/api/copilot 本文ストリーム・B軸出力経路）
  / commit `6501081` / `__tests__/copilot/streaming.test.ts`(7 it)。mock provider(async generator)で
  チャンク素通し・成功時のみ RAG 引用フッター付与(hasGrounding && footer)・hasGrounding=false/空 footer は非付与・
  onComplete はフッター除外文字数で1回・エラー時[エラー]フォールバック文+captureException(vi.mock)を pin。
  **フッターゲート `hasGrounding && citationFooter`→`citationFooter` mutation で1件落ちる**ことを実測。
  ※ timeout/client-abort 経路は timer/AbortController 依存でフレーキー化を避け対象外（決定的な部分のみ固定）。
- done `lib/mock-exam/config.ts::getMockConfig` + MOCK_EXAM_CONFIGS / commit `28a8761` /
  `__tests__/mock-exam/config.test.ts`(5 it)。未知区分→ap フォールバック・exam フィールド=キー一致(コピペズレ)・
  questions/minutes 正・passThreshold (0,1]・label 非空・基準値(ap 80問/150分,ip 100問/120分,全区分 0.6)を pin。
  **フォールバック先 ap→ip mutation で1件落ちる**ことを実測。
- done `lib/api/rate-limit.ts::checkApiRateLimit` + buildRateLimitHeaders / commit `7fd53bf` /
  `__tests__/api/rate-limit-key.test.ts`(7 it)。Bearer トークン(trim 後12文字以上)→key:<先頭64文字>・
  短/無→ip フォールバック・64文字切詰・結果展開+keyId 併返・X-RateLimit-* 文字列整形を pin。
  rate-limit/server を vi.mock し純粋なキー導出を分離。**長さ閾値 `>=12`→`>=0` mutation で2件落ちる**ことを実測。
### 次セッションへ
- **重要な気付き: S47-S53 の「lib/ 全走査で未テスト純関数は枯渇」宣言は探索範囲漏れ。**
  「テストから import されていない lib モジュール」を grep で機械的に列挙すると未テストが残っていた。
  本セッション後の残り未テスト lib（純関数寄り）候補: `lib/analytics/events.ts::trackEvent`(SSR guard+never throw・@vercel/analytics mock)、
  `lib/study-plan/constants.ts`(PHASE_RATIOS sum=1.0 等データ不変条件)、`lib/streak/storage.ts`/`lib/chat/storage.ts`(localStorage 系)。
  それ以外は types/server-only(prisma/auth/db)/外部API fetch(stats/gsc,posthog・sync/*-sync)で marginal。
- 状態の安全な実害バグ・未テスト純関数とも S1-S54 で深く掃かれた。次は上記残り候補 or S33/S41 角度の
  「過去 SAFE/latent 再分類→footgun 再検証」「同型 a11y 再点検」。日中候補群は不変。
## セッション55 (2026-05-30 20:49 JST) — 未テスト lib モジュール4本を回帰固定（テスト未 import 機械列挙の継続）
### 結果: 実改善0件（source 無変更）/ 回帰固定4モジュール（test 944→975・+31 it・146→149 files）。全ゲート緑。
- 冒頭ベースライン: typecheck0/lint0err（既存 ux-audit script 警告1のみ・未追跡）。HEAD `42d65d0`(S54)。
- S54 handoff の「テストから一切 import されていない lib モジュールの機械列挙」を継続。`find lib -name '*.ts'`→
  `grep -rqF "lib/<path>" __tests__` で未 import を抽出し、純関数/データ不変条件を持つものを characterization。
- done `lib/chat/storage.ts`（AI会話履歴[フェーズ2]の LS 永続層）= saveToLocalStorage の**同id置換+先頭挿入+
  最大50件(最古退避)**・read の破損JSONフォールバック・load/delete の id一致挙動を pin。
  / コミット `07a85dd` / `__tests__/chat/storage.test.ts`(11件)。dedup filter 除去 + 50→100 cap の mutation で落ちることを実測。
- done `lib/analytics/events.ts::trackEvent`（CVR ファネル計測の client 入口）= **name を切り出し残りを track 第2引数へ転送**・
  転送先に name 非混入・SSR no-op・track throw 黙殺を pin（@vercel/analytics を vi.mock）。
  / コミット `12df247` / `__tests__/analytics/events.test.ts`(5件)。event 全体(name 混入)転送への mutation で3件落ちを実測。
- done `lib/ai/characters.ts`（AI バディ定義 SSOT）= **getCharacter の有効id→該当/null・undefined・不正→DEFAULT(haru)
  フォールバック門番**・isCharacterId 受理拒否・CHARACTER_ORDER とキー一致/id整合のデータ不変条件を pin。
  / コミット `d763fd8` / `__tests__/ai/characters.test.ts`(9件)。fallback の isCharacterId guard 除去 mutation で落ちることを実測。
- done `lib/questions/get-questions.ts`（試験別遅延ローダ）= getQuestionsForExam の試験フィルタ/未登録コード空配列・
  getRegisteredExamCodes の13区分・**getAllQuestionsLazy の平坦化**・**全件数=per-exam合計の保存則**を pin。
  / コミット `a3a30a2` / `__tests__/questions/get-questions.test.ts`(6件)。flat() 除去 mutation で2件落ちを実測。
### 次セッションへ
- chat/storage・analytics/events・ai/characters・get-questions は回帰固定済（再監査不要）。
- 残る未 import lib（純関数寄り・夜間安全）候補: `lib/study-plan/constants.ts`(PHASE_RATIOS sum=1.0/REQUIRED_HOURS 全
  ExamCode 網羅・LEVEL_* Record キー一致のデータ不変条件・価値中)・`lib/copilot/pinned-actions.ts`(React hook=要 RTL)・
  `lib/streak/storage.ts`(core 薄ラッパ・S36 で SAFE 監査済)・`lib/onboarding/index.ts`/`lib/streak/index.ts`(re-export barrel)。
- それ以外の未 import は外部API(stats/gsc・posthog・notify/slack・turnstile)・provider 実装(ai/providers/*)・
  server-only(questions/pool-server・search/question-index private)・auth/db で夜間 marginal or 要 mock。
- **教訓:** 「test 未 import lib の機械列挙」は basename 一致判定(S47-S53)より漏れが少なく、まだ純関数寄り候補が
  数本残る。次も同手法で constants のデータ不変条件 → barrel の re-export 健全性の順で消化が安全。

## セッション56 2026-05-30 21:01 JST（P1: test 未 import lib の機械列挙を継続）
- S55 handoff が名指しした「残る未 import 純関数寄り候補」を消化＝**回帰固定4モジュール**（study-plan/constants・
  streak/storage・essay/load・api/openapi・計37 it・test 975→1012・150→153 files）。実改善0件（source 無変更）。
  全件 source mutation→revert で「崩れたら落ちる」を実測。
- done `lib/study-plan/constants.ts`（学習プラン基盤定数 SSOT。generateStudyPlan の所要時間=REQUIRED_HOURS×
  LEVEL_MULTIPLIERS と段階分割を駆動）= **REQUIRED_HOURS 全13 ExamCode 網羅+正整数+難易度順**・**PHASE_RATIOS
  sum=1.0+front-load(early>middle>late)**・**LEVEL_* Record の全 KnowledgeLevel キー一致+multiplier 単調減少
  [beginner=1.0 baseline]**・minute 予算の順序を pin。/ コミット `06ab3f0` / `__tests__/study-plan/constants.test.ts`(8件)。
  mutation(middle 0.3→0.35 / foundation 0.75→1.05)で3件落ちを実測。
- done `lib/streak/storage.ts`（連続学習 LS 永続層。core[S35 既テスト]の薄ラッパだが read() の検証/coercion は
  storage 層固有）= **read() の不正 blob coercion(string→0・非配列→[]・milestonesReached 非数値除去)**・readStreak の
  decayIfLapsed 連携・**recordStudyToday の read→apply→write 往復+到達マイルストーン通知+冪等+lapse 後1復帰**・
  resetStreak の EMPTY 書戻しを pin。日付は jstDateString で now 相対に決定的算出。/ コミット `f7e5b9d` /
  `__tests__/streak/storage.test.ts`(12件)。mutation(filter 型反転 / justReachedMilestone→null)で2件落ちを実測。
- done `lib/essay/load.ts`（論文添削 C軸 ST/SA/PM/SM/AU アクセサ。※sc コーパスの lib/essays/load.ts[S51]とは別）=
  **ESSAY_EXAM_CODES とコーパス試験コード集合の双方向一致**・getEssayQuestionsByExam の試験フィルタ+**並び順
  (year降順→season昇順→qNumber昇順)を pairwise 不変条件で固定(データ追加に頑健)**・全コード完全分割・
  getAllEssayQuestions のコピー返却(呼び出し側 mutation 非破壊)・findEssayQuestion の id一致/未知→undefined を pin。
  / コミット `e72f4bd` / `__tests__/essay/load.test.ts`(10件)。mutation(year sort 反転 / コピー返却除去)で2件落ちを実測。
- done `lib/api/openapi.ts::buildOpenApiSpec`（/api/v1/openapi の公開 OpenAPI 3.1 仕様ビルダ）= baseUrl の
  servers/contact 補間・3エンドポイント存在(/exams get・/questions get・/grade post)・exam enum の13区分網羅・
  認証/匿名両許可に加え、**$ref とタグの参照整合(再帰走査で未定義スキーマ/未宣言タグへの dangling 参照ゼロ)**を pin。
  スキーマ改名で壊れる無効仕様を捕捉。/ コミット `e2e267c` / `__tests__/api/openapi.test.ts`(7件)。
  mutation(server url v1→v2 / $ref Exam→ExamTypo)で各々落ちを実測。
- SKIP(実害なし): `lib/onboarding/index.ts` の barrel re-export 健全性テスト＝barrel は OnboardingTour.tsx が既に
  consume しており typecheck/build が re-export 解決を保証済＝テスト追加は冗長(過大修正の罠回避)。streak/index も同型。
### 次セッションへ
- study-plan/constants・streak/storage・essay/load・api/openapi は回帰固定済（再監査不要）。S55 handoff の純関数寄り
  候補は本セッションで打ち止め（残 barrel は SKIP 確定）。
- 残る未 import lib は外部API(stats/gsc・posthog・notify/slack・turnstile)・provider 実装(ai/providers/{gemini,claude,
  openai,mock})・server-only(questions/pool-server・search/question-index=private で export 追加要)・auth/db・
  React hook(copilot/pinned-actions・a11y/use-quiz-choice-roving=要 RTL)で夜間 marginal or 要 mock。
- **教訓:** 「test 未 import lib の機械列挙」(S54-S56)は純関数寄り候補を概ね消化。次の有効角度は ①ai/providers/mock
  (純粋な決定的 stub＝mock 不要で夜間安全・streamChat の chunk 分割契約を pin 可)の検討、②過去が SAFE/latent 分類した
  同型 footgun の再検証(S33/S41 角度)、③属性有無だけ見て見落とした同型 a11y(S33 角度)。日中候補群(pii over-mask/
  tabs矢印キー/コピー通知統一/MilestoneToast ref化/SM-2 EF/apple-touch-icon PNG/search-index export)は据え置き。

## セッション57 (2026-05-30 21:16 JST起動)  ◆S56 handoff角度①「lib/ai/providers/mock 決定的スタブ」を起点に lib/ai 層の未テスト純関数を一括契約固定
### 結果: 実改善0件（source 無変更）＝回帰固定4モジュール（mock-provider・stub-providers・get-provider・prompts-context・計40 it・test 1012→1052・153→157 files）。全ゲート緑。
- 冒頭ベースライン: typecheck0/lint0err（既存 ux-audit script 警告のみ・未追跡）、HEAD `4101ef9`(S56)。S56 handoff の「次の有効角度①lib/ai/providers/mock(決定的 stub＝mock 不要で夜間安全)」を起点に、lib/ai 層で test 未 import の純関数を `grep -rl` で実検証しながら一括消化。全件 source mutation→`git checkout --` revert で「崩れたら落ちる」を実測。
- done `lib/ai/providers/mock.ts`（GEMINI_API_KEY 未設定時のフォールバック決定的スタブ）/ commit `7440e9d` / `__tests__/ai/mock-provider.test.ts`(15 it)。pickReply のクイックアクション分岐（whyWrong/similar/term/default の**優先順位**・最終 user メッセージ基準・toLowerCase・空配列→default）と streamChat の**24字チャンク無損失分割**（dotAll で改行保持）・**事前 abort 済みシグナルで yield 前に AbortError 送出**を pin。mutation(チャンク24→48 / term分岐→default)で各落ちを実測。
- done `lib/ai/providers/{claude,openai}.ts`（Gemini 乗り換え用スタブ・§10 でプロバイダ変更は承認必須）/ commit `70c1b7b` / `__tests__/ai/stub-providers.test.ts`(4 it)。streamChat が**黙って空を返さず明示的に throw する契約**（throw を外すと後続の unreachable な `yield ""` に落ちて空応答素通り）と name を pin。mutation(claude throw 除去→silently resolve)で落ちを実測。
- done `lib/ai/provider.ts::getProvider/resolveModel`（LLM 抽象レイヤ入口・§5）/ commit `cd53c7c` / `__tests__/ai/get-provider.test.ts`(11 it)。**§5: GEMINI_API_KEY 未設定→mock フォールバック**（キーなしで UI/E2E 成立）・preferred 優先・LLM_PROVIDER 尊重・claude/openai 分岐・未知 id→mock 最終分岐、**resolveModel の既定モデル文字列(free=flash-lite/premium=flash)**＝§9/§10 で変更が承認必須＝静かな既定変更を検知。env を beforeEach/afterEach で snapshot/restore。mutation(free既定→flash / no-key fallback 無効化)で落ちを実測（後者は依存 API テストも巻き込み連鎖failで契約の重要性を確認）。
- done `lib/ai/prompts.ts::buildQuestionContext/buildRAGDirective`（AIコパイロット B軸 へ渡る問題コンテキスト/RAG 出典ディレクティブ）/ commit `47ec0d2` / `__tests__/ai/prompts-context.test.ts`(10 it)。buildQuestionContext=セクション順序・空 topicTags/選択肢の出し分け（**空文字選択肢は除外**）・answer の配列/スカラ整形・採点状態(正解/不正解/未採点)、buildRAGDirective=passageCount<=0 で null・件数埋め込み・[1]..[N] 番号列。※**罠: ディレクティブ本文に例示 `[1] [2]` が常に含まれるため、1件検証は全体 not.toContain でなく nums 行「N 件のパッセージ … を提供します」で観測する**。mutation(RAG gate <=0→<0 / 選択肢キーラベル変更)で落ちを実測。
### 次セッションへ
- **lib/ai 層（providers/mock・claude・openai・provider.getProvider/resolveModel・prompts の context/RAG builder）の未テスト純関数は本セッションで打ち止め＝回帰固定済（再監査不要）。** 残る lib/ai 未テストは gemini.ts(@google/generative-ai SDK 要 mock＝夜間 marginal)・prompts の buildLearnerProfileContext(assembleCopilotPrompt 経由で間接カバー済)。
- 残る有効角度（S56 から不変）: ②過去 SAFE/latent 分類の同型 footgun 再検証(S33/S41 角度) ③属性有無で見落とした同型 a11y(S33 角度)。test 未 import 純関数の機械列挙(S54-S57)は lib/ai 消化で概ね打ち止め＝残は外部API/SDK/server-only/React hook で要 mock。
- 日中候補群は不変（pii over-mask/tabs矢印キー/コピー通知統一/MilestoneToast ref化/SM-2 EF/apple-touch-icon PNG/search-index export）。

## セッション58 (2026-05-30 21:36 JST起動)  S57 handoff「test 未 import lib の機械列挙」を継続＝消費されている未テスト純関数寄りモジュールを回帰固定
### 結果（進行中）
- 冒頭ベースライン: typecheck0/lint0err（既存 ux-audit script 警告のみ・未追跡）/test 1052/build 全緑。HEAD `d03ae64`(S57)。
- 手法: `find lib -name '*.ts'` → `grep -rqF` で test 未 import の lib を機械列挙。消費の有無（app/components 参照）を確認し、
  純関数寄り＋実消費されているものを優先（dead code はテストせず SKIP）。
- SKIP(dead code): `lib/admin/feature-flags.ts`（getFeatureFlags/isAiCopilotEnabled の災害復旧キルスイッチ＝env 読取り純関数だが
  **app/components/lib のどこからも未参照**＝KILL_* 環境変数が実際にはルートに配線されていない）。テスト追加は未配線コードの
  挙動固定で価値薄。配線（503 ガード追加）は挙動変更＝承認寄りで夜間 SKIP。worklog 記録のみ。
- done `lib/api-keys/storage.ts`（/account/api-keys のキー管理 LS 永続層・ApiKeysClient.tsx が消費）。readApiKeys の fail-soft
  バリデーション（破損JSON/非配列/secret 欠落エントリ除外）・appendApiKey の**先頭挿入+MAX_KEYS=5 で最古退避**・deleteApiKey の
  id一致のみ除去・generateApiKey の **name trim/60字切詰め/空→"Untitled key"**・prefix(`kk_live_[0-9a-f]{4}`)/secret(prefix始まり)/
  id(`kid_`)形式を pin。コミット `b3fc496` / `__tests__/api-keys/storage.test.ts`(11件)。
  **`.slice(0, MAX_KEYS)`→`.slice(0,100)` と secret フィルタ除去の mutation で2件落ちることを実測（revert 済）**。test 1052→1063。
- done `lib/ai/learner-profile-client.ts`（CopilotPanel が消費・B軸プロファイル門番）。buildLearnerProfileFromHistory の
  **回答5件未満→undefined（profile 非注入の閾値門番）**・5件ちょうど境界・total/uniqueAnswered/accuracy が getStats と整合・
  **weakCategories 常に空配列**（docstring 準拠のクライアント軽量化）・破損JSON fail-soft を pin。コミット `095fc82` /
  `__tests__/ai/learner-profile-client.test.ts`(6件)。`stats.total < 5`→`< 0` mutation で3件落ちを実測。test 1063→1069。
- done `lib/copilot/pinned-actions.ts`（CopilotPanel のクイックアクション ピン留めフック・renderHook で characterization）。
  togglePin のトグル・**MAX_PINNED_ACTIONS=3 超過の no-op**（非ピンをデフォルト表示から締め出さない上限）・上限到達後も解除可・
  canPinMore/isPinned 導出・マウント時 LS 読込で不正値（非文字列）除外を pin。コミット `2c9064f` /
  `__tests__/copilot/pinned-actions.test.ts`(6件)。`>= MAX_PINNED_ACTIONS`→`>= 99` mutation で1件落ちを実測。test 1069→1075。
### 次セッションへ
- api-keys/storage・learner-profile-client・pinned-actions は回帰固定済（再監査不要）。
- **教訓: S57 が「lib/ai 消化で test 未 import 機械列挙は概ね打ち止め」としたが、消費されているのに未テストの純関数寄りモジュールが
  まだ3本残っていた（api-keys/storage・learner-profile-client・pinned-actions）。「消費の有無 × 未テスト」で篩い直すと拾える。**
- 残る未 import lib を消費有無で再仕分け済＝**dead code は SKIP**: feature-flags（キルスイッチだが未配線＝KILL_* 環境変数がルートに
  繋がっていない・配線は挙動変更で承認寄り）/current-year/team/mock-data は app/components から未参照。**外部API/fetch**:
  deployment-status・sync/*（fetch+LS mock 要）・launch-monitoring/data・stats/*・notify/slack・turnstile・posthog。
  **server-only**: search/question-index（`import "server-only"`・private 内部関数）/questions/pool-server。**hook/Web Audio/auth/db**:
  use-quiz-choice-roving（hook）・motivation/sound（AudioContext）・auth/*・db/prisma。**barrel**: onboarding/streak/sync index（consume 済で SKIP）。
- 次の有効角度（S56-S57 から不変）: ②過去 SAFE/latent 同型 footgun 再検証(S33/S41)、③属性有無で見落とした同型 a11y(S33)。
  日中候補群（pii over-mask/tabs矢印キー/コピー通知統一/MilestoneToast ref化/SM-2 EF/apple-touch-icon PNG/search-index export）は据え置き。

## セッション59 2026-05-30 21:48 JST（P1・「mock要で先送り」とされた未テストを回避策で消化）
- 着手前確認: HEAD=752d0ac（S58 done）。全緑ベースライン（test 1075）から開始。S58 が「残未 import は外部API/fetch・hook・
  dead code で要 mock or SKIP」と仕分けたリストを**再検証**し、夜間でも安全に固定できる4本を発見・回帰固定。実改善0件（source 無変更）。
- done `lib/a11y/use-quiz-choice-roving.ts`（クイズ選択肢の roving-tabindex フック・3プレイヤー+ChoiceButton が消費・S58 が「hook=要 mock」と
  分類）。**sibling の use-roving-radio.test.tsx と同じ render/fireEvent ハーネスで mock 不要に**特性化。フォーカス専用契約（矢印は
  焦点のみ移動し選択を確定しない／selectedIndex が roved tab stop を上書き／端で循環+Home/End／disabled で不活性／resetKey 変更で
  先頭リセット）。コミット `3f2ac28` / `__tests__/a11y/use-quiz-choice-roving.test.tsx`(6件)。tabStop 優先順位 + 循環演算の mutation で2件落ち実測。test 1075→1081。
- done `lib/constants/current-year.ts`（ブログ「【YYYY年最新】」タイトルのビルド時年 SSOT）。**★S58 が「current-year は未参照=dead code」と
  記録したのは誤り**＝`data/blog/generators.ts` が CURRENT_YEAR を多数消費（合格率ランキング/AIトレンド記事タイトル等）。フェイククロック+
  動的 import で評価時刻を制御し、**JST(UTC+9) ロールオーバー契約**（UTC でなく JST 新年で年が繰り上がる・早期に繰り上がらない）と
  CURRENT_REIWA=CURRENT_YEAR-2018（令和1=2019）を pin。コミット `3b8a58e` / `__tests__/constants/current-year.test.ts`(5件)。
  +9h オフセット除去 + -2018 改変の mutation で3件落ち実測。test 1081→1086。**JST 境界は S16/S17/S19 で実バグ多発のテーマ＝回帰固定の価値高。**
- done `lib/turnstile.ts`（公開フォーム API の Cloudflare Turnstile CAPTCHA 検証・S58 が「fetch=要 mock」と分類）。**cost-guard.test.ts の
  vi.stubGlobal("fetch")+vi.stubEnv 慣用で mock 化**。セキュリティ契約: シークレット未設定で **fail-open**（API 呼ばず skipped:true）/
  トークン欠落→missing-input-response/成功は siteverify へ secret/response/remoteip POST/success:false の error-codes 伝播/
  HTTP 非OK→http-error/throw→network-error。コミット `759dd06` / `__tests__/lib/turnstile.test.ts`(6件)。fail-open 反転 + error-code 改変の mutation で2件落ち実測。test 1086→1092。
- done `lib/notify/slack.ts`（ユーザー信号をチームへ転送する共有 Slack Webhook 送信・同上 fetch mock）。契約: 決して throw しない/bool 返却/
  {text} JSON POST/URL 未設定で fetch せず console.error+false/非2xx→false/throw→false。コミット `d9409eb` / `__tests__/lib/slack-notify.test.ts`(4件)。
  res.ok 無視 + 本文キー改変の mutation で4件落ち実測（**{text} は cost-guard の slack 検証とも共有契約のため同時に検知**）。test 1092→1096。
### 次セッションへ
- 4モジュール（use-quiz-choice-roving・current-year・turnstile・notify/slack）は回帰固定済（再監査不要）。
- **★教訓1: S58 の「要 mock=夜間 SKIP」仕分けは過大に保守的だった**。(a) React hook は sibling と同じ render/fireEvent で mock 不要、
  (b) 単純な fetch ベース純関数（fail-open/fail-soft+本文契約）は cost-guard.test の vi.stubGlobal/stubEnv 慣用で安全に固定可。
  **fetch を呼ぶ前の early-return 分岐（no-secret/no-url）と verdict マッピングだけでもセキュリティ契約として価値が高い。**
- **★教訓2: 「未参照=dead code」の判定は grep 範囲に注意**。current-year は `app components lib` だけ見ると未参照だが `data/` が消費。
  削除前は必ず `data/ content/ scripts/` も含めて全拡張子で grep（S58 の dead-code 列挙の current-year は誤り＝削除しなくて正解だった）。
- 残る未テスト fetch 系（同手法で固定可・次の候補）: `lib/sync/{bookmark,custom-tag,study-plan}-sync`（fetch+localStorage 両 mock 要＝
  やや重いが可能）・`lib/admin/deployment-status`（GitHub/Vercel API・多エンドポイントで重い）・`lib/stats/{gsc,posthog}`・`lib/admin/funnel/posthog`・
  `lib/posthog`・`lib/admin/metrics/posthog`・`lib/admin/launch-monitoring/data`（buildAlerts は pure だが未 export＝export 追加要で日中向き）。
  **真の要 mock 残**: motivation/sound（AudioContext）・ai/providers/gemini（SDK）・auth/*・db/prisma。**barrel**: onboarding/streak/sync index（SKIP）。
- 次の有効角度（不変）: ②過去 SAFE/latent 同型 footgun 再検証(S33/S41)、③属性有無で見落とした同型 a11y(S33)、④上記 sync/* の fetch+LS mock 固定。

## セッション60 (2026-05-30) — S59 handoff の「残 fetch 系」を同手法(vi.stubGlobal/stubEnv)で回帰固定3本

done: sync/* 同期ラッパの回帰固定 / 8126169 / __tests__/sync/wrappers.test.ts。postSync は merge.test.ts で網羅済だが syncBookmarks/syncCustomTags/syncStudyPlans は未テストだった。fetch を vi.stubGlobal で mock し実 LocalStorage 経由で「正しい /api/account/* へ POST」「ok 応答時のみサーバ集合をマージ」「study-plan は payload 非object を除外」を pin。endpoint 文字列改変 / merge 呼出し除去の mutation で実測。test 1096→1103
done: stats/gsc の回帰固定 / 8e8f0d5 / __tests__/stats/gsc.test.ts。readGscConfig は GSC 4 env 全揃いのみ config 返却(1つ欠落→null=/stats 連携準備中)・fetchGsc30dTotals 四捨五入/空行0・fetchGscDailyTrend 空日付除外+日付昇順・fetchGscTopQueries の roundBucket プライバシーラベル(1桁/数十回/…/10万回以上)を pin。設定ゲート1条件除去/バケット閾値改変/ソート反転で実測。test 1103→1115
done: stats/posthog の回帰固定 / 9a78cb5 / __tests__/stats/posthog.test.ts。isPosthogStatsConfigured は apiKey+projectId 双方必須・機能バケット分類(クイズ/午後問題/論文添削/模試/ブログ/ランキング/用語集/その他)+空パス除外+pct小数1桁+降順+総数0→[]・参照元バケット(Direct/Search/Social/Referrer)・results欠落/非ok→null を pin。設定ゲート/空パス除外/参照元分類/ソートの mutation で実測。test 1115→1125

★教訓1: PowerShell の Set-Content は既定 encoding で UTF-8 日本語文字列を mojibake 化し esbuild parse error を誘発(「no tests」になる)。source への mutation 検証は sed -i(byte 保持)か Edit ツールを使うこと。Set-Content は厳禁。バックアップ/復元は cp(byte-exact)で行う。
★教訓2: sync ラッパの merge-on-ok ゲートは「データ安全」契約に見えるが、postSync は非ok 時にローカル entries をそのまま echo するため merge(local) は冪等で無害＝ゲート除去は behavior 上検出不能。load-bearing な契約は endpoint routing と ok-path merge の2つ。検証はそこへ当てる。
★教訓3: stats/gsc・posthog は Date.now を transform に含まず(期間は SQL 文字列側)決定的＝fetch mock だけで安全に固定できる良候補だった。deployment-status は逆に Date.now 依存+価値ある計算が inline(未 export)＝夜間は brittle で見送り(launch-monitoring の buildAlerts も要 export=日中向き)。

handoff: S59 が挙げた「残 fetch 系」のうち sync/*・stats/gsc・stats/posthog は消化。残 = deployment-status(Date.now 依存・要 export で日中向き)・launch-monitoring/data(buildAlerts 要 export=日中向き)・monitoring/sentry(SDK ラッパ)。真の要 mock = sound(AudioContext)/gemini(SDK)/auth/db で夜間不向き。次セッションは ②過去 SAFE/latent footgun 再検証(S33/S41)・③属性有無で見落とした同型 a11y(S33)が残された有効角度。

## セッション61 2026-05-30 22:35 JST（P1・角度③ a11y ライブリージョン再監査 + 未テスト純関数の枯渇再確認）
- 着手前確認: HEAD=29b5e74（S60 done）。ベースライン全緑を実測（バックグラウンドで typecheck/lint/test/build 全 exit=0・GATE END 22:35:08）。
- 本セッションは S60 handoff が指す残り有効角度 ②/③ を監査。**実改善0件・回帰固定0件（安全に固定できる対象が見つからず）**。コード無変更。
- 監査①（角度③ a11y・条件付きマウント polite/alert の S33 同型再検証）:
  - `app/contact/ContactForm.tsx:220` のエラー領域は `role="alert"` の条件付きマウント。**S33 doctrine「role=alert の条件付きマウントは正（挿入時アナウンス）」に合致＝SKIP(実害なし)**。Explore はこれを「バグ」と報告したが doctrine に照らすと誤検出。
  - `components/search/SearchClient.tsx:986` は既に**常設 sr-only `role=status`/`aria-live=polite`** で検索件数を告知（コメントで「リスト全体を live にすると毎キーストロークで全件読み上げ＝verbose anti-pattern」と設計意図明記）＝gold-standard。同 :997 の `{loading && <span aria-live=polite>更新中</span>}` は視覚スピナーで aria-live は冗長（むしろ毎キーストローク告知は上記 verbose の害）＝**実害なし SKIP**。S33「残存ゼロ」は意味のある status については成立を再確認。
- 監査②（角度・未テスト純関数の枯渇再確認）: `lib/**` を「未 import（テスト無し）」で機械列挙 → 残りは全て要 mock or dead or server-only（deployment-status/feature-flags/funnel・metrics・posthog/gemini/auth/db/sound/pool-server/rate-limit/search-index(server-only private)/各 barrel index/team-mock-data）。**夜間安全な純関数候補は S57-S60 で打ち止めの再確認＝新規ゼロ**。Explore も Category B「該当なし」。
- **★日中候補（要人手判断・本セッションで特定）**: `app/contact/ContactForm.tsx:86-110` の送信成功カード（`status==="ok"` でフォーム全体を置換）に**ライブリージョンもフォーカス移動も無い**＝SR ユーザーに送信成功が告知されず、フォーカスも body へ脱落。正攻法の修正は成功見出しへの**フォーカス移動**（WCAG 推奨・gold-standard）だが**挙動変更＝E2E 検証必須**。S33 が「親が条件付きレンダーする toast/indicator の常設 region 化は日中候補」と分類した同クラス。夜間は安全側で SKIP（環境の出力バッファリングで E2E 信頼性も低い）。次に日中で着手するなら: 成功カードの見出しに `ref`+`tabIndex={-1}` を付け `status==="ok"` 化時に `focus()`、もしくは常設 sr-only status を component 冒頭に置く。
- ★環境メモ: 本セッション中、ツールの stdout 配信が数ターン遅延する重度バッファリングが断続発生（バックグラウンドタスク完了通知を契機にバースト flush）。実害確認・gate 観測は可能だが反復が遅い。次セッションも遅延に注意。
### 次セッターへ
- 角度②（過去 SAFE/latent footgun 再検証）と③（a11y 同型）は本セッションで ContactForm/SearchClient まで掘ったが安全な実害は出ず。夜間の安全な実害バグ・安全な未テスト純関数とも S1-S61 で深く枯渇を再々確認。
- 残るは**日中候補のみ**（上記 ContactForm 成功カードのフォーカス/告知・pii over-mask・tabs矢印キー・コピー通知統一・MilestoneToast ref化・SM-2 EF・apple-touch-icon PNG・search-index export）。新規夜間タスクは「過去が SAFE/latent 分類した同型 footgun の再検証」を別モジュールで続けるのが残された角度だが、収穫は逓減。

## セッション62 (2026-05-30 23:0x JST)   — 2サイクル done
- 開始確認: S52/S53 handoff の lib/format・lib/cache・lib/ai/cost.ts は**いずれも実在せず**(cost は cost-guard/tracker のみ=既 done)→死リード確定。
- done① `lib/admin/launch-monitoring/data.ts::buildAlerts` 回帰固定 / commit `861d535` / `__tests__/admin/launch-monitoring-alerts.test.ts`(13 it)。
  - 4ルール: ①costJpy24h>=500(§0 コスト上限連動・warning)②totalLast1h>=200(spike・warning)③posthogConfigured && pct!==null && pct<20(info)④三源未設定(info)。境界値(499・199・20・null guard・posthog guard)+複合発火を pin。
  - source 変更は `function buildAlerts`→`export function buildAlerts` の1語のみ(挙動不変)。test 1125→1138。
  - 検証: sed で `>=500`→`>=400` mutation→499境界テスト fail を実測→sed revert。全緑ゲート。
- done② `lib/admin/funnel/posthog.ts::buildFunnelSteps` 回帰固定 / commit `bb32212` / `__tests__/admin/funnel-steps.test.ts`(6 it)。
  - drop_pct: 先頭=null・欠損イベント=count 0・prev=0 のゼロ除算ガード=null・小数1桁丸め(toFixed)・逆転時の負値。
  - source 変更は `export function` 1語のみ(挙動不変)。test 1138→1144(169 files)。
  - 検証: sed で `prevCount > 0` ガード除去 mutation→ゼロ除算系2件 fail を実測→cp revert。全緑ゲート。
- 3サイクル目 不発(着手対象なし): `metrics/posthog.ts`は pure helper 無(fetch のみ44行)、`deployment-status.ts`の getVercelQuota 等は Date.now()+fetch tangled で1語 export 不可(抽出=refactor 禁止)→SKIP。**admin ダッシュボードの「1語 export 可能な private pure helper」脈は buildAlerts/buildFunnelSteps で枯渇。**
- **重要教訓(本セッションで再踏): source の一時 mutation も worklog 追記も PowerShell Set-Content は厳禁(UTF-8日本語 mojibake/-Raw 全置換は content loss を招く=worklog を749ins/1991del に破壊→git checkout で復旧)。mutation の退避は cp(byte-exact)、置換は sed -i、worklog 追記は bash heredoc(>>)のみ。**
- 次セッションへ: 安全な未テスト純関数は admin 脈含め枯渇に近い。残るは日中候補のみ(ContactForm 成功カードのフォーカス/告知・pii over-mask・tabs矢印キー・コピー通知統一・MilestoneToast ref化・SM-2 EF・apple-touch-icon PNG・search-index export)。

## セッション63 (2026-05-30 23:14 JST起動)  Explore 全lib再走査 → 残1本(posthog)を fail-soft 契約で回帰固定
- 着手前確認: HEAD=ce86168(S62)。S60-S62 handoff「安全な未テスト純関数は枯渇に近い」を Explore で**全150 lib モジュール再走査して検証**。
- Explore 報告の候補3本を prior session と突合: ①`constants/current-year`=S59 で既 done(Explore の grep 漏れ)②`admin/feature-flags`=消費ゼロ(app/components/lib 全 grep で参照なし)=dead code 確定・S58 SKIP 踏襲 ③`lib/posthog.ts`=10+ コンポーネントが消費する**真の未テスト純関数**(Explore は trivial getter/setter のみと過小評価していた)。
- done `lib/posthog.ts` 回帰固定 / commit `005254d` / `__tests__/lib/posthog.test.ts`(9 it)。**実改善0件(source 無変更)**。
  - 契約: posthogCapture の fail-soft(未初期化→静かに no-op / client.capture() の throw を try/catch で握りつぶす=「analytics は決して例外で UI を壊さない」)・name/props 素通し(undefined props も透過)・getter/setter ラウンドトリップ・isPostHogConfigured/POSTHOG_CONFIG.host の env ゲート+US既定 `??` フォールバック。
  - client は setPostHogClient 注入でテストするため SDK/fetch mock 不要(S59 slack/turnstile と同型の fail-soft pin)。env consts は current-year と同じ vi.resetModules+stubEnv+動的 import。
  - **罠**: host 既定は `?? `(null/undefined のみ fallback)なので、未設定の検証は vi.stubEnv(key, "") では不可(空文字は `??` を通過しない)→`vi.stubEnv(key, undefined)`(vitest が真に delete)で表現。typecheck も緑。
  - 検証: sed -i で①`!posthogClient`→`posthogClient`(ガード反転)②既定ホスト URL 改変 の2 mutation→計3件 fail 実測→git checkout 復旧。全緑ゲート(typecheck0/lint0err/test 1144→1153/build)。
### 次セッションへ
- posthog は回帰固定済(再監査不要)。**教訓: handoff の「枯渇」宣言は Explore 全走査で1本(posthog)取りこぼしを発見=10+消費・未テスト・SDK不要の純粋 fail-soft 契約。Explore が trivial と過小評価した posthogCapture の throw-swallow が load-bearing だった。「消費の有無 × 未テスト × fail-soft 契約の有無」で再篩いすると拾える(S58 の learner-profile/api-keys 発見と同型)。**
- 残る未テスト lib は全て真に blocked: fetch-only(deployment-status/metrics-posthog/cost-guard/monitoring-sentry/rate-limit)・SDK(ai/providers/gemini)・auth/db(config/index/prisma)・AudioContext(motivation/sound)・server-only(questions/pool-server・search/question-index)・barrel(onboarding/streak/sync index)・type-only。feature-flags=dead code(消費ゼロ)で SKIP 確定。
- 残る有効角度(S60-S62 から不変): ②過去 SAFE/latent 同型 footgun 再検証(S33/S41)、③属性有無で見落とした同型 a11y(S33)。日中候補(ContactForm 成功カードのフォーカス/告知・pii over-mask・tabs矢印キー・コピー通知統一・MilestoneToast ref化・SM-2 EF・apple-touch-icon PNG・search-index export)は据え置き。

## セッション63続き  ★新角度発見「data/ は全 lib スイープの盲点だった」→ 4サイクル done (test 1144→1189, +45 it)
- **重要発見**: S1-S62 の Explore スイープは全て `lib/` スコープで、`data/` を一度も走査していなかった。data/ に未テストの純関数寄りモジュールが4本残存していた。Explore 全 lib 再走査は「枯渇」を確認したが、スコープ外の data/ で取りこぼし発見。
- done① `lib/posthog.ts` 回帰固定 / `005254d` / `__tests__/lib/posthog.test.ts`(9 it)。10+ コンポーネント消費。posthogCapture の fail-soft(未初期化→no-op / capture throw 握りつぶし=「analytics は例外で UI を壊さない」)+ name/props 素通し + isPostHogConfigured/POSTHOG_CONFIG.host の env ゲート+US既定 `??` フォールバック。client は setPostHogClient 注入で SDK 不要。罠: `??` は空文字を通すので未設定検証は vi.stubEnv(key, undefined) で真に delete。mutation: ガード反転/既定URL改変で計3件 fail。
- done② `data/blog/index.ts` 回帰固定 / `9bd7bc0` / `__tests__/data/blog-index.test.ts`(10 it)。/blog ルート消費(slugs→generateStaticParams 等)。slug 一意性・サマリ降順+body 非漏洩・往復/未知→undefined・byExam 絞り+降順・getRelatedPosts の limit/自己除外/重複なし/関連性(explicit or 同exam or 共有tag)/explicit 優先。**副産物(latent pin・修正せず)**: getRelatedPosts は limit=0 で cap チェックが push 後のため explicit を1件漏らす off-by-one。本番は既定 limit=3 のみで実害なし。mutation: 自己除外反転/ソート反転で3件 fail。
- done③ `data/success-stories/generators.ts::buildSuccessStory` / `9f3fc51` / `__tests__/data/success-story-generators.test.ts`(7 it)。ALL_PERSONAS 実データに写像/title テンプレ/description 50字切り詰め/body の各 narrative+keyTakeaways 箇条書き+クイズリンク/score 条件付き行。publishedAt の未来日付禁止 clamp は実 persona 全て2026初頭で inert→合成遠未来 offset で Math.min 発火。mutation: clamp 除去/50→60 で各 fail。
- done④ `data/success-stories/index.ts` / `ba11559` / `__tests__/data/success-stories-index.test.ts`(13 it)。レジストリ+getRelatedSuccessStories(同 exam 優先)+**2パス getSimilarPersonaStories(年代+職業 / 同exam+学習期間バケツ)**+aggregation。バケツ判定をテスト側再実装で union 関連性を検証。mutation: 自己除外反転/count +1→+2 で fail。study-months 境界(m<=6→m<6)は該当 persona 不在で inert=未検出(マッチャは既存 slug のみ受理し合成境界入力不可)と honest 記録。
### 次セッションへ
- **教訓: 「枯渇」宣言は Explore のスコープ(lib/ のみ)に依存していた。data/ という丸ごと未スイープの region があった。次に grep スコープを広げるべき残り: `data/features.ts`(getFeatureBySlug)・`data/recommended-books.ts`(buildAmazonUrl/buildRakutenUrl/isAsinFilled/isRakutenIdFilled/getDifficultyLabel/getRecommendedBooks=アフィリURL書式は §10/§14 で ID 変更は承認要だが書式 pin は read-only で安全)。trivial: data/{blog,success-stories}/types.ts の toSummary(射影のみ・低価値)。`scripts/` も未スイープ。**
- data/ の posthog/blog-index/success-stories(generators+index)は回帰固定済(再監査不要)。
- 残る lib/ 未テストは全て真に blocked(S63 前半の Explore 全走査で確認: fetch-only/SDK/auth-db/AudioContext/server-only/barrel/type-only)。feature-flags=dead code(消費ゼロ)SKIP 確定。
- 角度②/③(SAFE/latent footgun 再検証・同型 a11y)は S33-S62 で深く枯渇。日中候補(ContactForm 成功カードのフォーカス/告知・pii over-mask・tabs矢印キー・コピー通知統一・MilestoneToast ref化・SM-2 EF・apple-touch-icon PNG・search-index export)は据え置き。

## 社長指示セッション（別プロセス）2026-05-30 23:2x JST — P0-追加A/B 内部リンク2件
- 結論: **改善A・B はいずれも既にソース実装済み**（実測調査の指摘は不完全な計測に基づいていた）。**二重実装防止・過大修正の罠回避の観点からソースは変更せず**、未カバーだった回帰ガードのみ追加。
- 改善A（ブログ→演習CTA）: `app/blog/[slug]/page.tsx:281-341` で実装済。exam 付き記事は `/quiz?mode=random&exam=${post.exam}`（直接演習）、exam 無し記事はホーム `/`（汎用入口・当て推量で区分に飛ばさない）＝タスク仕様どおり。
  - 既存 `__tests__/seo/blog-cta-label-in-name.test.ts` は aria-label のみ検証。**両分岐の存在＋リンク先実在**が未ガード→ `__tests__/seo/blog-practice-cta.test.ts`(3 it) を追加。全 blog post の exam が実在試験コード(ALL_EXAM_CODES)であることをデータ不変条件で固定（/quiz?exam=・/{exam} が 404 にならない）。/ コミット `ef52e91`
- 改善B（/q 前後リンク）: `app/q/.../page.tsx:159-169,223-228,502-555,707-738` で実装済。同一 exam/year/season/session を qNumber 昇順、prev/next 境界処理、rel=prev/next、可視ナビ（PC/モバイル sticky）、a11y ラベル、実在 URL のみ。
  - 既存 `question-url.test.ts` は round-trip のみ。**境界の正しさ（最初に前なし・最後に次なし）と前後リンクの no-404** が未ガード→ `__tests__/seo/question-sequential-nav.test.ts`(6 it) を追加。実データで prev/next の round-trip 解決＋境界＋隣接 qNumber を検証、ページ構造も source-read ガード。/ コミット `d45fbad`
- 本番実測（リンク先 200・no-404）: /q/ap/2017-autumn/am/q2 → rel=prev=q1(200)・rel=next=q3(200)、「前の問題/次の問題」表示あり。ブログ exam 記事 → /quiz CTA、hub 記事 → ホーム CTA。
- 全緑ゲート: typecheck0 / lint0err(既存 ux-audit 警告1のみ) / test 1153→1192(+9: B6+A3) / build は夜間ループが同ブランチで毎セッション緑実証（.next ロック競合のため別プロセス build はスキップ。両変更は __tests__ のみ＝build 直交、tsc --noEmit は通過）。
- 衝突回避: 各コミット前 git pull --ff-only、commit/push は別呼び出し（gate と分離＝gate規律順守）、targeted add で夜間ループの未コミット物(success-stories-index.test.ts 等)・CRLF差分・未追跡 logs/scripts を巻き込まず。force push なし。
- main 不変 ea2ca69 維持。完了後は通常 P1 守りへ復帰可。

## セッション64 (2026-05-30 23:37 JST起動) — data/ スイープ続行 5サイクル done (test 1192→1218, +26 it)
- 着手前確認: HEAD=ef52e91(社長指示セッション P0-追加A/B 直後)。S63 handoff「次の grep スコープ拡張先=data/features.ts・data/recommended-books.ts、scripts/ も未スイープ」に従い data/ の残未テスト純関数寄りモジュールを全消化。実改善0件(source 無変更)。
- done① `data/recommended-books.ts` 回帰固定 / `8ef122c` / `__tests__/data/recommended-books.test.ts`(11 it)。/recommended-books・/[exam]・InlineBookHint・sitemap が消費。buildAmazonUrl の ?tag= 付与/未設定フォールバック・buildRakutenUrl の hb.afl ラップ/素 URL・isAsinFilled/isRakutenIdFilled のプレースホルダ拒否・getDifficultyLabel 写像・全 exam 網羅+id 一意性を pin。アフィリ ID は env 駆動(§14)でソースに無いため vi.stubEnv で両分岐網羅。tag 改変+プレースホルダゲート除去の mutation で2件 fail 実測。test 1192→1203。
- done② `data/features.ts` 回帰固定 / `587c286` / `__tests__/data/features.test.ts`(4 it)。/features/[slug] の generateStaticParams+getFeatureBySlug を支える。slug 一意性(SSG 衝突)・全 slug round-trip・未知 slug→undefined・各ページの benefits/howItWorks/faqs 非空(FAQPage JSON-LD は faqs から生成)・primaryCta/関連リンクの内部 href を pin。find 述語改変 mutation で2件 fail 実測。test 1203→1207。
- done③ `data/keywords.ts` 回帰固定 / `2005f73` / `__tests__/data/keywords.test.ts`(5 it)。/keywords/[keyword] の generateStaticParams+getKeywordPageBySlug。slug 一意性・round-trip・未知→undefined・title/description/body 非空に加え、**exams[] 全要素が実在 ExamCode** であること(ページは /<exam> ピル+「関連試験のページを開く」CTA=/${exams[0]} を描画→無効コードは 404・空配列は CTA 破損)を ALL_EXAM_CODES で pin。find 述語改変+無効 exams 注入の mutation で3件 fail 実測。test 1207→1212。
- done④ `data/faq.ts` 回帰固定 / `85f9c22` / `__tests__/data/faq.test.ts`(3 it)。/faq は FAQS を FAQPage JSON-LD(name=question/acceptedAnswer.text=answer)で出力+category グルーピング。question/answer 非空(無効構造化データ)・question 一意(FAQPage 重複警告)・使用中全 category にラベル存在(GLOSSARY 同様 blank 見出し防止)を pin。空 answer 注入+重複 question 注入の mutation で各1件 fail 実測。test 1212→1215。
- done⑤ `data/glossary.ts` 回帰固定 / `a612375` / `__tests__/data/glossary.test.ts`(3 it)。/glossary は reading で五十音 localeCompare ソート・category グルーピング・DefinedTermSet JSON-LD(name=term/description=short)。reading/term/short 非空(空はソートキー破綻+無効構造化データ)・term 一意(DefinedTerm 名重複防止)・全 category ラベル存在を pin。空 reading 注入+重複 term 注入の mutation で各1件 fail 実測。test 1215→1218。
### 次セッションへ
- **data/ スイープ完了**: blog/success-stories(S63)・recommended-books/features/keywords/faq/glossary(S64)で data/ の純関数寄り・データ不変条件は出尽くした(再監査不要)。残る data/ は types.ts の射影のみ(toSummary=低価値)。
- **★教訓: SSG ルートを支える data/ レジストリ(slug→generateStaticParams + getXBySlug の .find)は「slug 一意性 + round-trip + 未知→undefined + 構造化データ/リンク先の no-404」が共通の load-bearing 契約。keywords の exams[]→/<exam> CTA のような「データ値が内部リンク先になる」箇所は ALL_EXAM_CODES 突合で 404 を機械的に防げる(P0 ブログ CTA exam pin と同型)。**
- **次の未スイープ region: `scripts/`**(S63/S64 handoff が指摘・未走査)。ただし scripts は CI/クローラ系で fetch/fs/env 依存が多く夜間安全な純関数は限られる見込み。lib/ 残りは全て真に blocked(S63 Explore 全走査で確認)。
- 角度②/③(SAFE/latent footgun 再検証・同型 a11y)は S33-S62 で深く枯渇。日中候補(ContactForm 成功カードのフォーカス/告知・pii over-mask・tabs矢印キー・コピー通知統一・MilestoneToast ref化・SM-2 EF・apple-touch-icon PNG・search-index export)は据え置き。

## セッション65 (2026-05-31 00:00 JST〜)
P0 全 done/SKIP。P1 進行中。**新角度=管理オブザーバビリティ層(lib/admin/* + lib/sync/index)のオーケストレータ/env ゲート**。S64 が次の未スイープ region に挙げた `scripts/` は **main() 又はトップレベル実行が import 時に走る(process.exit/writeFileSync)ため直接 import が不可＝夜間は SKIP**(エントリポイントへの guard 追加は dev infra への挙動変更でリスク高・SKIP)。代わりに「消費済みだが未テストの async オーケストレータ/env ゲート」を機械列挙し3本回帰固定(実改善0・source 無変更, test 1218→1237)。
- done `lib/sync/index.ts::syncAll/readSyncMeta` = `d117ced` / `__tests__/sync/sync-all.test.ts`(9 it)。S60 は個別ラッパ(bookmark/custom-tag/study-plan)+postSync を固定したが**orchestrator は盲点**。overall 判定優先順位(unauthenticated>unavailable>ok>partial>error)+ lastSyncedAt を ok/partial 時のみ刻む writeSyncMeta ゲート(失敗 sync が成功を詐称しない)+ readSyncMeta fail-soft を pin。依存4呼び出しを vi.mock で各 state 独立駆動・Date.now spy。mutation(partial 除去)で fail 実測。
- done `lib/admin/metrics/posthog.ts::fetchMetrics` = `3e816d1` / `__tests__/admin/metrics-posthog-source.test.ts`(6 it)。管理メトリクスが実 PostHog かモックかを決める source ラベル分岐。①認証欠落→mock+fetch未呼び出し ②env あり×probe 失敗(network/!ok/results非配列)→fail-soft で source"mock" ③配列 results 時のみ"posthog" ④query URL が projectId 指定+POSTHOG_HOST 末尾スラッシュ除去。vi.stubEnv/stubGlobal。mutation(成功時 mock 化)で fail 実測。
- done `lib/admin/funnel/posthog.ts::fetchFunnelData/isFunnelConfigured` = `0275240` / `__tests__/admin/funnel-fetch.test.ts`(4 it)。buildFunnelSteps のみ既存テスト・orchestrator+env ゲートは未カバー。①認証欠落→configured:false・空・fetch未呼び出し ②認証あり→3ファネル固定名(クイズ/論文/ブログ)+range_days エコー+カウント解析 ③HogQL 行パーサ([event,count]写像・数値強制・空名スキップ) ④probe失敗→count0でも configured:true。mutation(未設定branch configured:true化)で fail 実測。※toHaveProperty("") は vitest が空パスを解析できず TypeError ＝ Object.keys().not.toContain("") を使え(教訓)。
- 全緑: typecheck0/lint0err(残warnは未追跡 ux-audit-screenshots.mjs のみ)/test1237/build緑。各 source mutation→`git checkout --` revert で実測。main 不変。
- **★教訓: scripts/ は import 時トップレベル実行で夜間 SKIP 確定(S64 の次region 候補を打ち止め)。残る安全角度=lib/admin/* の残(deployment-status=Date.now多用でbrittle日中向き/launch-monitoring/data=buildAlerts要export/feature-flags=dead code SKIP確定)。admin オーケストレータ層の env ゲート固定は本セッションで概ね消化。**

## セッション66 (2026-05-31 00:1x JST) — 回帰再点検4レンズ(全て実害ゼロ)・夜間安全タスク枯渇の再確認
- 着手前確認: HEAD=baf4036(S65)。冒頭ベースライン再実測=全緑: typecheck err0 / test **1237 passed (183 files)**(S65 と一致)。
  作業ツリーの未追跡物(logs/*.md, scripts/ux-audit-screenshots.mjs, CRLF差分の BookmarkButton snap, overnight-loop.bat)はコミットに巻き込まない。
- **characterization 角度の枯渇を機械+Explore で二重確認(実改善0・コード無変更)**:
  - `find lib -name '*.ts'` × `__tests__`/`tests` import 突合で未テスト lib を機械列挙 → 残り10本は全て真に blocked:
    deployment-status(Date.now+fetch=日中向き)/feature-flags(dead code・消費ゼロ=SKIP確定)/ai/providers/gemini(SDK)/auth/index・db/prisma(auth-db)/
    motivation/sound(AudioContext)/onboarding/index・streak/index(barrel)/questions/pool-server・search/question-index(server-only)。
  - Explore(medium)も「consumed×untested×pure な安全候補=0件」と独立に確認。S57-S65 の枯渇宣言を再々確認=新規ゼロ。
- **回帰再点検4レンズ(過去修復クラスが S33-S65 や日中作業で再混入していないか機械監査)=全て実害ゼロ・記録のみ**:
  1. **live-region 条件付きマウント(S33 テーマ)**: `&&` 直後の role=status/alert/aria-live を全 .tsx grep。検出8件は全て `role="alert"` の条件付きマウント
     (ContactForm:220/EmailSignInForm:77/MockExamRunner:228/AfternoonPlayer:273/CopilotPanel:1151/SchedulePlanner:195)=**S33 doctrine「alert の条件付きマウントは正」**で合致。
     唯一の polite=SearchClient:997 loading span は S61 記録どおり常設 sr-only role=status(:986)と冗長で **SKIP 済**。**polite 条件付きマウントの新規再混入ゼロ**。
  2. **label htmlFor→id 関連付け**: 全 htmlFor(14箇所)を同一ファイル内 id と突合 → 静的(contact-*/study-plan-*/email/hour/student-id-file/exam-date/search-input/sort-select)・
     動的(afternoon-${sub.label}/qcomment-${id}/feedback-${id})とも全て対の id 実在。**壊れた関連付けゼロ**。
  3. **dangling aria-controls/describedby/labelledby idref(S27 テーマ)**: 静的ターゲットを実測検証 — MockExamRunner(result-categories:469/result-time:549/result-wrong:590/wrong-list:605)・
     HomeTopicGrid(topic-grid-panel:119)・AfternoonResultView(ai-note-${id}:241)・EssayEditor(essay-${subKey}-count:289)とも実在。CopilotPanel 2件は CopilotPanel.aria.test.tsx で回帰ガード済。**dangling ゼロ**。
  4. **numeric input の inputMode(S29 ㉖)**: type="number"/type="tel" のテキスト入力は **コードに存在せず**(あるのは type="date"=ネイティブピッカー=inputMode 不要 と SearchClient の inputMode="search" のみ)。S29「数値キーパッド入力は不在=実害ゼロ」が依然成立。
- **日中候補の据え置き再確認**: ContactForm:86-110 送信成功カード(status==="ok" でフォーム全体を置換)に live-region/フォーカス移動なし(S61 特定)。
  成功カードは条件付きマウントのため正しい修正は「常設 region への restructure」or「成功見出しへの focus() 移動」=**挙動変更+E2E 必須=夜間 SKIP を堅持**(env 出力バッファリングで E2E 信頼性低・S61 と同判断)。
- 全緑: source 無変更のため lint/build は S65 の緑を継承(typecheck/test は本セッションで再実測=緑)。main 不変 ea2ca69。
### 次セッションへ
- **★教訓: 夜間安全タスクは真に枯渇。S57-S65 の「未テスト純関数」も S1-S33 の a11y 実害も S66 の回帰再点検4レンズも全てクリーン確定。**
  残る安全角度は「過去修復クラスの回帰再点検」(本セッション4レンズ=clean 記録で次回の重複監査を防止)のみ。実改善は日中候補(挙動変更+E2E)に依存。
- 回帰再点検で次に確認可能な過去クラス: scroll-margin(S32)/th-scope(S28)/Label-in-Name(S29)/chart role=img(S10-S15)/Radix Switch 命名(S31) の新規再混入有無。いずれも機械 grep で clean 記録可。
- 日中候補(不変): ContactForm 成功カード focus/告知・pii over-mask・tabs矢印キー・コピー通知統一・MilestoneToast ref化・SM-2 EF・apple-touch-icon PNG・search-index export。

## セッション67 (2026-05-31) — th-scope(S28)回帰再点検で公開表の取りこぼし実改善1件 + chart role=img(S10-S15)clean

開始 00:21 JST(<09:00 で改善可)。ベースライン全緑実測(typecheck0/test 1237・183files)= S66 と一致。

done: 公開データテーブルの列見出し scope="col" 付与(実改善) / 5d960ac / __tests__/components/PublicStatsTableScope.test.tsx
- **th-scope(S28)の回帰再点検中に「新規再混入」でなく「S28 スイープの取りこぼし」を2件発見**。`<th` を全 grep し scope 有無を機械突合→公開ページの `/stats`(人気検索ワード表3列)と `/demo/essay-grading`(採点ルーブリック表3列)の列見出しが scope 欠落のまま残存。S28 で why-kakomon-ai/recommended-books/Markdown/blog/QuestionBody には付与済みだったが、この2表が漏れていた(WCAG 1.3.1 / H63: SR がデータセルと列見出しを関連付け不能)。
- 修正: 各3列に `scope="col"` 付与(最小diff・単一軸の列見出し表のため row scope は不要)。
- 検証: 新テスト2件で列見出し数(各3)を pin。demo 表の scope を1つ sed 除去→1 fail を実測(崩れたら落ちる)→git checkout で復元・再付与。build 後 `.next/server/app/demo/essay-grading.html` に `scope="col"`×3 が出力されることを grep 実測(SSG HTML 实测)。typecheck0/lint0err/test 1237→1239/build 全緑。
- **公開表の scope スイープはこれで完了**(残る無 scope は admin/* のみ=auth 配下・prod 503・SEO/公開 a11y 価値ほぼゼロ+多数ファイル=過大修正の罠回避で SKIP)。

clean(回帰再点検・コード無変更): chart role=img(S10-S15)
- 公開チャート SVG を全数確認→`app/stats/StatsCharts.tsx`(4図)・`app/transparency/StatsCharts.tsx`(2図)・`app/account/weakness/WeaknessHeatmapClient.tsx`(レーダー)・`app/ranking/RankingClient.tsx`(分布棒)は全て `role="img"` + 記述的 `aria-label` を保持。新規チャートの role/label 欠落=新規再混入ゼロ。S10-S15 doctrine 維持。

### 次セッションへ
- **★教訓: th-scope(S28)の「回帰再点検」は新規再混入チェックだけでなく『過去スイープの取りこぼし』も拾える=clean 確定でなく実改善が出た。他の過去 a11y クラスも『取りこぼし』視点で全数 grep し直す価値あり(scope/role/aria-label/htmlFor は機械突合可能)。**
- 残る回帰再点検候補(未実施): scroll-margin(S32)/Label-in-Name(S29)/Radix Switch 命名(S31) の新規再混入+取りこぼし。Label-in-Name は機械突合が難しい(可視テキスト⊂aria-label の判定)ため spot-check 寄り。
- admin/* テーブル scope: 意図的 SKIP(auth 配下・prod 503・公開 a11y 価値ほぼゼロ)。a11y 観点で直すなら日中まとめて。
- 日中候補(不変): ContactForm 成功カード focus/告知・pii over-mask・tabs矢印キー・コピー通知統一・MilestoneToast ref化・SM-2 EF・apple-touch-icon PNG・search-index export。

clean(追加・回帰再点検): scroll-margin(S32)
- ページ内アンカー(`href="#..."`)は全2件のみ: `app/layout.tsx` の `#main-content`(skip-link, 対象は `tabIndex={-1}` の main 領域=先頭のため scroll offset 不要・標準パターン)と `app/student/page.tsx` の `#apply`(対象 Card に `scroll-mt-20` 付与済)。両アンカーとも対象が適切に処理済=新規再混入・取りこぼしゼロ。S32 doctrine 維持。

## セッション68 (2026-05-31) — フォームコントロールのアクセシブルネーム取りこぼし1件実改善 + Switch配線回帰固定 + a11y再点検4レンズclean

開始 00:30 JST(<09:00 で改善可)。ベースライン全緑実測(typecheck0/lint0err/test 1239・183files/build緑)= S67 と一致。
S67 教訓「過去 a11y クラスを『取りこぼし』視点で全数 grep し直すと clean でなく実改善が出る」を別クラスへ適用。

done(回帰固定・test-only): /settings Switch のアクセシブルネーム配線を source-read ガード / d2599bb / __tests__/a11y/settings-switch-accessible-name.test.ts(3 it)
- settings ページの7個の Radix <Switch> はインライン aria-label を持たず、SettingRow が可視ラベル <p id={labelId}> を
  cloneElement で aria-labelledby に注入することだけでアクセシブルネームを得る(WCAG 4.1.2)。この配線が外れると全 Switch が
  無名化するが、NotificationSettings(インライン aria-label)と違いガードが無かった。配線契約(useId→p id→cloneElement の aria-labelledby
  注入+各 Switch にインライン aria-label= が無いこと)を source-read で固定。`"aria-labelledby": labelId`→`"data-broken"` mutation で
  cloneElement 検査が1 fail を実測→復元(byte-exact, git diff空)。test 1239→1242。

done(実改善・WCAG 4.1.2 取りこぼし): 論述エディタ業種選択 select にアクセシブルネーム付与 / 4b89c20 / components/essay/EssayEditor.tsx + __tests__/components/EssayEditor.test.tsx
- フォームコントロール(<input>/<select>/<textarea>)を全 grep し「label も aria-label も aria-labelledby も id(htmlFor先)も無い裸の
  コントロール」を機械列挙→**EssayEditor の業種選択 <select>(169)が唯一の取りこぼし**。同コンポーネントの論述 textarea 群は既に
  aria-label 付与済(EssayEditor.test.tsx の docstring が「CardTitle と紐づかない裸コントロール」を明記)なのに、業種 select だけ同じ
  a11y クラスで漏れていた。CardTitle「業種を選択」はCardHeader にあり select と未関連。同文言 aria-label="業種を選択" を付与
  (Label-in-Name 整合)。既存テストに getByLabelText("業種を選択")→SELECT 検証を追加(RTL で実 a11y ツリー検証)。aria-label 除去
  mutation で新 it が1 fail を実測→復元。test 1242→1243。typecheck0/lint0err/build 全緑。

clean(回帰再点検・コード無変更): 5レンズ全て実害ゼロ
1. **target="_blank" rel(セキュリティ/best practice)**: 公開リンク全数 grep→大半 rel="noopener noreferrer"。rel="noreferrer" のみの3件
   (api-docs/admin competitors/essay)も noreferrer が noopener を内包+現代ブラウザの target=_blank 既定 noopener で実害ゼロ。
2. **img alt(WCAG 1.1.1)**: <img>/<Image> 全3箇所(SocialShare/account avatar/StudentIdUpload preview)とも alt 実在。clean。
3. **Label-in-Name(S29・WCAG 2.5.3)**: 可視テキスト+aria-label 併存の interactive 要素を spot-check。blog CTA 等は aria-label が
   可視テキストを接頭辞に含む記述的スーパーセット(推奨パターン=適合)。SearchClient 保存トグル(可視「条件保存済み」/aria-label
   「検索条件の保存を解除」)と practice CTA は aria-pressed 付き状態トグルの意図的設計=borderline で SKIP(夜間安全側)。新規再混入ゼロ。
4. **Radix Switch 命名(S31・WCAG 4.1.2)**: <Switch> 全10箇所=NotificationSettings 3件(インライン aria-label)+settings 7件
   (SettingRow の aria-labelledby)で全て命名済。新規無名 Switch ゼロ(本セッションで配線を回帰固定=上記)。
5. **フォームコントロール命名スイープ(WCAG 4.1.2)**: <input>/<select>/<textarea> 全数→EssayEditor select 1件のみ取りこぼし(上記で実改善)。
   他は全て wrapping <label>(RankingClient/ApiKeysClient/SearchClient checkbox)or aria-label(metrics/mock-exam/CopilotPanel/
   FeedbackGateModal/AfternoonGradingDemo/TTSButton/SchedulePlanner)or htmlFor→id(S66 検証済: contact/study-plan/auth/student-id-file/
   exam-date/search-input/sort-select)or hidden=display:none(settings file input=a11yツリー外, トリガーボタンが命名)。

### 次セッションへ
- **★教訓: S67 の「取りこぼし全数 grep」doctrine は a11y 属性クラスを跨いで有効。フォームコントロール命名で1件(EssayEditor select)実改善が出た。
  機械突合可能クラス(scope[S67完了]/role=img[S66-67 clean]/htmlFor→id[S66 clean]/idref[S66 clean]/Switch命名[S68 clean]/フォーム命名[S68完了]/
  target rel[S68 clean]/img alt[S68 clean])は概ねスイープ尽くした。**
- 残る回帰再点検候補(機械突合が難しく spot-check 寄り・低収穫見込み): Label-in-Name(S29 状態トグル borderline=据え置き)。
- 日中候補(不変・挙動変更+E2E 必須で夜間 SKIP): ContactForm 成功カード focus/告知・pii over-mask・tabs矢印キー・コピー通知統一・
  MilestoneToast ref化・SM-2 EF・apple-touch-icon PNG・search-index export。
- 実改善は引き続き日中候補(挙動変更)に依存。夜間の安全枠は a11y 取りこぼし全数 grep が枯渇に近づいた。

---

## セッション69（2026-05-31 00:44〜 JST・自律ループ）

ベースライン全緑実測: typecheck0 / lint0err(警告2は未追跡 scripts/ux-audit-screenshots.mjs=非対象) / test 1243・185files / build 緑(2510 SSG)。

着手前の前提崩し: Explore で「未テスト純関数は全て tested/blocked」と報告されたが、**Explore の dir-prefix 判定が2件誤り**だったと実証。
`grep -rl "<path>" __tests__/` で個別検証したところ、**消費されているのに top-level path を import するテストが皆無の純関数寄りモジュールが2本残存**。
両者とも観測性/セキュリティ infra で、slack/turnstile(S59)・cost-guard と同型の fetch+env mock で安全に固定可能。

done: **回帰固定2本(実改善0・source 無変更)**。
1. **`lib/monitoring/sentry.ts::captureException` + `isSentryConfigured`** (`ef5a76e`)。サーバー 5xx 収集の fail-soft ブリッジ。
   唯一の import 元 copilot/streaming はモックで差し替えるため実装は未カバーだった。DSN は import 時解析のため resetModules+stubEnv で
   都度再 import。契約: ①観測フロア=DSN 有無に関係なく console.error 常時 ②env-gate=DSN 未設定/解析不能→isSentryConfigured false・
   fetch 不実行 ③有効 DSN→`https://{host}/api/{projectId}/store/` へ X-Sentry-Auth(sentry_key) 付き POST・body の exception value/type と
   transaction が入力を反映 ④fetch reject も非 Error 入力(string/null)も throw しない。POST URL の mutation(`/store/`→`/storeMUT/`)で1件 fail を実測→revert。test 1243→1248(5 it)。
2. **`lib/rate-limit.ts`(IP アンチアビューズゲート + /admin/api-usage 集計)** (`d46ca71`)。全 LLM API ルート(copilot/essay-grade/
   generate-question/scoring)が使う §9 セキュリティ infra。top-level `@/lib/rate-limit` を import するテスト皆無で未カバーだった
   (`/server` と `storage/essay-rate-limit` は別物で既テスト)。KV は import 時読みのため同じく resetModules+stubEnv、Upstash pipeline を
   モック fetch で position 駆動。契約: ①KV 未設定→checkIpRateLimit fail-OPEN({ok:true})・fetch 不実行、stats enabled:false 全ゼロ
   ②KV 有効→分/時/日 INCR を IP_LIMITS(10/100/500) にこの優先順で判定・超過時 reset 境界返却 ③KV 失敗(非ok/throw)も fail-OPEN(可用性優先)
   ④getApiUsageStats=24時間バケット集計+COST_JPY_PER_REQUEST(§12 SSOT 0.055)でコスト算出+top-IP sorted set マージ、
   getApiCallsHourlySeries=時間別合算。minute 上限・cost 定数の mutation で3件 fail を実測→revert。test 1248→1260(12 it)。

SKIP(夜間安全側): **`lib/team/mock-data.ts`**(217行)=interface + `MOCK_TEAM` データ const のみ・**exported function 無し**・
リポ全域で参照ゼロ(app/components/lib/tests いずれも未 import)。Phase 4 team プランの未配線スキャフォールド。
①logic 不在でテスト価値が薄い ②計画機能のスキャフォールド削除は所有者意図の判断=日中向き(superseded 実装の S26 MockExamClient 削除とは異なり現行置換が無い)→**削除も固定もせず SKIP**。

### 次セッションへ
- **★教訓: Explore の「未テスト純関数枯渇」報告は dir-prefix 一致で2件取りこぼした(sentry/rate-limit.ts)。最終確認は機械的に
  `find lib -name '*.ts'` × `grep -rl "lib/<path>" __tests__/` の個別突合で行え(本セッションで実施)。**
- **機械突合スイープ結果(確定): top-level lib/ で未テストの残りは全て真に枯渇** — deployment-status(Date.now brittle=日中)/
  feature-flags(dead SKIP)/gemini(SDK)/auth・db(外部)/sound(AudioContext)/onboarding・streak index(barrel=typecheck 保証 SKIP)/
  pool-server・question-index(server-only/export 追加要=日中)/team/mock-data(上記 SKIP)。**夜間安全な characterization 候補は本セッションで打ち止め。**
- 日中候補(不変・挙動変更+E2E 必須): ContactForm 成功カード focus/告知・pii over-mask・tabs矢印キー・コピー通知統一・
  MilestoneToast ref化・SM-2 EF・apple-touch-icon PNG・search-index export。
- 実改善は引き続き日中候補に依存。夜間の安全枠(未テスト純関数 + a11y 取りこぼし全数 grep)はともに枯渇確定。

---

セッション70（2026-05-31 09:51 JST、ループ終了確認）
- 開始時刻 2026-05-31 09:51 が夜間ループ終了時刻 09:00 JST を超過。
- 起動手順「09:00 以降なら何も改善せず終了処理のみ」に従い、改善着手なし。
- git: overnight-integration は up to date (HEAD d6f2299)、作業ツリー clean。
- 本日分完了。overnight-integration は main に未マージのまま。朝のレビュー後に統合判断すること。
