# 激辛レビュー第2巡 — Loop 4

実施日: 2026-04-26
レビュアー: 齋藤ナオ厳格モード
対象: origin/main 1bff709（Loop 3 修正後）
重点: パフォーマンス / SEO / セキュリティヘッダ / Privacy 整合

## サマリ

| 区分 | 件数 |
|------|------|
| Critical | 1（即修正） |
| Minor | 1（即修正） |
| Major | 4（保留） |

## 観点別所見

### 観点1: bundle size
- 最大チャンク 373KB（許容範囲、Next.js 16 デフォルト分割で OK）
- Agent 報告の「16.6MB チャンク」は誤検出（実測 max 373KB）
- recharts は admin/team 配下のみで使用、main bundle 影響限定的だが lazy load 推奨 → **Major M2-14**

### 観点2: Image optimization
- 過去問サイト性質上、image asset は限定的
- next/image 使用箇所は account/page.tsx の unused import 1 件のみ
- Critical 0 / Minor 0

### 観点3: Dynamic imports
- recharts (admin only) を `dynamic(() => import())` 化推奨 → **Major M2-14**
- Critical 0 / Minor 0

### 観点4: Caching headers
- `/api/copilot` の Streaming Response に Cache-Control 未設定 → **Minor N4-1（即修正）**
- sitemap は `force-static` で immutable
- Critical 0 / Minor 1

### 観点5: Sitemap 詳細
- `lib/seo/sitemap-pagination.ts` SITEMAP_CHUNK_SIZE=10,000、Google 推奨 50,000 まで → **Major M2-15**
- lastmod / priority / changefreq 設定整合
- Critical 0 / Minor 0

### 観点6: robots.txt
- `/api/` `/admin/` `/auth/` 全て disallow 済（agent 報告は誤読）
- Critical 0 / Minor 0

### 観点7: JSON-LD
- FAQPage / Quiz / BreadcrumbList / Organization / WebSite 実装済
- Critical 0 / Minor 0

### 観点8: CSP / security headers
- script-src `'unsafe-inline'` あり、theme bootstrap script の正当化目的、SHA-256 化推奨 → **Major M2-16**
- HSTS preload / X-Frame-Options DENY / Referrer-Policy 適切
- Vercel Live preview の connect-src/frame-src が production でも有効 → **Major M2-17**
- Critical 0 / Minor 0

### 観点9: 第三者 cookies / Privacy
- `app/layout.tsx:88` で `<Analytics />` (@vercel/analytics) 使用、しかし `/privacy` Section 3 で「外部アナリティクスを使用していません」と明記 → **Critical C4-1（即修正、法務リスク）**

### 観点10: HTTPS / HSTS
- HSTS preload 設定済、Vercel デプロイで HTTPS 自動
- Critical 0 / Minor 0

## 即修正

| ID | 内容 | ファイル |
|----|------|----------|
| C4-1 | プライバシーポリシー Section 3 を Vercel Web Analytics 開示で更新（Cookie 不使用・IP ハッシュ化・無効化方法） | `app/privacy/page.tsx` |
| N4-1 | `/api/copilot` ストリーミングレスポンスに `Cache-Control: no-store, no-cache, must-revalidate` を追加 | `app/api/copilot/route.ts` |

## Major（保留）— logs/major-issues-2.md に追記

- M2-14: recharts を `dynamic()` で lazy load（admin/team のみ）
- M2-15: SITEMAP_CHUNK_SIZE 10,000 → 50,000 に拡張
- M2-16: CSP script-src の SHA-256 ハッシュ化
- M2-17: Vercel Live preview を production CSP から除外

## 品質保証

- ✅ `pnpm typecheck` 成功
- ✅ `pnpm build` 成功
- NPS 予測: +29 → +31（Privacy Policy 整合で +2 法務クリーンアップ）

## 1巡目との比較
- 1巡目で Privacy 修正（C5-1）したが Vercel Analytics 言及は漏れていた → 本ループで完全整合
- セキュリティヘッダ深掘りは 1 巡目では未実施
