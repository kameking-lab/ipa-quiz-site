/**
 * 用語の和洋・略称・代表的言い換えのエイリアス辞書。
 * - キーは glossary の `term` 完全一致。
 * - 値は corpus.text に注入される追加トークン。タイトル一致ボーナス（reranker）も底上げされる。
 *
 * 既存の eval で「クエリと用語タイトルが共通トークンを持たず BM25 で取れない」
 * パターンを補強する。retriever 側ではエイリアス完全一致による
 * glossary doc のピン留め注入にも使う。
 *
 * 別ファイルに切り出した理由: corpus.ts と retriever.ts の両方から参照する必要があり、
 * corpus → retriever / retriever → corpus の循環依存を避ける。
 */
export const GLOSSARY_ALIASES: Record<string, string[]> = {
  マシン学習: ["機械学習", "教師あり学習", "教師なし学習", "強化学習", "Machine Learning"],
  公開鍵暗号: ["RSA", "楕円曲線暗号", "ECC", "非対称鍵", "asymmetric cryptography"],
  XSS: ["クロスサイトスクリプティング", "反射型 XSS", "格納型 XSS", "DOM-based XSS", "Cross-Site Scripting"],
  ACID: ["2 相コミット", "2PC", "二相コミット", "atomicity consistency isolation durability", "トランザクション"],
  CIDR: ["サブネットマスク", "/24", "/16", "/8", "プレフィックス長", "クラスレス"],
  "B木 / B+木": ["Bツリー", "B+ツリー", "B-tree", "B+ tree", "リーフノード"],
  ハッシュ関数: ["MD5", "SHA-256", "SHA-1", "メッセージダイジェスト"],
  デジタル署名: ["電子署名", "署名検証", "digital signature"],
  "OAuth 2.0": ["OAuth2", "OIDC", "OpenID Connect", "認可コードフロー", "JWT"],
  正規化: ["第1正規形", "第2正規形", "第3正規形", "BCNF", "ボイス・コッド"],
  "TCP/IP": ["IP", "UDP", "ICMP", "L4", "L3", "OSI 参照モデル"],
  個人情報保護法: ["個人情報", "個人データ", "本人同意", "オプトアウト"],
  EVM: ["アーンドバリュー", "Earned Value", "PV", "EV", "AC", "SV", "CV", "SPI", "CPI"],
  DNS: ["ドメイン名前解決", "名前解決", "Aレコード", "CNAME", "MX", "リゾルバ"],
};

/**
 * クエリにいずれかのエイリアスが完全部分文字列として含まれる用語名の集合を返す。
 * 「RSA 暗号の鍵長」のような ASCII 略称 / カナ別名を含むクエリで、
 * 対応する glossary doc を強くピン留めするのに使う。
 */
export function matchAliasGlossaryTerms(query: string): Set<string> {
  const matched = new Set<string>();
  if (!query) return matched;
  const lower = query.toLowerCase();
  for (const [term, aliases] of Object.entries(GLOSSARY_ALIASES)) {
    for (const alias of aliases) {
      if (alias.length < 2) continue;
      if (lower.includes(alias.toLowerCase())) {
        matched.add(term);
        break;
      }
    }
  }
  return matched;
}
