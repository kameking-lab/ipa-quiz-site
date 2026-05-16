# Site Content Scan — 統合サマリ

調査対象: HEAD 37e85b7 (origin/main, PR #225 マージ後)
ブランチ: audit/site-content-scan
スキャン日: 2026-05-16
方針: 報告のみ、削除実施はオーナー判断による別ディスパッチ


## 全体所感

過去問AI は 14,417 問規模・80以上のページ・100以上のコンポーネントで構成された大規模Webサイト。
コード品質は全体的に高く、TODO/FIXME 残留はほぼゼロ、PII マスキング・著作権遵守も適切。
一方、PR #100 (educational-contribution ピボット) や PR #221 系の整理で漏れた残骸が複数箇所に存在。
重大な重複コンテンツ・誤情報・セキュリティリスクはないが、ブランド一貫性に関わる項目で軽微な掃除余地あり。


## カテゴリ別詳細レポートへのリンク

- Phase 1 ルート監査: logs/route-scan-report.md
- Phase 2 デッドコード: logs/component-deadcode-report.md
- Phase 3 コンテンツ品質: logs/content-quality-report.md
- Phase 4 重複コンテンツ: logs/content-duplication-report.md
- Phase 5 ブランド棄損: logs/brand-risk-report.md


## 優先度別件数サマリ

優先度 High (推奨アクション 1週間内):
- 即削除推奨ルート: 8件 (tmp/round7-review, test/posthog, test/sentry, final-review v1, strategy-discussion v1, exec-review, feature-review, scoring-test)
- 確実デッドコンポーネント: 19件 / 約2,300行
- 確実デッドlib ファイル: 6件 / 約600行
- 内部ファイルパスがユーザー向けUIに露出: 1件 (app/stats/page.tsx)
- Stripe 関連の事前記述で混乱を招く可能性: 1件 (app/privacy/page.tsx)

優先度 Medium (推奨アクション 1ヶ月内):
- アーカイブ推奨ルート: 3件 (demo/afternoon, demo/essay-grading, launch)
- 重複API: 1ペア (api/essay-grade と api/essay-grading)
- 重複ページ pair: 2組 (final-review v1/v3, strategy-discussion v1/v2)
- ブランド一貫性 (Stripe / enterprise 記述残骸): 6箇所
- i18n dead infrastructure: 1セット (lib + messages 13KB相当)
- ハードコード問題数の不整合: 2箇所 (launch/ 内)
- console.log の PII マスク確認: 1件 (app/api/question-feedback/)

優先度 Low (推奨アクション 継続監視):
- /analytics の BasicAuth 適用検討
- /operator の公開情報レビュー
- blog タイトル『〜【2026年最新】』の年次更新ロジック設計
- exam page metadata の差別化 (SEO 同質判定リスク)


## オーナー判断を必要とする項目

優先度 Owner-Decision:

1. /api/essay-grade と /api/essay-grading の統合判断
   - プロンプト仕様が異なる (4軸 vs 5観点) ため設計分離か実装漏れか確認必須

2. 法人問い合わせ enterprise カテゴリの維持
   - 教育貢献ピボット後も法人問い合わせ受付を維持するか
   - 維持なら現状OK、削除なら ContactForm.tsx と api/contact/route.ts から enterprise 除去

3. i18n 一式の去就
   - 将来 i18n 対応予定があれば dead infrastructure を維持し「将来実装予定」コメント追加
   - 予定なければ lib/i18n/ と messages/ を完全削除 (13KB+)

4. blog タイトル『〜【2026年最新】』の更新方針
   - 自動更新ロジック導入か、毎年手動更新タスク化か

5. /launch ページの去就
   - 「2026年5月正式リリース予告」状態が現在日付 (2026-05-16) と矛盾
   - 削除か、状態を「リリース完了」に更新するか

6. /demo/* の本番公開維持
   - 主要ページからのリンクなしであれば削除候補
   - デモとしての教育価値があれば維持

7. WelcomeModal.tsx の運用上必要性
   - 利用箇所が極小、本当に必要か

8. components/quiz/stream/ 一式 (623行)
   - ストリーミングクイズ機能を将来実装する予定があるか


## 削除推奨候補の主要項目10件 (削除実施は別ディスパッチ)

1. app/tmp/round7-review/ ディレクトリ + 関連 docs/review-round7-saito-nao.md
2. app/test/posthog/ ディレクトリ
3. app/test/sentry/ ディレクトリ
4. app/final-review/ ディレクトリ (v3 へ統一)
5. app/strategy-discussion/ ディレクトリ (v2 へ統一)
6. app/exec-review/, app/feature-review/, app/scoring-test/ の3ディレクトリ
7. components/enterprise/RoiCalculator.tsx (170行、ピボット後の残骸)
8. components/quiz/stream/ 配下4ファイル (623行、未配線)
9. components/HistoryStats.tsx 他10ファイル (合計1,031行、トップレベル参照ゼロ)
10. lib/i18n/ + messages/ + lib/audio/bgm.ts + lib/podcast/episodes.ts (要オーナー判断)


## 重大なブランド棄損情報の有無

判定: 重大なブランド棄損リスクなし。

- IPA著作権・引用範囲は適切に運用
- PII マスキング実装・確認済
- 公開すべきでない情報の露出は軽微 (内部ファイルパス1件、削除推奨で解消)
- localhost / staging / 認証情報のハードコードは検出されず


## 並行ディスパッチとの衝突

ブランチ: audit/site-content-scan
変更内容: logs/ への報告ファイル追加のみ (route-scan-report.md, component-deadcode-report.md, content-quality-report.md, content-duplication-report.md, brand-risk-report.md, site-scan-summary.md)

衝突なし:
- perf/bundle-analysis-and-cleanup (バンドル分析、対象 .next/ ビルド成果物)
- test/e2e-user-journey-expansion (テスト追加、対象 tests/e2e/)
- feat/a11y-screen-reader-hardening (a11y 改善、対象 components/ の修正)

本タスクは読み取り専用 + logs/ への報告追加のみで、上記いずれとも編集対象が重ならない。


## 次ステップ提案

1. 本PR (audit only) をマージ後、オーナー判断項目をレビュー
2. 「即削除推奨」項目を別ディスパッチで個別 PR 化 (route 削除、deadcode 削除、ブランド掃除)
3. 「要オーナー判断」項目を判断後、対応 PR を別途作成
4. 重複コンテンツに関する追加対応は不要 (Phase 4 で重大重複なしと確認)
