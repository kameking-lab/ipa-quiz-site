import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "IPA Quiz - AI-Native Past Exam Practice";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0c4a6e 0%, #0369a1 50%, #0284c7 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            background: "rgba(255,255,255,0.15)",
            borderRadius: "12px",
            padding: "8px 16px",
            color: "#bae6fd",
            fontSize: "20px",
            fontWeight: 600,
            marginBottom: "24px",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          Beta
        </div>
        <div
          style={{
            color: "#ffffff",
            fontSize: "72px",
            fontWeight: 800,
            lineHeight: 1.1,
            marginBottom: "24px",
          }}
        >
          IPA Quiz
        </div>
        <div
          style={{
            color: "#bae6fd",
            fontSize: "32px",
            fontWeight: 400,
            lineHeight: 1.4,
            maxWidth: "800px",
          }}
        >
          AI-Native Past Exam Practice
        </div>
        <div
          style={{
            color: "#7dd3fc",
            fontSize: "24px",
            fontWeight: 400,
            marginTop: "16px",
          }}
        >
          400+ AP Questions  ·  Zero-Transition UI  ·  AI Copilot
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "48px",
            right: "80px",
            color: "rgba(255,255,255,0.4)",
            fontSize: "18px",
          }}
        >
          ipa-quiz-site.vercel.app
        </div>
      </div>
    ),
    { ...size },
  );
}
