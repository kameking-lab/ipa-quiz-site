import type { StudyPresenceSnapshot, StudyPresenceToday } from "@/lib/study-presence";

export function StudyRoomAttendance({ attendance, current, className }: {
  attendance: StudyPresenceSnapshot | StudyPresenceToday;
  current: boolean;
  className?: string;
}) {
  const daily = "activeCount" in attendance;
  return <p data-testid="study-room-total" className={className}>
    {daily ? "今日 " : current ? "いま" : "前回"}<strong>{attendance.count.toLocaleString("ja-JP")}</strong>人が勉強
    {daily && current && `（うち${attendance.activeCount.toLocaleString("ja-JP")}人がいま勉強中）`}
  </p>;
}
