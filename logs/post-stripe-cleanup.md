# Post-Stripe cleanup — オーナー作業項目

実施日: 2026-05-16
対応PR: fix/urgent-brand-integrity

## コードベースから完全除去済み

- app/launch/ (Stripe roadmap 記述含む) 全削除
- app/analytics/page.tsx (Stripe Dashboard 参照含む) 削除
- app/privacy/page.tsx Stripe 決済関連記述削除 (Sec 1, Sec 3 Cookie)
- app/admin/stats/page.tsx checkout_* / billing_portal_opened イベント定義削除 (4件)
- app/api/copilot/route.ts Stripe 関連コメント削除

## オーナー手動作業を要する項目

Vercel Project Settings (Production / Preview / Development 全環境):

1. 環境変数 STRIPE_* 系の削除
   - STRIPE_SECRET_KEY (未使用)
   - STRIPE_WEBHOOK_SECRET (未使用)
   - STRIPE_PUBLISHABLE_KEY (未使用)
   - NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY (未使用)
   - その他 STRIPE_ プレフィックス全件

2. Stripe Dashboard 側のアカウント
   - フェーズ4 実装まで Test mode で保持してOK
   - 解約は不要 (キーがコードベースから参照されない状態)

3. docs/stripe-keys-restricted.md と docs/restricted-key.md のレビュー判断
   - 現状はフェーズ4 課金実装のための参考メモとして保持
   - 完全に消す場合は別タスクで対応

## 確認方法

```bash
# Stripe 文字列が残っていないことを確認
grep -ri "stripe" app/ components/ lib/ --include="*.tsx" --include="*.ts" | grep -v "logs/"
```

## i18n インフラ削除

- lib/i18n/ 全削除 (I18nProvider.tsx + dictionaries.ts)
- messages/ 全削除 (ja.json, en.json, zh.json)
- app/layout.tsx から I18nProvider のラップ解除
- package.json に i18n 関連依存なし(調査済 next-intl / next-i18next 未使用)

将来 i18n 対応する場合は next-intl 推奨。dictionaries.ts は git 履歴から参照可能。
