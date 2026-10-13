import { CHOICE_SHORTCUTS } from "@/lib/questions/answers";

/** A choice beyond the tenth has no single-key shortcut. */
export function choiceShortcutIndex(key: string, choiceCount: number): number {
  const index = CHOICE_SHORTCUTS.indexOf(key);
  return index >= 0 && index < choiceCount ? index : -1;
}

export function choiceShortcutLabel(choiceCount: number): string {
  if (choiceCount <= 0) return "";
  if (choiceCount <= 9) return `1〜${choiceCount}`;
  if (choiceCount === 10) return "1〜9・0";
  return "1〜9・0（先頭10肢）";
}

/** Keep typing, native controls, dialogs and browser shortcuts in charge. */
export function shouldIgnoreQuizShortcut(event: KeyboardEvent, allowChoiceTarget = false): boolean {
  if (event.metaKey || event.ctrlKey || event.altKey) return true;
  if (document.querySelector('[role="dialog"][aria-modal="true"]')) return true;
  const target = event.target;
  if (!(target instanceof HTMLElement)) return false;
  if (target.closest('input, textarea, select, [contenteditable], [role="dialog"]')) return true;
  if (target.closest("button, a, summary")) {
    return !(allowChoiceTarget && target.closest('[role="radio"], [role="checkbox"], [data-quiz-choice]'));
  }
  return false;
}

export type ShortcutHelpRow = { keys: string; description: string };

export function shortcutHelpRows(mode: "main" | "stream" | "detail", choiceCount?: number): ShortcutHelpRow[] {
  const choices = choiceCount === undefined ? "1〜9・0（先頭10肢）" : choiceShortcutLabel(choiceCount);
  const rows: ShortcutHelpRow[] = choices
    ? [{ keys: choices, description: "選択肢を選ぶ（選択式のみ）" }]
    : [];
  if (mode === "detail") {
    if (choices) {
      rows.push({ keys: "矢印キー", description: "選択肢間でフォーカスを移動" });
      rows.push({ keys: "Enter / Space", description: "フォーカスした選択肢を選ぶ" });
    }
  } else {
    rows.push({ keys: mode === "main" ? "Enter / Space / →" : "Enter", description: "次の問題へ（解答後）" });
  }
  if (mode === "main") {
    rows.push({ keys: "R", description: "苦手復習の登録を切替" });
    rows.push({ keys: "?", description: "このヘルプを表示 / 非表示" });
  } else {
    rows.push({ keys: "?", description: "このヘルプを表示 / 非表示" });
  }
  rows.push({ keys: "Esc", description: "開いているヘルプを閉じる" });
  return rows;
}
