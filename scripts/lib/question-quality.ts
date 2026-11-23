import { createHash } from "node:crypto";
import { realpathSync, statSync } from "node:fs";
import { extname, isAbsolute, relative, resolve, sep } from "node:path";
import { CHOICE_KEYS } from "@/lib/questions/answers";
import type { ChoiceKey, Question } from "@/lib/questions/types";
import { isOfficialPdfCapture, sourceUrlRule, verifiedArchiveSource, type ArchiveEvidence } from "./question-archive-evidence";

export { sourceUrlRule } from "./question-archive-evidence";

export const QUALITY_REASONS = {
  placeholder: "QA後も原本の転記または表示用画像を確認できていない既存の本文・選択肢。",
  "choice-missing": "公開済みだが肢別解説の原稿が全肢分そろっていない。",
  "choice-short": "公開済みの短い肢別解説。根拠の追記は原本を確認して行う。",
  "choice-identical": "公開済みの肢別解説が同文。肢ごとの根拠は原本の確認待ち。",
  "choice-template": "QA後も残った定型の解説。原本と各肢の根拠を確認して差し替える。",
  "answer-notation": "公開済みの試験で正答ラベル体系が混在。既存の公式正答を保持する。",
  "selection-count": "公式の指定数または複数正答の採点方式が未確認。",
  "archived-source": "同じ回の現行公式原本を確認できていない既存のアーカイブ出典。",
  "rolling-source": "試験期別の固定資料を確認できていない既存の差し替え式出典。",
  "duplicate-source": "配信レジストリが1件を選ぶ既存の元データ・収録版。記載したファイルの組だけを保管する。",
  "unregistered-file": "公開経路の外に残る既存の原本・作業版・旧データ。記載したパスと内容を保管する。",
} as const;

export interface QualityIssue {
  rule: keyof typeof QUALITY_REASONS;
  id: string;
  message: string;
  fingerprint: string;
}

export type QualityExceptions = Partial<Record<QualityIssue["rule"], {
  reason: string;
  entries: Record<string, string[]>;
}>>;

export function applyQualityExceptions(issues: readonly QualityIssue[], exceptions: QualityExceptions) {
  const failures: QualityIssue[] = [];
  let excepted = 0;
  for (const issue of issues) {
    const exception = exceptions[issue.rule];
    if (exception?.reason.trim() && Object.hasOwn(exception.entries, issue.id) && exception.entries[issue.id].includes(issue.fingerprint)) {
      excepted++;
    } else {
      failures.push(issue);
    }
  }
  return { failures, excepted };
}

export function qualityIssue(rule: QualityIssue["rule"], id: string, message: string, evidence: unknown): QualityIssue {
  const fingerprint = createHash("sha256").update(JSON.stringify(evidence)).digest("hex").slice(0, 24);
  return { rule, id, message, fingerprint };
}

function normalize(text: string) {
  return text.normalize("NFKC").trim();
}

export function isPlaceholder(text: string): boolean {
  const normalized = normalize(text);
  const value = normalized.replace(/^(?:[\dA-Jア-コ]+[.、:]|\([\dA-Jア-コ]+\))\s*(?=\S)/iu, "").replace(/[\s()\[\]【】。．.]/g, "");
  return normalized === "" || /^(?:(?:原本|公式|問題画像|画像)(?:の|にある)?)?(?:選択肢|選択欄|解答群|解答欄)(?:[1-9]\d?|[A-Jア-コ])?$/iu.test(value)
    || /^(?:(?:公式)?原本|原文|原資料|公式(?:問題)?(?:の)?画像|(?:問題)?画像|図版|別紙)(?:の(?:問題)?画像)?(?:を|に)?(?:ご?(?:参照|確認)(?:してください|ください|のこと)?|ご覧ください)$/u.test(value)
    || /^問(?:題)?\d+$/u.test(value);
}

