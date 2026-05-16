# Phase 1: ルート・ページ・API 全件スキャン報告

調査対象: HEAD 37e85b7
構成: app/ 配下 page.tsx 81個 + route.ts 36個 = 117ルート
スキャン日: 2026-05-16

注意: 本報告は調査結果のみ。削除実施はオーナー判断による別ディスパッチ。


## 即削除推奨 (アーカイブ化すべき一時公開ドキュメント)

優先度: High
共通の特徴: robots: noindex、タイトルに「内部検討用」「一時公開」「24時間後削除」明記、logs/ 配下の md に依存。

1. app/tmp/round7-review/page.tsx
   - タイトル: 「齋藤ナオ Round 7 レビュー | 一時公開」
   - 24時間削除予告ありで既に役目終了の可能性
   - 依存: docs/review-round7-saito-nao.md

2. app/test/posthog/page.tsx
   - 「ボタンをクリックしてテストイベントを発火します」
   - 検証目的、外部公開不要

3. app/test/sentry/page.tsx
   - 「ボタンをクリックしてテストエラーを発生させます」
   - エラートリガー用デバッグ画面

4. app/final-review/page.tsx と app/final-review-v3/page.tsx
   - 両者 robots: noindex、production で notFound() 返却
   - v1 は「90%削減後の最終辛口レビュー」
   - v3 は「教育貢献ピボット後の最終辛口検証」
   - 重複機能、v3 へ統一推奨
   - 依存: logs/final-review.md, logs/final-review-v3.md

5. app/strategy-discussion/page.tsx と app/strategy-discussion-v2/page.tsx
   - 両者 robots: noindex、nocache、「24時間後に削除」明記
   - v1 は「90%削減前の議論」、v2 は「赤字試算後の再討議」
   - 重複、v2 へ統一推奨
   - 依存: logs/strategy-discussion.md, logs/strategy-discussion-v2.md

6. app/feature-review/page.tsx
   - 「機能改善レビュー(10名・辛口)」「ユーザー5名 + 実装プロ5名」
   - 依存: logs/feature-review.md

7. app/scoring-test/page.tsx
   - 「SEO+UX 最終評価レポート」「10ページの定量計測」
   - 計測日付 2026-05-06 (既に過去)
   - 依存: logs/scoring-test.md

8. app/exec-review/page.tsx
   - 「Executive Review (内部検討用)」「24時間後に削除」
   - 「教育貢献ピボット激辛検証レビュー」
   - 依存: logs/exec-review.md


## アーカイブ推奨 (デモ・プロトタイプで価値はあるが要見直し)

優先度: Medium

1. app/demo/afternoon/page.tsx
   - robots: なし(公開許可)
   - 「午後 AI 採点デモ - 高度試験6区分の記述・論述添削を体験」
   - 「ログイン不要・体験デモ」「モック結果を返す」と明記
   - 削除前に /essay ページからの参照リンク確認

2. app/demo/essay-grading/page.tsx
   - robots: なし
   - 「AI 論述添削 品質サンプル - 採点根拠を全公開」
   - 架空ペルソナの詳細採点例示で教育的価値あり

3. app/launch/page.tsx
   - 「正式リリース - 2026年5月」(現在 2026-05-16 で既に過去)
   - ロードマップ・事前登録フォーム含
   - 役割終了で削除検討


## 要オーナー判断 (機能仕様確認必須)

優先度: Owner-Decision

1. app/api/essay-grade/route.ts と app/api/essay-grading/route.ts
   - 重複疑念だがプロンプト仕様が異なる
   - essay-grade: 「IPA 元採点委員プロンプト」「4軸(適合度・論理性・具体性・業種事例)」、questionId 使用
   - essay-grading: 「論述を厳格採点」「5観点評価」、自由形式テキスト
   - 設計分離か実装漏れか担当者確認必須

2. app/analytics/page.tsx
   - robots: なし、middleware.ts の matcher (/admin/:path*) に含まれず BasicAuth 保護なし
   - タイトル「データサイエンス向けダッシュボード」、モック DAU・登録・サブスク数値表示
   - セキュリティ再検討必須

3. app/operator/page.tsx
   - robots: なし、「運営者情報」「ボランティア有志(教育貢献プロジェクト)」
   - 公開意図あるが個人情報露出度確認推奨

4. app/account/api-keys/page.tsx
   - /settings/api-keys へ redirect() 統一済み
   - canonical も /settings/api-keys に設定
   - ファイル構造整理として削除候補


## 維持(本番ユーザー向けで正規構成)

優先度: Low (アクション不要)

本番学習機能: /quiz, /essay, /essays, /[exam]/, /topics, /keywords, /recommended-books
ブログ・FAQ: /blog, /faq, /contact, /about, /privacy, /terms, /transparency
ユーザーアカウント: /account/*, /settings/* (robots: noindex 適切)
管理画面: /admin/* (BasicAuth 保護、middleware.ts /admin/:path*)
学習支援: /ranking, /mock-exam, /review, /challenge, /modes/*
SEO/メタ: /sitemap, /og/*, /sitemap.xml/*


## 重複ペア一覧

ペア1: Final Review
- v1 = final-review (90%削減版)
- v3 = final-review-v3 (教育貢献ピボット版)
- 推奨: v3 へ統一、v1 削除

ペア2: 戦略討議
- v1 = strategy-discussion (初版)
- v2 = strategy-discussion-v2 (赤字試算版)
- 推奨: v2 へ統一、v1 削除

ペア3: Essay Grading API
- /api/essay-grade (4軸プロンプト)
- /api/essay-grading (5観点プロンプト)
- 推奨: オーナー確認

ペア4: API Keys ページ
- /account/api-keys (redirect 専用)
- /settings/api-keys (本体)
- 推奨: account/api-keys 削除


## 件数サマリ

- 即削除推奨: 8ルート (うち重複ペア 2組 = 4ファイル含む)
- アーカイブ推奨: 3ルート
- 要オーナー判断: 4ルート
- 維持: 約100ルート


## 段階別アクション提案 (削除実施は別ディスパッチ)

段階1 (即座): tmp/ と test/ 配下5ファイル削除、対応 logs/*.md も併せて削除
段階2 (1週間内): final-review v1 / strategy-discussion v1 / exec-review / feature-review / scoring-test 削除
段階3 (2週間内): /api/essay-grade と /api/essay-grading の実装確認・統合判断
段階4 (継続): /analytics の BasicAuth 適用、/launch の役割終了判定、/operator の公開情報レビュー
