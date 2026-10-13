import { Children, isValidElement, type ReactElement, type ReactNode } from "react";
import { describe, expect, it } from "vitest";

import ExamTopPage, { generateMetadata } from "@/app/[exam]/page";
import { getQuestionsByExamStrict } from "@/lib/seo/exam-meta";
import { FP3_PRACTICAL_EDITIONS, getPracticalEdition } from "@/lib/fp3/practical";

interface InspectProps {
  children?: ReactNode;
  data?: { "@graph"?: Array<Record<string, unknown>> };
  exam?: string;
  totalQuestions?: number;
}

function elements(node: ReactNode): ReactElement<InspectProps>[] {
  return Children.toArray(node).flatMap((child) => isValidElement<InspectProps>(child)
    ? [child, ...elements(child.props.children)]
    : []);
}

function text(node: ReactNode): string {
  return Children.toArray(node).map((child) => isValidElement<InspectProps>(child)
    ? text(child.props.children)
    : String(child)).join("");
}

describe("FP3 hub coverage", () => {
  const academic = getQuestionsByExamStrict("fp3").length;
  const practical = FP3_PRACTICAL_EDITIONS.reduce(
    (count, edition) => count + (getPracticalEdition(edition)?.questions.length ?? 0), 0,
  );
  const total = academic + practical;

  it("uses the same academic, practical, and total counts in metadata and OG", async () => {
    const metadata = await generateMetadata({ params: Promise.resolve({ exam: "fp3" }) });
    expect(metadata.description).toContain(`学科${academic}問・実技${practical}問、計${total}問`);
    expect(metadata.openGraph?.description).toBe(metadata.description);
    const images = metadata.openGraph?.images as Array<{ url: string }>;
    expect(new URL(images[0]!.url).searchParams.get("count")).toBe(String(total));
  });

  it("shows the total with its breakdown while preserving the academic-only progress denominator", async () => {
    const page = await ExamTopPage({ params: Promise.resolve({ exam: "fp3" }) });
    const nodes = elements(page);
    const header = nodes.find((node) => node.type === "header");
    expect(text(header)).toContain(`収録 ${total} 問`);
    expect(text(header)).toContain(`学科 ${academic} 問・実技 ${practical} 問`);
    expect(text(page)).toContain("学科の学習進捗（実技は含みません）");
    expect(nodes.find((node) => node.props.exam === "fp3" && node.props.totalQuestions !== undefined)?.props.totalQuestions).toBe(academic);
    const graph = nodes.find((node) => node.props.data?.["@graph"])?.props.data?.["@graph"];
    for (const type of ["Course", "CollectionPage"]) {
      expect(graph?.find((entry) => entry["@type"] === type)?.description)
        .toContain(`学科${academic}問・実技${practical}問、計${total}問`);
    }
  });
});
