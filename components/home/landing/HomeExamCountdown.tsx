import Link from "next/link";
import { CalendarClock, ExternalLink } from "lucide-react";
import {
  HOME_EXAM_SCHEDULE_CHECKED_AT,
  formatMonthDay,
  type HomeExamEventView,
} from "@/lib/home/exam-schedule";

function StatusBadge({ event }: { event: HomeExamEventView }) {
  if (event.status.phase === "ongoing") {
    return (
      <span className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-2xl bg-rose-600 text-white shadow-sm">
        <span className="text-[10px] font-semibold leading-none">期間中</span>
        <span className="mt-1 text-sm font-bold leading-none">実施中</span>
      </span>
    );
  }
  const tone = event.kind === "stop"
    ? "bg-zinc-800 text-white dark:bg-zinc-200 dark:text-zinc-900"
    : "bg-indigo-600 text-white";
  return (
    <span className={`flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-2xl shadow-sm ${tone}`}>
      <span className="text-[10px] font-semibold leading-none">あと</span>
      <span className="mt-0.5 text-2xl font-bold leading-none tabular-nums">{event.status.daysLeft}</span>
      <span className="mt-0.5 text-[10px] font-semibold leading-none">日</span>
    </span>
  );
}

function dateText(event: HomeExamEventView): string {
  if (event.kind === "stop") return `${formatMonthDay(event.start)}から`;
  return event.end ? `${formatMonthDay(event.start)}〜${formatMonthDay(event.end)}` : formatMonthDay(event.start);
}

export function HomeExamCountdown({ events }: { events: readonly HomeExamEventView[] }) {
  if (events.length === 0) return null;
  const [year, month, day] = HOME_EXAM_SCHEDULE_CHECKED_AT.split("-").map(Number);
  return (
    <section aria-labelledby="home-countdown-title" className="mt-8">
      <div className="mb-3 flex items-end justify-between gap-3">
        <h2 id="home-countdown-title" className="flex items-center gap-2 text-lg font-bold sm:text-xl">
          <CalendarClock className="h-5 w-5 text-indigo-600 dark:text-indigo-300" aria-hidden="true" />
          試験日が近い資格
        </h2>
      </div>
      <ul className="grid gap-3 md:grid-cols-2">
        {events.map((event) => (
          <li key={event.id} className="flex gap-3 rounded-2xl border border-border bg-card p-3.5 shadow-sm sm:p-4">
            <StatusBadge event={event} />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold leading-snug">{event.name}</p>
              <p className="mt-0.5 text-sm">
                <span className="font-semibold text-indigo-700 dark:text-indigo-300">{event.eventLabel}</span>
                <span className="ml-1.5 tabular-nums">{dateText(event)}</span>
              </p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{event.note}</p>
              <div className="mt-2 flex flex-wrap items-center gap-1.5">
                {event.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="inline-flex min-h-9 items-center rounded-full border border-indigo-200 bg-indigo-50 px-3 text-xs font-semibold text-indigo-800 hover:border-indigo-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:border-indigo-900 dark:bg-indigo-950/50 dark:text-indigo-200"
                  >
                    {link.label}
                  </Link>
                ))}
                <a
                  href={event.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-9 items-center gap-1 px-1 text-[11px] text-muted-foreground underline hover:text-foreground"
                >
                  公式日程（{event.sourceLabel}）
                  <ExternalLink className="h-3 w-3" aria-hidden="true" />
                  <span className="sr-only">（新しいタブで開きます）</span>
                </a>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">
        日程は{year}年{month}月{day}日に各実施機関の公式ページで確認したものです。変更される場合があるため、申込前に必ず公式ページをご確認ください。
      </p>
    </section>
  );
}
