// Local browser acceptance for the three newly adopted source-image papers.
import { chromium, expect } from '@playwright/test';
import { readFileSync, mkdirSync, writeFileSync } from 'node:fs';
const out='reports/LQ3E-20261104';
mkdirSync(`${out}/local`,{recursive:true});
const browser=await chromium.launch({headless:true});
const context=await browser.newContext({viewport:{width:1280,height:1000}});
await context.addInitScript(()=>localStorage.setItem('ipa-quiz:onboarded:v1','1'));
await context.route('**/*',route=>['127.0.0.1','localhost'].includes(new URL(route.request().url()).hostname)?route.continue():route.abort());
const page=await context.newPage(); const errors=[]; const results=[];
page.on('pageerror',error=>errors.push(error.message));
try {
  for(const slug of ['textile','metal','resource']) {
    const id=`pe-first-${slug}-2024`;
    const qs=JSON.parse(readFileSync(`data/exam-library/pe-first/${id}.json`,'utf8'));
    const n=slug==='textile'?30:slug==='metal'?29:33; const q=qs[n-1];
    const response=await page.goto(`http://localhost:3026/e-learning/exams/${id}?question=${q.id}`,{waitUntil:'domcontentloaded',timeout:120000});
    expect(response.status()).toBe(200);
    await expect(page.getByRole('heading',{level:1})).toContainText('令和6年度');
    const figure=page.getByAltText(q.presentation.figures[0].alt,{exact:true});
    await expect(figure).toBeVisible({timeout:30000});
    await expect(figure).toHaveJSProperty('naturalWidth',q.presentation.figures[0].width);
    await expect(page.getByRole('radio')).toHaveCount(5);
    // SSR buttons can appear before React has attached the click handlers.
    await page.waitForFunction(()=>Array.from(document.querySelectorAll('[role="radio"]')).every(el=>Object.keys(el).some(k=>k.startsWith('__reactProps$'))),{timeout:30000});
    await page.getByRole('radio').nth(q.correctChoice-1).click();
    await expect(page.getByRole('heading',{name:'正解',exact:true})).toBeVisible();
    const panel=page.getByRole('region',{name:'選択肢ごとの解説'});
    await expect(panel.locator('ol[aria-label="5つの選択肢の判定と理由"] > li')).toHaveCount(5);
    for(const item of q.choiceExplanation.choices) await expect(panel).toContainText(item.reason);
    await page.screenshot({path:`${out}/local/${slug}-answered.png`,fullPage:true});
    await page.reload({waitUntil:'domcontentloaded'});
    await expect(page.getByRole('heading',{name:'正解',exact:true})).toBeVisible({timeout:30000});
    await page.getByRole('button',{name:'次の問題へ',exact:true}).click();
    await expect(page.getByText(`${n+1}問目／35問`,{exact:true})).toBeVisible();
    await page.screenshot({path:`${out}/local/${slug}-next.png`,fullPage:true});
    results.push({paperId:id,question:n,status:200,originalImageLoaded:true,choices:5,reasons:5,correctGrade:true,answerRestoredOnReload:true,nextQuestion:true});
  }
  expect(errors).toEqual([]);
  writeFileSync(`${out}/browser-smoke.json`,JSON.stringify({results,pageErrors:errors},null,2)+'\n');
  console.log('PASS: three new paper routes; original images; five choices/reasons; grading; reload restore; next question; zero page errors');
} catch(error) {
  writeFileSync(`${out}/local/browser-error.json`,JSON.stringify({pageErrors:errors,error:String(error)},null,2)+'\n');
  await page.screenshot({path:`${out}/local/browser-failure.png`,fullPage:true});
  throw error;
} finally {await browser.close();}
