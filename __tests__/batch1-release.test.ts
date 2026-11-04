import { describe, it, expect } from "vitest";
import { auditBatch1 } from "@/scripts/audit-batch1";

describe("batch 1 complete public registry", () => {
  it("matches sync, lazy, practice, URL and native paper coverage", async () => {
    const report = await auditBatch1();
    expect(report.failures).toEqual([]);
  });
});
