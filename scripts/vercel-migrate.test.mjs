import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { test } from 'node:test';
import { DB1_MIGRATIONS, directDatabaseUrl, isProductionBuild, pendingMigrations } from './vercel-migrate.mjs';

const baseline = { name: '20260419000000_init', sql: 'SELECT 1;\n' };
const files = [baseline, ...DB1_MIGRATIONS.map(name => ({ name, sql: 'SELECT 2;\n' }))];
const applied = file => ({ migration_name: file.name, checksum: createHash('sha256').update(file.sql).digest('hex'), finished_at: new Date(), rolled_back_at: null });
const production = { VERCEL: '1', VERCEL_ENV: 'production', VERCEL_DEPLOYMENT_ID: 'dpl_synthetic' };

test('Preview, local, regular CI and local Vercel CLI do not run', () => {
  for (const env of [{}, { CI: 'true' }, { CI: '1', VERCEL_ENV: 'production' },
    { ...production, VERCEL_ENV: 'preview' }, { VERCEL_ENV: 'production' },
    { VERCEL: '1', VERCEL_ENV: 'production' },
    { ...production, VERCEL_CLI: '1' },
    { ...production, GITHUB_ACTIONS: 'true' }]) {
    assert.equal(isProductionBuild(env), false);
  }
  assert.equal(isProductionBuild({ ...production, CI: '1' }), true);
});

test('direct URL aliases and priority; no fallback to pooled DATABASE_URL', () => {
  const url = 'postgresql://test:synthetic@127.0.0.1:5432/test';
  for (const key of ['DATABASE_URL_UNPOOLED', 'DIRECT_URL', 'POSTGRES_URL_NON_POOLING']) {
    assert.equal(directDatabaseUrl({ [key]: url }), url);
  }
  assert.equal(directDatabaseUrl({ DATABASE_URL_UNPOOLED: url, DIRECT_URL: 'invalid' }), url);
  for (const env of [{ DATABASE_URL: url }, { DIRECT_URL: 'invalid' },
    { DIRECT_URL: 'postgresql://a:b@ep-test-pooler.neon.tech/test' },
    { DIRECT_URL: `${url}?pgbouncer=true` }]) assert.throws(() => directDatabaseUrl(env));
});

test('only zero or exactly the three DB1 migrations are permitted', () => {
  assert.deepEqual(pendingMigrations(files, [applied(baseline)]), DB1_MIGRATIONS);
  assert.deepEqual(pendingMigrations(files, files.map(applied)), []);
  assert.throws(() => pendingMigrations(files, files.slice(0, 2).map(applied)), /Unexpected pending/);
  assert.throws(() => pendingMigrations([...files, { name: 'extra', sql: 'SELECT 3;' }], [applied(baseline)]), /Unexpected pending/);
});

test('missing baseline, failed, duplicate, modified and unknown histories stop', () => {
  const row = applied(baseline);
  for (const history of [[], [{ ...row, finished_at: null }], [row, row],
    [{ ...row, checksum: 'bad' }], [row, { ...row, migration_name: 'unknown' }]]) {
    assert.throws(() => pendingMigrations(files, history));
  }
  assert.throws(() => pendingMigrations([baseline], [row]), /DB1 migration files are missing/);
});

test('Prisma line ending checksum tolerance and resolved rollback records', () => {
  const row = applied({ ...baseline, sql: 'SELECT 1;\r\n' });
  assert.deepEqual(pendingMigrations(files, [row, { ...row, finished_at: null, rolled_back_at: new Date() }]), DB1_MIGRATIONS);
});
