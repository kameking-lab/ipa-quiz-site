import { describe, it, expect, vi, beforeEach } from "vitest";
const stubs = vi.hoisted(() => ({stream: vi.fn(), cost: vi.fn(), notify: vi.fn()}));
vi.mock("@/lib/ai/provider", async () => ({...await vi.importActual("@/lib/ai/provider"), getProvider: async () => ({name: "gemini", streamChat: stubs.stream})}));
vi.mock("@/lib/ai/cost-guard", async () => ({...await vi.importActual("@/lib/ai/cost-guard"), checkMonthlyCostCap: async () => ({allowed: true}), recordAiCost: stubs.cost}));
vi.mock("@/lib/notify/ops-alert", () => ({buildGradingFallbackAlert: () => "metadata only", notifyOpsInBackground: stubs.notify}));
vi.mock("@/lib/monitoring/sentry", () => ({captureException: vi.fn()}));
import { POST as essay } from "@/lib/essay/legacy-grade";
const essayBody = {questionId: "au-2024a-pm2-q1", industry: "it", answers: {ア: "無意味".repeat(250), イ: "無意味".repeat(400), ウ: "無意味".repeat(250)}};
const validEssay = {rank: "B", passProbability: 50, subResults: ["ア","イ","ウ"].map(key => ({key, score: 60, axes: {relevance:60,logic:60,concreteness:60,industryFit:60},goodPoints:[],improvements:["根拠を説明"],missingElements:[]})), overallAdvice: "改善を確認", unnecessaryElements: []};
let counter = 1;
beforeEach(() => {vi.clearAllMocks(); delete process.env.KV_REST_API_URL; delete process.env.KV_REST_API_TOKEN;});
function request(body: unknown) {return new Request("http://localhost/api/test", {method:"POST", headers:{"content-type":"application/json","x-forwarded-for":`10.99.0.${counter++}`}, body:JSON.stringify(body)});}
describe("essay evaluation contract", () => {
  it("retains genuine content feedback", async () => {
    stubs.stream.mockImplementation(async function*(){yield JSON.stringify(validEssay);});
    const res=await essay(request(essayBody)); const body=await res.json();
    expect(res.status).toBe(200); expect(body.status).toBe("graded"); expect(body.gradingMode).toBe("ai");
    expect(body.subResults[0].improvements).toEqual(["根拠を説明"]); expect(stubs.cost).toHaveBeenCalledOnce();
  });
  it.each(["not JSON", "{", JSON.stringify({subResults:[]}), JSON.stringify({...validEssay,subResults:[{score:NaN}]})])("invalid response is ungraded: %s", async raw => {
    stubs.stream.mockImplementation(async function*(){yield raw;});
    const res=await essay(request(essayBody)); const body=await res.json();
    expect(res.status).toBe(503); expect(body.status).toBe("unavailable");
    for(const key of ["rank","passProbability","totalScore","subResults","gradedAt"]) expect(body).not.toHaveProperty(key);
  });
  it("provider failure cannot create a grade", async () => {
    stubs.stream.mockImplementation(async function*(){throw new Error("test failure"); yield "";});
    const res=await essay(request(essayBody)); expect(res.status).toBe(503); expect((await res.json()).status).toBe("unavailable");
  });
  it("truncated output has an explicit unavailable state", async () => {
    stubs.stream.mockImplementation(async function* (options){options.onComplete?.({truncated:true,finishReason:"MAX_TOKENS"}); yield "{";});
    const res=await essay(request(essayBody)); expect((await res.json()).error).toBe("truncated_response");
  });
});
