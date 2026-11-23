import { parsePracticeSession, practiceSessionLabel } from "@/lib/questions/practice-session";
import type { ExamCode } from "@/lib/questions/types";

export function displayQuestionGroupLabel(session: string, exam?: ExamCode): string {
  const parsed = parsePracticeSession(session);
  return parsed ? practiceSessionLabel(parsed, exam) : session;
}
