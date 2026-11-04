import Link from "next/link";
import { EXAM_ENTRIES, type ExamEntryCode } from "@/lib/seo/exam-entry";
import { EXAM_OFFICIAL_LINKS } from "@/lib/seo/exam-resources";

const guideLink = "inline-flex min-h-11 items-center py-2 text-sm text-primary underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

export function ExamTopGuide({ exam }: { exam: ExamEntryCode }) {
  const entry = EXAM_ENTRIES[exam];
  return (
    <>
      <section id="afternoon" aria-labelledby="afternoon-heading" className="mb-6 scroll-mt-20 rounded-2xl border border-border bg-card p-4 sm:p-5">
        <h2 id="afternoon-heading" className="text-base font-bold">午後対策：{entry.afternoon}</h2>
        <p className="mt-2 text-sm font-semibold">{entry.aiEssay ? "午後IのAI採点は未対応。午後IIの論述はオリジナル教材でAI添削に対応しています。" : "午後記述のAI採点は未対応です。"}</p>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{entry.practice} 公式の過去問・解答例はIPAの公開資料で確認できます。</p>
        {entry.aiEssay && <p className="mt-2 text-xs leading-relaxed text-muted-foreground">AI添削の掲載問題・解答骨子・評価観点は編集者作成のオリジナル教材です。公式過去問の採点ではなく、学習用の参考評価です。</p>}
        <ul className="mt-2 space-y-1">
          <li><Link href={`/blog/${entry.guide}`} className={guideLink}>{entry.guideLabel} →</Link></li>
          {entry.aiEssay && <li><Link href="/essay" className={guideLink}>オリジナル論述教材でAI添削 →</Link></li>}
          <li><a href={EXAM_OFFICIAL_LINKS[exam].pastQuestions} target="_blank" rel="noopener noreferrer" className={guideLink}>IPA公式の過去問・解答例（外部サイト） →</a></li>
        </ul>
      </section>
      <section id="study-guide" aria-labelledby="study-guide-heading" className="mb-8 scroll-mt-20 rounded-2xl border border-border bg-card p-4 sm:p-5">
        <h2 id="study-guide-heading" className="text-base font-bold">迷ったときの学習の進め方</h2>
        <ol className="mt-3 list-decimal space-y-3 pl-5 text-sm leading-relaxed">
          <li><strong>まず10問で今の理解を確認。</strong>正誤だけでなく、解説で選択肢の理由を確認します。</li>
          <li><strong>苦手分野を一つずつ。</strong>{entry.focus}を意識し、<a href="#topics" className={guideLink}>分野別の過去問へ</a>進みます。</li>
          <li><strong>年度別で力試し、午後は書いて確認。</strong><a href="#years" className={guideLink}>年度別の過去問</a>を解き、<a href="#afternoon" className={guideLink}>午後対策ガイド</a>で記述の進め方を確認します。</li>
        </ol>
        <Link href={`/quiz?mode=review&exam=${exam}&scope=exam`} className={guideLink}>この端末で間違えた問題・ブックマークを復習 →</Link>
        <p className="text-xs text-muted-foreground">復習には、このブラウザーに保存された回答履歴・ブックマークを使います。</p>
      </section>
    </>
  );
}
