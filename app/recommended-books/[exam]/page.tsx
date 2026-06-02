import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, BookOpen, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  RECOMMENDED_BOOKS,
  buildAmazonUrl,
  buildRakutenUrl,
  getDifficultyLabel,
  isAsinFilled,
  isRakutenIdFilled,
  type RecommendedBook,
} from "@/data/recommended-books";
import type { ExamCode } from "@/lib/questions/types";
import { EXAM_LABELS, examLabel } from "@/lib/utils";
import { SITE_BASE_URL, SITE_NAME } from "@/lib/seo/config";

export const dynamicParams = false;

const EXAM_CODES: ExamCode[] = [
  "ip",
  "sg",
  "fe",
  "ap",
  "st",
  "sa",
  "pm",
  "nw",
  "db",
  "es",
  "sc",
  "sm",
  "au",
];

const EXAM_INTROS: Record<ExamCode, string> = {
  ip: "ITパスポート(IP)はIT基礎教養を問う入門区分。IT未経験の社会人・学生でも、市販テキスト＋過去問演習だけで十分合格を狙えます。",
  sg: "情報セキュリティマネジメント(SG)は管理者・利用者向けセキュリティ区分。法務・組織論まで幅広く問われるため、網羅的なテキストが効きます。",
  fe: "基本情報技術者(FE)はITエンジニアの登竜門。新試験で科目B（旧午後）の擬似言語比重が増えたため、アルゴリズム特化本との併用がおすすめ。",
  ap: "応用情報技術者(AP)は中級者向けの広範囲試験。午前・午後ともに問題量・難度が一段上がるので、教科書系＋過去問＋午後重点対策の三段構えが定石。",
  sc: "情報処理安全確保支援士(SC)はセキュリティ高度試験。午後事例の読解力勝負で、定番の上原本＋午後重点対策本＋過去問演習が王道ルート。",
  nw: "ネットワークスペシャリスト(NW)は高度試験の最難関級。プロトコル挙動の本質理解が問われるため、教科書だけでなく挙動解説本との併用が効果的。",
  db: "データベーススペシャリスト(DB)は高度試験の中でも実務直結度が高い区分。概念データモデル(ERD)と高度SQLが要で、午後重点対策本が活きます。",
  es: "エンベデッドシステムスペシャリスト(ES)は組込み向け高度試験。教材数が少ないため、定番教科書＋午後重点対策本でしっかり押さえる必要があります。",
  st: "ITストラテジスト(ST)は経営寄りの高度試験。論文（午後II）対策が合否を決めるため、論文事例集を必ず用意しましょう。",
  sa: "システムアーキテクト(SA)はシステム設計者向けの高度試験。要件定義・方式設計の語彙と、論文の型を仕込めるかが鍵。",
  pm: "プロジェクトマネージャ(PM)はプロジェクト統括者向けの高度試験。PMBOK整理＋IPA特有の出題パターン＋論文事例の三本柱で対策します。",
  sm: "ITサービスマネージャ(SM)はITIL系の運用マネジメント区分。インシデント・問題・変更管理の引き出しを論文に落とせるかが勝負。",
  au: "システム監査技術者(AU)は監査人視点の高度試験。論述では一貫した監査人の立場を貫く必要があり、論文事例集での型作りが必須。",
};

interface RouteParams {
  exam: string;
}

export async function generateStaticParams(): Promise<RouteParams[]> {
  return EXAM_CODES.map((exam) => ({ exam }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { exam } = await params;
  const code = exam as ExamCode;
  if (!EXAM_CODES.includes(code)) {
    return { title: "試験区分が見つかりません", robots: { index: false } };
  }
  const label = EXAM_LABELS[code];
  const title = `【${label}】おすすめ問題集`;
  const ogTitle = `${title} | 過去問AI`;
  const description = `${label}試験の定番問題集・参考書をAIが厳選。教科書・過去問・午後対策・論文事例まで段階別に紹介し、過去問AIと組み合わせた最短学習ルートを提案します。`;
  const ogParams = new URLSearchParams({
    type: "books",
    title: `${label} おすすめ問題集`,
    subtitle: `${label} の定番テキスト`,
    body: description,
  });
  const ogImageUrl = `${SITE_BASE_URL}/api/og?${ogParams.toString()}`;
  return {
    title,
    description,
    alternates: { canonical: `/recommended-books/${exam}` },
    openGraph: {
      title: ogTitle,
      description,
      url: `${SITE_BASE_URL}/recommended-books/${exam}`,
      type: "website",
      siteName: SITE_NAME,
      locale: "ja_JP",
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: ogTitle }],
    },
    twitter: { card: "summary_large_image", title: ogTitle, description, images: [ogImageUrl] },
  };
}

