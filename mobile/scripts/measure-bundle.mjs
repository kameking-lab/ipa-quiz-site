import {readdir,readFile,writeFile} from "node:fs/promises";
import {gzipSync} from "node:zlib";

const directory=new URL("../dist/",import.meta.url);
async function entries(relative="") {
  const files=[];
  for(const item of await readdir(new URL(relative,directory),{withFileTypes:true})) {
    const path=relative+item.name;
    if(item.isDirectory())files.push(...await entries(path+"/"));
    else files.push(path);
  }
  return files;
}
const paths=(await entries()).sort();
const containsE2EHarness=paths.some(path=>path.includes("harness")||path.startsWith("tests/"));
if(containsE2EHarness)throw new Error("Test-only harness found in release assets. Run the production build first.");
const files=[];
for(const path of paths) {
  const data=await readFile(new URL(path,directory));
  files.push({path,bytes:data.length,gzipBytes:gzipSync(data).length});
}
const report={measuredAt:new Date().toISOString().slice(0,10),kind:"production Vite web assets, not IPA",files,
  bytes:files.reduce((sum,file)=>sum+file.bytes,0),gzipBytes:files.reduce((sum,file)=>sum+file.gzipBytes,0),containsE2EHarness};
await writeFile(new URL("../docs/bundle-size.json",import.meta.url),JSON.stringify(report,null,2)+"\n");
console.log(`Release web assets: ${files.length} files, ${report.bytes} bytes; gzip ${report.gzipBytes} bytes. IPA size requires Xcode/App Store measurement.`);
