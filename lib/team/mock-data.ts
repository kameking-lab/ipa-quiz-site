import type { ExamCode } from "@/lib/questions/types";

export interface TeamMember {
  id: string;
  name: string;
  department: string;
  joinedAt: string;
  lastLoginAt: string;
  totalAnswered: number;
  accuracy: number;
  studyMinutes: number;
  targetExam: ExamCode;
  progress: Partial<Record<ExamCode, number>>;
}

export interface ExamProgress {
  exam: ExamCode;
  label: string;
  answered: number;
  accuracy: number;
  targetUsers: number;
}

export interface TeamMockData {
  teamName: string;
  plan: "team";
  memberCount: number;
  seatsTotal: number;
  totalAnswered: number;
  totalStudyMinutes: number;
  avgAccuracy: number;
  activeThisWeek: number;
  examProgress: ExamProgress[];
  members: TeamMember[];
  departments: Array<{ name: string; memberCount: number; avgAccuracy: number }>;
}

export const MOCK_TEAM: TeamMockData = {
  teamName: "株式会社サンプル情報システム",
  plan: "team",
  memberCount: 42,
  seatsTotal: 50,
  totalAnswered: 18420,
  totalStudyMinutes: 9840,
  avgAccuracy: 68.4,
  activeThisWeek: 31,
  examProgress: [
    { exam: "ip", label: "ITパスポート", answered: 3240, accuracy: 82.1, targetUsers: 8 },
    { exam: "sg", label: "情報セキュリティマネジメント", answered: 2180, accuracy: 74.3, targetUsers: 6 },
    { exam: "fe", label: "基本情報", answered: 5820, accuracy: 66.7, targetUsers: 14 },
    { exam: "ap", label: "応用情報", answered: 4980, accuracy: 61.2, targetUsers: 10 },
    { exam: "sc", label: "情報処理安全確保支援士", answered: 1420, accuracy: 58.9, targetUsers: 3 },
    { exam: "nw", label: "ネットワーク", answered: 780, accuracy: 54.2, targetUsers: 1 },
  ],
  departments: [
    { name: "情報システム部", memberCount: 18, avgAccuracy: 71.2 },
    { name: "開発部", memberCount: 12, avgAccuracy: 67.8 },
    { name: "インフラ部", memberCount: 7, avgAccuracy: 64.5 },
    { name: "新卒研修", memberCount: 5, avgAccuracy: 58.1 },
  ],
  members: [
    {
      id: "u-001",
      name: "田中 太郎",
      department: "情報システム部",
      joinedAt: "2026-01-15",
      lastLoginAt: "2026-04-19",
      totalAnswered: 842,
      accuracy: 78.4,
      studyMinutes: 520,
      targetExam: "ap",
      progress: { fe: 95, ap: 62 },
    },
    {
      id: "u-002",
      name: "佐藤 花子",
      department: "情報システム部",
      joinedAt: "2026-01-20",
      lastLoginAt: "2026-04-19",
      totalAnswered: 1120,
      accuracy: 82.1,
      studyMinutes: 640,
      targetExam: "sc",
      progress: { ap: 88, sc: 58 },
    },
    {
      id: "u-003",
      name: "鈴木 次郎",
      department: "開発部",
      joinedAt: "2026-02-01",
      lastLoginAt: "2026-04-18",
      totalAnswered: 680,
      accuracy: 71.2,
      studyMinutes: 380,
      targetExam: "ap",
      progress: { fe: 82, ap: 48 },
    },
    {
      id: "u-004",
      name: "高橋 美咲",
      department: "開発部",
      joinedAt: "2026-02-10",
      lastLoginAt: "2026-04-17",
      totalAnswered: 540,
      accuracy: 64.8,
      studyMinutes: 290,
      targetExam: "fe",
      progress: { ip: 90, fe: 54 },
    },
    {
      id: "u-005",
      name: "伊藤 健一",
      department: "インフラ部",
      joinedAt: "2026-02-15",
      lastLoginAt: "2026-04-19",
      totalAnswered: 920,
      accuracy: 69.5,
      studyMinutes: 510,
      targetExam: "nw",
      progress: { ap: 75, nw: 42 },
    },
    {
      id: "u-006",
      name: "渡辺 結衣",
      department: "情報システム部",
      joinedAt: "2026-03-01",
      lastLoginAt: "2026-04-16",
      totalAnswered: 420,
      accuracy: 72.3,
      studyMinutes: 240,
      targetExam: "sg",
      progress: { sg: 68 },
    },
    {
      id: "u-007",
      name: "山本 翔",
      department: "新卒研修",
      joinedAt: "2026-04-01",
      lastLoginAt: "2026-04-19",
      totalAnswered: 320,
      accuracy: 58.9,
      studyMinutes: 180,
      targetExam: "ip",
      progress: { ip: 62 },
    },
    {
      id: "u-008",
      name: "中村 咲良",
      department: "新卒研修",
      joinedAt: "2026-04-01",
      lastLoginAt: "2026-04-18",
      totalAnswered: 280,
      accuracy: 55.4,
      studyMinutes: 150,
      targetExam: "ip",
      progress: { ip: 58 },
    },
    {
      id: "u-009",
      name: "小林 大輔",
      department: "開発部",
      joinedAt: "2026-01-10",
      lastLoginAt: "2026-04-14",
      totalAnswered: 1580,
      accuracy: 85.2,
      studyMinutes: 820,
      targetExam: "sc",
      progress: { ap: 92, sc: 74 },
    },
    {
      id: "u-010",
      name: "加藤 愛",
      department: "インフラ部",
      joinedAt: "2026-02-20",
      lastLoginAt: "2026-04-10",
      totalAnswered: 480,
      accuracy: 66.1,
      studyMinutes: 280,
      targetExam: "nw",
      progress: { ap: 70, nw: 38 },
    },
  ],
};
