// Production endpoint verification using https.request (avoids Windows curl TLS issues).
// Run: node scripts/verify-prod.mjs
import https from "node:https";

const HOST = "kakomon-ai.jp";

function req({ method, path, body, headers = {} }) {
  return new Promise((resolve, reject) => {
    const data = body == null ? null : (typeof body === "string" ? body : JSON.stringify(body));
    const options = {
      method,
      hostname: HOST,
      path,
      headers: {
        "user-agent": "ipa-quiz-prod-verify/1.0",
        accept: "application/json,text/html",
        ...(data ? { "content-type": "application/json", "content-length": Buffer.byteLength(data) } : {}),
        ...headers,
      },
    };
    const r = https.request(options, (res) => {
      const chunks = [];
      res.on("data", (c) => chunks.push(c));
      res.on("end", () => {
        const buf = Buffer.concat(chunks);
        resolve({ status: res.statusCode, headers: res.headers, body: buf.toString("utf8") });
      });
    });
    r.on("error", reject);
    if (data) r.write(data);
    r.end();
  });
}

const cases = [
  { name: "GET /admin/team (no auth)", method: "GET", path: "/admin/team", expectStatus: 401 },
  { name: "GET /api/auth/session", method: "GET", path: "/api/auth/session", expectStatus: 200 },
  { name: "POST /api/stripe/checkout (unauth)", method: "POST", path: "/api/stripe/checkout", body: { plan: "premium_monthly" }, expectStatus: 401 },
  { name: "POST /api/webhooks/stripe (no signature)", method: "POST", path: "/api/webhooks/stripe", body: { type: "test" }, expectStatus: 400 },
  { name: "POST /api/contact/enterprise (valid)", method: "POST", path: "/api/contact/enterprise", body: { name: "Test User", email: "test@example.com", company: "Acme", message: "verification probe" }, expectStatus: 200 },
];

const results = [];
for (const c of cases) {
  try {
    const r = await req(c);
    const ok = r.status === c.expectStatus;
    const snippet = (r.body || "").slice(0, 200).replace(/\s+/g, " ");
    results.push({ name: c.name, expected: c.expectStatus, actual: r.status, ok, snippet });
    console.log(`[${ok ? "OK" : "FAIL"}] ${c.name} → ${r.status} (expected ${c.expectStatus})`);
    if (!ok) console.log(`        body: ${snippet}`);
  } catch (e) {
    results.push({ name: c.name, expected: c.expectStatus, actual: "ERR", ok: false, snippet: String(e.message || e) });
    console.log(`[ERR] ${c.name} → ${e.message}`);
  }
}
const allOk = results.every((r) => r.ok);
console.log("");
console.log(JSON.stringify({ allOk, results }, null, 2));
process.exit(allOk ? 0 : 1);
