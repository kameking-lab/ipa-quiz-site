import type { ExamCode } from "@/lib/questions/types";
import type { NoteLinkSource } from "@/components/analytics/TrackedNoteLink";

export type NoteGuideKind = "free" | "paid";
export type NoteGuideAccount = "ipa_quiz_ai" | "sikaku_rakutoru";

export interface NoteGuideLink {
  /**
   * 表示ラベル・CTA文言を決める唯一の情報源。"paid" を "free" 側の文言で
   * 出してはならない（逆も同様）。呼び出し側は必ずこの値で分岐すること。
   */
  kind: NoteGuideKind;
  href: string;
  label: string;
  source: NoteLinkSource;
  account: NoteGuideAccount;
  /**
   * kind 共通の説明文(ExamNoteGuide の KIND_COPY.body)で実態と合わない場合だけ、
   * この記事専用の説明文で上書きする。省略時は共通文言を使う。
   */
  description?: string;
}

// 出典: components/exam/ExamNoteGuide.tsx の既存 NOTE_GUIDES を 2026-09-13 に
// 移設したもの（href / label / source はバイト単位で同一）。
// 注意: これらのURLが note.com 上で現在も公開されているかは未確認。
// 新規追加も死リンク削除も、実際にURLを開いて確認してから行うこと。
export const EXAM_NOTE_GUIDES: Partial<Record<ExamCode, NoteGuideLink>> = {
  sa: {
    kind: "free",
    href: "https://note.com/sikaku_rakutoru/n/n9e207dfe4421",
    label: "性能見積もりの根拠を4段階で書く",
    source: "exam_sa",
    account: "sikaku_rakutoru",
  },
  st: {
    kind: "free",
    href: "https://note.com/sikaku_rakutoru/n/n6ebb89810300",
    label: "投資対効果を3手順と2指標で書く",
    source: "exam_st",
    account: "sikaku_rakutoru",
  },
  nw: {
    kind: "free",
    href: "https://note.com/sikaku_rakutoru/n/n3a7c95159e7a",
    label: "冗長切替を3段階の答案型で整理する",
    source: "exam_nw",
    account: "sikaku_rakutoru",
  },
  // 出典: reports/revenue-eco-20260913/receipts/free-01-au-am2.json (ok:true, 2026-09-13 観測)。
  // account/ipa-sikaku/history.json 経由で公開が確認できた記事のみを登録する。
  au: {
    kind: "free",
    href: "https://note.com/sikaku_rakutoru/n/n573e38ac5dea",
    label: "科目A-2(択一)を論文対策の前に1周させる",
    source: "exam_au",
    account: "sikaku_rakutoru",
  },
  // 出典: reports/revenue-eco-20260913/receipts/free-02-sc-am2.json (ok:true, 2026-09-13 観測)。
  sc: {
    kind: "free",
    href: "https://note.com/sikaku_rakutoru/n/nee848928ccb7",
    label: "科目A-2を記述対策の隣に置く",
    source: "exam_sc",
    account: "sikaku_rakutoru",
  },
  // 出典: reports/revenue-eco-20260913/receipts/free-03-pm-am2.json (ok:true, 2026-09-13 観測)。
  pm: {
    kind: "free",
    href: "https://note.com/sikaku_rakutoru/n/n20f719f019ac",
    label: "科目A-2を論文と別枠で取る",
    source: "exam_pm",
    account: "sikaku_rakutoru",
  },
  // 出典: reports/revenue-eco-20260913/receipts/free-04-db-am2.json (ok:true, 2026-09-13 観測)。
  db: {
    kind: "free",
    href: "https://note.com/sikaku_rakutoru/n/n8b0780e3c3b8",
    label: "科目A-2は設計問題と別の筋肉を使う",
    source: "exam_db",
    account: "sikaku_rakutoru",
  },
  // 出典: reports/revenue-completion-20260913/receipts/free-05-sm-am2.json (ok:true, 2026-09-13 観測)。
  sm: {
    kind: "free",
    href: "https://note.com/sikaku_rakutoru/n/nba9435c2ae0f",
    label: "運用プロセスの定義と復習手順",
    source: "exam_sm",
    account: "sikaku_rakutoru",
  },
  // 出典: reports/revenue-completion-20260913/receipts/free-06-es-am2.json (ok:true, 2026-09-13 観測)。
  es: {
    kind: "free",
    href: "https://note.com/sikaku_rakutoru/n/nd0881771250e",
    label: "リアルタイムOSの用語と復習手順",
    source: "exam_es",
    account: "sikaku_rakutoru",
  },
  // 出典: reports/revenue-completion-20260913/receipts/cf-10-sg-free.json (ok:true, 2026-09-13 観測)。
  sg: {
    kind: "free",
    href: "https://note.com/ipa_quiz_ai/n/n094a9aefbc1a",
    label: "情報セキュリティマネジメント試験の形式と学習手順",
    source: "exam_sg",
    account: "ipa_quiz_ai",
  },
  // 出典: reports/revenue-completion-20260913/receipts/cf-11-ap-free.json (ok:true, 2026-09-13 観測)。
  ap: {
    kind: "free",
    href: "https://note.com/ipa_quiz_ai/n/n550db5ff2054",
    label: "応用情報の試験形式と高度試験への進み方",
    source: "exam_ap",
    account: "ipa_quiz_ai",
  },
  // 出典: reports/revenue-completion-20260913/existing-guides/existing-fe-free.json
  // (公開APIの実測 2026-09-13: status=published / price=0 / is_limited=false)。
  // 新規公開ではなく、既に公開済みの無料記事の再利用。
  fe: {
    kind: "free",
    href: "https://note.com/ipa_quiz_ai/n/n7e5046098452",
    label: "9大分類・23中分類をつなげて用語を覚える",
    source: "exam_fe",
    account: "ipa_quiz_ai",
  },
  // 出典: reports/revenue-completion-20260913/existing-guides/existing-ip-free.json
  // (公開APIの実測 2026-09-13: status=published / price=0 / is_limited=false)。
  // 新規公開ではなく、既に公開済みの無料記事の再利用。
  ip: {
    kind: "free",
    href: "https://note.com/ipa_quiz_ai/n/nbabb9742557b",
    label: "ストラテジ系32問を経営3手法で判別する",
    source: "exam_ip",
    account: "ipa_quiz_ai",
  },
  // 出典: note.com/api/v3/notes/n109be9d7ce85 (published, price=0, 匿名で全文閲覧可。
  // 2026-09-26 18:48 JST 公開、同日 v3 API で確認)。非IPA区分だが EXAM_NOTE_GUIDES は
  // ExamCode 全体をキーに持てるので、/civil2 の ExamNoteGuide に同じ形で出る。
  civil2: {
    kind: "free",
    href: "https://note.com/sikaku_rakutoru/n/n109be9d7ce85",
    label: "前年66問を必須と選択に分けて4週間で27点を狙う",
    source: "exam_civil2",
    account: "sikaku_rakutoru",
  },
};

