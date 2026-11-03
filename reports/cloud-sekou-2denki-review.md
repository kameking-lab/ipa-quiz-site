# sekou-2denki 独立レビュー(1回目: FAIL)

HEAD `1ad5b51` を指定PDF・巻末の公式正答と独立照合しました。コード変更はありません。

確認できた問題点は次のとおりです。

1. **令和7年度後期 No.19：解説が公式正答と矛盾。**  
   公式正答は2ですが、選択肢4の解説が「250 V系接地極付20 A」と説明し、4を正しいとしています。選択肢2の解説も、正しい理由を説明していません。  
   [該当箇所](/home/user/ipa-quiz-site/data/questions/denki2/2025-late.json:503)／公式PDF p.8・29。

2. **同 No.19：選択肢4の補足文が原図と不一致。**  
   原図は左右とも横スリットですが、追加テキストは「左が兼用スリット」となっています。  
   [該当箇所](/home/user/ipa-quiz-site/data/questions/denki2/2025-late.json:494)／公式PDF p.8。

3. **同 No.22：解説が設問・正答と矛盾。**  
   「最も関係のないもの」の公式正答は3「地絡電流」ですが、解説は「地絡電流を検討する」と肯定しています。選択肢4の解説も、4を除外する方向の説明になっています。  
   [該当箇所](/home/user/ipa-quiz-site/data/questions/denki2/2025-late.json:583)／公式PDF p.10・29。

4. **同 No.54：解答を挿入する空欄が欠落。**  
   原本の「10 kW以上〔空欄〕未満」が、JSONでは「10 kW以上\n未満」になっています。明示的な空欄記号が必要です。  
   [該当箇所](/home/user/ipa-quiz-site/data/questions/denki2/2025-late.json:1417)／公式PDF p.25。

5. **令和8年度前期 No.3：図の右端が欠けている。**  
   抵抗値「30 Ω」のΩが切れています。本文にも値があるため解答は可能ですが、原図の再現として不完全です。  
   [対象画像](/home/user/ipa-quiz-site/public/questions/denki2/2026-early/q3-official-figure.png)／公式PDF p.3。

6. **令和7年度後期 No.1：単位の指数表記が未復元。**  
   原本の `℃⁻¹` が `℃－1` となり、逆数の単位であることが不明瞭です。  
   [該当箇所](/home/user/ipa-quiz-site/data/questions/denki2/2025-late.json:17)／公式PDF p.2。

その他の確認結果です。

| 確認項目 | 結果 |
|---|---|
| 問題数 | 各回No.1〜62、計124問。欠番・重複なし |
| 正答番号 | **124問すべて公式正答と一致** |
| 全選択肢の解説 | 504肢すべて存在。ただし上記の内容不備あり |
| 図 | 前期7件・後期14件、計21件存在。上記切り抜き不備あり |
| 出典URL | 全問に公式問題・正答URLあり。公式PDFへ到達可能 |
| PDF同一性 | 指定ローカルPDFのSHA-256と登録値が一致 |
| 法令の出題時点 | 法令・規程・規格を明示する50問すべてに「出題時点」の注記あり |

照合元：[令和8年度前期公式PDF](https://www.fcip-shiken.jp/pdf/r08_2dgz_mondai.pdf)、[令和7年度後期公式PDF](https://www.fcip-shiken.jp/pdf/r07_2dg_mondai.pdf)。

**FAIL**