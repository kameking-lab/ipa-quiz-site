"""Ground 2025 organic Q6 in the MHLW sampler report before review."""

import json
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
FILE = ROOT / "data/exam-library/emkohyo-review/emkohyo-EM20251805-q06-10-draft.json"


def main() -> None:
    data = json.loads(FILE.read_text(encoding="utf-8"))
    record = data["questions"]["emkohyo-EM20251805-q6"]
    overlay = record["overlay"]
    url = "https://www.mhlw.go.jp/content/000616847.pdf"
    jaea = "https://jopss.jaea.go.jp/pdfdata/JAEA-Data-Code-2013-011.pdf"
    overlay["sources"] = [
        {"title": "厚生労働省 個人サンプラー測定法の基盤整備報告書", "url": url},
        {"title": "日本原子力研究開発機構 気体の拡散係数に関する技術報告", "url": jaea},
    ]
    overlay["choices"][0]["reason"] = (
        "厚生労働省の報告書はDを捕集対象物質の拡散係数と定義する。"
        "日本原子力研究開発機構の技術資料も空気中の水素・酸素・アルゴンについて"
        "化学種ごとの相互拡散係数を扱っており、Dは対象気体や条件で変わる。"
        "物質によって値が異なるという記述は正しい。"
    )
    overlay["choices"][1]["reason"] = (
        "厚生労働省の報告書は理論的なサンプリング速度をD・A/Lと示している。"
        "Dはこの式の分子にあり、AとLを一定にすればDを2倍にしたとき速度も2倍になる。"
        "拡散係数に比例するという記述は正しい。"
    )
    overlay["choices"][2]["reason"] = (
        "厚生労働省の図はAを拡散面積と示す。問題文の拡散面断面積（A）を2倍にし、"
        "Dと拡散長Lを一定にすると、理論式D・A/Lから速度も2倍となる。"
        "これは式から導く比例関係であり、問題の記述は正しい。"
    )
    overlay["choices"][3]["reason"] = (
        "厚生労働省の図はLを拡散長と示す。同報告書の理論式D・A/LではLが分母なので、"
        "DとAを一定にしてLを2倍にすると速度は半分になる。"
        "これは式から導く反比例関係であり、『比例する』とした記述は誤り。"
    )
    overlay["choices"][4]["reason"] = (
        "厚生労働省の報告書は理論値D・A/Lと実際のサンプリング速度には若干の差があり、"
        "実験値があればそれを優先すると明記している。"
        "したがって理論値と実験値が異なる場合があるという記述は正しい。"
    )
    record["sourceEvidence"] = [
        {"url": url, "excerpt": "サンプリング速度（D・A/L）は", "choiceNumbers": [2, 3, 4]},
        {"url": url, "excerpt": "拡散長（L）", "choiceNumbers": [4]},
        {"url": url, "excerpt": "拡散面積(A)", "choiceNumbers": [3]},
        {"url": url, "excerpt": "実際のサンプリング速度は、この値と若干異なる", "choiceNumbers": [5]},
        {"url": jaea, "excerpt": "空気中の水素ガス、酸素、アルゴン拡散係数", "choiceNumbers": [1]},
    ]
    record["reviewIssues"] = []
    FILE.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print("Updated Q6 candidate. Source-pack and direct review required.")


if __name__ == "__main__":
    main()
