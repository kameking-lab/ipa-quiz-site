import { ArrowUpRight, CalendarClock } from "lucide-react";

export function HomeScheduleLink() {
  return (
    <section aria-labelledby="home-schedule-title" className="mt-8 rounded-2xl border border-indigo-200 bg-indigo-50 p-5 dark:border-indigo-900 dark:bg-indigo-950/30">
      <div className="flex items-start gap-3">
        <CalendarClock className="mt-0.5 h-6 w-6 shrink-0 text-indigo-700 dark:text-indigo-300" aria-hidden="true" />
        <div>
          <h2 id="home-schedule-title" className="text-lg font-bold">試験日と申込締切を確認</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            試験日程は「次の資格」にまとめています。資格を探して、日程と申込期間を確認できます。
          </p>
          <a
            href="https://tsugino-shikaku.jp/calendar"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex min-h-11 items-center gap-2 rounded-xl bg-indigo-700 px-4 text-sm font-semibold text-white hover:bg-indigo-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2"
          >
            次の資格の日程カレンダーへ
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm">
            <a href="https://tsugino-shikaku.jp/shikaku/itpassport" className="text-indigo-800 underline underline-offset-4 dark:text-indigo-200">
              ITパスポートの日程
            </a>
            <a href="https://tsugino-shikaku.jp/shikaku/ap" className="text-indigo-800 underline underline-offset-4 dark:text-indigo-200">
              応用情報の日程
            </a>
            <a href="https://tsugino-shikaku.jp/shikaku/sc" className="text-indigo-800 underline underline-offset-4 dark:text-indigo-200">
              情報処理安全確保支援士の日程
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
