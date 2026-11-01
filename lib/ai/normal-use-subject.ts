import "server-only";
import { createHash } from "node:crypto";

/** Validate server identity without trimming/case folding or accepting client credentials. */
export function validAiSubject(subject: unknown): subject is string {
  return typeof subject === "string" && subject.length > 0 && subject.length <= 1024
    && subject.trim().length > 0;
}

export function normalUseSubjectHash(subject: string): string {
  if (!validAiSubject(subject)) throw new Error("invalid authenticated AI subject");
  // JSON preserves distinct unpaired UTF16 surrogates before UTF8 hashing.
  return createHash("sha256").update(JSON.stringify(subject)).digest("hex");
}
