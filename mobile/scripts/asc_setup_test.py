"""Offline behavior checks. No credentials, ASC writes or review submissions."""
import copy
import hashlib
import json
import os
from pathlib import Path
import re
import struct
import unittest
from unittest.mock import patch

import asc_setup as s


def row(kind, ident, **attrs):
    return {"type": kind, "id": ident, "attributes": attrs, "relationships": {}}


class Fake(s.Client):
    def __init__(self):
        self.calls = []
        self.collections = {
            "/v1/apps/6830358918/subscriptionGroups": [],
            "/v1/apps/6830358918/appInfos": [row("appInfos", "info", state="PREPARE_FOR_SUBMISSION")],
            "/v1/apps/6830358918/appPricePoints": [row("appPricePoints", "free", customerPrice="0.0")],
            "/v1/preReleaseVersions": [row("preReleaseVersions", "pre")],
            "/v1/builds": [row("builds", "build", expired=False)],
            "/v1/apps/6830358918/appStoreVersions": [row("appStoreVersions", "version", appVersionState="PREPARE_FOR_SUBMISSION", releaseType="MANUAL")],
            "/v1/apps/6830358918/reviewSubmissions": [],
        }
        self.single = {
            "/v1/apps/6830358918": row("apps", "6830358918", bundleId="jp.kakomon-ai.app"),
            "/v1/appInfos/info/ageRatingDeclaration": row("ageRatingDeclarations", "age"),
            "/v1/apps/6830358918/appAvailabilityV2": None,
            "/v1/apps/6830358918/appPriceSchedule": None,
        }

    def request(self, method, path, payload=None, query=None):
        self.calls.append((method, path, copy.deepcopy(payload), query))
        if method == "GET":
            if path in self.collections:
                return {"data": copy.deepcopy(self.collections[path])}
            return {"data": copy.deepcopy(self.single[path])}
        if method == "PATCH":
            kind, ident = path.split("/")[-2:]
            a = payload["data"]["attributes"]
            r = row(kind, ident, **a)
            if kind == "subscriptionAppStoreReviewScreenshots":
                r["attributes"]["assetDeliveryState"] = {"state": "COMPLETE"}
                self.single[path] = r
                self.single["/v1/subscriptions/sub/appStoreReviewScreenshot"] = r
            elif kind == "reviewSubmissions":
                r["attributes"]["state"] = "WAITING_FOR_REVIEW"
            return {"data": r}
        assert method == "POST", method
        d = payload["data"]
        kind = d["type"]
        ident = {"subscriptionGroups": "group", "subscriptions": "sub", "reviewSubmissions": "draft"}.get(kind, kind + str(len(self.calls)))
        r = row(kind, ident, **d.get("attributes", {}))
        r["relationships"] = d.get("relationships", {})
        if kind == "subscriptionGroups":
            self.collections["/v1/apps/6830358918/subscriptionGroups"].append(r)
            for child in ("subscriptions", "subscriptionGroupLocalizations", "versions"):
                self.collections[f"/v1/subscriptionGroups/group/{child}"] = []
        elif kind == "subscriptions":
            r["attributes"]["state"] = "MISSING_METADATA"
            self.collections["/v1/subscriptionGroups/group/subscriptions"].append(r)
            for child in ("subscriptionLocalizations", "prices", "versions"):
                self.collections[f"/v1/subscriptions/sub/{child}"] = []
            self.collections["/v1/subscriptions/sub/pricePoints"] = [row("subscriptionPricePoints", "980", customerPrice="980.0")]
            self.single["/v1/subscriptions/sub/subscriptionAvailability"] = None
            self.single["/v1/subscriptions/sub/appStoreReviewScreenshot"] = None
        elif kind in ("subscriptionLocalizations", "subscriptionGroupLocalizations"):
            parent = "subscriptions/sub" if kind == "subscriptionLocalizations" else "subscriptionGroups/group"
            self.collections[f"/v1/{parent}/{kind}"].append(r)
        elif kind == "subscriptionPrices":
            self.collections["/v1/subscriptions/sub/prices"].append(r)
        elif kind == "subscriptionAvailabilities":
            self.single["/v1/subscriptions/sub/subscriptionAvailability"] = r
            self.collections[f"/v1/subscriptionAvailabilities/{ident}/availableTerritories"] = [row("territories", "JPN")]
        elif kind == "subscriptionAppStoreReviewScreenshots":
            r["attributes"].update(assetDeliveryState={"state": "AWAITING_UPLOAD"}, uploadOperations=[{"method": "PUT", "url": "https://upload.example.invalid/image?secret=hidden", "offset": 0, "length": d["attributes"]["fileSize"], "requestHeaders": []}])
        elif kind == "reviewSubmissions":
            self.collections["/v1/apps/6830358918/reviewSubmissions"].append(r)
            self.collections["/v1/reviewSubmissions/draft/items"] = []
        elif kind == "reviewSubmissionItems":
            self.collections["/v1/reviewSubmissions/draft/items"].append(r)
            if "appStoreVersion" in r["relationships"]:
                self.collections["/v1/apps/6830358918/appStoreVersions"][0]["attributes"]["appVersionState"] = "READY_FOR_REVIEW"
        elif kind in ("subscriptionVersions", "subscriptionGroupVersions"):
            r["attributes"]["state"] = "PREPARE_FOR_SUBMISSION"
            parent = "subscriptions/sub" if kind == "subscriptionVersions" else "subscriptionGroups/group"
            self.collections[f"/v1/{parent}/versions"].append(r)
            self.single[f"/v1/{kind}/{ident}"] = r
        return {"data": r}


