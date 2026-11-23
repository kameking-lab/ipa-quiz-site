import { NextRequest, NextResponse } from "next/server";
import { ALL_QUESTIONS } from "@/data/questions";
import { canonicalExamCode } from "@/lib/questions/exam-aliases";
import type { ExamCode } from "@/lib/questions/types";
import { getQuestionsByExamStrict } from "@/lib/seo/exam-meta";
import { legacyExamPath } from "@/lib/seo/legacy-exam-path";
import { getQuestionCanonicalRepresentative } from "@/lib/seo/question-canonical";
import { questionNumberSegment, questionPagePath } from "@/lib/seo/question-url";
import { questionSourceEdition } from "@/lib/questions/source-label";

export function GET(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  return params.then(({ path }) => {
    const parsed = legacyExamPath("/" + path.map(encodeURIComponent).join("/"));
    if (!parsed) return new NextResponse(null, { status: 404 });
    const exam = canonicalExamCode(parsed.exam as ExamCode);
    const pool = getQuestionsByExamStrict(exam);
    if (!pool.length) return new NextResponse(null, { status: 404 });
    const matches = pool.filter(q => {
      if (parsed.round !== null) {
        const numberedSeasons = parsed.year === null ? [] : ["round" + parsed.round, ["first", "second", "third"][parsed.round - 1]];
        if (!numberedSeasons.includes(q.season) && !questionSourceEdition(q).includes("第" + parsed.round + "回")) return false;
      }
      if (parsed.year !== null && q.year !== parsed.year && q.fiscalYear !== parsed.year) return false;
      if (parsed.seasons && !parsed.seasons.includes(q.season)) return false;
      return !parsed.qnum || (!!parsed.sections?.includes(q.session.toLowerCase()) &&
        questionNumberSegment(q.qNumber, q.part) === parsed.qnum);
    });
    const destinations = new Set(matches.map(q => parsed.qnum
      ? questionPagePath(getQuestionCanonicalRepresentative(ALL_QUESTIONS, q))
      : "/" + exam + "/" + q.year + "-" + q.season));
    if (!destinations.size) return new NextResponse(null, { status: 410 });
    if (destinations.size !== 1) return new NextResponse(null, { status: 404 });
    const url = new URL([...destinations][0], request.url);
    url.search = request.nextUrl.search;
    return NextResponse.redirect(url, 308);
  });
}
