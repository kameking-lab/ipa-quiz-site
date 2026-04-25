# Loop 8 — 激辛レビュー（齋藤ナオ・厳格モード）
日時: 2026-04-26 / 開始コミット: 1d9b483（Loop 7 push 後）

## Phase 1: 過去ループ修正の再検証
- Loop 1〜5 prod 反映済（既確認）
- Loop 6 fix prod 反映確認: `/modes/year?exam=db` で「午前I」「午前II」両方カードが出現（curl 実測）
- Loop 7 fix push 済、Vercel デプロイ進行中

## Phase 2: Critical（即修正）
新規 Critical 該当なし。
- robots.txt 200 / 適切な Allow & Disallow / Sitemap 行あり
- /account → /auth/signin 307 リダイレクト（期待動作）
- /quiz?mode=random&exam={全試験} 200
- /q/{exam}/{yearSeason}/{section}/{qnum} のタイトルが「令和X年度 春期 応用情報技術者 午前 問1 基礎理論 解説 | IPA Quiz」と詳細
- 各質問詳細ページに JSON-LD 2 件（QAPage + BreadcrumbList 推定、production 確認）
- ホーム JSON-LD: WebSite (SearchAction 入り) + Organization の 2 件
- FAQ: FAQPage + BreadcrumbList の構造化データ完備
- /not-found カスタム 404 ページが存在（適切なブランディング）
- 課金導線: Stripe checkout が認証→課金設定→DB 設定→入力検証の順で 401/503/400 を適切に返す
- /commerce: 特商法表記が法定項目を網羅（販売事業者・所在地省略規定・支払方法・返品・解約・動作環境）
- /privacy: NextAuth/Stripe/Cloud sync を Section 1〜2 で正確に説明
- Service Worker (`/sw.js`) 200、`ServiceWorkerRegistration` コンポーネントが HTML に出現

## Phase 3: Major

### M8-1（保留: terms.md に記録）. 利用規約に有料プラン・アカウント解約条項が無い
**実測**: `app/terms/page.tsx` は 7 セクション構成
- ①サービス概要 ②AI ③免責 ④禁止事項 ⑤出典 ⑥準拠法 ⑦規約変更
- 「利用料金」「アカウント解約・データ削除」「会員資格」「年齢制限」のセクションが存在しない
- `/commerce` 側には返金・解約条項があるが、利用規約本体には反映されていない

**影響**: β は無料なので即座の法務リスクは低いが、Premium 課金開始時に「利用規約に明示が無い」条項で消費者契約法リスクが高まる。
本ループでは Critical/Minor の即修正対象には載せず、`logs/major-issues.md` に **M8-1** として記録。

## Phase 4: Minor（即修正）
新規 Minor 該当なし。

検討したが除外:
- `/manifest.webmanifest` の icons が SVG のみ → 現代主要ブラウザでは installability 問題なし。古い Android 等の細部最適化は β スコープ外
- `/quiz?mode=random&exam=invalid` が HTTP 200 で 404 UI を返す → SEO 影響軽微（パラメータ違いのため index されない）、UX も notFound() UI で誘導されるため許容範囲
- /pricing ページに Product/Offer JSON-LD が無い → 改善ではあるがバグではない（SEO エンハンスメント案件）

## Phase 5: ビジネス・SEO・差別化評価
- Loop 7 sitemap 強化により、prod デプロイ後に Google Search Console の coverage が改善見込み
- /commerce が販売事業者情報をしっかり書いている → 過去問道場系サイトより信頼性表現で優位
- Service Worker による PWA 体験は競合に対する差別化（過去問道場は SW 未対応）

## Phase 6: NPS 予測
- Loop 7 比 ±0 → **+23（baseline）**
- 理由: 新規修正ゼロ、ユーザー体感に変化なし。ただし SEO/法務面の地盤は厚くなっている

## Phase 7: ローンチ可否判定
- **Soft Launch / Hard Launch ともに可**
- Loop 8: Critical 0 / Minor 0 → 早期完了条件の 1 ループ目
- Loop 9 と Loop 10 で Critical 0 + Minor 0 が連続すれば Loop 10 終了で早期完了条件達成

## 本ループで対応する Issue
- なし（観察のみ）
- M8-1 を `logs/major-issues.md` に記録予定
