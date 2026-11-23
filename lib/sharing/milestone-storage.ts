import { jstDateString } from "@/lib/streak/core";
import { readStreak } from "@/lib/streak/storage";
import { dayNumber } from "@/lib/study-plan/pace";
import { getHeatmapMap } from "@/lib/motivation/heatmap";
import { readInstallNudge } from "@/lib/pwa/install-nudge";
import { LS_KEYS } from "@/lib/storage/keys";
import { canOfferAchievement } from "./milestones";

export function initializeStudyMilestones(today = jstDateString()): boolean {
  try {
    let first = localStorage.getItem(LS_KEYS.achievementFirstDay);
    if (!first) {
      const previous = [readStreak().lastStudyDate, ...Object.keys(getHeatmapMap())]
        .filter((day): day is string => !!day && dayNumber(day) !== null && day < today).sort()[0];
      first = previous ?? today;
      localStorage.setItem(LS_KEYS.achievementFirstDay, first);
    }
    return canOfferAchievement(first, today);
  } catch { return false; }
}

export function countGoalDay(today: string): number {
  try {
    const record = JSON.parse(localStorage.getItem(LS_KEYS.achievementGoalDays) ?? "null");
    const count = Number.isInteger(record?.count) ? Math.min(3, Math.max(0, record.count)) : 0;
    if (typeof record?.day === "string" && record.day >= today) return record.day === today ? count : 0;
    const next = Math.min(3, count + 1);
    localStorage.setItem(LS_KEYS.achievementGoalDays, JSON.stringify({ day: today, count: next }));
    return next;
  } catch { return 0; }
}

export function hasCardToday(today = jstDateString(new Date(Date.now()))): boolean {
  try { return localStorage.getItem(LS_KEYS.achievementCardDay) === today; }
  catch { return false; }
}

export function shownStreakToday(today: string): boolean {
  try { return localStorage.getItem(LS_KEYS.achievementStreakDay) === today; }
  catch { return true; }
}

export function reserveStudyCard(today: string, streak: boolean): boolean {
  try {
    const install = readInstallNudge();
    if (!install || install.shownDay === today || (streak && shownStreakToday(today))) return false;
    if (streak) localStorage.setItem(LS_KEYS.achievementStreakDay, today);
    localStorage.setItem(LS_KEYS.achievementCardDay, today);
    window.dispatchEvent(new Event("study-card:shown"));
    return true;
  } catch { return false; }
}
