import {chromium,expect} from '@playwright/test';
import fs from 'node:fs';
const base='http://localhost:3132';const dir='logs/safety-browser/transcription';fs.mkdirSync(dir,{recursive:true});
const browser=await chromium.launch({headless:true});const report=[];
try {
 for(const width of [1440,390,320]) {
  const page=await browser.newPage({viewport:{width,height:900},isMobile:width<500,hasTouch:width<500});
  const scenarios=[['normal','lckohyo-LC20260407-1',1],['diagram','lckohyo-LC20260407-1',4],['formula','emkohyo-EM20261804',2],['descriptive','cskohyo-CS20251907',4]];
  for(const [name,pid,n] of scenarios){
   await page.goto(`${base}/e-learning/exams/${pid}?question=${pid}-q${n}`,{waitUntil:'networkidle'});
   await expect(page.getByRole('heading',{name:new RegExp(`^問${n}(?:[^0-9]|$)`)})).toBeVisible();
   await expect(page.getByRole('button',{name:'原図で読む',exact:true})).toHaveCount(0);
   await expect(page.locator('img[src*="/exam-library/"]:not([src*="/text-"])')).toHaveCount(0);
   const body=await page.locator('body').innerText();if(body.includes('解説準備中'))throw new Error(name+' pending explanation');
   const overflow=await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth,offenders:[...document.querySelectorAll('body *')].filter(e=>e.getBoundingClientRect().right>innerWidth+1&&e.getBoundingClientRect().width>0).map(e=>({tag:e.tagName,class:e.className,text:e.textContent?.slice(0,30)})).slice(0,8)}));
   if(overflow.scroll>overflow.width+1)throw new Error(name+' overflow '+JSON.stringify(overflow));
   if(name==='normal')await expect(page.getByRole('radio',{name:/^選択肢 1: キャンバ/})).toBeVisible();
   if(name==='formula')await expect(page.getByRole('radio',{name:/^選択肢 5:/})).toContainText('Σ(i＝1〜n)');
   if(name==='diagram')await expect(page.locator('img[src*="/text-"]').first()).toBeVisible();
   if(name==='descriptive'){
    const field=page.getByRole('textbox').first();await field.fill('足場の組立てと墜落防止措置を確認する。');
    await page.reload({waitUntil:'networkidle'});await expect(page.getByRole('textbox').first()).toHaveValue('足場の組立てと墜落防止措置を確認する。');
    await expect(page.getByText('労働安全コンサルタント試験の公表問題',{exact:true})).toBeVisible();
    await page.getByRole('link',{name:'試験の過去問一覧へ',exact:true}).click();
    await expect(page.getByRole('heading',{name:'建築安全の過去問',exact:true})).toBeVisible();
    await page.getByRole('link',{name:'今すぐ解く',exact:true}).click();
    await expect(page.getByRole('textbox').first()).toHaveValue('足場の組立てと墜落防止措置を確認する。');
   }else{
    await page.getByRole('radio').first().click();
    await expect(page.getByRole('heading',{name:name==='formula'?'回答を記録しました（採点なし）':/^(正解|不正解)$/})).toBeVisible();
    await expect(page.getByRole('heading',{name:name==='formula'?'参考解説（採点なし）':'AIによる学習用解説',exact:true})).toBeVisible();
    if(name==='normal'){
     await page.getByRole('button',{name:'次の問題へ',exact:true}).click();
     await expect(page.getByRole('heading',{name:/^問2(?:[^0-9]|$)/})).toBeVisible();
     await page.getByRole('button',{name:'前へ',exact:true}).click();
     await expect(page.getByRole('radio').first()).toHaveAttribute('aria-checked','true');
    }
   }
   await page.getByRole('heading',{name:new RegExp(`^問${n}(?:[^0-9]|$)`)}).scrollIntoViewIfNeeded();
   await page.screenshot({path:`${dir}/${name}-${width}.png`,fullPage:false});
   report.push({name,width,ok:true,images:await page.locator('img[src*="/text-"]').count(),overflow});
  }
  await page.close();
 }
 console.log(JSON.stringify(report,null,2));fs.writeFileSync(`${dir}/report.json`,JSON.stringify(report,null,2));
}finally{await browser.close();}
