# senmon-chori（専門調理師・調理技能士 6区分）状況（W5, 2026-11-06）

**進捗なし（原本PDFが揃わないため作成できない）。** ローカル `C:/Users/kanet/20260522/wt-LQ2B`（`qual/LQ2B-20261104`、未push）は
読み取りのみで参照し、変更していない。同 worktree の成果は「公式索引の保存・24URLの特定・未取得一覧」だけで、完成原問0・取得PDF0。

- 通常GETは 2026-11-04 に全24件で HTTP 403（1件 URLError）。本ランではボット拒否を迂回しないため再取得を試みていない。
- `origin/ops/source-pdfs-20261104/senmon-chori/browser/` に Chrome 取得済みが1本だけある：
  R08_gakka_mondai_sushi.pdf（SHA-256 31d45e41f40201867da46990b4531c3adec6b7cdc0cf0d25fe30b7904a67d8c8）。正答PDFがないため単独では作れない。

## ブラウザ取得が必要なURL（23件。すし2026問題は取得済み）

すし・中国・給食用特殊料理 = 前期、日本・西洋・麺料理 = 後期。全て学科。

| 区分 | 回 | 問題 | 正答 |
|---|---|---|---|
| すし | 2026前期 | （取得済み） | https://chouri-ggc.or.jp/cms/wp-content/uploads/2026/08/R08_gakka_kaitou_sushi.pdf |
| 中国 | 2026前期 | https://chouri-ggc.or.jp/cms/wp-content/uploads/2026/08/R08_gakka_mondai_chuugoku.pdf | https://chouri-ggc.or.jp/cms/wp-content/uploads/2026/08/R08_gakka_kaitou_chuugoku.pdf |
| 給食用特殊 | 2026前期 | https://chouri-ggc.or.jp/cms/wp-content/uploads/2026/08/R08_gakka_mondai_kyuusyoku.pdf | https://chouri-ggc.or.jp/cms/wp-content/uploads/2026/08/R08_gakka_kaitou_kyuusyoku.pdf |
| 日本 | 2025後期 | https://chouri-ggc.or.jp/cms/wp-content/uploads/2026/01/R07_nihon_mondai.pdf | https://chouri-ggc.or.jp/cms/wp-content/uploads/2026/01/R07_nihon_gakka_kaitou.pdf |
| 西洋 | 2025後期 | https://chouri-ggc.or.jp/cms/wp-content/uploads/2026/01/R07_seiyou_mondai.pdf | https://chouri-ggc.or.jp/cms/wp-content/uploads/2026/01/R07_seiyou_gakka_kaitou.pdf |
| 麺 | 2025後期 | https://chouri-ggc.or.jp/cms/wp-content/uploads/2022/01/R07_men_mondai.pdf | https://chouri-ggc.or.jp/cms/wp-content/uploads/2022/01/R07_men_gakka_kaitou.pdf |
| すし | 2025前期 | https://chouri-ggc.or.jp/cms/wp-content/uploads/2025/08/R07_gakka_monndai_sushi.pdf | https://chouri-ggc.or.jp/cms/wp-content/uploads/2025/08/R07_gakka_kaitou_sushi.pdf |
| 中国 | 2025前期 | https://chouri-ggc.or.jp/cms/wp-content/uploads/2025/08/R07_gakka_mondadi_chuugoku.pdf | https://chouri-ggc.or.jp/cms/wp-content/uploads/2025/08/R07_gakka_kaitou_chuugoku.pdf |
| 給食用特殊 | 2025前期 | https://chouri-ggc.or.jp/cms/wp-content/uploads/2025/08/R07_gakka_mondai_kyuusyoku.pdf | https://chouri-ggc.or.jp/cms/wp-content/uploads/2025/08/R07_gakka_kaitou_kyuusyoku.pdf |
| 日本 | 2024後期 | https://chouri-ggc.or.jp/cms/wp-content/uploads/2025/01/R06_nihon_mondai.pdf | https://chouri-ggc.or.jp/cms/wp-content/uploads/2025/01/R06_niho_gakka_kaitou.pdf |
| 西洋 | 2024後期 | https://chouri-ggc.or.jp/cms/wp-content/uploads/2025/01/R06_seiyou_monndai.pdf | https://chouri-ggc.or.jp/cms/wp-content/uploads/2025/01/R06_seiyou_gakka_kaitou.pdf |
| 麺 | 2024後期 | https://chouri-ggc.or.jp/cms/wp-content/uploads/2025/01/R06_men_mondai.pdf | https://chouri-ggc.or.jp/cms/wp-content/uploads/2025/01/R06_men_gakka_kaitou.pdf |

URL の綴り（monndai・mondadi・niho 等）は公式索引どおり。台帳の優先範囲は上6行（2026前期3区分・2025後期3区分）。
取得後は `origin/ops/source-pdfs-20261104/senmon-chori/browser/` に置けば、組ごとに SHA 固定→転記→公式正答照合→全肢解説→独立レビューで再開できる。
