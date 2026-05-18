# Auto-Improve Bot — セットアップガイド

更新: 2026-05-18
対象: kameking-lab/ipa-quiz-site

---

## 概要

Claude Code の scheduled task として動作する自律 PR 生成ボット。
3 時間ごとに起動し、8 カテゴリから 1 つを選んで小規模改善 PR を作成する。
1 日の PR 上限は 8 件（Vercel Pro は 6000 builds/日なので余裕あり）。

---

## スケジュール設定

- Cron: `0 */3 * * *` (JST で 00:00 / 03:00 / 06:00 / 09:00 / 12:00 / 15:00 / 18:00 / 21:00)
- 1 日最大 8 回起動 = 最大 8 PR

---

## 8 カテゴリ厳格制約

| # | カテゴリ | 内容 |
|---|---------|------|
| 1 | typo | UI 文字列・コメントのスペルミス修正 |
| 2 | unused | 未使用 import・変数・コメントアウトコード削除 |
| 3 | jsdoc | export 関数への JSDoc 追加 |
| 4 | types | `any` 排除・型改善 |
| 5 | alt | `<img>` の alt 属性追加 |
| 6 | console | 本番コードの console.log 削除 |
| 7 | links | 内部リンクの修正・改善 |
| 8 | meta | ページメタデータ（title/description）改善 |

---

## 変更スコープ制約

- 変更ファイル数: 最大 3
- 総変更行数: 最大 100 行（追加＋削除）

---

## 禁止エリア

以下は絶対に変更禁止:

- `app/api/` — クリティカルな API ルート
- `lib/ai/` — LLM 抽象レイヤー
- `data/questions/` — 問題データ
- `package.json`, `pnpm-lock.yaml` — 依存関係
- `next.config.ts` — コア設定
- `.github/` — CI/CD 設定
- E2E テストファイル
- `CLAUDE.md`, `logs/`
- 主要ナビゲーションコンポーネント

---

## 日次 PR 追跡

`logs/auto-improve-history.json` に全 run の記録を保持。
各セッションの起動時に読み込み、今日の件数が 8 以上なら即スキップ。

---

## 安全機構

1. **日次上限チェック** — 起動直後にカウント確認
2. **ビルドゲート** — `pnpm typecheck && pnpm build` が通らなければ PR 不作成
3. **スコープ制約** — 3 ファイル・100 行を超えたら対象縮小
4. **禁止エリア** — 主要動線・API・データ層は対象外
5. **自動マージ** — CI 通過後に `gh pr merge --auto --squash`

---

## 緊急停止手順

1. Claude Code で scheduled task を disabled に変更
   - `schedule` スキル → 該当タスクの enable を false に
2. 動作中セッションがあれば Ctrl+C またはセッション終了
3. 残存ブランチ確認: `git branch -r | grep auto/improve`
4. 不要ブランチ削除: `gh pr close <番号> && git push origin --delete auto/improve-...`

---

## 再起動手順

1. `logs/auto-improve-history.json` の今日の count が 8 未満を確認
2. Claude Code で scheduled task を enabled に変更
3. 手動実行で動作確認してから cron に戻す

---

## Vercel Pro 制限との関係

| 指標 | Hobby | Pro | 本 bot の消費 |
|------|-------|-----|--------------|
| builds/日 | 100 | 6000 | 最大 8 |
| 安全マージン | 8% | 0.13% | 十分余裕あり |

Vercel Pro 化前に block 発生した理由:
2026-05-16 に 65+ PR が 1 日でマージされ、Preview + Production build が 100 を超過。
Pro 化後は 6000 builds/日 のため本 bot（8 PR/日）では問題なし。

---

## Vercel block 再発防止

- PR 上限 8 件/日 は変更禁止（レビュー追従性の観点でも上限）
- bot 以外の手動 PR が多い日は bot を手動停止
- Vercel Dashboard で当日のビルド数を確認: Settings > Usage
