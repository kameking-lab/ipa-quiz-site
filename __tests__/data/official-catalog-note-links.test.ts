import { describe, expect, it } from "vitest";

import officialCatalog from "@/data/exam-library/official-catalog.json";

interface CatalogNoteLink {
  title: string;
  url: string;
  kind?: "free" | "paid";
}
interface CatalogEntry {
  id: string;
  subject?: string;
  group?: string;
  noteLinks?: CatalogNoteLink[];
}

const entries = officialCatalog as unknown as CatalogEntry[];
const withLinks = entries.filter((e) => (e.noteLinks?.length ?? 0) > 0);

describe("official-catalog noteLinks", () => {
  it("never lists a paid article above a free one", () => {
    // 無料が先・有料が後。読者が最初に見るのは必ず無料の記事。
    for (const entry of withLinks) {
      const kinds = entry.noteLinks!.map((l) => l.kind);
      const firstPaid = kinds.indexOf("paid");
      if (firstPaid === -1) continue;
      expect(kinds.slice(firstPaid).every((k) => k === "paid"), entry.id).toBe(true);
    }
  });

  it("labels every link with an explicit free/paid kind", () => {
    for (const entry of withLinks) {
      for (const link of entry.noteLinks!) {
        expect(["free", "paid"], `${entry.id} ${link.url}`).toContain(link.kind);
      }
    }
  });

  it("keeps the paid labour-hygiene workbook as a supplement to the free consultant guide", () => {
    // 一度この有料リンクが作業事故で消えていた。無料記事を置き換えるのではなく、
    // 同じ科目の無料記事の後ろに補助として並ぶ形であることを固定する。
    const paidUrl = "https://note.com/anzen_ai_jp/n/nb9490806c1ef";
    const freeUrl = "https://note.com/anzen_ai_jp/n/n8ffef6a2eb2d";
    for (const id of ["cskohyo-CS20251908", "cskohyo-CS20251910"]) {
      const entry = entries.find((e) => e.id === id);
      expect(entry, id).toBeDefined();
      const urls = entry!.noteLinks!.map((l) => l.url);
      expect(urls, id).toContain(freeUrl);
      expect(urls, id).toContain(paidUrl);
      expect(urls.indexOf(freeUrl), id).toBeLessThan(urls.indexOf(paidUrl));
      expect(entry!.noteLinks!.find((l) => l.url === paidUrl)?.kind, id).toBe("paid");
    }
  });

  it("gives every one of the 18 作業環境測定士 (emkohyo) rows the same free guide", () => {
    const emkohyo = entries.filter((e) => e.group === "emkohyo");
    expect(emkohyo).toHaveLength(18);
    for (const entry of emkohyo) {
      const free = entry.noteLinks?.filter((l) => l.kind === "free") ?? [];
      expect(free.length, entry.id).toBeGreaterThan(0);
    }
  });

  it("never puts a labour-safety consultant subject's guide on a labour-hygiene subject", () => {
    // 労働安全コンサルタント(産業安全…)と労働衛生コンサルタント(労働衛生…)は別試験。
    // 片方のガイドがもう片方の科目に貼られていないことを、URLの集合が交わらないことで確認する。
    const safetySubjects = new Set([
      "産業安全一般", "産業安全関係法令", "機械安全", "電気安全", "化学安全", "土木安全", "建築安全",
    ]);
    const hygieneSubjects = new Set([
      "労働衛生一般", "労働衛生関係法令", "健康管理", "労働衛生工学",
    ]);
    const urlsFor = (subjects: Set<string>) =>
      new Set(
        entries
          .filter((e) => e.group === "cskohyo" && e.subject && subjects.has(e.subject))
          .flatMap((e) => e.noteLinks?.map((l) => l.url) ?? []),
      );
    const safetyUrls = urlsFor(safetySubjects);
    const hygieneUrls = urlsFor(hygieneSubjects);
    const shared = [...safetyUrls].filter((u) => hygieneUrls.has(u));
    expect(shared).toEqual([]);
  });

  it("points every note link at note.com over https", () => {
    for (const entry of withLinks) {
      for (const link of entry.noteLinks!) {
        const url = new URL(link.url);
        expect(url.protocol, link.url).toBe("https:");
        expect(url.hostname, link.url).toBe("note.com");
      }
    }
  });
});
