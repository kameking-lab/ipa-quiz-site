import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0ea5e9 0%, #0369a1 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
          gap: 4,
        }}
      >
        <div
          style={{
            fontSize: 52,
            fontWeight: 900,
            letterSpacing: -2,
            lineHeight: 1,
          }}
        >
          過去問
        </div>
        <div
          style={{
            fontSize: 44,
            fontWeight: 900,
            letterSpacing: -1,
            color: "#fde68a",
            lineHeight: 1,
          }}
        >
          AI
        </div>
      </div>
    ),
    { ...size },
  );
}
