import {beforeEach,expect,it,vi} from "vitest";
import {requestAiConsent,revokeAiConsent,AI_CONSENT_NOTICE} from "@/lib/ai/consent";
beforeEach(()=>localStorage.clear());
it("does not authorize sending on refusal and describes recipient, contents and purpose",()=>{
  const confirm=vi.spyOn(window,"confirm").mockReturnValue(false);
  expect(requestAiConsent()).toBe(false);expect(requestAiConsent()).toBe(false);expect(confirm).toHaveBeenCalledTimes(2);
  for(const text of ["Google Gemini","答案","会話履歴","個人情報","採点"])expect(AI_CONSENT_NOTICE).toContain(text);
  confirm.mockRestore();
});
it("remembers explicit consent and asks again after withdrawal",()=>{
  const confirm=vi.spyOn(window,"confirm").mockReturnValue(true);
  expect(requestAiConsent()).toBe(true);expect(requestAiConsent()).toBe(true);expect(confirm).toHaveBeenCalledTimes(1);
  revokeAiConsent();confirm.mockReturnValue(false);expect(requestAiConsent()).toBe(false);expect(confirm).toHaveBeenCalledTimes(2);confirm.mockRestore();
});
