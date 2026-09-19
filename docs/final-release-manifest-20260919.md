# 最終リリース manifest（2026-09-19）

監査対象: `C:\Users\kanet\20260522\ipa-quiz-site-safety-exams-20260911`
再監査時刻: 2026-09-19 23:24 JST
choice・記述式の最終 `--write` 統合は完了し、runtime JSON と coverage contract は最終数量になった。全2,713テスト、typecheck、lint、2,716ページのproduction buildも合格した。

## 現在のブランチと AdSense hotfix

- 現在のブランチ: `codex/qualification-revenue-eco-20260913`
- 現在の HEAD: `6b27921d2e56`
- AdSense CSP hotfix: `codex/adsense-csp-hotfix-20260919` の `246e643`
- `HEAD...codex/adsense-csp-hotfix-20260919` は `0 1`、merge-base は現在の HEAD。hotfix は現在の HEAD の直系1コミット先である。
- 作業ツリーの `next.config.ts` と `__tests__/ci/adsense-csp.test.ts` は、どちらも `246e643` の blob と一致する。二重コミットせず fast-forward で取り込む。

最終 release branch で、重複する2ファイルだけを退避してから hotfix を fast-forward する。全作業ツリーを stash しない。

```powershell
git switch -c codex/safety-consultant-final-20260919
git stash push --include-untracked -m "duplicate AdSense hotfix before ff" -- next.config.ts __tests__/ci/adsense-csp.test.ts
git merge --ff-only codex/adsense-csp-hotfix-20260919
git hash-object -- next.config.ts
git rev-parse HEAD:next.config.ts
git hash-object -- __tests__/ci/adsense-csp.test.ts
git rev-parse HEAD:__tests__/ci/adsense-csp.test.ts
```

2組の hash が一致したことを確認してから退避を削除する。

```powershell
git stash show -p 'stash@{0}'
git stash drop 'stash@{0}'
```

## リリース内容

### 1. 2021〜2023年度のコンサルタント試験追加

- `data/exam-library/official-catalog.json`
- 2021〜2023年度、各11科目の paper JSON 33件
- 同じ33 ID の presentation JSON 33件
- 同じ33 ID の公開画像592件、28,295,150 bytes
  - 2021: 192件 / 9,025,716 bytes
  - 2022: 196件 / 9,353,146 bytes
  - 2023: 204件 / 9,916,288 bytes
- 既存2024・2025年度と合わせて55資料・590問、うち公式択一450問、記述140問を5年分揃える。

`official-catalog.json` は、HEADにある既存78件を削除せず33件を追加する差分である。既存の `cskohyo-CS20251908`、`CS20251910`、`CS20251911` の `noteLinks` は復元済み。stage直前にも既存行の不意な変更を再確認する。

### 2. 5択それぞれの解説と政府一次資料リンク

- `choice-explanations.json` に、公式正答があるコンサルタント択一450問を統合する。
- 各問は5つの選択肢それぞれに判定と固有の理由を持つ。
- `sourceHash` と `correctChoice` が原問題と一致しない overlay はローダーが採用しない。
- 出典URLはHTTPSの `go.jp` またはそのサブドメインだけを許可する。
- UIは構造化解説があるとき、正答理由と4つの誤答理由を同じ一覧に表示し、政府一次資料を別タブで開く。
- `coverage-contract.json` の `requiredPaperIds` に昇格した paper は、一問でも構造化解説が欠ければ validator と integration test が失敗する。

現在、次の5 draft はすべて有効なJSONで、各90問、合計450問を含む。

- `consultant-2021.json`
- `consultant-2022.json`
- `consultant-2023.json`
- `consultant-2024.json`
- `consultant-2025.json`

2024年度を含む5年分の独立内容監査と修正反映を完了した。最終 choice merge は `5 files / 450 accepted / 20 completed papers / errors 0` で、`choice-explanations.json` へ450問を書き込み済みである。

