import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dataDir = join(root, "data", "exam-library");
const live = !process.argv.includes("--skip-live");
const timeoutMs = 20_000;
const concurrency = 8;

function read(file) {
  return JSON.parse(readFileSync(file, "utf8").replace(/^\uFEFF/u, ""));
}

function governmentUrl(value) {
  if (typeof value !== "string" || value !== value.trim()) return false;
  try {
    const url = new URL(value);
    return url.protocol === "https:" && !url.username && !url.password && !url.port &&
      url.hostname.endsWith(".go.jp");
  } catch {
    return false;
  }
}

const records = [];
const explanationsFile = join(dataDir, "explanations.json");
if (existsSync(explanationsFile)) records.push(["explanations.json", read(explanationsFile)]);
const mainFile = join(dataDir, "choice-explanations.json");
if (existsSync(mainFile)) records.push(["choice-explanations.json", read(mainFile)]);

for (const directory of ["choice-explanation-drafts", "explanation-drafts"]) {
  const absolute = join(dataDir, directory);
  if (!existsSync(absolute)) continue;
  for (const file of readdirSync(absolute).filter((name) => name.endsWith(".json")).sort()) {
    records.push([`${directory}/${file}`, read(join(absolute, file))]);
  }
}

const references = [];
for (const [file, batch] of records) {
  for (const [questionId, value] of Object.entries(batch)) {
    for (const source of Array.isArray(value?.sources) ? value.sources : []) {
      references.push({ file, questionId, url: source?.url });
    }
    for (const text of [
      value?.summary,
      ...(Array.isArray(value?.choices) ? value.choices.map((choice) => choice?.reason) : []),
    ]) {
      if (typeof text !== "string") continue;
      for (const match of text.matchAll(/https:\/\/[^\s)\]}>]+/gu)) {
        references.push({ file, questionId, url: match[0] });
      }
    }
    if (typeof value === "string") {
      for (const match of value.matchAll(/https:\/\/[^\s)\]}>]+/gu)) {
        references.push({ file, questionId, url: match[0] });
      }
    }
  }
}

const errors = [];
for (const reference of references) {
  if (!governmentUrl(reference.url)) {
    errors.push({ ...reference, error: "government HTTPS URLではありません" });
  }
}

const uniqueUrls = [...new Set(references.map((item) => item.url).filter(governmentUrl))].sort();
const health = [];

async function inspect(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, {
      method: "GET",
      redirect: "follow",
      signal: controller.signal,
      headers: { "user-agent": "KakomonAI-SourceValidator/1.0" },
    });
    await response.body?.cancel();
    const finalUrl = response.url || url;
    const ok = response.ok && governmentUrl(finalUrl);
    const result = { url, status: response.status, finalUrl, ok };
    if (!ok) errors.push({ url, error: `HTTP ${response.status} / redirect先 ${finalUrl}` });
    return result;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    errors.push({ url, error: message });
    return { url, status: null, finalUrl: null, ok: false, error: message };
  } finally {
    clearTimeout(timer);
  }
}

if (live) {
  let cursor = 0;
  await Promise.all(Array.from({ length: Math.min(concurrency, uniqueUrls.length) }, async () => {
    while (cursor < uniqueUrls.length) {
      const index = cursor++;
      health[index] = await inspect(uniqueUrls[index]);
    }
  }));
}

const result = {
  ok: errors.length === 0,
  live,
  files: records.length,
  references: references.length,
  uniqueUrls: uniqueUrls.length,
  healthy: health.filter((item) => item?.ok).length,
  errors,
};

console.log(JSON.stringify(result, null, 2));
if (!result.ok) process.exitCode = 1;
