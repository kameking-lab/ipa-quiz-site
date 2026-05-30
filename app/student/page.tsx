import type { Metadata } from "next";
import Link from "next/link";
import { GraduationCap, Building2, ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StudentIdUpload } from "./StudentIdUpload";

export const metadata: Metadata = {
  title: "学割プラン",
  description:
    "IPA Quiz の学割プラン。通常月額の50%OFF、月150円で AI コパイロット無制限。学生証を提出するだけで申請完了。学校・教育機関向け一括導入もご相談ください。",
  alternates: { canonical: "/student" },
};

const FAQ_ITEMS = [
  {
    q: "対象となる学生は？",
    a: "大学・大学院・短大・高専・専門学校・高校に在学中の方が対象です。在学証明書または学生証で確認します。",
  },
  {
    q: "申請から承認までどれくらいかかりますか？",
    a: "通常1〜3営業日で審査します。承認後はメールにてお知らせします。",
  },
  {
    q: "卒業後はどうなりますか？",
    a: "卒業・修了後は翌月から通常価格（月300円）に移行します。更新の際に学生証を再提出いただく場合があります。",
  },
  {
    q: "学割は何年間有効ですか？",
    a: "在籍期間中は継続して学割が適用されます。年1回の在籍確認をお願いする場合があります。",
  },
  {
    q: "学校名義での一括契約はできますか？",
    a: "教育機関向けの一括導入プランも用意しています。ページ下部のフォームからお問い合わせください。",
  },
];

export default function StudentPage() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 pb-12 pt-8 sm:px-6">
      {/* Hero */}
      <section className="mb-10 text-center">
        <div className="mb-3 flex justify-center">
          <Badge variant="success">学割プラン</Badge>
        </div>
        <h1 className="mb-3 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
          学生は<span className="text-sky-600 dark:text-sky-400"> 50% OFF</span>
        </h1>
        <p className="mb-6 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-base">
          通常月300円 → <strong className="text-zinc-900 dark:text-zinc-50">月150円</strong>。
          在学中はずっと学割価格で AI コパイロット無制限が使えます。
        </p>

        {/* Price comparison */}
        <div className="mx-auto mb-6 grid max-w-sm grid-cols-2 gap-3">
          <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 text-center dark:border-zinc-800 dark:bg-zinc-900/40">
            <p className="text-xs text-zinc-500 dark:text-zinc-400">通常プラン</p>
            <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
              ¥300<span className="text-sm font-normal text-zinc-500">/月</span>
            </p>
          </div>
          <div className="rounded-2xl border-2 border-sky-400 bg-sky-50/60 p-4 text-center ring-2 ring-sky-200/60 dark:border-sky-500 dark:bg-sky-950/20 dark:ring-sky-800/40">
            <p className="text-xs font-semibold text-sky-700 dark:text-sky-300">学割プラン</p>
            <p className="text-2xl font-bold text-sky-700 dark:text-sky-300">
              ¥150<span className="text-sm font-normal">/月</span>
            </p>
            <Badge variant="success" className="mt-1 text-[10px]">50% OFF</Badge>
          </div>
        </div>

        <Button
          asChild
          variant="primary"
          size="lg"
          className="shadow-lg transition-transform active:scale-95 hover:scale-[1.01]"
          data-track="student-cta-apply"
        >
          <a href="#apply">学割を申請する</a>
        </Button>
      </section>

      {/* Features */}
      <section className="mb-10">
        <h2 className="mb-4 text-lg font-bold text-zinc-900 dark:text-zinc-50">
          学割プランに含まれるもの
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {[
            { title: "AI コパイロット無制限", desc: "1日回数制限なし。類題生成・誤答分析・学習プランをフル活用。" },
            { title: "Gemini Flash 高精度モード", desc: "無料プランより高精度な AI モデルで詳しい解説を取得。" },
            { title: "全13試験区分アクセス", desc: "IP/SG/FE/AP/ST/SA/PM/NW/DB/ES/SC/SM/AU すべて対応。" },
            { title: "広告非表示", desc: "学習に集中できるクリーンな UI。バナー広告は表示されません。" },
            { title: "学習履歴クラウド同期", desc: "複数端末で学習履歴を共有。どのデバイスからでも続きから再開。" },
            { title: "模試モード（近日公開）", desc: "本番さながらの時間制限付き模擬試験。弱点分析レポート付き。" },
          ].map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900/40"
            >
              <h3 className="mb-1 text-sm font-semibold text-zinc-900 dark:text-zinc-100 before:mr-1.5 before:text-sky-500 before:content-['✓']">
                {f.title}
              </h3>
              <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Apply form */}
      <Card id="apply" className="mb-10 scroll-mt-20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <GraduationCap className="h-4 w-4 text-sky-600 dark:text-sky-400" />
            学割申請（近日公開）
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">
            学生証または在学証明書をアップロードして申請してください。審査後（1〜3営業日）に承認メールをお送りします。
          </p>
          <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50/60 px-4 py-3 text-xs text-amber-800 dark:border-amber-900/40 dark:bg-amber-950/20 dark:text-amber-200">
            ※ 学割申請機能は正式リリース（2026年5月）から有効になります。現在は申請フォームのプレビューです。
          </div>
          <StudentIdUpload />
        </CardContent>
      </Card>

      {/* Institution plan */}
      <Card className="mb-10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Building2 className="h-4 w-4 text-sky-600 dark:text-sky-400" />
            学校・教育機関向け一括導入
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">
            大学・専門学校・研修機関向けに、学生・受講生への一括提供プランをご用意しています。
          </p>
          <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              { label: "10名〜", price: "月 ¥1,200〜", desc: "小規模クラス・ゼミ向け" },
              { label: "50名〜", price: "月 ¥5,000〜", desc: "学科・コース単位" },
              { label: "200名〜", price: "要相談", desc: "大学・学部単位、請求書払い" },
            ].map((t) => (
              <div
                key={t.label}
                className="rounded-xl border border-zinc-200 bg-zinc-50/60 p-3 text-center dark:border-zinc-700 dark:bg-zinc-900/40"
              >
                <p className="text-xs text-zinc-500 dark:text-zinc-400">{t.label}</p>
                <p className="text-base font-bold text-zinc-900 dark:text-zinc-50">{t.price}</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">{t.desc}</p>
              </div>
            ))}
          </div>
          <Button
            asChild
            variant="outline"
            size="md"
            className="w-full transition-transform active:scale-95"
            data-track="student-institution-inquiry"
          >
            <a href="mailto:info@kakomon-ai.jp">一括導入のお問い合わせ</a>
          </Button>
        </CardContent>
      </Card>

      {/* FAQ */}
      <section className="mb-10">
        <h2 className="mb-4 text-lg font-bold text-zinc-900 dark:text-zinc-50">よくある質問</h2>
        <div className="space-y-3">
          {FAQ_ITEMS.map((item) => (
            <details
              key={item.q}
              className="group rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/40"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-3 px-4 py-3 text-sm font-semibold text-zinc-900 dark:text-zinc-100 [&::-webkit-details-marker]:hidden">
                {item.q}
                <ChevronDown className="h-4 w-4 shrink-0 text-zinc-400 transition-transform group-open:rotate-180" />
              </summary>
              <div className="border-t border-zinc-100 px-4 py-3 text-sm leading-relaxed text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">
                {item.a}
              </div>
            </details>
          ))}
        </div>
      </section>

      <div className="text-center">
        <Link
          href="/about"
          className="text-sm text-sky-600 underline-offset-2 hover:underline dark:text-sky-400"
        >
          ← プロジェクトについて
        </Link>
      </div>
    </main>
  );
}
