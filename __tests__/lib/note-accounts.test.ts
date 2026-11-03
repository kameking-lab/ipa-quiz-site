import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

import { KNOWN_NOTE_ACCOUNTS, deriveNoteAccountFromUrl } from "@/lib/note-accounts";

const root = process.cwd();
const read = (relative: string) => readFileSync(path.join(root, relative), "utf8");

describe("note-accounts", () => {
  it("recognises all three known note.com accounts", () => {
    expect(deriveNoteAccountFromUrl("https://note.com/ipa_quiz_ai/n/nabc")).toBe("ipa_quiz_ai");
    expect(deriveNoteAccountFromUrl("https://note.com/sikaku_rakutoru/n/nabc")).toBe("sikaku_rakutoru");
    expect(deriveNoteAccountFromUrl("https://note.com/anzen_ai_jp/n/nabc")).toBe("anzen_ai_jp");
    expect([...KNOWN_NOTE_ACCOUNTS]).toEqual(["ipa_quiz_ai", "sikaku_rakutoru", "anzen_ai_jp"]);
  });

  it("returns null for unknown accounts, non-note.com hosts, and malformed URLs", () => {
    expect(deriveNoteAccountFromUrl("https://note.com/someone_else/n/nabc")).toBeNull();
    expect(deriveNoteAccountFromUrl("https://example.com/ipa_quiz_ai")).toBeNull();
    expect(deriveNoteAccountFromUrl("not-a-url")).toBeNull();
    expect(deriveNoteAccountFromUrl("")).toBeNull();
  });

  // ここが本題。この関数は "use client" の付いた TrackedNoteLink.tsx に置かれていて、
  // サーバーコンポーネント app/e-learning/exams/[id]/page.tsx から呼ばれていた。
  // 型チェックもビルドもユニットテストも通るのに、実際にページを開くと
  // "Attempted to call deriveNoteAccountFromUrl() from the server but
  //  deriveNoteAccountFromUrl is on the client" で公表問題ページが丸ごと落ちる。
  // 見つけたのは E2E だけだったので、構造そのものをここで固定する。
  it("lives in a module without 'use client' so server components can call it", () => {
    const source = read("lib/note-accounts.ts");
    expect(source).not.toMatch(/^\s*["']use client["']/m);
  });

  // 2026-09-13: 解説記事リンクの描画を個別ページと一覧ページで共有するため
  // components/exam-library/exam-note-links.tsx へ切り出した。呼び出し元が移っても
  // 固定したい不変条件は同じ = 「deriveNoteAccountFromUrl を呼ぶサーバー側モジュールは
  // lib/note-accounts から取り込む」。対象ファイルだけ追従させる。
  it("is imported from lib/note-accounts by the server component, not from the client module", () => {
    const serverComponent = read("components/exam-library/exam-note-links.tsx");
    expect(serverComponent).toContain('from "@/lib/note-accounts"');
    // この描画はサーバーコンポーネントのままであること ("use client" が付くと
    // 一覧・個別の両ページが client 境界を越えてしまう)。
    expect(serverComponent).not.toMatch(/^\s*["']use client["']/m);
    // client モジュールからは TrackedNoteLink コンポーネントだけを取り込む。
    const clientImport = /import\s*\{([^}]*)\}\s*from\s*"@\/components\/analytics\/TrackedNoteLink"/.exec(
      serverComponent,
    );
    expect(clientImport).toBeTruthy();
    const imported = clientImport![1]!.split(",").map((name) => name.trim()).filter(Boolean);
    expect(imported).toEqual(["TrackedNoteLink"]);
    // 呼び出し元のページは、この関数を自前で取り込み直していないこと。
    for (const page of ["app/e-learning/exams/[id]/page.tsx", "app/e-learning/exams/page.tsx"]) {
      expect(read(page)).not.toContain("deriveNoteAccountFromUrl");
    }
  });

  it("keeps the client module free of the account helper definitions", () => {
    const clientModule = read("components/analytics/TrackedNoteLink.tsx");
    expect(clientModule).toMatch(/^\s*["']use client["']/m);
    expect(clientModule).not.toContain("export function deriveNoteAccountFromUrl");
    expect(clientModule).not.toContain("export const KNOWN_NOTE_ACCOUNTS");
  });
});
