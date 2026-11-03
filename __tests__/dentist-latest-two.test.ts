import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

import { SHIKA_ISHI_QUESTIONS } from "@/data/questions/shika-ishi";
import type { Question } from "@/lib/questions/types";

const repo = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const directory = path.join(repo, "data/questions/shika-ishi");
const readJson = <T>(name: string): T =>
  JSON.parse(readFileSync(path.join(directory, name), "utf8")) as T;

type AuditRow = {
  id: string;
  sourceId: string;
  edition: number;
  year: number;
  paper: "a" | "b" | "c" | "d";
  number: number;
  status: "COMPLETE" | "OFFICIAL_EXCLUDED";
  officialAnswerCells: string[];
  sourcePdfUrl: string;
  sourceAnswerUrl: string;
  officialHandlingUrl?: string;
  payloadType?: Question["type"];
};
type Audit = { sourceCount: number; records: AuditRow[] };
type Asset = { url: string; alt: string; sha256: string; sourcePdf: string; sourcePage: number };
type AssetLedger = Record<string, Asset[]>;

const keys = Array.from("アイウエオカキクケコサシスセソ");
const toKey = (letter: string): string => {
  const index = letter.toUpperCase().charCodeAt(0) - 65;
  expect(index).toBeGreaterThanOrEqual(0);
  expect(index).toBeLessThan(keys.length);
  return keys[index]!;
};
const byId = (rows: Question[], id: string): Question => {
  const row = rows.find((question) => question.id === id);
  expect(row, id).toBeDefined();
  return row!;
};

