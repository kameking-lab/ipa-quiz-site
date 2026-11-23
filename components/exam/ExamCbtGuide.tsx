import { JsonLd } from "@/components/seo/JsonLd";
import { SITE_BASE_URL } from "@/lib/seo/config";
import type { ExamEntryCode } from "@/lib/seo/exam-entry";

export const CBT_SOURCE = "https://www.ipa.go.jp/shiken/2026/ap_koudo_sc-cbt.html";
const REVIEWED_DATE = "2026-11-10";
const names = {
  sc: "情報処理安全確保支援士試験",
  ap: "応用情報技術者試験",
  nw: "ネットワークスペシャリスト試験",
  sa: "システムアーキテクト試験",
} as const;

function guide(exam: ExamEntryCode) {
  if (exam === "st") return null;
  const subjects = exam === "ap"
    ? "午前は科目A、午後は科目B"
    : exam === "sc"
      ? "午前I・午前IIは科目A-1・科目A-2、午後は科目B"
      : "午前I・午前IIは科目A-1・科目A-2、午後I・午後IIは科目B-1・科目B-2";
  return {
    summary: `IPAのCBT移行案内では、${names[exam]}の${subjects}に名称を変更する予定です。問う知識・技能の範囲、出題形式・出題数・試験時間は変わらないと案内されています。`,
    faqs: [
      {
        question: `${names[exam]}の午前・午後はCBTで何という科目名になりますか？`,
        answer: `${subjects}に名称を変更する予定です。このサイトの過去問は実施当時の科目名で掲載しています。`,
      },
      {
        question: `${names[exam]}はCBT移行で出題範囲や形式も変わりますか？`,
        answer: "IPAの案内では、問う知識・技能の範囲、出題形式、出題数、試験時間は変更しないとしています。受験前にはIPAの最新案内も確認してください。",
      },
    ],
  };
}

function SourceNote() {
  return (
    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
      出典：<a href={CBT_SOURCE} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4">IPA「CBT方式での実施について」</a>
      （確認・本文更新：<time dateTime={REVIEWED_DATE}>2026年11月10日</time>）
    </p>
  );
}

export function ExamCbtSummary({ exam }: { exam: ExamEntryCode }) {
  const content = guide(exam);
  if (!content) return null;
  return (
    <div className="mt-3">
      <p className="text-sm leading-relaxed text-muted-foreground">{content.summary}</p>
      <SourceNote />
    </div>
  );
}

export function ExamCbtFaq({ exam }: { exam: ExamEntryCode }) {
  const content = guide(exam);
  if (!content) return null;
  return (
    <div className="mt-4">
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "@id": `${SITE_BASE_URL}/${exam}#cbt-faq`,
        url: `${SITE_BASE_URL}/${exam}`,
        inLanguage: "ja-JP",
        dateModified: REVIEWED_DATE,
        citation: CBT_SOURCE,
        mainEntity: content.faqs.map(faq => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      }} />
      <h3 className="text-sm font-bold">CBT移行についてよくある質問</h3>
      {content.faqs.map(faq => (
        <details key={faq.question} className="mt-2 rounded-xl border border-border">
          <summary className="min-h-11 cursor-pointer p-3 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">{faq.question}</summary>
          <p className="px-3 pb-3 text-sm leading-relaxed">{faq.answer}</p>
        </details>
      ))}
      <SourceNote />
    </div>
  );
}
