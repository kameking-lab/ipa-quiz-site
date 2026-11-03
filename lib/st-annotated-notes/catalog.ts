import q2009 from "./accepted/st-2009a-am2-q23.json";

// Deliberately independent of Question and data/questions. Only the envelope is
// exported: it has no top-level question/choices/answer usable by quiz consumers.
export const NOTE_IDS = ["st-2009a-am2-q23"] as const;
export type NoteId = (typeof NOTE_IDS)[number];
export const NOTES_PATH = "/st/past-papers/notes";
export const LEARNING_NOTICE =
  "注記不可分・非採点の学習教材です。公式解答と、解釈や追加モデルの下での数学的な結論を区別して読んでください。";

export type AcceptedCandidate = Readonly<{
  id: string;
  year: number;
  session: string;
  qNumber: number;
  question: string;
  choices: Readonly<Record<string, string>>;
  answer: string;
  explanation: string;
  hasImage: boolean;
  sourcePdfUrl: string;
  sourceAnswerUrl?: string;
  choiceExplanations?: Readonly<Record<string, string>>;
  questionNotice?: string;
  needsReview?: boolean;
}>;

export type AnnotatedNote = Readonly<{
  kind: "st-annotated-non-scoring";
  id: NoteId;
  title: string;
  notice: string;
  scoringEnabled: false;
  registerInQuestionPool: false;
  originalReferenceRequired: true;
  questionPage: number;
  answerPage: 1;
  answerPdfUrl: string;
  accepted: AcceptedCandidate;
}>;

function freeze<T>(value: T): Readonly<T> {
  if (value !== null && typeof value === "object") {
    for (const child of Object.values(value)) freeze(child);
    Object.freeze(value);
  }
  return value;
}

function bind(
  id: NoteId,
  accepted: AcceptedCandidate,
  title: string,
  notice: string,
  questionPage: number,
  answerPdfUrl: string,
): AnnotatedNote {
  if (accepted.id !== id || !notice || !accepted.explanation || !accepted.hasImage) {
    throw new Error("Invalid annotated-note binding");
  }
  if (accepted.questionNotice && accepted.questionNotice !== notice) {
    throw new Error("Accepted questionNotice must be preserved verbatim");
  }
  for (const url of [accepted.sourcePdfUrl, answerPdfUrl]) {
    if (!url.startsWith("https://www.ipa.go.jp/shiken/") || !url.endsWith(".pdf")) {
      throw new Error("Annotated notes require official PDF references");
    }
  }
  return freeze({
    kind: "st-annotated-non-scoring" as const,
    id,
    title,
    notice,
    scoringEnabled: false as const,
    registerInQuestionPool: false as const,
    originalReferenceRequired: true as const,
    questionPage,
    answerPage: 1 as const,
    answerPdfUrl,
    accepted,
  });
}

const notes: readonly AnnotatedNote[] = freeze([
  bind(
    NOTE_IDS[0], q2009, "2009年秋期 午前Ⅱ 問23・管理図",
    "規則(4)の数え方に留保があります。公式解答に対応する4点と、3観測点の単調な列として読む場合の5点を区別します。",
    12,
    "https://www.ipa.go.jp/shiken/mondai-kaiotu/gmcbt8000000f3yi-att/2009h21a_st_am2_ans.pdf",
  ),
]);

export function getAnnotatedNotes(): readonly AnnotatedNote[] { return notes; }
export function getAnnotatedNote(id: string): AnnotatedNote | undefined {
  return notes.find((note) => note.id === id);
}
export function annotatedNotePath(id: NoteId): string { return `${NOTES_PATH}/${id}`; }
export function questionReference(note: AnnotatedNote): string {
  return `${note.accepted.sourcePdfUrl}#page=${note.questionPage}`;
}
export function answerReference(note: AnnotatedNote): string {
  return `${note.answerPdfUrl}#page=${note.answerPage}`;
}
