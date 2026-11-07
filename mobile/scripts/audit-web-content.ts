import {readFile,readdir,writeFile,mkdir} from "node:fs/promises";
import {resolve,relative} from "node:path";
import {createHash} from "node:crypto";
import {getAllQuestionsLazy} from "../../lib/questions/get-questions";
import {questionPagePath} from "../../lib/seo/question-url";
import {materialGroups} from "../shared/material-source";
import {loadExamPaper} from "../../lib/exam-library-papers";
import {auditProtectedArtifact,fingerprints,containsGradingIndex} from "./web-content-audit";
import {SURVEY_ASSISTANT_REFERENCE_ID,PE_FIRST_REFERENCE_ID} from "../../lib/exam-library/survey-assistant-reference-policy";
const root=resolve(import.meta.dirname,"../..");
async function files(dir:string):Promise<string[]>{const out:string[]=[];for(const d of await readdir(dir,{withFileTypes:true})){const p=resolve(dir,d.name);if(d.isDirectory())out.push(...await files(p));else out.push(p);}return out;}
const app=resolve(root,".next/server/app");
const buildId=(await readFile(resolve(root,".next/BUILD_ID"),"utf8")).trim();
if(!buildId)throw new Error("Missing completed build identity");
const routeSources=new Map<string,unknown>();
for(const q of await getAllQuestionsLazy())routeSources.set(questionPagePath(q),q);
for(const m of materialGroups().flatMap(group=>group.items))routeSources.set(m.href,m);
const protectedPath=(path:string)=>routeSources.has(path)||/^\/q\/[^/]+\/[^/]+\/[^/]+\/[^/]+$/.test(path)||/^\/e-learning\/exams\/[^/]+$/.test(path);
const manifest=JSON.parse(await readFile(resolve(root,".next/prerender-manifest.json"),"utf8")) as {routes:Record<string,unknown>};
const expected=Object.keys(manifest.routes).filter(protectedPath).sort();
if(!expected.length)throw new Error("No protected routes in prerender manifest");
const artifacts=(await files(app)).filter(path=>/\.(html|rsc)$/.test(path));
const htmlRoutes=new Set(artifacts.filter(path=>path.endsWith(".html")).map(path=>"/"+relative(app,path).replace(/\\/g,"/").replace(/\.html$/,"")));
const rscRoutes=new Set(artifacts.filter(path=>path.endsWith(".rsc")).map(path=>"/"+relative(app,path).replace(/\\/g,"/").replace(/\.rsc$/,"")));
for(const path of expected){if(!htmlRoutes.has(path))throw new Error(`Missing generated HTML: ${path}`);if(!rscRoutes.has(path))throw new Error(`Missing generated RSC: ${path}`);}
const counts:Record<string,number>={};let protectedHtml=0,protectedRsc=0;
const failures:{path:string;reason:string}[]=[];
const digest=createHash("sha256");
for(const path of artifacts.sort()) {
  const route="/"+relative(app,path).replace(/\\/g,"/").replace(/\.(html|rsc)$/,"");
  if(!protectedPath(route))continue;
  const paper=route.startsWith("/e-learning/exams/");
  const source=routeSources.get(route)??(paper?loadExamPaper(route.split("/").pop()!):undefined);
  if(!source)throw new Error(`Missing independent source for protected route: ${route}`);
  routeSources.set(route,source);
  const text=await readFile(path,"utf8");
  try{auditProtectedArtifact(text,fingerprints(source),path.endsWith(".html"),paper);}catch(error){failures.push({path:relative(root,path).replace(/\\/g,"/"),reason:error instanceof Error?error.message:"audit failed"});}
  digest.update(relative(app,path).replace(/\\/g,"/")).update(text);
  if(path.endsWith(".html")){protectedHtml++;const group=route.split("/")[1];counts[group]=(counts[group]??0)+1;}else protectedRsc++;
}
if(protectedRsc<expected.length)throw new Error("Missing generated protected RSC payloads");
const chunks=(await files(resolve(root,".next/static/chunks"))).filter(path=>path.endsWith(".js"));
const index=JSON.parse(await readFile(resolve(root,"data/exam-library/survey-assistant/grading-index.json"),"utf8")) as {questions:{id:string}[]}[];
const informationIndex=JSON.parse(await readFile(resolve(root,"data/exam-library/pe-first/information-grading-index.json"),"utf8")) as {id:string}[];
// The exact reference-only ID is a public exclusion rule, never a scoring key.
const indexIds=[...index.flatMap(paper=>paper.questions.map(q=>q.id)),...informationIndex.filter(q=>q.id!==PE_FIRST_REFERENCE_ID).map(q=>q.id)];
const samples=[...new Set([...routeSources.values()].flatMap(source=>fingerprints(source)))];
const escape=(s:string)=>s.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");
const pattern=new RegExp([...new Set(samples.flatMap(s=>[s,JSON.stringify(s).slice(1,-1)]))].map(escape).join("|"));
for(const path of chunks){const text=await readFile(path,"utf8");if(pattern.test(text))throw new Error(`Protected corpus in client chunk: ${relative(root,path)}`);if(containsGradingIndex(text,indexIds,SURVEY_ASSISTANT_REFERENCE_ID))throw new Error(`Bundled survey grading index: ${relative(root,path)}`);digest.update(relative(root,path).replace(/\\/g,"/")).update(text);}
if(failures.length){await mkdir(resolve(root,"mobile/docs/evidence/ios1g"),{recursive:true});await writeFile(resolve(root,"mobile/docs/evidence/ios1g/web-audit-failures.json"),JSON.stringify({buildId,failures},null,2)+"\n");throw new Error(`${failures.length} protected artifacts failed; see web-audit-failures.json`);}
const report={buildId,clientChunks:chunks.length,expectedProtectedRoutes:expected.length,protectedHtml,protectedRsc,htmlByFamily:counts,sourceFingerprints:samples.length,gradingIndexIds:indexIds.length,corpusLeaks:0,serializedAnswerLeaks:0,gradingIndexLeaks:0,artifactSha256:digest.digest("hex"),scope:"Generated HTML/RSC and browser chunks; dynamic on-demand routes and live services are outside this static audit."};
await mkdir(resolve(root,"mobile/docs/evidence/ios1g"),{recursive:true});
await writeFile(resolve(root,"mobile/docs/evidence/ios1g/web-audit.json"),JSON.stringify(report,null,2)+"\n");
console.log(JSON.stringify(report,null,2));
