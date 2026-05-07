import type { SCpm2Question } from "@/lib/essays/types";
import itEssay from "./it";
import financeEssay from "./finance";
import constructionEssay from "./construction";
import healthcareEssay from "./healthcare";
import publicEssay from "./public";

export const SC_2025_SPRING_PM2_Q1: SCpm2Question = {
  id: "sc-2025h-pm2-q1",
  year: 2025,
  season: "spring",
  qNumber: 1,
  theme: "ゼロトラストアーキテクチャの設計と実装",
  context: `組織のネットワーク境界が曖昧になり、テレワーク・クラウド活用・モバイルデバイスの普及が進む中、従来の境界型防御（ファイアウォール・VPN）では不十分な状況が生まれている。ゼロトラストアーキテクチャ（ZTA）は「何も信頼しない。常に検証する（Never Trust, Always Verify）」の原則に基づき、リソースへのアクセスをリクエストごとに動的に評価・制御するセキュリティモデルである。米国 NIST SP 800-207 では、ZTA の核心として、強力な ID 認証、デバイス健全性評価、最小権限アクセス、継続的な監視・検証の四要素が定められている。

情報処理安全確保支援士として、あなたが自ら担当した（あるいはコンサルタントとして支援した）組織において、ZTA の設計・導入を行った経験に基づき、以下の設問に答えよ。

設問ア：あなたが属する組織の概要と、ゼロトラスト導入を決定した背景・目的、及び導入前のセキュリティ課題を 800 字以内で述べよ。

設問イ：あなたが設計した ZTA の構成と実装内容について、1,600 字以内で具体的に述べよ。NIST SP 800-207 の原則との対応、組織固有の課題への対応策、推進上の困難とその解決策についても言及すること。

設問ウ：導入後の成果と残存する課題、及び今後の改善計画を 600 字以内で述べよ。`,
  pdfUrl: "https://www.ipa.go.jp/shiken/mondai-kaiotu/2025r07.html",
  license: "IPA-public",
  industries: [itEssay, financeEssay, constructionEssay, healthcareEssay, publicEssay],
};
