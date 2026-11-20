import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { expect } from "vitest";
import manifest from "@/docs/question-sources/nichimu-fixed-papers.json";
import type { Question } from "@/lib/questions/types";

const documents = new Map(manifest.documents.map((document) => [document.path, document]));
const verifiedPaths = new Set<string>();

function verifiedOfficialUrl(url: URL): string {
  expect(url.origin).toBe("https://www.kakomon-ai.jp");
  const document = documents.get(url.pathname);
  if (!document) throw new Error(`Missing official archive entry for ${url.pathname}`);
  expect(document.officialUrl, url.href).toMatch(/^https:\/\/www\.nichimu\.or\.jp\/.*\.pdf$/);
  if (!verifiedPaths.has(url.pathname)) {
    const bytes = readFileSync(join(process.cwd(), "public", url.pathname.slice(1)));
    expect(createHash("sha256").update(bytes).digest("hex"), url.href).toBe(document.sha256);
    verifiedPaths.add(url.pathname);
  }
  return document.officialUrl + url.hash;
}

export function expectNichimuArchiveUrl(value: string | undefined, exam: string, edition: string): void {
  const url = new URL(value ?? "");
  expect(url.pathname.startsWith(`/exam-library/nichimu/${exam}/${edition}/`), value).toBe(true);
  verifiedOfficialUrl(url);
}

// Compare against producer fingerprints after independently verifying the exact
// archived PDF. Only the two source locations changed in the archive migration.
export function restoreNichimuSourceUrls(questions: readonly Question[]): Question[] {
  return questions.map(question => {
    const copy = { ...question };
    for (const field of ["sourcePdfUrl", "sourceAnswerUrl"] as const) {
      const source = copy[field];
      if (source?.includes("/exam-library/nichimu/")) copy[field] = verifiedOfficialUrl(new URL(source));
    }
    return copy;
  });
}

export function restoreNichimuSourceText(source: string): string {
  return source.replace(/https:\/\/www\.kakomon-ai\.jp\/exam-library\/nichimu\/[^"\s]+/g,
    archived => verifiedOfficialUrl(new URL(archived)));
}
