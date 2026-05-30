import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    include: ["__tests__/**/*.{test,spec}.{ts,tsx}"],
    // The copilot RAG corpus load takes a few seconds on first hit. Allow
    // headroom so tests that exercise it (rag, copilot route) are not flaky
    // when run in parallel with siblings that also touch the corpus.
    testTimeout: 15_000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
      // `server-only` is a Next.js build-time token with no resolvable module on
      // disk; stub it so server-only modules can be exercised at runtime in tests.
      "server-only": path.resolve(__dirname, "test-stubs/server-only.ts"),
    },
  },
});
