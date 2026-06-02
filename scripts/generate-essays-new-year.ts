/**
 * Generate new-year essays for ST/SA/PM/SM/AU.
 *
 * Outputs two files per (exam, year, season):
 *   - data/questions/afternoon/{exam}/{year}-{season}.ts
 *   - data/questions/afternoon/{exam}/{year}-{season}-industries.ts
 *
 * Usage:
 *   pnpm tsx scripts/generate-essays-new-year.ts --exam=st --year=2023
 *   pnpm tsx scripts/generate-essays-new-year.ts --exam=all --year=2023
 *   pnpm tsx scripts/generate-essays-new-year.ts --exam=st --year=2025
 */

import { readFileSync, writeFileSync, appendFileSync, existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { getSafePdfUrl } from "@/lib/exam-config";

function loadEnvFile(path: string): void {
  const full = join(process.cwd(), path);
  if (!existsSync(full)) return;
  const lines = readFileSync(full, "utf-8").split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    const val = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, "");
    if (!process.env[key]) process.env[key] = val;
  }
}

loadEnvFile(".env.production.local");
loadEnvFile(".env.local");
loadEnvFile(".env");

type ExamId = "st" | "sa" | "pm" | "sm" | "au";
type YearKey = 2023 | 2025;
type Season = "spring" | "autumn";

interface ThemeSpec {
  title: string;
  context: string;
  category: string;
  promptA: string;
  promptI: string;
  promptU: string;
}

interface ExamConfig {
  id: ExamId;
  season: Season;
  themes: Record<YearKey, ThemeSpec>;
}

const CONTEXT_FOOTER = "\n\nあなたの経験と考えに基づいて、設問ア〜ウに従って論述せよ。";

