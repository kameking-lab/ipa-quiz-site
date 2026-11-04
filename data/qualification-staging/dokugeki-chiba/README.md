# 毒物劇物取扱者試験（千葉県）未公開収録

- slug: `dokugeki-chiba`
- 根拠: COV1 B 2（2026-11-04）
- 対象: 2025・2026年度、一般・農業用品目・特定品目、各80解答欄、計480欄。
- 問題・正答12PDFを通常GETで取得。HTTP 200、サイズ、SHA-256、出典URLは `sources.json`。
- `publicAllowed=false`。公開用レジストリ、試験コード、ルートに接続しない。
- 県の著作権方針は一般の無断転載を認めていないため、公開前に個別の利用可否を確認する。許諾済みとは扱わない。
- 冊子に法令基準日の明記はないため、任意の日付を設定しない。

## 原文の保持

`question` は印刷本文、`choices` は印刷順の1〜5、`choiceHeader` は組合せ表の列見出し。
`sharedPrompt` は共通指示と設問群、`postOptionContent` は脚注。
農業用品目の空欄問題は `targetBlankNumber` と当該空欄の5肢を対応させる。
同じ物質が別の空欄で問われる場合も、空欄番号ごとに保持する。

`originalText` に原問の全文を保存し、`sourceImages` に続きページを含めた全問題ページを保存する。
ルビ、表の配置、数式の上下位置、化学式の字形は原問題画像が正本。画像は `assets/` に置き、`public/` に置かない。
画像はPDFページの可逆WebPで、出典・ページ番号・ハッシュを台帳に記録する。
原本PDFは一時領域だけに置き、コミットしない。

## 再取得・再生成

通常GETで `sources.json` の12URLを一時領域に取得し、同じ台帳形式の `downloads.json` を置く。
PyMuPDF・Pillowを利用し、次を実行する。

```powershell
python scripts/ingest-dokugeki-chiba.py --source-dir <temporary-directory>
```

問題PDFと正答PDFは別々に解析し、各区分1〜80の連続性と公式正答を照合する。
再生成後は編集済み解説を適用し、検証と原問題画像の確認を行う。
