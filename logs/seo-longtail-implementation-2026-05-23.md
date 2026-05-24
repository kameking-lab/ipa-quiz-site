# SEO ロングテール 低工数施策 実装計画 — 2026-05-23

PR #313 で提案された 14 大項目から、以下の条件で 5 件を選定:
- 工数小（1 PR 内で完結、2-4 時間以内）
- 機能追加でなく既存ページの磨き込み
- 即 SEO 効果が見込める

## 選定理由

提案レポート 11 章（三層リンク強化）と 4 章（内部リンク構造最適化）の最も
低工数な部分: トップレベル コンテンツページの **BreadcrumbList JSON-LD +
可視 nav の追加**。Google SERP の breadcrumb 表示 + sitelinks 改善に直結。

## 実装対象（本 PR）

優先度高い順に 5 ページ:

1. `/about` — プロジェクト紹介ページ。トップ流入後の二次遷移多い
2. `/contact` — 問い合わせフォーム。bots からの index も狙う必要は無いが UX 改善
3. `/transparency` — 透明性レポート。外部リンク被リンク候補
4. `/recommended-books` — 参考書一覧。長期的にアフィリエイト動線
5. `/stats` — 公開ダッシュボード。コミュニティ被リンク候補

各ページに:
- 可視 breadcrumb `<nav aria-label="パンくずリスト">` を `<main>` 直下に追加
- `JsonLd` の `@graph` に `BreadcrumbList` ノードを追加（既存 JsonLd 未使用ページは新規追加）
- 既存 `/glossary` `/topics` の breadcrumb 実装パターンを踏襲

## 非対象（次タスク以降に持ち越し）

- LP 大量生成（300+ ページ） — 教育貢献路線判断が必要
- 試験別 FAQ（13 ページ追加） — 元データ収集が必要で 2-4h を超える
- 関連問題サジェスト（既存 14,000 問へ影響） — 既に `/q/.../page.tsx` に `related` あり
- ブログ ⇔ 問題 相互リンク — 既に `getRelatedBlogPosts` 実装あり

## 実装後の確認

- `pnpm typecheck` / `pnpm lint` / `pnpm build` 全緑
- 各ページの HTML を確認し、JSON-LD と可視 nav の両方が出力されることを目視確認
