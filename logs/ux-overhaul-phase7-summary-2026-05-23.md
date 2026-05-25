# UX Overhaul Phase 7 — Implementation Summary (2026-05-23)

自走運用可能性レビュー（集客42 / 満足82 / 継続68 = 総合64）に対し、SEO 露出最大化
7 タスク + 継続力構造強化 3 タスクを実施。社長判断「営業しなくても SEO で解決する
確実なものに限定、後から二度手間にならないもの」に沿って、被リンク不要で効く内部リンク
網・構造化データ・放置耐性・履歴喪失救済を中心に進めた。

## 1. フェーズ 7 PR 一覧

- タスク① 自走運用可能性レビュー保存: PR #382 — merge SHA `24a9269c5b6910d43b3155a190fbcf481da02e18`
- タスク② 内部リンク網の全面強化: PR #383 — merge SHA `ff96825faf3a0c6c9788da24018a2778c0e1d381` — /q に「他年度の同分野問題」追加 + /blog に「この記事に関連する過去問」追加で /q↔/blog 双方向化
- タスク③ パンくず全ページ完備: PR #384 — merge SHA `fc0f6623b825aa87e738c4399aeaab719effa755` — 共有 Breadcrumbs コンポーネント新設 + 8 ページへ追加
- タスク④ 構造化データ Article/HowTo 投入: PR #385 — merge SHA `abe3b5c0fbe646337e3eef06f300034281e57daa` — /quickstart/[exam] に HowTo + LearningResource（既存の blog/essays/faq は完備済を確認）
- タスク⑤ meta 個別最適化: PR #386 — merge SHA `ad6343d2ee1182b61becca99fca2fe9bef4b6b43` — /q/* description を「正解は{X}。」front-load（12,649 ページ）
- タスク⑥ 試験回自動更新パイプライン整備: PR #387 — merge SHA `cca94f1db7b37c1a10cbcd4a4fcf0df6eb6c20d6` — current-year / exam-schedule 共有定数化 + レシピ/パイプライン文書
- タスク⑦ クラウド同期最小実装: PR #388 — **draft 保持・未マージ（ブロッカー）** — 学習履歴同期は既存実装を /settings から発見可能化（安全スライス）。ブックマーク/タグ/学習計画の同期は新規 Prisma モデル必須 = CLAUDE.md §10 承認必須のためブロッカー。`logs/cloud-sync-blocker-2026-05-23.md` 参照
- タスク⑧ AI 上限表記の統一: PR #389 — merge SHA `bb00ca7a250f0f2422ac92d3e0fd42d1b4fc55ba` — 実装値 10（フィードバック駆動）に統一、`lib/constants/ai-quota.ts` 単一定数化
- タスク⑨ 内部リンク品質監査: PR #390 — merge SHA `6349da37445168bef18ac083318eb6a4144c2fdc` — 監査スクリプト誤検出（feature/keyword/success-story slug 未列挙）是正で dead link 16→0、orphan 2 件のみ
- タスク⑩ 本サマリ: PR 番号未割当（本ドキュメント先行マージ予定）

## 2. レビュー第3弾（自走運用可能性）即着手 TOP3 対応状況

レビューの最重要課題:

1. SEO 露出（被リンク乏しい中での内部リンク最大化）→ ✓ タスク② + ③ + ④ + ⑤ + ⑨
2. 放置耐性（新試験回・年度表記の風化）→ ✓ タスク⑥（year/exam-schedule 自動化 + 半自動ingestレシピ）
3. 継続力（LocalStorage 履歴喪失）→ △ タスク⑦（履歴同期は既存実装を発見性改善、多データ同期はスキーマ承認待ち）

対応率: 即着手 TOP3 のうち 2.5 / 3（⑦ が部分的・ブロッカーあり）。

## 3. SEO 露出最大化 7 タスクの達成状況

