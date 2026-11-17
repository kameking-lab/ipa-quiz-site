"use client";

import * as React from "react";
import Link from "next/link";
import { Copy, ExternalLink, Eye, EyeOff, Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  appendApiKey,
  deleteApiKey,
  generateApiKey,
  readApiKeys,
} from "@/lib/api-keys/storage";
import type { ApiKey } from "@/lib/api-keys/types";
import { SITE_BASE_URL } from "@/lib/seo/config";

export function ApiKeysClient() {
  const [keys, setKeys] = React.useState<ApiKey[]>([]);
  const [showName, setShowName] = React.useState("");
  const [revealId, setRevealId] = React.useState<string | null>(null);
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  React.useEffect(() => {
    setKeys(readApiKeys());
  }, []);

  function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    const name = showName.trim() || `API Key ${keys.length + 1}`;
    const k = generateApiKey(name);
    setKeys(appendApiKey(k));
    setShowName("");
    setRevealId(k.id);
  }

  function handleDelete(id: string) {
    if (!confirm("このキーを削除しますか？削除後は復元できません。")) return;
    setKeys(deleteApiKey(id));
  }

  async function handleCopy(id: string, secret: string) {
    try {
      await navigator.clipboard.writeText(secret);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1500);
    } catch {
      // ignore
    }
  }

  return (
    <section aria-labelledby="api-keys-title">
      <header className="mb-8">
        <h1 id="api-keys-title" className="text-balance text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          API キー
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          β版のキーはこのブラウザに保存され、レート制限の識別に使われます。サーバーでの署名検証は行われません。
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button asChild variant="outline" size="sm">
            <Link href="/api-docs">
              API ドキュメント
              <ExternalLink className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </header>

      <Card className="mb-8 border-primary/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Plus className="h-4 w-4" />
            新しいキーを発行
          </CardTitle>
          <CardDescription>
            最大5件まで保存できます。
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleCreate}
            className="flex flex-col gap-3 sm:flex-row sm:items-end"
          >
            <label className="flex flex-1 flex-col gap-1 text-sm">
              <span className="font-medium text-foreground">キー名（任意）</span>
              <input
                type="text"
                className="h-10 rounded-lg border border-border bg-background px-3 text-sm"
                placeholder="例: 社内研修ボット"
                value={showName}
                maxLength={60}
                onChange={(e) => setShowName(e.target.value)}
              />
            </label>
            <Button
              type="submit"
              variant="primary"
              size="md"
              disabled={keys.length >= 5}
            >
              <Plus className="h-4 w-4" />
              発行する
            </Button>
          </form>
          {keys.length >= 5 && (
            <p className="mt-2 text-xs text-muted-foreground">
              キーの保存上限（5 件）に達しました。新規発行するには既存キーを削除してください。
            </p>
          )}
        </CardContent>
      </Card>

      <section className="mb-4">
        <h2 className="text-sm font-semibold text-foreground">登録済みキー（{keys.length}）</h2>
      </section>

      {keys.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center text-sm text-muted-foreground">
            登録済みのキーはありません。
          </CardContent>
        </Card>
      ) : (
        <ul className="flex flex-col gap-3">
          {keys.map((k) => {
            const revealed = revealId === k.id;
            const masked = `${k.prefix}${"•".repeat(20)}${k.secret.slice(-4)}`;
            return (
              <li key={k.id}>
                <Card>
                  <CardContent className="p-5">
                    <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                      <div className="min-w-0">
                        <div className="text-base font-semibold text-foreground">{k.name}</div>
                        <div className="text-xs text-muted-foreground">
                          発行: {formatDate(k.createdAt)}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleDelete(k.id)}
                        className="inline-flex items-center gap-1 rounded-md border border-border bg-background px-2 py-1 text-xs text-destructive hover:bg-muted"
                      >
                        <Trash2 className="h-3 w-3" />
                        削除
                      </button>
                    </div>

                    <div className="mt-3 flex flex-wrap items-center gap-2 rounded-xl border border-border bg-muted/40 p-3">
                      <code className="flex-1 break-all font-mono text-xs text-foreground">
                        {revealed ? k.secret : masked}
                      </code>
                      <button
                        type="button"
                        onClick={() => setRevealId(revealed ? null : k.id)}
                        className="inline-flex items-center gap-1 rounded-md border border-border bg-background px-2 py-1 text-xs text-foreground hover:bg-muted"
                      >
                        {revealed ? (
                          <>
                            <EyeOff className="h-3 w-3" />
                            隠す
                          </>
                        ) : (
                          <>
                            <Eye className="h-3 w-3" />
                            表示
                          </>
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleCopy(k.id, k.secret)}
                        className="inline-flex items-center gap-1 rounded-md border border-border bg-background px-2 py-1 text-xs text-foreground hover:bg-muted"
                      >
                        <Copy className="h-3 w-3" />
                        {copiedId === k.id ? "コピー済" : "コピー"}
                      </button>
                    </div>

                    <pre className="mt-3 overflow-x-auto rounded-lg bg-muted/30 p-3 text-[11px] leading-relaxed text-muted-foreground">
                      <code>{`curl ${SITE_BASE_URL}/api/v1/exams \\
  -H "Authorization: Bearer ${revealed ? k.secret : "<your-key>"}"`}</code>
                    </pre>
                  </CardContent>
                </Card>
              </li>
            );
          })}
        </ul>
      )}


      {/* コピー成功はボタン文言が「コピー済」へ変わるだけでは SR に告知され
          ない(WCAG 4.1.3)。polite live region で告知する。 */}
      <span role="status" aria-live="polite" className="sr-only">
        {copiedId ? "API キーをコピーしました" : ""}
      </span>
    </section>
  );
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "-";
  return `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, "0")}/${String(d.getDate()).padStart(2, "0")}`;
}
