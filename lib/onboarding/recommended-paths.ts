import type { RecommendedPath, UserAttribute } from "./types";
import type { ExamCode } from "@/lib/questions/types";

export function getRecommendedPath(
  attribute: UserAttribute,
  exam: ExamCode,
): RecommendedPath {
  if (attribute === "beginner") {
    return {
      attribute,
      title: "初学者向け学習パス",
      summary: "用語と概念から少しずつ。まずは易しい問題で慣れていきます。",
      steps: [
        {
          href: `/quiz?mode=random&exam=${exam}&limit=3`,
          label: "3問だけ過去問AIを体験",
          description: "AIコパイロットが選択肢ごとに解説するスタイルに慣れる",
          estMin: 3,
        },
        {
          href: `/glossary`,
          label: "頻出用語をざっくり確認",
          description: "未知の用語は用語集でひと言で押さえる",
          estMin: 10,
        },
        {
          href: `/${exam}`,
          label: `${exam.toUpperCase()} の分野別学習`,
          description: "弱い分野からじっくり1日10問ずつ",
          estMin: 15,
        },
        {
          href: `/study-plan`,
          label: "試験日から学習計画を作成",
          description: "目標日と1日の学習時間で自動プラン化",
          estMin: 5,
        },
      ],
    };
  }
  if (attribute === "experienced") {
    return {
      attribute,
      title: "経験者・再受験向け",
      summary: "弱点と最新傾向から効率最大化。模試で実戦感覚を取り戻します。",
      steps: [
        {
          href: `/mock-exam?exam=${exam}`,
          label: `${exam.toUpperCase()} 模試で現在地確認`,
          description: "得点と弱点分野を一発で可視化",
          estMin: 30,
        },
        {
          // /my-progress は /account/dashboard に 301 統合済。リダイレクトを
          // 1 ホップ挟まず、弱点タブ（#weakness）へ直接ディープリンクする。
          href: `/account/dashboard#weakness`,
          label: "弱点マップで集中分野を決める",
          description: "正答率の低い分野から優先的に潰す",
          estMin: 5,
        },
        {
          href: `/quiz?mode=review&exam=${exam}`,
          label: "誤答のみ復習",
          description: "間違えた問題だけを繰り返す効率モード",
          estMin: 20,
        },
        {
          href: `/${exam}`,
          label: `${exam.toUpperCase()} 直近の年度から演習`,
          description: "最新2回分の傾向を確実に押さえる",
          estMin: 30,
        },
      ],
    };
  }
  // last-minute
  return {
    attribute,
    title: "直前期（試験まで2週間以内）",
    summary: "頻出論点を一気に俯瞰。本番形式で時間配分も同時にトレーニング。",
    steps: [
      {
        href: `/mock-exam?exam=${exam}&full=true`,
        label: `${exam.toUpperCase()} フル模試（時間計測）`,
        description: "本番の制限時間で1本通す",
        estMin: 150,
      },
      {
        href: `/quiz?mode=review&exam=${exam}`,
        label: "誤答を即復習",
        description: "間違えた問題だけ集中して再演習",
        estMin: 20,
      },
      {
        href: `/${exam}`,
        label: `${exam.toUpperCase()} 直近2回分の年度別演習`,
        description: "本番に近い順序で頻出論点を確認",
        estMin: 60,
      },
      {
        href: `/blog`,
        label: "頻出テーマの解説記事を流し読み",
        description: "総まとめ・直前チェック向けまとめ",
        estMin: 15,
      },
    ],
  };
}

export interface AttributeOption {
  value: UserAttribute;
  label: string;
  blurb: string;
}

export const ATTRIBUTE_OPTIONS: AttributeOption[] = [
  {
    value: "beginner",
    label: "初学者（これから受験）",
    blurb: "情報処理試験ははじめて。用語からじっくり学びたい。",
  },
  {
    value: "experienced",
    label: "経験者（過去合格・再受験）",
    blurb: "別区分の合格経験あり。弱点から効率的に固めたい。",
  },
  {
    value: "last-minute",
    label: "直前期（試験まで2週間以内）",
    blurb: "時間がない。頻出論点と模試で一気に仕上げたい。",
  },
];
