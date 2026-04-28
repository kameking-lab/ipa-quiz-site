"use client";

import * as React from "react";
import { Globe, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n/I18nProvider";
import { LOCALE_LABELS, SUPPORTED_LOCALES, type Locale } from "@/lib/i18n/dictionaries";

interface Props {
  className?: string;
  variant?: "inline" | "compact";
}

export function LanguageSwitcher({ className, variant = "compact" }: Props) {
  const { locale, setLocale } = useI18n();
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const select = (l: Locale) => {
    setLocale(l);
    setOpen(false);
  };

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`言語を選ぶ（現在: ${LOCALE_LABELS[locale]}）`}
        className={cn(
          "inline-flex items-center gap-1 rounded-md border px-2 py-1.5 text-xs font-medium transition",
          "border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800",
        )}
      >
        <Globe className="h-3.5 w-3.5" aria-hidden="true" />
        {variant === "inline" ? (
          <span>{LOCALE_LABELS[locale]}</span>
        ) : (
          <span className="font-mono uppercase">{locale}</span>
        )}
      </button>
      {open && (
        <ul
          role="listbox"
          aria-label="言語を選ぶ"
          className="absolute right-0 top-full z-50 mt-1 w-40 overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-lg dark:border-zinc-700 dark:bg-zinc-900"
        >
          {SUPPORTED_LOCALES.map((l) => (
            <li key={l}>
              <button
                type="button"
                role="option"
                aria-selected={l === locale}
                onClick={() => select(l)}
                className={cn(
                  "flex w-full items-center justify-between px-3 py-2 text-sm transition",
                  l === locale
                    ? "bg-sky-50 text-sky-800 dark:bg-sky-950/40 dark:text-sky-200"
                    : "text-zinc-700 hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-zinc-800",
                )}
              >
                <span>{LOCALE_LABELS[l]}</span>
                {l === locale && <Check className="h-3.5 w-3.5" aria-hidden="true" />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
