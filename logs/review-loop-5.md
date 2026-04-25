# Loop 5 — 激辛レビュー（齋藤ナオ・厳格モード）
日時: 2026-04-26 / 開始コミット: 8f1b4ae（Loop 4 push 後）

## Phase 1: 過去ループ修正の再検証
- Loop 1 description: prod 反映済（"12,000問超" 確認）
- Loop 2 OG 画像: prod で 85,316 byte 正常生成（curl -skI 確認）
- Loop 2 FAQ: prod 反映済
- Loop 3 ホーム JSON-LD: prod の HTML に `application/ld+json` が 2 件出現（WebSite + Organization）
- Loop 4 午後 ModeCard: コミット 1acae8e push 済、Vercel デプロイ進行中

## Phase 2: Critical（即修正）

### C5-1. プライバシーポリシーの記載が実装と矛盾（虚偽記載・法務リスク）
**実測**:
- `app/privacy/page.tsx:65-69` 旧文:
  > 本サービスはユーザーアカウントや個人情報の登録を必要としません。
  > 学習履歴・回答履歴・設定はお使いのブラウザの localStorage にのみ保存されます。
  > これらのデータはサーバーに送信されることはありません。

**実装側の事実**:
- `app/api/auth/[...nextauth]/route.ts` 経由で NextAuth が稼働、Google/GitHub/Email Magic Link でログイン可能
- `app/api/account/history-sync/route.ts` で学習履歴をサーバー（Prisma）に同期
- `app/api/email-list/route.ts` で公開通知メールアドレスを収集
- `app/api/stripe/checkout/route.ts` + `app/api/webhooks/stripe/route.ts` で Stripe 決済（顧客 ID と契約状態を DB 保存）
- `app/pricing/page.tsx` は 980 円 Premium を公開済、`PremiumCheckoutButton` で Stripe Checkout に遷移

**影響**:
- ユーザーがプライバシーポリシーを根拠に「サーバーに送信されない」と信じてサインアップすると **APPI/GDPR 観点で同意取得が無効** になりうる
- 競合サイトが「過去問道場は規約が古い」と批判されることがあるが、本サイトはまさにそのレベル
- Hard Launch 前に絶対修正すべき法務インシデント

**修正**:
- `/privacy` 第1節を 3 段落に再構成: ①匿名利用時の localStorage / ②ログイン時のクラウド同期 / ③決済情報（Stripe 直接処理・カード番号は当社未保持）/ メールリスト
- `/privacy` 第4節にアカウント設定からのサインアウト・履歴削除導線を追加
- 最終更新日を 2026-04-26 に更新（実態反映済の証跡）
- meta description も整合させて更新

### C5-2. 他の Critical 該当なし
- 全主要ページ HTTP 200（/account は /auth/signin にリダイレクト = 期待動作）
- フッター 5 リンク（/terms /privacy /commerce /operator /settings）すべて 200
- Stripe checkout は env 未設定なら 503 を適切に返す（auth 未設定でも先に 401 で拒否）

## Phase 3: Major
新規 Major 該当なし。既存 M1〜M3 は引き続き `logs/major-issues.md` に保留。

## Phase 4: Minor（即修正）

### N5-1. About ページに同じ「localStorage のみ・サーバー送信なし」記載
**実測**: `app/about/page.tsx:119-121` 旧文:
> 学習履歴・回答履歴は、お使いのブラウザの localStorage にのみ保存され、サーバーには送信されません。
> 端末・ブラウザを変更すると履歴は引き継がれません。

→ `/privacy` と同じ理由で実装と矛盾。

**修正**: 「匿名利用も、ログインしてクラウド同期も選べる」と書き直し。説明 description も整合させた。

## Phase 5: ビジネス・SEO・差別化評価
- C5-1 は法務観点でローンチブロッカー級だった。修正により Hard Launch 可否判定の主要ブロッカーが解消
- /privacy が Stripe / NextAuth / cloud sync を正確に説明することで、有料化フェーズに進める信頼性が確保された
- /about プライバシー節も整合 → 訪問者が複数ページ間で齟齬を見つけて「運営が雑」と感じるリスクを除去

## Phase 6: NPS 予測
- Loop 4 比 +3 → **+17（baseline）**
- 理由: 法務記述の整合により有料導線・ログイン導線への安心感が高まる（信頼の地盤）

## Phase 7: ローンチ可否判定
- **Soft Launch 可、Hard Launch も可**（C5-1 が prod 反映され次第）
- Loop 5 で Critical 1 件発見 → 早期完了条件（3 ループ連続 Critical 0 + Minor 0）リセット
- Loop 6 以降で再度 Critical 0 が続けば Loop 8 で早期完了の可能性あり

## 本ループで対応する Issue
- C5-1: /privacy をログイン/クラウド同期/Stripe 実装と整合（第1節再構成 + 第4節追記）
- N5-1: /about プライバシー節を同様に整合
