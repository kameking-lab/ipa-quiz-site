# CQ8 土壌汚染調査技術管理者試験 — 非公開ステージング

候補根拠は COV1 B 表の6番。slug は `dojo-osen`。環境省の2025・2024年度の各80問（調査35、対策25、法令等20）、合計160原問を保存する。2026年度試験は2026-11-08予定のため、取得日2026-11-04時点の直近完了2回は2025・2024年度。

## 原本・取得記録

- [公式入口](https://www.env.go.jp/water/dojo/kanri.html)
- [2025年度問題・正答一覧](https://www.env.go.jp/water/dojo/kikan/exam/r07_result.html)
- [2024年度問題・正答一覧](https://www.env.go.jp/water/dojo/kikan/exam/r06_result.html)
- [2026年度日程](https://www.env.go.jp/water/dojo/kikan/exam/post_23.html)
- [2025年度調査問30の訂正](https://www.env.go.jp/water/dojo/kikan/exam/post_24.html)
- [環境省利用規約](https://www.env.go.jp/mail.html)

問題4冊、正答2冊を Windows `Invoke-WebRequest -UseBasicParsing` の通常HTTPS GETで取得し、すべて200かつPDFとして開けることを確認。ログイン・CAPTCHA・ボット拒否の迂回なし。取得不能PDFはなし。PDFのURL、SHA-256、バイト数、ページ数、取得方法は `source-manifest.json` に保存。PDF公開年月と試験実施日は、この一覧ページだけでは確定しないため推測で補っていない。法令基準日は各問題冊子表紙に記載された各年度9月1日。

## 保存形式

`assets/` の原問題領域PNGを原文・図表・数式・ルビ・図の選択肢の正本とする。複数ページ問題は全ページの領域を順番どおりに保持する。PNGは公開用の `public/` に置かない。各画像のPDFページ、切出し座標、PDFと画像双方のハッシュを台帳に保存する。`originalText` はPDFの文字層の補助抽出であり、画像中の文字、表の列順序、ルビ位置を完全に表現するものではない。原画像を伴わないテキスト単独配信は禁止。

`choices` は原PDFの順序。`original-image` の選択肢は印刷番号の対応用ラベルで、実際の図・表は `sourceImages` で読む。原問題画像の文言は改変しない。解説は原文とは別の独自作成欄に保存する。

2025年度調査問30には正答肢が存在しない。公式の全員正解扱いを `all-correct` として保存し、単一の肢を正答に捏造しない。公式訂正による土壌表面からの深さはＡ5.0m、Ｂ6.0m、Ｃ6.0m。印刷された舗装表面からの選択肢を原画像上で修正しない。

## 公開境界

`publicAllowed=false`。公開レジストリ・ナビゲーション・サムネイル・検索インデックスに追加しない。利用条件の確認と公開判断は別途必要で、今回の保存を転載許可取得や公開承認と扱わない。

## 再抽出

`python scripts/ingest-dojo-osen.py <一時PDFディレクトリ>`。ファイル名は `2024-am.pdf`、`2024-pm.pdf`、`2024-answer.pdf` と2025年度の同名3冊。Python依存は PyMuPDF / pdfplumber / Pillow。原PDF・抽出草稿はコミットしない。再抽出時は既存の採点・解説フィールドを保持する。
