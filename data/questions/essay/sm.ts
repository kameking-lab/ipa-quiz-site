import type { EssayQuestion } from "@/lib/essay/types";

export const SM_ESSAY_QUESTIONS: EssayQuestion[] = [
  {
    id: "sm-2024a-pm2-q1",
    exam: "sm",
    year: 2024,
    season: "spring",
    qNumber: 1,
    title: "IT サービスの可用性管理について",
    context: `IT サービスマネージャは、IT サービスの可用性を維持・向上させる責務を負う。
SLA / SLO に基づいて目標可用性を設定し、システム構成、運用プロセス、障害対応体制を整備するとともに、可用性を継続的にモニタリング・改善する必要がある。`,
    subPrompts: [
      {
        key: "ア",
        prompt:
          "あなたが運用している IT サービスの概要、可用性に関する SLA / SLO、可用性管理の体制を、800字以内で述べよ。",
        targetChars: 800,
        minChars: 600,
        maxChars: 800,
        modelOutline:
          "①サービス概要（業務／利用者／重要度）②SLA / SLO（稼働率/RTO/RPO）③可用性管理体制（運用チーム/監視）",
      },
      {
        key: "イ",
        prompt:
          "可用性確保のための施策、可用性低下時の対応プロセス、再発防止策を、800字以上1,600字以内で具体的に述べよ。",
        targetChars: 1200,
        minChars: 800,
        maxChars: 1600,
        modelOutline:
          "①冗長化／フェイルオーバ②監視（Synthetic／Real User Monitoring）③障害対応プロセス（検知→切分け→復旧→事後分析）④再発防止（PIR／構成変更）",
      },
      {
        key: "ウ",
        prompt:
          "可用性管理の評価、想定外の障害事例とそこから得た教訓、今後の改善計画を、600字以上1,200字以内で具体的に述べよ。",
        targetChars: 800,
        minChars: 600,
        maxChars: 1200,
        modelOutline:
          "①可用性指標の評価結果②想定外障害事例③得られた教訓④今後の改善計画（カオスエンジニアリング等）",
      },
    ],
    officialReview: `SLA／SLO の妥当性、可用性確保策の具体性、障害対応プロセスの体系性が評価される。
机上のフレームワーク列挙ではなく、実際のサービス特性に応じた可用性設計を論述する必要がある。`,
    pdfUrl: "https://www.ipa.go.jp/shiken/mondai-kaiotu/2024r06.html",
    license: "IPA-public",
  },
  {
    id: "sm-2024a-pm2-q2",
    exam: "sm",
    year: 2024,
    season: "spring",
    qNumber: 2,
    title: "重大インシデント発生時の対応と再発防止について",
    context: `IT サービスマネージャは、重大インシデント発生時に、業務影響を最小化するための初動対応、関係者への連絡、根本原因の特定、再発防止策の立案を主導する責任を負う。`,
    subPrompts: [
      {
        key: "ア",
        prompt:
          "あなたが対応した重大インシデントについて、対象 IT サービスの概要、インシデントの内容、業務への影響を、800字以内で述べよ。",
        targetChars: 800,
        minChars: 600,
        maxChars: 800,
        modelOutline:
          "①IT サービス概要②インシデントの発生状況（時刻/事象）③業務影響（停止時間/影響利用者数/金銭的損失）",
      },
      {
        key: "イ",
        prompt:
          "初動対応、関係者への連絡、根本原因の特定プロセスを、800字以上1,600字以内で具体的に述べよ。",
        targetChars: 1200,
        minChars: 800,
        maxChars: 1600,
        modelOutline:
          "①初動対応（インシデントコマンダ任命/暫定対応）②エスカレーション・関係者連絡（経営/業務部門/顧客）③根本原因特定（ログ分析/再現テスト）④暫定対応と恒久対応の切り分け",
      },
      {
        key: "ウ",
        prompt:
          "立案した再発防止策、効果検証、組織への展開方法を、600字以上1,200字以内で具体的に述べよ。",
        targetChars: 800,
        minChars: 600,
        maxChars: 1200,
        modelOutline:
          "①再発防止策（技術対策/プロセス改善/教育）②効果検証方法③組織展開（ポストモーテム共有/ガイドライン更新）",
      },
    ],
    officialReview: `初動対応の迅速性、関係者連絡の網羅性、根本原因分析の論理性、再発防止策の妥当性が総合的に評価される。
個人技に頼った対応ではなく、組織的な仕組みで再発を防ぐ視点が求められる。`,
    pdfUrl: "https://www.ipa.go.jp/shiken/mondai-kaiotu/2024r06.html",
    license: "IPA-public",
  },
];
