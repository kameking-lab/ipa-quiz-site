import * as React from "react";
import Link from "next/link";
import { JsonLd } from "./JsonLd";
import { SITE_BASE_URL } from "@/lib/seo/config";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  /** Visible label. */
  name: string;
  /** Path relative to site root (e.g. "/blog") or an absolute URL. */
  href: string;
}

/**
 * Shared breadcrumb trail. Emits the visual nav (matching the inline pattern
 * already used on /q/*, /blog/[slug], etc.) plus a BreadcrumbList JSON-LD so
 * every page exposes the same structured-data signal. Pass the full trail
 * including ホーム as the first item and the current page as the last
 * (the last item renders as plain text, not a link).
 */
export function Breadcrumbs({
  items,
  className,
}: {
  items: BreadcrumbItem[];
  className?: string;
}) {
  if (items.length === 0) return null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.href.startsWith("http") ? it.href : `${SITE_BASE_URL}${it.href}`,
    })),
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <nav
        aria-label="パンくずリスト"
        className={cn("mb-4 text-xs text-zinc-500 dark:text-zinc-400", className)}
      >
        <ol className="flex flex-wrap items-center gap-1.5">
          {items.map((it, i) => {
            const isLast = i === items.length - 1;
            return (
              <React.Fragment key={it.href}>
                {i > 0 && <li aria-hidden="true">/</li>}
                <li>
                  {isLast ? (
                    <span
                      aria-current="page"
                      className="line-clamp-1 text-zinc-700 dark:text-zinc-300"
                    >
                      {it.name}
                    </span>
                  ) : (
                    <Link href={it.href} className="hover:underline">
                      {it.name}
                    </Link>
                  )}
                </li>
              </React.Fragment>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
