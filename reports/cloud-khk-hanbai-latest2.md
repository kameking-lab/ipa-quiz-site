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

## 転載・複製禁止の記録

[公式利用条件](https://www.khk.or.jp/condition.html)「1. 著作権について」には、私的使用・引用等を除き、許諾のない使用・転載・複製・再配布・再出版等を禁止する旨の記載がある。また、例外範囲でも非営利、KHKに不利益を与えないこと、内容の改変をしないこと、著作権の明示を条件としている。

本件は依頼に明示されたオーナー決定により収録を進める。禁止文言を停止理由にはしない。`KHK-owner-approved` はプロジェクト内の判断記録であり、KHKから許諾を取得したという意味ではない。公開状態はオーナー指定どおり未公開とする。

## 実行環境

`pnpm install --frozen-lockfile` 実施済み。書込不可の標準キャッシュに代えて `/tmp` 配下のCorepack・pnpmストアを使用。元の `.git` は読み取り専用なので、コミット用メタデータは `/tmp/khk-audit.git`、ワークツリーは元のリポジトリを使用する。main push、PR作成、build、deployは実行しない。
