import { AlertTriangle } from "lucide-react";

import { cn } from "@/lib/utils";

interface AiContentNoticeProps {
  /** Short, prominent warning headline. */
  headline?: string;
  /** Explanatory body text. */
  body: string;
  className?: string;
}

/**
 * Prominent "this content is AI-generated / fictional" disclosure.
 *
 * Phase 10 (review 致命傷③): /success-stories and /essays present AI-generated
 * fictional personas/answers. The previous disclosure was a small grey/amber
 * footnote that was easy to miss, creating a real misperception risk. This
 * banner uses a red warning treatment and a title-adjacent headline size so the
 * "fictional" status is unmissable. Place it directly under the page <h1>.
 */
export function AiContentNotice({
  headline = "⚠️ AI生成の参考コンテンツ（架空）",
  body,
  className,
}: AiContentNoticeProps) {
  return (
    <div
      role="note"
      aria-label="AI生成コンテンツに関する重要な注意"
      className={cn(
        "flex items-start gap-3 rounded-2xl border-2 border-red-400 bg-red-50 p-4 text-red-900 dark:border-red-700/70 dark:bg-red-950/40 dark:text-red-100",
        className,
      )}
    >
      <AlertTriangle className="mt-0.5 h-6 w-6 shrink-0 text-red-600 dark:text-red-300" />
      <div className="space-y-1">
        <p className="text-base font-bold leading-snug text-red-700 dark:text-red-300 sm:text-lg">
          {headline}
        </p>
        <p className="text-sm leading-relaxed">{body}</p>
      </div>
    </div>
  );
}
