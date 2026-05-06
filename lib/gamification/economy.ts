import { LS_KEYS } from "@/lib/storage/keys";

export interface XpState {
  total: number;
  level: number;
  updatedAt: number;
}

export interface GoldState {
  balance: number;
  earned: number;
  spent: number;
  updatedAt: number;
}

const EMPTY_XP: XpState = { total: 0, level: 1, updatedAt: 0 };
const EMPTY_GOLD: GoldState = { balance: 0, earned: 0, spent: 0, updatedAt: 0 };

function readXp(): XpState {
  if (typeof window === "undefined") return EMPTY_XP;
  try {
    const raw = window.localStorage.getItem(LS_KEYS.xpState);
    if (!raw) return EMPTY_XP;
    const parsed = JSON.parse(raw) as Partial<XpState>;
    return {
      total: typeof parsed.total === "number" ? parsed.total : 0,
      level: typeof parsed.level === "number" ? parsed.level : 1,
      updatedAt: typeof parsed.updatedAt === "number" ? parsed.updatedAt : 0,
    };
  } catch {
    return EMPTY_XP;
  }
}

function writeXp(state: XpState): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(LS_KEYS.xpState, JSON.stringify(state));
  } catch {
    // ignore
  }
}

function readGold(): GoldState {
  if (typeof window === "undefined") return EMPTY_GOLD;
  try {
    const raw = window.localStorage.getItem(LS_KEYS.gold);
    if (!raw) return EMPTY_GOLD;
    const parsed = JSON.parse(raw) as Partial<GoldState>;
    return {
      balance: typeof parsed.balance === "number" ? parsed.balance : 0,
      earned: typeof parsed.earned === "number" ? parsed.earned : 0,
      spent: typeof parsed.spent === "number" ? parsed.spent : 0,
      updatedAt: typeof parsed.updatedAt === "number" ? parsed.updatedAt : 0,
    };
  } catch {
    return EMPTY_GOLD;
  }
}

function writeGold(state: GoldState): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(LS_KEYS.gold, JSON.stringify(state));
  } catch {
    // ignore
  }
}

const LEVEL_THRESHOLDS = [
  0, 100, 300, 600, 1000, 1500, 2200, 3000, 4000, 5500, 7500, 10000, 13000, 17000,
  22000, 28000,
];

export function levelForXp(xp: number): number {
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (xp >= LEVEL_THRESHOLDS[i]) return i + 1;
  }
  return 1;
}

export function xpToNext(xp: number): { current: number; next: number; pct: number } {
  const lv = levelForXp(xp);
  const cur = LEVEL_THRESHOLDS[lv - 1] ?? 0;
  const nxt = LEVEL_THRESHOLDS[lv] ?? cur + 5000;
  const pct = Math.min(1, (xp - cur) / (nxt - cur));
  return { current: cur, next: nxt, pct };
}

export function getXp(): XpState {
  return readXp();
}

export function getGold(): GoldState {
  return readGold();
}

export function addXp(amount: number): XpState {
  if (amount <= 0) return readXp();
  const cur = readXp();
  const total = cur.total + amount;
  const next: XpState = {
    total,
    level: levelForXp(total),
    updatedAt: Date.now(),
  };
  writeXp(next);
  return next;
}

export function addGold(amount: number): GoldState {
  if (amount <= 0) return readGold();
  const cur = readGold();
  const next: GoldState = {
    balance: cur.balance + amount,
    earned: cur.earned + amount,
    spent: cur.spent,
    updatedAt: Date.now(),
  };
  writeGold(next);
  return next;
}

export function spendGold(amount: number): boolean {
  const cur = readGold();
  if (cur.balance < amount) return false;
  writeGold({
    balance: cur.balance - amount,
    earned: cur.earned,
    spent: cur.spent + amount,
    updatedAt: Date.now(),
  });
  return true;
}
