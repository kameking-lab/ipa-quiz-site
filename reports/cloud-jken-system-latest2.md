# J検 情報システム：公式直近2回の追加監査

- 資格：情報検定（J検）情報システム 基本スキル・プログラミングスキル・システムデザインスキル
- slug：`jken-system`
- 確認日：2026-11-03（UTC）
- 作業ブランチ：`claude/laughing-cannon-29p7t6`
- 保存先：`data/questions/jken-system/`、`public/questions/jken-system/`
- 取得・正答・件数・SHA-256記録：`data/exam-library/source-packs/jken-system-latest2.json`
- 公開状態：既存の資格カタログの `ready-to-ingest` による未公開ステージング。通常の問題レジストリ、遅延取得、公開資格一覧から除外。公開に必要な原文・正答・全肢解説・図を収録した状態で保存。

## 対象回の根拠

出典の[公式過去問題一覧](https://www.jken.sgec.or.jp/docs/past_test.html)に掲載されている情報システム試験の上位2回を確認した。令和8年度前期（2026年9月13日）と令和7年度後期（2026年2月8日）である。後者の実施日は2026年だが年度は2025年度なので、問題データも `year=2025, season=late` とした。前者は `year=2026, season=early`。

| 回・実施日 | 科目 | 大問数 | 解答欄数 | 公式問題 | 公式正答 |
| --- | --- | ---: | ---: | --- | --- |
| 令和8年度前期・2026-09-13 | 基本スキル | 5 | 41 | [問題PDF](https://www.jken.sgec.or.jp/common/pdf/past_test/260913_mondaijs01.pdf) | [正答PDF](https://www.jken.sgec.or.jp/common/pdf/past_test/260913_kaitojs01.pdf) |
| 同上 | プログラミングスキル | 5 | 32 | [問題PDF](https://www.jken.sgec.or.jp/common/pdf/past_test/260913_mondaijs02.pdf) | [正答PDF](https://www.jken.sgec.or.jp/common/pdf/past_test/260913_kaitojs02.pdf) |
| 同上 | システムデザインスキル | 5 | 40 | [問題PDF](https://www.jken.sgec.or.jp/common/pdf/past_test/260913_mondaijs03.pdf) | [正答PDF](https://www.jken.sgec.or.jp/common/pdf/past_test/260913_kaitojs03.pdf) |
| 令和7年度後期・2026-02-08 | 基本スキル | 5 | 42 | [問題PDF](https://www.jken.sgec.or.jp/common/pdf/past_test/260208_mondaijs01.pdf) | [正答PDF](https://www.jken.sgec.or.jp/common/pdf/past_test/260208_kaitojs01.pdf) |
| 同上 | プログラミングスキル | 5 | 30 | [問題PDF](https://www.jken.sgec.or.jp/common/pdf/past_test/260208_mondaijs02.pdf) | [正答PDF](https://www.jken.sgec.or.jp/common/pdf/past_test/260208_kaitojs02.pdf) |
| 同上 | システムデザインスキル | 5 | 42 | [問題PDF](https://www.jken.sgec.or.jp/common/pdf/past_test/260208_mondaijs03.pdf) | [正答PDF](https://www.jken.sgec.or.jp/common/pdf/past_test/260208_kaitojs03.pdf) |
| 合計 | 1資格・3スキル・2回 | **30** | **227** | 6本 | 6本 |

## 重複確認

作業前に `data/questions/`、`lib/qualifications/catalog.ts`、`data/exam-library/` を調査した。さらに origin の `claude/*`・`qual/*`・`codex/*` 全376ブランチの該当パス名と、重複をまとめた138種類のカタログ内容を調査し、`jken-system`・J検・情報検定の既存成果がないことを確認した。同じ資格・同じ回の再作成はない。

## 収録と照合

- 資格全体で30大問、227解答欄を追加。基本83欄、プログラミング62欄、システムデザイン82欄。元の大問番号と解答欄番号をID・設問見出し・出典に保持。
- 解答欄ごとに独立採点する既存の選択式スキーマを使用。各欄には大問全文と対象の公式解答群を渡す。`qNumber` は回・スキル内の通し番号。
- 問題本文・選択肢は公式PDFからテキスト化し照合。表・配列・コードを等幅表示し、上付き指数や縦配置の選択肢を読み取れる表記に整理。擬似言語の共通説明を、それを用いる大問にも保持。
- 必要な原図22点を部分切り出しし、該当欄に `hasImage`、URL、代替テキストを付与。図形・矢印などを補うための画像であり、問題全文を画像に置き換えていない。
- 227欄すべての正答を公式正答PDFと照合。全選択肢延べ1,055肢の独自解説を収録し、`explanationCoverage=full` とした。
- 各欄に公式問題PDF（ページ指定）・公式正答PDF・出典表示を保持。法令を扱う令和8年度前期システムデザインの大問1・5は、出題時点（2026-09-13）の法令・制度である旨と基準日を明示。
- 再検証用 `scripts/verify-jken-system.py` を追加。取得済み12本のPDFのSHA-256と、公式正答表を再抽出した227欄の正答を独立に照合する。

## 除外・取得不能

**除外0問、取得不能PDF0本。** 対象の問題・公式正答12本すべてをHTTP 200で取得できた。非公開問題や類題・生成問題の追加はない。ログイン、CAPTCHA、ボット拒否の迂回は行っていない。

## 権利・転載条件の記録

ユーザーのオーナー決定（2026-11-04 01:30と明示）により、依頼資格の権利確認は完了している。データには `JKEN-owner-cleared` と出典を記録した。公式ページのフッターには「Copyright © JKEN All Rights Reserved.」とある。これは確認記録であり、オーナーの権利確認を再審査する停止条件にはしていない。

## 検証

- `pnpm install --frozen-lockfile --store-dir /tmp/jken-pnpm-store`：成功（書込可能な `COREPACK_HOME` を使用）。
- `pnpm validate:questions`：全26,671問成功、失敗0。既存データの警告16,808件あり。
- `pnpm validate:questions --exam=jken-system`：227問成功、失敗0、警告0。
- `NODE_OPTIONS=--max-old-space-size=8192 pnpm typecheck`：成功。通常設定はメモリ不足のため指定どおり8GBへ変更。
- 関連Vitest：`jken-system-latest-two`、`questions-load`、`question-jsonld` の3ファイル・21テスト成功。
- `python scripts/verify-jken-system.py --pdf-dir /tmp/jken-pdfs`：12 PDFのハッシュ・227公式正答・全肢解説キーの一致を確認。
- 全体Vitestも実行し、673ファイル中672成功・7,021テスト成功。既存の歯科問題画像ダイジェスト検証1件が負荷下で15秒タイムアウトしたが、同テスト単独の再実行は249msで成功（変更は加えていない）。
- `pnpm build`、デプロイ、mainへのpush、PR作成は実施しない。

## 独立レビュー

指定の別Codex（`codex exec -m gpt-6-astra -c model_reasoning_effort=medium -s workspace-write --skip-git-repo-check`）で独立レビューを実施。基本83欄・プログラミング62欄・システムデザイン82欄の公式正答一致と、本文・全選択肢・全肢解説・図を確認した。登録・公開ゲート・直接URLを含むルーティングも独立に確認した。

初回指摘を次のとおり修正した。

1. 基本スキルのBMP・JPEGの誤答理由を、対象解答欄の文脈に合わせた。
2. 単方向リストの挿入処理2欄の本文解説・全肢解説を修正した。
3. 二次関数の指数、対数の底・引数・指数を判別できるテキストへ整形した。
4. 文字頻度処理の欄(5)は公式正答「エ」を維持し、原題の「イ」も新規登録時には同値となることを明示した。
5. 参照される二分木の図1を追加し、ふるい処理の図の補足転記に使うループ番号を原図に合わせた。

修正後、基本・プログラミング・公開ゲート／ルーティングは**再レビュー合格**。システムデザインは初回で**合格**。修正必須の未解決指摘はない。[独立レビュー結果](cloud-jken-system-independent-review.md)に最終回答を保存した。

実行環境の制約として、入れ子Codexのシェル実行はソケットディレクトリ権限エラーとなった。`workspace-write`指定を維持し、公式PDFから独立抽出した本文・正答表、実装全文／差分、原図22点を標準入力・画像添付で渡す形でレビューを完了した。テスト・PDFハッシュ／正答の再検証は親側で実行している。サンドボックスの無効化はしていない。

Gitメタデータはこの環境で読み取り専用のため、書込可能な`/tmp/jken-work.git`へ複製したメタデータと本作業ツリーを指定してコミット・同名ブランチへのpushを行う。保護された元の`.git`には書き込まない。
