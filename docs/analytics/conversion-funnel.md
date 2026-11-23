# 課金までの流れ（2026-11-17 棚卸し）

管理画面: `/admin/conversion`（既存の管理者Basic認証）。PostHogの鍵・APIは不要。既存KV設定をサーバー内だけで利用する。既存の `/admin/funnel`、`/api/admin/funnel/billing`、journey/activity集計はそのまま残す。

## 新しい9指標

| 指標 | 記録する場所・条件 | 単位・重複の扱い |
|---|---|---|
| ①回答ゲスト数 | `posthogCapture` の `question_answered` / `blog_practice_answered` と、公表問題プレイヤーの選択回答・下書き付き記述の確定 → `/api/funnel/conversion`。未ログインで署名付きpractice_guestを検証できる場合のみ | JST日・Web/iOS・ゲストcookieごと1。取得、quiz_started、下書きなしの模範解答表示では増えない。署名付きcookieのないお試し回答・オフライン回答は対象外 |
| ②上限429ゲスト数 | `/api/billing/question` のゲストgrantが `limit` を返した場合 | JST日・Web/iOS・ゲストcookieごと1。10問目取得、短時間429、ログイン済みの上限は除く |
| ③月額案内表示 | `PracticeDailyLimit`、`BillingPageBeacon`、iOS会員画面の購入可能な月額案内が表示されたとき | 延べ表示。React StrictModeのeffect再実行は除外。別画面・再マウント・再表示は別回 |
| ④月額ボタン押下 | 無料上限ボタン、`MonthlyPage` の月額ボタン、iOSの月額リンク捕捉と登録ボタン | 延べ押下。同じ人の再タップも別回。iOSでリンク→登録ボタンと進む場合は2つの月額ボタンを数える |
| ⑤購入ログイン遷移 | 購入用callbackの `PurchaseSignInBeacon`。iOS購入操作の `loginFor('buy')` | 延べ回数。通常の履歴同期・購入復元ログインは除く。iOSは外部ログイン開始要求で、表示完了の保証はない |
| ⑥Checkout作成 | `MonthlyService.checkout` が新規セッションを保存した後の任意observer | 申込IDのハッシュで95日間重複除外。既存URL再取得・並行リクエストは増えない。Stripe API成功後のDB保存失敗は集計しない |
| ⑦支払い完了 | 署名検証・既存Webhook処理成功後、subscription Checkoutのcompleted/async_payment_succeeded、status=complete、payment_status=paid | Stripe sessionのハッシュで95日間重複除外。受信日ではなくevent.createdのJST日（created欠落時だけ受信日）。更新請求・App Storeは除く |
| ⑧決済から戻る | `PurchaseStatus` のcanceled表示（cancel_url到達） | 延べ表示。未払い・期限切れ全件ではなく、戻ってきた画面の件数。契約の解約数ではない |
| ⑨追加10問利用者 | 問題APIでfeedback bonusの新しい問題grantが成功したとき | JST日・Web/iOS・アカウントごと1。意見送信だけ・同じ問題の再取得は除く。別日に残りを使うとその日も1 |

### 保存・失敗時

