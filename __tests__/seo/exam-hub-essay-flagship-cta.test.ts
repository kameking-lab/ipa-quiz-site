import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

import { ESSAY_EXAM_CODES } from "@/lib/essay/load";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { ExamTopGuide } from "@/components/exam/ExamTopGuide";

// /essay grades editorial original material. /[exam]/afternoon publishes no
// practice, so a hub must not describe either route as official past-paper grading.
describe("exam hub funnels the 論文 essay CTA to the indexable flagship /essay", () => {
  const source = readFileSync(
    join(process.cwd(), "app/[exam]/page.tsx"),
    "utf8",
  );

  it("links the primary essay CTA to the indexable flagship hub /essay", () => {
    expect(source).toContain('<Link href="/essay">');
  });

  it("does not advertise unpublished practice or official past-paper grading", () => {
    expect(source).not.toContain("練習問題で腕試し（ベータ）");
    expect(source).not.toContain("実際の午後II過去問で AI 添削");
    expect(source).toContain("公式過去問の採点ではありません");
  });

  it.each(["st", "sa"] as const)("%s discloses original essay material and unsupported afternoon I grading", exam => {
    const html = renderToStaticMarkup(createElement(ExamTopGuide, { exam }));
    expect(html).toContain('href="/essay"');
    expect(html).toContain("午後IのAI採点は未対応");
    expect(html).toContain("編集者作成のオリジナル教材");
    expect(html).toContain("公式過去問の採点ではなく");
    expect(html).not.toContain(`href="/${exam}/afternoon"`);
  });

  it.each(["sc", "nw", "ap"] as const)("%s does not offer unsupported AI grading", exam => {
    const html = renderToStaticMarkup(createElement(ExamTopGuide, { exam }));
    expect(html).toContain("午後記述のAI採点は未対応です");
    expect(html).not.toContain('href="/essay"');
    expect(html).not.toContain(`href="/${exam}/afternoon"`);
  });

  it("the 論文 exams that receive this CTA are all covered by the /essay flagship", () => {
    // CTA を出す論文区分と /essay 旗艦の対応区分が一致していること（空導線回避）。
    for (const exam of ["st", "sa", "pm", "sm", "au"] as const) {
      expect(ESSAY_EXAM_CODES).toContain(exam);
    }
  });
});
