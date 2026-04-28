"use client";

import * as React from "react";
import Link from "next/link";
import { Copy, ExternalLink, Eye, EyeOff, Key, Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  appendApiKey,
  deleteApiKey,
  generateApiKey,
  readApiKeys,
} from "@/lib/api-keys/storage";
import type { ApiKey } from "@/lib/api-keys/types";

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
    <main className="mx-auto w-full max-w-4xl flex-1 px-4 pb-16 pt-8 sm:px-6 sm:pt-10">
      <header className="mb-8">
        <div className="mb-3 flex items-center gap-1.5">
          <Badge variant="primary">
            <Key className="mr-1 h-3 w-3" />
            API キー管理
          </Badge>
        </div>
        <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          API キー
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          過去問AI Public API（β）で利用するキーを発行・管理できます。
          現在 β のためキーはお使いのブラウザにのみ保存され、サーバー側で署名検証は行われません。
          キーは Bearer トークンとしてレート制限の識別子に使われ、IP 単位ではなくキー単位の上限が適用されます。
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
            キー名は識別用のメモです（例: 「社内研修ボット」「教材自動生成」）。最大 5 件まで保存できます。
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
            まだキーが登録されていません。上のフォームから発行してください。
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
                      <code>{`curl https://kakomon-ai.jp/api/v1/exams \\
  -H "Authorization: Bearer ${revealed ? k.secret : "<your-key>"}"`}</code>
                    </pre>
                  </CardContent>
                </Card>
              </li>
            );
          })}
        </ul>
      )}

      <p className="mt-10 text-xs text-muted-foreground">
        ※ β 版のため、キーはブラウザ localStorage に保存されます。端末を切り替える際は再発行してください。
        将来的にはアカウント連携（Google/GitHub ログイン）でクラウド保存に対応予定です。
      </p>
    </main>
  );
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "-";
  return `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, "0")}/${String(d.getDate()).padStart(2, "0")}`;
}
