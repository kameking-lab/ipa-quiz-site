import { describe, it, expect } from "vitest";
import { tokenize, uniqueTokens } from "@/lib/copilot/tokenize";

describe("tokenize — CJK char-bigrams", () => {
  it("splits a CJK run into overlapping bigrams", () => {
    expect(tokenize("暗号化")).toEqual(["暗号", "号化"]);
  });

  it("drops a lone CJK character", () => {
    expect(tokenize("暗")).toEqual([]);
  });

  it("filters CJK stopword bigrams but keeps the rest", () => {
    // "それで" → bigrams それ(stopword)/れで → only れで survives
    expect(tokenize("それで")).toEqual(["れで"]);
  });
});

describe("tokenize — ASCII words", () => {
  it("lowercases and keeps words of length >= 2", () => {
    expect(tokenize("OS")).toEqual(["os"]);
  });

  it("drops single-char ASCII tokens and english stopwords", () => {
    expect(tokenize("a the cat")).toEqual(["cat"]);
  });

  it("keeps version-like tokens with allowed inner punctuation", () => {
    expect(tokenize("v2.5")).toEqual(["v2.5"]);
  });

  it("splits on symbols not in the word class", () => {
    expect(tokenize("TCP/IP")).toEqual(["tcp", "ip"]);
  });
});

describe("tokenize — mixed scripts and edges", () => {
  it("emits ASCII tokens before CJK bigrams", () => {
    expect(tokenize("AES暗号")).toEqual(["aes", "暗号"]);
  });

  it("returns an empty array for empty input", () => {
    expect(tokenize("")).toEqual([]);
  });

  it("keeps ASCII digit runs but drops a trailing lone CJK char", () => {
    expect(tokenize("2024年")).toEqual(["2024"]);
  });
});

describe("uniqueTokens", () => {
  it("dedupes while preserving first-seen order", () => {
    // "暗号暗号" → 暗号/号暗/暗号 → unique 暗号/号暗
    expect(uniqueTokens("暗号暗号")).toEqual(["暗号", "号暗"]);
  });
});
