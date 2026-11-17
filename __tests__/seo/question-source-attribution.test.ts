import { describe, expect, it } from "vitest";
import { getAvailableExams, getQuestionsByExamStrict } from "@/lib/seo/exam-meta";
import { getQualificationByExamCode } from "@/lib/qualifications/catalog";
import { isIpaTop } from "@/lib/seo/ipa-top";
import { buildQuestionJsonLd } from "@/lib/seo/question-jsonld";
import { questionPagePath } from "@/lib/seo/question-url";

describe("question authors follow the published source, not an IPA default", () => {
  it("attributes every published non-IPA exam without inventing an IPA author or license", () => {
    const exams = getAvailableExams().filter(exam => !isIpaTop(exam));
    expect(exams.length).toBeGreaterThan(250);
    for (const exam of exams) {
      const question = getQuestionsByExamStrict(exam)[0];
      const resource = buildQuestionJsonLd({ question, pageUrlAbs: `https://www.kakomon-ai.jp${questionPagePath(question)}`, title: exam })["@graph"][0];
      if (!("hasPart" in resource)) throw new Error(`Missing resource: ${exam}`);
      expect(resource.hasPart.author?.name, exam).toBeTruthy();
      expect(resource.hasPart.author?.url, exam).not.toContain("ipa.go.jp");
      expect(resource.license ?? "", exam).not.toContain("ipa.go.jp");
      expect(resource.hasPart.acceptedAnswer ?? resource.hasPart.suggestedAnswer, exam).toBeTruthy();
    }
  });

  it.each(["ahaki-anma", "ahaki-hari-kyu", "hokenshi", "eisei1", "jidosha-2-motorcycle", "shobo-setsubishi-otsu6", "jken-system", "shuwa", "yamaguchi-fugu"] as const)("uses the existing official catalog for %s and keeps the explanation publisher separate", exam => {
    const question = getQuestionsByExamStrict(exam)[0];
    const source = getQualificationByExamCode(exam)!;
    const resource = buildQuestionJsonLd({ question, pageUrlAbs: `https://www.kakomon-ai.jp${questionPagePath(question)}`, title: exam })["@graph"][0];
    if (!("hasPart" in resource)) throw new Error("Missing resource");
    expect(resource.hasPart.author).toMatchObject({ name: source.administrator, url: new URL(source.officialQuestionsUrl).origin });
    expect(resource.creator).toEqual(resource.hasPart.author);
    expect(resource.publisher.name).toBe("過去問AI");
  });
});
