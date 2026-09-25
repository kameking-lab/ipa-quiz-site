# 2級土木施工管理技術検定・初回収録（2026-09-25）

## 公開範囲

- 令和8年度・第一次検定（前期・土木）の No.6〜16、11問。原本全66問の一部であり、この群は11問から9問を選んで解答する区分。
- 設問・数字選択肢の4肢を文字起こしし、表示ラベルだけア〜エに変換。元PDFのルビ、改行、空白を整理した。11問に図表はない。
- 公式正答は No.6〜16 順に 3, 2, 3, 1, 3, 2, 1, 2, 3, 2, 1。公開データとの一致をテストで固定。
- 年度は「前期」を独立した season とし、第二種電気工事士の「上期」と区別。サイトには 11/66 と明記。

## 原典と独立レビュー

- [JCTC 公式問題PDF](https://www.jctc.jp/wjctcp/wp-content/uploads/2026/06/20260608d_mondai.pdf) SHA-256 `CF69CAA81A9F411513B9B763B61C21A15B43F327E220BB5FF3F336C0A6BA0792`。原本 p.6〜8 の設問・4肢・図表有無を目視照合。
- [JCTC 公式正答PDF](https://www.jctc.jp/wjctcp/wp-content/uploads/2026/06/20260608d_seitou.pdf) SHA-256 `6CF5ABA933D5D7F07F284A2F7BED2A8A99E3CD79794485AC5E47CDE954D89A5A`。別PDFで番号と正答を照合。
- `source-transcription.json` が採録台帳。`opus-receipt.json` は `claude-opus-5-5` を明示した独立4肢レビューの実応答を記録し、`canonicalModel=claude-opus-5-5`、11/11 PASS。Opus はPDF原本を閲覧していないため、モデルの査読は原本照合の代わりとは扱わない。
- 閾値等の解説は国交省の[施工共通仕様書](https://www.mlit.go.jp/tec/r08dobokukoujikyoutsuusiyousyo/)や[道路盛土の施工資料](https://www.mlit.go.jp/tec/constplan/content/001612921.pdf)等を別途照合し、該当設問の `officialReferenceUrls` に添付。No.12 肢4の「18cm」を全工事共通の上限と断定しないよう調整。一次根拠が確認できない追加数値は書かない。
- PDF原本は作業フォルダ外のローカルキャッシュに保持し、このPRでは問題データ・原典URL・ハッシュ・モデルreceiptを追跡する。

## 検証

- `pnpm validate:questions --exam=civil2`: 11件 OK、失敗0、警告0。
- `pnpm typecheck`: PASS。
- `pnpm test`: 391ファイル、3,911件 PASS。
- `pnpm exec next build --webpack`: PASS。`/civil2`、`/civil2/2026-early`、`/q/civil2/2026-early/gakka/q6` 等を静的生成。
- 標準のTurbopackビルドはテスト用に共有 `node_modules` をworktree外へジャンクションしたため、そのジャンクションを拒否。アプリコードのエラーではなく、独立CIの通常インストールで再判定する。

## 残り

- 公式PDFの残り55問、他年度・後期の追加。図表問題は原図と選択肢の両方を確認して別波で追加する。
- PR CIとVercelプレビューで実画面の問題・正答・4肢理由・戻り導線を確認した後に公開する。

## 2026-09-25 宅建公開後の統合

- 前提mainは宅建PR #523のマージSHA `3cfe5be0e483def3c2b09de4ba2033ea597abb34`。`civil2`の11問と`takken`の50問を共存させるため、試験コード・年度期（`early`/`october`）・API・検索・SEO・構造化データ・問題検証の競合を解消した。
- `pnpm typecheck` PASS。両資格を含む対象Vitest 11/11 PASS。`pnpm validate:questions --exam=civil2` は11/11・警告0、`--exam=takken` は50/50・警告0。公開カタログの実データは19資格を数える。
- 初回ローカルPlaywrightは既存の再利用された本番ビルド（18資格）を読み、`home-snippet`の19資格期待のみ失敗。クリーンビルドを行うCIで再検証する。ホームの2分類・外部資格一覧の画面操作は390/1280pxともPASS。固定見出しに依存するテストを資格一覧リンクの確認へ修正済み。
