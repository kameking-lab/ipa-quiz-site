"""Pin MHLW risk-assessment guidance clauses to all five EM general Q1 choices."""

import json
from pathlib import Path

from bs4 import BeautifulSoup
import fitz
import requests


ROOT = Path(__file__).resolve().parents[1]
PAPER = "emkohyo-EM20261801"
QUESTION = f"{PAPER}-q1"
DRAFT = ROOT / f"data/exam-library/emkohyo-review/{PAPER}-q01-05-draft.json"
PRESENTATION = ROOT / f"data/exam-library/presentation/{PAPER}.json"
CREATE_MANUAL = "https://anzeninfo.mhlw.go.jp/user/anzen/kag/pdf/CREATE-SIMPLE_manual_v3.2.pdf"
ECETOC_MANUAL = "https://anzeninfo.mhlw.go.jp/user/anzen/kag/pdf/ECETOC-TRA_manual.pdf"
CURRENT_GUIDE = "https://www.mhlw.go.jp/content/11300000/001566348.pdf"
NEEDLES = [
    (0, "第一評価値を当該物質の管理濃度と比較する方法", 1),
    (0, "基発0427第3号", 1),
    (0, "個人ばく露測定により測定した当該物質の濃度を当該物質の濃度基準値と比較する方法", 2),
    (1, "基発0427第2号", 2),
    (1, "呼吸用保護具の内側の濃度で表される", 2),
    (0, "当該物質の気中濃度等を当該物質のばく露限界と比較する方法", 3),
    (0, "CREATE―SIMPLE", 4),
    (0, "ECETOC―TRA", 4),
    (0, "横軸と縦軸を当該化学物質等のばく露の程度と有害性の程度に置き換え", 5),
    (0, "日本産業衛生学会の許容濃度又は米国産業衛生専門家会議(ACGIH)のTLV―TWA", 3),
    (2, "高濃度側から五％に相当する濃度の推定値", 1),
]


def main() -> None:
    draft = json.loads(DRAFT.read_text(encoding="utf-8"))
    target = draft["questions"][QUESTION]
    sources = target["overlay"]["sources"][:3]
    pages = []
    for source in sources:
        response = requests.get(source["url"], timeout=60)
        response.raise_for_status()
        soup = BeautifulSoup(response.content, "html.parser")
        pages.append(soup.get_text(" ", strip=True))
    for title, url in (("厚生労働省 CREATE-SIMPLE マニュアル", CREATE_MANUAL),
                       ("厚生労働省 ECETOC-TRA マニュアル", ECETOC_MANUAL),
                       ("厚生労働省 濃度基準の技術上の指針（2025年10月改正版）", CURRENT_GUIDE)):
        response = requests.get(url, timeout=60)
        response.raise_for_status()
        pdf = fitz.open(stream=response.content, filetype="pdf")
        sources.append({"title": title, "url": url})
        pages.append(" ".join(page.get_text() for page in pdf))
    evidence = []
    for source_index, needle, choice in NEEDLES:
        text = pages[source_index]
        found = text.find(needle)
        if found < 0:
            raise ValueError(f"Missing MHLW source excerpt: {needle}")
        excerpt = text[max(0, found - 120):found + len(needle) + 160]
        evidence.append({"url": sources[source_index]["url"], "excerpt": excerpt,
                         "choiceNumbers": [choice]})
    for index, needle in ((3, "GHS区分情報と取扱状況"),
                          (3, "SDSを確認して対象物質を決定し"),
                          (4, "必要項目を入力し"),
                          (5, "呼吸用保護具の内側の濃度で表されること")):
        found = pages[index].find(needle)
        if found < 0:
            raise ValueError(f"Missing tool-manual excerpt: {needle}")
        evidence.append({"url": sources[index]["url"],
                         "excerpt": pages[index][max(0, found-100):found+400],
                         "choiceNumbers": [2 if index == 5 else 4]})
    target["overlay"]["choices"][0]["reason"] = (
        "誤っている記述なので、この肢が正答。厚生労働省の改正指針通達は、管理濃度が定められた物質について、"
        "作業環境測定で得た第一評価値を管理濃度と比較する方法を示す。第一評価値は高濃度側5％に相当する濃度の推定値であり、"
        "幾何平均値ではない。比較する値そのものが異なるため、設問の方法は指針と一致しない。"
    )
    target["overlay"]["choices"][1]["reason"] = (
        "正しい記述。改正リスクアセスメント指針は、濃度基準値がある物質では個人ばく露測定の濃度を基準値と比較する方法を示す。"
        "技術上の指針は、保護具を使う場合のばく露を保護具内側の濃度で表し、呼吸域の濃度を指定防護係数で割って算定できるとする。"
        "前半の比較方法と後半の内側濃度の算定の両方が一次資料に合う。"
    )
    target["sourceEvidence"] = evidence
    target["overlay"]["sources"] = sources
    target["reviewIssues"] = []
    presentation = json.loads(PRESENTATION.read_text(encoding="utf-8"))
    presentation[QUESTION]["choices"][3]["text"] = (
        "CREATE-SIMPLEやECETOC TRAなどを用いて、対象の業務に係る作業条件やリスクアセスメント対象物に関する情報を入力することにより、リスクを見積もる方法がある。"
    )
    PRESENTATION.write_text(json.dumps(presentation, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    DRAFT.write_text(json.dumps(draft, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"{QUESTION}: {len(evidence)} exact MHLW excerpts ready for direct review")


if __name__ == "__main__":
    main()