- `conversion:v1:{環境}:{決済モード}:{JST日}:{web|ios|unknown}` のHASHに数値だけ保存。95日保持。テスト／本番は別キー。
- 人数の重複除外は日付・チャネルを含むHMACのSET（2日で失効）。生のcookie、IP、UA、メール、ユーザーID、問題ID、URL、回答本文はKVへ保存しない。
- Checkout重複除外のHMACと申込→経路のHMACキーは95日保持。経路不明の既存申込／記録失敗は `unknown`。Webと推測しない。HMACは既存サーバー設定で作る。
- Checkoutの重複除外キーは申込ごとに分け、後日の別申込で過去のキーの保持期限を延ばさない。
- 書き込みはLuaで重複除外と加算を原子的に実行し、すべてawait。失敗はfalseで終了。新しいKV通信は1回最大1秒、申込作成時は経路保存と加算で最大2秒追加。追加のDBクエリは購入・問題取得処理へ入れていない。ゲスト回答の別リクエストでは既存Authを確認する。
- 月額案内の通知はBeacon（iOSはヘッダー付きkeepalive fetch）。延べ回数の自動再送は行わない。回答ゲスト数はkeepalive fetchを使い、集計済みまたはログイン中との応答を受けたら、同じ画面セッション・JST日・経路の送信を省く。ゲストcookieが未発行だった場合や送信に失敗した場合は、次の回答を計測できる。広告ブロック・オフライン・通信失敗時は欠測する。
- 公開直後は旧クライアントが①③④⑤⑧を送らず、②⑥⑦のサーバー指標だけが増える場合がある。初日の比率は特に欠測を含む。
- 計測APIはイベント名だけを受け付け、サーバー確定4指標のクライアント申告を拒否する。サイトと同じOriginが必要で、省略時は同じサイトのRefererを使う。botと過大bodyを除外する。クライアント計測は1分あたりネットワークごとに120件、全体で1,000件まで。既存のKV書き込みと同じ処理で上限を判定する。KVへ送るネットワーク識別子は分ごとのHMACで、カウンターは120秒で失効する。
- 人数は自然人の厳密な人数ではなくゲストcookie単位。cookieの再発行や端末変更は別人数。①②はログイン済み無料会員を除き、③以降は会員を含む。
- 管理画面は直近14日の3経路×9指標と①→②→③→④→⑥→⑦の隣接比を表示。これは異なる単位の日別集計の比率であり、同一コホートの転換率ではない。100%超もそのまま表示し、分母0は「—」。過去データは復元しない。

## 既存PostHogイベントの棚卸し

共通: `lib/posthog.ts` がSDK初期化前に最大100件を待機、未設定時はPostHogのみno-op。許可された一部イベントは別途 `captureActivity` でも集計する。activityには無料上限・クリック・回答はあるが、practice_feedback_* とcheckout_* は含まれない。PostHog失敗はUIへ伝播しない。以下の表は改修前からあるイベントの発火条件。

