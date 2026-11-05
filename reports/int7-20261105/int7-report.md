# INT7: 過去問AI 次回公開統合ブランチ

作業日：2026-11-05 JST。状態：ローカル統合・全検証完了、最終独立レビューPASS（未公開）。

## ブランチと範囲

- worktree：`C:/Users/kanet/20260522/wt-batch3`
- branch：`release/batch3-20261105`
- 検証済み実装SHA：`1ca14f4ce39be16b8b00660800bd05a225ff0ee2`。以後のアプリ実装変更なし。E2E待機修正と報告・証跡のみ。
- 起点：`release/batch2-20261105` = `ef95cd92d198186d2dc52095bd27fe4ebea4676e`
- 既存worktreeの未コミット変更には触れていません。batch2の `reports/int1b-20261104/count-audit.json` の別件差分も取り込んでいません。
- PRK＋AD2、KGROW1、KFUN1、PRT2 `71695cd6b` と指定資格9ブランチをmergeし、取り込み元先端を全て祖先に保持します。二級建築士ブランチの固定先端は `88685e0a4`。batch1・batch2も継承します。
- ビルドは次の公開にまとめ、AdSense再申請は整理を全て含む公開後に1回。今回push・PR・デプロイ・本番DB接続・AdSense再申請はしていません。

## 公開予定と原稿保持

公開予定一覧は同フォルダの `batch3-publish-list.md`。INT1Bと同じ「# / 資格 / 演習設問 / 収録回・範囲・除外 / 成果コミット」形式です。既存一覧を継承し、今回の追加10公開資格を記載しています。

追加保存単位1,784から、准看護師2026年問6と土壌汚染2025年度調査問30の公式全員正解2問を通常演習から除外し、1,782設問を公開候補へ接続。毒物劇物480は解答欄単位。通常の選択式1,772と測量士午後の自己確認10大問を分けています。二級200＋木造200でブランチ内の400問全てを扱います。土地区画整理士は2026年度のみ40問と資格ページ・SEO説明・一覧へ明記。

元ステージング1,387ファイルは各取り込み元とGit差分なし。`publicAllowed=false`・`needsReview=true` など原稿の履歴を保持し、`scripts/build-batch3-projections.py` により別の公開投影を生成しました。公開投影の公開フラグ・確認フラグはオーナーの今回の公開指示に基づき変更し、人手専門家校閲や権利者許諾を取得済みと偽装していません。原本画像・公式解答例・答案用紙を1,244のsource asset mappingで公開画像へ複製し、SHA256一致を検査します。

同期・非同期ローダー、ExamCode/Session、EXAM_CONFIGS、資格台帳、ホーム、科目名、番号表示、SEO説明・JSON-LDへ接続。通常公開問題は合計36,980。既存141資格の通常演習件数はbatch2の監査台帳から全て変化なし（`runtime-audit.json`）。検証コマンドの36,981は別に保持する一級建築士全員加点1問を含む検証母集団です。

## 競合解決と修正

- 改行差でファイル全体が競合した箇所は三者をLFで比較し直し、内容の競合を個別に解決しました。
- `app/layout.tsx`：PRKのnote導線撤去とINT5のFeedbackAccountClaimを両立。
- 両クイズプレイヤー：iOSのNativeQuestionGate・認可キャッシュ・quiet UIを残し、学習継続・関連問題UIを追加。試験ライブラリのquestionIndex/resolveQuestion/resolveResultsは保持し、廃止noteLinksだけ撤去。
- `QuizClient`：共有session-poolへKGROWのdue復習対象を移植。模試誤答・年度別全問・関連順序・deep link復元を保持し、関連移動もnativeの認可後だけ本文を表示。
- related API：strict/nativeでは空の任意プレビューをno-storeで返し、選択前に複数の本文を漏洩・自動消費しない。nativeクライアントでは任意プレビューの自動取得自体を止めます。通常Webの関連問題導線は継続。
- PostHog：native/authの計測除外を保持し、KFUNのreferral訪問と段階計測を統合。購入確認には既存のフィードバック顧客表示イベントとKFUNのcheckout完了イベントを両方保持。
- contact：既存の特典問い合わせ案内を保持し、`site=tsugino` の種別初期選択とSlackルーティングを追加。実問い合わせは送信していません。
- package.json：INT5Bのmigration→Nextというbuild前段を保持。SWバージョンはbatch3用に更新。Prisma・migration SQL・自動適用ゲート・Vercel設定・iOS server本体は起点から変更なし。

