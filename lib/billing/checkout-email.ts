import "server-only";

/** The signed-in address, used only to prefill Stripe Checkout. Absent or unreadable is fine. */
export async function checkoutEmail(): Promise<string | undefined> {
  try {
    const { auth } = await import("@/lib/auth");
    const email = (await auth())?.user?.email;
    return typeof email === "string" && /^[^\s@]{1,64}@[^\s@]{1,190}$/.test(email) ? email : undefined;
  } catch { return undefined; }
}
