import { FREE_AI_DAILY_LIMIT } from "../../lib/constants/ai-quota";
import { applyDelta, jstDay, type Choice, type Exam, type Question } from "./domain";
import { Repository } from "./state";
import { apiRequest, isOnline, parseJson, type Transport } from "./platform";

// RevenueCat/IAP v1.1 will implement this boundary. Offline practice is a free
// capability in v1 and never depends on a client-side premium flag.
export interface EntitlementProvider {
  current(): Promise<{ plan: "free" | "pro"; source: "v1-free" | "server-verified" }>;
}
export const entitlementProvider: EntitlementProvider = {
  async current() { return { plan: "free", source: "v1-free" }; },
};

export class StudyService {
  constructor(readonly repo: Repository, private request: Transport = apiRequest,
    private online: () => Promise<boolean> = isOnline) {}

  async updatePack(exam: Exam): Promise<boolean> {
    if (!await this.online()) throw new Error("問題更新にはインターネット接続が必要です。");
    const current = this.repo.state.packs[exam];
    const response = await this.request(`/api/mobile/packs?pack=${exam}&since=${current.version}`);
    if (response.status === 204) return false;
    if (response.status !== 200) throw new Error("更新を取得できません。保存済みの問題を引き続き使えます。");
    const next = await applyDelta(current, parseJson(response.data));
    await this.repo.update(state => {
      if (state.packs[exam].version !== current.version) throw new Error("更新が競合しました。再度確認してください。");
      state.packs[exam] = next;
      if (state.resume?.exam === exam && !next.questions.some(q => q.id === state.resume?.questionId)) state.resume = null;
      return state;
    });
    return true;
  }

  async ask(question: Question, message: string, selected?: Choice): Promise<string> {
    if (!message.trim() || message.length > 4000) throw new Error("質問は1〜4,000文字で入力してください。");
    if (!await this.online()) throw new Error("AIコパイロットはオンライン時のみ利用できます。");
    // Reserve before dispatch to prevent concurrent taps or failures from
    // bypassing the local soft cap. The existing server remains authoritative.
    await this.repo.update(state => {
      if (!state.aiConsent) throw new Error("送信内容と送信先を確認し、AIへの送信に同意してください。");
      if (state.aiQuota.day !== jstDay()) state.aiQuota = { day: jstDay(), used: 0 };
      if (state.aiQuota.used >= FREE_AI_DAILY_LIMIT) throw new Error("本日のAI無料枠（10回）に達しました。日本時間0時にリセットされます。");
      state.aiQuota.used++;
      return state;
    });
    const response = await this.request("/api/copilot", {
      question, messages: [{ role: "user", content: message.trim() }],
      selectedChoice: selected, isCorrect: selected === undefined ? undefined : selected === question.answer,
      responseLength: "medium", tier: "free",
    });
    if (response.status === 429) {
      let daily = false;
      try {
        const error = parseJson(response.data);
        daily = typeof error === "object" && error !== null && "reason" in error && error.reason === "daily";
      } catch { /* Generic rate-limit message, never expose website upsells. */ }
      if (daily) await this.repo.update(s => { s.aiQuota = { day: jstDay(), used: FREE_AI_DAILY_LIMIT }; return s; });
      throw new Error(daily ? "サーバーの本日の無料枠に達しました。日本時間0時以降にお試しください。" : "利用が集中しています。時間をおいてお試しください。");
    }
    if (response.status !== 200 || typeof response.data !== "string" || !response.data.trim())
      throw new Error("AIの回答を取得できませんでした。固定解説をご利用ください。");
    // The existing endpoint streams plain text. Native HTTP buffers the response
    // and preserves timeout/error markers returned inside an HTTP 200 stream.
    return response.data;
  }
}
