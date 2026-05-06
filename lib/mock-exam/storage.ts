import { LS_KEYS } from "@/lib/storage/keys";
import type { ExamCode } from "@/lib/questions/types";

export interface MockExamResult {
  id: string;
  exam: ExamCode;
  startedAt: number;
  finishedAt: number;
  totalQuestions: number;
  answered: number;
  correct: number;
  scorePct: number;
  passed: boolean;
  timeUsedSec: number;
  byCategory: Record<string, { total: number; correct: number }>;
}

interface MockExamStorage {
  history: MockExamResult[];
}

const EMPTY: MockExamStorage = { history: [] };

function read(): MockExamStorage {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = window.localStorage.getItem(LS_KEYS.mockExam);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw) as MockExamStorage;
    return {
      history: Array.isArray(parsed.history) ? parsed.history : [],
    };
  } catch {
    return EMPTY;
  }
}

function write(data: MockExamStorage): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(LS_KEYS.mockExam, JSON.stringify(data));
  } catch {
    // ignore
  }
}

export function recordMockExam(result: MockExamResult): void {
  const data = read();
  data.history.push(result);
  if (data.history.length > 50) {
    data.history = data.history.slice(-50);
  }
  write(data);
}

export function getMockExamHistory(): MockExamResult[] {
  return read().history;
}

export function getMockExamHistoryByExam(exam: ExamCode): MockExamResult[] {
  return read().history.filter((r) => r.exam === exam);
}
