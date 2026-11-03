"""Pin government definitions for acute toxicity, thresholds and biological monitoring."""

import json
from pathlib import Path


root = Path(__file__).resolve().parents[1]
path = root / "data/exam-library/emkohyo-review/emkohyo-20260217-q01-05-draft.json"
data = json.loads(path.read_text(encoding="utf-8"))
item = data["questions"]["emkohyo-20260217-q3"]

terms = "https://anzeninfo.mhlw.go.jp/user/anzen/kag/kag_yogo.html"
nite = "https://www.nite.go.jp/chem/shiryo/ra/about_ra5.html"
env = "https://www.env.go.jp/council/05hoken/y052-09a.html"
genotox = "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/0000113892.html"
fsc = "https://www.fsc.go.jp/yougoshu/kensaku_dokusei.html"
bei = "https://www.mhlw.go.jp/bunya/roudoukijun/anzeneisei14/dl/kagaku4_0015.pdf"
amount = "https://www.mhlw.go.jp/content/11201000/000716406.pdf"

item["overlay"]["sources"] = [
    {"title": "厚生労働省 職場のあんぜんサイト 化学物質用語解説", "url": terms},
    {"title": "製品評価技術基盤機構 閾値のない発がん性の評価", "url": nite},
    {"title": "環境省 化学物質評価専門委員会議事録", "url": env},
    {"title": "厚生労働省 職場における化学物質のリスク評価", "url": genotox},
    {"title": "食品安全委員会 用語集（変異原性試験）", "url": fsc},
    {"title": "厚生労働省掲載 化学物質リスクアセスメント演習「作業環境測定値等の比較例」", "url": bei},
    {"title": "厚生労働省掲載 大前和幸氏講義「我が国における化学物質管理の現状と課題」", "url": amount},
]
item["overlay"]["summary"] = (
    "しきい値がないとされる発がん物質にはNOAELが存在しないため、ユニットリスクやVSD等で評価する。"
    "しきい値がある物質ではNOAELやLOAEL等を用いる。前者にNOAELを当てた肢2が誤り。"
)
item["overlay"]["choices"][0]["reason"] = (
    "この記述は正しい。厚労省の用語解説ではLC50を短時間吸入で実験動物の半数が死亡する濃度、"
    "LD50を一回投与で半数が死亡する量と定義する。いずれも短時間または一回の投与による"
    "急性毒性の大きさを表す指標で、LC50は吸入の濃度、LD50は一回投与の量とばく露経路も異なる。"
)
item["overlay"]["choices"][1]["reason"] = (
    "これが誤り。NITEはしきい値のない有害性ではNOAELが存在せず、"
    "発がんリスクはユニットリスクや実質安全量などで評価すると説明する。"
    "環境省の審議会議事録は、しきい値のある物質の評価にNOAELやLOAELを用いると説明する。"
    "しきい値のない発がん物質に存在しないNOAELを当てた点が設問の誤りである。"
)
item["overlay"]["choices"][2]["reason"] = (
    "この記述は正しい。厚労省の用語解説は、ばく露限界を量―反応関係等から導かれ、"
    "ほとんど全ての労働者が連日反復ばく露しても健康影響を受けないと考えられる濃度又は量の"
    "しきい値と定義する。厚労省の講義資料は量影響関係もばく露限界値を考える際の対象として示す。"
)
item["overlay"]["choices"][3]["reason"] = (
    "この記述は正しい。食品安全委員会の用語集は、変異原性試験を遺伝子突然変異や染色体異常を"
    "調べる試験と定義する。"
    "厚労省は発がん性スクリーニングの手法に微生物を用いた変異原性試験を挙げる。"
    "化学物質が遺伝子等を変化させるか調べる試験は、発がん性の候補を絞る用途にも使われる。"
)
item["overlay"]["choices"][4]["reason"] = (
    "この記述は正しい。厚労省資料はBEIをBiological Exposure Indicesの略と記し、"
    "ACGIHのBEI値を生物学的モニタリングの測定データに対するばく露レベル評価で用いる。"
    "ACGIHが示した値を生物学的モニタリングの評価指標とする設問の説明に合う。"
)
item["sourceEvidence"] = [
    {"url": terms, "excerpt": "短時間の吸入ばく露（通常1時間から4時間）で1群の実験動物の50％を死亡させる", "choiceNumbers": [1]},
    {"url": terms, "excerpt": "1回の投与で1群の実験動物の50％を死亡させる", "choiceNumbers": [1]},
    {"url": terms, "excerpt": "急性毒性デｰタの指標", "choiceNumbers": [1]},
    {"url": nite, "excerpt": "有害性に閾値がない場合には、NOAEL（無毒性量）やTDI", "choiceNumbers": [2]},
    {"url": nite, "excerpt": "ユニットリスク", "choiceNumbers": [2]},
    {"url": nite, "excerpt": "VSD（実質安全量", "choiceNumbers": [2]},
    {"url": env, "excerpt": "閾値があると考えられるものにつきましては、ＮＯＡＥＬ、あるいはＬＯＡＥＬ", "choiceNumbers": [2]},
    {"url": terms, "excerpt": "量―反応関係等から導かれる、ほとんどすべての労働者が連日繰り返しばく露されても健康に影響を受けない", "choiceNumbers": [3]},
    {"url": amount, "excerpt": "量影響関係（量と健康影響の強さの関係）", "choiceNumbers": [3]},
    {"url": amount, "excerpt": "ばく露限界値(仮称)が標的", "choiceNumbers": [3]},
    {"url": fsc, "excerpt": "変異原性を確認する目的で行う試験。遺伝子突然変異試験、染色体異常試験等がある", "choiceNumbers": [4]},
    {"url": genotox, "excerpt": "遺伝毒性試験、中期発がん性試験等による発がん性のスクリーニング", "choiceNumbers": [4]},
    {"url": genotox, "excerpt": "スクリーニング試験の手法、評価の基準等 微生物を用いた変異原性試験", "choiceNumbers": [4]},
    {"url": bei, "excerpt": "ACGIH「Biological Exposure Indices」", "choiceNumbers": [5]},
    {"url": bei, "excerpt": "生物学的モニタリングの測定データがある場合のばく露レベル", "choiceNumbers": [5]},
]
item["reviewIssues"] = []
path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
