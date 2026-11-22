"""App Store の審査状況を読むだけ（書き込みなし）。

Codemagic の既存の App Store Key 連携が入れる環境変数で JWT を作る。
鍵・JWT・応答の生データは出力しない。アプリ名・版・状態だけを表で出す。
"""
import contextlib
import io
import json
import logging
import os
import sys
import urllib.parse
import urllib.request

API = "https://api.appstoreconnect.apple.com"
LABEL = {
    "PREPARE_FOR_SUBMISSION": "提出準備中",
    "WAITING_FOR_REVIEW": "審査待ち",
    "IN_REVIEW": "審査中",
    "PENDING_DEVELOPER_RELEASE": "承認済み・リリース待ち（手動公開）",
    "PENDING_APPLE_RELEASE": "承認済み・Apple の公開待ち",
    "READY_FOR_SALE": "配信中",
    "READY_FOR_DISTRIBUTION": "配信中",
    "REJECTED": "却下",
    "METADATA_REJECTED": "掲載情報で却下",
    "DEVELOPER_REJECTED": "取り下げ",
    "INVALID_BINARY": "ビルド不正",
    "PROCESSING_FOR_DISTRIBUTION": "配信処理中",
    "ACCEPTED": "承認",
    "UNRESOLVED_ISSUES": "要対応（却下あり）",
    "COMPLETE": "完了",
    "CANCELING": "取り消し中",
}


def token():
    logging.disable(logging.CRITICAL)
    try:
        with contextlib.redirect_stdout(io.StringIO()), contextlib.redirect_stderr(io.StringIO()):
            from codemagic.tools.app_store_connect import AppStoreConnect
            from codemagic.tools.app_store_connect.arguments import Types

            def value(kind):
                argument = kind.from_environment_variable_default()
                return argument.value if argument else None

            tool = AppStoreConnect(
                key_identifier=value(Types.KeyIdentifierArgument),
                issuer_id=value(Types.IssuerIdArgument),
                private_key=value(Types.PrivateKeyArgument),
                enable_jwt_cache=False, log_requests=False,
            )
            tool._assert_api_client_credentials()
            client = tool.api_client
            client.generate_auth_headers()
            return client.jwt
    except Exception:
        sys.exit("ASC 認証に失敗（App Store Key 連携を確認）")


def get(jwt, path, params):
    url = API + path + "?" + urllib.parse.urlencode(params)
    req = urllib.request.Request(url, headers={"Authorization": "Bearer " + jwt})
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            return json.load(r)
    except urllib.error.HTTPError as e:
        return {"error": e.code, "data": []}


def main():
    jwt = token()
    apps = get(jwt, "/v1/apps", {"limit": "50", "fields[apps]": "name,bundleId"}).get("data", [])
    rows = []
    for app in apps:
        a = app["attributes"]
        versions = get(jwt, "/v1/apps/%s/appStoreVersions" % app["id"], {
            "limit": "3",
            "fields[appStoreVersions]": "versionString,appStoreState,appVersionState,createdDate",
        }).get("data", [])
        subs = get(jwt, "/v1/reviewSubmissions", {
            "filter[app]": app["id"], "limit": "3",
            "fields[reviewSubmissions]": "state,submittedDate",
        }).get("data", [])
        for v in versions:
            va = v["attributes"]
            state = va.get("appVersionState") or va.get("appStoreState") or ""
            rows.append({
                "app": a.get("name"), "bundleId": a.get("bundleId"),
                "version": va.get("versionString"), "state": state,
                "label": LABEL.get(state, state), "created": va.get("createdDate"),
            })
        for s in subs:
            sa = s["attributes"]
            rows.append({
                "app": a.get("name"), "bundleId": a.get("bundleId"), "version": "(審査提出)",
                "state": sa.get("state"), "label": LABEL.get(sa.get("state"), sa.get("state")),
                "created": sa.get("submittedDate"),
            })
    print("===== ASC STATUS BEGIN =====")
    for r in rows:
        print("%s | %s | %s | %s | %s" % (r["app"], r["version"], r["label"], r["state"], r["created"]))
    print("===== ASC STATUS END =====")
    os.makedirs("build", exist_ok=True)
    with open("build/asc-status.json", "w", encoding="utf-8") as f:
        json.dump(rows, f, ensure_ascii=False, indent=2)


if __name__ == "__main__":
    main()
