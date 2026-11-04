import { createHash } from "node:crypto";
import { execFileSync, spawnSync } from "node:child_process";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { KYUSUI_STAGED_QUESTIONS as questions, scoreKyusuiStagedQuestion } from "@/data/qualification-staging/kyusui";
import manifest from "@/data/qualification-staging/kyusui/source-manifest.json";
import { QUALIFICATION_CATALOG } from "@/lib/qualifications/catalog";
import { ALL_QUESTIONS } from "@/data/questions";
import { getHomeDirectory } from "@/lib/home/home-directory";

// Independently transcribed from the official answer sheets; null is NOT choice 4.
const expectedAnswers: Record<number, readonly (number | null)[]> = {
  2026: [3,2,1,1,3,1,2,1,5,4,1,4,1,4,3,2,5,4,3,1,2,3,5,2,1,4,1,4,2,5,4,3,5,4,3,2,3,2,3,4,3,2,1,1,5,3,2,4,3,3,1,5,4,3,1,4,2,4,4,2],
  2025: [4,2,3,4,4,3,1,4,5,5,2,2,5,1,2,3,1,null,2,2,4,3,1,1,2,4,4,1,2,3,3,1,3,1,2,5,3,3,4,4,1,2,1,2,1,3,5,3,2,3,4,1,3,2,4,4,5,5,3,4],
};
const hash = (path: string) => createHash("sha256").update(readFileSync(join(process.cwd(), path))).digest("hex");
// Poppler is an optional editorial audit dependency, not an application dependency.
const hasPoppler = spawnSync("pdftotext", ["-v"]).status === 0;

