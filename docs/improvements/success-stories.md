# Success Stories Feature

Branch: `feat/success-stories`
Worktree: `.claude/worktrees/affectionate-moore-8c420b`
Started: 2026-05-17

## Goal

- 受験生のモチベーション向上
- ロングテールSEO獲得（13区分 × 多様な合格体験談）
- 内部リンク強化（quiz/blog/essays への導線）

## Scope

13 試験区分 × 3-5 本 = 40-65 本の合格体験記事。
各記事はペルソナ・勉強法・数値・反省点を含む。

## Architecture

- データ: `data/success-stories/` (TS-based、blog と同パターン)
- ライブラリ: `lib/success-stories/`
- ページ: `app/success-stories/[category]/[slug]`
- SEO: JSON-LD (Article), sitemap priority 0.6
- 内部リンク: quiz サイドバー、related-content、sitemap

## Phase Status

- [x] Phase 0: 監査・分岐セットアップ
- [ ] Phase 1: 型定義 + 全記事生成
- [ ] Phase 2: ページ実装
- [ ] Phase 3: 内部リンク・sitemap 統合
- [ ] Phase 4: 検証スクリプト

## Decisions

- MDX ではなく TS-based content（既存 blog/essays と同構成、依存追加なし）
- LLM 直叩き呼び出しスクリプトは作らず、コンテンツは事前生成済みとして commit
- テストは vitest 未導入のため tsx-based 検証スクリプトで代替（`audit-essays.ts` パターン）
