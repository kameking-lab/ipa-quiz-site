FAIL — LQ4G独立内容レビュー

対象は新規3稿（group2・group3・group5）の**18原問・全90肢理由・添付図7点**。既存受入済み原稿は内容レビュー対象外です。

**必須修正：2件**

1. **5-4：解説と肢別理由が公式正答と矛盾**
   [2024-basis-group5.json:154](C:/Users/kanet/20260522/wt-LQ4E/data/qualification-staging/lq4e-engineer-first/2024-basis-group5.json:154)
   
   公式正答は④（14%）。`officialAnswer: 4`と選択肢の転記は正しい一方、解説は「正答は3」「約7%」、肢③を適切、肢④を過大としています。一次エネルギー供給を分母とする設問に合わせ、解説と全5肢理由を④・約14%に整合させる必要があります。公式正答を③へ変更してはいけません。なお、指定資料には統計の内訳表がないため、内訳からの再集計は未実施です。

2. **5-3：図の代替文でC・Dの塗り分けが逆**
   [2024-basis-group5.json:127](C:/Users/kanet/20260522/wt-LQ4E/data/qualification-staging/lq4e-engineer-first/2024-basis-group5.json:127)
   
   現在の「Cは灰、Dは白」は、原典・添付PNGと不一致です。正しくは**Cが白、Dが灰色の網掛け**。エネルギー種別の対応、数値、正答②は正しく転記されています。

**任意改善**

- 2-5・3-6・5-2の切り出し画像には、周辺本文や選択肢の断片が入っています。図・数式の必要部分は保持されていますが、余白と切り出し境界を整えると明瞭になります。
- 5-3はグラフ本体・数値・凡例・軸を保持していますが、原典の図題も含めると出典図との対応が明確になります。

**確認結果**

- 本文・全選択肢・数式について、上記以外に意味を変える転記誤りや欠落は認めませんでした。
- 全18問の`officialAnswer`は公式正答表と一致。出典ページ、原典PDFのSHA256、図7点のSHA256も整合しています。
- 図7点と原典対象13ページを実際に開き、図本体の切断がないことを確認しました。
- 2-5は独立計算で \(M^3=[[-1,2],[2,-3]]\)。別解 \((-3,5)\)もベズー等式を満たしますが、指定行列の係数ではないという説明は妥当です。
- 3-4は両端ピン・固定ピン・固定自由として \(P_b>P_a>P_c\)。3-5の等価ばね定数は \(2k,2k,k/2\)、3-6は \(2/3\,Ω\)。5-2の割合・収支も再計算して一致しました。
- `node scripts/validate-lq4e-staging.mjs --sources`はPASS。ただし、上記の解説矛盾・代替文誤りは同検証では検出されません。

レビュー対象の現物SHA256：

| 原稿 | SHA256 |
|---|---|
| 2024-basis-group2.json | `8d87a7cb00b354cbd0e1486447b72912d642f40f99116b798454f26a6b0b6293` |
| 2024-basis-group3.json | `0c4dadb015df4dbdc814b9803ef932864ceafc8cc2a45298b4c39f84f69d119f` |
| 2024-basis-group5.json | `cfe6c01885a5b4a6e143208bebd78515dfd2f9c0fb8a413cd0d3425cd652ee2a` |

照合原典：問題PDFの6～14・17～20ページ、および正答PDFの1ページ。
:codex-file-citation{path="C:/Users/kanet/AppData/Local/Temp/codex-work/lq4b-sources/gijutsushi1-kikai-2024-basis.pdf" purpose="source"}
:codex-file-citation{path="C:/Users/kanet/AppData/Local/Temp/codex-work/lq4b-sources/gijutsushi1-kikai-2024-answer.pdf" purpose="source"}

ファイル書込み・編集・コミット・ネットワークアクセスは行っていません。