import { describe, expect, it } from "vitest";
import { collectSubjectNoteLinks } from "@/components/exam-library/exam-note-links";
import { EXAM_CATALOG } from "@/lib/exam-library-catalog";

/**
 * G10 (coverage-correction 2026-09-13): 次の資格・資格カレンダーから安全衛生の
 * 科目へ送る導線は一覧ページ (/e-learning/exams?group=..&subject=..) を指している。
 * その科目に専用の解説記事があるのに一覧ページが出していなければ、読者には
 * 個別の回ページまで進まないと見えない = 実質つながっていない。
 */
describe("科目を絞った一覧ページはその科目の解説記事を出す", () => {
  it("subject 未指定なら何も出さない（全科目の記事を並べても読者の助けにならない）", () => {
    expect(collectSubjectNoteLinks(EXAM_CATALOG, "emkohyo", null)).toEqual([]);
  });

  it("回をまたいで重複を除く（同じ記事が複数年度に紐づいている）", () => {
    const links = collectSubjectNoteLinks(EXAM_CATALOG, "emkohyo", "有機溶剤");
    const urls = links.map((l) => l.url);
    expect(new Set(urls).size).toBe(urls.length);
  });

  it("無料記事を有料より先に並べる", () => {
    for (const [group, subject] of [
      ["emkohyo", "有機溶剤"],
      ["cskohyo", "労働衛生関係法令"],
    ] as const) {
      const kinds = collectSubjectNoteLinks(EXAM_CATALOG, group, subject).map((l) => l.kind);
      const firstPaid = kinds.indexOf("paid");
      const lastFree = kinds.lastIndexOf("free");
      if (firstPaid !== -1 && lastFree !== -1) expect(firstPaid).toBeGreaterThan(lastFree);
    }
  });

  it("2026-09-13に公開した11科目ガイドが、その科目の一覧ページから引ける", () => {
    const expected: Record<string, [string, string]> = {
      "https://note.com/anzen_ai_jp/n/n2de579238b62": ["cskohyo", "労働衛生関係法令"],
      "https://note.com/anzen_ai_jp/n/nef1b585a3a81": ["cskohyo", "電気安全"],
      "https://note.com/anzen_ai_jp/n/nac697b4a463c": ["cskohyo", "化学安全"],
      "https://note.com/anzen_ai_jp/n/n07484a5c6ad4": ["cskohyo", "建築安全"],
      "https://note.com/anzen_ai_jp/n/n611c052c28e4": ["emkohyo", "有機溶剤"],
      "https://note.com/anzen_ai_jp/n/n306ea7448af7": ["emkohyo", "鉱物性粉じん"],
      "https://note.com/anzen_ai_jp/n/ndd4ad022c045": ["emkohyo", "特定化学物質"],
      "https://note.com/anzen_ai_jp/n/ne7265e071a47": ["emkohyo", "金属類"],
      "https://note.com/anzen_ai_jp/n/n73e96a181f33": ["emkohyo", "放射性物質"],
      "https://note.com/anzen_ai_jp/n/n19b0412a9477": ["emkohyo", "デザイン・サンプリング"],
      "https://note.com/anzen_ai_jp/n/n4083bac24433": ["emkohyo", "分析に関する概論"],
    };
    for (const [url, [group, subject]] of Object.entries(expected)) {
      const urls = collectSubjectNoteLinks(EXAM_CATALOG, group, subject).map((l) => l.url);
      expect(urls, `${subject} (${group}) should surface ${url}`).toContain(url);
    }
  });

  it("労働衛生コンサルタントの『労働衛生関係法令』ガイドを、同名の作業環境測定士科目に付けない", () => {
    // 同じ科目名だが別の試験。ここを取り違えると読者は別試験の記事に送られる。
    const emkohyo = collectSubjectNoteLinks(EXAM_CATALOG, "emkohyo", "労働衛生関係法令").map((l) => l.url);
    expect(emkohyo).not.toContain("https://note.com/anzen_ai_jp/n/n2de579238b62");
  });

  it("解説記事リンクのラベルに価格を焼き込まない（値付けが変わると嘘になる）", () => {
    for (const entry of EXAM_CATALOG) {
      for (const link of entry.noteLinks ?? []) {
        expect(link.title, `${entry.id}: ${link.title}`).not.toMatch(/[0-9０-９]+\s*円/);
      }
    }
  });
});
