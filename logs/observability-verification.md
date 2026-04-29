# Observability Verification Report

**Date**: 2026-04-29  
**Target**: https://ipa-quiz-site.vercel.app  
**Branch**: claude/heuristic-williamson-aee95d  
**Playwright version**: 1.51.1  
**Browsers tested**: Chromium 147, Firefox 148, WebKit 26.4

---

## 1. PostHog 動作確認

### テストページ
`/test/posthog` — `PostHogTestClient` (question_answered / ai_query_sent / feedback_submitted イベント)

### 結果

| ブラウザ | ページ読み込み | ボタンクリック | アラート確認 | ネットワーク検出 | CSP 違反 |
|---------|-------------|-------------|-----------|----------------|---------|
| Chromium | ✅ | ✅ | ✅ | ⚠️ | ❌ 1件 |
| Firefox  | ✅ | ✅ | ✅ | ⚠️ | ❌ 1件 |
| WebKit   | ✅ | ✅ | ✅ | ⚠️ | ❌ 1件 |

**アラートテキスト（全ブラウザ共通）**: `イベント「question_answered」を PostHog に送信しました。`

### ⚠️ 発見された問題: CSP 違反

**問題**: `https://us-assets.i.posthog.com` の config.js スクリプトが `script-src` に未登録のため CSP にブロックされる。

```
Refused to load https://us-assets.i.posthog.com/array/phc_.../config.js
because it violates the Content Security Policy directive: "script-src 'self' ... https://cdn.jsdelivr.net"
```

**影響**: PostHog SDK が完全に初期化されず、イベントがキューされても送信されない場合がある。

**修正**: `next.config.ts` の `script-src` に `https://us-assets.i.posthog.com` を追加済み  
→ コミット `1246fe8` — 本 PR のマージで本番反映。

---

## 2. Sentry 動作確認

### テストページ
`/test/sentry` — `SentryTestClient` (captureMessage / throw Error)

### 結果

| ブラウザ | ページ読み込み | ボタンクリック | アラート確認 | Sentry 送信 | CSP 違反 |
|---------|-------------|-------------|-----------|------------|---------|
| Chromium | ✅ | ✅ | ✅ | ❌ 未送信* | PostHog CSP 起因 1件 |
| Firefox  | ✅ | ✅ | ✅ | ❌ 未送信* | PostHog CSP 起因 1件 |
| WebKit   | ✅ | ✅ | ✅ | ❌ 未送信* | PostHog CSP 起因 1件 |

**アラートテキスト（全ブラウザ共通）**: `Sentry.captureMessage を送信しました。Sentry ダッシュボードを確認してください。`

### * Sentry 未送信の根本原因

Playwright での調査結果 (`window.Sentry.getClient()` が `null`):

```
Sentry state: { initialized: false }
```

**原因**: `NEXT_PUBLIC_SENTRY_DSN` は Vercel に Production 含む全環境向けに設定済みだが、現在の production ビルドは **環境変数追加前に行われた**ため、`Sentry.init()` が実行されていない。

**Vercel 環境変数の状態**:
```
NEXT_PUBLIC_SENTRY_DSN  Encrypted  Development, Preview, Production  (追加日時: 数時間前)
```

**修正方法**: 次の Vercel デプロイ（本 PR マージ時）で自動的に解決される。  
新ビルドでは `NEXT_PUBLIC_SENTRY_DSN` が利用可能になり `Sentry.init()` が実行される。

---

## 3. 技術的詳細

### PostHog ネットワーク status 401 について

Playwright が検出した `status 401` は PostHog CDN の config.js リクエストに対するもの。  
CSP でブロックされたスクリプトは HTTP 403/401 として扱われる。  
イベントキャプチャ自体は `us.i.posthog.com` の `connect-src` 許可済みエンドポイント経由。

### Sentry tunnelRoute について

main の `next.config.ts` に `tunnelRoute: "/monitoring"` が設定されており、  
Sentry イベントは `ingest.us.sentry.io` ではなく `/monitoring` (同一ドメイン) でプロキシされる。  
Playwright スクリプトは両方のパターンを監視するよう更新済み。

---

## 4. まとめ

| 項目 | 状態 | 備考 |
|-----|------|------|
| `/test/posthog` ページ表示 | ✅ 全ブラウザ正常 | |
| `/test/sentry` ページ表示 | ✅ 全ブラウザ正常 | |
| WelcomeModal ハンドリング | ✅ Escape で回避 | |
| PostHog イベント送信フロー | ⚠️ SDK一部未初期化 | CSP fix PR に含む |
| PostHog CSP 対応 | ⚠️ 要デプロイ | script-src 修正済み、未反映 |
| Sentry SDK 初期化 | ❌ 現ビルドで未実行 | 次のデプロイで解決 |
| Sentry イベント送信 | ❌ SDK未初期化のため | 次のデプロイで解決 |

### 次のデプロイ後に期待される動作
- PostHog: CSP 解決 → config.js ロード → SDK 完全初期化 → イベント送信正常
- Sentry: `NEXT_PUBLIC_SENTRY_DSN` が利用可能 → `Sentry.init()` 実行 → イベント送信正常

---

## 5. 実行コマンド

```bash
# PostHog 検証
pnpm tsx scripts/verify-posthog.ts

# Sentry 検証
pnpm tsx scripts/verify-sentry.ts

# 本番以外のURL (Vercel プレビュー等) で検証
VERIFY_BASE_URL=https://xxx.vercel.app pnpm tsx scripts/verify-posthog.ts

# PostHog API も検証する場合
POSTHOG_API_KEY=phx_xxx pnpm tsx scripts/verify-posthog.ts
```