class SetupTest(unittest.TestCase):
    def setUp(self):
        self.env = patch.dict(os.environ, {"MOBILE_RC_PRODUCT_ID": "kakomon_pro", "ASC_SETTINGS_CONFIRMED": "true", "ASC_EXPORT_EXEMPT_CONFIRMED": "true", "ASC_APP_VERSION": "1.0.0", "ASC_BUILD_NUMBER": "17", "ASC_IAP_REVIEW_CONFIRMED": "true"})
        self.env.start()
        self.addCleanup(self.env.stop)
        self.c = Fake()

    def test_tag_cannot_submit_or_select_other_work(self):
        for mode in ("catalog", "iapshot", "settings", "iapreview"):
            self.assertEqual(s.mode({"CM_TAG": f"asc-kakomon-{mode}-r20261105-1"}), mode)
        for tag in ("", "asc-kakomon-submit-v1.0.0-b17-r1", "asc-kakomon-catalog-rx;evil", "asc-kakomon-catalog-r"):
            with self.assertRaises(s.SetupError):
                s.mode({"CM_TAG": tag})
        with self.assertRaises(s.SetupError):
            s.mode({"CM_TAG": "asc-kakomon-catalog-r1", "SUBMIT_FOR_REVIEW": "true"})

    def test_catalog_retry_does_not_duplicate_products_localizations_or_prices(self):
        s.identity(self.c)
        s.catalog(self.c)
        count = sum(m == "POST" for m, *_ in self.c.calls)
        s.catalog(self.c)
        self.assertEqual(count, sum(m == "POST" for m, *_ in self.c.calls))
        self.assertEqual(len(self.c.collections["/v1/subscriptionGroups/group/subscriptions"]), 1)

    def test_product_mapping_mismatch_has_no_mutation(self):
        with patch.dict(os.environ, {"MOBILE_RC_PRODUCT_ID": "other"}):
            with self.assertRaises(s.SetupError):
                s.catalog(self.c)
        self.assertEqual(self.c.calls, [])

    def test_group_snapshot_alone_blocks_catalog_before_mutation(self):
        s.catalog(self.c)
        self.c.collections["/v1/subscriptionGroups/group/versions"].append(row("subscriptionGroupVersions", "snapshot", state="READY_FOR_REVIEW"))
        self.c.calls.clear()
        with self.assertRaises(s.SetupError):
            s.catalog(self.c)
        self.assertTrue(all(m == "GET" for m, *_ in self.c.calls))

    def test_existing_other_product_blocks_creation(self):
        s.catalog(self.c)
        self.c.collections["/v1/subscriptionGroups/group/subscriptions"][0]["attributes"]["productId"] = "legacy"
        self.c.calls.clear()
        with self.assertRaises(s.SetupError):
            s.catalog(self.c)
        self.assertTrue(all(m == "GET" for m, *_ in self.c.calls))

    def test_settings_declarations_and_exact_export_build(self):
        s.settings(self.c)
        s.export_compliance(self.c)
        patch_age = next(v for m, p, v, _ in self.c.calls if m == "PATCH" and "ageRatingDeclarations" in p)
        self.assertEqual(patch_age["data"]["attributes"]["medicalOrTreatmentInformation"], "FREQUENT")
        build_query = next(q for m, p, _, q in self.c.calls if p == "/v1/builds")
        self.assertEqual(build_query["filter[version]"], "17")
        self.assertEqual(build_query["filter[preReleaseVersion]"], "pre")

    def test_screenshot_upload_commits_checksum_and_observes_complete(self):
        s.catalog(self.c)
        blob = b"actual png bytes for upload boundary test"
        with patch.object(s, "transfer", return_value=b"") as upload:
            result = s.iapshot(self.c, blob)
            s.iapshot(self.c, blob)
        self.assertEqual(upload.call_count, 1)
        self.assertEqual(result["asset_state"], "COMPLETE")
        self.assertNotIn("Authorization", upload.call_args.args[3])
        patch_image = next(v for m, p, v, _ in self.c.calls if m == "PATCH" and "subscriptionAppStoreReviewScreenshots" in p)
        self.assertEqual(patch_image["data"]["attributes"]["sourceFileChecksum"], hashlib.md5(blob).hexdigest())

    def test_iapreview_retries_reuse_same_draft_and_never_submit(self):
        s.catalog(self.c)
        self.c.single["/v1/subscriptions/sub/appStoreReviewScreenshot"] = row("subscriptionAppStoreReviewScreenshots", "image", assetDeliveryState={"state": "COMPLETE"})
        s.iapreview(self.c)
        s.iapreview(self.c)
        self.assertEqual(len(self.c.collections["/v1/reviewSubmissions/draft/items"]), 3)
        self.assertFalse(any(m == "PATCH" and "/reviewSubmissions/" in p for m, p, *_ in self.c.calls))

    def test_iapreview_partial_add_failure_reuses_app_and_safe_snapshots(self):
        s.catalog(self.c)
        self.c.single["/v1/subscriptions/sub/appStoreReviewScreenshot"] = row("subscriptionAppStoreReviewScreenshots", "image", assetDeliveryState={"state": "COMPLETE"})
        original = self.c.create
        def fail_group(kind, *args, **kwargs):
            if kind == "subscriptionGroupVersions":
                raise s.SetupError("temporary failure before snapshot creation")
            return original(kind, *args, **kwargs)
        with patch.object(self.c, "create", side_effect=fail_group), self.assertRaises(s.SetupError):
            s.iapreview(self.c)
        s.iapreview(self.c)
        self.assertEqual(len(self.c.collections["/v1/reviewSubmissions/draft/items"]), 3)

    def test_unlinked_snapshots_are_never_silently_reused(self):
        s.catalog(self.c)
        self.c.single["/v1/subscriptions/sub/appStoreReviewScreenshot"] = row("subscriptionAppStoreReviewScreenshots", "image", assetDeliveryState={"state": "COMPLETE"})
        self.c.collections["/v1/subscriptionGroups/group/versions"].append(row("subscriptionGroupVersions", "stale", state="PREPARE_FOR_SUBMISSION"))
        with self.assertRaises(s.SetupError):
            s.iapreview(self.c)
        self.assertFalse(any(m == "POST" and v["data"].get("relationships", {}).get("subscriptionGroupVersion") for m, _, v, _ in self.c.calls if v))

    def test_foreign_pagination_url_cannot_receive_jwt(self):
        with patch.object(s, "transfer") as transfer:
            with self.assertRaises(s.SetupError):
                s.Client().request("GET", "https://evil.example.invalid/next")
        transfer.assert_not_called()

    def prepare_submit(self):
        s.catalog(self.c)
        self.c.single["/v1/subscriptions/sub/appStoreReviewScreenshot"] = row("subscriptionAppStoreReviewScreenshots", "image", assetDeliveryState={"state": "COMPLETE"})
        s.iapreview(self.c)
        self.c.collections["/v1/apps/6830358918/appStoreVersions"][0]["attributes"]["appVersionState"] = "READY_FOR_REVIEW"
        self.c.single["/v1/appStoreVersions/version/build"] = row("builds", "build", version="17", expired=False, processingState="VALID")
        self.c.single["/v1/appStoreVersions/version/appStoreReviewDetail"] = row("appStoreReviewDetails", "detail", demoAccountRequired=True, contactFirstName="Test", contactLastName="Test", contactPhone="Test", contactEmail="Test", demoAccountName="App Review", demoAccountPassword="A" * 43, notes="Test")
        for path, resource in self.c.single.items():
            if path.startswith(("/v1/subscriptionVersions/", "/v1/subscriptionGroupVersions/")):
                resource["attributes"]["state"] = "READY_FOR_REVIEW"

    def submit_env(self):
        return patch.dict(os.environ, {"CM_TAG": "asc-kakomon-submit-v1.0.0-b17-rtest", "CM_TRIGGER_SOURCE": "webhook", "SUBMIT_FOR_REVIEW": "true", "ASC_REVIEW_INFO_READY": "true", "ASC_PREREQUISITES_CONFIRMED": "true", "ASC_COPYRIGHT": "2026 Test"})

    def test_only_exact_three_item_draft_can_submit(self):
        self.prepare_submit()
        with self.submit_env():
            result = s.submit_staged(self.c)
        self.assertTrue(result["submitted_for_review"])
        self.assertFalse(result["released"])

    def test_extra_item_or_wrong_build_blocks_submission(self):
        self.prepare_submit()
        self.c.single["/v1/appStoreVersions/version/build"]["attributes"]["version"] = "18"
        with self.submit_env(), self.assertRaises(s.SetupError):
            s.submit_staged(self.c)
        self.c.single["/v1/appStoreVersions/version/build"]["attributes"]["version"] = "17"
        self.c.collections["/v1/reviewSubmissions/draft/items"].append(row("reviewSubmissionItems", "unexpected"))
        with self.submit_env(), self.assertRaises(s.SetupError):
            s.submit_staged(self.c)
        self.assertFalse(any(m == "PATCH" and "/reviewSubmissions/" in p for m, p, *_ in self.c.calls))

    def test_automatic_release_setting_blocks_stage_and_submit(self):
        self.prepare_submit()
        self.c.collections["/v1/apps/6830358918/appStoreVersions"][0]["attributes"]["releaseType"] = "AFTER_APPROVAL"
        with self.assertRaises(s.SetupError):
            s.iapreview(self.c)
        with self.submit_env(), self.assertRaises(s.SetupError):
            s.submit_staged(self.c)
        self.assertFalse(any(m == "PATCH" and "/reviewSubmissions/" in p for m, p, *_ in self.c.calls))

    def test_png_digest_validation_precedes_api_calls(self):
        blob = b"\x89PNG\r\n\x1a\n" + b"\x00" * 8 + struct.pack(">II", 1206, 2622) + b"test"
        with patch.dict(os.environ, {"ASC_IAP_SCREENSHOT_SHA256": "0" * 64, "ASC_IAP_SCREENSHOT_URL": "https://example.invalid/image"}), patch.object(s, "transfer", return_value=blob):
            with self.assertRaises(s.SetupError):
                s.screenshot_bytes()

    @unittest.skipUnless(os.environ.get("ASC_OPENAPI_PATH"), "Optional official OpenAPI contract check")
    def test_requests_match_apples_downloaded_openapi(self):
        import jsonschema
        spec = json.loads(Path(os.environ["ASC_OPENAPI_PATH"]).read_text(encoding="utf-8"))
        s.catalog(self.c)
        s.settings(self.c)
        s.export_compliance(self.c)
        with patch.object(s, "transfer", return_value=b""):
            s.iapshot(self.c, b"screenshot")
        s.iapreview(self.c)
        # Seed actual staged resources without running catalog after snapshots exist.
        self.c.collections["/v1/apps/6830358918/appStoreVersions"][0]["attributes"]["appVersionState"] = "READY_FOR_REVIEW"
        self.c.single["/v1/appStoreVersions/version/build"] = row("builds", "build", version="17", expired=False, processingState="VALID")
        self.c.single["/v1/appStoreVersions/version/appStoreReviewDetail"] = row("appStoreReviewDetails", "detail", demoAccountRequired=True, contactFirstName="Test", contactLastName="Test", contactPhone="Test", contactEmail="Test", demoAccountName="App Review", demoAccountPassword="A" * 43, notes="Test")
        for path, resource in self.c.single.items():
            if path.startswith(("/v1/subscriptionVersions/", "/v1/subscriptionGroupVersions/")):
                resource["attributes"]["state"] = "READY_FOR_REVIEW"
        with self.submit_env():
            s.submit_staged(self.c)
        for method, path, payload, query in self.c.calls:
            template = next((p for p in spec["paths"] if re.fullmatch(re.sub(r"\{[^}]+\}", r"[^/]+", p), path)), None)
            self.assertIsNotNone(template, path)
            operation = spec["paths"][template][method.lower()]
            allowed = {v["name"]: v["schema"] for v in operation.get("parameters", []) if v["in"] == "query"}
            self.assertTrue(set(query or {}) <= set(allowed), (path, query))
            for key, value in (query or {}).items():
                schema = allowed[key]
                jsonschema.validate(value.split(",") if schema.get("type") == "array" else value, schema)
            if payload:
                schema = operation["requestBody"]["content"]["application/json"]["schema"]
                jsonschema.validate(payload, {**schema, "components": spec["components"]})


if __name__ == "__main__":
    unittest.main()
