import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

import { ALL_QUESTIONS } from "@/data/questions";
import { SOUKAN_QUESTIONS } from "@/data/questions/soukan";
import { EXAM_CONFIGS } from "@/lib/exam-config";
import { getQualificationByExamCode } from "@/lib/qualifications/catalog";
import { choiceDisplayLabel } from "@/lib/questions/display";
import { isPracticeReadyQuestion } from "@/lib/questions/filter";
import type { ChoiceKey } from "@/lib/questions/types";

const report = path.join(process.cwd(), "reports/gijutsushi-soukan-20260929");
const readJson = <T,>(file: string): T => JSON.parse(readFileSync(path.join(report, file), "utf8")) as T;

type Round = "R08" | "R07";
type Source = {
  number: number;
  stem: string;
  choiceHeaders: string[] | null;
  choices: string[];
  officialAnswer: number;
};
type Transcription = {
  indexUrl: string;
  answerIndexUrl: string;
  adjudication: { round: Round; number: number; field: string; from: string; to: string }[];
  rounds: Record<Round, { year: number; label: string; lawReferenceDate: string; lawReferenceDateJa: string; pdf: string; answer: string; preamble: string; questions: Source[] }>;
};
type Pass = { year: Round; questions: { number: number; stem: string; choiceHeaders: string[] | null; choices: string[] }[] };
type Final = {
  explanations: Record<string, { summary: string; category: string; choiceExplanations: string[]; lawSensitive: boolean }>;
  held: Record<string, string>;
  reviewLog: { number: number; history: [string, string][] }[];
};
type Receipt = { requestedModel: string; tools: string[]; exitCode: number; isError: boolean; modelUsage: Record<string, { provider: string }> };

const KEYS: readonly ChoiceKey[] = ["ア", "イ", "ウ", "エ", "オ"];
const ROUNDS: readonly Round[] = ["R08", "R07"];
const CATEGORIES = ["経済性管理", "人的資源管理", "情報管理", "安全管理", "社会環境管理"];
const source = readJson<Transcription>("source-transcription.json");
const answerKeys = readJson<Record<Round, Record<string, number>>>("answer-keys.json");
const displayEdits = readJson<{ round: Round; number: number; from: string; to: string }[]>("display-edits.json");
const withheld = (round: Round) => readJson<{ number: number; reason: string }[]>(`withheld-${round}.json`);
const final = (round: Round) => readJson<Final>(`explanations/${round}-final.json`);
const readPass = (pass: "passA" | "passB") => {
  const out = new Map<string, Pass["questions"][number]>();
  for (const file of readdirSync(path.join(report, "transcription", pass)).filter((f) => f.startsWith("R0"))) {
    const data = readJson<Pass>(`transcription/${pass}/${file}`);
    for (const q of data.questions) out.set(`${data.year}-${q.number}`, q);
  }
  return out;
};

/** build.py の render() と同じ規則で、原本転記から公開文面を組み立てる。 */
function render(round: Round, q: Source) {
  let stem = q.stem;
  let raw = [...q.choices];
  for (const edit of displayEdits.filter((e) => e.round === round && e.number === q.number)) {
    if (edit.from === "__APPEND__") {
      stem += edit.to;
      continue;
    }
    stem = stem.split(edit.from).join(edit.to);
    raw = raw.map((c) => c.split(edit.from).join(edit.to));
  }
  const choices = raw.map((c) =>
    q.choiceHeaders ? c.split(" ").map((cell, i) => `${q.choiceHeaders![i]}：${cell}`).join("／") : c,
  );
  return { stem, choices };
}

