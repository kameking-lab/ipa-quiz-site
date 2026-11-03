import { z } from "zod";
import { AnswerSchema, ExamSchema, PackSchema, jstDay } from "./domain";
import ip from "./packs/ip.json";
import fe from "./packs/fe.json";

export const StateSchema = z.object({
  schema: z.literal(1),
  packs: z.object({ ip: PackSchema, fe: PackSchema }),
  history: z.array(AnswerSchema).max(50000),
  resume: z.object({ exam: ExamSchema, questionId: z.string(), reviewOnly: z.boolean(), selected: z.enum(["ア", "イ", "ウ", "エ"]).nullable() }).nullable(),
  reminder: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/).nullable(),
  aiConsent: z.boolean(),
  aiQuota: z.object({ day: z.iso.date(), used: z.number().int().min(0).max(10) }),
});
export type State = z.infer<typeof StateSchema>;
export function initialState(): State {
  return StateSchema.parse({ schema: 1, packs: { ip, fe }, history: [], resume: null,
    reminder: null, aiConsent: false, aiQuota: { day: jstDay(), used: 0 } });
}

export interface SnapshotStorage {
  read(slot: number): Promise<string | null>;
  write(slot: number, data: string): Promise<void>;
  pointer(): Promise<string | null>;
  commit(slot: number): Promise<void>;
}

// Two files and a small native Preferences pointer. An interrupted write never
// replaces the committed snapshot. Every mutation passes through this queue.
export class Repository {
  private slot = 0;
  private value = initialState();
  private pending: Promise<unknown> = Promise.resolve();
  constructor(private storage: SnapshotStorage) {}
  get state(): State { return this.value; }
  async load(): Promise<{ state: State; recovered: boolean }> {
    const pointer = await this.storage.pointer();
    if (pointer === null) return { state: this.value, recovered: false };
    if (!["0", "1"].includes(pointer)) throw new Error("保存データの管理情報が不正です。");
    const first = Number(pointer);
    for (const slot of [first, 1 - first]) {
      try {
        const raw = await this.storage.read(slot);
        if (raw === null) continue;
        const parsed = StateSchema.parse(JSON.parse(raw));
        // A newer bundled pack supersedes older snapshots on app upgrade.
        const bundled = initialState();
        for (const id of ["ip", "fe"] as const) {
          if (bundled.packs[id].version > parsed.packs[id].version) parsed.packs[id] = bundled.packs[id];
        }
        this.value = parsed;
        this.slot = slot;
        return { state: parsed, recovered: slot !== first };
      } catch { /* Try the previous complete snapshot, never overwrite on load. */ }
    }
    throw new Error("端末の保存データを読み込めません。データを保護するため保存を停止しました。");
  }
  update(change: (state: State) => State): Promise<State> {
    const action = this.pending.then(async () => {
      const next = StateSchema.parse(change(structuredClone(this.value)));
      const slot = 1 - this.slot;
      await this.storage.write(slot, JSON.stringify(next));
      await this.storage.commit(slot);
      this.value = next;
      this.slot = slot;
      return next;
    });
    this.pending = action.catch(() => undefined);
    return action;
  }
}
