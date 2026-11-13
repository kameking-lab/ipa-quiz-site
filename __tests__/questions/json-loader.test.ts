// @vitest-environment node
import { createRequire } from "node:module";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { runInNewContext } from "node:vm";
import { describe, expect, it } from "vitest";

const require = createRequire(import.meta.url);
const loader = require("../../scripts/question-json-loader.cjs") as (
  this: { rootContext: string; resourcePath: string },
) => string;

describe("server question JSON loader", () => {
  it("loads the unchanged JSON at runtime without embedding its contents", () => {
    const rootContext = process.cwd();
    const resourcePath = resolve(rootContext, "data/questions/denken3/launch.json");
    const output = loader.call({ rootContext, resourcePath });
    const runtimeModule = { exports: undefined as unknown };
    runInNewContext(output, { module: runtimeModule, require, process });
    expect(runtimeModule.exports).toEqual(JSON.parse(readFileSync(resourcePath, "utf8")));
    expect(output.length).toBeLessThan(250);
    expect(output).toContain('"data/questions/denken3/launch.json"');
  });

  it("rejects paths outside the question corpus", () => {
    const rootContext = process.cwd();
    for (const path of ["package.json", "data/questions-other/example.json", "../outside.json", "data/questions/index.ts"]) {
      expect(() => loader.call({ rootContext, resourcePath: resolve(rootContext, path) })).toThrow("only accepts");
    }
  });
});
