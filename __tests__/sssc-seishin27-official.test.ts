import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

import { ALL_QUESTIONS } from "@/data/questions";
import { SEISHIN_2024_SOURCE, SEISHIN_QUESTIONS as ALL_SEISHIN_QUESTIONS } from "@/data/questions/seishin";
import { SHAKAI_QUESTIONS } from "@/data/questions/shakai";
import { SSSC_INDEPENDENCE_NOTICE } from "@/data/questions/sssc-welfare";
import { EXAM_CONFIGS } from "@/lib/exam-config";
import { isCompleteSelectionCorrect, requiredSelectionCount } from "@/lib/questions/answers";
import { choiceDisplayLabel } from "@/lib/questions/display";
import type { ChoiceKey } from "@/lib/questions/types";
import { getQuestionCanonicalRepresentative } from "@/lib/seo/question-canonical";
import { findQuestionByRoute, questionPagePath } from "@/lib/seo/question-url";

const report = path.join(process.cwd(), "reports/sssc-seishin27-20260929");
const readJson = <T,>(file: string, dir = report): T => JSON.parse(readFileSync(path.join(dir, file), "utf8")) as T;
type Session = "senmon" | "kyotsu";
type Transcribed = { number: number; subject: string; stem: string; choices: string[]; notes: string[]; case: string | null; pdfFile: string; pdfPage: number };
type Transcription = { exam: string; sourceFiles: Record<string, string>; htmlFiles: Record<string, string>; normalizations: { op: string }[]; questions: Transcribed[] };
type Final = {
  explanations: Record<string, { summary: string; choiceExplanations: string[]; lawSensitive: boolean }>;
  held: Record<string, string>;
  reviewLog: { number: number; history: [string, string][] }[];
};
type Hold = Record<Session, Record<string, { origin: string; status: string; subject: string; reason: string; ref?: string }>>;

const KEYS: readonly ChoiceKey[] = ["ア", "イ", "ウ", "エ", "オ"];
const SESSIONS: readonly Session[] = ["senmon", "kyotsu"];
const range = (from: number, to: number) => Array.from({ length: to - from + 1 }, (_, i) => from + i);
const compose = (q: Transcribed) => [...(q.case ? [q.case] : []), q.stem, ...q.notes].join("\n");

const SEISHIN_2024 = ALL_SEISHIN_QUESTIONS.filter((q) => q.year === 2024);
const bySession = (session: Session) => SEISHIN_2024.filter((q) => q.session === session);
const keys = readJson<{ sourceFile: { file: string; sha256: string }; kyotsuEqualsShakai37Questions1to84: boolean } & Record<Session, Record<string, number[]>>>("answer-keys.json");
const sources = readJson<{ termsUrl: string; round: number; fiscalYear: number; examDate: string; files: Record<string, { url: string; sha256: string }> }>("sources.json");
const hold = readJson<Hold>("hold.json");
const transcription = (session: Session) => readJson<Transcription>(`${session}-source-transcription.json`);
const shakai37 = path.join(process.cwd(), "reports/sssc-shakai37-20260928");
// 社会福祉士第37回の同一問題で PARTIAL_HOLD の問題（司令塔の判断なしに解除しない）。
const HELD_KYOTSU = [4, 69, 76];

