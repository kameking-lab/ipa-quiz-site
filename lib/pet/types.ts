/** Prototype contract only: no production API, storage key, or learning writes. */
export type PetStage = "little" | "friend" | "companion";
export type PetOutfit = "none" | "bandana";
export type PetPose = "sit" | "approach" | "eat" | "happy" | "cheer" | "rest" | "nuzzle" | "dress";
export interface PetState {
  version: 1;
  answers: number;
  food: number;
  meals: number;
  outfit: PetOutfit;
  lastVisitDay: string | null;
}
export interface PetSummary {
  stage: PetStage;
  nextStageIn: number | null;
  bandanaOwned: boolean;
}
/** IDs and expiry are issued once before enqueue, then reused on every retry. */
export interface PetCommand {
  id: string;
  owner: string;
  issuedAt: number;
  expiresAt: number;
  action: { kind: "answer"; answerId: string } | { kind: "feed" } | { kind: "outfit"; outfit: PetOutfit };
}
export type PetOutcome = "applied" | "daily_limit" | "no_food" | "locked";
export interface PetReceipt {
  commandId: string;
  /** An answer retry with another command ID still identifies the same answer. */
  answerId?: string;
  expiresAt: number;
  outcome: PetOutcome;
}
export interface PetLedger {
  owner: string;
  state: PetState;
  /** Accepted daily answer count; old buckets expire with their valid commands. */
  days: Record<string, number>;
  receipts: PetReceipt[];
}
export interface PetResult {
  ledger: PetLedger;
  outcome: PetOutcome | "duplicate" | "expired" | "invalid" | "wrong_owner";
  originalOutcome?: PetOutcome;
}
