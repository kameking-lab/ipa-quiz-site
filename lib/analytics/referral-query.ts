/** Preserve only public campaign/scope fields through server redirects. */
export function referralRedirectHref(path: string, params: Record<string, string | string[] | undefined>): string {
  const query = new URLSearchParams();
  for (const key of ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "subject", "year"]) {
    const raw = params[key];
    const value = Array.isArray(raw) ? raw[0] : raw;
    if (value) query.set(key, value.slice(0, 200));
  }
  return query.size ? `${path}?${query}` : path;
}

export function filterReferralPapers<T extends { subject: string; date: string }>(papers: readonly T[], subject?: string, year?: string): T[] {
  if (year && !/^\d{4}$/.test(year)) return [];
  return papers.filter(paper => (!subject || paper.subject === subject) && (!year || paper.date.startsWith(`${year}-`)));
}
