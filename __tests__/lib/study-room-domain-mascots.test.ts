import { expect, it, vi } from "vitest";
vi.mock("@/lib/home/study-room-mascots.generated.json", () => ({ default: {
  exams: { ip: { study: "/ip-study.webp", break: "/ip-break.webp", breakLabel: "消しゴム" }, eisei1: { study: "/eisei-study.webp", break: "/eisei-break.webp", breakLabel: "休憩" } },
  domains: { "information-technology": { study: "/it-study.webp", break: "/it-break.webp", breakLabel: "うたた寝" }, safety: { study: "/safety-study.webp", break: "/safety-break.webp", breakLabel: "休憩" } },
  examDomains: { ip: "information-technology", fe: "information-technology", eisei2: "safety" },
  away: { exams: { ip: { src: "/ip-away.webp", label: "おもちゃ追い" } }, fields: { safety: { src: "/safety-away.webp", label: "ボール遊び" } }, examFields: { eisei2: "safety" } },
} }));
import { qualificationMascot } from "@/lib/home/study-room";

it("uses a domain asset only when the qualification has no dedicated pair", () => {
  const slot = { src: "/generic.webp", state: "break" as const, stateLabel: "あるある", mirrored: true };
  expect(qualificationMascot("ip", slot)).toMatchObject({ src: "/ip-break.webp", stateLabel: "あるある：消しゴム", mirrored: true });
  expect(qualificationMascot("fe", slot)).toMatchObject({ src: "/it-break.webp", stateLabel: "あるある：うたた寝", mirrored: true });
  expect(qualificationMascot("unknown", slot)).toBe(slot);
  expect(qualificationMascot("dai-1-shu-eisei-kanrisha", slot).src).toBe("/eisei-break.webp");
  expect(qualificationMascot("dai-2-shu-eisei-kanrisha", slot).src).toBe("/safety-break.webp");
});

it("resolves the matching away outfit and keeps missing away art at the original study desk", () => {
  const slot = { src: "/generic-study.webp", state: "away" as const, stateLabel: "席を立って遊んでいる", mirrored: true, vacantSrc: "/vacant.webp" };
  expect(qualificationMascot("ip", slot)).toMatchObject({ src: "/ip-away.webp", state: "away", stateLabel: "席を立って遊んでいる：おもちゃ追い" });
  expect(qualificationMascot("dai-2-shu-eisei-kanrisha", slot)).toMatchObject({ src: "/safety-away.webp", state: "away", mirrored: true });
  expect(qualificationMascot("fe", slot)).toMatchObject({ src: "/it-study.webp", state: "study", stateLabel: "勉強中", vacantSrc: undefined });
  expect(qualificationMascot("unknown", slot)).toMatchObject({ src: "/generic-study.webp", state: "study" });
});
