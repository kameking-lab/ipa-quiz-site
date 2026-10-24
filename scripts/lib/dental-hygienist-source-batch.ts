import { z } from "zod";

const choice = z.enum(["a", "b", "c", "d"]);
const identity = {
  round: z.union([z.literal(34), z.literal(35)]),
  session: z.enum(["am", "pm"]),
  qNumber: z.number().int().min(1).max(110),
};

export const dentalOfficialAnswerSchema = z.object({
  ...identity,
  rawOfficialAnswer: z.string().min(1),
  acceptedChoices: z.array(choice),
  scoring: z.enum(["normal", "alternative", "excluded", "all-correct"]),
  sourceAnswerUrl: z.url(),
}).strict();

export const dentalRecoveredDraftSchema = z.object({
  ...identity,
  question: z.string().min(1),
  choices: z.object({ a: z.string().min(1), b: z.string().min(1), c: z.string().min(1), d: z.string().min(1) }).strict(),
  requiredSelections: z.number().int().min(1).max(4),
  explanation: z.string().min(1),
  choiceExplanations: z.object({ a: z.string().min(1).optional(), b: z.string().min(1).optional(), c: z.string().min(1).optional(), d: z.string().min(1).optional() }).strict(),
  sourcePdfUrl: z.url(),
  sourcePdfSha256: z.string().regex(/^[a-f0-9]{64}$/),
  sourceAnswerUrl: z.url(),
  sourceAttribution: z.string().min(1),
  sourceQuestionStatus: z.enum(["complete", "missing-figure"]),
  hasImage: z.boolean(),
  originalPagePath: z.string().regex(/^originals\/[\w-]+\.png$/),
  originalPageSha256: z.string().regex(/^[a-f0-9]{64}$/),
  missingFigureReferences: z.array(z.string().min(1)),
  referenceUrls: z.array(z.url()),
  lawReferenceDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  needsReviewReasons: z.array(z.string().min(1)),
  tableRows: z.array(z.tuple([z.string(), z.string()])).optional(),
}).strict();

export type DentalOfficialAnswer = z.infer<typeof dentalOfficialAnswerSchema>;
export type DentalRecoveredDraft = z.infer<typeof dentalRecoveredDraftSchema>;

const SPECIAL_SCORING: Readonly<Record<string, DentalOfficialAnswer["scoring"]>> = {
  "35-am-97": "alternative",
  "34-am-8": "excluded", "34-am-10": "excluded", "34-am-14": "alternative",
  "34-am-33": "excluded", "34-pm-13": "excluded", "34-pm-37": "all-correct", "34-pm-82": "excluded",
};
const CHOICES = ["a", "b", "c", "d"] as const;
export function dentalQuestionKey(row: Pick<DentalOfficialAnswer, "round" | "session" | "qNumber">): string {
  return `${row.round}-${row.session}-${row.qNumber}`;
}

function expectedAnswerUrl(round: number): string {
  return `https://www.mhlw.go.jp/general/sikaku/successlist/${round + 1991}/siken19/hpSEITO.html`;
}

export interface DentalSourceItem {
  key: string;
  scoring: DentalOfficialAnswer["scoring"];
  originalRecovered: boolean;
  sourceComplete: boolean;
  fullChoiceExplanations: boolean;
  candidateForQuestionImport: boolean;
  holds: string[];
}

/** Verify the two complete official keys before considering any recovered question.
 * Candidates still require an exam registration and the integration owner's review.
 * Excluded/all-correct items never become a made-up academic answer key.
 */
