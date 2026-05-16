/**
 * 手書きの explanation を JSON マニフェスト経由で data/questions/ に一括適用する。
 *
 * 使い方:
 *   pnpm tsx scripts/apply-explanations-manual.ts logs/explanations-batch-XXX.json
 *
 * 入力 JSON 形式:
 *   {
 *     "batchName": "ap-2017-autumn-q1-q27",
 *     "updates": [
 *       { "id": "ap-2017a-am-q1", "explanation": "..." },
 *       ...
 *     ]
 *   }
 *
 * 動作:
 *   - data/questions/ 配下を再帰スキャンし、ID→filePath マップを構築
 *   - 各 update に対し、該当 question ブロックの "explanation" のみを差し替え
 *   - "needsReview": true があれば false に更新（任意）
 *   - 既存問題本文・選択肢・正解番号は不可触
 *
 * 出力:
 *   logs/apply-explanations-results.json   どの ID が更新できたか
 */

import { readdirSync, readFileSync, writeFileSync, statSync } from "node:fs";
import { join } from "node:path";

interface BatchManifest {
  batchName: string;
  updates: { id: string; explanation: string }[];
}

interface ApplyResult {
  id: string;
  status: "ok" | "not-found" | "no-change";
  filePath?: string;
}

const DATA_DIR = join(process.cwd(), "data", "questions");
const LOGS_DIR = join(process.cwd(), "logs");

function buildIdToFileMap(): Map<string, string> {
  const map = new Map<string, string>();
  function walk(dir: string): void {
    for (const ent of readdirSync(dir, { withFileTypes: true })) {
      const p = join(dir, ent.name);
      if (ent.isDirectory()) {
        walk(p);
      } else if (ent.isFile() && p.endsWith(".ts") && !p.endsWith("index.ts")) {
        const content = readFileSync(p, "utf8");
        for (const m of content.matchAll(/"id":\s*"([^"]+)"/g)) {
          map.set(m[1], p);
        }
      }
    }
  }
  walk(DATA_DIR);
  return map;
}

function applyUpdateToContent(
  content: string,
  questionId: string,
  newExplanation: string,
): { updated: string; found: boolean; changed: boolean } {
  const idMarker = `"id": "${questionId}"`;
  const idPos = content.indexOf(idMarker);
  if (idPos === -1) return { updated: content, found: false, changed: false };

  const nextIdPos = content.indexOf('"id": "', idPos + idMarker.length);
  const blockEnd = nextIdPos === -1 ? content.length : nextIdPos;
  const block = content.slice(idPos, blockEnd);

  const escaped = JSON.stringify(newExplanation).slice(1, -1);

  let changed = false;
  const updatedBlock = block
    .replace(/"explanation":\s*"(?:[^"\\]|\\.)*"/, (m) => {
      const next = `"explanation": "${escaped}"`;
      if (m !== next) changed = true;
      return next;
    })
    .replace(/"needsReview":\s*true/, () => {
      changed = true;
      return '"needsReview": false';
    });

  return {
    updated: content.slice(0, idPos) + updatedBlock + content.slice(blockEnd),
    found: true,
    changed,
  };
}

function main(): void {
  const manifestPath = process.argv[2];
  if (!manifestPath) {
    console.error("Usage: pnpm tsx scripts/apply-explanations-manual.ts <manifest.json>");
    process.exit(1);
  }
  if (!statSync(manifestPath).isFile()) {
    console.error(`Manifest not found: ${manifestPath}`);
    process.exit(1);
  }

  const manifest: BatchManifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  console.log(`Batch: ${manifest.batchName}`);
  console.log(`Updates: ${manifest.updates.length}`);

  const idMap = buildIdToFileMap();
  console.log(`ID map size: ${idMap.size}`);

  const byFile = new Map<string, { id: string; explanation: string }[]>();
  for (const u of manifest.updates) {
    const fp = idMap.get(u.id);
    if (!fp) {
      console.warn(`  not found: ${u.id}`);
      continue;
    }
    if (!byFile.has(fp)) byFile.set(fp, []);
    byFile.get(fp)!.push(u);
  }

  const results: ApplyResult[] = [];
  for (const [filePath, updates] of byFile) {
    let content = readFileSync(filePath, "utf8");
    let fileChanges = 0;
    for (const u of updates) {
      const { updated, found, changed } = applyUpdateToContent(content, u.id, u.explanation);
      if (!found) {
        results.push({ id: u.id, status: "not-found" });
      } else if (!changed) {
        results.push({ id: u.id, status: "no-change", filePath });
      } else {
        results.push({ id: u.id, status: "ok", filePath });
        content = updated;
        fileChanges++;
      }
    }
    if (fileChanges > 0) {
      writeFileSync(filePath, content, "utf8");
      console.log(`  ${filePath}: ${fileChanges} updates`);
    }
  }

  // Track IDs from manifest that never matched the id map at all.
  for (const u of manifest.updates) {
    if (!idMap.has(u.id) && !results.find((r) => r.id === u.id)) {
      results.push({ id: u.id, status: "not-found" });
    }
  }

  const ok = results.filter((r) => r.status === "ok").length;
  const noChange = results.filter((r) => r.status === "no-change").length;
  const notFound = results.filter((r) => r.status === "not-found").length;

  console.log(`\nResult: ok=${ok}  no-change=${noChange}  not-found=${notFound}`);

  writeFileSync(
    join(LOGS_DIR, "apply-explanations-results.json"),
    JSON.stringify(
      { batchName: manifest.batchName, generatedAt: new Date().toISOString(), results },
      null,
      2,
    ),
    "utf8",
  );
}

main();
