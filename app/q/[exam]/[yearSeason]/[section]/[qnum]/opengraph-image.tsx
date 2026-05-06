import { ImageResponse } from "next/og";
import { ALL_QUESTIONS } from "@/data/questions";
import { examLabelAt } from "@/lib/exam-naming/history";
import { formatYearSeason } from "@/lib/utils";
import { findQuestionByRoute, type QuestionRouteParams } from "@/lib/seo/question-url";

export const alt = "IPA Quiz 過去問解説";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// 12,000+ 問 × ビルド時 OG 画像生成は V8 の call stack を超えるため、
// 親 page.tsx の generateStaticParams を空で上書きしてオンデマンド生成にする。
// edge runtime は generateStaticParams と併用不可のため node 既定に委ねる。
export const dynamicParams = true;
export async function generateStaticParams(): Promise<QuestionRouteParams[]> {
  return [];
}

export default async function OgImage({
  params,
}: {
  params: Promise<QuestionRouteParams>;
}) {
  const p = await params;
  const q = findQuestionByRoute(ALL_QUESTIONS, p);

  const heading = q
    ? `${formatYearSeason(q.year, q.season)} ${examLabelAt(q.exam, q.year, q.season)}`
    : "IPA Quiz";
  const subheading = q ? `問${q.qNumber} ${q.category}` : "過去問 AI 解説";
  const body = q
    ? q.question.replace(/\s+/g, " ").slice(0, 110) +
      (q.question.length > 110 ? "…" : "")
    : "AI コパイロット付き過去問学習";

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
          padding: "70px 80px",
          fontFamily: "sans-serif",
          color: "#ffffff",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "28px",
          }}
        >
          <div
            style={{
              background: "rgba(255,255,255,0.2)",
              borderRadius: "999px",
              padding: "4px 14px",
              color: "#e0f2fe",
              fontSize: "18px",
              fontWeight: 600,
              letterSpacing: "0.08em",
            }}
          >
            IPA Quiz
          </div>
          <div
            style={{
              color: "#bae6fd",
              fontSize: "18px",
            }}
          >
            過去問 AI 解説
          </div>
        </div>

        <div
          style={{
            color: "#bae6fd",
            fontSize: "28px",
            fontWeight: 500,
            marginBottom: "8px",
          }}
        >
          {heading}
        </div>
        <div
          style={{
            color: "#ffffff",
            fontSize: "56px",
            fontWeight: 800,
            lineHeight: 1.1,
            marginBottom: "28px",
          }}
        >
          {subheading}
        </div>

        <div
          style={{
            color: "#f1f5f9",
            fontSize: "26px",
            fontWeight: 400,
            lineHeight: 1.5,
            maxWidth: "1040px",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {body}
        </div>

        <div
          style={{
            position: "absolute",
            bottom: "40px",
            right: "80px",
            color: "rgba(255,255,255,0.55)",
            fontSize: "18px",
          }}
        >
          kakomon-ai.jp
        </div>
      </div>
    ),
    { ...size },
  );
}
