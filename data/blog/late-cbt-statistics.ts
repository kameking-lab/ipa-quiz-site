import type { Question } from "@/lib/questions/types";

/** Editorial snapshot scope: three published years, specialist morning only. */
export function aggregateLateCbtQuestions(questions: Question[], exam: string) {
  const pool = questions.filter(q => q.exam === exam && q.year >= 2023 && q.year <= 2025 && q.session === (exam === "ap" ? "am" : "am2"));
  const count = (values: string[]) => {
    const counts = new Map<string, number>();
    values.forEach(value => counts.set(value, (counts.get(value) ?? 0) + 1));
    return [...counts].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], "ja")).map(([name, count]) => ({ name, count }));
  };
  return {
    total: pool.length,
    papers: count(pool.map(q => `${q.year}-${q.season}`)),
    categories: count(pool.map(q => q.category || "未分類")),
    tags: count(pool.flatMap(q => [...new Set(q.topicTags)])),
    untagged: pool.filter(q => q.topicTags.length === 0).length,
  };
}
