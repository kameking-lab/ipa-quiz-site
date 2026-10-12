// Generic analysis and duplicate NW/DB practice articles use their worked guides.
export const ANALYSIS_ARTICLE_EXAMS = ["ip", "sg", "fe", "ap", "sc", "nw", "db", "es", "st", "sa", "pm", "sm", "au"] as const;
export const BLOG_ARTICLE_ALIASES: Record<string, string> = {
  ...Object.fromEntries(ANALYSIS_ARTICLE_EXAMS.map(exam => [`${exam}-jisseki-mondai-bunseki`, `${exam}-hinnshutsu-ronten-toppu10`])),
  "nw-yoru-tokurensyu": "nw-hinnshutsu-ronten-toppu10",
  "db-yoru-tokurensyu": "db-hinnshutsu-ronten-toppu10",
};

export function canonicalBlogSlug(slug: string): string {
  return BLOG_ARTICLE_ALIASES[slug] ?? slug;
}
