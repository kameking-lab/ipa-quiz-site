**総合：FAIL（8問PASS／2問FAIL）**。対象10問・50選択肢・50選択肢解説を確認しました。編集・commit・push・PR・deploymentは行っていません。

| 問 | 判定 | 正答 | 確認結果 |
|---|---|---:|---|
| 11 | PASS | 4 | 兼務制限3項目、パートも研修対象、年1回以上の体制を確認。[厚労省通知](https://www.mhlw.go.jp/web/t_doc?dataId=00ta5392&dataType=1&pageNo=1)・[東京都](https://www.tmiph.metro.tokyo.lg.jp/k_kenchiku/touroku/shinsei/sougou/) |
| 12 | **FAIL** | 5 | 解説の根拠項番号が誤り。選択肢4に助詞脱落もあり。 |
| 13 | PASS | 2 | 人口動態統計は第6条第2号。他の選択肢との区別も妥当。[地域保健法](https://www.mhlw.go.jp/web/t_doc?dataId=78301000) |
| 14 | PASS | 3 | 学校薬剤師の環境衛生検査等と、学校医・学校歯科医の健康診断を適切に区別。[文科省資料](https://www.mext.go.jp/content/20250516-mxt_kenshoku-000042576_3.pdf) |
| 15 | PASS | 5 | 基準値は順に100以下／5度以下／5.8～8.6／200 mg/L以下／3 mg/L以下。[環境省](https://www.env.go.jp/water/water_supply/kijun/kijunchi.html) |
| 16 | PASS | 3 | 美容所・クリーニング所の届出制と、他3業種の許可制を確認。[大阪府](https://www.pref.osaka.lg.jp/o100190/kishiwadahoken/eisei2/eigyou.html) |
| 17 | PASS | 2 | 特定悪臭物質の指定と解説に矛盾なし。[環境省資料](https://www.env.go.jp/recycle/files/6hwt.pdf) |
| 18 | PASS | 1 | 原画像の引用文・全組合せを再現。ア／イ／ウの明示で表の対応も保持。[水質汚濁防止法](https://laws.e-gov.go.jp/law/345AC0000000138) |
| 19 | **FAIL** | 4 | 解説4の50人要件に、事業場単位という重要な限定が不足。 |
| 20 | PASS | 3 | 5条約・議定書の対象分野と解説に矛盾なし。[外務省](https://www.mofa.go.jp/mofaj/gaiko/kankyo/jyoyaku/basel.html) |

必要な修正は次の3点です。

1. **Q12 `choiceExplanations["5"]`**  
   「法第13条第2項」→ **「法第13条第3項ただし書」**。第2項は説明・資料提出の要求、第3項ただし書が改善措置の勧告です。[条文](https://www.mhlw.go.jp/web/t_doc?dataId=79071000)

2. **Q12 `choices["4"]`**  
   「維持管理をするよう努めなければならない。」→ **「維持管理をするように努めなければならない。」**  
   両OCRとp008原画像に「に」があります。意味への影響はありませんが、指定された正規化範囲外の脱落です。

3. **Q19 `choiceExplanations["4"]` の最終文**  
   次に置換：  
   **「例えば一般の定期健康診断結果報告は、常時50人以上の労働者を使用する事業場について、事業者が事業場ごとに行います。」**  
   現文の「常時50人以上の事業者」では企業全体の人数と誤読されます。[労働局資料](https://jsite.mhlw.go.jp/miyagi-roudoukyoku/content/contents/002593810.pdf)

両OCR計6ファイルと、指定されたp008・p009・p010を`view_image`で照合済みです。上記助詞以外に原問題・選択肢の欠落は認めません。Q18の法条括弧書きは**原試験にも存在しない**ため、転記への追加は不要です。解説1を厳密な穴埋め表現にするなら「生活環境の保全」を「生活環境を保全」に揃える改善は可能です。

正答索引は全10件一致：**4, 5, 2, 3, 5, 3, 2, 1, 4, 3**。保存PDFはinventoryとのSHA256一致を確認しました。

```text
午前PDF:
0947f24245ec6ebd75654824605f426429634c17b4ca8f9d0e7d92388752ba40
正答PDF:
587f114205af05d4776f241af9a822bff5caa70bae5178f13ad6c948d8ac4088
```

対象[2025-am-011-020.json](/C:/Users/kanet/20260522/wt-LQ4B/data/qualification-staging/lq4c-biru-kan/2025-am-011-020.json)のSHA256（終了時も一致）：

```text
430391d7c7e72fe8d9476519e900e3bbf42db951d144f4544a13a5432835836e
```

判定範囲はこの部分バッチのみです。