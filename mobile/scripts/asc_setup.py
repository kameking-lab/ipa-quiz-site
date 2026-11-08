"""ASC5 preparation only: no review submission, release, Apple ID or passwords.

Apple OpenAPI 4.6 (2026-11-05). All mutations require a dedicated tag and an
explicit non-secret confirmation. Credentials stay in the Codemagic integration.
"""
import hashlib
import json
import os
from pathlib import Path
import re
import struct
import sys
import time
from decimal import Decimal
from datetime import date
from urllib.error import HTTPError
from urllib.parse import urlencode, urlsplit
from urllib.request import Request, build_opener, HTTPRedirectHandler

ROOT = Path(__file__).resolve().parents[1]
PLAN = json.loads((ROOT / "asc/setup.json").read_text(encoding="utf-8"))
API = "https://api.appstoreconnect.apple.com"
TAG = re.compile(r"asc-kakomon-(catalog|iapshot|settings|iapreview)-r[A-Za-z0-9][A-Za-z0-9-]{0,39}\Z")


class SetupError(RuntimeError):
    pass


class HttpFailure(SetupError):
    def __init__(self, status):
        self.status = status
        super().__init__(f"Remote request failed (HTTP {status}); no response body logged")


def require(condition, message):
    if not condition:
        raise SetupError(message)


class NoRedirect(HTTPRedirectHandler):
    def redirect_request(self, *args, **kwargs):
        return None  # Never forward JWT or signed asset URLs to a redirect.


def transfer(method, url, body=None, headers=None):
    require(urlsplit(url).scheme == "https" and not urlsplit(url).username, "HTTPS required")
    try:
        with build_opener(NoRedirect).open(Request(url, body, headers or {}, method=method), timeout=60) as r:
            return r.read()
    except HTTPError as error:
        # Error bodies / URLs can contain credentials or signed upload parameters.
        raise HttpFailure(error.code) from None


class Client:
    def token(self):
        from asc_auth import client
        if not hasattr(self, "_auth_client"):
            self._auth_client = client()
        return self._auth_client.jwt

    def request(self, method, path, payload=None, query=None):
        url = path if path.startswith("https://") else API + path
        require(urlsplit(url).scheme == "https" and urlsplit(url).netloc == urlsplit(API).netloc, "Foreign API origin rejected")
        if query:
            url += "?" + urlencode(query)
        result = transfer(method, url, None if payload is None else json.dumps(payload).encode(),
                          {"Authorization": "Bearer " + self.token(), "Content-Type": "application/json"})
        return json.loads(result) if result else {}

    def all(self, path, query=None):
        result, seen = [], set()
        while path:
            require(path not in seen, "Pagination loop")
            seen.add(path)
            page = self.request("GET", path, query=query)
            require(isinstance(page.get("data"), list), "Expected collection")
            result.extend(page["data"])
            path, query = page.get("links", {}).get("next"), None
        return result

    def one(self, path, query=None):
        return self.request("GET", path, query=query)["data"]

    def optional(self, path):
        try:
            return self.one(path)
        except HttpFailure as error:
            if error.status != 404:
                raise
            return None

    def create(self, kind, attributes=None, relationships=None, included=None, version="v1"):
        data = {"type": kind}
        if attributes is not None:
            data["attributes"] = attributes
        if relationships is not None:
            data["relationships"] = relationships
        payload = {"data": data}
        if included is not None:
            payload["included"] = included
        return self.request("POST", f"/{version}/{kind}", payload)["data"]

    def patch(self, kind, ident, attributes):
        return self.request("PATCH", f"/v1/{kind}/{ident}", {"data": {"type": kind, "id": ident, "attributes": attributes}})["data"]


def ref(kind, ident):
    return {"data": {"type": kind, "id": ident}}


def unique(rows, label):
    require(len(rows) == 1, "Expected exactly one " + label)
    return rows[0]


def identity(c):
    app = c.one(f"/v1/apps/{PLAN['appId']}")
    require(app["id"] == PLAN["appId"] and app["attributes"]["bundleId"] == PLAN["bundleId"], "ASC app identity mismatch")


