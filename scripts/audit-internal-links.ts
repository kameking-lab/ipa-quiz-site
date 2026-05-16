/**
 * Internal link integrity audit for ipa-quiz-site.
 *
 * Checks:
 *   (a) Dead links — relatedSlugs or body markdown links pointing to non-existent paths
 *   (b) Circular links — pairs of posts that mutually reference each other (observation only)
 *   (c) Orphaned posts — blog posts with zero inbound internal links
 *   (d) Generic anchor text — vague anchors like "こちら" / "here" appearing 3+ times
 *   (e) Invalid fragments — #fragment on URLs we can't verify
 *   (f) Trailing-slash inconsistency — links with vs. without trailing slash
 *
 * Usage:
 *   pnpm tsx scripts/audit-internal-links.ts
 *   pnpm tsx scripts/audit-internal-links.ts --verbose
 */

import { writeFileSync, mkdirSync, readdirSync, statSync, existsSync } from "node:fs";
import { join } from "node:path";
import { getAllBlogPosts } from "@/data/blog/index";
import { ESSAY_EXAM_CODES as ESSAYS_EXAM_CODES } from "@/lib/essays/load";
import { ESSAY_EXAM_CODES as ESSAY_AI_EXAM_CODES } from "@/lib/essay/load";

// ─── Constants ────────────────────────────────────────────────────────────────

const EXAM_CODES = [
  "ip", "sg", "fe", "ap", "st", "sa", "pm", "nw", "db", "es", "sc", "sm", "au",
] as const;

const STATIC_PAGES = new Set<string>([
  "/",
  "/about",
  "/faq",
  "/blog",
  "/essays",
  "/essay",
  "/topics",
  "/glossary",
  "/keywords",
  "/ranking",
  "/stats",
  "/contact",
  "/recommended-books",
  "/quiz",
  "/modes",
  "/practice",
  "/challenge",
  "/mock-exam",
  "/settings",
  "/account",
  "/auth",
  "/features",
  "/transparency",
  "/privacy",
  "/terms",
  "/referral",
  "/student",
  "/launch",
  "/demo",
  "/community",
]);

// Generic anchor patterns to flag
const GENERIC_ANCHORS = [
  "こちら",
  "ここ",
  "詳しくはこちら",
  "here",
  "click here",
  "詳細",
  "参照",
  "リンク",
];

// Verbose flag
const VERBOSE = process.argv.includes("--verbose");

// ─── Types ───────────────────────────────────────────────────────────────────

interface LinkIssue {
  type: "dead-link" | "dead-related-slug" | "orphan" | "generic-anchor" | "fragment" | "trailing-slash";
  severity: "fatal" | "warning" | "observation";
  source: string;   // the post/page that has the issue
  target?: string;  // the broken link target
  anchor?: string;  // anchor text (for generic anchor issues)
  context?: string; // surrounding text or additional info
}

interface AuditReport {
  totalBlogPosts: number;
  totalInternalLinks: number;
  totalRelatedSlugLinks: number;
  issues: LinkIssue[];
  inboundLinkCount: Map<string, number>;
}

// ─── Utility ─────────────────────────────────────────────────────────────────

/**
 * Recursively scan app/ directory to discover all Next.js routes from page.tsx files.
 * Dynamic segments like [slug] are treated as wildcards (not checked for specific values).
 * Returns a set of static paths discovered.
 */
function discoverAppRoutes(appDir: string, prefix = ""): Set<string> {
  const paths = new Set<string>();
  if (!existsSync(appDir)) return paths;

  let entries: string[];
  try {
    entries = readdirSync(appDir);
  } catch {
    return paths;
  }

  for (const entry of entries) {
    const full = join(appDir, entry);
    let isDir = false;
    try {
      isDir = statSync(full).isDirectory();
    } catch {
      continue;
    }
    if (!isDir) continue;

    // Skip Next.js internals and non-route folders
    if (entry.startsWith("_") || entry === "api") continue;

    // Route groups like (home), (exam) — strip parens for path
    const segmentRaw = entry;
    const isRouteGroup = segmentRaw.startsWith("(") && segmentRaw.endsWith(")");
    const isDynamic = segmentRaw.startsWith("[") && segmentRaw.endsWith("]");

    if (isRouteGroup) {
      // Route groups don't add a path segment
      const sub = discoverAppRoutes(full, prefix);
      for (const p of sub) paths.add(p);
    } else if (isDynamic) {
      // Dynamic segments — we can't enumerate specific values here,
      // just register the prefix as potentially valid (for wildcard matching)
      // Sub-paths of dynamic segments
      const sub = discoverAppRoutes(full, prefix + "/" + segmentRaw);
      for (const p of sub) paths.add(p);
    } else {
      const routePath = prefix + "/" + segmentRaw;
      // Check if this directory has a page.tsx (making it a routable page)
      if (existsSync(join(full, "page.tsx")) || existsSync(join(full, "page.ts"))) {
        paths.add(routePath);
        paths.add(routePath + "/");
      }
      // Recurse into subdirectories
      const sub = discoverAppRoutes(full, routePath);
      for (const p of sub) paths.add(p);
    }
  }

  return paths;
}

