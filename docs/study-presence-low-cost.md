# Presence frequency and room contract (local proposal)

This patch changes presence only. It does not change authentication, normal answer/history saving, paid settings, credentials, schemas, or migrations. It is not deployed. The existing room/counter UI must be integrated separately before publication.

## Timing

| Purpose | Proposed value |
| --- | --- |
| Active problem heartbeat | 90 seconds |
| Explicit presence viewer refresh | 90 seconds |
| Observation window, anchored at measuredAt | 5 minutes |
| Stop after no user activity | 2 minutes |
| Fresh snapshot validity/cache | 90 seconds from measuredAt |
| Failed request retry delays | 90, 180, 300, 900 seconds; then 900 |
| Physical expired-row cleanup | On real writes only, at most once per 15 minutes per process |

Background tabs stop and abort outstanding requests. Becoming visible, clicking, scrolling, changing qualifications, and mounting a viewer never bypass an outstanding retry delay. Retry-After seconds and HTTP dates are honored when longer than the local delay. Success resets failure backoff. The 8-second client timeout remains.

Only a real problem marker (`data-study-presence-exam`) or a room marker (`data-study-presence-viewer`) enables requests. Mounting StudyPresence globally no longer polls unrelated pages. The room UI must add its viewer marker. The existing daily ID, browser lock, atomic rotation cleanup, bot exclusion, and newer-activity conflict rule remain.

## HTTP contract

The public `count` and `exams` fields remain. Metadata and `total` (an identical alias of count for the room view model) are additive. A measured response requires HTTP 200 and validated counts, known qualifications, unique rows, sum agreement, and canonical server UTC timestamps. No timestamp is synthesized by the browser.

```json
{
  "status": "measured",
  "count": 0,
  "total": 0,
  "exams": [],
  "measuredAt": "2026-10-23T10:00:00.000Z",
  "validUntil": "2026-10-23T10:01:30.000Z",
  "windowSeconds": 300
}
```

Zero is a legitimate successful measurement. Positive exams retain `{exam, count}` rows. `measuredAt` is captured on the server when the actual store measurement starts; cache reuse preserves it and validUntil exactly. A cached count describes the five-minute window at that timestamp, not a newly observed instant count. The parser permits at most five seconds of forward clock skew.

```json
{
  "status": "unavailable",
  "count": null,
  "total": null,
  "exams": null,
  "measuredAt": null,
  "validUntil": null,
  "windowSeconds": 300,
  "reason": "unavailable",
  "retryAfterSeconds": 90
}
```

Storage/circuit failures return 503 and Retry-After. Reasons are `unavailable`, `circuit_open`, or `disabled`; this patch has no trusted runtime quota signal and **never infers quota_exhausted from a 503**. The legacy unqualified POST still receives `{count}` on success; it cannot be a fresh measurement for the new room because it lacks metadata and qualified totals.

## UI integration handoff

Use `PresenceViewState`, `presenceViewState`, and `PRESENCE_STATE_EVENT` (`study-presence-state`) from `lib/study-presence-contract.ts`.

- `measured`: `snapshot` contains validated fresh data, `previous:null`. Label: **直近5分の学習状況**. Display the measurement time. Only this mode may use measured avatar counts.
- `stale`: `snapshot:null`, `previous` is the last successful timestamped measurement. Label: **前回の学習状況・現在の人数ではありません**. Treat previous as history, never current avatar occupancy. Expiry, network errors, hidden tabs, and inactivity can cause this mode.
- `promotion`: `snapshot:null`, `previous:null`; use separate static public qualification examples. Permanent labels: **資格紹介モード** and **チワワは紹介用のイメージです。実際の学習人数ではありません**. Never turn illustrated dogs into numeric learner counts.
- `demo`: UI-only explicit preview mode. Neither the API nor fallback helpers produce it. It must not send a heartbeat or claim actual learners.

The client emits a null legacy `study-presence-count` event because the current counter still labels a two-minute window. Its neutral suggestions remain until the separate UI integrates the five-minute contract. The existing TotalAnswerCounter integration test assumes the old event and needs coordinated UI work; this backend patch must not be published alone. Old/incomplete count-only bodies are rejected as measured by the new helper.

## Database work and limits

GET performs only the aggregate SELECT (or returns a cached snapshot); it never deletes rows. Both aggregate and legacy totals filter the five-minute boundary regardless of physical cleanup. Write-time cleanup is reserved before awaiting to coalesce concurrent cleanup in one process. Old-ID deletion still happens on each rotation in the same transaction. Expired rows can remain physically stored until a later real write; they are excluded from counts.

The service coalesces concurrent GETs, caches read/write snapshots for 90 seconds, and gates all presence GET/POST/legacy storage operations behind a circuit breaker. After failure, only one half-open recovery probe per process is allowed; older concurrent success cannot clear a newer failure. There are no background refresh jobs.

Existing `lib/rate-limit/server.ts`, `lib/rate-limit.ts`, and `lib/ai/cost-guard.ts` use optional Upstash REST credentials for unrelated controls. Availability today is unverified. They were not modified and their credentials were not retrieved. This patch introduces no KV adapter or service.

Cache, cleanup throttling, and circuit state are **process-local**, not distributed. Separate instances, cold starts, old clients, and ordinary auth/save operations can still access Neon. A 90-second stream is still more frequent than Neon's five-minute idle suspension. Reducing request frequency does not guarantee free operation, fix the current exhausted allowance, or establish missing migration completion. Consider a shared snapshot or further viewer reduction only after checking the existing shared store and measured workload. Keep all public measurements honest when stale/unavailable.

Confirmed parent-provided context: Free, 0.25 CU, approximately 110.06 CUh already consumed; next reset is 2026-11-01 00:00 UTC. Idle timeout zero means the default five-minute suspension, not disabled. None of those production settings is changed here.
