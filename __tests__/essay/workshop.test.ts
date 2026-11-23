import { beforeEach, describe, expect, it, vi } from "vitest";
import { WORKSHOP_QUESTIONS } from "@/data/questions/essay/workshop";
import { countEssayCharacters, SECTION_KEYS } from "@/lib/essay/workshop";
import { adjustedSamples, costFollowUp, planningExcerpt, sampleAdjusted, sampleExcerpt, sampleInterview, sampleSentenceChanges, sampleTemplate, shortCostFollowUp, shortSampleInterview } from "@/lib/essay/workshop-sample";
import { generateWorkshopDraft, generateWorkshopInterview, generateWorkshopOpening, InsufficientWorkshopExperience } from "@/lib/essay/workshop-generation";
import { findUnsupportedWorkshopNumbers, hasGroundedBudgetResult } from "@/lib/essay/workshop-numbers";
import { isGroundedCostApproval } from "@/lib/essay/workshop-facts";
import { POST } from "@/app/api/essay-grade/route";

const mock = vi.hoisted(() => ({
  finishReason: "STOP",
  draft: {} as unknown,
  calls: 0,
  input: {} as unknown,
  reserve: vi.fn(),
  record: vi.fn(),
}));

vi.mock("@/lib/ai/provider", () => ({
  resolveModel: () => "gemini-2.5-flash",
  gradingThinkingBudget: () => 0,
  getProvider: async () => ({
    name: "gemini",
    async *streamChat({ messages, onComplete }: { messages: { content: string }[]; onComplete: (result: object) => void }) {
      mock.calls += 1;
      mock.input = JSON.parse(messages[0].content) as unknown;
      yield JSON.stringify(mock.draft);
      onComplete({
        finishReason: mock.finishReason, truncated: mock.finishReason === "MAX_TOKENS",
        promptTokens: 806, outputTokens: 500, thoughtsTokens: 140, totalTokens: 1446,
      });
    },
  }),
}));

vi.mock("@/lib/ai/cost-guard", () => ({
  checkMonthlyCostCap: mock.reserve,
  recordAiCost: mock.record,
  textBudget: (tier: string) => ({ tier, inputTokens: 1100, outputTokens: 8192 }),
}));

function cite(requirement: number, paragraph: number, quote: string, index: number, answerQuote: string) {
  return { requirement, paragraph, quote, facts: [{ index, quote: answerQuote }] };
}

function variantReply(draft: typeof sampleTemplate, coverage: ReturnType<typeof cite>[]) {
  return { title: draft.title, coverage, edits: SECTION_KEYS.map((section) => ({
    section, title: draft.sections[section].title, paragraphs: draft.sections[section].paragraphs,
  })) };
}

const riskCoverage = [
  cite(1, 2, sampleTemplate.sections.ア.paragraphs[1].text.slice(0, 154), 5, "新システムが再送する"),
  cite(2, 1, sampleTemplate.sections.イ.paragraphs[0].text.slice(0, 187), 6, "新旧の並行稼働は予算外"),
  cite(3, 2, sampleTemplate.sections.ウ.paragraphs[1].text.slice(0, 259), 9, "旧番号と明細行番号の対応表"),
];

