# 電験三種 2024・2025年度全問収録の受入契約

## 原典と範囲

- 正本は `scripts/denken3-source-manifest.json`。公式過去問一覧から2024年度上期（2024-08-18）、同下期（2025-03-23）、2025年度上期（2025-08-31）、同下期（2026-03-22）の各4科目の問題PDF 16本と解答PDF 4本をSHA-256で固定した。
- 1回の公開問題は理論18題/22解答単位、電力17題/20解答単位、機械18題/22解答単位、法規13題/16解答単位。4回合計264題/320公開解答単位、各単位5肢で計1,600肢。理論・機械の問17/18はどちらか1題を選ぶ形式で、両題とも公開資料にはあるので両方収録する。採点時は片方のみ採用し、同時解答を採点しない。実試験の採点単位は各回76、4回304。
- `scripts/denken3-source-manifest.py` → `scripts/denken3-answer-manifest.py` の順で再生成可能。2024年度下期の解答PDFだけ命名が `2024_3_2.pdf`。一部解答PDFでは視覚上 `(b)` の行の隠しテキストが誤読されるため、直前の `(a)` と同じ問番号へ割り当てる。原図でも確認する。

## 作業分担

- このブランチ：2024年度上期・下期の理論/電力/機械/法規、計8紙・160公開解答単位と共通の抽出・検証・非公開ゲート。
- 別担当：2025年度上期・下期の同8紙・160公開解答単位。同じmanifestと下記スキーマを使い、別worktree/branchで変更を分離する。

## 設問データ

1. ファイル単位は `data/questions/denken3/reviewed/YYYYMMDD-subject-qXX-YY.json`。質問番号だけでなく `(a)/(b)` を含む**解答単位ごとに1行**作る。例：問15(a)は `questionNumber:15, part:"a"`、問15(b)は別行。共通設例は両行から同じ文脈・図へリンクする。選択肢は公式の(1)～(5)を順番そのまま、正答は公式解答PDFの該当科目列から照合する。
2. 各行に `question`, `choices` 5個、`officialAnswer`, `explanation`, `choiceExplanations` 5個、`sourceQuestionPdfUrl`, `sourceAnswerPdfUrl`, `reviewedFromPage`, `figureUrls`, `officialReferenceUrls`, `needsReview` を保持。数式は読める本文テキスト、図だけを画像。図内ラベルや選択肢図も原本位置と対応づける。根拠リンクは官公庁等の一次資料に限り、関連しない総合トップを根拠扱いしない。
3. 原本PDF、ページ画像、機械草稿は `data/raw_pdfs/denken3/` に置き、Git管理しない。公開用に切り出した図だけ `public/images/denken3/` へ置く。原本の設問全文スクリーンショットを公開用に流用しない。
4. 受入は各行の原本画像・五肢・正答・誤答理由・図・一次資料を別モデルで独立照合し、FIXを再修正して問ごとに最終PASS証跡を作る。PDF抽出だけ、草稿だけ、正答番号だけでは受入に数えない。

## 公開ゲートと利用条件

