import Link from "next/link";
import { FileEdit, ArrowRight } from "lucide-react";

// 旗艦導線（午後論述 AI 採点）をホームの高オーソリティ面から一目で出すための
// サーバーコンポーネント。SSR HTML に含まれるため、トップページから flagship
// /essay へのクローラブルな内部リンクにもなる（ヘッダのドロップダウンは
// クライアント描画でSSRに出ないため、ホーム側で確実に露出させる）。
// 採点対象は実データのある論文区分（ST/SA/PM/SM/AU）のみを記載し、誇大表現を避ける。
export function HomeFlagshipEssay() {
  return (
    <section className="mb-6" aria-label="午後論述 AI 採点">
      <Link
        href="/essay"
        className="group block rounded-2xl border border-sky-200 bg-gradient-to-br from-sky-50 to-white p-5 transition hover:border-sky-300 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:border-sky-900/60 dark:from-sky-950/40 dark:to-zinc-950"
      >
        <div className="flex items-start gap-3">
          <span className="rounded-xl bg-sky-100 p-2 text-sky-700 dark:bg-sky-950/60 dark:text-sky-300">
            <FileEdit className="h-5 w-5" aria-hidden="true" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-sky-700 dark:text-sky-300">
              高度試験の合否は午後で決まる
            </p>
            <h2 className="mt-0.5 text-lg font-bold text-zinc-900 dark:text-zinc-50">
              あなたの午後論述を AI が採点
            </h2>
            <p className="mt-1.5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              ST・SA・PM・SM・AU の午後 II 論述を、IPA 元採点者プロンプトで
              「適合度・論理性・具体性・業種事例」の 4 軸採点。過去問は解くだけで終わらせず、
              受かるまで添削で導きます（AI 採点は学習用の参考評価です）。
            </p>
            <span className="mt-2.5 inline-flex items-center gap-1 text-sm font-semibold text-sky-700 group-hover:gap-1.5 dark:text-sky-300">
              午後論述 AI 採点を試す
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </span>
          </div>
        </div>
      </Link>
    </section>
  );
}
