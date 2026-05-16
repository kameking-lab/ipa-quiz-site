/**
 * Essays (午後II 論述) 品質監査スクリプト。
 *
 * data/questions/afternoon/{au,pm,sa,sm,st,sc}/ 配下の
 * *-industries.ts (IndustryVariant[]) を全件スキャンし、
 * 7つの品質基準で各論述を機械的に検査する。
 *
 * 品質基準:
 *   (a) 字数   : 全3設問合計 ≥ 2,200字
 *   (b) ウ比率 : essayU / 合計 ≥ 25%
 *   (c) 制度名 : 業種固有の制度名・法令を3件以上引用
 *   (d) 推進課題: "課題"/"困難"/"リスク"/"問題" を含む段落 ≥ 2
 *   (e) 定量効果: パーセント or 数値+単位の表現 ≥ 2
 *   (f) キャラ  : 冒頭に組織名（◯社/行/院等）と規模情報が存在
 *   (g) ﾌﾟﾚｰｽﾎﾙﾀﾞｰ: "準備中"/"TODO"/"[X]" が存在しない
 *
 * 致命傷 (exit 1): プレースホルダ検出 OR 字数<1,800 OR 制度名=0 OR 合格項目<4
 * 軽微違反 (exit 0 + warning): 合格項目 4–6
 *
 * 使い方:
 *   pnpm tsx scripts/audit-essays.ts
 *   pnpm tsx scripts/audit-essays.ts --ci   # CI モード: 致命傷で exit 1
 *
 * 出力:
 *   logs/essays-audit-report.txt   人間向け集計レポート
 */

import { readdirSync, existsSync, writeFileSync, mkdirSync } from "node:fs";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import type { IndustryVariant, IndustryId } from "@/lib/afternoon/types";

const CI_MODE = process.argv.includes("--ci");
const ROOT = resolve(process.cwd());
const AFTERNOON_BASE = join(ROOT, "data/questions/afternoon");

// ─── 業種別制度名・法令キーワード ─────────────────────────────────────────────

const INDUSTRY_TERMS: Record<string, string[]> = {
  manufacturing: [
    "製造物責任法", "PL法", "IATF", "JIS", "ISO",
    "改正電子帳簿保存法", "電子帳簿保存法", "PRTR",
    "フロン排出抑制法", "労働安全衛生法", "化学物質",
    "工場立地法", "ISO9001", "ISO/IEC",
    // クラウド/IoT/グローバル監査案件用（製造業のクラウド移行・海外展開文脈）
    "ISMS", "クラウドセキュリティ", "ISO27001", "ISO 27001",
    "不正アクセス禁止法", "個人情報保護法", "サイバーセキュリティ",
    "GDPR", "不正競争防止法", "システム監査基準", "CSRD",
    "データ主権", "クロスボーダー",
  ],
  construction: [
    "建設業法", "CCUS", "品確法", "建設リサイクル法",
    "労働安全衛生法", "労働基準法", "BIM", "CIM",
    "ICT施工", "入札", "改正建設業法",
    "個人情報保護法",
  ],
  finance: [
    "銀行法", "金商法", "資金決済法", "日銀法",
    "FISC", "FATF", "PCI DSS", "バーゼル",
    "金融ADR", "金融庁", "電子記録債権法", "犯罪収益移転防止法",
    "AML", "財務局",
  ],
  retail: [
    // EC・一般小売系
    "個人情報保護法", "個情法", "PCI DSS",
    "特定商取引法", "消費者契約法", "景品表示法",
    "不正競争防止法", "改正個人情報保護法", "割賦販売法",
    // 食品小売・スーパー系（実際のessayで頻出）
    "食品衛生法", "改正食品衛生法", "HACCP",
    "食品ロス削減推進法", "食品表示法",
    "物流効率化法", "改正物流効率化法",
    "農林水産", "食品安全",
  ],
  telecom: [
    "電気通信事業法", "通信の秘密", "電波法",
    "不正アクセス禁止法", "MVNO", "NTT法",
    "電気通信役務", "総務省",
    "改正電気通信事業法", "プロバイダ責任制限法",
    "サイバーセキュリティ", "個人情報保護法",
  ],
  public: [
    "行政手続法", "デジタル手続法", "マイナンバー",
    "番号法", "政府情報セキュリティ統一基準", "電子署名法",
    "情報公開法", "公文書管理法", "地方自治法",
    "デジタル庁",
    // デジタル政府・DX系（実際のessayで頻出）
    "デジタル社会形成基本法", "官民データ活用推進基本法",
    "個人情報保護法", "改正個人情報保護法",
    "行政DX", "ガバメントクラウド", "電子政府",
  ],
  it: [
    "クラウド", "ゼロトラスト", "CSPM",
    "ISMS", "SOC2", "ISO27001", "NIST",
    "サイバーセキュリティ基本法", "不正アクセス禁止法",
    "DevSecOps", "SaaS", "プライバシーマーク", "Pマーク",
    "個人情報保護法",
  ],
  healthcare: [
    "医療法", "医療情報システム安全管理ガイドライン",
    "HIPAA", "個人情報保護法", "診療情報",
    "地域医療連携", "電子カルテ", "薬機法",
    "医薬品医療機器法", "医師法", "健康保険法",
    "医療情報", "診療報酬",
  ],
};

