import { ImageResponse } from "next/og";

export const runtime = "edge";

const SIZE = { width: 1200, height: 630 };

const TYPE_META: Record<
  string,
  { gradient: string; emoji: string; subtitle: string }
> = {
  streak: {
    gradient:
      "linear-gradient(135deg, #fb923c 0%, #f97316 45%, #e11d48 100%)",
    emoji: "🔥",
    subtitle: "連続学習中",
  },
  badge: {
    gradient:
      "linear-gradient(135deg, #7c3aed 0%, #ec4899 50%, #f59e0b 100%)",
    emoji: "🏆",
    subtitle: "バッジ獲得",
  },
  session: {
    gradient:
      "linear-gradient(135deg, #0ea5e9 0%, #6366f1 50%, #8b5cf6 100%)",
    emoji: "📚",
    subtitle: "セッション完了",
  },
  default: {
    gradient:
      "linear-gradient(135deg, #0c4a6e 0%, #0284c7 55%, #0369a1 100%)",
    emoji: "✨",
    subtitle: "過去問AI",
  },
};

function safeText(s: string | null, fallback: string, max = 40): string {
  if (!s) return fallback;
  return s.slice(0, max);
}

function safeNumber(s: string | null, fallback = 0): number {
  if (!s) return fallback;
  const n = Number(s);
  return Number.isFinite(n) ? n : fallback;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const type = url.searchParams.get("type") ?? "default";
  const meta = TYPE_META[type] ?? TYPE_META.default;

  const title = safeText(url.searchParams.get("title"), "過去問AI");
  const streak = safeNumber(url.searchParams.get("streak"), 0);
  const accuracy = safeNumber(url.searchParams.get("accuracy"), 0);
  const count = safeNumber(url.searchParams.get("count"), 0);
  const badgeName = safeText(url.searchParams.get("badge"), "", 20);

  const stats: { label: string; value: string }[] = [];
  if (type === "streak") {
    stats.push({ label: "連続日数", value: `${streak}日` });
    if (count > 0) stats.push({ label: "解いた問題", value: count.toLocaleString("en-US") });
    if (accuracy > 0) stats.push({ label: "正答率", value: `${accuracy}%` });
  } else if (type === "session") {
    stats.push({ label: "解いた問題", value: count.toLocaleString("en-US") });
    stats.push({ label: "正答率", value: `${accuracy}%` });
  } else if (type === "badge") {
    stats.push({ label: "バッジ", value: badgeName || `${streak}日` });
    if (streak > 0) stats.push({ label: "達成日数", value: `${streak}日` });
  }

  return new ImageResponse(
    (
      <div
        style={{
          background: meta.gradient,
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "72px 80px",
          fontFamily: "sans-serif",
          color: "#fff",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "30px",
          }}
        >
          <div
            style={{
              background: "rgba(255,255,255,0.22)",
              borderRadius: "16px",
              padding: "10px 20px",
              fontSize: "26px",
              fontWeight: 800,
              letterSpacing: "-0.5px",
            }}
          >
            過去問AI
          </div>
          <div
            style={{
              background: "rgba(0,0,0,0.25)",
              borderRadius: "999px",
              padding: "6px 14px",
              fontSize: "16px",
              fontWeight: 600,
            }}
          >
            {meta.subtitle}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "32px",
            flex: 1,
          }}
        >
          <div style={{ fontSize: "180px", lineHeight: 1 }}>{meta.emoji}</div>
          <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <div
              style={{
                fontSize: "62px",
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: "-1px",
                marginBottom: "20px",
              }}
            >
              {title}
            </div>
            <div style={{ display: "flex", gap: "20px" }}>
              {stats.map((s, i) => (
                <div
                  key={i}
                  style={{
                    background: "rgba(0,0,0,0.32)",
                    borderRadius: "20px",
                    padding: "16px 24px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      fontSize: "16px",
                      fontWeight: 500,
                      opacity: 0.85,
                    }}
                  >
                    {s.label}
                  </div>
                  <div style={{ fontSize: "44px", fontWeight: 800 }}>
                    {s.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginTop: "30px",
            color: "rgba(255,255,255,0.85)",
            fontSize: "20px",
          }}
        >
          <div>解説ゼロ遷移 × AI コパイロット常駐</div>
          <div>ipa-quiz-site.vercel.app</div>
        </div>
      </div>
    ),
    { ...SIZE },
  );
}
