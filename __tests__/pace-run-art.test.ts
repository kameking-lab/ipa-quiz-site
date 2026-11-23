import { readFileSync } from "node:fs";
import path from "node:path";
import { expect, it } from "vitest";
import sharp from "sharp";
import wardrobe from "@/lib/home/study-room-mascots.generated.json";
import { qualificationRunArt } from "@/lib/home/study-room";

it("keeps the dedicated and field wardrobes used by the study room", () => {
  for (const exam of Object.keys(wardrobe.away.exams)) {
    expect(qualificationRunArt(exam)).toBe(`/images/home/pace-run/${exam}.webp`);
  }
  for (const [exam, field] of Object.entries(wardrobe.away.examFields)) {
    expect(qualificationRunArt(exam)).toBe(`/images/home/pace-run/field-${field}.webp`);
  }
  expect(qualificationRunArt("dai-1-shu-eisei-kanrisha")).toBe(qualificationRunArt("eisei1"));
  expect(qualificationRunArt("new-exam", "electrical")).toContain("/field-electrical.webp");
  expect(qualificationRunArt("unknown")).toContain("/generic.webp");
});

it("ships four transparent, square frames for every selectable outfit", async () => {
  const outfits = ["generic", ...Object.keys(wardrobe.away.exams), ...Object.keys(wardrobe.away.fields).map(f => `field-${f}`)];
  for (const outfit of outfits) {
    const bytes = readFileSync(path.join("public/images/home/pace-run", outfit + ".webp"));
    const meta = await sharp(bytes).metadata();
    expect(meta, outfit).toMatchObject({ format: "webp", hasAlpha: true, width: meta.height! * 4 });
  }
});
