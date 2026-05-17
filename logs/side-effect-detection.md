# 副作用検出レポート (60+ PR導入後)

検査日: 2026-05-17
基準: origin/main HEAD = 8e1b2dd
対象PR: #240 PostHog / #258 search / #260 bug-hunt / #263 feedback / #264 study-plan / #266 bookmarks / #267 PWA / #269 RAG ほか

## サマリ

- 致命傷: 1件
- 高: 0件
- 中: 2件
- 観察事項のみ: 1件

---

## 致命傷 (致命的副作用 — 修復必須)

### S1. Service Worker キャッシュ名が毎回変化、キャッシュ事実上機能せず (#267)

ファイル: public/sw.js:10
コード: const CACHE_VERSION = 'v' + Date.now();

問題:
Service Worker のトップレベルで Date.now() を呼び、キャッシュ名 (STATIC_CACHE / PAGE_CACHE / CONTENT_CACHE) に埋め込んでいる。Service Worker は idle 時に終了し、再 fetch イベントで再起動するが、その都度スクリプトが再評価され Date.now() は新しい値を返す。

結果:
- 再起動の都度、新しいキャッシュ名が生成される (例: ipa-quiz-static-v1747000000 → ipa-quiz-static-v1747000005)
- activate ハンドラは新規インストール時のみ発火するため、再起動による「孤児キャッシュ」は削除されない
- 各リクエストが事実上「初回」となり、キャッシュヒット率が大幅低下
- mobile 端末でストレージが時間と共に肥大化

修復方針:
CACHE_VERSION を固定文字列にする (例: 'v3')。デプロイ毎に手動で bump する運用とする。Date.now() の意図 (デプロイ毎の自動 bump) は、SW スクリプトの内容自体が変わらないと SW 更新が発火しないので、そもそも機能していなかった。

---

## 中 (修復推奨だが緊急ではない)

### M1. LS_KEYS.chatSessions と lib/chat/storage.ts の二重定義 (#240 以前)

LS_KEYS.chatSessions ("ipa-quiz:chat-sessions:v1") は lib/storage/keys.ts:13 に定義されているが、参照箇所が一切ない。一方 lib/chat/storage.ts:3 は同じ文字列を直接ハードコードして使用。値は一致するため衝突は発生していないが、CLAUDE.md の「LocalStorage キーは必ず LS_KEYS 経由」というルールに違反。LS_KEYS から削除するか、lib/chat/storage.ts を LS_KEYS 参照に置き換えるべき。

修復方針: lib/chat/storage.ts を LS_KEYS.chatSessions 参照に統一する (規約遵守 + 将来のキー名変更時の安全性向上)。

### M2. jstDateString の三重定義

同じロジックの jstDateString() が以下3か所に独立実装されている:
- lib/streak/core.ts:20
- lib/storage/rate-limit-client.ts:8
- lib/gamification/daily-challenge.ts:5 (名前は jstChallengeDate)

衝突や挙動差はないが、JST 計算は微妙な境界 (夏時間など) で誤りやすい領域。1つの正本に統合すべき。

修復方針: 今回は緊急性低、ドキュメント化のみで Phase 3 修復対象外。

---

## 観察事項 (今回は対応しない)

### O1. lib/study-plan/storage.ts も LS_KEYS をバイパスし2キーをハードコード

- "ipa-quiz:study-plans:v1"
- "ipa-quiz:study-plan-progress:v1"

衝突なし。ファイル冒頭のコメントで「self-contained で将来移行可」と明示しており、設計判断としては許容範囲。今回は対応見送り。

---

## 検査済みで問題なしの項目

- /api/copilot, /api/search/questions, /api/admin/api-usage の同時アクセス — 各 API はキャッシュ制御 (no-store / public,max-age) を適切に分離。
- IP レート制限 (KV) — checkIpRateLimit が KV 未設定時は ok=true で fail-open、有効時はバケット単位で原子的に INCR/EXPIRE 実行。race condition なし。
- JST タイムゾーン処理 — streak/heatmap/daily-challenge/missions すべて同じ JST offset 計算で一貫。
- Hydration / SSR-CSR mismatch — 新規ページ (bookmarks/search/account/study-plan) は "use client" + useEffect で localStorage 読み出し。SSR 安全。
- PWA manifest icon パス — /favicon.svg, /icon-192.svg, /icon-512.svg すべて public/ 配下に存在 (CLAUDE.md で確認済)。
- /offline ページ — export const dynamic = "force-static" 設定済、SW プリキャッシュ対象。
- PostHog (PR #240) — components/PostHogProvider.tsx ベース。LocalStorage キー干渉なし。

