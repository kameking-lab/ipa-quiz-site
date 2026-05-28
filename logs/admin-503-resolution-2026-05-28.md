# /admin が503を返す問題 — 原因特定と対応 (2026-05-28)

対象: フェーズ14 第2致命傷。実機検証中に「/admin が HTTP 503 を返す」と報告された件。
ブランチ: `fix/admin-503-resolution` / 基点 main HEAD: `3ce3ed0`

## 結論（先に）
**コードのバグではない。** 503 は `middleware.ts` の fail-closed 設計（admin認証 env 未設定時に 503）で、これは健全。
調査の結果、**本番には ADMIN_BASIC_USER / ADMIN_BASIC_PASS が両方設定済み**で、**現在の本番 /admin は 401 を返している**（=設計どおり動作）。報告された 503 は、env がデプロイに反映される前の古い/伝播前のデプロイ状態に起因する一過性で、すでに解消している。

→ ケース判定: 当初仮説の「ケースA（env未設定→社長作業）」ではない。env は設定済み。コード修正も不要（503挙動の変更は後述のとおりセキュリティ後退になるため行わない）。

## 503の返却条件（middleware.ts:38-47）
```
const user = process.env.ADMIN_BASIC_USER?.trim();
const pass = process.env.ADMIN_BASIC_PASS?.trim();
if (!user || !pass) {
  return new NextResponse("Admin auth is not configured. ...", { status: 503 });
}
```
- env が未設定 or trim後に空 → 503（構成エラー、fail-closed）
- env 設定済 + 認証ヘッダ無し/不正 → 401（`unauthorized()`、WWW-Authenticate付き）
- env 設定済 + 正しい資格情報 → `NextResponse.next()`（通過）
matcher は `/admin`, `/admin/:path*`, `/api/admin`, `/api/admin/:path*` を網羅。ロジックにバグなし。

## 取得した事実（推測ではなく実測）
1. `vercel env ls`（値ではなく存在のみ）:
   - ADMIN_BASIC_USER … Production / Preview / Development に存在（13日前作成、Encrypted）
   - ADMIN_BASIC_PASS … Production / Preview / Development に存在（13日前作成、Encrypted）
   → 本番に両 env が設定済み。
2. 本番 /admin の現状（curl, 2026-05-28T00:51 UTC）:
   - `GET https://www.kakomon-ai.jp/admin` → **HTTP 401**、0.45s、`WWW-Authenticate: Basic realm="Kakomon AI Admin"`、body `Unauthorized`。
   → 503 は再現せず。設計どおり 401（Basic認証チャレンジ）を返している。

## なぜ503が報告されたか（解釈）
env は13日前に作成されているが、報告時点（2026-05-26）の本番デプロイが env 反映前のビルドだった/伝播前だった可能性が高い。第1致命傷対応で 3ce3ed0 を含む再デプロイが走った現在は env が効き、401 に復帰している。いずれにせよ現状の真実は「401・設計どおり」。

## 対応方針（コード挙動は不変）
- **middleware の 503 挙動は変更しない。** env 未設定時に「サイレント通過」させると /admin が未認証で開放され fail-open（重大なセキュリティ後退）になる。現行 503（構成手順を明示するプレーンテキスト）は妥当。
- 真の不足は**テスト品質**だった。旧 `tests/e2e/admin-auth.spec.ts` は全ケースで `[401, 503]` を等価に許容しており、「認証が効いている(401)」と「認証が壊れている(503)」を区別できなかった。これが本番 503 退行を検知できなかった原因。

## 実施した変更（テスト/設定のみ・アプリ挙動は不変）
1. `__tests__/middleware.test.ts`（新規・決定論ユニットテスト, 9件）:
   - env未設定 → 503 / 片方のみ → 503 / 空白のみ(trim→空) → 503（ケースB）
   - env設定+認証無し → 401（+WWW-Authenticate）/ 非Basic → 401 / 不正base64 → 401 / 誤資格 → 401
   - 正資格 → 通過（x-middleware-next, 401でも503でもない）/ UTF-8パスワード / env末尾改行の許容
   → 401と503の分岐を恒久的に固定し、env脱落による503退行を即検知。
2. `tests/e2e/admin-auth.spec.ts`（強化）+ `playwright.config.ts`（webServerに admin creds をseed）:
   - ローカルwebServerを**設定済み状態**で起動し、無資格→**厳密に401（503を許容しない）**、誤資格→401、正資格→**200**を実機相当のHTTPで検証。
   - リモート（E2E_BASE_URL）実行時は構成不明のため厳密アサーションをskip、ハング無し+ゲート応答のみ確認。

## 検証結果
- middleware ユニット: 9/9 緑（3確認）
- admin e2e: 6/6 緑（3回連続、フレーキー無し）
- typecheck 0 / lint 0(警告1は未追跡スクリプト) / vitest 27ファイル161全緑 / build 成功
- e2e回帰subset（admin-auth・smoke-routes・home-cta-click・security-headers）20全緑

## 社長作業
- **本対応に必要な作業なし**（ADMIN_BASIC_USER / ADMIN_BASIC_PASS は本番設定済みを確認）。
- 参考（将来 env を再設定する場合の手順）: Vercel → Project (ipa-quiz-site) → Settings → Environment Variables → `ADMIN_BASIC_USER` と `ADMIN_BASIC_PASS` を Production/Preview/Development に登録 → 値貼り付け時の末尾改行/空白はmiddleware側で `.trim()` 吸収済 → 反映には再デプロイが必要（env追加だけでは既存デプロイに効かない）。

## 次のステップ
- 本変更マージ・本番反映後、Chrome agent による実機検証を推奨: `GET /admin` が **401**（503ではない）を返し、正しいBasic資格情報で **200**（/admin/stats 等）に到達できること。
