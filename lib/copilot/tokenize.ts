// 日本語+英数字のクエリ/文書を BM25 でスコアできるトークン列に変換する。
// 外部 morphological analyzer (MeCab, kuromoji) には依存しない。
// 戦略:
//   - CJK 文字（漢字・ひらがな・カタカナ）は char-bigram で切る
//   - ASCII 英数字は単語分割 + lowercase
//   - 記号類はトークン区切りとして扱う

const CJK_RE = /[぀-ヿ一-鿿㐀-䶿ｦ-ﾝ]/;
const ASCII_WORD_RE = /[A-Za-z0-9][A-Za-z0-9._+-]*/g;

// 検索の邪魔になる超頻出語 / 接続詞
const STOPWORDS = new Set([
  "the",
  "a",
  "an",
  "is",
  "are",
  "of",
  "to",
  "in",
  "on",
  "for",
  "as",
  "at",
  "by",
  "with",
  "and",
  "or",
  "this",
  "that",
  "それ",
  "これ",
  "あれ",
  "ここ",
  "そこ",
  "あそこ",
]);

/**
 * 文字列を BM25 トークン列に変換する。
 * - CJK は char-bigram（"暗号化" -> ["暗号", "号化"]）
 * - ASCII は単語境界 + lowercase
 * - 1 文字の CJK や記号のみのトークンは捨てる
 */
export function tokenize(text: string): string[] {
  if (!text) return [];
  const tokens: string[] = [];

  // ASCII 単語をまず抜き出す
  const asciiMatches = text.match(ASCII_WORD_RE) ?? [];
  for (const m of asciiMatches) {
    const lower = m.toLowerCase();
    if (lower.length >= 2 && !STOPWORDS.has(lower)) {
      tokens.push(lower);
    }
  }

  // CJK は char-bigram
  let cjkBuf = "";
  for (const ch of text) {
    if (CJK_RE.test(ch)) {
      cjkBuf += ch;
    } else {
      if (cjkBuf.length >= 2) {
        for (let i = 0; i < cjkBuf.length - 1; i++) {
          const bg = cjkBuf.slice(i, i + 2);
          if (!STOPWORDS.has(bg)) tokens.push(bg);
        }
      } else if (cjkBuf.length === 1) {
        // 1 文字単独は捨てる
      }
      cjkBuf = "";
    }
  }
  if (cjkBuf.length >= 2) {
    for (let i = 0; i < cjkBuf.length - 1; i++) {
      const bg = cjkBuf.slice(i, i + 2);
      if (!STOPWORDS.has(bg)) tokens.push(bg);
    }
  }

  return tokens;
}

/** unique token list. 主にクエリ側で使う。 */
export function uniqueTokens(text: string): string[] {
  return [...new Set(tokenize(text))];
}
