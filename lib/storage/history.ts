import { LS_KEYS } from "./keys";

export interface HistoryEntry {
  id: string;
  selected: string;
  correct: boolean;
  at: number;
}

export interface HistoryData {
  entries: HistoryEntry[];
  starredIds: string[];
}

const EMPTY: HistoryData = { entries: [], starredIds: [] };

function readRaw(): HistoryData {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = window.localStorage.getItem(LS_KEYS.history);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw) as HistoryData;
    return {
      entries: Array.isArray(parsed.entries) ? parsed.entries : [],
      starredIds: Array.isArray(parsed.starredIds) ? parsed.starredIds : [],
    };
  } catch {
    return EMPTY;
  }
}

function writeRaw(data: HistoryData): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(LS_KEYS.history, JSON.stringify(data));
  } catch {
    // ignore quota errors
  }
}

export interface HistoryStore {
  record(entry: HistoryEntry): void;
  toggleStar(id: string): boolean;
  isStarred(id: string): boolean;
  getAnsweredIds(): string[];
  getWrongIds(): string[];
  getStarredIds(): string[];
  getRecentIds(n: number): string[];
  getStats(): {
    total: number;
    correct: number;
    accuracy: number;
    uniqueAnswered: number;
  };
  reset(): void;
  exportJson(): string;
  importJson(json: string): boolean;
}

export function createHistoryStore(): HistoryStore {
  const snapshot = (): HistoryData => readRaw();
  return {
    record(entry) {
      const data = snapshot();
      data.entries.push(entry);
      if (data.entries.length > 2000) {
        data.entries.splice(0, data.entries.length - 2000);
      }
      writeRaw(data);
    },
    toggleStar(id) {
      const data = snapshot();
      const idx = data.starredIds.indexOf(id);
      if (idx >= 0) {
        data.starredIds.splice(idx, 1);
        writeRaw(data);
        return false;
      }
      data.starredIds.push(id);
      writeRaw(data);
      return true;
    },
    isStarred(id) {
      return snapshot().starredIds.includes(id);
    },
    getAnsweredIds() {
      return [...new Set(snapshot().entries.map((e) => e.id))];
    },
    getWrongIds() {
      const byId = new Map<string, boolean>();
      for (const e of snapshot().entries) byId.set(e.id, e.correct);
      return [...byId.entries()].filter(([, ok]) => !ok).map(([id]) => id);
    },
    getStarredIds() {
      return [...snapshot().starredIds];
    },
    getRecentIds(n) {
      const data = snapshot();
      return data.entries
        .slice(-n * 20)
        .reverse()
        .map((e) => e.id)
        .slice(0, n * 20);
    },
    getStats() {
      const data = snapshot();
      const total = data.entries.length;
      const correct = data.entries.filter((e) => e.correct).length;
      const unique = new Set(data.entries.map((e) => e.id)).size;
      return {
        total,
        correct,
        accuracy: total ? correct / total : 0,
        uniqueAnswered: unique,
      };
    },
    reset() {
      writeRaw(EMPTY);
    },
    exportJson() {
      return JSON.stringify(snapshot());
    },
    importJson(json) {
      try {
        const parsed = JSON.parse(json) as HistoryData;
        if (!parsed || !Array.isArray(parsed.entries)) return false;
        writeRaw({
          entries: parsed.entries,
          starredIds: Array.isArray(parsed.starredIds) ? parsed.starredIds : [],
        });
        return true;
      } catch {
        return false;
      }
    },
  };
}

export function getPremiumFlag(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(LS_KEYS.premium) === "1";
  } catch {
    return false;
  }
}

export function setPremiumFlag(on: boolean): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(LS_KEYS.premium, on ? "1" : "0");
  } catch {
    // ignore
  }
}
