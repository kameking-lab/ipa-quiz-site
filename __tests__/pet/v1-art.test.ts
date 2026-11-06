import { expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { petArtFor } from "@/lib/pet/v1/art";
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
  expect(petArtFor("__proto__", "puppy", "correct")).toBe("/mascot/chihuahua-guide.webp");
  for (const qualification of ["ip", "ap", "takken", "fp3", "civil2", "yakuzaishi"]) expect(existsSync(`public${petArtFor(qualification, "puppy", "study")}`)).toBe(true);
});
