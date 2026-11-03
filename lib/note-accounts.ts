// note.com のアカウント判定。
//
// ここは意図的に "use client" を持たない。サーバーコンポーネント
// (app/e-learning/exams/[id]/page.tsx) が noteLinks を描画する時点で
// アカウントを判定する必要があり、"use client" が付いたモジュールの
// 関数はサーバーから呼び出せないため("Attempted to call ... from the
// server but ... is on the client" で実行時に落ちる。型チェックも
// ビルドも通ってしまうので、境界はこのファイルの位置で担保する)。
//
// TrackedNoteLink.tsx (client) もこのモジュールを読む。定義は1箇所だけ。

/** note_outbound_click / posthogCapture の account として許可する値の唯一の情報源。 */
export const KNOWN_NOTE_ACCOUNTS = ["ipa_quiz_ai", "sikaku_rakutoru", "anzen_ai_jp"] as const;
export type NoteAccount = (typeof KNOWN_NOTE_ACCOUNTS)[number];

/**
 * note.com の記事URLからアカウントを判定する。未知のホスト/パスは null を返し、
 * 呼び出し側は「計測なしの生リンク」にフォールバックすること
 * (計測を追加するために既存リンクを壊さないための安全側デフォルト)。
 */
export function deriveNoteAccountFromUrl(url: string): NoteAccount | null {
  try {
    const parsed = new URL(url);
    if (parsed.hostname !== "note.com") return null;
    const segment = parsed.pathname.split("/")[1] ?? "";
    return (KNOWN_NOTE_ACCOUNTS as readonly string[]).includes(segment)
      ? (segment as NoteAccount)
      : null;
  } catch {
    return null;
  }
}
