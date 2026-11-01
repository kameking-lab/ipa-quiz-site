import { experienceSchema, learningPetExperience, wardrobeSchema, wardrobeUnlocked, careGestureSchema, careUnlocked, petFeedReaction } from "./experience";
import type { PetWardrobe, PetCareGesture, PetFeedReaction } from "./experience";
import { z } from "zod";
import { isReferenceOnlyQuestionId } from "@/lib/questions/assessment";
import type { PetExclusivePort, PetStoragePort } from "./contracts";
import { PET_LIMITS, summarizePet } from "../state";
import type { PetState } from "../types";
import { documentSchema as queueDocumentSchema } from "./contracts";
import type { PetClientTransport } from "./contracts";
import { DurablePetQueue } from "./durable-queue";
import type { PetAccountContext, PetAccountHandoffPort } from "./account-bridge-contracts";
import { learningRewardPolicySchema } from "./learning-policy-document";
import type { LearningRewardPolicy, PendingPetSubmission } from "./learning-policy-document";
import { petRewardReferenceKey } from "../reward-contracts";
import type { PetRewardReference } from "../reward-contracts";
import { legacyPetRewardMatch } from "../reward-identity";
import { validateLocalPetLearningSubmission } from "../submission-validation";
import type { PetLearningSubmissionContext } from "./submission-router-contracts";
import type { PetLearningEvent, PetLearningSubmission } from "./learning-submission-contracts";
import { petLearningSubmissionSchema, petLearningEventSchema } from "./learning-submission-contracts";
import { petRewardReferenceSchema } from "../reward-contracts";

const count = z.number().int().nonnegative().max(Number.MAX_SAFE_INTEGER);
const handoffSchema = z.object({
  revision: count, activeSegmentId: z.uuid(), sealedAnswers: count, activeMeals: count,
  // The live guest snapshot is derived from this learning document, never mirrored.
  queue: z.object({ version: queueDocumentSchema.shape.version, revision: queueDocumentSchema.shape.revision,
    account: queueDocumentSchema.shape.account, detached: queueDocumentSchema.shape.detached,
    connections: queueDocumentSchema.shape.connections, queue: queueDocumentSchema.shape.queue }).strict(),
}).strict();
const documentSchema = z.object({
  version: z.literal(1),
  // A device guest, deliberately unrelated to any login identity.
  ownership: z.literal("device-guest"),
  experience: experienceSchema.optional(),
  rewardPolicy: learningRewardPolicySchema.optional(),
  answers: z.array(z.string().min(1).max(1000)),
  handoff: handoffSchema.optional(),
  food: count.max(PET_LIMITS.food), meals: count,
  outfit: z.enum(["none", "bandana"]),
  days: z.record(z.string().regex(/^\d{4}-\d{2}-\d{2}$/), count.max(PET_LIMITS.dailyAnswers)),
}).strict().refine(d => new Set(d.answers).size === d.answers.length &&
  (!d.rewardPolicy || (d.rewardPolicy.legacy.food + d.rewardPolicy.entries.filter(entry => entry.state === "active" && entry.food === "available").length === d.food &&
    d.rewardPolicy.legacy.meals + d.rewardPolicy.entries.filter(entry => entry.food === "consumed").length === d.meals &&
    d.rewardPolicy.legacy.answers.every(answer => d.answers.includes(answer)))) &&
  (!d.experience || (wardrobeUnlocked(d.answers.length, d.experience.wardrobe) &&
    (d.experience.careCounts.nuzzle === 0 || careUnlocked(d.answers.length, "nuzzle")) &&
    (d.experience.careCounts.cheer === 0 || careUnlocked(d.answers.length, "cheer")))) &&
  d.food + d.meals <= d.answers.length && (d.outfit !== "bandana" || d.answers.length >= 5) &&
  (!d.handoff || (d.handoff.sealedAnswers <= d.answers.length &&
    d.food + d.handoff.activeMeals <= d.answers.length - d.handoff.sealedAnswers &&
    (d.outfit !== "bandana" || d.answers.length - d.handoff.sealedAnswers >= 5) &&
    queueDocumentSchema.safeParse({ ...d.handoff.queue, guest: { segmentId: d.handoff.activeSegmentId,
      snapshot: { answers: d.answers.length - d.handoff.sealedAnswers, food: d.food,
        meals: d.handoff.activeMeals, outfit: d.outfit } } }).success)));
