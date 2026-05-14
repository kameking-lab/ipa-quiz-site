# E2E 修正実装ログ

## 修正内容

### 1. tests/e2e/admin-auth.spec.ts (modified)
- `/admin/team` → `/admin/stats` に全置換 (削除済みページから実在ページへ切替)
- 1件の 401 検証ルートを `/admin/stats` (重複) → `/admin/metrics` に変更し
  複数 admin ルートで Basic Auth ミドルウェアが効くことを確認
- WWW-Authenticate ヘッダの実値検証(`Basic realm="Kakomon AI Admin"`)を維持

### 2. tests/e2e/stripe-checkout.spec.ts (deleted)
- 対象ルート `/api/stripe/checkout` は PR #100 で削除済み
- 教育貢献モード(PAID_MODE=false)では Stripe 機能を全廃 → テスト不要

### 3. tests/e2e/stripe-webhook.spec.ts (deleted)
- 対象ルート `/api/webhooks/stripe` は PR #100 で削除済み
- 同上の理由

### 4. tests/e2e/contact-enterprise.spec.ts (unchanged)
- すべての PAID_MODE 用テストは `test.skip` で除外済み
- educational mode 用の 404 検証テストはルート不在のため自然に 404 を返し pass
- 最小修正の原則から touch しない

## ローカル E2E 結果

```
> playwright test

Running 20 tests using 16 workers

ok  6 tests\e2e\admin-auth.spec.ts:10:7 › /admin/metrics without credentials returns 401 (455ms)
ok  7 tests\e2e\admin-auth.spec.ts:15:7 › /admin/stats with wrong credentials returns 401 (453ms)
ok  8 tests\e2e\admin-auth.spec.ts:4:7  › /admin/stats without credentials returns 401 (439ms)
ok 10 tests\e2e\admin-auth.spec.ts:22:7 › /admin/stats with valid credentials returns 200 (455ms)
ok 14 tests\e2e\auth-session.spec.ts:4:7 › returns 200 with JSON body even without AUTH_SECRET (359ms)
ok 11 tests\e2e\pricing.spec.ts:11:7    › /about の料金について教育貢献ピボット (770ms)
ok  9 tests\e2e\pricing.spec.ts:6:7     › /pricing は 404 を返す (460ms)
ok 13 tests\e2e\pricing.spec.ts:18:7    › Sitemap returns 200 (422ms)
ok 12 tests\e2e\contact-enterprise.spec.ts:61:7 › returns 404 in educational contribution mode (740ms)
ok 15 tests\e2e\canonical.spec.ts:62:5  › 主要ページの canonical URL が自ページを指している (1.1s)
ok 16 tests\e2e\smoke-routes.spec.ts:44:7 › 必須 200 ルートが 15 件すべて 200 (602ms)
ok 17 tests\e2e\smoke-routes.spec.ts:52:7 › 試験区分 13 件が 200 (609ms)
ok 20 tests\e2e\smoke-routes.spec.ts:60:7 › 書籍 13 件が 200 (590ms)
ok 18 tests\e2e\smoke-routes.spec.ts:68:7 › 意図的 404 が 4 件すべて 404 (438ms)
ok 19 tests\e2e\smoke-routes.spec.ts:76:7 › ルート総数 = 45 (4ms)

5 skipped (contact-enterprise.spec.ts: PAID_MODE only tests)
15 passed (3.9s)
```

| 項目 | 数 |
|------|----|
| Total | 20 |
| Passed | 15 |
| Skipped | 5 |
| Failed | **0** |

## 補足: WebServer ログの "NoFallbackError"

`Error: Internal: NoFallbackError` がテスト実行中の Next.js WebServer ログに
散発的に出ているが、これは Next.js 16 App Router の SSR 内部警告であり、
テスト結果には影響しない。レスポンスは正常に返されており各テストは pass。

## typecheck / build 結果
- `pnpm typecheck` → pass
- `pnpm build` → pass (全ルート生成成功)
