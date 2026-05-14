# Status Audit Report — 2026-05-14

Dispatch: status-audit-and-execute
Worktree: optimistic-ardinghelli-d7dee6
Branch base: origin/main HEAD = 3183039 (PR #193 merged)

---

## タスクX — AP 2023春期解説プレースホルダー再生成

判定: 完了

根拠:
- PR #190 (merged 2026-05-10 06:46) feat(data): AP 2023-2025 placeholder explanations regenerated (84 questions)
- PR #191 (merged 2026-05-10 10:42) feat(data): AP 2023-spring 15問の解説プレースホルダーを実解説に再生成
- PR #193 (merged 2026-05-10 11:33) fix(data): AP 2023-spring 9問の解説プレフィックスを修正
- 本番 curl https://www.kakomon-ai.jp/q/ap/2023-spring/am/q1 の出力に「解説は準備中」は0件

アクション: スキップ

---

## タスクY — SC 2023春期5業種合格答案の2,200字以上拡充

判定: 完了

根拠:
- PR #192 (merged 2026-05-10 10:46) regen: improve SC 2023 spring essays to ~2,200 chars with deeper analysis
- 本番 curl https://www.kakomon-ai.jp/essays/sc/2023-spring/pm2/q1 HTTP 200, レスポンスサイズ 36,878 bytes
- 5業種(IT/金融/建設/医療/公共)の字数検証は Phase 2 で実施

アクション: 字数検証のみ実施、再生成は不要

---

## タスクP1 — analytics組込状況調査

判定: 未起動

根拠:
- リモートに investigate/analytics-readiness ブランチが存在しない
- logs/analytics-readiness-report.md が main に存在しない

アクション: 本Dispatchで簡易調査レポートを logs/analytics-readiness-report.md に書く

---

## タスク大型 — /stats公開ダッシュボード

判定: 進行中(マージ前)

根拠:
- PR #194 OPEN, MERGEABLE
  feat: public /stats dashboard with GSC + PostHog + content integration
  - 追加ファイル: app/stats/{page.tsx, StatsCharts.tsx, ShareButtons.tsx}
  - app/api/stats/{gsc, posthog, content-count}/route.ts
  - lib/stats/{gsc, posthog, content-count}.ts
  - logs/gsc-setup-guide.md
  - .env.example 追記
  - 計 12 files / +1,322 行
- ただし以下の残作業があり、Dispatch要件未充足:
  1. .com 誤記5箇所 (ShareButtons.tsx, page.tsx ツイート文, lib/stats/gsc.ts コメント, logs/gsc-setup-guide.md 4箇所)
     正規ドメインは kakomon-ai.jp
  2. next.config.ts に旧 redirect "/stats" -> "/transparency#metrics" (permanent: true) が残存
     -> 本番で /stats が 308 で transparency に飛ぶ。新ページが見えない
  3. app/sitemap.ts に /stats が未登録
  4. header / footer に /stats 導線なし
  5. /transparency 内のモック表記の撤去と /stats 誘導の追加が未対応

アクション: 既存 PR #194 のブランチを更新して上記5件を解消、PRを再評価してマージ可能か検証

---

## 全体メモ

- 並列worktree状況: 別worktree (objective-fermat-41c827) に feat/public-stats-dashboard がチェックアウトされている。本Dispatchでは origin の同ブランチを別名でcheckoutしリモートをpushで更新する
- 5回程度のDispatchで「既存PR見落とし→再実装」の事故が頻発しているため、X/Yは新規実装せず本判定で打ち切り
