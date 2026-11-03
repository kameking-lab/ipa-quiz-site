import type { Question } from "@/lib/questions/types";

// Each official booklet has 50 questions and its own legal reference date.
// Counts and omitted numbers come from the same playable pool as the hub badge.
const PAPERS = [
  { year: 2024, label: "令和6年度", lawDate: "2024年4月1日", pdf: "r06.pdf" },
  { year: 2025, label: "令和7年度", lawDate: "2025年4月1日", pdf: "r07.pdf" },
] as const;

export function KanriCoverageNote({ questions }: { questions: Question[] }) {
  return (
    <section aria-label="管理業務主任者の掲載範囲" className="mt-3 text-sm text-muted-foreground">
      <p>
        各年度の公式50問のうち、現在演習できる問題は計{questions.length}問です。
        解説は試験当時の法令・規約等に沿った学習用の独自作成で、協会の公式解説ではありません。
      </p>
      <ul className="mt-2 space-y-2">
        {PAPERS.map((paper) => {
          const numbers = new Set(questions.filter((question) => question.year === paper.year).map((question) => question.qNumber));
          const omitted = Array.from({ length: 50 }, (_, index) => index + 1).filter((number) => !numbers.has(number));
          return (
            <li key={paper.year}>
              {paper.label}：{numbers.size}問／公式50問。法令基準日：{paper.lawDate}。
              {omitted.length > 0 && <span>この演習に含まれない問題：問{omitted.join("・")}。</span>}
              <a
                href={`https://www.kanrikyo.or.jp/kanri/mondaiseikai/pdf/${paper.pdf}`}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-1 underline"
              >
                {paper.label}の公式問題・正答を確認
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