def product(c, create=False):
    groups = c.all(f"/v1/apps/{PLAN['appId']}/subscriptionGroups")
    products = [(g, p) for g in groups for p in c.all(f"/v1/subscriptionGroups/{g['id']}/subscriptions")]
    matches = [(g, p) for g, p in products if p["attributes"]["productId"] == PLAN["productId"]]
    require(len(matches) <= 1, "Duplicate product ID")
    if matches:
        g, p = matches[0]
        require(p["attributes"].get("subscriptionPeriod") == "ONE_MONTH", "Existing product period mismatch")
        require(not p["attributes"].get("familySharable"), "Existing Family Sharing requires separate review")
        require(p["attributes"].get("state") in ("MISSING_METADATA", "READY_TO_SUBMIT", "DEVELOPER_ACTION_NEEDED"), "Only unsubmitted products can be prepared")
        return g, p
    require(create, "Create catalog first")
    # Do not create a second commercial product alongside an unknown existing one.
    require(not products, "Other product IDs already exist; reconcile ASC and RevenueCat first")
    named = [g for g in groups if g["attributes"]["referenceName"] == PLAN["groupName"]]
    require(len(named) <= 1 and (named or not groups), "Unknown subscription groups; reconcile first")
    g = named[0] if named else c.create("subscriptionGroups", {"referenceName": PLAN["groupName"]}, {"app": ref("apps", PLAN["appId"])})
    p = c.create("subscriptions", {"name": PLAN["referenceName"], "productId": PLAN["productId"],
                 "subscriptionPeriod": "ONE_MONTH", "familySharable": False, "groupLevel": 1, "reviewNote": PLAN["reviewNote"]}, {"group": ref("subscriptionGroups", g["id"])})
    return g, p


def localize(c, parent, parent_id, kind, relationship, values):
    rows = c.all(f"/v1/{parent}/{parent_id}/{kind}")
    ja = [r for r in rows if r["attributes"]["locale"] == "ja"]
    require(len(ja) <= 1, "Duplicate Japanese localization")
    if ja:
        if any(ja[0]["attributes"].get(k) != v for k, v in values.items()):
            c.patch(kind, ja[0]["id"], values)
    else:
        c.create(kind, {**values, "locale": "ja"}, {relationship: ref(parent, parent_id)})


def catalog(c):
    require(os.environ.get("MOBILE_RC_PRODUCT_ID") == PLAN["productId"], "Confirm MOBILE_RC_PRODUCT_ID=kakomon_pro in Codemagic / RevenueCat")
    g, p = product(c, create=True)
    sid = p["id"]
    versions = c.all(f"/v1/subscriptions/{sid}/versions")
    versions += c.all(f"/v1/subscriptionGroups/{g['id']}/versions")
    require(not any(v["attributes"].get("state") in ("PREPARE_FOR_SUBMISSION", "READY_FOR_REVIEW", "WAITING_FOR_REVIEW", "IN_REVIEW") for v in versions), "IAP snapshot already exists; do not change its source metadata")
    # Check existing pricing / territories before changing localized metadata.
    prices = c.all(f"/v1/subscriptions/{sid}/prices", {"include": "subscriptionPricePoint,territory"})
    require(len(prices) <= 1, "Multiple current/future prices; reconcile without automatic replacement")
    points = c.all(f"/v1/subscriptions/{sid}/pricePoints", {"filter[territory]": "JPN"})
    point = unique([v for v in points if Decimal(v["attributes"]["customerPrice"]) == Decimal(980)], "JPY 980 price point")
    if prices:
        a = prices[0]
        require(a["relationships"]["subscriptionPricePoint"]["data"]["id"] == point["id"] and (a["attributes"].get("startDate") or "0000") <= date.today().isoformat(), "Existing/future price differs; no price replacement")
    availability = c.optional(f"/v1/subscriptions/{sid}/subscriptionAvailability")
    if availability:
        territories = c.all(f"/v1/subscriptionAvailabilities/{availability['id']}/availableTerritories")
        require([t["id"] for t in territories] == ["JPN"] and not availability["attributes"]["availableInNewTerritories"], "Existing subscription availability differs; no removal")
    c.patch("subscriptions", sid, {"reviewNote": PLAN["reviewNote"]})
    localize(c, "subscriptionGroups", g["id"], "subscriptionGroupLocalizations", "subscriptionGroup", {"name": PLAN["displayName"]})
    localize(c, "subscriptions", sid, "subscriptionLocalizations", "subscription", {"name": PLAN["displayName"], "description": PLAN["description"]})
    if not prices:
        c.create("subscriptionPrices", {"preserveCurrentPrice": True}, {"subscription": ref("subscriptions", sid), "territory": ref("territories", "JPN"), "subscriptionPricePoint": ref("subscriptionPricePoints", point["id"])})
    if not availability:
        c.create("subscriptionAvailabilities", {"availableInNewTerritories": False}, {"subscription": ref("subscriptions", sid), "availableTerritories": {"data": [{"type": "territories", "id": "JPN"}]}})
    return {"subscription_id": sid, "group_id": g["id"], "price": "JPY 980 / ONE_MONTH", "territory": "JPN", "review_screenshot": "run iapshot after actual paywall capture and RevenueCat linkage"}