中間独立レビューは候補 `17d7ea6b1` に3件FAIL（測量士自己確認の判定漏れ、nativeのrelated自動取得、解答用紙画像の不足）。全3件を修正し、自己確認表示・原本用紙の公開投影・APIのゲート境界を統合テストで確認しました。最終候補を再レビューし、下記に結果を記録します。過去のUIハッシュ台帳は変更せず、新しいbatch3台帳を追加し、既存338原問の内容・core pinsの検査を保持しました。

## 検証

検証済みアプリ実装SHAは `1ca14f4ce39be16b8b00660800bd05a225ff0ee2` で、採用する検証は全て終了コード0。ブラウザ検証の実行HEADは `122a252a0b4ca0f0dfbd6e1d499d49bcbaa2fc64` で、差分はE2Eの遷移待機・遅延画像待機だけです。`source-equivalence.json` でアプリのバイト相当差分ゼロを確認し、build・全ユニットをやり直す変更はしていません。QA変更後のtypecheckと対象lintもPASS。測量士の修正テストはretryなし5回連続PASSです。`final-validation.json` にコマンド、実行時刻、sourceHead、ログSHA256、画面SHA256を集約しています。

| 検証 | 最終結果 | 証跡（worktree reports/int7-20261105/） |
|---|---|---|
| typecheck | PASS | candidate-typecheck.log / .result.json |
| lint | PASS、0エラー・12警告 | candidate-lint.log / .result.json |
| 全ユニットテスト | 7,874 PASS / 10 skip / 0 fail、全7,884件 | candidate-test.json / .log / .result.json |
| validate:questions | 36,981正常、fail 0、warn 20,972。別に非公開原稿40件 | candidate-validate.log / .result.json |
| 本番build | PASS、19,591静的ページ。migrationはローカルとしてSkipped | candidate-build.log / .result.json |
| CIと同じE2E | 全384件＝371 PASS・12 skip・1 flaky・0 fail | candidate-e2e.log / .result.json |
| KFUN追加E2E | 7/7 PASS、390px/1440px、retry 0 | candidate-funnel.log、funnel/、funnel-environment.json |
| スマホ実画面 | 390×844で26画像、目視確認、横はみ出し/ブラウザ例外0 | candidate-visual.log、visual-receipt.json、visual-qa.md、screenshots/ |
| 原稿・祖先・公開投影 | 1,387原稿不変、1,784→1,782、1244 asset mapping一致 | candidate-source-audit.log、candidate-projection-audit.log、projection-audit.json |
| 既存件数・同期/遅延 | 141資格全て不変、新規1,782、公開計36,980 | candidate-runtime-audit.log、runtime-audit.json |
| CI workflow・migration gate・安全系・政府出典 | 全PASS | candidate-workflow / candidate-migrate-gate / candidate-safety-sources / candidate-government-sources のログ |

CIの `pnpm e2e`・同じPlaywright設定（CI=1、2 workers、retry最大1）を使用。実行環境はWindows、Node24.13.1、pnpm10.33.0で、GitHubのLinux/Node22 runnerを起動したという意味ではありません。ユニットはメモリを抑えて最大2 workersで全件実行。サービス資格情報はOS環境allowlistから除き、秘密envファイルは使っていません。

ユニットの既定skip10件は任意PostgreSQL統合8件（DB未設定）と給水原本のPoppler照合2件（Windowsにpdftotextなし）。これらを実行済みとは扱っていません。