function buildValidPaths(): Set<string> {
  const paths = new Set<string>();

  // Discover static routes from app/ directory
  const appDir = join(process.cwd(), "app");
  const discovered = discoverAppRoutes(appDir);
  for (const p of discovered) paths.add(p);

  // Always include root
  paths.add("/");

  // Exam pages /{exam}
  for (const exam of EXAM_CODES) {
    paths.add(`/${exam}`);
    paths.add(`/${exam}/`);
  }

  // Blog pages /blog/{slug}
  const posts = getAllBlogPosts();
  for (const post of posts) {
    paths.add(`/blog/${post.slug}`);
    paths.add(`/blog/${post.slug}/`);
  }

  // Essay sample pages /essays/{exam}
  for (const exam of ESSAYS_EXAM_CODES) {
    paths.add(`/essays/${exam}`);
    paths.add(`/essays/${exam}/`);
  }

  // Essay AI scoring pages /essay/{exam}
  for (const exam of ESSAY_AI_EXAM_CODES) {
    paths.add(`/essay/${exam}`);
    paths.add(`/essay/${exam}/`);
  }

  // Afternoon exam pages /{exam}/afternoon
  for (const exam of EXAM_CODES) {
    paths.add(`/${exam}/afternoon`);
    paths.add(`/${exam}/afternoon/`);
  }

  // Known dynamic-parameter routes that appear as links
  // /modes/year and /modes/topic are real Next.js routes (discovered above)
  // /quiz with query params — the base path /quiz is valid
  paths.add("/quiz");
  paths.add("/quiz/");

  return paths;
}

function extractMarkdownLinks(body: string): Array<{ anchor: string; href: string }> {
  const links: Array<{ anchor: string; href: string }> = [];
  // Match [anchor text](url) patterns
  const pattern = /\[([^\]]*)\]\(([^)]+)\)/g;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(body)) !== null) {
    links.push({ anchor: match[1], href: match[2] });
  }
  return links;
}

function isInternalLink(href: string): boolean {
  return href.startsWith("/") && !href.startsWith("//");
}

function stripQueryAndFragment(href: string): string {
  // Remove query string and fragment, keep path only
  return href.split("?")[0].split("#")[0];
}

function hasFragment(href: string): boolean {
  return href.includes("#");
}

function hasTrailingSlash(path: string): boolean {
  return path.endsWith("/") && path.length > 1;
}

// ─── Main audit ──────────────────────────────────────────────────────────────

