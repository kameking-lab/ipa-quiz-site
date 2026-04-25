# Loop 7 — 激辛レビュー（齋藤ナオ・厳格モード）
日時: 2026-04-26 / 開始コミット: Loop 6 push 後

## Phase 1: 過去ループ修正の再検証
- Loop 1〜5 prod 反映済（既確認）
- Loop 6 `/modes/year` `/modes/topic` 全 13 試験対応: コミット push 済、Vercel デプロイ進行中
- typecheck / build 直近全成功

## Phase 2: Critical（即修正）
新規 Critical 該当なし。
- Stripe checkout / /api/copilot / OG 画像 / sitemap chunk / 全試験 quiz random 200 すべて健全
- /privacy /about の整合性は Loop 5 で解消済
- /modes/year /modes/topic の試験別動作は Loop 6 で解消済

## Phase 3: Major
新規 Major 該当なし。既存 M1〜M3 引き続き保留。

## Phase 4: Minor（即修正）

### N7-1. サイトマップから商業導線/学習機能ページ 5 件が欠落（SEO 機会損失）
**実測**:
- `lib/seo/sitemap-xml.ts:22-31` の `STATIC_ROUTES` を実機検証
- `curl -sk https://ipa-quiz-site.vercel.app/sitemap/0.xml` の `<loc>` 列挙で確認
- 欠落していた公開ページ:
  - `/pricing` — Premium 980 円の商業 LP（コマーシャルインテント最重要）
  - `/commerce` — 特定商取引法表記（決済ページから到達できるが index されない）
  - `/case-studies` — 学習事例（B2B 流入導線）
  - `/review` — 復習モード（学習ファネル）
  - `/mock-exam` — 模試モード（プレミアム機能露出）

**影響**:
- Google が `/pricing` を発見できず、「IPA 過去問 料金」「IPA 試験対策 月額」などの商業クエリを取りこぼす
- `/commerce` 未登録は特商法ページの可視性が低下し、決済信頼性 SEO シグナルが弱まる
- `/review` `/mock-exam` `/case-studies` は学習動機キーワード経由の集客機会を逃す
- ベータ公開後の有料化フェーズで売上のレバレッジを最大化するうえで放置不可

**修正**:
- `STATIC_ROUTES` に 5 件追加し、優先度を以下のように設定:
  - `/pricing` priority 0.7 / monthly（商業ページとして高優先）
  - `/mock-exam` 0.6 / monthly
  - `/review` 0.5 / weekly（履歴依存だが頻繁に内容が変わりうる）
  - `/case-studies` 0.5 / monthly
  - `/commerce` 0.2 / yearly（法務ページなので低頻度）
- 既存ルートとの並びは「ホーム→学習機能→商業→情報→法務」の順に整列

**検証**:
- `pnpm typecheck` ✅
- `pnpm build` ✅
- `/sitemap/[id]` ルートに変更なし（renderSitemapChunkXml は STATIC_ROUTES を読むだけ）
- prod デプロイ後 sitemap/0.xml に 5 件の追加 `<url>` が出現することを期待

## Phase 5: ビジネス・SEO・差別化評価
- 商業ページ `/pricing` が sitemap に乗ることで、Google Search Console の coverage が広がり料金関連クエリでの indexation が期待できる
- `/commerce` の indexation により決済ページから降りる訪問者が法務確認しやすくなり、コンバージョン信頼性が向上
- `/review` `/mock-exam` の露出強化はリピーター獲得 SEO（ロングテール「過去問 復習モード」「IPA 模試 オンライン」）として効く
- 競合過去問道場は静的ドメイン分割しているがサイトマップに学習モードページを露出していない → サイトマップ整備で SEO 上のリードを取れる

## Phase 6: NPS 予測
- Loop 6 比 +1 → **+23（baseline）**
- 理由: ユーザー体感への直接寄与は小さいが、長期 SEO 流入増加は将来の NPS（口コミ強度）に寄与

## Phase 7: ローンチ可否判定
- **Soft Launch / Hard Launch ともに可**
- Loop 7: Critical 0 / Minor 1 → 早期完了条件のカウントは Minor 検出により未達
- Loop 8 以降で Critical 0 + Minor 0 が 3 連続続けば Loop 10 で早期完了の可能性

## 本ループで対応する Issue
- N7-1: STATIC_ROUTES に /pricing /commerce /case-studies /review /mock-exam を追加
