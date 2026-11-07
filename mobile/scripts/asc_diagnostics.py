"""Redaction shared by capture diagnostics and the streaming Appium log sink."""
import json
import os
from pathlib import Path
import re
import sys
from urllib.parse import urlsplit, urlunsplit


def redact(value):
    text = str(value)
    for key, secret in sorted(os.environ.items(), key=lambda item: -len(item[1])):
        if len(secret) >= 4 and re.search(r"SECRET|TOKEN|PASSWORD|PRIVATE|KEY|ISSUER|REVIEW_CODE|CREDENTIAL", key, re.I):
            for variant in (secret, json.dumps(secret)[1:-1]):
                text = text.replace(variant, "[REDACTED]")
    text = re.sub(r"-----BEGIN [^-]*PRIVATE KEY-----.*?(?:-----END [^-]*PRIVATE KEY-----|$)", "[REDACTED PEM]", text, flags=re.S)
    text = re.sub(r"\b(?:Bearer|Basic)\s+[A-Za-z0-9._~+/=-]+", "[REDACTED AUTH]", text, flags=re.I)
    text = re.sub(r"\beyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+", "[REDACTED JWT]", text)
    text = re.sub(r'''(?im)((?:set-cookie|cookie|authorization)\s*["']?\s*[:=]\s*).*''', r"\1[REDACTED]", text)
    text = re.sub(r'''(?i)((?:password|access_token|refresh_token|id_token|api_key|sdkKey|review_code)\s*["']?\s*[:=]\s*)["']?[^\s,<>]+''', r"\1[REDACTED]", text)
    def safe_url(match):
        try:
            url = urlsplit(match.group())
            return urlunsplit((url.scheme, url.netloc.split("@")[-1], url.path, "[REDACTED]" if url.query else "", "[REDACTED]" if url.fragment else ""))
        except ValueError:
            return "[REDACTED URL]"
    return re.sub(r'''(?:https?|capacitor)://[^\s<>"'\\]+''', safe_url, text)


def safe_source(source):
    # Keep full DOM/native XML structure, excluding embedded state/form values.
    source = re.sub(r"<(script|style)\b[^>]*>.*?</\1>", "", source, flags=re.I | re.S)
    source = re.sub(r'''\bvalue=(['"])(.*?)\1''', 'value="[REDACTED]"', source, flags=re.I | re.S)
    source = re.sub(r"(<textarea\b[^>]*>).*?(</textarea>)", r"\1[REDACTED]\2", source, flags=re.I | re.S)
    return redact(source)


def stream_log(path):
    """Raw process output exists only in the pipe, never in an artifact."""
    Path(path).parent.mkdir(parents=True, exist_ok=True)
    pem = False
    with open(path, "w", encoding="utf-8") as output:
        for line in sys.stdin:
            if "-----BEGIN " in line and "PRIVATE KEY-----" in line:
                pem = "-----END " not in line
                output.write("[REDACTED PEM]\n")
            elif pem:
                if "-----END " in line:
                    pem = False
            else:
                output.write(redact(line))
            output.flush()


if __name__ == "__main__":
    stream_log(sys.argv[1])
