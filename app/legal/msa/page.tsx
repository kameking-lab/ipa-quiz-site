import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "マスターサービス契約 (MSA) テンプレート",
  description:
    "過去問AI 法人向けマスターサービス契約 (Master Services Agreement) のテンプレート。サービス提供条件、知的財産、責任制限、解約条項などを公開。",
  alternates: { canonical: "/legal/msa" },
};

const SECTIONS: Array<{ no: string; title: string; body: string[] }> = [
  {
    no: "1",
    title: "定義",
    body: [
      "「サービス」とは、過去問AI（以下「当社」）が提供する SaaS 学習プラットフォームおよびその関連機能（AI コパイロット・午後 AI 採点・法人ダッシュボード等）を指す。",
      "「ユーザー」とは、本契約に基づき法人顧客（以下「お客様」）から付与された認証情報によりサービスにアクセスする個人を指す。",
      "「お客様データ」とは、ユーザーがサービスを通じて入力・送信する学習履歴・解答・論述等のデータをいう。",
    ],
  },
  {
    no: "2",
    title: "サービス提供および利用許諾",
    body: [
      "当社は本契約および注文書（Order Form）に従い、お客様に対しサービスの利用権を非独占的・譲渡不能・サブライセンス不可で許諾する。",
      "ユーザー数・利用機能・契約期間は注文書に記載のとおりとし、お客様は注文書に記載された範囲を超える利用をしてはならない。",
      "当社は事前通知の上、サービスの仕様・機能を改善・追加・変更することができる。重大な機能削減については 90 日前までに通知する。",
    ],
  },
  {
    no: "3",
    title: "料金および支払",
    body: [
      "お客様は注文書に記載された料金を、当社の請求書発行から 30 日以内に支払うものとする。",
      "支払遅延が発生した場合、当社は年率 14.6% の遅延損害金を請求できるとともに、書面通知の上サービスの一時停止を行うことができる。",
      "料金には消費税が含まれない。源泉徴収その他の公租公課はお客様の負担とする。",
    ],
  },
  {
    no: "4",
    title: "知的財産権",
    body: [
      "サービスおよびそのドキュメント、コンテンツ（解説・採点ロジック等）に関する知的財産権はすべて当社または当社のライセンサーに帰属する。",
      "お客様データの知的財産権はお客様に帰属し、当社は本契約に基づくサービス提供および機能改善のためにのみ利用する。",
      "問題本文・解答・採点講評等は IPA が公表する公式情報に基づく。出典は IPA であり、本契約はこれら IPA 著作物の権利を移転するものではない。",
    ],
  },
  {
    no: "5",
    title: "お客様データの取扱",
    body: [
      "当社はデータ処理委託契約（DPA）に従い、お客様データを善良な管理者の注意義務をもって取り扱う。詳細は別紙 DPA（/legal/dpa）参照。",
      "お客様データは AI モデル（Google Gemini 等）の学習には使用されない。詳細はサブプロセッサー契約に基づく。",
      "契約終了時、お客様の請求に基づき 30 日以内にお客様データの返却またはエクスポートを行い、その後 90 日以内に物理削除する。",
    ],
  },
  {
    no: "6",
    title: "サービスレベル (SLA)",
    body: [
      "当社は別紙 SLA（/legal/sla）に定める月次稼働率 99.9% を目標とし、未達月にはサービスクレジットを返金する。",
      "計画メンテナンスおよび不可抗力（DDoS 攻撃・上流通信障害等）はSLA 計算の対象外とする。",
      "SLA 違反に基づく救済は、本契約上の唯一かつ排他的な救済とし、お客様は他の損害賠償請求を行うことができない。",
    ],
  },
  {
    no: "7",
    title: "保証および免責",
    body: [
      "当社は本サービスを「現状有姿（AS IS）」で提供し、特定目的への適合性、正確性、完全性、および第三者権利非侵害について明示・黙示を問わず保証しない。",
      "AI による解説および採点は学習補助を目的とするものであり、実試験の合否を保証するものではない。",
      "本サービスの利用に基づく学習成果・試験結果に関し、当社は一切の責任を負わない。",
    ],
  },
  {
    no: "8",
    title: "責任制限",
    body: [
      "当社の責任は、本契約に基づき直接かつ通常生ずべき損害に限られ、その総額は当該事象発生前 12 ヶ月間にお客様が当社に支払った料金総額を上限とする。",
      "間接損害・特別損害・派生損害・逸失利益・データ損失・信用毀損については、当社は責任を負わない。",
      "前各項は、当社の故意または重大な過失に基づく損害には適用されない。",
    ],
  },
  {
    no: "9",
    title: "秘密保持",
    body: [
      "両当事者は本契約の履行過程で知り得た相手方の秘密情報を、相手方の事前の書面による同意なく第三者に開示してはならない。",
      "前項の義務は契約終了後 3 年間存続する。",
      "秘密情報のうち裁判所または規制当局の命令により開示が必要なものは、可能な限り事前に通知の上、開示の範囲を最小限とする。",
    ],
  },
  {
    no: "10",
    title: "契約期間および解約",
    body: [
      "本契約の有効期間は注文書に定める期間とし、満了 30 日前までに書面による反対の意思表示がない限り、同一条件で 1 年間自動更新される。",
      "重大な違反があった場合、相手方は 30 日の是正猶予期間を付与した上で本契約を解除することができる。",
      "お客様は注文書に基づく前払期間の残期間に対応する料金の払戻しを請求できない。ただし当社の重大な違反による解除の場合を除く。",
    ],
  },
  {
    no: "11",
    title: "準拠法および紛争解決",
    body: [
      "本契約は日本法を準拠法とする。",
      "本契約に関する紛争は東京地方裁判所を第一審の専属的合意管轄裁判所とする。",
    ],
  },
];

