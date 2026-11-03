"""Apply visually verified formula/table corrections and crop official figures.
Run after extract-source.py and initial segmentation. Coordinates are PDF points.
"""
import json,re,hashlib
from pathlib import Path
import pymupdf as fitz
ROOT=Path(__file__).resolve().parents[2]
FIGURES={
 '2026-early':{2:(2,[170,373,465,466]),3:(3,[190,173,435,285]),13:(7,[155,150,445,309]),22:(10,[115,150,520,568]),35:(14,[155,315,480,465]),36:(15,[135,163,325,329]),39:(16,[143,162,485,349])},
 '2025-late':{2:(2,[180,390,465,475]),3:(3,[185,190,440,300]),15:(7,[215,211,415,383]),19:(8,[105,480,425,648]),21:(9,[190,413,435,597]),31:(13,[145,313,435,487]),33:(14,[105,330,500,625]),34:(15,[180,155,450,313]),35:(15,[205,470,430,661]),36:(16,[130,179,305,370]),38:(17,[160,170,480,431]),39:(18,[105,192,525,372]),49:(22,[230,154,405,336]),50:(23,[210,156,420,336])}}
ledger=[]
for edition,y in [('2026-early','08'),('2025-late','07')]:
 path=ROOT/f'data/questions/denki2/{edition}.json';d=json.loads(path.read_text());qs=d['questions']
 def q(n):return qs[n-1]
 if y=='08':
  q(3)['question']='図に示す回路において，抵抗30 Ωを流れる電流I₃の値〔 A 〕として，正しいものはどれか。\nただし，電池の内部抵抗は無視するものとする。'
  q(7)['question']='送電線の表皮効果に関する次の記述において，＿＿に当てはまる語句の組合せとして，適当なものはどれか。\n「導体に交流電流が流れるとき，導体の【ア】に近いほど電流が多く流れる。この現象は【イ】が高くなるほど大きくなる。」'
  q(7)['choices']=['ア：表面　イ：周波数','ア：表面　イ：電圧','ア：中心　イ：周波数','ア：中心　イ：電圧']
  q(9)['question']=q(9)['question'].split('\n')[0]
  q(9)['choices']=['光束 ― lm','光束発散度 ― lm/m²','照度 ― lx','輝度 ― cd']
  q(36)['question']=q(36)['question'].replace('\n  配線用図記号　　　　   名称','')
  q(36)['choices']=['図1（枠内ATT） ― 局線中継台','図2（枠内IDF） ― ハブ','図3（枠内TA） ― ターミナルアダプタ','図4（枠内に横線） ― 端子盤']
  q(56)['choices'][3]=q(56)['choices'][3].replace('mm2','mm²')
 else:
  q(1)['question']=q(1)['question'].replace('℃-1','℃⁻¹')
  q(2)['question']='図に示すように，真空中に点電荷Q₁及びQ₂がある。この二つの点電荷の間に働く静電力Fの大きさ〔 N 〕として，正しいものはどれか。\nただし，真空の誘電率をε₀とするとき，4πε₀＝1/(9×10⁹) F/mであるものとする。'
  q(3)['question']='図に示す単相交流回路において，抵抗Rの両端の電圧V_Rの値〔 V 〕として，正しいものはどれか。\nただし，電圧Eの実効値は100 V，抵抗Rは8 Ω，誘導性リアクタンスX_Lは6 Ωとする。'
  q(4)['question']=q(4)['question'].split('\n  100')[0]
  q(4)['choices']=[f'100 kV・A変圧器：{a} kV・A　300 kV・A変圧器：{b} kV・A' for a,b in [(25,175),(50,150),(75,125),(100,100)]]
  q(8)['question']='配電系統に関する用語として，次の計算式により求められるものはどれか。\n最大需要電力〔 kW 〕/設備容量〔 kW 〕×100〔 ％ 〕'
  q(15)['question']='図に示す三相3線式配電線路の送電端電圧V_s〔 V 〕と受電端電圧V_r〔 V 〕の間の電圧降下v〔 V 〕を表す簡略式として，正しいものはどれか。\nただし，各記号は，次のとおりとする。\nR：1線当たりの抵抗〔 Ω 〕　X：1線当たりのリアクタンス〔 Ω 〕\ncosθ：負荷の力率　I：線電流〔 A 〕'
  q(15)['choices']=['v＝(1/√3)I(Rsinθ＋Xcosθ)〔 V 〕','v＝(1/√3)I(Rcosθ＋Xsinθ)〔 V 〕','v＝√3I(Rsinθ＋Xcosθ)〔 V 〕','v＝√3I(Rcosθ＋Xsinθ)〔 V 〕']
  q(19)['choices']=['図1（左が兼用スリット、右が縦スリット、下に接地極）','図2（左が縦スリット、右が横スリット、下に接地極）','図3（左右が縦スリット、下に接地極）','図4（左が兼用スリット、右が横スリット、下に接地極）']
  q(33)['choices']=['図1（脚部ごとの底部を広げた基礎）','図2（斜面で深い縦穴に築造する基礎）','図3（支持層まで杭を到達させる基礎）','図4（左右の脚部を共通の底版で支える基礎）']
  q(36)['question']=q(36)['question'].replace('\n  図記号　　  名　称','')
  q(36)['choices']=['図1（円に左から1本・下へ3本の接続線） ― 4分配器','図2（三角形） ― 増幅器','図3（放物面アンテナの図記号） ― パラボラアンテナ','図4（二重円） ― 直列ユニット（75 Ω）']
 for n in [31,32,43,44,49,50,60] if y=='07' else []:
  # Column headings are expressed explicitly in the choice text below.
  pass
 pairs=({31:('ア','イ'),44:('ア','イ'),49:('ア','イ'),50:('ア','イ'),60:('ア','イ'),32:('建設作業','建設機械'),43:('機器','使用目的')} if y=='07' else {})
 for n,(a,b) in pairs.items():
  q(n)['question']=q(n)['question'].rsplit('\n',1)[0]
  q(n)['choices']=[f'{a}：{v[0]}　{b}：{v[1]}' for t in q(n)['choices'] if len(v:=re.split(r'\s{2,}|　+',t.strip(),maxsplit=1))==2]
 # Repair overprinted blank boxes into clearly identifiable insertion slots.
 for item in qs:
  item['question']=item['question'].replace('に当　て','に当て').replace('つの定　数','つの定数').replace('加　え','加え').replace('以　上','以上').replace('未　満','未満')
  if y=='08' and item['number']==4:
   item['question']=item['question'].replace('min-1','min⁻¹');item['choices']=[x.replace('min-1','min⁻¹') for x in item['choices']]
  if y=='08' and item['number']==39:item['choices']=[t.replace('イベント1','イベント①') for t in item['choices']]
  n=item['number'];item['category']=('電気工学等（必須）' if n<=4 else '電気工学等（選択）' if n<=10 else '電気設備（選択）' if n<=29 else '関連分野（選択）' if n<=35 else '施工管理法（必須）' if n==36 else '施工管理法・能力（必須）' if n<=40 else '施工管理法（選択）' if n<=50 else '法規（選択）')
  item['sourcePdfUrl']=d['questionUrl'];item['sourceAnswerUrl']=d['answerUrl']
  item['question']='\n'.join(re.sub(r'[ \t]+',' ',s).strip() for s in item['question'].splitlines() if s.strip())
  item['choices']=[re.sub(r'[ \t]+',' ',s).strip() for s in item['choices']]
  assert len(item['choices'])==(5 if 37<=n<=40 else 4),(edition,n,item['choices'])
 explanations=[l.split('|') for l in (ROOT/f'reports/sekou-2denki/explanations-{d["year"]}.txt').read_text().splitlines()]
 assert len(explanations)==62
 for item,row in zip(qs,explanations):
  n=int(row[0]);assert n==item['number'];assert len(row)==len(item['choices'])+2
  item['topic']=row[1];item['choiceExplanations']=row[2:]
  a=item['officialAnswerNumbers'][0]
  item['explanation']=f'正解は{a}（{"アイウエオ"[a-1]}）。'+row[a+1]
  if item['category']=='法規（選択）' or any(x in item['question'] for x in ['法」','法 」','規程','規格','技術基準']):
   item['explanation']+=' 本問は出題時点の法令・規程・規格に基づく。'
 pdf=Path('/tmp/srcpdf/sekou-2denki')/f'r{y}_2dg{"z" if y=="08" else ""}_mondai.pdf'
 assert hashlib.sha256(pdf.read_bytes()).hexdigest()==d['questionSha256']
 doc=fitz.open(pdf)
 for n,(page,rect) in FIGURES[edition].items():
  dest=ROOT/f'public/questions/denki2/{edition}/q{n}-official-figure.png';dest.parent.mkdir(parents=True,exist_ok=True)
  doc[page-1].get_pixmap(matrix=fitz.Matrix(2,2),clip=fitz.Rect(rect)).save(dest)
  q(n)['imageUrl']='/'+str(dest.relative_to(ROOT/'public'))
  ledger.append({'edition':edition,'number':n,'pdfPage':page,'rect':rect,'imageUrl':q(n)['imageUrl'],'sha256':hashlib.sha256(dest.read_bytes()).hexdigest()})
 path.write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n')
(ROOT/'reports/sekou-2denki/figures.json').write_text(json.dumps(ledger,ensure_ascii=False,indent=2)+'\n')
