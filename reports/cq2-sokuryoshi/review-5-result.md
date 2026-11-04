新規の不備2件を確認しました。UTF-8を明示して読み取り専用で実施し、ファイルは変更していません。

1. **2026午後 No.5 C-1：主要な空欄の説明不足。**  
   [pm-notes.json:70](C:/Users/kanet/20260522/wt-sokuryoshi/data/qualification-staging/sokuryoshi/pm-notes.json:70)、[2026.json:3042](C:/Users/kanet/20260522/wt-sokuryoshi/data/qualification-staging/sokuryoshi/2026.json:3042)  
   [原問41ページ](C:/Users/kanet/20260522/wt-sokuryoshi/data/qualification-staging/sokuryoshi/assets/000278973/18.webp)のウ「近赤外」、エ「透過」が未説明です。近赤外レーザは水中をほとんど透過せず、緑色レーザは透過しやすいため測深に使う、という選択理由を追加してください。

2. **2025午後 No.3 B-1：修正した説明が原文と一部不一致。**  
   [pm-notes.json:117](C:/Users/kanet/20260522/wt-sokuryoshi/data/qualification-staging/sokuryoshi/pm-notes.json:117)  
   [原問17ページ](C:/Users/kanet/20260522/wt-sokuryoshi/data/qualification-staging/sokuryoshi/assets/000270174/17.webp)は「レンズのブレ等」の自動補正ですが、解説は「レンズひずみ自動補正」としています。ブレ補正とレンズひずみ補正は別です。原問に合わせ、焦点距離の自動調整・ブレ補正を解除できる必要性を説明し、2025.jsonにも反映してください。

確認結果：13PDFのハッシュ、186画像の画素一致、午前56問の公式正答番号、午後104小問ラベルと生成文の一致を確認。公開側への参照は検出せず、専用validatorは `count=66, errors=[]`、型検査も成功しました。

通常CLI・Vitestは `spawn EPERM` で起動不可でした。保存ログの成功記録は確認しましたが、今回の再実行成功とは扱っていません。画像正本方式や `needsReview=true` は不合格理由ではありません。

FAIL