export default async function RecommendedBooksExamPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { exam } = await params;
  const code = exam as ExamCode;
  if (!EXAM_CODES.includes(code)) notFound();

  const books = RECOMMENDED_BOOKS[code] ?? [];
  const label = examLabel(code);
  const intro = EXAM_INTROS[code];
  const absUrl = `${SITE_BASE_URL}/recommended-books/${exam}`;

  const productOgUrl = (book: RecommendedBook) => {
    const params = new URLSearchParams({
      type: "books",
      title: book.title,
      subtitle: `${book.author} / ${book.publisher}`,
      body: book.description.slice(0, 120),
    });
    return `${SITE_BASE_URL}/api/og?${params.toString()}`;
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ItemList",
        name: `${label} おすすめ問題集`,
        url: absUrl,
        itemListElement: books.map((book, index) => {
          const productUrl = isAsinFilled(book.asin)
            ? buildAmazonUrl(book.asin)
            : `${absUrl}#${book.id}`;
          const product: Record<string, unknown> = {
            "@type": "Product",
            "@id": `${absUrl}#${book.id}`,
            name: book.title,
            brand: { "@type": "Brand", name: book.publisher },
            description: book.description,
            image: productOgUrl(book),
            url: productUrl,
            category: `${label} 学習教材`,
            offers: {
              "@type": "Offer",
              availability: "https://schema.org/InStock",
              url: productUrl,
              priceCurrency: "JPY",
              seller: { "@type": "Organization", name: "Amazon" },
            },
          };
          if (book.author) {
            product.author = { "@type": "Person", name: book.author };
          }
          if (isAsinFilled(book.asin)) {
            product.isbn = book.asin;
          }
          return {
            "@type": "ListItem",
            position: index + 1,
            item: product,
          };
        }),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "ホーム", item: SITE_BASE_URL },
          {
            "@type": "ListItem",
            position: 2,
            name: "おすすめ問題集",
            item: `${SITE_BASE_URL}/recommended-books`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: label,
            item: absUrl,
          },
        ],
      },
    ],
  };

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 pb-12 pt-6 sm:px-6">
      <JsonLd data={jsonLd} />

      <Button asChild variant="ghost" size="sm" className="mb-3">
        <Link href="/recommended-books">
          <ArrowLeft className="h-4 w-4" />
          試験区分一覧へ
        </Link>
      </Button>

      <nav aria-label="パンくずリスト" className="mb-4 text-xs text-zinc-500 dark:text-zinc-400">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link href="/" className="hover:underline">
              ホーム
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/recommended-books" className="hover:underline">
              おすすめ問題集
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-zinc-700 dark:text-zinc-300">
            {label}
          </li>
        </ol>
      </nav>

      <header className="mb-6">
        <div className="mb-2 flex items-center gap-2">
          <span className="rounded-lg bg-amber-100 p-2 text-amber-700 dark:bg-amber-950 dark:text-amber-300">
            <BookOpen className="h-5 w-5" />
          </span>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            【{label}】おすすめ問題集
          </h1>
        </div>
        <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">{intro}</p>
        <div className="mt-3 flex flex-wrap gap-2 text-xs">
          <Badge variant="outline">{books.length}冊掲載</Badge>
          <Badge variant="outline">AI推薦</Badge>
          <Badge variant="success">過去問AIと併用推奨</Badge>
        </div>
      </header>

      <section aria-label="推薦書籍" className="mb-10">
        <h2 className="mb-3 text-lg font-bold">推薦書籍</h2>
        <div className="flex flex-col gap-4">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>

      <section
        aria-label="書籍比較"
        className="mb-10 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950"
      >
        <h2 className="mb-3 text-lg font-bold">書籍の使い分け</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-zinc-200 text-left dark:border-zinc-800">
                <th scope="col" className="py-2 pr-3 font-semibold">タイトル</th>
                <th scope="col" className="py-2 pr-3 font-semibold">難度</th>
                <th scope="col" className="py-2 font-semibold">こんな人におすすめ</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr
                  key={book.id}
                  className="border-b border-zinc-100 last:border-0 dark:border-zinc-900"
                >
                  <th scope="row" className="py-2 pr-3 text-left font-medium">{book.title}</th>
                  <td className="py-2 pr-3">
                    <Badge
                      variant={
                        book.difficulty === "beginner"
                          ? "success"
                          : book.difficulty === "intermediate"
                            ? "default"
                            : "warn"
                      }
                    >
                      {getDifficultyLabel(book.difficulty)}
                    </Badge>
                  </td>
                  <td className="py-2 text-zinc-600 dark:text-zinc-400">
                    {book.recommendedFor}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section
        aria-label="学習プラン"
        className="mb-10 rounded-2xl border border-sky-200 bg-sky-50 p-4 dark:border-sky-900/50 dark:bg-sky-950/30"
      >
        <div className="mb-2 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-sky-600 dark:text-sky-300" />
          <h2 className="text-lg font-bold text-sky-900 dark:text-sky-100">
            この書籍と過去問AIを組み合わせるおすすめ学習プラン
          </h2>
        </div>
        <ol className="ml-5 list-decimal space-y-2 text-sm text-sky-900 dark:text-sky-100">
          <li>
            <strong>1〜2週間目：教科書一読。</strong>
            「{books[0]?.title ?? "教科書系の一冊"}」で全体像を一気に押さえます。完璧に覚える必要はなく、
            「どこに何が書いてあるか」のインデックスを作るイメージで進めましょう。
          </li>
          <li>
            <strong>3〜6週間目：過去問AIで分野別演習。</strong>
            <Link
              href={`/${exam}`}
              className="mx-1 underline decoration-sky-400 underline-offset-2 hover:text-sky-700 dark:hover:text-sky-200"
            >
              {label}の過去問
            </Link>
            を分野別モードで回し、間違えた問題はAIコパイロットに「この選択肢がなぜ違うのか」を質問。
            教科書で関連箇所を読み直して定着させます。
          </li>
          <li>
            <strong>7〜10週間目：弱点分野の重点対策。</strong>
            上の表で「{books.filter((b) => b.tags.some((t) => t.includes("午後") || t.includes("論文") || t.includes("重点対策")))[0]?.title ?? "重点対策本"}」のような分野特化本を使い、苦手領域だけ集中的に潰します。
          </li>
          <li>
            <strong>直前2週間：模試＋総復習。</strong>
            年度別モードで本番形式の通し演習を行い、ハンディ系の総まとめ本で抜けをチェック。
            過去問AIで間違えた問題をスター付きにしておき、復習モードで仕上げます。
          </li>
        </ol>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button asChild variant="primary" size="sm">
            <Link href={`/${exam}`}>{label}の過去問を解く</Link>
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link href={`/quiz?mode=random&exam=${exam}`}>ランダム出題で始める</Link>
          </Button>
        </div>
      </section>

      <section className="mb-8 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-xs leading-relaxed text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-200">
        <p className="font-semibold">アフィリエイトに関する表示</p>
        <p className="mt-1">
          本ページのリンクにはAmazon/楽天のアフィリエイトリンクが含まれます。
          ご購入いただいた場合、当サービス運営費の一部として収益が発生します。
          価格・在庫・最新版情報はリンク先の表示が最新です。
        </p>
      </section>
    </main>
  );
}

