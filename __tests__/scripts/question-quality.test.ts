import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import type { Question } from "@/lib/questions/types";
import { applyQualityExceptions, checkAnswerNotations, checkQuestionQuality, isPlaceholder, publicImageExists } from "../../scripts/lib/question-quality";
import { indexArchiveEvidence, type ArchivePaperEvidence } from "../../scripts/lib/question-archive-evidence";
import { checkQuestionSources, questionSourceRegistrations } from "../../scripts/lib/question-quality-sources";

const question: Question = {
  id: "ap-2025-spring-am-q01", exam: "ap", year: 2025, season: "spring", session: "am", qNumber: 1,
  type: "multiple-choice", category: "基礎理論", topicTags: [], difficulty: 2,
  question: "袋の中に赤玉が二つ、白玉が三つある。赤玉を一つ取る確率はどれか。",
  choices: { ア: "2/5", イ: "3/5" }, answer: "ア",
  explanation: "五つの玉のうち該当する二つを数えると、確率は五分の二です。",
  choiceExplanations: { ア: "五つの玉のうち赤玉は二つなので、五分の二です。", イ: "五分の三は白玉を一つ取る場合の確率です。" },
  hasImage: false, sourcePdfUrl: "https://www.ipa.go.jp/example.pdf", license: "IPA-public",
};

const rules = (overrides: Partial<Question> = {}, imageExists = (_url: string) => false) =>
  checkQuestionQuality({ ...question, ...overrides }, imageExists).map(issue => issue.rule);

