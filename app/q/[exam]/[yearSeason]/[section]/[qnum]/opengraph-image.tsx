import { ImageResponse } from "next/og";
import { ALL_QUESTIONS } from "@/data/questions";
import { examLabelAt } from "@/lib/exam-naming/history";
import { formatYearSeason } from "@/lib/utils";
import type { ChoiceKey } from "@/lib/questions/types";
import { findQuestionByRoute, type QuestionRouteParams } from "@/lib/seo/question-url";

export const alt = "過去問AI — IPA 試験 過去問 AI 解説";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// 12,000+ 問 × ビルド時 OG 画像生成は V8 の call stack を超えるため、
// 親 page.tsx の generateStaticParams を空で上書きしてオンデマンド生成にする。
// edge runtime は generateStaticParams と併用不可のため node 既定に委ねる。
export const dynamicParams = true;
export async function generateStaticParams(): Promise<QuestionRouteParams[]> {
  return [];
}

const SNIPPET_MAX = 50;

export default async function OgImage({
  params,
}: {
  params: Promise<QuestionRouteParams>;
}) {
  const p = await params;
  const q = findQuestionByRoute(ALL_QUESTIONS, p);

  const examLine = q
    ? `${examLabelAt(q.exam, q.year, q.season)}　${formatYearSeason(q.year, q.season)}`
    : "過去問AI";
  const qNumLabel = q ? `問${q.qNumber}` : "";
  const category = q?.category ?? "過去問 AI 解説";
  const rawQuestion = q?.question.replace(/\s+/g, " ") ?? "AI コパイロット付き過去問学習";
  const snippet =
    rawQuestion.length > SNIPPET_MAX
      ? `${rawQuestion.slice(0, SNIPPET_MAX)}…`
      : rawQuestion;
  const answerKey = q
    ? Array.isArray(q.answer)
      ? (q.answer[0] as ChoiceKey)
      : (q.answer as ChoiceKey | string)
    : null;

  return new ImageResponse(
    (
      <div
        style={{
          background:
            "linear-gradient(135deg, #0c4a6e 0%, #0369a1 50%, #0284c7 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "64px 80px",
          fontFamily: "sans-serif",
          color: "#ffffff",
          position: "relative",
        }}
      >
        {/* Logo + brand line */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              background: "#ffffff",
              borderRadius: "14px",
              padding: "8px 18px",
              color: "#0369a1",
              fontSize: "28px",
              fontWeight: 900,
              letterSpacing: "-0.5px",
            }}
          >
            過去問AI
          </div>
          <div
            style={{
              color: "#bae6fd",
              fontSize: "20px",
              fontWeight: 500,
            }}
          >
            IPA 試験 過去問 AI 解説
          </div>
        </div>

        {/* Exam + year/season */}
        <div
          style={{
            color: "#e0f2fe",
            fontSize: "30px",
            fontWeight: 600,
            marginBottom: "10px",
            letterSpacing: "-0.5px",
          }}
        >
          {examLine}
        </div>

        {/* Question number + category */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "24px",
          }}
        >
          {qNumLabel && (
            <div
              style={{
                background: "#fbbf24",
                color: "#0c4a6e",
                borderRadius: "10px",
                padding: "6px 18px",
                fontSize: "36px",
                fontWeight: 900,
                letterSpacing: "-0.5px",
              }}
            >
              {qNumLabel}
            </div>
          )}
          <div
            style={{
              color: "#ffffff",
              fontSize: "36px",
              fontWeight: 700,
            }}
          >
            {category}
          </div>
        </div>

        {/* Question snippet (~50 chars) */}
        <div
          style={{
            color: "#f1f5f9",
            fontSize: "32px",
            fontWeight: 400,
            lineHeight: 1.5,
            maxWidth: "1040px",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {snippet}
        </div>

        {/* Footer: answer hint + url */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            left: "80px",
            right: "80px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {answerKey ? (
            <div
              style={{
                color: "#bae6fd",
                fontSize: "22px",
                fontWeight: 600,
              }}
            >
              正解と解説を AI と一緒に
            </div>
          ) : (
            <div />
          )}
          <div
            style={{
              color: "rgba(255,255,255,0.55)",
              fontSize: "18px",
            }}
          >
            kakomon-ai.jp
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