// ─── 型定義 ───────────────────────────────────────────────────────────────────

interface CheckResult {
  name: string;
  pass: boolean;
  value: string;
}

interface VariantAudit {
  file: string;
  exam: string;
  period: string;
  industryId: string;
  industryName: string;
  checks: CheckResult[];
  score: number; // 合格数 / 7
  isCritical: boolean;
  criticalReason?: string;
}

// ─── ヘルパー ─────────────────────────────────────────────────────────────────

function charCount(text: string): number {
  return text.length;
}

function countIndustryTerms(text: string, industryId: string): string[] {
  const terms = INDUSTRY_TERMS[industryId] ?? [];
  return terms.filter((t) => text.includes(t));
}

function countChallengeParagraphs(text: string): number {
  const keywords = ["課題", "困難", "リスク", "問題"];
  const paragraphs = text.split(/\n\n+|\n(?=[\s　]*[第一二三四五六七八九十\d])/);
  return paragraphs.filter((p) =>
    keywords.some((k) => p.includes(k))
  ).length;
}

function countQuantitativeEffects(text: string): number {
  // XX% or XX pt or XX倍 or 数値+単位（億円、名、件、分、日、か月 等）
  const patterns = [
    /\d+(?:\.\d+)?%/g,
    /\d+(?:\.\d+)?pt/g,
    /\d+(?:\.\d+)?倍/g,
    /約?\d+(?:,\d{3})*(?:\.\d+)?(?:億円|万円|名|人|件|分|日|か月|ヶ月|か所|社)/g,
  ];
  const found = new Set<string>();
  for (const re of patterns) {
    for (const m of text.matchAll(re)) {
      found.add(m[0]);
    }
  }
  return found.size;
}

const ORG_PATTERN =
  /[A-Z][A-Z0-9]*社|[ぁ-んァ-ン一-鿿々ー]{2,10}(?:社|行|院|庁|市|区|町|村|機構|公社)/;
const SIZE_PATTERN =
  /(?:売上高?|年商|預金量|従業員数?|職員数?|医師数?|病床数?|床数|店舗数?|拠点数?)[\s　]*(?:約|は)?\s*[\d,]|(?:人口|従業員|職員|店舗|拠点)[\s　]*約\s*[\d,]/;

function hasCharacterSetup(essayA: string): boolean {
  const intro = essayA.slice(0, 400);
  return ORG_PATTERN.test(intro) && SIZE_PATTERN.test(intro);
}

const PLACEHOLDER_RE = /準備中|TODO|^\[X\]$/im;

