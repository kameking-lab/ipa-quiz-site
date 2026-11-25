"""Submit the listed iOS 1.0.3 update or read its App Store Connect status."""

from datetime import datetime
import json
import logging
import os
import re
import sys
import time

from asc_setup import Client, HttpFailure, ROOT, SetupError, identity, ref, require, unique


APP = "/v1/apps/6830358918"
VERSION = "1.0.3"
BUILD_STARTED = datetime.fromisoformat("2026-11-25T02:09:31+00:00")
TAG = re.compile(r"asc-iosrel25-(build|submit|status)-v1\.0\.3-b([1-9][0-9]*)-r[A-Za-z0-9-]{1,40}")
EDITABLE = {"PREPARE_FOR_SUBMISSION", "DEVELOPER_REJECTED", "REJECTED", "METADATA_REJECTED"}
SUBMITTED = {"WAITING_FOR_REVIEW", "IN_REVIEW", "COMPLETING", "COMPLETE"}
REVIEW_CONTACT = ("contactFirstName", "contactLastName", "contactPhone", "contactEmail", "demoAccountName")


class DraftStateError(SetupError):
    def __init__(self, code, message):
        super().__init__(message)
        self.code = code


def request(env):
    tag = TAG.fullmatch(env.get("CM_TAG", ""))
    require(tag and env.get("CM_TRIGGER_SOURCE") == "webhook", "Dedicated release tag webhook required")
    mode, number = tag.groups()
    require(int(number) > 21, "The replacement must be newer than build 21")
    return mode, number


def read_build(client, number):
    rows = client.request("GET", "/v1/builds", query={
        "filter[app]": "6830358918", "filter[version]": number, "include": "preReleaseVersion", "limit": 50,
    })
    series = {row["id"] for row in rows.get("included", [])
              if row["type"] == "preReleaseVersions" and row["attributes"]["version"] == VERSION
              and row["attributes"]["platform"] == "IOS"}
    return unique([row for row in rows["data"]
                   if row["relationships"]["preReleaseVersion"]["data"]["id"] in series], "matching iOS build")


def version_state(version):
    attrs = version["attributes"]
    return attrs.get("appVersionState") or attrs.get("appStoreState")


def review_submissions(client, state=None):
    query = {"filter[platform]": "IOS", "include": "appStoreVersionForReview"}
    if state:
        query["filter[state]"] = state
    return client.all(f"{APP}/reviewSubmissions", query)


def attached_version(row, relation):
    value = row.get("relationships", {}).get(relation, {}).get("data")
    return value["id"] if value else None


def review_items(client, draft_id):
    return client.all(f"/v1/reviewSubmissions/{draft_id}/items", {"include": "appStoreVersion"})


def verify_copyright(client, version):
    require(version_state(version) in (EDITABLE | {"READY_FOR_REVIEW"}), "Version must be editable or staged")
    require(bool(version["attributes"].get("copyright")), "The version needs its ASC copyright")


def review_detail(client, version, fields):
    return client.one(f"/v1/appStoreVersions/{version['id']}/appStoreReviewDetail", {
        "fields[appStoreReviewDetails]": ",".join(fields),
    })["attributes"]


def verify_contact(client, version):
    detail = review_detail(client, version, (*REVIEW_CONTACT, "demoAccountRequired"))
    require(all(detail.get(field) for field in REVIEW_CONTACT) and detail.get("demoAccountRequired") is True,
            "Existing ASC review contact and demo account fields required")


def verify_notes(client, version):
    detail = review_detail(client, version, ("notes",))
    notes = (ROOT / "asc/review-notes.ja.txt").read_text(encoding="utf-8").strip()
    require((detail.get("notes") or "").replace("\r\n", "\n").strip() == notes, "ASC review notes mismatch")


def verify_advertising(client, version):
    app_infos = client.all(f"{APP}/appInfos")
    info = unique([row for row in app_infos if row["attributes"]["appStoreState"] in EDITABLE | {"READY_FOR_REVIEW"}],
                  "editable app information record")
    rating = client.one(f"/v1/appInfos/{info['id']}/ageRatingDeclaration")["attributes"]
    require(rating.get("advertising") is True, "ASC advertising declaration required")


