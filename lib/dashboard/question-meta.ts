import type { QuestionMeta } from "./analytics";

const MAX_IDS_PER_REQUEST = 2000;

export interface QuestionMetaResult {
  meta: QuestionMeta[];
  complete: boolean;
}

/** Resolve saved question IDs without exceeding the metadata API's request limit. */
export async function fetchQuestionMeta(ids: string[]): Promise<QuestionMetaResult> {
  const meta: QuestionMeta[] = [];
  let complete = true;

  for (let start = 0; start < ids.length; start += MAX_IDS_PER_REQUEST) {
    try {
      const res = await fetch("/api/questions/meta", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: ids.slice(start, start + MAX_IDS_PER_REQUEST) }),
      });
      if (!res.ok) {
        complete = false;
        continue;
      }
      const json = (await res.json()) as { meta?: QuestionMeta[] };
      if (!Array.isArray(json.meta)) {
        complete = false;
        continue;
      }
      meta.push(...json.meta);
    } catch {
      complete = false;
    }
  }

  return { meta, complete };
}