const TEMPLATE_SENTENCES = [
  /^(?:原本の)?(?:選択肢|肢)?[\dA-Jア-コ]*(?:は|を)?公式(?:の)?正答(?:表)?(?:の[\dA-Jア-コ「」・]+)?(?:と|で|により)照合(?:する|します|した|してください)?$/u,
  /^(?:(?:選択肢|肢)?[\dA-Jア-コ]+は)?設問の条件に合(?:う公式正答です|わない(?:ため)?(?:不正解です|誤りです))$/u,
  /^(?:(?:原本の)?(?:選択肢|肢)?[\dA-Jア-コ]+は)?公式(?:の)?正答(?:表)?(?:で(?:正答に)?指定されていません|に含まれません)$/u,
  /^(?:公式(?:の)?正答|正解)(?:は|:)[\dA-Jア-コ「」・、,]+(?:です)?$/u,
  /^設問の条件に合う肢を[、,]?(?:次の)?要点で判別(?:する|します|してください)$/u,
];

const IMAGE_EXTENSION = /^(?:\.(?:avif|bmp|gif|ico|jpe?g|png|svg|tiff?|webp))$/i;

function isTemplateOnly(text: string) {
  const sentences = normalize(text).replace(/\s+/g, "").split(/[。.!！]+/).filter(Boolean);
  return sentences.length > 0 && sentences.every(sentence => TEMPLATE_SENTENCES.some(pattern => pattern.test(sentence)));
}

export function publicImageExists(publicDirectory: string): (url: string) => boolean {
  const cache = new Map<string, boolean>();
  const root = resolve(publicDirectory);
  return (url) => {
    const cached = cache.get(url);
    if (cached !== undefined) return cached;
    let present = false;
    if (url.startsWith("/") && !url.startsWith("//")) {
      try {
        const pathname = decodeURIComponent(new URL(url, "https://question-assets.invalid").pathname);
        if (IMAGE_EXTENSION.test(extname(pathname))) {
          const file = realpathSync(resolve(root, `.${pathname}`));
          const fromPublic = relative(root, file);
          present = fromPublic !== ".." && !fromPublic.startsWith(`..${sep}`) && !isAbsolute(fromPublic) && statSync(file).isFile();
        }
      } catch {
        // Unavailable or invalid references cannot substitute for the text.
      }
    }
    cache.set(url, present);
    return present;
  };
}

export function hasQuestionImage(q: Question, imageExists: (url: string) => boolean): boolean {
  return q.hasImage && Boolean(q.imageUrls?.length && q.imageUrls.every(imageExists));
}

export function hasChoiceImage(q: Question, key: ChoiceKey, imageExists: (url: string) => boolean): boolean {
  const url = q.choiceImageUrls?.[key];
  return Boolean(url && imageExists(url)) || hasQuestionImage(q, imageExists);
}

