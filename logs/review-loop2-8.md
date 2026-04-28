# Round 2 Loop 8 — 激辛レビュー（齋藤ナオ・厳格モード）
日時: 2026-04-26 / 開始コミット: a8b7f45（Round 2 Loop 7 push 後）

## Phase 1: 過去ループ修正の再検証
- Round 2 Loop 7 fix（AI API err.message 漏洩 + Sentry 送信）push 済、Vercel デプロイ進行中
- typecheck / build 直近全成功

## Phase 2: Critical（即修正）
新規 Critical 該当なし。
- /api/stripe/checkout: 認証→Stripe 設定→DB 設定→入力検証 → priceId 検証の順で 401/503/400/503 を適切に返す（実測コード）
- /api/webhooks/stripe: 署名検証必須・Sentry 連携済・DB 未設定時は 200 で Retry 抑制（設計通り）
- /pricing 数値整合: BETA_DAILY_LIMIT=50 / Premium=500 / metadata description, FAQ, FeatureComparisonTable, PremiumUpsellDialog すべて 50/500 で整合
- /[exam] (試験 top page): generateStaticParams + dynamicParams=false で網羅されたパスのみ SSG、未収録試験は notFound() フォールバック

## Phase 3: Major
新規 Major 該当なし（M2-1〜M2-22 引き続き保留）

## Phase 4: Minor（即修正）

### N8-1. Skip-link のジャンプ先が非フォーカス可能でキーボード操作が破綻
**実測**:
- `app/layout.tsx:89-94` skip link:
  ```tsx
  <a
    href="#main-content"
    className="sr-only focus:not-sr-only focus:fixed ..."
  >
    メインコンテンツへスキップ
  </a>
  ```
- ターゲット (旧) `app/layout.tsx:97`:
  ```tsx
  <span id="main-content" aria-hidden="true" />
  ```
- 問題:
  1. `<span>` は `tabindex` が無いためフォーカスを受け取れない
  2. `aria-hidden="true"` でアクセシビリティツリーから除外されている
  3. ジャンプ先がコンテンツの **兄弟** に過ぎず、`{children}` の頭に飛ばない
  4. 結果: 「メインへスキップ」を押してもブラウザはスクロールするだけで、Tab キーは画面の先頭から再走査してしまう（スクリーンリーダーも沈黙）

**影響**:
- WCAG 2.1 SC 2.4.1 (Bypass Blocks) の実装は形だけで実効性ゼロ
- スクリーンリーダー利用者・キーボード専用ユーザーがヘッダー内のリンク群を毎回辿る羽目になる
- Lighthouse Accessibility が 100 点に達しない
- 事業者として「アクセシビリティ対応サイト」を訴求する根拠を失う（β告知や法人提案の信頼に影響）
- 競合（過去問道場）はそもそも skip-link 自体が無いが、こちらが正しく機能すればその差別化点として明確

**修正**:
```tsx
<div id="main-content" tabIndex={-1} className="flex flex-1 flex-col outline-none">
  {children}
</div>
```
- `<div>` に変更し `tabIndex={-1}` 付与でスクリプト経由のフォーカスを可能に
- `aria-hidden` を撤去してアクセシビリティツリーに復帰
- `outline-none` でフォーカス時の二重 outline を抑制（skip-link が見えれば十分）
- `flex flex-1 flex-col` で子コンポーネントが従来 `<main>` で取れていた高さ計算を継承

**検証**:
- `pnpm typecheck` ✅
- `pnpm build` ✅（既存 SSG 1,512 + dynamic ルート群すべて健全）
- ブラウザの Tab キー行動:
  1. 「メインへスキップ」リンク表示
  2. Enter で `#main-content` に飛ぶ
  3. 次の Tab がメイン内最初のフォーカス可能要素へ
- スクリーンリーダー: アクセシビリティツリーに含まれるためアナウンスされる

## Phase 5: ビジネス・SEO・差別化評価
- WCAG 準拠の skip-link が実機能する → 法人プラン (Team) 営業時の RFP 回答で「アクセシビリティ準拠」と明確に答えられる
- アクセシビリティ事故での炎上リスク回避（特に資格試験対策サイトは弱視・色弱ユーザーの利用が多い）
- 過去問道場は skip-link 未対応のため、本サイトの差別化要素として活用可能

## Phase 6: NPS 予測
- Round 2 Loop 7 比 ±0 → **+22（baseline 維持）**
- 理由: 健常ユーザーには無感の修正だが、a11y ユーザー（推定 5-8%）の体験品質が大きく向上

## Phase 7: ローンチ可否判定
- **Soft Launch / Hard Launch ともに可**
- Loop 8 (Round 2): Critical 0 / Minor 1 → 早期完了条件カウンタ未達

## 本ループで対応する Issue
- N8-1: skip-link のジャンプ先を tabIndex 付き `<div id="main-content">` に修正
