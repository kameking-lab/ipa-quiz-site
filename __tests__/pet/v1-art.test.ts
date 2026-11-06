import { expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { petArtFor, PET_GENERIC_ART } from "@/lib/pet/v1/art";
import outfits from "@/lib/pet/v1/outfits.generated.json";
import catalog from "@/lib/home/study-room-mascots.generated.json";
import audit from "@/lib/pet/v1/art-audit.generated.json";

it("ships only small derivatives of the accepted original or recorded ANIM2 sources", () => {
  expect(audit.accepted).toBe(109); expect(audit.planned).toBe(0);
  for (const file of audit.files) {
    const output = readFileSync(`public/images/pet-v1/${file.id}.webp`);
    expect(createHash("sha256").update(output).digest("hex")).toBe(file.outputSha256);
    // Design originals live outside the shipped repo; verify them only when present.
    if (existsSync(file.source)) expect(createHash("sha256").update(readFileSync(file.source)).digest("hex")).toBe(file.sourceSha256);
    expect(output.length).toBeLessThan(60000);
  }
});
it("keeps qualification outfits and explicit pharmacy alias; never borrows another qualification", () => {
  for (const stage of ["puppy", "partner"] as const) for (const pose of ["study", "correct", "incorrect", "revealed", "rest", "meal", "petted", "slack"] as const) {
    for (const qualification of ["ip", "ap", "takken", "fp3", "civil2", "yakuzaishi"]) expect(petArtFor(qualification, stage, pose)).toContain(`/${qualification}-${stage}-${pose}.webp`);
  }
  expect(petArtFor("pharmacy", "puppy", "study")).toBe(petArtFor("yakuzaishi", "puppy", "study"));
  expect(petArtFor("__proto__", "puppy", "correct")).toBe(PET_GENERIC_ART.study);
  expect(petArtFor(null, "puppy", "rest")).toBe(PET_GENERIC_ART.rest);
  for (const qualification of ["ip", "ap", "takken", "fp3", "civil2", "yakuzaishi"]) expect(existsSync(`public${petArtFor(qualification, "puppy", "study")}`)).toBe(true);
});

it("never falls back to the slimmer guide art; other qualifications keep their own round study-room outfit", () => {
  for (const [exam, pair] of Object.entries(catalog.exams)) {
    const name = (outfits as Record<string, string>)[exam];
    expect(`/images/home/study-room-mascots/${name}-study.webp`).toBe(pair.study);
    expect(`/images/home/study-room-mascots/${name}-break.webp`).toBe(pair.break);
  }
  expect(Object.keys(outfits).sort()).toEqual(Object.keys(catalog.exams).sort());
  expect(petArtFor("sharoushi", "partner", "study")).toBe("/images/home/study-room-mascots/sharoushi-study.webp");
  expect(petArtFor("sharoushi", "puppy", "rest")).toBe("/images/home/study-room-mascots/sharoushi-break.webp");
  for (const exam of Object.keys(outfits)) for (const pose of ["study", "correct", "incorrect", "revealed", "rest", "meal", "petted", "slack"] as const) {
    const src = petArtFor(exam, "puppy", pose);
    expect(src).not.toContain("/mascot/");
    expect(existsSync(`public${src}`)).toBe(true);
  }
  for (const src of Object.values(PET_GENERIC_ART)) expect(existsSync(`public${src}`)).toBe(true);
});
const POSES = ["study", "correct", "incorrect", "revealed", "rest", "meal", "petted", "slack"] as const;
it("FE and SG puppies react in their own study-room outfit", () => {
  for (const exam of ["fe", "sg"]) {
    for (const pose of ["correct", "incorrect", "revealed", "meal", "petted", "rest"] as const) {
      const src = petArtFor(exam, "puppy", pose);
      expect(src).toBe(`/images/pet-v1/${exam}-puppy-${pose}.webp`);
      expect(readFileSync(`public${src}`).length).toBeLessThan(60000);
    }
    expect(petArtFor(exam, "puppy", "study")).toBe(`/images/home/study-room-mascots/${exam}-study.webp`);
    expect(petArtFor(exam, "puppy", "slack")).toBe(`/images/home/study-room-mascots/${exam}-break.webp`);
  }
});
it("every stage of the eight pet qualifications has its own drawn look in all poses", () => {
  for (const exam of ["ip", "ap", "takken", "fp3", "civil2", "yakuzaishi", "fe", "sg"]) {
    for (const stage of ["partner", "expert"] as const) for (const pose of POSES) {
      const src = petArtFor(exam, stage, pose);
      expect(src).toBe(`/images/pet-v1/${exam}-${stage}-${pose}.webp`);
      expect(readFileSync(`public${src}`).length).toBeLessThan(60000);
    }
  }
});
