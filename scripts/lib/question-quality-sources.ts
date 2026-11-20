import { createHash } from "node:crypto";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { posix, resolve } from "node:path";
import ts from "typescript";
import { qualityIssue, type QualityIssue } from "./question-quality";

const DATA = "data/questions";
const CODE = /\.[cm]?[jt]sx?$/;
const ROUTE_ENTRY = /(?:^|\/)(?:page|layout|route|template|default|loading|error|global-error|not-found|global-not-found|sitemap|robots|manifest|icon|apple-icon|opengraph-image|twitter-image)\.[jt]sx?$/;

function listFiles(root: string, directory: string): string[] {
  const files: string[] = [];
  for (const item of readdirSync(resolve(root, directory), { withFileTypes: true })) {
    if (item.name.startsWith(".env")) continue;
    const file = posix.join(directory, item.name);
    if (item.isDirectory()) files.push(...listFiles(root, file));
    else if (item.isFile()) files.push(file);
  }
  return files;
}

function isString(node: ts.Node | undefined): node is ts.StringLiteralLike {
  return Boolean(node && ts.isStringLiteralLike(node));
}

function analyzeCode(file: string, code: string, collectQuestions: boolean) {
  const source = ts.createSourceFile(file, code, ts.ScriptTarget.Latest);
  const imports = new Set<string>();
  const questionIds = new Set<string>();
  function visit(node: ts.Node) {
    if (ts.isImportDeclaration(node) && isString(node.moduleSpecifier)) {
      const clause = node.importClause;
      const names = clause?.namedBindings;
      const onlyTypes = names && ts.isNamedImports(names) && names.elements.length > 0 && names.elements.every(element => element.isTypeOnly);
      if (!clause?.isTypeOnly && (clause?.name || !onlyTypes)) imports.add(node.moduleSpecifier.text);
    } else if (ts.isExportDeclaration(node) && !node.isTypeOnly && isString(node.moduleSpecifier)) {
      const names = node.exportClause;
      if (!names || !ts.isNamedExports(names) || names.elements.some(element => !element.isTypeOnly)) imports.add(node.moduleSpecifier.text);
    } else if (ts.isCallExpression(node) && isString(node.arguments[0]) &&
      (node.expression.kind === ts.SyntaxKind.ImportKeyword || (ts.isIdentifier(node.expression) && node.expression.text === "require"))) {
      imports.add(node.arguments[0].text);
    } else if (collectQuestions && ts.isObjectLiteralExpression(node)) {
      const fields = new Map<string, ts.Expression>();
      for (const property of node.properties) {
        if (ts.isPropertyAssignment(property) && (ts.isIdentifier(property.name) || isString(property.name))) {
          fields.set(property.name.text, property.initializer);
        }
      }
      const id = fields.get("id");
      if (isString(id) && ((fields.has("question") && fields.has("answer")) || node.properties.some(ts.isSpreadAssignment))) questionIds.add(id.text);
    }
    ts.forEachChild(node, visit);
  }
  visit(source);
  return { imports, questionIds };
}

function jsonQuestionIds(data: unknown, ids: Set<string>) {
  if (Array.isArray(data)) {
    for (const value of data) jsonQuestionIds(value, ids);
  } else if (data !== null && typeof data === "object") {
    if ("id" in data && typeof data.id === "string" && "question" in data && "answer" in data) {
      ids.add(data.id);
    } else {
      for (const value of Object.values(data)) jsonQuestionIds(value, ids);
    }
  }
}

export function checkQuestionSources(
  root: string,
  publicIds: ReadonlySet<string>,
  registrations: readonly string[],
  additionalSources: readonly string[],
  checkUnregistered: boolean,
): QualityIssue[] {
  const sources = listFiles(root, DATA).sort();
  const sourcesSet = new Set(sources);
  const loaded = new Set<string>();
  const filesById = new Map<string, string[]>();
  const importsByFile = new Map<string, Set<string>>();
  const issues: QualityIssue[] = [];

  function recordIds(file: string, ids: Set<string>) {
    for (const id of ids) {
      if (!publicIds.has(id)) continue;
      const files = filesById.get(id) ?? [];
      files.push(file);
      filesById.set(id, files);
    }
  }
  for (const file of sources) {
    if (CODE.test(file)) {
      const { imports, questionIds } = analyzeCode(file, readFileSync(resolve(root, file), "utf8"), true);
      importsByFile.set(file, imports);
      recordIds(file, questionIds);
    } else if (file.endsWith(".json")) {
      const ids = new Set<string>();
      try {
        jsonQuestionIds(JSON.parse(readFileSync(resolve(root, file), "utf8").replace(/^\uFEFF/, "")), ids);
      } catch (error) {
        throw new Error(`問題データを読み込めません: ${file}`, { cause: error });
      }
      recordIds(file, ids);
    }
  }
  for (const [id, files] of filesById) {
    if (files.length > 1) issues.push(qualityIssue("duplicate-source", id, `公開問題IDが複数ファイルにあります (${files.join(", ")})`, files));
  }
  if (!checkUnregistered) return issues;

  function resolveImport(from: string, specifier: string): string | undefined {
    const base = specifier.startsWith("@/") ? posix.normalize(specifier.slice(2)) : specifier.startsWith(".") ? posix.join(posix.dirname(from), specifier) : "";
    if (!base || base === ".." || base.startsWith("../") || posix.isAbsolute(base) || base.split("/").some(part => part.startsWith(".env"))) return;
    const candidates = [base, ...[".ts", ".tsx", ".js", ".jsx", ".mts", ".mjs", "/index.ts", "/index.tsx", "/index.js"].map(ext => base + ext)];
    return candidates.find(file => sourcesSet.has(file) || statSync(resolve(root, file), { throwIfNoEntry: false })?.isFile());
  }
  function follow(file: string) {
    if (loaded.has(file)) return;
    loaded.add(file);
    if (!CODE.test(file)) return;
    const imports = importsByFile.get(file) ?? analyzeCode(file, readFileSync(resolve(root, file), "utf8"), false).imports;
    for (const specifier of imports) {
      const dependency = resolveImport(file, specifier);
      if (dependency) follow(dependency);
    }
  }

  for (const entry of registrations) follow(entry);
  for (const source of additionalSources) loaded.add(source);
  for (const file of sources) {
    if (loaded.has(file)) continue;
    const contents = readFileSync(resolve(root, file));
    // Hash text consistently across Windows and Linux checkouts.
    const hash = createHash("sha256").update(/\.(?:json|[cm]?[jt]sx?|md|py|txt)$/.test(file) || file.endsWith("/.gitattributes")
      ? contents.toString("utf8").replace(/\r\n/g, "\n") : contents).digest("hex");
    issues.push(qualityIssue("unregistered-file", file, "公開のローダーや登録から参照されていないファイルです", hash));
  }
  return issues;
}

export function questionSourceRegistrations(root: string): string[] {
  return ["data/questions/index.ts", "lib/questions/get-questions.ts", ...listFiles(root, "app").filter(file => ROUTE_ENTRY.test(file))];
}