- `denken3` は現行カタログで `notification-required`。2問pilotを含め、16紙320公開解答単位が `needsReview=false`/独立PASSで揃い、試験センターへの利用状況連絡が完了するまで `live` にしない。
- [試験センターFAQ](https://www.shiken.or.jp/shiken/faq/faq08/000082.html)は教育目的の過去問利用に許諾・使用料不要、出典・改変の明記、利用状況のメール連絡（法人・担当者・連絡先・使用問題・目的）を求める。連絡メールはこの作業で送信しない。運営者情報が確定した後に所管担当者が対応する。
- 出典には**年度・期・科目・問番号・加工の有無**を表示する。試験日の暦年と年度を混同しない。特に2025-03-23は2024年度下期、2026-03-22は2025年度下期。

## 2026-09-23 strict監査チェックポイント

- 2024上期理論Q15/Q17/Q18を候補化し、Q18(b)の回路接続・波形対応・変調の因果を公式原図に合わせて修正した。Q18の図1・図2は `public/images/denken3/20240818/theory/20240818-theory-q18-am-circuit-waveforms.png` に図だけを切り出した。
- 新規 `scripts/denken3-direct-review.py` は解答単位キーごとにcurrent candidate SHA、公式問題頁SHA、公開図SHA、公式問題PDF/解答PDF SHA、公式正答単位SHAを固定してOpus highで審査する。
- strict2の5単位はQ17(a)、Q17(b)、Q18(a)がPASS、Q15(a)、Q15(b)がFIX。次回はQ15両候補へ大問共通文（素子L/C、`v=500 sin(1000t)`, `i=-50 cos(1000t)`）を追加し、Q15(a)に原図のv/i基準方向と受動符号規約を明記してtargeted再審査する。
- `docs/evidence/denken3/strict/` の旧巡を保持する。旧partial acceptanceはstrictへ継承せず、全候補を現内容と原図から再審査する。現在のstrict cleanは3/80、非公開候補は22/80。

## 2026-09-24更新

- 2024年度上期理論の非公開候補22解答単位を、実 `claude-opus-5-5` / firstParty の現候補・原図・公式正答・図のSHA付き直接審査で22/22 PASSにした。旧巡のFIXはそのまま残し、現候補のPASSレシートを各部分受入レシートへ結び直した。
- `py -3.12 scripts/denken3-strict-status.py` は原稿SHA、公式資料SHA、公開図SHA、モデル実IDと生応答SHA、全issue空を再照合し、現ブランチの厳格PASSが22/320と出る。`py -3.12 scripts/denken3-validate.py --local-pdfs --partial` もPASS。
- 2024年度上期の残り3科目と下期4科目は未受入。2025年度は別worktreeで進行中。全16科目・320公開解答単位と画面品質のゲートを満たすまで公開しない。
- ユーザーは試験センターへの利用状況連絡等を完了済みとして公開まで進めるよう指示した。送信日時や受付番号は未提示のため作成しない。

## 2026-09-24 Linux継続（claude/denki3-two-year-continuation-nm3yuk）

- 実行環境に依存しない共通部 `scripts/denken3_cli.py` を追加。`claude` CLI を OS 非依存で解決し、親セッション変数を外して `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC=1` で起動する。`modelUsage` に `claude-opus-5-5`（firstParty）以外が1件でもあれば結果を採用しない。草稿生成・修正・独立査読・厳格査読の全段がこれを通る（草稿は従来の sonnet から Opus 5.5 に変更）。
- 生応答は非追跡の `data/raw_pdfs/denken3/review/` と、同一バイトの追跡ミラー `docs/evidence/denken3/raw/`（`.gitattributes` で `-text`）に保存する。`denken3-strict-status.py` は私有側→追跡側の順で生応答を探す。旧作業環境の非追跡領域にしか生応答がない既存単位は `passRawNotInCheckout` として別計上し、strictPass には数えない。
- 旧レシートは Windows の CRLF 作業コピーでハッシュされていたため、`denken3-validate.py` と binder は LF/CRLF 双方の digest を受け付ける。どの版とも一致しなかった部分受入2件（2024上期法規問2、理論問15）は、行の正準JSONが厳格PASSの candidateSha256 と一致することを確かめた上でファイル digest だけ再固定し、`reviewedDataSha256Repair` に理由を残した。
- `scripts/denken3-restore-private.py` で新しいチェックアウトから私有ツリー（公式PDF、頁画像、参考資料頁、e-Gov、図切出し）を再構築できる。頁画像・図切出しは既存レシートのSHAとバイト一致を確認済み。例外：e-Gov パブコメ抜粋PDF（2024上期法規問8で使用）は現在 HTML を返し取得不能、2024下期法規問11の旧 p15.png は再現不能。
- `scripts/denken3-pipeline.py`：問ごとに 草稿→独立査読→（FIXなら修正、最大4回）→昇格→厳格直接査読→（FIXなら撤回・修正・再査読、最大3巡）を回し、収束しない問は HOLD のまま残す。`denken3-revise-draft.py`（独立査読または `--strict` 厳格レシートへの回答、旧草稿・旧査読を archive へ退避し改訂履歴にOpusレシートを残す）、`denken3-withdraw-candidate.py`（厳格PASS未結合の候補だけ撤回可）。
- 法規は問題冊子の注3「令和X年4月1日現在、効力のある法令（解釈を含む）」が基準日。2024年度（2025-03-23実施）は令和6年4月1日→解釈は令和5年12月26日改正版、2025年度（上期・下期とも）は令和7年4月1日→令和6年10月22日改正版。各改正の施行日は統合版PDF末尾の附則一覧（20241022-2.pdf 第237頁、dengikaishaku.pdf 第239頁）で確認し、法令は e-Gov API v2 の asof=基準日スナップショットを固定する。法規の査読には注3の頁を常に添付する。
- 厳格査読の依頼文に manifest 固定の年度・期・試験日・科目・PDF頁番号を入れた（試験日が原図に無いことによる FIX の防止）。
- 2025年度の図は描画クラスタ検出で切り出し、オーバーレイ一覧で全数目視、ラベル欠け・本文混入は手で矩形を修正。(a)/(b) 専用図は `part` で割当。

### 残作業（2026-09-24時点）

1. HOLD 2単位（2026-03-22 電力問1、法規問4）の一次資料を確保し、`denken3-pipeline.py` を `--refs`/`--note` 付きで再実行する。受入後に 320/320 と whole-paper 受入レシート（`docs/evidence/denken3/receipts/`）を作成し、`denken3-validate.py --accept` を通すまで公開ゲートは閉。
2. `REVERIFY-2026-09-24.md` の既存単位FIXをオーナー判断で修正するか決める（受入済みのため本作業では未変更）。
3. 旧作業環境で `denken3-strict-status.py` を実行し、旧生応答を含めて 318 となることを確認する。