const EXAMS: Record<ExamId, ExamConfig> = {
  st: {
    id: "st",
    season: "spring",
    themes: {
      2023: {
        title: "デジタル技術を活用した新規事業の立ち上げにおける構想策定について",
        category: "事業戦略・IT戦略",
        context: `ITストラテジストは、デジタル技術の進展によって生まれる新たな事業機会を捉え、自社の経営資源と整合した新規事業の構想を策定することが求められる。

新規事業の立ち上げでは、対象顧客の課題仮説、提供価値、収益モデル、必要となるデジタル技術、関連法令や業界慣行など、多面的な要素を構造化して構想に落とし込む必要がある。また、構想は単独で完結するものではなく、既存事業や経営資源との関連性、競合との差別化、立ち上げ後の段階的な検証・拡張プロセスまで設計しておくことが、経営層の意思決定を得る上で不可欠である。

構想の策定にあたっては、事業環境・自社強み・技術トレンドを総合的に踏まえ、提供価値の独自性とITによる実現可能性を両立させる構造を作り込むことが重要である。${CONTEXT_FOOTER}`,
        promptA: "あなたが携わった新規事業の対象事業領域と、その立ち上げに至った事業環境について、800字以内で述べよ。",
        promptI: "設問アで述べた事業環境を踏まえて、あなたが策定した新規事業構想の内容と、構想策定で重視した点を、800字以上1,600字以内で具体的に述べよ。",
        promptU: "設問イで述べた新規事業構想について、経営層への提案・関係部門との合意形成の取り組み、及び評価と今後の改善点を、600字以上1,200字以内で具体的に述べよ。",
      },
      2025: {
        title: "生成AIの活用を組み込んだ事業戦略の策定について",
        category: "事業戦略・IT戦略",
        context: `ITストラテジストは、生成AIなど急速に進化する新技術の特性を捉え、自社の事業戦略へ実装する役割を担う。

生成AIは、業務効率化、新たな顧客体験の創出、社内ナレッジの活用など多様な活用機会を生み出す一方で、ハルシネーション、知的財産・著作権リスク、入力データの機密性、コンプライアンス要請、運用コストなど、特有の課題も伴う。事業戦略への組み込みでは、適用領域の選定、内製と外部サービスの組み合わせ、ガバナンス設計、効果測定指標の設定、段階的な展開計画など、複数の論点を統合的に設計する必要がある。

戦略策定にあたっては、自社の競争優位の源泉と組み合わせて差別化を担保しつつ、リスクと投資効果を事業計画として経営層に提示できる構造を整えることが重要である。${CONTEXT_FOOTER}`,
        promptA: "あなたが携わった事業の概要と、生成AIを事業戦略に組み込む契機となった事業環境の変化について、800字以内で述べよ。",
        promptI: "設問アで述べた事業環境を踏まえて、あなたが策定した生成AIを組み込んだ事業戦略の内容と、策定上で重視した点を、800字以上1,600字以内で具体的に述べよ。",
        promptU: "設問イで述べた事業戦略について、経営層への説明・関係部門との合意形成の取り組み、及び評価と今後の改善点を、600字以上1,200字以内で具体的に述べよ。",
      },
    },
  },
  sa: {
    id: "sa",
    season: "spring",
    themes: {
      2023: {
        title: "情報システムの段階的な刷新における移行アーキテクチャの設計について",
        category: "システムアーキテクチャ",
        context: `システムアーキテクトは、既存業務を支える情報システムを刷新する際に、ビジネスへの影響を抑えつつ段階的に移行できるアーキテクチャを設計することが求められる。

刷新対象が基幹システムや業務横断システムである場合、一括移行はリスクが高く、機能単位・領域単位での段階的移行を選択することが多い。その場合、新旧並行稼働のためのデータ同期、参照・更新の経路設計、業務手順の暫定切替、移行期間中の運用監視など、複雑な要素を矛盾なく束ねるアーキテクチャが必要となる。

設計にあたっては、業務影響、データ整合性、運用負荷、コスト、移行期間の制約を踏まえ、段階遷移ごとの目標状態（マイグレーションパス）を明確にし、関係者が同じ地図を共有できる構造を作ることが重要である。${CONTEXT_FOOTER}`,
        promptA: "あなたが携わった情報システムの刷新の対象業務とシステムの概要、刷新の背景について、800字以内で述べよ。",
        promptI: "設問アで述べた背景を踏まえて、あなたが設計した段階的移行アーキテクチャの内容と、設計上で重視した点を、800字以上1,600字以内で具体的に述べよ。",
        promptU: "設問イで述べた移行アーキテクチャについて、移行実行時の工夫、関係者との合意形成、及び評価と今後の改善点を、600字以上1,200字以内で具体的に述べよ。",
      },
      2025: {
        title: "クラウドネイティブを前提とした業務システムのアーキテクチャ設計について",
        category: "システムアーキテクチャ",
        context: `システムアーキテクトは、業務システムを構築するに当たり、クラウドネイティブ技術の特性を生かしたアーキテクチャを設計することが求められる。

クラウドネイティブ技術は、マネージドサービス、マイクロサービス、コンテナ、宣言的IaC、ゼロトラスト等の要素から成り、スケーラビリティ・俊敏性・コスト最適化に資する一方で、運用責任分界の見直し、サービス依存の管理、データ整合性の設計、セキュリティ要件への対応など、従来のオンプレミス前提とは異なる設計判断が必要となる。

アーキテクチャの設計にあたっては、業務要件・非機能要件・組織体制・運用継続性・コスト構造を踏まえて、クラウドネイティブ技術を採用する範囲と採用しない範囲を明確に切り分け、長期的に運用可能な構造を作ることが重要である。${CONTEXT_FOOTER}`,
        promptA: "あなたが携わった業務システムの対象業務と、クラウドネイティブを前提とした設計に至った背景について、800字以内で述べよ。",
        promptI: "設問アで述べた背景を踏まえて、あなたが設計したクラウドネイティブ前提のアーキテクチャ内容と、設計上で重視した点を、800字以上1,600字以内で具体的に述べよ。",
        promptU: "設問イで述べたアーキテクチャについて、実装・運用設計の工夫、関係者との合意形成、及び評価と今後の改善点を、600字以上1,200字以内で具体的に述べよ。",
      },
    },
  },
  pm: {
    id: "pm",
    season: "spring",
    themes: {
      2023: {
        title: "システム開発プロジェクトにおけるステークホルダとのコミュニケーション計画について",
        category: "プロジェクトマネジメント",
        context: `プロジェクトマネージャは、システム開発プロジェクトの目標達成に向けて、ステークホルダの期待を把握し、適切なコミュニケーションを計画することが求められる。

ステークホルダは、発注側経営層、業務部門、利用部門、外部委託先、関連プロジェクトなど多岐にわたり、それぞれが異なる関心事と意思決定権限を持つ。コミュニケーション計画では、誰に・何を・どのタイミング・どの手段で伝達し、どの意思決定を引き出すかを設計し、合意形成・期待値調整・リスク早期発見につなげる必要がある。

計画立案にあたっては、ステークホルダ分析、情報需要の見極め、関係者間の利害調整プロセス、課題エスカレーション経路など、プロジェクト特性に応じた構造を整え、運用しやすい仕組みとして組み込むことが重要である。${CONTEXT_FOOTER}`,
        promptA: "あなたが携わったシステム開発プロジェクトの概要と、ステークホルダ構成の特徴について、800字以内で述べよ。",
        promptI: "設問アで述べたステークホルダ構成を踏まえて、あなたが立案したコミュニケーション計画の内容と、計画上で重視した点を、800字以上1,600字以内で具体的に述べよ。",
        promptU: "設問イで述べたコミュニケーション計画について、プロジェクト遂行中の運用上の工夫、関係者との合意形成、及び評価と今後の改善点を、600字以上1,200字以内で具体的に述べよ。",
      },
      2025: {
        title: "システム開発プロジェクトにおける品質マネジメントの計画と実行について",
        category: "プロジェクトマネジメント",
        context: `プロジェクトマネージャは、システムの品質目標を達成するために、プロジェクト全体の品質マネジメントを計画し、実行することが求められる。

品質マネジメントは、要件定義段階からテスト・受入までを通じて、品質目標の設定、品質メトリクスの選定、レビューやテストの段階設計、品質課題の早期発見と是正プロセスなど、複数の活動を統合的に組み立てる必要がある。また、外部委託先や利用部門との役割分担、生成AIや自動テストなどの新しい手法の取り込み、品質と工程・コストの両立にも配慮しなければならない。

計画策定にあたっては、システムの特性、利用者層、求められる品質特性、組織の品質文化を踏まえ、運用可能で測定可能な仕組みとして設計することが重要である。${CONTEXT_FOOTER}`,
        promptA: "あなたが携わったシステム開発プロジェクトの概要と、品質マネジメントを計画する上で考慮した特徴について、800字以内で述べよ。",
        promptI: "設問アで述べた特徴を踏まえて、あなたが計画した品質マネジメントの内容と、計画上で重視した点を、800字以上1,600字以内で具体的に述べよ。",
        promptU: "設問イで述べた品質マネジメントについて、実行段階での工夫、関係者との合意形成、及び評価と今後の改善点を、600字以上1,200字以内で具体的に述べよ。",
      },
    },
  },
  sm: {
    id: "sm",
    season: "autumn",
    themes: {
      2023: {
        title: "ITサービス継続のための事業継続計画の策定と運用について",
        category: "サービスマネジメント",
        context: `ITサービスマネージャは、ITサービスを支える事業継続計画（IT-BCP）を策定し、運用する責任を負う。

事業継続計画は、自然災害、システム障害、サイバー攻撃、サプライチェーン障害など、ITサービスの提供を阻害するリスクを想定し、業務影響度分析（BIA）、復旧目標、代替手段、復旧手順、訓練・改善サイクルなどを含む。さらに、クラウド・外部委託の活用が一般化する中で、自社単独では制御できないリスクをどう取り扱うかが、計画の実効性を左右する。

策定にあたっては、業務継続上の優先度、関係者の役割、訓練を通じた継続的改善、関係法令・契約・SLAとの整合性などを踏まえ、形骸化させず運用できる構造として整えることが重要である。${CONTEXT_FOOTER}`,
        promptA: "あなたが責任を担うITサービスの概要と、事業継続計画の策定に至った背景について、800字以内で述べよ。",
        promptI: "設問アで述べた背景を踏まえて、あなたが策定したIT-BCPの内容と、策定上で重視した点を、800字以上1,600字以内で具体的に述べよ。",
        promptU: "設問イで述べたIT-BCPについて、運用・訓練・改善の取り組み、関係者との合意形成、及び評価と今後の改善点を、600字以上1,200字以内で具体的に述べよ。",
      },
      2025: {
        title: "クラウドサービス利用環境におけるITサービスの可用性管理について",
        category: "サービスマネジメント",
        context: `ITサービスマネージャは、ITサービスの可用性目標を達成するために、設計・運用・改善の各段階で可用性管理を実施することが求められる。

クラウドサービスの利用が一般化した現在、可用性管理の対象は自社設備に閉じず、複数のクラウド事業者、外部委託、ネットワーク、サブプロセッサなど、責任分界の異なる関係者をまたいで設計する必要がある。可用性目標の妥当性、障害時の影響範囲分析、冗長化方針、運用監視・通知設計、SLAやサポート契約との整合性などを統合的に組み立てなければならない。

可用性管理にあたっては、業務影響度と投資バランス、関係者間の役割分担、運用継続性・改善サイクル・再発防止策の組み込みを踏まえ、長期的に運用可能な仕組みを設計することが重要である。${CONTEXT_FOOTER}`,
        promptA: "あなたが責任を担うITサービスの概要と、可用性管理を強化する契機となった背景について、800字以内で述べよ。",
        promptI: "設問アで述べた背景を踏まえて、あなたが設計したクラウド利用環境下での可用性管理の内容と、設計上で重視した点を、800字以上1,600字以内で具体的に述べよ。",
        promptU: "設問イで述べた可用性管理について、運用・改善上の工夫、関係者との合意形成、及び評価と今後の改善点を、600字以上1,200字以内で具体的に述べよ。",
      },
    },
  },
  au: {
    id: "au",
    season: "autumn",
    themes: {
      2023: {
        title: "システム開発プロジェクトの監査について",
        category: "システム監査",
        context: `システム監査人は、組織のシステム開発プロジェクトが、事業目標・コスト・スケジュール・品質・リスクの観点で適切に統制されているかを評価することが求められる。

監査の対象は、計画段階の妥当性、要件定義の品質、外部委託先の管理、進捗・コスト・品質管理プロセス、変更管理、受入テスト、リリース判定などプロジェクト全般に及ぶ。特に、複数の関係者が関与する大規模開発、不確実性の高い新技術活用、外部委託・オフショアの活用、生成AIや自動化技術の活用などは、従来型の統制では十分でない領域が生じやすい。

監査の計画・実施にあたっては、リスクアセスメントを通じて重点監査項目を特定し、計画段階・実行段階・受入段階それぞれに適した監査手続を設計し、指摘・改善提言が経営層と現場の双方に受け入れられる形で提示することが重要である。${CONTEXT_FOOTER}`,
        promptA: "あなたが携わった監査の対象組織の概要と、対象としたシステム開発プロジェクトの概要及び監査の背景について、800字以内で述べよ。",
        promptI: "設問アで述べた背景を踏まえて、あなたが実施したシステム開発プロジェクト監査の手続内容と、計画上で重視した点を、800字以上1,600字以内で具体的に述べよ。",
        promptU: "設問イで述べた監査について、指摘・改善提言の取りまとめ、関係者との合意形成、及び評価と今後の改善点を、600字以上1,200字以内で具体的に述べよ。",
      },
      2025: {
        title: "サイバーセキュリティ対策の有効性に関する監査について",
        category: "システム監査",
        context: `システム監査人は、組織のサイバーセキュリティ対策が事業リスクに見合った水準で整備・運用されているかを評価することが求められる。

サイバーセキュリティ対策は、技術的・組織的・物理的統制が組み合わさる多層構造であり、近年はランサムウェア、サプライチェーン攻撃、生成AIを悪用した攻撃手法、リモートワーク環境の脆弱性など、リスク要素が多様化している。監査では、リスクアセスメントの妥当性、対策設計の網羅性、運用の継続性、インシデント対応、外部委託先の管理、関連法令・業界ガイドラインとの整合性などを評価する必要がある。

監査の計画・実施にあたっては、限られたリソースの中で重点監査項目を特定し、技術評価と組織統制評価を組み合わせ、指摘・改善提言が経営層・現場・委託先それぞれに伝わる形で提示することが重要である。${CONTEXT_FOOTER}`,
        promptA: "あなたが携わった監査の対象組織の概要と、サイバーセキュリティ対策の整備状況及び監査の背景について、800字以内で述べよ。",
        promptI: "設問アで述べた背景を踏まえて、あなたが実施したサイバーセキュリティ監査の手続内容と、計画上で重視した点を、800字以上1,600字以内で具体的に述べよ。",
        promptU: "設問イで述べた監査について、指摘・改善提言の取りまとめ、関係者との合意形成、及び評価と今後の改善点を、600字以上1,200字以内で具体的に述べよ。",
      },
    },
  },
};

