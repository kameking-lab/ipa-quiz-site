import { createHash } from "node:crypto";
import { expect } from "vitest";
import type { Question } from "@/lib/questions/types";
import { beforeNurseSourceLineBreak } from "../fixtures/kangoshi-before-completion";
import delta from "@/docs/evidence/nurse-pm-category-correction-20261010/DELTA.json";

const canonical = (value: unknown): unknown => Array.isArray(value) ? value.map(canonical) : value && typeof value === "object" ? Object.fromEntries(Object.entries(value).sort(([a], [b]) => a < b ? -1 : a > b ? 1 : 0).map(([key, item]) => [key, canonical(item)])) : value;
export const nurseObjectHash = (value: unknown) => createHash("sha256").update(JSON.stringify(canonical(value))).digest("hex");
const corrections = new Map(delta.changes.map(change => [change.id, change]));
const threeFields = ["subject", "category", "topicTags"] as const;

export function historicalNurseHash(question: unknown, id: string): string {
  const change = corrections.get(id);
  const archived = beforeNurseSourceLineBreak(question as Question | undefined);
  if (!change) return nurseObjectHash(archived);
  expect(archived, id).toBeDefined();
  const current = archived as unknown as Record<string, unknown>;
  expect(current.id, id).toBe(id);
  for (const field of threeFields) expect(current[field], `${id}:${field}`).toEqual(change.after[field]);
  const unchanged = Object.fromEntries(Object.entries(current).filter(([field]) => !threeFields.includes(field as typeof threeFields[number])));
  expect(nurseObjectHash(unchanged), `${id}:content`).toBe(change.contentExcludingThreeFieldsSha256);
  expect(nurseObjectHash(current), `${id}:new`).toBe(change.afterFullSha256);
  const historical = { ...current, ...change.before };
  expect(nurseObjectHash(historical), `${id}:old`).toBe(change.beforeFullSha256);
  return nurseObjectHash(historical);
}
