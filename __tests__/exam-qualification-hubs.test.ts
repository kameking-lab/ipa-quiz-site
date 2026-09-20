import { describe, expect, it } from "vitest";

import { EXAM_CATALOG } from "@/lib/exam-library-catalog";
import {
  QUALIFICATION_HUBS,
  findQualificationHub,
  qualificationHubForSelection,
  qualificationHubPath,
} from "@/lib/exam-qualification-hubs";
import { getQualificationHubEntries } from "@/lib/exam-qualification-hub-data";
import { isHealthConsultantSubject } from "@/lib/exam-library-model";

describe("safety qualification hubs", () => {
  it("publishes a data-backed first-class health supervisor hub", () => {
    const hub = findQualificationHub("dai-1-shu-eisei-kanrisha");
    expect(hub?.name).toBe("第一種衛生管理者");
    expect(qualificationHubPath(hub!.slug)).toBe(
      "/e-learning/exams/qualifications/dai-1-shu-eisei-kanrisha",
    );
    const entries = getQualificationHubEntries(hub!);
    expect(entries.length).toBeGreaterThan(0);
    expect(entries.every((entry) => entry.group === "lckohyo")).toBe(true);
    expect(entries.every((entry) => entry.subject === "第一種衛生管理者")).toBe(true);
  });

  it("keeps measurement and consultant subjects in their official groups", () => {
    const measurement = qualificationHubForSelection("emkohyo", "労働衛生一般", EXAM_CATALOG);
    const healthConsultant = qualificationHubForSelection("cskohyo", "労働衛生一般", EXAM_CATALOG);
    expect(measurement?.slug).toBe("sagyo-kankyo-sokuteishi");
    expect(healthConsultant?.slug).toBe("rodo-eisei-consultant");
    expect(getQualificationHubEntries(measurement!).every((entry) => entry.group === "emkohyo")).toBe(true);
    expect(getQualificationHubEntries(healthConsultant!).every((entry) => entry.group === "cskohyo")).toBe(true);
  });

  it("partitions every consultant paper into safety or health without overlap", () => {
    const safety = findQualificationHub("rodo-anzen-consultant")!;
    const health = findQualificationHub("rodo-eisei-consultant")!;
    const safetyEntries = getQualificationHubEntries(safety);
    const healthEntries = getQualificationHubEntries(health);
    const consultantEntries = EXAM_CATALOG.filter((entry) => entry.group === "cskohyo");
    expect(safetyEntries.every((entry) => !isHealthConsultantSubject(entry.subject))).toBe(true);
    expect(healthEntries.every((entry) => isHealthConsultantSubject(entry.subject))).toBe(true);
    expect(new Set([...safetyEntries, ...healthEntries].map((entry) => entry.id)).size).toBe(
      consultantEntries.length,
    );
    expect(safetyEntries.some((entry) => healthEntries.some((other) => other.id === entry.id))).toBe(false);
  });

  it("does not guess a hub for an unknown subject", () => {
    expect(qualificationHubForSelection("lckohyo", "存在しない資格", EXAM_CATALOG)).toBeUndefined();
    expect(qualificationHubForSelection("cskohyo", "存在しない科目", EXAM_CATALOG)).toBeUndefined();
    expect(findQualificationHub("unknown-qualification")).toBeUndefined();
  });

  it("keeps every configured hub backed by catalog data", () => {
    for (const hub of QUALIFICATION_HUBS) {
      expect(getQualificationHubEntries(hub).length, hub.slug).toBeGreaterThan(0);
    }
  });
});