export function getNoteGuide(exam: ExamCode): NoteGuideLink | undefined {
  return EXAM_NOTE_GUIDES[exam];
}

// 主リンク(上記 EXAM_NOTE_GUIDES)を隠さずに、有料教材を「補助リンク」として
// 追加で出すための別テーブル。既存の EXAM_NOTE_GUIDES / getNoteGuide の形・
// 挙動・既存テストは一切変更しない(下位互換の拡張)。
// オーナー承認 2026-09-13: PM の無料記事(exam_pm)を隠さず、有料ワークシートを
// 補助リンクとして併記する。
export const EXAM_NOTE_SUPPLEMENTS: Partial<Record<ExamCode, NoteGuideLink>> = {
  pm: {
    kind: "paid",
    href: "https://note.com/sikaku_rakutoru/n/nb57e5dd70d62",
    label: "6問+2ワークシートで科目A-2を演習する",
    source: "exam_pm_paid",
    account: "sikaku_rakutoru",
    // 出典: reports/revenue-eco-20260913/PROGRESS.md 6行目「有料2教材は最初の
    // 一通りの演習・事例を無料公開」。無料記事だけでも学習は完結するため、
    // 購入が必須であるかのような文言は書かない。
    description:
      "500円（購入は任意です）。最初の演習は記事内で無料の試し読みができます。6問の演習と2つのワークシートで、無料ガイドの型を実際の答案に書き起こせます。",
  },
  // 2026-09-27 に匿名画面・公開APIで価格と有料境界を確認。無料ガイドは主リンクのまま残す。
  ip: {
    kind: "paid",
    href: "https://note.com/ipa_quiz_ai/n/n4d660d858d53",
    label: "2進数・論理演算・表計算の計算12問",
    source: "exam_ip_paid",
    account: "ipa_quiz_ai",
    description: "980円。無料部分で試し問題を確認できます。購入は任意です。計算12問と各選択肢の解説を収録しています。",
  },
  sg: {
    kind: "paid",
    href: "https://note.com/ipa_quiz_ai/n/nf7aa45d40bf6",
    label: "法規・ガイドラインの判別ドリル12問",
    source: "exam_sg_paid",
    account: "ipa_quiz_ai",
    description: "980円。無料部分で例題を確認できます。購入は任意です。科目Aの法規とガイドラインを判別する12問を収録しています。",
  },
  fe: {
    kind: "paid",
    href: "https://note.com/ipa_quiz_ai/n/nd762ac17cd95",
    label: "確率・待ち行列・期待値の計算10問",
    source: "exam_fe_paid",
    account: "ipa_quiz_ai",
    description: "980円。無料部分で例題を確認できます。購入は任意です。科目Aの計算10問を途中式付きで解説しています。",
  },
  ap: {
    kind: "paid",
    href: "https://note.com/ipa_quiz_ai/n/n8ad47350244f",
    label: "経営戦略・企業活動・法務の16問",
    source: "exam_ap_paid",
    account: "ipa_quiz_ai",
    description: "980円。無料部分で例題を確認できます。購入は任意です。科目Aのストラテジ系16問と各選択肢の解説を収録しています。",
  },
};

