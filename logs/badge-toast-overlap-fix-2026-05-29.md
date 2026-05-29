# バッジトースト被りの解消 (2026-05-29)

対象: フェーズ14 第8致命傷 / 実機激辛レビュー第3弾 UX。解答後のバッジトーストが「次の問題へ」CTA・アクションアイコン群（AIに聞く/星/ブックマーク/共有）に被って操作不能。
ブランチ: `fix/badge-toast-no-overlap` / 基点 main HEAD: `6f92c1f`

## 現状調査結果
- バッジトースト = `components/motivation/AchievementToast.tsx`。`QuizPlayer` のみで使用（解答時に achievements を判定し `pendingAchievement` → トースト描画。最初の1問で `study-first`「はじめの一歩」が解放されトースト表示）。
- 修正前の配置: `fixed inset-x-4 bottom-4 z-[70] mx-auto max-w-sm` = **画面下部中央**。
- 被りの構造: QuizPlayer のモバイル「次の問題へ」CTA は `fixed inset-x-0 bottom-0 z-30 sm:hidden`、解説のアクションアイコンは ExplanationCard 内。トースト（bottom-4・z-70）が**下部中央を覆い**、z-70 > z-30 のため CTA・アイコンを隠して操作を遮断していた（CLS 的にも悪い）。
- 自動消滅は 6 秒（ホバー停止なし）。手動 × は有り。

## 修正方針: 案C（画面隅・自動消滅・CTAを覆わない）
下部はモバイル CTA バー・デスクトップ floating copilot・各種底部ウィジェットが密集するため、**上部（ヘッダー直下）に固定**して下部の操作要素を一切覆わない方式を採用。フィードバック機能・視認性は維持。

## 修正内容（AchievementToast.tsx）
- 配置を `fixed inset-x-4 top-[4.5rem] z-[70] mx-auto max-w-sm` に変更（sticky ヘッダー約52pxの直下、上部中央）。これでモバイル下部 CTA バー・アクションアイコン・floating copilot のいずれにも被らない。
- 自動消滅を 5 秒（4–5秒指定内）に。**ホバー/フォーカス中は停止**（`onMouseEnter/Leave`・`onFocus/Blur` で `paused` 切替、解除時にタイマー再開）。手動 × は維持。
- スライドイン演出: `slide-down`（translateY(-8px)→0）アニメ（既存 keyframe 再利用、AnswerReveal と同じ inline-style パターン）。
- `data-testid="achievement-toast"` を付与（テスト用）。視覚デザイン・文言は不変。

## テスト追加件数（+9）
- `__tests__/components/AchievementToast.test.tsx`（vitest 6件・fake timers）: バッジ名/ティア表示・**top 配置で bottom 非含有**・5秒自動消滅・ホバーで停止/離脱で再開・×即閉じ・未知 id で null。
- `tests/e2e/badge-toast-overlap.spec.ts`（Playwright 3件 ×3回緑・375x667）: 解答→トーストが上部（y<200 かつ上半分内）に固定・トーストが「次の問題へ」CTA バーの上端より上（被りなし）・引用されたアクションアイコン（復習/星, ExplanationCard 内）が trial click 可能（トーストが覆っていない）。

## 副作用範囲
- 変更は AchievementToast のみ（配置/タイマー/演出）。QuizPlayer・achievements ロジック・他コンポーネントは不変。視覚デザイン・文言不変。z-[70] 維持。
- トーストは QuizPlayer 専用のため影響範囲は /quiz のみ。

## 検証結果
- typecheck 0 / lint 0（警告1は未追跡スクリプト, 対象外）/ vitest 31ファイル**196全緑**（+6）/ build 成功。
- e2e: badge-toast-overlap 3件 ×3回緑（フレーキー無し）。フルe2e 166件中160 passed・5 skipped。1 fail は **並列負荷下の既存 flake**（本ラウンドは user-journey-copilot-rag、単体10/10緑。RAG コーパス読込のタイミング依存で vitest 設定にも既知と明記。本変更は /api/copilot 非関与）。CI は retries:1 で吸収。

## UX改善見込み（操作不能の解消）
バッジトーストが上部固定になり、解答後の「次の問題へ」・AIに聞く・星・ブックマーク・共有を一切覆わなくなる。フィードバック（バッジ獲得）は上部で視認でき、5秒で自動消滅（ホバーで停止）。操作遮断を解消。

## 重要: 本タスクで新たに発見した別致命傷（次サイクル提案）
E2E 実装中、**グローバル `MobileBottomNav`（`fixed inset-x-0 bottom-0 z-30 md:hidden`、問題/模試/検索/進捗タブ）が QuizPlayer のモバイル「次の問題へ」CTA バー（`fixed bottom-0 z-30 sm:hidden`）と重なっている**ことを Playwright のヒットテストで検出（次CTA中央を MobileBottomNav の「検索」タブが intercept）。
- これはバッジトーストとは**別の、既存のレイアウト重複**。/quiz でグローバル底タブが消えず、両者が bottom-0 に同居し、DOM 後勝ちで底タブが次CTAの下半分を覆う。
- 影響: バッジトーストを直しても、モバイルの「次の問題へ」中央タップが底タブに吸われる操作性問題が残る（＝レビューの「操作不能」のもう一つの原因の可能性）。
- 本タスク（バッジトースト）の範囲外のため未修正。**次の致命傷候補として強く推奨**: /quiz では MobileBottomNav を隠す、または次CTAバーを底タブの上へ（z + bottom オフセット）。
- 既存の home-cta-click「最早クリック」E2E のフルスイート並列 flake（task5/6/7）も別途安定化推奨。

## 次のステップ
本番反映後、Chrome agent で実機検証推奨: モバイルで /quiz 解答→バッジトーストが上部に出て下部 CTA/アイコンを覆わない・5秒で消える・ホバーで止まる。あわせて上記 MobileBottomNav 重複の実機確認を推奨。
