import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

// The unique constraint is what makes history-sync's createMany skipDuplicates
// effective (phase 11). A true DB-level test needs a live Postgres (CI has
// none), so guard the schema + migration shape instead.
describe("StudyRecord unique constraint", () => {
  it("schema.prisma declares @@unique([userId, questionId, answeredAt]) on StudyRecord", () => {
    const schema = readFileSync(join("prisma", "schema.prisma"), "utf8");
    const model = schema.slice(
      schema.indexOf("model StudyRecord"),
      schema.indexOf("model Streak"),
    );
    expect(model).toMatch(/@@unique\(\[userId, questionId, answeredAt\]\)/);
  });

  it("ships a migration that dedupes then creates the unique index", () => {
    const sql = readFileSync(
      join("prisma", "migrations", "20260526000000_studyrecord_unique", "migration.sql"),
      "utf8",
    );
    expect(sql).toMatch(/DELETE FROM "StudyRecord"/);
    expect(sql).toMatch(
      /CREATE UNIQUE INDEX "StudyRecord_userId_questionId_answeredAt_key"/,
    );
    // dedup must come before the index creation, or the index would fail.
    expect(sql.indexOf("DELETE FROM")).toBeLessThan(sql.indexOf("CREATE UNIQUE INDEX"));
  });
});
