// Local-only acceptance. Start this worktree's built app on the supplied port.
import { chromium, expect } from "@playwright/test";
import { readFile, mkdir, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import path from "node:path";

const base = new URL(process.argv[2] ?? "http://127.0.0.1:43173");
if (base.hostname !== "127.0.0.1" || base.protocol !== "http:") throw new Error("Only an owned local server may be used");
const out = path.resolve(process.argv[3] ?? "test-results/chizai2");
await mkdir(out, {recursive:true});
const rawBytes = await readFile("data/prepared-chizai2/questions.json");
const originals = JSON.parse(rawBytes.toString("utf8"));
const buildId = (await readFile(".next/BUILD_ID", "utf8")).trim();
const adapterSha256 = createHash("sha256").update(await readFile("data/questions/chizai2/index.ts")).digest("hex");
const samples = [
  originals.find(q => Object.keys(q.choices).length === 4),
  originals.find(q => Object.keys(q.choices).length === 2),
  originals.find(q => Object.keys(q.choices).length === 9),
  ...originals.filter(q => q.type === "numeric"),
];
const browser = await chromium.launch({headless:true,channel:"chrome"});
const results = [];
try {
  for (const q of samples) {
    for (const kind of ["reader","quiz"]) {
    for (const correct of [true,false]) {
      const context = await browser.newContext({viewport:{width:1280,height:900}});
      // Isolated anonymous history; never touch the user's existing browser.
      await context.addInitScript(() => {
        if (!localStorage.getItem("ipa-quiz:onboarded:v1")) localStorage.setItem("ipa-quiz:onboarded:v1", "1");
      });
      await context.route("**/*", route => {
        const request = route.request();
        const url = new URL(request.url());
        if (url.origin !== base.origin || request.method() !== "GET" || /\/api\/(?:copilot|tts|grading|answers|study)/.test(url.pathname)) return route.abort();
        return route.continue();
      });
      const page = await context.newPage();
      const pageErrors = [];
      page.on("pageerror", error => pageErrors.push(error.message));
      if (q === samples[0] && correct && kind === "reader") {
        const hub = await page.goto(new URL("/chizai2",base).href,{waitUntil:"networkidle"});
        expect(hub?.status()).toBe(200);
        await expect(page.getByRole("heading",{level:1})).toContainText("知的財産管理技能検定2級");
        await expect(page.locator("body")).toContainText(/160\s*問/);
        await expect(page.locator("a[href='https://www.kentei-info-ip-edu.org/gakushujoho/kakomon.html']").first()).toBeAttached();
        await page.screenshot({path:path.join(out,"chizai2-hub.png"),fullPage:true});
        const defaultQuiz = await page.goto(new URL("/quiz?mode=random&exam=chizai2",base).href,{waitUntil:"networkidle"});
        expect(defaultQuiz?.status()).toBe(200);
        await expect(page.getByRole("radiogroup")).toBeVisible();
        await expect(page.getByRole("navigation",{name:"試験科目を選択"}).getByRole("link",{name:"実技",exact:true})).toBeVisible();
      }
      const url = new URL(kind === "reader" ? `/q/chizai2/2026-${q.season}/${q.session}/q${q.qNumber}` : `/quiz?mode=year&exam=chizai2&source=search&ids=${encodeURIComponent(q.id)}`, base).href;
      const response = await page.goto(url, {waitUntil:"networkidle"});
      expect(response?.status()).toBe(200);
      const stem = kind === "reader" ? page.getByRole("region",{name:"問題文",exact:true}) : page.locator(".selectable-content").first();
      // Paragraph boundaries can render as newlines or adjacent text nodes.
      expect((await stem.innerText()).replace(/\s+/g," ").replace(/\s/g,"")).toContain(q.question.slice(0,45).replace(/\s/g,""));
      await expect(stem).toContainText(q.lawReferenceDate);
      let selected;
      if (q.type === "numeric") {
        expect(await page.getByRole("radio").count()).toBe(0);
        if (q.answer === "208000") await expect(stem.getByRole("table")).toContainText("138000円に1請求項につき4000円");
        selected = correct ? q.answer : "0";
        await page.getByRole("form",{name:"数値記入の解答"}).getByRole("textbox").fill(selected);
        await page.getByRole("button",{name:"採点する",exact:true}).click();
      } else {
        const keys = Object.keys(q.choices);
        const radios = page.getByRole("radio");
        expect(await radios.count()).toBe(keys.length);
        for (let i=0;i<keys.length;i++) await expect(radios.nth(i)).toContainText(q.choices[keys[i]].replace(/\s+/g," "));
        selected = correct ? q.answer : keys.find(key => key !== q.answer);
        await radios.nth(keys.indexOf(selected)).click();
      }
      if (kind === "reader") await expect(page.getByRole("status").filter({hasText:correct ? /^正解です/ : /^不正解です/})).toBeAttached();
      const history = await page.evaluate(() => JSON.parse(localStorage.getItem("ipa-quiz:history:v1")).entries);
      expect(history).toMatchObject([{id:q.id, selected, correct}]);
      expect(history).toHaveLength(1);
      const explanation = kind === "reader" ? page.locator("#explanation") : page.getByRole("region",{name:correct ? "正解の解説" : "不正解の解説"});
      // The normal quiz exposes its official source links with the answer explanation.
      await expect(page.locator("a[href='"+q.sourcePdfUrl+"']").first()).toBeAttached();
      // The reader inserts conclusion/detail headings between complete sentences.
      for (const sentence of q.explanation.split(/(?<=。)\s*/).filter(Boolean)) await expect(explanation).toContainText(sentence);
      for (const reason of Object.values(q.choiceExplanations)) await expect(explanation).toContainText(reason);
      const screenshot = path.join(out,`${kind}-${q.id}-${correct ? "correct" : "wrong"}.png`);
      await page.screenshot({path:screenshot,fullPage:true});
      await page.reload({waitUntil:"networkidle"});
      const persisted = await page.evaluate(() => ({
        entries:JSON.parse(localStorage.getItem("ipa-quiz:history:v1")).entries,
        last:JSON.parse(localStorage.getItem("ipa-quiz:last-question:v1")),
      }));
      expect(persisted.entries).toEqual(history);
      expect(persisted.last).toMatchObject({exam:"chizai2",qNumber:q.qNumber,session:q.session,season:q.season});
      expect(pageErrors).toEqual([]);
      results.push({kind,id:q.id,url,correct,selected,historyPersistedAfterReload:true,sourcePdfUrl:q.sourcePdfUrl,screenshot, screenshotSha256:createHash("sha256").update(await readFile(screenshot)).digest("hex"),pageErrors});
      await context.close();
    }
    }
  }
  await writeFile(path.join(out,"browser-receipt.json"), JSON.stringify({status:"PASS",buildId,adapterSha256,sourceCandidateSha256:createHash("sha256").update(rawBytes).digest("hex"),scope:"Built local app; isolated anonymous browser history only; external requests and writes blocked",results},null,2)+"\n");
  console.log(`PASS: ${results.length} built-page answer/reload checks; screenshots and receipt in ${out}`);
} finally { await browser.close(); }
