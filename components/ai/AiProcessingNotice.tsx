import Link from "next/link";

export function AiProcessingNotice() {
  return (
    <p className="text-xs leading-relaxed text-muted-foreground">
      Google Geminiで処理します · <Link href="/privacy#2" className="underline underline-offset-2">プライバシーポリシー</Link>
    </p>
  );
}
