import type { ExamCode } from "@/lib/questions/types";

export interface MockExamConfig {
  exam: ExamCode;
  label: string;
  questions: number;
  minutes: number;
  passThreshold: number;
}

export const MOCK_EXAM_CONFIGS: Record<string, MockExamConfig> = {
  ip: { exam: "ip", label: "ITパスポート 模試", questions: 100, minutes: 120, passThreshold: 0.6 },
  sg: { exam: "sg", label: "情報セキュリティマネジメント 模試", questions: 60, minutes: 120, passThreshold: 0.6 },
  fe: { exam: "fe", label: "基本情報 科目A 模試", questions: 60, minutes: 90, passThreshold: 0.6 },
  ap: { exam: "ap", label: "応用情報 午前 模試", questions: 80, minutes: 150, passThreshold: 0.6 },
  st: { exam: "st", label: "ITストラテジスト 午前II 模試", questions: 25, minutes: 40, passThreshold: 0.6 },
  sa: { exam: "sa", label: "システムアーキテクト 午前II 模試", questions: 25, minutes: 40, passThreshold: 0.6 },
  pm: { exam: "pm", label: "プロジェクトマネージャ 午前II 模試", questions: 25, minutes: 40, passThreshold: 0.6 },
  nw: { exam: "nw", label: "ネットワークスペシャリスト 午前II 模試", questions: 25, minutes: 40, passThreshold: 0.6 },
  db: { exam: "db", label: "データベーススペシャリスト 午前II 模試", questions: 25, minutes: 40, passThreshold: 0.6 },
  es: { exam: "es", label: "エンベデッド 午前II 模試", questions: 25, minutes: 40, passThreshold: 0.6 },
  sc: { exam: "sc", label: "情報処理安全確保支援士 午前II 模試", questions: 25, minutes: 40, passThreshold: 0.6 },
  sm: { exam: "sm", label: "ITサービスマネージャ 午前II 模試", questions: 25, minutes: 40, passThreshold: 0.6 },
  au: { exam: "au", label: "システム監査 午前II 模試", questions: 25, minutes: 40, passThreshold: 0.6 },
};

export function getMockConfig(exam: ExamCode): MockExamConfig {
  return MOCK_EXAM_CONFIGS[exam] ?? MOCK_EXAM_CONFIGS.ap;
}
