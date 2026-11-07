**FAIL — Q2・Q6の解説に修正が必要です。**

現在のUTF-8ファイルについて、10問の全文・50選択肢・10総合解説・50選択肢解説を確認しました。両OCRを読み、指定のp004～p007を`view_image`で目視照合済みです。

- 問題文・選択肢：許容された空白・句読点・単位表記の整理を除き一致。意味の欠落・変更なし。
- 公式解答：保存済み解答PDFと解答インデックスに全問一致。
- 図版：全問不要。`hasRequiredFigure: false`は適切。
- 文字化け：本文・解説・出典表記の文字化け由来の`?`は0件、U+FFFDも0件。URLの`?`は正常。
- 保存済みPDFのSHA-256はインベントリと一致。指定4画像はPDFの再描画結果と画素単位で一致。

| 問 | 正答 | 判定 | 設問別所見 |
|---|---:|---|---|
| Q1 | 4 | PASS | 人物と功績の対応、各肢の訂正説明に問題なし。 |
| Q2 | 2 | **FAIL** | 原文・正答は一致。2024年の水道行政移管と下水道の所管説明を混同。 |
| Q3 | 4 | PASS | 基準遵守の義務主体と管理技術者の監督役割を正しく区別。 |
| Q4 | 3 | PASS | 共用部分・附属倉庫を算入し、歯科を除く3,100 m²の計算は正しい。 |
| Q5 | 5 | PASS | 用途区分と学校の面積要件の説明は適切。 |
| Q6 | 3 | **FAIL** | 届出期限・罰金額は正しいが、選択肢2の根拠条番号が誤り。 |
| Q7 | 1 | PASS | 直結給水を建築物衛生法上の定期水質検査対象から除く説明は適切。[厚労省資料](https://www.mhlw.go.jp/content/10601000/000487568.pdf) |
| Q8 | 1 | PASS | 大掃除・調査頻度、薬剤、機器管理の説明に問題なし。[管理基準](https://www.mhlw.go.jp/bunya/kenkou/seikatsu-eisei10/index.html) |
| Q9 | 4 | PASS | 書換えと再交付、常駐・直接雇用の不要、意見尊重、所有者等の帳簿義務を正しく区別。[法](https://www.mhlw.go.jp/web/t_doc?dataId=79071000)・[厚労省解説](https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/00004.html) |
| Q10 | 5 | PASS | 総合管理業の必須器具と他業種の高圧洗浄機を正しく区別。[施行規則](https://www.mhlw.go.jp/web/t_doc?dataId=79073000) |

必要な修正は次のとおりです。

1. **Q2 `explanation`と`choiceExplanations["3"]`**  
   2024年4月の移管は水道行政の移管です。「水の再利用等は環境省」とする包括的な分担説明も不正確です。[厚労省の移管説明](https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/kenkou_iryou/kenkou/suido/index.html)、[国交省の下水処理水再利用資料](https://www.mlit.go.jp/mizukokudo/sewerage/mizukokudo_sewerage_tk_001055.html)

   置換案：
   - `explanation`：「正答は2です。廃棄物処理法は環境省の所管です。下水道法は国土交通省と環境省の所管であり、2024年4月の水道行政の移管とは区別します。」
   - `choiceExplanations["3"]`：「適当です。下水道法は国土交通省と環境省が所管しています。環境大臣には、終末処理場の維持管理に関する指示等の権限があります。」[下水道法](https://laws.e-gov.go.jp/law/333AC0000000079?occasion_date=20240517)

2. **Q6 `choiceExplanations["2"]`**  
   「法第15条による」を**「法第16条第1号による」**に置換。第15条は指定試験機関側の違反に対する50万円以下の罰金であり、本肢の根拠ではありません。[建築物衛生法](https://www.mhlw.go.jp/web/t_doc?dataId=79071000)

対象ファイルの確認時SHA-256：`ccf96727baff6eb49b13b447e2c55f89c774fcdeea176f7d843623d221a330e5`

ファイル変更・commit・push・PR・deploymentは行っていません。**今回の判定対象は部分バッチ10問のみで、518問全体の完了判定ではありません。**