"use client";

import { LS_KEYS } from "@/lib/storage/keys";
import type { SyncStatus } from "./client";

export interface SyncAccount { id: string; label: string }
export interface SyncContext {
  /** Comparison only: APIs choose the owner from auth(), never this value. */
  userId: string;
  ownerToken: string;
}
export interface SyncOptions {
  expectedUserId?: string;
  /** Explicit consent for unowned browser data, tied to expectedUserId. */
  confirmUnowned?: boolean;
}
interface LocalOwner { userId: string; token: string }
export type OwnershipState = "unknown" | "matching" | "different";

function readOwner(): LocalOwner | null {
  const raw = window.localStorage.getItem(LS_KEYS.syncLocalOwner);
  if (!raw) return null;
  const value: unknown = JSON.parse(raw);
  if (!value || typeof value !== "object") throw new Error("invalid_sync_owner");
  const owner = value as Partial<LocalOwner>;
  if (typeof owner.userId !== "string" || !owner.userId || typeof owner.token !== "string" || !owner.token) {
    throw new Error("invalid_sync_owner");
  }
  return { userId: owner.userId, token: owner.token };
}

export function readOwnership(userId: string): OwnershipState {
  try {
    const owner = readOwner();
    return owner ? (owner.userId === userId ? "matching" : "different") : "unknown";
  } catch {
    return "different";
  }
}

export async function readSyncAccount(): Promise<SyncAccount | null> {
  const response = await fetch("/api/auth/session", { cache: "no-store", credentials: "same-origin" });
  if (!response.ok) throw new Error("session_unavailable");
  const value: unknown = await response.json();
  if (!value || typeof value !== "object") throw new Error("invalid_session");
  const user = (value as { user?: unknown }).user;
  if (!user) return null;
  if (typeof user !== "object") throw new Error("invalid_session");
  const account = user as { id?: unknown; email?: unknown; name?: unknown };
  if (typeof account.id !== "string" || !account.id) throw new Error("missing_session_user_id");
  return {
    id: account.id,
    label: typeof account.email === "string" ? account.email : typeof account.name === "string" ? account.name : account.id,
  };
}

export function ownsSyncContext(context: SyncContext): boolean {
  try {
    const owner = readOwner();
    return owner?.userId === context.userId && owner.token === context.ownerToken;
  } catch {
    return false;
  }
}

export async function isSyncContextCurrent(context: SyncContext): Promise<boolean> {
  if (!ownsSyncContext(context)) return false;
  const account = await readSyncAccount();
  return account?.id === context.userId && ownsSyncContext(context);
}

export async function beginSync(options: SyncOptions = {}): Promise<
  { context: SyncContext; status?: never } | { context?: never; status: SyncStatus }
> {
  try {
    const account = await readSyncAccount();
    if (!account) return { status: { state: "unauthenticated" } };
    if (options.expectedUserId && options.expectedUserId !== account.id) {
      return { status: { state: "deferred", reason: "account_changed" } };
    }
    let owner = readOwner();
    if (owner && owner.userId !== account.id) return { status: { state: "deferred", reason: "owner_mismatch" } };
    if (!owner) {
      if (!options.confirmUnowned || options.expectedUserId !== account.id) {
        return { status: { state: "deferred", reason: "owner_unknown" } };
      }
      owner = { userId: account.id, token: window.crypto.randomUUID() };
      window.localStorage.setItem(LS_KEYS.syncLocalOwner, JSON.stringify(owner));
    }
    const context = { userId: account.id, ownerToken: owner.token };
    if (!ownsSyncContext(context)) return { status: { state: "deferred", reason: "account_changed" } };
    return { context };
  } catch (error) {
    return { status: { state: "error", message: error instanceof Error ? error.message : "sync_unavailable" } };
  }
}
