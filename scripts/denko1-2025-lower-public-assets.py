"""Materialize final-reviewed Denko1 2025 lower JSON and minimal figures.

The result is connected only by data/questions/denko1/index.ts. This script
does not merge a PR or deploy. Source attribution is supplied by that loader.
"""

from __future__ import annotations

import json
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "docs/evidence/denko1-2025-lower-hold/reviewed-candidate"
TARGET_DATA = ROOT / "data/questions/denko1/reviewed"
TARGET_IMAGES = ROOT / "public/images/denko1/2025-second"
WEB_PREFIX = "/images/denko1/2025-second"

# Question-column pixel boxes of diagrams/photos, excluding original question
# text and the right-hand answer column. Coordinates refer to qNN evidence crops.
FIGURES = {
    1: (40, 245, 400, 415), 2: (0, 175, 425, 425),
    3: (0, 175, 425, 415), 4: (0, 165, 425, 325),
    5: (10, 160, 420, 450), 6: (0, 325, 425, 665),
    7: (0, 245, 425, 590), 8: (0, 245, 425, 450),
    9: (60, 355, 375, 780), 14: (55, 125, 385, 425),
    15: (65, 90, 390, 430), 16: (15, 110, 420, 455),
    22: (105, 40, 350, 320), 23: (30, 175, 415, 405),
    26: (15, 55, 415, 240),
}
CHOICE_FIGURES = {13, 25, 41, 42, 46, 49}
EXPLANATION_OVERRIDES = {
    1: "平等電界ではE=V/d。原本の電極間隔は1×10⁻³ mなので、100 V÷0.001 m=1×10⁵ V/mとなる。",
    9: "幹線遮断器は100 A。分岐点から3 mを超える場合、許容電流55 A以上、または8 m以内で35 A以上が必要。5 mのロは34 Aで不足する。",
    14: "原本写真の矢印先は日本照明工業会のSB・SGI・SG形適合品マーク。断熱材施工天井への埋込み用途を示し、非常用・屋外用の表示ではない。",
    18: "架空送電線の雷害では、がいし周辺のフラッシオーバによるアークを所定の電極間へ導くアークホーンを用いる。洗浄・ダンパ・塗布剤は別目的。",
    20: "短絡時の大電流を過電流継電器で検出し、高圧真空遮断器へ遮断指令を出す組合せを選ぶ。柱上気中開閉器や地絡継電器だけでは短絡遮断装置にならない。",
    48: "共有単線結線図の⑧はLBSの開閉器記号に限流ヒューズ記号を一体で描いた分岐機器。名称は限流ヒューズ付高圧交流負荷開閉器である。",
}


def save_crop(source: Path, bounds: tuple[int, int, int, int], dest: Path) -> None:
    with Image.open(source) as image:
        left, top, right, bottom = bounds
        if right > image.width or bottom > image.height:
            raise ValueError((source, bounds, image.size))
        cropped = image.crop(bounds)
        if cropped.width < 80 or cropped.height < 80:
            raise ValueError((source, bounds))
        cropped.save(dest)


def main() -> None:
    TARGET_DATA.mkdir(parents=True, exist_ok=True)
    TARGET_IMAGES.mkdir(parents=True, exist_ok=True)
    shared = {
        "shared-q30-34.png": "facility-plan.png",
        "shared-q41-50.png": "single-line.png",
    }
    for source, dest in shared.items():
        with Image.open(SOURCE / "media" / source) as image:
            image.save(TARGET_IMAGES / dest)
    question_media = 0
    choice_media = 0
    for start in range(1, 51, 10):
        source = SOURCE / f"20251005-q{start:02}-{start + 9:02}.json"
        candidates = json.loads(source.read_text(encoding="utf-8"))
        reviewed = []
        for item in candidates:
            number = item["number"]
            image_urls = []
            if number in FIGURES:
                filename = f"q{number}.png"
                save_crop(SOURCE / "media" / f"q{number:02}.png", FIGURES[number], TARGET_IMAGES / filename)
                image_urls.append(f"{WEB_PREFIX}/{filename}")
                question_media += 1
            if 30 <= number <= 34:
                image_urls.append(f"{WEB_PREFIX}/facility-plan.png")
            if 41 <= number <= 50:
                image_urls.append(f"{WEB_PREFIX}/single-line.png")
            choice_urls = {}
            if number in CHOICE_FIGURES:
                for label, rel in item["choiceImageUrls"].items():
                    with Image.open(SOURCE / rel) as original:
                        width, height = original.size
                        # Strip original イ・ロ・ハ・ニ heading; retain all diagram
                        # labels and photo markings needed for interpretation.
                        box = (10, 38, width - 10, height - 16)
                        filename = f"q{number}-{ {'イ':'i','ロ':'ro','ハ':'ha','ニ':'ni'}[label] }.png"
                        original.crop(box).save(TARGET_IMAGES / filename)
                        choice_urls[label] = f"{WEB_PREFIX}/{filename}"
                        choice_media += 1
            record = {
                "number": number,
                "question": item["question"],
                "choices": item["choices"],
                "officialAnswer": item["officialAnswer"],
                "explanation": EXPLANATION_OVERRIDES.get(number, item["explanation"]),
                "choiceExplanations": item["choiceExplanations"],
                "imageUrls": image_urls,
            }
            if choice_urls:
                record["choiceImageUrls"] = choice_urls
            if item.get("officialReferenceUrls"):
                record["officialReferenceUrls"] = item["officialReferenceUrls"]
                record["lawReferenceDate"] = item["lawReferenceDate"]
            if number in {1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 17}:
                record["isCalculation"] = True
            reviewed.append(record)
        dest = TARGET_DATA / f"20251005-q{start:02}-{start + 9:02}.json"
        dest.write_text(json.dumps(reviewed, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    assert question_media == 15 and choice_media == 24
    print(json.dumps({"questions": 50, "figureCrops": question_media, "choiceCrops": choice_media,
                      "sharedFigures": 2, "imageCount": question_media + choice_media + 2}))


if __name__ == "__main__":
    main()
