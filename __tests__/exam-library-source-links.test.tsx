import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Markdown } from "@/components/ui/markdown";
import { loadExamPaper } from "@/lib/exam-library-papers";

describe("descriptive answer source links", () => {
  it.each([1, 2])("renders the production-audited building-safety answer q%i references as HTTPS anchors", (number) => {
    const question = loadExamPaper("cskohyo-CS20251907")?.find((item) => item.number === number);
    expect(question?.explanation).toBeTruthy();
    const text = question!.explanation!;
    const urls = text.match(/https:\/\/[^\s)\]}>]+/gu) ?? [];
    expect(urls.length).toBeGreaterThan(0);
    const { container } = render(<Markdown>{text}</Markdown>);
    const hrefs = [...container.querySelectorAll("a")].map((anchor) => anchor.getAttribute("href"));
    expect(hrefs).toEqual(urls);
    for (const href of hrefs) expect(href).toMatch(/^https:\/\/(?:laws\.e-gov|www\.mhlw)\.go\.jp\//u);
  });
});
