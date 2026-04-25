# Loop 3 — 激辛レビュー（齋藤ナオ・厳格モード）
日時: 2026-04-26 / 開始コミット: 6e7421a（Loop 2 push 後）

## Phase 1: 過去ループ修正の再検証
- Loop 1 description 修正は prod デプロイ済 — `<meta name="description">` が新値を返すことを実測
- Loop 2 OG 画像修正は **prod 未反映**（curl で 0 byte continued）— Vercel デプロイ進行中

## Phase 2: Critical
**Critical 該当なし**。
- 主要 13 試験区分のクイズエントリー (`/quiz?mode=random&exam=*`) いずれも 200 OK
- 質問詳細ページ `/q/{exam}/{yearSeason}/{section}/{qnum}` 抽出 4 サンプル中 2 は 404（FE 2024-spring, DB 2024-spring）→ 但しサンプル URL が誤りで、実態は FE=`2024-cbt`, DB=`2024-autumn` で正常生成済
- Sitemap は 12,604 URL、適切に分割済 (10,442 + 2,162)
- /api/copilot は不正リクエストを 400 で適切に拒否
- 認証/管理 API は 401/405 で適切に保護

## Phase 3: Major
新規 Major 該当なし。

## Phase 4: Minor（即修正）

### N3-1. ホームページに JSON-LD 構造化データなし
**実測**: `curl -s / | grep 'application/ld+json'` → 0 件
**比較**:
- `/faq` → FAQPage schema あり ✅
- `/q/...` → Quiz/Question schema あり ✅
- `/` → なし ❌
- `/about` → なし ❌

**影響**: Google サイトリンクのサーチボックス未対応、SNS ブランド連携が弱い。`@type=WebSite` の `potentialAction` で内部検索（クイズ）を Google に告知することで自然流入の質が上がる。

**修正**: `app/page.tsx` に JsonLd 追加
- `WebSite` schema + `SearchAction`（クイズエンドポイントを内部検索として登録）
- `Organization` schema + `sameAs` (X, note)

## Phase 5: ビジネス・SEO・差別化評価
- メタ description は Loop 1 修正により改善済（13試験/12,000問 訴求が prod に出ている）
- Sitemap は問題詳細 URL を網羅、Google indexability は良好
- JSON-LD ホームページ追加で **Knowledge Graph 認識** の可能性向上
- robots.txt も適切（`/api/`, `/admin/`, `/auth/` を Disallow）

## Phase 6: NPS 予測
- Loop 2 比 +2 → **+10（baseline）**
- 理由: SNS シェア時のサムネ復旧（Loop 2 デプロイ後）+ JSON-LD で Google での見え方改善

## Phase 7: ローンチ可否判定
- **Soft Launch 可、Hard Launch は OG 画像のデプロイ反映後 OK**
- C2-1 が prod に反映され OG 画像が出てれば、X カード経由の自然流入が機能し始める
- 早期完了条件（3 ループ連続 Critical 0 + Minor 0）には未到達 — Loop 3 で Minor 1 件発見

## 本ループで対応する Issue
- N3-1: ホームページに WebSite + Organization JSON-LD を追加