const INDUSTRIES: Array<{ id: string; name: string; orgHint: string }> = [
  { id: "manufacturing", name: "製造業", orgHint: "中堅製造業A社（年商約180〜400億円、従業員数約650〜1,200名、国内外複数工場）。精密部品・電子機器など" },
  { id: "construction", name: "建設業", orgHint: "準大手ゼネコンF社（売上約4,800億円、従業員約3,200名、年間施工約180件）。土木・建築の総合建設会社" },
  { id: "finance", name: "金融業", orgHint: "地方銀行G行（預金量約5.6兆円、従業員約2,400名、本支店約180拠点）。地域経済の中核行" },
  { id: "retail", name: "流通・小売", orgHint: "全国食品スーパーH社（年商約3,200億円、店舗約280店、従業員約8,500名）。地域密着型経営" },
  { id: "telecom", name: "通信業", orgHint: "地域通信キャリアI社（売上約3,800億円、従業員約4,200名、ISP契約180万・モバイル220万）" },
  { id: "public", name: "公共・自治体", orgHint: "県庁所在地に政令市を含むJ県（人口約95万人、職員約4,500名、年間予算約8,200億円）" },
];

const MIN_TOTAL = 2200;
const MAX_TOTAL = 5500;
const MIN_U_RATIO = 0.25;
const MAX_RETRIES = 3;
const MODEL = "gemini-2.5-flash";

