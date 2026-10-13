function isStructuredLine(value: string): boolean {
  return /\t| {2,}|[│┃｜|─━┼]/.test(value) ||
    /^\s*(?:[＜<［\[【※・●○]|[０-９0-9]+[.．、)）])/.test(value);
}

/** PDFの行末で折り返された長い文章だけを表示時に接続する。資料や表の短い行は残す。 */
export function formatPracticalProse(text: string): string {
  const lines = text.replace(/\r\n/g, "\n").split("\n");
  const result: string[] = [];
  lines.forEach((line, index) => {
    const precedingLine = lines[index - 1];
    if (
      precedingLine !== undefined &&
      precedingLine.length >= 35 &&
      line.trim() !== "" &&
      !/[。！？：:」】]$/.test(precedingLine.trimEnd()) &&
      !isStructuredLine(precedingLine) &&
      !isStructuredLine(line)
    ) {
      result[result.length - 1] = (result.at(-1) ?? "") + line.trimStart();
    } else {
      result.push(line);
    }
  });
  return result.join("\n");
}

export function isIncorrectChoiceQuestion(stem: string): boolean {
  return /誤っているもの|不適切なもの|適切でないもの|正しくないもの/.test(stem.replace(/\s+/g, ""));
}
