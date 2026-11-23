import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import Denken1Question, { generateStaticParams as denken1Questions } from "@/app/denken1/[edition]/[subject]/[number]/page";
import Denken1Subject, { generateStaticParams as denken1Subjects } from "@/app/denken1/[edition]/[subject]/page";
import Denken2Question, { generateStaticParams as denken2Questions } from "@/app/denken2/[edition]/[subject]/[number]/page";
import Denken2Subject, { generateStaticParams as denken2Subjects } from "@/app/denken2/[edition]/[subject]/page";
import Denken3Question, { generateStaticParams as denken3Questions } from "@/app/denken3/[edition]/[subject]/[number]/page";
import Denken3Subject, { generateStaticParams as denken3Subjects } from "@/app/denken3/[edition]/[subject]/page";
import law2021 from "@/data/questions/denken2/native-2021-law.json";
import { denken3NativeSittingLabel } from "@/lib/denken3/native";

vi.mock("@/mobile/server/ContentPage", () => ({ ContentPage: () => null }));

const exams = [
  { label: "電験一種", questions: denken1Questions, subjects: denken1Subjects, question: Denken1Question, subject: Denken1Subject },
  { label: "電験二種", questions: denken2Questions, subjects: denken2Subjects, question: Denken2Question, subject: Denken2Subject },
  { label: "電験三種", questions: denken3Questions, subjects: denken3Subjects, question: Denken3Question, subject: Denken3Subject },
];

describe("published electrical original exam routes", () => {
  for (const exam of exams) {
    const questions = exam.questions();
    const subjects = exam.subjects();
    it(`renders all ${questions.length} ${exam.label} originals and ${subjects.length} subject indexes`, async () => {
      for (const params of questions) {
        const html = renderToStaticMarkup(await exam.question({ params: Promise.resolve(params) }));
        expect(html, JSON.stringify(params)).toContain("公式正答PDF");
      }
      for (const params of subjects) {
        const html = renderToStaticMarkup(await exam.subject({ params: Promise.resolve(params) }));
        expect(html, JSON.stringify(params)).toContain(denken3NativeSittingLabel(params.edition));
      }
    });
  }

  it("links the original 2021 Denken2 answer PDF and the question from its subject index", async () => {
    const subject = { edition: "2021-primary", subject: "law" };
    const question = { ...subject, number: "q1" };
    const original = await Denken2Question({ params: Promise.resolve(question) });
    expect(renderToStaticMarkup(original)).toContain(law2021.sourceAnswerUrl);
    const index = await Denken2Subject({ params: Promise.resolve(subject) });
    expect(renderToStaticMarkup(index)).toContain('href="/denken2/2021-primary/law/q1"');
  });
});
