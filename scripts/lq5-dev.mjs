// Only an owned localhost preview, with an explicit environment allowlist.
import { spawn } from "node:child_process";
const env = Object.fromEntries(Object.entries(process.env).filter(([k]) => /^(SYSTEMROOT|WINDIR|PATH|PATHEXT|TEMP|TMP|USERPROFILE|APPDATA|LOCALAPPDATA|COMSPEC|PROGRAMFILES|PROGRAMFILES\(X86\)|PROGRAMDATA|HOMEDRIVE|HOMEPATH)$/i.test(k)));
env.NEXT_TELEMETRY_DISABLED = "1";
env.NODE_OPTIONS = "--max-old-space-size=6144";
const mode = process.argv[2] ?? "dev";
if (!["dev", "build", "start"].includes(mode)) throw new Error("Expected dev, build or start");
const args = mode === "build" ? ["build", "--webpack"] : [mode, ...(mode === "dev" ? ["--webpack"] : []), "-H", "127.0.0.1", "-p", "3275"];
const child = spawn(process.execPath, ["node_modules/next/dist/bin/next", ...args], {env, stdio:"inherit", windowsHide:true});
for(const signal of ["SIGTERM","SIGINT"]) process.on(signal,()=>child.kill());
child.on("exit",code=>process.exit(code ?? 1));
