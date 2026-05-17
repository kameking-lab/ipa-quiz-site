/**
 * PDF 取り込みカバレッジ監査スクリプト (Phase 0)。
 *
 * EXAM_CONFIGS から想定される全 (exam × year × season × session) 組合せを生成し、
 * data/questions/<exam>/by-year/ 配下の実データ件数と突き合わせる。
 *
 * 出力:
 *   docs/audits/pdf-ingest-gaps-<DATE>.md   人間向けギャップサマリ
 *   data/sources/ipa-pdf-sources.json       IPA 公式 PDF URL マニフェスト
 *   logs/pdf-coverage.json                  機械向け詳細
 *
 * 使い方:
 *   pnpm tsx scripts/audit-pdf-coverage.ts
 *   pnpm tsx scripts/audit-pdf-coverage.ts --date=2026-05-17
 */

import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { ALL_QUESTIONS } from "@/data/questions";
import {
  EXAM_CONFIGS,
  ALL_EXAM_CODES,
  buildPdfUrl,
  type ExamConfig,
  type SessionConfig,
} from "@/lib/exam-config";
import type { ExamCode, Question, Season, Session } from "@/lib/questions/types";

interface ExpectedSlot {
  exam: ExamCode;
  examName: string;
  year: number;
  season: Season;
  session: Session;
  sessionLabel: string;
  expectedQuestions: number;
  qsPdfUrl: string;
  ansPdfUrl: string;
  isCbt: boolean;
  isLegacy: boolean;
}

interface ActualCount {
  total: number;
  withImage: number;
  needsReview: number;
}

interface CoverageRow {
  slot: ExpectedSlot;
  actual: ActualCount;
  status: "complete" | "partial" | "missing";
  gap: number;
}

function parseArgs(): { dateStr: string } {
  let dateStr = new Date().toISOString().slice(0, 10);
  for (const arg of process.argv.slice(2)) {
    if (arg.startsWith("--date=")) dateStr = arg.slice(7);
  }
  return { dateStr };
}

function yearsForRange(start: number, end: number): number[] {
  const out: number[] = [];
  for (let y = start; y <= end; y++) out.push(y);
  return out;
}

function buildExpectedSlots(): ExpectedSlot[] {
  const slots: ExpectedSlot[] = [];

  for (const code of ALL_EXAM_CODES) {
    const cfg = EXAM_CONFIGS[code];

    // Regular (paper-era) sessions
    for (const year of yearsForRange(cfg.yearRange.start, cfg.yearRange.end)) {
      for (const season of cfg.seasons) {
        if (season === "cbt") continue;
        for (const s of cfg.sessions) {
          slots.push(toSlot(cfg, year, season, s, false, false));
        }
      }
    }

    // Legacy pre-2012 specialist seasons
    if (cfg.legacyYearRange && cfg.legacySeasons) {
      for (const year of yearsForRange(cfg.legacyYearRange.start, cfg.legacyYearRange.end)) {
        for (const season of cfg.legacySeasons) {
          if (season === "cbt") continue;
          for (const s of cfg.sessions) {
            slots.push(toSlot(cfg, year, season, s, false, true));
          }
        }
      }
    }

    // CBT (IP 2021+, FE/SG 2023+) — URL is not derivable via buildPdfUrl; mark as such
    if (cfg.cbtYearRange) {
      const cbtSessions = cfg.cbtSessions ?? cfg.sessions;
      for (const year of yearsForRange(cfg.cbtYearRange.start, cfg.cbtYearRange.end)) {
        for (const s of cbtSessions) {
          slots.push(toSlot(cfg, year, "cbt", s, true, false));
        }
      }
    }
  }

  return slots;
}

function toSlot(
  cfg: ExamConfig,
  year: number,
  season: Season,
  s: SessionConfig,
  isCbt: boolean,
  isLegacy: boolean,
): ExpectedSlot {
  const qsPdfUrl = isCbt ? "" : buildPdfUrl(cfg, year, season, s, "qs");
  const ansPdfUrl = isCbt ? "" : buildPdfUrl(cfg, year, season, s, "ans");
  return {
    exam: cfg.code,
    examName: cfg.nameFull,
    year,
    season,
    session: s.session,
    sessionLabel: s.label,
    expectedQuestions: s.expectedQuestions,
    qsPdfUrl,
    ansPdfUrl,
    isCbt,
    isLegacy,
  };
}

