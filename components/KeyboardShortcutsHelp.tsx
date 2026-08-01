"use client";

import * as React from "react";
import { Keyboard, X } from "lucide-react";
import { FOCUSABLE_SELECTOR, trapTabTarget } from "@/lib/a11y/focus-trap";

const SHORTCUTS = [
  { keys: ["1", "2", "3", "4"], desc: "選択肢 ア・イ・ウ・エ を選択" },
  { keys: ["Enter", "Space", "→"], desc: "次の問題へ進む" },
  { keys: ["R"], desc: "復習マーク（★）を切替" },
  { keys: ["?"], desc: "このヘルプを表示" },
];

export function KeyboardShortcutsHelp() {
  const [open, setOpen] = React.useState(false);
  const dialogRef = React.useRef<HTMLDivElement | null>(null);
  // The element that had focus before opening, so it can be restored on close.
  const lastFocusedRef = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLElement) {
        const tag = e.target.tagName;
        if (tag === "INPUT" || tag === "TEXTAREA") return;
      }
      if (e.key === "?") {
        e.preventDefault();
        setOpen((v) => {
          // Capture the trigger element only when transitioning open.
          if (!v) lastFocusedRef.current = document.activeElement as HTMLElement | null;
          return !v;
        });
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // On open, push focus into the dialog (it is triggered by a global key, so
  // focus is otherwise left on the page behind). On close, restore focus to
  // wherever it was, so keyboard users are not stranded at document.body.
  React.useEffect(() => {
    if (open) {
      const t = window.setTimeout(() => {
        const first = dialogRef.current?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);
        first?.focus({ preventScroll: true });
      }, 0);
      return () => window.clearTimeout(t);
    }
    lastFocusedRef.current?.focus({ preventScroll: true });
  }, [open]);

  // Trap Tab focus inside the dialog (WCAG 2.4.3) — aria-modal alone lets the
  // browser tab into the inert page behind the modal. With a single focusable
  // (the close button) this keeps Tab parked on it instead of escaping.
  const onDialogKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "Tab" || !dialogRef.current) return;
    const focusables = Array.from(
      dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
    ).filter((el) => el.offsetParent !== null || el === document.activeElement);
    const target = trapTabTarget(
      focusables,
      document.activeElement as HTMLElement | null,
      e.shiftKey,
    );
    if (target) {
      e.preventDefault();
      target.focus({ preventScroll: true });
    }
  };

  if (!open) return null;

  return (
    <div
      ref={dialogRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="キーボードショートカット一覧"
      onClick={() => setOpen(false)}
      onKeyDown={onDialogKeyDown}
    >
      <div
        className="w-full max-w-sm rounded-2xl border border-zinc-200 bg-white p-5 shadow-2xl dark:border-zinc-700 dark:bg-zinc-900"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Keyboard className="h-4 w-4 text-zinc-500" />
            <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
              キーボードショートカット
            </span>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="rounded-lg p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
            aria-label="閉じる"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="space-y-2">
          {SHORTCUTS.map(({ keys, desc }) => (
            <div key={desc} className="flex items-center justify-between gap-3">
              <span className="text-sm text-zinc-600 dark:text-zinc-400">{desc}</span>
              <div className="flex flex-shrink-0 gap-1">
                {keys.map((k) => (
                  <kbd
                    key={k}
                    className="rounded border border-zinc-300 bg-zinc-100 px-1.5 py-0.5 text-[11px] font-mono font-semibold text-zinc-700 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
                  >
                    {k}
                  </kbd>
                ))}
              </div>
            </div>
          ))}
        </div>
        <p className="mt-4 text-[11px] text-zinc-400">クイズ画面でのみ有効 / Esc で閉じる</p>
      </div>
    </div>
  );
}
