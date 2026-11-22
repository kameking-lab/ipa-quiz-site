import { findQualificationHub, qualificationHubPath } from "@/lib/exam-qualification-hubs";
import { EXAM_CATALOG, EXAM_LIBRARY_PATH } from "@/lib/exam-library-catalog";
import { EXAM_LABELS } from "@/lib/utils";

export const CARD_LABELS = {
  passed: "合格しました",
  lap: "学習範囲を1周しました",
  streak: "連続学習の節目を達成",
  goal: "今日の目安を達成",
} as const;

export type CardKind = keyof typeof CARD_LABELS;
export interface StudyCard {
  kind: CardKind;
  mastered: number;
  total: number;
  streak: number;
}

export function cardQualification(exam: string) {
  if (!exam || exam.length > 120) return null;
  const hub = findQualificationHub(exam);
  if (hub) return { name: hub.name, path: qualificationHubPath(exam) };
  if (/^[a-z0-9][a-z0-9-]{0,63}$/.test(exam) && Object.hasOwn(EXAM_LABELS, exam)) {
    return { name: EXAM_LABELS[exam], path: `/${exam}` };
  }
  const paper = EXAM_CATALOG.find(({ group, subject }) => `${group}-${subject}` === exam);
  if (!paper) return null;
  const query = new URLSearchParams({ group: paper.group, subject: paper.subject });
  return { name: paper.subject, path: `${EXAM_LIBRARY_PATH}?${query}` };
}

export function parseStudyCard(query: URLSearchParams): StudyCard | null {
  const keys = ["card", "mastered", "total", "streak"];
  if (keys.some(key => query.getAll(key).length !== 1)) return null;
  const kind = query.get("card")!;
  if (!Object.hasOwn(CARD_LABELS, kind)) return null;
  const counts = keys.slice(1).map(key => query.get(key)!);
  if (!counts.every(value => /^(0|[1-9]\d{0,4})$/.test(value))) return null;
  const [mastered, total, streak] = counts.map(Number);
  if (mastered > total || total > 50_000 || streak > 36_600 || (total === 0 && kind !== "passed")) return null;
  if (kind === "streak" && ![3, 7, 14, 30].includes(streak)) return null;
  return { kind: kind as CardKind, mastered, total, streak };
}

function cardQuery(card: StudyCard) {
  return new URLSearchParams({ card: card.kind, mastered: String(card.mastered), total: String(card.total), streak: String(card.streak) });
}

export function cardImagePath(exam: string, card: StudyCard): string {
  const query = cardQuery(card);
  query.set("type", "study-card");
  query.set("exam", exam);
  return `/api/og?${query}`;
}

export function cardSharePath(path: string, card: StudyCard): string {
  return `${path}${path.includes("?") ? "&" : "?"}${cardQuery(card)}`;
}
