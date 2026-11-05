/** Only a positive delivery receipt is a successful support submission. */
export async function submitSupport(payload: unknown): Promise<string> {
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
  });
  const result = await response.json().catch(() => null);
  if (!response.ok || result?.ok !== true || result?.delivery !== "delivered" || typeof result?.receiptId !== "string") {
    throw new Error("運営への送信を確認できませんでした。入力内容は残っています。時間をおいて再送信してください。");
  }
  return result.receiptId;
}
