"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { canonicalPresenceExam, presenceExamName } from "@/lib/study-presence";
import type { MeasuredPresence } from "@/lib/study-presence-contract";
import { EMPTY_STUDY_ROOM_MESSAGE } from "@/lib/home/study-room";
import { NO_CAFE_POSES, type CafeOccupant } from "@/lib/home/study-room-cafe-mascots";
import { readLastQuestion } from "@/lib/storage/last-question";
import { listExamLearningSummaries } from "@/lib/exam-library-session";
import { EXAM_CONFIGS } from "@/lib/exam-config";
import { QualificationSelect } from "@/components/qualifications/QualificationSelect";
import { StudyRoomAttendance } from "./StudyRoomAttendance";
import { CafeMascotImage, StudyRoomCafeScene } from "./StudyRoomCafeScene";
import { StudyRoomSeat, type StudyRoomSeatDetail } from "./StudyRoomSeat";
import { useStudyRoomCafe } from "./useStudyRoomCafe";
import styles from "./StudyRoomCafeScene.module.css";

interface Suggestion { name: string; href: string; exam?: string }
const EMPTY_DETAILS: readonly StudyRoomSeatDetail[] = [];

export function StudyRoom({ snapshot, suggestions, current = false, exam, standalone = false, seatDetails = EMPTY_DETAILS, poseFiles = NO_CAFE_POSES }: {
  snapshot: MeasuredPresence | null;
  suggestions: readonly Suggestion[];
  current?: boolean;
  exam?: string;
  standalone?: boolean;
  /** Integration slot for server-supplied anonymous metadata. */
  seatDetails?: readonly StudyRoomSeatDetail[];
  poseFiles?: readonly string[];
}) {
  const [ownExam, setOwnExam] = useState<string | null>(null);
  const [chosenExam, setChosenExam] = useState<string>();
  const selectedExam = chosenExam ?? ((exam && canonicalPresenceExam(exam)) || ownExam);
  useEffect(() => {
    const last = readLastQuestion();
    const paper = listExamLearningSummaries().find(item => item.answered > 0);
    const code = paper && (!last || Date.parse(paper.updatedAt) > last.answeredAt) ? paper.examId : last?.exam;
    setOwnExam(code ? canonicalPresenceExam(code) : null);
  }, []);

  const attendance = snapshot?.today ?? snapshot;
  const firstToday = current && snapshot?.today?.count === 0;
  const { day, room, count, occupants, hidden } = useStudyRoomCafe(attendance, current, poseFiles);
  const detailByKey = useMemo(() => new Map(seatDetails.map(detail => [`${detail.exam}:${detail.index}`, detail])), [seatDetails]);
  const [inspected, setInspected] = useState<string | null>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const focusedSeat = useRef<string | null>(null);
  const inspectedSeat = occupants.find(seat => seat.key === inspected);
  const inspectedDetail = inspectedSeat && detailByKey.get(inspectedSeat.key);
  if (inspected && !inspectedSeat) setInspected(null);
  useEffect(() => {
    if (focusedSeat.current && !occupants.some(seat => seat.key === focusedSeat.current)) {
      sceneRef.current?.focus();
      focusedSeat.current = null;
    }
  }, [occupants]);

  const suggestion = suggestions.find(item => item.exam && (item.exam === selectedExam || canonicalPresenceExam(item.exam) === selectedExam));
  const href = selectedExam && Object.hasOwn(EXAM_CONFIGS, selectedExam)
    ? `/quiz?mode=random&exam=${encodeURIComponent(selectedExam)}` : suggestion?.href ?? "/search";
  const emptyMessage = !snapshot ? "勉強中の人数を表示できません"
    : firstToday ? EMPTY_STUDY_ROOM_MESSAGE : !current ? "前回は勉強中の人はいませんでした" : undefined;

  function renderSeat(seat: CafeOccupant) {
    return <StudyRoomSeat name={presenceExamName(seat.exam) ?? seat.exam} index={seat.index} mascot={seat.mascot}
      detail={detailByKey.get(seat.key)} inspected={inspected === seat.key}
      onFocus={() => { focusedSeat.current = seat.key; }} onBlur={() => { focusedSeat.current = null; }}
      onInspect={() => setInspected(current => current === seat.key ? null : seat.key)} />;
  }

  const Heading = standalone ? "h1" : "h2";
  return <div className="mx-auto w-full min-w-0 max-w-[800px] space-y-3 sm:space-y-4">
    <header className="flex min-w-0 flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
      <Heading id="study-room-title" className="text-xl font-bold tracking-tight">チワワの自習室</Heading>
      {room && <p className="text-xs text-muted-foreground">{room.name}</p>}
    </header>
    {attendance && !firstToday && <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1 text-sm text-muted-foreground tabular-nums">
      <StudyRoomAttendance attendance={attendance} current={current} className="[&>strong]:text-foreground" />
      {hidden > 0 && <span className="ml-auto font-semibold text-foreground">＋{hidden.toLocaleString("ja-JP")}人</span>}
    </div>}
    <StudyRoomCafeScene day={day} occupants={occupants} sceneRef={sceneRef} renderSeat={renderSeat}
      emptyMessage={count === 0 ? emptyMessage : undefined} />
    <div aria-live="polite" className="empty:sr-only">
      {inspectedSeat && <div className="flex min-w-0 items-center gap-3 rounded-xl bg-muted/60 px-3 py-2" data-testid="study-room-inspected">
        <div className={styles.portrait}><CafeMascotImage mascot={inspectedSeat.mascot} /></div>
        <div className="min-w-0 text-sm">
          <p className="font-semibold">{presenceExamName(inspectedSeat.exam)}</p>
          <p className="mt-1 text-xs text-muted-foreground">{inspectedSeat.mascot.label}</p>
          {inspectedDetail?.todayAnswers !== undefined && <p className="mt-1 text-xs tabular-nums">今日{inspectedDetail.todayAnswers}問</p>}
        </div>
      </div>}
    </div>
    {snapshot && !current && <p className="text-right text-xs text-muted-foreground"><time dateTime={snapshot.measuredAt}>{new Date(snapshot.measuredAt).toLocaleString("ja-JP", { month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit", timeZone: "Asia/Tokyo" })}</time> 時点</p>}
    {standalone && suggestions.length > 0 && <details className="rounded-xl border border-border px-3">
      <summary className="min-h-11 cursor-pointer py-3 text-sm font-medium">資格を選ぶ</summary>
      <QualificationSelect items={suggestions.flatMap(item => item.exam ? [{ key: item.exam, name: item.name }] : [])}
        value={suggestion?.exam ?? ""} onChange={setChosenExam} label="資格" emptyLabel="資格を選ぶ" className="pb-3 text-sm font-medium"
        fieldClass="mt-1 block min-h-11 w-full min-w-0 rounded-lg border border-border bg-background px-2 text-base" />
    </details>}
    {(chosenExam !== "" || !standalone) && <Link href={href} className="flex min-h-12 items-center justify-center rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground outline-offset-2 hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-primary">席について解く</Link>}
  </div>;
}
