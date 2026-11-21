"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { EMPTY_STUDY_ROOM_MESSAGE, HOME_ROOM_VISIBLE_LIMIT, measuredRoom, presenceSeatMascot, SLEEPING_ROOM_MASCOT } from "@/lib/home/study-room";
import { presenceExamName } from "@/lib/study-presence";
import { useStudyRoomPresence } from "../useStudyRoomPresence";
import styles from "./HomeStudyRoom.module.css";

const EXAM_CHIP_LIMIT = 6;
const number = (count: number) => count.toLocaleString("ja-JP");
const time = new Intl.DateTimeFormat("ja-JP", { timeZone: "Asia/Tokyo", hour: "numeric", minute: "2-digit", hourCycle: "h23" });

export function HomeStudyRoom() {
  const { snapshot, current } = useStudyRoomPresence();
  const daily = snapshot?.today;
  const attendance = daily ?? (current ? snapshot : null);
  const room = attendance && measuredRoom(attendance, HOME_ROOM_VISIBLE_LIMIT);
  const seats = room?.seats ?? [];
  const rowCount = seats.length > 20 ? 3 : seats.length > 5 ? 2 : 1;
  const columns = Math.ceil(seats.length / rowCount);
  const examRows = attendance?.exams ?? [];
  const otherExams = examRows.length - EXAM_CHIP_LIMIT;

  return <Link href="/study-room" prefetch={false} data-study-presence-viewer data-testid="home-study-room"
    aria-labelledby="home-study-room-title" className={`${styles.card} study-focus`}>
    <div className={styles.header}>
      <h2 id="home-study-room-title">チワワの自習室</h2>
      <ChevronRight aria-hidden="true" className={styles.arrow} />
    </div>
    {attendance && <p className={styles.attendance}>
      <span>{daily ? "今日 " : "いま "}<strong>{number(attendance.count)}</strong>人</span>
      {daily && snapshot && (current
        ? <span className={styles.now}><i aria-hidden="true" />いま {number(daily.activeCount)}人</span>
        : <time dateTime={snapshot.measuredAt} className={styles.timestamp}>{time.format(Date.parse(snapshot.measuredAt))} 時点</time>)}
    </p>}
    <div className={styles.scene} data-testid="home-study-room-scene" data-rows={rowCount}>
      {seats.length ? <div className={styles.seats} aria-hidden="true">
        {Array.from({ length: rowCount }, (_, row) => <div key={row} className={styles.row}>
          {seats.slice(row * columns, (row + 1) * columns).map(seat => {
            const mascot = presenceSeatMascot(seat.exam, seat.index, seat.active);
            return <span key={`${seat.exam}:${seat.index}`} className={styles.seat} data-testid="home-study-room-seat" data-exam={seat.exam} data-studying-now={current && seat.active}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={mascot.src} alt="" width={80} height={80} loading="lazy" decoding="async" className={mascot.mirrored ? styles.mirrored : undefined} />
            </span>;
          })}
        </div>)}
      </div> : <div className={styles.empty}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={SLEEPING_ROOM_MASCOT} alt="" width={78} height={78} loading="lazy" decoding="async" data-testid="home-study-room-sleeper" />
        {daily?.count === 0 && current && <p>{EMPTY_STUDY_ROOM_MESSAGE}</p>}
      </div>}
      {room && room.hidden > 0 && <span className={styles.overflow}>＋{number(room.hidden)}人</span>}
    </div>
    {examRows.length > 0 && <ul aria-label="自習室の資格" className={styles.exams}>
      {examRows.slice(0, EXAM_CHIP_LIMIT).map(row => <li key={row.exam}>
        <span>{presenceExamName(row.exam)}</span><strong>{number(row.count)}人</strong>
      </li>)}
      {otherExams > 0 && <li>ほか{number(otherExams)}資格</li>}
    </ul>}
  </Link>;
}