const stripCount = (s: string) => s.replace(/\s+/g, "").length;

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

function buildIndustryPrompt(
  exam: ExamConfig,
  theme: ThemeSpec,
  industry: { id: string; name: string; orgHint: string },
  feedback?: string
): string {
  return `あなたは情報処理技術者試験（高度試験）の論述指導の専門家です。
以下のテーマに対する、${industry.name}業界における合格答案（設問ア・イ・ウ）を1セット作成してください。

# 試験区分
${exam.id.toUpperCase()}（${theme.title}）

# テーマ趣旨
${theme.context}

# 設問
- 設問ア: ${theme.promptA}
- 設問イ: ${theme.promptI}
- 設問ウ: ${theme.promptU}

# 対象業界
${industry.name}（industryId: ${industry.id}）
組織設定の目安: ${industry.orgHint}

# 必達要件（厳守）
1. 全体字数（空白・改行除く）は2,400字以上3,200字以下。
2. 各設問の目標字数（空白除外）：
   - 設問ア：450〜550字
   - 設問イ：1,250〜1,500字
   - 設問ウ：650〜850字（全体の25%以上を厳守）
3. 推進過程の「困難」と「対応」を最低2件、「一つ目」「二つ目」と明示して設問イまたは設問ウで詳述する。
4. 効果・成果は定量数値を2件以上明記する（例：「68%→74%」「年間2.4億円損失」「リードタイム82日→52日」「投資総額22億円」）。
5. ${industry.name}固有の制度・法令・ガイドライン・規制名を3件以上、正式名称で本文に引用する（例：自動車業界ならIATF16949やUNECE WP.29、建設業なら建設業法・改正建設業法、金融なら金融庁監督指針・FISC安全対策基準、流通なら食品表示法、通信なら電気通信事業法・NIS2、自治体なら地方公共団体情報システム標準化に関する法律 など）。汎用的な「個人情報保護法」のみは不可。
6. 当事者性を担保するため、自身の役割（IT戦略担当、システムアーキテクト、PM、サービスマネージャ、システム監査人など）を冒頭で明示し、論述全体で「私は」を主語にする。
7. 「、」「。」を含む自然な日本語論述。箇条書きは過度に増やさない（本文段落主体）。
8. 結論部（設問ウ）には、評価点と改善点の両方を明示し、改善点には次への学びを盛り込む。
9. 既存の他業界の答案と組織名（A社, F社, G社, H社, I社, J県 等）は重複しないよう、別アルファベットや別組織名（B社, C社, D社, K社, L社, M県 等）を使用する。

# 出力形式
必ず以下の純粋なJSONのみを返してください。前後にコードブロック・説明文を付けないこと。

{
  "essayA": "設問アの本文文字列（改行は\\nで表現）",
  "essayI": "設問イの本文文字列",
  "essayU": "設問ウの本文文字列"
}
${feedback ? `\n# 前回試行が失敗した理由\n${feedback}\n上記を必ず改善して再生成すること。` : ""}`;
}

