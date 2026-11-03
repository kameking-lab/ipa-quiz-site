# 第75回 計量士・独立レビュー1回目の指摘への対応

確認日：2026-11-03。対象は第75回の原問200問・選択肢解説1,000肢。出題時点の法令は2024-12-15を基準とした。正答200件は変更していない。問題データの変更は103問で、表示コード、第76回、公開状態は変更していない。コミット・pushはしていない。

## 指摘への対応

| 指摘 | 対応 |
| --- | --- |
| 法規・問22 | 総合解説と選択肢2の解説を修正。計量法127条3項の検査主体を「都道府県知事又は特定市町村の長」とし、国の事業所も施行規則74条により同じ主体であること、指定権限とは区別することを明記。正答2を維持。 |
| 管理・問9 | **変更なし。提示された指摘と手元の公式PDFの描画が一致しない。** 分子の右側は、上に点がある添字iで、左側のxᵢと同じ字形。原本は `(xᵢ−x̄)(yᵢ−ȳ)` と読める。yₙへの変更や原本誤植の注記は追加していない。正答4を維持。 |
| 環化・問15 | 選択肢3・4・5の解説を修正。質量分率による誤計算 `3.17×180/(180+17.1)=2.894977… kPa` は選択肢3の2.89 kPaに対応。選択肢4の3.03 kPaとは対応しない。モル分率による `3.17×(180/18)/((180/18)+(17.1/342))=3.154228… kPa` は選択肢5に対応。正答5を維持。 |
| 画像代替テキスト21問 | 指摘の21問を実画像に合わせて修正。全数検査で判明した未設定27問にも追加。画像がない54問に残っていた不要な配列を削除。既存の適切な7問と合わせ、図のある55問すべてを確認。 |

管理問9の確認画像は[分子の拡大描画](../docs/evidence/keiryoshi-75/round1-resolution/kanri-q9-numerator.png)、出典・ハッシュ・描画座標は[確認記録](../docs/evidence/keiryoshi-75/round1-resolution/kanri-q9-source-check.json)に保存した。公式PDFは `data/raw_pdfs/keiryoshi/r06-75/6_R06kanri.pdf` のPDF第10ページ（紙面9ページ）。ローカル原本のSHA256は既存MANIFESTと一致。METIの同URLへの再取得はHTTP403だったため、オンライン版との再比較はできていない。

解説の変更は2問・5フィールド（総合解説1、選択肢解説4）。画像代替テキストは48問で修正・追加し、不要配列54問を削除した。法規問22は画像配列削除の54問にも含まれるため、重複を除いた変更は103問。[変更一覧](../docs/evidence/keiryoshi-75/round1-fix-changes.json)に問題番号と変更フィールドを記録した。

## 全数点検と証跡

- **法令：200問を分類し、法令・委任規格に関係する46問を再点検。** 条文、主体、数値、基準日をe-Govの当時の条文と照合した。既存の法令11資料は再取得したハッシュが一致。追加のe-Gov資料5件と環境省告示2件も保存した。法規問22以外に追加修正は見つからなかった。[条文・所見の記録](../docs/evidence/keiryoshi-75/round1-resolution/legal-audit.json)、[再取得記録](../docs/evidence/keiryoshi-75/round1-resolution/historical-law-refetch.json)、[追加資料](../docs/evidence/keiryoshi-75/round1-resolution/additional-sources.json)。
- **解説：1,000肢すべてを選択肢本文と対置して再読。** 数値と選択肢参照を機械抽出し、参照先の本文・各肢に現れる数値を付記した。単一の数値を選ぶ39問は独立計算値から実データの5肢への対応を検査。既存の計算・記号検算81件も再実行した。「近い」等の対象13箇所（数値11、定性的記述2）を確認し、質量分率と切片を無視した回帰の誤答モデル2件も最寄りの選択肢を検査した。環化問15以外に追加修正は見つからなかった。[1,000肢の対応表](../docs/evidence/keiryoshi-75/round1-resolution/choice-correspondence.json)、[計算値との対応](../docs/evidence/keiryoshi-75/round1-resolution/numeric-correspondence.json)。字句抽出だけで自然言語の正しさを証明したとは扱っていない。
- **原文の式：200問すべての公式PDF描画を本文・5肢と照合。** 符号、指数、添字、分母・分子を確認した。無注記の原本補正は見つからなかった。計質問7の原本「非接地型型」は既存注記とともに保持。[全200問の記録](../docs/evidence/keiryoshi-75/round1-resolution/formula-visual-audit.json)。
- **画像：200問すべてでimageUrlsとimageAltTextsの件数を機械検査。** 図のある55問は実画像を目視し、表の見出し、構造式、配線、軸、ラベルとの内容の対応を確認。画像URLの年度・科目・問題番号・ファイル存在を検査し、図から拾った特徴語も代替テキストと機械照合した。[55図の記録](../docs/evidence/keiryoshi-75/round1-resolution/image-alt-audit.json)。

再実行用の[対応検査スクリプト](../docs/evidence/keiryoshi-75/round1-resolution/audit.py)と[法令証跡生成スクリプト](../docs/evidence/keiryoshi-75/round1-resolution/legal-audit.py)を保存した。これらは既存の目視確認・条文読解を置き換えるものではない。

法令本文が参照するJISの全文はe-Govに収録されていない。該当6問は、法令本文で確認できた範囲と、既存の一次資料・規格参照による確認の範囲を法令記録のscopeLimitに区別した。JIS全文をe-Govで照合したという扱いにはしていない。

## 検証

最終データに対する実行結果は[検証記録](../docs/evidence/keiryoshi-75/round1-resolution/checks.json)と各ログに保存。

| コマンド | 結果 |
| --- | --- |
| `pnpm validate:questions` | 終了0。27,044問、失敗0。既存の要レビュー等の警告17,255件。 |
| `NODE_OPTIONS=--max-old-space-size=8192 pnpm typecheck` | 終了0。 |
| `npx vitest run __tests__/keiryoshi-staging.test.ts __tests__/seo` | 終了0。111ファイル・599テスト成功。 |
| `python3 scripts/verify-keiryoshi-source.py` | 終了0。第75回のPDF9件、原問200問、解説1,000肢、図55件、公式正答200件を検証。 |

第76回は既存163ファイルすべてのSHA256一致を確認し、2025年の問題データ8ファイルもHEADとのバイト一致を確認した。[163ファイルの証跡](../docs/evidence/keiryoshi-75/round1-resolution/round76-integrity.json)。問題データに対応する転記証跡のハッシュも更新した。staging、needsReview、独立レビュー未承認の状態は維持しており、本報告は修正担当による再点検記録である。
