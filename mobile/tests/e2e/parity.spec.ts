import {expect,test,type BrowserContext,type Page} from "@playwright/test";
import {readFile,stat} from "node:fs/promises";
import {readFileSync} from "node:fs";
import {fileURLToPath} from "node:url";
import {createHash,sign} from "node:crypto";
import type {Question} from "../../../lib/questions/types";
import type {Material} from "../../shared/material-types";
import type {CatalogEntry,MobileEntitlement,MobileConfiguration} from "../../shared/contracts";
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
  await page.locator(".native-exam").filter({hasText:"FP3級 実技"}).getByRole("button",{name:"保存問題で学習"}).click();
  await expect(page.getByRole("heading",{name:`${material.data.label} 実技 問${material.q.number}`,exact:true})).toBeVisible();
  await page.locator("summary").filter({hasText:"公式模範解答を見る"}).click();await expect(page.getByText(`${material.q.answer}. ${material.q.choices[material.q.answer-1]}`,{exact:true}).first()).toBeVisible();
});
test("paid qualification download uses shared quiz, keeps history on restart, and is disabled on revocation",async({page,context})=>{
  const errors:string[]=[];page.on("pageerror",e=>errors.push(e.message));await routeLocal(context);await seed(page);await context.setOffline(true);await page.goto(ORIGIN+"/index.html");
  const exam=page.locator(".native-exam").filter({hasText:"ITパスポート"});await exam.getByRole("button",{name:"保存問題で学習"}).click();
  await expect(page.getByRole("radiogroup")).toBeVisible();await page.getByRole("radio").first().click();await expect(page.getByRole("button",{name:"次の問題へ",exact:true}).first()).toBeVisible();
  await page.screenshot({path:"test-results/shared-quiz.png",fullPage:false});
  await page.getByRole("button",{name:"資格目次",exact:true}).click();await expect(page.getByText(/1問 · 正解/)).toBeVisible();await page.reload();await expect(page.getByText(/1問 · 正解/)).toBeVisible();
  await page.goto(ORIGIN+"/tests/e2e/harness.html");await page.waitForFunction(()=>!!window.mobileTest);await page.evaluate(()=>window.mobileTest.invalidate());await page.goto(ORIGIN+"/index.html");
  await page.locator(".native-exam").filter({hasText:"ITパスポート"}).getByRole("button",{name:"保存問題で学習"}).click();await expect(page.getByRole("status")).toContainText("有料会員専用");await expect(page.getByRole("radiogroup")).toHaveCount(0);expect(errors).toEqual([]);
});
test("free membership explains paid-only downloads and never requests the download endpoint",async({page,context})=>{
  const requests=await routeLocal(context);await page.goto(ORIGIN+"/tests/e2e/harness.html");await page.waitForFunction(()=>!!window.mobileTest);await page.evaluate(()=>window.mobileTest.showMembership());
  await expect(page.getByText("無料会員",{exact:true})).toBeVisible();await page.getByRole("button",{name:"有料特典を見る"}).click();await expect(page.getByRole("status")).toContainText("無料でもオンラインで全資格から1日10問");expect(requests.some(r=>r.includes("/api/mobile/download"))).toBe(false);
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
