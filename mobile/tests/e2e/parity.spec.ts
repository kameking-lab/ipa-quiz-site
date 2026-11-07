import {expect,test,type BrowserContext,type Page} from "@playwright/test";
import {readFile,stat} from "node:fs/promises";
import {readFileSync} from "node:fs";
import {fileURLToPath} from "node:url";
import {createHash,sign} from "node:crypto";
import type {Question} from "../../../lib/questions/types";
import type {Material} from "../../shared/material-types";
import type {CatalogEntry,MobileEntitlement,MobileConfiguration} from "../../shared/contracts";
import type {ExamQuestion} from "../../../lib/exam-library-model";
const ORIGIN="https://www.kakomon-ai.jp";
const qs=JSON.parse(readFileSync(new URL("../../.cache/e2e-questions.json",import.meta.url),"utf8")) as Question[];
const entry:CatalogEntry={code:"ip",name:"ITパスポート",count:qs.length,years:[],sessions:[],categories:[],bytes:Buffer.byteLength(JSON.stringify(qs)),revision:createHash("sha256").update(JSON.stringify(qs)).digest("hex")};
async function routeLocal(context:BrowserContext,access?:MobileEntitlement,configuration:Partial<MobileConfiguration>={}){
  const requests:string[]=[];
  await context.route("**/*",async route=>{
    const url=new URL(route.request().url());requests.push(url.href);
    if(url.origin!==ORIGIN&&url.hostname!=="127.0.0.1"){await route.abort();return;}
    if(url.pathname==="/api/mobile/entitlement") {await route.fulfill({json:{entitlement:access??{userId:null,appUserId:null,entitled:false,source:"free",expiresAt:null,checkedAt:new Date().toISOString(),lease:null},configuration:{sdkKey:"",productId:"",offeringId:"",entitlement:"kakomon_pro",expectedPriceYen:980,leasePublicKey:"",...configuration}}});return;}
    if(url.pathname==="/api/mobile/catalog"){await route.fulfill({json:{exams:[entry]}});return;}
    if(url.pathname==="/api/mobile/paper-results") {
      const {answers}=route.request().postDataJSON();
      await route.fulfill({json:{results:answers.map((a:{id:string;choice:number|null})=>({id:a.id,choice:a.choice,result:a.choice===null?"unscored":a.choice===2?"correct":"incorrect"}))}});return;
    }
    if(url.pathname.startsWith("/api/")){await route.fulfill({status:503,json:{error:"mock_offline"}});return;}
    const path=fileURLToPath(new URL(`../../dist${url.pathname==="/"?"/index.html":url.pathname}`,import.meta.url));
    try {await stat(path);await route.fulfill({path});}catch{await route.abort();}
  });return requests;
}
async function seed(page:Page,questions:Array<{id:string}>=qs,metadata=entry){
  const keys=JSON.parse(await readFile(new URL("../../.cache/e2e-key.json",import.meta.url),"utf8"));
  const issuedAt=Date.now(),expiresAt=issuedAt+3600000;
  const payload=Buffer.from(JSON.stringify({version:1,userId:"mock-user",entitlement:"kakomon_pro",issuedAt,expiresAt})).toString("base64url");
  const access:MobileEntitlement={userId:"mock-user",appUserId:"mock-rc",entitled:true,source:"app-store",checkedAt:new Date().toISOString(),expiresAt:new Date(expiresAt).toISOString(),lease:`${payload}.${sign("sha256",Buffer.from(payload),{key:keys.privateKey,dsaEncoding:"ieee-p1363"}).toString("base64url")}`};
  await page.goto(ORIGIN+"/tests/e2e/harness.html");await page.waitForFunction(()=>!!window.mobileTest);
  await page.evaluate(async({questions,entry,access})=>window.mobileTest.seed(questions,entry,access),{questions,entry:metadata,access});
}
test("bundled full catalog works at first offline launch without a free question pack",async({page,context})=>{
  const errors:string[]=[];page.on("pageerror",e=>errors.push(e.message));const requests=await routeLocal(context);await context.setOffline(true);await page.goto(ORIGIN+"/index.html");
  await expect(page.getByRole("heading",{name:"全資格の過去問を、いつでも。"})).toBeVisible();await expect(page.getByText("オフライン",{exact:true})).toBeVisible();
  expect(await page.locator(".native-exam").count()).toBeGreaterThanOrEqual(197);
  await expect(page.getByRole("button",{name:"保存問題で学習",exact:true})).toHaveCount(0);
  expect(requests.some(r=>r.includes("/api/mobile/packs"))).toBe(false);expect(errors).toEqual([]);
  await page.screenshot({path:"test-results/catalog.png",fullPage:false});
});
test("alternative FP practical reader reuses the web view from a paid downloaded qualification",async({page,context})=>{
  await routeLocal(context);
  const material=JSON.parse(await readFile(new URL("../../.cache/e2e-material.json",import.meta.url),"utf8")) as Extract<Material,{kind:"fp3"}>;
  const rows=[material];const metadata:CatalogEntry={...entry,code:"material.fp3-practical",name:"FP3級 実技",count:1,material:true,revision:createHash("sha256").update(JSON.stringify(rows)).digest("hex")};
  await seed(page,rows,metadata);await context.setOffline(true);await page.goto(ORIGIN+"/index.html");
  await page.locator(".native-exam").filter({hasText:"FP3級 実技"}).first().click();await page.getByRole("button",{name:"保存問題で学習"}).click();
  await expect(page.getByRole("heading",{name:`${material.data.label} 実技 問${material.q.number}`,exact:true})).toBeVisible();
  await page.locator("summary").filter({hasText:"公式模範解答を見る"}).click();await expect(page.getByText(`${material.q.answer}. ${material.q.choices[material.q.answer-1]}`,{exact:true}).first()).toBeVisible();
});
test("paid qualification download uses shared quiz, keeps history on restart, and is disabled on revocation",async({page,context})=>{
  const errors:string[]=[];page.on("pageerror",e=>errors.push(e.message));await routeLocal(context);await seed(page);await context.setOffline(true);await page.goto(ORIGIN+"/index.html");
  await page.locator(".native-exam").filter({hasText:"ITパスポート"}).first().click();await page.getByRole("button",{name:"保存問題で学習"}).click();
  await expect(page.getByRole("radiogroup")).toBeVisible();await page.getByRole("radio").first().click();await expect(page.getByRole("button",{name:"次の問題へ",exact:true}).first()).toBeVisible();
  await page.screenshot({path:"test-results/shared-quiz.png",fullPage:false});
  await page.getByRole("button",{name:"資格一覧",exact:true}).click();await page.locator("summary").filter({hasText:"その他の機能"}).click();await expect(page.getByText(/1問 · 正解/)).toBeVisible();await page.reload();await page.locator("summary").filter({hasText:"その他の機能"}).click();await expect(page.getByText(/1問 · 正解/)).toBeVisible();
  await page.goto(ORIGIN+"/tests/e2e/harness.html");await page.waitForFunction(()=>!!window.mobileTest);await page.evaluate(()=>window.mobileTest.invalidate());await page.goto(ORIGIN+"/index.html");
  await page.locator(".native-exam").filter({hasText:"ITパスポート"}).first().click();await page.getByRole("button",{name:"保存問題で学習"}).click();await expect(page.getByRole("status")).toContainText("有料会員専用");await expect(page.getByRole("radiogroup")).toHaveCount(0);expect(errors).toEqual([]);
});
test("free membership explains paid-only downloads and never requests the download endpoint",async({page,context})=>{
  const requests=await routeLocal(context);await page.goto(ORIGIN+"/tests/e2e/harness.html");await page.waitForFunction(()=>!!window.mobileTest);await page.evaluate(()=>window.mobileTest.showMembership());
  await expect(page.getByText("無料会員",{exact:true})).toBeVisible();await page.locator("summary").filter({hasText:"資格ごとの事前ダウンロード"}).click();await page.getByRole("button",{name:"有料特典を見る"}).click();await expect(page.getByRole("status")).toContainText("無料でもオンラインで全資格から1日10問");expect(requests.some(r=>r.includes("/api/mobile/download"))).toBe(false);
  await expect(page.getByRole("link",{name:"利用規約",exact:true})).toHaveAttribute("href",ORIGIN+"/terms");await expect(page.getByRole("link",{name:"プライバシーポリシー",exact:true})).toHaveAttribute("href",ORIGIN+"/privacy");
});
test("existing web subscribers see no second purchase, with restore and App Store management available",async({page,context})=>{
  const access:MobileEntitlement={userId:"web-user",appUserId:"mock-rc",entitled:true,source:"web",expiresAt:new Date(Date.now()+3600000).toISOString(),checkedAt:new Date().toISOString(),lease:null};
  await routeLocal(context,access);await page.goto(ORIGIN+"/tests/e2e/harness.html");await page.waitForFunction(()=>!!window.mobileTest);await page.evaluate(()=>window.mobileTest.showMembership());
  await expect(page.getByText("ウェブの有料会員です。追加購入は不要です。",{exact:true})).toBeVisible();await expect(page.getByRole("button",{name:/月で登録/})).toHaveCount(0);await expect(page.getByRole("button",{name:"購入を復元"})).toBeVisible();await expect(page.getByRole("button",{name:"App Storeで管理・解約"})).toBeVisible();
});
async function openMockStore(page:Page,context:BrowserContext,scenario:Parameters<Window["mobileTest"]["mockStore"]>[0]) {
  const access:MobileEntitlement={userId:"mock-store-user",appUserId:"mock-rc",entitled:false,source:"free",expiresAt:null,checkedAt:new Date().toISOString(),lease:null};
  await routeLocal(context,access,{sdkKey:"mock-sdk-key",productId:"mock.monthly",offeringId:"main"});
  await page.goto(ORIGIN+"/tests/e2e/harness.html");await page.waitForFunction(()=>!!window.mobileTest);
  await page.evaluate(scenario=>{window.mobileTest.mockStore(scenario);window.mobileTest.showMembership();},scenario);
  await expect(page.getByRole("button",{name:"¥980 / 月で登録",exact:true})).toBeEnabled();
}
test("a changed store price does not start a purchase or leave the membership locked as pending",async({page,context})=>{
  await openMockStore(page,context,"changed-price");await page.getByRole("button",{name:"¥980 / 月で登録",exact:true}).click();
  await expect(page.getByRole("status")).toContainText("月額商品の設定・価格");
  await expect(page.getByRole("button",{name:"¥980 / 月で登録",exact:true})).toBeEnabled();
  expect((await page.evaluate(()=>window.mobileTest.storeCalls())).purchases).toBe(0);
  await expect(page.getByText("購入内容をサーバーで確認中です。",{exact:false})).toHaveCount(0);
});
test("cancelled purchases allow retry while pending approval survives a reload and prevents another purchase",async({page,context})=>{
  await openMockStore(page,context,"cancelled");const buy=page.getByRole("button",{name:"¥980 / 月で登録",exact:true});
  await buy.click();await expect(page.getByRole("status")).toHaveText("購入をキャンセルしました。");await expect(buy).toBeEnabled();
  await page.evaluate(()=>window.mobileTest.mockStore("pending"));await buy.click();
  await expect(page.getByRole("status").first()).toContainText("購入の承認待ち");await expect(buy).toBeDisabled();
  expect((await page.evaluate(()=>window.mobileTest.storeCalls())).purchases).toBe(2);
  await page.reload();await page.waitForFunction(()=>!!window.mobileTest);
  await page.evaluate(()=>{window.mobileTest.mockStore("pending");window.mobileTest.showMembership();});
  await expect(page.getByRole("button",{name:"¥980 / 月で登録",exact:true})).toBeDisabled();
  await expect(page.getByText("購入内容をサーバーで確認中です。",{exact:false})).toBeVisible();
  expect((await page.evaluate(()=>window.mobileTest.storeCalls())).purchases).toBe(0);
});
test("restore with no verified entitlement explains the missing purchase instead of reporting success",async({page,context})=>{
  await openMockStore(page,context,"no-restorable-purchase");await page.getByRole("button",{name:"購入を復元",exact:true}).click();
  await expect(page.getByRole("status")).toContainText("有効な購入をサーバーで確認できませんでした");
  await expect(page.getByText("無料会員",{exact:true})).toBeVisible();
  expect((await page.evaluate(()=>window.mobileTest.storeCalls())).restores).toBe(1);
});

