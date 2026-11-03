// 資格別 e ラーニング利用状況ダッシュボード (/admin/exam-usage) 用の PostHog 集計。
//
// lib/admin/funnel/posthog.ts / lib/stats/posthog.ts と同じ HogQL HTTP パターンを使う
// (新しい有料 API は追加しない)。ただしこのモジュールは「欠測を0にしない」方針を
// 明示的なデータ構造で表現する:
//
//   - PostHog が未設定、またはクエリが失敗した場合は `source: "unavailable"` を返し、
//     絶対に 0 件で偽装しない (measured 扱いにしない)。
//   - 資格ごとの各指標は MetricCell { status: "measured" | "not-instrumented", count } で
//     表現する。「measured かつ count=0」は『計測はされているが 0 件』、
//     「not-instrumented (count=null)」は『そもそもこの資格ではこの指標系統が計測されて
//     いない』であり、この2つを絶対に混同しない。
//
// 資格マスタは3系統を合成する (どれも既存の資格マスタで、新規に追加しない):
//   - lib/exam-config.ts の EXAM_CONFIGS (IPA 公式試験区分)
//   - lib/qualifications/catalog.ts の QUALIFICATION_CATALOG (外部資格の拡張計画)
//   - lib/exam-qualification-hubs.ts の QUALIFICATION_HUBS (公表試験問題ライブラリの
//     恒久URLがある資格)
// 3系統のキー空間は重ならない (IPA 2文字コード / 外部資格 slug / ハブ slug) 。
// 各行は examCode か hubSlug のどちらか一方しか持たない (両方を持つ行は無い) ので、
// 「回答数」の合算で二重計上する心配は無い。
//
// 主画面は「資格別の回答数ランキング」(オーナー要望・コーディネーター転送 2026-09-29)。
// 回答数は event='question_answered' (QuizPlayer の通常クイズ *および* /q/* 個別問題
// ページの inline 回答 — 同じイベント名を使うため自動的に合算される) と、公表試験問題
// ライブラリの新規イベント exam_library_answered を、資格ごとに一方だけ足し込む。

import { ALL_EXAM_CODES, EXAM_CONFIGS } from "@/lib/exam-config";
import { QUALIFICATION_CATALOG } from "@/lib/qualifications/catalog";
import { QUALIFICATION_HUBS, qualificationHubForEntry } from "@/lib/exam-qualification-hubs";
import { EXAM_CATALOG } from "@/lib/exam-library-catalog";

const DEFAULT_HOST = "https://us.posthog.com";
// PostHog への集計クエリは複数回走る。1本あたりのタイムアウトを明示し、無応答のまま
// ページ全体を長時間ブロックしないようにする (logs/admin-monitoring-audit-2026-05-23.md
// が指摘した「PostHog fetch にタイムアウトが無い」懸念への対応を、この新規モジュールでは
// 最初から満たす)。
const HOGQL_TIMEOUT_MS = 15_000;

interface PosthogEnv {
  apiKey: string;
  projectId: string;
  host: string;
}

function readEnv(): PosthogEnv | null {
  const apiKey = process.env.POSTHOG_API_KEY;
  const projectId = process.env.POSTHOG_PROJECT_ID;
  const host = process.env.POSTHOG_HOST || DEFAULT_HOST;
  if (!apiKey || !projectId) return null;
  return { apiKey, projectId, host: host.replace(/\/+$/, "") };
}

export function isExamUsageConfigured(): boolean {
  return readEnv() !== null;
}

interface HogQlResult {
  results?: unknown[][];
}