def screenshot_bytes():
    digest = os.environ.get("ASC_IAP_SCREENSHOT_SHA256", "")
    require(re.fullmatch(r"[0-9a-f]{64}", digest), "Set actual paywall screenshot SHA256")
    path = os.environ.get("ASC_IAP_SCREENSHOT_PATH")
    blob = Path(path).read_bytes() if path else transfer("GET", os.environ.get("ASC_IAP_SCREENSHOT_URL", ""))
    require(hashlib.sha256(blob).hexdigest() == digest, "Screenshot SHA256 mismatch")
    require(blob[:8] == b"\x89PNG\r\n\x1a\n" and 24 < len(blob) <= 20_000_000, "Use an actual PNG screenshot, at most 20 MB")
    width, height = struct.unpack(">II", blob[16:24])
    require((width, height) in ((1206, 2622), (1320, 2868), (1284, 2778), (1242, 2688)), "Unsupported portrait iPhone screenshot dimensions")
    return blob


def iapshot(c, blob):
    _, p = product(c)
    kind = "subscriptionAppStoreReviewScreenshots"
    current = c.optional(f"/v1/subscriptions/{p['id']}/appStoreReviewScreenshot")
    checksum = hashlib.md5(blob).hexdigest()  # Apple's asset integrity protocol.
    if current:
        a = current["attributes"]
        require(a.get("sourceFileChecksum") == checksum or (not a.get("sourceFileChecksum") and a.get("fileName") == "kakomon-pro-paywall.png" and a.get("fileSize") == len(blob) and a.get("assetDeliveryState", {}).get("state") == "AWAITING_UPLOAD"), "Existing screenshot differs; explicit replacement needed")
        image = current
    else:
        image = c.create(kind, {"fileName": "kakomon-pro-paywall.png", "fileSize": len(blob)}, {"subscription": ref("subscriptions", p["id"])})
    if image["attributes"].get("assetDeliveryState", {}).get("state") == "AWAITING_UPLOAD" or not current:
        ops = image["attributes"].get("uploadOperations", [])
        intervals = sorted((op["offset"], op["offset"] + op["length"]) for op in ops)
        require(intervals and intervals[0][0] == 0 and intervals[-1][1] == len(blob) and all(a[1] == b[0] for a, b in zip(intervals, intervals[1:])), "Upload operations must cover entire image exactly")
        for op in ops:
            require(op["method"] == "PUT", "Unexpected asset upload method")
            start, size = op["offset"], op["length"]
            require(0 <= start < len(blob) and 0 < size <= len(blob) - start, "Invalid upload chunk")
            transfer("PUT", op["url"], blob[start:start + size], {h["name"]: h["value"] for h in op.get("requestHeaders", [])})
        c.patch(kind, image["id"], {"uploaded": True, "sourceFileChecksum": checksum})
    for attempt in range(24):
        image = c.one(f"/v1/{kind}/{image['id']}")
        state = image["attributes"].get("assetDeliveryState", {}).get("state")
        if state == "COMPLETE":
            require(image["attributes"].get("sourceFileChecksum") == checksum, "Committed image checksum mismatch")
            return {"subscription_id": p["id"], "screenshot_id": image["id"], "asset_state": state, "sha256": hashlib.sha256(blob).hexdigest()}
        require(state not in ("FAILED", "UPLOAD_FAILED"), "Apple rejected screenshot processing")
        time.sleep(5)
    raise SetupError("Screenshot not COMPLETE yet; retry after processing")


