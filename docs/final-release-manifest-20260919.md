# 最終リリース manifest（2026-09-19）

## リリース状態

- main統合用ブランチ: `codex/safety-consultant-merge-ready-20260919`
- 基点: `origin/main` の `56b6cf5`
- AdSense CSPコミット: `6ebaee1`（元コミット `246e643`）
- 安全試験完成コミット: `12c843d`（元コミット `e935332`）
- 2コミットはいずれも競合なくcherry-pick済み
- 本番公開: 完了
- 本番URL: `https://www.kakomon-ai.jp/`
- Vercel deployment: `dpl_5x1Xzo73Qg6Dkc5985ozzcj274vH`

このブランチは、mainに既に統合済みのnote連携PR #491・#492を保持し、重複する旧note連携コミットを含めずに作成した。元のreleaseブランチで発生していた12ファイルの履歴競合を解消している。

## 収録内容

### コンサルタント試験5年分

- 2021〜2023年度のpaper JSON 33件とpresentation JSON 33件を追加
- 既存2024〜2025年度と合わせ、2021〜2025年度の55資料・590問を収録
- 2021〜2023年度の公開画像592件、28,295,150 bytesを追加
- 労働安全コンサルタントと労働衛生コンサルタントを資格・科目単位で分けて表示

### 選択肢別解説

- 公式択一450問すべてに5肢個別の正誤理由を収録
- 合計2,250肢を独立して説明
- `sourceHash`、公式正答、5肢数、verdict、理由、政府URLを検証
- 古いまたは不完全なoverlayは表示しない
- 正答理由と誤答理由を同じ画面で読みやすく表示

### 記述式模範解答

- 2021年度28問、2022〜2023年度56問、合計84問を追加
- 各回答は120文字以上かつ政府一次資料URLを必須化
- 非政府URL、リンク欠落、draft間競合がある場合は統合を拒否

### UIとデータ修正

- 回答後に「あなたの回答」と正解を明示
- 5択の上下左右キー操作を循環化し、移動だけでは送信しない
- 一覧へ戻るURLでgroupとsubjectを保持
- 図表左右順11件を修正し、回帰テストを追加
- `CS20241902-q1` と `CS20251901-q9` の問題文中の正答spoilerを除去
- 問題文・選択肢を文字起こしし、図表だけ画像を利用

### AdSense CSP

- Google広告チェーンで必要なhostを `script-src`、`connect-src`、`frame-src`、`img-src` へ限定追加
- `https:` 全許可や無制限ワイルドカードは不使用
- CSP設定を回帰テストで固定

## 検証結果

2026-09-19、main統合用worktreeで実行。

- `pnpm typecheck`: 合格
- `pnpm lint`: 合格
- 関連Vitest: 13ファイル・77テスト合格
- `node scripts/validate-safety-exams.mjs --require-consultant-five-years --require-explanations`: 合格
  - 111資料
  - 2,326問
  - 解説済み2,326問、100%
  - 構造化選択肢別解説450問
  - コンサルタント5年・55資料、欠落0
- `node scripts/validate-government-source-links.mjs`: 合格
  - 2,374参照
  - 259ユニークURL
  - 259 / 259正常
- `pnpm build`: 合格
  - 2,716ページ生成
- `git diff --check origin/main...HEAD`: 合格

本番ブラウザでは、5択全肢の解説、正誤表示、政府リンク、記述式模範解答、資格・科目を保持する戻り先、console errorなしを確認済み。

## 差分管理

元worktreeにある `.qdump/**`、`logs/**`、`tmp/**`、`scripts/__pycache__/**`、`install-safety.log`、旧取り込みスナップショット、内容差分のないBookmark snapshotは、このブランチへ持ち込んでいない。

PRでは、生成データと画像が大半を占めること、レビュー対象となるruntime・validator・UI変更を本文で明示する。
