import type { ExamCode } from "@/lib/questions/types";

export type Occupation = "student" | "junior" | "mid" | "senior" | "non-it";
export type ITYears = "none" | "lt1" | "1-3" | "3-7" | "gte7";
export type Goal = "job-hunt" | "career-change" | "promotion" | "self-growth" | "company-mandate";
export type StudyHours = "lt3" | "3-7" | "7-15" | "gte15";
export type SkillLevel = "weak" | "neutral" | "strong";
export type ExamSeason = "spring" | "autumn" | "any" | "tbd";

export interface DiagnosisAnswers {
  occupation: Occupation;
  itYears: ITYears;
  goal: Goal;
  studyHours: StudyHours;
  math: SkillLevel;
  english: SkillLevel;
  examSeason: ExamSeason;
}

export interface DiagnosisResult {
  primary: ExamCode;
  alternates: ExamCode[];
  reasons: string[];
  studyWeeks: { min: number; max: number };
  recommendedPlan: "free" | "premium";
  scores: Partial<Record<ExamCode, number>>;
}

const EXAMS: ExamCode[] = [
  "ip", "sg", "fe", "ap",
  "st", "sa", "pm", "nw", "db", "es", "sc", "sm", "au",
];

function emptyScores(): Record<ExamCode, number> {
  return Object.fromEntries(EXAMS.map((e) => [e, 0])) as Record<ExamCode, number>;
}

export function diagnose(a: DiagnosisAnswers): DiagnosisResult {
  const s = emptyScores();

  // 1. Occupation
  switch (a.occupation) {
    case "student":
      s.ip += 5; s.sg += 3; s.fe += 2; s.ap += 1;
      break;
    case "junior":
      s.sg += 4; s.fe += 5; s.ap += 2;
      break;
    case "mid":
      s.ap += 5; s.sc += 3; s.nw += 2; s.db += 2; s.fe += 1;
      break;
    case "senior":
      s.ap += 2; s.sc += 3; s.st += 4; s.pm += 4; s.sa += 3; s.au += 2; s.sm += 2; s.nw += 2; s.db += 2;
      break;
    case "non-it":
      s.ip += 6; s.sg += 2;
      break;
  }

  // 2. IT years
  switch (a.itYears) {
    case "none":
      s.ip += 4; s.sg += 1;
      // penalize advanced
      s.ap -= 1; s.sc -= 2; s.nw -= 3; s.db -= 3; s.st -= 4; s.pm -= 4; s.sa -= 4; s.es -= 3; s.sm -= 3; s.au -= 3;
      break;
    case "lt1":
      s.ip += 2; s.sg += 3; s.fe += 1;
      s.st -= 3; s.pm -= 3; s.sa -= 3; s.au -= 3;
      break;
    case "1-3":
      s.sg += 2; s.fe += 4; s.ap += 1;
      s.st -= 2; s.pm -= 2;
      break;
    case "3-7":
      s.fe += 1; s.ap += 4; s.sc += 2; s.nw += 1; s.db += 1; s.es += 1;
      break;
    case "gte7":
      s.ap += 2; s.sc += 2; s.nw += 2; s.db += 2; s.st += 3; s.pm += 3; s.sa += 3; s.es += 2; s.sm += 2; s.au += 3;
      break;
  }

  // 3. Goal
  switch (a.goal) {
    case "job-hunt":
      s.ip += 2; s.sg += 1; s.fe += 3; s.ap += 1;
      break;
    case "career-change":
      s.fe += 2; s.ap += 4; s.sc += 1;
      break;
    case "promotion":
      s.ap += 2; s.st += 3; s.pm += 3; s.sa += 2; s.sm += 2; s.au += 2;
      break;
    case "self-growth":
      s.ap += 1; s.sc += 2; s.nw += 2; s.db += 2; s.es += 2; s.st += 1; s.pm += 1;
      break;
    case "company-mandate":
      s.sg += 3; s.ap += 2; s.fe += 2;
      break;
  }

  // 4. Study hours per week
  switch (a.studyHours) {
    case "lt3":
      s.ip += 2; s.sg += 1;
      s.ap -= 1; s.sc -= 2; s.nw -= 2; s.db -= 2; s.st -= 2; s.pm -= 2; s.sa -= 2; s.au -= 2;
      break;
    case "3-7":
      s.sg += 1; s.fe += 1; s.ap += 1;
      break;
    case "7-15":
      s.ap += 2; s.sc += 1; s.nw += 1; s.db += 1; s.es += 1;
      break;
    case "gte15":
      s.ap += 1; s.sc += 2; s.nw += 2; s.db += 2; s.es += 2; s.st += 2; s.pm += 2; s.sa += 2; s.sm += 1; s.au += 1;
      break;
  }

  // 5. Math
  switch (a.math) {
    case "weak":
      s.ip += 1; s.sg += 2; s.pm += 1; s.sm += 1; s.au += 1;
      s.db -= 2; s.nw -= 1; s.es -= 2;
      break;
    case "neutral":
      break;
    case "strong":
      s.fe += 1; s.ap += 1; s.db += 2; s.nw += 1; s.es += 2;
      break;
  }

  // 6. English
  switch (a.english) {
    case "weak":
      s.ip += 1; s.sg += 1;
      break;
    case "neutral":
      break;
    case "strong":
      s.nw += 1; s.sc += 1; s.db += 1;
      break;
  }

  // 7. Season — small bonus to exams that have that season frequently (ignored for primary)
  // No-op for scoring; used in study-weeks calc only.

  // Pick primary + alternates
  const ranked = (Object.entries(s) as Array<[ExamCode, number]>)
    .filter(([, v]) => v > -100)
    .sort((a2, b2) => b2[1] - a2[1]);
  const primary = ranked[0]?.[0] ?? "ap";
  const alternates = ranked.slice(1, 3).map(([code]) => code);

  // Study weeks heuristic
  const baseWeeks: Record<ExamCode, [number, number]> = {
    ip: [4, 8],
    sg: [6, 10],
    fe: [10, 16],
    ap: [16, 24],
    st: [20, 32],
    sa: [20, 32],
    pm: [20, 32],
    nw: [20, 32],
    db: [20, 32],
    es: [20, 32],
    sc: [16, 28],
    sm: [16, 28],
    au: [20, 32],
  };
  const [minW, maxW] = baseWeeks[primary];
  const hourMul = a.studyHours === "lt3" ? 1.4 : a.studyHours === "3-7" ? 1.0 : a.studyHours === "7-15" ? 0.8 : 0.65;
  const studyWeeks = {
    min: Math.max(2, Math.round(minW * hourMul)),
    max: Math.max(4, Math.round(maxW * hourMul)),
  };

  // Reasons
  const reasons = buildReasons(a, primary);

  // Plan: premium if heavy load
  const recommendedPlan: "free" | "premium" =
    a.studyHours === "gte15" || ["sc", "nw", "db", "st", "pm", "sa", "es", "sm", "au"].includes(primary)
      ? "premium"
      : "free";

  return { primary, alternates, reasons, studyWeeks, recommendedPlan, scores: s };
}