| イベント | 画面・ファイル | 条件・単位／抜け・重複 |
|---|---|---|
| practice_free_limit_reached | `app/quiz/QuizClient.tsx` | 最後の無料問題取得でremaining=0、またはdaily_limit。マウント中はresetAtごとにrefで1回。送客referral_idのない再マウントでは再送し得る。**回答済み10問でも初回429でもない**。`/q`・公表問題単独プレイヤーには同名送信なし |
| practice_limit_viewed | `components/quiz/PracticeTransition.tsx` | 上限画面のeffect。再マウントで再送、freeDaily変更でも再送。ゲスト／ログイン済みの区別なし |
| practice_upgrade_clicked | 同上 | 無料上限の月額ボタン。`/billing` の月額ボタンとiOS captureによる遷移は旧計測で抜ける |
| practice_feedback_submitted | `components/quiz/FeedbackUnlock.tsx` | feedback-unlock POST成功後。送信成功であり、+10の消費ではない |
| practice_feedback_bonus_used | `app/quiz/QuizClient.tsx` | active問題取得時、feedbackBonus.newlyUsed=true。追加枠の各問題で発火し得る。`/q`等での利用を網羅しない |
| practice_feedback_customer_confirmation_viewed | `app/billing/PurchaseStatus.tsx` | paid/entitledと意見送信履歴を確認。sessionStorageで注文ごと抑止。意見が購入より前とは限らず、別セッションで再計上 |
| quiz_started | `QuizPlayer.tsx`、`exam-question-player.tsx`、`chusho-secondary/AnswerPractice.tsx` | 通常／公表問題の読み込み、診断士記述はready時。通常はマウント単位、公表問題はプレイヤー単位。人数・解答数ではない。個別`/q`は対象外 |
| question_answered | `QuizPlayer.tsx`、`QuestionAnswerCard.tsx` | 通常プレイヤーの回答確定、個別問題のrecordOutcome。両者は同名に合算される。再演習は再計上、認証状態は区別しない |
| exam_library_answered | `exam-question-player.tsx` | 選択肢クリックまたは記述のsubmit。選択問題はsubmittedガードで連打防止。記述は解答・模範解答確認の操作を含み、自然人の人数ではない |
| quiz_completed | `QuizPlayer.tsx` | 結果画面マウント時。通常演習のみ、公表問題・個別問題の完了と統一定義ではない |
| checkout_started | `app/billing/start/AutoCheckout.tsx` | Checkout API成功、遷移直前。既存URLの再取得も含む。ブラウザ未着・遷移のタイミングで欠測し得る |
| checkout_completed | `PurchaseStatus.tsx` | ブラウザの状態照会がpaid/entitledを確認。refでマウント中1回、送客referral_idがある場合はラッパーでも抑止。戻らない支払いは欠測、通常の再訪は重複し得る。Webhookの売上件数ではない |
| page_view | `components/PostHogProvider.tsx` | pathname/searchの変化。SDK側と独立したactivity用ルートtrackerがあるためposthogCaptureではactivityへ再送しない |
| referrer_with_utm | 同上 | UTM付到着を検出。page_viewとは別イベントであり訪問数に合算しない |
| referral_landed | `lib/posthog.ts` | 送客情報があり最初のイベント配信時に補完。referral_idで抑止。直接呼び出し箇所の検索だけでは見えない |
| referral_practice_clicked | `components/analytics/TsuginoWelcome.tsx` | 次の資格からの案内の演習ボタン押下 |
| ai_query_sent | `components/copilot/CopilotPanel.tsx` | AI送信時。無料問題枠や回答数とは別指標 |
| exam_library_ai_query | `components/exam-library/exam-copilot.tsx` | 公表問題のAI送信時。通常copilotとイベント名が別 |
| copilot_response_received / copilot_response_stopped | `CopilotPanel.tsx` | 応答完了／停止。送信イベントと重ねて人数を数えない |
| copilot_citation_clicked / copilot_citation_detail_opened / copilot_citation_full_opened | `components/copilot/CitationCards.tsx` | 引用カードの選択／詳細／全文表示。複数操作で増える |
| copilot_related_question_clicked | `components/copilot/RelatedQuestions.tsx` | 関連問題リンク押下 |
| blog_viewed / essay_viewed / stats_viewed | 各ページの `ViewTracker.tsx` | マウント時effect。再マウント／開発StrictModeで増え得る |
| blog_article_scrolled | `components/blog/BlogScrollTracker.tsx` | 記事スクロール条件達成。記事到着や課金案内表示ではない |
| blog_practice_answered / blog_practice_continued | `components/blog/BlogPractice.tsx` | 記事内お試し回答／同分野演習リンク。通常演習と分離 |
| essay_industry_switched | `EssayIndustryTabs.tsx` | 論文の業種タブ変更 |
| faq_expanded | `components/faq/FaqItem.tsx` | FAQ展開。複数開閉で増える |
| feedback_submitted | `components/FeedbackGateModal.tsx` | 別の意見フォーム送信。practice_feedback_submittedとは別 |
| contact_form_submitted | `app/contact/ContactForm.tsx` | 問い合わせ成功。意見+10の利用ではない |
| book_click | `components/analytics/TrackedBookLink.tsx` | 書籍リンク押下。月額購入と混同しない |
| copilot_question_example_clicked | `lib/posthog.ts` の型定義のみ | 呼び出し元なし。定義があっても数字は出ない |

既存KV `funnel:v1` は無料上限の**画面表示**をfree_limit_reachedと命名しており、サーバーでの429とは異なる。ブラウザ側とKV側で日別に重複抑止するため、表示回数／押下回数の延べ数には使えない。checkout_startedは利用者単位、checkout_completedはsession単位で単位も異なる。旧KVのcheckout_completedはsubscriptionのstatus=completeを条件とし、payment_status=paidの条件がない。新⑦はpaidを要求する。新指標は旧指標と足さず、別系列として読む。
