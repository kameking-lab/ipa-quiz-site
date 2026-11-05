前回7件は修正を確認しましたが、新規の不備3件があるため **FAIL** です。読み取り専用で実施し、ファイルは変更していません。

1. **2025午後 No.4 問B-4の解説が欠落。**  
   [pm-notes.json:134](C:/Users/kanet/20260522/wt-sokuryoshi/data/qualification-staging/sokuryoshi/pm-notes.json:134)、[2025.json:2904](C:/Users/kanet/20260522/wt-sokuryoshi/data/qualification-staging/sokuryoshi/2025.json:2904)  
   問B-3から問C-1へ飛んでいます。[原問26ページ](C:/Users/kanet/20260522/wt-sokuryoshi/data/qualification-staging/sokuryoshi/assets/000270176/06.webp)には、GISで異なる座標系のデータを正しく重ねる問B-4があります。座標系を合わせる説明を追加してください。現在の103説明では全小問を網羅できておらず、追加後は104説明になります。検証にも公式小問ラベルとの一致確認が必要です。

2. **2025午後 No.5 問B-1が、線形決定と中心線測量を混同。**  
   [pm-notes.json:147](C:/Users/kanet/20260522/wt-sokuryoshi/data/qualification-staging/sokuryoshi/pm-notes.json:147)、[2025.json:3022](C:/Users/kanet/20260522/wt-sokuryoshi/data/qualification-staging/sokuryoshi/2025.json:3022)  
   「主要点・中心点を現地へ設置」は中心線測量の説明です。[原問32ページ](C:/Users/kanet/20260522/wt-sokuryoshi/data/qualification-staging/sokuryoshi/assets/000270176/12.webp)に合わせ、路線選定の結果から交点位置を定めて線形図データファイルを作成し、条件点座標を放射法等で求める説明へ修正してください。空欄は「路線選定／線形図データファイル／放射」です。

3. **2025午後 No.5 問A-4で、要求された二方法の一方が未説明。**  
   [pm-notes.json:146](C:/Users/kanet/20260522/wt-sokuryoshi/data/qualification-staging/sokuryoshi/pm-notes.json:146)、[2025.json:3018](C:/Users/kanet/20260522/wt-sokuryoshi/data/qualification-staging/sokuryoshi/2025.json:3018)  
   [原問31ページ](C:/Users/kanet/20260522/wt-sokuryoshi/data/qualification-staging/sokuryoshi/assets/000270176/11.webp)は具体的方法を二つ要求しています。現状は点間距離を求める方法のみです。[公式解答例](C:/Users/kanet/20260522/wt-sokuryoshi/data/qualification-staging/sokuryoshi/assets/000271324/09.webp)に沿い、別の既知点から求めた座標値の較差による確認と、TS対辺測定距離と計算距離の較差による確認を説明してください。

前回指摘の再確認結果：

| 指摘 | 結果 |
|---|---|
| 2026午前20：UAV条件・正答肢 | 修正確認 |
| 2026午前27：外角・等積式 | 修正確認 |
| 2025午後3 A：小問対応 | 修正確認 |
| 2026午後3 C-1(a)：正誤 | 修正確認 |
| 2026午後1 D-2：準則準用の利点 | 修正確認 |
| 2025午後2 A-4：点検路線条件 | 修正確認 |
| 2025午後2 B-3：距離・変動量 | 修正確認 |

13PDFのSHA-256、186画像の画素一致、午前56問の公式正答、66問・280肢、非公開ガードを確認。専用validatorは `count=66, errors=[]`、型検査も成功しました。通常CLI・Vitestの再実行は `spawn EPERM` で起動不可でしたが、保存ログには成功記録があります。構造検証では上記の内容不備を検出できていません。

FAIL