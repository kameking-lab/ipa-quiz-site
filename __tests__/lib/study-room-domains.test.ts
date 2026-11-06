import { expect, it } from "vitest";
import { QUALIFICATION_HUBS } from "@/lib/exam-qualification-hubs";
import { canonicalPresenceExam } from "@/lib/study-presence";
import { mascotExamDomains } from "@/lib/home/study-room-domains";

it("covers every accepted paper hub as well as catalog and IPA qualifications", () => {
  const domains = mascotExamDomains();
  for (const hub of QUALIFICATION_HUBS) expect(domains[canonicalPresenceExam(hub.slug)!]).toBeTruthy();
  expect(domains["ni-kyu-boiler-gishi"]).toBe("safety");
  expect(domains["survey-assistant"]).toBe("construction");
  expect(domains.eisei1).toBe("safety");
  expect(domains.ip).toBe("information-technology");
  expect(domains.yakuzaishi).toBe("pharmacy");
});
