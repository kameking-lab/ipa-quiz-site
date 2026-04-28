import { ImageResponse } from "next/og";

export const alt = "過去問AI — IPA 試験対策を、誰もが平等に。全機能無料";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0c4a6e 0%, #0284c7 55%, #0369a1 100%)",
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
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              background: "rgba(255,255,255,0.2)",
              borderRadius: "16px",
              padding: "10px 20px",
              color: "#fff",
              fontSize: "26px",
              fontWeight: 800,
              letterSpacing: "-0.5px",
            }}
          >
            過去問AI
          </div>
          <div
            style={{
              background: "#10b981",
              borderRadius: "999px",
              padding: "6px 14px",
              color: "#fff",
              fontSize: "18px",
              fontWeight: 700,
            }}
          >
            教育貢献プロジェクト・全機能無料
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            color: "#ffffff",
            fontSize: "60px",
            fontWeight: 800,
            lineHeight: 1.2,
            marginBottom: "28px",
            letterSpacing: "-1px",
          }}
        >
          <span>IPA 試験対策を、</span>
          <span>誰もが平等に。</span>
        </div>
        <div
          style={{
            color: "#bae6fd",
            fontSize: "26px",
            fontWeight: 400,
            lineHeight: 1.5,
          }}
        >
          全 13 試験区分 × AI コパイロット × 全機能無料
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "56px",
            right: "80px",
            color: "rgba(255,255,255,0.35)",
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