function countActuals(): Map<string, ActualCount> {
  const map = new Map<string, ActualCount>();
  for (const q of ALL_QUESTIONS as Question[]) {
    const key = slotKey(q.exam, q.year, q.season, q.session);
    const cur = map.get(key) ?? { total: 0, withImage: 0, needsReview: 0 };
    cur.total += 1;
    if (q.hasImage) cur.withImage += 1;
    if (q.needsReview) cur.needsReview += 1;
    map.set(key, cur);
  }
  return map;
}

function slotKey(exam: ExamCode, year: number, season: Season, session: Session): string {
  return `${exam}/${year}/${season}/${session}`;
}

function classify(expected: number, actual: number): CoverageRow["status"] {
  if (actual === 0) return "missing";
  // Allow a small wobble (hasImage exclusions etc.) — within 10% counts as complete
  if (actual >= Math.ceil(expected * 0.9)) return "complete";
  return "partial";
}

function buildRows(): CoverageRow[] {
  const slots = buildExpectedSlots();
  const actuals = countActuals();
  return slots.map((slot) => {
    const a = actuals.get(slotKey(slot.exam, slot.year, slot.season, slot.session)) ?? {
      total: 0,
      withImage: 0,
      needsReview: 0,
    };
    return {
      slot,
      actual: a,
      status: classify(slot.expectedQuestions, a.total),
      gap: Math.max(0, slot.expectedQuestions - a.total),
    };
  });
}

interface ManifestEntry {
  exam: ExamCode;
  year: number;
  season: Season;
  session: Session;
  sessionLabel: string;
  expectedQuestions: number;
  isCbt: boolean;
  isLegacy: boolean;
  qsPdfUrl: string;
  ansPdfUrl: string;
  rawPdfPath: { qs: string; ans: string };
}

function buildManifest(rows: CoverageRow[]): {
  generatedAt: string;
  total: number;
  byExam: Record<string, number>;
  entries: ManifestEntry[];
} {
  const byExam: Record<string, number> = {};
  const entries: ManifestEntry[] = rows.map((r) => {
    byExam[r.slot.exam] = (byExam[r.slot.exam] ?? 0) + 1;
    return {
      exam: r.slot.exam,
      year: r.slot.year,
      season: r.slot.season,
      session: r.slot.session,
      sessionLabel: r.slot.sessionLabel,
      expectedQuestions: r.slot.expectedQuestions,
      isCbt: r.slot.isCbt,
      isLegacy: r.slot.isLegacy,
      qsPdfUrl: r.slot.qsPdfUrl,
      ansPdfUrl: r.slot.ansPdfUrl,
      rawPdfPath: {
        qs: `${r.slot.exam}/${r.slot.year}-${r.slot.season}/${r.slot.session}_qs.pdf`,
        ans: `${r.slot.exam}/${r.slot.year}-${r.slot.season}/${r.slot.session}_ans.pdf`,
      },
    };
  });
  return {
    generatedAt: new Date().toISOString(),
    total: entries.length,
    byExam,
    entries,
  };
}