def stage_update(client, version):
    drafts = review_submissions(client, "READY_FOR_REVIEW")
    matching = []
    empty = []
    for draft in drafts:
        draft_id = draft["id"]
        items = review_items(client, draft_id)
        if not items:
            empty.append(draft_id)
        elif attached_version(draft, "appStoreVersionForReview") == version["id"] or any(
            attached_version(item, "appStoreVersion") == version["id"] for item in items
        ):
            if len(items) != 1:
                raise DraftStateError(21, "The version is already staged with other review items")
            matching.append(draft_id)
    if matching:
        return unique(matching, "app-only ready draft")
    if version_state(version) not in EDITABLE:
        raise DraftStateError(22, "No reusable app-only draft for the staged version")
    draft_id = empty[0] if empty else client.create(
        "reviewSubmissions", {"platform": "IOS"}, {"app": ref("apps", "6830358918")}
    )["id"]
    client.create("reviewSubmissionItems", relationships={
        "reviewSubmission": ref("reviewSubmissions", draft_id),
        "appStoreVersion": ref("appStoreVersions", version["id"]),
    })
    items = review_items(client, draft_id)
    if len(items) != 1 or attached_version(items[0], "appStoreVersion") != version["id"]:
        raise DraftStateError(23, "Expected only the specified iOS version in the review draft")
    return draft_id


PREFLIGHT = {
    "copyright": verify_copyright,
    "contact": verify_contact,
    "notes": verify_notes,
    "advertising": verify_advertising,
    "stage": stage_update,
}


def submit_update(client, version):
    for verify in (verify_copyright, verify_contact, verify_notes, verify_advertising):
        verify(client, version)
    draft_id = stage_update(client, version)
    for _ in range(8):
        current = client.one(f"/v1/appStoreVersions/{version['id']}")
        if version_state(current) == "READY_FOR_REVIEW":
            break
        if version_state(current) in SUBMITTED:
            return
        time.sleep(5)
    else:
        raise DraftStateError(24, "The staged version did not reach Ready for Review")
    result = client.patch("reviewSubmissions", draft_id, {"submitted": True})["attributes"]
    require(result.get("state") in SUBMITTED, "ASC did not confirm submission")


def report(result):
    output = ROOT / "build/asc/iosrel25.json"
    output.parent.mkdir(parents=True, exist_ok=True)
    data = json.dumps(result, ensure_ascii=False)
    output.write_text(data + "\n", encoding="utf-8")
    print(f"ASC STATUS BEGIN\n{data}\nASC STATUS END", flush=True)


def run(client, mode, number, phase=None):
    if phase != "submit" and phase is not None and mode != "submit":
        return
    identity(client)
    build = read_build(client, number)
    attrs = build["attributes"]
    result = {"version": VERSION, "build": number, "uploadedDate": attrs["uploadedDate"],
              "processingState": attrs["processingState"], "expired": attrs["expired"]}
    if mode == "build":
        report(result)
    require(datetime.fromisoformat(attrs["uploadedDate"]) >= BUILD_STARTED, "Build predates this release run")
    require(attrs["processingState"] == "VALID" and attrs["expired"] is False, "Build is not ready for distribution")
    if mode == "build":
        return

    version = unique(client.all(f"{APP}/appStoreVersions", {
        "filter[platform]": "IOS", "filter[versionString]": VERSION,
    }), "iOS App Store version")
    version_path = f"/v1/appStoreVersions/{version['id']}"
    selected = client.one(f"{version_path}/build")
    release = version["attributes"].get("releaseType")
    require(selected and selected["id"] == build["id"], "ASC selected build differs from tag")
    require(release == "AFTER_APPROVAL", "ASC release method differs from automatic release")
    result["releaseType"] = release
    if phase in PREFLIGHT:
        if version_state(version) not in SUBMITTED:
            PREFLIGHT[phase](client, version)
        return
    if mode == "submit" and version_state(version) not in SUBMITTED:
        submit_update(client, version)
        for _ in range(8):
            version = client.one(version_path)
            if version_state(version) in SUBMITTED:
                break
            time.sleep(5)
    result["reviewState"] = version_state(version)
    submissions = [row for row in review_submissions(client)
                   if attached_version(row, "appStoreVersionForReview") == version["id"]
                   and row["attributes"]["state"] in SUBMITTED]
    latest = max((row["attributes"].get("submittedDate") or "" for row in submissions), default="")
    result["submittedDate"] = latest or None
    report(result)
    require(result["reviewState"] == "WAITING_FOR_REVIEW" and bool(latest), "ASC has not confirmed the requested waiting state and submission date")


if __name__ == "__main__":
    logging.disable(logging.CRITICAL)
    try:
        phase = sys.argv[1] if len(sys.argv) == 2 else None
        require(phase in (None, "submit", *PREFLIGHT), "Unknown iOS review step")
        run(Client(), *request(os.environ), phase=phase)
    except HttpFailure as error:
        print(str(error), file=sys.stderr)
        sys.exit({400: 40, 401: 41, 403: 43, 404: 44, 409: 49, 422: 52, 429: 59}.get(error.status, 70))
    except DraftStateError as error:
        print(str(error), file=sys.stderr)
        sys.exit(error.code)
    except SetupError as error:
        print(str(error), file=sys.stderr)
        sys.exit(10)
    except Exception:
        print("ASC check failed; response and credentials withheld", file=sys.stderr)
        sys.exit(11)
