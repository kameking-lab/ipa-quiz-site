import { chromium, expect } from "@playwright/test";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
const origin="http://127.0.0.1:3275";
const output=resolve("reports/lq5-20261104/local-sources/browser");
mkdirSync(output,{recursive:true});
const beauty=[...JSON.parse(readFileSync("data/questions/biyoshi/2026-first.json","utf8")),...JSON.parse(readFileSync("data/questions/biyoshi/2026-second.json","utf8"))];
const hazard=[1,2,6].flatMap(i=>JSON.parse(readFileSync(`data/questions/kikenbutsu-otsu${i}/published-202606.json`,"utf8")));
const qs=[beauty.find(q=>q.qNumber===44),beauty.find(q=>q.season==="second"&&q.qNumber===47),...hazard.filter(q=>q.qNumber===26||q.qNumber===30)];
const browser=await chromium.launch({headless:true,...(process.argv[2]?{executablePath:resolve(process.argv[2])}:{})});
const result={status:"FAIL",runtime:process.argv[3]??"unspecified",browserVersion:browser.version(),serviceWorkers:"blocked (online acceptance)",externalRequests:"blocked",story:"accepted registry -> ordinary question page -> answer -> all choice reasons -> browser history retained after reload; holds remain unavailable",flows:[],holds:[],images:[],search:[],errors:[]};
try{
  for(const q of qs){
    const context=await browser.newContext({viewport:{width:q.qNumber===30?390:1280,height:900},serviceWorkers:"block"});
    // Restrict interception to external requests; localhost responses stream directly.
    await context.route(url=>url.origin!==origin,r=>r.abort());
    const page=await context.newPage();
    console.log("OPEN",q.id);
    page.on("pageerror",e=>{ result.errors.push({id:q.id,error:e.message,stack:e.stack}); console.error("PAGEERROR",q.id,e.message); });
    const url=`${origin}/q/${q.exam}/${q.year}-${q.season}/${q.session}/q${q.qNumber}`;
    const response=await page.goto(url,{waitUntil:"load",timeout:120000});
    expect(response.status()).toBe(200);
    const radios=page.getByRole("radio");
    await expect(radios).toHaveCount(Object.keys(q.choices).length,{timeout:120000});
    await expect(page.locator('[data-shortcuts-ready="true"]')).toBeVisible({timeout:120000});
    for(const image of q.imageUrls??[]){
      const img=page.locator(`img[src="${image}"]`).first();
      await img.scrollIntoViewIfNeeded();
      await expect.poll(()=>img.evaluate(el=>el.complete&&el.naturalWidth>0)).toBe(true);
      result.images.push({id:q.id,url:image,decoded:true});
    }
    if(q.exam==="kikenbutsu-otsu2"&&q.qNumber===30){
      expect(await page.locator("table").count()).toBe(1);
      expect(await page.locator("table tr").count()).toBe(6);
    }
    await radios.nth(Object.keys(q.choices).indexOf(q.answer)).click();
    await expect.poll(()=>page.evaluate(()=>JSON.parse(localStorage.getItem("ipa-quiz:history:v1")??"{}").entries?.length??0)).toBe(1);
    const history=await page.evaluate(()=>JSON.parse(localStorage.getItem("ipa-quiz:history:v1")).entries);
    expect(history[0]).toMatchObject({id:q.id,correct:true,selected:q.answer});
    const body=(await page.locator("body").innerText()).replace(/\s/g,"");
    for(const reason of Object.values(q.choiceExplanations)) expect(body).toContain(reason.replace(/\s/g,""));
    await page.screenshot({path:resolve(output,q.id+".png"),fullPage:true});
    await page.reload({waitUntil:"domcontentloaded",timeout:120000});
    await expect(page.getByRole("radio").first()).toBeVisible({timeout:120000});
    expect(await page.evaluate(()=>JSON.parse(localStorage.getItem("ipa-quiz:history:v1")).entries)).toEqual(history);
    const api=await page.request.get(`${origin}/api/questions/next?id=${encodeURIComponent(q.id)}`);
    expect(api.status()).toBe(200);
    expect((await api.json()).id).toBe(q.id);
    result.flows.push({id:q.id,httpStatus:200,scoring:true,allChoiceReasons:true,historyAfterReload:true,apiStatus:200});
    console.log("PASS",q.id);
    await context.close();
  }
  const context=await browser.newContext({serviceWorkers:"block"});const page=await context.newPage();
  await context.route(url=>url.origin!==origin,r=>r.abort());
  for(const [exam,total] of [["biyoshi",106],["tsushin2",129],["kikenbutsu-otsu1",10],["kikenbutsu-otsu2",10],["kikenbutsu-otsu6",10]]){
    const response=await page.request.get(`${origin}/api/search/questions?exam=${exam}`);
    expect(response.status()).toBe(200);
    expect((await response.json()).total).toBe(total);
    result.search.push({exam,status:200,total});
  }
  await page.goto(`${origin}/search?exam=biyoshi`,{waitUntil:"domcontentloaded",timeout:120000});
  await expect(page.getByRole("region",{name:"絞り込み"}).getByRole("button",{name:/美容師/})).toBeVisible({timeout:120000});
  result.searchUI={exam:"biyoshi",filterVisible:true};
  for(const q of JSON.parse(readFileSync("reports/lq5-20261104/holds.json","utf8")).filter(q=>q.id.startsWith("biyoshi"))){
    const m=/biyoshi-(\d+)-(first|second)-gakka-q(\d+)/.exec(q.id);
    expect((await page.goto(`${origin}/q/biyoshi/${m[1]}-${m[2]}/gakka/q${m[3]}`,{timeout:120000})).status()).toBe(404);
    expect((await page.request.get(`${origin}/api/questions/next?id=${q.id}`)).status()).toBe(404);
    result.holds.push({id:q.id,page:404,api:404});
  }
  await context.close();
  expect(result.errors).toEqual([]);
  result.status="PASS";
}finally{
  writeFileSync(resolve(output,"BROWSER-ACCEPTANCE.json"),JSON.stringify(result,null,2)+"\n");
  writeFileSync(resolve("reports/lq5-20261104/browser-acceptance.json"),JSON.stringify(result,null,2)+"\n");
  await browser.close();
}
