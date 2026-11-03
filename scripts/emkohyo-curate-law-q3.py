"""Curate exam-date e-Gov health-check clauses for 2026 EM law Q3."""

import json
from pathlib import Path

import requests


ROOT = Path(__file__).resolve().parents[1]
PAPER = "emkohyo-EM20261802"
QUESTION = f"{PAPER}-q3"
DRAFT = ROOT / f"data/exam-library/emkohyo-review/{PAPER}-q01-05-draft.json"
URL = "https://laws.e-gov.go.jp/api/2/law_data/347M50002000032?asof=2026-02-17"
ACT_URL = "https://laws.e-gov.go.jp/api/2/law_data/347AC0000000057?asof=2026-02-17"
ARTICLE_CHOICES = {"43": [2], "51": [3], "51_2": [4], "52": [1, 5]}


def text(node: object) -> str:
    if isinstance(node, str):
        return node
    if isinstance(node, dict):
        return "".join(text(child) for child in node.get("children", []))
    if isinstance(node, list):
        return "".join(text(child) for child in node)
    return ""


def articles(node: object):
    if isinstance(node, dict):
        if node.get("tag") == "Article":
            yield node
        else:
            for child in node.get("children", []):
                yield from articles(child)


def main() -> None:
    response = requests.get(URL, timeout=60)
    response.raise_for_status()
    body = response.json()
    if not body["revision_info"]["law_revision_id"].startswith("347M50002000032_"):
        raise ValueError("Unexpected law revision")
    indexed = {article["attr"]["Num"]: text(article)
               for article in articles(body["law_full_text"])
               if article.get("attr", {}).get("Num") in ARTICLE_CHOICES}
    if set(indexed) != set(ARTICLE_CHOICES):
        raise ValueError("Required source article missing")
    act_response = requests.get(ACT_URL, timeout=60)
    act_response.raise_for_status()
    act = act_response.json()
    if not act["revision_info"]["law_revision_id"].startswith("347AC0000000057_"):
        raise ValueError("Unexpected Act revision")
    act_66_4 = next(text(article) for article in articles(act["law_full_text"])
                    if article.get("attr", {}).get("Num") == "66_4")
    draft = json.loads(DRAFT.read_text(encoding="utf-8"))
    target = draft["questions"][QUESTION]
    target["overlay"]["summary"] = (
        "安衛則第44条の定期健康診断は、第52条第1項により常時50人以上の事業者に報告義務がある"
    )
    target["overlay"]["choices"][0]["reason"] = (
        "安衛則第52条の報告義務は、第44条・第45条・第48条の健康診断のうち定期のものに限られる。"
        "第43条の雇入時の健康診断は報告対象に含まれないため、常時使用する労働者数を問わず、"
        "この健康診断の結果を監督署長に報告する必要はない。"
    )
    target["overlay"]["choices"][4]["reason"] = (
        "安衛則第44条の定期健康診断については、第52条第1項が常時50人以上の労働者を使用する事業者に、"
        "結果を遅滞なく監督署長へ報告する義務を定める。50人未満まで含めて『労働者数にかかわらず』とする点が誤り。"
        "第48条の歯科の定期健康診断は第52条第2項により人数を問わず報告する別の規定なので、両者を区別する。"
    )
    target["overlay"]["sources"] = [
        {"title": "e-Gov 労働安全衛生規則 第43・51・51条の2・52条（2026年2月17日時点）", "url": URL},
        {"title": "e-Gov 労働安全衛生法 第66条の4（2026年2月17日時点）", "url": ACT_URL},
    ]
    target["sourceEvidence"] = [
        {"url": URL, "articleNum": number,
         "excerpt": indexed[number] if number == "52" else indexed[number][:550],
         "choiceNumbers": choice_numbers}
        for number, choice_numbers in ARTICLE_CHOICES.items()
    ]
    target["sourceEvidence"].append(
        {"url": ACT_URL, "articleNum": "66_4", "excerpt": act_66_4, "choiceNumbers": [4]}
    )
    target["reviewIssues"] = []
    DRAFT.write_text(json.dumps(draft, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"{QUESTION}: {len(ARTICLE_CHOICES)} direct source clauses, pending independent review")


if __name__ == "__main__":
    main()
