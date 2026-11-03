# IOS1B 実装報告

報告日: 2026-11-03（日本時間）

## 結果と対象

所有者の最終指示に合わせ、旧36問限定アプリを置き換えた。全問題をオンラインで使い、全ページ・全モードを既存ウェブの同じ実装で提供する。任意の事前ダウンロードは有料会員専用。課金も初版に含めた。実装とローカル検証は完了したが、本番有効化・iOSネイティブビルド・実購入・審査完了を意味しない。後述の設定/承認/実機確認が公開前に必要。

- 作業場所: `C:/Users/kanet/20260522/ipa-quiz-ios1`
- ブランチ: `feat/ios-app-v1-20261103`（既存worktree/ブランチで継続）
- 起点: `455f1aabd`、ウェブ・意見追加枠の取込元: `e41dc33be`（既存ローカルの `feat/feedback-unlock-10-20261103`）。古いアプリ起点のデータだけでは現行ウェブと一致しないため、ローカルでマージした。
- ウェブ統合コミット: `c91fbdc86`
- IOS1B実装コミット: `666a49bcabea30813ec04301e24c4e44d254f657`
- 元リポジトリの作業ツリーは編集していない。共通化に必要なウェブ側の変更はこのworktree内で行い、関連回帰テストを実施。

## 再利用の方式と動作範囲

起動はCapacitorの同梱React画面。オンラインでは同じWKWebViewで `https://www.kakomon-ai.jp` のNext.jsページを実行する。iframeや別にコピーした画面群は使わない。`server.url` は設定せず、許可したサイトへのナビゲーションと同梱エラー画面を使う。既存のRSC/React・認証・同期・AI/採点APIをそのまま利用するので、125ページの機能を縮小した別実装にしない。オンライン機能の本番利用には、このブランチのサイト側変更を所有者の手順で公開する必要がある（今回は公開していない）。

オフライン用同梱画面は、通常の `QuizPlayer`、`ExamQuestionPlayer`、FP各形式、電験原問/二次、社労士選択式、中小企業診断士二次、論述エディターを直接importする。ウェブページから表示部分を共通Reactビューへ移動した。問題本文はウェブのローダーを再利用するAPIから取得し、ウェブとアプリでコピー管理しない。抽選処理・書式関数・論述メタデータを本文ローダーから分離し、アプリへ全本文が混入しないようビルドで検査する。

保存問題の演習・端末履歴・通知・共有はネイティブ機能。AI、ログイン、クラウド同期、サーバー採点、全ページのオンライン利用には通信が必要。4.2に対するネイティブ価値として保存問題/画像キャッシュ・通知・共有を維持した。審査適合を保証するものではない。

## 問題数の照合

共通ローダーから目次を生成し、公開判定を含めてウェブと全件一致することを自動検証した。非公開・照合保留の問題をアプリだけで公開せず、ウェブの出題可能範囲と同じにする。独自練習/論述教材は元の表示区分を維持する。

| 区分 | 件数/容量 | 解釈 |
| --- | --- | --- |
| 通常資格 | 84資格・24,745問 | 通常出題ローダーの全公開問題 |
| 公開試験紙ライブラリー | 113紙・2,382問 | ExamQuestionの全公開問題 |
| 別形式教材 | 14群・571件 | FP実技/応用、電験、選択式、記述/論述等 |
| 目次/取得単位 | 211件 | 84資格＋113試験紙＋14別形式。211資格という意味ではない |
| ユニーク問題ID | 27,665 | 27,698表示レコードに33件の形式間ID重複を含むため、単純合算を独立問題数としない |
| 対象ソースJSON | 1076ファイル / 79,717,228 bytes | 本文の品質/補正を含む対象ソース |
| 取得する本文JSON合計 | 68,667,346 bytes | 全単位をJSON化した容量。全件同梱はしない |
| 最大APIページ | 225,451 bytes | 10件単位の本文JSON。API共通ラッパー分は別 |
| 目次メタデータ | 141,620 bytes | コンパクトJSON換算。問題本文を含まない |

根拠: `mobile/src/generated/catalog.json`、`mobile/docs/content-size.json`、`mobile/scripts/generate-catalog.ts`、`__tests__/mobile/catalog-parity.test.ts`。再生成は `cd mobile; npm run catalog`。

## ウェブ機能 → アプリ実装 → 状態

「実装」はソース上の対応を示す。全125ページを同一iOS端末で個別に操作した、という意味ではない。テスト済み範囲を各行と検証結果で区別した。

