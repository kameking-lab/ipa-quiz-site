import { journeyChanges, journeyPage, journeyQualification, type JourneySnapshot, type JourneyStage } from "./journey-contract";

const KEY = "ipa-quiz:purchase-journey:v1";
const IDLE_MS = 30 * 60_000;
interface State { updated: number; checkoutAt?: number; snapshots: JourneySnapshot[]; queued: JourneySnapshot[] }
let timer: ReturnType<typeof setTimeout> | undefined;
function day(now: number) { return new Date(now + 9 * 3600_000).toISOString().slice(0, 10); }
function read(): State {
  const now = Date.now();
  try {
    const state: State = JSON.parse(sessionStorage.getItem(KEY) ?? "null");
    // Checkout can take longer than the learning idle timeout; keep its cohort until the next JST day.
    const checkout = state?.snapshots.some(s => s.stage === "checkout");
    const purchased = state?.snapshots.some(s => s.outcome === "purchased");
    if (state && ((checkout && now - (state.checkoutAt ?? state.updated) < 24 * 3600_000) || (purchased && now - state.updated < IDLE_MS) ||
      (state.snapshots[0]?.day === day(now) && now - state.updated < IDLE_MS))) return state;
  } catch { /* Storage is optional. */ }
  return { updated: now, snapshots: [], queued: [] };
}
function write(state: State) { sessionStorage.setItem(KEY, JSON.stringify(state)); }

/** Only aggregate dimensions reach KV. An order is used transiently to verify a purchase. */
export function flushJourney(purchaseOrder?: string) {
  try {
    const state = read();
    const changes = journeyChanges(state.queued, state.snapshots);
    if (!changes.length || typeof navigator.sendBeacon !== "function") return;
    const body = JSON.stringify({ changes, ...(purchaseOrder ? { purchaseOrder } : {}) });
    if (navigator.sendBeacon("/api/funnel/journey", new Blob([body], { type: "text/plain;charset=UTF-8" }))) {
      // Beacon acceptance is best effort, not a delivery acknowledgement. Never retry blindly.
      state.queued = state.snapshots.map(s => ({ ...s }));
      write(state);
    }
  } catch { /* Never affect an answer or a purchase. */ }
}

export function observeJourney(options: { qualification?: string; answer?: boolean; stage?: JourneyStage; offer?: boolean } = {}) {
  if (typeof window === "undefined" || location.pathname.startsWith("/admin") || location.pathname.startsWith("/api/")) return;
  try {
    const state = read();
    if (state.snapshots.some(s => s.outcome === "purchased")) return;
    const page = journeyPage(location.pathname);
    const pathExam = location.pathname.startsWith("/q/") ? location.pathname.split("/")[2] : undefined;
    const qualification = journeyQualification(options.qualification ?? pathExam ??
      new URLSearchParams(location.search).get("exam") ?? document.querySelector("[data-study-presence-exam]")?.getAttribute("data-study-presence-exam"));
    // Before an exam is known, count a direct billing visitor under unknown. Once an exam
    // is known, continue its cohort across sign-in, billing and full-document navigation.
    if (!state.snapshots.length) state.snapshots.push({ day: day(Date.now()), qualification, page, offer: "none", stage: "learning", answers: 0, outcome: "unconfirmed" });
    if (qualification !== "unknown" && !state.snapshots.some(s => s.qualification === qualification)) {
      if (state.snapshots.length === 1 && state.snapshots[0].qualification === "unknown") state.snapshots[0].qualification = qualification;
      else if (state.snapshots.length < 12) state.snapshots.push({ day: day(Date.now()), qualification, page, offer: "none", stage: "learning", answers: 0, outcome: "unconfirmed" });
    }
    for (const snapshot of state.snapshots) {
      snapshot.page = page;
      if (options.stage) snapshot.stage = options.stage;
      if (options.offer && snapshot.offer === "none") snapshot.offer = page;
      if (options.answer && snapshot.qualification === qualification) snapshot.answers = Math.min(10000, snapshot.answers + 1);
    }
    state.updated = Date.now();
    if (options.stage === "checkout") state.checkoutAt = Date.now();
    write(state);
    clearTimeout(timer);
    timer = setTimeout(() => flushJourney(), 5000);
  } catch { /* Storage-disabled visitors are omitted rather than repeatedly counted. */ }
}

/** Called only after the existing status poll confirms this order paid. Server rechecks it. */
export function purchaseJourney(order: string) {
  try {
    const state = read();
    if (!state.snapshots.length || state.snapshots.some(s => s.outcome === "purchased")) return;
    state.snapshots.forEach(s => { s.outcome = "purchased"; s.stage = "purchased"; s.page = "billing_success"; });
    state.updated = Date.now();
    write(state);
    clearTimeout(timer);
    flushJourney(order);
  } catch { /* Optional measurement. */ }
}
