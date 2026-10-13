import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { getAfternoonQuestions, getAfternoonYearSeasons, findAfternoonQuestion } from "@/lib/afternoon/load";
import { AP_AFTERNOON_QUESTIONS } from "@/data/questions/afternoon/ap";

const index = readFileSync(join(process.cwd(), "app/[exam]/afternoon/page.tsx"), "utf8");
const detail = readFileSync(join(process.cwd(), "app/[exam]/afternoon/[year]/[season]/page.tsx"), "utf8");

describe("afternoon catalog only exposes sourced past questions", () => {
  it("keeps original drafts outside the public lookup", () => {
    const original = AP_AFTERNOON_QUESTIONS.find((question) => question.license === "original");
    expect(original).toBeDefined();
    expect(findAfternoonQuestion(original!.id)).toBeUndefined();
    expect(getAfternoonQuestions("ap")).toEqual([]);
    expect(getAfternoonYearSeasons("ap")).toEqual([]);
  });

  it("offers the IPA source when the verified local catalog is empty", () => {
    expect(index).toContain("https://www.ipa.go.jp/shiken/mondai-kaiotu/index.html");
    expect(detail).toContain("notFound()");
    expect(index).not.toContain("AfternoonEssayHint");
  });
});
