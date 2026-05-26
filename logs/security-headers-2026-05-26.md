# セキュリティヘッダ / フィンガープリント監査 (2026-05-26)

実機レビュー F-5: `server: Vercel` ヘッダがスタックを露出している、という指摘の検証と対応。

## 結論

- **`X-Powered-By` は既に抑制済み**（`next.config.ts` `poweredByHeader: false`）。
  ローカル本番サーバの実機 `curl -I` で `X-Powered-By` ヘッダ不在を確認。
- **`Server: Vercel` は Vercel エッジ（プラットフォーム）が egress 時に付与する**もので、
  アプリ（Next.js config / middleware / headers()）からは除去できない。
  ローカル `next start` では `Server` ヘッダ自体が出力されない（= アプリ起因ではない）。
  → コードでの対応は不可。プラットフォーム制約として受容する。
- セキュリティヘッダは網羅的に設定済み（下記）。本フェーズで追加すべき欠落は検出されず。

## 実機確認したレスポンスヘッダ（ローカル本番ビルド `/`）

```
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), browsing-topics=()
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Resource-Policy: same-site
Content-Security-Policy: default-src 'self'; ... frame-ancestors 'none'; base-uri 'self'; form-action 'self'; upgrade-insecure-requests
X-DNS-Prefetch-Control: on
（X-Powered-By: 不在 ✓）
```

## 既知の残課題（別タスク / 将来）

- **CSP `script-src 'unsafe-inline'`**: theme bootstrap インラインスクリプトのため許可。
  nonce 化すれば XSS 耐性が上がるが、bootstrap script の nonce 配布が必要で本タスクのスコープ外。
  構造レビュー D-1 でも指摘済み。フェーズ12 候補。
- **`Server: Vercel`**: 上記のとおりプラットフォーム制約。除去不可。

## 判定

F-5 のうちアプリで対応可能な範囲（`X-Powered-By` / セキュリティヘッダ）は既に対応済みで、
本フェーズでの追加コード変更は不要。`Server: Vercel` は Vercel ホスティングの仕様で除去不可。
