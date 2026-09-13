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

  it("wires the verified AU article (reports/revenue-eco-20260913/receipts/free-01-au-am2.json, ok:true)", () => {
    expect(getNoteGuide("au")).toEqual({
      kind: "free",
      href: "https://note.com/sikaku_rakutoru/n/n573e38ac5dea",
      label: "科目A-2(択一)を論文対策の前に1周させる",
      source: "exam_au",
      account: "sikaku_rakutoru",
    });
  });

  it("wires the verified SC article (reports/revenue-eco-20260913/receipts/free-02-sc-am2.json, ok:true)", () => {
    expect(getNoteGuide("sc")).toEqual({
      kind: "free",
      href: "https://note.com/sikaku_rakutoru/n/nee848928ccb7",
      label: "科目A-2を記述対策の隣に置く",
      source: "exam_sc",
      account: "sikaku_rakutoru",
    });
  });

  it("does not register guides for the still-unpublished PM/DB A-2 drafts", () => {
    // reports/revenue-eco-20260913 の free-03/04 は本セッション時点で公開URL未確認。
    // 確認できていないURLをここに書かない(fake URL 禁止)。
    expect(getNoteGuide("pm")).toBeUndefined();
    expect(getNoteGuide("db")).toBeUndefined();
  });

  it("never mixes free/paid wording into a label", () => {
    for (const guide of Object.values(EXAM_NOTE_GUIDES)) {
      if (!guide) continue;
      if (guide.kind === "paid") expect(guide.label).not.toMatch(/無料/);
      if (guide.kind === "free") expect(guide.label).not.toMatch(/有料|¥|円/);
    }
  });
});
