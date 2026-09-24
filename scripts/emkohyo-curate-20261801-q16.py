"""Pin five radiation-choice reasons to direct Japanese government sources."""

import json
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
path = ROOT / "data/exam-library/emkohyo-review/emkohyo-EM20261801-q16-20-draft.json"
data = json.loads(path.read_text(encoding="utf-8"))
item = data["questions"]["emkohyo-EM20261801-q16"]
over = item["overlay"]
jaea = "https://jopss.jaea.go.jp/pdfdata/JAEA-Research-2008-042.pdf"
env_alpha = "https://www.env.go.jp/chemi/rhm/current/01-03-09.html"
pmda = "https://www.pmda.go.jp/files/000240227.pdf"
env_threshold = "https://www.env.go.jp/chemi/rhm/r1kisoshiryo/attach/r1kiso-slide03-03.pdf"
niph = "https://www.niph.go.jp/soshiki/09seikatsu/EMA/radiation/pdf/occupational_radiation_kunugita_fy2018.pdf"
over["sources"] = [
    {"title": "日本原子力研究開発機構 JAEA-Research 2008-042", "url": jaea},
    {"title": "環境省 放射線の体内での透過力", "url": env_alpha},
    {"title": "PMDA 粉末X線回折測定法", "url": pmda},
    {"title": "環境省 放射線基礎資料・様々な影響のしきい値", "url": env_threshold},
    {"title": "国立保健医療科学院 労災疾病臨床研究・放射線業務の線量と健康影響", "url": niph},
]
over["choices"][0]["reason"] = (
    "これが誤りの記述。日本原子力研究開発機構の報告は、原子核の半減期は"
    "周囲の温度、圧力、化学環境を変えても変化しないと明示する。温度で変わる化学反応速度と、"
    "核種に固有の確率で起こる放射性壊変を混同しているため、この選択肢が誤りである。"
)
over["choices"][1]["reason"] = (
    "文自体は正しい。環境省の透過力の説明では、α線は空気中で数cm程度しか進まず紙一枚で止まり、"
    "β線はα線より遠くまで進む。一方、γ線とX線は透過力が強く体の奥まで届く。"
    "したがって列挙されたα・β・γのうち最も透過力が大きいのはγ線である。"
)
over["choices"][2]["reason"] = (
    "文自体は正しい。PMDAの粉末X線回折測定法は、波長λ、原子面の面間隔d、回折角θに"
    "nλ＝2d sinθが成り立つと記す。sinθは1以下なのでλ≦2dであり、"
    "原子面の間隔と同程度またはそれより短い波長のX線なら回折条件を満たせる。"
    "その回折強度を角度ごとに測り、固体中の結晶相の同定や定量的な相分析に使える。"
)
over["choices"][3]["reason"] = (
    "文自体は正しい。環境省の資料p.3のICRP勧告・報告書118に基づくしきい線量表は、"
    "白内障による視力低下を約0.5 Gy、一時的脱毛を約4 Gyと示す。"
    "同じ表に載る二つの組織反応を線量で比べると、白内障の方が小さい。"
)
over["choices"][4]["reason"] = (
    "文自体は正しい。国立保健医療科学院が公開する労災疾病臨床研究の報告では、確率的影響は線量が増すと"
    "発生確率が上がる一方、起きた影響の重篤度は変わらないと説明する。"
    "がんなどは発生するリスクと症状の重さを区別するため、この記述は正しい。"
)
item["sourceEvidence"] = [
    {"url": jaea, "excerpt": "半減期は原子核の不安定性によって決まる", "choiceNumbers": [1]},
    {"url": jaea, "excerpt": "周囲の温度や圧力，化学環境などによって変えることはできない", "choiceNumbers": [1]},
    {"url": env_alpha, "excerpt": "紙一枚で止めることができます", "choiceNumbers": [2]},
    {"url": env_alpha, "excerpt": "γ線・Ｘ", "choiceNumbers": [2]},
    {"url": pmda, "excerpt": "結晶相の同定", "choiceNumbers": [3]},
    {"url": pmda, "excerpt": "定量的な相分析", "choiceNumbers": [3]},
    {"url": pmda, "excerpt": "nλ＝2d sinθ", "choiceNumbers": [3]},
    {"url": env_threshold, "excerpt": "一時的脱毛\n皮膚\n２～３週\n約４", "choiceNumbers": [4]},
    {"url": env_threshold, "excerpt": "白内障", "choiceNumbers": [4]},
    {"url": niph, "excerpt": "重篤度は変わらず，発生確率だけが増加する", "choiceNumbers": [5]},
]
item["reviewIssues"] = []
path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
