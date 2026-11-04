import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { CHIZAI2_QUESTIONS } from "@/data/questions/chizai2";
import intake from "@/reports/qchizai2-20261103/source-intake-receipt.json";

const directory = "reports/qchizai2-20261103";
const sha = (path: string) => createHash("sha256").update(readFileSync(path)).digest("hex");
function canonical(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(canonical).join(",")}]`;
  if (value && typeof value === "object") return `{${Object.entries(value).filter(([,v]) => v !== undefined).sort(([a],[b]) => a.localeCompare(b,"en")).map(([k,v]) => `${JSON.stringify(k)}:${canonical(v)}`).join(",")}}`;
  return JSON.stringify(value);
}
const checks = JSON.parse(readFileSync(`${directory}/checks.json`,"utf8"));
if (!["schema","twoRoundCoverage","typecheck","relatedTests","lint","build","browser"].every(key => checks[key]?.status === "PASS")) throw new Error("Acceptance checks incomplete");
const binding = JSON.parse(readFileSync(`${directory}/reused-snapshot-binding.json`,"utf8"));
for (const item of binding.bindings) if (sha(item.target) !== item.acceptedHash) throw new Error(`Changed accepted snapshot: ${item.target}`);
if (sha("data/prepared-chizai2/questions.json") !== intake.candidateSha256) throw new Error("Candidate changed");
const questions = CHIZAI2_QUESTIONS.map(q => {
  const source = intake.questions.find(row => row.id === q.id)!;
  if (!source || source.answer !== q.answer || source.officialAnswer !== q.officialAnswerNumber) throw new Error(`Source mismatch: ${q.id}`);
  return {...source, adoptedContentSha256:createHash("sha256").update(canonical(q)).digest("hex"),needsReview:q.needsReview,license:q.license};
});
const result = {
  task:"qchizai2",date:"2026-11-03",branch:"qual/qchizai2-20261103",
  baseCommit:"00e49b94060cc2671e9d098df91d653a4ed3ffe2",
  status:checks.cleanup?.status === "PASS" ? "LOCAL_INTEGRATION_ACCEPTED; NOT_DEPLOYED" : "LOCAL_INTEGRATION_ACCEPTED; BUILD_CLEANUP_BLOCKED; NOT_DEPLOYED",
  expectedCoverage:intake.expectedCoverage,
  counts:{reusedOriginals:160,newOriginals:0,multipleChoice:158,numeric:2,binarySubset:12,choiceReasons:651,maximumChoices:9,requiredPictorialAssets:0,textTables:1,unavailableOriginals:0},
  contentReview:{policy:"Reuse unchanged same-version author-external content review and 2026-11-03 independent intake review; no claim of new full legal audit",evidence:"reused-content-review.json",sha256:sha(`${directory}/reused-content-review.json`),independentIntakeReview:"prior-independent-review.md",independentIntakeReviewSha256:sha(`${directory}/prior-independent-review.md`)},
  rights:{basis:"User's 2026-11-03 task instruction: rights obtained by owner; not a waiting condition",claim:"No new permission document obtained or public-domain licence asserted",officialCondition:"Official site prohibits unauthorised reproduction and asks commercial users to consult; owner-obtained permission instruction applied"},
  adoption:{archive:"Six previously accepted prepared files kept byte-for-byte, including historical draft/gate metadata. They are provenance, not the current practice gate.",adapter:"data/questions/chizai2/index.ts explicitly maps the same question, answer, choices, explanations and sources to the current Question contract.",metadata:"needsReview=false and IP-EDU-authorized-reuse refer to the reused independent content review and current owner rights instruction, not a new legal-history audit.",numeric:"Empty legacy choices/choiceExplanations are omitted; numericAnswer/official numeric answer preserved.",publicScope:"Local branch registry only; no production release, push, PR, deployment or DB operation."},
  reservations:["Six historical-instrument source coverage reservations retained from reused review; no specific content HOLD in that review", "Local browser checks use isolated anonymous localStorage; production routes, authenticated DB sync and rewards are outside this acceptance", "Future rounds and law changes require new source review"],
  historicalDateBasis:{path:"reused-six-id-date-basis.json",sha256:sha(`${directory}/reused-six-id-date-basis.json`)},
  sourceIntakeReceiptSha256:sha(`${directory}/source-intake-receipt.json`),
  files:[...binding.bindings.map((b: {target:string})=>b.target),"data/questions/chizai2/index.ts","scripts/verify-chizai2-intake.py","scripts/verify-chizai2-browser.mjs","scripts/write-chizai2-receipt.ts",`${directory}/checks.json`,`${directory}/browser-receipt.json`,`${directory}/vitest-current.json`,`${directory}/review-resolution.md`].map(path=>({path,sha256:sha(path)})),
  hashEncoding:"Adopted records: UTF-8 recursively key-sorted compact JSON, undefined object fields omitted; raw record hashes reused from intake",
  checks,questions,
};
writeFileSync(`${directory}/application-receipt.json`,JSON.stringify(result,null,2)+"\n");
console.log(`Accepted ${questions.length} local originals; application receipt SHA-256 ${sha(`${directory}/application-receipt.json`)}`);
