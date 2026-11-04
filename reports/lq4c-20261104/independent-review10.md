**総合FAIL：8問PASS、2問FAIL（問13・17）。** 対象10問の本文、50選択肢、総合解説10件・選択肢別解説50件を確認しました。本文・選択肢の転記、公式解答、図の要否は全問PASSです。

| 問 | 公式解答 | 判定 | 確認結果 |
|---|---:|---|---|
| 11 | 5 | PASS | 水洗便所用の濁度は対象外。ほか4項目の基準・検査頻度も整合。 |
| 12 | 1 | PASS | 清掃業の機械器具、水質検査業の検査室、他3業種の専用保管庫を確認。 |
| 13 | 4 | **FAIL** | 正誤判断は正しいが、選択肢5解説の根拠法令の表現を要修正。 |
| 14 | 4 | PASS | 地域保健法第6条の各号と解説が一致。 |
| 15 | 2 | PASS | 学校VOC検査項目にアセトアルデヒドは含まれない。 |
| 16 | 5 | PASS | 国土交通大臣・環境大臣の権限の区別は正しい。 |
| 17 | 4 | **FAIL** | 本文・解説は正しいが、参考URLの法令IDが誤り。 |
| 18 | 3 | PASS | 気積・4 m・10 m³、全5組合せ、列名ア／イ／ウを確認。 |
| 19 | 3 | PASS | 第一種・第二種施設、屋外喫煙場所・喫煙専用室・客室の例外説明は妥当。 |
| 20 | 3 | PASS | 水質基準、保健所業務、消防同意、両法適用、学校用途の解説が整合。 |

**必要な修正は次の2件です（未編集）。**

1. **問13 `choiceExplanations["5"]`**  
   「法で定める名称は」を「**施行規則第21条第2項で定める名称は**」へ変更。名称は正しいものの、法律本体と施行規則を区別する必要があります。参考URLにも施行規則を追加してください。住居への立入りに居住者の承諾が必要という説明は、法第11条第1項ただし書と一致します。[厚労省掲載法令資料](https://www.mhlw.go.jp/content/11601000/001132203.pdf)

2. **問17 `explanationReferenceUrls[1]`**  
   法令ID `411AC1000000105` → **`411AC0100000105`**。  
   正しいリンク：[ダイオキシン類対策特別措置法](https://laws.e-gov.go.jp/law/411AC0100000105)

重点事項は、[雑用水の管理基準](https://www.mhlw.go.jp/bunya/kenkou/seikatsu-eisei10/index.html)、[登録基準・監視員名称](https://www.mhlw.go.jp/content/11601000/001132203.pdf)、[文科省学校環境衛生管理マニュアル](https://www.mext.go.jp/content/20230817-mext_kenshoku-100000613_2.pdf)、[下水道法](https://laws.e-gov.go.jp/law/333AC0000000079?occasion_date=20201113)、[健康増進法第28・29・40条](https://www.mhlw.go.jp/web/t_doc?da=&dataId=78aa3837)で独立照合しました。

保存PDF、両OCRのp007～p009、指定PNG3枚を照合済み。図画像の追加は不要です。inventory記載の問題・解答PDFのSHAは実ファイルと一致し、解答indexと保存公式解答の問11～20も全件一致しました。途中で述べた問16・17・20の転記差分は読み違いであり、撤回します。

対象：[2024-am-011-020.json](C:/Users/kanet/20260522/wt-LQ4B/data/qualification-staging/lq4c-biru-kan/2024-am-011-020.json)  
SHA-256（確認前後一致）：
```text
9a4d27bece37201f3b754800469e965a310c73e9c7576990f0cf428683042103
```

照合元：
:codex-file-citation{path="C:/Users/kanet/AppData/Local/Temp/codex-work/lq4b-sources/biru-kan-2024-am.pdf" purpose="source"}
:codex-file-citation{path="C:/Users/kanet/AppData/Local/Temp/codex-work/lq4b-sources/biru-kan-2024-answer.pdf" purpose="source"}

**この10問のみの部分バッチ審査です。ファイル変更・commit・push・PR・deployは行っていません。**