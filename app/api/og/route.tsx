import { readFile } from "node:fs/promises";
import { basename, join } from "node:path";
import { ImageResponse } from "next/og";
import { CARD_LABELS, cardQualification, parseStudyCard } from "@/lib/sharing/card";
import { qualificationStudyArt } from "@/lib/home/study-room";

export const runtime = "nodejs";

const SIZE = { width: 1200, height: 630 };

interface TypeStyle {
  gradient: string;
  emoji: string;
  subtitle: string;
}

let japaneseFont: Promise<ArrayBuffer> | undefined;

function loadJapaneseFont(): Promise<ArrayBuffer> {
  japaneseFont ??= readFile(join(process.cwd(), "public/fonts/noto-sans-jp-700.woff"))
    .then((font) => new Uint8Array(font).buffer)
    .catch((error: unknown) => {
      japaneseFont = undefined;
      throw error;
    });
  return japaneseFont;
}

const TYPE_META: Record<string, TypeStyle> = {
  home: {
    gradient: "linear-gradient(135deg, #0c4a6e 0%, #0284c7 55%, #0369a1 100%)",
    emoji: "📚",
    subtitle: "資格の過去問演習",
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
  feature: {
    gradient: "linear-gradient(135deg, #065f46 0%, #059669 50%, #34d399 100%)",
    emoji: "⚡",
    subtitle: "機能紹介",
  },
  faq: {
    gradient: "linear-gradient(135deg, #0c4a6e 0%, #0369a1 50%, #6366f1 100%)",
    emoji: "💡",
    subtitle: "よくある質問",
  },
  "mock-exam": {
    gradient: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #1d4ed8 100%)",
    emoji: "📝",
    subtitle: "模試モード",
  },
  essay: {
    gradient: "linear-gradient(135deg, #3b0764 0%, #7c3aed 50%, #ec4899 100%)",
    emoji: "✍️",
    subtitle: "業種別合格答案",
  },
  default: {
    gradient: "linear-gradient(135deg, #0c4a6e 0%, #0284c7 55%, #0369a1 100%)",
    emoji: "📚",
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
  const params = new URL(request.url).searchParams;
  const isStudyCard = params.get("type") === "study-card";
  const exam = params.get("exam") ?? "";
  const card = isStudyCard ? parseStudyCard(params) : null;
  const qualification = isStudyCard ? cardQualification(exam) : null;
  if (isStudyCard && (!card || !qualification || params.getAll("exam").length !== 1 || params.getAll("type").length !== 1)) {
    return new Response("Invalid study card", { status: 400 });
  }
  try {
    const image = card && qualification ? await renderStudyCard(exam, qualification.name, card) : await renderImage(request);
    // ImageResponse streams its render. Read it here so a font or renderer
    // failure can still return the default image before headers are sent.
    return new Response(await image.arrayBuffer(), { headers: image.headers });
  } catch (error) {
    console.error("[og] image generation failed", error);
    const fallback = await readFile(join(process.cwd(), "app/api/og/default.png"));
    return new Response(new Uint8Array(fallback), {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, no-transform, max-age=300, s-maxage=3600",
      },
    });
  }
}

async function renderStudyCard(exam: string, name: string, card: NonNullable<ReturnType<typeof parseStudyCard>>) {
  const artFile = basename(qualificationStudyArt(exam));
  const [font, art, { default: sharp }] = await Promise.all([
    loadJapaneseFont(),
    readFile(join(process.cwd(), "public/images/home/study-room-mascots", artFile)),
    import("sharp"),
  ]);
  // The OG renderer recognizes WebP dimensions but does not paint WebP layers into PNG.
  const png = await sharp(art).resize({ width: 335, height: 410, fit: "inside" }).png().toBuffer();
  return new ImageResponse(
    <div style={{ ...SIZE, display: "flex", alignItems: "center", padding: "56px 68px",
      fontFamily: "Noto Sans JP", color: "#172f3f", background: "#f8f4e8" }}>
      <div style={{ display: "flex", flexDirection: "column", width: "720px", gap: "24px" }}>
        <div style={{ display: "flex", fontSize: "24px", color: "#2a645e" }}>過去問AI</div>
        <div style={{ display: "flex", fontSize: "38px", lineHeight: 1.23 }}>{name}</div>
        <div style={{ display: "flex", fontSize: "56px", lineHeight: 1.2 }}>{CARD_LABELS[card.kind]}</div>
        <div style={{ display: "flex", gap: "16px" }}>
          {[["正解済み", `${card.mastered.toLocaleString("ja-JP")} / ${card.total.toLocaleString("ja-JP")}問`],
            ["連続学習", `${card.streak.toLocaleString("ja-JP")}日`]].map(([label, value]) => (
              <div key={label} style={{ display: "flex", flexDirection: "column", gap: "6px",
                padding: "14px 22px", borderRadius: "19px", background: "#e3eee7" }}>
                <div style={{ display: "flex", fontSize: "20px", color: "#2a645e" }}>{label}</div>
                <div style={{ display: "flex", fontSize: "34px" }}>{value}</div>
              </div>
            ))}
        </div>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse renders an embedded asset */}
      <img alt="" src={`data:image/png;base64,${png.toString("base64")}`} width={335} height={410}
        style={{ objectFit: "contain", flexShrink: 0, marginLeft: "12px" }} />
    </div>,
    { ...SIZE, fonts: [{ name: "Noto Sans JP", data: font, weight: 700, style: "normal" }],
      headers: { "Cache-Control": "public, no-transform, max-age=86400, s-maxage=604800" } },
  );
}

