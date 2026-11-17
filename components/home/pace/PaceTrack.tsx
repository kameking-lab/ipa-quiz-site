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
    <svg viewBox="0 0 320 184" className="mx-auto h-[174px] w-full overflow-visible sm:h-[192px]" role="img" aria-label={`進み具合${Math.round(percent)}%、${target === null ? "受験日未設定" : `今日の目標${Math.round(target)}%`}`}>
      {deadline && bandEnd > bandStart && <g><rect x={x(bandStart)} y="12" width={x(bandEnd) - x(bandStart)} height="15" rx="7" className="fill-amber-100 dark:fill-amber-900" /><text x={(x(bandStart) + x(bandEnd)) / 2} y="23" textAnchor="middle" fontSize="9" className="fill-amber-800 dark:fill-amber-200">申込{plan.registration?.estimated ? "（予定）" : "期間"}</text></g>}
      <line x1="30" y1="128" x2="290" y2="128" strokeWidth="5" strokeLinecap="round" className="stroke-muted" />
      <line x1="30" y1="128" x2={x(percent)} y2="128" strokeWidth="5" strokeLinecap="round" className="stroke-primary" />
      {!passing.isDefault && passing.sourceUrl && <g><line x1={x(passing.percent)} x2={x(passing.percent)} y1="123" y2="135" className="stroke-muted-foreground" /><text x={x(passing.percent)} y="151" fontSize="10" textAnchor="middle" className="fill-muted-foreground">{passing.conditions?.includes("IRT") ? "基準点" : "合格ライン"}</text></g>}
      {target !== null && <g><line x1={x(target)} x2={x(target)} y1="35" y2="125" strokeDasharray="3 4" className="stroke-amber-500" /><path d={`M${x(target)} 35 l17 0 -4 7 4 7 -17 0z`} className="fill-amber-400" /><text x={Math.max(58, Math.min(262, x(target)))} y="30" textAnchor="middle" fontSize="11" className="fill-muted-foreground">今日の目標</text></g>}
      <g className="origin-center [transform-box:fill-box] motion-safe:animate-[reward-rest_1.8s_ease-in-out_infinite] motion-reduce:animate-none"><image href={qualificationStudyArt(plan.exam)} onError={e => { if (e.currentTarget.getAttribute("href") !== "/mascot/chihuahua-study.webp") e.currentTarget.setAttribute("href", "/mascot/chihuahua-study.webp"); }} x={x(percent) - 42} y="51" width="84" height="84" /></g>
      <path d="M290 128V100m0 0c6-5 12 5 18 0v14c-6 5-12-5-18 0" fill="none" strokeWidth="2" className="stroke-primary" />
      <text x="30" y="174" fontSize="11" className="fill-muted-foreground">スタート</text><text x="290" y="174" textAnchor="end" fontSize="11" className="fill-muted-foreground">試験日</text>
    </svg>
  </button>;
}
