/**
 * 30 essays (ST/SA/PM/SM/AU × 6 industries) upgrade to 2,200+ chars.
 * Preserves existing theme/skeleton/character settings; expands depth only.
 *
 * Usage:
 *   pnpm tsx scripts/regen-essays-2200.ts --exam=st
 *   pnpm tsx scripts/regen-essays-2200.ts --exam=all
 */

import { readFileSync, writeFileSync, appendFileSync, existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { GoogleGenerativeAI } from "@google/generative-ai";

type ExamId = "st" | "sa" | "pm" | "sm" | "au";

interface ExamSpec {
  id: ExamId;
  season: "2024-spring" | "2024-autumn";
  title: string;
  context: string;
  promptA: string;
  promptI: string;
  promptU: string;
}

const EXAMS: Record<ExamId, ExamSpec> = {
  st: {
    id: "st",
    season: "2024-spring",
    title: "事業環境の変化を捉えたITを活用した事業戦略の策定について",
    context:
      "ストラテジストは事業環境の変化を捉え、ITを活用した事業戦略を策定する。生成AI・サプライチェーン再編・人手不足・サステナビリティ要請など複数要因が同時に作用する状況下で、変化の本質を構造化し、自社の競争優位と照らしてIT事業戦略を組み立てる。",
    promptA: "事業概要と、その事業を取り巻く事業環境の変化を述べよ。",
    promptI: "策定したITを活用した事業戦略の内容と、策定する上で重視した点を具体的に述べよ。",
    promptU: "戦略の実行にあたって工夫した点と評価・改善点を述べよ。",
  },
  sa: {
    id: "sa",
    season: "2024-spring",
    title: "業務のデジタル化を実現するシステムアーキテクチャの設計について",
    context:
      "システムアーキテクトは、業務要件・非機能要件・制約を踏まえ最適なアーキテクチャを設計する。既存業務をそのままIT化せず業務プロセスを再設計し、クラウド／パッケージ／内製を組み合わせ、変化に強い構造を作る。",
    promptA: "業務のデジタル化の対象業務と業務上の課題を述べよ。",
    promptI: "設計したシステムアーキテクチャの内容と、設計上で重視した点を具体的に述べよ。",
    promptU: "移行戦略・運用設計の工夫と評価・改善点を述べよ。",
  },
  pm: {
    id: "pm",
    season: "2024-spring",
    title: "システム開発プロジェクトにおける不確実性の高い要求への対応について",
    context:
      "プロジェクトマネージャは、要求の不確実性を「適応コスト」として計画に反映し、開発方式・契約形態を選択し、ステークホルダ間で変更管理プロセスを運用可能な状態に整える。",
    promptA: "プロジェクトの概要と、不確実性の高い要求の内容を述べよ。",
    promptI: "不確実性の高い要求への対応として工夫した点を具体的に述べよ。",
    promptU: "対応の評価と改善点、得られた知見を述べよ。",
  },
  sm: {
    id: "sm",
    season: "2024-autumn",
    title: "重大なインシデントの早期解決と再発防止について",
    context:
      "ITサービスマネージャは、業務影響の大きい重大インシデントを限られた情報と時間制約下で早期に解決し、再発防止策を運用プロセス・監視設計・教育・契約条件に分散して組み込む。",
    promptA: "責任を担うITサービスの概要と、発生した重大インシデントを述べよ。",
    promptI: "早期解決のための対応と再発防止策の設計を具体的に述べよ。",
    promptU: "再発防止策の実装と評価、改善点を述べよ。",
  },
  au: {
    id: "au",
    season: "2024-autumn",
    title: "クラウドサービスの利用に関する監査について",
    context:
      "システム監査人は、クラウドサービスの利用が事業目標・リスク許容度・コンプライアンス要請と整合しているかを評価する。利用実態を把握しリスクアセスメントを通じて重点監査項目を特定する。",
    promptA: "監査対象のクラウドサービス利用の概要と監査の背景を述べよ。",
    promptI: "リスクアセスメントと監査手続の選択を具体的に述べよ。",
    promptU: "監査上の指摘事項と改善提言、評価を述べよ。",
  },
};

const MIN_TOTAL = 2200;
const MAX_TOTAL = 5500;
const MIN_U_RATIO = 0.25;
const MAX_RETRIES = 4;
const MODEL = "gemini-2.5-flash";

const stripCount = (s: string) => s.replace(/\s+/g, "").length;

interface IndustryBlock {
  industryId: string;
  industryName: string;
  essayA: string;
  essayI: string;
  essayU: string;
  raw: string;
  rangeStart: number;
  rangeEnd: number;
}

function parseIndustries(src: string): IndustryBlock[] {
  const blocks: IndustryBlock[] = [];
  const re =
    /(industryId:\s*"([^"]+)",\s*\n\s*industryName:\s*"([^"]+)",\s*\n\s*essayA:\s*`([\s\S]*?)`,\s*\n\s*essayI:\s*`([\s\S]*?)`,\s*\n\s*essayU:\s*`([\s\S]*?)`,)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(src)) !== null) {
    blocks.push({
      industryId: m[2],
      industryName: m[3],
      essayA: m[4],
      essayI: m[5],
      essayU: m[6],
      raw: m[1],
      rangeStart: m.index,
      rangeEnd: m.index + m[1].length,
    });
  }
  return blocks;
}