describe("kyusui private staging, latest two officially published editions", () => {
  it.each([2026, 2025])("stores all 60 originals and every official final answer for %i", year => {
    const edition = questions.filter(q => q.year === year);
    expect(edition).toHaveLength(60);
    expect(edition.map(q => q.qNumber)).toEqual(Array.from({ length: 60 }, (_, i) => i + 1));
    expect(edition.map(q => q.scoring.correctChoice)).toEqual(expectedAnswers[year]);
    expect(edition.filter(q => q.session === "gakka1")).toHaveLength(40);
    expect(edition.filter(q => q.session === "gakka2")).toHaveLength(20);
    expect(edition.filter(q => q.category === "給水装置の概要").map(q => q.qNumber)).toEqual([41,42,43,44,45,46,47,48,49,50,51]);
    for (const q of edition) {
      expect(q.question.trim().length).toBeGreaterThan(15);
      expect(q.choices.every(c => c.trim().length > 0)).toBe(true);
      expect(q.sourcePdfUrl).toContain(`file-r0${year - 2018}_gakka-0${q.qNumber <= 40 ? 1 : 2}.pdf`);
      expect(q.sourceAnswerUrl).toContain(`file-r0${year - 2018}_seitou-num.pdf`);
      expect(q.sourceAttribution).toContain(`問${q.qNumber}`);
      expect(q.explanationCoverage).toBe("all-choices");
      expect(q.choiceExplanations).toHaveLength(q.choices.length);
      for (const explanation of q.choiceExplanations) {
        expect(explanation.trim().length).toBeGreaterThanOrEqual(20);
        expect(explanation).not.toMatch(/^公式正答番号は[1-5]。法令・基準は/);
      }
      expect(q.explanationSourceUrls.length).toBeGreaterThan(0);
      for (const url of q.explanationSourceUrls) expect(new URL(url).protocol).toBe("https:");
      if (q.scoring.kind === "single-choice") {
        for (let choice = 1; choice <= q.choices.length; choice++) {
          expect(scoreKyusuiStagedQuestion(q, choice)).toBe(choice === expectedAnswers[year][q.qNumber - 1]);
        }
        expect(scoreKyusuiStagedQuestion(q, null)).toBe(false);
      }
    }
  });

  it.skipIf(!hasPoppler)("matches independent Poppler extraction of the saved official answer PDFs", () => {
    for (const year of [2026, 2025]) {
      const path = `data/qualification-staging/kyusui/sources/file-r0${year - 2018}_seitou-num.pdf`;
      const text = execFileSync("pdftotext", ["-f", "1", "-l", "1", "-layout", path, "-"], { encoding: "utf8" });
      const cells = new Map([...text.matchAll(/(?<!\d)(\d{1,2})\s*（([1-5])）/g)].map(m => [Number(m[1]), Number(m[2])]));
      expect(cells.size).toBe(year === 2025 ? 59 : 60);
      for (const q of questions.filter(q => q.year === year)) {
        expect(cells.get(q.qNumber) ?? null).toBe(q.scoring.correctChoice);
      }
      if (year === 2025) {
        const correction = execFileSync("pdftotext", ["-f", "2", "-l", "2", "-layout", path, "-"], { encoding: "utf8" });
        expect(correction).toContain("正答肢なし");
        expect(correction).toContain("受験者全員");
      }
    }
  });

  it("keeps Q18's full original and official all-correct treatment, including no answer", () => {
    const q = questions.find(q => q.year === 2025 && q.qNumber === 18)!;
    expect(q.scoring.kind).toBe("all-correct");
    expect(q.scoring.correctChoice).toBeNull();
    expect(q.choices).toHaveLength(5);
    expect(q.choices[3]).toContain("年度");
    for (const choice of [null, 1, 2, 3, 4, 5]) expect(scoreKyusuiStagedQuestion(q, choice)).toBe(true);
    expect(questions.filter(q => q.scoring.kind === "all-correct")).toHaveLength(1);
  });

  it("retains every source document and image with hashes and PDF-region provenance", () => {
    expect(manifest.documents).toHaveLength(9);
    expect(manifest.assets).toHaveLength(126);
    expect(new Set(questions.map(q => q.id)).size).toBe(120);
    const used = questions.flatMap(q => [...q.sourceImages]);
    expect(new Set(used).size).toBe(126);
    expect([...used].sort()).toEqual(manifest.assets.map(a => a.path).sort());
    for (const doc of manifest.documents) expect(hash(doc.path)).toBe(doc.sha256);
    for (const asset of manifest.assets) {
      expect(asset.path).toMatch(/^data\/qualification-staging\/kyusui\/assets\//);
      expect(hash(asset.path)).toBe(asset.sha256);
      expect(asset.pdfPage).toBeGreaterThan(0);
      expect(asset.clipRectPoints[3]).toBeGreaterThan(asset.clipRectPoints[1]);
      expect(manifest.documents.find(d => d.url === asset.pdfUrl)?.sha256).toBe(asset.pdfSha256);
      expect(readFileSync(asset.path).subarray(0, 8).toString("hex")).toBe("89504e470d0a1a0a");
    }
    const pdfHashes = manifest.documents.filter(d => d.url.endsWith(".pdf")).map(d => d.sha256).sort();
    expect(pdfHashes).toEqual([
      "1694eeadcdc008ec997f026d5b611e8af1d68dbd96dbfbb76eb00f73d39f1421",
      "7a36fcca01456e2378a451e6273515d314cc0183cc44bd66e628d39727ae4ac5",
      "f5a0a5fe3d522278ceba843e35146fd1384525fa9bb871b072d91c6c915cac62",
      "a288de23dff69389e9bec0a7645e4eafb30d3d6d92c72f359cfc71e3ed9b4371",
      "6c776068efe70d9e5fa9497901d9fd6cb62468b5ab95489d01cca770a9560a01",
      "d6d5403eb23e2d803327dd9b9c8f70f7d5c9702ebd7812c85d5ee46279b5b8fb",
    ].sort());
  });

  it.skipIf(!hasPoppler)("covers every body word in all four papers using independent Poppler coordinates", () => {
    let checkedWords = 0;
    for (const doc of manifest.documents.filter(d => d.url.includes("gakka-"))) {
      // CropBox is essential: these PDFs have printer margins outside the visible page.
      const xml = execFileSync("pdftotext", ["-q", "-cropbox", "-bbox-layout", doc.path, "-"], { encoding: "utf8" });
      const pages = [...xml.matchAll(/<page\b[^>]*>([\s\S]*?)<\/page>/g)];
      const firstPage = doc.url.includes("file-r07") ? 4 : 3;
      for (const [index, page] of pages.entries()) {
        if (index + 1 < firstPage) continue;
        const regions = manifest.assets.filter(a => a.pdfUrl === doc.url && a.pdfPage === index + 1);
        for (const word of page[1].matchAll(/<word xMin="([\d.]+)" yMin="([\d.]+)" xMax="([\d.]+)" yMax="([\d.]+)"[^>]*>([\s\S]*?)<\/word>/g)) {
          const x = (Number(word[1]) + Number(word[3])) / 2;
          const y = (Number(word[2]) + Number(word[4])) / 2;
          // Exclude subject headers and page footers, retaining rubric/diagram text.
          if (y < 100 || y > 765) continue;
          checkedWords++;
          expect(regions.some(({ clipRectPoints: r }) => r[0] - 1 <= x && x <= r[2] + 1 && r[1] - 1 <= y && y <= r[3] + 1), `${doc.path} p${index + 1}: ${word[5]}`).toBe(true);
        }
      }
    }
    expect(checkedWords).toBeGreaterThan(5000);
  });

  it("keeps continuation figures, numeric options, diagram alternatives and worksheets", () => {
    for (const [year, number, pages] of [[2025,33,3], [2026,33,2], [2026,34,2], [2026,35,3]]) {
      expect(questions.find(q => q.year === year && q.qNumber === number)?.sourceImages).toHaveLength(pages);
    }
    const diagram = questions.find(q => q.year === 2025 && q.qNumber === 34)!;
    expect(diagram.choiceRepresentation).toBe("diagram-labels");
    expect(diagram.choices).toHaveLength(5);
    const hydraulic = questions.find(q => q.year === 2026 && q.qNumber === 34)!;
    expect(hydraulic.choices[4]).toMatch(/^19\s*ｍ$/);
    expect(hydraulic.postOptionContent).toContain("図－4");
    const worksheet = questions.find(q => q.year === 2026 && q.qNumber === 35)!;
    expect(worksheet.postOptionContent).toContain("【算出手順】");
    expect(worksheet.choices[3]).not.toContain("算出手順");
  });

  it("keeps ruby in originals without attaching a following choice's reading to the previous choice", () => {
    for (const [year, number, index, ruby] of [[2026, 1, 2, "オー"], [2026, 49, 1, "ら せん"], [2025, 1, 1, "オー"]] as const) {
      const q = questions.find(q => q.year === year && q.qNumber === number)!;
      expect(q.originalText).toContain(ruby);
      expect(q.choices[index]).not.toContain(ruby);
    }
    expect(questions.every(q => !/^問題\s*\d/.test(q.question))).toBe(true);
  });

  it("preserves all extracted body content across stems, alternatives and supporting material", () => {
    const ruby = new Set(["おごせ", "オー", "でいねいち", "らせん", "あんきょ", "ごえん", "ぼうせいざい", "ろうえい"]);
    const compact = (text: string) => text.replace(/\s+/g, "");
    for (const q of questions.filter(q => q.choiceRepresentation === "text")) {
      const original = q.originalText.split("\n").filter(line => !ruby.has(compact(line))).join("\n").trim()
        .replace(/^問題\s*\d+\s*/, "").replace(/[⑴⑵⑶⑷⑸]/g, "");
      expect(compact(q.question + q.choices.join("") + q.postOptionContent), q.id).toBe(compact(original));
    }
  });

  it("batch1公開後: replaces permission-pending with staging and stays outside all public question pools and navigation", () => {
    const entry = QUALIFICATION_CATALOG.find(q => q.slug === "kyusui")!;
    expect(entry.status).toBe("live");

    expect(entry.examCode).toBeDefined();

    expect(ALL_QUESTIONS.some(q => q.id.startsWith("kyusui-"))).toBe(true);
    const cards = getHomeDirectory().flatMap(d => [...d.featured, ...d.compact]);
    expect(cards.some(c => c.href.includes("kyusui"))).toBe(true);
    expect(readFileSync("data/exam-library/official-catalog.json", "utf8")).not.toContain("kyuukou.or.jp");
    expect(existsSync("public/questions/kyusui")).toBe(false);
    expect(existsSync("app/kyusui")).toBe(false);
    expect(QUALIFICATION_CATALOG.filter(q => q.status === "live").some(q => q.slug === "kyusui")).toBe(true);
  });
});