最終E2Eのflaky1件は、既存の「存在しないURL→404」で初回だけ `read ECONNRESET`、CI既定のretry1回で28msのPASSでした（`e2e-flaky/`）。新規資格4検査は全て初回PASSです。測量士の旧テスト待機不備と混同せず記録します。別worktreeがポート3000を使用していた開始前の停止も `e2e-port-busy.*` に保持し、他の作業のプロセスは停止していません。

E2Eの既定skip12件はPAID_MODE用法人問い合わせ5件＋専用環境が必要なKFUN7件。KFUN7件は別途すべて実行済み。法人問い合わせの実送信はしていません。専用KFUNはloopbackのKV stub、mock billing、合成認証/計測キーと外部通信遮断を使い、実決済・実PostHog・本番DBは使いません。

警告は0と偽っていません。lint12件は既存/取り込み元の未使用変数等。validate警告20,972件には短い解説や要確認の注記等が含まれ、新規原稿の警告もあります。buildには既存のチャートサイズ・Edge静的生成・middleware移行に関する警告があります。いずれも終了コード0です。専門家による内容校閲をこの自動検証のPASSと同一視しません。

中間の失敗/中断ログも保持しています。初回は外部worktreeへのnode_modules junctionをTurbopackが拒否し、.npmrcのhoisted設定を使うローカル物理依存に修正。原本画像テスト、購入イベントの追加、iOSカタログ、科目/年度表示、既存E2EのIPA件数とUTM保持期待を修正しました。PowerShell→Pythonの日本語文字コード問題もUTF-8ファイル経由で修正し、文字化け検査を追加しました。メモリ競合と候補更新時に旧テスト/buildを明示停止したため、中間exit1を最終PASSには数えていません。採用証跡は `candidate-*` のみです。自分の不要な一時依存フォルダは削除の自動ポリシー拒否後に削除せず、NTFS圧縮を使って容量を確保し、作業用Temp内に残しています。

最終E2Eの初回に測量士の同名regionを遷移前の元ページで操作する競合をトレースで特定しました（navigation-race/）。アプリは変更せず、URL・見出しの遷移完了と画像読み込み待機を追加し、5回連続PASS後にCIと同じ全E2Eを再実行しています。

実画面確認では農業用品目の内部名・土壌汚染午後の誤った自己確認ラベルを発見し修正。旅行科目も日本語化し学習計画の分類と一致させ、再ビルド・全テスト・E2E・画面確認を完了しました。元原文・正答は変更していません。既存INT1B監査ファイルをテストが更新する副作用は、新バッチの証跡へコピー後、今回worktree内だけで元へ戻しています。

## GSC流入URLの維持

正本：`gsc-summary-20261104.md`（2026-08-03〜11-02の実測）。対象は `/sc`（202クリック）・`/nw`（165）・`/st`（113）・`/sa`（89）・`/ap`（38）、トップ、`/blog` と上位4記事（履歴書56、複数区分45、高度午前I対策31、NW午後時間配分30）。実測の再取得やSearch Consoleへの接続はせず、手元の結果に基づいてローカル実HTTP・canonical・画面で維持を検証します。PRKの廃止URLと流入URLを混同せず、全104 mappings（103 unique URLs）はHTTP200・UTM/subject保持・canonicalあり。GSC対象10URLは全てHTTP200・正規canonical一致。/blog一覧もモバイルE2EでHTTP200とcanonical一致を確認しました。`local-landings.json` のsourceRevisionは入力fixtureの基準コミットで、実行候補SHAは `candidate-visual.result.json` のsourceHeadです。スマホでSCトップと流入上位記事の実画面も確認済み。

## ClaudeへのPreview実AI確認引継ぎ（INT5B手順をbatch3へ更新）

この確認はユーザー指定どおりClaudeが担当します。INT7ではデプロイや実AI呼出しをしません。以下が揃うまで「実AI検証済み」「公開承認済み」と扱いません。