test("qualification dates require confirmation, recheck before saving and fall back to the in-app browser",async({page,context})=>{
  const requests=await routeLocal(context);await page.goto(ORIGIN+"/tests/e2e/harness.html");await page.waitForFunction(()=>!!window.mobileTest);
  await page.evaluate(()=>window.mobileTest.showQualification("saved"));
  await page.getByRole("button",{name:"次の資格で申込方法・日程・関連資格を見る"}).click();
  await page.getByRole("button",{name:"試験日・申込締切を取得・再確認"}).click();
  await expect(page.getByRole("button",{name:"カレンダーに追加"})).toHaveCount(2);
  await page.getByRole("button",{name:"カレンダーに追加"}).first().click();
  await expect(page.getByRole("status")).toHaveText("カレンダーに保存しました。");
  expect((await page.getByRole("button",{name:"カレンダーに追加"}).first().boundingBox())!.height).toBeGreaterThanOrEqual(44);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth)).toBe(true);
  expect(await page.evaluate(()=>window.mobileTest.qualificationCalls())).toEqual({universal:["https://tsugino-shikaku.jp/shikaku/care-worker"],browser:["https://tsugino-shikaku.jp/shikaku/care-worker"],editors:1,fetches:2});
  expect(requests.some(url=>url.includes("tsugino-shikaku.jp"))).toBe(false);
  await page.screenshot({path:"test-results/qualification-calendar.png",fullPage:false});
});