describe("公開問題の品質ゲート", () => {
  it.each(["", " \u3000", "選択肢1", "選択肢９", "原本の選択肢", "原本の選択肢 (4)", "（原本参照）", "画像参照", "ア. 画像参照"])(
    "本文と選択肢の仮表記 %j を検出する",
    (placeholder) => {
      expect(rules({ question: placeholder, choices: { ア: placeholder, イ: "3/5" } })).toEqual(["placeholder", "placeholder"]);
    },
  );

  it.each(["1", "（1）", "A", "(A)", ".", "画像参照用のインデックス", "問1の条件を使う。"])("実際の文言 %j を許容する", (text) => {
    expect(isPlaceholder(text)).toBe(false);
  });

  it("本文画像・肢画像は対応するファイルが存在するときに文字の代わりに使える", () => {
    const existing = (url: string) => url === "/images/original.png";
    const imageQuestion = { question: "画像参照", choices: { ア: "", イ: "選択肢2" }, hasImage: true, imageUrls: ["/images/original.png"] };
    expect(rules(imageQuestion, existing)).toEqual([]);
    expect(rules(imageQuestion)).toEqual(["placeholder", "placeholder", "placeholder"]);
    expect(rules({ ...imageQuestion, hasImage: false }, existing)).toEqual(["placeholder", "placeholder", "placeholder"]);
    expect(rules({ ...imageQuestion, imageUrls: ["/images/missing.png"], choiceImageUrls: { ア: "/images/original.png" } }, existing))
      .toEqual(["placeholder", "placeholder"]);
  });

  it("肢別解説のない問題と一部の肢が空欄の問題を検出する", () => {
    expect(rules({ choiceExplanations: undefined })).toEqual(["choice-missing"]);
    expect(rules({ choiceExplanations: { ...question.choiceExplanations, イ: "　" } })).toEqual(["choice-missing"]);
    expect(rules({ type: "descriptive", choices: undefined, choiceExplanations: undefined })).toEqual([]);
  });

  it("15字未満の解説および空白と全半角だけが異なる同一文を検出する", () => {
    expect(rules({ choiceExplanations: { ...question.choiceExplanations, イ: "一二三四五六七八九十一二三四" } })).toEqual(["choice-short"]);
    expect(rules({ choiceExplanations: { ...question.choiceExplanations, イ: "一二三四五六七八九十一二三四五" } })).toEqual([]);
    expect(rules({ choiceExplanations: { ア: "赤玉は２個なので、五分の二です。", イ: "赤玉は2個なので、 五分の二です。" } })).toEqual(["choice-identical"]);
  });

  it("定型句だけを検出し、具体的な根拠を加えた文は許容する", () => {
    const text = "設問の条件に合う公式正答です。";
    expect(rules({ explanation: "原本の選択肢1は公式正答の「4」と照合する。", choiceExplanations: { ...question.choiceExplanations, ア: text } }))
      .toEqual(["choice-template", "choice-template"]);
    expect(rules({ explanation: "公式正答と照合。設問の条件に合う公式正答です。" })).toEqual(["choice-template"]);
    expect(rules({ choiceExplanations: { ...question.choiceExplanations, ア: `${text}${question.explanation}` } })).toEqual([]);
  });

  it("試験コードごとに択一の正答体系を比較し、数値入力と公式の原表記を集計から外す", () => {
    const issues = checkAnswerNotations([
      question, { ...question, id: "letters", answer: "Ａ" }, { ...question, id: "digits", answer: "２" },
      { ...question, id: "mixed", answer: ["ア", "B"] as Question["answer"] },
      { ...question, id: "numeric", type: "numeric", answer: "2" },
      { ...question, id: "original", officialAnswerNumber: "A" },
      { ...question, id: "different-exam", exam: "fe", answer: "C" },
    ]);
    expect(issues.map(issue => [issue.rule, issue.id])).toEqual([
      ["answer-notation", "letters"], ["answer-notation", "digits"], ["answer-notation", "mixed"],
    ]);
  });

  it("複数正答は選択数を明示し、正答のうち一肢を選ぶ指定も扱う", () => {
    expect(rules({ answer: ["ア", "イ"] })).toEqual(["selection-count"]);
    expect(rules({ answer: ["ア", "イ"], requiredSelections: 1 })).toEqual([]);
    expect(rules({ answer: ["ア", "イ"], requiredSelections: 2 })).toEqual([]);
    expect(rules({ answer: ["ア", "イ"], requiredSelections: 3 })).toEqual(["selection-count"]);
    expect(rules({ answer: ["ア", "イ"], type: "ordering" })).toEqual([]);
  });

  it.each([
    ["https://web.archive.org/web/20250101/https://example.org/paper.pdf", "archived-source"],
    ["https://www.nichimu.or.jp/vc-files/kshiken/pdf/siken/4/paper.pdf#page=4", "rolling-source"],
    ["https://nichimu.or.jp/kshiken/siken/3/paper.pdf", "rolling-source"],
  ])("%s を可変の問題出典として検出する", (sourcePdfUrl, expected) => {
    expect(rules({ sourcePdfUrl })).toEqual([expected]);
  });

  it("固定した試験年月のPDFやクエリに保存サイト名がある別ホストを許容する", () => {
    expect(rules({ sourcePdfUrl: "https://www.kakomon-ai.jp/exam-library/nichimu/amateur1/2026-05/amateur.pdf" })).toEqual([]);
    expect(rules({ sourcePdfUrl: "https://example.org/?name=web.archive.org" })).toEqual([]);
    expect(rules({ sourceAnswerUrl: "https://web.archive.org/answer.pdf" })).toEqual(["archived-source"]);
  });

  it("許可リストが一致するID・ルール・値に限って例外を認める", () => {
    const [first] = checkQuestionQuality({ ...question, question: "画像参照" }, () => false);
    const [changedText] = checkQuestionQuality({ ...question, question: "原本参照" }, () => false);
    const newId = { ...first, id: "new" };
    const differentRule = { ...first, rule: "choice-short" as const };
    expect(applyQualityExceptions([first, changedText, newId, differentRule], {
      placeholder: { reason: "既存の表示を保管する", entries: { [first.id]: [first.fingerprint] } },
    })).toEqual({ failures: [changedText, newId, differentRule], excepted: 1 });
  });
});


