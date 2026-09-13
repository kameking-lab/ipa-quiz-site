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

  it("is imported from lib/note-accounts by the server component, not from the client module", () => {
    const serverPage = read("app/e-learning/exams/[id]/page.tsx");
    expect(serverPage).toContain('from "@/lib/note-accounts"');
    // サーバーコンポーネントが client モジュールから関数を取り込んでいないこと。
    // (TrackedNoteLink コンポーネント自体の import は許される。)
    const clientImport = /import\s*\{([^}]*)\}\s*from\s*"@\/components\/analytics\/TrackedNoteLink"/.exec(
      serverPage,
    );
    expect(clientImport).toBeTruthy();
    const imported = clientImport![1]!.split(",").map((name) => name.trim()).filter(Boolean);
    expect(imported).toEqual(["TrackedNoteLink"]);
  });

  it("keeps the client module free of the account helper definitions", () => {
    const clientModule = read("components/analytics/TrackedNoteLink.tsx");
    expect(clientModule).toMatch(/^\s*["']use client["']/m);
    expect(clientModule).not.toContain("export function deriveNoteAccountFromUrl");
    expect(clientModule).not.toContain("export const KNOWN_NOTE_ACCOUNTS");
  });
});