function buildModelAnswerPrompt(
  exam: ExamConfig,
  theme: ThemeSpec,
  feedback?: string
): string {
  return `あなたは情報処理技術者試験（高度試験）の論述指導の専門家です。
以下のテーマに対する、業界を特定しない汎用版の合格答案（設問ア・イ・ウ）を1セット作成してください。

# 試験区分
${exam.id.toUpperCase()}（${theme.title}）

# テーマ趣旨
${theme.context}

# 設問
- 設問ア: ${theme.promptA}
- 設問イ: ${theme.promptI}
- 設問ウ: ${theme.promptU}

# 必達要件（厳守）
1. 全体字数（空白・改行除く）は2,400字以上3,200字以下。
2. 各設問の目標字数（空白除外）：
   - 設問ア：450〜550字
   - 設問イ：1,250〜1,500字
   - 設問ウ：650〜850字（全体の25%以上を厳守）
3. 推進過程の「困難」と「対応」を最低2件、設問イまたは設問ウで詳述する。
4. 効果・成果は定量数値を2件以上明記する。
5. 法令・ガイドライン・標準名（個人情報保護法、ISO/IEC 27001、ITIL、PMBOK、IPAガイドライン、システム監査基準など）を3件以上正式名称で本文に引用する。
6. 当事者性を担保するため、自身の役割を冒頭で明示し、「私は」を主語にする。

# 出力形式
必ず以下の純粋なJSONのみを返してください。前後にコードブロック・説明文を付けないこと。

{
  "essayA": "設問アの本文文字列（改行は\\nで表現）",
  "essayI": "設問イの本文文字列",
  "essayU": "設問ウの本文文字列"
}
${feedback ? `\n# 前回試行が失敗した理由\n${feedback}\n上記を必ず改善して再生成すること。` : ""}`;
}

function pdfUrlFor(examId: ExamId, year: number, season: Season): string {
  const seasonLetter = season === "spring" ? "h" : "a";
  return `https://www.jitec.ipa.go.jp/1_04hanni_sukiru/mondai_kaitou_${year}${seasonLetter}05_1/${year}${seasonLetter}05${seasonLetter}_${examId}_pm2_qs.pdf`;
}

function makeId(examId: ExamId, year: number, season: Season): string {
  const seasonLetter = season === "spring" ? "h" : "a";
  return `${examId}-${year}${seasonLetter}-pm2-q1`;
}

function constantBaseName(examId: ExamId, year: number, season: Season): string {
  return `${examId.toUpperCase()}_AFTERNOON_${year}_${season.toUpperCase()}`;
}

function industriesConstName(examId: ExamId, year: number, season: Season): string {
  return `${examId.toUpperCase()}_${year}_${season.toUpperCase()}_Q1_INDUSTRIES`;
}

interface GenerationResult {
  industries: Array<{ id: string; name: string; essay: GeneratedEssay; counts: ValidateResult }>;
  modelAnswer: { essay: GeneratedEssay; counts: ValidateResult };
  retries: number;
  tokensIn: number;
  tokensOut: number;
}

