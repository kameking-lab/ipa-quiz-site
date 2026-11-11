/**
 * Test-only Upstash REST fake that executes the real GUEST_SCRIPT text.
 *
 * The script is small and uses only a Lua subset (local, if/then/end, return,
 * redis.call, cjson.encode, math.max, tonumber). It is mechanically translated
 * to JavaScript here so the tests exercise the production Lua source rather
 * than a hand-written re-implementation of it.
 */
type Value = string | Set<string> | Map<string, string>;

function splitTopLevel(text: string): string[] {
  const parts: string[] = [];
  let depth = 0, start = 0;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (c === "(" || c === "{" || c === "[") depth++;
    else if (c === ")" || c === "}" || c === "]") depth--;
    else if (c === "," && depth === 0) { parts.push(text.slice(start, i).trim()); start = i + 1; }
  }
  parts.push(text.slice(start).trim());
  return parts;
}

function expr(text: string): string {
  return text
    .replace(/redis\.call\(/g, "call(")
    .replace(/cjson\.encode\(/g, "JSON.stringify(")
    .replace(/math\.max\(/g, "Math.max(")
    .replace(/tonumber\(/g, "Number(")
    .replace(/~=/g, "!==")
    .replace(/([^=!<>])==([^=])/g, "$1===$2")
    .replace(/\band\b/g, "&&")
    .replace(/\bor\b/g, "||")
    .replace(/\bnot\s+/g, "!")
    .replace(/([{,]\s*)(\w+)=(?!=)/g, "$1$2:");
}

export function translateLua(script: string): string {
  const out: string[] = [];
  for (const raw of script.split("\n")) {
    const line = raw.replace(/--.*$/, "").trim();
    if (!line) continue;
    let m: RegExpExecArray | null;
    if (line === "end") out.push("}");
    else if ((m = /^if (.+) then (.+) end$/.exec(line))) out.push(`if (${expr(m[1])}) { ${expr(m[2])}; }`);
    else if ((m = /^if (.+) then$/.exec(line))) out.push(`if (${expr(m[1])}) {`);
    else if ((m = /^local (.+?) = (.+)$/.exec(line))) {
      const names = splitTopLevel(m[1]), values = splitTopLevel(m[2]);
      out.push(names.length === 1 ? `let ${names[0]} = ${expr(values[0])};` : `let [${names.join(", ")}] = [${values.map(expr).join(", ")}];`);
    } else if ((m = /^(\w+) = (.+)$/.exec(line))) out.push(`${m[1]} = ${expr(m[2])};`);
    else out.push(`${expr(line)};`);
  }
  return out.join("\n");
}

export class LuaKv {
  readonly data = new Map<string, Value>();
  readonly ttl = new Map<string, number>();
  readonly bodies: string[] = [];
  evalCount = 0;

  private set(key: string) {
    const v = this.data.get(key) ?? new Set<string>();
    if (!(v instanceof Set)) throw new Error("WRONGTYPE");
    this.data.set(key, v);
    return v;
  }

  private call = (command: string, key: string, ...args: string[]): unknown => {
    switch (command) {
      case "HGET": { const h = this.data.get(key); return h instanceof Map ? h.get(args[0]) ?? false : false; }
      case "HSET": { const h = (this.data.get(key) as Map<string, string> | undefined) ?? new Map<string, string>(); h.set(args[0], args[1]); this.data.set(key, h); return 1; }
      case "INCR": { const n = Number(this.data.get(key) ?? "0") + 1; this.data.set(key, String(n)); return n; }
      case "EXPIRE": { if (this.data.has(key)) this.ttl.set(key, Number(args[0])); return 1; }
      case "TTL": return this.ttl.get(key) ?? -1;
      case "SCARD": { const s = this.data.get(key); return s instanceof Set ? s.size : 0; }
      case "SISMEMBER": { const s = this.data.get(key); return s instanceof Set && s.has(args[0]) ? 1 : 0; }
      case "SMEMBERS": { const s = this.data.get(key); return s instanceof Set ? [...s] : []; }
      case "SADD": { const s = this.set(key); if (s.has(args[0])) return 0; s.add(args[0]); return 1; }
      case "SREM": { const s = this.data.get(key); if (!(s instanceof Set) || !s.delete(args[0])) return 0; if (!s.size) this.data.delete(key); return 1; }
      default: throw new Error(`unsupported ${command}`);
    }
  };

  /** A fetch replacement speaking the Upstash REST single-command protocol. */
  fetch = async (_url: string, init?: RequestInit): Promise<Response> => {
    const body = String(init?.body ?? "");
    this.bodies.push(body);
    const command = JSON.parse(body) as string[];
    if (command[0] !== "EVAL") throw new Error("Unexpected command");
    this.evalCount++;
    const n = Number(command[2]);
    const KEYS = [undefined, ...command.slice(3, 3 + n)];
    const ARGV = [undefined, ...command.slice(3 + n)];
    const run = new Function("call", "KEYS", "ARGV", translateLua(command[1])) as (c: LuaKv["call"], k: unknown[], a: unknown[]) => unknown;
    return Response.json({ result: run(this.call, KEYS, ARGV) });
  };

  keys() { return [...this.data.keys()]; }
}
