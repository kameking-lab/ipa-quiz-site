import { describe, expect, it } from "vitest";
import { auditEssayLengths, auditVariant, hasCharacterSetup } from "../../scripts/audit-essays";
import { SA_2024_SPRING_Q1_INDUSTRIES } from "@/data/questions/afternoon/sa/2024-spring-industries";
import { SA_AFTERNOON_QUESTIONS } from "@/data/questions/afternoon/sa";

const original = SA_2024_SPRING_Q1_INDUSTRIES[0]!;
describe("essay audit uses actual question conditions", () => {
  it("accepts the stated bounds without an invented 2200-character total or 25-percent conclusion", () => {
    const variant = { ...original, essayA: "あ".repeat(300), essayI: "い".repeat(1600), essayU: "う".repeat(600) };
    expect(auditEssayLengths(variant, "sa", "2024-spring").every(c => c.pass)).toBe(true);
    const result = auditVariant(variant, "test", "sa", "2024-spring");
    expect(result.checks[0]!.pass).toBe(true);
    expect(result.checks[1]!.pass).toBe(true);
  });
  it.each([["essayA", 801], ["essayI", 799], ["essayI", 1601], ["essayU", 1201]] as const)("rejects %s at %i characters", (field, length) => {
    const variant = { ...original, [field]: "文".repeat(length) };
    expect(auditEssayLengths(variant, "sa", "2024-spring").some(c => !c.pass)).toBe(true);
    expect(auditVariant(variant, "test", "sa", "2024-spring").isCritical).toBe(true);
  });
  it("retains the unpublished raw essayU minimum instead of reading the public loader", () => {
    const raw = SA_AFTERNOON_QUESTIONS.find((question) => question.id === "sa-2024h-pm2-q1")!;
    const minimum = raw.subQuestions[2]?.minLength;
    expect(minimum).toBe(600);
    expect("文".repeat(599).length).toBeLessThan(minimum!);
  });
  it("recognizes concrete manufacturing content without inserting unrelated laws", () => {
    const result = auditVariant(original, "test", "sa", "2024-spring");
    expect(result.checks[2]!.pass).toBe(true);
    expect(result.checks[2]!.value).toMatch(/BOM|MES|PLM/);
  });
  it("keeps unrelated generic content and placeholders critical", () => {
    const generic = { ...original, essayA: "あ".repeat(300), essayI: "い".repeat(800), essayU: "う".repeat(600) };
    expect(auditVariant(generic, "test", "sa", "2024-spring").isCritical).toBe(true);
    expect(auditVariant({ ...original, essayU: original.essayU + "TODO" }, "test", "sa", "2024-spring").isCritical).toBe(true);
  });
  it("recognizes project size as well as company size", () => {
    expect(hasCharacterSetup("私はA社のPMとして期間16か月、ピーク38名を統括した。")).toBe(true);
    expect(hasCharacterSetup("私はA社のPMとして業務を統括した。")).toBe(false);
  });
});
