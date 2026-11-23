import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { RIYOSHI_CANDIDATES, RIYOSHI_QUESTIONS } from "@/data/questions/riyoshi";
import receipt from "@/data/questions/riyoshi/2025-second-source.json";
import { getReleasedRiyoshiQuestions } from "@/lib/riyoshi/publication";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import { questionSourceEdition } from "@/lib/questions/source-label";
import { findQuestionByRoute, questionPagePath } from "@/lib/seo/question-url";

const officialAnswers = [3,3,1,4,2,4,4,2,1,3,1,2,2,1,4,2,4,4,1,1,2,3,3,1,2,3,4,3,4,2,1,2,3,3,4,1,3,4,3,4,4,4,3,1,1,2,3,3,2,4,2,1,4,2,4];
const qs = RIYOSHI_QUESTIONS.filter(q => q.year===2025);
describe("理容師第52回公式問題の公開追加", () => {
  it("55問の公式丸印の正答と220肢解説を維持して3回分165問を公開する", () => {
    expect(RIYOSHI_QUESTIONS).toHaveLength(165);
    expect(RIYOSHI_QUESTIONS).toEqual(RIYOSHI_CANDIDATES);
    expect(qs.map(q=>q.qNumber)).toEqual(Array.from({length:55},(_,i)=>i+1));
    expect(qs.map(q=>Number(q.officialAnswerNumber))).toEqual(officialAnswers);
    expect(receipt.officialAnswers).toEqual(officialAnswers);
    expect(receipt.sourcePdfSha256).toBe("f4125a16ee0838fe4f33cf3d9be318dde2c09d067ef03cc417f365f7fa107e25");
    for (const q of qs) {
      expect(isPracticeReadyQuestion(q),q.id).toBe(true);
      expect(q.explanationCoverage).toBe("full");
      expect(Object.keys(q.choiceExplanations ?? {})).toEqual(["ア","イ","ウ","エ"]);
      expect(Object.values(q.choiceExplanations ?? {}).every(s=>s.length>=10),q.id).toBe(true);
      expect(q.sourcePdfUrl).toBe(q.sourceAnswerUrl);
      expect(questionSourceEdition(q)).toBe("第52回（2025年実施）");
      const [, , exam,yearSeason,section,qnum] = questionPagePath(q).split("/");
      expect(findQuestionByRoute(RIYOSHI_QUESTIONS,{exam:exam!,yearSeason:yearSeason!,section:section!,qnum:qnum!})?.id).toBe(q.id);
    }
    expect(getReleasedRiyoshiQuestions([{...qs[0]!,id:"riyoshi-2025-second-unreviewed"}])).toEqual([]);
  });
  it("原図2点を正答の丸印から切り離して保存し、図問に代替文を付ける", () => {
    expect(qs.filter(q=>q.hasImage).map(q=>q.qNumber)).toEqual([44,46]);
    for (const [num,figure] of Object.entries(receipt.figures)) {
      const q=qs[Number(num)-1]!;
      expect(q.imageUrls).toEqual([figure.publicPath]);
      expect(q.imageAltTexts?.[0]).toBeTruthy();
      const bytes=readFileSync(join(process.cwd(),"public",figure.publicPath));
      expect(createHash("sha256").update(bytes).digest("hex")).toBe(figure.sha256);
    }
    expect(qs[24]!.choiceExplanations?.イ).toContain("5×2÷500＝0.02％");
    expect(qs[14]!.choiceExplanations?.エ).toContain("40～70％");
  });
});
