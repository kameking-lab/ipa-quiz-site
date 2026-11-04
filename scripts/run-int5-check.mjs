// Local synthetic validation only. Never inherit service credentials into checks.
import { spawn, execFileSync } from 'node:child_process';
import { createWriteStream, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { resolve } from 'node:path';
const [label, tool, ...args] = process.argv.slice(2);
if (!/^[a-z0-9-]+$/.test(label ?? '') || !['pnpm', 'node'].includes(tool)) throw new Error('Invalid check');
const out = resolve('reports/int5-20261104/validation');
mkdirSync(out, { recursive: true });
const logfile = resolve(out, `${label}.log`);
const log = createWriteStream(logfile);
const env = { ...process.env, CI: 'true', NEXT_TELEMETRY_DISABLED: '1' };
for (const key of Object.keys(env)) {
  if (/(?:SECRET|TOKEN|API_KEY|DATABASE_URL|DIRECT_URL|AUTH_URL|^PG|^STRIPE_|^MOBILE_|^FEEDBACK_UNLOCK_|^SMTP_|^RESEND_|^SENTRY_|^UPSTASH_|^KV_)/.test(key)) delete env[key];
}
const command = process.execPath;
const commandArgs = tool === 'pnpm'
  ? ['C:/Program Files/nodejs/node_modules/corepack/dist/pnpm.js', ...args]
  : args;
const startedAt = new Date().toISOString();
const sourceHead = execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();
const child = spawn(command, commandArgs, { env, windowsHide: true, stdio: ['ignore', 'pipe', 'pipe'] });
child.stdout.pipe(log, { end: false });
child.stderr.pipe(log, { end: false });
child.on('error', error => { log.write(`${error.name}: ${error.message}\n`); });
child.on('close', code => {
  log.end(() => {
    const result = { label, command: [tool, ...args], sourceHead, startedAt, finishedAt: new Date().toISOString(),
      exitCode: code, logSha256: createHash('sha256').update(readFileSync(logfile)).digest('hex'),
      environment: 'CI=true; inherited service credentials and mobile/feedback rollout configuration removed; no secret env files loaded' };
    writeFileSync(resolve(out, `${label}.result.json`), JSON.stringify(result, null, 2) + '\n');
    console.log(`${label}: exit ${code}`);
    process.exitCode = code ?? 1;
  });
});
