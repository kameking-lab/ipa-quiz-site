import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { AP_QUESTIONS } from "@/data/questions/ap";
import { FE_QUESTIONS } from "@/data/questions/fe";
import { getQuestionsForExam } from "@/lib/questions/get-questions";
import { filterQuestions, isPracticeReadyQuestion, shuffleChoices } from "@/lib/questions/filter";
import { DescriptiveAnswerCard } from "@/components/quiz/DescriptiveAnswerCard";
import answers from "@/reports/cloud-ap-fe-latest2/answers.json";
import images from "@/reports/cloud-ap-fe-latest2/images.json";

const papers = [
  { exam: "ap", year: 2025, season: "autumn", session: "am", count: 80, file: "2025r07a_ap_am_ans.pdf" },
  { exam: "ap", year: 2025, season: "spring", session: "am", count: 80, file: "2025r07h_ap_am_ans.pdf" },
  { exam: "ap", year: 2025, season: "autumn", session: "pm", count: 11 },
  { exam: "ap", year: 2025, season: "spring", session: "pm", count: 11 },
  ...([2025, 2026] as const).flatMap(year => (["a", "b"] as const).map(section => ({
    exam: "fe" as const, year, season: "cbt" as const, session: section === "a" ? "kamoku-a" as const : "kamoku-b" as const,
    count: section === "a" ? 20 : 6, file: `${year}r0${year - 2018}_fe_kamoku_${section}_ans.pdf`,
  }))),
] as const;

describe("AP/FE latest two official publications", () => {
  it.each(papers)("loads complete official paper $exam/$year/$season/$session", async paper => {
    const direct = paper.exam === "ap" ? AP_QUESTIONS : FE_QUESTIONS;
    const lazy = await getQuestionsForExam(paper.exam);
    for (const pool of [direct, lazy]) {
      const selected = filterQuestions(pool, { mode: "year", exam: paper.exam, year: paper.year, season: paper.season, session: paper.session, inOrder: true });
      expect(selected.map(q => q.qNumber)).toEqual(Array.from({ length: paper.count }, (_, i) => i + 1));
      expect(new Set(selected.map(q => q.id)).size).toBe(paper.count);
      for (const q of selected) {
        expect(isPracticeReadyQuestion(q)).toBe(true);
        expect(q.license).toBe("IPA-public");
        expect(q.sourcePdfUrl).toMatch(/^https:\/\/www\.ipa\.go\.jp\/.*_qs\.pdf$/);
        expect(q.sourceAnswerUrl).toMatch(/^https:\/\/www\.ipa\.go\.jp\/.*_ans\.pdf$/);
        expect(q.hasImage).toBe(true);
        expect(q.imageUrls?.length).toBeGreaterThan(0);
        expect(q.imageAltTexts).toHaveLength(q.imageUrls!.length);
        for (const url of q.imageUrls!) expect(images.some(img => `/${img.file.replace(/^public\//, "")}` === url && img.source === q.sourcePdfUrl)).toBe(true);
        if ("file" in paper) {
          const official = answers[paper.file as keyof typeof answers] as Record<string, string>;
          expect(q.answer).toBe(official[String(q.qNumber)]);
          expect(q.choices?.[q.answer as keyof typeof q.choices]).toBeTruthy();
          expect(shuffleChoices(q)).toEqual(q); // printed labels must keep their meaning
        } else {
          expect(q.type).toBe("descriptive");
          expect(q.modelAnswer).toBe(q.answer);
          expect(q.modelAnswer).toContain("設問");
        }
      }
    }
  });

  it("ships the verified lossless assets without substitution", () => {
    expect(new Set(images.map(item => item.file)).size).toBe(images.length);
    for (const item of images) {
      expect(createHash("sha256").update(readFileSync(join(process.cwd(), item.file))).digest("hex"), item.file).toBe(item.sha256);
    }
  });

  it("shows the official IPA answer and independent explanation for afternoon self review", () => {
    const question = AP_QUESTIONS.find(q => q.id === "ap-2025a-pm-q1")!;
    render(<DescriptiveAnswerCard question={question} defaultOpen />);
    expect(screen.getByText("IPA公式解答例")).toBeTruthy();
    expect(screen.getByRole("link", { name: "IPA公式解答例PDF" }).getAttribute("href")).toBe(question.sourceAnswerUrl);
    expect(screen.queryByText(/法務省/)).toBeNull();
    expect(screen.getByText("解説（当サイト作成）")).toBeTruthy();
  });
});