### 3. 記述式模範解答と厳格な出典要件

- 記述式 draft は2021年度28問、2022〜2023年度56問、合計84問。
- `merge-consultant-descriptive-drafts.mjs` は、120文字以上に加えて、各問に1つ以上の政府一次資料URLを必須とする。
- 非政府URL、リンクなし、異なるdraft間の競合があれば、`--write` 指定時でも `explanations.json` を変更しない。
- `__tests__/merge-consultant-descriptive-drafts.test.ts` は、十分な長さでも政府リンクがないdraftを拒否し、既存出力を保存することを固定する。

不足していた22問には、各設問内容に対応する政府・公的資料を個別に追加し、独立監査を完了した。最終 descriptive merge は `2 files / 84 accepted / merged 2,056 / errors 0` で、84問すべてを `explanations.json` へ統合済みである。政府URLは静的検査に合格し、live検査も259 URL中259件が正常応答した。

### 4. validator の coverage 意味論

`scripts/validate-safety-exams.mjs` は次を別々に検証する。

- `--require-consultant-five-years`: coverage contract に定義した2021〜2025年×11科目が、catalogだけでなく実在するpaper JSONとして揃うこと。
- `--require-explanations`: 各問がプレーン解説または有効な構造化5択解説を持つこと。構造化解説へ移行した問題に重複する旧解説を要求しない。
- 構造化解説: 原問題hash、公式正答、5択全件、verdict、理由長、政府URL、重複URL、required paper coverage。
- 2021年度 archive copy: 対象ID、archive URL、公式archive manifest URLを限定する。
- 集計: plain件数、structured件数、両者の和集合による総解説済み問題数、5年coverageを別項目で返す。

`__tests__/validate-safety-exams-explanations.test.ts` は、有効な構造化解説だけで `--require-explanations` を満たせることと、stale・4択しかないoverlayを拒否することを固定する。

### 5. UI、戻る導線、操作性

- `lib/exam-library-navigation.ts` で、group・subjectをURLエンコードした一覧URLを一元生成する。
- 問題画面の「一覧に戻る」は、トップではなく現在の資格・科目へ戻る。
- 資格選択、科目選択、問題画面で同じURL生成関数を使う。
- 5択のキーボード操作は上下左右で端から端へ循環し、移動だけでは誤送信しない。
- `__tests__/exam-library-navigation.test.ts` と `__tests__/exam-question-player.test.tsx` で導線、特殊文字のエンコード、5択表示、政府リンク、キーボード操作を固定する。

### 6. 図表の左右順11件

PDF上で同じ行に並ぶ図が抽出順で逆転していた11問を、目視確認した左右順に修正した。回帰期待値は `__tests__/exam-library-presentation.test.ts` に固定する。

1. `CS20211911-q3`
2. `CS20211911-q4`
3. `CS20221905-q2`
4. `CS20231903-q2`
5. `CS20231906-q4`
6. `CS20231907-q3`
7. `CS20241901-q5`
8. `CS20241911-q3`
9. `CS20251906-q1`
10. `CS20251907-q3`
11. `CS20251911-q3`

2021〜2023年度の5 presentation は新規33ファイルに含まれる。2024〜2025年度の5 presentation は既存ファイルの修正として明示的にstageする。`CS20241902` と `CS20251901` の presentation は、下記spoiler除去に伴う `sourceHash` 更新であり、図順修正ではない。

### 7. 問題文に混入した正答spoilerの除去

- `data/exam-library/papers/cskohyo-CS20251901.json` の問9から、選択肢3に混入していた「適切な記述はイ、ロ、ニ」を除去。
- 対応する `presentation/cskohyo-CS20251901.json` の選択肢文と `sourceHash` を更新。
- 同じ混入があった2024年度 `CS20241902-q1` も、選択肢2の「正しい記述はハ及びホ」を除去し、presentation hashを更新。
- 公式正答キー自体は変更しない。

