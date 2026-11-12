import type { Question } from "@/lib/questions/types";

export const IPA_TOP_CODES = ["sc", "ap", "nw", "sa", "st", "sm", "pm", "db", "es", "au", "fe", "ip", "sg"] as const;
export function isIpaTop(exam: string): boolean {
  return (IPA_TOP_CODES as readonly string[]).includes(exam);
}

/** Historical coverage is derived from the actual practice pool, not the current syllabus. */
export function ipaTopDescription(exam: string, name: string, questions: Question[]): string {
  const years = [...new Set(questions.map(q => q.year))].sort((a, b) => a - b);
  const range = years.length === 0 ? "" : years.length === 1 ? `${years[0]}年度の` : `${years[0]}〜${years.at(-1)}年度の`;
  const sessions = [...new Set(questions.map(q => q.session))];
  const labels: Record<string, string> = { am: "旧午前", am1: "旧午前I", am2: "旧午前II", "kamoku-a": "科目A", "kamoku-b": "科目B" };
  const scope = exam === "ip" ? "公開問題" : sessions.map(s => labels[s] ?? s).join("・");
  const cbt = exam === "ap" ? "科目Aの知識確認に。" : ["sc", "nw", "sa", "st", "sm", "pm", "db", "es", "au"].includes(exam) ? "科目A-1・科目A-2の知識確認に。" : "";
  // IPA history: https://www.ipa.go.jp/shiken/about/enkaku.html
  const predecessor = exam === "sc" && years.some(year => year <= 2016) ? "・前身の情報セキュリティスペシャリスト試験を含む" : "";
  return `${name}の過去問を年度別・分野別に演習。正答と学習用解説を確認し、疑問はAIに質問できます。${range}掲載済み${questions.length.toLocaleString("ja-JP")}問（${scope}${predecessor}）を収録。${cbt}`;
}
