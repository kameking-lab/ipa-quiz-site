"""Corrected transcription checked against all 15 official R6 page images."""
import json
import re
from pathlib import Path

ROOT=Path(__file__).resolve().parent
lines=(ROOT/'2024-11-sorted.txt').read_text(encoding='utf8').splitlines()
lines=[x for x in lines if not re.search(r'^===|【11】|い1】|令和6年度|Ⅲ次の35',x)]
text='\n'.join(lines).replace('Ⅲー272021','Ⅲー27 2021')
parts=re.split(r'Ⅲ[ー－−一]\s*(\d+)\s*',text)
questions={}
for i in range(1,len(parts),2):
    n,body=int(parts[i]),parts[i+1].replace('\n','')
    for old,new in [('間ロ','間口'),('O.25','0.25'),('O.6','0.6'),('O.7','0.7'),
      ('O.15','0.15'),('0.lmg','0.1mg'),('O.08','0.08'),('O.18','0.18'),
      ('O.1','0.1'),('1.OcIo','1.0clo'),('士0.5','±0.5'),('アダブテイプ','アダプティブ'),
      ('佖A','αA'),('住A','αA'),('住は流量','αは流量'),('持っ','持つ'),
      ('5000ⅸ','5000lx'),('べローズ','ベローズ'),('1CL/minJ','1[L/min]'),
      ('10.OL','10.0L'),('ェア','エア'),('ュニット','ユニット'),
      ('Wet—BuIbGlobeTemperature','Wet-Bulb Globe Temperature'),
      ('TotaIVolatileOrganicCompounds','Total Volatile Organic Compounds'),
      ('400なg/m3','400μg/m³'),('C02','CO₂'),('工アロゾル','エアロゾル'),
      ('700/0','70%'),('sv(','SV('),('JISK0102ー1','JIS K 0102－1'),
      ('1十2','1＋2'),('mm。1/L','mmol/L'),('mm司/L','mmol/L'),('mm。I/L','mmol/L'),
      ('A20','A2O'),('でんぶん','でんぷん'),('ョーロッパ','ヨーロッパ'),
      ('④.バグ','④バグ'),('privateFinancelnitiative','Private Finance Initiative'),
      ('DesignBuildOperate','Design Build Operate'),('適正かっ','適正かつ'),('保っ好気','保つ好気'),
      ('m3','m³'),('m2','m²'),(',','，')]:
        body=body.replace(old,new)
    chunks=re.split(r'[①②③④⑤]',body)
    if len(chunks)==6:questions[n]=dict(text=chunks[0],choices=chunks[1:])