def settings(c):
    # These values are declarations, never inferred from API presence.
    require(os.environ.get("ASC_SETTINGS_CONFIRMED") == "true", "Confirm ASC1 age/content rights, free app and Japan-only distribution")
    appid = PLAN["appId"]
    infos = c.all(f"/v1/apps/{appid}/appInfos")
    info = unique([v for v in infos if v["attributes"].get("state", v["attributes"].get("appStoreState")) in ("PREPARE_FOR_SUBMISSION", "DEVELOPER_REJECTED", "REJECTED", "METADATA_REJECTED")], "editable app info")
    age = c.one(f"/v1/appInfos/{info['id']}/ageRatingDeclaration")
    require(age is not None, "Age declaration missing")
    # Preserve availability of existing releases: reject mismatches instead of removal.
    availability = c.optional(f"/v1/apps/{appid}/appAvailabilityV2")
    if availability:
        territories = c.all(f"/v2/appAvailabilities/{availability['id']}/territoryAvailabilities", {"include": "territory"})
        available = [t["relationships"]["territory"]["data"]["id"] for t in territories if t["attributes"]["available"]]
        require(available == ["JPN"] and not availability["attributes"]["availableInNewTerritories"], "App availability differs; explicit migration needed")
    free = unique([v for v in c.all(f"/v1/apps/{appid}/appPricePoints", {"filter[territory]": "JPN"}) if Decimal(v["attributes"]["customerPrice"]) == 0], "free app price point")
    schedule = c.optional(f"/v1/apps/{appid}/appPriceSchedule")
    if schedule:
        prices = c.all(f"/v1/appPriceSchedules/{schedule['id']}/manualPrices", {"include": "appPricePoint,territory"})
        require(len(prices) == 1 and prices[0]["relationships"]["appPricePoint"]["data"]["id"] == free["id"] and (prices[0]["attributes"].get("startDate") or "0000") <= date.today().isoformat() and not prices[0]["attributes"].get("endDate"), "Existing app price schedule differs; no automatic replacement")
    c.patch("ageRatingDeclarations", age["id"], PLAN["ageRating"])
    c.patch("apps", appid, {"primaryLocale": "ja", "contentRightsDeclaration": "USES_THIRD_PARTY_CONTENT"})
    if not schedule:
        priceid = "${free-price}"
        c.create("appPriceSchedules", relationships={"app": ref("apps", appid), "baseTerritory": ref("territories", "JPN"), "manualPrices": {"data": [{"type": "appPrices", "id": priceid}]}}, included=[{"type": "appPrices", "id": priceid, "attributes": {}, "relationships": {"appPricePoint": ref("appPricePoints", free["id"])}}])
    if not availability:
        territoryid = "${japan}"
        c.create("appAvailabilities", {"availableInNewTerritories": False}, {"app": ref("apps", appid), "territoryAvailabilities": {"data": [{"type": "territoryAvailabilities", "id": territoryid}]}}, [{"type": "territoryAvailabilities", "id": territoryid, "attributes": {"available": True}, "relationships": {"territory": ref("territories", "JPN")}}], version="v2")
    return {"age_rating_updated": True, "app_price": "free", "territory": "JPN", "content_rights": "USES_THIRD_PARTY_CONTENT"}


def export_compliance(c):
    require(os.environ.get("ASC_EXPORT_EXEMPT_CONFIRMED") == "true", "Confirm final Archive encryption exemption before declaration")
    version, number = os.environ.get("ASC_APP_VERSION", ""), os.environ.get("ASC_BUILD_NUMBER", "")
    require(re.fullmatch(r"\d+\.\d+(?:\.\d+)?", version) and re.fullmatch(r"[1-9]\d*", number), "Explicit app version/build required for encryption declaration")
    pre = unique(c.all("/v1/preReleaseVersions", {"filter[app]": PLAN["appId"], "filter[version]": version, "filter[platform]": "IOS"}), "prerelease version")
    build = unique(c.all("/v1/builds", {"filter[app]": PLAN["appId"], "filter[preReleaseVersion]": pre["id"], "filter[version]": number, "filter[processingState]": "VALID"}), "processed build")
    require(not build["attributes"]["expired"], "Build expired")
    require(build["attributes"].get("usesNonExemptEncryption") is not True, "Build already declares non-exempt encryption; reconcile first")
    c.patch("builds", build["id"], {"usesNonExemptEncryption": False})
    return {"build": number, "version": version, "uses_non_exempt_encryption": False}


