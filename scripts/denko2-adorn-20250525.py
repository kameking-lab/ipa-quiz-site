"""Attach source-checked 2025 upper figure-only crops and public references."""

import json
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
REVIEWED = ROOT / "data/questions/denko2/reviewed"
FIGURES = {1, 4, 5, 6, 7, 9, 16, 17, 18, 27}
CHOICE_FIGURES = {10, 25, *range(41, 51)}
TECHNICAL_RULE = "https://www.meti.go.jp/policy/safety_security/industrial_safety/sangyo/electric/files/20241022-2.pdf"
ELECTRICIAN_ACT = "https://laws.e-gov.go.jp/law/335AC0000000139"
ELECTRIC_BUSINESS_ACT = "https://laws.e-gov.go.jp/law/339AC0000000170"
ELECTRIC_BUSINESS_RULE = "https://laws.e-gov.go.jp/law/407M50000400077"
PRODUCT_LIST = "https://www.meti.go.jp/policy/consumer/seian/denan/file/06_guide/denan_guide_ver50.pdf"
TECHNICAL_NUMBERS = {8, 9, 10, 19, 20, 21, 22, 23, 31, 32, 36, 37}


def main() -> None:
    counts = {"questions": 0, "figure": 0, "choiceFigure": 0, "source": 0, "uncertainty": 0}
    for path in sorted(REVIEWED.glob("20250525-q??-??.json")):
        questions = json.loads(path.read_text(encoding="utf-8"))
        for question in questions:
            number = question["number"]
            image_urls = []
            if number in FIGURES:
                image_urls.append(f"/images/denko2/2025-first/q{number}.png")
            if number >= 31:
                image_urls.append("/images/denko2/2025-first/wiring-main.png")
            if image_urls:
                question["imageUrls"] = image_urls
                counts["figure"] += 1
            if number in CHOICE_FIGURES:
                question["choiceImageUrls"] = {
                    label: f"/images/denko2/2025-first/q{number}-{suffix}.png"
                    for label, suffix in (("イ", "i"), ("ロ", "ro"), ("ハ", "ha"), ("ニ", "ni"))
                }
                counts["choiceFigure"] += 1
            urls = [TECHNICAL_RULE] if number in TECHNICAL_NUMBERS else []
            if number == 20:
                urls.append("https://www.mlit.go.jp/gobuild/content/001879364.pdf")
            if number == 28:
                urls = [ELECTRICIAN_ACT, ELECTRIC_BUSINESS_ACT]
            elif number == 29:
                urls = [PRODUCT_LIST]
            elif number == 30:
                urls = [ELECTRIC_BUSINESS_ACT, ELECTRIC_BUSINESS_RULE]
            if urls:
                question["officialReferenceUrls"] = urls
                counts["source"] += 1
            else:
                question.pop("officialReferenceUrls", None)
            if question.get("uncertainty"):
                counts["uncertainty"] += 1
            counts["questions"] += 1
        path.write_text(json.dumps(questions, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(counts)


if __name__ == "__main__":
    main()
