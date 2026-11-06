import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import path from "node:path";
import sharp from "sharp";
import { QUALIFICATION_CATALOG } from "../lib/qualifications/catalog";
import { canonicalPresenceExam } from "../lib/study-presence";
import { mascotExamDomains } from "../lib/home/study-room-domains";

// Only this build script reads source art. Browsers receive a tiny URL index.
async function main() {
  const root = process.cwd();
  const out = path.join(root, "public/images/home/study-room-mascots");
  await mkdir(out, { recursive: true });
  type Pair = { study: string; break: string; breakLabel: string };
  const exams: Record<string, Pair> = {};
  const domains: Record<string, Pair> = {};
  type AwayArt = { src: string; label: string };
  const away = { exams: {} as Record<string, AwayArt>, fields: {} as Record<string, AwayArt>, examFields: {} as Record<string, string> };
  const awayFields = new Set<string>();
  let vacant: string | undefined;
  const encodings: (() => Promise<unknown>)[] = [];
  const ids = new Set<string>();
  for (const file of (await readdir("data/study-room-mascots")).filter(f => f.endsWith(".manifest.json")).sort()) {
    const manifest = JSON.parse(await readFile(`data/study-room-mascots/${file}`, "utf8"));
    if (manifest.version !== 1 || !Array.isArray(manifest.items)) throw new Error(`Invalid manifest: ${file}`);
    if (manifest.sharedManifest) {
      const sourceManifest = manifest.sharedManifest;
      const shared = JSON.parse(await readFile(sourceManifest, "utf8"));
      for (const field of Object.keys(shared.fields)) awayFields.add(field);
      const base = path.dirname(sourceManifest);
      const fallback: Record<string, string[]> = {};
      for (const [exam, value] of Object.entries(shared.exams) as [string, { field: string; breakGag: string; status: string; images: { kind: string; file: string; sha256: string }[] }][]) {
        away.examFields[exam] = value.field;
        const study = value.images.find(image => image.kind === "study");
        const rest = value.images.find(image => image.kind === "break");
        if (value.status !== "complete" || !study || !rest) {
          (fallback[value.field] ??= []).push(exam);
          continue;
        }
        for (const image of [study, rest]) {
          const bytes = await readFile(path.join(base, image.file));
          if (createHash("sha256").update(bytes).digest("hex") !== image.sha256) throw new Error(`Asset checksum mismatch: ${exam}/${image.kind}`);
        }
        manifest.items.push({ id: `shared-${exam}`, exams: [exam], study: path.join(base, study.file),
          break: path.join(base, rest.file), breakLabel: value.breakGag });
      }
      // Exact VIS3B field mapping covers unfinished prop composites without guessing broad domains.
      for (const [field, exams] of Object.entries(fallback)) {
        if (!shared.fields[field]) throw new Error(`Unknown VIS3B field: ${field}`);
        manifest.items.push({ id: `field-${field}`, exams, study: path.join(base, `fields/${field}-study.png`),
          break: path.join(base, `fields/${field}-break.png`), breakLabel: shared.fields[field].gag });
      }
    }
    if (manifest.vacantManifest) {
      if (vacant) throw new Error("Duplicate vacant desk");
      const sourceManifest = manifest.vacantManifest;
      const desk = JSON.parse(await readFile(sourceManifest, "utf8"));
      const source = path.join(path.dirname(sourceManifest), desk.file);
      const bytes = await readFile(source);
      if (createHash("sha256").update(bytes).digest("hex") !== desk.sha256) throw new Error("Vacant desk checksum mismatch");
      encodings.push(() => sharp(source).resize(256, 256, { fit: "contain", background: "#00000000" }).webp({ quality: 76, effort: 6 }).toFile(path.join(out, "vacant-desk.webp")));
      vacant = "/images/home/study-room-mascots/vacant-desk.webp";
    }
    if (manifest.awayManifest) {
      const sourceManifest = manifest.awayManifest;
      const source = JSON.parse(await readFile(sourceManifest, "utf8"));
      if (source.schemaVersion !== 1 || source.task !== "VIS3D") throw new Error(`Invalid away manifest: ${sourceManifest}`);
      for (const [entries, target] of [[source.qualifications ?? {}, away.exams], [source.fields ?? {}, away.fields]] as [Record<string, { images: { kind: string; name: string; file: string; sha256: string }[] }>, Record<string, AwayArt>][]) {
        for (const [key, entry] of Object.entries(entries)) {
          const images = entry.images.filter(image => image.kind === "away");
          if (!images.length) continue;
          if (images.length !== 1 || target[key] || !/^[a-z0-9-]+$/.test(key)) throw new Error(`Invalid/duplicate away target: ${key}`);
          if (target === away.exams && canonicalPresenceExam(key) !== key) throw new Error(`Unknown away exam: ${key}`);
          if (target === away.fields && !awayFields.has(key)) throw new Error(`Unknown away field: ${key}`);
          const image = images[0];
          if (!image.name?.trim()) throw new Error(`Missing away label: ${key}`);
          const file = path.resolve(root, path.dirname(sourceManifest), image.file);
          if (!file.startsWith(root + path.sep)) throw new Error(`Away source outside repository: ${file}`);
          const bytes = await readFile(file);
          if (createHash("sha256").update(bytes).digest("hex") !== image.sha256) throw new Error(`Away checksum mismatch: ${key}`);
          const name = `away-${target === away.exams ? "exam" : "field"}-${key}.webp`;
          encodings.push(() => sharp(file).resize(256, 256, { fit: "contain", background: "#00000000" }).webp({ quality: 76, effort: 6 }).toFile(path.join(out, name)));
          target[key] = { src: `/images/home/study-room-mascots/${name}`, label: image.name };
        }
      }
    }
    if (manifest.dedicatedManifest) {
      const sourceManifest = manifest.dedicatedManifest;
      const dedicated = JSON.parse(await readFile(sourceManifest, "utf8"));
      for (const [exam, value] of Object.entries(dedicated.qualifications) as [string, { images: { kind: string; file: string; name: string; sha256: string }[] }][]) {
        const study = value.images.find(image => image.kind === "study");
        const slack = value.images.find(image => image.kind === "slack");
        // Production can proceed with only the completed pairs of an in-progress batch.
        if (!study || !slack) continue;
        for (const image of [study, slack]) {
          const bytes = await readFile(path.join(path.dirname(sourceManifest), image.file));
          if (createHash("sha256").update(bytes).digest("hex") !== image.sha256) throw new Error(`Asset checksum mismatch: ${exam}/${image.kind}`);
        }
        manifest.items.push({ id: exam === "yakuzaishi" ? "pharmacy" : exam, exams: [exam],
          study: path.join(path.dirname(sourceManifest), study.file), break: path.join(path.dirname(sourceManifest), slack.file), breakLabel: slack.name });
      }
    }
    for (const item of manifest.items) {
      if (!/^[a-z0-9-]+$/.test(item.id) || ids.has(item.id) || typeof item.breakLabel !== "string" || !item.breakLabel.trim()) throw new Error(`Invalid/duplicate mascot: ${item.id}`);
      ids.add(item.id);
      if (![item.exams, item.domains].some(keys => Array.isArray(keys) && keys.length)) throw new Error(`Missing targets: ${item.id}`);
      const pair = { breakLabel: item.breakLabel } as Pair;
      for (const state of ["study", "break"] as const) {
        if (typeof item[state] !== "string") throw new Error(`Missing ${state}: ${item.id}`);
        const source = path.resolve(root, item[state]);
        if (!source.startsWith(root + path.sep)) throw new Error(`Source outside repository: ${source}`);
        const name = `${item.id}-${state}.webp`;
        encodings.push(() => sharp(source).resize(256, 256, { fit: "contain", background: "#00000000" }).webp({ quality: 76, effort: 6 }).toFile(path.join(out, name)));
        pair[state] = `/images/home/study-room-mascots/${name}`;
      }
      for (const [keys, target] of [[item.exams ?? [], exams], [item.domains ?? [], domains]] as [string[], Record<string, Pair>][]) {
        if (!Array.isArray(keys) || keys.some(key => typeof key !== "string" || !/^[a-z0-9-]+$/.test(key))) throw new Error(`Invalid targets: ${item.id}`);
        for (const key of keys) {
          if (target[key]) throw new Error(`Duplicate target: ${key}`);
          if (target === exams && canonicalPresenceExam(key) !== key) throw new Error(`Unknown/noncanonical exam: ${key}`);
          if (target === domains && !QUALIFICATION_CATALOG.some(entry => entry.domain === key)) throw new Error(`Unknown domain: ${key}`);
          target[key] = pair;
        }
      }
    }
  }
  // Preserve the existing generic poses as individual lazy-loadable tiles.
  const atlas = "public/images/home/study-mascots-atlas.webp";
  const { width, height } = await sharp(atlas).metadata();
  if (!width || !height || width % 4 || height % 3) throw new Error("Invalid generic atlas dimensions");
  for (let i = 0; i < 12; i++) {
    encodings.push(() => sharp(atlas).extract({ left: i % 4 * width / 4, top: Math.floor(i / 4) * height / 3, width: width / 4, height: height / 3 })
      .resize(256, 256).webp({ quality: 76, effort: 6 }).toFile(path.join(out, `generic-${i}.webp`)));
  }
  // Bound CPU/memory while avoiding hundreds of serial encodes. Publish the index only after all succeed.
  let nextEncoding = 0;
  await Promise.all(Array.from({ length: 4 }, async () => {
    while (nextEncoding < encodings.length) await encodings[nextEncoding++]();
  }));
  const examDomains = Object.fromEntries(Object.entries(mascotExamDomains()).filter(([, domain]) => domains[domain]));
  if ((Object.keys(away.exams).length || Object.keys(away.fields).length) && !vacant) throw new Error("Away mascots require a vacant desk");
  await writeFile("lib/home/study-room-mascots.generated.json", JSON.stringify({ exams, domains, examDomains, away, vacant }, null, 2) + "\n");
  console.log(`Built ${ids.size} mascot pairs, ${Object.keys(away.exams).length + Object.keys(away.fields).length} away mascots and 12 generic tiles.`);

}
main().catch(error => { console.error(error); process.exitCode = 1; });
