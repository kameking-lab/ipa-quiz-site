"""Curate exact AIST absorbance clauses and rendered equations for EM Q13/14."""

from hashlib import sha256
import json
from pathlib import Path

import fitz
import requests


ROOT = Path(__file__).resolve().parents[1]
PAPER = "emkohyo-20260217-4"
DRAFT = ROOT / f"data/exam-library/emkohyo-review/{PAPER}-q11-15-draft.json"
INDEX = ROOT / "docs/evidence/emkohyo-choice-sources/supplemental-science-sources.json"
IMAGE_MAP = ROOT / "docs/evidence/emkohyo-choice-sources/source-page-images.json"
IMAGE_DIR = ROOT / "docs/evidence/emkohyo-choice-sources"


def section(page: str, start: str, end: str) -> str:
    first = page.find(start)
    last = page.find(end, first + len(start))
    if first < 0 or last < 0:
        raise ValueError(f"Missing AIST section {start}")
    return page[first:last]


def main() -> None:
    index = json.loads(INDEX.read_text(encoding="utf-8"))
    aist = next(item for item in index["sources"] if "セルロースナノファイバーの有害性試験手順書" in item["title"])
    env = next(item for item in index["sources"] if "底質調査方法" in item["title"])
    cache = ROOT / f"data/raw_pdfs/emkohyo-source-cache/{aist['rawSha256']}.json"
    pages = json.loads(cache.read_text(encoding="utf-8"))["pages"]
    definition = section(pages[108], "3.4 吸光度", "3.5 試料分散液")
    formula = section(pages[110], "8.2 原理", "8.3 標準分散液")
    calibration = pages[111][:700]
    response = requests.get(aist["url"], timeout=60)
    response.raise_for_status()
    if sha256(response.content).hexdigest() != aist["rawSha256"]:
        raise ValueError("AIST source changed after pin")
    pdf = fitz.open(stream=response.content, filetype="pdf")
    files = []
    for page_number in (109, 111, 112):
        target = IMAGE_DIR / f"aist-absorbance-p{page_number}.png"
        pdf[page_number - 1].get_pixmap(matrix=fitz.Matrix(1.7, 1.7)).save(target)
        files.append({"path": target.relative_to(ROOT).as_posix(),
                      "sha256": sha256(target.read_bytes()).hexdigest(),
                      "description": f"産総研吸光光度原資料 PDF p{page_number} 原式・本文"})
    maps = json.loads(IMAGE_MAP.read_text(encoding="utf-8"))
    maps[f"{PAPER}-q13-13"] = files
    maps[f"{PAPER}-q14-14"] = files[:2]
    IMAGE_MAP.write_text(json.dumps(maps, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    draft = json.loads(DRAFT.read_text(encoding="utf-8"))
    q13 = draft["questions"][f"{PAPER}-q13"]
    q13["overlay"]["choices"][1]["reason"] = (
        "これが誤りの記述です。透過率をT＝I/I₀と置くと、産総研資料の式(1)はA＝−log₁₀Tと書けます。"
        "ランバート－ベールの法則が成り立つ場合、式(2)のA＝εClと合わせてT＝10^(−εCl)です。"
        "透過率は光路長に反比例せず指数関数的に減り、T＝0.1で光路長を2倍にすると0.01になります。"
    )
    q13["overlay"]["choices"][2]["reason"] = (
        "文は正しい内容です。ランバート－ベールの法則が成り立つ場合、産総研資料の式(2)はA＝εClです。"
        "吸光係数εと光路長lが一定なら、"
        "吸光度Aは測定対象物質の濃度Cに比例します。この比例関係を用いることで濃度を吸光度から求められます。"
    )
    q13["overlay"]["choices"][4]["reason"] = (
        "文は正しい内容です。環境省の『底質調査方法』の精度管理でも、標準溶液の濃度に対する吸光度が"
        "直線性を示す範囲で検量線を使用するとされています。したがって定量は検量線の直線範囲内で行います。"
    )
    q13["overlay"]["sources"] = [{"title": item["title"], "url": item["url"]}
                                  for item in (aist, env)]
    q13["sourceEvidence"] = [
        {"url": aist["url"], "excerpt": definition, "choiceNumbers": [1, 3, 4]},
        {"url": aist["url"], "excerpt": formula, "choiceNumbers": [2, 3, 4]},
        {"url": aist["url"], "excerpt": calibration, "choiceNumbers": [4]},
        {"url": env["url"], "excerpt": env["facts"][0]["exactExcerpt"], "choiceNumbers": [5]},
    ]
    q13["reviewIssues"] = []
    q14 = draft["questions"][f"{PAPER}-q14"]
    q14["overlay"]["choices"][3]["reason"] = (
        "120 µgは100 mL中の濃度2.4×10⁻⁵ mol/Lに相当し、光路長2.0 cmならA＝0.960となります。"
        "誤って1.0 cmとしてc＝0.480÷(2.0×10⁴×1.0)を計算すると、この濃度と120 µgが出ます。"
        "指定された2.0 cmを落とした値なので正答ではありません。"
    )
    q14["overlay"]["sources"] = [{"title": aist["title"], "url": aist["url"]}]
    q14["sourceEvidence"] = [
        {"url": aist["url"], "excerpt": formula, "choiceNumbers": [1, 2, 3, 4, 5]}
    ]
    q14["reviewIssues"] = []
    DRAFT.write_text(json.dumps(draft, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"{PAPER}: Q13/14 direct AIST source and two formula-page images ready for review")


if __name__ == "__main__":
    main()
