import { describe, expect, it } from "vitest";

import { EXAM_NOTE_GUIDES, getNoteGuide } from "@/lib/note-guides";

describe("note-guides", () => {
  it("keeps the sa/st/nw entries byte-for-byte from the previous component map", () => {
    expect(getNoteGuide("sa")).toEqual({
      kind: "free",
      href: "https://note.com/sikaku_rakutoru/n/n9e207dfe4421",
      label: "性能見積もりの根拠を4段階で書く",
      source: "exam_sa",
      account: "sikaku_rakutoru",
    });
    expect(getNoteGuide("st")?.href).toBe(
      "https://note.com/sikaku_rakutoru/n/n6ebb89810300",
    );
    expect(getNoteGuide("nw")?.href).toBe(
      "https://note.com/sikaku_rakutoru/n/n3a7c95159e7a",
    );
  });

  it("returns undefined for exam codes without a registered guide", () => {
    expect(getNoteGuide("ip")).toBeUndefined();
    expect(getNoteGuide("ap")).toBeUndefined();
  });

  it("never mixes free/paid wording into a label", () => {
    for (const guide of Object.values(EXAM_NOTE_GUIDES)) {
      if (!guide) continue;
      if (guide.kind === "paid") expect(guide.label).not.toMatch(/無料/);
      if (guide.kind === "free") expect(guide.label).not.toMatch(/有料|¥|円/);
    }
  });
});
