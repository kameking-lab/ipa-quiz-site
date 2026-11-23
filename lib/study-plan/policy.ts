import outfits from "@/lib/pet/v1/outfits.generated.json";
import ginoExams from "./gino-passing-exams.json";
import { qualificationIdsForExam } from "./schedule";
import { dayNumber } from "./pace";

export interface PassingLine {
  percent: number;
  isDefault: boolean;
  sourceUrl: string | null;
  verifiedOn: string | null;
  /** IRT and per-section/rank requirements are retained for detail views. */
  conditions: string | null;
}
const IPA_SOURCE = "https://www.ipa.go.jp/shiken/syllabus/rcu1hd00000141gq-att/youkou_ver5_6.pdf";
const IPA_EXAMS = new Set(["ip", "sg", "fe", "ap", "st", "sa", "pm", "nw", "db", "es", "sc", "sm", "au"]);
// Catalog entries administered by JAVADA. These banks contain the academic exam.
const GINO_EXAMS = new Set(ginoExams);
export function passingLineForExam(exam: string): PassingLine {
  if (GINO_EXAMS.has(exam)) return { percent: 65, isDefault: false,
    sourceUrl: "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/0000198896.html", verifiedOn: "2026-11-17",
    conditions: "学科試験は原則65/100。資格取得には実技試験の合格も必要。" };
  if (["jken-katsuyo1", "jken-katsuyo2", "jken-katsuyo3"].includes(exam)) return {
    percent: exam === "jken-katsuyo3" ? 70 : 65, isDefault: false,
    sourceUrl: "https://jken.sgec.or.jp/information/juse/", verifiedOn: "2026-11-17", conditions: null,
  };
  if (IPA_EXAMS.has(exam)) return { percent: 60, isDefault: false, sourceUrl: IPA_SOURCE, verifiedOn: "2026-11-17",
    conditions: ["ip", "sg", "fe"].includes(exam) ? "IRT評価点600/1000。正答率への換算ではない。IPは分野別300/1000、FEは各科目の基準も必要。"
      : "各科目60/100。ST・SA・PM・ES・SM・AUの科目B-2はランクAも必要。基準点が変更される場合あり。" };
  return { percent: 60, isDefault: true, sourceUrl: null, verifiedOn: null, conditions: null };
}
/** Shared outfit fallback does not depend on standard study-hour data. */
export function planOutfitForExam(exam: string): string {
  return Object.hasOwn(outfits, exam) ? (outfits as Record<string, string>)[exam] : "generic-8";
}
export interface PlanPolicyWarning {
  exam: string;
  code: "no-schedule-mapping" | "default-passing-line" | "shared-outfit" | "stale-schedule";
}
export function planPolicyWarnings(exams: readonly { exam: string; scheduleVerifiedOn?: string | null }[], today: string): PlanPolicyWarning[] {
  const day = dayNumber(today);
  if (day === null) throw new Error("invalid_date");
  return exams.flatMap(({ exam, scheduleVerifiedOn }) => {
    const warnings: PlanPolicyWarning[] = [];
    if (!qualificationIdsForExam(exam).length) warnings.push({ exam, code: "no-schedule-mapping" });
    if (passingLineForExam(exam).isDefault) warnings.push({ exam, code: "default-passing-line" });
    if (!Object.hasOwn(outfits, exam)) warnings.push({ exam, code: "shared-outfit" });
    const verified = scheduleVerifiedOn ? dayNumber(scheduleVerifiedOn) : null;
    if (verified === null || day - verified >= 90) warnings.push({ exam, code: "stale-schedule" });
    return warnings;
  });
}
