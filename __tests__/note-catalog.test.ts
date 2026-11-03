import { describe, expect, it } from "vitest";
import { noteCatalogDestination, noteCatalogUrl } from "../lib/note-catalog";
describe("unified note catalog navigation", () => {
  it("keeps exact qualification IDs from each original exam", () => {
    expect(new URL(noteCatalogUrl("ip")).searchParams.get("qualification")).toBe("itpassport");
    expect(new URL(noteCatalogUrl("fe")).searchParams.get("qualification")).toBe("kihon-joho");
    expect(new URL(noteCatalogUrl("civil2")).searchParams.get("qualification")).toBe("doboku-sekou-2kyu");
    expect(new URL(noteCatalogDestination("https://note.com/ipa_quiz_ai/n/n064d3e69bd4e", "exam_sg_paid")).searchParams.get("qualification")).toBe("sg");
  });
  it("unifies profiles, magazines and articles but leaves unrelated destinations alone", () => {
    for (const href of ["https://note.com/ipa_quiz_ai", "https://note.com/sikaku_rakutoru/m/m123456789abc", "https://note.com/anzen_ai_jp/n/n123456789abc"]) expect(new URL(noteCatalogDestination(href, "footer")).pathname).toBe("/articles");
    expect(noteCatalogDestination("https://note.com/other", "footer")).toBe("https://note.com/other");
    expect(noteCatalogDestination("https://example.com", "footer")).toBe("https://example.com");
  });
});
