import { expect, it } from "vitest";
import { AP_QUESTIONS_2025_SPRING as questions } from "@/data/questions/ap/by-year/2025-spring";
const question=(n:number)=>questions.find(q=>q.qNumber===n)!;
const implies=(a:boolean,b:boolean)=>!a||b;
it("preserves the official answer and negation scopes for AP2025 spring q1",()=>{
  const q=question(1);
  expect(q.answer).toBe("エ");
  expect(q.choices).toEqual({ア:"((P→Q)∧(Q→P))→(R→¬Q)",イ:"((P→Q)∧¬(Q→¬P))→(Q→R)",ウ:"((P→¬Q)∨(Q→P))→(R→¬Q)",エ:"((P→¬Q)∨(Q→¬P))→(Q→R)"});
  const P=true,Q=true;
  for(const R of [true,false])expect(implies(implies(P,!Q)||implies(Q,!P),implies(Q,R))).toBe(true);
  expect(implies(implies(P,Q)&&implies(Q,P),implies(true,!Q))).toBe(false);
  expect(implies(implies(P,Q)&&!implies(Q,!P),implies(Q,false))).toBe(false);
});
it("keeps the inputs needed to solve the restored questions independently of their answers",()=>{
  expect(question(36).question).toContain("user=;cat%20/etc/passwd");
  for(const value of ["0.9","1.1","1.2"])expect(question(52).question).toContain(value);
  for(const value of ["50時間","100時間","400時間","60万円","360万円"])expect(question(64).question).toContain(value);
  const saving=(60/(50+100)*50+360/(50+400)*50)*0.2;
  expect(saving).toBe(12);expect(question(64).choices!["ウ"]).toBe("12万円");
});
