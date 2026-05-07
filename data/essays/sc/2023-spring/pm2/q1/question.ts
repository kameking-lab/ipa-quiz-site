import type { SCpm2Question } from "@/lib/essays/types";
import itEssay from "./it";
import financeEssay from "./finance";
import constructionEssay from "./construction";
import healthcareEssay from "./healthcare";
import publicEssay from "./public";

export const SC_2023_SPRING_PM2_Q1: SCpm2Question = {
  id: "sc-2023h-pm2-q1",
  year: 2023,
  season: "spring",
  qNumber: 1,
  theme: "内部不正対策とアクセス制御の設計",
  context: `情報システムの利用において、正当なアクセス権を持つ内部者による不正行為（内部不正）は、外部攻撃と並ぶ重大なセキュリティリスクである。組織は、業務上必要最小限のアクセス権付与（最小権限の原則）、定期的な権限見直し、退職・異動時の権限管理、操作ログの取得と監視などを組み合わせ、内部不正を抑止・検知する体制を構築しなければならない。

情報処理安全確保支援士として、あなたが自ら担当した（あるいはコンサルタントとして支援した）組織において、内部不正によるセキュリティインシデントが発生した、またはそのリスクを評価して予防策を講じた経験に基づき、以下の設問に答えよ。

設問ア：あなたが属する組織の概要と、内部不正リスクが顕在化した（または高まっていた）背景、および内部不正の態様（または想定されるリスクシナリオ）を 800 字以内で述べよ。

設問イ：その状況に対応するためにあなたが設計・実施した内部不正対策とアクセス制御の施策について、具体的に 1,600 字以内で述べよ。推進上の課題とその解決策についても言及すること。

設問ウ：対策の結果と残存する課題、及び今後の改善計画を 600 字以内で述べよ。`,
  pdfUrl: "https://www.ipa.go.jp/shiken/mondai-kaiotu/2023r05.html",
  license: "IPA-public",
  industries: [itEssay, financeEssay, constructionEssay, healthcareEssay, publicEssay],
};
