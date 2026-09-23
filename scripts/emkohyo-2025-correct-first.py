"""Apply reviewed corrections to the first organic-solvent draft.

The source pack pins government documents. This script does not accept the
candidate; an independent source-aware review must follow every change.
"""

from hashlib import sha256
import json
from pathlib import Path

import fitz
import requests


ROOT = Path(__file__).resolve().parents[1]
DRAFT = ROOT / "data/exam-library/emkohyo-review/emkohyo-EM20251805-q01-05-draft.json"
SOURCES = ROOT / "docs/evidence/emkohyo-2025-sources/EM20251805-q01-03.json"


def main() -> None:
    draft = json.loads(DRAFT.read_text(encoding="utf-8"))
    questions = draft["questions"]
    q1 = questions["emkohyo-EM20251805-q1"]["overlay"]
    q1["choices"][1]["reason"] = (
        "テトラヒドロフランのモル質量は72.11g/molで、n-ヘキサンの約86g/molより小さい。"
        "蒸気圧を比べる前に、Ⓐのモル質量がⒷより大きいという必要条件を満たさないため除外できる。"
    )
    q1["choices"][2]["reason"] = (
        "シクロヘキサノンのモル質量は98.14g/molで、シクロヘキサノールの100.16g/molより小さい。"
        "両方の値が大きいことが条件なので、蒸気圧の大小にかかわらずこの組合せは該当しない。"
    )
    q1["choices"][3]["reason"] = (
        "酢酸メチルのモル質量74.079g/molはメタノールの32.04g/molより大きい。"
        "厚労省のモデルSDSで蒸気圧はそれぞれ20℃で約208hPaと約127hPa、"
        "環境省の酢酸メチル評価書では25℃で216mmHg（約288hPa）。"
        "同温度の20℃データで酢酸メチルが明確に高く、公式正答でも25℃で両条件を満たす組合せである。"
    )
    q1["choices"][4]["reason"] = (
        "2-ブタノールのモル質量74.12g/molはイソプロピルアルコールの60.096g/molより大きい。"
        "しかし厚労省のモデルSDSによる20℃の蒸気圧はそれぞれ17hPaと44hPaでⒶの方が低い。"
        "蒸気圧もⒶの方が大きいという条件を満たさない。"
    )
    env_url = "https://www.env.go.jp/chemi/report/h21-01/pdf/chpt2/2-2-2-12.pdf"
    if all(s["url"] != env_url for s in q1["sources"]):
        q1["sources"].append({"title": "環境省 酢酸メチルの環境リスク評価（25℃蒸気圧）", "url": env_url})
    questions["emkohyo-EM20251805-q1"]["reviewIssues"] = []

    q3 = questions["emkohyo-EM20251805-q3"]["overlay"]
    for choice in q3["choices"]:
        choice["reason"] = choice["reason"].replace(
            "沸点約153℃の液体溶剤で常温では固体でない",
            "融点が約−61℃であり常温では液体である",
        )
    q3["choices"][1]["reason"] = (
        "窒素が一つという㋑は合うが、厚労省が示す構造式HCON(CH₃)₂では"
        "窒素がC=Oの炭素に直結したアミド（-CO-N<）である。"
        "独立したアミノ基という㋺は合わず、融点−61℃・外観液体なので㋩の固体も誤り。"
    )
    q3["choices"][4]["reason"] = (
        "液体という㋩だけは合う。構造式HCON(CH₃)₂の窒素は一原子で、"
        "N,N-はその窒素にメチル基が二つ付くという意味である。"
        "窒素はC=Oに直結したアミド（-CO-N<）を構成し、独立したアミノ基ではない。"
    )
    dmf_url = "https://www.mhlw.go.jp/content/11305000/000943313.pdf"
    if all(s["url"] != dmf_url for s in q3["sources"]):
        q3["sources"].append({"title": "厚生労働省 N,N-ジメチルホルムアミドのリスク評価書", "url": dmf_url})
    questions["emkohyo-EM20251805-q3"]["reviewIssues"] = []
    DRAFT.write_text(json.dumps(draft, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    pack = json.loads(SOURCES.read_text(encoding="utf-8"))
    documents = []
    for title, url, needles in (
        ("環境省 酢酸メチルの環境リスク評価", env_url, ("蒸気圧", "2.16")),
        ("厚生労働省 N,N-ジメチルホルムアミドのリスク評価書", dmf_url,
         ("formic acid dimethyl", "化 学 式", "HCON(CH3)2", "外観", "融 点")),
    ):
        content = requests.get(url, timeout=60)
        content.raise_for_status()
        pdf = fitz.open(stream=content.content, filetype="pdf")
        excerpts = []
        for page_no, page in enumerate(pdf):
            lines = page.get_text().splitlines()
            for index, line in enumerate(lines):
                if any(needle in line for needle in needles):
                    excerpts.append({"page": page_no + 1,
                                     "text": " ".join(lines[max(0, index - 1):index + 3])[:300]})
                    if len(excerpts) >= 12:
                        break
            if len(excerpts) >= 12:
                break
        documents.append({"title": title, "url": url, "pdfSha256": sha256(content.content).hexdigest(),
                          "excerpts": excerpts})
    pack["governmentPdfs"] = documents
    SOURCES.write_text(json.dumps(pack, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print("Updated Q1/Q3 candidates and pinned government PDF evidence. Re-review required.")


if __name__ == "__main__":
    main()
