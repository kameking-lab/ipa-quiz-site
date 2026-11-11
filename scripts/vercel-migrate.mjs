// Runs before Next.js only in a hosted Vercel production build.
// Never forward Prisma output/errors: they can contain database credentials.
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { cp, mkdtemp, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export const DB1_MIGRATIONS = Object.freeze([
  '20261104000000_mobile_revenuecat',
  '20261104010000_mobile_account_deletion',
  '20261104020000_mobile_store_environments',
]);

// Owner approved both feedback migrations with DB1 on 2026-11-05 12:10 JST.
export const MIG2_MIGRATIONS = Object.freeze([
  '20261103000000_feedback_unlock',
  '20261103010000_feedback_unlock_user_id',
  ...DB1_MIGRATIONS,
]);

// Owner approved the chihuahua cloud-save table (PetProfile) on 2026-11-08.
export const PET1_MIGRATIONS = Object.freeze([
  '20261108000000_pet_cloud_profile',
]);

const feedbackApproval = '-- Owner approved production application with DB1: 2026-11-05 12:10 JST (MIG2).';
const feedbackOriginalNote = '-- Branch-only migration: production application requires separate owner approval.';

class MigrationGateError extends Error {}

export function isProductionBuild(env) {
  // Vercel itself sets CI=1. CI alone must not disable hosted production builds.
  const externalCi = ['GITHUB_ACTIONS', 'GITLAB_CI', 'CIRCLECI', 'TF_BUILD', 'BUILDKITE', 'JENKINS_URL', 'TEAMCITY_VERSION'];
  return env.VERCEL === '1' && env.VERCEL_ENV === 'production'
    && /^dpl_[A-Za-z0-9]+$/.test(env.VERCEL_DEPLOYMENT_ID ?? '')
    && !env.VERCEL_CLI && !externalCi.some(key => env[key] && env[key] !== 'false');
}

export function directDatabaseUrl(env) {
  const key = ['DATABASE_URL_UNPOOLED', 'DIRECT_URL', 'POSTGRES_URL_NON_POOLING']
    .find(name => env[name]?.trim());
  if (!key) throw new MigrationGateError('A direct database URL is required (DATABASE_URL_UNPOOLED / DIRECT_URL / POSTGRES_URL_NON_POOLING).');
  let url;
  try { url = new URL(env[key]); } catch { throw new MigrationGateError('Invalid direct database URL.'); }
  if (!['postgres:', 'postgresql:'].includes(url.protocol) || !url.hostname
    || /-pooler(?:\.|$)/i.test(url.hostname) || url.searchParams.get('pgbouncer') === 'true') {
    throw new MigrationGateError('A direct PostgreSQL connection is required; pooled URLs are rejected.');
  }
  return env[key];
}

function checksums({ name, sql }) {
  // Only the approval comment changed. Accept histories created before approval
  // without accepting any change to the executable SQL or other migrations.
  const versions = [sql];
  if (name === MIG2_MIGRATIONS[0] && (sql.startsWith(`${feedbackApproval}\n`)
    || sql.startsWith(`${feedbackApproval}\r\n`))) {
    versions.push(feedbackOriginalNote + sql.slice(feedbackApproval.length));
  }
  // Prisma accepts the original, LF and CRLF versions of a migration checksum.
  return versions.flatMap(value => [value, value.replace(/\r\n/g, '\n'), value.replace(/\r?\n/g, '\r\n')])
    .map(value => createHash('sha256').update(value).digest('hex'));
}

export function pendingMigrations(files, history) {
  if (!history.length) throw new MigrationGateError('Missing migration baseline.');
  const applied = new Set();
  for (const row of history) {
    if (row.rolled_back_at) continue;
    const migration = files.find(file => file.name === row.migration_name);
    if (!row.finished_at || !migration || applied.has(row.migration_name)
      || !checksums(migration).includes(row.checksum)) {
      throw new MigrationGateError('Failed, unknown, duplicate or modified migration history; no deploy attempted.');
    }
    applied.add(row.migration_name);
  }
  const pending = files.filter(file => !applied.has(file.name)).map(file => file.name);
  // PET1 is the newest approved migration, so it is pending together with
  // any older approved group that a database has not received yet.
  const allowed = [[...MIG2_MIGRATIONS, ...PET1_MIGRATIONS], [...DB1_MIGRATIONS, ...PET1_MIGRATIONS], [...PET1_MIGRATIONS], []];
  if (!allowed.some(group => pending.length === group.length
    && pending.every((name, index) => name === group[index]))) {
    throw new MigrationGateError(`Unexpected pending migrations: ${pending.join(', ')} (only MIG2+PET1, DB1+PET1, PET1 alone or zero are allowed); no deploy attempted.`);
  }
  if ([...MIG2_MIGRATIONS, ...PET1_MIGRATIONS].some(name => !files.some(file => file.name === name))) {
    throw new MigrationGateError('Approved migration files are missing; no deploy attempted.');
  }
  return pending;
}

export async function migrateForVercel(env = process.env) {
  if (!isProductionBuild(env)) {
    console.log('[vercel-migrate] Skipped: not a hosted Vercel production build.');
    return;
  }
  const url = directDatabaseUrl(env);
  const repo = resolve(dirname(fileURLToPath(import.meta.url)), '..');
  const require = createRequire(import.meta.url);
  const cli = require.resolve('prisma/build/index.js');
  const temp = await mkdtemp(join(tmpdir(), 'vercel-db1-'));
  let client;
  try {
    // Freeze the files we inspect and deploy; Prisma never discovers repo .env files.
    await cp(join(repo, 'prisma/migrations'), join(temp, 'migrations'), { recursive: true });
    const schema = join(temp, 'schema.prisma');
    await writeFile(schema, 'datasource db {\n  provider = "postgresql"\n  url = env("DATABASE_URL")\n}\n');
    const names = (await readdir(join(temp, 'migrations'), { withFileTypes: true }))
      .filter(entry => entry.isDirectory()).map(entry => entry.name).sort();
    const files = await Promise.all(names.map(async name => ({
      name, sql: await readFile(join(temp, 'migrations', name, 'migration.sql'), 'utf8'),
    })));
    const { PrismaClient } = require('@prisma/client');
    client = new PrismaClient({ datasourceUrl: url, log: [] });
    const childEnv = { ...env, DATABASE_URL: url, NO_COLOR: '1', CHECKPOINT_DISABLE: '1' };
    // Explicit URL is passed only in the child environment, never argv or output.
    function prisma(command, pending = []) {
      const result = spawnSync(process.execPath, [cli, 'migrate', command, '--schema', schema], {
        cwd: temp, env: childEnv, encoding: 'utf8', windowsHide: true,
        stdio: ['ignore', 'pipe', 'pipe'], timeout: 120_000, maxBuffer: 4 * 1024 * 1024,
      });
      const output = `${result.stdout ?? ''}\n${result.stderr ?? ''}`.replace(/\u001b\[[0-9;]*m/g, '');
      const expectedStatus = pending.length ? 1 : 0;
      // Prisma prints "migration" (singular) when exactly one is pending.
      const statusOk = command !== 'status' || (result.status === expectedStatus
        && (pending.length ? /Following migrations? have not yet been applied:/.test(output)
          && pending.every(name => output.includes(name)) : output.includes('Database schema is up to date!')));
      if (result.error || !statusOk || (command === 'deploy' && result.status !== 0)) {
        throw new MigrationGateError(`Prisma migrate ${command} failed; build stopped (database output withheld).`);
      }
    }
    await client.$transaction(async tx => {
      // Serialize cooperating production builds across preflight, deploy and postflight.
      const [lock] = await tx.$queryRawUnsafe('SELECT pg_try_advisory_xact_lock(1852392757, 4931) AS acquired');
      if (!lock.acquired) throw new MigrationGateError('Another production migration check is running; build stopped.');
      const history = () => tx.$queryRawUnsafe('SELECT migration_name, checksum, finished_at, rolled_back_at FROM "_prisma_migrations" ORDER BY started_at, id');
      const pending = pendingMigrations(files, await history());
      prisma('status', pending);
      console.log(`[vercel-migrate] Preflight passed: ${pending.length} pending approved migrations.`);
      prisma('deploy');
      if (pendingMigrations(files, await history()).length !== 0) throw new MigrationGateError('Migrations remain after deploy; build stopped.');
      prisma('status');
      console.log('[vercel-migrate] Migration deploy and clean postflight passed.');
    }, { timeout: 270_000, maxWait: 5_000 });
  } finally {
    await client?.$disconnect();
    await rm(temp, { recursive: true, force: true });
  }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try { await migrateForVercel(); }
  catch (error) {
    // Error objects/stack traces, SQL and Prisma datasource banners are not log-safe.
    const reason = error instanceof MigrationGateError ? error.message : 'Database or migration check failed; build stopped. Database output withheld.';
    console.error(`[vercel-migrate] FAILED: ${reason}`);
    process.exitCode = 1;
  }
}
