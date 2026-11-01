import type { PetCommand, PetLedger, PetResult, PetState, PetSummary } from "./types";

export const PET_LIMITS = { dailyAnswers: 30, food: 300, commandLifetimeMs: 7 * 86400000 } as const;
const DAY = 86400000;
export function emptyPetState(): PetState {
  return { version: 1, answers: 0, food: 0, meals: 0, outfit: "none", lastVisitDay: null };
}
export function summarizePet(state: PetState): PetSummary {
  return {
    stage: state.answers < 10 ? "little" : state.answers < 30 ? "friend" : "companion",
    nextStageIn: state.answers < 10 ? 10 - state.answers : state.answers < 30 ? 30 - state.answers : null,
    bandanaOwned: state.answers >= 5,
  };
}
export function emptyPetLedger(owner: string): PetLedger {
  return { owner, state: emptyPetState(), days: {}, receipts: [] };
}
function validCommand(command: PetCommand, now: number): boolean {
  if (!Number.isFinite(now) || !Number.isSafeInteger(command.issuedAt) || !Number.isSafeInteger(command.expiresAt)) return false;
  if (!command.id || command.id.length > 128 || !command.owner || command.owner.length > 128) return false;
  if (command.issuedAt > now || command.expiresAt <= command.issuedAt || command.expiresAt - command.issuedAt > PET_LIMITS.commandLifetimeMs) return false;
  return command.action.kind === "answer"
    ? Boolean(command.action.answerId) && command.action.answerId.length <= 160
    : command.action.kind === "feed" || (command.action.kind === "outfit" && ["none", "bandana"].includes(command.action.outfit));
}

/**
 * Pure transaction model. The real server must authenticate/issue commands and
 * serialize this operation in a DB transaction; client timestamps are not proof.
 * No event history is needed: aggregates + unexpired idempotency receipts suffice.
 */
export function applyPetCommand(ledger: PetLedger, command: PetCommand, now: number): PetResult {
  if (!validCommand(command, now)) return { ledger, outcome: "invalid" };
  if (ledger.owner !== command.owner) return { ledger, outcome: "wrong_owner" };
  // Expiry is checked BEFORE receipt pruning. An old replay never becomes new.
  if (command.expiresAt <= now) return { ledger, outcome: "expired" };
  const receipts = ledger.receipts.filter(receipt => receipt.expiresAt > now);
  const answerId = command.action.kind === "answer" ? command.action.answerId : undefined;
  const duplicate = receipts.find(receipt => receipt.commandId === command.id || (answerId !== undefined && receipt.answerId === answerId));
  if (duplicate) return { ledger, outcome: "duplicate", originalOutcome: duplicate.outcome };
  // This pure mock keeps unexpired receipts. Production queries receipt keys in
  // the transaction instead of loading the ledger; local cache size is NOT an action limit.
  const day = new Date(command.issuedAt).toISOString().slice(0, 10);
  const oldestDay = new Date(now - PET_LIMITS.commandLifetimeMs - DAY).toISOString().slice(0, 10);
  const days = Object.fromEntries(Object.entries(ledger.days).filter(([key]) => key >= oldestDay));
  const state = { ...ledger.state };
  let outcome: "applied" | "daily_limit" | "no_food" | "locked" = "applied";
  if (command.action.kind === "answer") {
    state.answers += 1;
    if ((days[day] ?? 0) >= PET_LIMITS.dailyAnswers || state.food >= PET_LIMITS.food) outcome = "daily_limit";
    else {
      days[day] = (days[day] ?? 0) + 1;
      state.food += 1;
    }
  } else if (command.action.kind === "feed") {
    if (state.food <= 0) outcome = "no_food";
    else { state.food -= 1; state.meals += 1; }
  } else if (command.action.outfit === "bandana" && !summarizePet(state).bandanaOwned) outcome = "locked";
  else state.outfit = command.action.outfit;
  state.lastVisitDay = new Date(now).toISOString().slice(0, 10);
  receipts.push({ commandId: command.id, ...(answerId ? { answerId } : {}), expiresAt: command.expiresAt, outcome });
  return { ledger: { owner: ledger.owner, state, days, receipts }, outcome };
}