describe("dentist latest two official corpus", () => {
  const payload = readJson<Question[]>("latest-two.json");
  const audit = readJson<Audit>("official-audit.json");
  const sourceAssets = readJson<AssetLedger>("source-assets.json");
  const ledger = new Map(audit.records.map((record) => [record.id, record]));

  it("accounts for 8 original papers of 90 questions and publishes only 696 scored items", () => {
    expect(audit.sourceCount).toBe(720);
    expect(audit.records).toHaveLength(720);
    expect(new Set(audit.records.map((record) => record.id)).size).toBe(720);
    expect(payload).toHaveLength(696);
    expect(SHIKA_ISHI_QUESTIONS.map((question) => question.id)).toEqual(payload.map((question) => question.id));
    expect(new Set(payload.map((question) => question.id)).size).toBe(696);

    for (const edition of [118, 119]) {
      const year = edition + 1907;
      for (const paper of ["a", "b", "c", "d"] as const) {
        const originals = audit.records.filter((record) => record.edition === edition && record.paper === paper);
        expect(originals, `${edition}${paper}`).toHaveLength(90);
        expect(originals.map((record) => record.number).sort((a, b) => a - b))
          .toEqual(Array.from({ length: 90 }, (_, index) => index + 1));
        expect(originals.every((record) => record.year === year && record.id === `shika-ishi-${year}-annual-mondai-${paper}-q${record.number}`)).toBe(true);
      }
    }
    expect(audit.records.filter((record) => record.status === "OFFICIAL_EXCLUDED")).toHaveLength(24);
    expect(audit.records.filter((record) => record.status === "COMPLETE")).toHaveLength(696);
    expect(payload.every((question) => ledger.get(question.id)?.status === "COMPLETE")).toBe(true);
    expect(audit.records.filter((record) => record.status === "OFFICIAL_EXCLUDED").every((record) =>
      !payload.some((question) => question.id === record.id) && record.officialAnswerCells.length === 0 && Boolean(record.officialHandlingUrl))).toBe(true);
    expect(payload.filter((question) => question.year === 2026)).toHaveLength(346);
    expect(payload.filter((question) => question.year === 2025)).toHaveLength(350);
  });

  it("keeps the official keys, distinct answer formats, and every choice explanation", () => {
    expect(payload.filter((question) => question.type === "multiple-choice")).toHaveLength(683);
    expect(payload.filter((question) => question.type === "ordering")).toHaveLength(8);
    expect(payload.filter((question) => question.type === "numeric")).toHaveLength(5);

    for (const question of payload) {
      const record = ledger.get(question.id)!;
      expect(record, question.id).toBeDefined();
      expect(question.exam).toBe("shika-ishi");
      expect(question.season).toBe("annual");
      expect(question.year).toBe(record.year);
      expect(question.session).toBe(`mondai-${record.paper}`);
      expect(question.qNumber).toBe(record.number);
      expect(question.examDate).toBe(`${record.year}-${record.paper === "a" || record.paper === "b" ? (record.year === 2026 ? "01-31" : "02-01") : (record.year === 2026 ? "02-01" : "02-02")}`);
      expect(question.officialAnswerNumber).toBe(record.officialAnswerCells.join(" / "));
      expect(question.sourcePdfUrl).toBe(record.sourcePdfUrl);
      expect(question.sourceAnswerUrl).toBe(record.sourceAnswerUrl);
      expect(question.sourcePdfUrl).toMatch(/^https:\/\/www\.mhlw\.go\.jp\//);
      expect(question.sourceAnswerUrl).toMatch(/^https:\/\/www\.mhlw\.go\.jp\//);
      expect(question.explanation.trim().length).toBeGreaterThanOrEqual(30);
      expect(question.needsReview).toBe(false);

      if (question.type === "numeric") {
        expect(question.choices).toBeUndefined();
        expect(question.choiceExplanations).toBeUndefined();
        continue;
      }
      const choiceKeys = Object.keys(question.choices ?? {});
      expect(choiceKeys.length, question.id).toBeGreaterThanOrEqual(2);
      expect(choiceKeys.sort()).toEqual(Object.keys(question.choiceExplanations ?? {}).sort());
      expect(Object.values(question.choiceExplanations ?? {}).every((reason) => Boolean(reason?.trim()))).toBe(true);
      expect(question.explanationCoverage).toBe("full");

      if (question.type === "ordering") {
        expect(question.answer).toEqual(Array.from(record.officialAnswerCells[0]!, toKey));
        expect(new Set(question.answer as string[]).size).toBe(choiceKeys.length);
      } else {
        const sets = record.officialAnswerCells.map((cell) => Array.from(cell).map(toKey).sort());
        const union = [...new Set(sets.flat())].sort();
        expect(question.requiredSelections).toBe(sets[0]!.length);
        expect(sets.every((set) => set.length === question.requiredSelections)).toBe(true);
        expect(question.answer).toEqual(union.length === 1 ? union[0] : union);
        for (const accepted of sets) expect(accepted.every((key) => choiceKeys.includes(key))).toBe(true);
      }
    }
    const alternative = byId(payload, "shika-ishi-2025-annual-mondai-c-q32");
    expect(ledger.get(alternative.id)?.officialAnswerCells).toHaveLength(4);
    expect(alternative.requiredSelections).toBe(3);
    expect(Array.isArray(alternative.answer) && alternative.answer.length).toBe(4);
  });

  it("retains paired case stems and exceptional ordering/numeric entries", () => {
    for (const [paper, first, second] of [["a", 50, 51], ["d", 82, 83]] as const) {
      const left = byId(payload, `shika-ishi-2025-annual-mondai-${paper}-q${first}`);
      const right = byId(payload, `shika-ishi-2025-annual-mondai-${paper}-q${second}`);
      const common = left.question.split("\n\n")[0];
      expect(common.length).toBeGreaterThan(100);
      expect(right.question.startsWith(`${common}\n\n`)).toBe(true);
      expect(common).toContain(`${first}、${second}`);
    }
    expect(byId(payload, "shika-ishi-2025-annual-mondai-a-q89").answer)
      .toEqual(Array.from("BECAD", toKey));
    const negative = byId(payload, "shika-ishi-2026-annual-mondai-c-q90");
    expect(negative.type).toBe("numeric");
    expect(negative.answer).toBe("2.0");
    expect(negative.numericAnswer).toMatchObject({ format: "decimal", precision: 1, fixedSign: "negative" });
    const risk = byId(payload, "shika-ishi-2025-annual-mondai-a-q90");
    expect(risk.answer).toBe("9.0");
    expect(risk.officialAnswerNumber).toBe("90");
    expect(risk.numericAnswer).toMatchObject({ format: "decimal", precision: 1 });
    expect(byId(payload, "shika-ishi-2026-annual-mondai-d-q88").choices && Object.keys(byId(payload, "shika-ishi-2026-annual-mondai-d-q88").choices!)).toHaveLength(8);
    expect(byId(payload, "shika-ishi-2025-annual-mondai-b-q89").choices && Object.keys(byId(payload, "shika-ishi-2025-annual-mondai-b-q89").choices!)).toHaveLength(7);
  });

  it("matches the original image ledger and verifies each public asset digest", () => {
    const publicAssetUrls = new Set<string>();
    for (const [id, assets] of Object.entries(sourceAssets)) {
      const question = byId(payload, id);
      expect(question.imageUrls).toEqual(assets.map((asset) => asset.url));
      expect(question.imageAltTexts).toEqual(assets.map((asset) => asset.alt));
      expect(question.hasImage).toBe(true);
      for (const asset of assets) {
        expect(asset.sourcePdf).toMatch(/\.pdf$/);
        expect(asset.sourcePage).toBeGreaterThan(0);
        expect(asset.sha256).toMatch(/^[a-f0-9]{64}$/);
        expect(asset.url).toMatch(/^\/questions\/shika-ishi\/[a-z0-9-]+\.webp$/);
        if (publicAssetUrls.has(asset.url)) continue;
        publicAssetUrls.add(asset.url);
        const file = path.join(repo, "public", asset.url.slice(1));
        expect(existsSync(file), file).toBe(true);
        const digest = createHash("sha256").update(readFileSync(file)).digest("hex");
        expect(digest, asset.url).toBe(asset.sha256);
      }
    }
    expect(publicAssetUrls.size).toBeGreaterThan(400);
    for (const question of payload) {
      if (!sourceAssets[question.id]) expect(question.hasImage).toBe(false);
    }
    const q37 = sourceAssets["shika-ishi-2025-annual-mondai-a-q37"];
    const q45 = sourceAssets["shika-ishi-2025-annual-mondai-a-q45"];
    expect(q37?.map((asset) => asset.sourcePage)).toEqual([22, 23, 24]);
    expect(q37?.every((asset) => !asset.url.includes("p026"))).toBe(true);
    expect(q45?.map((asset) => asset.sourcePage)).toEqual([26, 27]);
    expect(q45?.every((asset) => asset.sourcePdf.includes("118-problem-tp250428-02a_02.pdf"))).toBe(true);
  });
});
