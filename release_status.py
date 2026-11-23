"""Check the two approved iOS release candidates through the existing ASC integration."""
import argparse
import json
from pathlib import Path

from asc_status import get, token


RELEASES = {
    "kakomon": ("6830358918", "1.0.3", "21"),
    "tsugino": ("6831078637", "1.1.2", "12"),
}


def check(app, phase):
    app_id, version, number = RELEASES[app]
    session = token()

    def read(path, **params):
        response = get(session, path, params)
        if "error" in response:
            raise RuntimeError(f"ASC returned HTTP {response['error']} for {path}")
        return response

    builds = read("/v1/builds", **{
        "filter[app]": app_id, "filter[version]": number,
        "include": "preReleaseVersion", "limit": 50,
    })
    series = {item["id"] for item in builds.get("included", [])
              if item["type"] == "preReleaseVersions"
              and item["attributes"]["version"] == version
              and item["attributes"]["platform"] == "IOS"}
    matches = [b for b in builds["data"] if b["relationships"]["preReleaseVersion"]["data"]["id"] in series]
    if len(matches) != 1:
        raise RuntimeError(f"Expected exactly one {app} {version} ({number}) build, found {len(matches)}")
    build = matches[0]
    result = {"app": app, "version": version, "build": number,
              "processingState": build["attributes"]["processingState"],
              "uploadedDate": build["attributes"]["uploadedDate"]}
    valid = result["processingState"] == "VALID" and build["attributes"]["expired"] is False
    if phase == "review":
        rows = read(f"/v1/apps/{app_id}/appStoreVersions", **{
            "filter[versionString]": version, "filter[platform]": "IOS",
        })["data"]
        if len(rows) != 1:
            raise RuntimeError(f"Expected exactly one {app} iOS store version {version}")
        row = rows[0]
        attrs = row["attributes"]
        selected = read(f"/v1/appStoreVersions/{row['id']}/build")["data"]
        result.update(releaseType=attrs["releaseType"], buildMatches=bool(selected and selected["id"] == build["id"]),
                      reviewState=attrs.get("appVersionState") or attrs.get("appStoreState"))
        valid = valid and result["buildMatches"] and result["releaseType"] == "AFTER_APPROVAL" and result["reviewState"] == "WAITING_FOR_REVIEW"
    out = Path("build")
    out.mkdir(exist_ok=True)
    (out / f"{app}-{phase}.json").write_text(json.dumps(result, indent=2), encoding="utf-8")
    print(json.dumps(result))
    if not valid:
        raise SystemExit(f"{app}: {phase} state differs from the requested release state")


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("app", choices=RELEASES)
    parser.add_argument("phase", choices=("processing", "review"))
    args = parser.parse_args()
    check(args.app, args.phase)
