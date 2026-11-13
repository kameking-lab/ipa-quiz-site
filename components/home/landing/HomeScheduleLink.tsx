import { ArrowUpRight, CalendarClock } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export function HomeScheduleLink() {
  return (
    <section aria-labelledby="home-schedule-title" className="study-schedule">
      <div className="flex items-start gap-3 sm:items-center">
        <CalendarClock className="h-10 w-10 shrink-0 rounded-xl bg-[var(--study-paper)] p-2 text-[var(--study-action)]" aria-hidden="true" />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center justify-between gap-x-5 gap-y-3">
          <h2 id="home-schedule-title" className="text-base font-semibold">試験日と申込締切を確認</h2>
          <a
            href="https://tsugino-shikaku.jp/calendar"
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ variant: "outline", className: "study-schedule-action min-h-11 whitespace-normal text-left" })}
          >
            次の資格の日程カレンダーへ
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
          </div>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-xs text-[var(--study-action)]">
            <a href="https://tsugino-shikaku.jp/shikaku/itpassport" className="underline underline-offset-4">
              ITパスポートの日程
            </a>
            <a href="https://tsugino-shikaku.jp/shikaku/ap" className="underline underline-offset-4">
              応用情報の日程
            </a>
            <a href="https://tsugino-shikaku.jp/shikaku/sc" className="underline underline-offset-4">
              情報処理安全確保支援士の日程
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
