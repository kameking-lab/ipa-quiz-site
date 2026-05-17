/**
 * IPA 過去問 PDF → 構造化 JSON 取り込みパイプライン (Phase 1)。
 *
 * 既存の scripts/parse-pdf-to-json.ts は Gemini Vision 必須・有料の経路。
 * 本スクリプトは pdfjs-dist によるテキスト抽出と正規表現ヒューリスティックのみで
 * 動作するため、LLM 呼び出しゼロ・コストゼロ・決定論的に動く。
 *
 * 制約:
 *   - 図表中心の問題（hasImage）はテキスト抽出で再現不能なため flag + skip 推奨。
 *   - 解説は本パイプラインの対象外（PDF にも書かれていない）。
 *   - レイアウトが極端に崩れている年度は heuristic が外れる場合がある。
 *
 * 使い方 (CLI):
 *   pnpm ingest:ipa --qs=data/raw_pdfs/ap/2023-spring/am_qs.pdf \
 *                  --ans=data/raw_pdfs/ap/2023-spring/am_ans.pdf \
 *                  --exam=ap --year=2023 --season=spring --session=am
 *
 *   pnpm ingest:ipa --qs=... --ans=... --exam=ap --year=2023 --season=spring --session=am --dry-run
 *   pnpm ingest:ipa --qs=... --ans=... --exam=ap --year=2023 --season=spring --session=am --json
 *
 * プログラマティック利用:
 *   import { ingestPdfText } from "./ingest-ipa-pdf";
 *   const result = ingestPdfText({ qsText, ansText, exam, year, season, session });
 */

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { z } from "zod";
import {
  EXAM_CONFIGS,
  buildPdfUrl,
  type ExamConfig,
  type SessionConfig,
} from "@/lib/exam-config";
import type {
  ChoiceKey,
  ExamCode,
  Question,
  Season,
  Session,
} from "@/lib/questions/types";

// ─── 公開型 ───────────────────────────────────────────────────

export interface RawQuestion {
  qNumber: number;
  question: string;
  choices: Partial<Record<ChoiceKey, string>>;
  hasImage: boolean;
}

export interface IngestInput {
  qsText: string;
  ansText: string;
  exam: ExamCode;
  year: number;
  season: Season;
  session: Session;
}

export interface IngestIssue {
  qNumber: number;
  severity: "error" | "warn";
  message: string;
}

export interface IngestResult {
  questions: Question[];
  issues: IngestIssue[];
  raw: RawQuestion[];
  answers: Record<number, ChoiceKey>;
  stats: {
    extracted: number;
    accepted: number;
    skipped: number;
    expected: number;
  };
}

// ─── 正規表現群 ───────────────────────────────────────────────

// 全角・半角の問番号トリガ
const QUESTION_HEAD_RE = /(?:^|\n)\s*問\s*([0-9]{1,3}|[０-９]{1,3})[\s.．。、:：]/;

// 選択肢: 行頭 ア/イ/ウ/エ + 区切り (全角空白 / 句点 / : / .)
const CHOICE_KEYS: ChoiceKey[] = ["ア", "イ", "ウ", "エ", "オ", "カ", "キ", "ク", "コ"];
const CHOICE_SET = new Set<string>(CHOICE_KEYS);

// 解答行: 「問1 ア」「1 ア」「1. ア」など
const ANSWER_LINE_RE = /(?:問\s*)?([0-9]{1,3}|[０-９]{1,3})[\s.．。、:：]+([アイウエオカキクコ])/g;

// 図表参照判定（hasImage 推定）
const FIGURE_HINT_RE = /(?:図\s*[0-9０-９]|表\s*[0-9０-９]|次の(図|表)|右図|下図|上図)/;

// ─── 全角→半角ヘルパ ────────────────────────────────────────

function toHalfDigits(s: string): string {
  return s.replace(/[０-９]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0));
}