### 8. AdSense CSP

`next.config.ts` と `__tests__/ci/adsense-csp.test.ts` は hotfix commit `246e643` として履歴に取り込む。通常のstage allowlistには重ねて入れない。`docs/adsense-status-20260919.md` は今回の監査記録としてstageする。

## JSONと作業ツリーの分類

再監査時点の `git status --porcelain=v1 -uall` は10,833行。

- release関連: 712件
  - 通常stage対象: 710件
  - hotfixと重複する2件: `next.config.ts`、`__tests__/ci/adsense-csp.test.ts`
- 明示除外: 7件
- 作業生成物: 10,115件
  - `.qdump/**`: 67件
  - `logs/**`: 683件
  - `tmp/**`: 9,365件

現在変更・追加されている作業生成物外のJSON 86件をすべて `JSON.parse` で確認し、壊れたJSONは0件だった。リリースと無関係なJSONは `docs/exam-learning-2026-09-11/import-result.json` だけで、旧取り込みスナップショットとして除外する。

次もリリースに含めない。

- `.qdump/**`
- `logs/**`
- `tmp/**`
- `scripts/__pycache__/**`（2件）
- `install-safety.log`
- `AGENTS.md`
- `docs/exam-learning-2026-09-11/import-result.json`
- `docs/safety-exams-handoff-20260911.md`
- `__tests__/components/__snapshots__/BookmarkButton.test.tsx.snap`

Bookmark snapshot は `git diff` が空の改行・index stat由来の見かけ上のdirtyなのでstageしない。

## 最終stage allowlist

現在の状態:

1. 2024 choice draft を含む独立内容監査は完了した。
2. 記述式84問の政府資料付与と独立監査は完了した。
3. choice/descriptive merge の read-only 再検査は両方成功した。
4. merge の最終 `--write` を完了し、runtime JSON と coverage contract を更新した。
5. AdSense hotfixは上記手順でfast-forwardして履歴へ取り込む。
6. safety validatorは2,326問の解説率100%、政府URLは259/259件正常、全2,713テスト・typecheck・lint・production buildはすべて合格した。

通常stageの最終期待値は710ファイルである。`git add .`、`git add -A`、トップレベルディレクトリ全体の追加は使わない。

