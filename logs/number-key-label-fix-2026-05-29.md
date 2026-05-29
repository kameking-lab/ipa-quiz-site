# 数字キー1–4選択の嘘表記解消 (2026-05-29)

対象: フェーズ14 第10致命傷 / 実機激辛レビュー第3弾 a11y。選択肢の aria-label が「数字キーN でも選択できます」と謳うのに、一部ルートで実際に数字キーが効かずスクリーンリーダー利用者を欺いていた。
ブランチ: `fix/number-key-selection-accuracy` / 基点 main HEAD: `cbd3bca`

## 現状調査結果（数字キー動作 × aria-label 整合マトリクス）
「数字キー」表記の出所:
- `components/quiz/ChoiceButton.tsx:51`「数字キーN でも選択できます」(未revealed時) ＋ `:71` `aria-keyshortcuts={numberKey}`。ChoiceButton を使う全サーフェスがボタン単位で数字キーを広告。
- 各 radiogroup の aria-label「選択肢（…数字キー1〜4・Enter/スペースで選択）」: QuestionAnswerCard:134 / QuizPlayer:406 / DailyChallengeClient:247。

数字キー(1–4)の実ハンドラ(window keydown で `["1".."4"].indexOf` → onSelect):
- QuizPlayer.tsx:235 ✓
- StreamQuizPlayer.tsx:121 ✓（ただし後述: ChoiceButton 非使用で「数字キー」表記なし＝対象外）
- QuestionAnswerCard.tsx:118 ✓（フェーズ14第5致命傷で実装）
- **DailyChallengeClient: ハンドラ無し ✗**（useQuizChoiceRoving は矢印/Enter のみ、数字キー処理なし）

整合マトリクス（ChoiceButton を使う＝「数字キー」を広告するサーフェス）:
- /quiz（QuizPlayer）: 広告あり・ハンドラ✓ → 正直
- /quiz/review（QuizPlayer）: 広告あり・ハンドラ✓ → 正直
- /q/*（QuestionAnswerCard）: 広告あり・ハンドラ✓ → 正直（第5致命傷で解消）
- **/challenge（DailyChallengeClient）: 広告あり・ハンドラ✗ → 嘘表記（ケースA）**
- /quiz/stream（StreamQuizPlayer）: ChoiceButton 非使用＝「数字キー」広告なし・独自プレーン `<button>`＋独自ハンドラ → 嘘なし・対象外

→ 総合判定はケースC（混在）。/quiz・/q は既に正直、/challenge のみ嘘。レビュー(2026-05-26)時点では /q も AnswerReveal（数字キー広告なし）だったため、嘘表記の核は /challenge。

## 修正方針
推奨どおり「数字キー選択を実装して aria-label を正直に」を採用。/challenge に他サーフェス同等のハンドラを実装し、全 ChoiceButton サーフェスで数字キーが実際に効くよう統一。aria-label の削除はしない（機能として有用、かつ他3面と挙動統一）。

## 修正内容（app/challenge/DailyChallengeClient.tsx）
- hooks 群（早期 return 前）に window keydown ハンドラの useEffect を追加。
  - `revealed || !current` の間は無効。
  - INPUT/TEXTAREA/contentEditable フォーカス時は無視（第5致命傷の流用パターン）。
  - `["1","2","3","4"].indexOf(e.key)` → `CHOICE_KEYS[i]`（shortcutIndex={i+1} の規約に一致）。当該選択肢が描画されている時のみ（`current.choices?.[key]`）`onSelect`。
- 他は不変。ChoiceButton/aria-label/roving はそのまま（表記が真になる）。

## StreamQuizPlayer について（調査で判明・対象外）
StreamQuizPlayer は ChoiceButton ではなくプレーン `<button>`（role=radio なし・aria-keyshortcuts なし・「数字キー」表記なし）で選択肢を描画し、独自の数字キーハンドラ(:121)を持つ。嘘表記は無いため本致命傷の対象外。E2E でも当初含めたが role=radio 不在で除外（コメントで明記）。

## テスト追加件数（合計 +8）
- `__tests__/components/QuestionAnswerCard.test.tsx`（+4, vitest）: 数字キー1→ア選択／2→イ（正解）選択／INPUT フォーカス中は無視／reveal 後は再選択不可。
- `tests/e2e/number-key-selection.spec.ts`（新規 3件 ×3回緑）: /quiz・/q/*・**/challenge** で「最初の選択肢が aria-keyshortcuts='1' を広告し（正直な広告）、`1` 押下で aria-checked='true' になる（実際に効く）」を実証。/quiz/stream は対象外として明記。

## 副作用範囲
- 変更は DailyChallengeClient に keydown useEffect を1つ追加するのみ。他サーフェス・ChoiceButton・roving は不変。
- INPUT/TEXTAREA ガードで /challenge 内の入力（あれば）と非干渉。reveal 後は無効。

## 検証結果
- typecheck 0 / lint 0（警告1は未追跡スクリプト, 対象外）/ vitest 32ファイル**205全緑**（+4）/ build 成功。
- e2e: number-key-selection 3件 ×3回緑（フレーキー無し）。フルe2e 173件中167 passed・5 skipped。1 fail は task1 由来 home-cta-click「最早クリック」の並列負荷 flake（本変更は home 非関与・単体緑・CI retries:1 で吸収）。

## a11y改善見込み（嘘表記の解消）
全 ChoiceButton サーフェス（/quiz・/q・/challenge）で aria-keyshortcuts／「数字キーN でも選択できます」が実動作と一致。スクリーンリーダー利用者・キーボード利用者に対する虚偽表記が解消。

## 申し送り
home-cta-click「最早クリック」E2E の並列 flake（task5〜10で頻発）と copilot-rag flake の安定化を別マイクロタスクで推奨（座標タイミング／RAG コーパス読込タイミングの待機強化）。

## 次のステップ
本番反映後、Chrome agent で実機検証推奨: /quiz・/q/*・/challenge で物理キーボードの 1〜4 を押し、対応選択肢（ア/イ/ウ/エ）が実際に選択されること（aria-label の表記どおり）。
