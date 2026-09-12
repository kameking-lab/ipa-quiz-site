import {chromium,expect} from '@playwright/test';
import fs from 'node:fs';
const browser=await chromium.launch();const results=[];const dir='logs/boiler-model/browser';fs.mkdirSync(dir,{recursive:true});
try{for(const width of [1440,390,320]){const page=await browser.newPage({viewport:{width,height:900}});
for(const [id,n,key] of [['lckohyo-LC20260401-2',4,5],['lckohyo-LC20251101',23,4],['lckohyo-LC20260401-2',2,0],['lckohyo-LC20260401-2',3,0],['cskohyo-CS20251903',1,0]]){
 await page.goto(`http://localhost:3132/e-learning/exams/${id}?question=${id}-q${n}`,{waitUntil:'networkidle'});
 if(key){await expect(page.getByRole('radio')).toHaveCount(5);await page.getByRole('radio').nth(key-1).click();await expect(page.getByRole('heading',{name:'正解',exact:true})).toBeVisible();}
 else {await page.getByRole('button',{name:'模範解答を見る',exact:true}).click();await expect(page.getByRole('heading',{name:'模範解答・解説（学習用）',exact:true})).toBeVisible();}
 if(id.startsWith('lckohyo'))await expect(page.getByRole('link',{name:/公式の正答・正答例を確認/})).toBeVisible();
 if(n===2)await expect(page.locator('img[src*="answer-q2-"]')).toHaveCount(2);
 if(n===3)await expect(page.getByText(/次の文中の［　］に入れる適切な語句又は値を答えよ/)).toBeVisible();
 const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);if(overflow)throw new Error(`overflow ${id}/${n}/${width}`);
 await page.getByRole('heading',{name:key?'正解':'模範解答・解説（学習用）',exact:true}).scrollIntoViewIfNeeded();await page.screenshot({path:`${dir}/${id}-q${n}-${width}.png`});results.push({id,n,width,pass:true});
}await page.close();}fs.writeFileSync(`${dir}/report.json`,JSON.stringify(results,null,2));console.log(JSON.stringify(results));}finally{await browser.close();}
