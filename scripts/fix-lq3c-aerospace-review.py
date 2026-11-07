"""Astra first-review corrections, including complete punctuation proofreading."""
import json
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
p=ROOT/'reports/LQ3B-20261104/manuscripts/pe-first-aerospace-2024.json'
q=json.loads(p.read_text(encoding='utf8'))
q[2]['choices'][1]='ア=pr/t、イ=pr/(2t)'
q[2]['choices'][3]='ア=pr/t、イ=pr/t'
q[2]['reasons'][1]='軸方向pr/tに対し周方向pr/(2t)としており、大小関係が逆になっている。'
q[2]['reasons'][3]='両方pr/tではない。閉端の軸方向応力は周方向の半分pr/(2t)である。'
q[24]['text']='ロケットに搭載する液体推進薬に関する次の記述のうち、最も不適切なものはどれか。'
q[3]['choices'][1]=q[3]['choices'][1].replace('[rad^−1]','[rad]')
q[3]['reasons'][1]='薄翼理論の揚力傾斜は2π/radであり、粘性は一般にその傾斜を低下させる。原文は「2π [rad]」だが、傾斜の単位としてはrad^−1であることに注意。'
fixes={'必,要':'必要','2兀':'2π','最,大':'最大','翼面上,で':'翼面上で','過大で,ある':'過大である','ビッチ':'ピッチ','飛行機,の':'飛行機の','となっている環境性能':'となっている。環境性能','記述。の':'記述の','高速飛行状態地上':'高速飛行状態、地上','工,ンジン':'エンジン','バイバス':'バイパス','促進されるこのため一般的に':'促進される。このため、一般的に','比べて。小さい':'比べて小さい','ロケット人工衛星':'ロケット、人工衛星','交,角':'交角','観測しカタログ化している観測できる':'観測し、カタログ化している。観測できる','静止軌。道':'静止軌道','減らさねは':'減らさねば','イオ,ン化':'イオン化','新しい物質に変化する生物':'新しい物質に変化する。生物','極。めて':'極めて','及,び':'及び','アルペド':'アルベド','「地球自らの赤外放射」,による':'「地球自らの赤外放射」による','ある対策として':'ある。対策として','コー。ティング':'コーティング','トータ,ル':'トータル','進み成層圏':'進み、成層圏','選ばれ,て':'選ばれて','持っ':'持つ','運動工ネルギー':'運動エネルギー','あり角速度':'あり、角速度','バイア,ス':'バイアス','ダンパを,持つ':'ダンパを持つ','モードs':'モードS','モードc':'モードC','カ.バー':'カバー','形式,である':'形式である','Autonomouslntegrity':'AutonomousIntegrity','(lnternational':'(International','同一方,式':'同一方式','「べーキング」':'「ベーキング」'}
for x in q:
    if not x.get('text'): continue
    for key in ['text','choices']:
        values=[x[key]] if key=='text' else x[key]
        for i,s in enumerate(values):
            for a,b in fixes.items(): s=s.replace(a,b)
            values[i]=s
        x[key]=values[0] if key=='text' else values
# 二回目の独立レビューによる表記の残件。
q[4]['choices'][0]=q[4]['choices'][0].replace('(翼胴干渉)垂直','(翼胴干渉)、垂直')
english={'LET(LinearEnergyTransfer)':'LET(Linear Energy Transfer)','SAA;southAtlanticAnomaly':'SAA; South Atlantic Anomaly','SecondarysurveillanceRadar':'Secondary Surveillance Radar','Satellite-BasedAugmentationSystem':'Satellite-Based Augmentation System','Ground-BasedAugmentationSystem':'Ground-Based Augmentation System','ReceiverAutonomousIntegrityMonitoring':'Receiver Autonomous Integrity Monitoring','Aircraft¯BasedAugmentationSystem':'Aircraft-Based Augmentation System','InternationalCivilAviationOrganization':'International Civil Aviation Organization','Global NavigationSatellitesystem':'Global Navigation Satellite System'}
for x in q:
    if not x.get('text'): continue
    for a,b in english.items():
        x['text']=x['text'].replace(a,b)
        x['choices']=[c.replace(a,b) for c in x['choices']]
p.write_text(json.dumps(q,ensure_ascii=False,indent=2)+'\n',encoding='utf8',newline='\n')
print('Astra required corrections and remaining OCR punctuation corrected')
