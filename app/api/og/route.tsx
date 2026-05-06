import { ImageResponse } from "next/og";

export const runtime = "edge";

const SIZE = { width: 1200, height: 630 };

interface TypeStyle {
  gradient: string;
  emoji: string;
  subtitle: string;
}

const TYPE_META: Record<string, TypeStyle> = {
  home: {
    gradient: "linear-gradient(135deg, #0c4a6e 0%, #0284c7 55%, #0369a1 100%)",
    emoji: "🤖",
    subtitle: "AIネイティブ過去問学習",
  },
  exam: {
    gradient: "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #06b6d4 100%)",
    emoji: "📋",
    subtitle: "試験区分トップ",
  },
  question: {
    gradient: "linear-gradient(135deg, #0c4a6e 0%, #0369a1 50%, #0284c7 100%)",
    emoji: "❓",
    subtitle: "過去問AI 解説",
  },
  blog: {
    gradient: "linear-gradient(135deg, #312e81 0%, #6366f1 50%, #ec4899 100%)",
    emoji: "📰",
    subtitle: "ブログ",
  },
  books: {
    gradient: "linear-gradient(135deg, #78350f 0%, #d97706 55%, #f59e0b 100%)",
    emoji: "📚",
    subtitle: "おすすめ書籍",
  },
  streak: {
    gradient: "linear-gradient(135deg, #fb923c 0%, #f97316 45%, #e11d48 100%)",
    emoji: "🔥",
    subtitle: "連続学習中",
  },
  badge: {
    gradient: "linear-gradient(135deg, #7c3aed 0%, #ec4899 50%, #f59e0b 100%)",
    emoji: "🏆",
    subtitle: "バッジ獲得",
  },
  session: {
    gradient: "linear-gradient(135deg, #0ea5e9 0%, #6366f1 50%, #8b5cf6 100%)",
    emoji: "📚",
    subtitle: "セッション完了",
  },
  topic: {
    gradient: "linear-gradient(135deg, #0e7490 0%, #14b8a6 50%, #84cc16 100%)",
    emoji: "🏷️",
    subtitle: "トピック別過去問",
  },
  glossary: {
    gradient: "linear-gradient(135deg, #4338ca 0%, #6366f1 50%, #06b6d4 100%)",
    emoji: "📖",
    subtitle: "IT 用語集",
  },
  keyword: {
    gradient: "linear-gradient(135deg, #7c2d12 0%, #c2410c 50%, #f59e0b 100%)",
    emoji: "🔍",
    subtitle: "学習トピック特集",
  },
  faq: {
    gradient: "linear-gradient(135deg, #0c4a6e 0%, #0369a1 50%, #6366f1 100%)",
    emoji: "💡",
    subtitle: "よくある質問",
  },
  default: {
    gradient: "linear-gradient(135deg, #0c4a6e 0%, #0284c7 55%, #0369a1 100%)",
    emoji: "✨",
    subtitle: "過去問AI",
  },
};

function safeText(s: string | null, fallback: string, max = 60): string {
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

  const title = safeText(url.searchParams.get("title"), "過去問AI", 80);
  const subtitle = safeText(url.searchParams.get("subtitle"), meta.subtitle, 60);
  const body = safeText(url.searchParams.get("body"), "", 140);
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
  } else if (type === "exam") {
    if (count > 0) stats.push({ label: "収録問題", value: `${count.toLocaleString("en-US")}問` });
  }

  const isContent =
    type === "blog" ||
    type === "exam" ||
    type === "question" ||
    type === "books" ||
    type === "topic" ||
    type === "glossary" ||
    type === "keyword" ||
    type === "faq";

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
            {subtitle}
          </div>
        </div>

        {isContent ? (
          <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <div style={{ fontSize: "120px", lineHeight: 1, marginBottom: "20px" }}>
              {meta.emoji}
            </div>
            <div
              style={{
                fontSize: "60px",
                fontWeight: 800,
                lineHeight: 1.15,
                letterSpacing: "-1px",
                marginBottom: "16px",
              }}
            >
              {title}
            </div>
            {body && (
              <div
                style={{
                  fontSize: "26px",
                  fontWeight: 400,
                  lineHeight: 1.5,
                  maxWidth: "1040px",
                  color: "rgba(255,255,255,0.92)",
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {body}
              </div>
            )}
            {stats.length > 0 && (
              <div style={{ display: "flex", gap: "20px", marginTop: "24px" }}>
                {stats.map((s, i) => (
                  <div
                    key={i}
                    style={{
                      background: "rgba(0,0,0,0.30)",
                      borderRadius: "20px",
                      padding: "14px 22px",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "15px",
                        fontWeight: 500,
                        opacity: 0.85,
                      }}
                    >
                      {s.label}
                    </div>
                    <div style={{ fontSize: "36px", fontWeight: 800 }}>
                      {s.value}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
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
        )}

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
          <div>kakomon-ai.jp</div>
        </div>
      </div>
    ),
    { ...SIZE },
  );
}
