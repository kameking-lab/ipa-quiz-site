"use client";

import * as React from "react";

const SWAGGER_CSS_URL =
  "https://cdn.jsdelivr.net/npm/swagger-ui-dist@5.17.14/swagger-ui.css";
const SWAGGER_BUNDLE_URL =
  "https://cdn.jsdelivr.net/npm/swagger-ui-dist@5.17.14/swagger-ui-bundle.js";
const SWAGGER_PRESET_URL =
  "https://cdn.jsdelivr.net/npm/swagger-ui-dist@5.17.14/swagger-ui-standalone-preset.js";

declare global {
  interface Window {
    SwaggerUIBundle?: (opts: Record<string, unknown>) => unknown;
    SwaggerUIStandalonePreset?: { slice: () => unknown[] };
  }
}

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }
    const s = document.createElement("script");
    s.src = src;
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.head.appendChild(s);
  });
}

function loadStyle(href: string): void {
  if (document.querySelector(`link[href="${href}"]`)) return;
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = href;
  document.head.appendChild(link);
}

export function SwaggerUiClient() {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    let cancelled = false;
    loadStyle(SWAGGER_CSS_URL);
    (async () => {
      try {
        await loadScript(SWAGGER_BUNDLE_URL);
        await loadScript(SWAGGER_PRESET_URL);
        if (cancelled) return;
        if (!window.SwaggerUIBundle) {
          throw new Error("Swagger UI failed to initialize");
        }
        window.SwaggerUIBundle({
          url: "/api/v1/openapi",
          domNode: ref.current,
          deepLinking: true,
          presets: [
            (window.SwaggerUIBundle as unknown as { presets: { apis: unknown } }).presets.apis,
            window.SwaggerUIStandalonePreset?.slice() ?? [],
          ],
          layout: "BaseLayout",
          docExpansion: "list",
          tryItOutEnabled: true,
        });
        setLoaded(true);
      } catch (e) {
        setError(e instanceof Error ? e.message : String(e));
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      {error && (
        <div className="mb-4 rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
          Swagger UI の読み込みに失敗しました: {error}
        </div>
      )}
      {!loaded && !error && (
        <div className="rounded-xl border border-border bg-muted/30 p-6 text-sm text-muted-foreground">
          Swagger UI を読み込み中…
        </div>
      )}
      <div ref={ref} className="swagger-ui-container" />
    </>
  );
}
