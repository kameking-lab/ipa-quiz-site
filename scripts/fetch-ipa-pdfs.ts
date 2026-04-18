/**
 * IPA 公式サイトから過去問 PDF をダウンロードするスクリプト。
 *
 * 使い方:
 *   pnpm fetch:pdfs --exam=ap
 *   pnpm fetch:pdfs --exam=fe
 *   pnpm fetch:pdfs --all
 *   pnpm fetch:pdfs --exam=sc --year=2023
 *
 * 取得先: data/raw_pdfs/ 配下（.gitignore 済み）
 * アクセスは礼儀としてスロットル（1ファイル 500ms 待機）。
 */
import { mkdir, writeFile, stat } from "node:fs/promises";
import { createWriteStream } from "node:fs";
import { dirname, join } from "node:path";
import { pipeline } from "node:stream/promises";
import {
  EXAM_CONFIGS,
  ALL_EXAM_CODES,
  buildPdfUrl,
  buildRawPdfPath,
  type ExamConfig,
  type SessionConfig,
} from "@/lib/exam-config";
import type { ExamCode } from "@/lib/questions/types";

const BASE = join(process.cwd(), "data", "raw_pdfs");

interface CliArgs {
  exams: ExamCode[];
  year?: number;
  season?: "spring" | "autumn";
}

function parseArgs(): CliArgs {
  const argv = process.argv.slice(2);
  let exams: ExamCode[] = [];
  let year: number | undefined;
  let season: "spring" | "autumn" | undefined;

  for (const arg of argv) {
    if (arg === "--all") {
      exams = ALL_EXAM_CODES.filter((e) => EXAM_CONFIGS[e].seasons.length > 0);
    } else if (arg.startsWith("--exam=")) {
      const code = arg.slice(7) as ExamCode;
      if (!EXAM_CONFIGS[code]) {
        console.error(`Unknown exam: ${code}. Valid: ${ALL_EXAM_CODES.join(", ")}`);
        process.exitCode = 1;
      } else {
        exams.push(code);
      }
    } else if (arg.startsWith("--year=")) {
      year = parseInt(arg.slice(7), 10);
    } else if (arg === "--season=spring") {
      season = "spring";
    } else if (arg === "--season=autumn") {
      season = "autumn";
    } else {
      console.warn(`Unknown arg: ${arg}`);
    }
  }

  if (exams.length === 0) {
    // default: AP only
    exams = ["ap"];
  }

  return { exams, year, season };
}

async function exists(p: string): Promise<boolean> {
  try {
    await stat(p);
    return true;
  } catch {
    return false;
  }
}

async function downloadOne(url: string, savePath: string): Promise<"ok" | "skip" | "fail"> {
  const abs = join(BASE, savePath);
  if (await exists(abs)) {
    console.log(`[skip] ${savePath}`);
    return "skip";
  }
  await mkdir(dirname(abs), { recursive: true });
  console.log(`[get ] ${url}`);
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "ipa-quiz-site/0.1 (+kameking-lab)" },
    });
    if (!res.ok) {
      console.error(`  -> HTTP ${res.status} — skipping`);
      return "fail";
    }
    if (!res.body) {
      const buf = Buffer.from(await res.arrayBuffer());
      await writeFile(abs, buf);
    } else {
      await pipeline(res.body as unknown as NodeJS.ReadableStream, createWriteStream(abs));
    }
    return "ok";
  } catch (err) {
    console.error(`  -> ${(err as Error).message}`);
    return "fail";
  }
}

function buildTargets(
  cfg: ExamConfig,
  filterYear?: number,
  filterSeason?: "spring" | "autumn",
): Array<{ url: string; savePath: string }> {
  const targets: Array<{ url: string; savePath: string }> = [];
  const { yearRange, seasons, sessions } = cfg;

  const years: number[] = [];
  for (let y = yearRange.start; y <= yearRange.end; y++) years.push(y);

  const effectiveSeasons = filterSeason ? [filterSeason] : seasons;

  for (const year of years) {
    if (filterYear && year !== filterYear) continue;
    for (const season of effectiveSeasons) {
      for (const sessionCfg of sessions) {
        targets.push({
          url: buildPdfUrl(cfg, year, season, sessionCfg, "qs"),
          savePath: buildRawPdfPath(cfg.code, year, season, sessionCfg.session, "qs"),
        });
        targets.push({
          url: buildPdfUrl(cfg, year, season, sessionCfg, "ans"),
          savePath: buildRawPdfPath(cfg.code, year, season, sessionCfg.session, "ans"),
        });
      }
    }
  }

  return targets;
}

async function main() {
  const { exams, year, season } = parseArgs();
  if (process.exitCode === 1) return;

  await mkdir(BASE, { recursive: true });

  let ok = 0;
  let fail = 0;
  let skip = 0;

  for (const examCode of exams) {
    const cfg = EXAM_CONFIGS[examCode];
    if (cfg.seasons.length === 0) {
      console.log(`[skip-exam] ${cfg.nameFull} — no standard PDF exams (CBT)`);
      continue;
    }

    console.log(`\n=== Fetching ${cfg.nameFull} ===`);
    const targets = buildTargets(cfg, year, season);
    console.log(`  ${targets.length} files to check`);

    for (const t of targets) {
      const r = await downloadOne(t.url, t.savePath);
      if (r === "ok") ok++;
      else if (r === "skip") skip++;
      else fail++;
      await new Promise((r2) => setTimeout(r2, 500));
    }
  }

  console.log(`\nDone. ok=${ok} skip=${skip} fail=${fail}`);
  if (fail > 0) {
    console.log(`Note: Some files failed (HTTP 404 is normal for cancelled/unreleased exams).`);
    // Don't exit with error — 404s are expected for some exam+year combinations
  }
}

main();
