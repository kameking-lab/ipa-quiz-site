# Phase 2: コンポーネント・lib デッドコード調査報告

調査対象: HEAD 37e85b7
対象: components/ 102ファイル + lib/ 103ファイル
スキャン手法: 各ファイルのbasename(拡張子なし)を grep
パターン: `from.*basename` / `import.*basename` / `require.*basename` / `dynamic.*basename` + 動的 `await import()`
スキャン日: 2026-05-16


## 確実にデッドコード(参照ゼロ)

優先度: High (削除推奨)
件数: 25ファイル / 約2,901行


### components/ トップレベル(11個 = 1,201行)

1. components/ContinueFromHistory.tsx — 116行 — export function ContinueFromHistory()
2. components/DailyMissions.tsx — 114行 — export function DailyMissions()
3. components/ExamSelectorDialog.tsx — 95行 — export function ExamSelectorDialog({ trigger, onClose })
4. components/HeroDemoAnimation.tsx — 113行 — export function HeroDemoAnimation()
5. components/HistoryStats.tsx — 243行 — export function HistoryStats()
6. components/HomeExamPicker.tsx — 189行 — export function HomeExamPicker()
7. components/ReviewReminder.tsx — 41行 — export function ReviewReminder()
8. components/SocialProof.tsx — 109行 — export function SocialProof()
9. components/TestimonialsCarousel.tsx — 88行 — export function TestimonialsCarousel()
10. components/TrustBadge.tsx — 52行 — export function TrustBadge()
11. components/XFollowButton.tsx — 41行 — export function XFollowButton()


### components/ ネスト(8個 = 1,097行)

12. components/character/CharacterGreeting.tsx — 50行
13. components/enterprise/RoiCalculator.tsx — 170行 (PR #100 で削除されたエンタープライズ機能の残骸)
14. components/motivation/BadgeStrip.tsx — 72行
15. components/quiz/BeginnerGuide.tsx — 158行
16. components/quiz/stream/ComboFireworks.tsx — 72行
17. components/quiz/stream/StreamQuizPlayer.tsx — 421行 (最大、ストリーミングクイズ機能未使用)
18. components/quiz/stream/StreamSummary.tsx — 130行
19. components/ui/separator.tsx — 24行 (shadcn UI 利用未着手)


### lib/ ファイル(6個 + 1 = 738行)

20. lib/analytics/server-events.ts — 66行
21. lib/audio/bgm.ts — 259行 (BGM 機能未配線)
22. lib/podcast/episodes.ts — 159行 (ポッドキャスト機能未配線)
23. lib/seo/expected-404.ts — 31行
24. lib/storage/avatar.ts — 64行
25. lib/storage/community.ts — 40行
26. lib/streak/StreakProfileCard.tsx — 120行


## 要オーナー確認

優先度: Medium

1. lib/i18n/dictionaries.ts と lib/i18n/I18nProvider.tsx
   - I18nProvider は app/layout.tsx で配線済み
   - しかし useI18n / useTranslation の利用は app/ 配下ゼロ
   - messages/ja.json (4675バイト)、en.json (4214バイト)、zh.json (4199バイト) の翻訳辞書もすべて未参照
   - 結論: i18n 基盤一式は dead infrastructure。約13KB(辞書) + 200行(プロバイダ) 程度
   - 削除判断はオーナー (将来 i18n 対応予定があるか確認要)

2. components/WelcomeModal.tsx
   - 初期検査で参照ゼロ表示、最終検査で1件参照を確認
   - 利用箇所が極小のため、本当に運用上必要か確認推奨


## 調査範囲外で除外したもの

- lib/ai/providers/* — lib/ai/provider.ts内の動的インポートで利用確認済み
- components/dashboard/tabs/ — 親コンポーネントから利用確認済み


## 件数サマリ

- 確実にデッドコード: 25ファイル / 2,901行
- 要オーナー確認: 2項目(i18n基盤一式、WelcomeModal)
- 大規模削除候補: components/quiz/stream/ 一式(623行、ストリーミング機能未着手)


## 段階別アクション提案(削除実施は別ディスパッチ)

段階1: components/ トップレベル11個削除(1201行)
段階2: components/ ネスト8個削除(1097行)、components/enterprise/ ディレクトリごと削除
段階3: lib/ デッドファイル7個削除(738行)、未使用ディレクトリ削除
段階4: i18n 一式の利用予定確認、必要に応じて削除またはコメント追記
