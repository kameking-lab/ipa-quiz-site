# 2級管工事施工管理技術検定 第一次検定（kankoji2）導入

## 状態（2026-09-26 JST）

- 令和8年度前期（2026-early）全52問、令和7年度後期（2025-late）全52問、計104問。HOLD 0。
- 公式正答との照合 104/104。全肢解説 416肢。No.49〜52（両年度）は公式どおり「適当でないものを二つとも答える」形式で、二肢そろえた場合だけ正解（`requiredSelections: 2`）。
- 令和7年度後期No.16は実施機関の正答訂正（(2)(4)いずれも正解）に従い、イ・エのどちらを選んでも正解。
- 公式図：2026 No.8（湿り空気線図）・No.30（ネットワーク工程表）、2025 No.3・No.8（湿り空気線図）・No.30（ネットワーク工程表）の5枚を原本PDFから切り出し、`figures.json` にページ・切り出し矩形・SHA-256を記録。

## 一次資料と利用条件

- 掲載ページ: https://www.jctc.jp/mondai/ （2026-09-26 18:46 JST 取得。2級土木施工管理 civil2 と同一ページ）
- ページ・PDFとも転載可否の明示文言はない（明示の許可も禁止も無し）。表示は「All right reserved. Copyright © 2023 Japan Construction Training Center.」のみ。PDF本文にも転載・複製・許諾の文言なし（テキスト層を検索）。
- 既に公開中の civil2 と同一の実施機関・同一ページ・同一条件のため、civil2 と同じ `JCTC-authorized-reuse` 扱い・同じ出典表記で収録した。明示の「出典明記で転載可」文言は無い点は要人間確認事項として残す。
- 公式PDF（SHA-256）
  - 2026前期 問題 `20260608k_mondai.pdf` 7E473038142BDB7EFAFDE7089D7C74A3D66D51286D812E44F2261C9EFBAD29B3
  - 2026前期 正答 `20260608k_seitou.pdf` 08F1C3B49B4FB82CCA7262A71D1FF6CFBFC086825C98FEEDAA46740279660B32
  - 2025後期 問題 `20251117k_mondaia.pdf` E5101AFE8E76B244CA914EEA72BCADD409C1315556266891E644559F4757D14A
  - 2025後期 正答（No.16訂正を含む）`20251117k_seitou.pdf` 0599B25F1B4ED3460C70E51C77A803837357901A658916238BB93FC1D25E8AFE

## 作成手順

1. `extract_official.py`：SHAを照合し、ルビ（5pt）を除いた本文行を抽出（`extract-*.json`）。5.2〜6ptの上付き数字は `{{sup:}}` として残し目視確認対象にした。
2. `segment_official.py`：問番号・肢で分割（`segments-*.json`）。2025のPDFはテキスト層のグリフ対応が壊れており（⑴→`81`、「」→`I J`、1→`6`、2→`D`、3→`F`、4→`G`、＝→`穐`、＋→`愛`）、テキスト層は索引としてのみ使用。
3. 全ページを2倍で画像化して目視照合し、差異を `visual-overrides-*.json` に記録（2026：No.2・8・13・30・45、2025：No.2・3・8・12・14・15・18・21・30・32・33・34・39〜48・52）。2025はNo.21「易操作性1号」、No.46「1億円」など、テキスト層の数字が原本と異なる箇所を原図で確定。
4. `opus-review.mjs`：`claude -p --model claude-opus-5-5` で問題群ごとに査読・全肢解説を生成。`evidence/opus-*-{prompt,raw,receipt,explanations}.json` に保存。受理条件は exitCode 0・is_error false・modelUsage が `claude-opus-5-5` のみ・canonicalModel/provider=firstParty。
   - 2026-c と 2025-d の初回は CLI 側の失敗（ツール呼び出し解析失敗／プロセス異常終了）で解説が得られず、`failed-*` として保存し再実行。
   - 2026 No.35：肢イ（外気取入れチャンバー点検口の外開き）の理由付けが弱いため、指摘を付けて再査読（`g35-r2`）。採用後、「内側から」の1語句のみ手修正（`build-data.mjs` の manualEdits に記録）。
   - 2025 No.36：初回はウ（シートタイプ合成樹脂製カバー）の根拠が確定できずHOLD。国土交通省「公共建築工事標準仕様書（機械設備工事編）令和7年版（修補版）」（https://www.mlit.go.jp/gobuild/content/001967513.pdf）の合成樹脂製カバー１（シートタイプ）／２（ジャケットタイプ）の規定を根拠として再査読しPASS（`g36-r2`）。同URLを問題の公式外根拠に記載。
   - Opus 実行費用（receipt の total_cost_usd 合計）：2026 $4.46、2025 $2.21（失敗試行を除く）。
5. `build-data.mjs`：SHA・公式正答・全肢解説・図・receipt を検査して `data/questions/kankoji2/*.json` と `acceptance-ledger.json` を生成（欠落・重複・未受理 receipt で停止）。
6. `extract_figures.py`：公式図を切り出し `public/questions/kankoji2/` に保存。

## サイト側の変更

- 試験コード `kankoji2`、期 `late`（後期）を追加。年度一覧は公式6区分（必須/選択）の見出しとページ内ジャンプ。
- 「二つとも答えなさい」形式：`/q` の解答カードと `/quiz` のクイズ画面で、肢をチェックボックスとして選択・解除でき、規定数（2）そろった時点で採点。一肢だけ正しい組合せは不正解。ストリーム演習とデイリーチャレンジは1肢UIのみのため対象外。公開APIの採点も同じ規則。

## 検証

- `pnpm typecheck` PASS、変更ファイルの eslint PASS。
- `pnpm validate:questions --exam=kankoji2` 104 ok / 0 fail / 0 warn。`audit-questions --ci` exit 0（kankoji2 は異年度同一設問文の warning 16件のみ。設問文が同じで肢が異なる本試験の性質による）。
- Vitest 全体：399ファイル中397 PASS。負荷下で2件が15秒タイムアウト（get-questions、sitemap-static-indexable）→ 単独再実行で PASS。
- 新規テスト：`__tests__/kankoji2-first-stage.test.ts`（SHA・正答・全肢解説・図SHA・receipt・URL往復）、`__tests__/components/TwoChoiceSelection.test.tsx`（二肢選択の採点）、`tests/e2e/kankoji2-first-stage.spec.ts`。
- 独立QC（Sonnet サブエージェント、seed 20260926 で無作為抽出 22/104問＝21%）：原本画像と正答表に対し設問・肢・正答・図・解説の正誤判定を突合し、欠陥0件で QC VERDICT: PASS。