describe("論文作成見本", () => {
  beforeEach(() => {
    mock.draft = sampleTemplate;
    mock.finishReason = "STOP";
    mock.calls = 0;
    mock.input = {};
    mock.record.mockClear();
    mock.reserve.mockReset().mockResolvedValue({ allowed: true, reservation: { receipt: "test" } });
  });

  it("各区分に3年度の設問、字数とIPA資料を持つ", () => {
    const codes = Object.keys(WORKSHOP_QUESTIONS);
    expect(codes.sort()).toEqual(["au", "pm", "sa", "sm", "st"]);
    for (const questions of Object.values(WORKSHOP_QUESTIONS)) {
      expect(questions.map(({ year }) => year)).toEqual([2025, 2024, 2023]);
      for (const question of questions) {
        expect(question.prompts).toHaveLength(3);
        expect(question.bounds[0]).toEqual([question.year === 2025 ? 400 : 0, 800]);
        expect(question.bounds[2]).toEqual(question.exam === "au" ? [700, 1400] : [600, 1200]);
        expect(Object.values(question.source).every((url) => new URL(url).hostname === "www.ipa.go.jp")).toBe(true);
      }
    }
  });

  it("最初の回答から後続9問を準備する", async () => {
    mock.draft = { questions: sampleInterview.slice(1).map(({ prompt }) => ({ prompt, choices: ["経験あり", "該当なし"] })) };
    const result = await generateWorkshopInterview("pm", sampleInterview[0].answer);
    expect(result.questions).toHaveLength(9);
    expect(mock.calls).toBe(1);
  });

  it("王道テンプレートと年度版の各設問に実際の字数を付ける", async () => {
    const template = await generateWorkshopDraft("pm", sampleInterview);
    expect(template.lengths).toEqual(SECTION_KEYS.map((key) => countEssayCharacters(sampleTemplate.sections[key].body)));
    expect(template.draft.sections.ウ.paragraphs).toEqual(sampleTemplate.sections.ウ.paragraphs);
    expect(template.completion.finishReason).toBe("STOP");
    expect(template.draft.reuse).toHaveLength(3);
    expect(mock.record).toHaveBeenCalledWith(expect.objectContaining({ inputTokens: 806, outputTokens: 640 }));
    mock.draft = {
      title: sampleAdjusted.title,
      coverage: riskCoverage.map((item) => item.requirement === 3
        ? { ...item, quote: sampleAdjusted.sections.ウ.paragraphs[1].text.slice(0, 259) } : item),
      edits: (["イ", "ウ"] as const).map((section, i) => ({
        section,
        paragraphs: sampleTemplate.sections[section].paragraphs.map(({ text }, index) => {
          const from = index + 1;
          if (index !== (i === 0 ? 3 : 1)) return { from };
          const [{ sentence: replacement }] = sampleSentenceChanges(sampleAdjusted.sections[section].paragraphs[index].text, text)
            .filter(({ changed }) => changed);
          return { from, changes: [{ original: text.split(/(?<=。)/u)[i === 0 ? 3 : 4], replacement }] };
        }),
      })),
    };
    const adjusted = await generateWorkshopDraft("pm", sampleInterview, { variant: { questionId: "pm-2025-q2", template: template.draft } });
    expect(adjusted.draft).toEqual(sampleAdjusted);
    expect(SECTION_KEYS.map((key) => countEssayCharacters(adjusted.draft.sections[key].body))).toEqual(adjusted.lengths);
  });

  it("年度版で存在しない差し替え先は受け付けず、費用を記録する", async () => {
    mock.draft = {
      title: "年度別の原稿",
      edits: [{ section: "イ", paragraphs: [{ from: 1, changes: [{ original: "存在しない文。", replacement: "変更後の文。" }] }] }],
    };
    await expect(generateWorkshopDraft("pm", sampleInterview, { variant: { questionId: "pm-2025-q2", template: sampleTemplate } }))
      .rejects.toThrow("invalid_replacement_anchor");
    expect(mock.calls).toBe(1);
    expect(mock.record).toHaveBeenCalledOnce();
  });

  it("材料不足なら不足する事実を聞く質問を返し、自動で再生成しない", async () => {
    const followUp = [{ prompt: "再見積りをした時期と予算との差は？", choices: ["計画を見直した時期と差を答える", "再見積りはしていない"] }];
    mock.draft = { insufficient: true, followUp };
    const result = await generateWorkshopDraft("pm", sampleInterview, { variant: { questionId: "pm-2024-q1", template: sampleTemplate } })
      .catch((error: unknown) => error);
    expect(result).toBeInstanceOf(InsufficientWorkshopExperience);
    expect(result).toMatchObject({ followUp: [
      { prompt: shortCostFollowUp[0].prompt },
      { prompt: shortCostFollowUp[1].prompt },
    ] });
    expect(mock.calls).toBe(0);
    expect(mock.reserve).not.toHaveBeenCalled();
    expect(mock.record).not.toHaveBeenCalled();
    await expect(generateWorkshopDraft("pm", sampleInterview, {
      variant: { questionId: "pm-2024-q1", template: sampleTemplate }, followUp: shortCostFollowUp.slice(0, 2),
    })).rejects.toMatchObject({ followUp: [{ prompt: shortCostFollowUp[2].prompt }] });
    expect(mock.calls).toBe(0);
  });

  it("王道稿でも元の10回答を保持したまま補足を渡せる", async () => {
    const followUp = [{ prompt: costFollowUp[0].prompt, choices: ["計画時の条件を答える", "該当なし"] }];
    mock.draft = { insufficient: true, followUp };
    await expect(generateWorkshopDraft("pm", sampleInterview)).rejects.toMatchObject({ followUp });
    expect(mock.calls).toBe(1);

    mock.draft = sampleTemplate;
    const supplement = costFollowUp.slice(0, 1);
    const result = await generateWorkshopDraft("pm", sampleInterview, { followUp: supplement });
    expect(mock.input).toMatchObject({ facts: sampleInterview, additionalFacts: supplement });
    expect(result.draft).toEqual(sampleTemplate);
    expect(mock.calls).toBe(2);
  });

  it("コストの補足3回答を引き継ぎ、承認済みの対策だけで年度版を作る", async () => {
    const costDraft = adjustedSamples["pm-2024-q1"]!;
    const earlierAnswer = { prompt: "移行で判断できた範囲は？", answer: "切替時に稼働可否を決めた。" };
    const followUp = [earlierAnswer, ...shortCostFollowUp];
    const budget = "予算の千二百万円を百万円超える見込みである。";
    const costResult = variantReply(costDraft, [
      cite(1, 2, costDraft.sections.ア.paragraphs[1].text.slice(0, 49), 12, "予測型"),
      cite(2, 2, costDraft.sections.ア.paragraphs[1].text.slice(0, 157), 12, "委託先へ前提共有"),
      cite(3, 1, costDraft.sections.イ.paragraphs[0].text.slice(0, 163), 12, "委託先が試作"),
      cite(4, 2, costDraft.sections.イ.paragraphs[1].text.slice(0, 80), 13, "2種類を超えると設計完了時に再見積り"),
      cite(5, 3, costDraft.sections.イ.paragraphs[2].text.slice(0, 114), 13, "予算を100万円超える見込み"),
      cite(6, 1, costDraft.sections.ウ.paragraphs[0].text.split("。")[0], 13, "2か月目に6種類で再見積りした"),
      cite(7, 1, budget, 13, "予算を100万円超える見込み"),
      cite(8, 2, "開発部長が対象範囲の変更を承認した。", 14, "範囲変更"),
    ]);
    mock.draft = costResult;
    const variant = { questionId: "pm-2024-q1", template: sampleTemplate };
    const result = await generateWorkshopDraft("pm", shortSampleInterview, { followUp, variant });
    expect(mock.input).toMatchObject({ facts: shortSampleInterview, additionalFacts: followUp });
    expect(result.draft).toEqual(costDraft);
    expect(result.nearMinimum).toEqual([]);
    const declined = [...followUp.slice(0, -1), { prompt: followUp.at(-1)!.prompt, answer: "開発部長の範囲変更は未承認。" }];
    await expect(generateWorkshopDraft("pm", shortSampleInterview, { followUp: declined, variant }))
      .rejects.toMatchObject({ followUp: [] });
    expect(mock.calls).toBe(1);
    for (const answer of [
      "開発部長への範囲変更の承認申請は予定。",
      "開発部長の範囲変更は承認されていない。経理が削減を承認した。",
      "経理が範囲変更を承認した。開発部長が予算増額を承認した。",
    ]) {
      const rejected = [...followUp.slice(0, -1), { prompt: followUp.at(-1)!.prompt, answer }];
      await expect(generateWorkshopDraft("pm", shortSampleInterview, { followUp: rejected, variant }))
        .rejects.toThrow("invalid_variant_coverage");
    }
    const reversed = budget.replace("超える", "下回る");
    costResult.edits[2].paragraphs = costResult.edits[2].paragraphs.map((paragraph, index) => index === 0
      ? { ...paragraph, text: paragraph.text.replace(budget, reversed) } : paragraph);
    costResult.coverage[6] = { ...costResult.coverage[6], quote: reversed };
    await expect(generateWorkshopDraft("pm", shortSampleInterview, { followUp, variant })).rejects.toThrow("invalid_variant_coverage");
  });

  it("2023年度は同じ対象を計画時に修整して実行時に評価する稿を採り、コスト稿を退ける", async () => {
    const draft = adjustedSamples["pm-2023-q1"]!;
    const variant = { questionId: "pm-2023-q1", template: sampleTemplate };
    const point = (key: "ア" | "イ" | "ウ", paragraph: number) => draft.sections[key].paragraphs[paragraph - 1].text;
    mock.draft = variantReply(draft, [
      cite(1, 2, point("ア", 2).slice(0, 240), 4, "二重出荷"),
      cite(2, 2, point("イ", 2).slice(0, 260), 7, "明細照合"),
      cite(3, 3, point("ウ", 3).slice(0, 250), 10, "作業記録"),
    ]);
    await expect(generateWorkshopDraft("pm", shortSampleInterview, { variant })).resolves.toMatchObject({ draft });
    const costDraft = adjustedSamples["pm-2024-q1"]!;
    mock.draft = variantReply(costDraft, [
      cite(1, 1, costDraft.sections.ア.paragraphs[0].text.slice(0, 250), 2, "費用"),
      cite(2, 3, costDraft.sections.イ.paragraphs[2].text.slice(0, 250), 12, "再見積り"),
      cite(3, 2, costDraft.sections.ウ.paragraphs[1].text.slice(0, 300), 13, "範囲変更"),
    ]);
    await expect(generateWorkshopDraft("pm", shortSampleInterview, { variant, followUp: shortCostFollowUp }))
      .rejects.toThrow("invalid_variant_coverage");
  });

  it("承認者と施策は同じ回答から照合し、想定や別の承認を使い回さない", () => {
    const claim = "開発部長が対象範囲の変更を承認した。";
    expect(isGroundedCostApproval(claim, ["対象範囲の変更について開発部長の承認を得た。"])).toBe(true);
    expect(isGroundedCostApproval(claim, ["開発部長が対象範囲の変更を承認予定。"])).toBe(false);
    expect(isGroundedCostApproval(claim, ["営業部長が対象範囲の変更を承認。開発部長が予算増額を承認。"])).toBe(false);
  });

  it("予算差を再見積額と比較し、人数と期間の置き換えも退ける", () => {
    const facts = ["6か月・12人。予算1,200万円、計画額1,120万円。", "再見積額1,300万円で予算を100万円超える見込み。"];
    expect(hasGroundedBudgetResult("予算の千二百万円を百万円超える見込みである。", facts)).toBe(true);
    expect(hasGroundedBudgetResult("予算を百万円下回る見込みである。", facts)).toBe(false);
    expect(hasGroundedBudgetResult("予算を千二百万円超える見込みである。", facts)).toBe(false);
    expect(hasGroundedBudgetResult("予算の千百二十万円を百万円超える見込みである。", facts)).toBe(false);
    expect(hasGroundedBudgetResult("再見積額は千百二十万円だった。予算を百万円超える見込みである。", facts)).toBe(false);
    expect(findUnsupportedWorkshopNumbers("期間は十か月、体制は二十人。", facts)).toEqual(["十か月", "二十人"]);
    expect(findUnsupportedWorkshopNumbers("期間は六カ月で、十二人で進めた。", facts)).toEqual([]);
  });

  it("同一会員の同じ回答版と処理段階の同時送信を一件にまとめる", async () => {
    const member = { memberId: "member-a" };
    const [first, repeat, other] = await Promise.all([
      generateWorkshopDraft("pm", sampleInterview, member),
      generateWorkshopDraft("pm", sampleInterview, member),
      generateWorkshopDraft("pm", sampleInterview, { memberId: "member-b" }),
    ]);
    expect(first).toBe(repeat);
    expect(first).not.toBe(other);
    expect(mock.reserve).toHaveBeenCalledTimes(2);
    expect(mock.record).toHaveBeenCalledTimes(2);
    await Promise.all([
      generateWorkshopDraft("pm", sampleInterview, member),
      generateWorkshopDraft("pm", sampleInterview, { ...member, followUp: costFollowUp.slice(0, 1) }),
    ]);
    expect(mock.record).toHaveBeenCalledTimes(4);
  });

  it("本人の体験用の処理からは字数を確認した設問アだけを返す", async () => {
    const result = await generateWorkshopOpening("pm", shortSampleInterview, { memberId: "member-a" });
    expect(result.draft.sections).toEqual({ ア: sampleTemplate.sections.ア });
    expect(result.length).toBe(countEssayCharacters(sampleTemplate.sections.ア.body));
    expect(mock.input).toMatchObject({ bounds: [{ section: "ア", min: 400, max: 800 }] });
    expect(mock.record).toHaveBeenCalledOnce();
  });

  it("題意を満たす本文は変更0件で返り、見出しだけの変更も字数に入らない", async () => {
    const variant = { questionId: "pm-2025-q2", template: sampleTemplate };
    mock.draft = { title: sampleTemplate.title, edits: [], coverage: riskCoverage };
    const unchanged = await generateWorkshopDraft("pm", sampleInterview, { variant });
    expect(unchanged.draft.sections).toEqual(sampleTemplate.sections);

    const [first, ...rest] = sampleTemplate.sections.ア.paragraphs;
    const heading = "1.1　対象業務とプロジェクト";
    mock.draft = {
      title: sampleTemplate.title,
      coverage: riskCoverage,
      edits: [{ section: "ア", paragraphs: [{ from: 1, heading }, ...rest.map((_, i) => ({ from: i + 2 }))] }],
    };
    const changed = await generateWorkshopDraft("pm", sampleInterview, { variant });
    expect(changed.draft.sections.ア.paragraphs[0]).toEqual({ ...first, heading });
    expect(changed.lengths).toEqual(unchanged.lengths);
  });

  it("内容の違う年度は字数が足りても変更0件で完成扱いにしない", async () => {
    mock.draft = { title: sampleTemplate.title, edits: [], coverage: riskCoverage };
    const variant = { questionId: "pm-2024-q1", template: sampleTemplate };
    await expect(generateWorkshopDraft("pm", shortSampleInterview, { variant })).rejects.toMatchObject({
      followUp: [{ prompt: shortCostFollowUp[0].prompt }, { prompt: shortCostFollowUp[1].prompt }],
    });
    await expect(generateWorkshopDraft("pm", shortSampleInterview, { variant, followUp: shortCostFollowUp }))
      .rejects.toThrow("invalid_variant_coverage");
    expect(mock.calls).toBe(1);
  });

  it("補足が辞退済み・上限到達なら質問を繰り返さない", async () => {
    const variant = { questionId: "pm-2024-q1", template: sampleTemplate };
    mock.draft = { insufficient: true, followUp: [{ prompt: "範囲変更は承認されましたか？", choices: ["承認", "未承認"] }] };
    const answered = [...shortCostFollowUp.slice(0, 2), { prompt: shortCostFollowUp[2].prompt, answer: "範囲変更は未承認。" }];
    await expect(generateWorkshopDraft("pm", shortSampleInterview, { followUp: answered, variant })).rejects.toMatchObject({ followUp: [] });

    const followUp = Array.from({ length: 12 }, (_, index) => ({ prompt: `質問${index}`, answer: "経験なし" }));
    await expect(generateWorkshopDraft("pm", shortSampleInterview, { followUp, variant })).rejects.toMatchObject({ followUp: [] });
    expect(mock.input).toMatchObject({ followUpSlots: 0 });
    await expect(generateWorkshopDraft("pm", shortSampleInterview, { followUp: followUp.slice(1), variant })).rejects.toMatchObject({
      followUp: [{ prompt: shortCostFollowUp[0].prompt }],
    });
    expect(mock.calls).toBe(1);
  });

  it("年度別稿の根拠は実際の段落と回答から正確に引用する", async () => {
    mock.draft = { title: sampleTemplate.title, edits: [], coverage: [
      ...riskCoverage.slice(0, 2), { ...riskCoverage[2], facts: [{ index: 9, quote: "実際の回答にない記述" }] },
    ] };
    await expect(generateWorkshopDraft("pm", sampleInterview, { variant: { questionId: "pm-2025-q2", template: sampleTemplate } }))
      .rejects.toThrow("invalid_variant_coverage");
  });

  it("他の設問へ流用できる材料が少なくても王道稿を返す", async () => {
    mock.draft = { ...sampleTemplate, reuse: [] };
    await expect(generateWorkshopDraft("pm", shortSampleInterview)).resolves.toMatchObject({ draft: { reuse: [] } });
    mock.draft = { ...sampleTemplate, reuse: [{ ...sampleTemplate.reuse[0], anchor: "実際の本文にない記述" }] };
    await expect(generateWorkshopDraft("pm", shortSampleInterview)).rejects.toThrow("invalid_reuse_anchors");
  });

  it("回答にない円・分・件の数値を完成稿に含めない", async () => {
    expect(findUnsupportedWorkshopNumbers("約一万二千円を使い、一時間で十五件を確認した。対象の二分の一に当たる。十分な準備だった。", ["１．２万円、60分、15件"]))
      .toEqual([]);
    expect(findUnsupportedWorkshopNumbers("二万一千円と二十一分で百十六件を確認した。", ["２．１万円、21分、115件"]))
      .toEqual(["百十六件"]);
    mock.draft = {
      ...sampleTemplate,
      sections: { ...sampleTemplate.sections, ア: {
        ...sampleTemplate.sections.ア,
        paragraphs: sampleTemplate.sections.ア.paragraphs.map((paragraph) => ({
          ...paragraph, text: paragraph.text.replace("千二百万円", "千四百万円"),
        })),
      } },
    };
    await expect(generateWorkshopDraft("pm", shortSampleInterview)).rejects.toThrow("unsupported_numbers");
  });

  it("同じ時間でも順序と測定対象を照合し、根拠のある合計・差額と普通の日本語を通す", () => {
    const answers = ["例外の判定は40分→12分。残る2拠点には各25分。"];
    expect(findUnsupportedWorkshopNumbers("判定は四十分から十二分になった。余裕は十分だった。二拠点で計五十分を確保した。四十分から十二分を引くと二十八分である。", answers)).toEqual([]);
    expect(findUnsupportedWorkshopNumbers("判定は十二分から四十分になった。受入確認は40分→12分になった。残り二拠点で計六十分を確保した。", answers))
      .toEqual(["十二分→四十分", "40分→12分", "六十分"]);
    expect(findUnsupportedWorkshopNumbers("十二分と二十五分で計三十七分を確保した。", ["判定に12分", "受入確認に25分"])).toEqual(["三十七分"]);
  });

  it("聞き取りにない関係者を本文の実績に加えない", async () => {
    mock.draft = { ...sampleTemplate, sections: { ...sampleTemplate.sections, イ: {
      ...sampleTemplate.sections.イ,
      paragraphs: sampleTemplate.sections.イ.paragraphs.map((paragraph) => ({
        ...paragraph, text: paragraph.text.replace("物流責任者と合意した", "法務と合意した"),
      })),
    } } };
    await expect(generateWorkshopDraft("pm", shortSampleInterview)).rejects.toThrow("unsupported_actors");
  });

  it("冒頭の抜粋は原稿にあり、年度別の完成例は差し替えた文だけを示す", () => {
    expect(adjustedSamples["pm-2023-q1"]!.sections.ウ.body).toContain(sampleExcerpt.sentence);
    expect(adjustedSamples["pm-2023-q1"]!.sections.イ.body).toContain(planningExcerpt.sentence);
    expect(sampleExcerpt.answers.every((excerpt) => shortSampleInterview.some(({ answer }) => answer.includes(excerpt)))).toBe(true);
    expect(planningExcerpt.answers.every((excerpt) => shortSampleInterview.some(({ answer }) => answer.includes(excerpt)))).toBe(true);
    for (const question of WORKSHOP_QUESTIONS.pm) {
      const version = adjustedSamples[question.id]!;
      const expectedChanges = { 2025: 2, 2024: 49, 2023: 9 };
      const changes = SECTION_KEYS.flatMap((key, i) => {
        const { body, paragraphs } = version.sections[key];
        const original = sampleTemplate.sections[key].body;
        const count = countEssayCharacters(body);
        expect(count).toBeGreaterThanOrEqual(question.bounds[i][0]);
        expect(count).toBeLessThanOrEqual(question.bounds[i][1]);
        expect(count).toBe(paragraphs.reduce((total, { text }) => total + countEssayCharacters(text), 0));
        return paragraphs.flatMap(({ text }) => sampleSentenceChanges(text, original));
      });
      expect(changes.filter(({ changed }) => changed)).toHaveLength(expectedChanges[question.year]);
      expect(changes.filter(({ changed }) => !changed).length).toBeGreaterThanOrEqual(6);
    }
    expect(sampleAdjusted.sections.ア.body).toBe(sampleTemplate.sections.ア.body);
  });

  it("短い回答だけで全見本の数値がそろい、案件概要は全年度で共通", () => {
    expect(shortSampleInterview.every(({ answer }) => countEssayCharacters(answer) <= 60)).toBe(true);
    expect(shortCostFollowUp).toHaveLength(3);
    expect(shortCostFollowUp.every(({ answer }) => countEssayCharacters(answer) <= 65)).toBe(true);
    for (const [id, draft] of Object.entries(adjustedSamples)) {
      expect(draft?.sections.ア.paragraphs[0]).toEqual(sampleTemplate.sections.ア.paragraphs[0]);
      const facts = id === "pm-2024-q1" ? [...shortSampleInterview, ...shortCostFollowUp] : shortSampleInterview;
      const body = SECTION_KEYS.map((key) => draft?.sections[key].body).join("\n");
      expect(findUnsupportedWorkshopNumbers(body, facts.map(({ answer }) => answer))).toEqual([]);
    }
    expect(countEssayCharacters(adjustedSamples["pm-2024-q1"]!.sections.イ.body)).toBeGreaterThanOrEqual(1000);
    expect(countEssayCharacters(adjustedSamples["pm-2024-q1"]!.sections.ウ.body)).toBeGreaterThanOrEqual(800);
  });

  it("完走していない応答は費用を記録して破棄する", async () => {
    mock.finishReason = "MAX_TOKENS";
    await expect(generateWorkshopDraft("pm", sampleInterview)).rejects.toThrow("incomplete_response:MAX_TOKENS");
    expect(mock.record).toHaveBeenCalledOnce();
  });

  it("STOPでも字数不足の応答は完成稿として返さない", async () => {
    mock.draft = { ...sampleTemplate, sections: { ...sampleTemplate.sections, ア: { title: "題材", paragraphs: [{ heading: "概要", text: "本文" }] } } };
    await expect(generateWorkshopDraft("pm", sampleInterview)).rejects.toThrow("characters_out_of_range:");
  });

  it("区分の違う設問と費用上限到達時はプロバイダを呼ばない", async () => {
    await expect(generateWorkshopDraft("pm", sampleInterview, { variant: { questionId: "au-2025-q1", template: sampleTemplate } })).rejects.toThrow("question_not_found");
    mock.reserve.mockResolvedValue({ allowed: false, reason: "cost_capped" });
    await expect(generateWorkshopDraft("pm", sampleInterview)).rejects.toThrow("cost_capped");
    expect(mock.calls).toBe(0);
  });

  it("題意を確認していない4区分の12題は費用を確保する前に止める", async () => {
    for (const exam of ["au", "sa", "sm", "st"] as const) {
      await expect(generateWorkshopInterview(exam, shortSampleInterview[0].answer)).rejects.toThrow("unsupported_workshop_exam");
      for (const { id } of WORKSHOP_QUESTIONS[exam]) {
        await expect(generateWorkshopDraft(exam, shortSampleInterview, { variant: { questionId: id, template: sampleTemplate } }))
          .rejects.toThrow("unsupported_workshop_exam");
      }
    }
    expect(mock.calls).toBe(0);
    expect(mock.reserve).not.toHaveBeenCalled();
  });

  it("旧採点の公開APIからは処理できない", async () => {
    const response = POST();
    expect(response.status).toBe(410);
    expect(await response.json()).toEqual({ error: "essay_grading_retired" });
    expect(mock.calls).toBe(0);
  });
});
