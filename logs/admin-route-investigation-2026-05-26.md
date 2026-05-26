# /admin 無限待機の調査結果 — 2026-05-26（タスク⑥）

## 実機の症状（実機レビュー A-4 / F-1）
本番で `fetch('/admin')` が 8〜10 秒で AbortError、ブラウザ直アクセスでもエラーフレーム。
仮説として「middleware が /admin→/auth にリダイレクトしてサーバ側ループ」が挙げられていた。

## 調査結論：サーバ側にハングは無い（仮説は反証）
`middleware.ts` は完全に同期処理:
- env 読み取り（`ADMIN_BASIC_USER` / `ADMIN_BASIC_PASS`）→ 未設定なら 503 を即返却
- Authorization ヘッダ無し → 401（`WWW-Authenticate: Basic`）を即返却
- 定数時間比較で一致 → `NextResponse.next()`

`await` も `fetch` も `/auth` へのリダイレクトも存在しない。リダイレクトループは起き得ない。
E2E `tests/e2e/admin-auth.spec.ts` は `/admin/stats`・`/admin/metrics` が CI で **401/503 を即返す**ことを継続的に検証しており、HTTP 層でのハングが無いことの裏付けになっている。

## 「無限待機」の真因（最有力）
401 + `WWW-Authenticate: Basic` を受けたブラウザは **OS/ブラウザネイティブの認証ダイアログ**を表示する。
これは運営者（人間）が Basic 認証でログインするための正規 UX。一方、ヘッドレス/自動化ブラウザや
`page.goto` はこのダイアログに応答できず、ページ遷移が完了しないため「10 秒でタイムアウト＝ハング」と
観測される。これはサーバのハングではなくダイアログのブロッキングである。`fetch` は本来 401 を即返すが、
レビューツールの計測経路によっては同様に詰まり得る。

## 本タスクでの対応
1. `middleware.ts` の `matcher` に bare `/admin` と `/api/admin` を明示追加。
   従来 `"/admin/:path*"` のみで、万一 bare `/admin` が素通りすると admin インデックス（#423 で追加）が
   未認証描画される穴があった。これを確実にゲート（401/503）化。
2. E2E に bare `/admin`・`/admin/` のケースを追加し、**5 秒未満で 401/503 を返す**ことを保証
   （無限待機の回帰防止）。

## 社長作業（任意・本番確認）
- Vercel → Project → Settings → Deployment Protection が **無効**であることを確認（有効だと全 URL が
  Vercel SSO を要求し、特定経路が詰まって見えることがある）。
- 運営者が /admin にログインする際は、ブラウザの Basic 認証ダイアログに
  `ADMIN_BASIC_USER` / `ADMIN_BASIC_PASS` を入力する（これは正常動作）。
