/**
 * 監査で「multiple-choice なのに全選択肢が空文字（hasImage=true 由来）」と判明した
 * 10 件に対し `needsReview: true` を付与する一回限りの修復スクリプト。
 *
 * 実行: pnpm tsx scripts/repair-empty-choices.ts
 *
 * 既存メカニズム:
 * - lib/questions/filter.ts が needsReview 付きをクイズプールから除外
 * - app/q/.../page.tsx の追加ガード + lib/seo/sitemap-pagination.ts の追加フィルタで
 *   URL レベルでも 404 化／インデックス除外する（本 PR 内で同時に修正）
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const TARGETS = [
  "fe-2019h-am-q5",
  "sc-2009a-am1-q19",
  "nw-2017h-am1-q16",
  "pm-2018a-am1-q7",
  "pm-2018a-am1-q10",
  "pm-2018a-am1-q20",
  "es-2021a-am2-q10",
  "es-2021a-am2-q11",
  "es-2021a-am2-q13",
  "sm-2009a-am2-q10",
];

const DATA_ROOT = join(process.cwd(), "data", "questions");

function* walkFiles(dir: string): Generator<string> {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const s = statSync(p);
    if (s.isDirectory()) yield* walkFiles(p);
    else if (name.endsWith(".ts")) yield p;
  }
}

let totalEdits = 0;
const todo = new Set(TARGETS);

for (const file of walkFiles(DATA_ROOT)) {
  let content = readFileSync(file, "utf8");
  let changed = false;
  for (const id of [...todo]) {
    // Locate the object literal whose "id": "<id>" line appears and append
    // `"needsReview": true` before its closing brace if not already present.
    const idRe = new RegExp(`("id":\\s*"${id}",)`);
    if (!idRe.test(content)) continue;
    // Find object boundaries: from "id": <id> back to the preceding "{",
    // then forward to matching "}".
    const idMatch = content.match(idRe)!;
    const idStart = content.indexOf(idMatch[0]);
    const openBrace = content.lastIndexOf("{", idStart);
    // Scan forward for matching close brace at the same depth
    let depth = 0;
    let closeBrace = -1;
    for (let i = openBrace; i < content.length; i++) {
      const c = content[i];
      if (c === "{") depth++;
      else if (c === "}") {
        depth--;
        if (depth === 0) {
          closeBrace = i;
          break;
        }
      }
    }
    if (closeBrace === -1) continue;
    const objText = content.slice(openBrace, closeBrace + 1);
    if (/"needsReview":/.test(objText)) {
      todo.delete(id);
      continue;
    }
    // Find indentation of the closing brace's line — and use the indentation
    // of the "id" line for the inserted field.
    const idLineStart = content.lastIndexOf("\n", idStart) + 1;
    const idIndent = content.slice(idLineStart, idStart);
    const insertion = `${idIndent}"needsReview": true,\n`;
    // Insert before the line containing the "id" field — placement is
    // cosmetic; JSON-like object literals don't care about key order.
    content = content.slice(0, idLineStart) + insertion + content.slice(idLineStart);
    changed = true;
    totalEdits++;
    todo.delete(id);
    console.log(`  + ${id} → needsReview: true (${file})`);
  }
  if (changed) writeFileSync(file, content, "utf8");
}

console.log(`\n修復: ${totalEdits} 件`);
if (todo.size > 0) {
  console.warn(`未処理 (見つからず): ${[...todo].join(", ")}`);
  process.exit(1);
}
