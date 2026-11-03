"""Correct the independently identified Q30 table-column misreading."""
import json
from pathlib import Path
p=Path(__file__).resolve().parents[1]/'reports/LQ3B-20261104/manuscripts/pe-first-textile-2024.json'
qs=json.loads(p.read_text(encoding='utf8')); q=qs[29]
q['summary']='誤りを含む繊維は④アクリル。フェノール・四塩化エタン欄がS（煮沸）となっているが、アクリルはこの条件ではI（不溶）。DMF欄のS※（40〜50℃）とは別の列なので注意する。'
q['reasons'][3]='表のアクリルのフェノール・四塩化エタン欄はS（煮沸）だが、正しくはI（不溶）。DMF欄の溶解表示は誤りではない。'
q['sources']=[dict(title='ISO 1833-24:2010 フェノール・テトラクロロエタンによるポリエステルとアクリル等の分別',url='https://www.iso.org/standard/44340.html')]
p.write_text(json.dumps(qs,ensure_ascii=False,indent=2)+'\n',encoding='utf8',newline='\n')
