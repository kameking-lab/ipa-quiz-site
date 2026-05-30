/**
 * 問題本文を、インラインのパイプテーブル (`a | b` + `---|---`) を HTML <table>
 * へ変換しつつ段落を `<p>` でレンダリングする。
 *
 * 既存の問題データ (12,000+) には PDF パース由来でパイプ形式のテーブルが
 * 平文として残っているものが含まれる。`hasImage:false` の図表参照問題の
 * 多くはこのパターンに該当する。
 */

import type { ReactElement } from "react";

type Block =
  | { kind: "p"; text: string }
  | { kind: "table"; header: string[]; rows: string[][] };

const TABLE_SEPARATOR_RE = /^\s*:?-{2,}:?\s*(\|\s*:?-{2,}:?\s*)+$/;

function splitCells(line: string): string[] {
  // Trim leading/trailing pipe so "| a | b |" -> ["a", "b"].
  let s = line.trim();
  if (s.startsWith("|")) s = s.slice(1);
  if (s.endsWith("|")) s = s.slice(0, -1);
  return s.split("|").map((c) => c.trim());
}

function looksLikePipeRow(line: string): boolean {
  return line.includes("|");
}

/**
 * 1 ブロック分のパイプテーブルを構築する。失敗したら null。
 * 仕様: 1行目=ヘッダ、2行目=`---|---` 形式の区切り、3行目以降=データ。
 */
function tryConsumeTable(
  lines: string[],
  start: number,
): { block: Block; nextIndex: number } | null {
  if (start + 1 >= lines.length) return null;
  const headerLine = lines[start];
  const sepLine = lines[start + 1];
  if (!looksLikePipeRow(headerLine)) return null;
  if (!TABLE_SEPARATOR_RE.test(sepLine)) return null;

  const header = splitCells(headerLine);
  const rows: string[][] = [];
  let i = start + 2;
  while (i < lines.length && lines[i].trim() !== "" && looksLikePipeRow(lines[i])) {
    rows.push(splitCells(lines[i]));
    i += 1;
  }
  if (rows.length === 0) return null;

  return { block: { kind: "table", header, rows }, nextIndex: i };
}

export function parseQuestionBlocks(text: string): Block[] {
  const lines = text.split("\n");
  const blocks: Block[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (line.trim() === "") {
      i += 1;
      continue;
    }
    const tableAttempt = tryConsumeTable(lines, i);
    if (tableAttempt) {
      blocks.push(tableAttempt.block);
      i = tableAttempt.nextIndex;
      continue;
    }
    blocks.push({ kind: "p", text: line });
    i += 1;
  }
  return blocks;
}

export function QuestionBody({ text }: { text: string }): ReactElement {
  const blocks = parseQuestionBlocks(text);
  return (
    <>
      {blocks.map((b, i) => {
        if (b.kind === "p") {
          return (
            <p key={i} className="mb-3 last:mb-0">
              {b.text}
            </p>
          );
        }
        return (
          <div key={i} className="my-3 overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr>
                  {b.header.map((h, hi) => (
                    <th
                      key={hi}
                      scope="col"
                      className="border border-border bg-muted/50 px-3 py-2 text-left font-semibold"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {b.rows.map((row, ri) => (
                  <tr key={ri}>
                    {row.map((cell, ci) => (
                      <td
                        key={ci}
                        className="border border-border px-3 py-2 align-top"
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      })}
    </>
  );
}
