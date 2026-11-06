# LK6 ローカル引継ぎ報告

確認日：2026-11-04（JST）。作業時間は10:01〜10:24頃（約23分、40分以内の区切り）。作業先は `C:/Users/kanet/20260522/wt-khk-hanbai`、ブランチ `qual/khk-hanbai-20261104`。

## 結果

**190問・950肢解説を既存クラウド成果から回収し、公式原本と再照合して未公開 staging に収録した。目標230問のうち設備士・配管理論等40問は原本PDF未取得で未完了。** 問題・選択肢を推測して補っていない。指定の別プロセスによる独立レビューは、初回の修正要求を解消し、再レビューでPASS。PASSの範囲は収録済み190問であり、不足40問の完成を意味しない。

| 資格／内部slug | 令和7年度 | 令和6年度 | 収録合計 | 未収録 |
| --- | --- | --- | ---: | --- |
| 第一種販売主任者 `khk-hanbai` | 法令20＋保安20 | 法令20＋保安20 | 80 | なし |
| 第二種販売主任者 `khk-hanbai2` | 法令20＋保安20 | 法令20＋保安20 | 80 | なし |
| 液化石油ガス設備士（学科） `khk-setsubishi` | 法令15 | 法令15 | 30 | 配管理論等 各年度20、計40 |

タスク全体の格納先は `data/qualification-staging/khk-hanbai/`。全190問に `publicAllowed=false` と `needsReview=true` を明示。公開用の問題レジストリ・ExamCode・ルート・EXAM_CONFIGSには接続していない。資格台帳には収録対象として3資格を追加し、設備士の不足も記載した。台帳の `ready-to-ingest` は未公開の準備状態であり、設備士全科目の収録完了を意味しない。

## 重複確認と引継ぎ元

