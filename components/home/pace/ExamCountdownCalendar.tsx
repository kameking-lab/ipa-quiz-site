import type { HomeCalendar } from "@/lib/study-plan/home";
import styles from "./HomePace.module.css";

const labels = {
  start: { until: "申込開始まで", event: "開始", secondary: "申込開始" },
  deadline: { until: "申込締切まで", event: "締切", secondary: "申込締切" },
  exam: { until: "試験まで", event: "試験", secondary: "試験" },
};

const weekday = new Intl.DateTimeFormat("ja-JP", { weekday: "short", timeZone: "UTC" });

function CalendarDate({ date, basisYear, suffix }: Pick<HomeCalendar["primary"], "date" | "basisYear"> & { suffix?: string }) {
  const [, month, day] = date.split("-");
  return <>
    <time dateTime={date}>{Number(month)}/{Number(day)}（{weekday.format(new Date(`${date}T00:00:00Z`))}）</time>
    {suffix && <span>{suffix}</span>}
    {basisYear !== undefined && <small className={styles.calendarEstimate}>（見込み）</small>}
  </>;
}

export function ExamCountdownCalendar({ primary, secondary }: HomeCalendar) {
  const label = labels[primary.kind];
  const examToday = primary.kind === "exam" && primary.days === 0 && primary.basisYear === undefined;
  return <div className={styles.calendar} data-home-calendar>
    <div className={styles.calendarPaper}>
      <span className={styles.calendarBinding} aria-hidden="true" />
      <h1 className={styles.calendarHeading}>
        {examToday ? <span className={styles.calendarToday}>今日が試験日</span> : <>
          <span className={styles.calendarLabel}>{label.until}</span>
          <span className={styles.calendarCount}>あと <strong>{primary.days}</strong> 日</span>
        </>}
      </h1>
      <p className={styles.calendarPrimaryDate}>
        <CalendarDate {...primary} suffix={label.event} />
      </p>
    </div>
    {secondary && <p className={styles.calendarSecondaryDate}>
      <span>{labels[secondary.kind].secondary}</span> <CalendarDate {...secondary} />
    </p>}
  </div>;
}
