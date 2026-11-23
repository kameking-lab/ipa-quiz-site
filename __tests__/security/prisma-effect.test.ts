// @vitest-environment node
import { createRequire } from "node:module";
import { defineConfig } from "prisma/config";
import { expect, it } from "vitest";

it("loads Prisma configuration with an Effect release patched for GHSA-7589-6fvf-x4pw", () => {
  const root = createRequire(import.meta.url);
  const prisma = createRequire(root.resolve("prisma/config"));
  const config = createRequire(prisma.resolve("@prisma/config"));
  const { version } = config("effect/package.json") as { version: string };
  const [major, minor, patch] = version.split(".").map(Number);
  expect(major > 3 || (major === 3 && (minor > 22 || (minor === 22 && patch >= 1)))).toBe(true);
  expect(defineConfig({ schema: "prisma/schema.prisma" }).schema).toBe("prisma/schema.prisma");
});
