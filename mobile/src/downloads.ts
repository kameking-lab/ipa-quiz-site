import { Filesystem, Directory, Encoding } from "@capacitor/filesystem";
import { Preferences } from "@capacitor/preferences";
import type { Question } from "@/lib/questions/types";
import type { CatalogEntry, MobileEntitlement } from "../shared/contracts";
import { verifyLease } from "./lease";
import pinned from "../config/public.json";
const INDEX = "kakomon:downloads:v2", RIGHTS = "kakomon:rights:v2";
export interface DownloadIndex { [code: string]: { path: string; entry: CatalogEntry; owner: string } }
export interface Rights { access: MobileEntitlement; publicKey: string; lastSeen: number;validatedUntil?:number }
async function read<T>(key: string, fallback: T): Promise<T> { return JSON.parse((await Preferences.get({ key })).value ?? JSON.stringify(fallback)) as T; }
export class Downloads {
  constructor(private trustedPublicKey = pinned.leasePublicKey) {}
  private memory = new Map<string,{revision:string;questions:Question[]}>();
  private queue: Promise<unknown> = Promise.resolve();
  private serialize<T>(fn: () => Promise<T>): Promise<T> { const p = this.queue.then(fn); this.queue = p.catch(()=>{}); return p; }
  list() { return read<DownloadIndex>(INDEX, {}); }
  async rights() { return read<Rights | null>(RIGHTS, null); }
  async authorize() {
    const r = await this.rights();
    if (!r?.access.userId || !r.access.entitled) throw new Error("事前ダウンロードは有料会員専用です。");
    try {
      if (!this.trustedPublicKey || r.publicKey !== this.trustedPublicKey) throw new Error("配布用の権利検証キーを確認できません。");
      const lease=await verifyLease(r.access.lease, this.trustedPublicKey, r.access.userId, Date.now(), r.lastSeen);
      r.validatedUntil=lease.expiresAt;
    }
    catch (error) { await this.invalidate(); throw error; }
    r.lastSeen = Math.max(Date.now(), r.lastSeen);
    await Preferences.set({ key: RIGHTS, value: JSON.stringify(r) });
    return r;
  }
  async updateRights(access: MobileEntitlement, publicKey: string) {
    const old = await this.rights();
    if (!access.entitled || old?.access.userId && old.access.userId !== access.userId) await this.invalidate();
    if (access.entitled && access.userId) {
      if (!this.trustedPublicKey || publicKey !== this.trustedPublicKey) throw new Error("配布用の権利検証キーが未設定です。");
      await verifyLease(access.lease, this.trustedPublicKey, access.userId);
      await Preferences.set({ key: RIGHTS, value: JSON.stringify({ access, publicKey, lastSeen: Date.now() }) });
    }
  }
  async invalidate() { this.memory.clear();await Preferences.remove({ key: RIGHTS }); }
  async load<T = Question>(code: string): Promise<T[]> {
    const r = await this.authorize(), entry = (await this.list())[code];
    if (!entry || entry.owner !== r.access.userId) throw new Error("この資格を先にダウンロードしてください。");
    const data = await Filesystem.readFile({ directory: Directory.Data, path: entry.path, encoding: Encoding.UTF8 });
    if (typeof data.data !== "string") throw new Error("保存内容を確認できません。");
    const hash = hex(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(data.data)));
    if (hash !== entry.entry.revision) throw new Error("保存内容が壊れています。再ダウンロードしてください。");
    const questions=JSON.parse(data.data) as T[];
    if(!code.startsWith("library.")&&!code.startsWith("material."))this.memory.set(code,{revision:entry.entry.revision,questions:questions as Question[]});
    return questions;
  }
  async findQuestion(id:string):Promise<Question|null> {
    await this.authorize();
    const entries=await this.list();
    const code=Object.keys(entries).find(code=>!code.startsWith("library.")&&!code.startsWith("material.")&&id.startsWith(code+"-"));
    if(!code)return null;
    const cached=this.memory.get(code);
    const questions=cached?.revision===entries[code].entry.revision?cached.questions:await this.load(code);
    return questions.find(q=>q.id===id)??null;
  }
  remove(code: string) { return this.serialize(async () => {
    const index = await this.list(), entry = index[code];
    delete index[code]; await Preferences.set({ key: INDEX, value: JSON.stringify(index) });
    if (entry) await Filesystem.deleteFile({ directory: Directory.Data, path: entry.path }).catch(()=>{});
  }); }
  download(code: string, request: (path: string) => Promise<Response>, progress: (count: number,total: number)=>void, signal: AbortSignal) {
    return this.serialize(async () => {
      const rights = await this.authorize();
      let offset: number | null = 0, entry: CatalogEntry | undefined;
      const questions: Question[] = [];
      while (offset !== null) {
        signal.throwIfAborted(); await this.authorize();
        const response = await request(`/api/mobile/download?exam=${encodeURIComponent(code)}&offset=${offset}${entry ? `&revision=${entry.revision}` : ""}`);
        if (response.status === 403 || response.status === 401) await this.invalidate();
        if (!response.ok) throw new Error("ダウンロードできません。通信・会員状態を確認してください。");
        const page = await response.json() as { entry: CatalogEntry; questions: Question[]; nextOffset: number | null; entitlement: MobileEntitlement };
        if (!page.entitlement.entitled || page.entitlement.userId !== rights.access.userId || page.entry.code !== code
          || entry && entry.revision !== page.entry.revision || !Array.isArray(page.questions) || page.questions.length > 10
          || page.nextOffset !== null && page.nextOffset !== offset + page.questions.length || page.nextOffset === offset) throw new Error("問題の更新を確認してやり直してください。");
        entry = page.entry; questions.push(...page.questions); offset = page.nextOffset;
        if (questions.length > entry.count) throw new Error("問題数が一致しません。");
        progress(questions.length, entry.count);
      }
      signal.throwIfAborted(); await this.authorize();
      if (!entry || questions.length !== entry.count || new Set(questions.map(q=>q.id)).size !== questions.length) throw new Error("問題数が一致しません。");
      const data = JSON.stringify(questions);
      if (hex(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(data))) !== entry.revision) throw new Error("問題の検証に失敗しました。");
      // Even a same-version re-download must not overwrite the committed file.
      const suffix=hex(crypto.getRandomValues(new Uint8Array(8)).buffer);
      const path = `exams/${code}-${entry.revision}-${suffix}.json`;
      try {
        await Filesystem.writeFile({ directory: Directory.Data, path, data, encoding: Encoding.UTF8, recursive: true });
        signal.throwIfAborted();
        await this.authorize(); // Expiry during the write cannot publish usable content.
        const index = await this.list(), previous = index[code];
        index[code] = { path, entry, owner: rights.access.userId! };
        await Preferences.set({ key: INDEX, value: JSON.stringify(index) });
        if (previous && previous.path !== path) await Filesystem.deleteFile({ directory: Directory.Data, path: previous.path }).catch(()=>{});
      }catch(error){
        const current=await this.list().catch(()=>null);
        if(current&&current[code]?.path!==path)await Filesystem.deleteFile({directory:Directory.Data,path}).catch(()=>{});
        throw error;
      }
    });
  }
}
export function hex(buffer: ArrayBuffer) { return Array.from(new Uint8Array(buffer), b=>b.toString(16).padStart(2,"0")).join(""); }
export const downloads = new Downloads();
