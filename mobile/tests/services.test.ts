import { afterEach, describe, expect, it, vi } from "vitest";
import { StudyService } from "../src/services";
import { jstDay } from "../src/domain";
import { createDelta } from "../server/packs";
import { repository } from "./helpers";

afterEach(() => vi.useRealTimers());
describe("offline/online boundary and existing AI contract", () => {
  it("makes no request when offline or consent is absent", async () => {
    const { repo } = await repository();
    const request = vi.fn();
    const offline = new StudyService(repo, request, async () => false);
    await expect(offline.ask(repo.state.packs.ip.questions[0], "教えて")).rejects.toThrow("オンライン");
    await expect(offline.updatePack("ip")).rejects.toThrow("接続");
    const online = new StudyService(repo, request, async () => true);
    await expect(online.ask(repo.state.packs.ip.questions[0], "教えて")).rejects.toThrow("同意");
    expect(request).not.toHaveBeenCalled();
    expect(repo.state.aiQuota.used).toBe(0);
  });
  it("allows 10 anonymous requests and prevents concurrent eleventh requests", async () => {
    const { repo } = await repository();
    await repo.update(s => { s.aiConsent = true; return s; });
    const request = vi.fn(async () => ({ status: 200, data: "AIの回答です" }));
    const service = new StudyService(repo, request, async () => true);
    const q = repo.state.packs.ip.questions[0];
    const settled = await Promise.allSettled(Array.from({ length: 11 }, () => service.ask(q, "なぜ？", "ア")));
    expect(settled.filter(s => s.status === "fulfilled")).toHaveLength(10);
    expect(request).toHaveBeenCalledTimes(10);
    expect(request.mock.calls[0]).toEqual(["/api/copilot", {
      question: q, messages: [{ role: "user", content: "なぜ？" }],
      selectedChoice: "ア", isCorrect: q.answer === "ア", responseLength: "medium", tier: "free",
    }]);
    expect(JSON.stringify(request.mock.calls)).not.toMatch(/authorization|premium|learnerProfile/);
  });
  it("resets the local soft cap at JST midnight", async () => {
    vi.useFakeTimers(); vi.setSystemTime(new Date("2026-11-03T15:00:00Z"));
    const { repo } = await repository();
    await repo.update(s => { s.aiConsent = true; s.aiQuota = { day: "2026-11-03", used: 10 }; return s; });
    const service = new StudyService(repo, async () => ({ status: 200, data: "回答" }), async () => true);
    await service.ask(repo.state.packs.ip.questions[0], "質問");
    expect(repo.state.aiQuota).toEqual({ day: jstDay(), used: 1 });
  });
  it("honors earlier server limits and hides feedback/purchase upsells", async () => {
    const { repo } = await repository();
    await repo.update(s => { s.aiConsent = true; return s; });
    const request = vi.fn(async () => ({ status: 429, data: JSON.stringify({ reason: "daily", message: "フィードバックで無制限、Web購入" }) }));
    const service = new StudyService(repo, request, async () => true);
    await expect(service.ask(repo.state.packs.ip.questions[0], "質問")).rejects.toThrow("サーバーの本日");
    expect(repo.state.aiQuota.used).toBe(10);
    await expect(service.ask(repo.state.packs.ip.questions[0], "再送")).rejects.toThrow("無料枠");
    expect(request).toHaveBeenCalledTimes(1);
  });
  it("does not automatically retry network/provider errors and keeps the attempt reserved", async () => {
    const { repo } = await repository();
    await repo.update(s => { s.aiConsent = true; return s; });
    const request = vi.fn(async () => ({ status: 503, data: "unavailable" }));
    const service = new StudyService(repo, request, async () => true);
    await expect(service.ask(repo.state.packs.ip.questions[0], "質問")).rejects.toThrow("固定解説");
    expect(repo.state.aiQuota.used).toBe(1);
    expect(request).toHaveBeenCalledTimes(1);
  });
  it("preserves stream timeout/error markers inside HTTP 200", async () => {
    const { repo } = await repository();
    await repo.update(s => { s.aiConsent = true; return s; });
    const service = new StudyService(repo, async () => ({ status: 200, data: "部分回答\n[タイムアウト] 途中で止まりました" }), async () => true);
    expect(await service.ask(repo.state.packs.ip.questions[0], "質問")).toContain("[タイムアウト]");
  });
  it("atomically applies a valid delta and keeps the installed pack on invalid hash or disk failure", async () => {
    const { repo, storage } = await repository();
    const base = structuredClone(repo.state.packs.ip);
    const next = structuredClone(base); next.version = 2; next.questions[0].explanation = "訂正済みの解説";
    const delta = await createDelta(base, next);
    const request = vi.fn(async () => ({ status: 200, data: JSON.stringify(delta) }));
    const service = new StudyService(repo, request, async () => true);
    storage.failWrite = true;
    await expect(service.updatePack("ip")).rejects.toThrow();
    expect(repo.state.packs.ip).toEqual(base);
    storage.failWrite = false;
    expect(await service.updatePack("ip")).toBe(true);
    expect(repo.state.packs.ip).toEqual(next);
    expect(request).toHaveBeenCalledWith("/api/mobile/packs?pack=ip&since=1");
  });
  it("does not rewrite a current pack on 204", async () => {
    const { repo, storage } = await repository();
    const service = new StudyService(repo, async () => ({ status: 204, data: "" }), async () => true);
    expect(await service.updatePack("fe")).toBe(false);
    expect(storage.current).toBeNull();
  });
  it("withdraws a removed resume question while retaining historical attempts", async () => {
    const { repo } = await repository();
    const base = structuredClone(repo.state.packs.ip);
    await repo.update(s => {
      s.resume = { exam: "ip", questionId: base.questions[0].id, reviewOnly: true, selected: "ア" };
      s.history.push({ questionId: base.questions[0].id, selected: "ア", correct: false, uncertain: false, answeredAt: new Date().toISOString() });
      return s;
    });
    const next = structuredClone(base); next.version = 2; next.questions.shift();
    const delta = await createDelta(base, next);
    const service = new StudyService(repo, async () => ({ status: 200, data: JSON.stringify(delta) }), async () => true);
    await service.updatePack("ip");
    expect(repo.state.resume).toBeNull();
    expect(repo.state.history).toHaveLength(1);
  });
});
