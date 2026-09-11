import {chromium,expect} from '@playwright/test';
import fs from 'node:fs';
const base=process.env.EXAM_TEST_BASE_URL||'http://localhost:3128';
fs.mkdirSync('logs/safety-browser',{recursive:true});
const browser=await chromium.launch({headless:true});const checks=[];
try{
 const ctx=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true});const page=await ctx.newPage();
 const paper=JSON.parse(fs.readFileSync('data/exam-library/papers/lckohyo-LC20260415-1.json','utf8'));const q=paper[0];
 await page.goto(base+'/e-learning/exams/lckohyo-LC20260415-1',{waitUntil:'networkidle'});
 await expect(page.getByRole('button',{name:'文字で読む',exact:true})).toHaveAttribute('aria-pressed','true');
 await page.getByRole('button',{name:'原図で読む',exact:true}).click();
 await expect(page.getByRole('img',{name:/問1の問題文/})).toBeVisible();
 await page.getByRole('button',{name:'文字で読む',exact:true}).click();checks.push('mobile text/image switching');
 await page.getByRole('radio',{name:`（${q.correctChoice===1?2:1}）`,exact:true}).locator('..').click();await page.getByRole('button',{name:'回答する',exact:true}).click();
 await expect(page.getByRole('heading',{name:'不正解',exact:true})).toBeVisible();
 await expect(page.getByRole('heading',{name:'AIによる学習用解説',exact:true})).toBeVisible();
 const explanation=JSON.parse(fs.readFileSync('data/exam-library/explanations.json','utf8'))[q.id];
 await expect(page.getByText(explanation,{exact:true})).toBeVisible();checks.push('authored AI explanation displayed after answering');
 if(await page.evaluate(()=>Object.keys(localStorage).some(k=>k.startsWith('ipa-quiz:exam-library:'))))throw Error('Unexpected default persistence');checks.push('official grading / no default persistence');
 await page.getByRole('button',{name:'結果と見直しを表示',exact:true}).click();
 await page.getByRole('button',{name:'間違えた1問を解き直す',exact:true}).click();
 await page.getByRole('radio',{name:`（${q.correctChoice}）`,exact:true}).locator('..').click();await page.getByRole('button',{name:'回答する',exact:true}).click();
 await expect(page.getByRole('heading',{name:'正解',exact:true})).toBeVisible();checks.push('wrong-answer retry');
 await page.getByRole('checkbox',{name:'この端末に保存する',exact:true}).check();
 await page.reload({waitUntil:'networkidle'});await expect(page.getByText('保存した進捗があります')).toBeVisible();checks.push('opt-in storage survives reload');
 await page.screenshot({path:'logs/safety-browser/mobile-final.png',fullPage:true});
 await page.goto(base+'/e-learning/exams/emkohyo-EM20261801',{waitUntil:'networkidle'});
 await page.getByRole('radio',{name:'（1）',exact:true}).locator('..').click();await page.getByRole('button',{name:'回答を記録する（採点なし）',exact:true}).click();
 await expect(page.getByRole('heading',{name:'回答を記録しました（採点なし）',exact:true})).toBeVisible();checks.push('unconfirmed answers never graded');
 await page.goto(base+'/e-learning/exams/cskohyo-CS20251903',{waitUntil:'networkidle'});
 await expect(page.getByRole('textbox').first()).toBeVisible();await expect(page.getByRole('radio')).toHaveCount(0);checks.push('descriptive response without choice grading');
 if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth))throw Error('Mobile overflow');
 const desktop=await browser.newPage({viewport:{width:1440,height:1000}});await desktop.goto(base+'/e-learning/exams',{waitUntil:'networkidle'});
 await expect(desktop.getByText('1972問',{exact:true})).toBeVisible();
 await desktop.screenshot({path:'logs/safety-browser/desktop-final.png',fullPage:false});
 const missing=await desktop.goto(base+'/e-learning/exams/not-a-real-exam');if(missing.status()!==404)throw Error('Invalid ID not 404');checks.push('catalog totals / unknown paper 404');
 console.log(JSON.stringify({ok:true,checks}));
}catch(error){console.error(JSON.stringify({ok:false,checks,error:String(error)}));process.exitCode=1}finally{await browser.close()}


