import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { readFileSync, readdirSync, writeFileSync, mkdirSync } from "node:fs";
import { createHash } from "node:crypto";
import { chromium } from "@playwright/test";
import { SentakuReader } from "../app/sharoushi/sentaku/_components/reader";
import { getSentakuQuestion } from "../lib/sharoushi/sentaku";
async function main(){
const out=process.argv[2] ?? "test-results/sentaku-mobile";mkdirSync(out,{recursive:true});
const cssFiles=readdirSync(".next/static/css").filter(f=>f.endsWith(".css"));const css=cssFiles.map(f=>readFileSync(`.next/static/css/${f}`,"utf8")).join("\n");
const browser=await chromium.launch({headless:true});const results=[];
for(const [year,number] of [["2025","4"],["2026","2"]]){
const q=getSentakuQuestion(year,number)!;const html=renderToStaticMarkup(<SentakuReader question={q}/>);
const page=await browser.newPage({viewport:{width:390,height:844}});
await page.route("**/*",route=>route.abort());await page.setContent(`<!doctype html><html lang="ja"><head><meta charset="utf-8"><style>${css}</style></head><body>${html}</body></html>`);
const answers=page.getByTestId("sentaku-answers");const closed=await answers.getAttribute("open")===null;
const before=await page.evaluate(()=>({width:document.documentElement.clientWidth,scrollWidth:document.documentElement.scrollWidth}));
const labels=await page.locator('[aria-label="語群"] li').count();
await page.screenshot({path:`${out}/${year}-${number}-390.png`,fullPage:true});
await answers.locator("summary").click();const open=await answers.getAttribute("open")!==null;const visible=await answers.locator("h2").count();
const after=await page.evaluate(()=>({width:document.documentElement.clientWidth,scrollWidth:document.documentElement.scrollWidth}));
const pass=closed&&open&&visible===5&&labels===20&&before.scrollWidth<=before.width&&after.scrollWidth<=after.width;
results.push({year,number,closedInitially:closed,opensOnClick:open,answerFields:visible,bankWords:labels,before,after,pass});await page.close();
}
await browser.close();writeFileSync(`${out}/QA.json`,JSON.stringify({fixture:"Actual server reader + webpack production CSS; 390px",cssFiles,cssSha256:createHash("sha256").update(css).digest("hex"),results,pass:results.every(r=>r.pass)},null,2));
console.log(JSON.stringify(results));if(!results.every(r=>r.pass))process.exitCode=1;
}main();
