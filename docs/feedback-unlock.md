# 意見による追加10問（F1）

通常の無料連続演習枠を使い切った画面で、購入ボタンの下に副導線を表示する。
8項目の複数選択、希望資格の入力、任意の自由記述（選択0個なら必須、1000文字まで）を受け付ける。
保存成功後に一度だけ10問を付与し、通常の日次枠を使い切った後に消費する。未使用分は翌日へ持ち越す。
現行と同じく、日付と問題IDに対する問題取得許可で数える。回答確定数を別途加算しない。

F1G: トップの主導線はログイン不要の1タップ開始。短い3問プールで終了せず、
最初の10問から追加枠まで連続して進める。最初の10問では演習内のログイン案内、
自動のお祝い・継続記録・同期トーストを表示しない。問題詳細 `/q/...` でも
継続記録・同期トーストを抑える。学習・報酬・同期の記録処理は維持する。
壁の「ログインして意見を送ると、さらに10問」を選んだ場合のみ、既存の認証画面へ進む。
既存のGoogle等のプロバイダを利用し、認証設定は変えない。callbackUrlに同じ問題URLと
`#feedback-unlock` を付け、認証済み・投稿可能のサーバー応答後にフォームを自動表示する。
復帰マーカーは権限を与えず、Cookie/localStorageの新しい投稿待ち状態も不要。

## 有効化（本ブランチでは実施しない）

1. 所有者の別途承認後、既存のDBマイグレーション手順で
   `prisma/migrations/20261103000000_feedback_unlock/migration.sql` を適用する。
   追加テーブルは `feedback_unlock` / `feedback_unlock_grant` / `feedback_unlock_rate`。
   既存のUser、課金、学習記録テーブルは変更しない。既存課金と同じパラメーター付きSQL境界を使う。
2. 過去問AIで `FEEDBACK_UNLOCK_ENABLED=true` を設定する。
   `DATABASE_URL` と `AUTH_SECRET`、通常演習の既存課金ゲート・ゲストKV設定が必要。
   bot検証は既存 `TURNSTILE_SECRET_KEY` と `NEXT_PUBLIC_TURNSTILE_SITE_KEY` を利用する。
   両方の設定を必須とし、未設定・検証skipped・失敗時は新規保存と特典発行を停止する。
3. note専用の新しい読み取り資格情報（32〜256文字）を秘密管理経路で用意する。
   この作業では生成しない。過去問AIにはSHA-256小文字hexを
   `KAKOMON_FEEDBACK_READ_TOKEN_SHA256` として設定する。
   `AUTH_SECRET`、Cookie、課金秘密、既存note認証を共有しない。
4. note担当が別ブランチの `docs/kakomon-feedback-ingest.md` に従ってprivate画面へ組み込む。
   noteの設定名は `KAKOMON_FEEDBACK_SYNC_ENABLED` / `KAKOMON_FEEDBACK_API_URL` /
   `KAKOMON_FEEDBACK_READ_TOKEN`。`@note/config` 経由でcollectorへ渡す。
   本番の設定変更、定期実行登録、再起動、デプロイは別作業。

## 保存・本人判定

- 新規保存・特典発行・消費は認証済みアカウント限定。1アカウントにつき1回。
  未ログインのGETはログイン導線を返し、POSTは401。Cookie削除・回線変更・日跨ぎでもアカウントの台帳は残る。
  複数アカウントを同一人物と判定することは保証しない。アカウントのHMACで制限する。
  仮名IDを原文アカウントIDやIPと関連づけて外部提供しない。
- 新規のブラウザCookieは発行しない。新規投稿のbrowser_hashはnullとし、
  アカウントHMACのみを本人情報として保存する。メール・氏名等を認証情報からコピーしない。
  旧署名Cookieは既存匿名枠の引き継ぎ時だけ読み取る。
  新規投稿ではnetwork_day_hashを使用せず、共有回線の日次重複による拒否をなくす。
  共有回線にも毎分レート制限は適用する。Retry-Afterは短期レート拒否時だけ返す。
- 1ネットワーク・分あたり5回、実ストリーム16KiB、各項目の長さ制限、同一origin検証を行う。
- 自由記述・希望資格には既存PIIマスカーを適用し、原文を保存・ログ出力しない。
  氏名・住所等の入力禁止をフォームに明記する。正規表現によるマスキングは全種類の個人情報を検知できない。
- 旧データの互換性のため、ログイン時に既存の匿名残枠をアカウントへ引き継ぐ。匿名消費は停止する。既存アカウント枠と匿名枠は合算せず、余分な匿名枠は退役させる。
  DB行ロックとアカウントのトランザクションロックで消費と引き継ぎを直列化する。
- 既存AIコパイロットの解除Cookie・回数・育成報酬の保存処理は変更しない。

## 管理・連携

- `/admin/feedback`：既存Basic認証下。全履歴の選択肢別件数、受付順100件の本文・希望資格一覧。
- `GET /api/integrations/note/feedback?after=0`：専用Bearer認証、private/no-store。
  N1推奨案1。原本は過去問AI、noteは独立JSONの表示用写し。
- schemaVersion=1。eventId / source / receivedAt / anonymousId / choices /
  requestedQualifications / commentMasked。アカウント・IP・本人判定HMAC・Cookieは出さない。
- 単調増加sequenceをカーソルとし100件ずつ返す。送信の発行順をDBロックで直列化し、未コミットの先行行を飛ばさない。
- note側はeventIdで冪等化し、全ページ成功後に履歴とカーソルを原子的に保存。失敗時は旧値を維持する。
  原本の訂正・削除時はnoteの `full:true` で再同期する。二重付与防止の台帳を残し本文等を消す運用を推奨。
  保持期間と削除運用は所有者とnote担当が有効化前に決定する。

## 計測

既存PostHogの同意・設定に従う。本文・希望資格・識別子をイベントへ送らない。

- `practice_limit_viewed`：無料枠の壁の表示
- `practice_feedback_submitted`：サーバー保存成功後（選択数と自由記述有無のみ）
- `practice_feedback_bonus_used`：新しい追加枠の問題取得成功時（残数のみ）
- `practice_feedback_customer_confirmation_viewed`：意見送信歴のある購入者による完了画面表示。対象注文のpaid・entitled確認後

これは画面表示指標であり、意見送信後の購入転換・注文数・売上として集計しない。
意見より前の注文も含み、別タブ・別ブラウザ・ストレージ消去で再表示を数える。
旧practice_feedback_purchase_completedは廃止し、過去データと接続しない。
ブラウザ側のbest-effortで、sessionStorageで同じセッションの同じ注文の再表示を抑止する。
広告ブロック・同意拒否・決済から戻らないケースの捕捉は保証しない。
障害時も通常無料枠と購入確認を妨げず、追加枠だけを安全側で停止する。

## ローカルPostgreSQL競合テスト

`__tests__/billing/feedback-postgres.test.ts` は `F1_POSTGRES_BIN` に
`initdb` と `pg_ctl` のあるディレクトリを指定して実行する。
`pnpm exec vitest run __tests__/billing/feedback-postgres.test.ts`
で毎回新しい一時クラスタを作成し、loopbackの空きポートだけで起動する。
接続URLはテスト内で組み立て、既存の `DATABASE_URL` やアプリ設定は参照しない。
終了時にクラスタを停止し、一時ディレクトリとログは調査用に残す。
未指定の場合は明示的にskipとなるため、通常の単体テスト成功だけで
実DB競合を検証済みと判断しない。