function buildPrompt(exam: ExamSpec, block: IndustryBlock, feedback?: string): string {
  return `あなたは情報処理技術者試験の論文添削指導の専門家です。以下の合格答案を、骨子・テーマ・登場組織設定を**完全に維持したまま**、字数のみ拡張して情報密度を高めた合格答案に書き直してください。

# 試験区分
${exam.id.toUpperCase()}（${exam.title}）

# 出題趣旨
${exam.context}

# 対象業種
${block.industryName}（industryId: ${block.industryId}）

# 既存合格答案（拡張対象）
## 設問ア（現行 ${stripCount(block.essayA)}字）
${block.essayA}

## 設問イ（現行 ${stripCount(block.essayI)}字）
${block.essayI}

## 設問ウ（現行 ${stripCount(block.essayU)}字）
${block.essayU}

# 必達要件（厳守）
1. **全体字数（空白・改行除く）は2,400字以上3,100字以下**。
2. 各設問の目標字数（空白除外）：
   - 設問ア：450〜550字
   - 設問イ：1,250〜1,500字
   - 設問ウ：650〜850字（全体の25%以上を厳守）
3. 推進過程の「困難」と「対応」を最低2件、「一つ目」「二つ目」と明示して設問イまたは設問ウで詳述する。
4. 効果・成果は定量数値で2件以上明記する（例：「68%→74%」「年間2.4億円損失」「リードタイム82日→52日」）。
5. ${block.industryName}業種固有の制度・法令・ガイドライン・規制名を3件以上、正式名称で本文に引用する（汎用的な「個人情報保護法」のみは不可）。
6. 既存答案の以下を**変更しない**：
   - 登場組織の名称（A社/B社/C社/E社/F社/G社/H社/I社/J社 等）
   - 組織規模の数値（年商・従業員数・拠点数・契約数 等）
   - プロジェクト／戦略／インシデント／監査の主題
   - 結論部の評価点・改善点の方向性
7. 既存の骨子・段落構造・論点順序を踏襲する。新規論点を追加するより、既存論点に背景・代替案検討・KPI設定・残課題などの厚みを加える。
8. 「、」「。」を含む自然な日本語論述。箇条書きは過度に増やさない（本文段落主体）。
9. **書き上げたら必ず各設問の字数を概算し、上限を超えていたら削って収めること**。

# 出力形式
**必ず**以下の純粋なJSONのみを返してください。前後にコードブロックや説明文を付けないこと。

{
  "essayA": "設問アの本文文字列（改行は\\nで表現）",
  "essayI": "設問イの本文文字列",
  "essayU": "設問ウの本文文字列"
}
${feedback ? `\n# 前回の試行が失敗した理由\n${feedback}\n上記を必ず改善して再生成すること。` : ""}`;
}

interface GeneratedEssay {
  essayA: string;
  essayI: string;
  essayU: string;
}

interface ValidateResult {
  ok: boolean;
  reason?: string;
  countA: number;
  countI: number;
  countU: number;
  total: number;
  uRatio: number;
}

