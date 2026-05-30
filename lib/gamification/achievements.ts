import { LS_KEYS } from "@/lib/storage/keys";
import type { MockExamResult } from "@/lib/mock-exam/storage";
import { addGold, addXp } from "./economy";

export type Tier = "bronze" | "silver" | "gold" | "platinum" | "diamond";

export interface Achievement {
  id: string;
  tier: Tier;
  name: string;
  description: string;
  category: "study" | "streak" | "mock" | "ai" | "mastery" | "social";
  xp: number;
  gold: number;
}

export const TIER_META: Record<Tier, { label: string; color: string; emoji: string }> = {
  bronze: { label: "ブロンズ", color: "text-amber-700", emoji: "🥉" },
  silver: { label: "シルバー", color: "text-zinc-500", emoji: "🥈" },
  gold: { label: "ゴールド", color: "text-amber-500", emoji: "🥇" },
  platinum: { label: "プラチナ", color: "text-sky-500", emoji: "💠" },
  diamond: { label: "ダイヤ", color: "text-cyan-400", emoji: "💎" },
};

export const ACHIEVEMENTS: Achievement[] = [
  // ===== Study (15) =====
  { id: "study-first", tier: "bronze", name: "はじめの一歩", description: "最初の1問に解答", category: "study", xp: 20, gold: 10 },
  { id: "study-10", tier: "bronze", name: "学習開始", description: "通算10問解答", category: "study", xp: 30, gold: 20 },
  { id: "study-50", tier: "bronze", name: "50問突破", description: "通算50問解答", category: "study", xp: 50, gold: 30 },
  { id: "study-100", tier: "silver", name: "100問達成", description: "通算100問解答", category: "study", xp: 100, gold: 50 },
  { id: "study-300", tier: "silver", name: "300問達成", description: "通算300問解答", category: "study", xp: 200, gold: 100 },
  { id: "study-500", tier: "gold", name: "500問達成", description: "通算500問解答", category: "study", xp: 300, gold: 150 },
  { id: "study-1000", tier: "gold", name: "千問の戦士", description: "通算1,000問解答", category: "study", xp: 500, gold: 300 },
  { id: "study-2000", tier: "platinum", name: "二千問の賢者", description: "通算2,000問解答", category: "study", xp: 800, gold: 500 },
  { id: "study-5000", tier: "diamond", name: "五千問の伝説", description: "通算5,000問解答", category: "study", xp: 1500, gold: 1000 },
  { id: "acc-50", tier: "bronze", name: "勝率50%", description: "通算正答率50%超え (10問以上)", category: "study", xp: 50, gold: 30 },
  { id: "acc-60", tier: "silver", name: "合格圏内", description: "通算正答率60%超え (30問以上)", category: "study", xp: 100, gold: 50 },
  { id: "acc-70", tier: "gold", name: "上位陣入り", description: "通算正答率70%超え (50問以上)", category: "study", xp: 200, gold: 100 },
  { id: "acc-80", tier: "platinum", name: "達人の領域", description: "通算正答率80%超え (100問以上)", category: "study", xp: 400, gold: 250 },
  { id: "acc-90", tier: "diamond", name: "完璧主義者", description: "通算正答率90%超え (200問以上)", category: "study", xp: 800, gold: 500 },
  { id: "first-session-30", tier: "bronze", name: "集中30分", description: "1セッションで30問", category: "study", xp: 50, gold: 30 },

  // ===== Streak (10) =====
  { id: "streak-2", tier: "bronze", name: "2日連続", description: "2日連続学習", category: "streak", xp: 30, gold: 20 },
  { id: "streak-3", tier: "bronze", name: "3日坊主突破", description: "3日連続学習", category: "streak", xp: 50, gold: 30 },
  { id: "streak-7", tier: "silver", name: "1週間継続", description: "7日連続学習", category: "streak", xp: 100, gold: 50 },
  { id: "streak-14", tier: "silver", name: "2週間継続", description: "14日連続学習", category: "streak", xp: 200, gold: 100 },
  { id: "streak-30", tier: "gold", name: "1ヶ月継続", description: "30日連続学習", category: "streak", xp: 400, gold: 250 },
  { id: "streak-60", tier: "platinum", name: "2ヶ月継続", description: "60日連続学習", category: "streak", xp: 700, gold: 400 },
  { id: "streak-100", tier: "platinum", name: "100日達成", description: "100日連続学習", category: "streak", xp: 1200, gold: 700 },
  { id: "streak-180", tier: "diamond", name: "半年戦士", description: "180日連続学習", category: "streak", xp: 2000, gold: 1500 },
  { id: "streak-365", tier: "diamond", name: "1年戦士", description: "365日連続学習", category: "streak", xp: 5000, gold: 3000 },
  { id: "comeback", tier: "bronze", name: "おかえり", description: "中断後に再開", category: "streak", xp: 30, gold: 20 },

  // ===== Mock Exam (10) =====
  { id: "mock-first", tier: "bronze", name: "初模試", description: "模試を1回完走", category: "mock", xp: 100, gold: 50 },
  { id: "mock-3", tier: "silver", name: "模試3回", description: "模試を3回完走", category: "mock", xp: 200, gold: 100 },
  { id: "mock-10", tier: "gold", name: "模試10回", description: "模試を10回完走", category: "mock", xp: 500, gold: 300 },
  { id: "mock-pass-first", tier: "silver", name: "初合格", description: "模試で初の合格基準達成", category: "mock", xp: 200, gold: 150 },
  { id: "mock-pass-3", tier: "gold", name: "3回連続合格", description: "模試3回連続で合格基準達成", category: "mock", xp: 500, gold: 300 },
  { id: "mock-80", tier: "platinum", name: "模試80%", description: "模試で80%以上獲得", category: "mock", xp: 600, gold: 400 },
  { id: "mock-90", tier: "diamond", name: "模試90%", description: "模試で90%以上獲得", category: "mock", xp: 1000, gold: 700 },
  { id: "mock-perfect-cat", tier: "platinum", name: "分野制覇", description: "模試で全分野70%以上", category: "mock", xp: 700, gold: 500 },
  { id: "mock-fast", tier: "silver", name: "迅速回答", description: "模試を制限時間の70%以下で完走", category: "mock", xp: 200, gold: 100 },
  { id: "mock-allexam", tier: "diamond", name: "全試験模試制覇", description: "4試験以上で模試を完走", category: "mock", xp: 1500, gold: 1000 },

  // ===== AI (5) =====
  { id: "ai-first", tier: "bronze", name: "AI初質問", description: "AIコパイロットに初質問", category: "ai", xp: 30, gold: 20 },
  { id: "ai-50", tier: "silver", name: "AI活用50回", description: "AIに通算50回質問", category: "ai", xp: 150, gold: 80 },
  { id: "ai-200", tier: "gold", name: "AI活用200回", description: "AIに通算200回質問", category: "ai", xp: 400, gold: 250 },
  { id: "ai-quick-action", tier: "bronze", name: "クイックアクション", description: "クイックアクションを使用", category: "ai", xp: 20, gold: 10 },
  { id: "ai-multi-turn", tier: "silver", name: "深掘り対話", description: "1問で5往復以上の対話", category: "ai", xp: 100, gold: 50 },

  // ===== Mastery (8) =====
  { id: "mastery-cat-1", tier: "silver", name: "1分野マスター", description: "1分野で正答率80%超 (20問以上)", category: "mastery", xp: 150, gold: 80 },
  { id: "mastery-cat-3", tier: "gold", name: "3分野マスター", description: "3分野で正答率80%超 (各20問以上)", category: "mastery", xp: 400, gold: 250 },
  { id: "mastery-all-cat", tier: "diamond", name: "全分野マスター", description: "全分野で正答率80%超", category: "mastery", xp: 2000, gold: 1500 },
  { id: "no-wrong-10", tier: "silver", name: "10連勝", description: "10問連続正解", category: "mastery", xp: 100, gold: 50 },
  { id: "no-wrong-20", tier: "gold", name: "20連勝", description: "20問連続正解", category: "mastery", xp: 250, gold: 150 },
  { id: "no-wrong-50", tier: "diamond", name: "50連勝", description: "50問連続正解", category: "mastery", xp: 800, gold: 500 },
  { id: "review-clear", tier: "silver", name: "復習完遂", description: "復習モードを全問クリア", category: "mastery", xp: 200, gold: 100 },
  { id: "calculation-master", tier: "gold", name: "計算問題マスター", description: "計算問題のみで正答率80% (20問以上)", category: "mastery", xp: 300, gold: 200 },

  // ===== Social (2) =====
  { id: "premium", tier: "platinum", name: "Premium会員", description: "Premiumにアップグレード", category: "social", xp: 500, gold: 1000 },
  { id: "share-result", tier: "bronze", name: "成果シェア", description: "結果をシェア", category: "social", xp: 30, gold: 20 },
];

