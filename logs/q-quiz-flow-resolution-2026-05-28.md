# /q↔/quiz 動線分断の解消 — /q ページに「その場で解く」を実装 (2026-05-28)

対象: フェーズ14 第5致命傷 / 構造的激辛レビュー第3弾 使-1 + 実機レビュー第3弾。
ブランチ: `feat/q-page-inline-answer-ui` / 基点 main HEAD: `80c679d`

## 現状調査結果（修正前）
- `/q/[exam]/[yearSeason]/[section]/[qnum]` は検索流入の主要着地ページ（SSR・recent年は SSG / 旧年は ISR）。問題文・選択肢・解説をサーバーレンダリングしていた。
- ただし選択肢は**静的な `<div>`**（`page.tsx` 旧352-374、`data-answer` 属性のみ）で**インタラクションなし**。
- 解答は別コンポーネント `AnswerReveal`（"正解を表示" ボタン）で「答えを見る」だけ。
- つまり着地ユーザーは「読む」ことしかできず、**実際に解く（選んで採点）には `/quiz?mode=…` へ1遷移が必要**。検索流入の主要面で「読む→解く」が途切れ、離脱＝CV毀損。
- /quiz 側（QuizPlayer.onSelect）は: ChoiceButton + useQuizChoiceRoving で選択 → 正誤判定 → 履歴記録（createHistoryStore, readSettings().recordHistory ゲート）+ writeLastQuestion + recordStudyOnDate + recordReview。

## 修正方針: 案A（/q に最小回答UIを埋め込む・Progressive Enhancement）
- 案B（/quiz への遷移を滑らかに）は分断自体を残す。案C（/q と /quiz 統合）は大改修で SEO資産を壊すリスク大。よって案A。
- 制約遵守: SSRコンテンツ（SEO資産）を壊さない / 静的生成（SSG/ISR）維持 / hydration後に有効化（PE）/ 既存 /quiz 維持 / AI新規呼び出し禁止 / 新規 LocalStorage キー禁止（既存 history 流用）。

## 修正内容
新規 `components/quiz/QuestionAnswerCard.tsx`（"use client"）:
- 既存 `ChoiceButton` + `useQuizChoiceRoving` を**そのまま流用**（/quiz と同一のUX・a11y・ロービングタブインデックス）。
- SSR: ChoiceButton が選択肢テキストを描画 → **初期HTMLに選択肢が入る**（クローラブル / JS無効でも読める）。
- hydration後: 選択肢クリックで正誤を即時表示（正解=緑 / 不正解=赤）、結果バナー（正解！/ 不正解 — 正解は X：本文）、`#explanation` へのアンカー「解説を読む」、`next` があれば「次の問題へ」（次の /q へ＝高速SSR導線を維持）。
- 数字キー1〜4選択（QuizPlayer と同じ、INPUT/TEXTAREA/contentEditable フォーカス時は無視＝AIコパイロット入力等と非干渉）。
- 記録: `createHistoryStore().record({id,selected,correct,at})`（`readSettings().recordHistory` ゲート）+ `writeLastQuestion` + `recordStudyOnDate` + `recordReview`。**新規LSキーなし**。着地ページの解答も /quiz と同等に履歴・継続・ヒートマップ・間隔反復へ反映。
- 純粋リーダー向けに「採点せずに答えだけ見る」も保持（**記録しない**ので統計を汚さない）。

`app/q/.../page.tsx`:
- 旧「選択肢」静的セクション + 「正解」AnswerReveal セクションを `<QuestionAnswerCard ...>` 1つに置換（section aria-label を「選択肢と解答」に）。
- 解説セクションに `id="explanation"` + `scrollMarginTop` を付与（「解説を読む」アンカー先）。
- import を AnswerReveal → QuestionAnswerCard に差し替え。

dead code 削除: `components/seo/AnswerReveal.tsx`（唯一の利用箇所が本変更で消えたため。grep で他参照ゼロを確認）。

## SEO資産の保全（実ビルド成果物で確認）
prerendered `/q/ap/2024-autumn/am/q1.html` を検査:
- `role="radiogroup"` ×1、`role="radio"` ×4（4選択肢が**テキスト付き**で SSR 出力）。
- `"@type":"QAPage"` JSON-LD ×1（構造化データ維持）。
- `id="explanation"` ×1、choice の `aria-label="選択肢 ア: …"` ×4（選択肢本文が初期HTMLに存在）。
→ SSR本文・JSON-LD・静的生成（SSG ●）すべて維持。回答UIは hydration 後の追加機能（PE）。

## テスト追加件数（合計 +10、既存2件を新構造へ更新）
- `__tests__/components/QuestionAnswerCard.test.tsx`（vitest, 7件）: 全選択肢描画 / 正答→正解表示＋history記録 / 誤答→正解キー表示＋correct:false記録 / 「答えだけ見る」→記録なし / reveal後の再選択不可（不可逆）/ 「次の問題へ」リンク / recordHistory=false で記録なし。
  - 注: 当環境では bare `localStorage` と component の `window.localStorage` が別インスタンスのため、beforeEach は `window.localStorage.clear()` + store の `reset()` で隔離。
- `tests/e2e/q-inline-answer.spec.ts`（Playwright, 3件 × 3回 = 9/9 緑・フレーキー無し）: SSR HTML が選択肢+QAPage JSON-LD を保持（no-JS）/ クリックで正誤＋解説露出・遷移なし / role=radio キーボード（Enter）操作。URL は questions sitemap から動的取得（自己メンテ）。
- `tests/e2e/user-journey-quiz.spec.ts`（既存2件を更新）: 旧「選択肢」「正解」aria-label 前提を新「選択肢と解答」構造へ（選択肢キー存在・解答+解説セクション存在を引き続き検証。弱体化ではなく現実への追従）。

## 検証結果
- typecheck 0 / lint 0（警告1は未追跡スクリプト, 対象外）/ vitest 29ファイル**178全緑**（+7）/ build 成功（/q は SSG ● 維持）。
- e2e 回帰subset（q-inline-answer・user-journey-quiz・smoke-routes・canonical・quiz-canonical・home-cta-click・admin-auth・blog-question-count）**35全緑**。

## 副作用範囲・パフォーマンス
- /quiz（QuizPlayer）は不変。ChoiceButton/roving/各記録ヘルパは共有のため /q 追加分のクライアントJSは小（既存 /quiz バンドルと共通チャンク）。
- SSR/ISR 戦略不変 → TTFB 退行なし。LCP 要素（問題文）は依然 SSR、回答カードは後続 hydration → LCP 退行なし。
- 新規 LS キーなし・新規AI呼び出しなし。

## 使いやすさ改善見込み
- 検索着地（/q）でそのまま1問完結（選ぶ→採点→解説→次へ）。/quiz への強制遷移が消え、流入CVの離脱点を除去。
- 解答が /quiz と同等に履歴・継続・ヒートマップ・間隔反復へ反映 → 着地解答が「一級の学習」として継続に寄与。

## 次のステップ
本番反映後、Chrome agent で実機検証推奨: 検索着地（例 /q/ap/2024-autumn/am/q1）→ 選択肢をクリック → 正誤表示 → 「解説を読む」→ 「次の問題へ」。view-source で選択肢本文・QAPage JSON-LD が残っていること（SEO非退行）。