function validate(g: GeneratedEssay): ValidateResult {
  const countA = stripCount(g.essayA ?? "");
  const countI = stripCount(g.essayI ?? "");
  const countU = stripCount(g.essayU ?? "");
  const total = countA + countI + countU;
  const uRatio = total ? countU / total : 0;
  if (total < MIN_TOTAL) return { ok: false, reason: `total ${total} < ${MIN_TOTAL}`, countA, countI, countU, total, uRatio };
  if (total > MAX_TOTAL) return { ok: false, reason: `total ${total} > ${MAX_TOTAL}`, countA, countI, countU, total, uRatio };
  if (uRatio < MIN_U_RATIO) return { ok: false, reason: `U ratio ${(uRatio * 100).toFixed(1)}% < 25%`, countA, countI, countU, total, uRatio };
  if (!g.essayA?.trim() || !g.essayI?.trim() || !g.essayU?.trim()) return { ok: false, reason: "empty field", countA, countI, countU, total, uRatio };
  return { ok: true, countA, countI, countU, total, uRatio };
}

function extractJson(raw: string): GeneratedEssay {
  let txt = raw.trim();
  txt = txt.replace(/^```(?:json)?\s*/i, "").replace(/```\s*$/i, "");
  const start = txt.indexOf("{");
  const end = txt.lastIndexOf("}");
  if (start < 0 || end < 0) throw new Error("no JSON object in response");
  const slice = txt.slice(start, end + 1);
  const obj = JSON.parse(slice);
  return { essayA: obj.essayA ?? "", essayI: obj.essayI ?? "", essayU: obj.essayU ?? "" };
}

function escapeBacktick(s: string): string {
  return s.replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$\{/g, "\\${");
}

