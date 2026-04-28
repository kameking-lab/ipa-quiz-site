import { LS_KEYS } from "@/lib/storage/keys";

export type AchievementCategory =
  | "milestone"
  | "accuracy"
  | "streak"
  | "exam"
  | "challenge"
  | "ai"
  | "special";

export interface AchievementDef {
  id: string;
  name: string;
  description: string;
  icon: string; // emoji
  category: AchievementCategory;
  xpReward: number;
}

/**
 * 50 achievements covering quantity, accuracy, streaks, exam coverage,
 * daily challenge, AI usage, and special milestones.
 */
export const ACHIEVEMENTS: AchievementDef[] = [
  // milestone — answered count (10)
  { id: "first-step", name: "はじめの一歩", description: "1問解答する", icon: "👣", category: "milestone", xpReward: 50 },
  { id: "warmup", name: "ウォームアップ", description: "10問解答する", icon: "🔥", category: "milestone", xpReward: 100 },
  { id: "century", name: "百本ノック", description: "100問解答する", icon: "💯", category: "milestone", xpReward: 200 },
  { id: "marathoner", name: "マラソンランナー", description: "300問解答する", icon: "🏃", category: "milestone", xpReward: 300 },
  { id: "veteran", name: "ベテラン", description: "500問解答する", icon: "🎖️", category: "milestone", xpReward: 400 },
  { id: "thousand-questions", name: "千本桜", description: "1,000問解答する", icon: "🌸", category: "milestone", xpReward: 500 },
  { id: "two-thousand", name: "2000人組手", description: "2,000問解答する", icon: "⚔️", category: "milestone", xpReward: 700 },
  { id: "five-thousand", name: "5,000の頂", description: "5,000問解答する", icon: "🏔️", category: "milestone", xpReward: 1000 },
  { id: "scholar", name: "学者の道", description: "ユニーク 500 問解く", icon: "📚", category: "milestone", xpReward: 400 },
  { id: "encyclopedia", name: "百科事典", description: "ユニーク 1,500 問解く", icon: "📖", category: "milestone", xpReward: 800 },

  // accuracy (8)
  { id: "first-correct", name: "正解の喜び", description: "初めて正解する", icon: "✅", category: "accuracy", xpReward: 50 },
  { id: "ten-correct", name: "10連勝の予感", description: "正解 10 問達成", icon: "🎯", category: "accuracy", xpReward: 80 },
  { id: "fifty-correct", name: "実力派", description: "正解 50 問達成", icon: "🥉", category: "accuracy", xpReward: 150 },
  { id: "hundred-correct", name: "正解 100", description: "正解 100 問達成", icon: "🥈", category: "accuracy", xpReward: 250 },
  { id: "five-hundred-correct", name: "プロフェッショナル", description: "正解 500 問達成", icon: "🥇", category: "accuracy", xpReward: 500 },
  { id: "accuracy-70", name: "安定の70%", description: "総合正答率 70% 以上 (50問以上)", icon: "📈", category: "accuracy", xpReward: 200 },
  { id: "accuracy-80", name: "実力者", description: "総合正答率 80% 以上 (100問以上)", icon: "📊", category: "accuracy", xpReward: 400 },
  { id: "accuracy-90", name: "鬼神", description: "総合正答率 90% 以上 (200問以上)", icon: "🔮", category: "accuracy", xpReward: 800 },

  // streak (8)
  { id: "streak-3", name: "三日坊主突破", description: "3日連続学習", icon: "🌱", category: "streak", xpReward: 100 },
  { id: "streak-7", name: "1週間継続", description: "7日連続学習", icon: "📅", category: "streak", xpReward: 200 },
  { id: "streak-14", name: "2週間継続", description: "14日連続学習", icon: "🗓️", category: "streak", xpReward: 300 },
  { id: "streak-30", name: "1ヶ月継続", description: "30日連続学習", icon: "🏅", category: "streak", xpReward: 500 },
  { id: "streak-50", name: "鋼の意志", description: "50日連続学習", icon: "⚡", category: "streak", xpReward: 700 },
  { id: "streak-100", name: "百日修行", description: "100日連続学習", icon: "🐉", category: "streak", xpReward: 1500 },
  { id: "streak-200", name: "求道者", description: "200日連続学習", icon: "🧘", category: "streak", xpReward: 2000 },
  { id: "streak-365", name: "一年間皆勤", description: "365日連続学習", icon: "👑", category: "streak", xpReward: 5000 },

  // exam coverage (10)
  { id: "exam-ip", name: "ITパスポート踏破", description: "IP の問題を 50 問以上解く", icon: "🎫", category: "exam", xpReward: 200 },
  { id: "exam-sg", name: "セキュマネ踏破", description: "SG の問題を 50 問以上解く", icon: "🛡️", category: "exam", xpReward: 200 },
  { id: "exam-fe", name: "基本情報踏破", description: "FE の問題を 50 問以上解く", icon: "💻", category: "exam", xpReward: 250 },
  { id: "exam-ap", name: "応用情報踏破", description: "AP の問題を 100 問以上解く", icon: "🚀", category: "exam", xpReward: 400 },
  { id: "exam-st", name: "ストラテジスト", description: "ST の問題を 30 問以上解く", icon: "♟️", category: "exam", xpReward: 350 },
  { id: "exam-pm", name: "プロマネ志望", description: "PM の問題を 30 問以上解く", icon: "📋", category: "exam", xpReward: 350 },
  { id: "exam-nw", name: "ネスペ志望", description: "NW の問題を 30 問以上解く", icon: "🌐", category: "exam", xpReward: 350 },
  { id: "exam-db", name: "DB スペシャリスト", description: "DB の問題を 30 問以上解く", icon: "🗄️", category: "exam", xpReward: 350 },
  { id: "exam-sc", name: "セキスペ志望", description: "SC の問題を 30 問以上解く", icon: "🔐", category: "exam", xpReward: 400 },
  { id: "exam-allrounder", name: "総合プレイヤー", description: "5区分以上で各 20 問以上解く", icon: "🌟", category: "exam", xpReward: 800 },

  // daily challenge (6)
  { id: "challenge-first", name: "デイリー初挑戦", description: "デイリーチャレンジを完走", icon: "🎁", category: "challenge", xpReward: 100 },
  { id: "challenge-perfect", name: "全問正解", description: "デイリーチャレンジで全問正解", icon: "🌈", category: "challenge", xpReward: 150 },
  { id: "challenge-3", name: "3日連続デイリー", description: "デイリーチャレンジを3日連続", icon: "🪙", category: "challenge", xpReward: 200 },
  { id: "challenge-7", name: "週間チャンピオン", description: "デイリーチャレンジを7日連続", icon: "🏆", category: "challenge", xpReward: 400 },
  { id: "challenge-30", name: "月間王者", description: "デイリーチャレンジを30日連続", icon: "👑", category: "challenge", xpReward: 1500 },
  { id: "challenge-perfect-7", name: "完璧週間", description: "デイリー全問正解を7日連続", icon: "💎", category: "challenge", xpReward: 800 },

  // AI usage (4)
  { id: "ai-first", name: "AIに質問", description: "AIコパイロットを初めて使う", icon: "🤖", category: "ai", xpReward: 50 },
  { id: "ai-curious", name: "好奇心旺盛", description: "AIコパイロットを 30 回利用", icon: "🔍", category: "ai", xpReward: 200 },
  { id: "ai-expert", name: "AIマスター", description: "AIコパイロットを 100 回利用", icon: "🧠", category: "ai", xpReward: 500 },
  { id: "ai-power", name: "AIパワーユーザー", description: "AIコパイロットを 300 回利用", icon: "⚡", category: "ai", xpReward: 1000 },

  // special (4)
  { id: "night-owl", name: "深夜の戦士", description: "深夜0-5時に学習する", icon: "🦉", category: "special", xpReward: 100 },
  { id: "early-bird", name: "早起きの鳥", description: "朝5-7時に学習する", icon: "🐦", category: "special", xpReward: 100 },
  { id: "weekend-warrior", name: "週末戦士", description: "週末に20問以上解く", icon: "🛡️", category: "special", xpReward: 150 },
  { id: "comeback", name: "カムバック", description: "誤答した問題を再挑戦して正解", icon: "🔄", category: "special", xpReward: 100 },
];

