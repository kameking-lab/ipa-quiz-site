import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { isExamPublished } from "@/lib/qualifications/catalog";
import { DENKO2_SKILL_PROBLEMS, skillDateLabel } from "@/lib/denko2/skills";

export function generateMetadata(): Metadata {
  return {
    title: "第二種電気工事士 技能試験の公表問題と完成例",
    description: "第二種電気工事士の技能試験。試験日と候補No.を選んで問題図、施工条件、公式の概念図と完成例を確認できます。",
    alternates: { canonical: "/denko2/skill" },
    robots: isExamPublished("denko2") ? undefined : { index: false, follow: false },
  };
}

export default function Denko2SkillIndex() {
  if (!isExamPublished("denko2")) notFound();
  const dates = [...new Set(DENKO2_SKILL_PROBLEMS.map((problem) => problem.date))];
  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <Link className="text-sm text-blue-700 hover:underline" href="/denko2">← 第二種電気工事士へ</Link>
      <h1 className="mt-4 text-3xl font-bold">技能試験の公表問題</h1>
      <p className="mt-2 text-sm text-slate-700">試験日を選び、No.1〜13の問題図・施工条件・公式完成例を確認できます。作品の自動採点ではありません。</p>
      <nav aria-label="試験日を選ぶ" className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {dates.map((date) => {
          const first = DENKO2_SKILL_PROBLEMS.find((problem) => problem.date === date)!;
          return <a key={date} href={`#date-${date}`} className="rounded-xl border border-slate-300 bg-white p-3 font-semibold text-slate-900 hover:border-blue-600 hover:bg-blue-50">{skillDateLabel(first)} <span className="block text-xs font-normal text-slate-600">13問題</span></a>;
        })}
      </nav>
      {dates.map((date) => {
        const problems = DENKO2_SKILL_PROBLEMS.filter((problem) => problem.date === date);
        return (
          <section key={date} id={`date-${date}`} className="mt-10 scroll-mt-6">
            <h2 className="text-xl font-bold">{skillDateLabel(problems[0]!)}</h2>
            <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-5 lg:grid-cols-7">
              {problems.map((problem) => <Link key={problem.id} href={`/denko2/skill/${problem.id}`} className="rounded-xl border border-slate-300 bg-white px-3 py-4 text-center font-semibold hover:border-blue-600 hover:bg-blue-50">No.{problem.number}</Link>)}
            </div>
          </section>
        );
      })}
    </main>
  );
}