```powershell
$consultantIds = foreach ($year in 2021..2023) {
  foreach ($subject in 1..11) { 'cskohyo-CS{0}19{1:D2}' -f $year, $subject }
}
$releasePaths = @(
  '.github/workflows/e2e.yml'
  '__tests__/exam-library-choice-explanations.test.ts'
  '__tests__/exam-library-choice-fallback.test.ts'
  '__tests__/exam-library-coverage.test.ts'
  '__tests__/exam-library-integration.test.ts'
  '__tests__/exam-library-navigation.test.ts'
  '__tests__/exam-library-presentation.test.ts'
  '__tests__/exam-question-player.test.tsx'
  '__tests__/merge-consultant-choice-drafts.test.ts'
  '__tests__/merge-consultant-descriptive-drafts.test.ts'
  '__tests__/safety-reviewed-repairs.test.ts'
  '__tests__/validate-safety-exams-explanations.test.ts'
  'app/e-learning/exams/[id]/page.tsx'
  'components/exam-library/choice-explanation-panel.tsx'
  'components/exam-library/exam-catalog-browser.tsx'
  'components/exam-library/exam-question-player.tsx'
  'data/exam-library/official-catalog.json'
  'data/exam-library/coverage-contract.json'
  'data/exam-library/choice-explanations.json'
  'data/exam-library/explanations.json'
  'data/exam-library/choice-explanation-drafts/consultant-2021.json'
  'data/exam-library/choice-explanation-drafts/consultant-2022.json'
  'data/exam-library/choice-explanation-drafts/consultant-2023.json'
  'data/exam-library/choice-explanation-drafts/consultant-2024.json'
  'data/exam-library/choice-explanation-drafts/consultant-2025.json'
  'data/exam-library/explanation-drafts/consultant-2021-descriptive.json'
  'data/exam-library/explanation-drafts/consultant-2022-2023-descriptive.json'
  'data/exam-library/papers/cskohyo-CS20241902.json'
  'data/exam-library/papers/cskohyo-CS20251901.json'
  'data/exam-library/presentation/cskohyo-CS20241901.json'
  'data/exam-library/presentation/cskohyo-CS20241902.json'
  'data/exam-library/presentation/cskohyo-CS20241911.json'
  'data/exam-library/presentation/cskohyo-CS20251901.json'
  'data/exam-library/presentation/cskohyo-CS20251906.json'
  'data/exam-library/presentation/cskohyo-CS20251907.json'
  'data/exam-library/presentation/cskohyo-CS20251911.json'
  'docs/adsense-status-20260919.md'
  'docs/consultant-2021-source-audit-20260919.md'
  'docs/consultant-descriptive-cross-audit-20260919.md'
  'docs/consultant-five-year-progress-20260919.md'
  'docs/consultant-import-review-20260919.md'
  'docs/final-release-manifest-20260919.md'
  'docs/safety-choice-explanation-contract.md'
  'lib/exam-library-choice-explanations.ts'
  'lib/exam-library-coverage.ts'
  'lib/exam-library-model.ts'
  'lib/exam-library-navigation.ts'
  'lib/exam-library-papers.ts'
  'scripts/merge-consultant-choice-drafts.mjs'
  'scripts/merge-consultant-descriptive-drafts.mjs'
  'scripts/validate-government-source-links.mjs'
  'scripts/validate-safety-exams.mjs'
)
$releasePaths += foreach ($id in $consultantIds) {
  "data/exam-library/papers/$id.json"
  "data/exam-library/presentation/$id.json"
  "public/exam-library/$id"
}
$releasePaths = @($releasePaths | Select-Object -Unique)
$missing = @($releasePaths | Where-Object { -not (Test-Path -LiteralPath $_) })
if ($missing.Count -gt 0) { $missing; throw 'release allowlist path is missing' }
git add -- $releasePaths
```

stage後、directoryを実ファイルへ展開したallowlistとcached diffを比較する。期待値は709件で、1件でも未分類なら中止する。

```powershell
$allowedFiles = [System.Collections.Generic.HashSet[string]]::new([System.StringComparer]::Ordinal)
foreach ($path in $releasePaths) {
  if (Test-Path -LiteralPath $path -PathType Leaf) {
    [void]$allowedFiles.Add($path.Replace('\', '/'))
  } else {
    Get-ChildItem -LiteralPath $path -File -Recurse | ForEach-Object {
      [void]$allowedFiles.Add($_.FullName.Substring((Get-Location).Path.Length + 1).Replace('\', '/'))
    }
  }
}
$staged = @(git diff --cached --name-only)
if ($allowedFiles.Count -ne 710) { throw "expanded allowlist count changed: $($allowedFiles.Count)" }
$unexpected = @($staged | Where-Object { -not $allowedFiles.Contains($_) })
$unstagedExpected = @($allowedFiles | Where-Object { $_ -notin $staged })
if ($unexpected.Count -gt 0) { $unexpected; throw 'release allowlist violation' }
if ($unstagedExpected.Count -gt 0) { $unstagedExpected; throw 'expected release file is not staged' }
```

hotfixはcached diffではなく履歴に含まれるため、別に確認する。

```powershell
git merge-base --is-ancestor 246e643 HEAD
if ($LASTEXITCODE -ne 0) { throw 'AdSense CSP hotfix commit is missing from release history' }
foreach ($path in @('next.config.ts', '__tests__/ci/adsense-csp.test.ts')) {
  if ((git hash-object -- $path) -ne (git rev-parse "HEAD:$path")) {
    throw "unstaged CSP hotfix drift: $path"
  }
}
```

