import { describe, expect, it } from "vitest";
import { examLibraryHref } from "@/lib/exam-library-navigation";

describe("exam library navigation", () => {
  it("returns from a consultant paper to its canonical qualification hub", () => {
    const href = examLibraryHref("cskohyo", "労働衛生関係法令");
    const url = new URL(href, "https://www.kakomon-ai.jp");
    expect(url.pathname).toBe(
      "/e-learning/exams/qualifications/rodo-eisei-consultant",
    );
    expect(url.search).toBe("");
  });

  it("keeps non-hub license subjects on a noindex filter view", () => {
    const href = examLibraryHref("lckohyo", "潜水士");
    const url = new URL(href, "https://www.kakomon-ai.jp");
    expect(url.pathname).toBe("/e-learning/exams");
    expect(url.searchParams.get("group")).toBe("lckohyo");
    expect(url.searchParams.get("subject")).toBe("潜水士");
  });

  it("returns to the qualification selector when no filter is requested", () => {
    expect(examLibraryHref()).toBe("/e-learning/exams");
  });
});
