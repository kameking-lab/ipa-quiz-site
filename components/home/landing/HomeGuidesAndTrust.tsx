import { NOTE_CATALOG_URL } from "@/lib/note-catalog";
import Link from "next/link";
import { ShieldCheck, UserRound } from "lucide-react";







export function HomeNoteGuides() {
  return <section className="mt-10 rounded-2xl border border-border p-4"><h2 className="text-lg font-bold">資格の記事を探す</h2><p className="mt-2 text-sm text-muted-foreground">運営者3アカウントのnote記事をまとめて検索（PR）</p><a href={NOTE_CATALOG_URL} className="mt-3 inline-flex min-h-11 items-center font-semibold text-primary underline">サムネイルで記事を選ぶ →</a></section>;
}

const TRUST_LINKS = [
  { href: "/operator", label: "運営者情報", icon: UserRound },
  { href: "/transparency", label: "運営の透明性レポート", icon: ShieldCheck },
] as const;

export function HomeTrust() {
  return (
    <section aria-labelledby="home-trust-title" className="mt-10">
      <h2 id="home-trust-title" className="mb-2 text-lg font-bold sm:text-xl">過去問AIについて</h2>
      <p className="text-sm leading-7 text-muted-foreground">
        問題は、試験実施機関が公式に公開した過去問です。解説は学習支援用に作成したもので、試験実施機関による公式解説ではありません。各問題から公式問題と公式正答を確認できます。
      </p>
      <ul className="mt-3 flex flex-wrap gap-2">
        {TRUST_LINKS.map(({ href, label, icon: Icon }) => (
          <li key={href}>
            <Link
              href={href}
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border bg-card px-4 text-sm font-medium hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <Icon className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
