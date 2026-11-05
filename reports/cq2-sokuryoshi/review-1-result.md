**FAIL**。公式正答・原問と矛盾する解説を7件確認しました。画像正本方式や `needsReview=true` が理由のFAILではありません。

1. **2026午前 No.20：正答を否定している。**  
   [2026.json:1714](C:/Users/kanet/20260522/wt-sokuryoshi/data/qualification-staging/sokuryoshi/2026.json:1714)  
   公式正答は肢3ですが、解説は「45度以上」を否定し、肢5を正答扱いしています。肢5の原文は「標高値」ではなく「数値写真」です。入射角45度以上を基準に全肢を修正してください。[公式正答](https://www.gsi.go.jp/common/000278971.pdf)

2. **2026午前 No.27：式と計算結果が不一致。**  
   [2026.json:2339](C:/Users/kanet/20260522/wt-sokuryoshi/data/qualification-staging/sokuryoshi/2026.json:2339)  
   `74/(2√3+1)` は約16.576mで、33.153mにはなりません。正しくは `148/(2√3+1)`。また、図の150度は∠PABの外角で、∠PABは30度です。座標設定・導出・肢2の説明を修正してください。

3. **2025午後 No.3 問A：小問と解説の取り違え。**  
   [2025.json:2758](C:/Users/kanet/20260522/wt-sokuryoshi/data/qualification-staging/sokuryoshi/2025.json:2758)  
   正しい対応は A-1＝コース間隔1820m、A-2＝8コース、A-3＝248枚、A-4＝撮影高度2100m。現状はA-1に2100m、A-3に1820m、A-4に別問B-4の3460mを説明しています。小問単位で再対応が必要です。[公式解答例・5ページ](https://www.gsi.go.jp/common/000271324.pdf#page=5)

4. **2026午後 No.3 問C-1(a)：公式の正誤と逆。**  
   [2026.json:2786](C:/Users/kanet/20260522/wt-sokuryoshi/data/qualification-staging/sokuryoshi/2026.json:2786)  
   原問の「較差平均の絶対値25cm以上では上下の一律シフトで補正する」は公式解答で○です。解説の「一律シフトで済ませず再計測等」はこれを否定しています。原問の条件に沿って修正してください。[公式解答例・6ページ](https://www.gsi.go.jp/common/000279272.pdf#page=6)

5. **2026午後 No.1 問D-2：問われた利点に答えていない。**  
   [2026.json:2545](C:/Users/kanet/20260522/wt-sokuryoshi/data/qualification-staging/sokuryoshi/2026.json:2545)  
   問いは「準則を準用する利点」です。「新技術を用いないなら改正不要」ではなく、新技術を公共測量に用いる際に独自の作業規程を作らなくてよい点を説明してください。[公式解答例・2ページ](https://www.gsi.go.jp/common/000279272.pdf#page=2)

6. **2025午後 No.2 問A-4：別の内容を説明。**  
   [2025.json:2643](C:/Users/kanet/20260522/wt-sokuryoshi/data/qualification-staging/sokuryoshi/2025.json:2643)  
   問いは点検路線の選定条件です。閉合差と許容値の比較ではなく、「既知点同士を結合」「全既知点を少なくとも1つの点検路線で結合」の説明が必要です。[公式解答例・3ページ](https://www.gsi.go.jp/common/000271324.pdf#page=3)

7. **2025午後 No.2 問B-3：距離が10倍違う。**  
   [2025.json:2655](C:/Users/kanet/20260522/wt-sokuryoshi/data/qualification-staging/sokuryoshi/2025.json:2655)  
   「15kmで6mm」は「**1.5kmで6mm**」の誤りです。条件から `2mm/年 × 20年 × 距離/10km` と導出し、不要な方向ベクトルの説明も改めてください。[公式解答例・3ページ](https://www.gsi.go.jp/common/000271324.pdf#page=3)

修正は生成済みJSONだけでなく、元の [2026-am-notes.json](C:/Users/kanet/20260522/wt-sokuryoshi/data/qualification-staging/sokuryoshi/2026-am-notes.json) と [pm-notes.json](C:/Users/kanet/20260522/wt-sokuryoshi/data/qualification-staging/sokuryoshi/pm-notes.json) に反映する必要があります。

検証結果：

| 検査 | 結果 |
|---|---|
| 保存PDF 13件のSHA-256／186画像と144dpi描画の画素比較 | 一致 |
| 午前56問の正答番号と公式PDF | 一致 |
| 66問・280肢・午後103説明、非公開フラグ | 確認 |
| 公開ルート・レジストリ等への参照 | 検出なし |
| 専用validatorの直接実行 | `count=66, errors=[]` |
| Typecheck（増分書込み無効） | PASS |
| 通常CLI・関連Vitest | `spawn EPERM`で起動不可。PASS未確認 |

構造validatorは上記の内容誤りを検出しません。全問の正確性をPASSとは判定できません。監査はread-onlyで実施し、修正・commit・push・PR・deployは行っていません。