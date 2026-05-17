# Vercel Deploy Resolution Report

Generated: 2026-05-17 22:50 JST
Branch: investigate/dynamic-params-revert
Investigator: claude/flamboyant-mclean-7ac69a (Opus 4.7)

## Summary

PR #284 で残された仮説 (3コミット `dynamicParams=false` 追加が @vercel/next の
prerender-manifest / lambda-manifest 整合性を破壊した) を検証した。

結論: **ローカル Windows 環境では vercel build が常に NEXT_MISSING_LAMBDA で
失敗するため、ローカルでの仮説検証は不可能**。8e1b2dd (last Ready production
deploy) でも同じく失敗する。仮説は Vercel CI の preview deploy 経由でしか
検証できない。

## 検証経過

### Phase 1: 候補 3 コミットの中身

- `4d126ce` fix(quiz) — /q route で SSG_MIN_YEAR=2024 撤廃、dynamicParams=true→false。
  生成ページ数 ~2.4k → ~14k。
- `e297b05` fix(essays) — /essays page に `dynamicParams = false` を 1 行追加。
- `141d9c4` fix(blog) — /blog/[slug] page に `dynamicParams = false` を 1 行追加。

いずれも目的は同じ: 既存の e2e 失敗 (404 が 200 で返る) を修正し、
未掲載パラメータを framework-level 404 に切替える。

### Phase 2: 3 コミット revert + local build 検証

origin/main (08ca004) から `investigate/dynamic-params-revert` を切り、
`git revert 4d126ce e297b05 141d9c4 --no-commit` で 3 コミットを reverting。
衝突なし。1 つの commit (11ffa3e) に 3 ファイル変更がまとまった:

- app/q/[exam]/[yearSeason]/[section]/[qnum]/page.tsx (SSG_MIN_YEAR=2024 復活、dynamicParams=true 復活)
- app/essays/[exam]/[yearSeason]/[section]/[qnum]/page.tsx (dynamicParams 行削除)
- app/blog/[slug]/page.tsx (dynamicParams 行削除)

ローカル検証結果:

- pnpm typecheck: pass
- pnpm build: pass (2510 static pages 生成、commit 4d126ce 前と同等の規模)
- npx vercel build --prod (CLI v51.7.0): **fail** — `NEXT_MISSING_LAMBDA at /account/dashboard`
- npx vercel@latest build --prod (CLI v54.1.0): **fail** — 同じ `NEXT_MISSING_LAMBDA at /account/dashboard`

エラー発生位置は @vercel/next/dist/index.js:12781 (serverBuild)、PR #284 で
言及されたのと完全に同じスタック。

### Phase 4: 8e1b2dd (last green deploy) でも検証

仮説が確定できなかったため、`git checkout 8e1b2dd` で最後の Ready 本番
deploy commit に切り替え、同じ vercel build を実行:

- pnpm build: pass
- npx vercel build --prod: **fail** — `NEXT_MISSING_LAMBDA at /account/api-keys`

8e1b2dd は本番が Ready だった commit にもかかわらず、ローカルでは
NEXT_MISSING_LAMBDA で失敗する。失敗ルートは異なるが、エラーの
種類とスタックは完全に同じ。

これは **ローカル Windows 環境の vercel build が本番 CI と異なる挙動**
を示すことを意味する。原因候補:

- Windows のパス区切り (\ vs /) が @vercel/next の lambda lookup に影響
- 開発用 pnpm node_modules layout が Linux 環境の packaging と異なる
- ローカル `.vercel/output` の生成が Linux 限定の前提を持つ

いずれにせよ、**ローカル検証では仮説の確定/否定ができない**。

## 仮説検証の結論

**現状: 未確定 (Indeterminate)**

ローカル repro が不可能なため、Phase 4 の bisect も実行不可。停止条件
「vercel CLI が動作困難 → 本人ローカル実行に切り替えとして停止報告」に
該当する。

ただし、`investigate/dynamic-params-revert` branch を push 済みで、Vercel が
自動的に preview deploy を作成中 (queue 待ち)。この preview deploy が
Ready になれば仮説確定、Error になれば仮説否定となる。

## 状況

- Vercel deploy queue が混雑しており、preview deploy が 20 分以上
  Queued 状態で進まないケースが観測された。
- 過去 5 時間以内に Production Error が 2 件、Preview Error が複数発生。

最新の deploy 状況 (確認時点 22:43 JST):

- 8m old `f462pj4i2` Production: Building
- 9m old `a98s207g2` Preview: Queued (revert branch の latest push 由来と推定)
- 9m old `r97ex1bwx` Preview: Queued
- 19m old `9ysost89d` Preview: Queued (alias `investigate-dyn-...` で revert branch 確定)
- 過去 2 時間以内の Preview/Production: 全て Error

## 次のステップ (本人判断材料)

1. **Vercel CI で preview deploy の結果を待つ**
   - 対象 deploy URL: https://ipa-quiz-site-9ysost89d-kameking-labs-projects.vercel.app
   - branch alias: https://ipa-quiz-site-git-investigate-dyn-da726b-kameking-labs-projects.vercel.app
   - Ready なら仮説確定 → fix/revert-dynamic-params-false PR を作成しマージ
   - Error なら仮説否定 → ローカル Windows 環境を離れた CI 環境での bisect 戦略へ切替

2. **代替案: Linux 環境 (WSL / Codespaces / 別マシン) でローカル repro**
   - 本人の WSL Ubuntu or Linux マシンで `vercel build --prod` を試す
   - 8e1b2dd で成功するなら、その環境で bisect 可能

3. **代替案: Vercel CI の deploy log を直接参照**
   - 最新の Error production deploy `pb7pd80z4` 等の log を `vercel inspect --logs`
     で取得し、Vercel CI が NEXT_MISSING_LAMBDA で停止しているルートを確認
   - そのルート名が時系列で変化していれば、PR #284 で立てた仮説に支持・反証の
     情報が得られる

4. **dynamicParams=false 再導入計画 (仮説確定時に備える)**
   - 既存の e2e (404 アサーション) は `notFound()` 呼び出しを page handler に追加
     することで dynamicParams=true でも対応可能 (Next.js 16 で notFound() が
     確実に 404 を返すよう、明示的な status code 指定 / RouteHandler の Response
     return 等で再実装する)
   - /q route の SSG_MIN_YEAR=2024 撤廃は SSG ページ数を 6 倍に増やす副作用が
     あるため、再導入時は CI build time への影響を計測してから判断

## 成果物

- branch: investigate/dynamic-params-revert (commits: 3d108ef alive, 11ffa3e revert)
- logs/alive-dynamic-params-revert.log (alive marker)
- logs/vercel-build-after-revert.log (HEAD + 3-commit revert の vercel build fail log)
- logs/vercel-build-v54.log (vercel CLI v54.1.0 でも同じ失敗を確認)
- logs/vercel-build-8e1b2dd.log (last green commit でも同じ失敗を確認 — local repro 信頼性なし)

## 本件の制約

ユーザー指示「destructive 操作不可」「revert は git revert で履歴保持」を
全期間で順守。push は alive marker と revert commit の 2 回のみ、いずれも
non-destructive な fast-forward。Production / main への変更は行わず、
investigate/dynamic-params-revert branch 上で完結。

PR は作成していない (仮説未確定のため premature)。本人の判断で preview deploy
結果を確認後、確定なら本ブランチを fix/revert-dynamic-params-false にリネーム
の上 PR 作成を推奨。
