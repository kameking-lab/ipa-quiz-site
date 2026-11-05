import { LS_KEYS } from "@/lib/storage/keys";
import { readXp as readSharedXp, awardXp, levelFromXp, totalXpForLevel, xpProgress } from "./xp";

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

const EMPTY_GOLD: GoldState = { balance: 0, earned: 0, spent: 0, updatedAt: 0 };

function readXp(): XpState {
  const shared = readSharedXp();
  let updatedAt = 0;
  try {
    const saved = JSON.parse(window.localStorage.getItem(LS_KEYS.xpState) ?? "null");
    if (Number.isFinite(saved?.updatedAt)) updatedAt = saved.updatedAt;
  } catch { /* optional metadata */ }
  return { total: shared.total, level: levelFromXp(shared.total), updatedAt };
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

// Both account displays and achievement awards share the same level curve.
export const levelForXp = levelFromXp;

export function xpToNext(xp: number): { current: number; next: number; pct: number } {
  const progress = xpProgress(Math.max(0, xp));
  const current = totalXpForLevel(progress.level);
  return { current, next: progress.isMax ? current : totalXpForLevel(progress.level + 1), pct: progress.progress };
}

export function getXp(): XpState {
  return readXp();
}

export function getGold(): GoldState {
  return readGold();
}

export function addXp(amount: number): XpState {
  if (Number.isFinite(amount) && amount > 0) awardXp(amount);
  return readXp();
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
