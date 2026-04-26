import type { Metadata } from "next";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "合格体験記・口コミ",
  description: "IPA Quiz を使って合格したユーザーの体験記・口コミをご紹介します。",
};

const TESTIMONIALS = [
  {
    name: "Y.T.",
    exam: "応用情報技術者",
    score: 5,
    result: "一発合格",
    period: "3ヶ月",
    text: "AIコパイロットが常駐しているのが最高でした。分からない問題に出会っても、その場で「なぜこの選択肢が正解なのか」を深掘り質問できるので、理解が格段に深まりました。毎日通勤時間に10問解くだけで正答率が80%を超えるようになりました。",
  },
  {
    name: "K.M.",
    exam: "基本情報技術者",
    score: 5,
    result: "一発合格",
    period: "2ヶ月",
    text: "スマホ片手でサクサク解けるUI設計が気に入っています。解答後すぐに解説が出てくる「ゼロ遷移」の使いやすさで、隙間時間に集中して勉強できました。復習モードで苦手分野だけを繰り返せるのも効果的でした。",
  },
  {
    name: "S.H.",
    exam: "情報セキュリティマネジメント",
    score: 4,
    result: "合格",
    period: "1.5ヶ月",
    text: "他のサービスより圧倒的にUIがスマートです。ダークモードも対応していて夜間の学習が目に優しい。AIの解説はときどきやや長いですが、全体的に非常に満足しています。",
  },
  {
    name: "T.N.",
    exam: "応用情報技術者",
    score: 5,
    result: "一発合格",
    period: "4ヶ月",
    text: "分野別モードで苦手なセキュリティ・ネットワーク分野を集中特訓できました。AIが類似問題の傾向まで教えてくれるので、本番でも応用が利きました。試験直前の総復習にも使い倒しました。",
  },
  {
    name: "M.O.",
    exam: "ITパスポート",
    score: 5,
    result: "高得点合格",
    period: "3週間",
    text: "ITパスポートの問題数が多くて驚きました。ランダムモードで毎日やり続けたら3週間で正答率90%超えました。全機能無料で使えるのも嬉しいポイントです。",
  },
];

export default function TestimonialsPage() {
  const avg = (TESTIMONIALS.reduce((s, t) => s + t.score, 0) / TESTIMONIALS.length).toFixed(1);

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 pb-10 pt-8 sm:px-6">
      <div className="mb-6">
        <Badge variant="success" className="mb-2">合格体験記</Badge>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl">
          ユーザーの声
        </h1>
        <div className="mt-2 flex items-center gap-2">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${i < 4 ? "fill-amber-400 text-amber-400" : "fill-amber-200 text-amber-200"}`}
              />
            ))}
          </div>
          <span className="text-lg font-bold text-zinc-800 dark:text-zinc-100">{avg} / 5.0</span>
          <span className="text-sm text-zinc-500">（{TESTIMONIALS.length}件のレビュー）</span>
        </div>
      </div>

      <div className="space-y-4">
        {TESTIMONIALS.map((t, i) => (
          <Card key={i}>
            <CardContent className="p-5">
              <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-zinc-800 dark:text-zinc-100">{t.name}</span>
                    <Badge variant="outline">{t.exam}</Badge>
                  </div>
                  <div className="mt-0.5 flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                    <span>学習期間: {t.period}</span>
                    <span>·</span>
                    <span className="text-emerald-600 font-medium dark:text-emerald-400">{t.result}</span>
                  </div>
                </div>
                <div className="flex">
                  {Array.from({ length: t.score }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
              <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                {t.text}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <p className="mt-6 text-center text-xs text-zinc-400 dark:text-zinc-600">
        ※ 掲載の体験記は個人の感想です。試験合格を保証するものではありません。
      </p>
    </main>
  );
}
