# 激辛レビュー第2巡 — Loop 3

実施日: 2026-04-26
レビュアー: 齋藤ナオ厳格モード
対象: origin/main b255514（Loop 2-2 修正後）
重点: UX フロー / アクセシビリティ / コンテンツ正確性

## サマリ

| 区分 | 件数 |
|------|------|
| Critical | 1（即修正） |
| Minor | 1（即修正） |
| Major | 6（保留） |

## 観点別所見

### 観点1: クイズプレイヤー UX
- キーボード操作 1-4 / Enter / R / S は動作確認済
- Critical 0 / Minor 0（ChoiceButton role="radio" は議論あるが button で機能上問題なし）

### 観点2: AI コパイロット UX
- Mobile bottom sheet に `role="dialog"` `aria-modal="true"` がない → **Critical C3-1（即修正）**
- Escape キーで閉じる挙動なし → **Critical C3-1（同時修正）**
- ストリーミング状態の `aria-live` は polite で実装済
- Critical 1 / Minor 0

### 観点3: モード切替 UX
- 戻るボタン / URL 同期は機能、二重 navigation なし
- Critical 0 / Minor 0

### 観点4: 学習履歴
- localStorage migration なし → **Major M2-9**
- クラウド同期の競合解決は server-wins（許容範囲）
- 削除フローの確認ダイアログあり

### 観点5: Streak
- JST 0:00 境界処理は `lib/streak/core.ts` 実装済
- grace period なし → **Major M2-10**

### 観点6: コンテンツ正確性
- 「12,162問」(layout.tsx) vs 「12,000問超」(faq/page.tsx) → **Minor N3-1（即修正）**
- 980円/500回プレミアムは `/pricing` で「近日公開予定」と明示、FAQ 文言も「予定」表記、矛盾なし
- Critical 0（agent C-2 は誤検出） / Minor 1

### 観点7: i18n / 文言
- 半角/全角混在は許容（読みやすさ優先）
- Critical 0 / Minor 0

### 観点8: アクセシビリティ
- Mobile sheet a11y は C3-1 で修正
- ChoiceButton aria-pressed/role は要検討 → **Major M2-11**
- aria-live region 全体 re-render → **Major M2-12**
- Critical 0 / Minor 0

### 観点9: PWA
- manifest webmanifest 存在
- Service Worker offline 戦略未実装 → **Major M2-13**
- Critical 0 / Minor 0

### 観点10: OG/Twitter Card
- generateImageMetadata で動的 OG 確認、locale統一
- Critical 0 / Minor 0

## 即修正

| ID | 内容 | ファイル |
|----|------|----------|
| C3-1 | CopilotMobileSheet に `role="dialog"` / `aria-modal="true"` / Escape キーハンドラを追加 | `components/copilot/CopilotPanel.tsx` |
| N3-1 | ルート metadata の問題数を「12,162問」→「12,000問超」に統一（ FAQ / page.tsx と一致） | `app/layout.tsx` |

## Major（保留）— logs/major-issues-2.md に追記

- M2-9: localStorage version migration
- M2-10: Streak grace period
- M2-11: ChoiceButton role="radio" / aria-pressed
- M2-12: aria-live region re-render 抑制（aria-atomic）
- M2-13: PWA Service Worker offline 戦略

## 品質保証

- ✅ `pnpm typecheck` 成功
- ✅ `pnpm build` 成功
- NPS 予測: +28 → +29（モバイル a11y 改善で +1）

## 1巡目との比較
- Loop 1 で UX/法務、Loop 2 で API/auth/billing、Loop 3 で UX 深掘り
- a11y 観点は1巡目で軽視されており、新規 Critical を1件捕捉
