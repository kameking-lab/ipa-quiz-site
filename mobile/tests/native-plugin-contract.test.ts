import { readdirSync, readFileSync } from "node:fs";
import ts from "typescript";
import { expect, it } from "vitest";

const mobile = new URL("../", import.meta.url);
const read = (path: string) => readFileSync(new URL(path, mobile), "utf8");
const files = (directory: string): string[] => readdirSync(new URL(directory, mobile), { withFileTypes: true })
  .flatMap(entry => entry.isDirectory() ? files(`${directory}/${entry.name}`) : [`${directory}/${entry.name}`]);

// Source-contract checks, not a Swift compiler. Keep the explicit array type:
// Capacitor's Obj-C method initializer has unspecified nullability, so inferred
// array elements can be optional and fail CAPBridgedPlugin conformance.
const nativeFiles = files("ios-assets").filter(path => /\.(swift|m|mm|h)$/.test(path));
const plugins = nativeFiles.flatMap(file => {
  const source = read(file);
  const classes = [...source.matchAll(/(?:public\s+)?class\s+(\w+)\s*:\s*([^\{]+)\{/g)];
  return classes.filter(match => /\bCAPPlugin\b/.test(match[2])).map(match => {
    const nextClass = classes.find(candidate => candidate.index! > match.index!);
    const body = source.slice(match.index, nextClass?.index);
    return {
      file, source, body, className: match[1], protocols: match[2],
      identifier: body.match(/public let identifier(?:\s*:\s*String)?\s*=\s*"(\w+)"/)?.[1],
      jsName: body.match(/public let jsName(?:\s*:\s*String)?\s*=\s*"(\w+)"/)?.[1],
      methods: [...body.matchAll(/CAPPluginMethod\(name:\s*"(\w+)",\s*returnType:\s*(\w+)\)/g)]
        .map(method => ({ name: method[1], returnType: method[2] })),
    };
  });
});

const registrations = files("src").filter(path => /\.tsx?$/.test(path)).flatMap(file => {
  const ast = ts.createSourceFile(file, read(file), ts.ScriptTarget.Latest, true);
  const found: { file: string; name: string; methods: string[] }[] = [];
  const visit = (node: ts.Node) => {
    if (ts.isCallExpression(node) && node.expression.getText(ast) === "registerPlugin") {
      const name = node.arguments[0];
      expect(name && ts.isStringLiteral(name), `${file}: literal registerPlugin name required`).toBe(true);
      const type = node.typeArguments?.[0];
      const declaration = type && ts.isTypeLiteralNode(type) ? type : ast.statements.find(statement =>
        ts.isInterfaceDeclaration(statement) && statement.name.text === type?.getText(ast));
      if (!declaration || !(ts.isInterfaceDeclaration(declaration) || ts.isTypeLiteralNode(declaration))) {
        throw new Error(`${file}: declare the registerPlugin API in this file for contract inspection`);
      }
      const methods = declaration.members.map(member => {
        if (!ts.isMethodSignature(member)) throw new Error(`${file}: expected a plugin API method`);
        expect(member.type?.getText(ast), `${file}: promise method`).toMatch(/^Promise</);
        return member.name.getText(ast);
      });
      found.push({ file, name: (name as ts.StringLiteral).text, methods });
    }
    ts.forEachChild(node, visit);
  };
  visit(ast);
  return found;
});

it("inventories every custom native plugin and matches both sides of the bridge", () => {
  expect(nativeFiles).toHaveLength(4);
  expect(plugins.map(plugin => plugin.className).sort()).toEqual(["KakomonSpeech", "NativeBannerAds", "QualificationBridgePlugin", "StudyReviewPlugin", "TrackingTransparencyPlugin"]);
  expect(new Set(plugins.map(plugin => plugin.identifier)).size).toBe(plugins.length);
  expect(new Set(plugins.map(plugin => plugin.jsName)).size).toBe(plugins.length);
  // The shared reader uses the injected Capacitor proxy so it also works in a browser.
  const speechClient = read("../components/quiz/read-aloud.ts");
  expect(speechClient).toContain("cap.Plugins?.KakomonSpeech");
  const speechMethods = [
    { name: "available", returnType: "CAPPluginReturnPromise" },
    { name: "speak", returnType: "CAPPluginReturnCallback" },
    { name: "stop", returnType: "CAPPluginReturnPromise" },
  ];
  for (const { name } of speechMethods) expect(speechClient).toContain(`native.${name}(`);
  const contracts = new Map(registrations.map(({ name, methods }) => [
    name, methods.map(method => ({ name: method, returnType: "CAPPluginReturnPromise" })),
  ]));
  expect(contracts.size).toBe(registrations.length);
  expect(contracts.has("KakomonSpeech")).toBe(false);
  contracts.set("KakomonSpeech", speechMethods);
  expect([...contracts.keys()].sort()).toEqual(plugins.map(plugin => plugin.jsName).sort());
  const controller = read("ios-assets/QualificationBridgeViewController.swift");
  expect(controller).toMatch(/override func capacitorDidLoad\(\)/);
  const byName = (a: { name: string }, b: { name: string }) => a.name.localeCompare(b.name);
  for (const plugin of plugins) {
    expect(plugin.protocols).toMatch(/\bCAPBridgedPlugin\b/);
    expect(plugin.identifier).toBe(plugin.className);
    expect(plugin.source).toContain(`@objc(${plugin.className})`);
    expect(controller).toContain(`bridge?.registerPluginInstance(${plugin.className}())`);
    expect([...plugin.methods].sort(byName)).toEqual([...contracts.get(plugin.jsName!)!].sort(byName));
    expect(new Set(plugin.methods.map(method => method.name)).size).toBe(plugin.methods.length);
    for (const method of plugin.methods) {
      expect(plugin.body).toMatch(new RegExp(`@objc\\s+(?:public\\s+)?func ${method.name}\\(_ call: CAPPluginCall\\)`));
    }
  }
  // Swift implements the bridge metadata; a CAP_PLUGIN category would duplicate it.
  for (const file of nativeFiles) expect(read(file)).not.toMatch(/\bCAP_PLUGIN(?:_METHOD|_CONFIG)?\s*\(/);
  console.info("Custom native plugin inventory:", JSON.stringify(plugins.map(({ file, className, identifier, jsName, methods }) =>
    ({ file, className, identifier, jsName, methods })), null, 2));
});

it("stores the first-use day and reserves the installed marketing version before calling StoreKit", () => {
  const review = plugins.find(plugin => plugin.jsName === "StudyReview")!.body;
  expect(review).toMatch(/if defaults\.object\(forKey: firstUseKey\) == nil\s*\{\s*defaults\.set\(Date\(\), forKey: firstUseKey\)/);
  expect(review).toMatch(/CFBundleShortVersionString/);
  expect(review).toMatch(/!versions\.contains\(version\)/);
  expect(review).toMatch(/calendar\.startOfDay\(for: firstUse\) < calendar\.startOfDay\(for: now\)/);
  expect(review).toMatch(/scene\.activationState == \.foregroundActive/);
  expect(review.indexOf("defaults.set(versions, forKey: self.requestedVersionsKey)")).toBeLessThan(review.indexOf("AppStore.requestReview(in: scene)"));
});

for (const plugin of plugins) {
  it(`${plugin.className} declares nonoptional CAPBridgedPlugin method metadata`, () => {
    expect(plugin.body).toMatch(/public let pluginMethods\s*:\s*\[CAPPluginMethod\]\s*=\s*\[/);
  });
}
