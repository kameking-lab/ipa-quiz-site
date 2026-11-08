import {expect,test,type BrowserContext,type Page} from "@playwright/test";
import {stat} from "node:fs/promises";
import {fileURLToPath} from "node:url";
import type {MobileEntitlement} from "../../shared/contracts";
// End-to-end App Store flow with the RevenueCat SDK stubbed at the adapter
// boundary (StoreKit cannot run outside a device). Runs in the default project
// and, for the iPhone check, with playwright.webkit.config.ts (iPhone 15 Pro,
// 59px status bar / Dynamic Island inset).
const ORIGIN="https://www.kakomon-ai.jp";
interface Server { user: string|null; entitledAfterPurchase: boolean; requests: string[] }
const free=(user:string|null):MobileEntitlement=>({userId:user,appUserId:user?"kakomon_opaque":null,entitled:false,source:"free",expiresAt:null,checkedAt:new Date().toISOString(),lease:null});
async function serve(context:BrowserContext,page:Page,server:Server){
  await context.route("**/*",async route=>{
    const url=new URL(route.request().url());server.requests.push(url.pathname);
    if(url.origin!==ORIGIN&&url.hostname!=="127.0.0.1"){await route.abort();return;}
    if(url.pathname==="/api/mobile/entitlement"){
      // The server only grants after it has seen the store purchase (RevenueCat API).
      const purchased=server.entitledAfterPurchase&&await page.evaluate(()=>window.mobileTest.storeCalls().purchases>0).catch(()=>false);
      const entitlement=purchased&&server.user?{...free(server.user),entitled:true,source:"app-store" as const,expiresAt:new Date(Date.now()+30*86400000).toISOString()}:free(server.user);
      await route.fulfill({json:{entitlement,configuration:{sdkKey:"appl_mock_public_key",productId:"mock.monthly",offeringId:"main",entitlement:"kakomon_pro",expectedPriceYen:980,leasePublicKey:""}}});return;
    }
    if(url.pathname==="/api/mobile/catalog"){await route.fulfill({json:{exams:[]}});return;}
    if(url.pathname.startsWith("/api/")){await route.fulfill({status:503,json:{error:"mock_offline"}});return;}
    const path=fileURLToPath(new URL(`../../dist${url.pathname==="/"?"/index.html":url.pathname}`,import.meta.url));
    try {await stat(path);await route.fulfill({path});}catch{await route.abort();}
  });
}
async function open(page:Page,scenario:Parameters<Window["mobileTest"]["mockStore"]>[0],hash=""){
  await page.goto(`${ORIGIN}/tests/e2e/harness.html${hash}`);await page.waitForFunction(()=>!!window.mobileTest);
  await page.evaluate(scenario=>{
    // The real app publishes the device insets as CSS variables (QualificationBridgeViewController).
    document.documentElement.classList.add("native-app");document.documentElement.style.setProperty("--native-safe-top","59px");
    window.mobileTest.mockStore(scenario);window.mobileTest.showMembership();
  },scenario);
}
test("signed out: price is visible, 登録 opens sign-in, and the purchase continues by itself after returning",async({page,context},info)=>{
  const server:Server={user:null,entitledAfterPurchase:true,requests:[]};await serve(context,page,server);
  await open(page,"success");
  const buy=page.getByRole("button",{name:"¥980 / 月で登録",exact:true});
  await expect(buy).toBeEnabled();
  await expect(page.getByText("登録ボタンを押すとログイン画面が開き",{exact:false})).toBeVisible();
  await page.screenshot({path:info.outputPath("1-signed-out-price.png")});
  await buy.click();
  await expect(page.getByRole("status")).toContainText("ログインが終わると、そのまま購入画面に進みます。");
  let calls=await page.evaluate(()=>window.mobileTest.storeCalls());
  expect(calls.signIns).toEqual(["/tests/e2e/harness.html#app-settings"]);expect(calls.purchases).toBe(0);
  // Price lookup ran with an anonymous SDK; nothing was bought as a guest.
  expect(calls.identities).toEqual(["anonymous"]);
  // Sign-in completes (system browser → app) and the page reloads at the return URL.
  server.user="web-and-app-user";
  await open(page,"success","#app-settings");
  await expect(page.getByRole("status")).toContainText("購入を確認しました。有料会員の機能を利用できます（ウェブでも同じ会員です）。");
  await expect(page.getByText("App Storeの有料会員です。",{exact:true})).toBeVisible();
  calls=await page.evaluate(()=>window.mobileTest.storeCalls());
  expect(calls.purchases).toBe(1);expect(calls.identities.at(-1)).toBe("kakomon_opaque");
  await page.screenshot({path:info.outputPath("2-purchased.png")});
});
test("signed out: 購入を復元 signs in first, then restores and reports the server result",async({page,context})=>{
  const server:Server={user:null,entitledAfterPurchase:false,requests:[]};await serve(context,page,server);
  await open(page,"no-restorable-purchase");
  await page.getByRole("button",{name:"購入を復元",exact:true}).click();
  await expect(page.getByRole("status")).toContainText("ログインが終わると、そのまま購入を復元します。");
  expect((await page.evaluate(()=>window.mobileTest.storeCalls())).restores).toBe(0);
  server.user="returning-user";
  await open(page,"no-restorable-purchase","#app-settings");
  await expect(page.getByRole("status")).toContainText("有効な購入をサーバーで確認できませんでした");
  expect((await page.evaluate(()=>window.mobileTest.storeCalls())).restores).toBe(1);
});
test("signed in without a pending intent: nothing is bought automatically",async({page,context})=>{
  const server:Server={user:"u",entitledAfterPurchase:true,requests:[]};await serve(context,page,server);
  await open(page,"success","#app-settings");
  await expect(page.getByRole("button",{name:"¥980 / 月で登録",exact:true})).toBeEnabled();
  expect((await page.evaluate(()=>window.mobileTest.storeCalls())).purchases).toBe(0);
});
test("products that App Store does not return: the reason and code stay on screen after other actions",async({page,context},info)=>{
  const server:Server={user:"u",entitledAfterPurchase:false,requests:[]};await serve(context,page,server);
  await open(page,"no-products");
  const alert=page.getByRole("alert");
  await expect(alert).toContainText("App Storeから商品を取得できませんでした（コード 23 CONFIGURATION_ERROR）");
  await expect(alert).toContainText("None of the products registered");
  await expect(page.getByRole("button",{name:/月で登録/})).toHaveCount(0);
  await page.screenshot({path:info.outputPath("3-no-products.png")});
  // Another action sets its own notice; the store reason must not be overwritten.
  await page.getByRole("button",{name:"AI送信の許可を取り消す"}).click();
  await expect(page.getByRole("status").first()).toContainText("AI送信の許可を取り消しました");
  await expect(alert).toContainText("コード 23 CONFIGURATION_ERROR");
  // Fixing the store side and retrying brings the price back without restarting.
  await page.evaluate(()=>window.mobileTest.mockStore("success"));
  await page.getByRole("button",{name:"商品情報を再読み込み"}).click();
  await expect(page.getByRole("button",{name:"¥980 / 月で登録",exact:true})).toBeEnabled();
  await expect(alert).toHaveCount(0);
});
test("a build without the native RevenueCat plugin says so instead of a generic message",async({page,context},info)=>{
  const server:Server={user:"u",entitledAfterPurchase:false,requests:[]};await serve(context,page,server);
  await open(page,"unimplemented");
  await expect(page.getByRole("alert")).toContainText("アプリの課金機能が読み込まれていません（UNIMPLEMENTED）");
  await page.screenshot({path:info.outputPath("4-unimplemented.png")});
});
test("the price is reachable below the 59px status bar without horizontal scrolling",async({page,context})=>{
  const server:Server={user:null,entitledAfterPurchase:false,requests:[]};await serve(context,page,server);
  await open(page,"success");
  const buy=page.getByRole("button",{name:"¥980 / 月で登録",exact:true});
  await buy.scrollIntoViewIfNeeded();
  const box=(await buy.boundingBox())!;
  expect(box.height).toBeGreaterThanOrEqual(44);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth)).toBe(true);
});