describe("第27回（令和6年度）精神保健福祉士の公式照合", () => {
  it("件数ゲート: 専門科目48問、共通科目は保留3問を除く81問を第27回として公開する", () => {
    expect(bySession("senmon").map((q) => q.qNumber)).toEqual(range(1, 48));
    expect(bySession("kyotsu").map((q) => q.qNumber)).toEqual(range(1, 84).filter((n) => !HELD_KYOTSU.includes(n)));
    expect(SEISHIN_2024).toHaveLength(129);
    expect(ALL_SEISHIN_QUESTIONS.filter((q) => q.year === 2025)).toHaveLength(132);
    expect(new Set(ALL_SEISHIN_QUESTIONS.map((q) => q.id)).size).toBe(ALL_SEISHIN_QUESTIONS.length);
    expect(SEISHIN_2024.every((q) => q.examDate === "2025-02-01/2025-02-02" && q.season === "annual")).toBe(true);
    expect(EXAM_CONFIGS.seishin.yearRange).toEqual({ start: 2024, end: 2025 });
    expect(sources).toMatchObject({ round: 27, fiscalYear: 2024, examDate: "2025-02-01/2025-02-02" });
    // 社会福祉士第37回（同じ共通科目を含む）は別レーンの HOLD のまま。
    expect(SHAKAI_QUESTIONS.every((q) => q.year === 2025)).toBe(true);
  });

  it("保留問題は公開データ・全問題プールのどこにも出さず、理由を台帳に残す", () => {
    expect(Object.keys(hold.senmon)).toEqual([]);
    expect(Object.keys(hold.kyotsu).map(Number)).toEqual(HELD_KYOTSU);
    for (const [number, entry] of Object.entries(hold.kyotsu)) {
      expect(entry).toMatchObject({ origin: "inherited-shakai37", status: "PARTIAL_HOLD" });
      expect(entry.reason.length, number).toBeGreaterThan(30);
    }
    expect(SEISHIN_2024_SOURCE.withheld?.map((w) => [w.session, w.number, w.status])).toEqual(
      HELD_KYOTSU.map((n) => ["kyotsu", n, "PARTIAL_HOLD"]),
    );
    const heldIds = HELD_KYOTSU.map((n) => `seishin-2024-annual-kyotsu-q${n}`);
    for (const id of heldIds) {
      expect(ALL_SEISHIN_QUESTIONS.some((q) => q.id === id), id).toBe(false);
      expect(ALL_QUESTIONS.some((q) => q.id === id), id).toBe(false);
    }
    const published = readFileSync(path.join(process.cwd(), "data/questions/seishin/2024-annual.json"), "utf8");
    const kyotsu = transcription("kyotsu");
    for (const n of HELD_KYOTSU) {
      const stem = kyotsu.questions.find((q) => q.number === n)!.stem;
      expect(published.includes(JSON.stringify(stem).slice(1, -1)), `held 問題${n}`).toBe(false);
    }
  });

  it("問題文・選択肢は公式PDFテキストと一字一句同じで、共通科目のPDFは社会福祉士第37回と同一", () => {
    const shakai37Sources = readJson<{ files: Record<string, { url: string; sha256: string }> }>("sources.json", shakai37);
    const allowed = new Set(["pdf-paragraph-added", "case-note"]);
    for (const session of SESSIONS) {
      const t = transcription(session);
      expect(t.normalizations.every((n) => allowed.has(n.op)), session).toBe(true);
      for (const [name, sha] of Object.entries({ ...t.sourceFiles, ...t.htmlFiles })) expect(sources.files[name]?.sha256, name).toBe(sha);
      const byNumber = new Map(t.questions.map((q) => [q.number, q]));
      for (const q of bySession(session)) {
        const source = byNumber.get(q.qNumber)!;
        expect(q.question, q.id).toBe(compose(source));
        expect(Object.values(q.choices ?? {}), q.id).toEqual(source.choices);
        expect(q.category, q.id).toBe(source.subject);
        expect([q.question, ...source.choices].join("").includes("、"), q.id).toBe(false);
        expect(q.sourcePdfUrl, q.id).toBe(sources.files[source.pdfFile]?.url);
      }
    }
    for (const [name, file] of Object.entries(transcription("kyotsu").sourceFiles)) {
      expect(name).toMatch(/^sp_am_\d{2}_37\.pdf$/);
      expect(shakai37Sources.files[name]).toEqual({ url: sources.files[name]?.url, sha256: file });
    }
    for (const name of Object.keys(transcription("senmon").sourceFiles)) {
      expect(sources.files[name]?.url).toBe(`https://www.sssc.or.jp/seishin/past_exam/pdf/no27/${name}`);
    }
    // 事例の直後に印字された（注）は事例文の一部（第28回で検出した取り違えの再発防止）。
    for (const n of [46, 47, 48]) {
      expect(bySession("senmon")[n - 1]!.question).toContain("（問題48）\n（注）　「障害者総合支援法」とは");
    }
  });

  it("正答は第27回「合格基準・正答一覧」と全問一致し、共通科目の正答は社会福祉士第37回と同一", () => {
    expect(keys.sourceFile.sha256).toBe(sources.files["se_kijun_seitou.pdf"]?.sha256);
    expect(keys.kyotsuEqualsShakai37Questions1to84).toBe(true);
    const shakai37Keys = readJson<{ answers: Record<string, number[]> }>("answer-keys.json", shakai37).answers;
    for (const n of range(1, 84)) expect(keys.kyotsu[String(n)], String(n)).toEqual(shakai37Keys[String(n)]);
    expect(Object.keys(keys.senmon)).toHaveLength(48);
    for (const session of SESSIONS) {
      for (const q of bySession(session)) {
        const answer = keys[session][String(q.qNumber)]!;
        const expectedKeys = answer.map((n) => KEYS[n - 1]!);
        expect(q.officialAnswerNumber, q.id).toBe(answer.join(","));
        expect(q.sourceAnswerUrl, q.id).toBe("https://www.sssc.or.jp/seishin/past_exam/pdf/no27/se_kijun_seitou.pdf");
        expect(requiredSelectionCount(q), q.id).toBe(answer.length);
        expect(isCompleteSelectionCorrect(q.answer, expectedKeys), q.id).toBe(true);
        expect(q.question, q.id).toContain(`${answer.length}つ選びなさい`);
        expect(expectedKeys.map((key) => choiceDisplayLabel(q.exam, key)).join(","), q.id).toBe(answer.join(","));
      }
    }
    expect(bySession("senmon").filter((q) => requiredSelectionCount(q) === 2).map((q) => q.qNumber)).toEqual([2, 14, 24, 31, 32, 45]);
    expect(bySession("kyotsu").filter((q) => requiredSelectionCount(q) === 2)).toHaveLength(13);
    const q2 = bySession("senmon")[1]!;
    expect(isCompleteSelectionCorrect(q2.answer, ["ア"])).toBe(false);
    expect(isCompleteSelectionCorrect(q2.answer, ["ア", "ウ"])).toBe(true);
  });

  it("全問に5肢の独自解説・出典・出題時点の注意書きを持ち、URLが一意に解決する", () => {
    for (const session of SESSIONS) {
      const final = readJson<Final>(`explanations/${session}-final.json`);
      for (const q of bySession(session)) {
        const expl = final.explanations[String(q.qNumber)]!;
        expect(Object.keys(q.choiceExplanations ?? {}), q.id).toEqual([...KEYS]);
        expect(Object.values(q.choiceExplanations ?? {}), q.id).toEqual(expl.choiceExplanations);
        expect(expl.choiceExplanations.every((reason) => reason.trim().length >= 25), q.id).toBe(true);
        expect(q.explanation.startsWith(expl.summary), q.id).toBe(true);
        expect(q.explanation.includes("※出題時点（令和7年2月）の制度に基づく解説です。"), q.id).toBe(expl.lawSensitive);
        expect(q.sourceAttribution, q.id).toBe(
          `出典：公益財団法人社会福祉振興・試験センター 第27回（令和6年度）精神保健福祉士国家試験 ${session === "senmon" ? "専門科目" : "共通科目"} 問題${q.qNumber}。${SSSC_INDEPENDENCE_NOTICE}`,
        );
        expect(q.lastUpdated, q.id).toBe("2026-09-29");
        const [, , exam, yearSeason, section, qnum] = questionPagePath(q).split("/");
        expect(findQuestionByRoute(ALL_SEISHIN_QUESTIONS, { exam: exam!, yearSeason: yearSeason!, section: section!, qnum: qnum! })?.id).toBe(q.id);
        // 社会福祉士第37回は未公開なので、第27回の共通科目は精神保健福祉士側が正規URL。
        expect(getQuestionCanonicalRepresentative(ALL_QUESTIONS, q).id, q.id).toBe(q.id);
      }
    }
  });

  it("解説は claude-opus-5-5 の起稿と、一次資料照合つきの独立査読で最新判定 PASS のものだけ", () => {
    for (const session of SESSIONS) {
      const final = readJson<Final>(`explanations/${session}-final.json`);
      expect(final.held).toEqual({});
      const published = bySession(session).map((q) => q.qNumber);
      expect(Object.keys(final.explanations).map(Number)).toEqual(published);
      for (const entry of final.reviewLog) {
        const history = entry.history;
        expect(history[0], `${session} ${entry.number}`).toEqual(["draft", "PASS"]);
        expect(history.at(-1)?.[1], `${session} ${entry.number}`).toBe("PASS");
        // 全問が通常査読と主張単位の厳格照合（rereview1）を受けている。
        expect(history.map(([round]) => round).slice(1, 3), `${session} ${entry.number}`).toEqual(["review", "rereview1"]);
      }
      const dir = path.join(report, "explanations", session);
      const reviewed = new Set<number>();
      for (const file of readdirSync(dir).filter((f) => f.endsWith(".receipt.json"))) {
        const receipt = JSON.parse(readFileSync(path.join(dir, file), "utf8")) as {
          exitCode: number; isError: boolean; tools: string[]; statuses: [number, string][];
          modelUsage: Record<string, { canonicalModel: string; provider: string }>;
        };
        expect(receipt.exitCode, file).toBe(0);
        expect(receipt.isError, file).toBe(false);
        expect(receipt.modelUsage["claude-opus-5-5"], file).toMatchObject({ canonicalModel: "claude-opus-5-5", provider: "firstParty" });
        // 判定は claude-opus-5-5。査読で使う WebFetch はページ抽出に claude-haiku を内部で使う。
        expect(Object.keys(receipt.modelUsage).every((model) => model === "claude-opus-5-5" || model.startsWith("claude-haiku-")), file).toBe(true);
        if (file.includes(".draft.")) {
          expect(receipt.tools, file).toEqual([]);
          expect(receipt.statuses.every(([, status]) => status === "PASS"), file).toBe(true);
        } else {
          expect(receipt.tools, file).toEqual(["WebFetch", "WebSearch"]);
          receipt.statuses.forEach(([n]) => reviewed.add(n));
        }
      }
      expect([...reviewed].sort((a, b) => a - b), session).toEqual(published);
    }
  });
});
