// Run against an owned local server with no credentials, e.g. node ... http://127.0.0.1:3198 <evidence-dir>.
import { chromium, expect } from "@playwright/test";
import { readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const origin = process.argv[2] ?? "http://127.0.0.1:3198";
if (new URL(origin).hostname !== "127.0.0.1") throw new Error("Local isolated acceptance only");
const evidence = resolve(process.argv[3] ?? "tmp/qdentsu2-browser");
mkdirSync(evidence, {recursive:true});
const receipt=JSON.parse(readFileSync("reports/qdentsu2-20261103/ACCEPTANCE.json","utf8"));
const browser=await chromium.launch({headless:true, ...(process.argv[4] ? {executablePath:resolve(process.argv[4])} : {})});
const results={origin,contexts:"fresh non-persistent browser contexts; external requests aborted",rounds:[],figures:[],reference:null};
async function context() {
  const c=await browser.newContext({viewport:{width:1280,height:900},reducedMotion:"reduce"});
  await c.route("**/*",route=>new URL(route.request().url()).origin===origin ? route.continue() : route.abort());
  return c;
}
try {
  for(const round of ["2025-late","2026-early"]) {
    const c=await context(); const page=await c.newPage();
    const q=receipt.questions.find(q=>q.round===round && q.number===1);
    const url=`${origin}/quiz?mode=year&exam=tsushin2&year=${round.slice(0,4)}&season=${round.slice(5)}&session=gakka&order=1`;
    await page.goto(url,{waitUntil:"domcontentloaded",timeout:120000});
    const key=["ア","イ","ウ","エ"][q.officialAnswerNumbers[0]-1];
    await page.getByRole("radio",{name:new RegExp(`^選択肢 ${key}:`)}).click({timeout:120000});
    await expect(page.getByRole("region",{name:"正解の解説"})).toBeVisible();
    await expect.poll(()=>page.evaluate(()=>JSON.parse(localStorage.getItem("ipa-quiz:history:v1")??"{}").entries?.length??0)).toBe(1);
    const history=await page.evaluate(()=>JSON.parse(localStorage.getItem("ipa-quiz:history:v1")).entries);
    expect(history[0]).toMatchObject({id:q.id,selected:key,correct:true});
    await page.screenshot({path:resolve(evidence,`${round}-answered.png`),fullPage:true});
    await page.getByRole("button",{name:"次の問題へ",exact:true}).click();
    await expect(page.getByRole("radio").first()).toBeVisible();
    await expect(page).toHaveURL(/q2/);
    await page.reload({waitUntil:"domcontentloaded"});
    await expect(page.getByRole("radio").first()).toBeVisible({timeout:120000});
    expect(await page.evaluate(()=>JSON.parse(localStorage.getItem("ipa-quiz:history:v1")).entries)).toEqual(history);
    await page.goto(url,{waitUntil:"domcontentloaded"});
    await expect(page.getByRole("radio").first()).toBeVisible({timeout:120000});
    expect(await page.evaluate(()=>JSON.parse(localStorage.getItem("ipa-quiz:history:v1")).entries)).toEqual(history);
    results.rounds.push({round,answer:true,explanation:true,next:true,reload:true,revisit:true,history});
    await c.close();
  }
  const c=await context(); const page=await c.newPage();
  const ref=`${origin}/q/tsushin2/2025-late/gakka/q21`;
  const response=await page.goto(ref,{waitUntil:"domcontentloaded",timeout:120000});
  expect(response.status()).toBe(200);
  await expect(page.getByRole("region",{name:"参照専用の選択肢"})).toBeVisible();
  await expect(page.getByRole("region",{name:"参照専用の選択肢"}).locator("dl > div")).toHaveCount(4);
  expect(await page.getByRole("radio").count()).toBe(0);
  expect(await page.evaluate(()=>localStorage.getItem("ipa-quiz:history:v1"))).toBeNull();
  expect((await page.request.get(`${origin}/api/questions/next?id=tsushin2-2025-late-gakka-q21`)).status()).toBe(409);
  await page.screenshot({path:resolve(evidence,"reference-q21.png"),fullPage:true});
  results.reference={status:200,choices:4,gradingControls:0,history:null,ordinaryApiStatus:409};
  for(const image of receipt.images) {
    const q=receipt.questions.find(q=>q.id===image.id);
    const response=await page.goto(`${origin}/q/tsushin2/${q.round}/gakka/q${q.number}`,{waitUntil:"domcontentloaded",timeout:120000});
    expect(response.status()).toBe(200);
    const img=page.locator(`img[src="${image.url}"]`).first();
    await img.scrollIntoViewIfNeeded();
    await expect.poll(()=>img.evaluate(el=>el.complete && el.naturalWidth>0)).toBe(true);
    results.figures.push({id:q.id,url:image.url,...await img.evaluate(el=>({width:el.naturalWidth,height:el.naturalHeight}))});
  }
  await c.close();
  results.status="PASS";
} finally {
  writeFileSync(resolve(evidence,"BROWSER-ACCEPTANCE.json"),JSON.stringify(results,null,2)+"\n");
  await browser.close();
}
console.log("PASS: 2 ordinary sitting flows, reference boundary, 16 decoded figures");
