import { examLabel } from "@/lib/utils";
import type { PersonaInput } from "./personas";
import type { SuccessStory } from "./types";

const PUBLISHED_BASE = new Date("2026-01-01T00:00:00.000Z").getTime();
const DAY_MS = 86_400_000;

function todayUtcMidnightMs(): number {
  const now = new Date();
  return Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
}

function publishedAtFor(offsetDays: number): string {
  const target = PUBLISHED_BASE + offsetDays * DAY_MS;
  const clamped = Math.min(target, todayUtcMidnightMs());
  return new Date(clamped).toISOString();
}

function bulletList(items: string[]): string {
  return items.map((s) => `- ${s}`).join("\n");
}

function buildTitle(p: PersonaInput): string {
  return `【${examLabel(p.exam)}合格体験記】${p.titleHook}`;
}

function buildDescription(p: PersonaInput): string {
  const monthsPart = `${p.studyMonths}か月`;
  const hoursPart = `計${p.totalStudyHours}時間`;
  return `${p.occupation}（${p.ageRange}）が${examLabel(p.exam)}に${monthsPart}・${hoursPart}で合格した実体験。${p.motivation.slice(0, 50)}…という動機から、勉強法・つまずき・突破方法・合格後の変化までを生々しく振り返ります。`;
}

function buildBody(p: PersonaInput): string {
  const examName = examLabel(p.exam);
  const scoreLine = p.score ? `- 結果: ${p.score}\n` : "";

  return `## 合格までのサマリー

- 受験者プロフィール: ${p.occupation}（${p.ageRange}）
- 背景: ${p.background}
- 学習期間: ${p.studyMonths}か月 / 合計 ${p.totalStudyHours}時間 / 週平均 ${p.weeklyHours}時間
- 合格時期: ${p.passedAt}
${scoreLine}- 次の目標: ${p.nextGoal}

## なぜ${examName}を受験したのか

${p.motivation}。${examName}を選んだ理由は、自分のキャリアの中で「次の一歩」を踏み出すための客観的な根拠が欲しかったからです。資格そのものより、資格に向けた学習過程と合格後の変化に価値があると考えました。

## 学習スケジュール

${p.scheduleNarrative}

平日と休日の使い分けを最初に決め、週次で進捗を測定するスタイルでした。${p.studyMonths}か月で計${p.totalStudyHours}時間という総量は、週平均${p.weeklyHours}時間ペース。最初の2週間で生活リズムを実験し、続けられるペースを確定させたのが結果的に大きかったです。

過去問AIの **AIコパイロット** は学習全体で常時併走させました。分からない用語の即時解説、誤答分析、関連論点の出題依頼など、参考書だけでは届かない部分を埋めるのに重宝しました。

## 一番苦労したポイント

${p.strugglePoint}。

この苦戦が長引いた時期は、学習計画そのものを見直すか迷うほど精神的にしんどい時間でした。やり方を変えずに量だけ増やしても効果が出ないと判断し、学習方法そのものを切り替える決断をしました。

## 突破した方法

${p.breakthroughMethod}。

この切り替えが効いた理由は、自分の「経験の出発点」と試験で問われる「抽象論点」のあいだに橋を架けられたからだと思います。AIコパイロットに自分の文脈を伝えて再解釈してもらうことで、暗記ではなく理解として知識が定着しました。

## 使った学習ツール

${p.toolMix}。

複数ツールの組み合わせは、それぞれが補完関係にあると効率が上がります。逆に同じ役割のツールを重ねると時間を消費するだけなので、参考書1冊・過去問サイト1つ・AIコパイロット1つの三点を軸にし、専門書や実機演習を必要に応じて追加する構成が無駄が少なかったです。

## 試験当日

${p.examDayNarrative}。

直前1週間は新しい論点に手を出さず、苦手領域の最終確認と模試の解き直しだけに絞りました。当日朝は普段通りの食事と移動で、特別なルーティンは作らないようにしました。

## 合格後に何が変わったか

${p.afterEffect}。

資格は名刺の肩書きではなく、日々の業務での発言力と判断力に直接効く投資だったと振り返って感じます。実務での会話に専門用語が混じっても臆さなくなり、社内外での自分のポジショニングが明確に変わりました。

## ${examName}受験者へのキー・ティクアウェイ

${bulletList(p.keyTakeaways)}

特に同じ${p.occupation}の方や、${p.ageRange}で次のキャリア一歩を考えている方には、${examName}は投資効率の高い資格だと自信を持って勧められます。

## 過去問AIをどう使ったか

${examName}対策で過去問AIを使い倒すなら、次の3点が個人的なおすすめです。

1. **年度別演習** で出題傾向の最新動向を体感し、頻出論点を肌で覚える
2. **AIコパイロットの誤答分析** を必ず通し、間違えた問題は二度と落とさないよう関連論点まで聞き出す
3. **クイックアクションの類題生成** で、苦手分野を集中して10問単位で叩く

参考書を読む時間と、過去問AIで手を動かす時間は、目安として2:8の比率を意識していました。

## 次のステップ

合格は通過点です。次は **${p.nextGoal}** を目標に、学習リズムを保ったまま次の試験に移行する予定です。一度作った学習習慣を切らさないことが、複数資格を効率的に取得する最大のコツだと感じています。

${examName}の受験を検討している方は、まず[${examName}の過去問演習](/${p.exam})から始めてみてください。AI解説付きで分からない問題はその場で解決できます。`;
}

export function buildSuccessStory(p: PersonaInput): SuccessStory {
  return {
    slug: p.slug,
    exam: p.exam,
    title: buildTitle(p),
    description: buildDescription(p),
    persona: {
      ageRange: p.ageRange,
      occupation: p.occupation,
      background: p.background,
      motivation: p.motivation,
      studyMonths: p.studyMonths,
      totalStudyHours: p.totalStudyHours,
      passedAt: p.passedAt,
      score: p.score,
    },
    strugglePoint: p.strugglePoint,
    keyTakeaways: p.keyTakeaways,
    publishedAt: publishedAtFor(p.publishedOffsetDays),
    body: buildBody(p),
    relatedQuizExam: p.exam,
    relatedBlogSlug: p.relatedBlogSlug,
    relatedEssayExam: p.relatedEssayExam,
  };
}
