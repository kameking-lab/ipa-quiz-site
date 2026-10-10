"use client";

import { useEffect, useState } from "react";

import { ArrowRight } from "lucide-react";
import { readLastQuestion } from "@/lib/storage/last-question";
import { createHistoryStore } from "@/lib/storage/history";
import { listExamLearningSummaries } from "@/lib/exam-library-session";
import { readSettings } from "@/lib/storage/settings";
import type { HomeDirectoryDomain } from "@/lib/home/home-directory";

interface Resume {
  exam: string; name: string; href: string; caption: string; total: number; validIds: string[]; reviewHref: string; yearHref: string;
}

export function HomeResume({ domains }: { domains: readonly HomeDirectoryDomain[] }) {
  const [resume, setResume] = useState<(Resume & { wrong: number }) | null>(null);
  useEffect(() => {
    const last = readLastQuestion();
    const safety = listExamLearningSummaries().find((summary) => summary.lastQuestionId && summary.answered > 0);
    const useSafety = safety && (!last || Date.parse(safety.updatedAt) > last.answeredAt);
    if (!last && !useSafety) return;
    const controller = new AbortController();
    const params = useSafety ? new URLSearchParams({ paper: safety.examId, question: safety.lastQuestionId! }) : new URLSearchParams({ exam: last!.exam, year: String(last!.year), season: last!.season, session: last!.session, qNumber: String(last!.qNumber), part: last!.part ?? "" });
    void fetch(`/api/home/resume?${params}`, { signal: controller.signal }).then(async (response) => {
      if (!response.ok) return;
      const data: Resume = await response.json();
      const valid = new Set(data.validIds);
      const wrong = useSafety ? safety.incorrect : readSettings().recordHistory ? createHistoryStore().getWrongIds().filter((id) => valid.has(id)).length : 0;
      if (!controller.signal.aborted) setResume({ ...data, wrong });
    }).catch(() => {});
    return () => controller.abort();
  }, [domains]);
  if (!resume) return <div className="study-resume-empty">受ける資格を選んで、年度・科目から始める。</div>;
  return <section aria-labelledby="resume-title" className="study-resume">
    <p className="study-kicker">前回のページから</p>
    <div className="study-resume-row"><div className="min-w-0"><h2 id="resume-title">{resume.name}</h2><p className="study-caption">{resume.caption} · この回の収録 {resume.total}問</p></div><a href={resume.href} className="study-primary">続きを開く<ArrowRight aria-hidden="true" className="h-4 w-4" /></a></div>
    <nav aria-label={`${resume.name}の学習`} className="study-resume-links">
      {resume.wrong > 0 && <a href={resume.reviewHref}>間違えた {resume.wrong}問を復習</a>}
      <a href={resume.yearHref}>年度・科目を選ぶ</a>
      <a href="#choose-qualification" onClick={(event) => { event.preventDefault(); const search = document.getElementById("qualification-search"); search?.focus(); search?.scrollIntoView({ block: "center", behavior: "instant" }); }}>別の資格を選ぶ</a>
    </nav>
  </section>;
}