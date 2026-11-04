import { writeFile, readdir, stat, mkdir } from "node:fs/promises";
import { resolve, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
const root=fileURLToPath(new URL("../../",import.meta.url));
process.chdir(root);
// tsx's require hook loads the shared graph consistently across the ESM mobile
// package and the root package (which defaults to CommonJS). Node 22's ESM
// loader cannot reliably infer named exports across this boundary.
const require = createRequire(import.meta.url);
const {examCatalog,examContent,catalogCodes}=require("../shared/catalog-source.ts") as typeof import("../shared/catalog-source");
const {getAllEssayQuestions}=require("../../lib/essay/load.ts") as typeof import("../../lib/essay/load");
await writeFile(resolve(root,"lib/essay/catalog.generated.json"),JSON.stringify(getAllEssayQuestions().map(({id,title,exam,year,season,qNumber})=>({id,title,exam,year,season,qNumber})),null,2)+"\n");
async function files(dir:string):Promise<string[]> { const result:string[]=[]; for (const item of await readdir(dir,{ withFileTypes:true })) { const path=resolve(dir,item.name); if(item.isDirectory()) result.push(...await files(path)); else result.push(path); } return result; }
const exams=[];
const ids=new Set<string>();let coreQuestions=0,libraryQuestions=0,materialRepresentations=0,maxPageBytes=0;
for(const code of catalogCodes()) { const entry=await examCatalog(code); if(entry?.count) {
  exams.push(entry);const rows=await examContent(code);if(!rows)throw new Error("Missing published content");
  if(new Set(rows.map(q=>q.id)).size!==rows.length)throw new Error(`Duplicate IDs: ${code}`);
  rows.forEach(q=>ids.add(q.id));
  if(code.startsWith("library."))libraryQuestions+=rows.length;else if(code.startsWith("material."))materialRepresentations+=rows.length;else coreQuestions+=rows.length;
  for(let i=0;i<rows.length;i+=10)maxPageBytes=Math.max(maxPageBytes,Buffer.byteLength(JSON.stringify(rows.slice(i,i+10))));
} }
await mkdir(resolve(root,"mobile/src/generated"),{recursive:true});
await writeFile(resolve(root,"mobile/src/generated/catalog.json"),JSON.stringify({ schema:2,exams },null,2)+"\n");
const routes=(await files(resolve(root,"app"))).filter(p=>/[\\/]page\.tsx$/.test(p)&&!relative(resolve(root,"app"),p).split(/[\\/]/).some(part=>part.startsWith("_"))).map(path=>{
  const web=relative(resolve(root,"app"),path).replace(/\\/g,"/").replace(/\/?page\.tsx$/,"")||"/";
  return { web:web.startsWith("/")?web:"/"+web,source:relative(root,path).replace(/\\/g,"/"),app:"同一Next.jsページ・Reactコンポーネント・APIをオンラインで共通実行",status:web.startsWith("admin")?"管理者用（同一権限を維持）":"実装・オンライン共通利用" };
});
await writeFile(resolve(root,"mobile/docs/route-matrix.json"),JSON.stringify(routes,null,2)+"\n");
const sources=await files(resolve(root,"data/questions")); const bytes=(await Promise.all(sources.map(p=>stat(p)))).reduce((n,s)=>n+s.size,0);
await writeFile(resolve(root,"mobile/docs/content-size.json"),JSON.stringify({ sourceFiles:sources.length,sourceBytes:bytes,packages:exams.length,coreQualifications:exams.filter(e=>!e.material&&!e.paper).length,coreQuestions,libraryQuestions,materialRepresentations,uniqueIds:ids.size,representations:exams.reduce((n,e)=>n+e.count,0),maxPageBytes,questionJsonBytes:exams.reduce((n,e)=>n+e.bytes,0),catalogBytes:Buffer.byteLength(JSON.stringify({schema:2,exams})) },null,2)+"\n");
console.log(`Catalog: ${exams.length} exams, ${exams.reduce((n,e)=>n+e.count,0)} questions; ${routes.length} web page patterns. No question bodies bundled.`);
