import type { SCpm2Question } from "@/lib/essays/types";
import itEssay from "./it";
import financeEssay from "./finance";
import constructionEssay from "./construction";
import healthcareEssay from "./healthcare";
import publicEssay from "./public";
import manufacturingEssay from "./manufacturing";
import retailEssay from "./retail";
import telecomEssay from "./telecom";

export const SC_2024_SPRING_PM2_Q1: SCpm2Question = {
  id: "sc-2024h-pm2-q1",
  year: 2024,
  season: "spring",
  qNumber: 1,
  theme: "クラウドサービス利用時のセキュリティ設計",
  context: `近年、多くの組織がクラウドサービスへのシステム移行を進めている。クラウドサービスの利用においては、クラウド事業者と利用者の間の「責任共有モデル」を正確に理解した上で、利用者側のセキュリティ対策を適切に設計しなければならない。具体的には、IAM（Identity and Access Management）による最小権限の実装、データの暗号化と鍵管理、ログの取得と保管、ネットワークのセグメンテーション、及びマルチクラウド・ハイブリッド環境における統合管理が求められる。

情報処理安全確保支援士として、あなたが自ら担当した（あるいはコンサルタントとして支援した）組織のクラウドサービス移行または新規導入プロジェクトにおいて、セキュリティ設計を担当した経験に基づき、以下の設問に答えよ。

設問ア：あなたが属する組織の概要と、クラウドサービス移行・導入を行った背景、及びセキュリティ上の課題を 800 字以内で述べよ。

設問イ：あなたが設計したクラウドセキュリティアーキテクチャの内容を、1,600 字以内で具体的に述べよ。設計上の判断根拠と推進上の課題・解決策についても言及すること。

設問ウ：対策の結果と残存する課題、及び今後の改善計画を 600 字以内で述べよ。`,
  pdfUrl: "https://www.ipa.go.jp/shiken/mondai-kaiotu/2024r06.html",
  license: "IPA-public",
  industries: [
    itEssay,
    financeEssay,
    constructionEssay,
    healthcareEssay,
    publicEssay,
    manufacturingEssay,
    retailEssay,
    telecomEssay,
  ],
};
