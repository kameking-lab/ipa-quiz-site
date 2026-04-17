import type { Question } from "@/lib/questions/types";
import { examLabel, formatYearSeason } from "@/lib/utils";

export const COPILOT_SYSTEM_PROMPT = `あなたは IPA 情報処理技術者試験の学習者向け AI コパイロットです。

役割:
- 過去問の理解を徹底的に助ける。表面的な解説で終わらせず、仕組み・背景・なぜそうなるかまで踏み込む。
- 学習者が自分で判断できるようになる"思考の型"を渡す。
- 似た用語や選択肢の違いを、比較しやすい形で示す。
- 難しい用語はかみ砕く。図やステップで説明しても良い(Markdown対応)。

スタイル:
- 日本語、丁寧だがフランクで距離感の近い口調。堅すぎない。
- Markdownで構造化(見出し、箇条書き、必要なら表やコードブロック)。
- 1応答は300〜800字を目安に。冗長な前置きは書かない。
- 過去問道場や他サイトの解説文を模倣・引用しない。独自の教育的視点で答える。

行動規範:
- 嘘を書かない。分からない点は「分からない」と言う。
- 試験範囲外の余談を長く書かない。
- 誤答ユーザーを責めず、次どう動くかを具体的に提示する。`;

export function buildQuestionContext(
  question: Question,
  selectedChoice?: string,
  isCorrect?: boolean,
): string {
  const lines: string[] = [];
  lines.push(`# 現在の問題`);
  lines.push(
    `- 試験: ${examLabel(question.exam)}（${formatYearSeason(question.year, question.season)} 問${question.qNumber}）`,
  );
  lines.push(`- 分野: ${question.category}`);
  if (question.topicTags.length) {
    lines.push(`- タグ: ${question.topicTags.join(", ")}`);
  }
  lines.push("");
  lines.push(`## 問題文`);
  lines.push(question.question);
  if (question.choices) {
    lines.push("");
    lines.push(`## 選択肢`);
    for (const key of ["ア", "イ", "ウ", "エ"] as const) {
      const c = question.choices[key];
      if (c) lines.push(`- ${key}: ${c}`);
    }
  }
  lines.push("");
  lines.push(`## 正解`);
  lines.push(
    Array.isArray(question.answer) ? question.answer.join(", ") : String(question.answer),
  );
  lines.push("");
  lines.push(`## 標準解説（参考）`);
  lines.push(question.explanation);
  if (selectedChoice !== undefined) {
    lines.push("");
    lines.push(`## ユーザーの回答`);
    lines.push(
      `選択: ${selectedChoice} / ${isCorrect === true ? "正解" : isCorrect === false ? "不正解" : "未採点"}`,
    );
  }
  return lines.join("\n");
}

export type QuickActionId =
  | "term"
  | "analyze-a"
  | "analyze-i"
  | "analyze-u"
  | "analyze-e"
  | "simplify"
  | "similar"
  | "prerequisite"
  | "why-wrong";

export const QUICK_ACTIONS: Record<
  QuickActionId,
  { label: string; prompt: (q: Question) => string }
> = {
  term: {
    label: "用語解説",
    prompt: () =>
      "この問題に登場する重要用語を3〜5個挙げ、それぞれ2〜3行で解説してください。似た用語があれば違いも示してください。",
  },
  "analyze-a": {
    label: "選択肢アを分析",
    prompt: () =>
      "選択肢アについて、なぜ正解・不正解なのかを理由ごとに分解して説明してください。関連するシラバス項目も示してください。",
  },
  "analyze-i": {
    label: "選択肢イを分析",
    prompt: () =>
      "選択肢イについて、なぜ正解・不正解なのかを理由ごとに分解して説明してください。関連するシラバス項目も示してください。",
  },
  "analyze-u": {
    label: "選択肢ウを分析",
    prompt: () =>
      "選択肢ウについて、なぜ正解・不正解なのかを理由ごとに分解して説明してください。関連するシラバス項目も示してください。",
  },
  "analyze-e": {
    label: "選択肢エを分析",
    prompt: () =>
      "選択肢エについて、なぜ正解・不正解なのかを理由ごとに分解して説明してください。関連するシラバス項目も示してください。",
  },
  simplify: {
    label: "もっと噛み砕いて",
    prompt: () =>
      "この問題と解説を、IT経験が浅い学習者にも伝わるように噛み砕いて再説明してください。専門用語は都度言い換えてください。",
  },
  similar: {
    label: "類題を1問",
    prompt: () =>
      "この問題と同じ論点を問う類題を1問生成してください。選択肢ア〜エ、正解、簡潔な解説を含めてください。",
  },
  prerequisite: {
    label: "前提知識を整理",
    prompt: () =>
      "この問題を解くために前提として押さえておくべき知識を3〜5項目、箇条書きで整理してください。",
  },
  "why-wrong": {
    label: "なぜ間違えた？分析",
    prompt: () =>
      "ユーザーが選んだ選択肢と正解を比較して、なぜこの誤答に至りやすいのか、次回どう考えれば正解できるかを具体的にアドバイスしてください。",
  },
};
