**A・Bとも総合PASS。必須修正はすべて解消しています。** 全JSONフィールドを比較し、指定差分以外は一致。変更のない設問は前回PASSを維持します。

**A：[2025-am-061-073.json](C:/Users/kanet/20260522/wt-LQ4B/data/qualification-staging/lq4c-biru-kan/2025-am-061-073.json) — PASS**

比較元は `reports/lq4d-20261104/reviewed-manuscripts/review11-before-fixes.json`。差分は8フィールドのみです。

- **Q62：PASS／必須修正済み。** 原本PDF画像p023の見出し「空気調和方式名称」「熱媒体による分類」を、組合せ順序として明示。選択肢は変更なし。
- **Q64：PASS／必須修正済み。** 理由1～4それぞれの「該当しません。」を「個別方式に該当するため、正答ではありません。」へ変更。後続の技術説明は同一。「個別方式に該当しないもの」を問う原文との矛盾が解消。
- **Q65：PASS／必須修正済み。** 選択肢3は原本p024どおり「空気熱源方式の一般的な採熱源は、外気である。」に復元。
- **Q68：PASS／必須修正済み。** 原本p025どおり「モリエル線図上に表した」に復元。追加は「上」の1文字のみ。
- **Q71：PASS／任意改善済み。** 理由5の末尾だけを「排気側の温度・エンタルピー交換効率とは区別します。」へ変更。排気側の温度・エンタルピー変化に基づく効率は正当な指標で、回収熱量そのものとは異なります。流量の小さい側でエンタルピー変化が大きくなる説明とも整合します。[ASHRAE第26章](https://handbook.ashrae.org/handbooks/S20/SI/S20_Ch26/S20_ch26_si.aspx)
- **変更なし・前回PASS維持：** Q61 PASS、Q63 PASS、Q66 PASS、Q67 PASS、Q69 PASS、Q70 PASS、Q72 PASS、Q73 PASS。

現在のJSON SHA256：
```text
e7efd38279d76784368e2b5b0084bb18a13bfe8c1bb50e8981a5c4f1bc29a729
```

**B：[2024-am-082-090.json](C:/Users/kanet/20260522/wt-LQ4B/data/qualification-staging/lq4c-biru-kan/2024-am-082-090.json) — PASS**

比較元は `reports/lq4d-20261104/reviewed-manuscripts/review12-before-fixes.json`。差分は **Q82 `choiceExplanations["3"]` のみ**です。

- **Q82：PASS／必須修正済み。** 現文は「使用開始時及び使用開始後、1か月以内ごとに1回、定期に汚れの状況を点検します。点検間隔の上限を定める規定です。」。施行規則第3条の18第2号と整合し、回数の上限ではなく間隔の上限を明示しています。法令には必要に応じた清掃・換水等と、1か月を超える不使用期間の例外もありますが、今回の説明はこれらを否定していません。[厚生労働省・施行規則](https://www.mhlw.go.jp/web/t_doc_keyword?dataId=79073000&dataType=0&mode=0&pageNo=1)
- **変更なし・前回PASS維持：** Q83 PASS、Q84 PASS、Q85 PASS、Q86 PASS、Q87 PASS、Q88 PASS、Q89 PASS、Q90 PASS。

現在のJSON SHA256：
```text
de498bbdbac7ac33fb9afeb6344ebf6977a3d9b544eb0442e9098eec304fde75
```

**図版実体：両方PASS・変更なし。** 現在のPNGを実際にハッシュ計算し、比較元JSONの宣言値および前回レビューの実測値と一致しました。図版メタデータも同一です。

Q68：
```text
6fa57f05e504c06f7621097b96ee5242a79e6a22e02e687c37684985415a1988
```

Q85：
```text
331553caec2788fc71bc43420963c938927697127836bde7f243ef9d443ae50b
```

追加の必須修正はありません。部分ステージングの再レビューに限定し、編集・コミット・公開・登録は行っていません。