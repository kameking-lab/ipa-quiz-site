# LocalStorage Keys Inventory (2026-05-23)

UX overhaul フェーズ 3 タスク⑥-3 の成果物として、現時点で本サイトが使用する
全 LocalStorage キーを一覧化する。新規キー追加の重複チェックと、フェーズ 1+2+3
で追加されたキーの追跡を目的とする。

## 命名規約

2 系統の prefix を使い分けている:

- `ipa-quiz:<feature>:v<n>` — ランタイム / 学習状態。`lib/storage/keys.ts` の `LS_KEYS` 経由でアクセスする
- `kakomon-ai-<feature>-v<n>` — オンボーディング / 個人化 / コパイロット個人設定。専用 lib モジュール経由でアクセスする

両系統とも 末尾 `-v<n>` でスキーマ世代管理し、後方互換が壊れる場合は v をインクリメントする。

## `ipa-quiz:*` 系 (`LS_KEYS` 経由、43 件)

学習履歴・スター・テーマ・AI 使用量・モーション・通知・モチベ・XP・チャットセッション
など、本サイトの基盤データ。全て `lib/storage/keys.ts` から export される定数:

- ipa-quiz:history:v1 — 解答履歴 (createHistoryStore)
- ipa-quiz:starred:v1 — スター付き問題
- ipa-quiz:premium:v1 — プレミアム判定フラグ（開発用）
- ipa-quiz:theme:v1 — テーマ選択
- ipa-quiz:ai-usage:v1 — 1 日の AI 呼び出し回数 (rate-limit-client)
- ipa-quiz:settings:v1 — クイズ設定 (randomizeChoices, recordHistory 等)
- ipa-quiz:swipe-hint-shown:v1 — モバイルスワイプヒント既読
- ipa-quiz:feedback-submitted:v1 — フィードバック投稿済みフラグ
- ipa-quiz:feedback-gate-shown:v1 — フィードバック ゲートモーダル表示済み
- ipa-quiz:question-feedback:v1 — 各問題フィードバック
- ipa-quiz:public-feedback:v1 — パブリックフィードバック投稿履歴
- ipa-quiz:chat-sessions:v1 — AI チャットセッション履歴
- ipa-quiz:motivation:v1 — モチベーション設定 (sound, reduce-motion)
- ipa-quiz:study-days:v1 — 学習した日のヒートマップ
- ipa-quiz:earned-badges:v1 — 獲得バッジ
- ipa-quiz:premium-coupon:v1 — プレミアム クーポン
- ipa-quiz:srs:v1 — 間隔反復学習 (SRS)
- ipa-quiz:exam-date:v1 — 試験日設定
- ipa-quiz:mock-scores:v1 — 模試スコア履歴
- ipa-quiz:ranking-nickname:v1 — ランキング表示名
- ipa-quiz:notification-prefs:v1 — 通知設定
- ipa-quiz:push-subscription:v1 — Web Push サブスクリプション
- ipa-quiz:xp:v1 — XP / レベル
- ipa-quiz:achievements:v1 — アチーブメント
- ipa-quiz:daily-challenge:v1 — 日替わりチャレンジ
- ipa-quiz:daily-missions:v1 — 日替わりミッション
- ipa-quiz:avatar:v1 — アバター設定
- ipa-quiz:audio-bgm:v1 — BGM 設定
- ipa-quiz:audio-bgm-volume:v1 — BGM 音量
- ipa-quiz:language:v1 — UI 言語
- ipa-quiz:character:v1 — AI キャラ ID
- ipa-quiz:character-enabled:v1 — AI キャラ有効化
- ipa-quiz:copilot-response-length:v1 — AI 応答長設定
- ipa-quiz:review-seen:v1 — レビュー既読
- ipa-quiz:last-question:v1 — 最後に解いた問題 (lib/storage/last-question)
- ipa-quiz:mock-exam:v1 — 模試セッション保存
- ipa-quiz:gold:v1 — ゴールド（ゲーミフィケーション通貨）
- ipa-quiz:bookmarks:v1 — ブックマーク (lib/storage/bookmarks)
- ipa-quiz:search-history:v1 — /search 検索履歴
- ipa-quiz:saved-searches:v1 — /search 保存済み検索条件
- ipa-quiz:daily-goal:v1 — 今日の目標 (motivation/daily-goal)

## `kakomon-ai-*` 系 (専用 lib、3 件)

オンボーディング / 個人化 / コパイロットカスタマイズ。`LS_KEYS` には含めず、
各 lib モジュールで定数管理する:

- kakomon-ai-onboarding-v1 — オンボーディング状態 (firstVisitAt, completedTour,
  dismissedAt, attribute, selectedExam)。lib/onboarding/state.ts
- kakomon-ai-user-context-v1 — フェーズ 3 追加。ホーム個人化用 (visitCount,
  lastVisitAt)。lib/storage/user-context.ts
- kakomon-ai-copilot-pinned-actions-v1 — フェーズ 3 追加。Copilot クイック
  アクション ピン留め (最大 3 件、QuickActionId[])。lib/copilot/pinned-actions.ts

レガシー互換キー (`onboarding/state.ts` 内のマイグレーション用、新規書き込みなし):

- ipa-quiz:onboarded:v1 — 旧 WelcomeModal 既読フラグ。`readOnboardingState()`
  が読み取って migrated 状態に展開、新規セッションは `kakomon-ai-onboarding-v1`
  のみ書き込む。E2E では playwright.config.ts の storageState で seed 設定済み。

## フェーズ 3 追加分の影響

新規 2 件 (`kakomon-ai-user-context-v1`, `kakomon-ai-copilot-pinned-actions-v1`)
はいずれも既存キーと衝突しない (prefix `kakomon-ai-` 系、新規 v1)。

- user-context: PR #346 で追加。/settings の「個人設定をリセット」ボタンで
  `lastQuestion` と同時にクリア可能。
- pinned-actions: PR #347 で追加。ピン留め最大 3 件、UI 上で個別解除可能。
  既存リセットボタンには含めず、ユーザー自身による解除に任せる方針。

総 LocalStorage キー数: 46 (`ipa-quiz:*` 43 件 + `kakomon-ai-*` 3 件)。レガシー
1 件は read-only。
