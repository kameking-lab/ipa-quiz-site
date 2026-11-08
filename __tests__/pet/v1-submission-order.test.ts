import { expect, it, vi } from "vitest";
import { createPetSubmissionSequence, browserPetSubmissions, petSubmissionPaintDelay, flushPetSubmissions, PET_PAINT_DELAY_MS } from "@/lib/pet/v1/submission-order";

it("keeps the normal paint delay but flushes captured tasks in FIFO order on native background",async()=>{
  vi.useFakeTimers();
  try {
    const applied:string[]=[],ready=petSubmissionPaintDelay();
    const one=browserPetSubmissions.enqueue(async()=>{await ready;applied.push("answer");});
    await vi.advanceTimersByTimeAsync(PET_PAINT_DELAY_MS-1);expect(applied).toEqual([]);
    const two=browserPetSubmissions.enqueue(async()=>{applied.push("next");});await flushPetSubmissions();await Promise.all([one,two]);
    expect(applied).toEqual(["answer","next"]);expect(vi.getTimerCount()).toBe(0);
  }finally{vi.useRealTimers();}
});

it("keeps reveal/answer and mock facts in capture order despite slow auth; failure does not block later work", async () => {
  const queue = createPetSubmissionSequence(), applied: string[] = [];
  let release!: () => void;
  const slow = new Promise<void>(resolve => { release = resolve; });
  const reveal = queue.enqueue(async () => { await slow; applied.push("reveal"); });
  const answer = queue.enqueue(async () => { applied.push("answer"); });
  const failure = queue.enqueue(async () => { throw new Error("storage unavailable"); }).catch(() => undefined);
  const next = queue.enqueue(async () => { applied.push("next"); });
  await Promise.resolve(); expect(applied).toEqual([]);
  release(); await Promise.all([reveal, answer, failure, next]);
  expect(applied).toEqual(["reveal", "answer", "next"]);
});