export type LearningPetDocument = z.infer<typeof documentSchema>;
export type LearningPetStatus = "loading" | "ready" | "storage_error";
export interface LearningPetView { status: LearningPetStatus; document: LearningPetDocument | null }
export type LearningPetReaction = "answer" | "feed" | "dress" | "care" | "visit";
export interface LearningPetEvent { kind: LearningPetReaction; scope?: string; questionId?: string; context?: string; feedReaction?: PetFeedReaction; careGesture?: PetCareGesture }
export type LearningPetResult = "applied" | "duplicate" | "no_food" | "locked" | "storage_error" | "legacy_hold";
export const EMPTY_LEARNING_VIEW: LearningPetView = { status: "loading", document: null };
const fresh = (): LearningPetDocument => ({ version: 1, ownership: "device-guest", answers: [], food: 0, meals: 0, outfit: "none", days: {} });
type ValidGuestSubmission = NonNullable<ReturnType<typeof validateLocalPetLearningSubmission>>;

/** One durable truth. Never mirrors a second guest queue or reads study history. */
export class LearningPetStore {
  private view = EMPTY_LEARNING_VIEW;
  private listeners = new Set<() => void>();
  private reactions = new Set<(reaction: LearningPetEvent) => void>();
  private pendingAnswers = new Map<string, { exam: string; questionId: string; scope?: string }>();
  private pendingGuest = new Map<string, ValidGuestSubmission>();
  private guestHolds = new Set<object>();
  constructor(private readonly options: { key: string; storage: PetStoragePort; exclusive: PetExclusivePort; now: () => number }) {
    if (!options.key) throw new Error("explicit_storage_key_required");
  }
  getView = () => this.view;
  /** Registration tokens overlap on replacement, including loading/null owners. */
  holdGuestSubmissions() {
    const token = {}; this.guestHolds.add(token);
    return () => { this.guestHolds.delete(token); };
  }
  subscribe = (listener: () => void) => { this.listeners.add(listener); return () => { this.listeners.delete(listener); }; };
  subscribeReactions = (listener: (reaction: LearningPetEvent) => void) => { this.reactions.add(listener); return () => { this.reactions.delete(listener); }; };
  private publish(status: LearningPetStatus, document: LearningPetDocument | null) {
    this.view = { status, document: document ? structuredClone(document) : null };
    this.listeners.forEach(listener => listener());
  }
  private read() {
    const raw = this.options.storage.getItem(this.options.key);
    return raw === null ? fresh() : documentSchema.parse(JSON.parse(raw));
  }
  private policy(doc: LearningPetDocument, raw: string | null): LearningRewardPolicy {
    if (!doc.rewardPolicy) doc.rewardPolicy = { version: 2,
      legacy: { raw, answers: [...doc.answers], food: doc.food, meals: doc.meals, outfit: doc.outfit },
      entries: [], pending: [], accountSeen: [] };
    return doc.rewardPolicy;
  }
  /** One containing document / lock / commit. Policy metadata never mirrors a
   * second pet balance, and callers cannot bypass failed durable writes. */
  private async policyChange<T>(work: (doc: LearningPetDocument, policy: LearningRewardPolicy) => T): Promise<T> {
    return this.options.exclusive.run(this.options.key, async () => {
      const raw = this.options.storage.getItem(this.options.key), doc = this.read();
      const result = work(doc, this.policy(doc, raw));
      if (doc.handoff) doc.handoff.revision++; // A displayed consent never covers a later financial/policy mutation.
      this.options.storage.setItem(this.options.key, JSON.stringify(documentSchema.parse(doc)));
      this.publish("ready", doc); return structuredClone(result);
    });
  }
  async submitGuest(input: unknown, context: PetLearningSubmissionContext): Promise<LearningPetResult> {
    const valid = validateLocalPetLearningSubmission(input, context);
    if (!valid || this.guestHolds.size > 0) return "locked";
    this.pendingGuest.set(petRewardReferenceKey(valid.reference), valid);
    return this.applyGuestSubmission(valid);
  }
  private async applyGuestSubmission(valid: ValidGuestSubmission): Promise<LearningPetResult> {
    if (this.guestHolds.size > 0) return "locked";
    try {
      const result = await this.policyChange((doc, policy): LearningPetResult => {
        if (this.guestHolds.size > 0) return "locked";
        const key = petRewardReferenceKey(valid.reference);
        if (policy.entries.some(entry => petRewardReferenceKey(entry.reference) === key)) return "duplicate";
        if (policy.accountSeen.some(entry => petRewardReferenceKey(entry.reference) === key)) return "duplicate";
        if (policy.pending.some(entry => petRewardReferenceKey(entry.reference) === key)) return "legacy_hold";
        const old = legacyPetRewardMatch(valid.reference, policy.legacy.answers);
        if (old === "exact") return "duplicate";
        if (old === "ambiguous") return "legacy_hold";
        const day = new Date(this.options.now()).toISOString().slice(0, 10);
        const food = (doc.days[day] ?? 0) < PET_LIMITS.dailyAnswers && doc.food < PET_LIMITS.food;
        policy.entries.push({ reference: valid.reference, food: food ? "available" : "none", state: "active", owner: null, segmentId: null });
        doc.answers.push(JSON.stringify([valid.reference.source === "question" ? valid.reference.exam : `library:${valid.reference.examId}`, valid.reference.questionId]));
        if (food) { doc.food++; doc.days[day] = (doc.days[day] ?? 0) + 1; }
        return "applied";
      });
      if (result !== "storage_error" && this.guestHolds.size === 0) this.pendingGuest.delete(petRewardReferenceKey(valid.reference));
      if (result === "applied") this.reactions.forEach(listener => listener({ kind: "answer", questionId: valid.reference.questionId }));
      return result;
    } catch { this.publish("storage_error", this.view.document); return "storage_error"; }
  }
  /** Durable current-owner intent before any account network send. Unmigrated
   * guest matches HOLD so the same Q cannot mint account food before consent. */
  async queueAccountSubmission(owner: string, input: PetLearningSubmission, reference: PetRewardReference) {
    const submitted = petLearningSubmissionSchema.parse(input), ref = petRewardReferenceSchema.parse(reference);
    return this.policyChange((_doc, policy) => {
      const key = petRewardReferenceKey(ref);
      if (policy.accountSeen.some(entry => entry.owner === owner && petRewardReferenceKey(entry.reference) === key)) return { outcome: "duplicate" as const };
      const guest = policy.entries.find(entry => petRewardReferenceKey(entry.reference) === key);
      if (guest && (guest.owner === null || guest.owner === owner)) return { outcome: guest.state === "accepted" ? "duplicate" as const : "legacy_hold" as const };
      if (legacyPetRewardMatch(ref, policy.legacy.answers) !== "none") return { outcome: "legacy_hold" as const };
      const prior = policy.pending.find(entry => entry.owner === owner && petRewardReferenceKey(entry.reference) === key);
      if (prior) return { outcome: "pending" as const, id: prior.id };
      const entry: PendingPetSubmission = { id: crypto.randomUUID(), owner, reference: ref, input: submitted, event: null };
      policy.pending.push(entry); return { outcome: "pending" as const, id: entry.id };
    });
  }
  async pendingSubmissions(owner: string): Promise<PendingPetSubmission[]> {
    return this.options.exclusive.run(this.options.key, async () => structuredClone(this.read().rewardPolicy?.pending.filter(entry => entry.owner === owner) ?? []));
  }
  async retainSubmissionEvent(id: string, owner: string, input: PetLearningEvent) {
    const event = petLearningEventSchema.parse(input);
    await this.policyChange((_doc, policy) => {
      const entry = policy.pending.find(candidate => candidate.id === id && candidate.owner === owner);
      if (!entry || event.owner !== owner) throw new Error("submission_owner_changed");
      if (entry.event && entry.event.id !== event.id) throw new Error("submission_event_changed");
      entry.event = structuredClone(event); entry.input = null;
    });
  }
  async acceptSubmission(id: string, owner: string) {
    await this.policyChange((_doc, policy) => {
      const entry = policy.pending.find(candidate => candidate.id === id && candidate.owner === owner);
      if (!entry?.event) throw new Error("submission_event_required");
      const key = petRewardReferenceKey(entry.reference);
      if (!policy.accountSeen.some(candidate => candidate.owner === owner && petRewardReferenceKey(candidate.reference) === key))
        policy.accountSeen.push({ owner, reference: entry.reference, eventId: entry.event.id });
      policy.pending = policy.pending.filter(candidate => candidate !== entry);
    });
  }
  async load(): Promise<void> {
    try { await this.options.exclusive.run(this.options.key, async () => { this.publish("ready", this.read()); }); }
    catch { this.publish("storage_error", this.view.document); }
  }
  private async change(update: (document: LearningPetDocument) => LearningPetResult, reaction: LearningPetEvent | ((document: LearningPetDocument) => LearningPetEvent)): Promise<LearningPetResult> {
    const recipients = [...this.reactions];
    try {
      return await this.options.exclusive.run(this.options.key, async () => {
        const doc = this.read();
        const result = update(doc);
        const event = typeof reaction === "function" ? reaction(doc) : reaction;
        if (result === "applied") {
          if (doc.handoff) doc.handoff.revision += 1;
          // Publish or animate only after the complete new document was saved.
          this.options.storage.setItem(this.options.key, JSON.stringify(documentSchema.parse(doc)));
        }
        this.publish("ready", doc);
        if (result === "applied") recipients.forEach(listener => { if (this.reactions.has(listener)) listener(event); });
        return result;
      });
    } catch { this.publish("storage_error", this.view.document); return "storage_error"; }
  }
  async answer(input: { exam: string; questionId: string; scope?: string }): Promise<LearningPetResult> {
    if (this.guestHolds.size > 0) return "locked";
    if (isReferenceOnlyQuestionId(input.questionId)) return "locked";
    const id = JSON.stringify([input.exam, input.questionId]);
    if (!input.exam || !input.questionId || id.length > 1000) return "locked";
    this.pendingAnswers.set(id, { ...input });
    const result = await this.change(doc => {
      if (this.guestHolds.size > 0) return "locked";
      // The legacy metadata-only API is retained for isolated legacy fixtures.
      // Once upgraded, only completeness-checked submitGuest may grant rewards.
      if (doc.rewardPolicy) return "locked";
      if (doc.answers.includes(id)) return "duplicate";
      const day = new Date(this.options.now()).toISOString().slice(0, 10);
      doc.answers.push(id);
      if ((doc.days[day] ?? 0) < PET_LIMITS.dailyAnswers && doc.food < PET_LIMITS.food) {
        doc.food += 1; doc.days[day] = (doc.days[day] ?? 0) + 1;
      }
      return "applied";
    }, { kind: "answer", questionId: input.questionId, scope: input.scope });
    if (result !== "storage_error") this.pendingAnswers.delete(id);
    return result;
  }
  feed(context?: string) { return this.change(doc => {
    if (doc.food === 0) return "no_food";
    if (doc.rewardPolicy) {
      if (doc.rewardPolicy.legacy.food > 0) { doc.rewardPolicy.legacy.food--; doc.rewardPolicy.legacy.meals++; }
      else {
        const token = doc.rewardPolicy.entries.find(entry => entry.state === "active" && entry.food === "available");
        if (!token) return "legacy_hold";
        token.food = "consumed";
      }
    }
    doc.food -= 1; doc.meals += 1; if (doc.handoff) doc.handoff.activeMeals += 1; return "applied";
  }, doc => ({ kind: "feed", context, feedReaction: petFeedReaction(doc.answers.length, doc.meals) })); }
  dress(outfit: "none" | "bandana", context?: string) { return this.change(doc => {
    if (outfit === "bandana" && doc.answers.length - (doc.handoff?.sealedAnswers ?? 0) < 5) return "locked";
    if (doc.outfit === outfit) return "duplicate";
    doc.outfit = outfit; return "applied";
  }, { kind: "dress", context }); }
  /** Local wardrobe uses lifetime device milestones, independent of legacy wire clothing. */
  chooseWardrobe(wardrobe: PetWardrobe, context?: string) { return this.change(doc => {
    if (!wardrobeSchema.safeParse(wardrobe).success || !wardrobeUnlocked(doc.answers.length, wardrobe)) return "locked";
    const experience = learningPetExperience(doc);
    if (experience.wardrobe === wardrobe) return "duplicate";
    experience.wardrobe = wardrobe; doc.experience = experience; return "applied";
  }, { kind: "dress", context }); }
  care(gesture: PetCareGesture, context?: string) { return this.change(doc => {
    if (!careGestureSchema.safeParse(gesture).success || !careUnlocked(doc.answers.length, gesture)) return "locked";
    const experience = learningPetExperience(doc);
    if (experience.careCounts[gesture] >= Number.MAX_SAFE_INTEGER) return "locked";
    experience.careCounts[gesture] += 1; doc.experience = experience; return "applied";
  }, { kind: "care", careGesture: gesture, context }); }
  /** Explicit acknowledgement only: load never writes, animates, or grants a reward. */
  visit(context?: string) { return this.change(doc => {
    const day = new Date(this.options.now()).toISOString().slice(0, 10);
    const experience = learningPetExperience(doc);
    if (experience.lastVisitDay === day) return "duplicate";
    experience.lastVisitDay = day; doc.experience = experience; return "applied";
  }, { kind: "visit", context }); }
  async retry() {
    await this.load();
    if (this.view.status !== "ready" || this.guestHolds.size > 0) return;
    for (const valid of [...this.pendingGuest.values()]) {
      const result = await this.applyGuestSubmission(valid);
      if (result === "storage_error" || result === "locked") return;
    }
    for (const input of [...this.pendingAnswers.values()]) {
      if (await this.answer(input) === "storage_error") break;
    }
  }
  /** Same learning key, same lock, same commit. No second guest store or history upload. */
  accountHandoff(options: { transport: PetClientTransport; currentAccount: () => string | null;
    uuid: () => string; sha256: (text: string) => Promise<string>; transportTimeoutMs?: number }): PetAccountHandoffPort {
    const current = (context: PetAccountContext) => context.isCurrent() && options.currentAccount() === context.owner;
    const run = <T,>(context: PetAccountContext, operation: (doc: LearningPetDocument,
      queue: DurablePetQueue) => Promise<T>, sealing = false): Promise<T> =>
      this.options.exclusive.run(this.options.key, async () => {
        if (!current(context)) throw new Error("account_context_changed");
        let doc = this.read();
        if (!doc.handoff) {
          doc.handoff = { revision: 0, activeSegmentId: options.uuid(), sealedAnswers: 0, activeMeals: doc.meals,
            queue: { version: 1, revision: 0, account: null, detached: [], connections: [], queue: [] } };
          this.options.storage.setItem(this.options.key, JSON.stringify(documentSchema.parse(doc)));
        }
        const active = () => {
          const entries = doc.rewardPolicy?.entries.filter(entry => entry.state === "active");
          return { segmentId: doc.handoff!.activeSegmentId, snapshot: entries ? {
            answers: entries.length, food: entries.filter(entry => entry.food === "available").length,
            meals: entries.filter(entry => entry.food === "consumed").length,
            outfit: doc.outfit === "bandana" && entries.length >= 5 ? "bandana" as const : "none" as const,
            identified: { version: 1 as const, entries: entries.map(({ reference, food }) => ({ reference, food })) },
          } : { answers: doc.answers.length - doc.handoff!.sealedAnswers, food: doc.food,
            meals: doc.handoff!.activeMeals, outfit: doc.outfit } };
        };
        let raw = JSON.stringify(queueDocumentSchema.parse({ ...doc.handoff.queue, account: context.owner, guest: active() }));
        const queue = new DurablePetQueue({ key: this.options.key,
          exclusive: { async run(_key, work) { return work(); } },
          storage: { getItem: () => raw, setItem: (_key, value) => {
            const next = queueDocumentSchema.parse(JSON.parse(value));
            const before = active();
            const rotated = next.guest.segmentId !== before.segmentId;
            if (rotated && (!sealing || next.guest.snapshot.answers !== 0 || next.guest.snapshot.food !== 0 ||
              next.guest.snapshot.meals !== 0 || next.guest.snapshot.outfit !== "none" ||
              !next.queue.some(item => item.segmentId === before.segmentId && item.owner === context.owner &&
                JSON.stringify(item.snapshot) === JSON.stringify(before.snapshot)))) throw new Error("invalid_seal_transition");
            if (!rotated && JSON.stringify(next.guest) !== JSON.stringify(before)) throw new Error("guest_must_not_be_mirrored");
            const candidate = structuredClone(doc);
            const { guest, ...metadata } = next;
            candidate.handoff = { ...candidate.handoff!, revision: candidate.handoff!.revision + 1,
              activeSegmentId: guest.segmentId, queue: metadata };
            if (rotated) {
              candidate.experience = learningPetExperience(candidate);
              if (candidate.rewardPolicy && before.snapshot.identified) {
                for (const entry of candidate.rewardPolicy.entries.filter(entry => entry.state === "active")) {
                  entry.state = "sealed"; entry.owner = context.owner; entry.segmentId = before.segmentId;
                }
                candidate.handoff.sealedAnswers += before.snapshot.answers;
                candidate.handoff.activeMeals -= before.snapshot.meals;
                candidate.food -= before.snapshot.food;
              } else throw new Error("identified_seal_required");
              // An unrelated legacy wardrobe remains usable on this device.
              candidate.outfit = candidate.outfit === "bandana" && candidate.answers.length - candidate.handoff.sealedAnswers >= 5 ? "bandana" : "none";
            }
            for (const entry of candidate.rewardPolicy?.entries ?? []) {
              if (entry.state === "sealed" && next.queue.some(item => item.segmentId === entry.segmentId && item.owner === entry.owner && item.accepted)) entry.state = "accepted";
            }
            const valid = documentSchema.parse(candidate);
            this.options.storage.setItem(this.options.key, JSON.stringify(valid));
            // Advance the virtual queue only after the containing learning document persisted.
            doc = valid; raw = value; this.publish("ready", doc);
          } }, transport: options.transport,
          currentAccount: () => current(context) ? context.owner : null, uuid: options.uuid, sha256: options.sha256,
          transportTimeoutMs: options.transportTimeoutMs });
        return operation(doc, queue);
      });
    return {
      preview: context => run(context, async doc => {
        const h = doc.handoff!, entries = doc.rewardPolicy?.entries.filter(entry => entry.state === "active");
        if (!entries || entries.length === 0) return null; // Unidentified legacy is retained, not newly sealed/sent.
        return { revision: h.revision, segmentId: h.activeSegmentId,
          snapshot: { answers: entries.length, food: entries.filter(entry => entry.food === "available").length,
            meals: entries.filter(entry => entry.food === "consumed").length,
            outfit: doc.outfit === "bandana" && entries.length >= 5 ? "bandana" as const : "none" as const,
            identified: { version: 1 as const, entries: entries.map(({ reference, food }) => ({ reference, food })) } } };
      }),
      list: context => run(context, async doc => doc.handoff!.queue.queue.filter(item => item.owner === context.owner)
        .map(item => ({ segmentId: item.segmentId, status: item.accepted ? "accepted" as const : "queued" as const }))),
      seal: async input => {
        try { return await run(input, async (doc, queue) => {
          const prior = doc.handoff!.queue.queue.find(item => item.segmentId === input.segmentId);
          if (prior) return prior.owner === input.owner ? "sealed" as const : "blocked" as const;
          if (!doc.rewardPolicy?.entries.some(entry => entry.state === "active")) return "blocked" as const;
          if (!input.confirmed || !current(input) || doc.handoff!.revision !== input.expectedRevision ||
            doc.handoff!.activeSegmentId !== input.segmentId) return "stale" as const;
          const view = await queue.confirmImport(input.segmentId, true);
          return view.status === "queued" ? "sealed" as const : view.status === "storage_error" ? "storage_error" as const : "blocked" as const;
        }, true); } catch { return "storage_error"; }
      },
      recover: async input => {
        try { return await run(input, async (doc, queue) => {
          if (!doc.handoff!.queue.queue.some(item => item.owner === input.owner && item.segmentId === input.segmentId)) return "wrong_account" as const;
          return (await queue.recover(input.segmentId, input.confirmRenewal)).status;
        }); } catch { return "storage_error"; }
      },
    };
  }
  /** Caller must initiate a private recovery download. Never include this in logs. */
  exportRaw() { return this.options.storage.getItem(this.options.key); }
}

export function learningPetState(document: LearningPetDocument): PetState {
  return { version: 1, answers: document.answers.length, food: document.food, meals: document.meals, outfit: document.outfit, lastVisitDay: null };
}
export function learningPetSummary(document: LearningPetDocument) {
  const summary = summarizePet(learningPetState(document));
  return { ...summary, bandanaOwned: document.answers.length - (document.handoff?.sealedAnswers ?? 0) >= 5 };
}
