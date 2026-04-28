import type { ApiKey } from "./types";

const KEY = "ipa-quiz:api-keys:v1";
const MAX_KEYS = 5;

export function readApiKeys(): ApiKey[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as ApiKey[];
    return Array.isArray(parsed) ? parsed.filter((k) => k && typeof k.secret === "string") : [];
  } catch {
    return [];
  }
}

export function generateApiKey(name: string): ApiKey {
  const id = `kid_${Math.random().toString(36).slice(2, 10)}`;
  const random = Array.from(crypto.getRandomValues(new Uint8Array(24)))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  const prefix = `kk_live_${random.slice(0, 4)}`;
  const secret = `${prefix}_${random}`;
  return {
    id,
    name: name.trim().slice(0, 60) || "Untitled key",
    prefix,
    secret,
    createdAt: new Date().toISOString(),
  };
}

export function appendApiKey(key: ApiKey): ApiKey[] {
  if (typeof window === "undefined") return [];
  const current = readApiKeys();
  const next = [key, ...current].slice(0, MAX_KEYS);
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // ignore quota
  }
  return next;
}

export function deleteApiKey(id: string): ApiKey[] {
  if (typeof window === "undefined") return [];
  const next = readApiKeys().filter((k) => k.id !== id);
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // ignore
  }
  return next;
}