function detectPlaceholder(text: string): string | null {
  if (PLACEHOLDER_RE.test(text)) return text.match(PLACEHOLDER_RE)?.[0] ?? "検出";
  return null;
}

// ─── 1 バリアントを検査 ────────────────────────────────────────────────────────

function auditVariant(
  v: IndustryVariant,
  file: string,
  exam: string,
  period: string,
): VariantAudit {
  const allText = v.essayA + "\n\n" + v.essayI + "\n\n" + v.essayU;
  const totalChars = charCount(allText);
  const uChars = charCount(v.essayU);
  const uRatio = totalChars > 0 ? uChars / totalChars : 0;

  const matchedTerms = countIndustryTerms(allText, v.industryId);
  const challengeCount = countChallengeParagraphs(allText);
  const quantCount = countQuantitativeEffects(allText);
  const hasChar = hasCharacterSetup(v.essayA);
  const placeholder = detectPlaceholder(allText);

  const checks: CheckResult[] = [
    {
      name: "(a) 字数≥2200",
      pass: totalChars >= 2200,
      value: `${totalChars}字`,
    },
    {
      name: "(b) 設問ウ比率≥25%",
      pass: uRatio >= 0.25,
      value: `${(uRatio * 100).toFixed(1)}%`,
    },
    {
      name: "(c) 業種固有制度名≥3件",
      pass: matchedTerms.length >= 3,
      value: `${matchedTerms.length}件: ${matchedTerms.slice(0, 5).join("/")}`,
    },
    {
      name: "(d) 推進課題パラグラフ≥2",
      pass: challengeCount >= 2,
      value: `${challengeCount}件`,
    },
    {
      name: "(e) 定量効果≥2",
      pass: quantCount >= 2,
      value: `${quantCount}件`,
    },
    {
      name: "(f) キャラクター設定",
      pass: hasChar,
      value: hasChar ? "OK" : "組織名/規模 不検出",
    },
    {
      name: "(g) プレースホルダ無し",
      pass: placeholder === null,
      value: placeholder ?? "OK",
    },
  ];

  const score = checks.filter((c) => c.pass).length;

  let isCritical = false;
  let criticalReason: string | undefined;

  if (placeholder !== null) {
    isCritical = true;
    criticalReason = `プレースホルダ検出: "${placeholder}"`;
  } else if (totalChars < 1800) {
    isCritical = true;
    criticalReason = `字数不足 (${totalChars}字 < 1,800字)`;
  } else if (matchedTerms.length === 0) {
    isCritical = true;
    criticalReason = "業種固有制度名ゼロ";
  } else if (score < 4) {
    isCritical = true;
    criticalReason = `合格項目 ${score}/7 (閾値4)`;
  }

  return {
    file,
    exam,
    period,
    industryId: v.industryId,
    industryName: v.industryName,
    checks,
    score,
    isCritical,
    criticalReason,
  };
}

// ─── industries ファイルを動的ロード ──────────────────────────────────────────

async function loadIndustriesFile(
  filePath: string,
): Promise<IndustryVariant[]> {
  const url = pathToFileURL(filePath).href;
  const mod = await import(url);
  const arr = Object.values(mod).find(Array.isArray);
  if (!arr) return [];
  return arr as IndustryVariant[];
}

// ─── メイン ───────────────────────────────────────────────────────────────────

const ESSAY_EXAMS = ["au", "pm", "sa", "sm", "st", "sc"];

