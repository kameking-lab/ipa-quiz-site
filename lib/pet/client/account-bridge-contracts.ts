import type { GuestSnapshot } from "../server/contracts";
import type { QueueStatus } from "./durable-queue";

/** Supplied by an authenticated host. label is display information, never authority. */
export interface PetAccountIdentity { userId: string; label: string }
export interface PetAccountIdentityPort {
  getIdentity(): PetAccountIdentity | null;
  /** Must fire on login, logout and session/account replacement, including A → B → A. */
  subscribe(listener: () => void): () => void;
}
export interface PetAccountContext { owner: string; isCurrent(): boolean }
export interface PetHandoffPreview { revision: number; segmentId: string; snapshot: GuestSnapshot }
export interface PetHandoffEntry { segmentId: string; status: QueueStatus }
/** Implemented by the existing learning store, with its existing key and exclusive lock. */
export interface PetAccountHandoffPort {
  preview(context: PetAccountContext): Promise<PetHandoffPreview | null>;
  seal(input: PetAccountContext & { expectedRevision: number; segmentId: string; confirmed: true }):
    Promise<"sealed" | "stale" | "blocked" | "storage_error">;
  list(context: PetAccountContext): Promise<PetHandoffEntry[]>;
  recover(input: PetAccountContext & { segmentId: string; confirmRenewal: boolean }): Promise<QueueStatus>;
}
