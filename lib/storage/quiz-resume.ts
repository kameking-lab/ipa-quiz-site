import { LS_KEYS } from "./keys";

/** Position and pool order only. Answers and scores live in their own settings-controlled stores. */
export interface QuizResumeState {
  version: 1;
  route: string;
  ids: string[];
  index: number;
  deferredIds: string[];
  phase: "primary" | "deferred";
  updatedAt: number;
}

export function readQuizResume(): QuizResumeState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(LS_KEYS.quizResume);
    if (!raw) return null;
    const value: unknown = JSON.parse(raw);
    if (!value || typeof value !== "object" || Array.isArray(value)) return null;
    const state = value as Partial<QuizResumeState>;
    if (state.version !== 1 || typeof state.route !== "string" ||
        !(state.route === "/quiz" || state.route.startsWith("/quiz?")) ||
        !Array.isArray(state.ids) || state.ids.length === 0 || state.ids.length > 5000 ||
        !state.ids.every((id) => typeof id === "string" && id.length > 0 && id.length <= 200) ||
        new Set(state.ids).size !== state.ids.length ||
        typeof state.index !== "number" || !Number.isSafeInteger(state.index) || state.index < 0 || state.index > state.ids.length ||
        !Array.isArray(state.deferredIds) ||
        !state.deferredIds.every((id) => typeof id === "string" && state.ids?.includes(id)) ||
        new Set(state.deferredIds).size !== state.deferredIds.length ||
        (state.phase !== "primary" && state.phase !== "deferred") ||
        typeof state.updatedAt !== "number" || !Number.isSafeInteger(state.updatedAt) || state.updatedAt < 0) return null;
    return state as QuizResumeState;
  } catch {
    return null;
  }
}

export function writeQuizResume(state: QuizResumeState): boolean {
  if (typeof window === "undefined") return false;
  try {
    window.localStorage.setItem(LS_KEYS.quizResume, JSON.stringify(state));
    return true;
  } catch {
    return false;
  }
}

/** Without a route, settings can clear every saved quiz position. */
export function clearQuizResume(route?: string): void {
  if (typeof window === "undefined") return;
  try {
    if (!route || readQuizResume()?.route === route) {
      window.localStorage.removeItem(LS_KEYS.quizResume);
    }
  } catch {
    // Restricted storage must not block the quiz.
  }
}

export function quizResumeHref(route: string): string {
  return `${route}${route.includes("?") ? "&" : "?"}resume=1`;
}