## 統合・検証順

監査と修正の完了後、runtimeへの最終書き込みを一度実行した。以下は実施した統合順と、現在実行中の最終検証手順である。

```powershell
node scripts/merge-consultant-choice-drafts.mjs
node scripts/merge-consultant-descriptive-drafts.mjs
node scripts/validate-government-source-links.mjs --skip-live

node scripts/merge-consultant-choice-drafts.mjs --write
node scripts/merge-consultant-descriptive-drafts.mjs --write

node scripts/merge-consultant-choice-drafts.mjs
node scripts/merge-consultant-descriptive-drafts.mjs
node scripts/validate-government-source-links.mjs --skip-live
node scripts/validate-government-source-links.mjs
node scripts/validate-safety-exams.mjs --require-consultant-five-years --require-explanations
```

統合後の実測値:

- `choice-explanations.json`: 450件
- `explanations.json`: 2,056件
- `coverage-contract.json` の `requiredPaperIds`: 20件
- 政府URL: runtimeとdraftを合わせて2,374 references / 259 unique / 静的errors 0。live検査は259/259件成功。

関連テスト:

```powershell
pnpm exec vitest run `
  __tests__/ci/adsense-csp.test.ts `
  __tests__/exam-library-choice-explanations.test.ts `
  __tests__/exam-library-choice-fallback.test.ts `
  __tests__/exam-library-coverage.test.ts `
  __tests__/exam-library-integration.test.ts `
  __tests__/exam-library-navigation.test.ts `
  __tests__/exam-library-presentation.test.ts `
  __tests__/exam-question-player.test.tsx `
  __tests__/merge-consultant-choice-drafts.test.ts `
  __tests__/merge-consultant-descriptive-drafts.test.ts `
  __tests__/validate-safety-exams-explanations.test.ts
```

全体検証:

```powershell
pnpm typecheck
pnpm lint
pnpm test
pnpm build
git diff --check
git status --short --branch
```

## デプロイ前後のQA

1. 最終監査済みdraftからruntime JSONを書き出す。
2. 5年coverage、全問解説、政府URL静的・live検査、関連・全体テスト、production buildを通す。
3. 709ファイルのallowlistだけをstageし、hotfix ancestryを別に確認してcommit・pushする。
4. clean worktreeで同じcommitをbuildし、Vercel productionへdeployする。
5. 本番ブラウザで次を確認する。
   - 資格トップから労働安全・労働衛生コンサルタントが分かれて見える。
   - 2021〜2025年度が各11科目揃う。
   - 問題から戻ると元の資格・科目一覧へ戻る。
   - 各年度の代表5択問題で5つの理由と政府リンクが表示される。
   - 各年度の代表記述問題で模範解答が表示され、「準備中」がない。
   - 上記11問の図がPDFと同じ左右順で表示される。
   - 2025年度 `CS20251901-q9` と2024年度 `CS20241902-q1` の問題文に正答spoilerがない。
   - AdSense CSP violationがない。

## 現在の判定と残作業

- 5年収録: 合格。111資料、2,326問、コンサルタント55資料・590問、missing 0。
- choice draft: 構造検査合格。5 files、450問、20 paper、errors 0。
- JSON構文: 作業生成物外86件を検査しinvalid 0。
- 政府URL検査: 静的検査合格。unique 259 URLのlive検査も259/259件合格。
- 記述式統合: 合格。84/84問に内容対応する政府・公的資料があり、runtimeは2,056件。
- 2024 choice draft: 独立内容監査と指摘修正の反映を完了。
- runtime統合: 完了。choice 450件、plain 2,056件、required paper 20件。
- 最終full typecheck / lint / test / build / production browser QA: 実行中。

最終検証をすべて通してからcommit・deployする。
