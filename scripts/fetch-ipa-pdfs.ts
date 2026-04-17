/**
 * IPA 公式サイトから過去問 PDF をダウンロードするスクリプト。
 *
 * 使い方:
 *   pnpm tsx scripts/fetch-ipa-pdfs.ts
 *
 * 既定では「応用情報(AP) 午前」を令和5年度春期〜令和7年度春期の範囲で取得します。
 * 取得先は data/raw_pdfs/ 配下（.gitignore 済み）。
 *
 * IPA は過去問の使用について許諾不要・使用料不要と公式に明示していますが、
 * アクセスは礼儀としてスロットル（1ファイル 500ms 待機）しています。
 */
import { mkdir, writeFile, stat } from "node:fs/promises";
import { createWriteStream } from "node:fs";
import { dirname, join } from "node:path";
import { pipeline } from "node:stream/promises";

const BASE = join(process.cwd(), "data", "raw_pdfs");

interface Target {
  url: string;
  savePath: string;
}

const TARGETS: Target[] = [
  // AP 午前: 令和5年度春期 / 秋期
  {
    url: "https://www.jitec.ipa.go.jp/1_04hanni_sukiru/mondai_kaitou_2023h05_1/2023h05h_ap_am_qs.pdf",
    savePath: "ap/2023-spring/am_qs.pdf",
  },
  {
    url: "https://www.jitec.ipa.go.jp/1_04hanni_sukiru/mondai_kaitou_2023h05_1/2023h05h_ap_am_ans.pdf",
    savePath: "ap/2023-spring/am_ans.pdf",
  },
  {
    url: "https://www.jitec.ipa.go.jp/1_04hanni_sukiru/mondai_kaitou_2023h05_2/2023h05a_ap_am_qs.pdf",
    savePath: "ap/2023-autumn/am_qs.pdf",
  },
  {
    url: "https://www.jitec.ipa.go.jp/1_04hanni_sukiru/mondai_kaitou_2023h05_2/2023h05a_ap_am_ans.pdf",
    savePath: "ap/2023-autumn/am_ans.pdf",
  },
  // 令和6年度
  {
    url: "https://www.jitec.ipa.go.jp/1_04hanni_sukiru/mondai_kaitou_2024h06_1/2024h06h_ap_am_qs.pdf",
    savePath: "ap/2024-spring/am_qs.pdf",
  },
  {
    url: "https://www.jitec.ipa.go.jp/1_04hanni_sukiru/mondai_kaitou_2024h06_1/2024h06h_ap_am_ans.pdf",
    savePath: "ap/2024-spring/am_ans.pdf",
  },
  {
    url: "https://www.jitec.ipa.go.jp/1_04hanni_sukiru/mondai_kaitou_2024h06_2/2024h06a_ap_am_qs.pdf",
    savePath: "ap/2024-autumn/am_qs.pdf",
  },
  {
    url: "https://www.jitec.ipa.go.jp/1_04hanni_sukiru/mondai_kaitou_2024h06_2/2024h06a_ap_am_ans.pdf",
    savePath: "ap/2024-autumn/am_ans.pdf",
  },
  // 令和7年度春期
  {
    url: "https://www.jitec.ipa.go.jp/1_04hanni_sukiru/mondai_kaitou_2025h07_1/2025h07h_ap_am_qs.pdf",
    savePath: "ap/2025-spring/am_qs.pdf",
  },
  {
    url: "https://www.jitec.ipa.go.jp/1_04hanni_sukiru/mondai_kaitou_2025h07_1/2025h07h_ap_am_ans.pdf",
    savePath: "ap/2025-spring/am_ans.pdf",
  },
];

async function exists(p: string): Promise<boolean> {
  try {
    await stat(p);
    return true;
  } catch {
    return false;
  }
}

async function downloadOne(t: Target): Promise<"ok" | "skip" | "fail"> {
  const abs = join(BASE, t.savePath);
  if (await exists(abs)) {
    console.log(`[skip] ${t.savePath}`);
    return "skip";
  }
  await mkdir(dirname(abs), { recursive: true });
  console.log(`[get ] ${t.url}`);
  try {
    const res = await fetch(t.url, {
      headers: { "User-Agent": "ipa-quiz-site/0.1 (+kameking-lab)" },
    });
    if (!res.ok) {
      console.error(`  -> HTTP ${res.status}`);
      return "fail";
    }
    if (!res.body) {
      const buf = Buffer.from(await res.arrayBuffer());
      await writeFile(abs, buf);
      return "ok";
    }
    await pipeline(
      res.body as unknown as NodeJS.ReadableStream,
      createWriteStream(abs),
    );
    return "ok";
  } catch (err) {
    console.error(`  -> ${(err as Error).message}`);
    return "fail";
  }
}

async function main() {
  await mkdir(BASE, { recursive: true });
  let ok = 0;
  let fail = 0;
  let skip = 0;
  for (const t of TARGETS) {
    const r = await downloadOne(t);
    if (r === "ok") ok++;
    else if (r === "skip") skip++;
    else fail++;
    await new Promise((r) => setTimeout(r, 500));
  }
  console.log(`\nDone. ok=${ok} skip=${skip} fail=${fail}`);
  if (fail > 0) process.exitCode = 1;
}

main();
