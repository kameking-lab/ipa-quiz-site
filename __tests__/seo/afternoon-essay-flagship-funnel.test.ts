import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

// 練習用モックの午後問題インデックス /[exam]/afternoon(AI採点ベータ・HD-4)は、
// 論文区分(st/sa/pm/sm/au)では実際の IPA 午後II 過去問を採点する indexable 旗艦
// /essay へ AfternoonEssayHint で誘導する。コンポーネント自身が ESSAY_EXAM_CODES
// で self-gate するため非論述区分には出ない（誇大回避は AfternoonEssayHint.test で担保）。
// この配線がページから消える回帰を「崩れたら落ちる」形で pin する。
describe("/[exam]/afternoon funnels 論文 exams to the flagship /essay", () => {
  const source = readFileSync(
    join(process.cwd(), "app/[exam]/afternoon/page.tsx"),
    "utf8",
  );

  it("imports AfternoonEssayHint", () => {
    expect(source).toContain(
      'import { AfternoonEssayHint } from "@/components/quiz/AfternoonEssayHint"',
    );
  });

  it("renders AfternoonEssayHint with the current exam code", () => {
    expect(source).toContain("<AfternoonEssayHint exam={code} />");
  });
});
