import { ImageResponse } from "next/og";

export const alt = "IPA 過去問 AI 連続学習達成";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const ALLOWED_DAYS = new Set(["7", "30", "100"]);

export default function StreakOgImage({ params }: { params: { days: string } }) {
  const safeDays = ALLOWED_DAYS.has(params.days) ? params.days : "7";
  const heroLabel =
    safeDays === "100" ? "100日連続学習達成🔥" :
    safeDays === "30" ? "30日連続学習達成🔥" :
    "1週間連続学習達成🔥";

  const subLabel =
    safeDays === "100" ? "学習が完全に習慣化" :
    safeDays === "30" ? "1ヶ月の継続は本物" :
    "学習リズムが見えてきた";

  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #7c2d12 0%, #ea580c 50%, #f59e0b 100%)",
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
            }}
          >
            過去問AI
          </div>
          <div
            style={{
              background: "#fff",
              borderRadius: "999px",
              padding: "6px 16px",
              color: "#9a3412",
              fontSize: "18px",
              fontWeight: 800,
            }}
          >
            {safeDays}日達成
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            color: "#ffffff",
            fontSize: "78px",
            fontWeight: 900,
            lineHeight: 1.1,
            marginBottom: "28px",
            letterSpacing: "-2px",
          }}
        >
          {heroLabel}
        </div>
        <div
          style={{
            color: "#fff7ed",
            fontSize: "30px",
            fontWeight: 600,
            lineHeight: 1.4,
          }}
        >
          {subLabel}
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "56px",
            right: "80px",
            color: "rgba(255,255,255,0.55)",
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
