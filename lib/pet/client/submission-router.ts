import { validateLocalPetLearningSubmission } from "../submission-validation";
import type { LearningPetStore } from "./learning-store";
import type { PetAccountSubmissionSink, PetLearningSubmissionContext, PetSubmissionRouterView } from "./submission-router-contracts";

interface Binding {
  sink: PetAccountSubmissionSink; token: number;
  unsubscribe?: () => void; unbindEvent?: () => void;
  releaseGuestHold: () => void;
}
interface Lease { binding: Binding; owner: string; context: number }
/** One durable containing learning document. No constructor/load/register sends,
 * guest fallback while registered, or loss of a second distinct answer. */
export class PetSubmissionRouter {
  private binding?: Binding; private token = 0; private revision = 0;
  private draining?: Lease; private enqueueTail: Promise<void> = Promise.resolve();
  private active?: { lease: Lease; id: string };
  private engine?: { binding: Binding; owner: string; id: string };
  private observed?: { binding: Binding; owner: string | null; context: number | null };
  private listeners = new Set<() => void>();
  private view: PetSubmissionRouterView = { owner: null, context: 0, status: "ready", busy: false, pendingCount: 0, lastOutcome: null };
  constructor(private readonly options: { store: LearningPetStore }) {}
  getView = () => this.view;
  subscribe = (listener: () => void) => { this.listeners.add(listener); return () => { this.listeners.delete(listener); }; };
  private snapshot(binding = this.binding) {
    try { return binding?.sink.getView?.(); } catch { return undefined; }
  }
  private lease(): Lease | null {
    const binding = this.binding, snapshot = this.snapshot(binding);
    const owner = snapshot?.owner;
    return binding && owner && owner.length <= 128 && !/[\s,\x00-\x1f\x7f]/.test(owner) && Number.isSafeInteger(snapshot.context)
      ? { binding, owner, context: snapshot.context } : null;
  }
  private current(lease: Lease) {
    const snapshot = this.snapshot(lease.binding);
    return this.binding === lease.binding && snapshot?.owner === lease.owner && snapshot.context === lease.context;
  }
  private publish(patch: Partial<PetSubmissionRouterView>) {
    this.view = { ...this.view, ...patch };
    this.listeners.forEach(listener => listener());
  }
  private async recount(lease: Lease, patch: Partial<PetSubmissionRouterView> = {}) {
    const pending = await this.options.store.pendingSubmissions(lease.owner);
    if (this.current(lease)) this.publish({ owner: lease.owner, pendingCount: pending.length, ...patch,
      ...(patch.status === "ready" && pending.length > 0 ? { status: "pending" as const } : {}) });
  }
  async load() {
    await this.options.store.load();
    if (this.options.store.getView().status === "storage_error") { this.publish({ status: "storage_error", busy: false, lastOutcome: null }); return; }
    const lease = this.lease();
    if (lease) await this.recount(lease, { status: "ready", busy: false, lastOutcome: null });
    else this.publish({ owner: null, status: this.binding ? "unavailable" : "ready", busy: false, pendingCount: 0, lastOutcome: null });
  }
  register(sink: PetAccountSubmissionSink): () => void {
    const old = this.binding;
    // Replace atomically: old cleanup can never unregister a newer owner/token.
    const binding: Binding = { sink, token: ++this.token, releaseGuestHold: this.options.store.holdGuestSubmissions() }; this.binding = binding;
    old?.sink.resetSubmissionContext?.(); old?.unsubscribe?.(); old?.unbindEvent?.();
    old?.releaseGuestHold();
    this.engine = undefined; this.observed = undefined; this.revision++;
    this.publish({ owner: this.lease()?.owner ?? null, context: this.revision, status: "unavailable", busy: false, pendingCount: 0, lastOutcome: null });
    const changed = () => {
      if (this.binding !== binding) return;
      const lease = this.lease();
      const observed = { binding, owner: lease?.owner ?? null, context: lease?.context ?? null };
      const replaced = this.observed?.binding !== binding || this.observed.owner !== observed.owner || this.observed.context !== observed.context;
      this.observed = observed;
      if (replaced || this.active && !this.current(this.active.lease)) {
        this.revision++; this.engine = undefined;
        this.publish({ owner: lease?.owner ?? null, context: this.revision, status: lease ? "ready" : "unavailable", busy: false, pendingCount: 0, lastOutcome: null });
      }
      if (lease) void this.recount(lease, replaced ? { status: "ready" } : {}).catch(() => { if (this.current(lease)) this.publish({ status: "storage_error" }); });
    };
    binding.unsubscribe = sink.subscribe?.(changed);
    if (sink.setEventPersistence) binding.unbindEvent = sink.setEventPersistence(async event => {
      const active = this.active;
      if (!active || active.lease.binding !== binding || !this.current(active.lease) || event.owner !== active.lease.owner) throw new Error("submission_context_changed");
      try { await this.options.store.retainSubmissionEvent(active.id, active.lease.owner, event); }
      catch (error) { if (this.current(active.lease)) this.publish({ status: "storage_error", lastOutcome: null }); throw error; }
      if (!this.current(active.lease)) throw new Error("submission_context_changed");
    });
    changed();
    return () => {
      if (this.binding !== binding) return;
      this.binding = undefined; this.observed = undefined; this.revision++;
      sink.resetSubmissionContext?.(); binding.unsubscribe?.(); binding.unbindEvent?.(); this.engine = undefined;
      binding.releaseGuestHold();
      this.publish({ owner: null, context: this.revision, status: "ready", busy: false, pendingCount: 0, lastOutcome: null });
    };
  }
  submit(input: unknown, context: PetLearningSubmissionContext): Promise<void> {
    const valid = validateLocalPetLearningSubmission(input, context); // Entire caller graph copied before awaits.
    const binding = this.binding, lease = this.lease();
    if (!valid) { this.publish({ status: "unavailable", lastOutcome: null }); return Promise.resolve(); }
    if (!binding) return this.options.store.submitGuest(valid.submission, context).then(outcome => {
      if (this.binding) return;
      this.publish({ owner: null, status: outcome === "storage_error" ? "storage_error" : outcome === "legacy_hold" ? "legacy_hold" : "ready",
        lastOutcome: outcome === "applied" || outcome === "duplicate" ? outcome : null });
    });
    // A loading/null/failed account registration is a HOLD, never guest credit.
    if (!lease || !binding.sink.setEventPersistence || !binding.sink.resumeEvent) {
      this.publish({ status: "unavailable", lastOutcome: null }); return Promise.resolve();
    }
    const enqueue = async () => {
      if (!this.current(lease)) return;
      try {
        const prior = await this.options.store.pendingSubmissions(lease.owner);
        if (!this.current(lease)) return;
        const result = await this.options.store.queueAccountSubmission(lease.owner, valid.submission, valid.reference);
        if (!this.current(lease)) return;
        if (result.outcome === "legacy_hold") { this.publish({ status: "legacy_hold", lastOutcome: null }); return; }
        if (result.outcome === "duplicate") { this.publish({ status: "ready", lastOutcome: "duplicate" }); return; }
        const working = !!this.draining && this.current(this.draining);
        await this.recount(lease, { status: working ? "working" : "pending", busy: working, lastOutcome: null });
        // A newly explicit empty-queue operation may start. Restored/uncertain
        // queue entries need retry(), even if another new question is enqueued.
        if (prior.length === 0 && !working) void this.drain(lease);
      } catch { if (this.current(lease)) this.publish({ status: "storage_error", lastOutcome: null, busy: false }); }
    };
    this.enqueueTail = this.enqueueTail.then(enqueue, enqueue);
    return this.enqueueTail;
  }
  async retry() {
    await this.enqueueTail;
    const lease = this.lease();
    if (!lease || this.draining && this.current(this.draining)) return this.view;
    await this.drain(lease); return this.view;
  }
  private async drain(lease: Lease) {
    if (this.draining && this.current(this.draining) || !this.current(lease)) return;
    this.draining = lease; this.publish({ status: "working", busy: true, lastOutcome: null });
    let accepted = false;
    try {
      while (this.current(lease)) {
        const pending = await this.options.store.pendingSubmissions(lease.owner);
        if (!this.current(lease)) return;
        const entry = pending[0];
        if (!entry) { this.publish({ status: "ready", pendingCount: 0, lastOutcome: accepted ? "accepted" : null }); return; }
        this.active = { lease, id: entry.id };
        const sink = lease.binding.sink, state = this.snapshot(lease.binding) as ReturnType<NonNullable<PetAccountSubmissionSink["getView"]>> & { pending?: boolean };
        if (this.engine?.binding === lease.binding && this.engine.owner === lease.owner && this.engine.id === entry.id && state?.pending) {
          await sink.retry?.();
        } else {
          if (state?.pending || state?.busy) { this.publish({ status: "retry" }); return; }
          this.engine = { binding: lease.binding, owner: lease.owner, id: entry.id };
          if (entry.event) await sink.resumeEvent!(entry.event);
          else await sink.submit(entry.input);
        }
        if (!this.current(lease)) return;
        const after = this.snapshot(lease.binding);
        if (after?.status !== "accepted" || after.busy) {
          if (this.view.status !== "storage_error") this.publish({ status: after?.status === "legacy_hold" ? "legacy_hold" : after?.status === "storage_error" ? "storage_error" : "retry", lastOutcome: null });
          await this.recount(lease); return;
        }
        await this.options.store.acceptSubmission(entry.id, lease.owner);
        if (!this.current(lease)) return;
        accepted = true;
        this.engine = undefined; this.active = undefined;
        await this.recount(lease);
      }
    } catch { if (this.current(lease)) this.publish({ status: "storage_error", lastOutcome: null }); }
    finally {
      if (this.draining === lease) this.draining = undefined;
      if (this.active?.lease === lease) this.active = undefined;
      if (this.current(lease)) this.publish({ busy: false });
    }
  }
}
export function createPetSubmissionRouter(options: { store: LearningPetStore }) { return new PetSubmissionRouter(options); }