async function main(): Promise<void> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("GEMINI_API_KEY missing");
    process.exit(1);
  }
  const examArg = process.argv.find((a) => a.startsWith("--exam="))?.split("=")[1] ?? "all";
  const targets: ExamId[] = examArg === "all" ? (["st", "sa", "pm", "sm", "au"] as ExamId[]) : [examArg as ExamId];

  const ai = new GoogleGenerativeAI(apiKey);
  const model = ai.getGenerativeModel({
    model: MODEL,
    generationConfig: {
      temperature: 0.55,
      maxOutputTokens: 16384,
      responseMimeType: "application/json",
      // @ts-expect-error — thinkingConfig not yet in SDK types, but accepted by REST API
      thinkingConfig: { thinkingBudget: 0 },
    },
  });

  if (!existsSync("logs")) mkdirSync("logs");
  const progressPath = "logs/upgrade-progress.md";
  appendFileSync(progressPath, `\n## Run ${new Date().toISOString()} — targets: ${targets.join(",")}\n`);

  let totalTokensIn = 0;
  let totalTokensOut = 0;
  let totalRetries = 0;

  for (const examId of targets) {
    const exam = EXAMS[examId];
    const filePath = `data/questions/afternoon/${examId}/${exam.season}-industries.ts`;
    const src = readFileSync(filePath, "utf8");
    const blocks = parseIndustries(src);
    console.log(`\n=== ${examId.toUpperCase()}: ${blocks.length} industries ===`);
    appendFileSync(progressPath, `\n### ${examId.toUpperCase()}\n`);
    let working = src;
    const offsets: { rangeStart: number; rangeEnd: number; replacement: string }[] = [];

    for (const block of blocks) {
      const ca = stripCount(block.essayA), ci = stripCount(block.essayI), cu = stripCount(block.essayU);
      const before = ca + ci + cu;
      const beforeUR = before ? cu / before : 0;
      if (before >= MIN_TOTAL && beforeUR >= MIN_U_RATIO && before <= MAX_TOTAL) {
        console.log(`  - ${block.industryId} (already ${before}字, U=${(beforeUR * 100).toFixed(1)}%) — skip`);
        appendFileSync(progressPath, `- ${block.industryId}: already ${before}字 — skip\n`);
        continue;
      }
      console.log(`  - ${block.industryId} (before ${before}字) ...`);
      let attempt = 0;
      let success: { gen: GeneratedEssay; v: ValidateResult } | null = null;
      let lastReason = "";
      let feedback: string | undefined;
      while (attempt < MAX_RETRIES && !success) {
        attempt++;
        try {
          const prompt = buildPrompt(exam, block, feedback);
          const resp = await model.generateContent(prompt);
          const cand = resp.response.candidates?.[0];
          const finishReason = cand?.finishReason ?? "unknown";
          let text = "";
          try { text = resp.response.text(); } catch { text = ""; }
          if (!text) {
            const parts = cand?.content?.parts ?? [];
            text = parts.map((p) => (typeof (p as { text?: string }).text === "string" ? (p as { text: string }).text : "")).join("");
          }
          const usage = resp.response.usageMetadata;
          totalTokensIn += usage?.promptTokenCount ?? 0;
          totalTokensOut += usage?.candidatesTokenCount ?? 0;
          try {
            const gen = extractJson(text);
            const v = validate(gen);
            if (v.ok) {
              success = { gen, v };
            } else {
              lastReason = v.reason ?? "";
              feedback = `字数違反：${v.reason}（A:${v.countA}字 I:${v.countI}字 U:${v.countU}字 = ${v.total}字）。各設問の上限を厳守し、超過時は冗長な箇所を削減せよ。`;
              console.log(`    attempt ${attempt} fail: ${v.reason} (A:${v.countA} I:${v.countI} U:${v.countU} = ${v.total})`);
              if (attempt < MAX_RETRIES) totalRetries++;
            }
          } catch (parseErr) {
            lastReason = `parse: ${String(parseErr)} (finishReason=${finishReason}, textLen=${text.length})`;
            feedback = `前回出力はJSONとして解釈できなかった（finishReason=${finishReason}）。出力上限に達した可能性が高い。各設問の字数を上限に近い形でなく中央値（ア:440 / イ:1350 / ウ:680）に揃えてJSONを完結させよ。`;
            console.log(`    attempt ${attempt} ${lastReason}`);
            if (attempt < MAX_RETRIES) totalRetries++;
          }
        } catch (e) {
          lastReason = String(e);
          console.log(`    attempt ${attempt} error: ${lastReason}`);
          if (attempt < MAX_RETRIES) totalRetries++;
        }
      }
      if (!success) {
        const msg = `${examId}/${block.industryId}: FAILED after ${MAX_RETRIES} attempts (${lastReason})`;
        console.error(`  ✗ ${msg}`);
        appendFileSync(progressPath, `- ${block.industryId}: FAILED (${lastReason})\n`);
        continue;
      }
      const { gen, v } = success;
      const replacement = `industryId: "${block.industryId}",\n    industryName: "${block.industryName}",\n    essayA: \`${escapeBacktick(gen.essayA)}\`,\n    essayI: \`${escapeBacktick(gen.essayI)}\`,\n    essayU: \`${escapeBacktick(gen.essayU)}\`,`;
      offsets.push({ rangeStart: block.rangeStart, rangeEnd: block.rangeEnd, replacement });
      console.log(`    ✓ ${v.total}字 (A:${v.countA} I:${v.countI} U:${v.countU}, U=${(v.uRatio * 100).toFixed(1)}%, ${attempt} attempts)`);
      appendFileSync(progressPath, `- ${block.industryId}: ${before}字 → ${v.total}字 (U=${(v.uRatio * 100).toFixed(1)}%, ${attempt} attempts)\n`);
    }

    offsets.sort((a, b) => b.rangeStart - a.rangeStart);
    for (const o of offsets) {
      working = working.slice(0, o.rangeStart) + o.replacement + working.slice(o.rangeEnd);
    }
    writeFileSync(filePath, working, "utf8");
    console.log(`  wrote ${filePath}`);
  }

  const costUsd = (totalTokensIn * 0.3 + totalTokensOut * 2.5) / 1_000_000;
  const costJpy = costUsd * 150;
  console.log(`\nTokens: in=${totalTokensIn} out=${totalTokensOut} retries=${totalRetries} cost=$${costUsd.toFixed(4)} (~${costJpy.toFixed(1)}円)`);
  appendFileSync(progressPath, `\nTokens: in=${totalTokensIn} out=${totalTokensOut} retries=${totalRetries} cost=$${costUsd.toFixed(4)} (~${costJpy.toFixed(1)}円)\n`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
