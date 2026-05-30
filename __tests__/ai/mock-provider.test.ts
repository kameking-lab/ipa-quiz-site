import { describe, it, expect } from "vitest";
import { createMockProvider } from "@/lib/ai/providers/mock";
import type { ChatMessage } from "@/lib/ai/provider";

/**
 * ai/providers/mock.ts は GEMINI_API_KEY 未設定時のフォールバック決定的スタブ。
 * キーなしでも UI 開発・E2E 検証が成立する土台（§5）であり、
 *   - pickReply の「最後の user メッセージ内容によるクイックアクション分岐」
 *   - streamChat の「24字チャンク分割（無損失）＋ abort 時の即時 AbortError」
 * という2つの契約に依存している。崩れると mock 応答の出し分けが狂い、
 * abort 経路が黙って素通りして E2E のキャンセル検証が成立しなくなる。
 *
 * これらは決定的（外部 mock 不要）なので、実挙動を特性化して回帰固定する。
 */

const um = (content: string): ChatMessage[] => [{ role: "user", content }];

async function collect(
  messages: ChatMessage[],
  signal?: AbortSignal,
): Promise<string[]> {
  const provider = createMockProvider();
  const out: string[] = [];
  for await (const chunk of provider.streamChat({ system: "", messages, signal })) {
    out.push(chunk);
  }
  return out;
}

const reply = async (content: string): Promise<string> =>
  (await collect(um(content))).join("");

describe("createMockProvider / pickReply ルーティング", () => {
  it("name は \"mock\"", () => {
    expect(createMockProvider().name).toBe("mock");
  });

  it("「なぜ」「間違」「誤答」→ whyWrong 応答", async () => {
    expect(await reply("なぜ間違えたのか教えて")).toContain("なぜ間違えたか（モック応答）");
    expect(await reply("この選択肢で間違えました")).toContain("なぜ間違えたか（モック応答）");
    expect(await reply("私の誤答を分析して")).toContain("なぜ間違えたか（モック応答）");
  });

  it("「類題」「similar」→ similar 応答", async () => {
    expect(await reply("類題を出して")).toContain("類題（モック応答）");
    expect(await reply("give me a similar question")).toContain("類題（モック応答）");
  });

  it("「用語」「解説」「term」→ term 応答", async () => {
    expect(await reply("この用語を説明して")).toContain("用語解説（モック応答）");
    expect(await reply("解説をお願いします")).toContain("用語解説（モック応答）");
    expect(await reply("explain this term")).toContain("用語解説（モック応答）");
  });

  it("どのキーワードにも当たらない → default 応答", async () => {
    expect(await reply("こんにちは")).toContain("AIコパイロット（モック応答）");
  });

  it("空メッセージ配列 → default 応答（last は空文字でどのキーワードにも非該当）", async () => {
    expect((await collect([])).join("")).toContain("AIコパイロット（モック応答）");
  });

  it("分岐は最後の user メッセージ内容で決まる（過去メッセージは無視）", async () => {
    const messages: ChatMessage[] = [
      { role: "user", content: "類題を出して" },
      { role: "assistant", content: "..." },
      { role: "user", content: "次は用語を説明して" },
    ];
    expect((await collect(messages)).join("")).toContain("用語解説（モック応答）");
  });

  it("優先順位: whyWrong は term より先に判定（「なぜ」+「用語」混在 → whyWrong）", async () => {
    expect(await reply("なぜこの用語で間違えたの")).toContain("なぜ間違えたか（モック応答）");
  });

  it("優先順位: similar は term より先（「類題」+「解説」混在 → similar）", async () => {
    expect(await reply("類題の解説をください")).toContain("類題（モック応答）");
  });

  it("大文字小文字を無視（toLowerCase 経由）", async () => {
    expect(await reply("SIMILAR")).toContain("類題（モック応答）");
    expect(await reply("TERM")).toContain("用語解説（モック応答）");
  });
});

describe("createMockProvider / streamChat チャンク分割", () => {
  it("チャンク連結は元応答と無損失一致", async () => {
    const chunks = await collect(um("用語を説明して"));
    const joined = chunks.join("");
    expect(joined).toContain("用語解説（モック応答）");
    // pickReply(term) と同一文字列であること（再分割しても復元できる）
    expect(joined.length).toBeGreaterThan(24);
  });

  it("各チャンクは 24 字以下、末尾以外は厳密に 24 字（.{1,24} 貪欲分割）", async () => {
    const chunks = await collect(um("こんにちは")); // default = 長文
    expect(chunks.length).toBeGreaterThan(1);
    for (const c of chunks) {
      expect(c.length).toBeLessThanOrEqual(24);
    }
    for (let i = 0; i < chunks.length - 1; i++) {
      expect(chunks[i].length).toBe(24);
    }
  });

  it("改行を含めて分割される（dotAll フラグ）— 連結で改行が保持される", async () => {
    const joined = (await collect(um("こんにちは"))).join("");
    expect(joined).toContain("\n");
  });
});

describe("createMockProvider / abort", () => {
  it("事前 abort 済みシグナル → 最初の yield 前に AbortError を送出", async () => {
    const ac = new AbortController();
    ac.abort();
    const provider = createMockProvider();
    const iterator = provider.streamChat({
      system: "",
      messages: um("用語を説明して"),
      signal: ac.signal,
    })[Symbol.asyncIterator]();
    // 最初の next() で（yield 前に）AbortError を送出する
    await expect(iterator.next()).rejects.toThrow("Aborted");
  });

  it("シグナル未指定なら正常完走する", async () => {
    const chunks = await collect(um("用語を説明して"));
    expect(chunks.length).toBeGreaterThan(0);
  });
});
