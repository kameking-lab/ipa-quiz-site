import Link from "next/link";
import { EXAM_ENTRIES, type ExamEntryCode } from "@/lib/seo/exam-entry";
import { EXAM_OFFICIAL_LINKS } from "@/lib/seo/exam-resources";
import { ScAfternoonTopicIndex } from "@/components/exam/ScAfternoonTopicIndex";

const guideLink = "inline-flex min-h-11 items-center py-2 text-sm text-primary underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

export const ADDITIONAL_PAST_QUESTION_GUIDES = {
  sc: [
    { slug: "sc-ronbun-taisaku", label: "午後の記述対策：根拠を拾い、解答を短くまとめる" },
    { slug: "sc-hinnshutsu-ronten-toppu10", label: "専門知識を復習する：公式公開問題の解法と選択肢比較" },
  ],
  nw: [
    { slug: "nw-hinshutu-pattern", label: "午後の論点を選ぶ：頻出パターンを整理する" },
    { slug: "nw-protocol-deep-understanding", label: "通信の動きを復習する：再送・経路・冗長化" },
    { slug: "nw-hinnshutsu-ronten-toppu10", label: "専門知識を復習する：公式公開問題の解法と選択肢比較" },
  ],
  sa: [{ slug: "sa-hinnshutsu-ronten-toppu10", label: "専門知識を復習する：DFDと開放・閉鎖原則の解法" }],
  ap: [],
  st: [],
} as const;

export function ExamTopGuide({ exam }: { exam: ExamEntryCode }) {
  const entry = EXAM_ENTRIES[exam];
  return (
    <>
      <section id="afternoon" aria-labelledby="afternoon-heading" className="mb-6 scroll-mt-20 rounded-2xl border border-border bg-card p-4 sm:p-5">
        <h2 id="afternoon-heading" className="text-base font-bold">{exam === "ap" || exam === "sc" ? "科目B対策" : "科目B-1・科目B-2対策"}（旧{entry.afternoon}）</h2>
        {exam !== "st" && <>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">年度別一覧は午前の知識確認に使い、午後はIPAの問題冊子を開いて練習します。次の順で、解く前の準備から復習まで進めましょう。</p>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed">
            <li>公式の年度別資料で試験区分と期を選び、午後の問題冊子を開く。冊子冒頭の選択条件を読み、取り組む問番号を決める。</li>
            {exam === "sa" ? <>
              <li>午後Iは解答例を見る前に、問題文の条件と根拠にした箇所を記録し、自分の解答を書く。午後IIは設問条件を読み、自分の経験・事例を整理して論述を書く。</li>
              <li>午後Iは公式の解答例・出題趣旨・採点講評で考え方を確認する。午後IIは出題趣旨・採点講評と設問条件を使い、自分の経験に基づく論述を点検する。知識が曖昧だった論点は、このページの分野別過去問に戻って復習する。</li>
            </> : <>
              <li>解答例を見る前に、問題文の条件と根拠にした箇所を記録し、自分の解答を書く。</li>
              <li>公式の解答例・出題趣旨・採点講評で考え方を確認する。知識が曖昧だった論点は、このページの分野別過去問に戻って復習する。</li>
            </>}
          </ol>
          {exam === "sa" && <p className="mt-2 text-sm leading-relaxed text-muted-foreground">2025年度のIPA公式資料では、午後IIの「解答例」PDFに掲載されているのは出題趣旨で、模範論述は掲載されていません。</p>}
          <p className="mt-3 text-sm font-medium">公式資料で問題を探す</p>
          <a href="https://www.ipa.go.jp/shiken/mondai-kaiotu/2025r07.html" target="_blank" rel="noopener noreferrer" className={guideLink}>2025年度（令和7年度）の問題冊子・解答例・出題趣旨・採点講評 →</a>
          {exam === "sc" && <ScAfternoonTopicIndex />}
          <p className="mt-2 text-sm font-medium">目的別の学習ガイド</p>
        </>}
        <ul className="mt-2 space-y-1">
          <li><Link href={`/blog/${entry.guide}`} className={guideLink}>{entry.guideLabel} →</Link></li>
          {ADDITIONAL_PAST_QUESTION_GUIDES[exam].map(guide => <li key={guide.slug}><Link href={`/blog/${guide.slug}`} className={guideLink}>{guide.label} →</Link></li>)}
          {entry.aiEssay && <li><Link href="/essay" className={guideLink}>オリジナル論述教材でAI添削 →</Link></li>}
          <li><a href={EXAM_OFFICIAL_LINKS[exam].pastQuestions} target="_blank" rel="noopener noreferrer" className={guideLink}>IPA公式の過去問・解答例 →</a></li>
        </ul>
      </section>
    </>
  );
}