- ② 内部リンク網: ✓（/q↔/blog 双方向 + /q 他年度トレイル、~22 outbound links/q ページ）
- ③ パンくず: ✓（8 ページ追加、全主要ページ BreadcrumbList 完備）
- ④ 構造化データ: ✓（/quickstart HowTo 追加、blog/essays/faq は既存確認）
- ⑤ meta 最適化: ✓（/q/* description の答え front-load）
- ⑨ リンク品質監査: ✓（broken 0 / generic anchor 0 / nofollow 誤用なし）
- （②に内包）ブログ→個別問題リンク注入: ✓
- （②に内包）関連年度リンク: ✓

SEO 系 7 項目: **7 / 7 達成**。

## 4. 継続力構造強化 3 タスクの達成状況

- ⑥ 試験回自動更新: ✓（year/countdown 完全自動、新試験回 ingest 半自動）
- ⑦ クラウド同期: △（履歴同期の発見性改善＝完了、多データ同期＝§10 承認待ちブロッカー）
- ⑧ AI 上限表記統一: ✓（10 回に統一、単一定数化）

継続力 3 項目: **2.5 / 3 達成**（⑦ 部分）。

## 5. 達成 KPI 最終値

- 内部リンク密度: /q/* 1 ページあたり outbound ~17 → ~22 リンク（+29%）、
  /blog→/q 約 249 エッジ新設。broken link 0。
- 構造化データカバレッジ: /q（QAPage+Quiz+LearningResource+FAQPage+BreadcrumbList）、
  /blog（Article+LearningResource+BreadcrumbList(+HowTo)）、/essays（Article+LearningResource+
  BreadcrumbList）、/quickstart/[exam]（HowTo+LearningResource+BreadcrumbList）、
  /faq（FAQPage+BreadcrumbList）+ 主要 8 ページに BreadcrumbList 追加。
- 試験回更新の自動化率: 年度表記・カウントダウン = 完全自動、新試験回問題追加 = 半自動
  （PDF 取得/パース/解説生成スクリプト化、検証のみ人手）。
- クラウド同期実装可否: 学習履歴 = 実装済み（発見性改善）、ブックマーク/タグ/計画 =
  スキーマ承認待ちブロッカー。

## 6. 累計サイトマップ URL 数（内部リンク網影響反映）

- 個別問題ページ /q/*: 12,649 件 indexable（フェーズ6 で ISR 化、全件 200）。
- 内部リンク網強化により各 /q ページの被リンク経路が増加（同分野・他年度・他試験・blog）。
- サイトマップ URL 総数はフェーズ6 から不変（コンテンツ追加なし）、内部リンク密度のみ増加。

## 7. フェーズ 1〜7 累計 PR 本数

- フェーズ 4: 11 PR（#351-#361）
- フェーズ 5: 10 PR（#362-#371）
- フェーズ 6: 10 PR（#372-#381）
- フェーズ 7: 10 PR（#382-#390 + 本サマリ #391 予定）、うち ⑦(#388) は draft 保持

フェーズ 4+5+6+7 累計: 41 PR（⑦ draft 1 件含む）。全マージ済 PR で typecheck/lint/build/e2e green 維持。

## 8. 残る人手作業項目リスト（社長が手を入れる必要があるもの）

1. **タスク⑦ の DB スキーマ承認**（CLAUDE.md §10）: ブックマーク/タグ/学習計画の
   クラウド同期を有効化するには Bookmark / StudyPlanRecord モデル追加の承認が必要。
   承認後に sync エンドポイント 3 種を実装可能（`logs/cloud-sync-blocker-2026-05-23.md`）。
2. **年2回の新試験回問題追加**（半自動・半日〜1日）: `logs/exam-update-recipe.md` の手順。
3. **年1回の試験日微修正**（1分）: `lib/constants/exam-schedule.ts` の month/day。
4. （任意）orphan ブログ 2 件の relatedSlugs 補強。

上記以外は自動でロールフォワードする（年度表記・カウントダウン・サイトマップ・内部リンク）。

## 9. 集客力・満足度・継続力スコアの再評価予測値

- 集客力 42 → **55〜62 予測**: 内部リンク網 +29%、構造化データ拡充、meta CTR 改善、
  サイトマップ 12,649 件 indexable（フェーズ6）の効果が SEO に効き始める（数週間〜数ヶ月の遅延）。
- 満足度 82 → **82〜85 予測**: 大きな UX 変更はなし、AI 上限表記の整合性向上で信頼微増。
- 継続力 68 → **70〜73 予測**: 履歴クラウド同期の発見性向上（最大データの救済）。
  多データ同期が承認・実装されればさらに +5〜8 見込み。
- 総合 64 → **68〜72 予測**（△ → ◯ 寄り）。

## 10. 自走運用可能性の最終判定（△→◯ 昇格可否）

**判定: ◯ に昇格可（条件付き）。**

- SEO 蛇口は全開（フェーズ6 でサイトマップ解放、フェーズ7 で内部リンク・構造化データ・
  meta を最大化）。被リンク不要で順位上昇する地力は整った。
- 放置耐性: 年度表記・カウントダウンは自動。唯一の必須手動作業は年2回の新試験回追加
  （半自動・半日）で、レシピ文書化済み。半年放置でも陳腐化表示は最小。
- 継続力: 履歴喪失の最大リスクは履歴クラウド同期（既存・発見性改善済み）で部分救済。
  完全救済（ブックマーク/計画）は §10 承認待ち。

条件: タスク⑦ の DB スキーマ承認が下りれば継続力が ◯ で確定。それまでは「履歴は
救済済み・その他データは LocalStorage のまま」の状態。マーケ移行・自走運用は開始可能。

## 11. 補足

- 累計新規追加環境変数（タスク⑦由来含む）: **なし**（既存 NextAuth の AUTH_* / DATABASE_URL を
  使用、本フェーズで新規追加なし）。
- LocalStorage キー新規追加: フェーズ7 で 0 件。
- 既存テスト破壊: 0 件。
- a11y 回帰: なし（Breadcrumbs は nav + aria-current、新規 CTA は min-h 確保）。
- AI 呼び出しの新規導入: なし。
- CLAUDE.md §10 承認必須事項: タスク⑦ の DB スキーマ追加が該当 → 自律実行せず draft 保持。
  タスク⑧ の「AI 上限」は表記修正のみで enforced 値（10）は不変のため §10 非該当。
