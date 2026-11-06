import {spawn,execFileSync} from "node:child_process";
import {createWriteStream, existsSync, mkdirSync, readdirSync, writeFileSync} from "node:fs";
import {fileURLToPath} from "node:url";
import {resolve} from "node:path";

// Do not inherit service credentials, SDK keys, or a developer's .env files.
const root=fileURLToPath(new URL("../../",import.meta.url));
const allowed=new Set(["PATH","SYSTEMROOT","WINDIR","TEMP","TMP","USERPROFILE","APPDATA","LOCALAPPDATA","COMSPEC","PATHEXT","NUMBER_OF_PROCESSORS","PROCESSOR_ARCHITECTURE"]);
const env=Object.fromEntries(Object.entries(process.env).filter(([key])=>allowed.has(key.toUpperCase())));
Object.assign(env,{NEXT_TELEMETRY_DISABLED:"1",NODE_OPTIONS:"--max-old-space-size=8192"});
for(const dir of [root,resolve(root,"mobile")]) {
  if(readdirSync(dir).some(name=>name.startsWith(".env")&&name!==".env.example")) {
    throw new Error("Local .env file detected; isolated verification refuses to load it");
  }
}
const [label,task,...args]=process.argv.slice(2);
if(!/^[a-z0-9-]+$/.test(label??"")||!task)throw new Error("Usage: run-isolated-check.mjs <log-label> <node-script|strict> [args...]");
const out=resolve(root,"mobile/docs/evidence/ios1g");
mkdirSync(out,{recursive:true});
const log=createWriteStream(resolve(out,`${label}.log`));
const command=task==="strict"?["node_modules/next/dist/bin/next","build","--webpack"]:[task,...args];
if(task==="strict")Object.assign(env,{NODE_ENV:"production",WEB_STRICT_CONTENT_GATE:"true",MOBILE_IAP_ENABLED:"true"});
if(!existsSync(resolve(root,command[0])))throw new Error("Node script not found");
writeFileSync(resolve(out,`${label}.run.json`),JSON.stringify({startedAt:new Date().toISOString(),gitHead:execFileSync("git",["rev-parse","HEAD"],{cwd:root,env,encoding:"utf8"}).trim(),command,environmentKeys:Object.keys(env).sort(),strictContentGate:env.WEB_STRICT_CONTENT_GATE==="true"},null,2)+"\n");
const child=spawn(process.execPath,command,{cwd:root,env,stdio:["ignore","pipe","pipe"]});
for(const stream of [child.stdout,child.stderr])stream.on("data",data=>{log.write(data);process.stdout.write(data);});
child.on("error",error=>{log.end(`Runner error: ${error.message}\n`);process.exitCode=1;});
child.on("close",(code,signal)=>{
  const result={exitCode:code,signal,finishedAt:new Date().toISOString()};
  writeFileSync(resolve(out,`${label}.exit.json`),JSON.stringify(result,null,2)+"\n");
  log.end();process.exitCode=code??1;
});
