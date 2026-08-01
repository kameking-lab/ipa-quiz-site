export interface FaqItem {
  question: string;
  answer: string;
}

/**
 * ブログ本文の「## よくある質問」節から Q&A ペアを抽出し、FAQPage 構造化データに
 * 流し込める形にする。本文フォーマットは `## よくある質問` 見出しに続けて
 * `**Q. ...？**` 行 + 直後の回答段落（1 行）が並ぶ形を前提とする。
 * markdown のリンク記法 `[text](url)` はテキストのみに、強調 `**` は除去する。
 */
export function extractFaq(body: string): FaqItem[] {
  const items: FaqItem[] = [];
  const faqSection = body
    .split(/(?=^## )/m)
    .find((section) => /^## よくある質問/.test(section));
  if (!faqSection) return items;

  let current: FaqItem | null = null;
  for (const rawLine of faqSection.split("\n")) {
    const line = rawLine.trim();
    const qMatch = line.match(/^\*\*Q[0-9]*[.．]?\s*(.+?)\*\*$/);
    if (qMatch) {
      if (current && current.answer) items.push(current);
      current = { question: qMatch[1].trim(), answer: "" };
    } else if (current && line && !line.startsWith("#")) {
      const text = line
        .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
        .replace(/\*\*/g, "")
        .trim();
      if (text) current.answer += (current.answer ? " " : "") + text;
    }
  }
  if (current && current.answer) items.push(current);

  return items.map((item) => ({
    question: item.question,
    answer: item.answer.slice(0, 500),
  }));
}
