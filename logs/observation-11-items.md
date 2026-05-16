# 観察事項11件 再構成 (2026-05-16)

レポートベース: logs/comprehensive-harsh-review-latest.md (HEAD ab90812, PR #229後)
本スクリーニング時点: HEAD 2094163 (PR #242後)

---

## 観察11件 原文整理

### 課題023
タイトル: Footer "出典: IPA 情報処理技術者試験" の配置確認 (CLAUDE.md セクション8)
該当: components/SiteFooter または app/layout.tsx footer
内容: 全ページのフッターに表示されているかをCLAUDE.mdルールとして確認

### 課題024
タイトル: admin/stats:333 "checkout_started" イベント定義の整合性
該当: app/admin/stats/page.tsx:333
内容: Stripe 未実装下で event スキーマだけ定義されている

### 課題025
タイトル: api/copilot route.ts:146 コメント "Stripe payments (Phase 4)" の維持判断
該当: app/api/copilot/route.ts:146
内容: コードコメントなので公開影響は低、整理判断対象

### 課題026
タイトル: ContactForm カテゴリ enterprise (法人問い合わせ)
該当: app/contact/ContactForm.tsx:12 + app/api/contact/route.ts:27 + tests/e2e/contact-enterprise.spec.ts
内容: 教育貢献ピボット後に法人問い合わせ受付を維持か要オーナー判断

### 課題027
タイトル: app/account/api-keys → /settings/api-keys redirect ファイル統合判断
該当: app/account/api-keys/page.tsx (redirect専用)
内容: next.config.ts:67 で同様の redirect 定義ありで二重定義

### 課題028
タイトル: lib/seo/sitemap-pagination.ts:5 getIndexableQuestions の名前と実装一致
該当: lib/seo/sitemap-pagination.ts
内容: ALL_QUESTIONS.filter(!isPlaceholderExplanation) になっているか確認

### 課題029
タイトル: components/WelcomeModal.tsx の利用箇所最小
該当: components/WelcomeModal.tsx
内容: 1ファイルでしか参照されない。運用上必要性確認

### 課題030
タイトル: Footer の各リンク間 py-2 (32px) のタップ間隔
該当: app/layout.tsx footer links
内容: UX harsh review R8 未対応。py-2.5 (40px) で指の段差確保

### 課題031
タイトル: PostHog のオプトアウト UI 未実装 (UX harsh review O4 再掲)
該当: 全サイト
内容: privacy policy 記載のみで UI トグルなし。EU/CCPA 訴求弱

### 課題032
タイトル: ダークモード切替 Footer のみ (UX harsh review O5 再掲)
該当: components/SiteHeader.tsx, app/layout.tsx
内容: SiteHeader 右上に ThemeToggle 出すと発見性UP

### 課題033
タイトル: HeroAiDemo の "サンプル" ラベル表示 (UX harsh review R11 再掲)
該当: components/home/HeroAiDemo.tsx
内容: aria-hidden=true 済だが視覚にも明示推奨