**AI経路の変更あり。** API別のGit blob照合は `ai-path-audit.json`。 起点ef95cd92dとの差分では、PRKによって `/api/copilot` の `character` / `characterEnabled` 入力と `lib/copilot/prompt-assembly.ts` のキャラクタープロンプト合成を撤去しました。Copilot UIもキャラクター・note関連導線を整理しています。新規資格の公開により通常コパイロットの問題コンテキストにも新しい資格・科目・全肢解説・正答特例が入ります。provider・モデル・月額上限50,000円・レート値は変更していません。`/api/copilot/exam-library`・`/api/scoring`・`/api/essay-grade` の実装自体は起点から差分なしですが、INT5以来のPreview実証引継ぎ4経路は継続します。類題生成は両コパイロットの拒否仕様を維持します。

INT5Bからの追加：Preview対象は **release/batch3-20261105 の最終候補SHA** へ置き換えます。資格表示・問い・正答・図が一致していることを確認してから実送信し、旧キャラクター指定がUIから送られないことをNetworkで確認します。`MOBILE_IAP_ENABLED=true` のPreviewではWebも既存のstrict gateが適用されるため、正常な本人確認・content grant・AI同意を使います。gateを無効化して成功扱いにはしません。

### 事前条件と共通手順

1. Claudeが対象Preview URL・Deployment ID・commit SHAを固定する。本番URLを使わない。PreviewのbuildログでmigrationがSkippedになっていることを確認する。
2. PreviewのGeminiと共有KV設定を既存の秘密管理経路で利用する。キーやKVトークンを取得/表示/報告しない。`X-Provider: mock`、mock応答、費用/会員状態不明による503を成功扱いしない。月額上限50,000円・レート値・無料枠・モデルを変更しない。
3. 実際の画面から問題と答案を選び、必要な会員ログイン/権限を確保する。新しいAI送信同意UIで同意前には非送信、同意後だけ送信することを確認する。strict gateが有効なら正規のcontent grantと `X-Kakomon-AI-Consent: 20261103` を使う。Cookie/トークンを報告へ残さない。
4. 各リクエストの直前・完了後に、Previewで使用する共有KVの `ai_cost:YYYY-MM` を読取りで比較する（月境界はJST）。予約額の増加中ではなく、応答完了と精算後の実測差分を見る。予算変更やキーの書換えは行わない。`/api/admin/api-usage` はこの費用キーを返すAPIではないので代用しない。
5. 下表4経路を各1回、重複送信せず実行する。DevTools NetworkでURL・送信bodyの形式・HTTP status・安全な応答ヘッダー・応答本文を確認する。本文を目視し、問題に対応した内容、採点根拠、JSON/文章の末尾まで確認する。
6. 同じリクエストの実行時刻/questionIdでPreview Runtime Logsを照合し、`finishReason=STOP` と実測トークン数を確認する。`MAX_TOKENS`、途中切断、タイムアウト、簡易/モック判定、費用不増加は不合格。HTTP 200だけでは合格にしない。

### 確認するAPIと入力・合格条件

| POST API | 画面/入力bodyの要点 | 確認する応答と証跡 |
| --- | --- | --- |
| `/api/copilot` | 通常の午前問題を表示し質問を送信。`question:{id}`, `messages:[{role:"user",content:"この問題の根拠を説明して"}]`。実在するidは画面から取得 | `X-Provider: gemini`、`X-Model`が実モデル、text streamが問題の根拠を説明。`[copilot] completed`ログのSTOP/実測tokens、費用増加 |
| `/api/copilot/exam-library` | 資格ライブラリの選択問題で質問。`examId`, `questionId`, `messages`、必要なら `selectedChoice`（1〜9の整数またはnull） | `X-Provider: gemini`、完了したtext stream、STOPの証跡、費用増加。下記の観測上の注意を参照 |
| `/api/scoring` | 午後記述問題に実際の答案を入力して採点。`questionId`, `answers:[{label:"画面の設問ラベル",text:"答案"}]` | JSONの `status:"graded"`, `gradingMode:"ai"`、全設問の採点根拠と得点。`[scoring] response received`ログのSTOP/実測tokens、費用増加 |
| `/api/essay-grade` | 独自論述問題のア/イ/ウと業種を入力して採点。`questionId`, `industry`（例 `it`）, `answers:{ア:"答案",イ:"答案",ウ:"答案"}` | `status:"graded"`, `gradingMode:"ai"`、ア/イ/ウの評価/改善点が答案に対応。`[essay-grade] response received`ログのSTOP/実測tokens、費用増加 |

