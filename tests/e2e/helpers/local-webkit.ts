import type { Page } from "@playwright/test";
/** HTTPS production CSP remains unchanged. Only the HTTP loopback harness
 * needs this WebKit exception; callers also block the loopback service worker. */
export async function allowLoopbackWebKit(page: Page, browserName: string) {
  if (browserName !== "webkit") return;
  await page.route("**/*", async route => {
    const request=route.request(),url=new URL(request.url());
    if(request.resourceType()!=="document"||url.hostname!=="127.0.0.1"||url.protocol!=="http:")return route.fallback();
    const response=await route.fetch(),headers=response.headers();
    if(headers["content-security-policy"])headers["content-security-policy"]=headers["content-security-policy"].replace(/(?:^|;)\s*upgrade-insecure-requests\s*(?=;|$)/g,"");
    return route.fulfill({response,headers});
  });
}
