import { describe, expect, it } from "vitest";

import { EXAM_NOTE_GUIDES, EXAM_NOTE_SUPPLEMENTS, getNoteGuide, getNoteGuideSupplement } from "@/lib/note-guides";
import type { ExamCode } from "@/lib/questions/types";

describe("note-guides", () => {
  it("keeps the sa/st/nw entries byte-for-byte from the previous component map", () => {
    expect(getNoteGuide("sa")).toEqual({
      kind: "free",
      href: "https://note.com/sikaku_rakutoru/n/n9e207dfe4421",
      label: "性能見積もりの根拠を4段階で書く",
      source: "exam_sa",
      account: "sikaku_rakutoru",
    });
    expect(getNoteGuide("st")?.href).toBe(
      "https://note.com/sikaku_rakutoru/n/n6ebb89810300",
    );
    expect(getNoteGuide("nw")?.href).toBe(
      "https://note.com/sikaku_rakutoru/n/n3a7c95159e7a",
    );
  });

  // ip / ap は「まだ結線されていない試験区分」の代表としてここで未登録を確認していたが、
  // 2026-09-13 に13区分すべてへ無料ガイドを結線したので、その役目は終わった。
  // チェックを消すのではなく「13区分すべてに、正しい垢の無料ガイドがある」という
  // より強い不変条件に置き換える。
  it("registers a verified free guide for all 13 IPA exam codes", () => {
    const allExamCodes: ExamCode[] = [
      "ip", "sg", "fe", "ap", "st", "sa", "pm", "nw", "db", "es", "sc", "sm", "au",
    ];
    expect(Object.keys(EXAM_NOTE_GUIDES).sort()).toEqual([...allExamCodes].sort());
    for (const exam of allExamCodes) {
      const guide = getNoteGuide(exam);
      expect(guide, exam).toBeDefined();
      expect(guide!.kind, exam).toBe("free");
      expect(guide!.href, exam).toMatch(/^https:\/\/note\.com\/[a-z0-9_]+\/n\/n[0-9a-f]+$/);
      // href のアカウントセグメントと account フィールドは必ず一致する。
      expect(new URL(guide!.href).pathname.split("/")[1], exam).toBe(guide!.account);
      // source は exam_<code> で、別区分の source を使い回していないこと。
      expect(guide!.source, exam).toBe(`exam_${exam}`);
    }
  });

  it("wires ip/ap to the ipa_quiz_ai account articles verified on 2026-09-13", () => {
    // ip は既存の公開済み無料記事の再利用(existing-guides/existing-ip-free.json)、
    // ap は新規公開(receipts/cf-11-ap-free.json)。どちらも ipa_quiz_ai 垢。
    expect(getNoteGuide("ip")).toEqual({
      kind: "free",
      href: "https://note.com/ipa_quiz_ai/n/nbabb9742557b",
      label: "ストラテジ系32問を経営3手法で判別する",
      source: "exam_ip",
      account: "ipa_quiz_ai",
    });
    expect(getNoteGuide("ap")?.href).toBe("https://note.com/ipa_quiz_ai/n/n550db5ff2054");
    expect(getNoteGuide("ap")?.account).toBe("ipa_quiz_ai");
  });

  it("wires fe/sg to the ipa_quiz_ai account articles verified on 2026-09-13", () => {
    // fe は既存記事の再利用(existing-guides/existing-fe-free.json)、
    // sg は新規公開(receipts/cf-10-sg-free.json)。
    expect(getNoteGuide("fe")?.href).toBe("https://note.com/ipa_quiz_ai/n/n7e5046098452");
    expect(getNoteGuide("fe")?.account).toBe("ipa_quiz_ai");
    expect(getNoteGuide("sg")?.href).toBe("https://note.com/ipa_quiz_ai/n/n094a9aefbc1a");
    expect(getNoteGuide("sg")?.account).toBe("ipa_quiz_ai");
  });

  it("wires the verified AU article (reports/revenue-eco-20260913/receipts/free-01-au-am2.json, ok:true)", () => {
    expect(getNoteGuide("au")).toEqual({
      kind: "free",
      href: "https://note.com/sikaku_rakutoru/n/n573e38ac5dea",
      label: "科目A-2(択一)を論文対策の前に1周させる",
      source: "exam_au",
      account: "sikaku_rakutoru",
    });
  });

  it("wires the verified SC article (reports/revenue-eco-20260913/receipts/free-02-sc-am2.json, ok:true)", () => {
    expect(getNoteGuide("sc")).toEqual({
      kind: "free",
      href: "https://note.com/sikaku_rakutoru/n/nee848928ccb7",
      label: "科目A-2を記述対策の隣に置く",
      source: "exam_sc",
      account: "sikaku_rakutoru",
    });
  });

  it("wires the verified PM article (reports/revenue-eco-20260913/receipts/free-03-pm-am2.json, ok:true)", () => {
    expect(getNoteGuide("pm")).toEqual({
      kind: "free",
      href: "https://note.com/sikaku_rakutoru/n/n20f719f019ac",
      label: "科目A-2を論文と別枠で取る",
      source: "exam_pm",
      account: "sikaku_rakutoru",
    });
  });

  it("wires the verified DB article (reports/revenue-eco-20260913/receipts/free-04-db-am2.json, ok:true)", () => {
    expect(getNoteGuide("db")).toEqual({
      kind: "free",
      href: "https://note.com/sikaku_rakutoru/n/n8b0780e3c3b8",
      label: "科目A-2は設計問題と別の筋肉を使う",
      source: "exam_db",
      account: "sikaku_rakutoru",
    });
  });

  it("keeps sm/es wired to the sikaku_rakutoru articles published on 2026-09-13", () => {
    // receipts/free-05-sm-am2.json / free-06-es-am2.json (ok:true)。
    expect(getNoteGuide("sm")?.href).toBe("https://note.com/sikaku_rakutoru/n/nba9435c2ae0f");
    expect(getNoteGuide("es")?.href).toBe("https://note.com/sikaku_rakutoru/n/nd0881771250e");
  });

  it("never points two exam codes at the same article", () => {
    // 同じURLを2区分に貼ると、片方の読者が別区分のガイドへ送られる。
    const hrefs = Object.values(EXAM_NOTE_GUIDES).map((g) => g?.href).filter(Boolean);
    expect(new Set(hrefs).size).toBe(hrefs.length);
  });

  it("never mixes free/paid wording into a label", () => {
    for (const guide of Object.values(EXAM_NOTE_GUIDES)) {
      if (!guide) continue;
      if (guide.kind === "paid") expect(guide.label).not.toMatch(/無料/);
      if (guide.kind === "free") expect(guide.label).not.toMatch(/有料|¥|円/);
    }
  });

  it("keeps the pm primary (free) guide unchanged after adding a paid supplement", () => {
    // getNoteGuide("pm") の戻り値の形は既存テストと同一のまま(下位互換の拡張であることの確認)。
    expect(getNoteGuide("pm")).toEqual({
      kind: "free",
      href: "https://note.com/sikaku_rakutoru/n/n20f719f019ac",
      label: "科目A-2を論文と別枠で取る",
      source: "exam_pm",
      account: "sikaku_rakutoru",
    });
  });

  it("wires the PM paid worksheet as a supplement, not a replacement", () => {
    expect(getNoteGuideSupplement("pm")).toEqual({
      kind: "paid",
      href: "https://note.com/sikaku_rakutoru/n/nb57e5dd70d62",
      label: "6問+2ワークシートで科目A-2を演習する",
      source: "exam_pm_paid",
      account: "sikaku_rakutoru",
      description:
        "500円（購入は任意です）。最初の演習は記事内で無料の試し読みができます。6問の演習と2つのワークシートで、無料ガイドの型を実際の答案に書き起こせます。",
    });
  });

  it("has no supplement for exams that were never approved for a paid pairing", () => {
    expect(getNoteGuideSupplement("sa")).toBeUndefined();
    expect(getNoteGuideSupplement("ip")).toBeUndefined();
  });

  it("never mixes free/paid wording into a supplement label either", () => {
    for (const guide of Object.values(EXAM_NOTE_SUPPLEMENTS)) {
      if (!guide) continue;
      if (guide.kind === "paid") expect(guide.label).not.toMatch(/無料/);
      if (guide.kind === "free") expect(guide.label).not.toMatch(/有料|¥|円/);
    }
  });
});
