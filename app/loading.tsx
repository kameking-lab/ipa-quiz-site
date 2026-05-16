export default function Loading() {
  return (
    <main
      className="flex flex-1 flex-col items-center justify-center px-4 py-12"
      role="status"
      aria-label="読み込み中"
    >
      <div className="w-full max-w-2xl space-y-4">
        <div className="overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="space-y-3">
            <div className="h-4 w-24 animate-pulse rounded-full bg-muted" />
            <div className="h-5 w-full animate-pulse rounded-lg bg-muted" />
            <div className="h-5 w-4/5 animate-pulse rounded-lg bg-muted" />
          </div>

          <div className="mt-6 space-y-2">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="flex items-center gap-3 rounded-xl border border-border p-3"
              >
                <div className="h-6 w-6 shrink-0 animate-pulse rounded-full bg-muted" />
                <div
                  className="h-4 animate-pulse rounded-md bg-muted"
                  style={{ width: `${60 + i * 8}%`, animationDelay: `${i * 75}ms` }}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 animate-pulse rounded-full bg-muted" />
            <div className="space-y-1.5">
              <div className="h-3.5 w-32 animate-pulse rounded-md bg-muted" />
              <div className="h-3 w-48 animate-pulse rounded-md bg-muted" />
            </div>
          </div>
        </div>
      </div>

      <p className="sr-only">読み込み中...</p>
    </main>
  );
}
