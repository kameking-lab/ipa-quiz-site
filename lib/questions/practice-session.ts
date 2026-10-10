import type { ExamCode, Session } from "./types";

export const SPECIALIST_EXAMS: readonly ExamCode[] = ["st", "sa", "pm", "nw", "db", "es", "sc", "sm", "au"];
export const PRACTICE_SESSIONS: readonly Session[] = ["am", "am1", "am2", "pm", "kamoku-a", "kamoku-b", "gakka", "rousai", "koyou", "kenpo", "kounen", "kokunen", "ippan", "sentaku", "riron", "denryoku", "kikai", "houki", "mondai-a", "mondai-b", "kyotsu", "senmon", "hoiku-genri", "kyoiku-genri", "shakaiteki-yougo", "kodomo-katei-fukushi", "shakai-fukushi", "hoiku-shinrigaku", "kodomo-hoken", "kodomo-shokueiyou", "hoiku-jisshu-riron", "required", "theory", "practical"];

/** Specialist practice starts with the specialist paper; common AM I is explicit. */
export function defaultPracticeSession(exam: ExamCode, year?: number): Session {
  if (SPECIALIST_EXAMS.includes(exam)) return "am2";
  if ((exam === "fe" || exam === "sg") && (!year || year >= 2023)) return "kamoku-a";
  if (exam === "civil1" || exam === "zoen1" || exam === "tsushin1") return "mondai-a";
  if (exam === "fp1" || exam === "fp2" || exam === "fp3" || exam === "denko2" || exam === "denko1" || exam === "takken" || exam === "civil2" || exam === "kankoji2" || exam === "zoen2" || exam === "tsushin2" || exam === "kaigo" || exam === "tohan" || exam === "kanri" || exam === "soukan" || exam === "mankan" || exam === "kashikin" || exam === "sharoushi") return "gakka";
  if (exam === "yakuzaishi") return "required";
  if (exam === "denken3") return "riron";
  if (exam === "denken2" || exam === "denken1") return "denryoku";
  if (exam === "shakai") return "kyotsu";
  if (exam === "seishin") return "senmon";
  if (exam === "hoikushi") return "hoiku-genri";
  return "am";
}

export function parsePracticeSession(value?: string): Session | undefined {
  return PRACTICE_SESSIONS.includes(value as Session) ? value as Session : undefined;
}

export function practiceSessionLabel(session: Session): string {
  return ({ am: "午前", am1: "午前I（共通）", am2: "午前II（専門）", "kamoku-a": "科目A", "kamoku-b": "科目B", pm: "午後", pm1: "午後I", pm2: "午後II", gakka: "学科", rousai: "労災", koyou: "雇用保険", kenpo: "健康保険", kounen: "厚生年金", kokunen: "国民年金", ippan: "一般常識", sentaku: "選択式", required: "必須問題", theory: "薬学理論問題", practical: "薬学実践問題", riron: "理論", denryoku: "電力", kikai: "機械", houki: "法規", "mondai-a": "問題A", "mondai-b": "問題B", kyotsu: "共通科目", senmon: "専門科目", "hoiku-genri": "保育原理", "kyoiku-genri": "教育原理", "shakaiteki-yougo": "社会的養護", "kodomo-katei-fukushi": "子ども家庭福祉", "shakai-fukushi": "社会福祉", "hoiku-shinrigaku": "保育の心理学", "kodomo-hoken": "子どもの保健", "kodomo-shokueiyou": "子どもの食と栄養", "hoiku-jisshu-riron": "保育実習理論" })[session];
}

export function quizBackHref({ exam, mode, returnTo }: { exam: string; mode?: string; returnTo?: string }): string {
  // Only local learning destinations; never accept external URLs or player loops.
  if (returnTo && /^\/(?!\/)/.test(returnTo) && !/[\\\u0000-\u0020]/.test(returnTo) && !/^\/quiz(?:[/?#]|$)/.test(returnTo)) return returnTo;
  if (mode === "year") return `/modes/year?exam=${encodeURIComponent(exam)}`;
  if (mode === "topic") return `/modes/topic?exam=${encodeURIComponent(exam)}`;
  return `/${encodeURIComponent(exam)}`;
}
