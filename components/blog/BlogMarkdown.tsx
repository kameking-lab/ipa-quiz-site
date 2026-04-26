"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";

export function BlogMarkdown({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-none text-[15px] leading-relaxed text-zinc-800 dark:text-zinc-100",
        className,
      )}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ ...p }) => (
            <h1
              className="mt-8 mb-4 text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl"
              {...p}
            />
          ),
          h2: ({ ...p }) => (
            <h2
              className="mt-10 mb-3 border-l-4 border-sky-500 pl-3 text-xl font-bold text-zinc-900 dark:text-zinc-50 sm:text-2xl"
              {...p}
            />
          ),
          h3: ({ ...p }) => (
            <h3
              className="mt-6 mb-2 text-lg font-semibold text-zinc-900 dark:text-zinc-50"
              {...p}
            />
          ),
          h4: ({ ...p }) => (
            <h4
              className="mt-4 mb-1.5 text-base font-semibold text-zinc-900 dark:text-zinc-50"
              {...p}
            />
          ),
          p: ({ ...p }) => <p className="my-3 leading-7" {...p} />,
          ul: ({ ...p }) => (
            <ul className="my-3 list-disc space-y-1 pl-6 marker:text-zinc-400" {...p} />
          ),
          ol: ({ ...p }) => (
            <ol className="my-3 list-decimal space-y-1 pl-6 marker:text-zinc-500" {...p} />
          ),
          li: ({ ...p }) => <li className="leading-7" {...p} />,
          strong: ({ ...p }) => (
            <strong className="font-semibold text-zinc-900 dark:text-zinc-50" {...p} />
          ),
          em: ({ ...p }) => <em className="italic" {...p} />,
          a: ({ href, ...p }) => {
            const isInternal = href?.startsWith("/");
            return (
              <a
                href={href}
                className="text-sky-700 underline underline-offset-2 hover:text-sky-900 dark:text-sky-300 dark:hover:text-sky-200"
                {...(isInternal
                  ? {}
                  : { target: "_blank", rel: "noopener noreferrer" })}
                {...p}
              />
            );
          },
          code: ({ className: c, children, ...p }) => {
            const inline = !c;
            return inline ? (
              <code
                className="rounded bg-zinc-200/70 px-1.5 py-0.5 font-mono text-[13px] dark:bg-zinc-800"
                {...p}
              >
                {children}
              </code>
            ) : (
              <code className={cn("font-mono text-[13px]", c)} {...p}>
                {children}
              </code>
            );
          },
          pre: ({ ...p }) => (
            <pre
              className="my-4 overflow-x-auto rounded-xl bg-zinc-900 p-4 text-[13px] text-zinc-100"
              {...p}
            />
          ),
          blockquote: ({ ...p }) => (
            <blockquote
              className="my-4 rounded-r-md border-l-4 border-sky-300 bg-sky-50/60 py-2 pl-4 italic text-zinc-700 dark:border-sky-700 dark:bg-sky-950/30 dark:text-zinc-300"
              {...p}
            />
          ),
          table: ({ ...p }) => (
            <div className="my-4 overflow-x-auto">
              <table className="min-w-full border-collapse text-left text-sm" {...p} />
            </div>
          ),
          th: ({ ...p }) => (
            <th
              className="border border-zinc-300 bg-zinc-100 px-3 py-2 font-semibold dark:border-zinc-700 dark:bg-zinc-800"
              {...p}
            />
          ),
          td: ({ ...p }) => (
            <td
              className="border border-zinc-200 px-3 py-2 dark:border-zinc-800"
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
