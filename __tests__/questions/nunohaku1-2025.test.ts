import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { QUESTIONS_BY_EXAM } from "@/data/questions";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { EXAM_CONFIGS } from "@/lib/exam-config";
import { getQualificationByExamCode } from "@/lib/qualifications/catalog";
import { formatQuestionAnswerForDisplay, choiceDisplayLabel } from "@/lib/questions/display";
import { questionSourceEdition } from "@/lib/questions/source-label";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import { shuffleChoices } from "@/lib/questions/filter";
import { questionPagePath, findQuestionByRoute } from "@/lib/seo/question-url";
import { buildQuestionJsonLd } from "@/lib/seo/question-jsonld";
import { examContent, examCatalog } from "@/mobile/shared/catalog-source";
import { NUNOHAKU1_QUESTIONS as rows } from "@/data/questions/nunohaku1";
import evidence from "@/data/questions/nunohaku1/2025-early.sources.json";
const exam = "nunohaku1";
const key = "○×○×○×○○×○××○×○×○○×○×○××○ハニハロハイハハニニイイニロニロロイハハイイハロロ";
const pages = [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7, 7, 8, 8];
describe("nunohaku1 2025年度前期の公式50問", () => {
  it("原本の群・番号・正答・ページを出題データまで保持する", async () => {
    expect(rows).toHaveLength(50);
    expect(new Set(rows.map(q => q.id)).size).toBe(50);
    expect(rows.map(q => q.qNumber)).toEqual(Array.from({length:50}, (_,i) => i+1));
    expect(await getQuestionsForExam(exam)).toEqual(rows);
    expect(QUESTIONS_BY_EXAM[exam]).toEqual(rows);
    expect(rows.filter(isPracticeReadyQuestion)).toHaveLength(50);
    expect(getQualificationByExamCode(exam)?.status).toBe("live");
    expect(EXAM_CONFIGS[exam].sessions[0].expectedQuestions).toBe(50);
    rows.forEach((q,i) => {
      expect(q.id).toBe(`${exam}-2025-early-gakka-${i<25?'a':'b'}-${String(i%25+1).padStart(3,'0')}`);
      expect(q.officialQuestionLabel).toBe(`${i<25?'A':'B'}群 ${i%25+1}`);
      expect(q.officialAnswerNumber).toBe(key[i]);
      expect(formatQuestionAnswerForDisplay(q,q.answer)).toBe(key[i]);
      expect(q.sourcePdfUrl).toBe(`${evidence.sources[0].url}#page=${pages[i]}`);
      expect(q.sourceAnswerUrl).toBe(evidence.sources[1].url);
      expect(Object.keys(q.choices!)).toHaveLength(i<25?2:4);
      expect(Object.keys(q.choiceExplanations!)).toEqual(Object.keys(q.choices!));
      expect(EXAM_CONFIGS[exam].sessions[0].categories).toContain(q.category);
      expect(questionSourceEdition(q)).toBe("2025年度前期");
      expect(shuffleChoices(q)).toBe(q);
      const [, , routeExam,yearSeason,section,qnum]=questionPagePath(q).split("/");
      expect(findQuestionByRoute(rows,{exam:routeExam,yearSeason,section,qnum})?.id).toBe(q.id);
      const graph=buildQuestionJsonLd({question:q,pageUrlAbs:`https://www.kakomon-ai.jp${questionPagePath(q)}`,title:exam})["@graph"][0];
      if(!("hasPart" in graph)||!("acceptedAnswer" in graph.hasPart)||Array.isArray(graph.hasPart.acceptedAnswer))throw new Error("Missing answer");
      expect(graph.hasPart.author.name).toBe("中央職業能力開発協会");
      expect(graph.hasPart.acceptedAnswer.text).toContain(key[i]);
      expect(q.sourceAttribution).toContain(getQualificationByExamCode(exam)!.fullName.replace("技能検定 ",""));
    });
    expect(["ア","イ","ウ","エ"].map(k => choiceDisplayLabel(exam,k as "ア"))).toEqual(["イ","ロ","ハ","ニ"]);
  });
  it("原図の参照と画像ハッシュを保持する", () => {
    expect(rows.filter(q=>q.hasImage).map(q=>q.qNumber)).toEqual([27, 37]);
    evidence.review.forEach(r=>expect(r.officialAnswer).toBe(key[rows.findIndex(q=>q.id===r.id)]));
    expect(evidence.figures).toHaveLength(2);
    evidence.figures.forEach(f => {
      expect(createHash("sha256").update(readFileSync(`public${f.file}`)).digest("hex")).toBe(f.sha256);
    });
    rows.filter(q=>q.hasImage).forEach(q=>{
      expect(q.imageUrls).toHaveLength(1);
      expect(q.imageAltTexts).toHaveLength(1);
      q.imageUrls?.forEach(url=>expect(evidence.figures.some(f=>f.file===url)).toBe(true));
    });
    expect(rows[26].choices).toEqual({ア: "貯蔵（図のイ）", イ: "滞留（図のロ）", ウ: "数量検査（図のハ）", エ: "加工（図のニ）"});
    expect(rows[36].choices).toEqual({ア: "図のイ", イ: "図のロ", ウ: "図のハ", エ: "図のニ"});
  });
  it("mobileの件数・本文・リビジョンがWebと一致する",async()=>{
    expect(await examContent(exam)).toEqual(rows);
    const catalog=JSON.parse(readFileSync("mobile/src/generated/catalog.json","utf8"));
    expect(catalog.exams.find((e:{code:string})=>e.code===exam)).toEqual(await examCatalog(exam));
  });
});
