**FAIL — 修正必須2件（3演習）。正答の変更は不要です。**

1. **2025年・電気 問15／slot C／`explanation`**  
   [2025-electric-q15.json:624](C:/Users/kanet/20260522/wt-energy-kanri/data/questions/energy-kanri/2025-electric-q15.json:624)  
   「光束法 `E=ΦNUm`」は面積の分母が欠落しています。正しくは **`E=ΦNUm/A`（A=8×12 m²）**。後続の数値代入は正しく、`U=2/3`、記入値 **6.7** は公式解答と一致します。

2. **2025年・共通 問1／slot 6・7／選択肢カの解説**  
   [slot 6:333](C:/Users/kanet/20260522/wt-energy-kanri/data/questions/energy-kanri/2025-common-q01.json:333)、[slot 7:400](C:/Users/kanet/20260522/wt-energy-kanri/data/questions/energy-kanri/2025-common-q01.json:400)  
   「他の者に供給された」を「**他者からの供給**」と説明しており、供給方向が逆です。「**他者への供給**」に修正が必要です。原典PDFの該当文・解答群を目視確認しました。正答のウ・アは維持できます。

実際の確認範囲：

- **以前の57原問を含む全62原問・837演習**の`explanation`837件、`choiceExplanations`4,638件を全文確認。同一文章は重複をまとめて読みました。除外1枠の解説・全5肢も確認しました。
- 全演習の登録解答を`official-answers.json`と照合。桁区切り表記を除いて一致。公式解答PDFの抽出テキストも照合し、抽出順等の差は画像で確認しました。
- ローカル**28 PDFのSHA256は全件一致**。出典の掲載元は[ECCJ過去問題](https://www.eccj.or.jp/mgr1/test_past/)と[第48回標準解答](https://www.eccj.or.jp/mgr1/test/answer.html)で確認しました。
- 原典目視は**問題14ページ＋解答4ページ＝18ページ**。両年・全14問題パケットから各1ページを確認しました。問題PDFのページ番号は、r07のpacket 1～7順に **4・3・3・14・2・8・21**、r08は **2・3・8・13・3・9・9**。
- 全員正解枠（2026電気問8・slot 8）は公式通知と一致。原文の相電圧を使う計算結果は**243.562…W**で、選択肢に一致しません。`answer`なし、`publicAllowed=false`を確認しました。

**限界：** 原典全ページの逐語照合、全計算の独立再計算、全図表・前提の完全性保証はしていません。画像参照52点の存在と、疑わしい図参照の前提を確認しましたが、目視は上記の標本範囲です。新しい登録・採点実装とテスト結果は判定対象外です。

ファイル編集・保存、commit、push、deploy、main操作、委任は行っていません。