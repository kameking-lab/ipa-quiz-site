import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // React 19 ships these strict rules but they over-trigger on legitimate
      // client-only patterns we use throughout the app:
      //
      // - `react-hooks/set-state-in-effect`: hydrating client-only state
      //   (localStorage history, TTS availability, browser feature detection)
      //   is exactly what useEffect + setState is for. The recommended
      //   alternative `useSyncExternalStore` doubles the complexity for
      //   ~20 hydration call sites here.
      //
      // - `react-hooks/purity`: blocks Math.random() in useMemo even when
      //   the parent gates render on a client-only flag (e.g. FireworksBurst
      //   inside AnimatePresence). No SSR mismatch is possible.
      //
      // Re-enable per file with eslint-enable comments if a specific case
      // would benefit from useSyncExternalStore.
      "react-hooks/set-state-in-effect": "off",
      "react-hooks/purity": "off",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