export function inspectDentalSourceBatch(answersInput: unknown, draftsInput: unknown, receiptsInput: unknown) {
  const answers = z.array(dentalOfficialAnswerSchema).parse(answersInput);
  const drafts = z.array(dentalRecoveredDraftSchema).parse(draftsInput);
  const receipts = z.array(z.object({ url: z.url(), status: z.literal(200), sha256: z.string().regex(/^[a-f0-9]{64}$/), label: z.string() }).passthrough()).parse(receiptsInput);
  const receiptByUrl = new Map(receipts.map((receipt) => [receipt.url, receipt]));
  if (receiptByUrl.size !== receipts.length) throw new Error("Duplicate source receipt URL");
  if (answers.length !== 440) throw new Error("Expected 440 official answer rows (35/34, AM/PM 110 each)");
  const byKey = new Map<string, DentalOfficialAnswer>();
  for (const row of answers) {
    const key = dentalQuestionKey(row);
    if (byKey.has(key)) throw new Error(`Duplicate official question: ${key}`);
    byKey.set(key, row);
    const expectedScoring = SPECIAL_SCORING[key] ?? "normal";
    if (row.scoring !== expectedScoring) throw new Error(`Official scoring changed: ${key}`);
    if (row.sourceAnswerUrl !== expectedAnswerUrl(row.round)) throw new Error(`Unexpected official answer URL: ${key}`);
    if (receiptByUrl.get(row.sourceAnswerUrl)?.label !== "answers") throw new Error(`Missing official answer receipt: ${key}`);
    if (new Set(row.acceptedChoices).size !== row.acceptedChoices.length) throw new Error(`Duplicate accepted choice: ${key}`);
    if (row.scoring === "excluded" || row.scoring === "all-correct") {
      const raw = row.rawOfficialAnswer;
      if (row.acceptedChoices.length !== 0 || (row.scoring === "excluded" ? !["−", "-"].includes(raw) : raw !== "*")) {
        throw new Error(`Do not fabricate an academic answer for ${row.scoring}: ${key}`);
      }
    } else {
      if (!/^[abcd\s,]+$/.test(row.rawOfficialAnswer)) throw new Error(`Unknown answer notation: ${key}`);
      const rawChoices = row.rawOfficialAnswer.replace(/[\s,]/g, "").split("");
      if (rawChoices.join("") !== row.acceptedChoices.join("")) throw new Error(`Official answer mismatch: ${key}`);
      if (row.scoring === "alternative" && row.acceptedChoices.join("") !== "ac") throw new Error(`Changed alternative answers: ${key}`);
    }
  }
  for (const round of [35, 34] as const) for (const session of ["am", "pm"] as const) {
    for (let qNumber = 1; qNumber <= 110; qNumber++) {
      const key = dentalQuestionKey({ round, session, qNumber });
      if (!byKey.has(key)) throw new Error(`Missing official question: ${key}`);
    }
  }

  const draftsByKey = new Map<string, DentalRecoveredDraft>();
  for (const draft of drafts) {
    const key = dentalQuestionKey(draft);
    if (draftsByKey.has(key)) throw new Error(`Duplicate recovered question: ${key}`);
    draftsByKey.set(key, draft);
    const answer = byKey.get(key);
    if (!answer) throw new Error(`Recovered question not in official scope: ${key}`);
    if (draft.sourceAnswerUrl !== answer.sourceAnswerUrl) throw new Error(`Recovered answer source mismatch: ${key}`);
    const receipt = receiptByUrl.get(draft.sourcePdfUrl);
    if (!receipt || !["scoring-change-original", "question-original"].includes(receipt.label) || !["www.mhlw.go.jp", "www.dc-training.or.jp"].includes(new URL(receipt.url).hostname)) throw new Error(`Recovered original source mismatch: ${key}`);
    if (receipt.sha256 !== draft.sourcePdfSha256) throw new Error(`Recovered PDF checksum mismatch: ${key}`);
    // The published scoring-change PDF contains only a placeholder for No.29.
    // Changing a local status flag cannot supply that missing official photograph.
    if (key === "35-am-97" && receipt.label === "scoring-change-original" && draft.sourceQuestionStatus === "complete") throw new Error(`Official scoring PDF omits the referenced photograph: ${key}`);
    if (answer.scoring === "alternative" && draft.requiredSelections !== 1) throw new Error(`Alternative accepted answers require one selection: ${key}`);
    if (answer.scoring === "normal" && answer.acceptedChoices.length !== draft.requiredSelections) throw new Error(`Selection count mismatch: ${key}`);
    if ((draft.sourceQuestionStatus === "missing-figure") !== (draft.missingFigureReferences.length > 0)) throw new Error(`Missing figure status mismatch: ${key}`);
    if (draft.missingFigureReferences.length > 0 && !draft.hasImage) throw new Error(`Missing figure requires hasImage: ${key}`);
  }

  const items: DentalSourceItem[] = answers.map((answer) => {
    const key = dentalQuestionKey(answer);
    const draft = draftsByKey.get(key);
    const fullChoiceExplanations = draft !== undefined && CHOICES.every((choiceKey) => Boolean(draft.choiceExplanations[choiceKey]?.trim()));
    const sourceComplete = draft?.sourceQuestionStatus === "complete";
    const holds = !draft ? ["official-original-missing"] : [...draft.needsReviewReasons];
    if (draft) {
      if (!sourceComplete) holds.push("official-figure-missing");
      if (!fullChoiceExplanations) holds.push("choice-explanations-incomplete");
      if (answer.scoring === "excluded") holds.push("official-excluded-no-academic-answer");
      if (answer.scoring === "all-correct") holds.push("official-all-correct-no-academic-answer");
    }
    return { key, scoring: answer.scoring, originalRecovered: Boolean(draft), sourceComplete, fullChoiceExplanations,
      candidateForQuestionImport: Boolean(draft) && sourceComplete && fullChoiceExplanations && holds.length === 0,
      holds };
  });
  return {
    qualification: "dental-hygienist", rounds: [35, 34], expectedOriginals: 440,
    officialAnswerRows: answers.length,
    officialScoredQuestions: answers.filter((row) => row.scoring !== "excluded").length,
    recoveredOriginals: drafts.length,
    missingOriginals: items.filter((item) => !item.originalRecovered).length,
    completeOriginals: items.filter((item) => item.sourceComplete).length,
    fullChoiceExplanationDrafts: items.filter((item) => item.fullChoiceExplanations).length,
    candidateQuestions: items.filter((item) => item.candidateForQuestionImport).length,
    sitePublishedIncrement: 0,
    items,
  };
}
