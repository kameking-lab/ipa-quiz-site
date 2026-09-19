import { describe, expect, it } from "vitest";
import { examLibraryHref } from "@/lib/exam-library-navigation";

describe("exam library navigation", () => {
  it("returns from a paper to the same group and subject year list", () => {
    const href = examLibraryHref("cskohyo", "労働衛生関係法令");
    const url = new URL(href, "https://www.kakomon-ai.jp");
    expect(url.pathname).toBe("/e-learning/exams");
    expect(url.searchParams.get("group")).toBe("cskohyo");
    expect(url.searchParams.get("subject")).toBe("労働衛生関係法令");
  });

  it("returns to the qualification selector when no filter is requested", () => {
    expect(examLibraryHref()).toBe("/e-learning/exams");
  });
});
