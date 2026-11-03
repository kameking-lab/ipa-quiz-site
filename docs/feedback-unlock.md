# 意見による追加10問（F1）

通常の無料連続演習枠を使い切った画面で、購入ボタンの下に副導線を表示する。
8項目の複数選択、希望資格の入力、任意の自由記述（選択0個なら必須、1000文字まで）を受け付ける。
保存成功後に一度だけ10問を付与し、通常の日次枠を使い切った後に消費する。未使用分は翌日へ持ち越す。
現行と同じく、日付と問題IDに対する問題取得許可で数える。回答確定数を別途加算しない。

## 有効化（本ブランチでは実施しない）

1. 所有者の別途承認後、既存のDBマイグレーション手順で
   `prisma/migrations/20261103000000_feedback_unlock/migration.sql` を適用する。
   追加テーブルは `feedback_unlock` / `feedback_unlock_grant` / `feedback_unlock_rate`。
   既存のUser、課金、学習記録テーブルは変更しない。既存課金と同じパラメーター付きSQL境界を使う。
2. 過去問AIで `FEEDBACK_UNLOCK_ENABLED=true` を設定する。
   `DATABASE_URL` と `AUTH_SECRET`、通常演習の既存課金ゲート・ゲストKV設定が必要。
   bot検証は既存 `TURNSTILE_SECRET_KEY` と `NEXT_PUBLIC_TURNSTILE_SITE_KEY` を利用する。
   既存と同じく、Turnstile秘密未設定時はbot検証をスキップする。サーバーレート制限は常時行う。
3. note専用の新しい読み取り資格情報（32〜256文字）を秘密管理経路で用意する。
   この作業では生成しない。過去問AIにはSHA-256小文字hexを
   `KAKOMON_FEEDBACK_READ_TOKEN_SHA256` として設定する。
   `AUTH_SECRET`、Cookie、課金秘密、既存note認証を共有しない。
4. note担当が別ブランチの `docs/kakomon-feedback-ingest.md` に従ってprivate画面へ組み込む。
   noteの設定名は `KAKOMON_FEEDBACK_SYNC_ENABLED` / `KAKOMON_FEEDBACK_API_URL` /
   `KAKOMON_FEEDBACK_READ_TOKEN`。`@note/config` 経由でcollectorへ渡す。
   本番の設定変更、定期実行登録、再起動、デプロイは別作業。

## 保存・本人判定

- ログイン時はアカウントのHMAC、未ログイン時は専用署名付きHttpOnly CookieのブラウザIDのHMACで制限。
  仮名IDを原文アカウントIDやIPと関連づけて外部提供しない。
- ブラウザCookieは最長400日で更新する。Cookie削除・別ブラウザを完全に本人判定するものではない。
  未ログイン送信は同一ネットワーク・同一JST日のHMACの一意制約でも重複を抑止する。
  共有回線の別利用者もその日は制限され得る。
- 1ネットワーク・分あたり5回、実ストリーム16KiB、各項目の長さ制限、同一origin検証を行う。
- 自由記述・希望資格には既存PIIマスカーを適用し、原文を保存・ログ出力しない。
  氏名・住所等の入力禁止をフォームに明記する。正規表現によるマスキングは全種類の個人情報を検知できない。
- ログイン時に匿名の残枠をアカウントへ引き継ぐ。既存アカウント枠と匿名枠は合算せず、余分な匿名枠は退役させる。
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
- `practice_feedback_purchase_completed`：意見受理済みかつ対象注文のpaid・entitledを確認後

購入計測はブラウザ側のbest-effortで、sessionStorageで同じ注文の再表示を抑止する。
広告ブロック・同意拒否・決済から戻らないケースの捕捉は保証しない。
障害時も通常無料枠と購入確認を妨げず、追加枠だけを安全側で停止する。
