"""Correct the polymerization classification table in the Astra receipt."""
import json
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
p=ROOT/'reports/LQ3B-20261104/manuscripts/pe-first-chemical-2024.json'
q=json.loads(p.read_text(encoding='utf8'))
q[20]['summary']='Bのチオール−エン付加とCのイソシアネート−アミン反応は重付加。Dのフェノール−ホルムアルデヒドは付加によるメチロール化と縮合を経る付加縮合。Aの脱塩反応とEの脱HCl反応は縮合重合。②。'
q[20]['reasons']=[
 'B・Cの重付加は合うが、付加縮合はAでなくD。Aを縮合重合へ、Dを付加縮合へ分類する必要がある。',
 'B・C=重付加、D=付加縮合、A・E=縮合重合が原本の反応に対応する。Dは付加と縮合の二段階を繰り返す。',
 'AはNaClを副生する縮合重合、Cは小分子を脱離しない重付加である。Dも付加縮合へ分類する。',
 'Dの付加縮合だけは合う。A・Eは小分子等を脱離する縮合重合、B・Cは小分子脱離のない重付加である。',
 'Cの重付加とEの縮合重合は合うが、Dは付加縮合、Aは縮合重合、Bは重付加へ分類する。'
]
# 補強に用いた一次資料を対象問だけへ追加。
q[10]['sources']=[dict(title='外務省 パリ協定',url='https://www.mofa.go.jp/mofaj/ic/ch/page1w_000119.html')]
q[11]['sources']=[dict(title='資源エネルギー庁 エネルギー白書2023 石油資源',url='https://www.enecho.meti.go.jp/about/whitepaper/2023/pdf/whitepaper2023_all.pdf')]
p.write_text(json.dumps(q,ensure_ascii=False,indent=2)+'\n',encoding='utf8',newline='\n')
print('Q21 summary and all five reasons corrected; official key 2 retained')