export default function MsaPage() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 pb-16 pt-6 sm:px-6">
      <Button asChild variant="ghost" size="sm" className="mb-3">
        <Link href="/">
          <ArrowLeft className="h-4 w-4" />
          戻る
        </Link>
      </Button>

      <header className="mb-6">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <Badge variant="outline">法人向け</Badge>
          <Badge variant="default">テンプレート v1.0</Badge>
        </div>
        <h1 className="mb-3 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
          マスターサービス契約 (MSA) テンプレート
        </h1>
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-base">
          過去問AI 法人パイロット / Team / Enterprise 契約のベースとなるマスターサービス契約のテンプレートです。
          実契約は本テンプレートをベースに、お客様の法務・調達要件と当社条件を反映した上で締結します。
          PDF 版・Word 版（編集可能）の発行は法人パイロット申込後に対応いたします。
        </p>
      </header>

      <Card className="mb-6 border-amber-300 bg-amber-50/40 dark:border-amber-800 dark:bg-amber-950/20">
        <CardContent className="p-4 text-xs leading-relaxed text-amber-900 dark:text-amber-100">
          <strong>本テンプレートの取扱:</strong>{" "}
          本ページは契約条文の概要を示すものであり、それ自体で当事者間の法的拘束力を発生させるものではありません。
          実際の契約締結時は、別途調印された注文書（Order Form）と本契約書面の組み合わせにより成立します。
        </CardContent>
      </Card>

      <article className="prose prose-sm dark:prose-invert max-w-none">
        {SECTIONS.map((s) => (
          <section key={s.no} className="mb-6">
            <h2 className="mb-2 text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              第 {s.no} 条　{s.title}
            </h2>
            <ol className="ml-5 list-decimal space-y-1.5 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
              {s.body.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ol>
          </section>
        ))}
      </article>

      <section className="mt-10">
        <Card className="border-sky-200 bg-sky-50/40 dark:border-sky-900/60 dark:bg-sky-950/20">
          <CardContent className="flex flex-wrap items-center justify-between gap-3 p-5">
            <div>
              <div className="mb-1 text-base font-bold text-zinc-900 dark:text-zinc-50">
                関連ドキュメント
              </div>
              <p className="text-sm text-zinc-700 dark:text-zinc-300">
                MSA 本文に加え、DPA / SLA / セキュリティ統制一覧をあわせてご確認ください。
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button asChild variant="outline" size="sm">
                <Link href="/legal/dpa">DPA</Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link href="/legal/sla">SLA</Link>
              </Button>
              <Button asChild variant="primary" size="sm">
                <Link href="/security">セキュリティ詳細</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