function renderMarkdown(rows: CoverageRow[], dateStr: string): string {
  const lines: string[] = [];
  lines.push(`# IPA PDF 取り込みカバレッジ監査`);
  lines.push("");
  lines.push(`- 生成日: ${dateStr}`);
  lines.push(`- ソース: \`scripts/audit-pdf-coverage.ts\``);
  lines.push(`- 対象データ: \`data/questions/<exam>/by-year/**\``);
  lines.push("");

  // ── サマリ ───────────────────────────────────────────────────
  const totalSlots = rows.length;
  const complete = rows.filter((r) => r.status === "complete").length;
  const partial = rows.filter((r) => r.status === "partial").length;
  const missing = rows.filter((r) => r.status === "missing").length;
  const expectedTotal = rows.reduce((s, r) => s + r.slot.expectedQuestions, 0);
  const actualTotal = rows.reduce((s, r) => s + r.actual.total, 0);
  const gapTotal = rows.reduce((s, r) => s + r.gap, 0);

  lines.push(`## サマリ`);
  lines.push("");
  lines.push(`- 想定スロット数: ${totalSlots} (exam × year × season × session)`);
  lines.push(`- complete: ${complete}`);
  lines.push(`- partial: ${partial}`);
  lines.push(`- missing: ${missing}`);
  lines.push(`- 想定問題数合計: ${expectedTotal}`);
  lines.push(`- 実問題数合計: ${actualTotal}`);
  lines.push(`- ギャップ合計: ${gapTotal}`);
  lines.push("");

  // ── 試験別 ───────────────────────────────────────────────────
  lines.push(`## 試験区分別カバレッジ`);
  lines.push("");
  const byExam = new Map<ExamCode, CoverageRow[]>();
  for (const r of rows) {
    if (!byExam.has(r.slot.exam)) byExam.set(r.slot.exam, []);
    byExam.get(r.slot.exam)!.push(r);
  }
  for (const code of ALL_EXAM_CODES) {
    const rs = byExam.get(code) ?? [];
    if (rs.length === 0) continue;
    const exp = rs.reduce((s, r) => s + r.slot.expectedQuestions, 0);
    const act = rs.reduce((s, r) => s + r.actual.total, 0);
    const c = rs.filter((r) => r.status === "complete").length;
    const m = rs.filter((r) => r.status === "missing").length;
    const examName = EXAM_CONFIGS[code].nameFull;
    lines.push(
      `- **${code.toUpperCase()}** ${examName}: 想定 ${exp} / 実 ${act} (slots: complete=${c} / missing=${m} / total=${rs.length})`,
    );
  }
  lines.push("");

  // ── 不足リスト ────────────────────────────────────────────────
  lines.push(`## 不足スロット (missing + partial)`);
  lines.push("");
  lines.push(`格納形式: \`<exam>/<year>-<season>/<session>\` 想定<expected> 実<actual> gap=<gap> [flags]`);
  lines.push("");
  const gaps = rows
    .filter((r) => r.status !== "complete")
    .sort((a, b) => {
      if (a.slot.exam !== b.slot.exam) return a.slot.exam.localeCompare(b.slot.exam);
      if (a.slot.year !== b.slot.year) return a.slot.year - b.slot.year;
      return a.slot.session.localeCompare(b.slot.session);
    });
  for (const r of gaps) {
    const flags = [
      r.slot.isCbt ? "CBT" : null,
      r.slot.isLegacy ? "legacy" : null,
      r.status === "missing" ? "MISSING" : "partial",
    ]
      .filter(Boolean)
      .join(",");
    lines.push(
      `- \`${r.slot.exam}/${r.slot.year}-${r.slot.season}/${r.slot.session}\` 想定${r.slot.expectedQuestions} 実${r.actual.total} gap=${r.gap} [${flags}]`,
    );
  }
  lines.push("");

  // ── 注記 ─────────────────────────────────────────────────────
  lines.push(`## 注記`);
  lines.push("");
  lines.push(`- CBT 期 (IP 2021+, FE/SG 2023+) の PDF URL は IPA 側で公開形式が変則的なため`);
  lines.push(`  \`buildPdfUrl\` は空文字を返す。URL マニフェストでも qsPdfUrl/ansPdfUrl は空。`);
  lines.push(`- legacy フラグは 2009-2011 の高度試験 (春⇄秋スワップ) を示す。`);
  lines.push(`- \`complete\` は実 ≥ 想定×0.9 を意味する。hasImage 除外で減ったケースを許容。`);
  lines.push(`- 本監査は \`ALL_QUESTIONS\` (午前のみ) を対象。午後・論述は別管理。`);
  lines.push("");

  return lines.join("\n");
}

async function main() {
  const { dateStr } = parseArgs();
  const rows = buildRows();
  const manifest = buildManifest(rows);
  const md = renderMarkdown(rows, dateStr);

  const auditDir = join(process.cwd(), "docs", "audits");
  const sourcesDir = join(process.cwd(), "data", "sources");
  const logsDir = join(process.cwd(), "logs");
  mkdirSync(auditDir, { recursive: true });
  mkdirSync(sourcesDir, { recursive: true });
  mkdirSync(logsDir, { recursive: true });

  const mdPath = join(auditDir, `pdf-ingest-gaps-${dateStr}.md`);
  const manifestPath = join(sourcesDir, "ipa-pdf-sources.json");
  const logPath = join(logsDir, "pdf-coverage.json");

  writeFileSync(mdPath, md, "utf-8");
  writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + "\n", "utf-8");
  writeFileSync(
    logPath,
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        rows: rows.map((r) => ({
          ...r.slot,
          actual: r.actual,
          status: r.status,
          gap: r.gap,
        })),
      },
      null,
      2,
    ) + "\n",
    "utf-8",
  );

  console.log(`Wrote ${mdPath}`);
  console.log(`Wrote ${manifestPath}`);
  console.log(`Wrote ${logPath}`);

  const missing = rows.filter((r) => r.status === "missing").length;
  const partial = rows.filter((r) => r.status === "partial").length;
  console.log(`Slots: total=${rows.length} missing=${missing} partial=${partial}`);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
