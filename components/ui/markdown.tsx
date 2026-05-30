"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";

export function Markdown({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "markdown-body text-sm leading-relaxed text-zinc-800 dark:text-zinc-100",
        className,
      )}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ ...p }) => <h3 className="mt-3 mb-2 text-base font-semibold" {...p} />,
          h2: ({ ...p }) => <h3 className="mt-3 mb-2 text-base font-semibold" {...p} />,
          h3: ({ ...p }) => <h4 className="mt-3 mb-1.5 text-sm font-semibold" {...p} />,
          p: ({ ...p }) => <p className="my-2 leading-relaxed" {...p} />,
          ul: ({ ...p }) => (
            <ul className="my-2 list-disc space-y-1 pl-5" {...p} />
          ),
          ol: ({ ...p }) => (
            <ol className="my-2 list-decimal space-y-1 pl-5" {...p} />
          ),
          li: ({ ...p }) => <li className="leading-relaxed" {...p} />,
          strong: ({ ...p }) => (
            <strong className="font-semibold text-zinc-900 dark:text-zinc-50" {...p} />
          ),
          em: ({ ...p }) => <em className="italic" {...p} />,
          code: ({ className: c, children, ...p }) => {
            const inline = !c;
            return inline ? (
              <code
                className="rounded bg-zinc-200/70 px-1.5 py-0.5 font-mono text-xs dark:bg-zinc-800"
                {...p}
              >
                {children}
              </code>
            ) : (
              <code className={cn("font-mono text-xs", c)} {...p}>
                {children}
              </code>
            );
          },
          pre: ({ ...p }) => (
            <pre
              className="my-3 overflow-x-auto rounded-xl bg-zinc-900 p-3 text-xs text-zinc-100"
              {...p}
            />
          ),
          table: ({ ...p }) => (
            <div className="my-3 overflow-x-auto">
              <table
                className="min-w-full border-collapse text-left text-xs"
                {...p}
              />
            </div>
          ),
          th: ({ ...p }) => (
            <th
              scope="col"
              className="border border-zinc-300 bg-zinc-100 px-2 py-1 font-semibold dark:border-zinc-700 dark:bg-zinc-800"
              {...p}
            />
          ),
          td: ({ ...p }) => (
            <td className="border border-zinc-200 px-2 py-1 dark:border-zinc-800" {...p} />
          ),
          blockquote: ({ ...p }) => (
            <blockquote
              className="my-2 border-l-4 border-zinc-300 pl-3 italic text-zinc-600 dark:border-zinc-700 dark:text-zinc-400"
              {...p}
            />
          ),
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
