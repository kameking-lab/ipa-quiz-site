import type { ChoiceKey, Question, Session, Season } from "@/lib/questions/types";
import febBasic from "./260208-js01.json";
import febProgramming from "./260208-js02.json";
import febDesign from "./260208-js03.json";
import sepBasic from "./260913-js01.json";
import sepProgramming from "./260913-js02.json";
import sepDesign from "./260913-js03.json";

export const JKEN_SYSTEM_PAPERS = [febBasic, febProgramming, febDesign, sepBasic, sepProgramming, sepDesign];

/** Complete source candidates. Public registries must use the qualification publication gate. */
export const JKEN_SYSTEM_QUESTIONS: Question[] = JKEN_SYSTEM_PAPERS.flatMap(paper => {
  let ordinal = 0;
  return paper.questions.flatMap(original => original.slots.map(slot => {
    const bank = original.banks.find(item => item.slots.includes(slot.number));
    if (!bank) throw new Error(`Missing J検 bank: ${paper.id}/${original.number}/${slot.number}`);
    ordinal += 1;
    const law = paper.id === "260913-js03" && (original.number === 1 || original.number === 5);
    const transcript = "figureTranscript" in original ? `\n\n${original.figureTranscript}` : "";
    return {
      id: `jken-system-${paper.id}-q${original.number}-${slot.number}`,
      exam: "jken-system", session: paper.session as Session, year: paper.year, season: paper.season as Season,
      qNumber: ordinal, type: "multiple-choice", category: paper.subject,
      topicTags: [paper.subject, `大問${original.number}`], difficulty: 2,
      question: `${paper.label} ${paper.subject} 大問${original.number} 解答欄(${slot.number})\n\n以下の原文を読み，解答欄(${slot.number})に答えてください。\n\n\`\`\`text\n${original.text}\n\`\`\`${transcript}`,
      choices: bank.choices,
      answer: slot.answer as ChoiceKey,
      officialAnswerNumber: slot.answer,
      explanation: `${law ? `出題時点（${paper.examDate}）の法令・制度を前提とします。\n\n` : ""}${slot.explanation}\n\n[公式正答表](${paper.answerUrl})`,
      choiceExplanations: slot.choiceExplanations, explanationCoverage: "full",
      hasImage: original.figures.length > 0,
      ...(original.figures.length ? { imageUrls: original.figures.map(item => item.url), imageAltTexts: original.figures.map(item => item.alt) } : {}),
      sourcePdfUrl: `${paper.questionUrl}#page=${original.pages[0]}`,
      sourceAnswerUrl: paper.answerUrl,
      sourceAttribution: `出典：一般財団法人職業教育・キャリア教育財団 ${paper.label} 情報検定 情報システム試験 ${paper.subject} 大問${original.number} 解答欄(${slot.number})。改行・空白・図表表記を整理。原図を部分切出し。解説は過去問AIの独自作成。`,
      officialReferenceUrls: law ? (original.number === 5 ? ["https://laws.e-gov.go.jp/law/411AC0000000128/20250601_504AC0000000068"] : []) : [],
      ...(law ? { lawReferenceDate: paper.examDate } : {}),
      license: "JKEN-owner-cleared", lastUpdated: "2026-11-03", needsReview: false,
    } satisfies Question;
  }));
});
