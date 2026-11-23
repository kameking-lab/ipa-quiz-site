import type { EssayQuestion } from "@/lib/essay/types";

type Exam = EssayQuestion["exam"];
type Prompts = readonly [string, string, string];
type Year = 2023 | 2024 | 2025;

const ipaFolders: Record<Year, string> = {
  2023: "ps6vr70000010d6y-att",
  2024: "m42obm000000afqx-att",
  2025: "nl10bi0000009lh8-att",
};

export interface WorkshopQuestion {
  id: string;
  exam: Exam;
  year: Year;
  season: "春期" | "秋期";
  number: number;
  theme: string;
  prompts: Prompts;
  bounds: readonly [readonly [number, number], readonly [number, number], readonly [number, number]];
  source: { booklet: string; intent: string; commentary: string };
}

function question(exam: Exam, year: Year, number: number, theme: string, prompts: Prompts): WorkshopQuestion {
  const autumn = exam === "pm" || exam === "au";
  const base = `https://www.ipa.go.jp/shiken/mondai-kaiotu/${ipaFolders[year]}/${year}r0${year - 2018}${autumn ? "a" : "h"}_${exam}_pm2`;
  return {
    id: `${exam}-${year}-q${number}`, exam, year, season: autumn ? "秋期" : "春期", number, theme, prompts,
    bounds: [[year === 2025 ? 400 : 0, 800], exam === "au" ? [700, 1400] : [800, 1600], exam === "au" ? [700, 1400] : [600, 1200]],
    source: { booklet: `${base}_qs.pdf`, intent: `${base}_ans.pdf`, commentary: `${base}_cmnt.pdf` },
  };
}

// 編集要約。出題趣旨・採点講評も照合し、設問ごとに求められる内容を残す。
export const WORKSHOP_QUESTIONS: Record<Exam, readonly WorkshopQuestion[]> = {
  st: [
    question("st", 2025, 1, "基幹システムの刷新方針", [
      "事業の概要・特性、基幹システムの概要と課題",
      "刷新方針、刷新の必要性と経営上の効果、重視した点と工夫",
      "事業部門との交渉・調整、経営層への説明、評価を受けた改善",
    ]),
    question("st", 2024, 1, "DXに向けた新技術の採用", [
      "事業特性、DXの狙い、施策、新技術とその必要性",
      "机上確認・技術検証の方法、結果と工夫",
      "検証を基にしたリスクと対策、経営層への説明、指摘を受けた改善",
    ]),
    question("st", 2023, 1, "ITシステムの改修要望の分析", [
      "事業特性と概要、業務・ITシステム、利用部門の要望と問題認識",
      "集めた情報と分析方法、特定した真因、分析の工夫",
      "利用部門や関係部門との協議、真因を踏まえた対応方針",
    ]),
  ],
  sa: [
    question("sa", 2025, 1, "複数システムのデータを使った指標提供", [
      "業務目標、提供した指標、各システムから集めたデータと算出方法",
      "指標を提供する機能の設計で検討した事項と検討方法",
      "設計で生じたデータ内容の問題と対応",
    ]),
    question("sa", 2024, 1, "先進技術を適用した業務の効率化", [
      "対象業務と、人手でしか実現できないと考えられていた理由",
      "技術の種類と適用方法、大幅な効率化や自動化が可能と判断した理由",
      "適用時の課題と対策",
    ]),
    question("sa", 2023, 1, "DXの推進における情報システムの改善", [
      "DXの目的、情報システムの概要、目的を阻害していた課題",
      "課題を解くためのシステム改善案、その案で解決できる理由",
      "検討した工夫と、その工夫の目的",
    ]),
  ],
  pm: [
    question("pm", 2025, 2, "円滑な稼働開始を危うくするリスク", [
      "稼働開始時に業務と運用を滞らせないための要件、重要なリスクとその理由",
      "計画段階での制約、制約を考慮して策定した対策、有効と考えた理由",
      "実行時の状況に応じた対策の改定・策定、稼働開始直前に厳しくなる制約への考慮",
    ]),
    question("pm", 2024, 1, "不確かさがあるプロジェクトのコスト管理", [
      "予測型開発におけるコスト要求、不確かさと見積りへの影響、関係者と認識を共有した方法",
      "計画時に合意した予測活動、再見積り条件、関係者との協力、予算との差への対応方針",
      "実行時の再見積りの時期、予算との差、報告して承認を得た対応策",
    ]),
    question("pm", 2023, 1, "プロジェクトマネジメント方法の修整", [
      "目標、時間・コスト・品質以外で重視した管理対象とその理由",
      "修整した管理方法と、修整が必要と判断した理由",
      "実行時のモニタリング方法、結果の評価、必要に応じた対応",
    ]),
  ],
  au: [
    question("au", 2025, 1, "情報システム導入に伴う特有のリスクの監査", [
      "導入したシステムの概要・目的、導入で新たに生じる固有のリスク",
      "リスクの特定理由、リスクの大きさの評価方法、防止策と発見策",
      "リスク評価と、対策後のリスクが許容範囲に収まるという評価を確かめる監査手続",
    ]),
    question("au", 2024, 1, "IT投資ガバナンスの監査", [
      "組織全体のIT投資の概要とガバナンス体制",
      "IT投資の管理プロセスに着目した監査の着眼点と入手すべき証拠",
      "IT投資のガバナンス体制に着目した監査の着眼点と入手すべき証拠",
    ]),
    question("au", 2023, 1, "データ利活用基盤構築の監査", [
      "データ利活用基盤の構築概要、目的、基盤が必要な理由",
      "基盤の構築に当たり監査人が想定するリスク",
      "各リスクを踏まえて構築の適切さを確かめる監査手続",
    ]),
  ],
  sm: [
    question("sm", 2025, 1, "顧客の期待と評価に基づくサービス改善", [
      "ITサービスの概要、顧客の期待と評価を捉える活動",
      "期待と評価の分析方法、顧客満足度向上の計画、設定したKPI",
      "計画の実施状況と評価、顧客の期待と評価を捉える活動自体の改善点",
    ]),
    question("sm", 2024, 1, "環境の変化に応じた変更管理", [
      "ITサービス概要、既存の変更管理に影響した環境の変化",
      "変化によって生じた変更管理の問題、実施した改善策",
      "改善策の評価と残る課題",
    ]),
    question("sm", 2023, 1, "サービスレベルの合意と管理", [
      "ITサービスの概要、顧客との交渉で議論したサービスレベル項目と背景",
      "合意に向けた取組と、SLAを見直す管理の仕組み",
      "合意に向けた取組の評価とサービスレベル管理の今後の課題",
    ]),
  ],
};
