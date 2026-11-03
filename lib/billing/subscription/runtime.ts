import "server-only";
import { prisma } from "@/lib/db/prisma";
import { BillingError } from "../domain";
import type { SqlSession } from "../postgres-store";
import { monthlyConfig } from "./config";
import { MonthlyService } from "./service";
import { PostgresMonthlyStore } from "./store";
import { StripeMonthlyProvider } from "./stripe";

export function monthlyRuntime(requireSales = false) {
  const config = monthlyConfig();
  if (!process.env.DATABASE_URL || requireSales && !config.enabled) throw new BillingError("billing_unavailable", 503);
  const session = (client: Pick<typeof prisma, "$queryRawUnsafe">): SqlSession => ({ query: (sql, values) => client.$queryRawUnsafe(sql, ...values) });
  const store = new PostgresMonthlyStore({ ...session(prisma),
    transaction: fn => prisma.$transaction(tx => fn(session(tx)), { maxWait: 5000, timeout: 60000 }),
  }, config.sourceInstance);
  const key = (config.mode === "stripe-live" ? process.env.BILLING_STRIPE_LIVE_SECRET_KEY : process.env.BILLING_STRIPE_TEST_SECRET_KEY) ?? "";
  return { config, store, service: new MonthlyService(store, config), provider: new StripeMonthlyProvider(config, key) };
}
