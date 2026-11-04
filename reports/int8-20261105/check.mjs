import fs from "node:fs";
import path from "node:path";
import {createHash} from "node:crypto";
import {spawn,execFileSync} from "node:child_process";
const [label,...args]=process.argv.slice(2);
if (!/^[a-z0-9-]+$/.test(label)||!args.length) throw new Error("label and pnpm args required");
if (fs.readdirSync(".").some(n=>/^\.env(?:\.|$)/.test(n)&&n!==".env.example")) throw new Error("Unexpected env file");
const out=path.resolve("reports/int8-20261105");
const env=Object.fromEntries(Object.entries(process.env).filter(([k])=>["systemroot","windir","path","comspec","temp","tmp","pathext","userprofile","localappdata","appdata"].includes(k.toLowerCase())));
env.NEXT_TELEMETRY_DISABLED="1";
if(label.startsWith("e2e")){env.CI="1";env.PLAYWRIGHT_JSON_OUTPUT_FILE=path.join(out,label+".json");}
const diff=execFileSync("git",["diff","HEAD","--","app","components","lib","data","prisma","mobile","scripts","package.json","pnpm-lock.yaml","next.config.ts","eslint.config.mjs"],{maxBuffer:32*1024*1024});
const sourceHash=createHash("sha256").update(diff).digest("hex");
const fd=fs.openSync(path.join(out,label+".log"),"w"), started=new Date();
const child=spawn(process.execPath,[path.join(path.dirname(process.execPath),"node_modules/corepack/dist/pnpm.js"),...args],{env,stdio:["ignore",fd,fd],windowsHide:true});
child.on("error",e=>{throw e;});
child.on("exit",(code,signal)=>{
 fs.closeSync(fd);
 const result={label,args,started:started.toISOString(),finished:new Date().toISOString(),elapsedMs:Date.now()-started.getTime(),code,signal,baseHead:execFileSync("git",["rev-parse","HEAD"],{encoding:"utf8"}).trim(),sourceHash,environment:"OS allowlist only; no env files or service credentials",logSha256:createHash("sha256").update(fs.readFileSync(path.join(out,label+".log"))).digest("hex"),buildId:fs.existsSync(".next/BUILD_ID")?fs.readFileSync(".next/BUILD_ID","utf8").trim():null};
 fs.writeFileSync(path.join(out,label+".result.json"),JSON.stringify(result,null,2)+"\n");
 console.log(JSON.stringify(result));process.exitCode=code??1;
});