export function checkQuestionQuality(
  q: Question, imageExists: (url: string) => boolean, archiveEvidence?: ArchiveEvidence,
): QualityIssue[] {
  const issues: QualityIssue[] = [];
  const add = (rule: QualityIssue["rule"], message: string, evidence: unknown) => issues.push(qualityIssue(rule, q.id, message, evidence));
  const choices = Object.entries(q.choices ?? {}) as [ChoiceKey, string][];
  if (isPlaceholder(q.question) && !hasQuestionImage(q, imageExists)) {
    add("placeholder", "問題文が空欄または仮の文字です", ["question", q.question, q.hasImage, q.imageUrls]);
  }
  for (const [key, choice] of choices) {
    if (isPlaceholder(choice) && !hasChoiceImage(q, key, imageExists)) {
      add("placeholder", `選択肢 ${key} が空欄または仮の文字です`, [key, choice, q.hasImage, q.imageUrls, q.choiceImageUrls?.[key]]);
    }
  }

  if (q.type === "multiple-choice" || q.type === "ordering") {
    const missing = choices.map(([key]) => key).filter(key => !q.choiceExplanations?.[key]?.trim());
    if (missing.length > 0 || !q.choiceExplanations || choices.length === 0) {
      add("choice-missing", `全肢の解説が必要です (${missing.join("、") || "肢別解説なし"})`, choices.filter(([key]) => missing.includes(key)));
    }
    const explained = choices.flatMap(([key]) => {
      const text = normalize(q.choiceExplanations?.[key] ?? "");
      return text ? [[key, text] as const] : [];
    });
    for (const [key, text] of explained) {
      if ([...text.replace(/\s/g, "")].length < 15) add("choice-short", `選択肢 ${key} の解説が15字未満です`, [key, text]);
      if (isTemplateOnly(text)) add("choice-template", `選択肢 ${key} の解説が定型句だけです`, [key, text]);
    }
    if (explained.length > 1 && explained.length === choices.length && new Set(explained.map(([, text]) => text.replace(/\s/g, ""))).size === 1) {
      add("choice-identical", "全肢の解説が同一文です", explained);
    }
  }

  const selections = q.requiredSelections;
  if (q.type === "multiple-choice" && Array.isArray(q.answer) && q.answer.length > 1 &&
    (selections === undefined || !Number.isInteger(selections) || selections < 1 || selections > new Set(q.answer).size)) {
    add("selection-count", "正答が複数ある問題では正答肢の数に合う requiredSelections が必要です", [q.answer, selections]);
  }

  if (isTemplateOnly(q.explanation)) add("choice-template", "全体の解説が定型句だけです", ["explanation", q.explanation]);
  const sourceRule = sourceUrlRule(q.sourcePdfUrl);
  if (archiveEvidence?.has(q.id) || q.sourceArchiveUrl !== undefined || q.sourceAnswerArchiveUrl !== undefined) {
    for (const url of q.officialReferenceUrls ?? []) {
      if (sourceUrlRule(url) === "archived-source" && !isOfficialPdfCapture(url, q.exam)) {
        add("archived-source", "補助資料の保存版には日時固定の公式PDFが必要です", ["officialReferenceUrls", url]);
      }
    }
    if (!verifiedArchiveSource(q, archiveEvidence)) {
      add(sourceRule === "rolling-source" ? sourceRule : "archived-source",
        "公式PDFの日時固定保存版と全問照合済みの正答を出典台帳で確認できません",
        [q.sourcePdfUrl, q.sourceArchiveUrl, q.sourceAnswerUrl, q.sourceAnswerArchiveUrl, q.answer]);
    }
  } else if (sourceRule) {
    add(sourceRule, `sourcePdfUrl には試験期を固定できる公式原本が必要です (${q.sourcePdfUrl})`, q.sourcePdfUrl);
  } else if (q.sourceAnswerUrl) {
    const answerRule = sourceUrlRule(q.sourceAnswerUrl);
    if (answerRule) add(answerRule, "公式正答の試験期と照合記録を確認できません", ["sourceAnswerUrl", q.sourceAnswerUrl]);
  }
  return issues;
}

function answerNotation(answer: string): string | undefined {
  const label = normalize(answer);
  if (CHOICE_KEYS.includes(label as ChoiceKey)) return "カナ";
  if (/^[A-Z]$/i.test(label)) return "英字";
  if (/^[1-9]\d?$/.test(label)) return "数字";
}

export function checkAnswerNotations(questions: Iterable<Question>): QualityIssue[] {
  const exams = new Map<string, { id: string; labels: string[]; notations: string[] }[]>();
  for (const q of questions) {
    if (q.type !== "multiple-choice" && q.type !== "ordering") continue;
    const labels = Array.isArray(q.answer) ? q.answer : [q.answer];
    const notations = [...new Set(labels.map(answerNotation).filter((value): value is string => Boolean(value)))];
    if (notations.length === 0) continue;
    const questionsInExam = exams.get(q.exam) ?? [];
    questionsInExam.push({ id: q.id, labels, notations });
    exams.set(q.exam, questionsInExam);
  }
  const issues: QualityIssue[] = [];
  for (const [exam, records] of exams) {
    const styles = new Set(records.flatMap(record => record.notations));
    if (styles.size < 2) continue;
    // The shared scoring and rendering code uses CHOICE_KEYS (kana).
    const expected = styles.has("カナ") ? "カナ" : "英字";
    for (const { id, labels, notations } of records) {
      if (notations.some(notation => notation !== expected)) {
        issues.push(qualityIssue("answer-notation", id, `${exam} の正答ラベル体系が混在しています (${[...styles].sort().join("、")})`, [exam, labels, expected]));
      }
    }
  }
  return issues;
}
