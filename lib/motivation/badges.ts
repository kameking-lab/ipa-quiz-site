import { LS_KEYS } from "@/lib/storage/keys";

export const BADGE_THRESHOLDS = [3, 7, 30, 100, 365] as const;
export type BadgeThreshold = (typeof BADGE_THRESHOLDS)[number];

export interface BadgeDef {
  threshold: BadgeThreshold;
  name: string;
  tagline: string;
  emoji: string;
  gradient: string;
}

export const BADGES: Record<BadgeThreshold, BadgeDef> = {
  3: {
    threshold: 3,
    name: "スタートダッシュ",
    tagline: "3日続いた。習慣の入口。",
    emoji: "⚡",
    gradient: "from-sky-400 to-cyan-500",
  },
  7: {
    threshold: 7,
    name: "1週間マスター",
    tagline: "1週間継続。本物の証。",
    emoji: "🌱",
    gradient: "from-emerald-400 to-teal-500",
  },
  30: {
    threshold: 30,
    name: "1ヶ月コミット",
    tagline: "1ヶ月続く猛者は数％。",
    emoji: "🔥",
    gradient: "from-orange-400 to-rose-500",
  },
  100: {
    threshold: 100,
    name: "100日の猛者",
    tagline: "圧巻の継続力。合格者マインド。",
    emoji: "🏆",
    gradient: "from-amber-400 via-yellow-400 to-orange-500",
  },
  365: {
    threshold: 365,
    name: "1年戦士",
    tagline: "365日。もはやレジェンド。",
    emoji: "👑",
    gradient: "from-fuchsia-400 via-purple-500 to-indigo-500",
  },
};

interface StoredBadges {
  earned: BadgeThreshold[];
  earnedAt: Partial<Record<BadgeThreshold, number>>;
}

const EMPTY: StoredBadges = { earned: [], earnedAt: {} };

function read(): StoredBadges {
  if (typeof window === "undefined") return { ...EMPTY };
  try {
    const raw = window.localStorage.getItem(LS_KEYS.earnedBadges);
    if (!raw) return { ...EMPTY };
    const parsed = JSON.parse(raw) as Partial<StoredBadges>;
    return {
      earned: Array.isArray(parsed.earned)
        ? (parsed.earned.filter((n): n is BadgeThreshold =>
            BADGE_THRESHOLDS.includes(n as BadgeThreshold),
          ) as BadgeThreshold[])
        : [],
      earnedAt:
        parsed.earnedAt && typeof parsed.earnedAt === "object"
          ? (parsed.earnedAt as Partial<Record<BadgeThreshold, number>>)
          : {},
    };
  } catch {
    return { ...EMPTY };
  }
}

function write(b: StoredBadges): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(LS_KEYS.earnedBadges, JSON.stringify(b));
  } catch {
    // ignore
  }
}

export function getEarnedBadges(): StoredBadges {
  return read();
}

export function syncBadgesWithStreak(currentStreak: number, longestStreak: number): {
  state: StoredBadges;
  newlyEarned: BadgeThreshold[];
} {
  const stored = read();
  const target = Math.max(currentStreak, longestStreak);
  const newlyEarned: BadgeThreshold[] = [];
  const now = Date.now();
  for (const t of BADGE_THRESHOLDS) {
    if (target >= t && !stored.earned.includes(t)) {
      stored.earned.push(t);
      stored.earnedAt[t] = now;
      newlyEarned.push(t);
    }
  }
  if (newlyEarned.length > 0) {
    stored.earned.sort((a, b) => a - b);
    write(stored);
  }
  return { state: stored, newlyEarned };
}

export function nextBadge(currentStreak: number): BadgeDef | null {
  const next = BADGE_THRESHOLDS.find((t) => t > currentStreak);
  return next ? BADGES[next] : null;
}
