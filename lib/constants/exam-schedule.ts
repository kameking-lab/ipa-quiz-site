/**
 * IPA exam-date master. Centralises the approximate sitting dates so the
 * "次の試験まで N 日" countdown and any future schedule UI read from one place
 * and automatically roll to the next sitting once a date passes.
 *
 * IPA fixes exact dates each cycle; these are the long-standing approximations
 * (spring ≈ 3rd Sunday of April, autumn ≈ 2nd Sunday of October). Update the
 * month/day here when IPA publishes the precise date — see
 * logs/auto-update-pipeline-2026-05-23.md.
 *
 * Note: IP / SG / FE moved to year-round CBT, but the spring/autumn milestones
 * still anchor most learners' goals, so the countdown uses them as the default
 * target. Month is 0-indexed (Date.UTC convention).
 */
export interface ExamSitting {
  /** 0-indexed month (3 = April, 9 = October). */
  month: number;
  /** Day of month (approximate). */
  day: number;
  /** Season label. */
  season: "spring" | "autumn";
  /** Human label suffix. */
  label: string;
}

export const EXAM_SITTINGS: ExamSitting[] = [
  { month: 3, day: 21, season: "spring", label: "春期" },
  { month: 9, day: 14, season: "autumn", label: "秋期" },
];

/**
 * Return the nearest future exam sitting relative to `now`. Rolls into the
 * following year's spring once this year's autumn has passed.
 */
export function nextExamSitting(now: Date = new Date()): {
  date: Date;
  days: number;
  label: string;
} {
  const DAY_MS = 24 * 60 * 60 * 1000;
  // Count the countdown in JST calendar days so it flips at JST midnight (not
  // UTC) and an exam still reads "0 日" all through its own sitting day in Japan.
  // Comparing the raw instant with Math.ceil made the count one too high between
  // JST 00:00 and 09:00 (e.g. exam-day morning showed "あと1日"), and after JST
  // 09:00 on the sitting day it even rolled to the next sitting. Sitting dates
  // are authored as JST calendar dates and Date.UTC(...) pins them to 00:00Z of
  // that date, matching todayJstMs below.
  const jstYmd = new Date(now.getTime() + 9 * 60 * 60 * 1000).toISOString().slice(0, 10);
  const todayJstMs = Date.parse(`${jstYmd}T00:00:00Z`);
  const year = Number(jstYmd.slice(0, 4));

  const candidates: Array<{ date: Date; label: string }> = [];
  for (const yr of [year - 1, year, year + 1]) {
    for (const s of EXAM_SITTINGS) {
      candidates.push({
        date: new Date(Date.UTC(yr, s.month, s.day)),
        label: `${yr}年 ${s.label}`,
      });
    }
  }
  candidates.sort((a, b) => a.date.getTime() - b.date.getTime());
  const nearest =
    candidates.find((c) => c.date.getTime() >= todayJstMs) ??
    candidates[candidates.length - 1];
  const days = Math.max(0, Math.round((nearest.date.getTime() - todayJstMs) / DAY_MS));
  return { date: nearest.date, days, label: nearest.label };
}
