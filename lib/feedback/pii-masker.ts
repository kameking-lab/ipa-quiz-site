// 正規表現ベースの軽量 PII マスキング。
//
// ユーザーが入力したフィードバック本文をログ・公開掲載前に通すと、
// 一般的な個人情報パターンを `[削除済み]` に置換する。LLM 不使用なので
// オフライン環境でも動作し、副作用なし。
//
// 検出対象:
//   - メールアドレス
//   - 電話番号（日本の市外局番形式 / 携帯 / フリーダイヤル）
//   - 12 桁数字列（マイナンバー想定 — 区切りあり/なし）
//   - 個人名（敬称付き: ○○さん / ○○様 / ○○先生 / ○○氏）
//
// 置換結果は元と同じ文字列タイプ（comment などの自由記述フィールド）に
// そのまま埋め戻す。マッチがないフィールドは触らない。

const REPLACEMENT = "[削除済み]";

interface Rule {
  name: string;
  pattern: RegExp;
}

// 順序が重要: 長く特異性が高いものを先に当てる（メール → 電話 → 数字列 → 名前）
const RULES: Rule[] = [
  {
    name: "email",
    pattern: /[\w.+-]+@[\w-]+(?:\.[\w-]+)+/g,
  },
  {
    name: "phone",
    // 0X-XXXX-XXXX / 0XX-XXX-XXXX / 0XXX-XX-XXXX / 携帯 0[789]0-XXXX-XXXX / フリーダイヤル 0120-XXX-XXX
    // ハイフンなし版（10-11 桁先頭 0）も拾う
    pattern:
      /(?:0\d{1,4}-\d{1,4}-\d{3,4}|0[789]0-?\d{4}-?\d{4}|0120-?\d{2,3}-?\d{3,4}|\b0\d{9,10}\b)/g,
  },
  {
    name: "mynumber",
    // マイナンバー風 12 桁数字（区切りあり: 4-4-4 / なし）
    pattern: /(?:\d{4}[-\s]?\d{4}[-\s]?\d{4}|\b\d{12}\b)/g,
  },
  {
    name: "name-honorific",
    // 漢字/カタカナ 2-6 文字 + 敬称（さん/様/氏/先生/くん/ちゃん）
    // ひらがなは助詞と区別がつきにくいので除外
    pattern:
      /[一-鿿゠-ヿ][一-鿿゠-ヿ\s]{0,5}(?:さん|様|氏|先生|くん|ちゃん)/g,
  },
];

export interface MaskResult {
  /** 置換後の本文 */
  masked: string;
  /** ルール別ヒット数 */
  hits: Record<string, number>;
}

/**
 * `text` 内の PII パターンを `[削除済み]` に置換する。
 * 元文字列とマッチ件数を併せて返す。
 */
export function maskPII(text: string): MaskResult {
  if (!text) {
    return { masked: text, hits: {} };
  }
  const hits: Record<string, number> = {};
  let masked = text;
  for (const rule of RULES) {
    let count = 0;
    masked = masked.replace(rule.pattern, () => {
      count++;
      return REPLACEMENT;
    });
    if (count > 0) hits[rule.name] = count;
  }
  return { masked, hits };
}

/** マッチ件数の合計 */
export function totalHits(hits: Record<string, number>): number {
  return Object.values(hits).reduce((a, b) => a + b, 0);
}
