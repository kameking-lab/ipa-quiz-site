// Extract the reviewer JSON from a CLI result that may wrap it in prose or a fenced block.
export function parseReviewResult(result) {
  const text = String(result ?? '');
  const candidates = [];
  for (const m of text.matchAll(/```(?:json)?\s*([\s\S]*?)```/g)) candidates.push(m[1]);
  const start = text.indexOf('{"questions"');
  if (start >= 0) candidates.push(text.slice(start, text.lastIndexOf('}') + 1));
  candidates.push(text);
  for (const c of candidates.reverse()) {
    try { const v = JSON.parse(c.trim()); if (Array.isArray(v?.questions)) return v; } catch {}
  }
  return null;
}