async function generateForExamYear(
  ai: GoogleGenerativeAI,
  exam: ExamConfig,
  year: YearKey,
  logPath: string
): Promise<GenerationResult> {
  const theme = exam.themes[year];
  const model = ai.getGenerativeModel({
    model: MODEL,
    generationConfig: {
      temperature: 0.55,
      maxOutputTokens: 16384,
      responseMimeType: "application/json",
      // @ts-expect-error thinkingConfig not yet typed
      thinkingConfig: { thinkingBudget: 0 },
    },
  });

  const result: GenerationResult = { industries: [], modelAnswer: { essay: { essayA: "", essayI: "", essayU: "" }, counts: { ok: false, countA: 0, countI: 0, countU: 0, total: 0, uRatio: 0 } }, retries: 0, tokensIn: 0, tokensOut: 0 };

  // Generate generic model answer
  console.log(`  - ${exam.id} ${year} ${exam.season}: generating generic model answer`);
  let attempt = 0;
  let feedback: string | undefined;
  while (attempt < MAX_RETRIES) {
    attempt++;
    try {
      const prompt = buildModelAnswerPrompt(exam, theme, feedback);
      const resp = await model.generateContent(prompt);
      const usage = resp.response.usageMetadata;
      result.tokensIn += usage?.promptTokenCount ?? 0;
      result.tokensOut += usage?.candidatesTokenCount ?? 0;
      let text = "";
      try { text = resp.response.text(); } catch { text = ""; }
      const gen = extractJson(text);
      const v = validate(gen);
      if (v.ok) {
        result.modelAnswer = { essay: gen, counts: v };
        appendFileSync(logPath, `  generic ${exam.id}-${year}: ok total=${v.total} U=${(v.uRatio * 100).toFixed(1)}%\n`);
        break;
      } else {
        feedback = `字数違反：${v.reason}（A:${v.countA} I:${v.countI} U:${v.countU} = ${v.total}）。各設問の目標字数を厳守し、設問ウは650字以上にすること。`;
        console.log(`    generic attempt ${attempt} fail: ${v.reason}`);
        result.retries++;
      }
    } catch (e) {
      feedback = `前回出力をパースできなかった: ${String(e).slice(0, 200)}`;
      console.log(`    generic attempt ${attempt} error: ${String(e).slice(0, 120)}`);
      result.retries++;
    }
  }

  // Generate per-industry essays
  for (const industry of INDUSTRIES) {
    console.log(`  - ${exam.id} ${year} ${exam.season} / ${industry.id}`);
    let attempt = 0;
    let feedback: string | undefined;
    let success = false;
    while (attempt < MAX_RETRIES) {
      attempt++;
      try {
        const prompt = buildIndustryPrompt(exam, theme, industry, feedback);
        const resp = await model.generateContent(prompt);
        const usage = resp.response.usageMetadata;
        result.tokensIn += usage?.promptTokenCount ?? 0;
        result.tokensOut += usage?.candidatesTokenCount ?? 0;
        let text = "";
        try { text = resp.response.text(); } catch { text = ""; }
        const gen = extractJson(text);
        const v = validate(gen);
        if (v.ok) {
          result.industries.push({ id: industry.id, name: industry.name, essay: gen, counts: v });
          appendFileSync(logPath, `  ${exam.id}-${year} ${industry.id}: ok total=${v.total} U=${(v.uRatio * 100).toFixed(1)}%\n`);
          success = true;
          break;
        } else {
          feedback = `字数違反：${v.reason}（A:${v.countA} I:${v.countI} U:${v.countU} = ${v.total}）。各設問の目標字数を厳守し、設問ウは650字以上にすること。`;
          console.log(`    ${industry.id} attempt ${attempt} fail: ${v.reason}`);
          result.retries++;
        }
      } catch (e) {
        feedback = `前回出力をパースできなかった: ${String(e).slice(0, 200)}`;
        console.log(`    ${industry.id} attempt ${attempt} error: ${String(e).slice(0, 120)}`);
        result.retries++;
      }
    }
    if (!success) {
      throw new Error(`failed to generate for ${exam.id}-${year}-${industry.id} after ${MAX_RETRIES} retries`);
    }
  }

  return result;
}

function renderIndustriesFile(
  exam: ExamConfig,
  year: YearKey,
  result: GenerationResult
): string {
  const constName = industriesConstName(exam.id, year, exam.season);
  const seasonLabel = exam.season === "spring" ? "春" : "秋";
  const blocks = result.industries.map((it) => {
    return `  {
    industryId: "${it.id}",
    industryName: "${it.name}",
    essayA: \`${escapeBacktick(it.essay.essayA)}\`,
    essayI: \`${escapeBacktick(it.essay.essayI)}\`,
    essayU: \`${escapeBacktick(it.essay.essayU)}\`,
  },`;
  }).join("\n\n");
  return `// ${exam.id.toUpperCase()} 午後II ${year}${seasonLabel}期 q1「${exam.themes[year].title}」
// 業種別の模範論述バリアント（設問ア・イ・ウ）。
// 共通／汎用版は ${year}-${exam.season}.ts の subQuestions[].modelAnswer を参照。
import type { IndustryVariant } from "@/lib/afternoon/types";

export const ${constName}: IndustryVariant[] = [
${blocks}
];
`;
}

