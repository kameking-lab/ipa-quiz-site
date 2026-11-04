FAIL — この35問のバッチには、修正必須の選択肢解説が1件あります。資格全体の完成判定ではありません。

全35問の本文・数式・全175選択肢・公式正答・総合解説・全175選択肢解説と、全22点の切出し図を確認しました。問題PDF全22ページの保存PNGは、原本PDFをメモリ内で再描画した画像と全ページで画素一致。切出し図22点も指定範囲の再描画・記録SHA256と一致しました。正答表3ページ目も原本と画素一致を確認しています。ファイル書込み・編集・コミット・ネットワークアクセスは行っていません。

**確認した問題**

- text：Ⅲ－7、8、11、12、13、16、23、25、27、30、32、34、35（13問、65解説）。
- figures：Ⅲ－1、2、3、4、5、6、9、10、14、15、17、18、19、20、21、22、24、26、28、29、31、33（22問、110解説）。

**修正必須**

1. **Ⅲ－20：`choiceExplanations["2"]`の誤答理由が誤り。**  
   「初期運動エネルギーを保存しません」とありますが、選択肢②は水平運動量と運動エネルギーの両方を保存します。
   \[
   \frac{K_{\mathrm{後}}}{K_{\mathrm{前}}}
   =2(2/7)^2+(-4/7)^2+(5/7)^2=1
   \]
   誤りは、摩擦のない45°斜面から受ける力積の方向と整合しない点です。接線方向の速度成分は保存されるため \(v_x+v_y=-v_0\) が必要ですが、②では \(v_x+v_y=v_0/7\) です。

   **修正文案：**「水平運動量と運動エネルギーは保存しますが、摩擦のない斜面では力積は法線方向に限られます。接線方向の条件 \(v_x+v_y=-v_0\) を満たさないため不適切です。」  
   公式正答③と総合解説は変更不要です。

**任意の改善**

- **Ⅲ－22の図：** 左端に本文の切れ端が混入しています。図1・図2を別々に切り出すと明瞭になります。必要な図、凡例、点A、軸ラベルは保持されています。
- **Ⅲ－2・33の図：** それぞれ左側固定壁の斜線、容器壁の上端が画像境界で切れています。解答に必要な情報は残っていますが、余白を拡張すると原図に忠実です。
- **Ⅲ－34の選択肢③解説：** 「2.92 mmは運動量厚さ \(7δ/72\) に相当する」と補足すると、誤答の理由がより具体的になります。

**Ⅲ－28の確認**

`officialAnswer: null`、`scoringException: "selected-question-full-credit"`は適切です。原図では低圧側が1・2、高圧側が4・3で、1→2は等圧過程です。本文との不整合を説明した現行解説と、本文に沿った仮定の下でのCOP導出は妥当です。通常の正答番号を設定する必要はありません。全35問の公式正答・採点例外は正答表と一致しました。

**実測SHA256**

- `2024-mechanical-text.json`  
  `583b2deb241b9f832ad76bd8d434eaa965ba84d955025cb26c8d393239749481`
- `2024-mechanical-figures.json`  
  `c14dc45a3cd06593e9847062b8a8cb08211576a815dc5387fa7d3bcaf7321226`

確認原稿：
:codex-file-citation{path="C:/Users/kanet/20260522/wt-LQ4E/data/qualification-staging/lq4e-engineer-first/2024-mechanical-text.json" purpose="source"}
:codex-file-citation{path="C:/Users/kanet/20260522/wt-LQ4E/data/qualification-staging/lq4e-engineer-first/2024-mechanical-figures.json" purpose="source"}

照合原本：
:codex-file-citation{path="C:/Users/kanet/AppData/Local/Temp/codex-work/lq4b-sources/gijutsushi1-kikai-2024-mechanical.pdf" purpose="source"}
:codex-file-citation{path="C:/Users/kanet/AppData/Local/Temp/codex-work/lq4b-sources/gijutsushi1-kikai-2024-answer.pdf" purpose="source"}