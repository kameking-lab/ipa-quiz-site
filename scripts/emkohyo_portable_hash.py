"""SHA-256 for UTF-8 evidence files across LF and CRLF checkouts.

Only newline conversion is tolerated. All substantive JSON/text changes still
invalidate a pinned receipt. Binary source images use ordinary byte hashes.
"""

from hashlib import sha256
from pathlib import Path


def normalized_bytes(path: Path) -> bytes:
    return path.read_bytes().decode("utf-8").replace("\r\n", "\n").replace("\r", "\n").encode("utf-8")


def text_sha256(path: Path) -> str:
    return sha256(normalized_bytes(path)).hexdigest()


def matches_text_sha256(path: Path, expected: str) -> bool:
    normalized = normalized_bytes(path)
    variants = (path.read_bytes(), normalized, normalized.replace(b"\n", b"\r\n"))
    return any(sha256(data).hexdigest() == expected for data in variants)
