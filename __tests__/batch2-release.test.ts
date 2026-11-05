import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { QUESTIONS_BY_EXAM } from "@/data/questions";
import { KENCHIKUSHI1_CANDIDATES } from "@/data/qualification-staging/kenchikushi1";
import { getQuestionsForExam, getRegisteredExamCodes } from "@/lib/questions/get-questions";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import { isExamPublished } from "@/lib/qualifications/catalog";
import { questionPagePath, findQuestionByRoute } from "@/lib/seo/question-url";
import { getHomeDirectory } from "@/lib/home/home-directory";
import { renderExamsSitemapXml } from "@/lib/seo/sitemap-xml";
import { GET as search } from "@/app/api/search/questions/route";
import { buildQuestionJsonLd } from "@/lib/seo/question-jsonld";
import type { ExamCode } from "@/lib/questions/types";

const counts: Partial<Record<ExamCode, number>> = {
  kenchikushi1: 249, "khk-kagaku": 422, "sekou-1kenchiku": 144,
  "khk-kikai-kou": 80, "khk-kikai-otsu": 100,
  "khk-reito-1": 80, "khk-reito-2": 80, "khk-reito-3": 70,
};
describe("batch2 public release integration", () => {
  it("connects complete reviewed scopes through eager/lazy/search/home/sitemap and distinct routes", async () => {
    const home = getHomeDirectory().flatMap(group => [...group.featured, ...group.compact]);
    const sitemap = renderExamsSitemapXml();
    for (const [code, count] of Object.entries(counts)) {
      const exam = code as ExamCode;
      const eager = QUESTIONS_BY_EXAM[exam]!;
      expect(isExamPublished(exam), code).toBe(true);
      expect(getRegisteredExamCodes(), code).toContain(exam);
      expect(eager, code).toHaveLength(count!);
      expect(await getQuestionsForExam(exam), code).toEqual(eager);
      expect(eager.every(isPracticeReadyQuestion), code).toBe(true);
      expect(new Set(eager.map(questionPagePath)).size, code).toBe(count);
      expect(home.find(item => item.key === exam)?.questionCount, code).toBe(count);
      expect(sitemap, code).toContain(`/${exam}</loc>`);
      const response = await search(new Request(`http://localhost/api/search/questions?exam=${exam}&limit=1`));
      expect(response.status).toBe(200);
      expect((await response.json()).total, code).toBe(count);
      for (const q of eager) {
        expect(findQuestionByRoute(eager, { exam, yearSeason: `${q.year}-${q.season}`, section: q.session, qnum: `q${q.qNumber}` })?.id).toBe(q.id);
      }
    }
  }, 120_000);

  it("changes only release flags and image locations in the accepted architect manuscript", () => {
    const published = QUESTIONS_BY_EXAM.kenchikushi1!;
    expect(KENCHIKUSHI1_CANDIDATES).toHaveLength(250);
    const receipt = JSON.parse(readFileSync("reports/int5-20261104/projection-receipt.json", "utf8")) as {
      assets: Record<string, { url: string; sha256: string }>;
    };
    for (const q of published) {
      const original = KENCHIKUSHI1_CANDIDATES.find(source => source.id === q.id)!;
      expect(q).toEqual({ ...original, needsReview: false, publicAllowed: true,
        imageUrls: original.imageUrls?.map(path => receipt.assets[path].url),
        choiceImageUrls: original.choiceImageUrls && Object.fromEntries(Object.entries(original.choiceImageUrls).map(([key, path]) => [key, receipt.assets[path].url])),
      });
    }
    const excluded = KENCHIKUSHI1_CANDIDATES.filter(q => q.officialScoring);
    expect(excluded).toHaveLength(1);
    expect(published.some(q => q.id === excluded[0].id)).toBe(false);
    for (const [source, asset] of Object.entries(receipt.assets)) {
      for (const file of [source, `public${asset.url}`]) {
        expect(createHash("sha256").update(readFileSync(file)).digest("hex"), file).toBe(asset.sha256);
      }
    }
  });

  it("attributes new public content to its actual administering institution", () => {
    for (const [exam, institution] of [["kenchikushi1", "建築技術教育"], ["khk-kagaku", "高圧ガス"], ["sekou-1kenchiku", "建設業振興"]] as const) {
      const q = QUESTIONS_BY_EXAM[exam]![0];
      const resource = buildQuestionJsonLd({ question: q, pageUrlAbs: `https://www.kakomon-ai.jp${questionPagePath(q)}`, title: exam })["@graph"][0];
      expect(JSON.stringify(resource)).toContain(institution);
    }
  });
});
