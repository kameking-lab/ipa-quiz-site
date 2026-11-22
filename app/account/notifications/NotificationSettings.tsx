import { Mail } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export function NotificationSettings() {
  return <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2 text-base"><Mail className="size-4" aria-hidden="true" />メール通知</CardTitle>
      <CardDescription>定期メールの登録受付は終了しました。</CardDescription>
    </CardHeader>
  </Card>;
}
