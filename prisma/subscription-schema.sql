-- REVIEW ONLY: this file is not executed by application startup or tests.
-- Apply to an explicitly authorized target using its migration owner, never the runtime DML role.
-- Existing Auth, legacy billing, question history, and all user rows are preserved.
CREATE TABLE IF NOT EXISTS billing_subscription_account (
  user_id text NOT NULL REFERENCES "User"(id),
  mode text NOT NULL CHECK (mode IN ('stripe-test','stripe-live')),
  source_instance text NOT NULL,
  payload jsonb NOT NULL,
  PRIMARY KEY (user_id,mode)
);
CREATE TABLE IF NOT EXISTS billing_subscription_identity (
  source_instance text NOT NULL,
  mode text NOT NULL CHECK (mode IN ('stripe-test','stripe-live')),
  kind text NOT NULL CHECK (kind IN ('customer','session','subscription','invoice','payment','refund','dispute','invoice_payment','event')),
  provider_id text NOT NULL,
  user_id text NOT NULL REFERENCES "User"(id),
  PRIMARY KEY (source_instance,mode,kind,provider_id)
);
CREATE INDEX IF NOT EXISTS billing_subscription_identity_owner ON billing_subscription_identity(user_id,mode);
