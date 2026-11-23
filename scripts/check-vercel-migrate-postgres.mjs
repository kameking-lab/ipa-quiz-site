// Local-only integration harness. No .env or inherited service credentials used.
// node scripts/check-vercel-migrate-postgres.mjs <external-tooling-directory>
import assert from 'node:assert/strict';
import { execFileSync, spawn, spawnSync } from 'node:child_process';
import { cp, mkdir, mkdtemp, readFile, readdir, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import net from 'node:net';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { DB1_MIGRATIONS, MIG2_MIGRATIONS, PET1_MIGRATIONS } from './vercel-migrate.mjs';

const repo = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const tooling = resolve(process.argv[2]);
const require = createRequire(join(tooling, 'package.json'));
const { Client } = require('pg');
const bin = join(tooling, 'node_modules/@embedded-postgres/windows-x64/native/bin');
const cli = join(repo, 'node_modules/prisma/build/index.js');
const entry = join(repo, 'scripts/vercel-migrate.mjs');
const temp = await mkdtemp(join(tmpdir(), 'int5b-postgres-'));
const data = join(temp, 'data');
const port = await new Promise(resolvePort => {
  const socket = net.createServer();
  socket.listen(0, '127.0.0.1', () => { const p = socket.address().port; socket.close(() => resolvePort(p)); });
});
const env = { ...process.env, NEXT_TELEMETRY_DISABLED: '1' };
for (const key of Object.keys(env)) {
  if (/(?:SECRET|TOKEN|API_KEY|DATABASE_URL|DIRECT_URL|POSTGRES|AUTH_URL|^PG|^STRIPE_|^MOBILE_|^FEEDBACK_UNLOCK_|^SMTP_|^RESEND_|^SENTRY_|^UPSTASH_|^KV_|^SLACK_|^DISCORD_|^EMAIL_|^NEXT_PUBLIC_|^VERCEL|^CI$|^GITHUB_|^GITLAB_|^CIRCLECI$|^TF_BUILD$|^BUILDKITE$|^JENKINS_|^TEAMCITY_)/.test(key)) delete env[key];
}
const connection = database => ({ host: '127.0.0.1', port, user: 'int5b', database });
const url = database => `postgresql://int5b@127.0.0.1:${port}/${database}?schema=public`;
execFileSync(join(bin, 'initdb.exe'), ['-D', data, '-U', 'int5b', '-A', 'trust', '--encoding=UTF8', '--no-locale'], { windowsHide: true, stdio: 'pipe', env });
const server = spawn(join(bin, 'postgres.exe'), ['-D', data, '-h', '127.0.0.1', '-p', String(port)], { windowsHide: true, stdio: 'ignore', env });
server.on('error', () => {});
let admin;
try {
  for (let attempt = 0; attempt < 100; attempt++) {
    const candidate = new Client(connection('postgres'));
    try { await candidate.connect(); admin = candidate; break; }
    catch { await candidate.end().catch(() => {}); await new Promise(resolveWait => setTimeout(resolveWait, 100)); }
  }
  assert.ok(admin, 'embedded PostgreSQL started on loopback');
  console.log((await admin.query('SELECT version()')).rows[0].version);
  const names = (await readdir(join(repo, 'prisma/migrations'))).filter(name => /^\d/.test(name)).sort();
  const beforePet1 = names.filter(name => !PET1_MIGRATIONS.includes(name));
  const beforeDb1 = beforePet1.filter(name => !DB1_MIGRATIONS.includes(name));
  const beforeMig2 = beforePet1.filter(name => !MIG2_MIGRATIONS.includes(name));
  async function baseline(database, include) {
    await admin.query(`CREATE DATABASE "${database}"`);
    const root = join(temp, database);
    await mkdir(join(root, 'migrations'), { recursive: true });
    await writeFile(join(root, 'schema.prisma'), 'datasource db {\n provider = "postgresql"\n url = env("DATABASE_URL")\n}\n');
    await cp(join(repo, 'prisma/migrations/migration_lock.toml'), join(root, 'migrations/migration_lock.toml'));
    for (const name of include) await cp(join(repo, 'prisma/migrations', name), join(root, 'migrations', name), { recursive: true });
    // Three/zero must also work with the original, pre-approval SQL checksum.
    if (include.includes(MIG2_MIGRATIONS[0])) {
      const feedbackSql = join(root, 'migrations', MIG2_MIGRATIONS[0], 'migration.sql');
      await writeFile(feedbackSql, (await readFile(feedbackSql, 'utf8')).replace(/^-- Owner approved[^\r\n]+/,
        '-- Branch-only migration: production application requires separate owner approval.'));
    }
    execFileSync(process.execPath, [cli, 'migrate', 'deploy', '--schema', join(root, 'schema.prisma')], {
      cwd: root, env: { ...env, DATABASE_URL: url(database) }, encoding: 'utf8', windowsHide: true, timeout: 120_000, stdio: 'pipe',
    });
    const client = new Client(connection(database));
    await client.connect();
    await client.query(`INSERT INTO "User" (id,email,"updatedAt") VALUES ('int5b-user','int5b@example.invalid',TIMESTAMP '2026-11-04'); INSERT INTO "StudyRecord" (id,"userId","questionId",correct) VALUES ('int5b-study','int5b-user','int5b-question',true)`);
    return client;
  }
  function run(database, flags = {}, directKey = 'DATABASE_URL_UNPOOLED') {
    const result = spawnSync(process.execPath, [entry], {
      cwd: repo, env: { ...env, VERCEL: '1', VERCEL_ENV: 'production', VERCEL_DEPLOYMENT_ID: 'dpl_synthetic', CI: '1',
        // A poisoned pooled URL proves the migration only uses the direct alias.
        DATABASE_URL: 'postgresql://synthetic:do-not-log@invalid-pooler.neon.tech/wrong', [directKey]: url(database), ...flags },
      encoding: 'utf8', windowsHide: true, timeout: 180_000,
    });
    const output = `${result.stdout ?? ''}${result.stderr ?? ''}`;
    assert.doesNotMatch(output, /postgres(?:ql)?:\/\/|do-not-log|invalid-pooler|127\.0\.0\.1|int5b@/);
    assert.equal(result.error, undefined);
    console.log(output.trim());
    return { code: result.status, output };
  }
  async function snapshot(client) {
    const tables = (await client.query(`SELECT tablename FROM pg_tables WHERE schemaname='public' ORDER BY tablename`)).rows;
    const result = {};
    for (const { tablename } of tables) result[tablename] = (await client.query(`SELECT to_jsonb(t) AS value FROM "${tablename}" t ORDER BY to_jsonb(t)::text`)).rows;
    return result;
  }
  const expected = { six: 6, four: 4, one: 1, zero: 0 };
  for (const mode of ['six', 'four', 'one', 'zero', 'unexpected']) {
    const database = `int5b_${mode}`;
    const included = mode === 'zero' ? names : mode === 'six' ? beforeMig2 : mode === 'one' ? beforePet1
      : mode === 'unexpected' ? beforeDb1.slice(0, -1) : beforeDb1;
    const client = await baseline(database, included);
    try {
      const before = await snapshot(client);
      const result = run(database, {}, mode === 'zero' ? 'DIRECT_URL' : 'DATABASE_URL_UNPOOLED');
      const after = await snapshot(client);
      if (mode === 'unexpected') {
        assert.equal(result.code, 1);
        assert.deepEqual(after, before, 'unexpected pending: every table and history row unchanged');
        assert.doesNotMatch(result.output, /Preflight passed|deploy and clean/);
        for (const name of names.filter(name => !included.includes(name))) assert.ok(result.output.includes(name), `error lists ${name}`);
      } else {
        assert.equal(result.code, 0);
        assert.match(result.output, new RegExp(`Preflight passed: ${expected[mode]} pending`));
        assert.match(result.output, /deploy and clean postflight passed/);
        for (const [table, rows] of Object.entries(before)) {
          if (table !== '_prisma_migrations') assert.deepEqual(after[table], rows, `preserve ${table}`);
        }
        assert.deepEqual((await client.query(`SELECT migration_name FROM "_prisma_migrations" WHERE finished_at IS NOT NULL AND rolled_back_at IS NULL ORDER BY migration_name`)).rows.map(row => row.migration_name), names);
        if (mode === 'zero') assert.deepEqual(after, before, 'zero pending deploy changes no data/history');
        const notices = [];
        client.on('notice', notice => notices.push(notice.message));
        await client.query(await readFile(join(repo, 'docs/mobile-db-check.sql'), 'utf8'));
        assert.ok(notices.some(notice => notice.includes('MobileAuthCode:')));
        const columns = (await client.query(`SELECT column_name FROM information_schema.columns WHERE table_schema='public' AND table_name IN ('MobileAuthCode','MobileRevenueCatAccount','DeletedBillingRetention')`)).rows;
        assert.equal(columns.length, 13);
        for (const table of ['feedback_unlock', 'feedback_unlock_grant', 'feedback_unlock_rate']) {
          assert.ok(Object.hasOwn(after, table), `${table} exists`);
        }
        const feedbackColumn = (await client.query(`SELECT data_type FROM information_schema.columns WHERE table_schema='public' AND table_name='feedback_unlock' AND column_name='user_id'`)).rows;
        assert.deepEqual(feedbackColumn, [{ data_type: 'text' }]);
        const petColumns = (await client.query(`SELECT column_name, data_type FROM information_schema.columns WHERE table_schema='public' AND table_name='PetProfile' ORDER BY column_name`)).rows;
        assert.deepEqual(petColumns.map(row => row.column_name), ['createdAt', 'document', 'updatedAt', 'userId', 'version']);
        assert.equal(petColumns.find(row => row.column_name === 'document').data_type, 'jsonb');
        await client.query(`INSERT INTO "PetProfile" ("userId","document","updatedAt") VALUES ('int5b-user','{}'::jsonb,NOW())`);
        await assert.rejects(client.query(`INSERT INTO "PetProfile" ("userId","document","updatedAt") VALUES ('no-such-user','{}'::jsonb,NOW())`), /foreign key/);
        await client.query(`DELETE FROM "PetProfile" WHERE "userId"='int5b-user'`);
        if (mode === 'six') {
          assert.equal(run(database).code, 0, 'six applied: rerun accepts zero pending');
          assert.deepEqual(await snapshot(client), after, 'rerun preserves all data and history');
        }
      }
      console.log(`PASS ${mode}: exit=${result.code}; verified complete database snapshots and migration history`);
    } finally { await client.end(); }
  }
  for (const flags of [{ VERCEL_ENV: 'preview' }, { VERCEL: '' }, { VERCEL_DEPLOYMENT_ID: '' }, { VERCEL_CLI: '1' }, { GITHUB_ACTIONS: 'true' }]) {
    assert.equal(run('does_not_exist', flags).code, 0, 'skip without database access');
  }
  assert.equal(run('does_not_exist', { DATABASE_URL_UNPOOLED: '' }).code, 1, 'missing direct URL stops');
  assert.equal(run('does_not_exist').code, 1, 'database errors are caught without leaking connection details');
  // Exercise the actual package build chain: migration failure must prevent Next.
  const build = spawnSync(process.execPath, ['C:/Program Files/nodejs/node_modules/corepack/dist/pnpm.js', 'run', 'build'], {
    cwd: repo, env: { ...env, VERCEL: '1', VERCEL_ENV: 'production', VERCEL_DEPLOYMENT_ID: 'dpl_synthetic', CI: '1' },
    encoding: 'utf8', windowsHide: true, timeout: 30_000,
  });
  assert.equal(build.status, 1);
  assert.match(build.stderr, /direct database URL is required/);
  assert.doesNotMatch(`${build.stdout}${build.stderr}`, /▲ Next\.js|Creating an optimized production build/);
  console.log('PASS actual pnpm build: missing direct URL exits 1 before Next.js starts');
  const existing = new Client(connection('int5b_zero'));
  await existing.connect();
  try {
    const before = await snapshot(existing);
    await existing.query(`UPDATE "_prisma_migrations" SET finished_at=NULL WHERE migration_name=$1`, [DB1_MIGRATIONS[0]]);
    const failed = await snapshot(existing);
    assert.equal(run('int5b_zero').code, 1);
    assert.deepEqual(await snapshot(existing), failed, 'failed history unchanged');
    await existing.query(`UPDATE "_prisma_migrations" SET finished_at=($1::jsonb->>'finished_at')::timestamptz WHERE migration_name=$2`, [JSON.stringify(before._prisma_migrations.find(row => row.value.migration_name === DB1_MIGRATIONS[0]).value), DB1_MIGRATIONS[0]]);
    await existing.query('BEGIN');
    await existing.query('SELECT pg_advisory_xact_lock(1852392757, 4931)');
    assert.equal(run('int5b_zero').code, 1, 'concurrent build stops');
    await existing.query('ROLLBACK');
    assert.deepEqual(await snapshot(existing), before);
  } finally { await existing.end(); }
  console.log('PASS: environment skips, secret suppression, failed-history and concurrent-build guards');
} finally {
  await admin?.end();
  execFileSync(join(bin, 'pg_ctl.exe'), ['-D', data, 'stop', '-m', 'fast', '-w'], { windowsHide: true, stdio: 'pipe', timeout: 30_000, env });
  console.log(`Embedded PostgreSQL stopped. Synthetic cluster retained: ${temp}`);
}