| ウェブ機能 | アプリ実装 | 状態 |
| --- | --- | --- |
| 全資格・全問題 | 共通ローダーから生成する211件の目次を同梱。本文は既存サイトのページ/APIから取得 | 実装・全件一致テスト済み |
| ランダム | 共通QuizClient / QuizPlayer。抽選処理をlib/questions/session-pool.tsへ移動し同梱画面からも利用 | 実装・関連テスト済み |
| 年度別・順番・科目指定 | /modes/year・/quizの同じUIと絞り込み。保存問題も共通filterQuestions | 実装・関連テスト済み |
| 分野別・トピック別 | /modes/topic・/[exam]/topic/[topicSlug]・共通filterQuestions | 実装 |
| 模試・計時・結果・得点 | /mock-examの既存ページ・Runner・API。問題開始を共通サーバー枠で確認 | 実装 |
| 未回答 | 共通QuizClient / filterQuestionsと既存履歴 | 実装 |
| 復習・誤答のみ・苦手・SRS | /review・/quiz/review・review/weaknessの共通処理。保存問題でも同じ履歴を利用 | 実装 |
| 連続出題・ストリーム | /quiz/stream・StreamQuizPlayer・既存API。IAPも有料判定へ統合 | 実装 |
| ブックマーク・タグ・メモ | /bookmarks・既存保存/同期API・共通プレイヤー | 実装 |
| 選択肢・正誤・解説・図表・出典 | 共通QuizPlayer / QuestionAnswerCard。画像は必要時取得、端末キャッシュ | 実装・関連テスト済み |
| 検索・キーワード・用語・分野記事 | /search・/keywords・/glossary・/topicsの同じページ/API | 実装 |
| 公開試験紙ライブラリー | /e-learning/exams・検索/進捗・ExamQuestionPlayer。113紙すべて目次・保存APIへ登録 | 実装・全件一致テスト済み |
| FP1応用・FP2/FP3実技 | 元ページの表示をFp1AppliedView / Fp2PracticalView / Fp3PracticalViewへ移動。ウェブ・同梱画面から同じReactをimport | 実装・関連/FP3画面テスト済み |
| 電験1/2/3原問・電験2二次 | NativeReaderView / SecondaryReaderを共用。公式画像の既存出典と品質判定を保持 | 実装・関連テスト済み |
| 社労士選択式・中小企業診断士二次 | 共通SentakuReader / CaseQuestionView。表示用関数だけを本文ローダーから分離 | 実装・関連テスト済み |
| 午後記述・論述・独自練習 | /essay・/essays・/[exam]/afternoon・/[exam]/essayをそのまま利用。保存時も同じエディター | 実装・関連テスト済み |
| 午後記述・論述のAI採点と履歴 | 既存/scoring・essay-grade系APIとEssayEditor / EssayResultView。採点は通信必須 | 実装・モックAPIテスト済み |
| AIコパイロット・RAG・引用・会話共有 | 既存Copilot UIと/api/copilot等を共用。ローカル画面の相対APIも固定サイトのNative HTTPへ接続 | 実装・モックAPIテスト済み |
| 学習履歴・統計・再開 | /account/dashboard・/stats・/e-learning/progress・既存履歴。会員所有者別スナップショットで端末画面と受け渡し | 実装・履歴再起動画面テスト済み |
| ログイン・学習同期・アカウント境界 | 既存Auth.jsと同期API。OSブラウザーでログイン、PKCE/state/一回用コードでHttpOnly Cookieへ引継ぎ | 実装・モック/境界テスト済み |
| Sign in with Apple | Auth.js Apple provider追加。Apple未設定時はアプリ用ログイン経路にGoogle/GitHubを出さない | 実装・実設定/実機待ち |
| 最初の10問はログイン不要 | 既存ゲスト署名Cookieとサーバーの日次枠を利用。アプリで資格・問題を限定しない | 実装・10/11問目テスト済み |
| 無料枠・日本時間0時リセット | /api/billing/questionの既存KV・日付・distinct問題ID判定。nativeヘッダー時はサイトのゲート無効フラグにもかかわらず無料10問を必ず適用 | 実装・既存/アプリ枠テスト済み |
| 意見送信で追加10問 | 既存FeedbackUnlock・/api/feedbackと会員IDに紐づくDB付与を共用。ログイン復帰先/下書きを保持 | 実装・関連テスト済み |
| 有料は全資格・全問題を無制限 | ウェブ購読を最優先。次にサーバーが確認したRevenueCat kakomon_proを適用。SDKの自己申告やlocalStorageだけで解除しない | 実装・期限/優先順テスト済み |
| 初版のApp Store課金 | 公式@revenuecat/purchases-capacitor 14.0.0。月額980円税込・1か月自動更新1種。商品ID/Offering/APIキーは設定 | 実装・SDKモックテスト済み |
| 二重購入防止・購入待ち・キャンセル | ウェブ有料には追加購入を表示せず、購入直前もサーバー権利を再確認。保留購入を保存して再購入を停止 | 実装・モック/ウェブ有料画面テスト済み |
| 購入復元・管理/解約・法的表示 | SDK restorePurchases、App Store購読管理、利用規約・プライバシー・Apple EULA・自動更新説明 | 実装・画面テスト済み |
| RevenueCat webhook・権利台帳 | 認証/app ID/環境を検証しDB行ロック後に公式APIから最新権利を再取得。返金/失効/移管・重複/逆順通知に対応 | 実装・モックテスト済み。SQL適用は所有者承認待ち |
| 資格ごとの事前ダウンロード | 有料専用。通常資格と関連別形式/試験紙を資格単位で保存。10件ずつ取得、件数・ID・SHA-256・版・所有者を確認後に参照先を切替 | 実装・モック/画面テスト済み |
| 無料ユーザーへの保存案内 | 保存ボタンは有料特典案内のみ。download APIも未ログイン/無料に403。旧36問パックAPIは410 | 実装・API/画面テスト済み |
| オフライン演習・失効時の利用停止 | 固定公開鍵でP-256署名を検証。有料期限または発行後24時間の早い方まで。ログアウト/会員変更/オンライン失効確認で無効化 | 実装・改ざん/失効テスト済み |
| 保存によるオンライン高速化 | 保存本文のハッシュをサーバーの現行本文と照合し、利用許可後に本文再送を省略。prefetchも保存済み本文を利用 | 実装・関連テスト済み |
| 画像キャッシュ | 必要時に取得、100MBのLRUキャッシュ。未保存画像は通信が必要。図表を全件同梱しない | 実装 |
| 毎日の通知・復習への復帰 | Capacitor Local Notifications。設定時だけ許可要求、同一IDを置換、通知タップで復習へ | 実装・モックテスト済み。iOS実機待ち |
| OS共有 | Capacitor Shareによるページ/学習結果の共有シート | 実装・iOS実機待ち |
| 学習計画・ランキング・報酬・連続学習 | 既存/study-plan・/account/study-plan・/ranking・challengeと共通ロジック | 実装 |
| 設定・テーマ・BYOK・同期設定 | /settings・/settings/api-keysを同じウェブUI/APIで利用 | 実装 |
| 記事・資格ハブ・体験談・紹介・学生・情報/法務 | 125ページの既存経路すべてを同一ホストで利用。外部リンクはOSブラウザー | 実装・下表に全経路 |
| 管理者ページ | /admin/*も同じページを利用し既存の管理者権限チェックを維持 | 実装・一般ユーザーには従来どおり非公開 |

## 全ページ対応表（125パターン）

`app/**/page.tsx` の公開ルートを列挙した。動的パラメーターを1パターンとして数え、内部の `_components` や `extension-page.tsx` はページ数へ加算しない。データ: `mobile/docs/route-matrix.json`。課金だけはアプリ内でRevenueCatの購入/復元画面へ置き換える。認可・公開条件・ログイン必須条件は既存サイトの条件を保持する。

| ウェブルート | アプリ実装 | 状態 |
| --- | --- | --- |
| `/about` | 同一Next.jsページ・React・既存APIを同じWebViewで利用 | 共通実装／個別実機未検証 |
| `/account/dashboard` | 同一Next.jsページ・React・既存APIを同じWebViewで利用 | 共通実装／個別実機未検証 |
| `/account/essay-history` | 同一Next.jsページ・React・既存APIを同じWebViewで利用 | 共通実装／個別実機未検証 |
| `/account` | 同一Next.jsページ・React・既存APIを同じWebViewで利用 | 共通実装／個別実機未検証 |
| `/account/study-plan` | 同一Next.jsページ・React・既存APIを同じWebViewで利用 | 共通実装／個別実機未検証 |
| `/admin/api-usage` | 同一Next.jsページ/API・既存の管理者権限判定 | 共通実装／個別実機未検証 |
| `/admin/competitors` | 同一Next.jsページ/API・既存の管理者権限判定 | 共通実装／個別実機未検証 |
| `/admin/deployment-status` | 同一Next.jsページ/API・既存の管理者権限判定 | 共通実装／個別実機未検証 |
| `/admin/errors` | 同一Next.jsページ/API・既存の管理者権限判定 | 共通実装／個別実機未検証 |
| `/admin/exam-usage` | 同一Next.jsページ/API・既存の管理者権限判定 | 共通実装／個別実機未検証 |
| `/admin/feedback` | 同一Next.jsページ/API・既存の管理者権限判定 | 共通実装／個別実機未検証 |
| `/admin/funnel` | 同一Next.jsページ/API・既存の管理者権限判定 | 共通実装／個別実機未検証 |
| `/admin/launch-monitoring` | 同一Next.jsページ/API・既存の管理者権限判定 | 共通実装／個別実機未検証 |
| `/admin/metrics` | 同一Next.jsページ/API・既存の管理者権限判定 | 共通実装／個別実機未検証 |
| `/admin/moderation` | 同一Next.jsページ/API・既存の管理者権限判定 | 共通実装／個別実機未検証 |
| `/admin` | 同一Next.jsページ/API・既存の管理者権限判定 | 共通実装／個別実機未検証 |
| `/admin/retention` | 同一Next.jsページ/API・既存の管理者権限判定 | 共通実装／個別実機未検証 |
| `/admin/stats` | 同一Next.jsページ/API・既存の管理者権限判定 | 共通実装／個別実機未検証 |
| `/api-docs` | 同一Next.jsページ・React・既存APIを同じWebViewで利用 | 共通実装／個別実機未検証 |
| `/auth/signin` | NativeSignInBoundary → OSブラウザーAuth.js/Apple → PKCEでアプリへ復帰 | 実装（実設定/実機待ち）／個別実機未検証 |
| `/auth/signout` | 同一Next.jsページ・React・既存APIを同じWebViewで利用 | 共通実装／個別実機未検証 |
| `/auth/verify-request` | 同一Next.jsページ・React・既存APIを同じWebViewで利用 | 共通実装／個別実機未検証 |
| `/billing/cancel` | NativePurchaseBoundary → RevenueCat購入/復元/管理・法的リンク | 実装（実商品/実機待ち）／個別実機未検証 |
| `/billing/mock` | NativePurchaseBoundary → RevenueCat購入/復元/管理・法的リンク | 実装（実商品/実機待ち）／個別実機未検証 |
| `/billing` | NativePurchaseBoundary → RevenueCat購入/復元/管理・法的リンク | 実装（実商品/実機待ち）／個別実機未検証 |
| `/billing/success` | NativePurchaseBoundary → RevenueCat購入/復元/管理・法的リンク | 実装（実商品/実機待ち）／個別実機未検証 |
| `/billing/terms` | NativePurchaseBoundary → RevenueCat購入/復元/管理・法的リンク | 実装（実商品/実機待ち）／個別実機未検証 |
| `/blog` | 同一Next.jsページ・React・既存APIを同じWebViewで利用 | 共通実装／個別実機未検証 |
| `/blog/[slug]` | 同一Next.jsページ・React・既存APIを同じWebViewで利用 | 共通実装／個別実機未検証 |
| `/bookmarks` | 同一Next.jsページ・React・既存APIを同じWebViewで利用 | 共通実装／個別実機未検証 |
| `/challenge` | 同一Next.jsページ・React・既存APIを同じWebViewで利用 | 共通実装／個別実機未検証 |
| `/chat/share` | 同一Next.jsページ・React・既存APIを同じWebViewで利用 | 共通実装／個別実機未検証 |
| `/chusho-secondary` | 同一Next.jsページ＋表示Reactを同梱画面と共用 | 共通実装＋有料保存／個別実機未検証 |
| `/chusho-secondary/[year]/[case]` | 同一Next.jsページ＋表示Reactを同梱画面と共用 | 共通実装＋有料保存／個別実機未検証 |
| `/chusho-secondary/[year]/[case]/[question]` | 同一Next.jsページ＋表示Reactを同梱画面と共用 | 共通実装＋有料保存／個別実機未検証 |
| `/community-guidelines` | 同一Next.jsページ・React・既存APIを同じWebViewで利用 | 共通実装／個別実機未検証 |
| `/contact` | 同一Next.jsページ・React・既存APIを同じWebViewで利用 | 共通実装／個別実機未検証 |
| `/demo/afternoon` | 同一Next.jsページ・共通エディター・サイトAI採点API | 共通実装（AIは通信必須）／個別実機未検証 |
| `/demo/essay-grading` | 同一Next.jsページ・React・既存APIを同じWebViewで利用 | 共通実装／個別実機未検証 |
| `/denken1` | 同一Next.jsページ＋表示Reactを同梱画面と共用 | 共通実装＋有料保存／個別実機未検証 |
| `/denken1/[edition]/[subject]` | 同一Next.jsページ＋表示Reactを同梱画面と共用 | 共通実装＋有料保存／個別実機未検証 |
| `/denken1/[edition]/[subject]/[number]` | 同一Next.jsページ＋表示Reactを同梱画面と共用 | 共通実装＋有料保存／個別実機未検証 |
| `/denken2` | 同一Next.jsページ＋表示Reactを同梱画面と共用 | 共通実装＋有料保存／個別実機未検証 |
| `/denken2/secondary` | 同一Next.jsページ＋表示Reactを同梱画面と共用 | 共通実装＋有料保存／個別実機未検証 |
| `/denken2/secondary/[year]/[subject]/[number]` | 同一Next.jsページ＋表示Reactを同梱画面と共用 | 共通実装＋有料保存／個別実機未検証 |
| `/denken2/[edition]/[subject]` | 同一Next.jsページ＋表示Reactを同梱画面と共用 | 共通実装＋有料保存／個別実機未検証 |
| `/denken2/[edition]/[subject]/[number]` | 同一Next.jsページ＋表示Reactを同梱画面と共用 | 共通実装＋有料保存／個別実機未検証 |
| `/denken3` | 同一Next.jsページ＋表示Reactを同梱画面と共用 | 共通実装＋有料保存／個別実機未検証 |
| `/denken3/[edition]/[subject]` | 同一Next.jsページ＋表示Reactを同梱画面と共用 | 共通実装＋有料保存／個別実機未検証 |
| `/denken3/[edition]/[subject]/[number]` | 同一Next.jsページ＋表示Reactを同梱画面と共用 | 共通実装＋有料保存／個別実機未検証 |
| `/denko2/skill` | 同一Next.jsページ・React・既存APIを同じWebViewで利用 | 共通実装／個別実機未検証 |
| `/denko2/skill/[id]` | 同一Next.jsページ・React・既存APIを同じWebViewで利用 | 共通実装／個別実機未検証 |
| `/e-learning/exams` | 同一Next.jsページ/API・共通ExamQuestionPlayer | 共通実装＋有料保存／個別実機未検証 |
| `/e-learning/exams/qualifications/[slug]` | 同一Next.jsページ/API・共通ExamQuestionPlayer | 共通実装＋有料保存／個別実機未検証 |
| `/e-learning/exams/[id]` | 同一Next.jsページ/API・共通ExamQuestionPlayer | 共通実装＋有料保存／個別実機未検証 |
| `/e-learning/progress` | 同一Next.jsページ/API・共通ExamQuestionPlayer | 共通実装＋有料保存／個別実機未検証 |
| `/e-learning/search` | 同一Next.jsページ/API・共通ExamQuestionPlayer | 共通実装＋有料保存／個別実機未検証 |
| `/essay` | 同一Next.jsページ・共通エディター・サイトAI採点API | 共通実装（AIは通信必須）／個別実機未検証 |
| `/essay/[exam]/[questionId]` | 同一Next.jsページ・共通エディター・サイトAI採点API | 共通実装（AIは通信必須）／個別実機未検証 |
| `/essays` | 同一Next.jsページ・共通エディター・サイトAI採点API | 共通実装（AIは通信必須）／個別実機未検証 |
| `/essays/[exam]` | 同一Next.jsページ・共通エディター・サイトAI採点API | 共通実装（AIは通信必須）／個別実機未検証 |
| `/essays/[exam]/[yearSeason]/[section]/[qnum]` | 同一Next.jsページ・共通エディター・サイトAI採点API | 共通実装（AIは通信必須）／個別実機未検証 |
| `/faq` | 同一Next.jsページ・React・既存APIを同じWebViewで利用 | 共通実装／個別実機未検証 |
| `/features` | 同一Next.jsページ・React・既存APIを同じWebViewで利用 | 共通実装／個別実機未検証 |
| `/features/[slug]` | 同一Next.jsページ・React・既存APIを同じWebViewで利用 | 共通実装／個別実機未検証 |
| `/fp1/applied` | 同一Next.jsページ＋表示Reactを同梱画面と共用 | 共通実装＋有料保存／個別実機未検証 |
| `/fp1/applied/[edition]` | 同一Next.jsページ＋表示Reactを同梱画面と共用 | 共通実装＋有料保存／個別実機未検証 |
| `/fp1/applied/[edition]/[number]` | 同一Next.jsページ＋表示Reactを同梱画面と共用 | 共通実装＋有料保存／個別実機未検証 |
| `/fp2/practical` | 同一Next.jsページ＋表示Reactを同梱画面と共用 | 共通実装＋有料保存／個別実機未検証 |
| `/fp2/practical/[edition]` | 同一Next.jsページ＋表示Reactを同梱画面と共用 | 共通実装＋有料保存／個別実機未検証 |
| `/fp2/practical/[edition]/[number]` | 同一Next.jsページ＋表示Reactを同梱画面と共用 | 共通実装＋有料保存／個別実機未検証 |
| `/fp3/practical` | 同一Next.jsページ＋表示Reactを同梱画面と共用 | 共通実装＋有料保存／個別実機未検証 |
| `/fp3/practical/[edition]` | 同一Next.jsページ＋表示Reactを同梱画面と共用 | 共通実装＋有料保存／個別実機未検証 |
| `/fp3/practical/[edition]/[number]` | 同一Next.jsページ＋表示Reactを同梱画面と共用 | 共通実装＋有料保存／個別実機未検証 |
| `/glossary` | 同一Next.jsページ・React・既存APIを同じWebViewで利用 | 共通実装／個別実機未検証 |
| `/ipa` | 同一Next.jsページ・React・既存APIを同じWebViewで利用 | 共通実装／個別実機未検証 |
| `/keywords` | 同一Next.jsページ・React・既存APIを同じWebViewで利用 | 共通実装／個別実機未検証 |
| `/keywords/[keyword]` | 同一Next.jsページ・React・既存APIを同じWebViewで利用 | 共通実装／個別実機未検証 |
| `/license` | 同一Next.jsページ・React・既存APIを同じWebViewで利用 | 共通実装／個別実機未検証 |
| `/mock-exam` | 同一Next.jsページ・React・既存APIを同じWebViewで利用 | 共通実装／個別実機未検証 |
| `/modes/topic` | 同一Next.jsページ・React・既存APIを同じWebViewで利用 | 共通実装／個別実機未検証 |
| `/modes/year` | 同一Next.jsページ・React・既存APIを同じWebViewで利用 | 共通実装／個別実機未検証 |
| `/offline` | 同一情報ページ＋同梱目次/有料保存問題画面へ移動 | 共通実装＋ネイティブ／個別実機未検証 |
| `/og/streak/[days]` | 同一Next.jsページ・React・既存APIを同じWebViewで利用 | 共通実装／個別実機未検証 |
| `/operator` | 同一Next.jsページ・React・既存APIを同じWebViewで利用 | 共通実装／個別実機未検証 |
| `/` | 同一Next.jsページ・React・既存APIを同じWebViewで利用 | 共通実装／個別実機未検証 |
| `/privacy` | 同一Next.jsページ・React・既存APIを同じWebViewで利用 | 共通実装／個別実機未検証 |
| `/q/[exam]/[yearSeason]/[section]/[qnum]` | 同一Next.jsページ・React・既存APIを同じWebViewで利用 | 共通実装／個別実機未検証 |
| `/qualifications` | 同一Next.jsページ・React・既存APIを同じWebViewで利用 | 共通実装／個別実機未検証 |
| `/quiz` | 同一Next.jsページ・React・既存APIを同じWebViewで利用 | 共通実装／個別実機未検証 |
| `/quiz/review` | 同一Next.jsページ・React・既存APIを同じWebViewで利用 | 共通実装／個別実機未検証 |
| `/quiz/stream` | 同一Next.jsページ・React・既存APIを同じWebViewで利用 | 共通実装／個別実機未検証 |
| `/ranking` | 同一Next.jsページ・React・既存APIを同じWebViewで利用 | 共通実装／個別実機未検証 |
| `/recommended-books` | 同一Next.jsページ・React・既存APIを同じWebViewで利用 | 共通実装／個別実機未検証 |
| `/recommended-books/[exam]` | 同一Next.jsページ・React・既存APIを同じWebViewで利用 | 共通実装／個別実機未検証 |
| `/referral` | 同一Next.jsページ・React・既存APIを同じWebViewで利用 | 共通実装／個別実機未検証 |
| `/review` | 同一Next.jsページ・React・既存APIを同じWebViewで利用 | 共通実装／個別実機未検証 |
| `/search` | 同一Next.jsページ・React・既存APIを同じWebViewで利用 | 共通実装／個別実機未検証 |
| `/settings/api-keys` | 同一Next.jsページ・React・既存APIを同じWebViewで利用 | 共通実装／個別実機未検証 |
| `/settings` | 同一Next.jsページ・React・既存APIを同じWebViewで利用 | 共通実装／個別実機未検証 |
| `/sharoushi/sentaku` | 同一Next.jsページ＋表示Reactを同梱画面と共用 | 共通実装＋有料保存／個別実機未検証 |
| `/sharoushi/sentaku/[edition]` | 同一Next.jsページ＋表示Reactを同梱画面と共用 | 共通実装＋有料保存／個別実機未検証 |
| `/sharoushi/sentaku/[edition]/[number]` | 同一Next.jsページ＋表示Reactを同梱画面と共用 | 共通実装＋有料保存／個別実機未検証 |
| `/sitemap` | 同一Next.jsページ・React・既存APIを同じWebViewで利用 | 共通実装／個別実機未検証 |
| `/st/past-papers/notes` | 同一Next.jsページ・React・既存APIを同じWebViewで利用 | 共通実装／個別実機未検証 |
| `/st/past-papers/notes/[id]` | 同一Next.jsページ・React・既存APIを同じWebViewで利用 | 共通実装／個別実機未検証 |
| `/stats` | 同一Next.jsページ・React・既存APIを同じWebViewで利用 | 共通実装／個別実機未検証 |
| `/student` | 同一Next.jsページ・React・既存APIを同じWebViewで利用 | 共通実装／個別実機未検証 |
| `/study-plan` | 同一Next.jsページ・React・既存APIを同じWebViewで利用 | 共通実装／個別実機未検証 |
| `/study-plan/result/[id]` | 同一Next.jsページ・React・既存APIを同じWebViewで利用 | 共通実装／個別実機未検証 |
| `/success-stories` | 同一Next.jsページ・React・既存APIを同じWebViewで利用 | 共通実装／個別実機未検証 |
| `/success-stories/[exam]` | 同一Next.jsページ・React・既存APIを同じWebViewで利用 | 共通実装／個別実機未検証 |
| `/success-stories/[exam]/[slug]` | 同一Next.jsページ・React・既存APIを同じWebViewで利用 | 共通実装／個別実機未検証 |
| `/terms` | 同一Next.jsページ・React・既存APIを同じWebViewで利用 | 共通実装／個別実機未検証 |
| `/topics` | 同一Next.jsページ・React・既存APIを同じWebViewで利用 | 共通実装／個別実機未検証 |
| `/topics/[slug]` | 同一Next.jsページ・React・既存APIを同じWebViewで利用 | 共通実装／個別実機未検証 |
| `/transparency` | 同一Next.jsページ・React・既存APIを同じWebViewで利用 | 共通実装／個別実機未検証 |
| `/updates` | 同一Next.jsページ・React・既存APIを同じWebViewで利用 | 共通実装／個別実機未検証 |
| `/why-kakomon-ai` | 同一Next.jsページ・React・既存APIを同じWebViewで利用 | 共通実装／個別実機未検証 |
| `/[exam]/afternoon` | 同一Next.jsページ・共通エディター・サイトAI採点API | 共通実装（AIは通信必須）／個別実機未検証 |
| `/[exam]/afternoon/[year]/[season]` | 同一Next.jsページ・共通エディター・サイトAI採点API | 共通実装（AIは通信必須）／個別実機未検証 |
| `/[exam]/essay` | 同一Next.jsページ・共通エディター・サイトAI採点API | 共通実装（AIは通信必須）／個別実機未検証 |
| `/[exam]` | 同一Next.jsページ・React・既存APIを同じWebViewで利用 | 共通実装／個別実機未検証 |
| `/[exam]/topic/[topicSlug]` | 同一Next.jsページ・React・既存APIを同じWebViewで利用 | 共通実装／個別実機未検証 |
| `/[exam]/[yearSeason]` | 同一Next.jsページ・React・既存APIを同じWebViewで利用 | 共通実装／個別実機未検証 |

## 通常資格ごとの問題数（84資格）

下表の数値は通常問題。関連する別形式/試験紙は上記の別区分に含まれる。事前ダウンロード操作では `qualification` が同じ関連単位をまとめて保存する。

| 資格 | コード | 通常問題数 | 収録年度 | 本文JSON |
| --- | --- | --- | --- | --- |
| 不動産鑑定士 | `kanteishi` | 160 | 2026・2025 | 1.07 MiB |
| 公認会計士 | `kaikeishi` | 186 | 2026 | 1.34 MiB |
| 第二級陸上無線技術士 | `riku-tech2` | 189 | 2026 | 0.82 MiB |
| 第二級アマチュア無線技士 | `amateur2` | 109 | 2026 | 0.42 MiB |
| レーダー級海上特殊無線技士 | `maritime-radar` | 48 | 2026 | 0.10 MiB |
| 第一級アマチュア無線技士 | `amateur1` | 119 | 2026 | 0.37 MiB |
| 第一級海上特殊無線技士 | `maritime-special1` | 48 | 2026 | 0.08 MiB |
| 航空無線通信士 | `aviation-comm` | 68 | 2026 | 0.18 MiB |
| 第一級海上無線通信士 | `maritime1` | 190 | 2026 | 0.49 MiB |
| 第二級海上無線通信士 | `maritime2` | 190 | 2026 | 0.73 MiB |
| 第一級総合無線通信士 | `general1` | 270 | 2026 | 0.61 MiB |
| 第二級総合無線通信士 | `general2` | 280 | 2026 | 0.80 MiB |
| 第三級総合無線通信士 | `general3` | 140 | 2026 | 0.36 MiB |
| 第三級海上無線通信士 | `maritime3` | 70 | 2026 | 0.31 MiB |
| 第二級陸上特殊無線技士 | `land-special2` | 48 | 2022・2021 | 0.08 MiB |
| 第三級陸上特殊無線技士 | `land-special3` | 48 | 2022・2021 | 0.10 MiB |
| 第一級陸上無線技術士 | `riku-tech1` | 190 | 2026 | 0.97 MiB |
| 第四級海上無線通信士 | `maritime4` | 76 | 2026 | 0.17 MiB |
| 国内電信級陸上特殊無線技士 | `riku-toku-kokunai` | 24 | 2026 | 0.04 MiB |
| 航空特殊無線技士 | `koku-toku` | 48 | 2026 | 0.10 MiB |
| 第一級陸上特殊無線技士 | `land-special1` | 72 | 2026 | 0.19 MiB |
| 第二級海上特殊無線技士 | `kai-toku2` | 48 | 2023・2022 | 0.11 MiB |
| 第三級海上特殊無線技士 | `kai-toku3` | 60 | 2023・2022 | 0.10 MiB |
| 土地家屋調査士 | `chosashi` | 66 | 2025・2024 | 0.34 MiB |
| 理容師 | `riyoshi` | 110 | 2026 | 0.24 MiB |
| 応用情報技術者 | `ap` | 2,354 | 2025・2024・2023・2022・2021・2020・2019・2018・2017・2016・2015・2014・2013・2012・2011・2010・2009 | 3.15 MiB |
| ITパスポート | `ip` | 2,051 | 2024・2023・2022・2020・2019・2018・2017・2016・2015・2014・2013・2012・2011・2010・2009 | 2.47 MiB |
| 情報セキュリティマネジメント | `sg` | 429 | 2025・2024・2023・2019・2018・2017・2016 | 0.67 MiB |
| 基本情報技術者 | `fe` | 1,485 | 2025・2024・2023・2019・2018・2017・2016・2015・2014・2013・2012・2011・2010・2009 | 2.00 MiB |
| 情報処理安全確保支援士 | `sc` | 1,584 | 2025・2024・2023・2022・2021・2020・2019・2018・2017・2016・2015・2014・2013・2012・2011・2010・2009 | 2.48 MiB |
| ネットワークスペシャリスト | `nw` | 597 | 2025・2024・2023・2022・2021・2019・2018・2017・2016・2015・2014・2013・2012・2011・2010・2009 | 0.81 MiB |
| データベーススペシャリスト | `db` | 591 | 2025・2024・2023・2022・2021・2020・2019・2018・2017・2016・2015・2014・2013・2012・2010・2009 | 0.82 MiB |
| ITストラテジスト | `st` | 817 | 2025・2024・2023・2022・2021・2019・2018・2017・2016・2015・2014・2013・2012・2011・2010・2009 | 1.49 MiB |
| システムアーキテクト | `sa` | 591 | 2025・2024・2023・2022・2021・2019・2018・2017・2016・2015・2014・2013・2012・2011・2010・2009 | 0.83 MiB |
| プロジェクトマネージャ | `pm` | 594 | 2025・2024・2023・2022・2021・2020・2019・2018・2017・2016・2015・2014・2013・2012・2010・2009 | 0.82 MiB |
| エンベデッドシステムスペシャリスト | `es` | 601 | 2025・2024・2023・2022・2021・2020・2019・2018・2017・2016・2015・2014・2013・2012・2010・2009 | 0.81 MiB |
| ITサービスマネージャ | `sm` | 599 | 2025・2024・2023・2022・2021・2019・2018・2017・2016・2015・2014・2013・2012・2011・2010・2009 | 0.83 MiB |
| システム監査技術者 | `au` | 620 | 2025・2024・2023・2022・2021・2020・2019・2018・2017・2016・2015・2014・2013・2012・2010・2009 | 0.85 MiB |
| 2級FP技能検定 | `fp2` | 300 | 2026・2025・2024 | 0.81 MiB |
| 1級FP技能検定 | `fp1` | 100 | 2026 | 0.32 MiB |
| 3級FP技能検定 | `fp3` | 180 | 2026・2025・2024 | 0.29 MiB |
| 第三種電気主任技術者 | `denken3` | 320 | 2025・2024 | 1.29 MiB |
| 第二種電気主任技術者 | `denken2` | 70 | 2026 | 0.51 MiB |
| 第一種電気主任技術者 | `denken1` | 25 | 2026 | 0.15 MiB |
| 宅地建物取引士 | `takken` | 100 | 2025・2024 | 0.36 MiB |
| 第二種電気工事士 | `denko2` | 250 | 2026・2025・2024 | 0.63 MiB |
| 第一種電気工事士 | `denko1` | 100 | 2026・2025 | 0.22 MiB |
| 2級土木施工管理技士 | `civil2` | 132 | 2026・2025 | 0.31 MiB |
| 2級管工事施工管理技士 | `kankoji2` | 104 | 2026・2025 | 0.26 MiB |
| 2級造園施工管理技士 | `zoen2` | 80 | 2026・2025 | 0.18 MiB |
| 1級造園施工管理技士 | `zoen1` | 24 | 2026 | 0.05 MiB |
| 2級電気通信工事施工管理技士 | `tsushin2` | 5 | 2026 | 0.01 MiB |
| 1級電気通信工事施工管理技士 | `tsushin1` | 180 | 2026・2025 | 0.46 MiB |
| 介護福祉士 | `kaigo` | 250 | 2025・2024 | 0.71 MiB |
| 1級土木施工管理技士 | `civil1` | 100 | 2026 | 0.30 MiB |
| 社会福祉士 | `shakai` | 129 | 2025 | 0.43 MiB |
| 精神保健福祉士 | `seishin` | 261 | 2025・2024 | 0.90 MiB |
| 登録販売者 | `tohan` | 120 | 2025 | 0.74 MiB |
| 管理業務主任者 | `kanri` | 100 | 2025・2024 | 0.28 MiB |
| 第一種衛生管理者 | `eisei1` | 88 | 2026・2025 | 0.27 MiB |
| 第二種衛生管理者 | `eisei2` | 60 | 2026・2025 | 0.19 MiB |
| 技術士 総合技術監理部門 | `soukan` | 80 | 2026・2025 | 0.32 MiB |
| 保育士試験 | `hoikushi` | 154 | 2026 | 0.61 MiB |
| マンション管理士 | `mankan` | 99 | 2025・2024 | 0.32 MiB |
| 貸金業務取扱主任者 | `kashikin` | 100 | 2025・2024 | 0.47 MiB |
| 社会保険労務士 | `sharoushi` | 107 | 2026・2025 | 0.64 MiB |
| 中小企業診断士 | `chusho-kigyo-shindanshi` | 454 | 2026・2025 | 1.29 MiB |
| 看護師 | `kangoshi` | 464 | 2025・2024 | 1.16 MiB |
| 薬剤師 | `yakuzaishi` | 359 | 2026・2025 | 0.92 MiB |
| あん摩マッサージ指圧師 | `ahaki-anma` | 318 | 2026・2025 | 0.60 MiB |
| はり師・きゅう師 | `ahaki-hari-kyu` | 360 | 2026・2025 | 0.70 MiB |
| 保健師 | `hokenshi` | 202 | 2025・2024 | 0.50 MiB |
| 助産師 | `josanshi` | 219 | 2025・2024 | 0.48 MiB |
| 理学療法士 | `rigaku-ryohoshi` | 183 | 2026・2025 | 0.38 MiB |
| 作業療法士 | `sagyo-ryohoshi` | 310 | 2025・2024 | 0.69 MiB |
| 視能訓練士 | `shino-kunrenshi` | 220 | 2025・2024 | 0.45 MiB |
| 臨床工学技士 | `rinsho-kogishi` | 220 | 2025・2024 | 0.44 MiB |
| 柔道整復師 | `judo-seifukushi` | 500 | 2025・2024 | 0.89 MiB |
| ガス主任技術者 甲種 | `gas-kou` | 116 | 2026・2025 | 0.37 MiB |
| ガス主任技術者 乙種 | `gas-otsu` | 116 | 2026・2025 | 0.33 MiB |
| ガス主任技術者 丙種 | `gas-hei` | 116 | 2026・2025 | 0.31 MiB |
| 臨床検査技師 | `rinsho-kensagishi` | 106 | 2026・2025 | 0.26 MiB |
| 診療放射線技師 | `shinryo-hoshasengishi` | 398 | 2026・2025 | 0.85 MiB |
| 歯科医師 | `shika-ishi` | 696 | 2026・2025 | 1.49 MiB |

## 無料枠と有料権利の強制

無料枠の正は既存 `POST /api/billing/question` のサーバー。ゲスト署名Cookie、会員IDへの引継ぎ、JST日付、同日distinct問題ID、意見送信のDB追加枠を共用する。1日10回のクリックではなく、その日に新しく開始した10問題ID。再取得、同じ問題の再表示、複数空欄で二重に減らさない。アプリでは通常・個別問題・試験紙・模試・ストリーム・チャレンジ・別形式の表示を共通NativeQuestionGateで開始判定へ接続した。ローカルカウンターの変更では枠を解除できない。アプリではサイトのゲート無効フラグや少数サンプルの例外を使って枠を迂回しない。

有料権利は（1）既存ウェブ購読、（2）サーバーがRevenueCat APIで検証した `kakomon_pro` の順。ウェブ側の有料状態を取得できなければ購入を勧めず再確認する。SDK CustomerInfoやwebhook本文をそのまま有料権利として信用しない。ウェブの有料会員は追加購入不要と表示し、購入直前にも再確認する。App Store有料会員へのウェブ追加購入APIも拒否する。既存AIの不正利用対策・費用上限は維持する。

## 有料限定保存と権利失効

download APIはログインとサーバー有料権利、署名発行可能な設定を要求する。保存は10件ごとに権利/所有者/版を確認し、件数・ユニークID・SHA-256が一致してから新しいファイル参照を確定する。同じ版の再保存でも別ファイルへ書き、失敗/中止/容量不足時に以前の保存データを上書きしない。

端末ではアプリに固定した公開鍵でP-256 ECDSA署名を検証する。有効期間は契約末日と発行後24時間の早い方。端末保存領域へ任意の公開鍵やpremium=trueを書いても許可しない。ログアウト・別会員への変更・オンラインの失効確認・署名期限切れでは保存問題を利用不能にする。データは端末に残っていても表示できない方式であり、所有者の「削除または権利確認で無効化」の後者に対応する。契約期間の末日にはオフライン中でも停止する。

完全圏外で新たに発生した返金・取消は即時検知できないため、署名済み許可の残存期間（最大24時間）がある。次のオンライン確認または署名満了で停止する。この制約をUIにも表示した。時刻巻戻しも検査する。未表示の画像は事前一括取得せず、必要時に取得し100MB上限でキャッシュする。保存していない画像やAI利用には通信が必要。

## App Store課金・認証・サーバー変更

課金は初版実装。月額980円税込・1か月自動更新1種、権利 `kakomon_pro`。SDKキー/商品ID/Offeringはサーバー設定から取得し、価格表示はStoreKitの商品情報を使用する。共通の月額オファーと一致するJPY商品だけを購入可能にし、テストではすべてモックを使用した。購入・復元・App Store管理/解約・自動更新の説明・利用規約/プライバシー/Apple EULAのリンクを実装した。

新設API:

| API | 役割 |
| --- | --- |
| /api/mobile/catalog | 既存データローダー由来の全目次 |
| /api/mobile/download | 有料専用・10件ページ・版固定の本文取得 |
| /api/mobile/entitlement | ウェブ優先の統合権利、StoreKit設定、署名付きオフライン許可。POSTで強制再確認 |
| /api/mobile/revenuecat | RevenueCatの認証済み通知からDBロック下で公式APIを再照会 |
| /api/mobile/auth/complete | ブラウザー認証後の確認画面、Origin/nonce/HMAC確認後に一回用コードを発行 |
| /api/mobile/auth/exchange | PKCEコードをPOSTで一度だけ消費しHttpOnlyセッションCookieを設定 |
| /api/mobile/packs | 旧少数サンプルの配布は410で廃止 |

RevenueCatの会員識別子はサーバー会員IDからHMACで作る。Webhookは認証ヘッダー/app ID/環境を検査し、対象行をロックしてから公式APIの最新購読状態を確認する。重複・逆順通知、移管元/先、返金/失効に対応。認証はOSブラウザーで行い、PKCE/state/利用者の確認と60秒の一回用コードでアプリへ復帰する。コードとverifierはPOSTで交渉し、セッショントークンを復帰URLへ含めない。Apple providerを追加し、Apple未設定のアプリ用経路ではGoogle/GitHubを表示しない。

新規SQL: `mobile/migrations/20261103_mobile_revenuecat.sql`（MobileRevenueCatAccount、MobileAuthCode）。**本番DBへ未適用。所有者の承認待ち。** 秘密値/実キーは追加も使用もしていない。設定一覧は `mobile/config/server.env.example` と `mobile/README.md`。配布固定公開鍵 `mobile/config/public.json` は空であり、実設定前に保存/購入が成功したようには見せない。

共通化に伴うルート/ビュー/認証/課金の変更はworktree内。ローカル `next.config.ts` のファイルトレースにJSONローダーを追加し、`pnpm-workspace.yaml` にmobileを含めた。ウェブ側の既存Vite系テストの解決が変わらないようrootのViteを7.3.7に固定した。Vercelの設定変更はしていない。

## アプリ容量と上限

通常の本番用Viteビルド後の14ファイル合計は **1,676,029 bytes（1.68 MB / 1.60 MiB）**。各ファイルをNode zlibの既定設定でgzipした合計は **421,129 bytes**。これはWebアセットだけで、Capacitor/RevenueCat等のネイティブバイナリー・署名・App Store圧縮を含むIPAサイズではない。配布用出力にE2Eハーネスは含まれず、本文モジュール混入ガードも通過した。目次と論述メタデータだけを同梱する。明細: `mobile/docs/bundle-size.json`。

App Store ConnectのiOS上限は非圧縮アプリ4GB、実行ファイルの各Mach-Oにおける__TEXT上限500MB。ユーザーに表示されるダウンロードサイズは端末向け処理後に異なる。今回はWindowsでXcodeアーカイブを作れないため、**IPA実容量・App Store上のダウンロード容量は未測定**。macOSの署名/アーカイブとApp Store Connect処理後に測定する。Viteには500kB超のチャンクの注意が残るが、本文約68.7MBを本体へ含めない。事前保存JSONと100MB上限の画像キャッシュはインストール後に利用者が選択して増える端末データ。

公式資料: [Appleの最大ビルドファイルサイズ](https://developer.apple.com/help/app-store-connect/reference/app-uploads/maximum-build-file-sizes/)、[審査ガイドライン3.1/4.2/4.8](https://developer.apple.com/app-store/review/guidelines/)、[RevenueCat公式Capacitor SDK](https://www.revenuecat.com/docs/getting-started/installation/capacitor)、[Webhook](https://www.revenuecat.com/docs/integrations/webhooks)、[顧客識別](https://www.revenuecat.com/docs/customers/identifying-customers)。

## 検証結果

| 確認 | 結果 | 範囲/制約 |
| --- | --- | --- |
| root npm run typecheck | 成功 | 既存サイトと新しい共通/サーバーコード |
| mobile npm run typecheck | 成功 | npm run build内でも再実行 |
| 変更したTS/TSXのESLint | 87ファイル、エラー0・警告0 | テスト/生成スクリプトを除く変更ファイル |
| root 関連Vitest | 85ファイル成功・1ファイルskip、1,964成功・8skip | billing全体、mobile、auth、copilot/scoring/essay-grade、問題ローダー/資格拡張、各専用ビュー/エディター |
| mobile npm test | 4ファイル・21テスト成功 | 署名/ダウンロード、購入/復元、ローカルAPI、通知等のプラットフォーム |
| mobile npm run test:e2e | 5テスト成功 | 全目次の初回オフライン起動、FP3実技共通表示、有料保存/通常演習/履歴再起動/失効、無料の保存案内、ウェブ有料の二重購入防止/法的導線 |
| mobile npm run build | 成功 | 目次再生成・型検査・通常Viteビルド。Next.js/Vercelのビルドではない |
| 本文混入防止ガード | 成功 | data/questions本文・exam-library/papersのbundle混入を拒否。出典URL一覧のみ除外 |
| git diff --check / staged diff --check | 成功 | 末尾空白・パッチ異常なし |
| Xcode / StoreKit実購入 / 実機 | 未実施 | Windows環境・実キー禁止。モック検証を実機確認と呼ばない |

skip 8件は `__tests__/billing/feedback-postgres.test.ts` の明示的opt-inローカルPostgres統合テスト。専用の使い捨てPostgresバイナリー（F1_POSTGRES_BIN）が未指定のため。本番DBを代用していない。既存の意見付与/枠のモック回帰は成功した。125ページ全件のiOS画面遷移試験は未実施であり、対応表は共通実装の棚卸し。

実行ログはこのworktreeの `mobile/.cache/{root-typecheck,root-related-tests,mobile-test,e2e,build,lint}.log`（git対象外）。E2E鍵は毎回作るテスト用で .cache のみに保存し、通常配布ビルドで置換し直した。

再現コマンドの基本は `mobile/README.md`。関連回帰の最終実行は2026-11-03、root Vitest 29.59秒、mobile Vitest 0.324秒、Playwright 14.8秒。root関連範囲は `__tests__/billing`、`__tests__/mobile`、`__tests__/auth`、`__tests__/api/{copilot,essay-grade,scoring,scoring-cost-guard}.test.ts`、問題ローダー/資格拡張、電験/FP/社労士/中小企業二次の専用ビュー16ファイル、EssayEditor/AfternoonEssayHint。

## 公開前に残る設定・承認・実機確認

1. 所有者承認後、既存DBへ上記SQLを適用する（今回は未適用）。
2. App Store Connectで月額980円税込/1か月/自動更新1商品、RevenueCatのOfferingと `kakomon_pro` を設定し、設定値/署名鍵を安全な運用先で登録する。署名公開鍵はサーバーと配布アプリへ同じものを固定する。現状IAP連携の初期設定は無効・鍵は空。
3. AppleログインのService ID/秘密設定/戻り先、既存OAuth側の戻り先を所有者の環境で設定する。実キーを今回呼んでいない。
4. このブランチのサイト側変更を所有者の公開手順で反映する。オンラインのnative host/権利APIは現在の本番へまだ公開していない。
5. macOSでiOS生成・unsigned/署名アーカイブ・実機へ。購入/承認待ち/復元/期限/返金、Apple/既存会員ログインとCookie引継ぎ、圏外/復帰、通知タップ/共有、125ルートの主要導線、App Privacy、最終容量を確認する。
6. App Store審査説明にネイティブ機能、無料10問、ウェブ会員の追加購入不要、購入復元、オフライン署名の最大24時間を明記する。

これらは実装機能をv1.1へ先送りしたものではなく、実キー禁止・本番DB承認待ち・Windows環境で未実行の公開準備。Codemagic定義は共通依存導入後のunsigned archive用に更新したが、実行/トリガー設定/アップロードはしていない。

## 実行していない操作

push、Vercelビルド/デプロイ/設定変更、実キーAPI呼出し、本番DB適用、App Store商品登録/課金、Codemagic実行、git reset --hard、git clean、ブランチ削除は行っていない。秘密値は報告書へ含めていない。
