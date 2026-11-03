import source from "@/data/questions/denko2/skills-draft.json";

export interface Denko2SkillProblem {
  id: string;
  year: number;
  season: "first" | "second";
  date: string;
  day: "saturday" | "sunday";
  number: number;
  questionPdfUrl: string;
  answerPdfUrl: string;
  questionPdfSha256: string;
  answerPdfSha256: string;
  instructionText: string;
  materialsText: string;
  conditionsText: string;
  diagramNotesText: string;
  diagramImage: string;
  secondFigureImage: string | null;
  answerConceptImage: string;
  answerWiringImage: string;
  answerExampleImage: string;
  defectCriteriaUrl: string;
}

/** Non-public preparation corpus; callers must enforce the exam release gate. */
export const DENKO2_SKILL_PROBLEMS = source as Denko2SkillProblem[];

export function getSkillProblem(id: string): Denko2SkillProblem | undefined {
  return DENKO2_SKILL_PROBLEMS.find((item) => item.id === id);
}

export function getSkillNeighbors(problem: Denko2SkillProblem) {
  const sameDay = DENKO2_SKILL_PROBLEMS.filter((item) => item.date === problem.date);
  const index = sameDay.findIndex((item) => item.id === problem.id);
  return { previous: sameDay[index - 1], next: sameDay[index + 1] };
}

export function skillDateLabel(problem: Denko2SkillProblem): string {
  return `${problem.year}年${problem.season === "first" ? "上期" : "下期"}・${problem.date}（${problem.day === "saturday" ? "土" : "日"}）`;
}

/** Select only checks that the official supplied materials and conditions require. */
export function getSkillDefectChecks(problem: Denko2SkillProblem): string[] {
  const material = problem.materialsText;
  const conditions = problem.conditionsText;
  const checks = [
    "完成させ、配線・器具の配置、電線の種類と寸法を問題図に合わせたか（欠陥基準1・2）。",
    "誤接続・誤結線がなく、施工条件で指定された電線色と極性を守ったか（同3・4）。",
    "ケーブル外装・絶縁被覆・心線に欠陥となる傷を付けていないか（同5）。",
  ];
  if (/リングスリーブ/.test(material + conditions)) {
    checks.push("リングスリーブの種類・刻印・圧着位置は電線の組合せに合うか。心線端の見え方と被覆の露出も確認したか（同6）。");
  }
  if (/差込形コネクタ/.test(material + conditions)) {
    checks.push("差込形コネクタの先端側から心線が見え、下端側から心線が露出していないか（同7）。");
  }
  if (/ランプレセプタクル|引掛シーリング|コンセント|端子台|配線用遮断器/.test(material)) {
    checks.push("器具の端子に電線を確実に結線し、心線を露出させ過ぎていないか（同8）。");
  }
  if (/金属管|ねじなし電線管|ねじなしボックスコネクタ/.test(material + conditions)) {
    checks.push("金属管・コネクタ・ボックスの配置、接続、止めねじ、必要なボンド線を確認したか（同9）。");
  }
  if (/合成樹脂製可とう電線管|PF管/.test(material + conditions)) {
    checks.push("可とう電線管とコネクタ・ボックスが指定の位置で確実につながっているか（同10）。");
  }
  if (/取付枠/.test(material + conditions)) {
    checks.push("取付枠の向きと器具の取り付け位置・固定が施工条件どおりか（同11）。");
  }
  checks.push("支給品以外の材料や不要な追加工事がなく、器具を破損していないか（同12）。");
  return checks;
}
