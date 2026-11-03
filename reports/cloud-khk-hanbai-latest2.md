# KHK 販売・設備士 直近2回の収録監査

- 作業確認日：2026-11-03 UTC（依頼のオーナー決定：2026-11-04 06:10）。
- `CLAUDE.md` を最初に確認。作業開始時のワークツリーは変更なし。
- 現行の `data/questions`、`lib/qualifications/catalog.ts`、`data/exam-library` と origin の claude/*・qual/*・codex/* 389ブランチを確認。151種類のカタログ内容を照会。同資格の既存成果なし。`git ls-remote` による最新の390対象ref（取得用ブランチを含む）との比較でも、新規差分は既存の建築士監査のみだった。
- `origin/ops/source-pdfs-20261104`（更新取得済み）の `khk-hanbai/` は存在しない。

## 対象回の確定

国家試験の令和7年度（2025年11月9日）、令和6年度（2024年11月10日）。講習に伴う技術検定は別制度なので混在させない。

- 令和8年度は2026年11月8日実施予定であり、本作業日時点では未実施：[公式申込案内](https://www.khk.or.jp/qualification/qualification_application/)。
- 令和7年度の実施日：[公式ポスター](https://www.khk.or.jp/Portals/0/khk/exam/2025/poster/R7_siken_syoukai-.pdf)。
- 令和6年度の実施日：[公式受験案内](https://www.khk.or.jp/Portals/0/khk/exam/2024/%E3%80%90%E9%9B%BB%E5%AD%90%E7%94%B3%E8%AB%8B%E7%94%A8%E3%80%91%E4%BB%A4%E5%92%8C%EF%BC%96%E5%B9%B4%E5%BA%A6%E5%8F%97%E9%A8%93%E6%A1%88%E5%86%85%E6%9B%B8%28%E8%A8%AD%E5%82%99%E5%A3%AB%29rev3.pdf)。
- [公式公表ページ](https://shiken.khk.or.jp/shiken.html) は令和8年度の準備表示で問題リンクはない。問題の掲載期間は試験翌日から1月下旬、正答は翌年度試験の1週間前までと記載。ただしリンク解除後も、後掲の公式直接URLで取得できるPDFがある。
- [令和7年度公式正答](https://www.khk.or.jp/Portals/0/khk/exam/2025/1110/R7fy_kaitou.pdf)、[令和6年度公式正答](https://www.khk.or.jp/Portals/0/khk/exam/2024/R6fy_kaitou.pdf) の試験名・科目・問題数も確認。

## 第一種販売（slug: khk-hanbai）

- 追加：80問（各年度 法令20問＋保安管理技術20問）。除外0問。図を必要とする設問なし。
- 問題文・5選択肢をPDFから文字起こしし照合。印刷用柱・ノンブルを除去、改行・空白を整形。正答の数字1〜5と内部キーの対応は維持し、画面表示は数字とする。
- 全80問を公式正答JX/JYの各20問と照合。全5選択肢に独自解説を付与。法令は各年4月1日施行法令に基づく旨を本文・解説・`lawReferenceDate` に明記。
- 全問に公式問題PDF URL、正答URL、出典表示を保持。問題原本は下記の4ファイル。URL・取得サイズ・SHA-256は `reports/evidence/khk-hanbai/first-sources.json` に記録。
  - https://www.khk.or.jp/Portals/0/khk/exam/2025/1110/R7ACJX-W.pdf
  - https://www.khk.or.jp/Portals/0/khk/exam/2025/1110/R7ACJY-W.pdf
  - https://www.khk.or.jp/Portals/0/khk/exam/2024/R6ACJX-W.pdf
  - https://www.khk.or.jp/Portals/0/khk/exam/2024/R6ACJY-W.pdf
- `ready-to-ingest` により未公開。同期・遅延ローダー、資格ルート設定、一覧定義、数字ラベルを登録。公開レジストリとIPA一覧から除外するテストを実施。
- 問題検証80/80成功。公開ゲートと全問照合の関連テスト2件成功。

## 第二種販売（slug: khk-hanbai2）

- 追加：80問（各年度 法令20問＋保安管理技術20問）。除外0問。図を必要とする設問なし。
- 第一種とは試験・科目別正答を分離。指定slug `khk-hanbai` を第一種に用い、独立した資格ルートとして第二種を `khk-hanbai2` に登録した。
- 全80問を公式正答KX/KYと照合し、全5選択肢の独自解説を作成。法令は各年4月1日時点。各問に原本・正答URLを保持。
- 令和6年度保安管理技術問8の文字抽出で欠けた記号はPDFの画像で `Qmax` と確認して転記。問5の計算問題も原本どおりに収録。
- 原本URL・SHA-256・取得サイズは `reports/evidence/khk-hanbai/second-sources.json` に記録。
  - https://www.khk.or.jp/Portals/0/khk/exam/2025/1110/R7ACKX-W.pdf
  - https://www.khk.or.jp/Portals/0/khk/exam/2025/1110/R7ACKY-W.pdf
  - https://www.khk.or.jp/Portals/0/khk/exam/2024/R6ACKX-W.pdf
  - https://www.khk.or.jp/Portals/0/khk/exam/2024/R6ACKY-W.pdf
- 第一種と同じ未公開ゲートで、ルート・一覧定義・同期/遅延ローダーに登録。

- 問題検証80/80（警告0）、第一種・第二種の関連テスト4件、型検査がすべて成功。

## 液化石油ガス設備士・学科（slug: khk-setsubishi）

- 追加：30問（各年度 法令15問）。全問を公式正答LXと照合し、全5選択肢に独自解説を付与。各年4月1日時点の法令と各問に明記。図を必要とする設問なし。
- 未収録：40問（各年度 配管理論等20問）。問題PDFが取得できず、保管ブランチにも原本がない。正答LYの公開は確認できるが、問題・選択肢を推測して埋めない。設備士は学科全70問の完成状態ではない。
- 取得した法令問題原本：
  - https://www.khk.or.jp/Portals/0/khk/exam/2025/1110/R7ACLX-W.pdf
  - https://www.khk.or.jp/Portals/0/khk/exam/2024/R6ACLX-W.pdf
- SHA-256・取得サイズは `reports/evidence/khk-hanbai/equipment-sources.json` に記録。正答原本は第一種のマニフェストと共通。
- 科目別問題数15/20、資格ルート・一覧・同期/遅延ローダーを登録し未公開とした。カタログの残作業に配管理論等40問の取得・照合を明示。

### ブラウザ取得を依頼するPDF

公表ページの旧年度リンクは現存せず、下記は試験記号LYと他の公式ファイル命名に基づく**取得候補URL**であり、旧公表リンクそのものを確認できたわけではない。いずれもHTTP 404。公開期間終了が直接の原因か、別ファイル名かは確定できない。

| 年度 | 科目・不足数 | 取得候補URL | 状態 |
| --- | --- | --- | --- |
| 令和7年度 | 配管理論等20問 | https://www.khk.or.jp/Portals/0/khk/exam/2025/1110/R7ACLY-W.pdf | HTTP 404、保管ブランチにもなし |
| 令和6年度 | 配管理論等20問 | https://www.khk.or.jp/Portals/0/khk/exam/2024/R6ACLY-W.pdf | HTTP 404、保管ブランチにもなし |

Claudeのブラウザで取得できた場合は、依頼の指定先 `origin/ops/source-pdfs-20261104` の `khk-hanbai/` に配置する。取得元の公表ページは https://shiken.khk.or.jp/shiken.html 。対応する年度・試験名・科目・問1〜20を原本で確認してから収録する。

## 転載・複製禁止の記録

[公式利用条件](https://www.khk.or.jp/condition.html)「1. 著作権について」には、私的使用・引用等を除き、許諾のない使用・転載・複製・再配布・再出版等を禁止する旨の記載がある。また、例外範囲でも非営利、KHKに不利益を与えないこと、内容の改変をしないこと、著作権の明示を条件としている。

記載文言：「著作権法により認められる「私的使用」や「引用」の場合を除き、KHK又は原著作者、その他の権利者の許諾なく使用、転載、複製、再配布、再出版、販売、貸与等を行う行為を禁止します。」

本件は依頼に明示されたオーナー決定により収録を進める。禁止文言を停止理由にはしない。`KHK-owner-approved` はプロジェクト内の判断記録であり、KHKから許諾を取得したという意味ではない。公開状態はオーナー指定どおり未公開とする。

## 最終照合・検証

- 収録合計190問（第一種80、第二種80、設備士法令30）。不足40問は設備士の配管理論等のみ。
- 公式問題PDF10冊を再抽出し、本文に続く番号付き5選択肢の並び全体を連続文字列として原本テキストと照合。190/190一致。空白・互換文字・印刷用柱/ノンブルを正規化し、追記の法令基準日を照合対象から除外。結果：`reports/evidence/khk-hanbai/transcription-audit.json`。
- 公式正答PDF2冊の該当表行から数字を別途抽出し、収録データの正答と照合。190/190一致。結果：`reports/evidence/khk-hanbai/answer-audit.json`。
- `pnpm validate:questions`：26,634問、成功26,634、失敗0。既存問題の警告16,808件。今回のKHK190問に警告なし。
- `pnpm exec vitest run`：KHK3資格の照合/未公開テスト、ルート設定整合性、ホーム資格一覧の計5ファイル23テスト成功。
- `pnpm typecheck`：成功（`NODE_OPTIONS=--max-old-space-size=8192`）。
- 一般公開ルートの生成と直アクセス判定は `getAvailableExams()` を用い、未公開問題を持たないレジストリから生成する。3資格とも公開一覧・検索対象・IPA列挙・公開問題ローダーに出ないことを確認。
- `data/exam-library` のカタログは別形式の公式公開問題ライブラリ用で、類似のガス主任技術者も登録対象になっていない。本件も `data/questions` と資格カタログの既存方式にそろえ、二重登録しない。
- 取得できたPDF12冊は追跡対象外の `data/raw_pdfs/khk-hanbai/` にも保持した。

## 実行環境

`pnpm install --frozen-lockfile` 実施済み。書込不可の標準キャッシュに代えて `/tmp` 配下のCorepack・pnpmストアを使用。元の `.git` は読み取り専用なので、コミット用メタデータは `/tmp/khk-audit.git`、ワークツリーは元のリポジトリを使用する。main push、PR作成、build、deployは実行しない。


コミット履歴の受け渡し用bundleは `.cache/khk-hanbai-latest2.bundle`（追跡対象外）に出力する。元の作業ブランチやmainへはpushしない。書込可能な環境で次を実行すると、資格別の3コミットをブランチとして読み込める。

```sh
git fetch .cache/khk-hanbai-latest2.bundle codex/khk-hanbai-latest2:codex/khk-hanbai-latest2
```
