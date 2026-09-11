export interface ExamChoiceText {
  number: number;
  text: string;
}

export interface ParsedExamChoices {
  prompt: string;
  choices: ExamChoiceText[];
}

/** Only split unambiguous, complete line-start numbered options from the source text. */
export function extractExamChoices(text: string, choiceCount: number): ParsedExamChoices | null {
  if (choiceCount !== 5) return null;
  const markers = [...text.matchAll(/^[\t 　]*[（(][\t 　]*([1-9１-９])[\t 　]*[）)][\t 　]*/gm)];
  if (markers.length !== choiceCount) return null;
  const choices: ExamChoiceText[] = [];
  for (let index = 0; index < markers.length; index += 1) {
    const marker = markers[index]!;
    const number = Number(marker[1]!.normalize("NFKC"));
    const choiceText = text.slice(marker.index! + marker[0].length, markers[index + 1]?.index ?? text.length).trim();
    if (number !== index + 1 || !choiceText) return null;
    // Side-by-side option labels or labels repeated inside an option are ambiguous.
    if (/[（(]\s*[1-5１-５]\s*[）)]/.test(choiceText)) return null;
    choices.push({ number, text: choiceText });
  }
  const prompt = text.slice(0, markers[0]!.index).trim();
  return prompt ? { prompt, choices } : null;
}

/** Keep figures visible when source text refers to information that plain text may lose. */
export function examNeedsFigure(text: string): boolean {
  return /図[のにをは]|図表|グラフ|絵表示|図中|次の図|下図|下の図|次の表|下表|表に示|表の|化学式|構造式/.test(text);
}
