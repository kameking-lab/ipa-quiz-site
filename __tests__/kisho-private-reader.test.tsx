import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { renderToStaticMarkup } from "react-dom/server";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { KishoPrivateReader } from "@/components/kisho-private/KishoPrivateReader";
import { KISHO_PRIVATE_ASSETS, KISHO_PRIVATE_COUNTS, KISHO_PRIVATE_QUESTIONS, adaptKishoPrivate,
  gradeKishoAcademic, resolveKishoPrivateImage, KISHO_RAW_COMBINED, KISHO_SOURCE_MANIFEST } from "@/lib/kisho-private";
import { createKishoDraft, parseKishoDraft, serializeKishoDraft } from "@/lib/kisho-private/drafts";
import { correctedQuestion } from "@/lib/kisho-private/overrides";
import q04Acceptance from "@/data/qualification-staging/kisho-65-66-private/q04-overlay-accepted.json";

const png = "data:image/png;base64,iVBORw0KGgo=";

describe("private Kisho reader", () => {
  it("preserves the exact raw bytes and covers 78 questions, 237 fields, 130 private assets", () => {
    const bytes = readFileSync("data/qualification-staging/kisho-65-66-private/raw-combined.json");
    expect(createHash("sha256").update(bytes).digest("hex")).toBe("e3accc6252a5467bbfd73b317e9ffcdc5278888038f1debfdff055e6d6c2a771");
    expect(KISHO_PRIVATE_COUNTS.candidates).toBe(78);
    expect(KISHO_PRIVATE_COUNTS.academic).toBe(60);
    expect(KISHO_PRIVATE_COUNTS.practical).toBe(18);
    expect(KISHO_PRIVATE_COUNTS.answerFields).toBe(237);
    expect(KISHO_PRIVATE_ASSETS.size).toBe(130);
    expect(KISHO_PRIVATE_QUESTIONS.every((question) => question.publicGo === false && question.publicationAllowed === false)).toBe(true);
    expect(KISHO_PRIVATE_QUESTIONS.find((question) => question.raw.id === "kisho-65-pm1-q01")?.fields
      .find((field) => field.raw.field === "1-7")?.raw.officialAnswer).toBe("海上強風");
  });

  it("grades academic choices only, and never grades practical prose", () => {
    const academic = KISHO_PRIVATE_QUESTIONS.find((question) => question.raw.type === "multiple-choice")!;
    const practical = KISHO_PRIVATE_QUESTIONS.find((question) => question.raw.type === "descriptive")!;
    expect(gradeKishoAcademic(academic, academic.raw.answer)).toBe(true);
    expect(gradeKishoAcademic(academic, Object.keys(academic.raw.choices!).find((choice) => choice !== academic.raw.answer)!)).toBe(false);
    expect(gradeKishoAcademic(practical, practical.fields[0]!.raw.officialAnswer)).toBeNull();
  });

  it("rejects public/unsafe assets and unexpected raw changes", () => {
    expect(() => adaptKishoPrivate({ ...KISHO_RAW_COMBINED, publicationAllowed: true } as never, KISHO_SOURCE_MANIFEST)).toThrow();
    const altered = { ...KISHO_SOURCE_MANIFEST, assets: KISHO_SOURCE_MANIFEST.assets.map((asset, index) => index === 0
      ? { ...asset, preparedPath: "public/answer.png" } : asset) };
    expect(() => adaptKishoPrivate(KISHO_RAW_COMBINED, altered)).toThrow();
    expect(() => resolveKishoPrivateImage(KISHO_SOURCE_MANIFEST.assets[0]!, () => "https://example.com/file.png")).toThrow();
    expect(() => correctedQuestion({ ...KISHO_RAW_COMBINED.questions[0]!, explanation: "untouched" })).not.toThrow();
  });

  it("applies only the independently accepted six Q04 explanation edits", () => {
    const raw = KISHO_RAW_COMBINED.questions.find((question) => question.id === "kisho-65-senmon-q04")!;
    const derived = KISHO_PRIVATE_QUESTIONS.find((question) => question.raw.id === raw.id)!.raw;
    const mutableRaw = JSON.parse(JSON.stringify(raw)) as Record<string, unknown>;
    const mutableDerived = JSON.parse(JSON.stringify(derived)) as Record<string, unknown>;
    for (const edit of q04Acceptance.approvedEdits) {
      if (edit.field === "explanation") {
        expect(raw.explanation).toBe(edit.oldExact);
        expect(derived.explanation).toBe(edit.newExact);
        delete mutableRaw.explanation; delete mutableDerived.explanation;
      } else {
        const symbol = edit.field.slice("choiceExplanations.".length);
        expect(raw.choiceExplanations?.[symbol]).toBe(edit.oldExact);
        expect(derived.choiceExplanations?.[symbol]).toBe(edit.newExact);
        delete (mutableRaw.choiceExplanations as Record<string, unknown>)[symbol];
        delete (mutableDerived.choiceExplanations as Record<string, unknown>)[symbol];
      }
    }
    expect(mutableDerived).toEqual(mutableRaw);
    expect(() => correctedQuestion({ ...raw, explanation: "modified" })).toThrow();
  });

  it("whitelists local draft keys and keeps private flags", () => {
    const academic = KISHO_PRIVATE_QUESTIONS.find((question) => question.raw.type === "multiple-choice")!;
    const practical = KISHO_PRIVATE_QUESTIONS.find((question) => question.raw.type === "descriptive")!;
    const key = `${practical.raw.id}/${practical.fields[0]!.raw.field}`;
    const parsed = parseKishoDraft(serializeKishoDraft({ [academic.raw.id]: academic.raw.answer, evil: "1" },
      { [key]: "試答", evil: "x" }, [key, "evil"]));
    expect(parsed).toEqual(createKishoDraft({ [academic.raw.id]: academic.raw.answer }, { [key]: "試答" }, [key]));
    expect(parsed.publicGo).toBe(false);
    expect(parseKishoDraft('{"schema":"kisho-65-66-private-draft/1","publicGo":true}').selections).toEqual({});
  });

  it("renders representative academic and practical items without a public route", () => {
    for (const id of ["kisho-65-ippan-q01", "kisho-65-pm1-q01", "kisho-66-pm1-q01"]) {
      const html = renderToStaticMarkup(<KishoPrivateReader initialQuestionId={id} resolvePrivateImage={() => png} />);
      expect(html).toContain('data-public-go="false"');
      expect(html).toContain("全78問の移動");
      expect(html).toContain(`第${id.includes("-65-") ? 65 : 66}回`);
    }
  });

  it("navigates all 78 items, grades academic answers, and saves practical drafts", () => {
    localStorage.clear();
    render(<KishoPrivateReader resolvePrivateImage={() => png} />);
    expect(screen.getAllByRole("button", { name: /^第(?:65|66)回 (?:学科一般|学科専門|実技1|実技2) 問\d+$/u })).toHaveLength(78);
    const first = KISHO_PRIVATE_QUESTIONS[0]!;
    fireEvent.click(screen.getByLabelText(`${first.raw.answer} ${first.raw.choices?.[first.raw.answer]}`));
    fireEvent.click(screen.getByRole("button", { name: "答え合わせ" }));
    expect(screen.getByText("正解")).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "第66回 実技1 問1" }));
    const answerBox = screen.getAllByRole("textbox")[0]!;
    fireEvent.change(answerBox, { target: { value: "手書きの試答" } });
    fireEvent.click(screen.getByRole("button", { name: "下書きを保存" }));
    expect(localStorage.getItem("private:kisho-65-66:draft:v1")).toContain("手書きの試答");
  });
});
