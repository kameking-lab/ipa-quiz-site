import type { HomeDirectoryDomain, HomeDirectoryItem } from "@/lib/home/home-directory";
import { qualificationGroupMember } from "@/lib/qualifications/groups";

export function QualificationDirectory({ domains, challengeHref }: {
  domains: readonly HomeDirectoryDomain[];
  challengeHref?: (item: HomeDirectoryItem) => string;
}) {
  return <div className="space-y-2">{domains.map(domain => (
    <details key={domain.id} id={`domain-${domain.id}`} className="rounded-2xl border border-border px-4">
      <summary className="cursor-pointer py-4 text-sm font-medium">
        {domain.title}<span className="ml-3 text-xs text-muted-foreground">{domain.qualificationCount}資格・区分</span>
      </summary>
      <ul className="divide-y divide-border">
        {[...domain.featured, ...domain.compact].map(item => (
          <li key={item.key}>
            <a className="flex min-h-12 items-center justify-between gap-3 py-3 text-sm" href={challengeHref?.(item) ?? item.href}>
              {item.name}<span className="shrink-0 text-xs text-muted-foreground">{item.questionCount}問 ›</span>
            </a>
            {!challengeHref && item.children && (
              <details className="mb-2 border-l border-border pl-3">
                <summary className="min-h-11 cursor-pointer py-3 text-xs text-muted-foreground" aria-label={`${item.name}の区分一覧`}>区分一覧</summary>
                <ul className="divide-y divide-border">
                  {item.children.map(child => (
                    <li key={child.key}>
                      <a href={child.href} className="flex min-h-11 items-center py-2 text-sm underline underline-offset-4">
                        {qualificationGroupMember(child.key)?.label ?? child.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </details>
            )}
          </li>
        ))}
      </ul>
      <a href={domain.allHref} className="block py-4 text-sm underline">{domain.allLabel} ›</a>
    </details>
  ))}</div>;
}