describe("公式PDFの保存版", () => {
  const original = "https://www.nichimu.or.jp/vc-files/kshiken/pdf/siken/4/paper.pdf";
  const answer = original.replace(".pdf", "-kaito.pdf");
  const capture = (url: string, time = "20250102030405") => `https://web.archive.org/web/${time}/${url}`;
  const archived = {
    ...question, id: "amateur1-2025", exam: "amateur1" as const,
    sourcePdfUrl: `${original}#page=2`, sourceArchiveUrl: `${capture(original)}#page=2`,
    sourceAnswerUrl: answer, sourceAnswerArchiveUrl: capture(answer),
    sourceAttribution: "日本無線協会",
  };
  const sha256 = "f".repeat(64);
  const paper: ArchivePaperEvidence = {
    exam: "amateur1", year: 2025, season: "spring", session: "am", edition: "2025年春・試験記号X",
    question: { originalUrl: original, archiveUrl: capture(original), sha256 },
    answer: { originalUrl: answer, archiveUrl: capture(answer), sha256 },
    questions: [{ id: archived.id, number: 1, label: "A-1", answer: "ア" }],
  };
  const check = (q: Question = archived, papers = [paper]) =>
    checkQuestionQuality(q, () => false, indexArchiveEvidence(papers)).map(issue => issue.rule);

  it("日時固定の問題・正答と、出典台帳の試験回・問題番号・正答が一致すれば通す", () => {
    expect(check()).toEqual([]);
  });

  it("台帳がない問題・回違い・正答違い・ハッシュ欠損を拒否する", () => {
    expect(check(archived, [])).toEqual(["rolling-source"]);
    expect(check({ ...archived, year: 2024 })).toEqual(["rolling-source"]);
    expect(check({ ...archived, answer: "イ" })).toEqual(["rolling-source"]);
    expect(check({ ...archived, qNumber: 2 })).toEqual(["rolling-source"]);
    expect(check(archived, [{ ...paper, answer: { ...paper.answer, sha256: "" } }])).toEqual(["rolling-source"]);
  });

  it.each([
    ["https://nichimu.or.jp.example.test/paper.pdf", "20250102030405"],
    ["https://www.nichimu.or.jp@other.example/paper.pdf", "20250102030405"],
    ["https://www.jafp.or.jp/paper.pdf", "20250102030405"],
    [original, "20250102"],
    [original, "20250230030405"],
    [original, "20250102030405id_"],
  ])("台帳にも同じ値がある非公式または日時不正の保存版を拒否する (%s %s)", (url, time) => {
    const q = { ...archived, sourcePdfUrl: url, sourceArchiveUrl: capture(url, time) };
    const p = { ...paper, question: { originalUrl: url, archiveUrl: capture(url, time), sha256 } };
    expect(check(q, [p])).toEqual([url === original ? "rolling-source" : "archived-source"]);
  });

  it("出典台帳の登録済み問題から保存版URLが欠落した場合を拒否する", () => {
    const url = "https://www.nichimu.or.jp/papers/2025-01.pdf";
    const q = { ...archived, sourcePdfUrl: url, sourceArchiveUrl: undefined, sourceAnswerArchiveUrl: undefined };
    expect(check(q, [{ ...paper, question: { originalUrl: url, archiveUrl: capture(url), sha256 } }]))
      .toEqual(["archived-source"]);
  });

  it("正答の保存版と元URLが異なる場合や、差し替え式の正答に保存版がない場合を拒否する", () => {
    const url = capture(original);
    expect(check({ ...archived, sourceAnswerArchiveUrl: url }, [{ ...paper, answer: { ...paper.answer, archiveUrl: url } }]))
      .toEqual(["rolling-source"]);
    expect(check({ ...archived, sourceAnswerArchiveUrl: undefined }, [{ ...paper, answer: { originalUrl: answer, sha256 } }]))
      .toEqual(["rolling-source"]);
  });

  it("同じ公式団体の回別固定の現行正答PDFを通す", () => {
    const url = "https://www.nichimu.or.jp/papers/2025-01-answer.pdf";
    expect(check({ ...archived, sourceAnswerUrl: url, sourceAnswerArchiveUrl: undefined }, [
      { ...paper, answer: { originalUrl: url, sha256 } },
    ])).toEqual([]);
  });

  it.each([
    [capture(answer), "archived-source"],
    [answer, "rolling-source"],
  ])("問題が現行の固定URLでも、未照合の正答URLを拒否する (%s)", (url, rule) => {
    expect(rules({ sourceAnswerUrl: url })).toEqual([rule]);
  });

  it("公害防止管理者の元URLは確認済みの配信ホストに限る", () => {
    const url = "https://jemai.or.jp/paper.pdf";
    const exam = "kogai-12";
    const doc = { originalUrl: url, archiveUrl: capture(url), sha256 };
    const q = { ...archived, exam, sourcePdfUrl: url, sourceArchiveUrl: capture(url),
      sourceAnswerUrl: url, sourceAnswerArchiveUrl: capture(url) } as const;
    expect(check(q, [{ ...paper, exam, question: doc, answer: doc }])).toEqual(["archived-source"]);
  });

  it("奈良県実施分のホストを関西広域連合への移管後に流用しない", () => {
    const exam = "chori-nara";
    const url = "https://www.pref.nara.jp/secure/313671/R6cyori.pdf";
    const doc = { originalUrl: url, archiveUrl: capture(url), sha256 };
    const q = { ...archived, exam, sourcePdfUrl: url, sourceArchiveUrl: capture(url),
      sourceAnswerUrl: url, sourceAnswerArchiveUrl: capture(url) } as const;
    const p = { ...paper, exam, question: doc, answer: doc };
    expect(check({ ...q, year: 2024 }, [{ ...p, year: 2024 }])).toEqual([]);
    expect(check({ ...q, year: 2025 }, [{ ...p, year: 2025 }])).toEqual(["archived-source"]);
  });

  it("公式の保存版があっても仮の本文と定型句だけの解説を拒否する", () => {
    expect(check({ ...archived, question: "原本参照", explanation: "公式正答と照合。" }))
      .toEqual(["placeholder", "choice-template"]);
  });
});

