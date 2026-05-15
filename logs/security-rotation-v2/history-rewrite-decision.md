# Git history rewrite decision — Basic Auth credential rotation

Decision date: 2026-05-15
Decision: **DO NOT rewrite history**

## Context

- Repository visibility: PUBLIC
- Leaked literal `ADMIN_BASIC_PASS` was committed to `.github/workflows/e2e.yml`, `playwright.config.ts`, and `tests/e2e/admin-auth.spec.ts`
- Leaked literal is present in git history from commits `af9f548` and `2ea0d8b` onward, and in `logs/status-snapshot-20260515-1759.md` on side branch `claude/peaceful-pascal-1b0265`
- This PR (security/rotate-basic-auth-v2) removes the literal from the current tree and migrates to GitHub Secrets / Vercel env

## Reasoning

1. **Once rotation completes**, the leaked literal is invalidated (new GitHub Secrets + new Vercel env). The historical value can no longer be used against this system.
2. **History rewrite (e.g., `git filter-repo`) requires force push to `main`**, which is destructive for all contributors and external forks/clones. The cost/risk is high.
3. **Public exposure already happened**. The leaked value may already be in third-party clones, GitHub mirrors, or search indices. Rewriting our history does not retract those copies.
4. **Audit trail value**: keeping the historical record makes the incident response visible and demonstrates that the issue was acknowledged and remediated.

## What to do instead

- Complete rotation (Phase 1–3 in manual-steps.md): invalidates the leaked value
- Verify CI green with new secrets (Phase 7.2)
- Merge this PR (Phase 8)
- Optionally add a `SECURITY.md` note acknowledging the incident (deferred, not part of this PR)
- **Critical: side branch `claude/peaceful-pascal-1b0265` contains the literal in `logs/status-snapshot-20260515-1759.md`.** Before merging that branch to main, redact the literal in that file. (Out of scope for this PR.)

## When to reconsider

If the leaked literal is ever used in a way that re-enables access (e.g., backed up elsewhere with the same value, or copied to another system without rotation), revisit and consider history scrubbing.
