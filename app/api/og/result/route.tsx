import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

// クエリは外部（SNS スクレイパ / 任意の URL）から来るため、空文字や非数値でも
// "NaN%" を描画しないよう /api/og と同じく安全に数値化する。`?? "0"` は null しか
// 捕捉できず `?accuracy=`（空）や `?accuracy=abc` で NaN が漏れる半端なガードだった。
function safeNumber(s: string | null, fallback = 0): number {
  if (!s) return fallback;
  const n = Number(s);
  return Number.isFinite(n) ? n : fallback;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const pct = safeNumber(searchParams.get("accuracy"), 0);
  const total = safeNumber(searchParams.get("total"), 0);
  const correct = safeNumber(searchParams.get("correct"), 0);
  const exam = searchParams.get("exam") ?? "IPA Quiz";

  const barColor = pct >= 80 ? "#10b981" : pct >= 60 ? "#f59e0b" : "#ef4444";

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
        <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "36px" }}>
          <div
            style={{
              background: "rgba(255,255,255,0.2)",
              borderRadius: "16px",
              padding: "10px 20px",
              color: "#fff",
              fontSize: "24px",
              fontWeight: 800,
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
              fontSize: "16px",
              fontWeight: 700,
            }}
          >
            {exam}
          </div>
        </div>

        <div
          style={{
            color: "#ffffff",
            fontSize: "42px",
            fontWeight: 800,
            lineHeight: 1.1,
            marginBottom: "16px",
          }}
        >
          今日の成績
        </div>

        <div style={{ display: "flex", alignItems: "baseline", gap: "12px", marginBottom: "28px" }}>
          <div style={{ color: barColor, fontSize: "100px", fontWeight: 900, lineHeight: 1 }}>
            {`${pct}%`}
          </div>
          <div style={{ color: "#bae6fd", fontSize: "28px", fontWeight: 400 }}>正答率</div>
        </div>

        {/* satori は複数子ノードを持つ非 flex div を拒否するため単一文字列にする */}
        <div style={{ color: "#e0f2fe", fontSize: "24px", marginBottom: "32px" }}>
          {`${correct} 問正解 / ${total} 問中`}
        </div>

        <div
          style={{
            background: "rgba(255,255,255,0.15)",
            borderRadius: "12px",
            padding: "14px 20px",
            color: "#fff",
            fontSize: "20px",
          }}
        >
          AIコパイロット付き過去問学習 — kakomon-ai.jp
        </div>

        <div
          style={{
            position: "absolute",
            bottom: "48px",
            right: "80px",
            color: "rgba(255,255,255,0.4)",
            fontSize: "16px",
          }}
        >
          #過去問AI #IPA試験
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      // 結果シェア画像もクエリ文字列（accuracy/total/correct/exam）で内容が
      // 一意に定まる決定的レスポンス。既定の max-age=0 だと SNS シェア時に
      // 毎回再レンダーされ低速・高コストなため、長期 immutable キャッシュを明示。
      headers: {
        "Cache-Control": "public, immutable, no-transform, max-age=31536000",
      },
    },
  );
}
