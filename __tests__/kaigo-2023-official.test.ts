import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { KAIGO_2023_QUESTIONS, KAIGO_QUESTIONS } from "@/data/questions/kaigo";
import source from "@/data/questions/kaigo/2023-annual.json";
import { isAcceptedAnswer, requiredSelectionCount } from "@/lib/questions/answers";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import { findQuestionByRoute, questionPagePath } from "@/lib/seo/question-url";

// 第36回の公式正答一覧の順序。問題46は公式訂正により4又は5。
const answers = "5 2 5 3 4 1 1 3 5 5 2 3 5 4 4 1 3 2 3 1 3 1 1 4 5 4 2 2 5 4 3 2 5 1 4 5 3 4 1 1 4 2 5 3 3 4,5 1 2 1 2 5 2 4 3 3 2 5 4 5 4 1 2 3 5 5 3 2 3 4 1 3 4 5 2 3 2 2 1 4 3 1 4 2 5 4 5 3 5 1 2 3 3 2 4 5 1 1 5 4 2 5 3 4 2 3 2 4 1 3 5 4 3 1 1 1 4 4 3 5 5 2 3 4 3 2".split(" ");

describe("第36回介護福祉士・公開追加", () => {
  it("公式125問・全正答と全肢解説を保持して3回分375問を公開する", () => {
    expect(KAIGO_QUESTIONS).toHaveLength(375);
    expect(KAIGO_2023_QUESTIONS).toHaveLength(125);
    expect(answers).toHaveLength(125);
    expect(source.answerSha256).toBe("e13163ff27fb3db632d0ba21596b0e0da49138ac0e3c12083cc829b95fc1a44b");
    expect(source.sourceVerification.unresolvedIssues).toEqual([]);
    for (const [i,q] of KAIGO_2023_QUESTIONS.entries()) {
      expect(q.qNumber).toBe(i+1);
      expect(q.officialAnswerNumber, q.id).toBe(answers[i]);
      expect(isPracticeReadyQuestion(q), q.id).toBe(true);
      expect(q.explanation.length, q.id).toBeGreaterThanOrEqual(50);
      expect(Object.values(q.choiceExplanations ?? {}).every(s => s.length >= 25), q.id).toBe(true);
      expect(q.sourceAnswerUrl).toBe("https://www.sssc.or.jp/kaigo/past_exam/pdf/no36/k_kijun_seitou.pdf");
      const [, , exam, yearSeason, section, qnum] = questionPagePath(q).split("/");
      expect(findQuestionByRoute(KAIGO_QUESTIONS, {exam:exam!,yearSeason:yearSeason!,section:section!,qnum:qnum!})?.id).toBe(q.id);
    }
  });
  it("問題46を複数選択にせず、4又は5のどちらか1つで正解とする", () => {
    const q = KAIGO_2023_QUESTIONS[45]!;
    expect(requiredSelectionCount(q)).toBe(1);
    expect(q.answer).toEqual(["エ","オ"]);
    expect(isAcceptedAnswer(q.answer,"エ")).toBe(true);
    expect(isAcceptedAnswer(q.answer,"オ")).toBe(true);
    expect(isAcceptedAnswer(q.answer,"ア")).toBe(false);
  });
  it("図版問71・105を原図とともに保存し、事例を省略しない", () => {
    const q71 = KAIGO_2023_QUESTIONS[70]!;
    const q105 = KAIGO_2023_QUESTIONS[104]!;
    expect(q71.question).toContain("下記の図記号");
    expect(q71.imageUrls).toHaveLength(1);
    expect(Object.keys(q105.choiceImageUrls ?? {})).toEqual(["ア","イ","ウ","エ","オ"]);
    for (const q of source.questions) {
      for (const fig of [...("questionImages" in q ? q.questionImages ?? [] : []), ...("choiceImages" in q ? q.choiceImages ?? [] : [])]) {
        const bytes = readFileSync(path.join(process.cwd(),"public",fig.publicPath));
        expect(createHash("sha256").update(bytes).digest("hex")).toBe(fig.sha256);
      }
    }
    for (const n of [109,110,111,112,114,115,116,117,118,119,120,121,122,123,124,125]) {
      expect(KAIGO_2023_QUESTIONS[n-1]!.question).toContain("〔事　例〕");
    }
  });
});