`git fetch origin` 後、全origin/claude/*のstagingツリー、data/questions、reports、資格台帳を資格名・slugで検索した。stagingには対象がなかったが、検索をdata/questionsへ広げると、**origin/claude/zealous-knuth-nikq4r（85cda1b179bbb5935c9ee4b8d37c71838e8321f5）**に第一種80問、第二種80問、設備士法令30問とレビュー修正済み成果が存在した。

依頼文の「pushされていない」という想定にかかわらず、重複成果があれば取り込む指定に従い、この190問・950肢解説と固定正答を継承した。ブランチ全体のcherry-pickはせず、公開用配線や型の追加は取り込んでいない。参考の `origin/claude/jolly-goodall-wlxnzx`（khk-kikai）から staging の資格別JSON・manifest・出典・未公開index構成を参考にした。

既存worktreeの開始HEADと取得後origin/mainはともに `00e49b94060cc2671e9d098df91d653a4ed3ffe2`。mainのcheckout・reset・commit等は行っていない。`origin/ops/source-pdfs-20261104` のツリーにも対象の配管理論等原本はなかった。詳細は `provenance.json`。

## 対象回の公式確認

[公式申込案内](https://www.khk.or.jp/qualification/qualification_application/)を実取得して、販売主任者と設備士筆記の令和8年度試験日が**2026年11月8日**、設備士技能が11月29日であることを確認した。11月4日時点では未実施なので、直近の実施済み2回は令和7・6年度とした。講習後の技術検定は混在させていない。

[試験センターの公表ページ](https://shiken.khk.or.jp/shiken.html)は令和8年度の準備見出しに切替済みで、対象旧年度の問題リンクは現存しない。問題掲載期間は試験翌日から当年度1月下旬、正答は翌年度試験の1週間前までという説明を確認した。見出しだけで令和8年度を過去問と扱っていない。PDFの公開年月日そのものは未確認であり、URL内の1110等を公開日の確証とはしていない。

公式ページURL・HTTP 200・取得本文の抜粋・HTMLのSHA256は `official-verification.json` に保存。公式問題10冊・正答2冊は通常の公開URLで再取得した。shiken.khk.or.jp側は404、同名のwww.khk.or.jp側から12冊取得成功。URL・各試行の応答・ページ数・SHA256は `official-sources.json` に記録した。ログイン・CAPTCHA・ボット拒否の迂回は行っていない。

## 原文・正答・解説・図表

- 190問の本文＋番号付き全5肢を、原本から独立に抽出したPyMuPDF／PDFMinerの文字列と順序を含めて照合し、190/190一致。NFKC相当の互換文字・空白・改行・印刷用柱は比較時に正規化した。
- 公式正答2冊からJX/JY・KX/KY・LXを科目別に別途抽出して190/190一致。令和6年度は試験名が結合セルなので、正答表画像で第一種・第二種・設備士の行を確認した。未収録LYの正答行も証拠として保存するが、架空の問題レコードは作っていない。
- 引継ぎ時の独自「出題基準」見出しは原文本文から `lawNote` へ分離し、法令基準日（各年度4月1日）を保持。公式の例外除外・都道府県知事等の定義・第二種の問1〜10と問11〜20の法令区分を `sharedContext` に保存した。
- 令和7年度第一種保安は原則「絶対圧力」、第二種保安及び設備士法令は原則「ゲージ圧力」。標準状態の0℃・0.1013MPaとともに原本の共通条件を保存。将来の表示では本文と共通条件を一緒に提示する必要がある。
- 原本で上付きの単位指数を、引継ぎテキストのm2／m3等からm²／m³へ24か所復元。第二種令和6年度保安問8のQmaxは原本拡大画像で確認（下付きmaxはプレーンテキスト表現）。問題の内容・選択肢順・正答を変えていない。
- 全950肢に独自解説を継承。既存レビューで修正済みの第一種R7法令問19（アセチレンのみ）、第一種R6保安問19（塩化メチルの大量の水による除害）、第二種R7法令問17及びR6問16（実際の充てん日ではなく法定期間満了からの期間）を確認し、回帰テストを加えた。
- 問題冊子10冊・全78ページを年度別コンタクトシート4枚で目視し、収録済み190問に必要な図表がないことを確認。正答表2枚とQmaxは拡大画像でも確認。`figure-audit.json` に範囲を記録。未取得LY冊子の図表は未判定であり、図表なしとはしていない。
- `source-audit.json` に各問の一致結果・原本ページ・本文と肢のハッシュ・共通条件のハッシュを保存。検証コードは原文改変や共通条件削除、出典URL差替え、公開フラグ、正答改変、欠番・重複も拒否する。

原本12冊と抽出草稿は `tmp/lk6/` にローカル保持（gitのローカルexclude済み）。リポジトリの `docs/two-round-question-ingestion.md` に従い、PDF原本・抽出草稿はコミットに含めていない。再照合コマンド：

```powershell
python scripts/audit-khk-hanbai-sources.py --source-dir tmp/lk6
```

## 取得できなかったPDFと次回再開位置

以下は試験記号LYと他冊子の命名から導いた**候補URL**で、旧公表リンクそのものを確認できたURLではない。各年度のshiken.khk.or.jp版・www.khk.or.jp版ともHTTP 404。同名の末尾違い候補も404だったが、正しいファイル名や公開終了の因果関係は確定していない。

- 令和7年度・配管理論等20問：<https://www.khk.or.jp/Portals/0/khk/exam/2025/1110/R7ACLY-W.pdf>
- 令和6年度・配管理論等20問：<https://www.khk.or.jp/Portals/0/khk/exam/2024/R6ACLY-W.pdf>
- 試験センター版R7：<https://shiken.khk.or.jp/Portals/0/khk/exam/2025/1110/R7ACLY-W.pdf>
- 試験センター版R6：<https://shiken.khk.or.jp/Portals/0/khk/exam/2024/R6ACLY-W.pdf>

次回はこの2冊の**正規の公式原本の取得から再開**する。取得したら年度・資格名・科目・問1〜20・図表を確認し、既存のLY正答20件ずつに照合、全肢独自解説を作成して設備士JSONへ追加する。manifestの190/230・不足40、出典台帳、原本照合スクリプトの不足科目対応、科目別の欠番検査、固定正答テストを更新し、検証と独立再レビューを実施する。現在の独立レビューPASSとなった場合も、この未収録40問を合格済みと扱わない。

## 転載禁止文言とオーナー決定

[公式利用条件「1.著作権について」](https://www.khk.or.jp/condition.html)は、私的使用・引用等を除き、権利者の許諾なく使用、転載、複製、再配布、再出版、販売、貸与等を禁止する旨を明記している。例外範囲でも非営利、内容の非改変、著作権の明示等の条件がある。文言は `official-verification.json` に記録した。

依頼に明示された2026-11-04 06:10のオーナー決定により収録し、この文言のみで作業を止めていない。`KHK-owner-approved-staging` はプロジェクト内の決定記録であり、KHKから転載許諾を得たという主張ではない。公開可否はfalseを維持する。

## 検証結果

- `python scripts/audit-khk-hanbai-sources.py --source-dir tmp/lk6`：190問・共通条件・公式正答の不一致0。原本12冊のSHA256一致。
- `pnpm validate:questions`：staging190問エラー0。既存公開等データ26,444問成功、失敗0、既存警告16,808件。合計対象26,634問。stagingと公開問題は別々に検証する構成。
- `pnpm validate:questions --exam=khk-hanbai`：staging190問エラー0。後続の汎用公開レジストリ件数0は、未公開データを公開配列へ入れていないため。
- `NODE_OPTIONS=--max-old-space-size=8192 pnpm typecheck`：成功。
- `pnpm exec vitest run __tests__/questions/khk-hanbai-staging.test.ts __tests__/lib/exam-config-integrity.test.ts __tests__/lib/home-directory.test.ts`：3ファイル・30テスト成功。
- `git diff --check`：成功（コミット対象の改行をLFに統一済み）。

依存のローカル導入は `pnpm install --offline --ignore-scripts`、Prisma型生成は `pnpm exec prisma generate` を実行。環境のpnpmは9.15.9。インストールによるpnpm-lock.yamlの差分は戻し、依存定義・ロックファイルは変更していない。

## 独立レビュー

初回はP2指摘1件で修正要求（FAILとして扱う）。令和7年度設備士法令の表紙⑺⑻にある、原則ゲージ圧力及び液化石油ガス法・政省令に基づく旨が15問の共通条件から欠けていた。原本どおり補完し、全PDFの表紙⑺⑻の対象条件を独立抽出して必須化する原本監査と、15問全件・条件削除の回帰テストを追加した。原本照合190問・全体検証・型チェック・関連30テストを再実施して成功。初回レビュー原文は reports/lk6-review-1.md。再レビューは **PASS**（対象コミット `8f457fd69`）。原文は `reports/lk6-review-2.md`。再レビューでは表紙条件2件と15問への適用、原本監査190問不一致0、条件⑺・⑻・両方を削除した場合の拒否、型チェック・空白チェックを確認した。レビュー担当はVitest自体は実行せず、保存ログを確認し、回帰動作をメモリ内で検証した。作者側では関連30テストを実行済み。

全問の `needsReview=true` は人手照合状態として維持し、manifestの `needsIndependentReview` は完了に伴いfalse、独立レビュー欄にPASSと判定範囲を保存した。

```powershell
C:/Users/kanet/AppData/Roaming/npm/codex.cmd exec -m gpt-6-astra -s read-only -C C:/Users/kanet/20260522/wt-khk-hanbai
```

## コミットと作業範囲

1. `822f6ed7b`：190問の回収、未公開staging化、出典・引継ぎ記録。
2. `73c44756b`：原本照合証拠、共通条件・単位表記、検証コード、破損検出・隔離・正答回帰テスト、資格台帳。
3. `8f457fd69`：独立レビュー指摘による設備士表紙の条件補完、条件削除検出と原本監査の強化、初回レビュー原文保存。
4. 本報告を含む最終コミット：再レビューPASS原文・manifestのレビュー完了記録・不足40問の引継ぎ報告。

push・PR作成・デプロイ・main操作は行っていない。最終のレビューPASS記録・報告整理も別コミットに保存する。コミット履歴は下記worktreeの `git log -4 --oneline` で確認できる。

報告の指定保存先：`C:/Users/kanet/Documents/Codex/2026-11-02/task-2/lk6-report.md`。リポジトリ内の同内容は `reports/lk6-report.md`。
