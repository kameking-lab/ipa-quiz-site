import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0ea5e9 0%, #0369a1 100%)",
          borderRadius: 7,
          color: "#ffffff",
          fontWeight: 900,
          fontSize: 14,
          letterSpacing: -0.5,
          fontFamily: "sans-serif",
        }}
      >
        過
      </div>
    ),
    { ...size },
  );
}
