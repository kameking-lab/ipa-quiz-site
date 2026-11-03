| 対象 | 判定 |
|---|---|
| nuclear2024 全35問・175理由 | **FAIL：残件あり** |
| applied-science2024 表記変更のみ | **PASS** |
| 統合テストの件数更新 | **PASS（静的照合）** |

核・放射線の残件は次のとおりです。

- **Q11⑤**：[原稿150行](/C:/Users/kanet/20260522/wt-LQ3D/reports/LQ3D-20261104/manuscripts/pe-first-nuclear-2024.json:150)の「Gまでは合う」が誤り。原本⑤は `2/(s²+5s+6)`、正しくは `2s/(s²+5s+6)` です。⑤はGの分子から誤っています。
- **Q22③・要約**：[原稿301行](/C:/Users/kanet/20260522/wt-LQ3D/reports/LQ3D-20261104/manuscripts/pe-first-nuclear-2024.json:301)の `1600/4.5×10⁹` は `1600/(4.5×10⁹)` に修正が必要です。また①の「95g」は原本の **950g** と不一致です。配信JSONにも同じ記載があります。

前回必須だった **Q18②・⑤・要約、および負の指数表記は修正済み**。アラニンのラジカルをESRで測る説明も[一次資料](https://atomica.jaea.go.jp/dic/detail/dic_detail_1293.html)と一致します。

確認結果：

- 核：全24ページを目視照合。正答 **35/35**、原稿・配信理由 **175/175一致**。両PDF・原稿・配信JSON・24画像のSHA-256一致、画像は原本再描画と **24/24画素一致**。
- 応用科学：変更は **Q3・Q16の指数表記のみ**。原本・前回PASSと整合し、更新pinsも一致。
- 統合：独立した `lq3dManifest` の加算は適切。**33セット・1155問・採点対象1154問**。LQ3C基準の779ファイルは不変。テスト実行は今回行っていません。

原本：:codex-file-citation{path="C:/Users/kanet/20260522/wt-LQ3D/reports/LQ3B-20261104/sources/2024-20.pdf" purpose="source"} :codex-file-citation{path="C:/Users/kanet/20260522/wt-LQ3D/reports/LQ3B-20261104/sources/2024-17.pdf" purpose="source"} :codex-file-citation{path="C:/Users/kanet/20260522/wt-LQ3D/reports/LQ3B-20261104/sources/answers-2024.pdf" purpose="source"}

読み取り専用で実施し、ファイル変更・秘密情報・設定・環境変数の参照はありません。