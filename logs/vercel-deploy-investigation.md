# Vercel 本番デプロイ失敗調査

日付: 2026-05-17
担当: Claude (Opus 4.7) 自走
ブランチ: fix/vercel-recovery-workflow

## TL;DR

- 「Vercel ビルドが Maximum call stack で停止している」という当初前提は、Vercel inspect の実ログ上では再確認できなかった
- 実際の Vercel ビルド (Next.js next build) は 13 分で完走し、15,314 ページ SSG も成功
- 失敗は post-build (関数バンドル/Lambda upload/出力アセット組み立て) 段階で発生、トータル 22 分前後で `status: Error`
- 「最後の Production Ready は PR #267 (sha 8e1b2dd)」という前提も実態と一致せず: vercel ls 上は 11 時間前の Production Ready (`ipa-quiz-site-mfd5x4xdb`) が最終成功、Production Error 連発は 5 時間前以降 (PR #280 のマージ以降)
- 14+ PR を mass-revert する Path β は、コード由来か infra 由来か未確定の段階では筋が悪いと判断し、Path B (ローカル再現で根因確定) を採用

## タイムライン

- 11h 前: 最後の Production Ready (`ipa-quiz-site-mfd5x4xdb`, 6 分でデプロイ完了)
- 5h 前: 最初の Production Error (sha `7fff6e0` = PR #280 マージ, 14 分で `Error`)
- 3h 前: Production Error (sha `42b4396` = PR #281 マージ, 15 分, dpl_HcH1G1tEcsTvP51swq5rmfQGvM32)
- 1h 前: Preview Error (22 分)
- 直近: 本番サイト自体は edge cache age 7-10 時間で HTTP 200 応答中

## Vercel inspect 実エラー所見

`vercel inspect dpl_HcH1G1tEcsTvP51swq5rmfQGvM32 --logs` 抜粋:

```
Build Completed in /vercel/output [13m]
status   ● Error
```

- next build は 107s で完了、SSG は 5.5 分で 15,314 ページ完走
- TypeScript チェック 22.5s 完了
- Generating static pages のうち 1 件で recharts 系 warning (width/height -1) — fatal ではない
- 「Maximum call stack size exceeded」のスタックトレースは inspect --logs の出力中には見当たらない (出力が末端で打ち切られている可能性、または build 後段階のログが inspect に乗っていない可能性)

## ローカル再現

実行コマンド (worktree `elegant-jackson-6acaef`, sha `663b5f5`):

```
pnpm install --frozen-lockfile
vercel link --yes --project=ipa-quiz-site --scope=kameking-labs-projects
vercel pull --yes --environment=production
vercel build --prod
```

結果: <pending>

## ケース分類

- Case A (ローカル build 成功): Vercel infra 側原因 (関数バンドル size / Lambda upload timeout / SSG 出力ファイル数上限)
- Case B (ローカル build 失敗): コード由来、failure trace から該当 PR/コミットを git bisect で特定
- Case C (CLI 制約): Path C (workflow 修正のみ) で auto-retry 復活待ち

## 並行修正: Vercel Recovery workflow

`.github/workflows/vercel-recovery.yml` に 2 つの問題を確認:

1. `permissions:` ブロックが `contents: read` のみ → `git push origin main` が 403 (Permission denied)
2. `VERCEL_TOKEN` secret 未設定 → Vercel API による redeploy はスキップされ、empty-commit fallback に落ちる

### 修正内容

- `permissions.contents` を `read` → `write` に変更し、`GITHUB_TOKEN` で main へ push 可能に
- main は branch protection なし (gh api 確認済) のため、`contents: write` 単体で push 通過する想定
- VERCEL_TOKEN 設定は本人作業として `logs/vercel-token-setup.md` に手順を残す (重要度: 高)

### 注意: workflow は症状緩和、根因解決ではない

このリカバリ workflow は「main HEAD と Production HEAD が乖離している場合に redeploy を triggers する」もの。
deploy 自体が失敗する根因 (post-build error) を解決するものではないため、根因対応とは分離して扱う。

## 推奨次手 (ケース別)

- Case A: Vercel Dashboard で関数サイズ・ファイル数・Lambda upload limit を確認、Pro Plan アップグレード or 出力削減 (例: SSG 一部を ISR に変更、quizページ 14,389 件を generateStaticParams から間引き)
- Case B: 該当 PR を git bisect / revert で特定し、ピンポイントで修正
- 共通: VERCEL_TOKEN を repo secrets に登録し、workflow の自動 redeploy を機能させる

## 失われていない成果 (Path β を取らなかったため温存)

- PR #268-#283 すべて温存。RAG citations / 学習プラン / 合格体験 / 検索 / 法務観察対応 / E2E 拡充 / SEO v2 / 災害復旧 playbook など 16 件
