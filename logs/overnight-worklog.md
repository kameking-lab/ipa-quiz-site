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
