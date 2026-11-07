## ClaudeへのPreview実AI確認引継ぎ（INT5B手順をbatch3へ更新）

この確認はユーザー指定どおりClaudeが担当します。INT7ではデプロイや実AI呼出しをしません。以下が揃うまで「実AI検証済み」「公開承認済み」と扱いません。

**AI経路の変更あり。** 起点ef95cd92dとの差分では、PRKによって `/api/copilot` の `character` / `characterEnabled` 入力と `lib/copilot/prompt-assembly.ts` のキャラクタープロンプト合成を撤去しました。Copilot UIもキャラクター・note関連導線を整理しています。新規資格の公開により通常コパイロットの問題コンテキストにも新しい資格・科目・全肢解説・正答特例が入ります。provider・モデル・月額上限50,000円・レート値は変更していません。`/api/copilot/exam-library`・`/api/scoring`・`/api/essay-grade` の実装自体は起点から差分なしですが、INT5以来のPreview実証引継ぎ4経路は継続します。類題生成は両コパイロットの拒否仕様を維持します。

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

