-- No FK cascade: deleting a user must not delete the one-time receipt.
ALTER TABLE feedback_unlock ADD COLUMN user_id text;
-- Global within this service DB, independent of AUTH_SECRET, session and realm.
CREATE UNIQUE INDEX feedback_unlock_user_id_unique ON feedback_unlock(user_id);
-- Legacy account_hash rows must be backfilled before issuing any new wallet.
-- Runtime fails closed while any remain. See docs/feedback-unlock.md.
