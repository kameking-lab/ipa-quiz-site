前回の3件は修正を確認しましたが、新たに以下の不備があるため **FAIL** です。

1. **2026午前 No.28：肢2～4の解説が原問と不一致。**  
   [2026-am-notes.json:166](C:/Users/kanet/20260522/wt-sokuryoshi/data/qualification-staging/sokuryoshi/2026-am-notes.json:166)、[2026.json:2398](C:/Users/kanet/20260522/wt-sokuryoshi/data/qualification-staging/sokuryoshi/2026.json:2398)  
   肢2の誤りは「右岸又は左岸のいずれか」であり、正しくは**両岸**への設置です。解説は原問にない「河口方向」「堤防法線」を問題にしています。肢3の観測基準は距離標ではなく**水準基標**。肢4は**定期縦断測量・平地**の規定ですが、「定期横断測量・単断面」としています。[原問画像](C:/Users/kanet/20260522/wt-sokuryoshi/data/qualification-staging/sokuryoshi/assets/000278970/29.webp)と準則第663条・第668条に合わせて修正してください。

2. **2025午後 No.5 C-2：拡幅後の幅が半分。**  
   [pm-notes.json:154](C:/Users/kanet/20260522/wt-sokuryoshi/data/qualification-staging/sokuryoshi/pm-notes.json:154)、[2025.json:3050](C:/Users/kanet/20260522/wt-sokuryoshi/data/qualification-staging/sokuryoshi/2025.json:3050)  
   解説の「中心線から左右各6m」は、[原問35ページ](C:/Users/kanet/20260522/wt-sokuryoshi/data/qualification-staging/sokuryoshi/assets/000270176/15.webp)の「片側それぞれ12m」と矛盾します。左右各12mの境界線を用いた杭の数え方へ修正してください。

3. **2026午後 No.1 A：問われていない条文を説明。**  
   [pm-notes.json:6](C:/Users/kanet/20260522/wt-sokuryoshi/data/qualification-staging/sokuryoshi/pm-notes.json:6)、[2026.json:2513](C:/Users/kanet/20260522/wt-sokuryoshi/data/qualification-staging/sokuryoshi/2026.json:2513)  
   測量業の定義や測量士補の役割を説明していますが、[原問](C:/Users/kanet/20260522/wt-sokuryoshi/data/qualification-staging/sokuryoshi/assets/000278972/03.webp)の空欄は「測量の基礎／測量成果／測量記録／基本測量以外の測量／測量士」です。各空欄の条文上の意味と選択理由を説明してください。

4. **2025午後 No.1 A：11空欄に対応する説明が不足。**  
   [pm-notes.json:80](C:/Users/kanet/20260522/wt-sokuryoshi/data/qualification-staging/sokuryoshi/pm-notes.json:80)、[2025.json:2505](C:/Users/kanet/20260522/wt-sokuryoshi/data/qualification-staging/sokuryoshi/2025.json:2505)  
   [原問](C:/Users/kanet/20260522/wt-sokuryoshi/data/qualification-staging/sokuryoshi/assets/000270174/03.webp)の中心である、費用の負担・補助、測量の重複排除、正確さ、測量の定義等を説明せず、基本測量の主体や測量士補など別の内容を挙げています。実際の11空欄に対応する解説へ改めてください。

5. **2026午後 No.1 B-3(1)：回答の方向が逆。**  
   [pm-notes.json:9](C:/Users/kanet/20260522/wt-sokuryoshi/data/qualification-staging/sokuryoshi/pm-notes.json:9)、[2026.json:2525](C:/Users/kanet/20260522/wt-sokuryoshi/data/qualification-staging/sokuryoshi/2026.json:2525)  
   [原問](C:/Users/kanet/20260522/wt-sokuryoshi/data/qualification-staging/sokuryoshi/assets/000278972/05.webp)は「情報流出の原因となりうる具体的な行為」を求めています。解説の予防措置ではなく、例えば「セキュリティ対策の施されていないパソコンの使用」と、その危険性を説明してください。

確認できた事項は、13PDFのハッシュ、186画像の画素一致、午前56問の公式正答番号、66問・280肢・午後104節、公式小問見出しとの完全一致、非公開フラグです。公開側への参照も検出しませんでした。ただし、小問ラベルの一致だけでは上記の内容不備を検出できません。

型検査は成功しました。通常CLI・Vitestは `spawn EPERM` で起動不可でした。保存ログの成功記録とは区別し、今回の再実行成功とは扱っていません。UTF-8を明示して読み取り、ファイル変更や制約の迂回は行っていません。

FAIL