function normalizeWhitespace(s: string): string {
  // CR/LF 統一、行末空白除去、3 連以上の改行を 2 つに圧縮
  return s
    .replace(/\r\n?/g, "\n")
    .replace(/[ \t　]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

// ─── 設問パース ───────────────────────────────────────────────

export function splitQuestions(rawText: string): RawQuestion[] {
  const text = normalizeWhitespace(rawText);
  const heads: Array<{ qNumber: number; start: number }> = [];

  const globalRe = new RegExp(QUESTION_HEAD_RE.source, "g");
  let m: RegExpExecArray | null;
  while ((m = globalRe.exec(text)) !== null) {
    const num = parseInt(toHalfDigits(m[1]!), 10);
    if (!Number.isFinite(num) || num < 1 || num > 200) continue;
    // 末尾の "問N" 位置 (m.index は match の先頭。改行を含む可能性があるので start を計算)
    const headStart = m.index + (m[0].startsWith("\n") ? 1 : 0);
    heads.push({ qNumber: num, start: headStart });
  }

  // 単調増加チェック (重複は最初の出現のみ採用)
  const seen = new Set<number>();
  const dedup: typeof heads = [];
  for (const h of heads) {
    if (seen.has(h.qNumber)) continue;
    seen.add(h.qNumber);
    dedup.push(h);
  }
  dedup.sort((a, b) => a.start - b.start);

  const out: RawQuestion[] = [];
  for (let i = 0; i < dedup.length; i++) {
    const cur = dedup[i]!;
    const next = dedup[i + 1];
    const block = text.slice(cur.start, next ? next.start : text.length);
    const parsed = parseBlock(cur.qNumber, block);
    if (parsed) out.push(parsed);
  }

  return out;
}

function parseBlock(qNumber: number, block: string): RawQuestion | null {
  // "問N" ヘッダ行を落とす
  const stripped = block.replace(/^\s*問\s*[0-9０-９]{1,3}[\s.．。、:：]\s*/, "");
  const lines = stripped.split("\n");

  // 選択肢開始位置（先頭が CHOICE_SET）まで本文
  const choiceIdx: Array<{ key: ChoiceKey; lineIdx: number }> = [];
  for (let i = 0; i < lines.length; i++) {
    const ln = lines[i]!.trim();
    if (ln.length === 0) continue;
    const head = ln[0]!;
    if (CHOICE_SET.has(head)) {
      // 第2文字が区切り or 空白なら選択肢行
      const sep = ln[1] ?? "";
      if (sep === "" || /[\s　.．、。:：]/.test(sep)) {
        choiceIdx.push({ key: head as ChoiceKey, lineIdx: i });
      }
    }
  }

  if (choiceIdx.length === 0) {
    // 選択肢が見つからない（記述式 or 抽出失敗）
    return null;
  }

  const firstChoiceLine = choiceIdx[0]!.lineIdx;
  const questionText = lines.slice(0, firstChoiceLine).join("\n").trim();
  if (questionText.length === 0) return null;

  const choices: Partial<Record<ChoiceKey, string>> = {};
  for (let i = 0; i < choiceIdx.length; i++) {
    const cur = choiceIdx[i]!;
    const next = choiceIdx[i + 1];
    const text = lines
      .slice(cur.lineIdx, next ? next.lineIdx : lines.length)
      .join("\n")
      .trim();
    // 先頭の "ア" + 区切りを除去
    const body = text.replace(/^[アイウエオカキクコ]\s*[.．、。:：]?\s*/, "").trim();
    if (body.length === 0) continue;
    choices[cur.key] = body;
  }

  const hasImage = FIGURE_HINT_RE.test(questionText);
  return { qNumber, question: questionText, choices, hasImage };
}

// ─── 解答パース ───────────────────────────────────────────────

export function parseAnswers(rawText: string): Record<number, ChoiceKey> {
  const text = normalizeWhitespace(rawText);
  const out: Record<number, ChoiceKey> = {};
  const re = new RegExp(ANSWER_LINE_RE.source, "g");
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    const num = parseInt(toHalfDigits(m[1]!), 10);
    const ans = m[2] as ChoiceKey;
    if (!Number.isFinite(num) || num < 1 || num > 200) continue;
    // 最初の出現を採用 (重複防止)
    if (!(num in out)) out[num] = ans;
  }
  return out;
}

// ─── Zod バリデーション ───────────────────────────────────────

const CHOICE_KEY = z.enum(["ア", "イ", "ウ", "エ", "オ", "カ", "キ", "ク", "コ"]);

// z.record(enum, value) in Zod v4 requires all enum keys, which forbids the
// usual 4-of-9 IPA choice shape. Validate as a string->string record + extra
// guard for the allowed key set instead.
const CHOICE_KEY_SET = new Set<string>(["ア", "イ", "ウ", "エ", "オ", "カ", "キ", "ク", "コ"]);
const ChoiceMapSchema = z
  .record(z.string(), z.string().min(1))
  .refine((obj) => Object.keys(obj).every((k) => CHOICE_KEY_SET.has(k)), {
    message: "choices contain a non-CHOICE_KEY key",
  })
  .refine((obj) => Object.keys(obj).length >= 2, {
    message: "fewer than 2 choices",
  });

const QuestionSchema = z.object({
  id: z.string().min(1),
  exam: z.string().min(1),
  session: z.string().min(1),
  year: z.number().int().gte(2000).lte(2100),
  season: z.enum(["spring", "autumn", "cbt"]),
  qNumber: z.number().int().gte(1),
  type: z.enum(["multiple-choice", "descriptive", "essay"]),
  category: z.string().min(1),
  topicTags: z.array(z.string()),
  difficulty: z.number().int().gte(1).lte(5),
  question: z.string().min(1),
  choices: ChoiceMapSchema.optional(),
  answer: z.union([CHOICE_KEY, z.array(CHOICE_KEY), z.string().min(1)]),
  explanation: z.string().min(1),
  hasImage: z.boolean(),
  sourcePdfUrl: z.string().min(1),
  license: z.literal("IPA-public"),
});

// ─── 組み立て ────────────────────────────────────────────────

function pickSessionConfig(cfg: ExamConfig, session: Session, isCbt: boolean): SessionConfig | null {
  const list = isCbt && cfg.cbtSessions ? cfg.cbtSessions : cfg.sessions;
  return list.find((s) => s.session === session) ?? null;
}

function buildQuestionId(exam: ExamCode, year: number, season: Season, session: Session, qNumber: number): string {
  if (season === "cbt") return `${exam}-${year}cbt-${session}-q${qNumber}`;
  const sc = season === "spring" ? "h" : "a";
  return `${exam}-${year}${sc}-${session}-q${qNumber}`;
}

export function ingestPdfText(input: IngestInput): IngestResult {
  const cfg = EXAM_CONFIGS[input.exam];
  if (!cfg) {
    throw new Error(`Unknown exam code: ${input.exam}`);
  }
  const sCfg = pickSessionConfig(cfg, input.session, input.season === "cbt");
  if (!sCfg) {
    throw new Error(`Unknown session "${input.session}" for exam "${input.exam}"`);
  }

  const raw = splitQuestions(input.qsText);
  const answers = parseAnswers(input.ansText);
  const issues: IngestIssue[] = [];
  const sourcePdfUrl =
    input.season === "cbt" ? "https://www.ipa.go.jp/shiken/mondai-kaiotu/" : buildPdfUrl(cfg, input.year, input.season, sCfg, "qs");

  const questions: Question[] = [];
  for (const r of raw) {
    const ans = answers[r.qNumber];
    if (!ans) {
      issues.push({ qNumber: r.qNumber, severity: "warn", message: "answer missing in answer PDF" });
      continue;
    }
    const choiceKeys = Object.keys(r.choices) as ChoiceKey[];
    if (choiceKeys.length < 2) {
      issues.push({ qNumber: r.qNumber, severity: "warn", message: `only ${choiceKeys.length} choice(s) extracted` });
      continue;
    }
    if (!choiceKeys.includes(ans)) {
      issues.push({
        qNumber: r.qNumber,
        severity: "warn",
        message: `answer "${ans}" not in extracted choices [${choiceKeys.join(",")}]`,
      });
      continue;
    }

    const reiwa = input.year - 2018;
    const yearLabel = reiwa >= 1 ? `令和${reiwa}年度` : `${input.year}年度`;
    const seasonLabel =
      input.season === "spring" ? "春期" : input.season === "autumn" ? "秋期" : "CBT";

    const candidate = {
      id: buildQuestionId(input.exam, input.year, input.season, input.session, r.qNumber),
      exam: input.exam,
      session: input.session,
      year: input.year,
      season: input.season,
      qNumber: r.qNumber,
      type: "multiple-choice",
      category: sCfg.categories[0] ?? "技術要素",
      topicTags: [] as string[],
      difficulty: 3 as const,
      question: r.question,
      choices: r.choices,
      answer: ans,
      explanation: `正解は${ans}です。(出典: IPA ${cfg.nameFull} ${yearLabel}${seasonLabel} ${sCfg.label} 問${r.qNumber})`,
      hasImage: r.hasImage,
      sourcePdfUrl,
      license: "IPA-public" as const,
    };

    const parsed = QuestionSchema.safeParse(candidate);
    if (!parsed.success) {
      const msg = parsed.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join("; ");
      issues.push({ qNumber: r.qNumber, severity: "error", message: `schema: ${msg}` });
      continue;
    }
    questions.push(parsed.data as Question);
  }

  return {
    questions,
    issues,
    raw,
    answers,
    stats: {
      extracted: raw.length,
      accepted: questions.length,
      skipped: raw.length - questions.length,
      expected: sCfg.expectedQuestions,
    },
  };
}

// ─── PDF → テキスト (pdfjs-dist, Node legacy build) ─────────

export async function extractTextFromPdf(pdfPath: string): Promise<string> {
  // pdfjs-dist は ESM-only。動的 import で読み込む。
  const pdfjs: typeof import("pdfjs-dist/legacy/build/pdf.mjs") = await import(
    /* @vite-ignore */ "pdfjs-dist/legacy/build/pdf.mjs"
  );
  const data = new Uint8Array(readFileSync(pdfPath));
  const loadingTask = pdfjs.getDocument({ data, useSystemFonts: true });
  const doc = await loadingTask.promise;
  const chunks: string[] = [];
  for (let p = 1; p <= doc.numPages; p++) {
    const page = await doc.getPage(p);
    const content = await page.getTextContent();
    const items = content.items as Array<{ str: string; hasEOL?: boolean }>;
    let line = "";
    for (const it of items) {
      line += it.str;
      if (it.hasEOL) {
        chunks.push(line);
        line = "";
      } else {
        line += " ";
      }
    }
    if (line.length > 0) chunks.push(line);
    chunks.push(""); // page break
  }
  await doc.destroy();
  return chunks.join("\n");
}

// ─── CLI ─────────────────────────────────────────────────────

interface CliArgs {
  qs: string;
  ans: string;
  exam: ExamCode;
  year: number;
  season: Season;
  session: Session;
  out?: string;
  dryRun: boolean;
  json: boolean;
}

function parseCli(): CliArgs | null {
  const args: Partial<CliArgs> & { dryRun: boolean; json: boolean } = {
    dryRun: false,
    json: false,
  };
  for (const a of process.argv.slice(2)) {
    if (a === "--dry-run") args.dryRun = true;
    else if (a === "--json") args.json = true;
    else if (a.startsWith("--qs=")) args.qs = a.slice(5);
    else if (a.startsWith("--ans=")) args.ans = a.slice(6);
    else if (a.startsWith("--exam=")) args.exam = a.slice(7) as ExamCode;
    else if (a.startsWith("--year=")) args.year = parseInt(a.slice(7), 10);
    else if (a.startsWith("--season=")) args.season = a.slice(9) as Season;
    else if (a.startsWith("--session=")) args.session = a.slice(10) as Session;
    else if (a.startsWith("--out=")) args.out = a.slice(6);
  }
  if (!args.qs || !args.ans || !args.exam || !args.year || !args.season || !args.session) {
    return null;
  }
  return args as CliArgs;
}

function printUsage(): void {
  console.error("Usage: pnpm ingest:ipa --qs=<qs.pdf> --ans=<ans.pdf> --exam=<code> --year=<yyyy> --season=<spring|autumn|cbt> --session=<am|am1|am2|kamoku-a|kamoku-b>");
  console.error("Optional: --out=<path.json>  --dry-run  --json");
}

async function main(): Promise<void> {
  const cli = parseCli();
  if (!cli) {
    printUsage();
    process.exitCode = 1;
    return;
  }

  const [qsText, ansText] = await Promise.all([
    extractTextFromPdf(cli.qs),
    extractTextFromPdf(cli.ans),
  ]);

  const result = ingestPdfText({
    qsText,
    ansText,
    exam: cli.exam,
    year: cli.year,
    season: cli.season,
    session: cli.session,
  });

  if (cli.json) {
    process.stdout.write(JSON.stringify(result, null, 2));
    process.stdout.write("\n");
  } else {
    console.log(`extracted=${result.stats.extracted} accepted=${result.stats.accepted} skipped=${result.stats.skipped} expected=${result.stats.expected}`);
    for (const i of result.issues) {
      console.log(`  [${i.severity}] 問${i.qNumber}: ${i.message}`);
    }
  }

  if (cli.dryRun) return;

  const outPath = cli.out ?? join(
    process.cwd(),
    "data",
    "questions",
    cli.exam,
    "by-year",
    `${cli.year}-${cli.season}-${cli.session}.ingest.json`,
  );
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, JSON.stringify(result.questions, null, 2) + "\n", "utf-8");
  console.log(`wrote ${result.questions.length} questions → ${outPath}`);
}

// Run only when executed directly (not when imported by tests).
const isDirect = (() => {
  try {
    const argv1 = process.argv[1] ?? "";
    return argv1.endsWith("ingest-ipa-pdf.ts") || argv1.endsWith("ingest-ipa-pdf.js");
  } catch {
    return false;
  }
})();

if (isDirect) {
  main().catch((err) => {
    console.error(err);
    process.exitCode = 1;
  });
}
