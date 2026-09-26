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
  fp2: "2級FP技能検定",
  fp3: "3級FP技能検定",
  denken3: "第三種電気主任技術者",
  denken2: "第二種電気主任技術者",
  denko2: "第二種電気工事士",
  takken: "宅地建物取引士",
  civil2: "2級土木施工管理技士",
  kankoji2: "2級管工事施工管理技士",
};

export function examLabel(exam: string): string {
  return EXAM_LABELS[exam] ?? exam.toUpperCase();
}

export function seasonLabel(season: string): string {
  if (season === "spring") return "春期";
  if (season === "autumn") return "秋期";
  if (season === "cbt") return "CBT";
  if (season === "published") return "公表問題";
  if (season === "first") return "上期";
  if (season === "early") return "前期";
  if (season === "second") return "下期";
  if (season === "may") return "5月試験";
  if (season === "september") return "9月試験";
  if (season === "january") return "1月試験";
  if (season === "october") return "10月試験";
  if (season === "late") return "後期";
  if (season === "primary") return "一次試験";
  return season;
}

export function formatYearSeason(year: number, season: string): string {
  if (["may", "september", "january"].includes(season)) return `${year}年${seasonLabel(season)}`;
  if (season === "published") return `${year}年5月公表問題`;
  const reiwa = year - 2018;
  const era = reiwa >= 1 ? `令和${reiwa}年度` : `${year}年度`;
  return `${era} ${seasonLabel(season)}`;
}
