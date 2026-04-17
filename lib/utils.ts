import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const EXAM_LABELS: Record<string, string> = {
  ip: "ITパスポート",
  sg: "情報セキュリティマネジメント",
  fe: "基本情報技術者",
  ap: "応用情報技術者",
  st: "ITストラテジスト",
  sa: "システムアーキテクト",
  pm: "プロジェクトマネージャ",
  nw: "ネットワークスペシャリスト",
  db: "データベーススペシャリスト",
  es: "エンベデッドシステムスペシャリスト",
  sc: "情報処理安全確保支援士",
  sm: "ITサービスマネージャ",
  au: "システム監査技術者",
};

export function examLabel(exam: string): string {
  return EXAM_LABELS[exam] ?? exam.toUpperCase();
}

export function seasonLabel(season: string): string {
  if (season === "spring") return "春期";
  if (season === "autumn") return "秋期";
  if (season === "cbt") return "CBT";
  return season;
}

export function formatYearSeason(year: number, season: string): string {
  const reiwa = year - 2018;
  const era = reiwa >= 1 ? `令和${reiwa}年度` : `${year}年度`;
  return `${era} ${seasonLabel(season)}`;
}
