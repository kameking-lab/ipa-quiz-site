import Link from "next/link";

/** Shared footer has no question/exam context: keep the source line generic and short. */
export function SourceRelationshipFooter() {
  return <p className="mt-6 border-t border-border pt-4 text-center text-[11px] text-muted-foreground sm:text-left">
    出典: IPA 情報処理技術者試験ほか各試験実施機関の公開過去問 · <Link href="/license" className="underline decoration-border hover:text-foreground">著作権・出典</Link>
  </p>;
}