async function hogql(env: PosthogEnv, query: string): Promise<HogQlResult | null> {
  try {
    const res = await fetch(`${env.host}/api/projects/${env.projectId}/query/`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${env.apiKey}`,
      },
      body: JSON.stringify({ query: { kind: "HogQLQuery", query } }),
      cache: "no-store",
      signal: AbortSignal.timeout(HOGQL_TIMEOUT_MS),
    });
    if (!res.ok) return null;
    const data = (await res.json()) as HogQlResult;
    if (!Array.isArray(data.results)) return null;
    return data;
  } catch {
    return null;
  }
}

// ─── 期間 ───────────────────────────────────────────────────────────────────

/** "all" = 全期間 (前期間比は付けない)。 */
export type ExamUsageRange = 7 | 30 | 90 | "all";
export const EXAM_USAGE_RANGE_OPTIONS: readonly ExamUsageRange[] = [7, 30, 90, "all"];

function currentWindowClause(range: ExamUsageRange): string {
  if (range === "all") return "";
  return `AND timestamp >= now() - INTERVAL ${range} DAY`;
}

/** 直前の同じ長さの期間: [now-2R, now-R) 。全期間には前期間が無い。 */
function previousWindowClause(range: ExamUsageRange): string | null {
  if (range === "all") return null;
  return `AND timestamp >= now() - INTERVAL ${range * 2} DAY AND timestamp < now() - INTERVAL ${range} DAY`;
}

// ─── 資格マスタ ─────────────────────────────────────────────────────────────

export type QualificationSource = "ipa" | "qualification-catalog" | "exam-library-hub";

export interface QualificationMasterEntry {
  /** 系統をまたいで一意 (例: "ipa:ap" / "qual:fp3" / "hub:sagyo-kankyo-sokuteishi") */
  key: string;
  source: QualificationSource;
  label: string;
  /** quiz_started / question_answered 等が properties.exam に載せる値。無い資格はこの系統の指標を計測できない。 */
  examCode?: string;
  /** 公表試験問題ライブラリの恒久ハブ slug。exam-library-hub 系統のみ。examCode とは排他。 */
  hubSlug?: string;
}

export function buildQualificationMaster(): QualificationMasterEntry[] {
  const rows: QualificationMasterEntry[] = [];
  for (const code of ALL_EXAM_CODES) {
    const cfg = EXAM_CONFIGS[code];
    rows.push({ key: `ipa:${code}`, source: "ipa", label: cfg?.nameFull ?? code, examCode: code });
  }
  for (const q of QUALIFICATION_CATALOG) {
    rows.push({
      key: `qual:${q.slug}`,
      source: "qualification-catalog",
      label: q.shortName,
      ...(q.examCode ? { examCode: q.examCode } : {}),
    });
  }
  for (const hub of QUALIFICATION_HUBS) {
    rows.push({ key: `hub:${hub.slug}`, source: "exam-library-hub", label: hub.name, hubSlug: hub.slug });
  }
  return rows;
}

// ─── 指標 (副次テーブル用) ────────────────────────────────────────────────────

export const EXAM_USAGE_METRIC_KEYS = [
  "pageViews",
  "quizStarted",
  "questionAnswered",
  "quizCompleted",
  "aiQuerySent",
  "copilotResponseReceived",
  "essayViewed",
  "blogViewed",
  "examLibraryAnswered",
  "examLibraryAiQuery",
] as const;
export type ExamUsageMetricKey = (typeof EXAM_USAGE_METRIC_KEYS)[number];

/**
 * status: "measured" は「この資格・この指標は計測経路があり、count はその実測値
 * (0 も含む)」。 "not-instrumented" は「そもそもこの資格ではこの指標系統を送信していない」
 * であり、count は必ず null。 呼び出し側はこの2つを絶対に同じ表示にしてはならない。
 */
export interface MetricCell {
  status: "measured" | "not-instrumented";
  count: number | null;
}

function measured(count: number): MetricCell {
  return { status: "measured", count };
}
const NOT_INSTRUMENTED: MetricCell = { status: "not-instrumented", count: null };

export type ExamUsageMetrics = Record<ExamUsageMetricKey, MetricCell>;

/** 主画面: 資格別の回答数ランキング用の値。 */
export interface AnsweredUsage {
  status: "measured" | "not-instrumented";
  /** 今期間の回答数 (question_answered + exam_library_answered のうち、その資格に該当する方だけ)。 */
  total: number | null;
  /** count(DISTINCT distinct_id)。取れない場合は null (未計測とは別の理由でも null になり得る)。 */
  uniqueUsers: number | null;
  /** 直前の同じ長さの期間の回答数。全期間表示、または未計測なら null。 */
  previousTotal: number | null;
  /** (total - previousTotal) / previousTotal * 100 を小数1桁で。比較不能なら null (UIは「—」)。 */
  changePct: number | null;
}

export interface QualificationUsageRow extends QualificationMasterEntry {
  answered: AnsweredUsage;
  metrics: ExamUsageMetrics;
}

export interface ExamUsageResponse {
  source: "posthog" | "unavailable";
  /** source が unavailable のときだけ設定。理由を握りつぶさない。 */
  reason?: "not_configured" | "query_failed";
  range: ExamUsageRange;
  generatedAt: string;
  cachedAt: string;
  rows: QualificationUsageRow[];
  /**
   * page_view のうち、どの資格にも紐付けられなかった件数 (トップページ・ブログ一覧など)。
   * 資格別合計に足し込まず、そのまま透明性のために見せる。
   */
  unattributedPageViews: number;
}

// ─── properties.exam を持つイベント (quiz_started 等) ───────────────────────

const EXAM_PROPERTY_EVENTS: Array<{ event: string; metric: ExamUsageMetricKey }> = [
  { event: "quiz_started", metric: "quizStarted" },
  { event: "question_answered", metric: "questionAnswered" },
  { event: "quiz_completed", metric: "quizCompleted" },
  { event: "ai_query_sent", metric: "aiQuerySent" },
  { event: "copilot_response_received", metric: "copilotResponseReceived" },
  { event: "essay_viewed", metric: "essayViewed" },
  { event: "blog_viewed", metric: "blogViewed" },
];

interface CountAndUniq {
  count: number;
  uniq: number;
}

async function fetchExamPropertyCounts(
  env: PosthogEnv,
  whereClause: string,
): Promise<Map<string, Map<ExamUsageMetricKey, CountAndUniq>> | null> {
  const eventList = EXAM_PROPERTY_EVENTS.map((e) => `'${e.event}'`).join(", ");
  const q = `
    SELECT event, properties.exam AS exam, count() AS cnt, count(DISTINCT distinct_id) AS uniq
    FROM events
    WHERE event IN (${eventList})
      ${whereClause}
    GROUP BY event, exam
  `;
  const data = await hogql(env, q);
  if (!data?.results) return null;
  const byExam = new Map<string, Map<ExamUsageMetricKey, CountAndUniq>>();
  const metricByEvent = new Map(EXAM_PROPERTY_EVENTS.map((e) => [e.event, e.metric]));
  for (const row of data.results) {
    const eventName = String(row[0] ?? "");
    const examCode = String(row[1] ?? "");
    const cnt = Number(row[2] ?? 0);
    const uniq = Number(row[3] ?? 0);
    const metric = metricByEvent.get(eventName);
    if (!metric || !examCode) continue;
    const bucket = byExam.get(examCode) ?? new Map<ExamUsageMetricKey, CountAndUniq>();
    const prev = bucket.get(metric);
    bucket.set(metric, prev ? { count: prev.count + cnt, uniq: prev.uniq + uniq } : { count: cnt, uniq });
    byExam.set(examCode, bucket);
  }
  return byExam;
}

// ─── page_view (path ベース) ─────────────────────────────────────────────────

function pathSegments(rawPath: string): string[] {
  let pathname = rawPath || "/";
  try {
    pathname = new URL(rawPath, "https://x.invalid").pathname;
  } catch {
    // already a bare path
  }
  return pathname.split("/").filter(Boolean);
}

/** /q/{exam}/{yearSeason}/{section}/{qnum} などの経路から資格コードを取り出す。 */
function resolveExamCodeFromPath(segments: string[], knownExamCodes: ReadonlySet<string>): string | null {
  const [s0, s1] = segments;
  if (!s0) return null;
  if (s0 === "q" && s1) {
    const code = s1.split("-")[0];
    return code && knownExamCodes.has(code) ? code : null;
  }
  if ((s0 === "essay" || s0 === "essays" || s0 === "mock-exam" || s0 === "recommended-books" || s0 === "success-stories") && s1) {
    return knownExamCodes.has(s1) ? s1 : null;
  }
  if (knownExamCodes.has(s0)) return s0; // app/[exam]/page.tsx catch-all
  return null;
}

/** /e-learning/exams/{id} または /e-learning/exams/qualifications/{slug} から hub slug を取り出す。 */
function resolveHubKeyFromPath(
  segments: string[],
  hubSlugs: ReadonlySet<string>,
  examLibraryIdToHubSlug: ReadonlyMap<string, string>,
): string | null {
  if (segments[0] !== "e-learning" || segments[1] !== "exams") return null;
  if (segments[2] === "qualifications" && segments[3]) {
    return hubSlugs.has(segments[3]) ? segments[3] : null;
  }
  const id = segments[2];
  if (!id) return null;
  return examLibraryIdToHubSlug.get(id) ?? null; // ハブに未対応のカタログ項目は null (unattributed に計上)
}

async function fetchPageViewCounts(
  env: PosthogEnv,
  whereClause: string,
  master: readonly QualificationMasterEntry[],
): Promise<{ byKey: Map<string, number>; unattributed: number } | null> {
  const q = `
    SELECT properties.path AS path, count() AS cnt
    FROM events
    WHERE event = 'page_view'
      ${whereClause}
    GROUP BY path
    ORDER BY cnt DESC
    LIMIT 5000
  `;
  const data = await hogql(env, q);
  if (!data?.results) return null;

  const knownExamCodes = new Set(
    master.filter((m) => m.examCode).map((m) => m.examCode as string),
  );
  const examCodeToKey = new Map(
    master.filter((m) => m.examCode).map((m) => [m.examCode as string, m.key]),
  );
  const hubSlugs = new Set(master.filter((m) => m.hubSlug).map((m) => m.hubSlug as string));
  const examLibraryIdToHubSlug = new Map<string, string>();
  for (const entry of EXAM_CATALOG) {
    const hub = qualificationHubForEntry(entry);
    if (hub) examLibraryIdToHubSlug.set(entry.id, hub.slug);
  }

  const byKey = new Map<string, number>();
  let unattributed = 0;
  for (const row of data.results) {
    const path = String(row[0] ?? "");
    const cnt = Number(row[1] ?? 0);
    if (!path) continue;
    const segments = pathSegments(path);

    const examCode = resolveExamCodeFromPath(segments, knownExamCodes);
    if (examCode) {
      const key = examCodeToKey.get(examCode);
      if (key) {
        byKey.set(key, (byKey.get(key) ?? 0) + cnt);
        continue;
      }
    }
    const hubSlug = resolveHubKeyFromPath(segments, hubSlugs, examLibraryIdToHubSlug);
    if (hubSlug) {
      const key = `hub:${hubSlug}`;
      byKey.set(key, (byKey.get(key) ?? 0) + cnt);
      continue;
    }
    unattributed += cnt;
  }
  return { byKey, unattributed };
}

// ─── 公表試験問題ライブラリの新規イベント ─────────────────────────────────────

const EXAM_LIBRARY_EVENTS: Array<{ event: string; metric: ExamUsageMetricKey }> = [
  { event: "exam_library_answered", metric: "examLibraryAnswered" },
  { event: "exam_library_ai_query", metric: "examLibraryAiQuery" },
];

async function fetchExamLibraryEventCounts(
  env: PosthogEnv,
  whereClause: string,
): Promise<Map<string, Map<ExamUsageMetricKey, CountAndUniq>> | null> {
  const eventList = EXAM_LIBRARY_EVENTS.map((e) => `'${e.event}'`).join(", ");
  const q = `
    SELECT event, properties.hubSlug AS hubSlug, count() AS cnt, count(DISTINCT distinct_id) AS uniq
    FROM events
    WHERE event IN (${eventList})
      ${whereClause}
    GROUP BY event, hubSlug
  `;
  const data = await hogql(env, q);
  if (!data?.results) return null;
  const byHub = new Map<string, Map<ExamUsageMetricKey, CountAndUniq>>();
  const metricByEvent = new Map(EXAM_LIBRARY_EVENTS.map((e) => [e.event, e.metric]));
  for (const row of data.results) {
    const eventName = String(row[0] ?? "");
    const hubSlug = String(row[1] ?? "");
    const cnt = Number(row[2] ?? 0);
    const uniq = Number(row[3] ?? 0);
    const metric = metricByEvent.get(eventName);
    if (!metric || !hubSlug) continue;
    const bucket = byHub.get(hubSlug) ?? new Map<ExamUsageMetricKey, CountAndUniq>();
    const prev = bucket.get(metric);
    bucket.set(metric, prev ? { count: prev.count + cnt, uniq: prev.uniq + uniq } : { count: cnt, uniq });
    byHub.set(hubSlug, bucket);
  }
  return byHub;
}

// ─── 前期間比 ───────────────────────────────────────────────────────────────

function computeChangePct(total: number, previousTotal: number | null): number | null {
  if (previousTotal === null || previousTotal === 0) return null;
  return Math.round(((total - previousTotal) / previousTotal) * 1000) / 10;
}

// ─── 集計本体 (キャッシュなし。テストはこちらを直接呼ぶ) ─────────────────────

export async function computeExamUsageData(range: ExamUsageRange): Promise<ExamUsageResponse> {
  const generatedAt = new Date().toISOString();
  const master = buildQualificationMaster();

  const env = readEnv();
  if (!env) {
    return {
      source: "unavailable",
      reason: "not_configured",
      range,
      generatedAt,
      cachedAt: generatedAt,
      rows: [],
      unattributedPageViews: 0,
    };
  }

  const currentClause = currentWindowClause(range);
  const previousClause = previousWindowClause(range);

  const emptyExamPropertyMap = new Map<string, Map<ExamUsageMetricKey, CountAndUniq>>();
  const emptyExamLibraryMap = new Map<string, Map<ExamUsageMetricKey, CountAndUniq>>();
  const [examPropCur, pageViewCur, examLibCur, examPropPrev, examLibPrev] = await Promise.all([
    fetchExamPropertyCounts(env, currentClause),
    fetchPageViewCounts(env, currentClause, master),
    fetchExamLibraryEventCounts(env, currentClause),
    previousClause ? fetchExamPropertyCounts(env, previousClause) : Promise.resolve(emptyExamPropertyMap),
    previousClause ? fetchExamLibraryEventCounts(env, previousClause) : Promise.resolve(emptyExamLibraryMap),
  ]);

  // 現在期間のクエリが1本でも失敗したら unavailable (一部だけ実測・一部だけ偽装0、
  // という中途半端な状態を作らない)。前期間クエリの失敗は比較を「—」にするだけに留める
  // (前期間比が取れないだけで、今期間の実測値まで捨てる必要は無いため)。
  if (!examPropCur || !pageViewCur || !examLibCur) {
    return {
      source: "unavailable",
      reason: "query_failed",
      range,
      generatedAt,
      cachedAt: generatedAt,
      rows: [],
      unattributedPageViews: 0,
    };
  }
  const havePrevious = previousClause !== null && examPropPrev !== null && examLibPrev !== null;

  const rows: QualificationUsageRow[] = master.map((entry) => {
    const metrics = {} as ExamUsageMetrics;
    const pv = pageViewCur.byKey.get(entry.key);
    metrics.pageViews = pv !== undefined ? measured(pv) : measured(0);

    const examBucket = entry.examCode ? examPropCur.get(entry.examCode) : undefined;
    const examPropertyApplicable = Boolean(entry.examCode);
    for (const { metric } of EXAM_PROPERTY_EVENTS) {
      metrics[metric] = examPropertyApplicable ? measured(examBucket?.get(metric)?.count ?? 0) : NOT_INSTRUMENTED;
    }

    const hubBucket = entry.hubSlug ? examLibCur.get(entry.hubSlug) : undefined;
    const hubApplicable = Boolean(entry.hubSlug);
    for (const { metric } of EXAM_LIBRARY_EVENTS) {
      metrics[metric] = hubApplicable ? measured(hubBucket?.get(metric)?.count ?? 0) : NOT_INSTRUMENTED;
    }

    // pageViews は ipa / qualification-catalog 系統で examCode が無い資格 (=そもそも
    // このサイトにその資格のページが無い) では計測経路が無いので not-instrumented にする。
    if (entry.source !== "exam-library-hub" && !entry.examCode) {
      metrics.pageViews = NOT_INSTRUMENTED;
    }

    // 主指標: 回答数ランキング用。examCode と hubSlug は排他なので二重計上しない。
    let answered: AnsweredUsage;
    if (entry.examCode) {
      const cur = examBucket?.get("questionAnswered") ?? { count: 0, uniq: 0 };
      const prevBucket = havePrevious ? examPropPrev?.get(entry.examCode)?.get("questionAnswered") : undefined;
      const previousTotal = havePrevious ? (prevBucket?.count ?? 0) : null;
      answered = {
        status: "measured",
        total: cur.count,
        uniqueUsers: cur.uniq,
        previousTotal,
        changePct: computeChangePct(cur.count, previousTotal),
      };
    } else if (entry.hubSlug) {
      const cur = hubBucket?.get("examLibraryAnswered") ?? { count: 0, uniq: 0 };
      const prevBucket = havePrevious ? examLibPrev?.get(entry.hubSlug)?.get("examLibraryAnswered") : undefined;
      const previousTotal = havePrevious ? (prevBucket?.count ?? 0) : null;
      answered = {
        status: "measured",
        total: cur.count,
        uniqueUsers: cur.uniq,
        previousTotal,
        changePct: computeChangePct(cur.count, previousTotal),
      };
    } else {
      answered = { status: "not-instrumented", total: null, uniqueUsers: null, previousTotal: null, changePct: null };
    }

    return { ...entry, answered, metrics };
  });

  return {
    source: "posthog",
    range,
    generatedAt,
    cachedAt: generatedAt,
    rows,
    unattributedPageViews: pageViewCur.unattributed,
  };
}

// ─── キャッシュ付きエントリポイント (ページから呼ぶ) ─────────────────────────

const CACHE_TTL_MS = 20 * 60 * 1000; // 10〜30分程度、と依頼にあるので中間値
const cache = new Map<ExamUsageRange, { data: ExamUsageResponse; ts: number }>();

export async function fetchExamUsageData(range: ExamUsageRange): Promise<ExamUsageResponse> {
  const hit = cache.get(range);
  const now = Date.now();
  if (hit && now - hit.ts < CACHE_TTL_MS) {
    return { ...hit.data, cachedAt: new Date(hit.ts).toISOString() };
  }
  const data = await computeExamUsageData(range);
  cache.set(range, { data, ts: now });
  return data;
}

/** テスト専用: モジュールスコープのキャッシュを初期化する。 */
export function __resetExamUsageCacheForTests(): void {
  cache.clear();
}