assert set(questions)==set(range(1,36)),set(range(1,36))-set(questions)
questions[3]['choices'][4]='新有効温度（ET*）はGaggeらによる理論から導かれた体感温度で，椅座静位，着衣量1.0clo，静穏気流，平均放射温度＝空気温度という標準状態でのET*が標準新有効温度（SET*）とされる。'
questions[2]['choices'][2]='結露を防ぐために二重サッシを使用する場合，外気側のサッシはできるだけ気密に，室内側は湿気が逃げやすい構造にする必要がある。'
questions[5]['choices'][3]='高さの異なる2つの開口部があるときの温度差換気量は，直列合成した実効面積αAに比例するとともに，室内外温度差及び開口高さの差の平方根に比例して増加する。'
questions[6]['choices'][0]='明視の4条件として，対象物の明るさ，視対象と背景の対比，対象物の大きさ，見る時間が挙げられるが，このうち照明が関わるものは「対象物の明るさ」である。'
questions[6]['choices'][3]='昼光照明においては，最低照度の確保のために，設計用全天空照度として「暗い日」に当たる5000lxを用いるのが一般的である。'
questions[7]['choices'][0]='回転型は，ロータの回転に伴って排気の一部が給気側に移行することがある。'
questions[8]['text']='シャワーヘッドから給湯量（混合湯量）16 L/min，使用温度（混合湯温度）40℃のお湯を出す場合，給湯温度を60℃，給水温度を15℃とすると，給湯すべき給湯量として，最も近い値はどれか。ただし，配管などの熱損失はないものとする。'
questions[9]=dict(text='防火ダンパに関する次の記述の，空欄に入る語句の組合せとして，最も適切なものはどれか。\nダクトに設置される防火ダンパの温度ヒューズ型の溶融温度は，一般換気用［ア］程度，排煙用［イ］程度であり，羽根及びケーシングは［ウ］以上の鋼板でつくる。',choices=['ア：72℃／イ：270℃／ウ：1.2mm','ア：72℃／イ：280℃／ウ：1.2mm','ア：72℃／イ：280℃／ウ：1.5mm','ア：120℃／イ：270℃／ウ：1.5mm','ア：120℃／イ：280℃／ウ：1.5mm'])
questions[12]['choices'][1]='冷却式除湿装置は，処理空気の温度低下と相対湿度の上昇を伴うため，これらが問題となる場合は，冷却除湿後の空気を加熱（再熱）する必要がある。'
questions[12]['choices'][2]='吸着式除湿装置は，水分を吸着する性質を持つシリカゲル，活性アルミナ，合成ゼオライト，活性炭などの吸着剤を利用したものである。'
questions[13]['choices'][3]='臭気濃度は，臭気を数量化する方法の1つであり，対象臭気のにおい物質の質量濃度で表される。'
questions[17]=dict(text='室内空気中の感染性を保った病原体を含む浮遊粒子を対象として，室内空気を室内循環機器や可搬式空気清浄機に循環させてエアフィルタで除去することで，対象の汚染質を含まない新鮮外気によって5ACH（Air change per hour）の換気を行う場合と同程度の効果を得るために必要となるエアフィルタの性能と循環空気風量の組合せとして，最も適切なものはどれか。\nただし，室容積は80m³，室内空気は完全混合されているものとし，エアフィルタによる対象浮遊粒子のワンパス除去効率は以下の表に基づいて計算すること。\n表：フィルタ性能 — 除去効率\n＜ePM₂.₅ 50％ — 0％\nePM₂.₅ 50％ — 60％\nePM₂.₅ 65％ — 71％\nePM₁ 50％ — 77％\nePM₁ 70％ — 88％\nePM₁ 85％ — 91％\nePM₁ 95％ — 95％',choices=['ePM₂.₅ 50％ — 400m³/h','ePM₂.₅ 50％ — 520m³/h','ePM₁ 50％ — 400m³/h','ePM₁ 50％ — 520m³/h','ePM₁ 85％ — 520m³/h'])
questions[18]['choices'][1]='開放式の角形冷却塔は，散水方向と空気の流れが逆方向となるカウンターフローが多く採用されているため，エアロゾルを上方に飛散させやすい。'
questions[19]=dict(text='以下に示す条件で運転されている浄化槽の汚泥発生量として，最も近い値はどれか。\n流入汚水量：250m³/日，流入水BOD濃度：200mg/L\n放流水BOD濃度：20mg/L，汚泥転換率：70％\n汚泥の含水率：98％，汚泥の比重：1.0',choices=['0.18m³/日','1.58m³/日','1.75m³/日','1.93m³/日','2.25m³/日'])
questions[21]['text']='浄化槽におけるばっ気の目的に関する次の記述のうち，最も不適切なものはどれか。'
questions[27]=dict(text='2021年度の我が国の公共用水域における生活環境項目の環境基準（BOD又はCOD）の達成率を高い順に並べた組合せとして，最も適切なものはどれか。',choices=['河川 ＞ 湖沼 ＞ 海域','河川 ＞ 海域 ＞ 湖沼','湖沼 ＞ 河川 ＞ 海域','海域 ＞ 河川 ＞ 湖沼','海域 ＞ 湖沼 ＞ 河川'])
questions[28]['choices'][0]='廃棄物とは，ごみ，粗大ごみ，燃え殻，汚泥，ふん尿，廃油，廃酸，廃アルカリ，動物の死体その他の汚物又は不要物であって固形状又は液状のものをいう。'
questions[29]['choices'][0]='ごみの焼却方式には，連続的にごみを投入する連続式と，回分的にごみを投入するバッチ式があるが，近年，バッチ式は減少している。'
questions[29]['choices'][1]='ストーカ炉では，ごみはホッパーに投入された後，階段状の火格子（ストーカ）上で乾燥，燃焼，後燃焼，溶融のプロセスを経て，完全に燃焼される。'
questions[29]['choices'][2]='流動床炉では，ごみはホッパーに投入された後，破袋・破砕されてから，固形加熱粒子を含む流動床に入れられる。'
questions[29]['choices'][3]='集じん器に流入する燃焼ガスの温度は，おおむね200℃以下に冷却することが必要である。'
questions[29]['choices'][4]='集じん器で集められたばいじんは，特別管理一般廃棄物に指定されており，溶融固化，焼成，セメント固化，薬剤処理，酸などの溶媒による安定化のいずれかの処理を行う必要がある。'
questions[32]['choices'][3]='PFI方式は，「民間資金等の活用による公共施設等の整備等の促進に関する法律」に基づいて実施する方式である。'
questions[32]['choices'][4]='DBO方式は，民間事業者が自ら資金調達を行い，設計・建設・運営をする方式である。'
questions[33]['choices'][1]='災害廃棄物は，自然災害に直接起因して発生する廃棄物のうち，自然環境保全上の支障へ対処するため，市区町村等がその処理を実施するものである。'
questions[35]['choices'][3]='廃止後は，廃棄物が地下にある土地であって土地の形質の変更により生活環境保全上の支障が生じるおそれがある区域として，指定区域に指定される。'
reasons=json.loads((ROOT/'sanitary-2024-reasons.json').read_text(encoding='utf8'))
for q in reasons:q.update(questions[q['number']])
(ROOT/'manuscripts/pe-first-sanitary-2024.json').write_text(json.dumps(reasons,ensure_ascii=False,indent=2)+'\n',encoding='utf8',newline='\n')
print('Prepared 35 questions and 175 reasons.')
