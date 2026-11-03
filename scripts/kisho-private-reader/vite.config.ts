import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sourcePages from "../../data/qualification-staging/kisho-65-66-private/source-pages.json";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const readerRoot = path.resolve(projectRoot, "scripts/kisho-private-reader");
const assetPaths = new Map(sourcePages.assets.map((asset) => [asset.assetId,
  path.resolve(projectRoot, "private-assets/kisho-65-66", asset.assetId)]));

export default defineConfig({
  root: readerRoot,
  cacheDir: path.join(readerRoot, ".vite-cache"),
  optimizeDeps: { include: ["react", "react-dom/client", "react/jsx-runtime", "react/jsx-dev-runtime"] },
  publicDir: false,
  plugins: [react(), {
    name: "kisho-private-local-assets-only",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url ?? "";
        if (url.startsWith("/__kisho_asset/")) {
          const assetId = decodeURIComponent(url.slice("/__kisho_asset/".length).split("?")[0] ?? "");
          const file = assetPaths.get(assetId);
          if (!file) { res.statusCode = 404; res.end(); return; }
          try {
            const bytes = readFileSync(file);
            res.setHeader("Content-Type", "image/png");
            res.setHeader("Cache-Control", "no-store");
            res.setHeader("X-Content-Type-Options", "nosniff");
            res.end(bytes);
          } catch { res.statusCode = 404; res.end(); }
          return;
        }
        const decoded = decodeURIComponent(url).replaceAll("\\", "/");
        if (/(?:^|\/)\.env(?:\.[^/]*)?(?:\/|$)/iu.test(decoded)
          || /(?:^|\/)(?:\.git|reports|private-assets|prisma|accounts)(?:\/|$)/iu.test(decoded)) {
          res.statusCode = 403; res.end(); return;
        }
        next();
      });
    },
  }],
  resolve: { alias: { "@": projectRoot }, preserveSymlinks: true, dedupe: ["react", "react-dom"] },
  server: {
    host: "127.0.0.1",
    port: 4178,
    strictPort: true,
    fs: { allow: [projectRoot], deny: ["**/.env", "**/.env.*", "**/.git/**", "**/reports/**", "**/private-assets/**", "**/prisma/**", "**/accounts/**"] },
  },
});
