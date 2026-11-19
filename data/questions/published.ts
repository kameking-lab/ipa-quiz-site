import type { Question } from "@/lib/questions/types";
import missingFigureIds from "./missing-figure-ids.json";

const missingFigures = new Set<string>(missingFigureIds);

function explanationRank(question: Question) {
  if (question.explanationCoverage === "full") return 2;
  return question.choiceExplanations ? 1 : 0;
}

export function publishedQuestions(questions: Question[]): Question[] {
  const byId = new Map<string, Question>();
  for (const question of questions) {
    if (missingFigures.has(question.id)) continue;
    const previous = byId.get(question.id);
    if (!previous) {
      byId.set(question.id, question);
      continue;
    }
    const agrees = JSON.stringify(previous.answer) === JSON.stringify(question.answer);
    const rank = explanationRank(question) - explanationRank(previous);
    if (agrees && (rank > 0 || (rank === 0 && question.explanation.length > previous.explanation.length))) {
      byId.set(question.id, question);
    }
  }
  return byId.size === questions.length ? questions : [...byId.values()];
}

/** Join parallel source editions while keeping established question URLs stable. */
export function appendReplenishedQuestions(base: Question[], groups: readonly (readonly unknown[])[]): Question[] {
  const slot = (q: Question) => [q.exam, q.year, q.season, q.session, q.qNumber, q.part ?? ""].join("/");
  const occupied = new Set(base.map(slot));
  const ids = new Set(base.map(q => q.id));
  const appended = [...base];
  for (const group of groups) {
    for (const q of group as Question[]) {
      if (q.publicAllowed === false || q.needsReview || ids.has(q.id) || occupied.has(slot(q))) continue;
      ids.add(q.id);
      occupied.add(slot(q));
      appended.push(q);
    }
  }
  return appended;
}
