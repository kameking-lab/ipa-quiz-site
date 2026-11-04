import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    reviewVersion?: string;
    authenticatedAt?: number;
    user: {
      id: string;
      plan: "free" | "premium" | "team";
    } & DefaultSession["user"];
  }

  interface User {
    plan?: "free" | "premium" | "team";
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    plan?: "free" | "premium" | "team";
  }
}
