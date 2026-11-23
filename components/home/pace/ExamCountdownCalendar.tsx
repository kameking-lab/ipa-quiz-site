import type { HomeCalendar } from "@/lib/study-plan/home";
import styles from "./HomePace.module.css";

const labels = {
  start: { until: "申込開始まで", event: "開始", secondary: "申込開始" },
  deadline: { until: "申込締切まで", event: "締切", secondary: "申込締切" },
  exam: { until: "試験まで", event: "試験", secondary: "試験" },
};

const weekday = new Intl.DateTimeFormat("ja-JP", { weekday: "short", timeZone: "UTC" });

export function CountdownDate({ date, suffix, qualifier }: { date: string; suffix?: string; qualifier?: string }) {
  const [, month, day] = date.split("-");
  return <>
    <time dateTime={date}>{Number(month)}/{Number(day)}（{weekday.format(new Date(`${date}T00:00:00Z`))}）</time>
    {suffix && <span>{suffix}</span>}
    {qualifier && <small className={styles.calendarEstimate}>{qualifier}</small>}
  </>;
}

function dateQualifier(target: HomeCalendar["primary"] | Exclude<HomeCalendar["secondary"], { kind: "registered" } | null>) {
  const source = target.kind === "exam" ? target.examDateSource : undefined;
  if (source === "tentative") return "（予定）";
  if (source === "estimated" || target.basisYear !== undefined) return "（見込み）";
}

export function ExamCountdownCalendar({ primary, secondary }: HomeCalendar) {
  const label = labels[primary.kind];
  const source = primary.kind === "exam" ? primary.examDateSource : undefined;
  const legacy = primary.kind === "exam" && source === undefined;
  const examToday = primary.kind === "exam" && primary.days === 0 && source !== "estimated";
  const until = legacy ? "計画の受験日まで" : label.until;
  const today = legacy ? "計画の受験日" : source === "tentative" ? "今日が試験予定日" : "今日が受験日";
  return <div className={styles.calendar} data-home-calendar>
    <div className={styles.calendarPaper}>
      <span className={styles.calendarBinding} aria-hidden="true" />
      <h1 className={styles.calendarHeading}>
        {examToday ? <span className={styles.calendarToday}>{today}</span> : <>
          <span className={styles.calendarLabel}>{until}{dateQualifier(primary)}</span>
          <span className={styles.calendarCount}>あと <strong>{primary.days}</strong> 日</span>
        </>}
      </h1>
      <p className={styles.calendarPrimaryDate}>
        <CountdownDate date={primary.date} suffix={label.event} />
      </p>
    </div>
    {secondary && <p className={styles.calendarSecondaryDate}>
      {secondary.kind === "registered" ? "申込済み" : <>
        <span>{secondary.kind === "exam" && secondary.examDateSource === undefined
          ? "計画の受験日" : labels[secondary.kind].secondary}</span> <CountdownDate date={secondary.date} qualifier={dateQualifier(secondary)} />
      </>}
    </p>}
  </div>;
}