function buildReasons(a: DiagnosisAnswers, primary: ExamCode): string[] {
  const occLabel: Record<Occupation, string> = {
    student: "学生・初学者",
    junior: "新人エンジニア（〜3年）",
    mid: "中堅エンジニア（4〜9年）",
    senior: "シニア（10年〜）",
    "non-it": "非IT職",
  };
  const goalLabel: Record<Goal, string> = {
    "job-hunt": "就活",
    "career-change": "転職",
    promotion: "昇進・昇給",
    "self-growth": "自己研鑽",
    "company-mandate": "業務命令・会社推奨",
  };
  const examPros: Record<ExamCode, string> = {
    ip: "ITの全社共通リテラシー資格として網羅性が高く、実務未経験でも狙えます",
    sg: "情報セキュリティを軸にIT全般を学べ、非エンジニア部門でも高評価です",
    fe: "プログラミング・アルゴリズム実務基礎を体系的に固められる定番資格です",
    ap: "技術・マネジメント両面の総合力を示せる、最もコスパが高い中堅資格です",
    st: "経営戦略×ITで上位ポジションを狙う上での最高峰の証明になります",
    sa: "システム設計・要件定義のプロとして、上流工程の市場価値が大きく上がります",
    pm: "プロジェクト管理職の登竜門であり、リーダー職の評価につながります",
    nw: "ネットワーク領域の専門性を示せ、インフラ・SREキャリアで武器になります",
    db: "データベース設計・チューニング能力の証明として、データ職で強い武器になります",
    es: "組み込み・IoT領域の専門性を示せ、製造業・自動車系で評価が高いです",
    sc: "情報処理安全確保支援士（登録セキスペ）として、セキュリティ専門職で必須級です",
    sm: "ITサービスマネージャとして、運用・保守領域の専門性とリーダーシップを示せます",
    au: "システム監査の独立した視点を持つことで、内部統制・コンサル領域で重宝されます",
  };
  return [
    `${occLabel[a.occupation]}としての経験レベルにマッチします`,
    `「${goalLabel[a.goal]}」という目的に対して投資対効果が高い試験区分です`,
    examPros[primary],
  ];
}
