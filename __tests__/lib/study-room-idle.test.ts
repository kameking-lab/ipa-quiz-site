import { describe, expect, it, vi } from "vitest";
vi.mock("@/lib/home/study-room-variety.json", () => ({ default: { idle: {
  ip: ["stretch", "yawn", "book", "tea", "nap", "pencil", "wave"],
  "field-electrical": ["stretch", "yawn", "book", "tea", "nap", "pencil", "wave"],
} } }));
import { IDLE_VARIANTS, MAX_IDLE_SEATS, initialSeatIdles, nextSeatIdles, qualificationMascot, roomCharacter, roomMascots, type SeatIdle } from "@/lib/home/study-room";

function seeded(seed: number) {
  let value = seed;
  return () => { value = (value * 1103515245 + 12345) % 2147483648; return value / 2147483648; };
}

describe("study room idle rotation", () => {
  it("maps field qualifications to their field character and dedicated ones to themselves", () => {
    expect(roomCharacter("ip")).toBe("ip");
    expect(roomCharacter("denken1")).toBe("field-electrical");
  });

  it("never repeats a moment back to back, never doubles a picture, and keeps most seats studying", () => {
    const characters = ["ip", "ip", "field-electrical", null, "ip", "field-electrical", "ip", "ip"];
    const random = seeded(7);
    let poses: SeatIdle[] = initialSeatIdles(characters, random);
    const seen = new Set<string>();
    for (let tick = 0; tick < 4000; tick++) {
      const next = nextSeatIdles(poses, characters, random);
      next.forEach((pose, i) => {
        if (pose.idle && pose.idle !== poses[i].idle) {
          expect(pose.idle).not.toBe(poses[i].last);
          seen.add(pose.idle);
        }
      });
      expect(next[3]).toEqual({ idle: null, last: null });
      expect(next.filter(pose => pose.idle).length).toBeLessThanOrEqual(MAX_IDLE_SEATS);
      for (const character of ["ip", "field-electrical"]) {
        const shown = next.filter((pose, i) => characters[i] === character && pose.idle).map(pose => pose.idle);
        expect(new Set(shown).size).toBe(shown.length);
      }
      poses = next;
    }
    expect([...seen].sort()).toEqual([...IDLE_VARIANTS].sort());
  });

  it("starts repeated characters on different moments so identical seats do not sit side by side", () => {
    const poses = initialSeatIdles(["ip", "ip", "ip"], seeded(3));
    expect(poses[0].idle).toBeNull();
    expect(poses[1].idle).not.toBeNull();
    expect(poses[2].idle).not.toBeNull();
    expect(poses[1].idle).not.toBe(poses[2].idle);
  });

  it("only studying seats show an idle moment, at the same desk framing", () => {
    for (const slot of roomMascots(11)) {
      const mascot = qualificationMascot("ip", slot, "tea");
      if (slot.state === "study") {
        expect(mascot.state).toBe("idle");
        expect(mascot.src).toBe("/images/home/study-room-mascots/idle/ip-tea.webp");
        expect(mascot.stateLabel).toBe("ひと休み：お茶");
      } else expect(mascot.state).not.toBe("idle");
    }
    const studying = roomMascots(11).find(slot => slot.state === "study")!;
    expect(qualificationMascot("sharoushi", studying, "tea").state).toBe("study");
  });
});
