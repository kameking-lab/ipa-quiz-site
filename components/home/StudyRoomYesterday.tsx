import type { MeasuredPresence } from "@/lib/study-presence-contract";

export function StudyRoomYesterday({ snapshot, current }: { snapshot: MeasuredPresence | null; current: boolean }) {
  const count = snapshot?.yesterdayCount;
  if (!current || !snapshot?.today || snapshot.today.count >= 5 || !count) return null;
  return <p className="text-xs text-muted-foreground tabular-nums">きのうは{count.toLocaleString("ja-JP")}人が勉強</p>;
}
