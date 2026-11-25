"use client";

import { EMPTY_STUDY_ROOM_MESSAGE } from "@/lib/home/study-room";
import { NO_CAFE_POSES } from "@/lib/home/study-room-cafe-mascots";
import { presenceExamName } from "@/lib/study-presence";
import { StudyRoomYesterday } from "@/components/home/StudyRoomYesterday";
import { StudyRoomAttendance } from "../StudyRoomAttendance";
import { StudyRoomCafeScene } from "../StudyRoomCafeScene";
import { useStudyRoomCafe } from "../useStudyRoomCafe";
import { useStudyRoomPresence } from "../useStudyRoomPresence";
import styles from "./HomeStudyRoom.module.css";

const EXAM_CHIP_LIMIT = 6;
// Allow for the count and chip padding when several Japanese labels occupy a narrow card.
const COMPACT_LABEL_LENGTH = 64;
const number = (count: number) => count.toLocaleString("ja-JP");
const time = new Intl.DateTimeFormat("ja-JP", { timeZone: "Asia/Tokyo", hour: "numeric", minute: "2-digit", hourCycle: "h23" });

export function HomeStudyRoom({ poseFiles = NO_CAFE_POSES }: { poseFiles?: readonly string[] }) {
  const { snapshot, current } = useStudyRoomPresence();
  const daily = snapshot?.today;
  const attendance = daily ?? (current ? snapshot : null);
  const firstToday = current && daily?.count === 0;
  const { day, occupants, hidden } = useStudyRoomCafe(attendance, current, poseFiles);
  const examRows = attendance?.exams ?? [];
  const chips = examRows.slice(0, EXAM_CHIP_LIMIT).map(row => ({ name: presenceExamName(row.exam) ?? row.exam, ...row }));
  const otherExams = examRows.length - chips.length;
  const longList = chips.reduce((length, chip) => length + chip.name.length, 0) > COMPACT_LABEL_LENGTH;

  return <section aria-label="チワワの自習室" data-study-presence-viewer data-testid="home-study-room"
    data-long-list={longList || undefined} className={styles.card}>
    {attendance && !firstToday && <div className={styles.attendance}>
      <StudyRoomAttendance attendance={attendance} current={current} />
      {daily && !current && <time dateTime={snapshot.measuredAt} className={styles.timestamp}>{time.format(Date.parse(snapshot.measuredAt))} 時点</time>}
      {hidden > 0 && <span className={styles.overflow}>＋{number(hidden)}人</span>}
    </div>}
    <StudyRoomYesterday snapshot={snapshot} current={current} />
    <StudyRoomCafeScene day={day} occupants={occupants} home
      emptyMessage={firstToday ? EMPTY_STUDY_ROOM_MESSAGE : undefined} />
    {chips.length > 0 && <ul aria-label="自習室の資格" className={styles.groups}>
      {chips.map(row => <li key={row.exam} className={styles.group}>
        <span>{row.name}</span><strong>{number(row.count)}人</strong>
      </li>)}
      {otherExams > 0 && <li className={styles.group}>ほか{number(otherExams)}資格</li>}
    </ul>}
  </section>;
}