export const ACHIEVEMENT_BY_ID: Record<string, AchievementDef> = Object.fromEntries(
  ACHIEVEMENTS.map((a) => [a.id, a]),
);

export interface AchievementState {
  unlocked: string[];
  unlockedAt: Record<string, number>;
}

const EMPTY: AchievementState = { unlocked: [], unlockedAt: {} };

export function readAchievements(): AchievementState {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = window.localStorage.getItem(LS_KEYS.achievements);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw) as Partial<AchievementState>;
    return {
      unlocked: Array.isArray(parsed.unlocked) ? parsed.unlocked : [],
      unlockedAt:
        parsed.unlockedAt && typeof parsed.unlockedAt === "object"
          ? (parsed.unlockedAt as Record<string, number>)
          : {},
    };
  } catch {
    return EMPTY;
  }
}

function write(state: AchievementState): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(LS_KEYS.achievements, JSON.stringify(state));
  } catch {
    // ignore
  }
}

export function unlockAchievement(id: string): { unlocked: AchievementDef; isNew: boolean } | null {
  const def = ACHIEVEMENT_BY_ID[id];
  if (!def) return null;
  const state = readAchievements();
  if (state.unlocked.includes(id)) {
    return { unlocked: def, isNew: false };
  }
  const next: AchievementState = {
    unlocked: [...state.unlocked, id],
    unlockedAt: { ...state.unlockedAt, [id]: Date.now() },
  };
  write(next);
  return { unlocked: def, isNew: true };
}

export function isUnlocked(id: string): boolean {
  return readAchievements().unlocked.includes(id);
}
