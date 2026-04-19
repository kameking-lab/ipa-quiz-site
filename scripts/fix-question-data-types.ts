/**
 * Bulk-fix type errors in question data files.
 * Run: pnpm tsx scripts/fix-question-data-types.ts
 *
 * Fixes applied:
 *   - explanation: non-string → placeholder string + needsReview: true
 *   - choices values: objects → flattened "key: value" strings + needsReview: true
 *   - hasImage: non-boolean → false
 *   - imageUrls: non-array or empty → removed
 *   - qNumber/question invalid type → question excluded (logged)
 */

import fs from "fs";
import path from "path";
import { pathToFileURL } from "url";

const ROOT = process.cwd();
const DATA_DIR = path.join(ROOT, "data", "questions");

function findTsFiles(dir: string): string[] {
  const result: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      result.push(...findTsFiles(full));
    } else if (
      entry.isFile() &&
      entry.name.endsWith(".ts") &&
      !entry.name.startsWith("index")
    ) {
      result.push(full);
    }
  }
  return result;
}

function flattenObject(obj: Record<string, unknown>): string {
  return Object.entries(obj)
    .map(([k, v]) => `${k}: ${v}`)
    .join("　");
}

interface FixResult {
  fixedExplanation: number;
  fixedChoices: number;
  fixedHasImage: number;
  fixedImageUrls: number;
  excluded: number;
}

async function fixFile(filePath: string): Promise<FixResult | null> {
  const text = fs.readFileSync(filePath, "utf-8");

  const exportMatch = text.match(/export const (\w+):\s*Question\[\]/);
  if (!exportMatch) return null;
  const exportName = exportMatch[1];

  // Extract header comment lines to preserve them
  const headerLines: string[] = [];
  for (const line of text.split("\n")) {
    if (line.startsWith("//")) {
      headerLines.push(line);
    } else if (line.trim() !== "") {
      break;
    }
  }

  // Dynamic import — tsx strips types so runtime data is accessible even with TS errors
  const fileUrl = pathToFileURL(filePath).href;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mod = await import(fileUrl) as Record<string, any[]>;
  const raw: unknown[] = mod[exportName];

  if (!Array.isArray(raw)) {
    console.warn(`  SKIP ${exportName}: not an array`);
    return null;
  }

  const result: FixResult = {
    fixedExplanation: 0,
    fixedChoices: 0,
    fixedHasImage: 0,
    fixedImageUrls: 0,
    excluded: 0,
  };

  const questions = (raw as Record<string, unknown>[]).filter((q) => {
    if (typeof q.qNumber !== "number") {
      console.log(`    excluded q.id=${q.id}: qNumber is ${typeof q.qNumber}`);
      result.excluded++;
      return false;
    }
    if (typeof q.question !== "string") {
      console.log(`    excluded q.id=${q.id}: question is ${typeof q.question}`);
      result.excluded++;
      return false;
    }
    return true;
  });

  let needsWrite = result.excluded > 0;

  for (const q of questions) {
    // Fix explanation
    if (typeof q.explanation !== "string") {
      q.explanation = `解説未作成です。正解は${String(q.answer)}です。AIコパイロットで詳しい解説を確認してください。`;
      q.needsReview = true;
      result.fixedExplanation++;
      needsWrite = true;
    }

    // Fix choices with object values
    if (q.choices !== undefined && typeof q.choices === "object" && q.choices !== null) {
      const choices = q.choices as Record<string, unknown>;
      let hasObjectVal = false;
      for (const val of Object.values(choices)) {
        if (typeof val === "object" && val !== null) {
          hasObjectVal = true;
          break;
        }
      }
      if (hasObjectVal) {
        const flat: Record<string, string> = {};
        for (const [key, val] of Object.entries(choices)) {
          if (typeof val === "object" && val !== null) {
            flat[key] = flattenObject(val as Record<string, unknown>);
          } else {
            flat[key] = String(val);
          }
        }
        q.choices = flat;
        q.needsReview = true;
        result.fixedChoices++;
        needsWrite = true;
      }
    }

    // Fix hasImage
    if (typeof q.hasImage !== "boolean") {
      q.hasImage = false;
      result.fixedHasImage++;
      needsWrite = true;
    }

    // Fix imageUrls
    if (q.imageUrls !== undefined) {
      if (!Array.isArray(q.imageUrls)) {
        delete q.imageUrls;
        result.fixedImageUrls++;
        needsWrite = true;
      } else {
        const filtered = (q.imageUrls as unknown[]).filter((u) => typeof u === "string");
        if (filtered.length !== (q.imageUrls as unknown[]).length) {
          result.fixedImageUrls++;
          needsWrite = true;
        }
        if (filtered.length === 0) {
          delete q.imageUrls;
        } else {
          q.imageUrls = filtered;
        }
      }
    }
  }

  if (!needsWrite) return result;

  // Regenerate file preserving header comments
  const header = headerLines.length > 0 ? headerLines.join("\n") + "\n" : "";
  const newContent =
    header +
    `import type { Question } from "@/lib/questions/types";\n\n` +
    `export const ${exportName}: Question[] = ${JSON.stringify(questions, null, 2)};\n`;

  fs.writeFileSync(filePath, newContent, "utf-8");
  return result;
}

async function main() {
  console.log("Scanning data/questions for type errors...\n");

  const files = findTsFiles(DATA_DIR);
  console.log(`Found ${files.length} question files\n`);

  let totalExplanation = 0;
  let totalChoices = 0;
  let totalHasImage = 0;
  let totalImageUrls = 0;
  let totalExcluded = 0;
  let filesFixed = 0;

  for (const file of files) {
    const rel = path.relative(ROOT, file);
    try {
      const r = await fixFile(file);
      if (r === null) continue;
      if (
        r.fixedExplanation > 0 ||
        r.fixedChoices > 0 ||
        r.fixedHasImage > 0 ||
        r.fixedImageUrls > 0 ||
        r.excluded > 0
      ) {
        console.log(
          `  ${rel}: explanation=${r.fixedExplanation} choices=${r.fixedChoices}` +
            ` hasImage=${r.fixedHasImage} imageUrls=${r.fixedImageUrls} excluded=${r.excluded}`
        );
        filesFixed++;
        totalExplanation += r.fixedExplanation;
        totalChoices += r.fixedChoices;
        totalHasImage += r.fixedHasImage;
        totalImageUrls += r.fixedImageUrls;
        totalExcluded += r.excluded;
      }
    } catch (err) {
      console.error(`  ERROR ${rel}:`, err);
    }
  }

  console.log(
    `\nDone: ${filesFixed} files patched` +
      ` | explanation=${totalExplanation} choices=${totalChoices}` +
      ` hasImage=${totalHasImage} imageUrls=${totalImageUrls} excluded=${totalExcluded}`
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
