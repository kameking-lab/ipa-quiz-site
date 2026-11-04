-- Read-only pre/post snapshot. Run in the same target/schema as Prisma.
-- Counts all public tables, including existing Web/billing data; prints no rows/PII.
BEGIN READ ONLY;

SELECT name, to_regclass(format('public.%I', name)) IS NOT NULL AS present
FROM (VALUES ('User'), ('MobileRevenueCatAccount'), ('MobileAuthCode'),
             ('DeletedBillingRetention'), ('_prisma_migrations')) AS expected(name);

SELECT table_name, column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_schema = 'public'
  AND table_name IN ('MobileRevenueCatAccount', 'MobileAuthCode', 'DeletedBillingRetention')
ORDER BY table_name, ordinal_position;

SELECT c.relname AS table_name, con.conname, pg_get_constraintdef(con.oid) AS definition
FROM pg_constraint con
JOIN pg_class c ON c.oid = con.conrelid
JOIN pg_namespace n ON n.oid = c.relnamespace
WHERE n.nspname = 'public'
  AND c.relname IN ('MobileRevenueCatAccount', 'MobileAuthCode', 'DeletedBillingRetention')
ORDER BY c.relname, con.conname;

-- Dynamic SELECT avoids errors when the new tables do not exist yet.
DO $$
DECLARE
  t record;
  row_count bigint;
BEGIN
  FOR t IN SELECT table_schema, table_name FROM information_schema.tables
           WHERE table_schema = 'public' AND table_type = 'BASE TABLE'
           ORDER BY table_name
  LOOP
    EXECUTE format('SELECT count(*) FROM %I.%I', t.table_schema, t.table_name) INTO row_count;
    RAISE NOTICE '%: % rows', t.table_name, row_count;
  END LOOP;
END $$;

SELECT migration_name, finished_at, rolled_back_at
FROM public._prisma_migrations
ORDER BY migration_name;

COMMIT;
