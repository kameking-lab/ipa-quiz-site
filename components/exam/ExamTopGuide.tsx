import Link from "next/link";
import { EXAM_ENTRIES, type ExamEntryCode } from "@/lib/seo/exam-entry";
import { EXAM_OFFICIAL_LINKS } from "@/lib/seo/exam-resources";

const guideLink = "inline-flex min-h-11 items-center py-2 text-sm text-primary underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

export function ExamTopGuide({ exam }: { exam: ExamEntryCode }) {
  const entry = EXAM_ENTRIES[exam];
  return (
    <>
      <section id="afternoon" aria-labelledby="afternoon-heading" className="mb-6 scroll-mt-20 rounded-2xl border border-border bg-card p-4 sm:p-5">
        <h2 id="afternoon-heading" className="text-base font-bold">{exam === "ap" || exam === "sc" ? "科目B対策" : "科目B-1・科目B-2対策"}（旧{entry.afternoon}）</h2>
        <ul className="mt-2 space-y-1">
          <li><Link href={`/blog/${entry.guide}`} className={guideLink}>{entry.guideLabel} →</Link></li>
          {entry.aiEssay && <li><Link href="/essay" className={guideLink}>オリジナル論述教材でAI添削 →</Link></li>}
          <li><a href={EXAM_OFFICIAL_LINKS[exam].pastQuestions} target="_blank" rel="noopener noreferrer" className={guideLink}>IPA公式の過去問・解答例 →</a></li>
        </ul>
      </section>
    </>
  );
}
