-- Branch-only migration: production application requires separate owner approval.
-- Billing tables also use SQL migrations rather than generated Prisma models.
CREATE TABLE feedback_unlock (
  event_id text PRIMARY KEY,
  sequence bigserial UNIQUE NOT NULL,
  realm text NOT NULL,
  account_hash text,
  browser_hash text,
  network_day_hash text,
  anonymous_id text NOT NULL,
  received_at timestamptz NOT NULL DEFAULT now(),
  choices text[] NOT NULL,
  requested_qualifications text[] NOT NULL,
  comment_masked text NOT NULL CHECK (char_length(comment_masked) <= 1000),
  retired boolean NOT NULL DEFAULT false,
  UNIQUE (realm, account_hash),
  UNIQUE (realm, browser_hash),
  UNIQUE (realm, network_day_hash)
);
CREATE TABLE feedback_unlock_grant (
  event_id text NOT NULL REFERENCES feedback_unlock(event_id),
  day text NOT NULL,
  question_id text NOT NULL,
  PRIMARY KEY (event_id, day, question_id)
);
CREATE INDEX feedback_unlock_realm_sequence ON feedback_unlock(realm, sequence);
CREATE TABLE feedback_unlock_rate (
  key text PRIMARY KEY,
  count integer NOT NULL,
  expires_at timestamptz NOT NULL
);
CREATE INDEX feedback_unlock_rate_expiry ON feedback_unlock_rate(expires_at);
