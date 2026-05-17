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

結果: Case B (コード由来) 確定。実エラー:

```
Error: Unable to find lambda for route: /account/api-keys
EXIT:1
```

これは Vercel の post-build (lambda 配線) 段階で出る fatal、`Next.js build` 自体は 15,314 ページ完走したあと打ち切られる。Vercel inspect 上では「Build Completed」までしか出ず、実エラー文が混入せずに `Error` 状態に飛ぶため、当初前提の「Maximum call stack」とは別物と確認。

## 根本原因: redirect/page の二重定義

`next.config.ts` の `redirects()` と、`app/<同じパス>/page.tsx` の `redirect()` (next/navigation) が**同一 URL に対して二重定義**されており、Vercel の最新 vercel build (v53.x) はこの状態を error として扱う。

具体的に競合していた 7 ペア:

- `/account/api-keys` (config: `/settings/api-keys`, page: `/settings/api-keys`)
- `/account/badges` (config: `/account/dashboard`, page: `/account/dashboard?tab=badges`)
- `/account/heatmap` (config: `/account/dashboard`, page: `/account/dashboard?tab=overview`)
- `/account/notifications` (config: `/settings`, page: `/settings#notifications`)
- `/account/tutor` (config: `/account/dashboard`, page: `/account/dashboard?tab=tutor`)
- `/account/weakness` (config: `/account/dashboard`, page: `/account/dashboard?tab=weakness`)
- `/practice/weakness` (config: `/quiz?mode=weakness`, page: `/quiz?mode=weakness&exam=ap`)

なお、page 側 redirect には `?tab=` `#section` `&exam=ap` といったクエリ・ハッシュ情報が含まれており、config 側にはなかった。情報損失を避けるため修正方針は「config 側に query/hash を移植してから page を削除」。

## 修正内容

1. `next.config.ts` の `redirects()` 7 件を、page 側に存在していた query/hash 付き destination に書き換え
2. 競合していた `page.tsx` 7 件を削除
   - `app/account/api-keys/page.tsx` (`ApiKeysClient.tsx` は `/settings/api-keys` から参照されるので残す)
   - `app/account/badges/page.tsx` (`BadgeWall.tsx` は `DashboardBadges.tsx` から参照されるので残す)
   - `app/account/heatmap/page.tsx` (他に import なし、ディレクトリも削除)
   - `app/account/notifications/page.tsx` (`NotificationSettings.tsx` は他から参照)
   - `app/account/tutor/page.tsx` (`TutorClient.tsx` は `DashboardTutor.tsx` から参照)
   - `app/account/weakness/page.tsx` (`WeaknessHeatmapClient.tsx` は `DashboardWeakness.tsx` から参照)
   - `app/practice/weakness/page.tsx` (他に import なし、ディレクトリも削除)

3. ローカル `vercel build --prod` で再現確認 (実行中)

## なぜ最近まで通っていたか

`app/account/*/page.tsx` (redirect-only stub) は PR #120 phase-b 統合 UI / PR #122 nav 整理 当時から存在。本来であれば page を削除すべき統合作業が不完全だった。
Vercel CLI v53.x の post-build lambda 配線チェックが直近に厳格化された (PATH-TO-REGEXP の differential も同時に warning 出力されている) ため、過去のラフな冗長設定が表面化したものと推測。

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

## 続報: redirect 重複だけでは fix が完結しない (cascading lambda errors)

route fix (7 page.tsx 削除 + next.config 再整理) 後のローカル `vercel build --prod` で、エラーが次の route に移動した:

```
Error: Unable to find lambda for route: /account/dashboard
code: NEXT_MISSING_LAMBDA
at @vercel/next/dist/index.js:12781:13 (serverBuild iterating prerender manifest)
```

- `/account/dashboard` は redirect-only stub ではなく**通常のサーバーコンポーネント**ページ (`○` Static prerender)
- 元の build error `/account/api-keys` はアルファベット順 iteration の最初の失敗
- redirect-only stub 削除で **api-keys は解消したが、次の static route で同じ NEXT_MISSING_LAMBDA が発生**
- つまり prerender manifest と lambda manifest の不一致は redirect 二重定義より深い

`@vercel/next` 内部の `serverBuild` が Next.js の prerender-manifest 上の route に対して lambda を引こうとして失敗。`○` (static) ルートに対しても lambda lookup が走るのは @vercel/next が "fallback function" を期待しているため。

### 仮説

Next.js 16.2.6 + Turbopack + `@vercel/next` の **prerender-manifest 形式の互換性問題**。

直近で `dynamicParams = false` を `/q`, `/essays`, `/blog` 3 ルートに追加 (4d126ce / e297b05 / 141d9c4)。
これによって Next.js が当該ルートの fallback lambda を出力しなくなった可能性がある。@vercel/next が「fallback lambda が無い prerender 経路」を未対応のままだと、関連 manifest 全体が壊れて他の static ルートでも lambda lookup が失敗する、というシナリオ。

### 検証保留事項

- 8e1b2dd (last Ready Production) でのローカル `vercel build` 再現は実施を試みたが branch 切替で contamination、clean baseline 取得未完
- `vercel CLI v51.7.0` (local) と `v53.3.2` (CI) で同種 `NEXT_MISSING_LAMBDA` 発生、これは tooling 側 regression ではなく project 構造との互換性問題と判断

## 推奨アクション (優先順)

1. **PR #284 (workflow permissions + route 冗長削除) をマージ**
   - 観察 #027 (logs/observation-screening-result.md:92) の解消
   - 本件の build 失敗を完全には fix しないが、表面化していた不整合を解消
   - workflow 修正は独立して有用

2. **`VERCEL_TOKEN` を repo secret に登録 (本人作業)**
   `logs/vercel-token-setup.md` の手順参照。これで自動 redeploy workflow が API 経路で動く

3. **`dynamicParams = false` の 3 ルートを見直す**
   - 該当 PR (4d126ce / e297b05 / 141d9c4) を一時的に revert し、`vercel build` が通るか確認
   - 通った場合: `dynamicParams = false` + `generateStaticParams` の組み合わせを `notFound()` 中心の素直な実装に置換
   - 通らない場合: 別仮説 (Next 16 / @vercel/next 互換) を継続調査

4. **上記で復旧しなければ**
   - 8e1b2dd で clean local build を取り、bisect で確実な原因 PR を特定
   - もしくは `@vercel/next` 側 issue として Vercel に報告 (NEXT_MISSING_LAMBDA + Next.js 16.2.6 Turbopack 環境)
