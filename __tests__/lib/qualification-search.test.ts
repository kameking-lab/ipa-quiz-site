import { describe, expect, it } from "vitest";
import { getHomeDirectory } from "@/lib/home/home-directory";
import aliases from "@/lib/qualifications/search-aliases.json";
import { normalizeQualificationSearch, searchQualifications } from "@/lib/qualifications/search";

const items = getHomeDirectory().flatMap((domain) =>
  [...domain.featured, ...domain.compact].map((item) => ({ ...item, domainTitle: domain.title })),
);

const cases: readonly (readonly [string, ...string[]])[] = [
  ["あいぱす", "ip"],
  ["アイパス", "ip"],
  ["Ｉ・Ｐ", "ip"],
  ["iパス", "ip"],
  ["きほん", "fe"],
  ["FE", "fe"],
  ["基本情報技術者試験", "fe"],
  ["おうよう", "ap"],
  ["AP", "ap"],
  ["せきゅまね", "sg"],
  ["ねすぺ", "nw"],
  ["登録セキスペ", "sc"],
  ["でんこう", "denko1", "denko2"],
  ["電験３種", "denken3"],
  ["でんけんさんしゅ", "denken3"],
  ["第２種・電気工事士", "denko2"],
  ["いちりくぎ", "riku-tech1"],
  ["２・アマ", "amateur2"],
  ["えねかん", "energy-kanri"],
  ["工担総合通信", "dekyo-charge-5"],
  ["たっけん", "takken"],
  ["宅地建物取引士", "takken"],
  ["えふぴー", "fp1", "fp2", "fp3"],
  ["ＦＰ 三級", "fp3"],
  ["FP", "fp1", "fp2", "fp3"],
  ["ぼき", "zensho-boki", "zensho-boki-2"],
  ["診断士二次", "chusho-secondary"],
  ["しゃろうし", "sharoushi"],
  ["ぎょうせい", "gyosei"],
  ["えいせい", "dai-1-shu-eisei-kanrisha", "dai-2-shu-eisei-kanrisha"],
  ["衛生管理者第二種", "dai-2-shu-eisei-kanrisha"],
  ["おつよん", "kikenbutsu-otsu4", "shobo-setsubishi-otsu4"],
  ["乙４", "kikenbutsu-otsu4", "shobo-setsubishi-otsu4"],
  ["消防設備士・甲四", "shobo-setsubishi-kou4"],
  ["びるかん", "biru-kan"],
  ["はんばいにしゅ", "khk-hanbai2"],
  ["うんこうかんりかもつ", "unko-kanrisha-kamotsu"],
  ["とうはん", "tohan"],
  ["けあまね", "caremanager"],
  ["PT", "rigaku-ryohoshi"],
  ["ほいくし", "hoikushi"],
  ["えいけんじゅんにきゅうぷらす", "eikenp2plus"],
  ["漢検　準二級", "kanken-j2"],
  ["すうけんじゅういっきゅう", "suken-11"],
  ["JLPT・Ｎ３", "jlpt-n3"],
  ["ちゅうけんさんきゅう", "chuken3"],
  ["そくりょうしほ", "sokuryoshiho", "survey-assistant"],
  ["技術士一次・電気電子", "pe-first-技術士第一次・電気電子"],
  ["ゾウエン ギノウシ ニキュウ", "zoen-gino2"],
  ["2級ディーゼル", "jidosha-2-diesel"],
];

describe("qualification search", () => {
  it.each(cases)("%s finds the expected qualifications in the top three on every surface", (query, ...expected) => {
    for (const surface of ["home", "browse", "directory"] as const) {
      const topThree = searchQualifications(items, query, surface).slice(0, 3).map((item) => item.key);
      expect(topThree, surface).toEqual(expect.arrayContaining(expected));
    }
  });

  it("covers each public qualification with its registered name and a kana reading", () => {
    expect(items.filter(({ key }) => !Object.hasOwn(aliases, key)).map(({ key }) => key)).toEqual([]);
    for (const [name, reading] of Object.values(aliases)) {
      expect(name).not.toBe("");
      expect(reading).toMatch(/^[ぁ-ゖー]+$/);
    }
  });

  it.each([
    ["ｱｲ･ﾊﾟｽ", "あいぱす"],
    ["ＦＰ―第 三 級", "fp3級"],
    ["電験・第３種", "電験3種"],
    ["算数検定十一級", "算数検定11級"],
    ["一般計量士", "一般計量士"],
    ["CFP®・タックス プランニング", "cfpたっくすぷらんにんぐ"],
  ])("normalizes %s", (input, expected) => {
    expect(normalizeQualificationSearch(input)).toBe(expected);
  });

  it("leaves the old matches and links in their original order", () => {
    const legacy = items.filter(({ name, abbr }) => (name + (abbr ?? "")).includes("電気"));
    expect(searchQualifications(items, "電気").slice(0, legacy.length)).toEqual(legacy);
    expect(searchQualifications(items, "電気", "home")).toEqual(legacy.slice(0, 6));
  });

  it("puts the complete FP abbreviation ahead of existing substring hits", () => {
    const matches = searchQualifications(items, "FP");
    expect(matches.slice(0, 3).map(({ key }) => key)).toEqual(["fp3", "fp2", "fp1"]);
    const legacyPartial = items.filter(({ name }) => /fp/i.test(name) && !/^fp/i.test(name));
    expect(matches.slice(3)).toEqual(legacyPartial);
  });

  it("ranks new formal-name matches above exact aliases, prefixes, and substrings", () => {
    const candidates = [
      { key: "substring", name: "模擬・FP3級講座" },
      { key: "prefix", name: "FP3級入門" },
      { key: "fp3", name: "ファイナンシャル・プランニング" },
      { key: "exact", name: "FP3級" },
    ];
    expect(searchQualifications(candidates, "ＦＰ・三級").map(({ key }) => key))
      .toEqual(["exact", "fp3", "prefix", "substring"]);
  });

  it("keeps exact candidates for a shared alias even beyond the home preview", () => {
    const candidates = [
      ...Array.from({ length: 6 }, (_, index) => ({ key: `legacy-${index}`, name: `えいせい${index}` })),
      ...items.filter(({ key }) => key === "dai-1-shu-eisei-kanrisha" || key === "dai-2-shu-eisei-kanrisha"),
    ];
    expect(searchQualifications(candidates, "えいせい", "home").map(({ key }) => key)).toHaveLength(8);
  });

  it("does not substitute another qualification for an unpublished exam", () => {
    expect(searchQualifications(items, "日商簿記")).toEqual([]);
  });
});
