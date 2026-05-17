import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

import type { FeedbackEntry } from "@/app/api/feedback/route";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function loadEntries(): FeedbackEntry[] {
  const dir = path.join(process.cwd(), "data", "feedback");
  if (!fs.existsSync(dir)) return [];
  const files = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".jsonl"))
    .sort()
    .reverse();

  const entries: FeedbackEntry[] = [];
  for (const file of files) {
    const lines = fs
      .readFileSync(path.join(dir, file), "utf-8")
      .split("\n")
      .filter(Boolean);
    for (const line of lines) {
      try {
        entries.push(JSON.parse(line) as FeedbackEntry);
      } catch {
        // skip malformed lines
      }
    }
  }
  return entries.sort((a, b) => (a.ts > b.ts ? -1 : 1));
}

function buildCsv(entries: FeedbackEntry[]): string {
  const header = "ts,category,questionId,pageUrl,comment,ip\n";
  const rows = entries
    .map((e) =>
      [
        e.ts,
        e.category,
        e.questionId ?? "",
        e.pageUrl,
        (e.comment ?? "").replace(/"/g, '""'),
        e.ip,
      ]
        .map((v) => `"${v}"`)
        .join(","),
    )
    .join("\n");
  return header + rows;
}

export async function GET() {
  const entries = loadEntries();
  const csv = buildCsv(entries);
  const date = new Date().toISOString().slice(0, 10);
  return new NextResponse(csv, {
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": `attachment; filename="feedback-${date}.csv"`,
    },
  });
}
