import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "IPA Quiz — AIネイティブ過去問学習";
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
            IPA Quiz
          </div>
          <div
            style={{
              background: "#fbbf24",
              borderRadius: "999px",
              padding: "6px 14px",
              color: "#fff",
              fontSize: "18px",
              fontWeight: 700,
            }}
          >
            β公開中・全機能無料
          </div>
        </div>
        <div
          style={{
            color: "#ffffff",
            fontSize: "60px",
            fontWeight: 800,
            lineHeight: 1.2,
            marginBottom: "28px",
            letterSpacing: "-1px",
          }}
        >
          IPA 過去問を、
          <br />
          AI と一緒に。
        </div>
        <div
          style={{
            color: "#bae6fd",
            fontSize: "26px",
            fontWeight: 400,
            lineHeight: 1.5,
          }}
        >
          解説ゼロ遷移 × AI コパイロット常駐 × 全試験対応
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
          kakomon-ai.jp
        </div>
      </div>
    ),
    { ...size },
  );
}
