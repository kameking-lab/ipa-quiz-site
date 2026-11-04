// Windows local verification with OS variables only, never deployed credentials.
import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { spawn, execFileSync } from 'node:child_process';

const [label, ...extra] = process.argv.slice(2);
if (!['typecheck', 'lint', 'test', 'build', 'e2e'].includes(label)) throw new Error('Unknown check');
if (fs.readdirSync('.').some(name => /^\.env(?:\.|$)/.test(name) && name !== '.env.example')) throw new Error('Local env files must not be loaded by isolated verification');
const out = path.resolve('.cache/kux1/validation');
fs.mkdirSync(out, { recursive: true });
const env = Object.fromEntries(Object.entries(process.env).filter(([key]) => ['systemroot', 'windir', 'path', 'comspec', 'temp', 'tmp', 'pathext', 'userprofile', 'localappdata', 'appdata'].includes(key.toLowerCase())));
env.NEXT_TELEMETRY_DISABLED = '1';
if (label === 'e2e') {
  env.CI = '1';
  env.PLAYWRIGHT_JSON_OUTPUT_FILE = path.join(out, 'e2e-results.json');
}
const source = execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();
const sourceHash = createHash('sha256').update(source).update(execFileSync('git', ['diff', 'HEAD'], { maxBuffer: 16 * 1024 * 1024 })).digest('hex');
const log = path.join(out, `${label}.log`);
const fd = fs.openSync(log, 'w');
const started = Date.now();
const child = spawn(process.execPath, [path.join(path.dirname(process.execPath), 'node_modules/corepack/dist/pnpm.js'), label, ...extra], { env, stdio: ['ignore', fd, fd], windowsHide: true });
child.on('error', error => { fs.closeSync(fd); throw error; });
child.on('exit', (code, signal) => {
  fs.closeSync(fd);
  const result = { label, args: extra, exitCode: code, signal, elapsedMs: Date.now() - started, source, sourceHash, log, environment: 'OS whitelist only; no env files or production credentials', timestamp: new Date().toISOString(), ...(['build', 'e2e'].includes(label) && fs.existsSync('.next/BUILD_ID') ? { buildId: fs.readFileSync('.next/BUILD_ID', 'utf8').trim() } : {}) };
  fs.writeFileSync(path.join(out, `${label}-exit.json`), JSON.stringify(result, null, 2));
  console.log(JSON.stringify(result));
  process.exitCode = code ?? 1;
});