function BookCard({ book }: { book: RecommendedBook }) {
  const amazonReady = isAsinFilled(book.asin);
  const rakutenReady = isRakutenIdFilled(book.rakutenId);
  const amazonUrl = amazonReady ? buildAmazonUrl(book.asin) : null;
  const rakutenUrl = rakutenReady ? buildRakutenUrl(book.rakutenId) : null;

  return (
    <Card id={book.id} className="scroll-mt-20">
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <CardTitle>{book.title}</CardTitle>
          <Badge
            variant={
              book.difficulty === "beginner"
                ? "success"
                : book.difficulty === "intermediate"
                  ? "default"
                  : "warn"
            }
          >
            {getDifficultyLabel(book.difficulty)}
          </Badge>
        </div>
        <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
          {book.author} 著 / {book.publisher} / {book.year}年
        </p>
      </CardHeader>
      <CardContent>
        <p className="mb-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
          {book.description}
        </p>
        <div className="mb-3 flex flex-wrap gap-1.5">
          {book.tags.map((tag) => (
            <Badge key={tag} variant="outline">
              #{tag}
            </Badge>
          ))}
        </div>
        <p className="mb-3 text-xs text-zinc-500 dark:text-zinc-400">
          <span className="font-semibold">こんな人におすすめ：</span>
          {book.recommendedFor}
        </p>
        {(amazonUrl || rakutenUrl) ? (
          <div>
            <p className="mb-1.5 text-[10px] text-zinc-400 dark:text-zinc-500">
              PR（アフィリエイトリンク）
            </p>
            <div className="flex flex-wrap gap-2">
              {amazonUrl && (
                <Button asChild size="lg" variant="primary">
                  <a
                    href={amazonUrl}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                  >
                    Amazonで見る
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </Button>
              )}
              {rakutenUrl && (
                <Button asChild size="lg" variant="outline">
                  <a
                    href={rakutenUrl}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                  >
                    楽天で見る
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </Button>
              )}
            </div>
          </div>
        ) : (
          <p className="text-xs text-zinc-400 dark:text-zinc-500">
            ※ 購入リンク準備中
          </p>
        )}
      </CardContent>
    </Card>
  );
}
