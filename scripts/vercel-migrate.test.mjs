import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { DB1_MIGRATIONS, MIG2_MIGRATIONS, PET1_MIGRATIONS, directDatabaseUrl, isProductionBuild, pendingMigrations } from './vercel-migrate.mjs';

const baseline = { name: '20260419000000_init', sql: 'SELECT 1;\n' };
const files = [baseline, ...[...MIG2_MIGRATIONS, ...PET1_MIGRATIONS].map(name => ({ name, sql: 'SELECT 2;\n' }))];
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

test('only MIG2+PET1, DB1+PET1, PET1 alone or zero migrations in order are permitted', () => {
  assert.deepEqual(pendingMigrations(files, [applied(baseline)]), [...MIG2_MIGRATIONS, ...PET1_MIGRATIONS]);
  assert.deepEqual(pendingMigrations(files, files.slice(0, 3).map(applied)), [...DB1_MIGRATIONS, ...PET1_MIGRATIONS]);
  assert.deepEqual(pendingMigrations(files, files.slice(0, -1).map(applied)), PET1_MIGRATIONS);
  assert.deepEqual(pendingMigrations(files, files.map(applied)), []);
  // Every other subset (including feedback-only and partial applications) stops.
  for (let mask = 0; mask < 64; mask++) {
    const history = [applied(baseline), ...files.slice(1).filter((_, i) => mask & (1 << i)).map(applied)];
    if ([0, 3, 31, 63].includes(mask)) continue;
    assert.throws(() => pendingMigrations(files, history), /Unexpected pending migrations:/);
  }
  const reversed = [baseline, ...files.slice(1).reverse()];
  assert.throws(() => pendingMigrations(reversed, [applied(baseline)]), /Unexpected pending/);
  assert.throws(() => pendingMigrations([baseline, ...files.slice(1, 3), ...files.slice(3).reverse()], files.slice(0, 3).map(applied)), /Unexpected pending/);
  assert.throws(() => pendingMigrations([...files, { name: 'extra', sql: 'SELECT 3;' }], [applied(baseline)]), error => {
    for (const name of [...MIG2_MIGRATIONS, ...PET1_MIGRATIONS, 'extra']) assert.ok(error.message.includes(name));
    return /no deploy attempted/.test(error.message);
  });
});

test('missing baseline, failed, duplicate, modified and unknown histories stop', () => {
  const row = applied(baseline);
  for (const history of [[], [{ ...row, finished_at: null }], [row, row],
    [{ ...row, checksum: 'bad' }], [row, { ...row, migration_name: 'unknown' }]]) {
    assert.throws(() => pendingMigrations(files, history));
  }
  assert.throws(() => pendingMigrations([baseline], [row]), /Approved migration files are missing/);
});

test('Prisma line ending checksum tolerance and resolved rollback records', () => {
  const row = applied({ ...baseline, sql: 'SELECT 1;\r\n' });
  assert.deepEqual(pendingMigrations(files, [row, { ...row, finished_at: null, rolled_back_at: new Date() }]), [...MIG2_MIGRATIONS, ...PET1_MIGRATIONS]);
});

test('old feedback approval comment checksums remain valid; executable SQL changes stop', () => {
  const name = MIG2_MIGRATIONS[0];
  const sql = readFileSync(new URL(`../prisma/migrations/${name}/migration.sql`, import.meta.url), 'utf8');
  const oldSql = sql.replace(/^-- Owner approved[^\r\n]+/, '-- Branch-only migration: production application requires separate owner approval.');
  assert.notEqual(oldSql, sql);
  const approvedFiles = files.map(file => file.name === name ? { name, sql } : file);
  for (const historicalSql of [sql, oldSql, oldSql.replace(/\r?\n/g, '\r\n')]) {
    assert.deepEqual(pendingMigrations(approvedFiles, [applied(baseline), applied({ name, sql: historicalSql }), applied(files[2])]), [...DB1_MIGRATIONS, ...PET1_MIGRATIONS]);
  }
  const history = [applied(baseline), applied({ name, sql: oldSql })];
  assert.throws(() => pendingMigrations(approvedFiles.map(file => file.name === name ? { ...file, sql: `${sql}\nSELECT 42;` } : file), history), /modified migration history/);
  assert.throws(() => pendingMigrations(files, [applied(baseline), applied({ name, sql: oldSql })]), /modified migration history/);
});
