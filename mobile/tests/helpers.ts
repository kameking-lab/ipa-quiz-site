import { Repository, type SnapshotStorage } from "../src/state";

export class MemoryStorage implements SnapshotStorage {
  files = new Map<number, string>();
  current: string | null = null;
  failWrite = false;
  failCommit = false;
  async read(slot: number) { return this.files.get(slot) ?? null; }
  async write(slot: number, value: string) {
    if (this.failWrite) throw new Error("Disk full");
    this.files.set(slot, value);
  }
  async pointer() { return this.current; }
  async commit(slot: number) {
    if (this.failCommit) throw new Error("Interrupted");
    this.current = String(slot);
  }
}
export async function repository() {
  const storage = new MemoryStorage();
  const repo = new Repository(storage);
  await repo.load();
  return { storage, repo };
}
