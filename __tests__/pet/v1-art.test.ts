import { expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { petArtFor, PET_GENERIC_ART } from "@/lib/pet/v1/art";
import outfits from "@/lib/pet/v1/outfits.generated.json";
import catalog from "@/lib/home/study-room-mascots.generated.json";
import audit from "@/lib/pet/v1/art-audit.generated.json";
import fields from "@/lib/pet/v1/fields.json";

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
it("keeps the explicit pharmacy alias and never borrows another qualification", () => {
  expect(petArtFor("pharmacy", "puppy", "study")).toBe(petArtFor("yakuzaishi", "puppy", "study"));
  expect(petArtFor("pharmacy", "expert", "correct")).toBe(petArtFor("yakuzaishi", "expert", "correct"));
  expect(petArtFor("__proto__", "puppy", "correct")).toBe(PET_GENERIC_ART.study);
  expect(petArtFor(null, "puppy", "rest")).toBe(PET_GENERIC_ART.rest);
});

it("never falls back to the slimmer guide art; other qualifications keep their own round study-room outfit", () => {
  for (const [exam, pair] of Object.entries(catalog.exams)) {
    const name = (outfits as Record<string, string>)[exam];
    expect(`/images/home/study-room-mascots/${name}-study.webp`).toBe(pair.study);
    expect(`/images/home/study-room-mascots/${name}-break.webp`).toBe(pair.break);
  }
  expect(Object.keys(outfits).sort()).toEqual(Object.keys(catalog.exams).sort());
  expect(petArtFor("sharoushi", "puppy", "study")).toBe("/images/home/study-room-mascots/sharoushi-study.webp");
  expect(petArtFor("sharoushi", "puppy", "slack")).toBe("/images/home/study-room-mascots/sharoushi-break.webp");
  for (const exam of Object.keys(outfits)) for (const pose of ["study", "correct", "incorrect", "revealed", "rest", "meal", "petted", "slack"] as const) {
    const src = petArtFor(exam, "puppy", pose);
    expect(src).not.toContain("/mascot/");
    expect(existsSync(`public${src}`)).toBe(true);
  }
  for (const src of Object.values(PET_GENERIC_ART)) expect(existsSync(`public${src}`)).toBe(true);
});
const POSES = ["study", "correct", "incorrect", "revealed", "rest", "meal", "petted", "slack"] as const;
/** The approved character every qualification shows at every stage: its own (30 dedicated) or its field's. */
function character(exam: string) {
  const fieldOf = fields as Record<string, string>;
  return Object.hasOwn(fieldOf, exam) ? `field-${fieldOf[exam]}` : exam;
}
it("every catalog qualification shows its approved character at every stage and pose", () => {
  const fieldOf = fields as Record<string, string>;
  expect(fieldOf).toEqual(catalog.away.examFields);
  const audited = new Set(audit.files.map(file => file.id));
  for (const exam of Object.keys(catalog.exams)) {
    const c = character(exam);
    const pair = catalog.exams[exam as keyof typeof catalog.exams];
    for (const stage of ["puppy", "partner", "expert"] as const) for (const pose of POSES) {
      const src = petArtFor(exam, stage, pose);
      expect(existsSync(`public${src}`), `${exam}/${stage}/${pose} -> ${src}`).toBe(true);
      expect(readFileSync(`public${src}`).length).toBeLessThan(60000);
      if (stage === "puppy" && pose === "study") expect(src).toBe(pair.study);
      else if (stage === "puppy" && pose === "slack") expect(src).toBe(pair.break);
      // The puppy's nap is the same desk-nap moment it shows in the study room.
      else if (stage === "puppy" && pose === "rest") expect(src).toBe(`/images/home/study-room-mascots/idle/${c}-nap.webp`);
      else {
        // Checksummed originals stay untouched; their redrawn look ships beside them as v2-.
        const key = `${c}-${stage}-${pose}`;
        expect(src).toBe(`/images/pet-v1/${audited.has(key) ? "v2-" : ""}${key}.webp`);
      }
    }
  }
});
