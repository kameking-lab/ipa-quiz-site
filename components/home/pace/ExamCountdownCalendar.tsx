import type { HomeCalendar } from "@/lib/study-plan/home";
import type { ExamDateSource } from "@/lib/study-plan/pace";
import styles from "./HomePace.module.css";

const labels = {
  start: "申込開始まで",
  deadline: "申込締切まで",
  exam: "試験まで",
};

const weekday = new Intl.DateTimeFormat("ja-JP", { weekday: "short", timeZone: "UTC" });

export function CountdownDate({ date, qualifier }: { date: string; qualifier?: string }) {
  const [, month, day] = date.split("-");
  return <>
    <time dateTime={date}>{Number(month)}/{Number(day)}（{weekday.format(new Date(`${date}T00:00:00Z`))}）</time>
    {qualifier && <small className={styles.calendarEstimate}>{qualifier}</small>}
  </>;
}

export function countdownQualifier(source?: ExamDateSource, basisYear?: number) {
  if (source === "tentative") return "（予定）";
  if (source === "estimated" || basisYear !== undefined) return "（見込み）";
}

function CalendarCard({ target }: { target: HomeCalendar["primary"] }) {
  const source = target.kind === "exam" ? target.examDateSource : undefined;
  const examToday = target.kind === "exam" && target.days === 0 && source !== "estimated";
  return <div className={styles.calendarPaper} data-countdown={target.kind}>
    <span className={styles.calendarBinding} aria-hidden="true" />
    <h2 className={styles.calendarHeading}>
      {examToday ? <span className={styles.calendarToday}>{source === "tentative" ? "今日が試験予定日" : "今日が受験日"}</span> : <>
        <span className={styles.calendarLabel}>{labels[target.kind]}{countdownQualifier(source, target.basisYear)}</span>
        <span className={styles.calendarCount}>あと <strong>{target.days}</strong> 日</span>
      </>}
    </h2>
    <p className={styles.calendarPrimaryDate}><CountdownDate date={target.date} /></p>
  </div>;
}

export function ExamCountdownCalendar({ primary, secondary }: HomeCalendar) {
  const secondCard = secondary?.kind === "exam" ? secondary : null;
  return <div className={styles.calendar} data-home-calendar>
    <div className={styles.calendarCards}>
      <CalendarCard target={primary} />
      {secondCard && <CalendarCard target={secondCard} />}
    </div>
    {secondary?.kind === "registered" && <p className={styles.calendarSecondaryDate}>申込済み</p>}
    {secondary?.kind === "deadline" && <p className={styles.calendarSecondaryDate}>
      <span>申込締切</span> <CountdownDate date={secondary.date} qualifier={countdownQualifier(undefined, secondary.basisYear)} />
    </p>}
  </div>;
}