export function getNoteGuideSupplement(exam: ExamCode): NoteGuideLink | undefined {
  return EXAM_NOTE_SUPPLEMENTS[exam];
}

// 同じ試験区分に、用途の異なる検証済み教材がある場合の追加候補。
// 主リンクと既存の補助リンクは維持し、無料部分で内容を確認できる教材だけを並べる。
export const EXAM_NOTE_EXTRA_SUPPLEMENTS: Partial<Record<ExamCode, readonly NoteGuideLink[]>> = {
  ip: [
    {
      kind: "paid",
      href: "https://note.com/ipa_quiz_ai/n/n2cf8042d489d",
      label: "マルウェア・認証・リスク対応を判別する12問",
      source: "exam_ip_paid_security",
      account: "ipa_quiz_ai",
      description: "980円。無料部分で用語の違いと試し問題を確認できます。購入は任意です。12問の全選択肢を解説しています。",
    },
  ],
  ap: [
    {
      kind: "paid",
      href: "https://note.com/ipa_quiz_ai/n/n8d6aed684597",
      label: "科目Bの経営戦略を計算するオリジナル3問",
      source: "exam_ap_paid_strategy_b",
      account: "ipa_quiz_ai",
      description: "1,280円。無料部分で期待値の例を確認できます。購入は任意です。期待値・投資回収・目標利益の判断を練習します。",
    },
    {
      kind: "paid",
      href: "https://note.com/ipa_quiz_ai/n/n47fb9d6b6fa2",
      label: "科目Bの進捗・品質を判断するオリジナル3問",
      source: "exam_ap_paid_project",
      account: "ipa_quiz_ai",
      description: "1,280円。無料部分で短縮策の例を確認できます。購入は任意です。進捗の数値、テスト範囲、対応策を練習します。",
    },
  ],
};

export function getNoteGuideSupplements(exam: ExamCode): readonly NoteGuideLink[] {
  const primary = getNoteGuideSupplement(exam);
  return primary ? [primary, ...(EXAM_NOTE_EXTRA_SUPPLEMENTS[exam] ?? [])] : EXAM_NOTE_EXTRA_SUPPLEMENTS[exam] ?? [];
}
