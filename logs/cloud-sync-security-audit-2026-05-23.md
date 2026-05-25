# クラウド同期 セキュリティ監査 (2026-05-23, phase 8 task ⑥)

認証（NextAuth v5）+ データ同期（Bookmark/CustomTag/StudyPlan）実装後の
セキュリティ観点を全面点検。検出した脆弱性 **1 件（IDOR、本 PR で修正済み）**。

## 検出した脆弱性

### [修正済み・重大] StudyPlan 同期の IDOR

- 事象: `/api/account/study-plan-sync` の upsert が PK (`id`) のみを where に
  指定していた。プラン id はクライアント生成のため、認証済みユーザーが他人の
  プラン id を渡すと UPDATE ブランチで他ユーザーのプランを上書きできた
  （Insecure Direct Object Reference）。
- 影響: 認証済みユーザー間でのデータ改竄。情報漏洩はなし（読み出しは返さない）。
- 修正: 自分が所有する id（existingMap にある）のみ `update`。未知の id は
  `findUnique` で所有者を確認し、他ユーザー所有なら create をスキップ。
- 同種チェック: Bookmark / CustomTag は複合一意キー `(userId, questionId)` /
  `(userId, name)` で where しており IDOR なし（確認済み）。

## 6-1 認証 API

- CSRF: NextAuth v5 は OAuth/Email フローに組み込みの state/CSRF トークン保護を
  持つ。同期 API は同一オリジンの fetch + Cookie セッションで、状態変更は POST
  のみ。SameSite Cookie（NextAuth 既定 `lax`）でクロスサイト POST を緩和。
  → 追加対応不要。
- セッション管理: `session: { strategy: "jwt" }`（DB 無しでも動作）。DATABASE_URL
  設定時は PrismaAdapter で Session/Account を永続化。AUTH_SECRET で署名。
- セッション固定: NextAuth はサインイン毎に新規トークンを発行（固定化対策済み）。

## 6-2 同期 API

- 認可: 全エンドポイントが `auth()` で `session.user.id` を取得し、全クエリを
  `where: { userId }`（または create 時に userId を固定）でスコープ。自分の
  データのみアクセス可。StudyPlan の IDOR は上記で修正。
- レート制限: 現状、同期エンドポイント個別のレート制限は未適用。ただし
  ペイロードは上限つき（bookmark 2000 / custom-tag 200 / study-plan 50 件で
  slice）かつ認証必須のため濫用余地は限定的。**推奨（次フェーズ）**: 既存
  KV レート制限基盤（lib/rate-limit/server）を流用し、ユーザー単位で 1 分あたり
  数回程度のソフトリミットを追加。
- バリデーション: 各エンドポイントに型ガード（isEntry）+ 文字列長 slice +
  数値 Number.isFinite チェック。JSON は Prisma パラメタライズドクエリで
  保存（SQL インジェクション無し）。StudyPlan の payload は JSONB で任意構造を
  許容するが、サーバはこれを実行・評価しない（保存と読み出しのみ）。

## 6-3 データプライバシー

- 暗号化 (at rest): Postgres（本番）の暗号化はホスティング層（例: Vercel
  Postgres / Supabase）に依存。同期データは PII を最小限（メールは User 行のみ、
  学習データは問題 ID・正誤・タグ等で直接の個人特定情報は含まない）。
- ログへの PII: 同期エンドポイントは本文や userId をログ出力しない
  （console.* 不使用、エラーは汎用メッセージ）。確認済み。
- アカウント削除時の完全削除: Prisma 全リレーションが `onDelete: Cascade`。
  `User` 削除で StudyRecord / Bookmark / CustomTag / StudyPlan / Streak /
  Session / Account / Subscription が連鎖削除される。端末 LocalStorage は
  サーバ削除の対象外（ユーザーが手動でクリア可）。

## まとめ

- 検出脆弱性: 1 件（StudyPlan IDOR）→ 本 PR で修正。
- 残推奨（非ブロッカー、次フェーズ）: 同期エンドポイントへのユーザー単位
  ソフトレート制限の追加。
- 認可・バリデーション・PII・削除カスケードは妥当。クラウド同期は本番投入可能な
  セキュリティ水準（DATABASE_URL 設定 + migrate deploy 後）。
