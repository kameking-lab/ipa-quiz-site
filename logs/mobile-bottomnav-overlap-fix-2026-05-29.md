# MobileBottomNav vs 「次の問題へ」CTA 重複の解消 (2026-05-29)

対象: フェーズ14 第9致命傷（第8致命傷の実装中に Claude Code 側で発見）。モバイルで /quiz 解答後、「次の問題へ」CTAバー中央タップがグローバル底タブに吸われる操作不能。
ブランチ: `fix/mobile-bottomnav-learning-routes-hide` / 基点 main HEAD: `c94339e`

## 現状調査結果
- グローバル `components/MobileBottomNav.tsx`: `fixed inset-x-0 bottom-0 z-30 md:hidden`（問題/模試/検索/進捗 + メニュー）。client component（usePathname 可）、ルート別の非表示ロジックは無し。layout 末尾で全ページに描画。
- 衝突する「自前の固定下部バー」を全件 grep（`fixed bottom-0`）した結果、**2箇所のみ**:
  - `components/quiz/QuizPlayer.tsx:469` 「次の問題へ」バー（`fixed inset-x-0 bottom-0 z-30 sm:hidden`）。QuizPlayer を使うルート = /quiz・/quiz/stream（StreamQuizLoader）・/quiz/review（ReviewQuizClient）。
  - `app/q/[exam]/[yearSeason]/[section]/[qnum]/page.tsx:710` モバイル prev/next バー（`fixed inset-x-0 bottom-0 z-30 sm:hidden`）。/q/* 問題ページ。
- いずれも MobileBottomNav と同じ bottom-0・z-30。DOM 後勝ち（MobileBottomNav が layout 末尾で後描画）で底タブが自前バーの中央を覆い、Playwright ヒットテストでも底タブ「検索」が次CTA中央を intercept。
- /challenge・/mock-exam は固定下部バー無し（grep 0件）＝衝突なし。usePathname はクエリ除去後のパスを返す（/quiz?... → /quiz）。

## 修正方針: 案A（学習集中ルートで MobileBottomNav 非表示）
最も明快で /quiz 設計思想（学習集中）に整合。対象は「自前の固定下部バーを持つ」= QuizPlayer ルート（/quiz*）と /q/* に限定（/challenge・/mock-exam は衝突しないので対象外＝ナビを残す）。

## 修正内容
- 新規 `lib/navigation/learning-focus.ts`: `isLearningFocusRoute(pathname)` = `pathname === "/quiz" || startsWith("/quiz/") || startsWith("/q/")`（"/quizzes" 等の類似パスは trailing-slash ガードで非該当）。純関数で単体テスト可。
- `components/MobileBottomNav.tsx`: hooks（usePathname・useState）の後に `if (isLearningFocusRoute(pathname)) return null;` を追加。学習集中ルートで底タブを描画しない。それ以外は従来どおり。
- layout の底タブ用スペーサ（`h-14 md:hidden`）は据え置き（学習集中ルートでもフッター下の56px空白になるのみで、画面外・無害。最小変更を優先）。

## 副作用範囲
- 変更は MobileBottomNav（早期 return）＋ 新規純関数のみ。home/search/mock-exam/account 等の通常ルートでは底タブは従来どおり表示（変更なし）。
- /quiz*・/q/* で底タブ非表示。これらは各々の自前ナビ（QuizPlayer ヘッダーの戻る、/q のパンくず・prev/next・「クイズモードで開く」・フッター）で離脱可能。
- 既存 e2e で /quiz・/q/* に底タブの存在を前提とするアサーションは無し（grep 確認、参照はコメントのみ）。

## テスト追加件数（+9）
- `__tests__/navigation/learning-focus.test.ts`（vitest 5件）: /quiz・/quiz/stream・/quiz/review・/q/* → true、/・/search・/mock-exam・/challenge・/account・/ap → false、/quizzes・/queue（類似）→ false、null/undefined/"" → false。
- `tests/e2e/mobile-bottomnav-learning-routes.spec.ts`（Playwright 4件 ×3回緑・360x740）: /quiz で底タブ非存在 ＋ 解答後の「次の問題へ」中央が trial click 可能（＝底タブに吸われない）／ /q/* で底タブ非存在／ ホームで底タブ表示／ /search・/mock-exam で底タブ表示。

## 検証結果
- typecheck 0 / lint 0（警告1は未追跡スクリプト, 対象外）/ vitest 32ファイル**201全緑**（+5）/ build 成功。
- e2e: mobile-bottomnav-learning-routes 4件 ×3回緑（フレーキー無し）。フルe2e 170件中164 passed・5 skipped。1 fail は task1 由来 home-cta-click「最早クリック」の並列負荷 flake（単体6/6緑・本変更は home ページ不変＝非関与・CI retries:1 で吸収）。

## UX改善見込み（モバイル操作不能の解消）
モバイルの /quiz・/q/* で底タブが消え、自前の「次の問題へ」CTA／prev-next バー中央タップが底タブに吸われなくなる。第8致命傷（バッジトースト上部化）と合わせ、解答後の最重要動線「次の問題へ」が確実にタップ可能に。E2E の trial click で実証済み。

## 申し送り
- task1 由来 home-cta-click「最早クリック」E2E がフルスイート並列負荷下で頻発 flake（task5/6/7/8/9）。座標タイミング依存。別マイクロタスクで待機条件強化（CTA 静定後に座標取得）を推奨。
- copilot-rag E2E も RAG コーパス読込のタイミングで並列 flake（既知、vitest 設定にも明記）。

## 次のステップ
本番反映後、Chrome agent でモバイル 360x740 実機検証推奨: /quiz 解答 → 底タブが無く「次の問題へ」中央タップで次問へ遷移／ /q/* も底タブ無し／ ホーム・検索では底タブ表示。
