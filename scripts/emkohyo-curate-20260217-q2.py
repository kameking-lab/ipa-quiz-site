"""Pin GHS question explanations to the ministry's GHS text and SDS guidance."""

import json
from pathlib import Path


root = Path(__file__).resolve().parents[1]
draft_path = root / "data/exam-library/emkohyo-review/emkohyo-20260217-q01-05-draft.json"
presentation_path = root / "data/exam-library/presentation/emkohyo-20260217.json"
draft = json.loads(draft_path.read_text(encoding="utf-8"))
presentation = json.loads(presentation_path.read_text(encoding="utf-8"))
item = draft["questions"]["emkohyo-20260217-q2"]
card = presentation["emkohyo-20260217-q2"]
choice3 = card["choices"][2]["text"].replace("。絵表示の枠は赤色とする", "。")
choice3 = choice3.replace("。（図の注記：絵表示の枠は赤色とする。）", "。")
card["choices"][2]["text"] = choice3.rstrip("。") + "。（図の注記：絵表示の枠は赤色とする。）"
card["figures"][0]["alt"] = "㋑：どくろの絵表示"
card["figures"][1]["alt"] = "㋺：感嘆符の絵表示"

ghs = "https://anzeninfo.mhlw.go.jp/user/anzen/kag/pdf/ghs_rev6_jp.pdf"
symbol = "https://anzeninfo.mhlw.go.jp/user/anzen/kag/ghs_symbol.html"
sds = "https://www.mhlw.go.jp/content/11120000/001571853.pdf"
johas = "https://cheminfo.johas.go.jp/useful/book3/pageindices/index22.html"
item["overlay"]["sources"] = [
    {"title": "厚生労働省 GHS改訂第6版和訳", "url": ghs},
    {"title": "厚生労働省 GHSのシンボルと名称", "url": symbol},
    {"title": "厚生労働省 防水スプレー製品調査報告 付録（11）SDSについて", "url": sds},
    {"title": "労働者健康安全機構 令和6年度化学物質管理初心者向け教材第3巻", "url": johas},
]
item["overlay"]["summary"] = (
    "GHSの危険有害性区分はクラスごとに異なる。厚労省掲載のGHS本文では急性毒性だけでも"
    "区分1～5があるので、全クラスに区分1～4の四区分しかないとする肢1が誤り。"
)
item["overlay"]["choices"][0]["reason"] = (
    "これが誤り。厚労省掲載のGHS本文は急性毒性に区分1から区分5を設けており、"
    "たとえば経口急性毒性の区分5には危険有害性情報『飲み込むと有害のおそれ』を割り当てる。"
    "クラスごとに分類方法や"
    "区分数は異なるので、すべてのクラスが一律に区分1～4の四区分とはいえない。"
)
item["overlay"]["choices"][1]["reason"] = (
    "この記述は正しい。厚労省の一覧に並ぶ絵表示を数えると全部で9種類。"
    "各絵表示の対象クラスから健康に対する有害性に用いるものを数えると、"
    "どくろ・感嘆符・腐食性・健康有害性（人体シルエット）の4種類になる。"
    "腐食性は金属腐食にも使うが、皮膚や眼の損傷にも用いる。"
)
item["overlay"]["choices"][2]["reason"] = (
    "この記述は正しい。公式問題の図を確認すると㋑がどくろ、㋺が感嘆符である。"
    "厚労省掲載のGHS本文1.4.10.5.3.1は複数絵表示の優先順位として、"
    "どくろを適用する場合は感嘆符を使用すべきでないと定める。"
    "したがって、この図の組み合わせは優先順位の規則に合う。"
)
item["overlay"]["choices"][3]["reason"] = (
    "この記述は正しい。GHSの注意喚起語は『危険』と『警告』の2種類で、"
    "GHS本文1.4.10.5.3.2は『危険』を適用するとき『警告』を使用すべきでないと示す。"
    "複数の危険有害性があっても両方を同じラベルに重ねて記載しない。"
)
item["overlay"]["choices"][4]["reason"] = (
    "この記述は正しい。厚労省資料のSDS解説は『その他の情報』を含む16項目を列挙し、"
    "項目の番号、項目名、順序を変更してはならないと明記する。"
    "同じ16番『その他の情報』は、現行のJIS Z 7253:2019に基づく労働者健康安全機構の教材でも確認できる。"
)
item["sourceEvidence"] = [
    {"url": ghs, "excerpt": "区分  5", "choiceNumbers": [1]},
    {"url": ghs, "excerpt": "飲み込むと有害のおそれ", "choiceNumbers": [1]},
    {"url": symbol, "excerpt": "GHSのシンボルと名称", "choiceNumbers": [2]},
    {"url": symbol, "excerpt": "感嘆符", "choiceNumbers": [2]},
    {"url": symbol, "excerpt": "どくろ", "choiceNumbers": [2]},
    {"url": symbol, "excerpt": "腐食性", "choiceNumbers": [2]},
    {"url": symbol, "excerpt": "健康有害性", "choiceNumbers": [2]},
    {"url": symbol, "excerpt": "急性毒性（区分4）、皮膚腐食性・刺激性", "choiceNumbers": [2]},
    {"url": symbol, "excerpt": "急性毒性（区分1-3）", "choiceNumbers": [2]},
    {"url": symbol, "excerpt": "皮膚腐食性・刺激性（区分1A-C）、眼に対する重篤な損傷・眼刺激性", "choiceNumbers": [2]},
    {"url": symbol, "excerpt": "呼吸器感作性、生殖細胞変異原性、発がん性", "choiceNumbers": [2]},
    {"url": ghs, "excerpt": "どくろを適用する場合、感嘆符を使用するべきでない", "choiceNumbers": [3]},
    {"url": ghs, "excerpt": "注意喚起語「危険」を適用する場合、注意喚起語「警告」を使用するべきでない", "choiceNumbers": [4]},
    {"url": sds, "excerpt": "これらの項目名の番号、項目名及び順序を変更してはならない", "choiceNumbers": [5]},
    {"url": sds, "excerpt": "次の16項目及びその情報を記載しなければ", "choiceNumbers": [5]},
    {"url": sds, "excerpt": "項目-16 その他の情報", "choiceNumbers": [5]},
    {"url": sds, "excerpt": "JIS Z7253:2012", "choiceNumbers": [5]},
    {"url": johas, "excerpt": "JIS Z 7253:2019に規定された項目名", "choiceNumbers": [5]},
    {"url": johas, "excerpt": "16 その他の情報", "choiceNumbers": [5]},
]
item["reviewIssues"] = []
draft_path.write_text(json.dumps(draft, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
presentation_path.write_text(json.dumps(presentation, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
