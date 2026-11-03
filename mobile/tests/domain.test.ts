import { describe, expect, it } from "vitest";
import { applyDelta, jstDay, packHash, progressFor, queueFor, type Answer } from "../src/domain";
import { initialState } from "../src/state";
import { createDelta, handlePackRequest } from "../server/packs";
import inventory from "../src/packs/inventory.json";
import reviewedSources from "../content-review.json";

describe("bundled offline content", () => {
  it("contains four choices, local explanation, no external image and reproducible provenance hashes", async () => {
    const packs = initialState().packs;
    expect(packs.ip.questions).toHaveLength(20);
    expect(packs.fe.questions).toHaveLength(16);
    for (const record of inventory) {
      const pack = packs[record.id as "ip" | "fe"];
      expect(await packHash(pack)).toBe(record.sha256);
      expect(pack.questions.map(q => q.id)).toEqual(record.sourceQuestionIds);
      for (const q of pack.questions) {
        expect(Object.keys(q.choices)).toHaveLength(4);
        expect(q.choices[q.answer].length).toBeGreaterThan(0);
        expect(q.explanation.length).toBeGreaterThan(20);
        expect(q.hasImage).toBe(false);
        expect(q.license).toBe("IPA-public");
        const reviewed = reviewedSources[pack.id];
        expect(q.sourcePdfUrl).toBe(reviewed.questionPdf);
        expect(q.sourceAnswerUrl).toBe(reviewed.answerPdf);
        expect(q.answer).toBe((reviewed.answers as Record<string, string>)[String(q.qNumber)]);
      }
    }
  });
});

describe("versioned question packs", () => {
  const base = initialState().packs.ip;
  function nextRelease() {
    const next = structuredClone(base);
    next.version = 2;
    next.questions.shift();
    next.questions[0].explanation = "訂正された学習用の解説です。";
    next.questions.push({ ...structuredClone(next.questions[0]), id: "ip-new-q1" });
    next.questions.sort((a, b) => a.id.localeCompare(b.id, "en"));
    return next;
  }
  it("downloads only additions, edits and removals and verifies the reconstructed hash", async () => {
    const next = nextRelease();
    const delta = await createDelta(base, next);
    expect(delta.upserts).toHaveLength(2);
    expect(delta.deletedIds).toEqual([base.questions[0].id]);
    expect(await applyDelta(base, delta)).toEqual(next);
    expect(base.version).toBe(1);
  });
  it("rejects stale versions, wrong exam, duplicate ids, executable fields and hash tampering", async () => {
    const delta = await createDelta(base, nextRelease());
    await expect(applyDelta(base, { ...delta, fromVersion: 0 })).rejects.toThrow();
    await expect(applyDelta(base, { ...delta, toVersion: 1 })).rejects.toThrow();
    await expect(applyDelta(base, { ...delta, packId: "fe" })).rejects.toThrow();
    await expect(applyDelta(base, { ...delta, upserts: [...delta.upserts, delta.upserts[0]] })).rejects.toThrow();
    await expect(applyDelta(base, { ...delta, js: "alert(1)" })).rejects.toThrow();
    await expect(applyDelta(base, { ...delta, sha256: "0".repeat(64) })).rejects.toThrow();
    await expect(applyDelta(base, { ...delta, upserts: [{ ...delta.upserts[0], hasImage: true }] })).rejects.toThrow();
  });
  it("serves the public API without auth and preserves compatibility/error status", async () => {
    const catalog = { ip: [base, nextRelease()] };
    const request = (query: string) => new Request(`https://example.test/api/mobile/packs?${query}`);
    const updated = await handlePackRequest(request("pack=ip&since=1"), catalog);
    expect(updated.status).toBe(200);
    expect(await applyDelta(base, await updated.json())).toEqual(catalog.ip[1]);
    expect((await handlePackRequest(request("pack=ip&since=2"), catalog)).status).toBe(204);
    expect((await handlePackRequest(request("pack=ip&since=99"), catalog)).status).toBe(409);
    expect((await handlePackRequest(request("pack=ip&since=-1"), catalog)).status).toBe(400);
    expect((await handlePackRequest(request("pack=other&since=1"), catalog)).status).toBe(400);
  });
});

describe("local review scheduling", () => {
  const pack = initialState().packs.ip;
  const q = pack.questions[0];
  const wrong: Answer = { questionId: q.id, selected: "ア", correct: false, uncertain: false, answeredAt: "2026-11-03T01:00:00.000Z" };
  it("keeps incorrect and uncertain answers until a confident correct attempt", () => {
    expect(queueFor(pack, [wrong], true).map(q => q.id)).toEqual([q.id]);
    const uncertain = { ...wrong, correct: true, uncertain: true, answeredAt: "2026-11-03T02:00:00.000Z" };
    expect(progressFor([wrong, uncertain]).get(q.id)?.review).toBe(true);
    const correct = { ...uncertain, uncertain: false, answeredAt: "2026-11-03T03:00:00.000Z" };
    expect(queueFor(pack, [wrong, uncertain, correct], true)).toHaveLength(0);
    expect(progressFor([wrong, uncertain, correct]).get(q.id)?.attempts).toBe(3);
    expect(queueFor(pack, [correct], false)[0].id).not.toBe(q.id);
  });
  it("uses the server's JST date boundary", () => {
    expect(jstDay(new Date("2026-11-03T14:59:59Z"))).toBe("2026-11-03");
    expect(jstDay(new Date("2026-11-03T15:00:00Z"))).toBe("2026-11-04");
  });
});
