import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const origin = process.argv[2] ?? "http://127.0.0.1:3374";
if (!/^http:\/\/(127\.0\.0\.1|localhost):\d+$/.test(origin)) throw new Error("Local verification only");
const fixture = JSON.parse(readFileSync(resolve("__tests__/fixtures/tsugino-crosslinks-20261104.json"), "utf8"));
const evidence = "reports/int7-20261105/local-landings.json";

async function get(path) {
  let url = new URL(path, origin);
  for (let count = 0; count < 5; count++) {
    if (url.origin !== origin) throw new Error("External redirects are not followed");
    const response = await fetch(url, { redirect: "manual", signal: AbortSignal.timeout(60000) });
    if ([301, 302, 303, 307, 308].includes(response.status)) {
      await response.arrayBuffer();
      url = new URL(response.headers.get("location"), url);
      continue;
    }
    const html = await response.text();
    const canonical = /<link[^>]*rel="canonical"[^>]*href="([^"]+)"/.exec(html)?.[1]?.replaceAll("&amp;", "&") ?? null;
    return { status: response.status, path: url.pathname + url.search, canonical };
  }
  throw new Error("Redirect loop");
}

async function mapBatched(rows, operation) {
  const output = [];
  for (let index = 0; index < rows.length; index += 4) output.push(...await Promise.all(rows.slice(index, index + 4).map(operation)));
  return output;
}

const links = await mapBatched(fixture.mappings, async link => {
  const source = new URL(link.url);
  if (source.origin !== "https://www.kakomon-ai.jp") throw new Error("Unexpected source origin");
  source.searchParams.set("utm_source", "tsugino_shikaku");
  source.searchParams.set("utm_medium", "referral");
  source.searchParams.set("utm_campaign", "kakomon_crosslink");
  source.searchParams.set("utm_content", `${link.qualificationId}.local.${link.sourceKey}`);
  const result = await get(source.pathname + source.search);
  const final = new URL(result.path, origin);
  const utmPreserved = ["utm_source", "utm_medium", "utm_campaign", "utm_content"].every(key => final.searchParams.get(key) === source.searchParams.get(key));
  const subjectPreserved = !source.searchParams.has("subject") || final.searchParams.get("subject") === source.searchParams.get("subject");
  return { qualificationId: link.qualificationId, sourceKey: link.sourceKey, inputPath: source.pathname + source.search,
    ...result, utmPreserved, subjectPreserved, pass: result.status === 200 && utmPreserved && subjectPreserved && !!result.canonical };
});

const gscPaths = ["/", "/sc", "/nw", "/st", "/sa", "/ap", "/blog/it-shikaku-rirekisho-kakikata", "/blog/ipa-shiken-fukusuu-kubun-juken", "/blog/koudo-gozen1-taisaku", "/blog/nw-gogo-jikan-haibun"];
const gsc = await mapBatched(gscPaths, async path => {
  const result = await get(path);
  const canonical = result.canonical ? new URL(result.canonical) : null;
  return { inputPath: path, ...result, pass: result.status === 200 && canonical?.origin === "https://www.kakomon-ai.jp" && canonical.pathname === path && canonical.search === "" };
});
const output = { environment: "local production build; billing off; no DB credentials", sourceRevision: fixture.sourceRevision,
  linksChecked: links.length, uniqueSourceUrls: new Set(fixture.mappings.map(link => link.url)).size,
  linksPassed: links.filter(row => row.pass).length, gscChecked: gsc.length, gscPassed: gsc.filter(row => row.pass).length, links, gsc };
writeFileSync(evidence, JSON.stringify(output, null, 2) + "\n");
console.log(JSON.stringify({ links: `${output.linksPassed}/${output.linksChecked}`, gsc: `${output.gscPassed}/${output.gscChecked}`,
  failures: [...links, ...gsc].filter(row => !row.pass).map(row => ({ inputPath: row.inputPath, status: row.status })) }));
if (output.linksPassed !== output.linksChecked || output.gscPassed !== output.gscChecked) process.exitCode = 1;
