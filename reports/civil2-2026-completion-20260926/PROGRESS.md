# 令和8年度前期・2級土木施工管理 第一次検定（土木）全66問

## 状態

- 既存公開: No.6〜16 の11問。今回の生成対象から除外し、正答・本文・各肢解説を保持。
- 今回追加: No.1〜5、No.17〜66 の55問。公式問番号を欠番・重複なく収録。
- 公式正答との照合: 66/66。新規55問の4肢理由: 55/55。個別保留: 0。
- 公式図を別画像で表示: No.1〜5、48、50、62 の8問。No.3 の図形選択肢は図も表示し、文字でも識別できるよう記述。
- 年度ページの導線: 公式試験の必須/選択区分に対応する5群見出しとページ内ジャンプを追加。実試験の選択数を表示。
- 既存11問の8つの分野名を保全し、先行公開済みの分野別URLが消えないよう修正。施工管理の問題ページにIPA専用の一般学習記事を出さない。

## 一次資料

- [公式問題PDF](https://www.jctc.jp/wjctcp/wp-content/uploads/2026/06/20260608d_mondai.pdf) SHA256 `CF69CAA81A9F411513B9B763B61C21A15B43F327E220BB5FF3F336C0A6BA0792`
- [公式正答PDF](https://www.jctc.jp/wjctcp/wp-content/uploads/2026/06/20260608d_seitou.pdf) SHA256 `6CF5ABA933D5D7F07F284A2F7BED2A8A99E3CD79794485AC5E47CDE954D89A5A`
- `official-extract.json` はPDFをSHA照合して問番号・正答・本文を抽出した記録。`official-segments.json` は自動分割した確認用原稿。`visual-overrides.json` は原図を見て上付き文字・数式・図の読取りを修正した記録。公開データは `data/questions/civil2/2026-early.json`。
- PDFの小さな上付き数字が抽出で落ちるため、No.2・4・5・25・51・56などを原図で確認。No.25は一旦HOLDとして原図で `ℓ/m²` を確認し、修正後に再査読してPASS。

## モデル査読

- `opus-{a,b,c,d,e,f,g}-receipt.json` に `claude-opus-5-5` を明示した実応答の `modelUsage`、`canonicalModel`、`provider=firstParty` を保存。異なるモデルの応答は採用しないゲート。対応する `opus-*-raw.json` と `opus-*-explanations.json` は再監査可能な生成・採用記録。
- 回答を埋めることより原図・公式正答との一致を優先。入力欠落があったNo.25は原図訂正前の結果を採用せず、グループgの再査読結果を採用。

## 検証

- `pnpm typecheck`: PASS
- `pnpm validate:questions`: PASS（全体の既存警告あり、エラー0）
- 全体 Vitest: 393/393ファイル、3967/3967テスト PASS（2ワーカー）。
- 旧分野URL互換・年度一覧の5区分ジャンプ・IPA記事の誤推薦を修正後、関連4ファイル11テスト PASS、typecheck PASS。
- PR [#525](https://github.com/kameking-lab/ipa-quiz-site/pull/525) の初回CIはtypecheck・問題検証・E2E・Vercel deploymentすべてPASS。上記UX修正後に再実行し、Astra実画面審査を受けてからマージする。
- C:の空き容量制約でローカルbuildを中断。E:の隔離worktreeで画面審査経路を用意中。本番公開は未了。
