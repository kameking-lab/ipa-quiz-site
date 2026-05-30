// Vitest stub for Next.js' `server-only` token.
//
// `server-only` is not a real npm package — Next.js' bundler resolves it to a
// module that throws if it ends up in a client bundle. Vite/vitest cannot
// resolve it, so any test that (transitively) imports a server-only module
// fails at import-analysis time. Aliasing the specifier to this empty no-op in
// vitest.config.ts lets such modules be exercised at runtime in tests. This is
// a test-only shim; it does not affect the production build (Next keeps its own
// resolution).
export {};
