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
