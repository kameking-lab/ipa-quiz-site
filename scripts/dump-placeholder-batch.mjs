// Dump placeholder questions for batch processing
// Usage: node scripts/dump-placeholder-batch.mjs <file> <startQ> <endQ>
import fs from "node:fs";

const [file, startQ, endQ] = process.argv.slice(2);
const start = Number(startQ);
const end = Number(endQ);
const src = fs.readFileSync(file, "utf8").replace(/\r\n/g, "\n");
const blocks = src.split(/(?=  \{\n\s+"id":)/).slice(1);

for (const block of blocks) {
  if (!block.includes("AIコパイロットに解説を依頼")) continue;
  const idM = block.match(/"id":\s*"([^"]+)"/);
  const qNumM = block.match(/"qNumber":\s*(\d+)/);
  const qN = Number(qNumM[1]);
  if (qN < start || qN > end) continue;
  const hasImg = /"hasImage":\s*true/.test(block);
  if (hasImg) continue;
  const qM = block.match(/"question":\s*"((?:[^"\\]|\\[\s\S])*)"/);
  const cAr = block.match(/"ア":\s*"((?:[^"\\]|\\[\s\S])*)"/);
  const cI = block.match(/"イ":\s*"((?:[^"\\]|\\[\s\S])*)"/);
  const cU = block.match(/"ウ":\s*"((?:[^"\\]|\\[\s\S])*)"/);
  const cE = block.match(/"エ":\s*"((?:[^"\\]|\\[\s\S])*)"/);
  const aM = block.match(/"answer":\s*"([アイウエ])"/);
  const catM = block.match(/"category":\s*"([^"]+)"/);
  const unesc = (s) => s.replace(/\\n/g, "\n").replace(/\\"/g, '"').replace(/\\\\/g, "\\");
  console.log("=".repeat(72));
  console.log(`ID: ${idM[1]} | answer: ${aM[1]} | cat: ${catM[1]}`);
  console.log("Q:", unesc(qM[1]));
  console.log("ア:", unesc(cAr[1]));
  console.log("イ:", unesc(cI[1]));
  console.log("ウ:", unesc(cU[1]));
  console.log("エ:", unesc(cE[1]));
}