describe("技術士第二次試験 総合技術監理部門 択一式（令和7・8年度）", () => {
  it("件数: 各年度40問のうち査読PASSの問題だけを公開し、保留は理由付きで台帳に残す", () => {
    for (const round of ROUNDS) {
      const meta = source.rounds[round];
      const held = withheld(round).map((w) => w.number);
      const published = SOUKAN_QUESTIONS.filter((q) => q.year === meta.year);
      expect(meta.questions.map((q) => q.number)).toEqual(Array.from({ length: 40 }, (_, i) => i + 1));
      expect(published.map((q) => q.qNumber)).toEqual(meta.questions.map((q) => q.number).filter((n) => !held.includes(n)));
      expect(Object.keys(final(round).held).map(Number).sort((a, b) => a - b)).toEqual(held);
      for (const w of withheld(round)) {
        expect(w.reason.length, `${round} ${w.number}`).toBeGreaterThan(5);
        expect(ALL_QUESTIONS.some((q) => q.exam === "soukan" && q.year === meta.year && q.qNumber === w.number)).toBe(false);
      }
    }
    expect(new Set(SOUKAN_QUESTIONS.map((q) => q.id)).size).toBe(SOUKAN_QUESTIONS.length);
    expect(EXAM_CONFIGS.soukan.yearRange).toEqual({ start: 2025, end: 2026 });
    expect(getQualificationByExamCode("soukan")?.status).toBe("live");
  });

  it("正答: 公式正答PDFの表（answer-keys.json）と全問一致し、1問1正答", () => {
    for (const round of ROUNDS) {
      const meta = source.rounds[round];
      for (const s of meta.questions) expect(s.officialAnswer, `${round} ${s.number}`).toBe(answerKeys[round][String(s.number)]);
      for (const q of SOUKAN_QUESTIONS.filter((item) => item.year === meta.year)) {
        const official = answerKeys[round][String(q.qNumber)];
        expect(q.answer).toBe(KEYS[official - 1]);
        expect(q.officialAnswerNumber).toBe(String(official));
        expect(q.requiredSelections).toBeUndefined();
      }
    }
  });

  it("転記: 独立2回転記の差分は裁定済みの箇所だけで、公開文面は原本転記と一致する", () => {
    const a = readPass("passA");
    const b = readPass("passB");
    const adjudicated = new Set(source.adjudication.map((x) => `${x.round}-${x.number}`));
    const differing: string[] = [];
    for (const [key, qa] of a) {
      const qb = b.get(key);
      expect(qb, key).toBeDefined();
      const same = qa.stem === qb!.stem && JSON.stringify(qa.choices) === JSON.stringify(qb!.choices)
        && JSON.stringify(qa.choiceHeaders) === JSON.stringify(qb!.choiceHeaders);
      if (!same) differing.push(key);
    }
    expect(a.size).toBe(80);
    expect(b.size).toBe(80);
    // R07-33 は「CO2」と下付き「CO₂」の表記差（NFKC で一致）。R08-6 は空欄枠の空白数。
    for (const key of differing) {
      expect(adjudicated.has(key) || ["R07-33", "R08-6"].includes(key), key).toBe(true);
    }
    for (const round of ROUNDS) {
      const meta = source.rounds[round];
      for (const q of SOUKAN_QUESTIONS.filter((item) => item.year === meta.year)) {
        const s = meta.questions.find((item) => item.number === q.qNumber)!;
        const { stem, choices } = render(round, s);
        expect(q.question).toBe(stem);
        expect(KEYS.map((k) => q.choices?.[k])).toEqual(choices);
      }
    }
  });

  it("出典・利用条件・法令基準日を各問に持ち、独自解説で日本技術士会と無関係である旨を表示する", () => {
    for (const round of ROUNDS) {
      const meta = source.rounds[round];
      expect(meta.preamble).toContain(`年4月1日時点のものとする`);
      for (const q of SOUKAN_QUESTIONS.filter((item) => item.year === meta.year)) {
        expect(q.sourcePdfUrl).toBe(meta.pdf);
        expect(q.sourceAnswerUrl).toBe(meta.answer);
        expect(q.sourcePdfUrl.startsWith("https://www.engineer.or.jp/")).toBe(true);
        expect(q.sourceAttribution).toContain(`出典：公益社団法人日本技術士会 ${meta.label}技術士第二次試験 総合技術監理部門`);
        expect(q.sourceAttribution).toContain(`Ⅰ－1－${q.qNumber}`);
        expect(q.sourceAttribution).toContain("日本技術士会とは関係ありません");
        expect(q.officialReferenceUrls).toEqual([source.indexUrl, source.answerIndexUrl]);
        expect(q.license).toBe("IPEJ-attributed");
        expect(q.lawReferenceDate).toBe(meta.lawReferenceDate);
        expect(q.season).toBe("annual");
        expect(q.session).toBe("gakka");
      }
    }
    expect(choiceDisplayLabel("soukan", "ア")).toBe("(1)");
    expect(choiceDisplayLabel("soukan", "オ")).toBe("(5)");
  });

  it("解説: 全5肢に査読PASSの解説があり、5管理のいずれかに分類される", () => {
    for (const round of ROUNDS) {
      const meta = source.rounds[round];
      const fin = final(round);
      for (const q of SOUKAN_QUESTIONS.filter((item) => item.year === meta.year)) {
        const entry = fin.explanations[String(q.qNumber)];
        expect(entry, `${round} ${q.qNumber}`).toBeDefined();
        expect(CATEGORIES).toContain(q.category);
        expect(q.category).toBe(entry.category);
        const notice = `\n\n※問題冊子が示す基準日（${meta.lawReferenceDateJa}）時点の法令・制度・指針に基づく解説です。その後の改正・改訂に注意してください。`;
        expect(q.explanation).toBe(entry.summary + (entry.lawSensitive ? notice : ""));
        expect(q.explanationCoverage).toBe("full");
        expect(q.needsReview).toBe(false);
        expect(isPracticeReadyQuestion(q)).toBe(true);
        expect(Object.keys(q.choices ?? {})).toEqual(KEYS);
        expect(Object.keys(q.choiceExplanations ?? {})).toEqual(KEYS);
        KEYS.forEach((k, i) => {
          expect(q.choiceExplanations?.[k]).toBe(entry.choiceExplanations[i]);
          expect(q.choiceExplanations?.[k]?.length ?? 0).toBeGreaterThanOrEqual(25);
        });
        const log = fin.reviewLog.find((l) => l.number === q.qNumber)!;
        expect(log.history[0]?.[0]).toBe("draft");
        expect(log.history.some(([tag]) => tag === "review")).toBe(true);
        expect(log.history.at(-1)?.[1]).toBe("PASS");
      }
    }
  });

  it("receipt: 起稿はツールなし、査読は WebFetch/WebSearch の claude-opus-5-5（firstParty）", () => {
    for (const round of ROUNDS) {
      const dir = path.join(report, "explanations", round);
      const receipts = readdirSync(dir).filter((f) => f.endsWith(".receipt.json"));
      expect(receipts.filter((f) => f.includes(".draft.")).length).toBe(4);
      expect(receipts.filter((f) => f.includes(".review.")).length).toBe(4);
      for (const file of receipts) {
        const r = JSON.parse(readFileSync(path.join(dir, file), "utf8")) as Receipt;
        expect(r.requestedModel, file).toBe("claude-opus-5-5");
        expect(r.exitCode, file).toBe(0);
        expect(r.isError, file).toBe(false);
        expect(r.modelUsage["claude-opus-5-5"]?.provider, file).toBe("firstParty");
        expect(r.tools, file).toEqual(file.includes(".draft.") ? [] : ["WebFetch", "WebSearch"]);
      }
    }
  });
});
