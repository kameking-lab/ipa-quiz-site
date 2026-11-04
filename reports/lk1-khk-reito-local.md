# LK1 冷凍機械：ローカル引継ぎ・検証

作業日：2026-11-04（JST）。worktree は `C:/Users/kanet/20260522/wt-khk-reito`、作業ブランチは `qual/khk-reito-20261104`。開始時のHEADは `76b6a7d2d11d7137c3258c441a5a6047523b3c06` で、`origin/claude/busy-pascal-ob27o7` と一致し、作業ツリーはクリーンだった。push・PR・デプロイ・main操作は行わない。

## 対象と公開状態

令和6年度（2024-11-10）・令和7年度（2025-11-09）の国家試験を引き継ぐ。令和8年度は2026-11-08実施予定のため対象外。第一種80問（うち記述式10問）、第二種80問、第三種70問、合計230原問・択一220問・選択肢別解説1,100件。親slugは `khk-reito`、子slugは `khk-reito-1`～`khk-reito-3`。

オーナー決定（2026-11-04 06:10）に従い収録する。公式利用条件には許諾のない転載・複製・再配布等の禁止文言があることを記録する。これは利用許諾取得済みという意味ではない。`data/qualification-staging` と出典パックに保存し、既存の非公開ゲートを維持する。

公式参照： [公表ページ](https://shiken.khk.or.jp/shiken.html)、[申込案内](https://www.khk.or.jp/qualification/qualification_application/)、[利用条件](https://www.khk.or.jp/condition.html)。

## 原本取得・再現確認

出典台帳3点の重複を除いた公式PDF22点を、今回のローカル環境でもHTTP 200のPDFとして取得した。22/22のSHA-256が既存台帳と一致。ログイン・CAPTCHA・ボット拒否の迂回は行っていない。**取得不能URL：なし（0件）**。URLの完全な一覧は `cloud-khk-reito-latest2.md` と `data/qualification-staging/khk-reito/khk-reito-N-sources.json` にある。

一時保存先は `C:/Users/kanet/AppData/Local/Temp/codex-work/lk1-pdfs/`。PDFと抽出草稿はコミットしない。既存の抽出・生成・図版スクリプトを実行し、問題JSON3点、出典台帳3点、図版8点、計14点の再現を確認した。JSONはデータ内容、PNGはサイズとRGBA全画素が一致した。Windowsの改行・PNGエンコーダ差で不要な差分を残さないよう、確認後は生成前のバイト列へ戻した。8図版の目視確認でも、旧指摘の記入前線図の横軸hと余白を含め欠落は見つからなかった。

取得・再現確認の機械ログは同ディレクトリの `fetch-results.json` と `reproduction-results.json`。生成に使う正答TXTは公式正答PDFの全ページをpdfplumberの `extract_text(y_tolerance=6)` で抽出して用意した。

## ローカル検証（修正前チェックポイント）

依存関係は `corepack pnpm install --frozen-lockfile`（指定版10.33.0）で導入した。PATH上のpnpm 9.15.9ではoverrides不一致となったため、lockfileを変更せずCorepackの指定版を使用した。

- `corepack pnpm validate:questions`：26,674件、ok=26,674、fail=0、warn=16,808（既存データの警告）。
- `corepack pnpm validate:questions --exam=khk-reito-1,khk-reito-2,khk-reito-3`：230件、ok=230、fail=0、warn=0。
- `NODE_OPTIONS=--max-old-space-size=8192 corepack pnpm typecheck`：終了コード0。
- 関連11ファイル・109テスト：全件通過。
- `git diff --check`：通過。

関連テストは `khk-reito-staging`、`QuizPlayer.descriptive`、`QuizPlayer.keyboard`、`StreamQuizPlayer.keyboard`、`QuizPlayer.completion`、`exam-config-integrity`、`home-directory`、`practice-session`、`questions-load`、`chosashi-integrity`、`question-jsonld`。正答列、連番、件数、出典、記述式表示と無採点完了、公開ゲート、既存資格への回帰を確認する。テスト通過だけでは解説内容の十分性は保証しない。

汎用 `verify-two-round-coverage.ts` は公開レジストリに載る資格を前提とし、非公開の本資格ではUsage終了になる。公開を切り替えず、同等の件数・連番・解説・出典チェックを上記の専用テストと対象validateで確認した。

ログ： `C:/Users/kanet/AppData/Local/Temp/codex-work/lk1-validate.log`、`lk1-target-validate.log`、`lk1-typecheck.log`、`lk1-related-tests.log`。

## 独立再レビュー

指定の `C:/Users/kanet/AppData/Roaming/npm/codex.cmd exec -m gpt-6-astra -s read-only` を別プロセスで起動。レビュー対象は `00e49b940` から開始時HEADまでの収録全体。クラウド側2回目PASSは旧指摘と修正差分のみだったため、今回の全体再レビューの代わりとはしない。

初回起動時はPowerShellの標準入力で日本語が `?` になり判定保留だった。この実行はレビュー回数に算入せず、UTF-8の依頼ファイルを読むASCIIプロンプトで起動し直した。有効な再レビューは現在実行中。旧FAIL4項目は解消を確認したとの途中経過を得ているが、全体で追加の解説不足があり、最終指摘を待って修正する。

ローカルでの最終PASSはまだ取得していない。
