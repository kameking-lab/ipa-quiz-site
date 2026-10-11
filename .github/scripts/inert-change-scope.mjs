import { execFileSync, spawnSync } from 'node:child_process';
import { appendFileSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const auditUrl = new URL('./inert-change-audit.json', import.meta.url);
const codeExtension = /\.(?:[cm]?[jt]s|[jt]sx|css|scss)$/;
// Overmatch ambiguous consumers: a new/changed reader needs another dependency audit.
const consumerPattern = String.raw`["'][^"']*(reports|docs|scripts|prepared)[/\\]|["'](node:)?(fs|child_process)(/[^"']*)?["']|import[[:space:]]*[(]|require[[:space:]]*[(]|import[.]meta|process[.]cwd|eval[[:space:]]*[(]|new[[:space:]]+Function|@import|url[[:space:]]*[(]`;
const sourcePaths = ['app', 'components', 'lib', 'hooks', 'data', 'public', 'prisma',
  ...['ts', 'tsx', 'mts', 'cts', 'js', 'jsx', 'mjs', 'cjs', 'css', 'scss'].map(ext => `:(top,glob)*.${ext}`)];
const configPath = /^(?:(?:package\.json|pnpm-lock\.yaml|pnpm-workspace\.yaml|\.npmrc|\.pnpmfile\.cjs|\.gitattributes|vercel\.(?:json|ts)|(?:next|postcss|sentry[^/]*)\.config\.[^/]+|tsconfig[^/]*\.json)|prisma\/schema\.prisma)$/;

function git(cwd, args) {
  return execFileSync('git', args, { cwd, encoding: 'utf8', maxBuffer: 8 * 1024 * 1024,
    timeout: 15_000, stdio: ['ignore', 'pipe', 'pipe'] });
}

export function dependencySnapshot(cwd, ref) {
  const entries = new Map(git(cwd, ['ls-tree', '-r', '-z', '--full-tree', ref])
    .split('\0').filter(Boolean).map(entry => {
      const match = /^(\d+) (blob|commit) ([a-f0-9]+)\t(.+)$/.exec(entry);
      if (!match) throw new Error('Unknown tree entry');
      return [match[4], { mode: match[1], blob: match[3] }];
    }));
  const found = spawnSync('git', ['grep', '-I', '-l', '-z', '-E', consumerPattern,
    ref, '--', ...sourcePaths], { cwd, encoding: 'utf8', maxBuffer: 8 * 1024 * 1024,
    timeout: 15_000 });
  if (found.error || ![0, 1].includes(found.status)) throw new Error('Cannot inspect consumers');
  const consumers = found.stdout.split('\0').filter(Boolean)
    .map(entry => entry.slice(ref.length + 1)).filter(path => codeExtension.test(path)).sort();
  const configs = [...entries.keys()].filter(path => configPath.test(path)).sort();
  const describe = paths => Object.fromEntries(paths.map(path => [path, entries.get(path)]));
  return { configs: describe(configs), consumers: describe(consumers) };
}

export function isInertPath(path) {
  return /^(?:reports|docs\/evidence|docs\/candidates)\/.+\.(?:md|json|jsonl|txt|csv)$/.test(path)
    && !path.split('/').some(part => !part || part === '.' || part === '..' || part.startsWith('.'))
    && !/[\0\r\n\\]/.test(path);
}

export function classifyChanges({ cwd = process.cwd(), base, head, audit }) {
  const full = reason => ({ inert: false, reason });
  try {
    if (![base, head].every(ref => /^[a-f0-9]{40}$/.test(ref ?? ''))) return full('missing/invalid commit');
    // Never use HEAD^: earlier undeployed application changes still matter.
    for (const ref of [base, head]) git(cwd, ['cat-file', '-e', `${ref}^{commit}`]);
    const raw = git(cwd, ['diff', '--raw', '-z', '--no-renames', '--no-abbrev', base, head, '--']);
    const records = raw.split('\0');
    if (records.pop() !== '') return full('malformed diff');
    if (!records.length) return full('empty diff/redeploy');
    for (let i = 0; i < records.length; i += 2) {
      const entry = /^:(\d+) (\d+) [a-f0-9]{40} [a-f0-9]{40} ([AMD])$/.exec(records[i]);
      const path = records[i + 1];
      if (!entry || !path || !isInertPath(path)) return full('code, asset or unknown path changed');
      if (![entry[1], entry[2]].every(mode => ['000000', '100644'].includes(mode))) {
        return full('non-regular file/mode change');
      }
    }
    const expected = audit ?? JSON.parse(readFileSync(auditUrl, 'utf8'));
    if (expected.version !== 1) return full('unknown dependency audit');
    const actual = dependencySnapshot(cwd, head);
    for (const key of ['configs', 'consumers']) {
      if (JSON.stringify(actual[key]) !== JSON.stringify(expected[key])) {
        return full('build configuration or possible consumer changed since audit');
      }
    }
    return { inert: true, reason: 'only audited non-code records changed', files: records.length / 2 };
  } catch {
    return full('history or dependency proof unavailable');
  }
}

function currentHead(cwd, head) {
  try { return git(cwd, ['rev-parse', 'HEAD']).trim() === head; } catch { return false; }
}

export function githubDecision(env, cwd = process.cwd(), audit) {
  if (env.GITHUB_EVENT_NAME !== 'pull_request') return { inert: false, reason: 'main/non-PR always validates' };
  if (!currentHead(cwd, env.SCOPE_HEAD_SHA)) return { inert: false, reason: 'head does not match this checkout' };
  return classifyChanges({ cwd, base: env.SCOPE_BASE_SHA, head: env.SCOPE_HEAD_SHA, audit });
}

export function vercelDecision(env, cwd = process.cwd(), audit) {
  if (env.VERCEL_ENV !== 'preview') return { inert: false, reason: 'production/non-preview always builds' };
  const base = env.VERCEL_GIT_PREVIOUS_SHA;
  const head = env.VERCEL_GIT_COMMIT_SHA;
  if (![base, head].every(ref => /^[a-f0-9]{40}$/.test(ref ?? ''))) {
    return { inert: false, reason: 'first preview or missing successful deployment history' };
  }
  if (!currentHead(cwd, head)) return { inert: false, reason: 'head does not match this checkout' };
  try {
    git(cwd, ['merge-base', '--is-ancestor', base, head]);
  } catch {
    return { inert: false, reason: 'previous successful preview is not an available ancestor' };
  }
  return classifyChanges({ cwd, base, head, audit });
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const mode = process.argv[2];
  const decision = mode === 'vercel' ? vercelDecision(process.env) : githubDecision(process.env);
  console.log(JSON.stringify(decision));
  if (mode === 'github') {
    if (!process.env.GITHUB_OUTPUT) throw new Error('GITHUB_OUTPUT required');
    appendFileSync(process.env.GITHUB_OUTPUT, `inert=${decision.inert}\n`);
    if (process.env.GITHUB_STEP_SUMMARY) {
      appendFileSync(process.env.GITHUB_STEP_SUMMARY, `### Browser applicability\n${decision.reason}.\n${decision.inert ? 'Build/browser are not applicable to this complete PR diff; quality and scope regressions still run.' : 'Run the complete build and browser suite for this head.'}\n`);
    }
  } else {
    // Vercel: 0 ignores a preview build, 1 continues it. Unknown/error => build.
    process.exitCode = mode === 'vercel' && decision.inert ? 0 : 1;
  }
}
