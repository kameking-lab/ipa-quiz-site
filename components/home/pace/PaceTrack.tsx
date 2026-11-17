import { passingLineForExam } from "@/lib/study-plan/policy";
import { qualificationStudyArt } from "@/lib/home/study-room";
import type { PacePlan } from "@/lib/study-plan/pace";

// SVG coordinates allow percentage positions without inline style or generated Tailwind classes.
export function PaceTrack({ plan, percent, target, onOpen }: { plan: PacePlan; percent: number; target: number | null; onOpen: () => void }) {
  const x = (value: number) => 30 + Math.max(0, Math.min(100, value)) * 2.6;
  const passing = passingLineForExam(plan.exam);
  const start = plan.registration?.start;
  const deadline = plan.registration?.deadline;
  const span = plan.examDate ? Date.parse(plan.examDate) - Date.parse(plan.startDate) : 0;
  const at = (date: string) => span > 0 ? Math.max(0, Math.min(100, (Date.parse(date) - Date.parse(plan.startDate)) * 100 / span)) : 0;
  const bandStart = start ? at(start) : 0, bandEnd = deadline ? at(deadline) : 0;
  return <button type="button" onClick={onOpen} aria-label="学習計画の詳細を開く" className="block w-full rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
    <svg viewBox="0 0 320 132" className="w-full overflow-visible" role="img" aria-label={`進み具合${Math.round(percent)}%、今日の目標${Math.round(target ?? 0)}%`}>
      {deadline && bandEnd > bandStart && <g><rect x={x(bandStart)} y="12" width={x(bandEnd) - x(bandStart)} height="15" rx="7" className="fill-amber-100 dark:fill-amber-900" /><text x={(x(bandStart) + x(bandEnd)) / 2} y="23" textAnchor="middle" fontSize="9" className="fill-amber-800 dark:fill-amber-200">申込{plan.registration?.estimated ? "（予定）" : "期間"}</text></g>}
      <line x1="30" y1="85" x2="290" y2="85" strokeWidth="5" strokeLinecap="round" className="stroke-muted" />
      <line x1="30" y1="85" x2={x(percent)} y2="85" strokeWidth="5" strokeLinecap="round" className="stroke-emerald-500" />
      {!passing.isDefault && passing.sourceUrl && <g><line x1={x(passing.percent)} x2={x(passing.percent)} y1="80" y2="92" className="stroke-muted-foreground" /><text x={x(passing.percent)} y="106" fontSize="9" textAnchor="middle" className="fill-muted-foreground">{passing.conditions?.includes("IRT") ? "基準点" : "合格ライン"}</text></g>}
      {target !== null && <g><line x1={x(target)} x2={x(target)} y1="39" y2="82" className="stroke-amber-500" /><path d={`M${x(target)} 39 l17 0 -4 7 4 7 -17 0z`} className="fill-amber-400" /><text x={Math.max(58, Math.min(262, x(target)))} y="35" textAnchor="middle" fontSize="10" className="fill-muted-foreground">今日の目標</text></g>}
      <g className="motion-safe:animate-[bounce_1.8s_infinite] motion-reduce:animate-none"><image href={qualificationStudyArt(plan.exam)} x={x(percent) - 27} y="38" width="54" height="54" /></g>
      <circle cx="290" cy="85" r="5" className="fill-emerald-600" />
      <text x="30" y="125" fontSize="10" className="fill-muted-foreground">スタート</text><text x="290" y="125" textAnchor="end" fontSize="10" className="fill-muted-foreground">試験日</text>
    </svg>
  </button>;
}
