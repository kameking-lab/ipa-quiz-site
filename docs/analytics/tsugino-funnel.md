# 次の資格 → 過去問AIのファネル

既存のPostHogプロジェクトを利用する。新規サービス、資格、DBスキーマ、決済設定は追加しない。

- `referral_landed`: UTM付き着地。1タブ・1キャンペーンにつき1回。
- `quiz_started`: 実際に問題が読み込まれた段階。通常演習、公表試験プレイヤー、診断士二次の記述演習に対応。
- `practice_free_limit_reached`: 演習APIが無料枠の残り0を返した段階。10問目の取得時点であり、回答完了とは異なる。11問目の `daily_limit` も確認対象。1キャンペーン・JST更新時刻につき1回。AI質問回数、通信障害、短時間制限、課金停止中の無制限演習は含めない。
- `practice_upgrade_clicked`: 無料枠終了後に料金確認へのリンクを押した段階。申込成功とは異なる。
- `checkout_started`: 既存の申込APIが決済画面を作成した段階。失敗・ボタン表示は含めない。
- `checkout_completed`: 既存の購入状況APIが対象注文の `paid` と利用権を確認した段階。未払・返金・期限切れは含めない。注文ID、メールアドレス、回答内容は送信しない。

各イベントに `utm_source / utm_medium / utm_campaign / utm_content / utm_term`、`referral_id`、`landing_path`、`landing_scope`、`first_visit` を付ける。通常のページ遷移・ログイン・決済往復でもsessionStorageで保持し、24時間で失効する。別の明示UTMキャンペーンは置き換える。UTMのない新規流入にはキャンペーンを付けない。ページの任意クエリは新しい帰属レコードへ保存しない。

PostHogの初期化より先に問題が表示された場合は、設定済み環境に限りイベントを最大100件保持し、着地→開始の順で送信する。キー未設定時は送信しない。計測が使えない場合も演習を止めない。

## 集計

PostHogのFunnelsで `referral_landed → quiz_started → practice_free_limit_reached → checkout_started → checkout_completed` の順に設定する。期間は例として24時間。`utm_source = tsugino_shikaku`、`utm_campaign = kakomon_crosslink` で絞り、`utm_content` で内訳を見る。旧リンクの `tsugino` / `tsugino-shikaku` も別途含められる。

同じキャンペーンの厳密な人数・段階数は、各イベントの `referral_id` のユニーク件数をUTM別に集計する。ユーザー単位のFunnelsでは、複数の送客をまたいだ同一利用者をまとめることがあるため、キャンペーン別の分析では `referral_id` の一致を条件にする。`quiz_started` 自体のイベント数は複数演習の分だけ増える。

申込開始・完了の実績は `test_mode = false` で絞る。テスト・mock決済は `true`。`checkout_completed` はブラウザで購入確認ページに戻った場合の観測であり、決済台帳の総売上とは一致しない。広告ブロックやストレージ拒否による欠測もあり、売上確定は既存の課金台帳を正とする。

公表試験・記述演習など既存の無料枠対象外のプレイヤーには、新たな10問制限を作らない。これらは着地→演習開始まで計測でき、無料枠終了段階がないことを `player` 別に分けて読む。

## 着地・案内

既存の資格・年度・分野URLとcanonicalを維持する。公表試験の旧URL転送はUTM・科目・年度を引き継ぎ、資格ハブでも厳密に絞る。不正な科目・年度から別の問題へフォールバックしない。

初回の次の資格送客には「この資格の過去問を1問目から無料で」をインライン表示する。ログインやモーダルを挟まない。通常演習は資格・年度・期・科目・分野・問題IDを持ったURLへ進む。既存の演習無料枠・料金・有効化条件を変えない。

## ローカルE2E

`tests/e2e/tsugino-funnel.spec.ts` は専用の `E2E_BASE_URL=http://127.0.0.1:3374` の場合だけ実行し、通常のE2Eやホストされた環境ではskipする。開発サーバー側を `BILLING_MODE=mock`、`BILLING_SUBSCRIPTION_ENABLED=false`、`BILLING_ORIGIN=http://127.0.0.1:3374`、`BILLING_LEGAL_REVIEWED=true`、過去の `BILLING_NOTICE_AT / BILLING_TRANSITION_STARTS_AT`、`KV_REST_API_URL=http://127.0.0.1:3375` として起動する。AUTH_SECRETとKVトークン、PostHogキーはローカル検証専用のダミーを使い、DATABASE_URLやAIキーは空にする。本番の環境ファイルをコピーしない。

テストが3375番のKV stand-inを立ち上げ、署名Cookieと演習HTTP APIを通す。PostHog SDKの外部リクエストはPlaywrightで捕捉する。実決済は行わず、申込成功・失敗・支払確認はコンポーネントテストで検証する。`KFUN1_EVIDENCE_DIR` を設定すると画面と個人情報を含まない段階別集計を保存する。