test("unconfirmed dates have no add button and an installed target app avoids browser fallback",async({page,context})=>{
  await routeLocal(context);await page.goto(ORIGIN+"/tests/e2e/harness.html");await page.waitForFunction(()=>!!window.mobileTest);
  await page.evaluate(()=>window.mobileTest.showQualification("unconfirmed"));
  await page.getByRole("button",{name:"試験日・申込締切を取得・再確認"}).click();
  await expect(page.getByText(/追加できる確定日程はありません/)).toBeVisible();
  await expect(page.getByRole("button",{name:"カレンダーに追加"})).toHaveCount(0);
  await page.reload();await page.waitForFunction(()=>!!window.mobileTest);await page.evaluate(()=>window.mobileTest.showQualification("app-installed"));
  await page.getByRole("button",{name:"次の資格で申込方法・日程・関連資格を見る"}).click();
  expect((await page.evaluate(()=>window.mobileTest.qualificationCalls())).browser).toEqual([]);
  await page.getByRole("button",{name:"試験日・申込締切を取得・再確認"}).click();
  await page.getByRole("button",{name:"カレンダーに追加"}).first().click();
  await expect(page.getByRole("status")).toHaveText("保存をキャンセルしました。");
});

test("server denial never renders the eleventh question and AI refusal sends nothing",async({page,context})=>{
  await routeLocal(context);const used=new Set<string>();
  await context.route("**/api/billing/question",async route=>{
    const body=route.request().postDataJSON() as {id:string};
    if(!used.has(body.id)&&used.size>=10){await route.fulfill({status:429,json:{error:"daily_limit"}});return;}
    used.add(body.id);await route.fulfill({json:{question:{...qs[0],id:body.id,question:`許可された本文${used.size}`},access:{kind:"trial",remaining:10-used.size,freeDaily:10,resetAt:"2099-01-01",retryAfter:null}}});
  });
  await page.goto(ORIGIN+"/tests/e2e/harness.html");await page.waitForFunction(()=>!!window.mobileTest);await page.evaluate(()=>window.mobileTest.showContent());
  for(let i=1;i<=10;i++){await page.getByLabel("問題を選択").selectOption(`mock-${i}`);await expect(page.getByRole("radiogroup")).toBeVisible();}
  await page.getByLabel("問題を選択").selectOption("mock-11");await expect(page.getByRole("alert")).toContainText("無料10問");await expect(page.getByRole("radiogroup")).toHaveCount(0);expect(used.size).toBe(10);
  page.once("dialog",dialog=>dialog.dismiss());expect(await page.evaluate(()=>window.mobileTest.aiConsent())).toBe(false);
});
test("unviewed diagram survives save, restart and airplane mode",async({page,context})=>{
  await routeLocal(context);
  await context.route("**/images/e2e-unviewed.svg",route=>route.fulfill({contentType:"image/svg+xml",body:'<svg xmlns="http://www.w3.org/2000/svg" width="80" height="40"><rect width="80" height="40" fill="blue"/></svg>'}));
  const questions=[{...qs[0],hasImage:true,imageUrls:["/images/e2e-unviewed.svg"]}];
  const metadata={...entry,count:1,revision:createHash("sha256").update(JSON.stringify(questions)).digest("hex")};
  await seed(page,questions,metadata);await context.setOffline(true);await page.goto(ORIGIN+"/index.html");
  await page.locator(".native-exam").filter({hasText:"ITパスポート"}).first().click();await page.getByRole("button",{name:"保存問題で学習"}).click();
  const image=page.locator('img[src^="data:image/svg+xml"]').first();await expect(image).toBeVisible();expect(await image.evaluate((img:HTMLImageElement)=>img.naturalWidth)).toBeGreaterThan(0);
});
test("account deletion requires explicit confirmation and recent login",async({page,context})=>{
  await routeLocal(context);let calls=0;
  await context.route("**/api/account/delete",async route=>{calls++;await route.fulfill({status:401,json:{error:"reauthentication_required"}});});
  await page.goto(ORIGIN+"/tests/e2e/harness.html");await page.waitForFunction(()=>!!window.mobileTest);await page.evaluate(()=>window.mobileTest.showDeletion());
  await expect(page.getByRole("button",{name:"アカウントとデータを完全に削除"})).toBeDisabled();
  await page.getByRole("textbox").fill("DELETE");await page.getByRole("button",{name:"アカウントとデータを完全に削除"}).click();
  await expect(page.getByRole("button",{name:"再ログインして本人確認"})).toBeVisible();expect(calls).toBe(1);
});

