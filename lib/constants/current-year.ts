/**
 * Single source for "the current year" used in copy that must roll forward
 * automatically on each deploy (e.g. blog titles 【YYYY年最新】). Evaluated at
 * module load — for SSG/ISR pages this is the build/render time, which is the
 * intended behaviour: redeploying refreshes the year without manual edits.
 *
 * Uses JST (UTC+9) so the rollover happens at the Japanese new year, matching
 * the audience and the exam calendar.
 */
function jstNow(): Date {
  const now = new Date();
  return new Date(now.getTime() + 9 * 60 * 60 * 1000);
}

export const CURRENT_YEAR = jstNow().getUTCFullYear();

/** Current Reiwa (令和) era year. 令和1 = 2019. */
export const CURRENT_REIWA = CURRENT_YEAR - 2018;
