import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { createHash } from "node:crypto";
import { inspectDentalSourceBatch } from "./lib/dental-hygienist-source-batch";
import { dentalRecoveredDraftSchema } from "./lib/dental-hygienist-source-batch";

async function main() {
  const directory = path.resolve("docs/evidence/dental-hygienist-latest-two-20261011");
  const answers: unknown = JSON.parse(await readFile(path.join(directory, "official-answers.json"), "utf8"));
  const drafts: unknown = JSON.parse(await readFile(path.join(directory, "recovered-drafts.json"), "utf8"));
  const receipts: unknown = JSON.parse(await readFile(path.join(directory, "source-receipts.json"), "utf8"));
  const manifest = inspectDentalSourceBatch(answers, drafts, receipts);
  for (const row of dentalRecoveredDraftSchema.array().parse(drafts)) {
    const image = await readFile(path.join(directory, row.originalPagePath));
    if (createHash("sha256").update(image).digest("hex") !== row.originalPageSha256) throw new Error(`Original page checksum mismatch: ${row.originalPagePath}`);
  }
  const outputIndex = process.argv.indexOf("--out");
  if (outputIndex !== -1) {
    const filename = process.argv[outputIndex + 1];
    if (!filename) throw new Error("--out requires a filename");
    await writeFile(path.resolve(filename), `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
  }
  const { items, ...counts } = manifest;
  console.log(JSON.stringify({ ...counts, candidates: items.filter((item) => item.candidateForQuestionImport).map((item) => item.key) }, null, 2));
}
main().catch((error: unknown) => { console.error(error); process.exitCode = 1; });
