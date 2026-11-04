import {readFile,readdir,mkdir,writeFile} from "node:fs/promises";
import {resolve,dirname} from "node:path";
import {fileURLToPath} from "node:url";
const root=fileURLToPath(new URL("../../",import.meta.url));
const expected=[];
for(const directory of ["data/exam-library/papers","data/exam-library/presentation"]){
  for(const name of await readdir(resolve(root,directory)))if(name.endsWith(".json"))expected.push(resolve(root,directory,name));
}
const routes=["api/mobile/catalog","api/mobile/download","api/billing/question","api/mobile/paper-results"];
const reports=[];
for(const route of routes){
  const path=resolve(root,".next/server/app",route,"route.js.nft.json");
  const trace=JSON.parse(await readFile(path,"utf8"));
  const packaged=new Set(trace.files.map(file=>resolve(dirname(path),file).toLowerCase()));
  const missing=expected.filter(file=>!packaged.has(file.toLowerCase()));
  if(missing.length)throw new Error(`Missing ${missing.length} paper files in ${route}`);
  reports.push({route,tracedFiles:trace.files.length,expectedPaperDataFiles:expected.length,missing:0});
}
const report={buildId:(await readFile(resolve(root,".next/BUILD_ID"),"utf8")).trim(),routes:reports};
await mkdir(resolve(root,"mobile/docs/evidence/ios1g"),{recursive:true});
await writeFile(resolve(root,"mobile/docs/evidence/ios1g/build-traces.json"),JSON.stringify(report,null,2)+"\n");
console.log(JSON.stringify(report,null,2));
