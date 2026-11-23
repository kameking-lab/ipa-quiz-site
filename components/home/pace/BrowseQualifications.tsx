"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { P3Mascot } from "@/components/ui/P3Mascot";
import { StudySearchField } from "@/components/ui/StudySearchField";
import type { HomeDirectoryDomain } from "@/lib/home/home-directory";
import { groupHomeDirectory } from "@/lib/home/grouped-directory";
import { upcomingExamPicks } from "@/lib/home/featured-exams";
import { searchQualifications } from "@/lib/qualifications/search";
import { qualificationGroupMember } from "@/lib/qualifications/groups";
import { QualificationDirectory } from "./QualificationDirectory";
export function BrowseQualifications({ domains, challengeExamCodes, initialQuery = "", illustrated = false }: {
  domains: readonly HomeDirectoryDomain[];
  challengeExamCodes?: readonly string[];
  initialQuery?: string;
  illustrated?: boolean;
}) {
  const [query, setQuery] = useState(initialQuery);
  const groupedDomains = useMemo(() => groupHomeDirectory(domains), [domains]);
  const items = groupedDomains.flatMap(d => [...d.featured, ...d.compact]);
  const term = query.normalize("NFKC").trim();
  const matching = searchQualifications(items, query);
  function qualificationHref(item: (typeof items)[number]) {
    const member = item.children?.[0];
    const slug = member && qualificationGroupMember(member.key)?.group.slug;
    if (challengeExamCodes && slug) return `/challenge?${new URLSearchParams({ group: slug })}`;
    return challengeExamCodes?.includes(item.key)
      ? "/challenge?" + new URLSearchParams({ exam: item.key })
      : item.href;
  }
  const picks = upcomingExamPicks(domains.flatMap(d => [...d.featured, ...d.compact].map(i => i.key)), [], new Date());
  const search = <StudySearchField aria-label="資格名・略称で検索" aria-controls="qualification-matches" value={query} onChange={e => setQuery(e.target.value)} placeholder="資格名・略称で検索" />;
  const directory = <section id="home-directory-title" className="mt-4 scroll-mt-20">
    <h2 className="mb-2 text-base font-bold">分野から探す</h2>
    <QualificationDirectory domains={groupedDomains} challengeHref={challengeExamCodes ? qualificationHref : undefined} tiles={illustrated} />
  </section>;
  return <>
    {illustrated ? <div className="p3-search-hero p3-landscape">
      <div className="p3-search-title">
        <h1 className="text-[34px] leading-tight font-bold">さがす</h1>
        <P3Mascot exam="" />
      </div>
      {search}
    </div> : search}
    <div id="qualification-matches">
    {term ? <>
      <p role="status" className={matching.length ? "sr-only" : "py-4 text-sm text-muted-foreground"}>
        {matching.length ? `検索結果 ${matching.length}件` : "該当する資格が見つかりませんでした。"}
      </p>
      {matching.length > 0 && <ul className="mt-2 divide-y divide-hairline" aria-label="資格の検索結果">
        {matching.map(item => <li key={item.key}>
          <Link href={qualificationHref(item)} className="study-row study-focus hover:text-primary">
            <span className="min-w-0 wrap-anywhere">{item.name}</span>
            <span className="flex shrink-0 items-center gap-1 text-[13px] text-muted-foreground tabular-nums">{item.questionCount}問 <ChevronRight aria-hidden="true" className="size-4" /></span>
          </Link>
        </li>)}
      </ul>}
    </> : <>
      {illustrated && directory}
      <section className="mt-4">
        <h2 className="text-base font-bold">試験が近い資格</h2>
        <ul className={illustrated ? "p3-exam-picks mt-2" : "mt-2 divide-y divide-hairline"}>
          {picks.map(({ key, next }) => {
            const item = items.find(item => item.key === key);
            if (!item) return null;
            return <li key={key}>
              <Link href={qualificationHref(item)} className="study-row study-focus hover:text-primary">
                <span className="min-w-0 wrap-anywhere">{item.name}</span>
                <span className="flex shrink-0 items-center gap-1 text-[13px] text-muted-foreground tabular-nums">
                  {next && <time dateTime={next.date}>{item.children ? "直近 " : ""}{next.date}</time>}
                  <ChevronRight aria-hidden="true" className="size-4" />
                </span>
              </Link>
            </li>;
          })}
        </ul>
      </section>
      {!illustrated && directory}
    </>}
    </div>
  </>;
}
