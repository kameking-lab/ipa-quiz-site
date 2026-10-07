import type { ExamCode } from "@/lib/questions/types";
import type { NoteLinkSource } from "@/components/analytics/TrackedNoteLink";

export interface NotePaidMaterial {
  title: string;
  href: string;
  audience: string;
  deliverable: string;
  difference: string;
  priceYen: number;
  cta: string;
  source: NoteLinkSource;
}

// Anonymous note v3 metadata and public previews checked on 2026-10-07.
// These are optional individual purchases, separate from free site practice.
export const NOTE_PAID_MATERIALS: Partial<Record<ExamCode, NotePaidMaterial>> = {
  st: {
    title: "令和6年度春期ITストラテジスト午後Ⅱ・問1｜DXの技術検証を経営判断へつなぐ答案設計",
    href: "https://note.com/ipa_quiz_ai/n/nc9483a96082a",
    audience: "ITストラテジスト（ST）の論述で、技術検証の結果と事業効果の試算を混同し、経営判断へつなぐ説明に迷う人向けです。",
    deliverable: "公開案件の記入済み表、自分の事実を入れる空欄シート、段落の文型と答案骨子の点検を収録しています。",
    difference: "無料サイトの選択式過去問・解説で知識を確認した後に、本人の記録を使って科目B-2に向けた論述の骨子を作る教材です。完成論文や個別添削は含みません。",
    priceYen: 1280,
    cta: "ST・DX答案設計の無料部分を読む",
    source: "exam_st",
  },
  sa: {
    title: "令和7年度春期システムアーキテクト午後Ⅱ・問2｜データ移行の答案設計",
    href: "https://note.com/ipa_quiz_ai/n/n3a2e2aa6c490",
    audience: "システムアーキテクト（SA）のデータ移行の論述で、作業は書けても方法を選んだ理由が薄くなる人向けです。",
    deliverable: "経験・要求対応・修正・自己点検の4シートで、本人の事実を設問ごとの段落へ配置し、字数と整合性を点検できます。",
    difference: "無料サイトの選択式過去問・解説とは別に、科目B-2に向けて現新の差異からシステム面・業務面の方法と移行計画を文章にする教材です。本人の経験の代作や公式の完成模範論文は含みません。",
    priceYen: 1280,
    cta: "SA・データ移行の段落修正を試す",
    source: "exam_sa",
  },
  nw: {
    title: "【令和7年度春期・科目B-2】ネットワークスペシャリスト試験｜記述22枠の77.3％は20〜40字",
    href: "https://note.com/ipa_quiz_ai/n/n6628c0d46fbc",
    audience: "ネットワークスペシャリスト（NW）の令和7年度春期午後Ⅱを解き、理由・処理を字数制限に収めて書き直したい人向けです。",
    deliverable: "無料部分で字数・語尾と採点講評の分析を確認でき、有料部分では設問ごとの解答骨子と次に解く過去問を収録しています。",
    difference: "無料サイトの選択式過去問・解説で知識を確認する学習に、科目B-2に向けた記述答案の短文化と復習先の選択を補う教材です。問題演習やAI採点の利用権を購入するものではありません。",
    priceYen: 1280,
    cta: "NW・記述の字数と解答骨子を確認する",
    source: "exam_nw",
  },
};
