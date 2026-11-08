import { expect, it } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import catalog from "@/lib/home/study-room-mascots.generated.json";
import { IDLE_VARIANTS, idleArt, roomCharacter } from "@/lib/home/study-room";

it("every qualification in the room has all idle moments drawn for its character, small enough to ship", () => {
  const characters = new Set(Object.keys(catalog.exams).map(roomCharacter));
  expect(characters.size).toBe(48);
  for (const exam of Object.keys(catalog.exams)) for (const idle of IDLE_VARIANTS) {
    const src = idleArt(exam, idle);
    expect(src, `${exam}/${idle}`).not.toBeNull();
    expect(existsSync(`public${src}`)).toBe(true);
    expect(readFileSync(`public${src}`).length).toBeLessThan(40000);
  }
});
