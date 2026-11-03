import { defineConfig } from "vitest/config";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "node:url";
import { readFileSync } from "node:fs";
const at=(p:string)=>fileURLToPath(new URL(p,import.meta.url));
export default defineConfig(({mode})=>({
  base: "./",
  plugins: [tailwindcss(),{name:"no-question-bundles",generateBundle(){const forbidden=[...this.getModuleIds()].map(id=>id.replace(/\\/g,"/")).filter(path=>(path.includes("/data/questions/")&&!path.endsWith("/corrections/official-sources.json"))||path.includes("/data/exam-library/papers/"));if(forbidden.length)throw new Error("Question sources entered native app bundle:\n"+forbidden.join("\n"));}},...(mode==="e2e"?[{name:"test-only-lease-key",enforce:"pre" as const,resolveId(id:string){if(id.replace(/\\/g,"/").endsWith("/config/public.json"))return "\0mock-lease-key";},load(id:string){if(id==="\0mock-lease-key")return `export default ${JSON.stringify({leasePublicKey:JSON.parse(readFileSync(at("./.cache/e2e-key.json"),"utf8")).publicKey})}`;}}]:[])],
  resolve: { dedupe:["react","react-dom"], alias: {
    "next/link":at("./src/shims/link.tsx"),"next/navigation":at("./src/shims/navigation.ts"),
    "next/dynamic":at("./src/shims/dynamic.tsx"),"next/image":at("./src/shims/image.tsx"),
    "@":at("../"),
  } },
  define: { "process.env": "{}" },
  css: { postcss: { plugins: [] } },
  build: { target: "es2022", rolldownOptions:{ ...(mode==="e2e"?{input:{app:at("./index.html"),harness:at("./tests/e2e/harness.html")}}:{}),onwarn(warning,defaultHandler){ if(warning.code!=="MODULE_LEVEL_DIRECTIVE" && warning.code!=="INEFFECTIVE_DYNAMIC_IMPORT")defaultHandler(warning); } } },
  test: { include: ["tests/**/*.test.ts"], environment: "node" },
}));
