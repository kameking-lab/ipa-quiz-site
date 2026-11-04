# LQ4D 作業報告（2026-11-04）

判定：部分完了。ビル管理の残315原問のうち、新規135原問・675肢解説を独立レビューPASSで受入。前回45問と合わせて180/360原問、残180原問。360は2024年・2025年各180問の2年分で、単年度の問題数ではない。資格全体の完成・共通ローダーへの接続は未完了。

## 作業範囲

- worktree：C:/Users/kanet/20260522/wt-LQ4B
- branch：qual/lq4b-integration-20261104、開始HEAD：82db93b10。
- 開始：2026-11-04 03:45:21 JST。最終更新：2026-11-04 04:17:03 JST。
- 建築物環境衛生管理技術者のみ。技術士第一次・機械の原稿・図・ローダーは変更なし（差分検査済み）。
- オーナー決定2026-11-04 01:30の権利確認済み条件を適用。権利・過去の取得STOPを停止理由としていない。アクセス制限の迂回なし。
- push・PR・デプロイ・公開・本番DB操作は実施なし。全原稿publicGo:false。

## 制作・検収

新規ファイルは既存ステージング data/qualification-staging/lq4c-biru-kan/ の追加分。本文・全選択肢・公式正答・総合解説・全5肢理由・原典URL・PDFページ・原典SHAを保持し、保存済み両OCRを原画像で裁定した。必要図8点は公式PDFを直接切り出し、座標・dpi・SHA・altを保持。図の再描画なし。

2024年・2025年の午前Q1–90が両年度とも内容検収済み。

受入の正本は reports/lq4c-20261104/acceptance.json（前回から継続する共通受入票）。LQ4Dのビル管理限定の集計・新規受入票は reports/lq4d-20261104/acceptance.json。レビュー前の原稿そのものを reviewed-manuscripts/ に保存し、現在稿・内容SHA・レビュー対象版SHA・票SHAを結合した。FAIL時の旧稿も保存。各票は対象部分だけの判定であり、全360問や全520問を検収済みとはしていない。

独立レビューは全回 C:/Users/kanet/AppData/Roaming/npm/codex.cmd exec -m gpt-6-astra（read-only）。指摘を修正し、現在稿のSHAが記載されたPASS票を得てから受け入れた。review10はモデル混雑で終了1、同じ指定モデルのreview13で再実行PASS。モデル変更なし。実行記録・プロンプト・終了コード・票SHA・外部保存実行ログSHAはreview-executions.json。

公式記述に対する学習上の注意も保持した。2024Q27は冷水ショックと低体温症の発症時間、2024Q36は胃下垂の個別因果関係の根拠限界、2025Q41は公式正答と公的脱水症状資料の相違を明記。公式本文や正答の創作・置換はしていない。説明参考URLが空の項目にも独立レビュー票で検証根拠を記録している。

## 検証

- corepack pnpm validate:questions：終了0、26,873問、fail0、既存warn16,854。ステージング稿は共通ローダー未登録のため共通件数には含まれない。
- corepack pnpm typecheck：終了0、診断なし。NODE_OPTIONS=--max-old-space-size=12288。
- 関連Vitest：25ファイル、282テスト成功、終了0。
- node --test scripts/validate-lq4-staging.test.mjs：14テスト成功、終了0。
- 最終の厳格ステージング検証：staging-validation-final.jsonとchecks-final.jsonを参照。保存原典14PDF、全受入稿、公式正答、レビュー対象版、図を検証。
- Git blob読戻し：git-blob-verification.json。制作稿・PASS票・レビュー対象版・図 37ファイルのSHA一致：true。検査対象contentHeadは同JSONに記録。
- 共通アプリの実行コード変更なし。今回ビルド・ブラウザ検収の再実行なし。以前の結果を今回実施したとは扱っていない。

関連テストコマンド：

```powershell
corepack pnpm exec vitest run qkensetsu chizai2 kisho ReviewClient practice-session questions-filter category-pool exam-config-integrity QuizModeTabs PracticeSessionTabs QuizClient.year get-questions questions-load exam-library-coverage question-jsonld question-meta --maxWorkers=2
```

## 残問・再開

ビル管理の残り：2024年：90問（Q91–180）、2025年：90問（Q91–180）、計180原問・900肢。正確な番号・正答は reports/lq4d-20261104/remaining-originals.json。技術士の残問はLQ4Eの範囲であり、この集計には含めない。

未受入草稿：なし。

```powershell
Set-Location C:/Users/kanet/20260522/wt-LQ4B
git status --short
git log -8 --oneline
Get-Content -Raw -Encoding utf8 reports/lq4d-20261104/acceptance.json
Get-Content -Raw -Encoding utf8 reports/lq4d-20261104/remaining-originals.json
node scripts/validate-lq4-staging.mjs --require-reviewed --sources
node --test scripts/validate-lq4-staging.test.mjs
```

午後は subject:pm と午後用原典 biru-kan-2024-pm.pdf／biru-kan-2025-pm.pdfを用い、Q91から継続する。原問番号と午後PDF内ページを混同しない。図・組合せ表を保持し、全肢解説を独立レビューPASS後に受入票へ追加する。共通ローダー登録等は前回の全体完成条件を満たした後に行う。

保存原典・両OCR・画像：C:/Users/kanet/AppData/Local/Temp/codex-work/lq4b-sources/。索引：reports/lq4b-20261104/source-inventory.json と official-answer-index.json。再取得は不要。原典喪失時は前回の lq4b-source-preparation.zip をSHA照合して復元する。

## ローカルコミット

```text
100bb21f4 content(lq4d): accept 23 source-verified building hygiene originals
f866b6101 content(lq4d): accept 13 more hygiene originals with qualified medical explanations
5aa45522a content(lq4d): accept 27 hygiene originals and preserve official figure crops
e09c0a7a0 content(lq4d): accept 33 HVAC originals with verified figures and corrections
ae7e51b5b content(lq4d): accept 22 originals and complete 2024 morning content
dfa7e4813 content(lq4d): complete both hygiene morning papers with 135 new accepted originals
```

後続の検証・報告コミットはgit logで確認する。40分の区切りに備えて動く状態で保存し、残問をこの一覧から再開できるようにしている。未完了は内容制作の残作業であり、権利保留や原典未取得によるものではない。
