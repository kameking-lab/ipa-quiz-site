import type { Metadata } from "next";
import Link from "next/link";
import { PUBLISHED_SENTAKU, SENTAKU_EDITIONS, getSentakuEdition, sentakuPath } from "@/lib/sharoushi/sentaku";
export const metadata:Metadata={title:"社労士 選択式の過去問",alternates:{canonical:"/sharoushi/sentaku"}};
export default function Page(){return <main className="mx-auto max-w-3xl px-4 py-8"><Link href="/sharoushi" className="text-primary underline">社労士の過去問へ</Link><h1 className="mt-6 text-3xl font-bold">選択式の過去問</h1><p className="mt-4 leading-8">第58・57回の選択式を、1科目1原問・5空欄の形式で読めます。掲載中は{PUBLISHED_SENTAKU.length}原問・{PUBLISHED_SENTAKU.length*5}空欄です。両回の全16原問のうち確認済みの問題を掲載しています。</p><ul className="mt-6 divide-y divide-border">{SENTAKU_EDITIONS.map(year=><li key={year}><Link href={sentakuPath(year)} className="block py-5 text-primary underline">第{Number(year)-1968}回（{year}年度） 選択式 — {getSentakuEdition(year).length}/8原問</Link></li>)}</ul></main>;}
