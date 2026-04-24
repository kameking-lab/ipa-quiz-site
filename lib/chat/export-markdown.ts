import type { ChatSession } from "./types";
import type { Question } from "@/lib/questions/types";
import { examLabel, formatYearSeason } from "@/lib/utils";

export function buildMarkdown(session: ChatSession, question: Question): string {
  const examName = examLabel(question.exam);
  const yearSeason = formatYearSeason(question.year, question.season);

  const choicesText = question.choices
    ? Object.entries(question.choices)
        .map(([k, v]) => `- **${k}**: ${v}`)
        .join("\n")
    : "";

  const answerText = Array.isArray(question.answer)
    ? question.answer.join("・")
    : question.answer;

  const lines: string[] = [
    `# IPA過去問 - ${examName} ${yearSeason} 問${question.qNumber}`,
    ``,
    `**出典**: IPA情報処理技術者試験`,
    ``,
    `---`,
    ``,
    `## 問題`,
    ``,
    question.question,
    ``,
  ];

  if (choicesText) {
    lines.push(`## 選択肢`, ``, choicesText, ``);
  }

  lines.push(
    `## 正解`,
    ``,
    `**${answerText}**`,
    ``,
    `## 解説`,
    ``,
    question.explanation,
    ``,
    `---`,
    ``,
    `## AIコパイロットとの会話`,
    ``,
  );

  for (const msg of session.messages) {
    if (msg.role === "user") {
      lines.push(`**ユーザー**: ${msg.content}`, ``);
    } else {
      lines.push(`**過去問AI**:`, ``, msg.content, ``);
    }
  }

  lines.push(`---`, ``, `*過去問AI - https://ipa-quiz-site.vercel.app*`);

  return lines.join("\n");
}

export function downloadMarkdown(session: ChatSession, question: Question): void {
  const md = buildMarkdown(session, question);
  const blob = new Blob([md], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  a.href = url;
  a.download = `chat-${question.exam}-${question.year}${question.season}-q${question.qNumber}-${date}.md`;
  a.click();
  URL.revokeObjectURL(url);
}
