"""Use the amended ministry guideline itself for the five risk-assessment choices."""

import json
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
path = ROOT / "data/exam-library/emkohyo-review/emkohyo-20260217-q01-05-draft.json"
data = json.loads(path.read_text(encoding="utf-8"))
item = data["questions"]["emkohyo-20260217-q1"]
guideline = "https://www.mhlw.go.jp/content/11300000/001091755.pdf"
item["overlay"]["sources"] = [{
    "title": "厚生労働省 化学物質等による危険性又は有害性等の調査等に関する指針（令和5年改正）・施行通達",
    "url": guideline,
}]
item["overlay"]["choices"][0]["reason"] = (
    "文自体は正しい。厚生労働省の改正指針は、総括安全衛生管理者が選任されている事業場では、"
    "その者にリスクアセスメントとリスク低減措置の実施を統括管理させると明記する。"
    "選任されていない事業場との役割分担も区別されており、設問は選任済みの場合を正しく述べている。"
)
item["overlay"]["choices"][1]["reason"] = (
    "文自体は正しい。改正指針7(2)イは作業環境測定結果等を必要に応じ入手する情報に挙げる。"
    "その施行通達は『等』に、個人ばく露測定結果、"
    "特殊健康診断結果、生物学的モニタリング結果などが入ると明示する。"
    "列挙された三つはいずれも実際のばく露や健康影響を把握するための情報なので、必要に応じて入手する。"
)
item["overlay"]["choices"][2]["reason"] = (
    "文自体は正しい。改正指針8は対象となる業務を洗い出し、原則として列挙された情報に即して"
    "危険性・有害性を特定する。管理濃度と濃度基準値が設定されている物質ではそれらの値に即して特定する。"
    "値が未設定なら許容濃度などのばく露限界を用いる区別もあり、設問は前者を述べたものである。"
)
item["overlay"]["choices"][3]["reason"] = (
    "文自体は正しい。改正指針9(1)イ(エ)は数理モデルで推定した気中濃度を濃度基準値又は"
    "ばく露限界と比較する方法を認める。施行通達はCREATE-SIMPLEによる気中濃度推定と"
    "ECETOC-TRAによるリスク見積りをその具体例に挙げる。前者は取扱量・換気条件・作業時間、"
    "後者は物理化学的特性・作業形態・換気条件などを入力し、推定ばく露濃度とばく露限界を比較する。"
)
item["overlay"]["choices"][4]["reason"] = (
    "これが誤り。改正指針5(2)は労働災害が発生し、過去のリスクアセスメント等の内容に問題が"
    "確認された場合に再度行うよう努めると記す。休業の有無や日数だけで無条件に『必ず行う』"
    "とは定めていないため、設問は実施の条件と義務の強さの両方を取り違えている。"
)
item["sourceEvidence"] = [
    {"url": guideline, "excerpt": "総括安全衛生管理者が選任されている場合には", "choiceNumbers": [1]},
    {"url": guideline, "excerpt": "個人ばく露測定結果、ばく露の推定値、特殊健康診断結果、生物学的モニタリング結果", "choiceNumbers": [2]},
    {"url": guideline, "excerpt": "次に掲げる情報に関する資料等を、必要に応じ入手する", "choiceNumbers": [2]},
    {"url": guideline, "excerpt": "リスクアセスメント等の対象となる業務を洗い出した上で", "choiceNumbers": [3]},
    {"url": guideline, "excerpt": "リスクアセスメント対象物の管理濃度及び濃度基準値", "choiceNumbers": [3]},
    {"url": guideline, "excerpt": "CREATE-SIMPLE", "choiceNumbers": [4]},
    {"url": guideline, "excerpt": "ECETOC-TRA", "choiceNumbers": [4]},
    {"url": guideline, "excerpt": "指針の９(1)イ(ｴ)の気中濃度の推定方法には", "choiceNumbers": [4]},
    {"url": guideline, "excerpt": "数理モデルを用いて対象の業務に係る作業を行う労働者の周辺のリスクアセスメント対象物の気中濃度を推定し、当該物質の濃度基準値又はばく露限界と比較する方法", "choiceNumbers": [4]},
    {"url": guideline, "excerpt": "取扱量、含有率、換気条件、作業時間・頻度、保護具の有無等", "choiceNumbers": [4]},
    {"url": guideline, "excerpt": "推定したばく露濃度とばく露限界等を比較する", "choiceNumbers": [4]},
    {"url": guideline, "excerpt": "必要な入力項目", "choiceNumbers": [4]},
    {"url": guideline, "excerpt": "物理化学的特性（蒸気圧など）", "choiceNumbers": [4]},
    {"url": guideline, "excerpt": "計算により推定ばく露濃度が算出されるので、これをばく露限界と比較する", "choiceNumbers": [4]},
    {"url": guideline, "excerpt": "５ 実施時期", "choiceNumbers": [5]},
    {"url": guideline, "excerpt": "過去のリスクアセスメント等の内容に問題があることが確認された場合", "choiceNumbers": [5]},
]
item["reviewIssues"] = []
path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