describe("収録ファイルの検証", () => {
  let root: string;

  function write(file: string, contents = "[]") {
    const path = join(root, file);
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, contents);
  }

  beforeEach(() => { root = mkdtempSync(join(process.cwd(), ".question-quality-test-")); });
  afterEach(() => { rmSync(root, { recursive: true, force: true }); });

  it("ローカルの画像ファイルを解決し、欠落ファイル、ディレクトリ、外部参照を拒否する", () => {
    write("public/images/問題 1.png");
    write("public/images/description.txt");
    write("outside.png");
    const exists = publicImageExists(join(root, "public"));
    expect(exists("/images/%E5%95%8F%E9%A1%8C%201.png?v=1#figure")).toBe(true);
    for (const url of ["/images/missing.png", "/images", "/images/description.txt", "//example.org/image.png", "https://example.org/image.png", "/%2e%2e%2foutside.png"]) {
      expect(exists(url)).toBe(false);
    }
  });

  it("配信側のIDをJSONとTypeScriptの別ファイルで見つけ、未配信IDは除外する", () => {
    write("data/questions/current.json", JSON.stringify({ questions: [question, { ...question, id: "private" }] }));
    write("data/questions/old.ts", `export const records = ${JSON.stringify([question, { ...question, id: "private" }])};`);
    write("data/questions/reexport.ts", 'export { records } from "./old";');
    const issues = checkQuestionSources(root, new Set([question.id]), [], [], false);
    expect(issues).toMatchObject([{ rule: "duplicate-source", id: question.id, message: expect.stringContaining("current.json, data/questions/old.ts") }]);
  });

  it("公開入口の静的・遅延・再エクスポート・追加登録を辿り、孤立したファイル群を検出する", () => {
    write("app/[exam]/page.tsx", 'export { page } from "@/lib/entry";');
    write("lib/entry.ts", 'export const page = () => import("@/data/questions/barrel");');
    write("lib/questions/get-questions.ts", 'export type { Private } from "@/data/questions/orphan";');
    write("data/questions/index.ts", 'import "./base.json";');
    write("data/questions/barrel/index.ts", 'export { default } from "../lazy.json";');
    write("data/questions/base.json");
    write("data/questions/lazy.json");
    write("data/questions/additional-papers.json");
    write("data/questions/orphan.ts", 'import "./unused.json"; export type Private = string;');
    write("data/questions/unused.json");
    const issues = checkQuestionSources(root, new Set(), questionSourceRegistrations(root), ["data/questions/additional-papers.json"], true);
    expect(issues.map(issue => [issue.rule, issue.id])).toEqual([
      ["unregistered-file", "data/questions/orphan.ts"], ["unregistered-file", "data/questions/unused.json"],
    ]);
  });
});
