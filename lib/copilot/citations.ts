import type { RerankedCandidate } from "./types";

/**
 * モデル応答に注入する RAG コンテキストブロックを組み立てる。
 * 番号 [1], [2], [3] のラベル付きで passages を提示し、
 * モデルにはこれらの番号で引用する旨を別途指示する（lib/ai/prompts.ts 側）。
 */
export function buildRAGContextBlock(passages: RerankedCandidate[]): string {
  if (passages.length === 0) return "";
  const lines: string[] = [];
  lines.push("# 参照可能な出典（以下のみ参照可。これ以外の知識で答えないでください）");
  passages.forEach((p, i) => {
    const num = i + 1;
    lines.push("");
    lines.push(`[${num}] ${p.doc.title}`);
    lines.push(`URL: ${p.doc.url}`);
    lines.push(`本文:`);
    // 過度に長い passage はトリム。原典 URL でユーザーが本文を確認できる前提。
    const body = p.doc.text.length > 1200 ? `${p.doc.text.slice(0, 1200)}…` : p.doc.text;
    lines.push(body);
  });
  return lines.join("\n");
}

/**
 * モデル応答の末尾に決定的に付与する出典フッターを組み立てる。
 * モデルが [1][2] と本文中で参照することを期待し、フッターでは
 * その番号と URL を一覧化する。モデルの幻覚出典に依存しない。
 */
export function buildCitationFooter(passages: RerankedCandidate[]): string {
  if (passages.length === 0) return "";
  const lines: string[] = [];
  lines.push("");
  lines.push("---");
  lines.push("**出典**");
  passages.forEach((p, i) => {
    const num = i + 1;
    lines.push(`- [${num}] [${p.doc.title}](${p.doc.url})`);
  });
  return lines.join("\n");
}

/**
 * 応答内に少なくとも 1 つの引用記法 ([N]) があるかチェックする。
 * 「出典なしで答えると検出 → 回答できません にフォールバック」の判定に使う。
 */
export function responseHasInlineCitation(text: string): boolean {
  return /\[\s*[1-9][0-9]?\s*\]/.test(text);
}

export const NO_GROUNDING_FALLBACK = [
  "申し訳ありません。確かな出典を見つけられなかったため、この質問には回答できません。",
  "",
  "次のいずれかをお試しください:",
  "- 質問を具体的な用語や試験区分（AP / SC / NW など）を入れて言い換える",
  "- 「用語解説」「選択肢を分析」などのクイックアクションを使う",
  "- 用語集 (/glossary) で関連語を直接調べる",
].join("\n");
