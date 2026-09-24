"""Ground fluorescence answers in public measurement method and research notes."""

import json
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
path = ROOT / "data/exam-library/emkohyo-review/emkohyo-EM20261804-q16-20-draft.json"
data = json.loads(path.read_text(encoding="utf-8"))
item = data["questions"]["emkohyo-EM20261804-q16"]
mhlw = "https://www.mhlw.go.jp/content/11120000/001022457.pdf"
naro = "https://www.naro.go.jp/laboratory/niah/disease/biochem/fs_genri/index.html"
oxygen = "https://www.jst.go.jp/kisoken/presto/evaluation/posteriori/H17report16_1.pdf"
item["overlay"]["sources"] = [
    {"title": "厚生労働省 第十八改正日本薬局方第一追補・2.22蛍光光度法", "url": mhlw},
    {"title": "農研機構 蛍光分光光度計の原理", "url": naro},
    {"title": "科学技術振興機構 研究成果報告書・ピレン蛍光プローブ", "url": oxygen},
]
item["overlay"]["summary"] = (
    "蛍光強度は励起波長の長短で一律に決まらず、波長に応じたモル吸光係数などに依存する。"
    "『励起光の波長が長いほど強くなる』とした肢2が誤り。"
)
item["overlay"]["choices"][0]["reason"] = (
    "文自体は正しい。農研機構の蛍光分光光度計の原理解説では、"
    "物質に可視光や紫外光を照射すると、照射した光より長波長の光を放射する場合があると説明する。"
    "試験で扱う通常の蛍光は励起光より波長の長い側に現れ、肢の記述と整合する。"
)
item["overlay"]["choices"][1]["reason"] = (
    "これが誤りの記述。蛍光強度は励起波長が長くなるほど一律に増すわけではない。"
    "日本薬局方の式F＝kI₀φεclには、励起波長におけるモル吸光係数εが入る。"
    "励起波長を変えて強度との関係を示す励起スペクトルを作り、通常は極大波長付近で測定する。"
    "したがって波長の長短だけでは強度を決められない。"
)
item["overlay"]["choices"][2]["reason"] = (
    "文自体は正しい。日本薬局方が希薄溶液について示す式F＝kI₀φεclでは、"
    "試料濃度や測定条件を一定にすれば蛍光強度Fは励起光の強さI₀に比例する。"
    "たとえば励起光強度を2倍にした場合、式の適用範囲では蛍光強度も2倍となる。"
)
item["overlay"]["choices"][3]["reason"] = (
    "文自体は正しい。日本薬局方の蛍光光度法では、蛍光強度Fは希薄溶液で蛍光物質の濃度cに比例し、"
    "F＝kI₀φεclと示される。これは低濃度域での定量に利用できる関係であり、"
    "全ての濃度域で無条件に比例するという意味ではない。"
)
item["overlay"]["choices"][4]["reason"] = (
    "文自体は正しい。溶媒中の溶存酸素が蛍光を消光し、測定強度を下げる場合がある。"
    "科学技術振興機構の研究成果報告書でも、蛍光プローブに用いるピレンについて、"
    "溶媒中の溶存酸素による消光を受けやすいことが課題と明記されている。"
    "したがって蛍光光度分析で溶存酸素の影響を受けることがある。"
)
item["sourceEvidence"] = [
    {"url": naro, "excerpt": "照射した光よりも長波長の光を放射する場合があります", "choiceNumbers": [1]},
    {"url": mhlw, "excerpt": "2.22 蛍光光度法", "choiceNumbers": [2, 3, 4]},
    {"url": mhlw, "excerpt": "F ＝kI0φεcl", "choiceNumbers": [3, 4]},
    {"url": mhlw, "excerpt": "励起光の波長におけるモル吸光係数", "choiceNumbers": [2]},
    {"url": mhlw, "excerpt": "励起波長を変化させて試料溶液の蛍光強度を", "choiceNumbers": [2]},
    {"url": mhlw, "excerpt": "蛍光物質の励起及び蛍光スペクトルの極", "choiceNumbers": [2]},
    {"url": oxygen, "excerpt": "溶媒中の溶存酸素による消光を受けや", "choiceNumbers": [5]},
]
item["reviewIssues"] = []
path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
