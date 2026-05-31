import { describe, expect, it } from "vitest";

import {
  ALL_EXAM_CODES,
  EXAM_CONFIGS,
  type ExamConfig,
  type SessionConfig,
} from "@/lib/exam-config";
import type { ExamCode } from "@/lib/questions/types";

// EXAM_CONFIGS は全試験区分の中核設定レジストリで、PDF 出典 URL(urlSlug)・学習プラン
// の想定問題数(expectedQuestions)・PDF クロール年範囲(yearRange)・分野別スケジュール
// (sessions.categories)を駆動する。型 Record<ExamCode,ExamConfig> はキー網羅と各
// フィールドの型は強制するが、型では表現できない以下の不変条件は人手のコピペ編集で
// 静かに壊れうる:
//   - 冗長な code フィールドとキーの一致（コピペで code を直し忘れる footgun）
//   - urlSlug / label / nameFull の非空（空だと PDF URL が壊れ 404・ラベルが空表示）
//   - expectedQuestions の正値（StudyPlanClient の 1 日目標計算が壊れる）
//   - sessions / categories / seasons の非空（スケジュールプランナーが分野を取りこぼす）
//   - yearRange.start <= end（parse-all/fetch-ipa-pdfs のループが静かに空回りする）
// これらを回帰固定する。ALL_EXAM_CODES は `Object.keys(EXAM_CONFIGS) as ExamCode[]`
// で導出されるため、キー集合との一致も併せてピンする。

const ENTRIES = Object.entries(EXAM_CONFIGS) as Array<[ExamCode, ExamConfig]>;

function checkSession(code: ExamCode, label: string, s: SessionConfig) {
  expect(s.urlSlug.trim().length, `${code}/${label} urlSlug`).toBeGreaterThan(0);
  expect(s.label.trim().length, `${code}/${label} label`).toBeGreaterThan(0);
  expect(s.expectedQuestions, `${code}/${label} expectedQuestions`).toBeGreaterThan(0);
  expect(s.categories.length, `${code}/${label} categories`).toBeGreaterThan(0);
  for (const c of s.categories) {
    expect(c.trim().length, `${code}/${label} category 非空`).toBeGreaterThan(0);
  }
}

describe("EXAM_CONFIGS のデータ整合性", () => {
  it("各エントリの code フィールドはキーと一致する（コピペ drift 防止）", () => {
    for (const [key, cfg] of ENTRIES) {
      expect(cfg.code, `key=${key} の code フィールド`).toBe(key);
    }
  });

  it("ALL_EXAM_CODES は EXAM_CONFIGS のキー集合と一致する", () => {
    const keys = ENTRIES.map(([k]) => k);
    expect([...ALL_EXAM_CODES].sort()).toEqual([...keys].sort());
    // 各コードは実在キーであり重複しない
    expect(new Set(ALL_EXAM_CODES).size).toBe(ALL_EXAM_CODES.length);
  });

  it("nameFull / urlSlug は非空（urlSlug は PDF 出典 URL の構成要素）", () => {
    for (const [code, cfg] of ENTRIES) {
      expect(cfg.nameFull.trim().length, `${code} nameFull`).toBeGreaterThan(0);
      expect(cfg.urlSlug.trim().length, `${code} urlSlug`).toBeGreaterThan(0);
    }
  });

  it("seasons / sessions は非空で、各 session の不変条件を満たす", () => {
    for (const [code, cfg] of ENTRIES) {
      expect(cfg.seasons.length, `${code} seasons`).toBeGreaterThan(0);
      expect(cfg.sessions.length, `${code} sessions`).toBeGreaterThan(0);
      for (const s of cfg.sessions) checkSession(code, "session", s);
      for (const s of cfg.cbtSessions ?? []) checkSession(code, "cbtSession", s);
    }
  });

  it("各 exam の session / urlSlug は重複しない（section ルート衝突防止）", () => {
    // 問題ページの URL は /[exam]/[year-season]/[section] で、section は
    // SessionConfig.urlSlug 由来。同一 exam の sessions（および cbtSessions）内で
    // urlSlug が重複すると generateStaticParams が同一パラメータを生成し、片方の
    // session のページが静的生成から漏れて到達不能（404）になる。session 値の重複も
    // 同様にどちらかの設定を dead エントリ化する。型 SessionConfig[] は重複を防げない
    // ため、各 exam 内で urlSlug / session の一意性を回帰固定する（コピペ drift 防止）。
    const checkUnique = (
      code: ExamCode,
      arr: SessionConfig[] | undefined,
      tag: string,
    ) => {
      if (!arr) return;
      const slugs = arr.map((s) => s.urlSlug);
      expect(new Set(slugs).size, `${code}/${tag} urlSlug 一意`).toBe(slugs.length);
      const sessions = arr.map((s) => s.session);
      expect(new Set(sessions).size, `${code}/${tag} session 一意`).toBe(
        sessions.length,
      );
    };
    for (const [code, cfg] of ENTRIES) {
      checkUnique(code, cfg.sessions, "sessions");
      checkUnique(code, cfg.cbtSessions, "cbtSessions");
    }
  });

  it("年範囲 start <= end（regular / legacy / cbt すべて）", () => {
    for (const [code, cfg] of ENTRIES) {
      expect(cfg.yearRange.start, `${code} yearRange`).toBeLessThanOrEqual(
        cfg.yearRange.end,
      );
      if (cfg.legacyYearRange) {
        expect(
          cfg.legacyYearRange.start,
          `${code} legacyYearRange`,
        ).toBeLessThanOrEqual(cfg.legacyYearRange.end);
      }
      if (cfg.cbtYearRange) {
        expect(
          cfg.cbtYearRange.start,
          `${code} cbtYearRange`,
        ).toBeLessThanOrEqual(cfg.cbtYearRange.end);
      }
    }
  });
});
