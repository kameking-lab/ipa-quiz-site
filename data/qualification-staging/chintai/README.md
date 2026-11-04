# 賃貸不動産経営管理士・未公開ステージング

令和7年度（第13回、2025-11-16）・令和6年度（第12回、2024-11-17）各50問。
2026-11-04に[公式一覧](https://www.chintaikanrishi.jp/exam/past)の先頭2回を確認した。
`2024.json`・`2025.json`に原文、公式四肢、公式正答番号、独自の全肢解説、各問の出典URLとPDF物理ページ番号を保存する。
個数・組合せ問題には内側のア〜エの各記述の解説も保持する。

**未公開。** 公開のQuestion型・ExamCode・問題レジストリ・ライブラリ・public配下には接続しない。
`manifest.json`は`publicationStatus: staging`・`publishable: false`。
資格台帳は`ready-to-ingest`で、`examCode`を付けない。
一般公開への接続は別タスクとする。

- 各問の`lawAsOf`は出題年度の4月1日。現在の法令についての一般的助言ではなく、その試験時点の説明である。
- **2025問9**の公式正答番号は「-」。`officialAnswerNumber: null`、`scoring: all-answers-correct`、`acceptedAnswerNumbers: [1,2,3,4]`とする。これは四肢全部の同時選択を求める複数選択式ではなく、どの単一解答も正解と扱うという意味である。
- 本文ではPDFの改行・空白を整形し、ページ柱を除去した。2025問43の「水濡れ」のルビ「ぬ」は別行に抽出されるため省略し、`transcriptionNote`に記録した。
- 全57ページの縮小レンダリングで図版・表の脱落がないことを確認。問43は拡大画像でルビの位置を確認した。全文の一致は下記原本監査で別途確認する。
- 2026-11-04 01:30のオーナー決定で権利確認済み。使用許諾申請についての公式文言は報告に記録し、旧保留を停止理由にしない。
- 旧クラウド報告は当時0問だった履歴であり、本ステージングの独立レビュー合格記録ではない。

## 検証

`pnpm validate:questions`は通常の公開問題検証に加え、専用の厳密スキーマで本100問も検証する。
`pnpm validate:questions --exam=chintai`は本ステージングのみを検証する（公開問題数は0）。

原本の再照合は次のコマンドで実行する。原本PDFはmanifestの4URLから通常アクセスで取得し、ローカルの任意フォルダに置く。

```powershell
python scripts/audit-chintai-source.py --source-dir <PDF保存先> --pdftotext <Popplerのpdftotext.exe> --write
```

4PDFのSHA-256、全本文・全400選択肢・全100正答・受理番号・ページ・本文ハッシュを照合する。
全件成功した場合にだけ`source-audit.json`を書き込む。単なるJSON構造検証をPDF照合の代わりにしない。
Poppler 26.09.0で検証済み。古いXpdf等では抽出順序が異なる場合がある。

```powershell
pnpm test __tests__/questions/chintai-staging.test.ts
pnpm typecheck
```
