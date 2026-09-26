import { Building2, HardHat, Landmark, Monitor, Zap, type LucideIcon } from "lucide-react";
import type { HomeDomainId } from "@/lib/home/home-directory";

export interface DomainTheme {
  icon: LucideIcon;
  /** アイコンタイル */
  tile: string;
  /** 見出し横の小さな強調文字 */
  accent: string;
  /** 主要カード */
  card: string;
  /** 略称バッジ */
  abbr: string;
  /** 小チップ */
  chip: string;
  /** ヒーローの分野チップ */
  heroChip: string;
}

// Tailwind は文字列リテラルしか拾わないため、分野ごとのクラスをここに固定で持つ。
export const DOMAIN_THEME: Record<HomeDomainId, DomainTheme> = {
  it: {
    icon: Monitor,
    tile: "bg-sky-600 text-white dark:bg-sky-500",
    accent: "text-sky-800 dark:text-sky-300",
    card: "border-sky-200 hover:border-sky-400 dark:border-sky-900 dark:hover:border-sky-600",
    abbr: "bg-sky-100 text-sky-800 dark:bg-sky-900/60 dark:text-sky-200",
    chip: "border-sky-200 bg-sky-50/70 hover:border-sky-400 dark:border-sky-900 dark:bg-sky-950/30 dark:hover:border-sky-600",
    heroChip: "border-sky-200 bg-white/80 hover:border-sky-500 dark:border-sky-800 dark:bg-sky-950/40",
  },
  safety: {
    icon: HardHat,
    tile: "bg-emerald-600 text-white dark:bg-emerald-500",
    accent: "text-emerald-800 dark:text-emerald-300",
    card: "border-emerald-200 hover:border-emerald-400 dark:border-emerald-900 dark:hover:border-emerald-600",
    abbr: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-200",
    chip: "border-emerald-200 bg-emerald-50/70 hover:border-emerald-400 dark:border-emerald-900 dark:bg-emerald-950/30 dark:hover:border-emerald-600",
    heroChip: "border-emerald-200 bg-white/80 hover:border-emerald-500 dark:border-emerald-800 dark:bg-emerald-950/40",
  },
  electrical: {
    icon: Zap,
    tile: "bg-amber-500 text-white dark:bg-amber-500",
    accent: "text-amber-800 dark:text-amber-300",
    card: "border-amber-200 hover:border-amber-400 dark:border-amber-900 dark:hover:border-amber-600",
    abbr: "bg-amber-100 text-amber-900 dark:bg-amber-900/60 dark:text-amber-100",
    chip: "border-amber-200 bg-amber-50/70 hover:border-amber-400 dark:border-amber-900 dark:bg-amber-950/30 dark:hover:border-amber-600",
    heroChip: "border-amber-200 bg-white/80 hover:border-amber-500 dark:border-amber-800 dark:bg-amber-950/40",
  },
  construction: {
    icon: Building2,
    tile: "bg-orange-600 text-white dark:bg-orange-500",
    accent: "text-orange-800 dark:text-orange-300",
    card: "border-orange-200 hover:border-orange-400 dark:border-orange-900 dark:hover:border-orange-600",
    abbr: "bg-orange-100 text-orange-900 dark:bg-orange-900/60 dark:text-orange-100",
    chip: "border-orange-200 bg-orange-50/70 hover:border-orange-400 dark:border-orange-900 dark:bg-orange-950/30 dark:hover:border-orange-600",
    heroChip: "border-orange-200 bg-white/80 hover:border-orange-500 dark:border-orange-800 dark:bg-orange-950/40",
  },
  money: {
    icon: Landmark,
    tile: "bg-rose-600 text-white dark:bg-rose-500",
    accent: "text-rose-800 dark:text-rose-300",
    card: "border-rose-200 hover:border-rose-400 dark:border-rose-900 dark:hover:border-rose-600",
    abbr: "bg-rose-100 text-rose-800 dark:bg-rose-900/60 dark:text-rose-200",
    chip: "border-rose-200 bg-rose-50/70 hover:border-rose-400 dark:border-rose-900 dark:bg-rose-950/30 dark:hover:border-rose-600",
    heroChip: "border-rose-200 bg-white/80 hover:border-rose-500 dark:border-rose-800 dark:bg-rose-950/40",
  },
};
