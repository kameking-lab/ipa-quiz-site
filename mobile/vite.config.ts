import { defineConfig } from "vitest/config";
export default defineConfig({
  base: "./",
  css: { postcss: { plugins: [] } },
  build: { target: "es2022", rolldownOptions: { output: { codeSplitting: false } } },
  test: { include: ["tests/**/*.test.ts"], environment: "node" },
});