export interface UnlockedAchievement {
  id: string;
  unlockedAt: number;
}

interface AchievementStorage {
  unlocked: UnlockedAchievement[];
  bestStreakCorrect: number;
  consecutivePassedMocks: number;
}

// Factory (not a shared const): callers mutate the returned object in place
// (unlock pushes to .unlocked, evaluate* bump .bestStreakCorrect /
// .consecutivePassedMocks), so a shared constant would be permanently
// corrupted on the empty-storage path. Same footgun fixed in history.ts.
function emptyState(): AchievementStorage {
  return {
    unlocked: [],
    bestStreakCorrect: 0,
    consecutivePassedMocks: 0,
  };
}

function read(): AchievementStorage {
  if (typeof window === "undefined") return emptyState();
  try {
    const raw = window.localStorage.getItem(LS_KEYS.achievements);
    if (!raw) return emptyState();
    const parsed = JSON.parse(raw) as Partial<AchievementStorage>;
    return {
      unlocked: Array.isArray(parsed.unlocked) ? parsed.unlocked : [],
      bestStreakCorrect:
        typeof parsed.bestStreakCorrect === "number"
          ? parsed.bestStreakCorrect
          : 0,
      consecutivePassedMocks:
        typeof parsed.consecutivePassedMocks === "number"
          ? parsed.consecutivePassedMocks
          : 0,
    };
  } catch {
    return emptyState();
  }
}

