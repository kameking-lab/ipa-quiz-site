// Keep the question corpus out of the server compiler's JavaScript AST. Each
// imported JSON remains a cached module, but Node parses its original file on
// first use. The literal cwd-relative path also lets Next trace the runtime file.
// Browser/Edge imports keep the normal JSON loader (see next.config.ts).
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { relative, sep } = require("node:path");

module.exports = function questionJsonLoader() {
  const filename = relative(this.rootContext, this.resourcePath).split(sep).join("/");
  if (!filename.startsWith("data/questions/") || !filename.endsWith(".json")) {
    throw new Error("question-json-loader only accepts data/questions JSON files");
  }
  return `module.exports = JSON.parse(require("node:fs").readFileSync(require("node:path").join(process.cwd(), ${JSON.stringify(filename)}), "utf8"));\n`;
};
