// Only an owned localhost preview, with an explicit environment allowlist.
import { spawn } from "node:child_process";
const env = Object.fromEntries(Object.entries(process.env).filter(([k]) => /^(SYSTEMROOT|WINDIR|PATH|PATHEXT|TEMP|TMP|USERPROFILE|APPDATA|LOCALAPPDATA|COMSPEC|PROGRAMFILES|PROGRAMFILES\(X86\)|PROGRAMDATA|HOMEDRIVE|HOMEPATH)$/i.test(k)));
env.NEXT_TELEMETRY_DISABLED = "1";
const child = spawn(process.execPath, ["node_modules/next/dist/bin/next", "dev", "--webpack", "-H", "127.0.0.1", "-p", "3275"], {env, stdio:"inherit", windowsHide:true});
for(const signal of ["SIGTERM","SIGINT"]) process.on(signal,()=>child.kill());
child.on("exit",code=>process.exit(code ?? 1));
