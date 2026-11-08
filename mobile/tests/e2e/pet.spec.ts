import { expect, test } from "@playwright/test";
import { readFileSync } from "node:fs";
import type { Question } from "../../../lib/questions/types";
const question=(JSON.parse(readFileSync(new URL("../../.cache/e2e-questions.json",import.meta.url),"utf8")) as Question[])[0];
const guest="ipa-quiz:pet-profiles:v1:guest", member="ipa-quiz:pet-profiles:v1:user%3Ab";
for(const width of [320,390])test(`bundled pet persists before background/restart and separates guest/member offline (${width}px)`,async({page,context,browserName})=>{
  await page.setViewportSize({width,height:844});
  const apis:string[]=[];
  await context.route("**/*",async route=>{
    const url=new URL(route.request().url());if(url.hostname!=="127.0.0.1"){await route.abort();return;}
    if(url.pathname.startsWith("/api/")){apis.push(url.pathname);await route.fulfill({status:503,json:{error:"offline"}});return;}
    await route.continue();
  });
  await page.addInitScript(()=>localStorage.setItem("ipa-quiz:onboarded:v1","1"));
  await page.goto("/tests/e2e/harness.html");await page.waitForFunction(()=>!!window.petTest);
  await page.evaluate(q=>window.petTest.start(q,null),question);
  await page.getByRole("radio").first().tap();
  await page.evaluate(()=>window.petTest.background());
  const raw=await page.evaluate(key=>localStorage.getItem(key)!,guest), saved=JSON.parse(raw);
  expect(saved.profiles[0].growth).toBeGreaterThan(0);expect(saved.events).toHaveLength(1);
  const native=await page.evaluate(()=>JSON.parse(localStorage.getItem("CapacitorStorage.kakomon:portable-study:v2:guest")!).data);
  expect(native[guest]).toBe(raw);
  await page.reload();await page.waitForFunction(()=>!!window.petTest);await page.evaluate(q=>window.petTest.start(q),question);
  const corner=page.locator("section[data-pet-id]");
  await expect(corner).toHaveAttribute("data-pet-id",JSON.stringify(["guest",question.exam]));await expect(corner).toHaveAttribute("data-pet-pose","study");
  expect(await page.evaluate(key=>localStorage.getItem(key),guest)).toBe(raw);
  await page.evaluate(q=>window.petTest.start(q,"b"),question);await page.getByRole("radio").first().tap();await page.evaluate(()=>window.petTest.background());
  const second=await page.evaluate(key=>JSON.parse(localStorage.getItem(key)!),member);expect(second.ownerScope).toBe("user:b");expect(second.events).toHaveLength(1);
  expect(await page.evaluate(key=>localStorage.getItem(key),guest)).toBe(raw);
  await page.evaluate(q=>window.petTest.start(q,null),question);await expect(corner).toHaveAttribute("data-pet-id",JSON.stringify(["guest",question.exam]));
  await corner.getByRole("button",{name:"育成を見る"}).tap();const sheet=page.getByRole("dialog",{name:"チワワの育成"});await expect(sheet).toBeVisible();
  await expect.poll(()=>sheet.evaluate(el=>getComputedStyle(el).opacity)).toBe("1");
  await page.screenshot({path:`test-results/pet-v1/${process.env.PET_EVIDENCE_PHASE??"regression"}-bundled-care-${width}-${browserName}.png`});
  expect(await sheet.evaluate(el=>el.scrollWidth<=el.clientWidth)).toBe(true);
  await sheet.getByLabel("名前",{exact:true}).fill("W".repeat(24));
  await sheet.getByRole("button",{name:"名前を保存",exact:true}).tap();
  await expect(sheet.getByRole("status")).toHaveText("保存しました。");
  await sheet.getByRole("button",{name:"育成を閉じて学習に戻る"}).tap();
  await expect(corner.getByRole("heading")).toContainText("W".repeat(24));
  await corner.evaluate(element=>{
    const items=[element,...element.querySelectorAll("*")].map(node=>({node:node as HTMLElement,size:parseFloat(getComputedStyle(node).fontSize)}));
    for(const {node,size}of items)node.style.fontSize=`${size*2}px`;
  });
  await corner.scrollIntoViewIfNeeded();expect(await corner.evaluate(el=>el.scrollWidth<=el.clientWidth)).toBe(true);
  const close=corner.getByRole("button",{name:"チワワのひと休みを閉じる"}),button=await close.boundingBox();
  expect(button!.width).toBeGreaterThanOrEqual(44);expect(button!.height).toBeGreaterThanOrEqual(44);
  expect(await close.evaluate(el=>{const r=el.getBoundingClientRect();return el.contains(document.elementFromPoint(r.x+r.width/2,r.y+r.height/2));})).toBe(true);
  await page.screenshot({path:`test-results/pet-v1/${process.env.PET_EVIDENCE_PHASE??"regression"}-bundled-unbroken-name-${width}-${browserName}.png`});
  const renamed=await page.evaluate(key=>JSON.parse(localStorage.getItem(key)!),guest);
  expect(renamed.profiles[0].name).toBe("W".repeat(24));expect(renamed.profiles[0].growth).toBe(saved.profiles[0].growth);expect(renamed.events).toEqual(saved.events);
  await close.tap();await expect(corner).toHaveCount(0);
  const reopen=page.getByRole("button",{name:"チワワのひと休みを開く"});await expect(reopen).toBeFocused();
  await reopen.press("Enter");await expect(corner.getByRole("button",{name:"チワワのひと休みを閉じる"})).toBeFocused();
  expect(apis).not.toContain("/api/auth/session");expect(apis.some(path=>/copilot|generate|essay|\/ai\//.test(path))).toBe(false);
});