async function renderImage(request: Request) {
  const url = new URL(request.url);
  const type = url.searchParams.get("type") ?? "default";
  const meta = Object.hasOwn(TYPE_META, type) ? TYPE_META[type] : TYPE_META.default;

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
    type === "feature" ||
    type === "faq" ||
    type === "mock-exam" ||
    type === "essay";

  const font = await loadJapaneseFont();

  return new ImageResponse(
    (
      <div
        style={{
          background: meta.gradient,
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "64px 80px",
          fontFamily: "'Noto Sans JP', sans-serif",
          color: "#fff",
        }}
      >
        {/* Header: brand logo + type chip + free badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            marginBottom: "28px",
          }}
        >
          <div
            style={{
              background: "rgba(255,255,255,0.25)",
              borderRadius: "14px",
              padding: "10px 22px",
              fontSize: "28px",
              fontWeight: 800,
              letterSpacing: "-0.5px",
            }}
          >
            過去問AI
          </div>
          <div
            style={{
              background: "rgba(0,0,0,0.28)",
              borderRadius: "999px",
              padding: "6px 16px",
              fontSize: "17px",
              fontWeight: 600,
            }}
          >
            {subtitle}
          </div>
          <div
            style={{
              background: "rgba(255,255,255,0.18)",
              borderRadius: "999px",
              padding: "6px 16px",
              fontSize: "17px",
              fontWeight: 700,
              marginLeft: "4px",
            }}
          >
            過去問と解説で学ぶ
          </div>
        </div>

        {isContent ? (
          <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <div style={{ fontSize: "88px", lineHeight: 1, marginBottom: "16px" }}>
              {meta.emoji}
            </div>
            <div
              style={{
                fontSize: "62px",
                fontWeight: 800,
                lineHeight: 1.15,
                letterSpacing: "-1px",
                marginBottom: "18px",
              }}
            >
              {title}
            </div>
            {body && (
              <div
                style={{
                  fontSize: "28px",
                  fontWeight: 400,
                  lineHeight: 1.55,
                  maxWidth: "1040px",
                  color: "rgba(255,255,255,0.95)",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {body}
              </div>
            )}
            {stats.length > 0 && (
              <div style={{ display: "flex", gap: "20px", marginTop: "22px" }}>
                {stats.map((s, i) => (
                  <div
                    key={i}
                    style={{
                      background: "rgba(0,0,0,0.30)",
                      borderRadius: "20px",
                      padding: "14px 24px",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "16px",
                        fontWeight: 500,
                        opacity: 0.88,
                      }}
                    >
                      {s.label}
                    </div>
                    <div style={{ fontSize: "38px", fontWeight: 800 }}>
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
              gap: "36px",
              flex: 1,
            }}
          >
            <div style={{ fontSize: "170px", lineHeight: 1 }}>{meta.emoji}</div>
            <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
              <div
                style={{
                  fontSize: "64px",
                  fontWeight: 800,
                  lineHeight: 1.1,
                  letterSpacing: "-1px",
                  marginBottom: "22px",
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
                        fontSize: "17px",
                        fontWeight: 500,
                        opacity: 0.88,
                      }}
                    >
                      {s.label}
                    </div>
                    <div style={{ fontSize: "46px", fontWeight: 800 }}>
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
            marginTop: "28px",
            color: "rgba(255,255,255,0.88)",
            fontSize: "21px",
          }}
        >
          <div>IPA 全 13 試験区分 × AI コパイロット常駐 × 登録不要</div>
          <div style={{ fontWeight: 600 }}>kakomon-ai.jp</div>
        </div>
      </div>
    ),
    {
      ...SIZE,
      fonts: [{ name: "Noto Sans JP", data: font, weight: 700, style: "normal" }],
      // OG 画像はクエリ文字列で内容が一意に定まる決定的レスポンス（問題数や
      // streak 等の動的値も URL に含まれるため別キャッシュキーになる）。
      // 既定は max-age=0, must-revalidate で毎回フォント取得＋satori 再レンダー
      // していたため、SNS スクレイパ／Google 画像取得のたびに高コスト・低速で
      // スクレイパのタイムアウト要因にもなっていた。Next の file-based
      // opengraph-image と同じ長期 immutable キャッシュを明示し CDN/ブラウザに
      // キャッシュさせる。
      headers: {
        "Cache-Control": "public, immutable, no-transform, max-age=31536000",
      },
    },
  );
}