function write(data: AchievementStorage): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(LS_KEYS.achievements, JSON.stringify(data));
  } catch {
    // ignore
  }
}

export function getUnlocked(): UnlockedAchievement[] {
  return read().unlocked;
}

export function isUnlocked(id: string): boolean {
  return read().unlocked.some((u) => u.id === id);
}

function unlock(ids: string[]): UnlockedAchievement[] {
  if (ids.length === 0) return [];
  const data = read();
  const have = new Set(data.unlocked.map((u) => u.id));
  const newly: UnlockedAchievement[] = [];
  for (const id of ids) {
    if (have.has(id)) continue;
    const a = ACHIEVEMENTS.find((x) => x.id === id);
    if (!a) continue;
    const u: UnlockedAchievement = { id, unlockedAt: Date.now() };
    data.unlocked.push(u);
    newly.push(u);
    addXp(a.xp);
    addGold(a.gold);
  }
  write(data);
  return newly;
}

export function evaluateAchievementsAfterAnswer(
  totalAnswered: number,
  totalCorrect: number,
  consecutiveCorrect: number,
): UnlockedAchievement[] {
  const ids: string[] = [];
  if (totalAnswered >= 1) ids.push("study-first");
  if (totalAnswered >= 10) ids.push("study-10");
  if (totalAnswered >= 50) ids.push("study-50");
  if (totalAnswered >= 100) ids.push("study-100");
  if (totalAnswered >= 300) ids.push("study-300");
  if (totalAnswered >= 500) ids.push("study-500");
  if (totalAnswered >= 1000) ids.push("study-1000");
  if (totalAnswered >= 2000) ids.push("study-2000");
  if (totalAnswered >= 5000) ids.push("study-5000");
  const acc = totalAnswered > 0 ? totalCorrect / totalAnswered : 0;
  if (acc >= 0.5 && totalAnswered >= 10) ids.push("acc-50");
  if (acc >= 0.6 && totalAnswered >= 30) ids.push("acc-60");
  if (acc >= 0.7 && totalAnswered >= 50) ids.push("acc-70");
  if (acc >= 0.8 && totalAnswered >= 100) ids.push("acc-80");
  if (acc >= 0.9 && totalAnswered >= 200) ids.push("acc-90");
  if (consecutiveCorrect >= 10) ids.push("no-wrong-10");
  if (consecutiveCorrect >= 20) ids.push("no-wrong-20");
  if (consecutiveCorrect >= 50) ids.push("no-wrong-50");

  const data = read();
  if (consecutiveCorrect > data.bestStreakCorrect) {
    data.bestStreakCorrect = consecutiveCorrect;
    write(data);
  }
  return unlock(ids);
}

export function evaluateAchievementsAfterStreak(
  currentStreak: number,
): UnlockedAchievement[] {
  const ids: string[] = [];
  if (currentStreak >= 2) ids.push("streak-2");
  if (currentStreak >= 3) ids.push("streak-3");
  if (currentStreak >= 7) ids.push("streak-7");
  if (currentStreak >= 14) ids.push("streak-14");
  if (currentStreak >= 30) ids.push("streak-30");
  if (currentStreak >= 60) ids.push("streak-60");
  if (currentStreak >= 100) ids.push("streak-100");
  if (currentStreak >= 180) ids.push("streak-180");
  if (currentStreak >= 365) ids.push("streak-365");
  return unlock(ids);
}

export function evaluateAchievementsAfterMock(
  result: MockExamResult,
): UnlockedAchievement[] {
  const ids: string[] = ["mock-first"];
  if (result.scorePct >= 80) ids.push("mock-80");
  if (result.scorePct >= 90) ids.push("mock-90");
  if (result.passed) ids.push("mock-pass-first");

  const allCatGood = Object.values(result.byCategory).every(
    (v) => v.correct / v.total >= 0.7,
  );
  if (allCatGood && Object.keys(result.byCategory).length > 1) {
    ids.push("mock-perfect-cat");
  }

  const data = read();
  if (result.passed) {
    data.consecutivePassedMocks++;
  } else {
    data.consecutivePassedMocks = 0;
  }
  if (data.consecutivePassedMocks >= 3) ids.push("mock-pass-3");
  write(data);
  return unlock(ids);
}

export function evaluateAi(totalAiCalls: number): UnlockedAchievement[] {
  const ids: string[] = ["ai-first"];
  if (totalAiCalls >= 50) ids.push("ai-50");
  if (totalAiCalls >= 200) ids.push("ai-200");
  return unlock(ids);
}

export function unlockManual(id: string): UnlockedAchievement[] {
  return unlock([id]);
}
