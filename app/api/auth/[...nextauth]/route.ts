// NextAuth.js v5 Route Handler
import { handlers } from "@/lib/auth";

export const runtime = "nodejs";
export const { GET, POST } = handlers;
