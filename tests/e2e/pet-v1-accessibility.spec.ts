import { expect, test } from "@playwright/test";
import { emptyPetProfiles, newPetProfile, serializePetProfileDocument } from "../../lib/pet/v1/profile";
import { allowLoopbackWebKit } from "./helpers/local-webkit";
import { answerPet, roomPet } from "./helpers/pet-ui";
const key="ipa-quiz:pet-profiles:v1:guest";
const quiz="/quiz?mode=year&exam=ap&year=2023&season=spring&session=am";
test.use({isMobile:true,hasTouch:true,viewport:{width:390,height:844},reducedMotion:"reduce",serviceWorkers:"block"});
test.beforeEach(async({page,browserName})=>allowLoopbackWebKit(page,browserName));
for(const width of [320,390])test(`pet close and reopen preserve the keyboard position (${width}px)`,async({page,browserName})=>{
  await page.setViewportSize({width,height:844});await page.route("**/api/auth/session",route=>route.fulfill({json:{}}));
  const doc=emptyPetProfiles("guest","Asia/Tokyo"),pet=newPetProfile("guest","ap");doc.profiles.push(pet);
  const raw=serializePetProfileDocument(doc);
  await page.addInitScript(({key,raw})=>localStorage.setItem(key,raw),{key,raw});
  await page.goto("/");const corner=roomPet(page);await expect(corner).toHaveAttribute("data-pet-id",pet.petId);
  const settings=corner.locator("summary").filter({hasText:/^設定$/});await settings.click();
  const close=corner.getByRole("button",{name:"チワワのひと休みを閉じる"});
  await close.focus();await close.press("Enter");
  const reopen=page.getByRole("button",{name:"チワワのひと休みを開く"});await expect(reopen).toBeFocused();
  await reopen.press("Enter");await expect(settings).toBeFocused();
  await page.screenshot({path:`test-results/pet-v1/${process.env.PET_EVIDENCE_PHASE??"regression"}-keyboard-focus-${width}-${browserName}.png`});
  expect(await page.evaluate(key=>localStorage.getItem(key),key)).toBe(raw);
});
for(const width of [320,390])test(`compact pet keeps its care control usable with a long unbroken name (${width}px)`,async({page,browserName})=>{
  await page.setViewportSize({width,height:844});await page.route("**/api/auth/session",route=>route.fulfill({json:{}}));
  const doc=emptyPetProfiles("guest","Asia/Tokyo"),pet=newPetProfile("guest","ap");pet.name="W".repeat(24);doc.profiles.push(pet);
  const raw=serializePetProfileDocument(doc);
  await page.addInitScript(({key,raw})=>localStorage.setItem(key,raw),{key,raw});
  await page.goto(quiz);await page.getByRole("radio").first().tap();const corner=answerPet(page);await expect(corner).toHaveAttribute("data-pet-id",pet.petId);
  await corner.evaluate(element=>{
    const items=[element,...element.querySelectorAll("*")].map(node=>({node:node as HTMLElement,size:parseFloat(getComputedStyle(node).fontSize)}));
    for(const {node,size}of items)node.style.fontSize=`${size*2}px`;
  });
  await corner.scrollIntoViewIfNeeded();
  expect(await corner.evaluate(el=>el.scrollWidth<=el.clientWidth)).toBe(true);
  const open=corner.getByRole("button",{name:"チワワのお世話を開く"});
  const button=await open.boundingBox();
  expect(button).not.toBeNull();
  expect(button!.width).toBeGreaterThanOrEqual(44);expect(button!.height).toBeGreaterThanOrEqual(44);
  expect(await open.evaluate(el=>{const r=el.getBoundingClientRect();return el.contains(document.elementFromPoint(r.x+r.width/2,r.y+r.height/2));})).toBe(true);
  await page.screenshot({path:`test-results/pet-v1/${process.env.PET_EVIDENCE_PHASE??"regression"}-unbroken-name-${width}-${browserName}.png`});
  await expect.poll(()=>page.evaluate(key=>JSON.parse(localStorage.getItem(key)!).events?.length??0,key)).toBe(1);
  const saved=await page.evaluate(key=>localStorage.getItem(key),key);
  await open.tap();const sheet=page.getByRole("dialog",{name:"チワワの育成"});await expect(sheet).toBeVisible();
  await page.keyboard.press("Escape");await expect(open).toBeFocused();
  expect(await page.evaluate(key=>localStorage.getItem(key),key)).toBe(saved);
});
for(const width of [320,390])test(`pet care stays readable at doubled text size and opens without invoking a keyboard (${width}px)`,async({page,browserName})=>{
  await page.setViewportSize({width,height:844});await page.route("**/api/auth/session",route=>route.fulfill({json:{}}));
  const doc=emptyPetProfiles("guest","Asia/Tokyo"),pet=newPetProfile("guest","ap");pet.name="あいうえおかきくけこさしすせそたちつてとなにぬね";doc.profiles.push(pet);
  await page.addInitScript(({key,raw})=>localStorage.setItem(key,raw),{key,raw:serializePetProfileDocument(doc)});
  await page.goto(quiz);await page.getByRole("radio").first().tap();const corner=answerPet(page);await expect(corner).toHaveAttribute("data-pet-id",pet.petId);
  await expect.poll(()=>page.evaluate(key=>JSON.parse(localStorage.getItem(key)!).events?.length??0,key)).toBe(1);
  const saved=await page.evaluate(key=>localStorage.getItem(key),key);
  await corner.scrollIntoViewIfNeeded();
  const normalTargets=await corner.getByRole("button").evaluateAll(elements=>elements.map(el=>{const r=el.getBoundingClientRect();return{width:r.width,height:r.height};}));
  expect(normalTargets.every(target=>target.width>=44&&target.height>=44),JSON.stringify(normalTargets)).toBe(true);
  const doubleText=async(selector:string)=>page.locator(selector).evaluate(element=>{
    const items=[element,...element.querySelectorAll("*")].map(node=>({node:node as HTMLElement,size:parseFloat(getComputedStyle(node).fontSize)}));
    for(const {node,size}of items)node.style.fontSize=`${size*2}px`;
  });
  await doubleText('section[data-pet-compact="true"]');await corner.scrollIntoViewIfNeeded();
  expect(await corner.evaluate(el=>el.scrollWidth<=el.clientWidth)).toBe(true);expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  await page.screenshot({path:`test-results/pet-v1/${process.env.PET_EVIDENCE_PHASE??"regression"}-double-text-corner-${width}-${browserName}.png`});
  await page.emulateMedia({reducedMotion:"reduce"});
  expect(await page.evaluate(()=>matchMedia("(prefers-reduced-motion: reduce)").matches)).toBe(true);
  await corner.getByRole("button",{name:"チワワのお世話を開く"}).tap();const sheet=page.getByRole("dialog",{name:"チワワの育成"});await expect(sheet).toBeVisible();
  // This lazy sheet's CSS arrives separately; measure after its own stylesheet is applied.
  await expect(sheet).toHaveCSS("max-width","520px");
  await expect(sheet.getByRole("heading",{name:"チワワの育成"})).toBeFocused();await expect(sheet.getByLabel("名前",{exact:true})).not.toBeFocused();
  // Simulated safe-area values exercise CSS geometry, not physical UIKit.
  await sheet.evaluate(el=>{(el as HTMLElement).style.setProperty("--pet-safe-top","44px");(el as HTMLElement).style.setProperty("--pet-safe-bottom","34px");});
  await doubleText('[role="dialog"]');expect(await sheet.evaluate(el=>el.scrollWidth<=el.clientWidth)).toBe(true);
  const safeCheckAt=Date.now();
  const beforeSafeArea=await sheet.evaluate(el=>{const s=getComputedStyle(el),r=el.getBoundingClientRect();return{y:r.y,height:r.height,top:s.top,maxHeight:s.maxHeight,safeTop:s.getPropertyValue("--pet-safe-top"),safeBottom:s.getPropertyValue("--pet-safe-bottom")};});
  // Wait for the injected lengths before checking the same strict bounds.
  // Retain the immediate and final reads to diagnose late style/layout updates.
  console.log("PET_SAFE_AREA_BEFORE "+JSON.stringify({width,browserName,before:beforeSafeArea}));
  const readGeometry=()=>sheet.evaluate(el=>{const s=getComputedStyle(el),r=el.getBoundingClientRect();return{y:r.y,height:r.height,top:s.top,maxHeight:s.maxHeight,transform:s.transform,animation:s.animationName,safeTop:s.getPropertyValue("--pet-safe-top"),safeBottom:s.getPropertyValue("--pet-safe-bottom"),viewport:innerHeight};});
  let geometry:Awaited<ReturnType<typeof readGeometry>>|null=null;
  try {
    await expect.poll(async()=>{
      const r=await sheet.boundingBox();return !!r&&r.y>=55&&r.y+r.height<=799;
    }).toBe(true);
  } finally {
    try {
      geometry=await readGeometry();
      const snapshot={width,browserName,repeat:test.info().repeatEachIndex,elapsedMs:Date.now()-safeCheckAt,before:beforeSafeArea,after:geometry};
      console.log("PET_SAFE_AREA_LAYOUT "+JSON.stringify(snapshot));
      await test.info().attach("safe-area-layout",{body:JSON.stringify(snapshot),contentType:"application/json"});
    } catch(error) { console.log("PET_SAFE_AREA_DIAGNOSTIC_ERROR "+String(error)); }
  }
  if(!geometry)geometry=await readGeometry();
  expect(geometry.y,JSON.stringify(geometry)).toBeGreaterThanOrEqual(55);expect(geometry.y+geometry.height,JSON.stringify(geometry)).toBeLessThanOrEqual(799);
  const motion=await sheet.evaluate(el=>({reduced:matchMedia("(prefers-reduced-motion: reduce)").matches,animation:getComputedStyle(el).animationName,duration:getComputedStyle(el).animationDuration,transform:getComputedStyle(el).transform,opacity:getComputedStyle(el).opacity}));
  expect(motion.reduced).toBe(true);expect(motion.animation).toBe("none");
  const heights=await sheet.getByRole("button").evaluateAll(elements=>elements.map(el=>({name:el.textContent,height:el.getBoundingClientRect().height,min:getComputedStyle(el).minHeight})));expect(heights.every(item=>item.height>=44),JSON.stringify({motion,heights})).toBe(true);
  await page.screenshot({path:`test-results/pet-v1/${process.env.PET_EVIDENCE_PHASE??"regression"}-double-text-sheet-${width}-${browserName}.png`});
  await sheet.getByRole("button",{name:"学習へ戻る"}).tap();await expect(sheet).toHaveCount(0);await expect(corner.getByRole("button",{name:"チワワのお世話を開く"})).toBeFocused();
  expect(await page.evaluate(key=>localStorage.getItem(key),key)).toBe(saved);
});
