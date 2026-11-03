import {readFile,readdir} from "node:fs/promises";
import {resolve,relative} from "node:path";
import {getQuestionsForExam} from "../../lib/questions/get-questions";
import {DENKO2_SKILL_PROBLEMS} from "../../lib/denko2/skills";
import {getAnnotatedNotes} from "../../lib/st-annotated-notes/catalog";
const root=resolve(import.meta.dirname,"../..");
async function files(dir:string):Promise<string[]>{const out:string[]=[];for(const d of await readdir(dir,{withFileTypes:true})){const p=resolve(dir,d.name);if(d.isDirectory())out.push(...await files(p));else out.push(p);}return out;}
const samples=[...(await getQuestionsForExam("ip")).filter(q=>q.question.length>80).slice(0,3).map(q=>q.question),DENKO2_SKILL_PROBLEMS[0].conditionsText,getAnnotatedNotes()[0].accepted.explanation].map(s=>s.slice(0,80));
const chunks=(await files(resolve(root,".next/static/chunks"))).filter(p=>p.endsWith(".js"));
for(const p of chunks){const text=await readFile(p,"utf8");if(samples.some(s=>text.includes(s)||text.includes(JSON.stringify(s).slice(1,-1))))throw new Error(`Protected corpus in client chunk: ${relative(root,p)}`);if(text.includes("private-gsi-survey-assistant-20261021-2025-q1"))throw new Error(`Bundled survey answer keys: ${relative(root,p)}`);}
const pages=(await files(resolve(root,".next/server/app"))).filter(p=>p.endsWith(".html")&&/^(q\/|denko2\/skill\/|st\/past-papers\/notes\/)/.test(relative(resolve(root,".next/server/app"),p).replace(/\\/g,"/")));
if(!pages.length)throw new Error("No generated protected pages to audit");
for(const p of pages){const text=await readFile(p,"utf8");if(!text.includes("利用枠を確認しています"))throw new Error(`Ungated HTML: ${relative(root,p)}`);if(samples.some(s=>text.includes(s)))throw new Error(`Protected body in HTML: ${relative(root,p)}`);}
console.log(JSON.stringify({clientChunks:chunks.length,protectedHtml:pages.length,corpusLeaks:0}));
