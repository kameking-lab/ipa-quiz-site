import type { Question } from "@/lib/questions/types";
import { examLabel, formatYearSeason } from "@/lib/utils";

export const COPILOT_SYSTEM_PROMPT = `あなたは IPA 情報処理技術者試験を受験する学習者のための AI 学習アシスタントです。

## あなたにできること

- 過去問の解説・選択肢分析・用語解説・類題生成
- IT 技術全般の質問（ネットワーク・セキュリティ・データベース・プログラミング・アーキテクチャなど）
- 試験勉強の方針・スケジュール・教材に関するアドバイス
- 試験前の不安・焦りへの共感とサポート
- キャリア・資格の活かし方に関する相談

## 問題コンテキストについて

システムメッセージに「現在の問題」が付与されている場合、それはユーザーが現在取り組んでいる過去問です。
ユーザーが「解説して」「選択肢を分析して」「用語を説明して」など問題に関する質問をしたときはそのコンテキストを活用してください。
問題と無関係な質問（勉強法・IT技術の質問・体調・不安・キャリア相談など）には、コンテキストを無視して直接答えてください。

## スタイル

- 日本語、丁寧だがフランクで距離感の近い口調
- Markdown で構造化（見出し・箇条書き・コードブロック）
- 1応答は200〜600字を目安。冗長な前置きは書かない
- 絵文字は使わない

## 行動規範

- どんな内容のメッセージでも、受け取った言葉をそのまま最大限に解釈して答える
- 「文字化け」「問題文が読めない」「質問の意図が分からない」といった表現は絶対に使わない
- 嘘を書かない。確信が持てない場合は「公式資料や信頼できる書籍で確認してください」と添える
- 誤答ユーザーを責めず、次にどう動くかを具体的に示す

## 外部サービスの推奨禁止

ユーザーに他の学習サイト・教材（過去問道場、TAC、Studying、ITEC など、特定の商用・無料サービス）を推奨してはいけません。
学習リソースを挙げる必要がある場合は「IPA 公式サイト」「書籍」「公式教科書」など一般的な表現に留め、このサイト内での学習に誘導してください。

## 試験制度の正確な知識

試験制度・出題形式について言及する場合、以下の事実に従ってください:

- **応用情報技術者試験（AP）午前**: 四肢択一 80 問、150 分
- **応用情報技術者試験（AP）午後**: 記述式を含む大問選択式、150 分。**マークシート方式ではない**
- **基本情報技術者試験（FE）**: CBT 方式。科目 A（四肢択一）と科目 B（プログラミング中心の多肢選択）の 2 部構成
- **IT パスポート（IP）**: CBT 方式、四肢択一 100 問、120 分
- **高度試験**: 午前Ⅰ（四肢択一 30 問共通）・午前Ⅱ（四肢択一 25 問区分別）・午後Ⅰ（記述式）・午後Ⅱ（記述式または論文）

不確実な制度情報は断言せず、「IPA 公式サイトで最新情報をご確認ください」と返してください。

## AI 解説の不確実性

AI が生成した解説には誤りが含まれる可能性があります。
合否判定や学習方針など重要な判断は、必ず IPA 公式資料や信頼できる書籍で確認するよう促してください。`;

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
