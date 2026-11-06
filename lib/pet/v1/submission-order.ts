/** Browser-local FIFO, shared across route mounts. Reserve the position when
 * input is captured, before any timeout/auth/network/lock can reorder facts. */
export function createPetSubmissionSequence() {
  let tail: Promise<unknown> = Promise.resolve();
  return {
    enqueue<T>(task: () => Promise<T>): Promise<T> {
      const result = tail.then(task);
      tail = result.catch(() => undefined);
      return result;
    },
    async drain() { let current; do { current = tail; await current; } while (current !== tail); },
  };
}
export const browserPetSubmissions = createPetSubmissionSequence();
const paintDelays = new Set<() => void>();
export function petSubmissionPaintDelay() {
  return new Promise<void>(resolve => {
    const complete = () => { clearTimeout(timer); paintDelays.delete(complete); resolve(); };
    const timer = setTimeout(complete, 1000); paintDelays.add(complete);
  });
}
/** Native background/navigation only. Normal answers retain their paint delay. */
export async function flushPetSubmissions() {
  for (const complete of paintDelays) complete();
  await browserPetSubmissions.drain();
}
