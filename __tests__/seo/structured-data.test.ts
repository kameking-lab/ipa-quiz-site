import { describe, expect, it } from "vitest";

import { SITE_BASE_URL } from "@/lib/seo/config";
import {
  buildOrgNode,
  buildWebPageNode,
  ORG_ID,
  SITE_ID,
  SITE_LOGO_IMAGE,
} from "@/lib/seo/structured-data";

describe("structured-data singleton @ids", () => {
  it("anchors site and org @ids under the site base URL with distinct fragments", () => {
    expect(SITE_ID.startsWith(SITE_BASE_URL)).toBe(true);
    expect(ORG_ID.startsWith(SITE_BASE_URL)).toBe(true);
    expect(SITE_ID).not.toBe(ORG_ID);
    expect(SITE_ID).toContain("#");
    expect(ORG_ID).toContain("#");
  });
});

describe("buildOrgNode", () => {
  const org = buildOrgNode();

  it("is an EducationalOrganization keyed by the shared ORG_ID", () => {
    expect(org["@type"]).toBe("EducationalOrganization");
    expect(org["@id"]).toBe(ORG_ID);
    expect(org.url).toBe(SITE_BASE_URL);
  });

  it("references the shared logo image object", () => {
    expect(org.logo).toBe(SITE_LOGO_IMAGE);
    expect(org.logo.width).toBe(512);
    expect(org.logo.height).toBe(512);
    expect(org.logo.url.endsWith("/icon-512.svg")).toBe(true);
  });
});

describe("buildWebPageNode @graph wiring", () => {
  const url = `${SITE_BASE_URL}/some-page`;
  const node = buildWebPageNode(url, "ページ名", "ページの説明");

  it("echoes url / name / description and declares Japanese", () => {
    expect(node["@type"]).toBe("WebPage");
    expect(node.url).toBe(url);
    expect(node.name).toBe("ページ名");
    expect(node.description).toBe("ページの説明");
    expect(node.inLanguage).toBe("ja");
  });

  it("derives its @id from the page url", () => {
    expect(node["@id"]).toBe(`${url}#webpage`);
  });

  it("links isPartOf to SITE_ID and publisher to the Organization node", () => {
    // These cross-references must match the singleton @ids exactly, otherwise
    // the JSON-LD @graph fails to link (broken Rich Results entity graph).
    expect(node.isPartOf["@id"]).toBe(SITE_ID);
    expect(node.publisher["@id"]).toBe(ORG_ID);
    expect(node.publisher["@id"]).toBe(buildOrgNode()["@id"]);
  });
});
