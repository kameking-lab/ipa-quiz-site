// Dedicated, credential-free local production server. No .env files are allowed.
import fs from 'node:fs/promises';
import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';
import { createHash } from 'node:crypto';
import { existsSync, readFileSync, unlinkSync } from 'node:fs';
import { setTimeout as delay } from 'node:timers/promises';
import { assertListenerOwner } from './kperf1-local.mjs';
const require = createRequire(import.meta.url);
const port = Number(process.argv[2] ?? 3107);
if (!Number.isInteger(port) || port < 1024 || port > 65535) throw new Error('Invalid local port');
if ((await fs.readdir('.')).some(name => /^\.env(?:\.|$)/.test(name) && name !== '.env.example')) throw new Error('Remove local env files before isolated measurement');
const buildId = (await fs.readFile('.next/BUILD_ID', 'utf8')).trim();
const env = Object.fromEntries(Object.entries(process.env).filter(([key]) => ['systemroot', 'windir', 'path', 'comspec', 'temp', 'tmp', 'pathext', 'userprofile', 'localappdata', 'appdata'].includes(key.toLowerCase())));
env.NODE_ENV = 'production';
env.NEXT_TELEMETRY_DISABLED = '1';
const child = spawn(process.execPath, [require.resolve('next/dist/bin/next'), 'start', '-H', '127.0.0.1', '-p', String(port)], { env, stdio: 'inherit', windowsHide: true });
await fs.mkdir('.cache/kperf1', { recursive: true });
const manifestPath = `.cache/kperf1/server-${port}.json`;
const cleanup = () => { try { if (existsSync(manifestPath) && JSON.parse(readFileSync(manifestPath, 'utf8')).pid === child.pid) unlinkSync(manifestPath); } catch { /* never delete a different server's receipt */ } };
process.on('exit', cleanup);
process.on('SIGINT', () => { cleanup(); child.kill(); });
process.on('SIGTERM', () => { cleanup(); child.kill(); });
child.on('error', () => { cleanup(); process.exit(1); });
child.on('exit', code => { cleanup(); process.exit(code ?? 1); });
let ready = false;
for (let attempt = 0; attempt < 30; attempt++) {
  await delay(500);
  try {
    assertListenerOwner(port, child.pid);
    const response = await fetch(`http://127.0.0.1:${port}/`, { redirect: 'error', signal: AbortSignal.timeout(5000) });
    if (!response.ok) continue;
    ready = true; break;
  } catch { /* wait only for this child's listener */ }
}
if (!ready) { child.kill(); throw new Error('Isolated server did not become ready'); }
const hash = file => createHash('sha256').update(readFileSync(file)).digest('hex');
const manifest = { buildId, pid: child.pid, base: `http://127.0.0.1:${port}`, launcherSha256: hash(import.meta.filename), localHelperSha256: hash('scripts/kperf1-local.mjs'), environment: 'whitelisted OS variables only; NODE_ENV=production; no env files', command: 'next start', timestamp: new Date().toISOString() };
await fs.writeFile(`${manifestPath}.${child.pid}.tmp`, JSON.stringify(manifest, null, 2));
await fs.rename(`${manifestPath}.${child.pid}.tmp`, manifestPath);
console.log('KPERF1 isolated production listener verified');
