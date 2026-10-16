import type * as React from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { DashboardOverview } from "@/components/account/tabs/DashboardOverview";
import { DashboardProgress } from "@/components/account/tabs/DashboardProgress";
import { LS_KEYS } from "@/lib/storage/keys";

vi.mock("@/components/motivation/LearningHeatmap", () => ({ LearningHeatmap: () => null }));

vi.mock("recharts", () => {
  const Pass = ({ children }: { children?: React.ReactNode }) => <>{children}</>;
  return {
    ResponsiveContainer: Pass,
    Radar: Pass,
    RadarChart: Pass,
    PolarGrid: Pass,
    PolarAngleAxis: Pass,
    PolarRadiusAxis: Pass,
    Tooltip: Pass,
  };
});

beforeEach(() => {
  cleanup();
  localStorage.clear();
  vi.stubGlobal("fetch", vi.fn().mockResolvedValue(
    new Response(JSON.stringify({ meta: [{ id: "ipa-1", exam: "ap", category: "security" }, { id: "fp3-1", exam: "fp3", category: "finance" }] })),
  ));
});
afterEach(() => vi.unstubAllGlobals());

describe("DashboardProgress record scope", () => {
  it("counts classified IPA and non-IPA answers and reports unknown history", async () => {
    localStorage.setItem(LS_KEYS.history, JSON.stringify({
      entries: [
        { id: "ipa-1", selected: "A", correct: true, at: 1 },
        { id: "ipa-1", selected: "B", correct: false, at: 2 },
        { id: "fp3-1", selected: "A", correct: true, at: 3 },
        { id: "fp3-1", selected: "B", correct: true, at: 4 },
        { id: "unknown", selected: "C", correct: true, at: 5 },
      ],
    }));
    render(<DashboardProgress />);

    expect(await screen.findByText(/分類できない記録1件/)).toBeInTheDocument();
    expect(screen.getByText(/通常演習の保存履歴から/)).toBeInTheDocument();
    expect(screen.getByText("分類済み回答数").parentElement).toHaveTextContent("4");
    expect(screen.getByText("分類済みユニーク問題").parentElement).toHaveTextContent("2");
    expect(screen.getByText("分類済み記録の正答率").parentElement).toHaveTextContent("75%");
    expect(screen.getByRole("link", { name: /3級FP技能検定/ })).toHaveTextContent("2問 解答済");
  });
  it("shows a recorded non-IPA exam as the overview's top observed result", async () => {
    localStorage.setItem(LS_KEYS.history, JSON.stringify({
      entries: [
        { id: "ipa-1", selected: "A", correct: false, at: 1 },
        { id: "fp3-1", selected: "A", correct: true, at: 2 },
        { id: "fp3-1", selected: "A", correct: true, at: 3 },
        { id: "fp3-1", selected: "B", correct: false, at: 4 },
      ],
    }));
    render(<DashboardOverview />);
    expect(await screen.findByText("記録の正答率")).toBeInTheDocument();
    expect(screen.getByText("通常演習でこのブラウザに保存された回答履歴")).toBeInTheDocument();
    expect(screen.getByText(/3級FP技能検定 · 3問の記録/)).toBeInTheDocument();
    expect(screen.getByText("67%")).toBeInTheDocument();
  });

  it("shows unknown-only history without a fabricated accuracy", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ meta: [] })),
    ));
    localStorage.setItem(LS_KEYS.history, JSON.stringify({
      entries: [{ id: "missing", selected: "A", correct: true, at: 1 }],
    }));
    render(<DashboardProgress />);
    expect(await screen.findByText(/分類できない記録1件/)).toBeInTheDocument();
    expect(screen.getByText("分類済み記録の正答率").parentElement).toHaveTextContent("—");
    expect(screen.getByText("分類できる回答記録がありません。")).toBeInTheDocument();
  });

  it("labels failed metadata retrieval as incomplete", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(null, { status: 503 })));
    localStorage.setItem(LS_KEYS.history, JSON.stringify({
      entries: [{ id: "ipa-1", selected: "A", correct: true, at: 1 }],
    }));
    render(<DashboardProgress />);
    expect(await screen.findByText(/問題データの取得が未完了です/)).toBeInTheDocument();
    expect(screen.queryByText(/分類できない記録1件/)).not.toBeInTheDocument();
    expect(screen.getByText("分類済み記録の正答率").parentElement).toHaveTextContent("—");
    expect(screen.getByText("問題データの取得が完了しませんでした。再読み込みしてください。")).toBeInTheDocument();
  });

  it("does not say there is no history when overview metadata is unavailable", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(null, { status: 503 })));
    localStorage.setItem(LS_KEYS.history, JSON.stringify({
      entries: [{ id: "ipa-1", selected: "A", correct: true, at: 1 }],
    }));
    render(<DashboardOverview />);
    expect(await screen.findByText("問題データの取得が完了しませんでした")).toBeInTheDocument();
    expect(screen.queryByText("まだ回答記録がありません")).not.toBeInTheDocument();
    expect(screen.getByText("記録の正答率").closest("div.relative")).toHaveTextContent("—");
  });

});