function renderMainFile(
  exam: ExamConfig,
  year: YearKey,
  result: GenerationResult
): string {
  const theme = exam.themes[year];
  const id = makeId(exam.id, year, exam.season);
  const constName = constantBaseName(exam.id, year, exam.season);
  const indConst = industriesConstName(exam.id, year, exam.season);
  const seasonLabel = exam.season === "spring" ? "春" : "秋";
  // Gate the (now dead, NXDOMAIN) jitec 出典 URL through getSafePdfUrl so the
  // persisted pdfUrl degrades to the live IPA index — matching the serve-time
  // gate and keeping at-rest data honest per CLAUDE.md §8 (see exam-config.ts).
  const pdfUrl = getSafePdfUrl(pdfUrlFor(exam.id, year, exam.season));
  const ma = result.modelAnswer.essay;
  return `// ${exam.id.toUpperCase()} 午後II 練習用オリジナル問題（IPA過去問の形式を模して作成）。
// テーマ: ${theme.title}（${year}年${seasonLabel}期）
import type { AfternoonQuestion } from "@/lib/afternoon/types";
import { ${indConst} } from "./${year}-${exam.season}-industries";

export const ${constName}: AfternoonQuestion[] = [
  {
    id: "${id}",
    exam: "${exam.id}",
    year: ${year},
    season: "${exam.season}",
    qNumber: 1,
    type: "essay",
    category: "${theme.category}",
    title: "${theme.title}",
    context: \`${escapeBacktick(theme.context)}\`,
    subQuestions: [
      {
        label: "設問ア",
        prompt: "${theme.promptA}",
        type: "essay-text",
        maxLength: 800,
        minLength: 600,
        modelAnswer: \`${escapeBacktick(ma.essayA)}\`,
        scoringRubric: \`【A評価相当】
- 対象事業／プロジェクトの概要（規模／自身の立場）が具体的に記述されている
- 背景・前提が複数の論点から立体的に分析されている
- 設問イ・ウへの伏線として論点の構造化が為されている
【B評価相当】
- 概要は記載されているが規模感や立場が曖昧
- 背景の記述が単発的で構造化が弱い
【C評価相当（要改善）】
- どの組織でも当てはまる一般論
- 背景・前提が当該事業／プロジェクトに紐付いていない\`,
        compositionPoints: [
          "冒頭2-3行で対象（業種／規模／自身の役割）を提示し、文脈を即座に把握できる構成にする",
          "背景は3要素以上を挙げ、具体的な数値や事実を添える",
          "設問イへの橋渡しとして、最終段落で次の論点に着地させる",
          "「私は〜の立場で」と主語を明示し、当事者性を担保する",
        ],
        scoringCriteria: [
          { name: "設問への適合性", description: "概要と背景の両方が漏れなく記述されているか" },
          { name: "具体性", description: "内容・数値・関係者が固有名詞レベルで描写されているか" },
          { name: "構造化", description: "複数の論点が論理的に整理され、相互関係が見えるか" },
          { name: "後続設問との連携", description: "設問イ・ウで論じる課題への伏線が張られているか" },
        ],
        points: 30,
      },
      {
        label: "設問イ",
        prompt: "${theme.promptI}",
        type: "essay-text",
        maxLength: 1600,
        minLength: 800,
        modelAnswer: \`${escapeBacktick(ma.essayI)}\`,
        scoringRubric: \`【A評価相当】
- 戦略／設計／計画／監査手続の内容が具体的に記述されている
- 設問アの背景と論理的に対応している
- 「重視した点」が3つ程度、それぞれに具体的判断と理由が明示されている
- 数値（金額／期間／規模）が適切に織り込まれている
【B評価相当】
- 戦略／設計／計画は記述されているが、提供価値が一般論にとどまる
- 重視点が単に列挙されているだけで判断理由が弱い
- 設問アとの連携が弱く、戦略が独立して語られている
【C評価相当（要改善）】
- 標語の繰り返しで具体性に欠ける
- 自身の役割が見えず、評論的記述に終始\`,
        compositionPoints: [
          "全体像を冒頭で要約し、読み手に骨格を先に提示する（パラグラフ・ライティング）",
          "「重視した点」は2〜3点に絞り、それぞれを独立した節として論述する",
          "各重視点には『なぜそう判断したか』『代替案を取らなかった理由』を添える",
          "設問アとの整合を1対1で対応させ、論理的整合性を見せる",
          "数値（投資額／期間／顧客数／市場規模）を最低3箇所に織り込む",
        ],
        scoringCriteria: [
          { name: "具体性", description: "提供価値・対象・技術・手続が固有名詞レベルで描かれているか" },
          { name: "設問アとの整合", description: "前段で述べた背景への応答として組み立てられているか" },
          { name: "判断の根拠", description: "「重視した点」に対する代替案検討と判断理由が示されているか" },
          { name: "数値裏付け", description: "投資規模・期間・KPIなどが定量的に記述されているか" },
        ],
        points: 40,
      },
      {
        label: "設問ウ",
        prompt: "${theme.promptU}",
        type: "essay-text",
        maxLength: 1200,
        minLength: 600,
        modelAnswer: \`${escapeBacktick(ma.essayU)}\`,
        scoringRubric: \`【A評価相当】
- 関係者への説明・合意形成の両方を具体的に記述
- 「評価」と「改善点」が両方明示され、改善点には次への学びがある
- 反対意見・困難への対応プロセスが具体的に描かれている
- 自身の関与と判断が明確
【B評価相当】
- 説明や合意形成は記述されているが、困難の描写が弱い
- 評価のみで改善点が形式的、または逆
【C評価相当（要改善）】
- 「説明した」「合意を得た」と結果のみで過程が不明
- 改善点が当たり障りのない一般論\`,
        compositionPoints: [
          "経営層／関係者への説明と合意形成を、それぞれ独立段落で論じる",
          "反対意見や困難の具体例を必ず1つ以上盛り込み、それへの対応を描く",
          "評価点と改善点を明確に分け、改善点には今後への具体的アクションを添える",
          "数値（期間／工数／合意までのステップ数）を散りばめて当事者性を担保する",
        ],
        scoringCriteria: [
          { name: "プロセスの具体性", description: "合意形成のステップ・困難・対応が時系列で描かれているか" },
          { name: "ステークホルダ視点", description: "各部門の利害を踏まえた働きかけが描かれているか" },
          { name: "自己評価の妥当性", description: "成果と限界を冷静に分析し、改善案に説得力があるか" },
          { name: "学びの抽象化", description: "個別経験から再利用可能な教訓を抽出できているか" },
        ],
        points: 30,
      },
    ],
    pdfUrl: "${pdfUrl}",
    license: "IPA-public",
    totalTimeMinutes: 120,
    industryVariants: ${indConst},
  },
];
`;
}

