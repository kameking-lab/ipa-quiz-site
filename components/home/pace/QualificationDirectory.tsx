import type { HomeDirectoryDomain, HomeDirectoryItem } from "@/lib/home/home-directory";
import { qualificationGroupMember } from "@/lib/qualifications/groups";
import { ChevronDown, ChevronRight } from "lucide-react";

export function QualificationDirectory({ domains, challengeHref }: {
  domains: readonly HomeDirectoryDomain[];
  challengeHref?: (item: HomeDirectoryItem) => string;
}) {
  return <div className="divide-y divide-hairline border-y border-hairline">{domains.map(domain => (
    <details key={domain.id} id={`domain-${domain.id}`} className="group/domain">
      <summary className="study-row study-focus cursor-pointer list-none font-medium [&::-webkit-details-marker]:hidden">
        <span className="min-w-0">{domain.title}</span>
        <span className="flex shrink-0 items-center gap-1 text-[13px] text-muted-foreground tabular-nums">
          {domain.qualificationCount}資格・区分 <ChevronDown aria-hidden="true" className="size-4 group-open/domain:rotate-180" />
        </span>
      </summary>
      <ul className="divide-y divide-hairline border-l border-hairline pl-3">
        {[...domain.featured, ...domain.compact].map(item => (
          <li key={item.key}>
            <a className="study-row study-focus hover:text-primary" href={challengeHref?.(item) ?? item.href}>
              <span className="min-w-0 wrap-anywhere">{item.name}</span>
              <span className="flex shrink-0 items-center gap-1 text-[13px] text-muted-foreground tabular-nums">{item.questionCount}問 <ChevronRight aria-hidden="true" className="size-4" /></span>
            </a>
            {!challengeHref && item.children && (
              <details className="mb-2 border-l border-hairline pl-3">
                <summary className="study-focus min-h-11 cursor-pointer py-3 text-[13px] text-muted-foreground" aria-label={`${item.name}の区分一覧`}>区分一覧</summary>
                <ul className="divide-y divide-hairline">
                  {item.children.map(child => (
                    <li key={child.key}>
                      <a href={child.href} className="study-link py-2">
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
      <a href={domain.allHref} className="study-link py-2">{domain.allLabel} ›</a>
    </details>
  ))}</div>;
}
