import Link from "next/link";

export function QualificationGroupOptions({ name, selectLabel, options, backHref, backLabel }: {
  name: string;
  selectLabel: string;
  options: readonly { item: { key: string; href: string }; label: string }[];
  backHref: string;
  backLabel: string;
}) {
  return <main className="mx-auto w-full max-w-[640px] flex-1 px-4 pb-10 pt-6 sm:px-6">
    <Link href={backHref} className="inline-flex min-h-11 items-center text-sm text-muted-foreground hover:underline">← {backLabel}</Link>
    <h1 className="mt-2 text-2xl font-bold tracking-tight">{name}</h1>
    <p className="mb-4 mt-2 text-sm text-muted-foreground">{selectLabel}を選んでください。</p>
    <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3">
      {options.map(({ item, label }) => <li key={item.key} className="min-w-0">
        <Link href={item.href} prefetch={false} className="flex h-full min-h-11 items-center justify-center rounded-lg border border-border bg-card px-2 py-2 text-center text-sm font-medium break-words hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
          {label}
        </Link>
      </li>)}
    </ul>
  </main>;
}