function runAudit(): AuditReport {
  const posts = getAllBlogPosts();
  const validPaths = buildValidPaths();
  const blogSlugs = new Set(posts.map((p) => p.slug));

  const issues: LinkIssue[] = [];
  const inboundLinkCount = new Map<string, number>();
  // Initialize all posts with 0 inbound links
  for (const post of posts) {
    inboundLinkCount.set(post.slug, 0);
  }

  let totalInternalLinks = 0;
  let totalRelatedSlugLinks = 0;

  // Generic anchor occurrence counter (anchor text → count)
  const genericAnchorOccurrences = new Map<string, number>();

  for (const post of posts) {
    const sourceLabel = `/blog/${post.slug}`;

    // ── (a) Check relatedSlugs ──────────────────────────────────────────────
    if (post.relatedSlugs) {
      for (const slug of post.relatedSlugs) {
        totalRelatedSlugLinks++;
        if (!blogSlugs.has(slug)) {
          issues.push({
            type: "dead-related-slug",
            severity: "fatal",
            source: sourceLabel,
            target: slug,
            context: `relatedSlugs references non-existent blog slug`,
          });
        } else {
          // Count inbound link
          inboundLinkCount.set(slug, (inboundLinkCount.get(slug) ?? 0) + 1);
        }
      }
    }

    // ── (a)(d)(e)(f) Scan body for markdown links ───────────────────────────
    const bodyLinks = extractMarkdownLinks(post.body);
    for (const { anchor, href } of bodyLinks) {
      if (!isInternalLink(href)) continue;
      totalInternalLinks++;

      const cleanPath = stripQueryAndFragment(href);

      // (d) Generic anchor text
      const anchorLower = anchor.trim().toLowerCase();
      for (const pattern of GENERIC_ANCHORS) {
        if (anchorLower === pattern.toLowerCase() || anchorLower.includes(pattern.toLowerCase())) {
          const key = `${pattern}::${sourceLabel}`;
          genericAnchorOccurrences.set(key, (genericAnchorOccurrences.get(key) ?? 0) + 1);
          break;
        }
      }

      // (f) Trailing slash check (links with trailing slash to non-root)
      if (hasTrailingSlash(cleanPath) && !validPaths.has(cleanPath) && validPaths.has(cleanPath.slice(0, -1))) {
        issues.push({
          type: "trailing-slash",
          severity: "observation",
          source: sourceLabel,
          target: href,
          anchor,
          context: `Link has trailing slash but canonical is without`,
        });
      }

      // (a) Dead link check
      if (!validPaths.has(cleanPath)) {
        // Check if it's a path with query params only (dynamic, not checkable)
        if (cleanPath === "/quiz" || cleanPath.startsWith("/quiz")) {
          // /quiz with params is OK
        } else {
          issues.push({
            type: "dead-link",
            severity: "fatal",
            source: sourceLabel,
            target: href,
            anchor,
            context: `Markdown link points to non-existent path: ${cleanPath}`,
          });
        }
      } else {
        // Count inbound links for blog posts
        if (cleanPath.startsWith("/blog/")) {
          const targetSlug = cleanPath.slice("/blog/".length).replace(/\/$/, "");
          if (blogSlugs.has(targetSlug)) {
            inboundLinkCount.set(targetSlug, (inboundLinkCount.get(targetSlug) ?? 0) + 1);
          }
        }
      }

      // (e) Fragment check — only observe, can't verify server-side
      if (hasFragment(href) && !href.includes("#sample-answers")) {
        // Fragments are observation-only — just count them
        if (VERBOSE) {
          issues.push({
            type: "fragment",
            severity: "observation",
            source: sourceLabel,
            target: href,
            anchor,
            context: `Link includes fragment (cannot verify server-side)`,
          });
        }
      }
    }
  }

  // (d) Report generic anchors appearing 3+ times total
  const genericAnchorsBySource = new Map<string, string[]>();
  for (const [key, count] of genericAnchorOccurrences) {
    const [pattern, source] = key.split("::");
    if (count >= 1) { // flag each occurrence in a single post
      if (!genericAnchorsBySource.has(source)) genericAnchorsBySource.set(source, []);
      genericAnchorsBySource.get(source)!.push(`"${pattern}" (×${count})`);
    }
  }
  for (const [source, patterns] of genericAnchorsBySource) {
    issues.push({
      type: "generic-anchor",
      severity: "warning",
      source,
      context: `Generic anchor text found: ${patterns.join(", ")}`,
    });
  }

  // (c) Orphaned posts — posts with 0 inbound links from other blog posts
  for (const post of posts) {
    const inbound = inboundLinkCount.get(post.slug) ?? 0;
    if (inbound === 0) {
      issues.push({
        type: "orphan",
        severity: "warning",
        source: `/blog/${post.slug}`,
        context: `No inbound links from other blog posts (orphan)`,
      });
    }
  }

  // (b) Circular links — detect mutual references (observation)
  if (VERBOSE) {
    for (const post of posts) {
      if (!post.relatedSlugs) continue;
      for (const related of post.relatedSlugs) {
        const relatedPost = posts.find((p) => p.slug === related);
        if (relatedPost?.relatedSlugs?.includes(post.slug)) {
          issues.push({
            type: "fragment", // reusing type for observation
            severity: "observation",
            source: `/blog/${post.slug}`,
            target: `/blog/${related}`,
            context: `Mutual relatedSlug reference (circular)`,
          });
        }
      }
    }
  }

  return {
    totalBlogPosts: posts.length,
    totalInternalLinks,
    totalRelatedSlugLinks,
    issues,
    inboundLinkCount,
  };
}

// ─── Reporting ────────────────────────────────────────────────────────────────