def iapreview(c):
    require(os.environ.get("ASC_IAP_REVIEW_CONFIRMED") == "true", "Confirm product screenshot, app review access and first-IAP review readiness")
    g, p = product(c)
    shot = c.one(f"/v1/subscriptions/{p['id']}/appStoreReviewScreenshot")
    require(shot and shot["attributes"].get("assetDeliveryState", {}).get("state") == "COMPLETE", "Complete IAP review screenshot required")
    version = os.environ.get("ASC_APP_VERSION", "")
    require(re.fullmatch(r"\d+\.\d+(?:\.\d+)?", version), "Explicit ASC_APP_VERSION required")
    v = unique(c.all(f"/v1/apps/{PLAN['appId']}/appStoreVersions", {"filter[platform]": "IOS", "filter[versionString]": version}), "app version")
    state = v["attributes"].get("appVersionState", v["attributes"].get("appStoreState"))
    require(state in ("PREPARE_FOR_SUBMISSION", "DEVELOPER_REJECTED", "REJECTED", "METADATA_REJECTED", "READY_FOR_REVIEW"), "App version not editable/staged")
    require(v["attributes"].get("releaseType") == "MANUAL", "App releaseType must be MANUAL")
    drafts = c.all(f"/v1/apps/{PLAN['appId']}/reviewSubmissions", {"filter[platform]": "IOS", "filter[state]": "READY_FOR_REVIEW"})
    require(len(drafts) <= 1, "Ambiguous review drafts")
    require(state != "READY_FOR_REVIEW" or drafts, "Staged app has no reusable ready draft")
    draft = drafts[0] if drafts else c.create("reviewSubmissions", {"platform": "IOS"}, {"app": ref("apps", PLAN["appId"])})
    items = c.all(f"/v1/reviewSubmissions/{draft['id']}/items")
    def add(relationship, kind, ident):
        c.create("reviewSubmissionItems", relationships={"reviewSubmission": ref("reviewSubmissions", draft["id"]), relationship: ref(kind, ident)})
    existing_apps = [i.get("relationships", {}).get("appStoreVersion", {}).get("data") for i in items]
    require(all(not a or a["id"] == v["id"] for a in existing_apps), "Draft contains another app version")
    require(state != "READY_FOR_REVIEW" or any(a and a["id"] == v["id"] for a in existing_apps), "App staged in a different draft")
    if not any(a and a["id"] == v["id"] for a in existing_apps):
        add("appStoreVersion", "appStoreVersions", v["id"])
    for parent, ident, kind, relation in [("subscriptionGroups", g["id"], "subscriptionGroupVersions", "subscriptionGroup"), ("subscriptions", p["id"], "subscriptionVersions", "subscription")]:
        attached = [i.get("relationships", {}).get(relation + "Version", {}).get("data") for i in items]
        versions = c.all(f"/v1/{parent}/{ident}/versions")
        ready = [a for a in versions if a["attributes"].get("state") in ("PREPARE_FOR_SUBMISSION", "READY_FOR_REVIEW")]
        require(len(ready) <= 1, "Ambiguous IAP draft versions")
        require(not ready or any(a and a["id"] == ready[0]["id"] for a in attached), "Unlinked IAP snapshot may be stale; reconcile explicitly before staging")
        target = ready[0] if ready else c.create(kind, relationships={relation: ref(parent, ident)})
        if not any(a and a["id"] == target["id"] for a in attached):
            add(relation + "Version", kind, target["id"])
    return {"review_submission_id": draft["id"], "app_version": version, "iap_items_staged": True}


def mode(env):
    match = TAG.fullmatch(env.get("CM_TAG", ""))
    require(match is not None, "Dedicated ASC5 preparation tag required")
    require(env.get("SUBMIT_FOR_REVIEW", "false") == "false", "Preparation cannot submit")
    return match[1]