// Expected images come directly from the display registry, independently of saveAssets.
const answerRegistry=JSON.parse(readFileSync(new URL("../../../data/exam-library/answer-figures.json",import.meta.url),"utf8")) as Record<string,{src:string;alt:string}[]>;
const figureFixtures=JSON.parse(readFileSync(new URL("../../.cache/e2e-answer-figures.json",import.meta.url),"utf8")) as {entry:CatalogEntry;question:ExamQuestion}[];
for(const fixture of figureFixtures) test(`unviewed answer figures survive Cache purge, cold restart and offline enlargement: ${fixture.question.id}`,async({page,context})=>{
  await routeLocal(context);let airplane=false;
  await context.route("**/exam-library/**",async route=>{
    if(airplane){await route.abort("internetdisconnected");return;}
    const path=fileURLToPath(new URL(`../../../public${new URL(route.request().url()).pathname}`,import.meta.url));
    await route.fulfill({path});
  });
  const rows=[fixture.question],metadata={...fixture.entry,count:1,revision:createHash("sha256").update(JSON.stringify(rows)).digest("hex")};
  await seed(page,rows,metadata);expect(await page.locator("figure").count()).toBe(0);
  await page.evaluate(()=>window.paperTest.purgeCache());
  const cdp=await context.newCDPSession(page);await cdp.send("Network.clearBrowserCache");await cdp.detach();
  await page.close();airplane=true;await context.setOffline(true);
  const restarted=await context.newPage();await restarted.goto(ORIGIN+"/index.html");
  await restarted.locator(".native-exam").filter({hasText:fixture.entry.name}).first().click();await restarted.getByRole("button",{name:"保存問題で学習"}).click();
  await restarted.getByRole("button",{name:"模範解答を見る",exact:true}).click();
  for(const expected of answerRegistry[fixture.question.id]) {
    const button=restarted.getByRole("button",{name:`${expected.alt}を拡大`,exact:true});
    const img=button.getByRole("img",{name:expected.alt,exact:true});
    await expect(img).toBeVisible();await expect(img).toHaveAttribute("src",/^data:image\//);
    expect(await img.evaluate((img:HTMLImageElement)=>img.complete&&img.naturalWidth>0)).toBe(true);
    await button.click();const dialog=restarted.getByRole("dialog",{name:`${expected.alt}の拡大図`,exact:true});
    await expect(dialog).toBeVisible();const expanded=dialog.getByRole("img");
    await expect(expanded).toHaveAttribute("src",await img.getAttribute("src") as string);
    expect(await expanded.evaluate((img:HTMLImageElement)=>img.complete&&img.naturalWidth>0)).toBe(true);
    await dialog.getByRole("button",{name:"拡大図を閉じる"}).click();
  }
});

const paperRows:ExamQuestion[]=Array.from({length:11},(_,i)=>({id:`lckohyo-TEST01-q${i+1}`,number:i+1,text:`許可本文${i+1}`,images:[],choiceCount:3,correctChoice:2,answerAuthority:"official"}));
const paperIndex=paperRows.map(({id,number,choiceCount,answerAuthority})=>({id,number,choiceCount,answerAuthority,scorable:true}));
for(const paid of [false,true])for(const save of [false,true])test(`whole-paper progress and wrong review after reload: paid=${paid}, save=${save}`,async({page,context})=>{
  await routeLocal(context);const granted=new Set<string>();
  await context.route("**/api/billing/question",async route=>{
    const {id}=route.request().postDataJSON() as {id:string};
    if(!paid&&!granted.has(id)&&granted.size>=10){await route.fulfill({status:429,json:{error:"daily_limit"}});return;}
    granted.add(id);await route.fulfill({json:{question:paperRows.find(q=>q.id===id)}});
  });
  await page.goto(ORIGIN+"/tests/e2e/harness.html");await page.waitForFunction(()=>!!window.paperTest);
  await page.evaluate(index=>window.paperTest.show(index),paperIndex);
  await expect(page.getByText("許可本文1",{exact:true})).toBeVisible();expect([...granted]).toEqual([paperRows[0].id]);
  if(save)await page.getByRole("checkbox",{name:"この端末に保存する"}).check();
  await page.getByRole("radio",{name:/^選択肢 1:/}).click();await page.getByRole("button",{name:"次の問題へ",exact:true}).click();
  await expect(page.getByText("許可本文2",{exact:true})).toBeVisible();await page.getByRole("radio",{name:/^選択肢 2:/}).click();
  await page.getByRole("button",{name:"前へ",exact:true}).click();await expect(page.getByRole("radio",{name:/^選択肢 1:/})).toHaveAttribute("aria-checked","true");
  await page.reload();await page.waitForFunction(()=>!!window.paperTest);await page.evaluate(index=>window.paperTest.show(index),paperIndex);
  await expect(page.getByRole("radio",{name:/^選択肢 1:/})).toHaveAttribute("aria-checked","true");
  await page.getByRole("button",{name:"結果を見る",exact:true}).click();await expect(page.getByText("2／11問",{exact:true})).toBeVisible();
  await expect(page.locator("dt").filter({hasText:/^正解$/}).locator("..")).toContainText("1問");
  await expect(page.locator("dt").filter({hasText:/^不正解$/}).locator("..")).toContainText("1問");
  await page.getByRole("button",{name:"間違えた1問を解き直す",exact:true}).click();await expect(page.getByText("解き直し 1問目／1問",{exact:true})).toBeVisible();
  expect([...granted]).toEqual(paperRows.slice(0,2).map(q=>q.id));
});
test("middle-paper resume requests only the specified question",async({page,context})=>{
  await routeLocal(context);const ids:string[]=[];
  await context.route("**/api/billing/question",async route=>{const {id}=route.request().postDataJSON();ids.push(id);await route.fulfill({json:{question:paperRows.find(q=>q.id===id)}});});
  await page.goto(ORIGIN+"/tests/e2e/harness.html");await page.waitForFunction(()=>!!window.paperTest);
  await page.evaluate(index=>window.paperTest.show(index,"lckohyo-TEST01-q6"),paperIndex);
  await expect(page.getByText("許可本文6",{exact:true})).toBeVisible();expect(ids).toEqual([paperRows[5].id]);
});
test("deletion page opens existing web management without checkout and remains usable on portal failure",async({page,context})=>{
  await routeLocal(context);let portal=0;
  await context.route("**/api/billing/portal",async route=>{portal++;await route.fulfill({status:503,json:{error:"unavailable"}});});
  await page.goto(ORIGIN+"/tests/e2e/harness.html");await page.waitForFunction(()=>!!window.paperTest);await page.evaluate(()=>window.paperTest.showDeletion());
  await page.getByRole("button",{name:"ウェブ契約の管理・解約",exact:true}).click();await expect(page.getByRole("alert")).toBeVisible();expect(portal).toBe(1);
  await page.getByRole("textbox").fill("DELETE");await expect(page.getByRole("button",{name:"アカウントとデータを完全に削除"})).toBeEnabled();
});
for(const paid of [false,true])for(const save of [false,true])test(`cold restart respects progress save opt-in: paid=${paid}, save=${save}`,async({page,context})=>{
  await routeLocal(context);const ids=new Set<string>();
  await context.route("**/api/billing/question",async route=>{
    const {id}=route.request().postDataJSON();
    if(!paid&&!ids.has(id)&&ids.size>=10){await route.fulfill({status:429,json:{error:"daily_limit"}});return;}
    ids.add(id);await route.fulfill({json:{question:paperRows.find(q=>q.id===id)}});
  });
  await page.goto(ORIGIN+"/tests/e2e/harness.html");await page.waitForFunction(()=>!!window.paperTest);await page.evaluate(index=>window.paperTest.show(index),paperIndex);
  await expect(page.getByText("許可本文1",{exact:true})).toBeVisible();
  if(save)await page.getByRole("checkbox",{name:"この端末に保存する"}).check();
  await page.getByRole("radio",{name:/^選択肢 1:/}).click();await page.getByRole("button",{name:"次の問題へ",exact:true}).click();
  await expect(page.getByText("許可本文2",{exact:true})).toBeVisible();await page.getByRole("radio",{name:/^選択肢 2:/}).click();
  await page.getByRole("button",{name:"前へ",exact:true}).click();await expect(page.getByText("許可本文1",{exact:true})).toBeVisible();
  await page.close();const restarted=await context.newPage();await restarted.goto(ORIGIN+"/tests/e2e/harness.html");await restarted.waitForFunction(()=>!!window.paperTest);
  await restarted.evaluate(index=>window.paperTest.show(index,undefined,"summary"),paperIndex);
  await expect(restarted.getByText(`${save?2:0}／11問`,{exact:true})).toBeVisible();
  if(save){await restarted.getByRole("button",{name:"間違えた1問を解き直す",exact:true}).click();await expect(restarted.getByText("解き直し 1問目／1問",{exact:true})).toBeVisible();}
  else await expect(restarted.getByRole("button",{name:"間違えた1問を解き直す",exact:true})).toHaveCount(0);
  expect([...ids]).toEqual(paperRows.slice(0,2).map(q=>q.id));
});

for(const initiallyPaid of [false,true])for(const save of [false,true])for(const used of [4,10])test(`11-answer history crosses JST midnight: paid-to-free=${initiallyPaid}, save=${save}, used=${used}`,async({page,context})=>{
  test.setTimeout(60000);
  await routeLocal(context);
  const rows=[...paperRows,{...paperRows[0],id:"lckohyo-TEST01-q12",number:12,text:"許可本文12"}];
  const index=rows.map(({id,number,choiceCount,answerAuthority})=>({id,number,choiceCount,answerAuthority,scorable:true}));
  let paid=initiallyPaid,day="2026-11-03";
  const daily=new Map<string,Set<string>>(),history=new Set<string>(),bodies:string[]=[];
  await context.route("**/api/billing/question",async route=>{
    const {id}=route.request().postDataJSON();bodies.push(id);
    const today=daily.get(day)??new Set<string>();daily.set(day,today);
    if(!paid&&!today.has(id)&&today.size>=10){await route.fulfill({status:429,json:{error:"daily_limit"}});return;}
    if(!paid)today.add(id);history.add(id);
    await route.fulfill({json:{question:{...rows.find(q=>q.id===id),reviewProof:"a".repeat(64)}}});
  });
  await context.route("**/api/mobile/paper-results",async route=>{
    const {answers}=route.request().postDataJSON();
    expect(answers.every((a:{id:string})=>history.has(a.id))).toBe(true);
    expect(answers.every((a:Record<string,unknown>)=>!("memo" in a))).toBe(true);
    await route.fulfill({json:{results:answers.map((a:{id:string;choice:number})=>({id:a.id,choice:a.choice,result:a.choice===2?"correct":"incorrect"}))}});
  });
  await page.goto(ORIGIN+"/tests/e2e/harness.html");await page.waitForFunction(()=>!!window.paperTest);
  await page.clock.setFixedTime(new Date("2026-11-03T14:59:59Z"));
  await page.evaluate(index=>window.paperTest.show(index),index);
  if(save)await page.getByRole("checkbox",{name:"この端末に保存する"}).check();
  for(let n=1;n<=10;n++) {
    await expect(page.getByText(`許可本文${n}`,{exact:true})).toBeVisible();
    await page.getByRole("radio",{name:new RegExp(`^選択肢 ${n%2?1:2}:`)}).click();
    if(n<10)await page.getByRole("button",{name:"次の問題へ",exact:true}).click();
  }
  // Ten bodies on the first JST day, then a new permitted question after midnight.
  if(!paid)expect(daily.get(day)?.size).toBe(10);
  day="2026-11-04";await page.clock.setFixedTime(new Date("2026-11-03T15:00:00Z"));
  await page.getByRole("button",{name:"次の問題へ",exact:true}).click();await expect(page.getByText("許可本文11",{exact:true})).toBeVisible();
  await page.getByRole("radio",{name:/^選択肢 1:/}).click();await page.getByRole("button",{name:"結果を見る",exact:true}).click();
  daily.set(day,new Set([rows[10].id,...Array.from({length:used-1},(_,i)=>`other-exam-${i}`)]));paid=false;
  await page.evaluate(()=>window.dispatchEvent(new Event("mobile:entitlement-changed")));
  const previousBodies=bodies.length;
  let current=page;
  if(save){await page.close();current=await context.newPage();await current.goto(ORIGIN+"/tests/e2e/harness.html");}
  else await current.reload();
  await current.waitForFunction(()=>!!window.paperTest);await current.evaluate(index=>window.paperTest.show(index,undefined,"summary"),index);
  await expect(current.getByText("11／12問",{exact:true})).toBeVisible();
  await expect(current.getByRole("button",{name:"間違えた6問を解き直す",exact:true})).toBeVisible();
  expect(bodies.length).toBe(previousBodies);expect(daily.get(day)?.size).toBe(used);
  await current.getByRole("button",{name:"問11を開く",exact:true}).click();await expect(current.getByText("許可本文11",{exact:true})).toBeVisible();
  await current.getByRole("button",{name:"この問題をもう一度解く",exact:true}).click();
  await current.getByRole("radio",{name:/^選択肢 1:/}).click();
  await current.getByRole("button",{name:"結果を見る",exact:true}).click();
  await current.getByRole("button",{name:"間違えた6問を解き直す",exact:true}).click();
  if(used===10) {
    await expect(current.getByRole("alert")).toContainText("無料10問");
    await current.getByRole("button",{name:"結果を見る",exact:true}).click();
    await expect(current.getByText("11／12問",{exact:true})).toBeVisible();
  } else await expect(current.getByText("許可本文1",{exact:true})).toBeVisible();
  // Reopening history only charges bodies deliberately opened by the learner.
  expect(bodies.slice(previousBodies)).toEqual([rows[10].id,rows[0].id]);
  expect(await current.getByText("許可本文12",{exact:true}).count()).toBe(0);
});