function formatReport(report: AuditReport): string {
  const fatal = report.issues.filter((i) => i.severity === "fatal");
  const warnings = report.issues.filter((i) => i.severity === "warning");
  const observations = report.issues.filter((i) => i.severity === "observation");

  const deadLinks = fatal.filter((i) => i.type === "dead-link");
  const deadRelated = fatal.filter((i) => i.type === "dead-related-slug");
  const orphans = warnings.filter((i) => i.type === "orphan");
  const genericAnchors = warnings.filter((i) => i.type === "generic-anchor");

  const lines: string[] = [];
  lines.push("# Internal Link Integrity Audit Report");
  lines.push(`Generated: ${new Date().toISOString()}`);
  lines.push("");
  lines.push("## Summary");
  lines.push(`Total blog posts: ${report.totalBlogPosts}`);
  lines.push(`Total body internal links: ${report.totalInternalLinks}`);
  lines.push(`Total relatedSlug links: ${report.totalRelatedSlugLinks}`);
  lines.push(`Total links checked: ${report.totalInternalLinks + report.totalRelatedSlugLinks}`);
  lines.push("");
  lines.push(`FATAL (dead links): ${fatal.length}`);
  lines.push(`  - Dead body links: ${deadLinks.length}`);
  lines.push(`  - Dead relatedSlugs: ${deadRelated.length}`);
  lines.push(`WARNING: ${warnings.length}`);
  lines.push(`  - Orphaned posts: ${orphans.length}`);
  lines.push(`  - Generic anchor text posts: ${genericAnchors.length}`);
  lines.push(`OBSERVATION: ${observations.length}`);
  lines.push("");

  if (deadLinks.length > 0) {
    lines.push("## FATAL: Dead Body Links");
    for (const issue of deadLinks) {
      lines.push(`  Source: ${issue.source}`);
      lines.push(`    Target: ${issue.target}`);
      lines.push(`    Anchor: "${issue.anchor}"`);
      lines.push(`    Context: ${issue.context}`);
      lines.push("");
    }
  }

  if (deadRelated.length > 0) {
    lines.push("## FATAL: Dead relatedSlugs");
    for (const issue of deadRelated) {
      lines.push(`  Source: ${issue.source}`);
      lines.push(`    Missing slug: "${issue.target}"`);
      lines.push("");
    }
  }

  if (orphans.length > 0) {
    lines.push("## WARNING: Orphaned Posts (0 inbound links)");
    for (const issue of orphans) {
      lines.push(`  ${issue.source}`);
    }
    lines.push("");
  }

  if (genericAnchors.length > 0) {
    lines.push("## WARNING: Generic Anchor Text");
    for (const issue of genericAnchors) {
      lines.push(`  Source: ${issue.source}`);
      lines.push(`    ${issue.context}`);
      lines.push("");
    }
  }

  if (VERBOSE && observations.length > 0) {
    lines.push("## OBSERVATION (verbose)");
    for (const issue of observations) {
      lines.push(`  [${issue.type}] ${issue.source} -> ${issue.target ?? ""}`);
      lines.push(`    ${issue.context}`);
      lines.push("");
    }
  }

  lines.push("## Inbound Link Counts (top 20 most linked)");
  const sorted = [...report.inboundLinkCount.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20);
  for (const [slug, count] of sorted) {
    lines.push(`  ${count.toString().padStart(3)} <- /blog/${slug}`);
  }
  lines.push("");

  lines.push("## Inbound Link Counts (posts with 0 inbound — potential orphans)");
  const zeroInbound = [...report.inboundLinkCount.entries()]
    .filter(([, count]) => count === 0);
  lines.push(`  Total: ${zeroInbound.length} posts`);
  for (const [slug] of zeroInbound.slice(0, 30)) {
    lines.push(`    /blog/${slug}`);
  }

  return lines.join("\n");
}

// ─── Entry point ─────────────────────────────────────────────────────────────

function main() {
  console.log("🔍 Running internal link integrity audit...");

  const report = runAudit();
  const text = formatReport(report);

  // Write report
  mkdirSync("logs", { recursive: true });
  writeFileSync("logs/internal-link-audit-report.txt", text, "utf-8");

  // Print summary to stdout
  const fatal = report.issues.filter((i) => i.severity === "fatal");
  const warnings = report.issues.filter((i) => i.severity === "warning");

  console.log("");
  console.log("=== AUDIT COMPLETE ===");
  console.log(`Blog posts scanned: ${report.totalBlogPosts}`);
  console.log(`Internal links checked: ${report.totalInternalLinks + report.totalRelatedSlugLinks}`);
  console.log(`  Body links: ${report.totalInternalLinks}`);
  console.log(`  relatedSlugs: ${report.totalRelatedSlugLinks}`);
  console.log("");
  console.log(`FATAL issues: ${fatal.length}`);
  console.log(`WARNING issues: ${warnings.length}`);
  console.log("");

  if (fatal.length > 0) {
    console.log("⛔ FATAL ISSUES (dead links):");
    for (const issue of fatal) {
      console.log(`  [${issue.type}] ${issue.source} -> ${issue.target}`);
    }
    console.log("");
  }

  const orphans = warnings.filter((i) => i.type === "orphan");
  const genericAnchors = warnings.filter((i) => i.type === "generic-anchor");
  if (orphans.length > 0) {
    console.log(`⚠️  Orphaned posts: ${orphans.length}`);
  }
  if (genericAnchors.length > 0) {
    console.log(`⚠️  Generic anchor text in: ${genericAnchors.length} posts`);
  }

  console.log(`\nFull report: logs/internal-link-audit-report.txt`);

  // Exit with error code if fatal issues found
  if (fatal.length > 0) process.exit(1);
}

main();