`/api/copilot/exam-library` は現状、HTTPヘッダー/本文にfinishReasonを返さず、onCompleteにもSTOPのログを出していない。他のコパイロットのログから推測しない。Claudeはこの経路のPreview検証時に、onCompleteでquestionId/model/finishReason/トークン件数だけを記録するPreview用観測を用意するか、同一リクエストのプロバイダ側メタデータを取得してSTOPを証明する。秘密値・プロンプト・答案のログ追加は不要。証跡が得られなければ§7のSTOP確認は未達と明記する。INT5BではAIコード自体を変更していない。

類題生成は現行の2つのコパイロットで `requestsNewQuestion` によりprovider実行前に拒否する仕様。両APIで「類題を作って」を送る追加の拒否確認は `400 original_question_explanation_only` かつ非課金が期待値。類題生成の有効化やプロンプト変更はしない。

Claudeの記録はAPI別に、Preview/commit/questionId/時刻、status、provider/model、採点ならgradingMode、finishReason、実測tokens、費用キーと前後値、本文目視結果を残す。認証情報を含むHAR全体をそのまま保存しない。4経路と拒否動作の結果を別報告として返す。


### batch3追加の画面・コンテキスト確認

- 通常コパイロット1回の確認には、新規資格の選択式（例：弁理士 `/q/benrishi/2025-annual/patent/q1`）も使用できます。資格名・年度・公式正答・全肢解説に沿った返答かを確認します。IPAで4経路を確認した場合は、この新規資格コンテキストを追加で1回確認してください。
- 複数選択の地域限定旅行は「すべて選ぶ」条件を保持し、准看護師2026年問139は2または4の単独正答として説明されることを確認します。全員正解で除外した准看護師問6・土壌汚染2025年度調査問30を通常の択一として送信しません。
- 測量士は原本画像が本文の正本です。午前の文字列は設問番号・画像参照と選択肢番号で、全文OCRを確定したデータではありません。AIへ画像原文が渡っていると推測しないでください。応答が掲載解説で確認できない図中の条件や数値を作っていないかを見ます。
- 測量士午後10大問は記述・作図の**自己確認**です。原問題・答案用紙・公式解答例画像と独自解説を確認し、自動採点・採点根拠・得点をAIが返す機能として試験しません。必須No.1とNo.2〜5から2題という受験条件も維持します。
- KFUN1の計測は実PostHogや実決済を使わず、ローカル検証で確認します。Previewで計測を確認する際も送信先・環境を分離し、本番購入や問い合わせ実送信を作りません。


## 最終独立レビュー・保存状態

指定の `C:/Users/kanet/AppData/Roaming/npm/codex.cmd exec -m gpt-6-astra -s read-only` で、実装・証跡・報告を独立レビューしました。結果ファイルは `independent-review-final.md`、実行記録は `.result.json` と `.log` です。

**最終判定：VERDICT: PASS。** レビュー対象HEADは `ae52186d939b6a5895208fbe6c826def08d5dba8`、実行時間111.9秒。 必須修正なし。検証後の変更は最終報告・レビュー証跡のみで、アプリ実装は上記検証済みSHAと同一です。Preview実AI4経路・STOP/費用増加の実証はClaude担当として明示的に残します。今回のローカル統合作業は完了、push・PR・デプロイ・本番DB接続はしていません。

保存確認：要求された外部2ファイルとworktree内の一覧・報告は同一内容で保存。レビュー後の変更はこの完了記録・レビュー証跡だけです。最終コミットSHAはブランチHEADで確認できます。
