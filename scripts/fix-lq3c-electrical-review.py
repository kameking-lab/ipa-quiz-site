"""Correct the six reasons and nine transcription errors in the Astra receipt."""
import json
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
p=ROOT/'reports/LQ3B-20261104/manuscripts/pe-first-electrical-2024.json'
qs=json.loads(p.read_text(encoding='utf8'))
updates={
 (6,4):'負荷電力式と最大電力V0^2/(4R0)は合うが、最大となる負荷はR0/2でなくR0である。',
 (6,5):'負荷電力式と最適負荷RL=R0は正しい。最大電力はV0^2/(2R0)でなくV0^2/(4R0)で、係数が誤り。',
 (8,2):'最終値と時定数は合うが、過渡項の前が負号なので初期電流E/Rを満たさない。過渡項は加算する。',
 (9,1):'初期電流RV0はV0/R、初期傾きRCV0は−V0/(RC)、時定数R/CはRCへ修正が必要。電圧も放電のV0/eとなる。',
 (9,2):'初期電流はRV0でなくV0/Rで、電圧の傾きは正でなく負。また時定数は1/(RC)でなくRCである。',
 (16,2):'Aの式にある√3は不要で、正しくはjXT+3RN。またBは非接地Yのため零相インピーダンスは無限大。',
}
for (n,c),reason in updates.items(): qs[n-1]['reasons'][c-1]=reason
fixes={'中,空':'中空','タービ,ン':'タービン','塩害,に':'塩害に','防止,する':'防止する','より合わ,せた':'より合わせた','変,調':'変調','搬,送波':'搬送波','方式,であり':'方式であり','送信,する':'送信する'}
for q in qs:
    if not q.get('text'): continue
    for key in ['text','choices']:
        values=[q[key]] if key=='text' else q[key]
        for i,t in enumerate(values):
            for a,b in fixes.items(): t=t.replace(a,b)
            values[i]=t
        q[key]=values[0] if key=='text' else values
p.write_text(json.dumps(qs,ensure_ascii=False,indent=2)+'\n',encoding='utf8',newline='\n')
print('Astra six reasons and nine transcription errors corrected')
