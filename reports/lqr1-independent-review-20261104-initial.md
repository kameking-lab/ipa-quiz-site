FAIL — jokaso の全160問を確認し、修正が必要な点を2件確認しました。

- **公式正答：2025年度80/80問、2026年度80/80問一致。** 公式解答PDFを独立抽出して照合しました。
- **確認範囲：** 問題160問、選択肢800肢、全肢解説800件、数式・表、図版20点。図版は公式PDFの対応範囲と一致。
- **公開ガード：** 未公開を維持。公開一覧・問題取得経路への混入なし。既存資格の登録処理にも今回の差分による破損は確認されませんでした。

1. **[P2] 2025年度問56：ろ材容量の計算に使う高さが誤り。**  
   [2025.json:1368](/C:/Users/kanet/20260522/wt-LQR1-jokaso/data/questions/jokaso/2025.json:1368) は `1.150−0.500` を使用していますが、原図のろ材範囲は **Z3−Z5＝1.000−0.300 m**。`0.570×1.000×0.700＝0.399 m³` に修正してください。選択肢4の解説と総合解説にも同じ誤りがあります。正答2（0.4 m³）は変わりません。根拠：午後PDF12ページ（冊子9ページ）。  
   :codex-file-citation{path="C:/Users/kanet/Documents/Codex/2026-11-02/task-2/lqr1-evidence/jokaso/sources/202510290844538653.pdf" purpose="source"}

2. **[P2] 2026年度問21：誤答肢の解説が実質的な説明になっていない。**  
   [2026.json:508](/C:/Users/kanet/20260522/wt-LQR1-jokaso/data/questions/jokaso/2026.json:508) の選択肢2〜5は「揚程と一致しない」の反復です。原図で各矢印が示す水面・給気位置・吸込口・吐出位置の組み合わせを明示し、揚程との違いを説明してください。根拠：午前PDF15ページ（冊子11ページ）。  
   :codex-file-citation{path="C:/Users/kanet/Documents/Codex/2026-11-02/task-2/lqr1-evidence/jokaso/sources/202610261619542501.pdf" purpose="source"}

正答照合に使用した原本：  
:codex-file-citation{path="C:/Users/kanet/Documents/Codex/2026-11-02/task-2/lqr1-evidence/jokaso/sources/202510290902046152.pdf" purpose="source"}
:codex-file-citation{path="C:/Users/kanet/Documents/Codex/2026-11-02/task-2/lqr1-evidence/jokaso/sources/202610280936067724.pdf" purpose="source"}

検証限界：ブラウザー表示・全回帰テスト・解説の全記述に対する外部専門資料での裏付けは未実施です。公開ガードはメモリ内実行で確認しました。ファイル変更なし、作業ツリーはクリーンです。