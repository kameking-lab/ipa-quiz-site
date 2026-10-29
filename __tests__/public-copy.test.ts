// @vitest-environment node
import fs from "node:fs";
import path from "node:path";
import { expect, it } from "vitest";
import { FAQS } from "@/data/faq";
const root=path.resolve(import.meta.dirname,"..");
it("billing FAQ publishes the adopted price, trial boundary and cancellation rather than obsolete all-free promises",()=>{
  const billing=FAQS.filter(entry=>entry.category==="billing").map(entry=>entry.answer).join("\n");
  for(const text of ["税込980円","1日10問","日本時間0時","毎月自動更新","期間末解約","日割返金はありません","法令上の権利","/billing"])expect(billing).toContain(text);
  for(const text of ["全機能を無料","具体的なプラン化の予定はありません","コア機能は無料維持"])expect(billing).not.toContain(text);
});
it.each(["app/about/page.tsx","app/transparency/page.tsx"])("%s removes only contradictory blanket price promises",file=>{
  const source=fs.readFileSync(path.join(root,file),"utf8");
  for(const text of ["全機能無料","全機能を無料","すべての機能を完全無料","料金は一切かかりません","今後も継続して無料"])expect(source).not.toContain(text);
  expect(source).toContain("980円");expect(source).toContain("無料");expect(source).toContain("/billing");
});
it("terms identify the adoption date and period-end cancellation without removing refund/legal boundaries",()=>{
  const source=fs.readFileSync(path.join(root,"app/terms/page.tsx"),"utf8");
  for(const text of ["2026年10月28日","期間末解約を予約した後","日割返金はありません","重複請求・誤請求","法令上の権利は制限しません","返金と解約は別"])expect(source).toContain(text);
});
