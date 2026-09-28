import type { ExamCode } from "@/lib/questions/types";

const TSUGINO_ORIGIN = "https://tsugino-shikaku.jp";

const QUALIFICATION_IDS: Partial<Record<ExamCode, string>> = {
  ip: "itpassport",
  sg: "sg",
  fe: "kihon-joho",
  ap: "ap",
  sc: "sc",
  nw: "nw",
  db: "db",
  st: "st",
  sa: "sa",
  pm: "pm",
  sm: "sm",
  es: "es",
  au: "au",
  fp3: "fp-3kyu",
  fp2: "fp2",
  denko2: "denko2",
  takken: "takken",
  civil2: "doboku-sekou-2kyu",
  eisei1: "eisei-kanrisha-1shu",
  kaigo: "care-worker",
};

/** Qualification schedules live on 次の資格, not in this question bank. */
export function tsuginoScheduleUrl(exam?: ExamCode): string {
  const qualificationId = exam ? QUALIFICATION_IDS[exam] : undefined;
  return qualificationId
    ? `${TSUGINO_ORIGIN}/shikaku/${qualificationId}`
    : `${TSUGINO_ORIGIN}/calendar`;
}

/** Only link to a qualification-specific learning hub when the mapping is known. */
export function tsuginoLearningUrl(exam?: ExamCode): string | null {
  const qualificationId = exam ? QUALIFICATION_IDS[exam] : undefined;
  return qualificationId
    ? `${TSUGINO_ORIGIN}/learn/${qualificationId}`
    : null;
}
