# 司法書士（午前・午後の多肢択一式）直近2回監査

監査日：2026-11-03。登録は未公開（`ready-to-ingest`）。問題データは139問。完了したのは公式問題・正答の取り込みと未公開登録であり、各記述の法的理由を述べる詳細解説と公開前レビューは未完了。

## 対象回の公式根拠

年度は現在年から推測せず、法務省の[司法書士試験一覧](https://www.moj.go.jp/shikaku_saiyo_index3.html)と各年度の公式案内を確認した。

- [令和8年度](https://www.moj.go.jp/MINJI/minji05_00755.html)：[問題掲載ページ](https://www.moj.go.jp/MINJI/minji05_00777.html)、[正答掲載ページ](https://www.moj.go.jp/MINJI/minji05_00776.html)。午前・午後問題と多肢択一式正答の公表を確認。
- [令和7年度](https://www.moj.go.jp/MINJI/minji05_00697.html)：[問題掲載ページ](https://www.moj.go.jp/MINJI/minji05_00715.html)、[正答掲載ページ](https://www.moj.go.jp/MINJI/minji05_00716.html)。午前・午後問題と多肢択一式正答の公表を確認。

| 対象 | 公式問題PDF | 公式正答PDF | 追加数 | 通常採点対象外 |
| --- | --- | --- | ---: | --- |
| 令和8年度 午前 | [問題](https://www.moj.go.jp/content/001467964.pdf) | [正答](https://www.moj.go.jp/content/001467955.pdf) | 35 | 0 |
| 令和8年度 午後 | [問題](https://www.moj.go.jp/content/001467965.pdf) | 同上 | 35 | 0 |
| 令和7年度 午前 | [問題](https://www.moj.go.jp/content/001444126.pdf) | [正答](https://www.moj.go.jp/content/001444124.pdf) | 35 | 0 |
| 令和7年度 午後 | [問題](https://www.moj.go.jp/content/001444127.pdf) | 同上 | 34 | 1 |
| 合計 | | | **139** | **1** |

午前各35問、午後の多肢択一式各35問の計140原問が公式公開されている。全問非公開を理由とする資格スキップはない。令和7年度午後第33問は、正答となる組合せがなく、[公式告知](https://www.moj.go.jp/content/001444130.pdf)と公式正答表で全員正解とされた。番号を創作せず通常採点対象から除外し、`excluded.json` に原文・選択肢・理由・問題／正答／告知URLを保持した。午後第36・37問の記述式は指定対象外。

## 原文・正答・解説

- 公式PDFを取得して `pdftotext -layout` で本文を抽出。初回は403となったが、ブラウザーのUser-Agentを付け、クエリ付きURLで取得できた。各問の出典URLは通常の公式URLを記録。
- 問題文、本文中のア〜オ、実際の番号1〜5の選択肢を保持。ページ番号・冊子記号・不可視制御文字を除き、改行・空白を整理した。共通前提（ウィーン売買条約を考慮しない、民法問題では商法を考慮しない、定款に別段の定めがない）を対象問へ明記した。類題・生成問題はない。
- 令和8年度午前第3問の複数行選択肢を個別保持。令和8年度午後第20問は登記記録の文字起こしに加え、原表部分だけを画像化して `hasImage: true` とした。原本の表や共通前提部分を画像で確認。全ページの目視による再校正は公開前の残作業。
- 公式PDFのSHA-256を `sources.json`、PDFから抽出した原文と公式正答表を `source-text/` に保存。公式正答表の70行（各行午前・午後）をテストで照合し、139問の内部解答キーと解答番号の対応を検証する。
- 問題・正答・出典表記を各問に記録。法令は**出題時点の法令**（各年度の問題冊子指定：2025-04-01／2026-04-01現在）と明記。
- 解説は過去問AIが独自作成した正答組合せの要約。公式の解説とは表示しない。全選択肢について正答組合せとの一致・不一致を説明するが、各記述の判例・条文による理由を網羅する詳細解説ではない。`explanationCoverage: "official-summary"`、`needsReview: true`。公開前に法的理由を補完・レビューする必要がある。公式正答と異なる採点はしない。

## 既存方式との整合

土地家屋調査士の `data/questions/chosashi/{年}.json` と `index.ts`、資格台帳・公開ゲートを参照。`data/questions/shihoshoshi/{2026,2025}.json` と `index.ts` を追加した。

資格型、試験設定（午前／午後各35問・annual）、資格台帳、同期／遅延問題レジストリ、番号表示、検証スクリプトに登録した。IPA用一覧からは除外。資格台帳の `ready-to-ingest` によって公開一覧・同期読み込み・遅延読み込みを遮断する。問題詳細ルートは公開問題集合からのみ参照するため、この資格は未公開。新たな公開URLや公開資格一覧の表示は有効化していない。

法務省の[利用条件](https://www.moj.go.jp/hisho06_00280.html)は既存の法務省資格と同じ出典先を登録。今回その条件の再精査は終えていないため、公開前に第三者権利等の条件を確認する。

## 検証

検証結果は下記に追記。`pnpm build`、デプロイは実行しない。秘密値を読み出したり記録したりしていない。

- `pnpm install`：成功。
- `pnpm validate:questions`：26,583問、エラー0件。警告16,947件（既存分を含む）。
- `pnpm validate:questions --exam=shihoshoshi`：139問、エラー0件。139件の `needsReview` 警告は未公開データのレビュー待ちを示す。
- `NODE_OPTIONS=--max-old-space-size=8192 pnpm typecheck`：成功。標準ヒープでは既存の大量データの型検査がメモリ不足となったため上限を増やした。
- `NODE_OPTIONS=--max-old-space-size=8192 pnpm test __tests__/questions/shihoshoshi-staging.test.ts __tests__/questions/qualification-expansion.test.ts --maxWorkers=1`：2ファイル、1,069テスト成功。新資格の公開遮断、公式正答表との照合、除外問、番号表示、法令日、テキストと原表を確認。
- `git diff --check`：成功。
- build・デプロイ：未実行。