async function main(): Promise<void> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("GEMINI_API_KEY missing");
    process.exit(1);
  }
  const examArg = process.argv.find((a) => a.startsWith("--exam="))?.split("=")[1] ?? "all";
  const yearArg = process.argv.find((a) => a.startsWith("--year="))?.split("=")[1];
  if (!yearArg) {
    console.error("--year=2023 or --year=2025 required");
    process.exit(1);
  }
  const year = parseInt(yearArg, 10) as YearKey;
  if (year !== 2023 && year !== 2025) {
    console.error("--year must be 2023 or 2025");
    process.exit(1);
  }
  const targets: ExamId[] = examArg === "all"
    ? (["st", "sa", "pm", "sm", "au"] as ExamId[])
    : examArg.split(",").map((s) => s.trim() as ExamId);

  const ai = new GoogleGenerativeAI(apiKey);

  if (!existsSync("logs")) mkdirSync("logs");
  const logPath = `logs/generate-essays-${year}.log`;
  appendFileSync(logPath, `\n=== Run ${new Date().toISOString()} year=${year} targets=${targets.join(",")} ===\n`);

  let totalTokensIn = 0;
  let totalTokensOut = 0;
  let totalRetries = 0;

  for (const examId of targets) {
    const exam = EXAMS[examId];
    const season = exam.season;
    const dir = `data/questions/afternoon/${examId}`;
    const mainPath = `${dir}/${year}-${season}.ts`;
    const indPath = `${dir}/${year}-${season}-industries.ts`;
    if (existsSync(mainPath) || existsSync(indPath)) {
      console.log(`SKIP ${examId} ${year}: files already exist`);
      appendFileSync(logPath, `SKIP ${examId} ${year}: exists\n`);
      continue;
    }
    console.log(`\n=== ${examId.toUpperCase()} ${year} ${season} ===`);
    const result = await generateForExamYear(ai, exam, year, logPath);
    totalTokensIn += result.tokensIn;
    totalTokensOut += result.tokensOut;
    totalRetries += result.retries;

    writeFileSync(indPath, renderIndustriesFile(exam, year, result), "utf8");
    writeFileSync(mainPath, renderMainFile(exam, year, result), "utf8");
    console.log(`  wrote ${mainPath} and ${indPath}`);
    appendFileSync(logPath, `WROTE ${examId} ${year} ${season} retries=${result.retries}\n`);
  }

  appendFileSync(logPath, `=== Summary year=${year} tokensIn=${totalTokensIn} tokensOut=${totalTokensOut} retries=${totalRetries} ===\n`);
  console.log(`\nDone. tokensIn=${totalTokensIn} tokensOut=${totalTokensOut} retries=${totalRetries}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