def submit_staged(c):
    """Called only by the existing guarded submit lane, after metadata upload.

    fastlane 2.241.2 refuses an existing draft with IAP items. Validate the exact
    three-item draft and submit it directly instead of deleting those items.
    """
    require(re.fullmatch(r"asc-kakomon-submit-v[0-9]+\.[0-9]+(?:\.[0-9]+)?-b[1-9][0-9]*-r[A-Za-z0-9][A-Za-z0-9-]{0,39}", os.environ.get("CM_TAG", "")) and os.environ.get("CM_TRIGGER_SOURCE") == "webhook", "Dedicated submit tag webhook required")
    require(all(os.environ.get(k) == "true" for k in ("SUBMIT_FOR_REVIEW", "ASC_REVIEW_INFO_READY", "ASC_PREREQUISITES_CONFIRMED")) and os.environ.get("ASC_COPYRIGHT", "").strip(), "Existing submission prerequisites required")
    version, number = os.environ.get("ASC_APP_VERSION"), os.environ.get("ASC_BUILD_NUMBER")
    require(f"-v{version}-b{number}-r" in os.environ["CM_TAG"], "Submit tag version/build mismatch")
    versions = c.all(f"/v1/apps/{PLAN['appId']}/appStoreVersions", {"filter[platform]": "IOS", "filter[versionString]": version})
    v = unique(versions, "app version")
    require(v["attributes"].get("appVersionState", v["attributes"].get("appStoreState")) == "READY_FOR_REVIEW", "Staged app version must be READY_FOR_REVIEW")
    require(v["attributes"].get("releaseType") == "MANUAL", "App releaseType must be MANUAL before submission")
    build = c.one(f"/v1/appStoreVersions/{v['id']}/build")
    require(build and build["attributes"]["version"] == number and not build["attributes"]["expired"] and build["attributes"]["processingState"] == "VALID", "Staged build mismatch")
    detail = c.one(f"/v1/appStoreVersions/{v['id']}/appStoreReviewDetail")
    required = ("contactFirstName", "contactLastName", "contactPhone", "contactEmail", "demoAccountName", "demoAccountPassword", "notes")
    require(detail and detail["attributes"].get("demoAccountRequired") is True and all(detail["attributes"].get(k) for k in required), "Complete review access required")
    g, p = product(c)
    draft = unique(c.all(f"/v1/apps/{PLAN['appId']}/reviewSubmissions", {"filter[platform]": "IOS", "filter[state]": "READY_FOR_REVIEW"}), "ready review draft")
    items = c.all(f"/v1/reviewSubmissions/{draft['id']}/items")
    require(len(items) == 3, "Expected app + subscription + subscription-group draft items only")
    for relationship, kind, parent, expected in [("appStoreVersion", "appStoreVersions", None, v["id"]), ("subscriptionVersion", "subscriptionVersions", "subscription", p["id"]), ("subscriptionGroupVersion", "subscriptionGroupVersions", "subscriptionGroup", g["id"])]:
        linked = [i.get("relationships", {}).get(relationship, {}).get("data") for i in items]
        link = unique([a for a in linked if a], relationship)
        if parent:
            resource = c.one(f"/v1/{kind}/{link['id']}")
            require(resource["relationships"][parent]["data"]["id"] == expected and resource["attributes"]["state"] == "READY_FOR_REVIEW", "IAP review item identity/state mismatch")
        else:
            require(link["id"] == expected, "Draft app version mismatch")
    response = c.patch("reviewSubmissions", draft["id"], {"submitted": True})
    require(response["attributes"].get("state") in ("WAITING_FOR_REVIEW", "IN_REVIEW", "COMPLETING", "COMPLETE"), "ASC did not confirm submitted draft")
    return {"review_submission_id": draft["id"], "submitted_for_review": True, "released": False}


def main():
    if "--submit-staged-review" in sys.argv:
        c = Client()
        identity(c)
        submit_staged(c)
        print("ASC5 exact app/IAP draft submitted; release remains manual")
        return
    action = mode(os.environ)
    if "--validate" in sys.argv:
        print("ASC5 preparation tag validation PASS")
        return
    require(os.environ.get("ASC_SETUP_CONFIRMED") == "true", "Set ASC_SETUP_CONFIRMED=true after reconciling ASC / production / RevenueCat")
    blob = screenshot_bytes() if action == "iapshot" else None  # Verify source before mutations.
    c = Client()
    identity(c)
    result = {"mode": action, "app_id": PLAN["appId"], "submitted_for_review": False, "released": False}
    if action == "catalog":
        result.update(catalog(c))
    elif action == "iapshot":
        result.update(iapshot(c, blob))
    elif action == "settings":
        require(os.environ.get("ASC_SETTINGS_CONFIRMED") == "true", "Confirm settings plan first")
        # Validate exemption/build parameters before any setting is changed.
        result.update(export_compliance(c))
        result.update(settings(c))
    elif action == "iapreview":
        result.update(iapreview(c))
    out = ROOT / "build/asc"
    out.mkdir(parents=True, exist_ok=True)
    (out / "setup-result.json").write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding="utf-8")
    print("ASC5 preparation complete; observed details in setup-result.json; submission=false")


if __name__ == "__main__":
    try:
        main()
    except SetupError as error:
        print("ASC5 stopped: " + str(error) + "; submission=false", file=sys.stderr)
        sys.exit(1)
    except Exception:
        # Avoid traceback / exception strings containing URLs, JWTs or key material.
        print("ASC5 preparation failed; no submission. Reconcile tag, confirmation flags, API role, existing resources and screenshot; see setup README.", file=sys.stderr)
        sys.exit(1)
