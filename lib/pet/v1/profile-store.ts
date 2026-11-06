import { LS_KEYS } from "@/lib/storage/keys";
import type { PetExclusivePort, PetStoragePort } from "../client/contracts";
import { emptyPetProfiles, parsePetProfileDocument, petProfileDocumentSchema, petProfileStorageKey, PET_BACKUP_MAX_BYTES,
  compactPetProfileDocument, serializePetProfileDocument } from "./profile";
import type { PetProfileDocument } from "./profile";
import { migrateLegacyPetProfiles } from "./migration";

export interface PetOwnerContext { readonly ownerScope: string; isCurrent(): boolean; verifyCurrent?(): Promise<boolean> }
export type PetProfileStoreResult =
  | { status: "ready"; document: PetProfileDocument }
  | { status: "owner_changed" | "storage_error" | "invalid_data" };
export function parsePetBackup(raw: string): PetProfileDocument {
  if (new TextEncoder().encode(raw).length > PET_BACKUP_MAX_BYTES) throw new Error("pet_backup_too_large");
  const envelope = JSON.parse(raw) as Record<string, unknown>;
  if (!envelope || envelope.format !== "kakomon-pet-local" || envelope.version !== 1 ||
    Object.keys(envelope).some(key => !["format", "version", "document"].includes(key))) throw new Error("pet_backup_invalid");
  return parsePetProfileDocument(JSON.stringify(envelope.document));
}
/** No import-time browser access, background writes, network or rewards.
 * Owner-partitioned keys keep sign-in/out from adopting the previous pet. */
export class PetProfileStore {
  constructor(private readonly options: { storage: PetStoragePort; exclusive: PetExclusivePort; now: () => number }) {}
  private read(owner: string, timeZone: string) {
    const raw = this.options.storage.getItem(petProfileStorageKey(owner));
    const doc = raw === null ? emptyPetProfiles(owner, timeZone) : parsePetProfileDocument(raw);
    if (doc.ownerScope !== owner) throw new Error("pet_owner_mismatch");
    return doc;
  }
  /** Load is read-only, including first visit and malformed/future versions. */
  async load(context: PetOwnerContext, timeZone: string): Promise<PetProfileStoreResult> {
    const owner = context.ownerScope;
    if (!context.isCurrent()) return { status: "owner_changed" };
    try {
      const document = this.read(owner, timeZone);
      return context.ownerScope === owner && context.isCurrent() ? { status: "ready", document } : { status: "owner_changed" };
    } catch { return { status: "storage_error" }; }
  }
  /** Reread under the same cross-tab lock; caller edits a detached document.
   * A stale owner context can never commit after an account switch. */
  async update(context: PetOwnerContext, timeZone: string,
    change: (document: PetProfileDocument) => PetProfileDocument): Promise<PetProfileStoreResult> {
    const owner = context.ownerScope;
    const current = () => context.ownerScope === owner && context.isCurrent();
    try {
      const key = petProfileStorageKey(owner);
      return await this.options.exclusive.run(key, async () => {
        if (!current()) return { status: "owner_changed" };
        // Revalidate after acquiring the lock: it may have waited behind a
        // backup/another tab while the learner changed accounts.
        if (context.verifyCurrent && (!await context.verifyCurrent() || !current())) return { status: "owner_changed" };
        const previous = this.read(owner, timeZone);
        let candidate: PetProfileDocument;
        try {
          candidate = petProfileDocumentSchema.parse(change(structuredClone(previous)));
          if (candidate.ownerScope !== owner || candidate.timeZone !== previous.timeZone)
            return { status: "invalid_data" };
        } catch { return { status: "invalid_data" }; }
        if (!current()) return { status: "owner_changed" };
        if (JSON.stringify(candidate) === JSON.stringify(previous)) return { status: "ready", document: previous };
        const document = petProfileDocumentSchema.parse({ ...candidate, revision: previous.revision + 1 });
        // Reparse byte bound before writing; overlarge state stays recoverable.
        const raw = serializePetProfileDocument(document); parsePetProfileDocument(raw);
        this.options.storage.setItem(key, raw);
        return { status: "ready", document };
      });
    } catch { return { status: "storage_error" }; }
  }
  migrateLegacy(context: PetOwnerContext, timeZone: string) {
    return this.update(context, timeZone, doc => migrateLegacyPetProfiles(doc,
      this.options.storage.getItem(LS_KEYS.petLearning), this.options.now()));
  }
  /** Caller offers a private JSON download; no account-wide or legacy-key edits. */
  async exportBackup(context: PetOwnerContext, timeZone: string, expectedRevision?: number): Promise<string | null> {
    const owner = context.ownerScope, current = () => context.ownerScope === owner && context.isCurrent();
    try {
      return await this.options.exclusive.run(petProfileStorageKey(owner), async () => {
        if (!current() || context.verifyCurrent && (!await context.verifyCurrent() || !current())) return null;
        const document = this.read(owner, timeZone);
        if (!current() || expectedRevision !== undefined && document.revision !== expectedRevision) return null;
        return JSON.stringify({ format: "kakomon-pet-local", version: 1, document: compactPetProfileDocument(document) });
      });
    } catch { return null; }
  }
  /** Replacement requires the revision the user reviewed. Keep the returned old
   * backup before calling this; UI confirmation/download belongs to P07. */
  async restoreBackup(context: PetOwnerContext, timeZone: string, raw: string,
    expectedRevision: number): Promise<PetProfileStoreResult> {
    let imported: PetProfileDocument;
    try {
      imported = parsePetBackup(raw);
      if (imported.ownerScope !== context.ownerScope) return { status: "invalid_data" };
    } catch { return { status: "invalid_data" }; }
    return this.update(context, timeZone, previous => {
      if (previous.revision !== expectedRevision || imported.timeZone !== previous.timeZone)
        throw new Error("pet_backup_stale");
      return { ...imported, revision: previous.revision };
    });
  }
}
