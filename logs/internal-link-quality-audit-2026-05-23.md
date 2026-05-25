# 内部リンク品質監査 (2026-05-23, phase 7 task ⑨)

タスク②（内部リンク網強化, PR #383）マージ後の最終検証。`scripts/audit-internal-links.ts`
を実行し、リンク密度・整合性・orphan・broken link・アンカー多様性を点検した。

## 監査ツールの精度修正（この PR に含む）

初回実行で 16 件の dead link が報告されたが、全件が `/features/{slug}` 等への
**誤検出**だった。`buildValidPaths()` がブログ・小論文・試験区分の slug は列挙して
いたものの、`FEATURE_LANDING_PAGES` / `KEYWORD_PAGES` / success-stories の動的 slug を
列挙していなかったため。これらの slug 列挙を追加し、監査を正確化した。

- 修正前: FATAL（dead link）16 件 / WARNING 2 件
- 修正後: **FATAL 0 件** / WARNING 2 件

## リンク密度（ブログ）

- 走査ブログ記事数: 153
- チェックした内部リンク総数: 995
  - 本文 markdown リンク: 511
  - relatedSlugs: 484
- 最多被リンク記事: `/blog/ipa-shiken-shakaijin-jikan-kakuho`（22 inbound）、
  `/blog/ipa-shiken-data-driven-revision`（21 inbound）

注: 本監査スクリプトはブログ→ブログ間のリンクのみを集計する。タスク②で追加した
`/q/* → /blog/*`（学習ガイド）と `/blog/* → /q/*`（この記事に関連する過去問）の
双方向リンクは別系統で、ここには含まれない（=実際の内部リンク密度はさらに高い）。

## broken link

- **0 件**（ツール精度修正後）。全内部リンクが有効な静的/動的ルートへ解決する。

## orphan page（被リンク 0 のブログ）

2 件:
- `/blog/goukakusha-shukan-review`
- `/blog/shaiin-bunkatsu-plan-3pattern`

ただしいずれも `/blog` 一覧ページから 1 ホップで到達可能であり、クロール上の真の
孤立ではない（severity 低）。さらに exam タグ付き記事はタスク②の `/q/* → /blog/*`
導線からも到達しうる。

推奨（次フェーズ・任意）: 関連記事の `relatedSlugs` にこの 2 記事を追記して
ブログ内相互リンクを補強すると、被リンク 0 を解消できる。本タスクは read-only 監査の
ため content 編集は行わず、推奨に留める。

## アンカーテキストの多様性

- 「こちら」「here」等の汎用アンカー 3 回以上の記事: **0 件**。
- 過度なキーワードスタッフィングは検出されず。アンカーは記事タイトル／文脈語で
  自然に分散している。

## nofollow 設定の妥当性

- 内部リンクに `rel="nofollow"` は付与していない（内部リンクは follow が正しく、
  オーソリティ循環を阻害しない）。
- 外部リンク（IPA 公式 PDF 等）は `target="_blank" rel="noopener noreferrer"` で、
  nofollow は付けていない（公式一次情報への信頼リンクとして妥当）。

## 結論

タスク②の内部リンク網は健全。broken link 0、汎用アンカー 0、nofollow 誤用なし。
唯一の軽微な指摘は orphan ブログ 2 件だが /blog 一覧から到達可能で SEO 上の実害は小さい。
監査スクリプト自体の誤検出（feature/keyword/success-story slug 未列挙）を是正したので、
今後の監査結果は正確になる。
