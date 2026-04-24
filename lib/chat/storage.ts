import type { ChatSession } from "./types";

const KEY = "ipa-quiz:chat-sessions:v1";
const MAX_SESSIONS = 50;

function read(): ChatSession[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "[]") as ChatSession[];
  } catch {
    return [];
  }
}

function write(sessions: ChatSession[]): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(sessions));
  } catch {
    // Ignore storage quota errors
  }
}

export function saveToLocalStorage(session: ChatSession): void {
  const sessions = read().filter((s) => s.id !== session.id);
  sessions.unshift({ ...session, updatedAt: new Date().toISOString() });
  write(sessions.slice(0, MAX_SESSIONS));
}

export function loadFromLocalStorage(id: string): ChatSession | null {
  return read().find((s) => s.id === id) ?? null;
}

export function listLocalSessions(): ChatSession[] {
  return read();
}

export function deleteFromLocalStorage(id: string): void {
  write(read().filter((s) => s.id !== id));
}
