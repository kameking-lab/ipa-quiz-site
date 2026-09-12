import type { ExamCode, Session } from "@/lib/questions/types";

export interface MockExamConfig {
  exam: ExamCode;
  label: string;
  session: Session;
  questions: number;
  minutes: number;
  passThreshold: number;
}

export const MOCK_EXAM_CONFIGS: Record<string, MockExamConfig> = {
  ip: { exam: "ip", session: "am", label: "ITパスポート 模試", questions: 100, minutes: 120, passThreshold: 0.6 },
  sg: { exam: "sg", session: "kamoku-a", label: "情報セキュリティマネジメント 科目A 演習", questions: 37, minutes: 120, passThreshold: 0.6 },
  fe: { exam: "fe", session: "kamoku-a", label: "基本情報 科目A 模試", questions: 60, minutes: 90, passThreshold: 0.6 },
  ap: { exam: "ap", session: "am", label: "応用情報 午前 模試", questions: 80, minutes: 150, passThreshold: 0.6 },
  st: { exam: "st", session: "am2", label: "ITストラテジスト 午前II 模試", questions: 25, minutes: 40, passThreshold: 0.6 },
  sa: { exam: "sa", session: "am2", label: "システムアーキテクト 午前II 模試", questions: 25, minutes: 40, passThreshold: 0.6 },
  pm: { exam: "pm", session: "am2", label: "プロジェクトマネージャ 午前II 模試", questions: 25, minutes: 40, passThreshold: 0.6 },
  nw: { exam: "nw", session: "am2", label: "ネットワークスペシャリスト 午前II 模試", questions: 25, minutes: 40, passThreshold: 0.6 },
  db: { exam: "db", session: "am2", label: "データベーススペシャリスト 午前II 模試", questions: 25, minutes: 40, passThreshold: 0.6 },
  es: { exam: "es", session: "am2", label: "エンベデッド 午前II 模試", questions: 25, minutes: 40, passThreshold: 0.6 },
  sc: { exam: "sc", session: "am2", label: "情報処理安全確保支援士 午前II 模試", questions: 25, minutes: 40, passThreshold: 0.6 },
  sm: { exam: "sm", session: "am2", label: "ITサービスマネージャ 午前II 模試", questions: 25, minutes: 40, passThreshold: 0.6 },
  au: { exam: "au", session: "am2", label: "システム監査 午前II 模試", questions: 25, minutes: 40, passThreshold: 0.6 },
};

export function getMockConfig(exam: ExamCode): MockExamConfig {
  return MOCK_EXAM_CONFIGS[exam] ?? MOCK_EXAM_CONFIGS.ap;
}
