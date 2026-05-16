// Fill explanations for placeholder questions by ID.
// Usage: node scripts/fill-explanations-batch.mjs <data-file> <json-payload-file>
// payload: { "ap-2018a-am-q1": "...new explanation...", ... }
import fs from "node:fs";

const [file, payloadPath] = process.argv.slice(2);
const payload = JSON.parse(fs.readFileSync(payloadPath, "utf8"));
let src = fs.readFileSync(file, "utf8");

let replaced = 0;
let notFound = [];

for (const [id, explanation] of Object.entries(payload)) {
  // Find the question block by id, then replace its placeholder explanation.
  const idMarker = `"id": "${id}",`;
  const idx = src.indexOf(idMarker);
  if (idx === -1) { notFound.push(id); continue; }

  // Find the explanation line within this block (between idMarker and next "id":)
  const nextIdx = src.indexOf('"id":', idx + idMarker.length);
  const blockEnd = nextIdx === -1 ? src.length : nextIdx;
  const block = src.slice(idx, blockEnd);

  const m = block.match(/"explanation":\s*"正解は[アイウエ]です。AIコパイロットに解説を依頼してください。"/);
  if (!m) { notFound.push(id + " (no placeholder)"); continue; }

  const oldLine = m[0];
  // Escape for JSON: \n, \" within explanation
  const esc = explanation
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"')
    .replace(/\n/g, "\\n");
  const newLine = `"explanation": "${esc}"`;

  // Replace within full src using the block offsets
  const lineStart = idx + m.index;
  const lineEnd = lineStart + oldLine.length;
  src = src.slice(0, lineStart) + newLine + src.slice(lineEnd);
  replaced++;
}

fs.writeFileSync(file, src);
console.log(`Replaced: ${replaced}`);
if (notFound.length) console.log("Not found:", notFound.join(", "));
