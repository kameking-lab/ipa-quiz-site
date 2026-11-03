export interface PracticalChoice {
  number: 1 | 2 | 3 | 4;
  text: string;
}

export interface PracticalChoiceLayout {
  questionText: string;
  choices: PracticalChoice[];
}

/** Pull a terminal 1–4 answer set out of OCR text without changing the official answer. */
export function splitPracticalChoices(body: string, modelAnswer: string): PracticalChoiceLayout | null {
  if (!/^[1-4]$/.test(modelAnswer.trim())) return null;
  const lines = body.split(/\r?\n/);
  const starts = lines.flatMap((line, index) => {
    const match = /^\s*([1-4])[.．]\s*(.+)/.exec(line);
    return match ? [{ index, number: Number(match[1]) }] : [];
  });
  let chosen: typeof starts | null = null;
  for (let i = 0; i <= starts.length - 4; i++) {
    const candidate = starts.slice(i, i + 4);
    if (candidate.every((item, offset) => item?.number === offset + 1)) chosen = candidate;
  }
  if (!chosen) return null;
  const first = chosen[0]!.index;
  const fourth = chosen[3]!.index;
  let last = lines.length;
  for (let index = fourth + 1; index < lines.length; index++) {
    if (lines[index]?.trim() === "") {
      last = index;
      break;
    }
  }
  const choices = chosen.map((item, offset) => {
    const end = offset < 3 ? chosen![offset + 1]!.index : last;
    const text = lines.slice(item.index, end).join(" ").replace(/^\s*[1-4][.．]\s*/, "").replace(/\s+/g, " ").trim();
    return { number: item.number as PracticalChoice["number"], text };
  });
  if (choices.some((choice) => !choice.text)) return null;
  const remaining = [...lines.slice(0, first), ...lines.slice(last)];
  return { questionText: remaining.join("\n").trim(), choices };
}