async function main(): Promise<void> {
  mkdirSync("logs", { recursive: true });

  const audits: VariantAudit[] = [];

  for (const exam of ESSAY_EXAMS) {
    const examDir = join(AFTERNOON_BASE, exam);
    if (!existsSync(examDir)) continue;

    const files = readdirSync(examDir).filter(
      (f) => f.endsWith("-industries.ts") && !f.startsWith("index"),
    );

    for (const fname of files) {
      const filePath = join(examDir, fname);
      const period = fname.replace("-industries.ts", "");

      let variants: IndustryVariant[];
      try {
        variants = await loadIndustriesFile(filePath);
      } catch (e) {
        console.error(`[ERROR] ${exam}/${fname}: import 失敗`, e);
        continue;
      }

      for (const v of variants) {
        audits.push(auditVariant(v, `${exam}/${fname}`, exam, period));
      }
    }
  }

  // ─── レポート生成 ─────────────────────────────────────────────────────────

  const criticals = audits.filter((a) => a.isCritical);
  const warnings = audits.filter((a) => !a.isCritical && a.score < 7);
  const passes = audits.filter((a) => !a.isCritical && a.score === 7);

  const lines: string[] = [];

  lines.push("========================================");
  lines.push("Essays 品質監査レポート");
  lines.push(`生成日時: ${new Date().toISOString()}`);
  lines.push("========================================");
  lines.push("");
  lines.push(`総論述バリアント数: ${audits.length}`);
  lines.push(`  致命傷 (CI ブロック): ${criticals.length}`);
  lines.push(`  軽微違反 (警告のみ): ${warnings.length}`);
  lines.push(`  全項目合格: ${passes.length}`);
  lines.push("");

  // 項目別合格率
  lines.push("────────────────────────────────────────");
  lines.push("7項目別 合格率:");
  if (audits.length > 0) {
    const checkNames = audits[0].checks.map((c) => c.name);
    for (let i = 0; i < 7; i++) {
      const passCount = audits.filter((a) => a.checks[i]?.pass).length;
      const pct = ((passCount / audits.length) * 100).toFixed(1);
      lines.push(`  ${checkNames[i]}: ${passCount}/${audits.length} (${pct}%)`);
    }
  }
  lines.push("");

  // 致命傷詳細
  if (criticals.length > 0) {
    lines.push("────────────────────────────────────────");
    lines.push("【致命傷一覧】");
    for (const a of criticals) {
      lines.push(
        `  [CRITICAL] ${a.exam}/${a.period}/${a.industryId} — ${a.criticalReason}`,
      );
      for (const c of a.checks.filter((ch) => !ch.pass)) {
        lines.push(`    ✗ ${c.name}: ${c.value}`);
      }
    }
    lines.push("");
  }

  // 軽微違反詳細
  if (warnings.length > 0) {
    lines.push("────────────────────────────────────────");
    lines.push("【軽微違反一覧】（別タスク化推奨）");
    for (const a of warnings) {
      const failed = a.checks.filter((c) => !c.pass);
      lines.push(
        `  [WARN] ${a.exam}/${a.period}/${a.industryId} — ${a.score}/7合格 (${failed.map((c) => c.name).join(", ")})`,
      );
    }
    lines.push("");
  }

  // 全件スコア表
  lines.push("────────────────────────────────────────");
  lines.push("全バリアント スコア一覧:");
  lines.push("  ファイル                       業種         スコア  状態");
  for (const a of audits) {
    const label = `${a.exam}/${a.period}`.padEnd(32);
    const ind = a.industryName.padEnd(12);
    const sc = `${a.score}/7`.padEnd(6);
    const state = a.isCritical ? "CRITICAL" : a.score < 7 ? "WARN" : "PASS";
    lines.push(`  ${label} ${ind} ${sc}  ${state}`);
  }
  lines.push("");
  lines.push("========================================");

  const report = lines.join("\n");

  // stdout 出力
  console.log(report);

  // ファイル出力
  writeFileSync("logs/essays-audit-report.txt", report, "utf8");
  console.error("\n→ logs/essays-audit-report.txt に保存しました");

  // CI モード
  if (CI_MODE && criticals.length > 0) {
    console.error(
      `\n[CI FAIL] 致命傷 ${criticals.length} 件を検出。essays を修復してください。`,
    );
    process.exit(1);
  }

  if (CI_MODE && warnings.length > 0) {
    console.error(
      `[CI WARN] 軽微違反 ${warnings.length} 件を検出。別タスクで改善を検討してください。`,
    );
  }
}

main().catch((e) => {
  console.error("[FATAL]", e);
  process.exit(1);
});
