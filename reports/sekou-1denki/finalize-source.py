"""Build unpublished data from extracted text and independently authored explanations.
Run from repository root. PDFs are read only from .cache/sekou-1denki, never downloaded here.
"""
import json, re, hashlib
from pathlib import Path
import fitz

BASE=Path('reports/sekou-1denki')
OUT=Path('data/questions/denki1'); OUT.mkdir(parents=True,exist_ok=True)

# Coordinates in the official PDF's point coordinate system; exclude prose and footers.
FIGURES={
 2026:{1:(2,[237,198,397,312]),2:(3,[225,158,410,315]),3:(3,[180,505,455,660]),
       4:(4,[222,135,413,281]),6:(5,[200,120,435,270]),7:(6,[207,140,428,335]),
       39:(18,[260,278,387,448]),53:(24,[102,195,300,407]),
       57:(28,[145,155,490,535]),58:(29,[145,125,500,281]),
       62:(31,[205,337,430,543]),73:(36,[99,121,530,431])},
 2025:{1:(2,[220,150,435,260]),2:(2,[198,482,435,615]),3:(3,[210,132,430,375]),
       4:(4,[220,132,420,233]),5:(4,[225,450,410,615]),6:(5,[205,145,410,310]),
       31:(13,[190,320,500,495]),51:(21,[100,120,535,755]),57:(27,[200,180,435,350])}}
ALTS={
 2026:{1:'面積A、厚さd、比誘電率εᵣの誘電体を挟んだ平行板コンデンサ。',
 2:'下向きの一様電界E=5 V/m。AからBへ移動し、水平距離80 cm、鉛直上向き60 cm。',
 3:'直列回路。電源100 V、R=3 Ω、XL=8 Ω、XC=4 Ω。',
 4:'内部抵抗2000 Ωの電圧計に4000 Ωと14000 Ωを直列接続。bで前者、cで両方を使用する。',
 6:'線間電圧200 Vの三相3線式電源へ各相XC=5 Ωのコンデンサを星形接続。',
 7:'タービン途中の蒸気を給水加熱器へ取り出す汽力発電の熱サイクル。',
 39:'増幅器から2分岐器の通過端子、4分配器を経由しテレビ端子Aへ接続する系統図。',
 53:'公式選択肢1～4の計器図記号と名称。1はvarhと無効電力計、2はWhと電力量計、3はcos φと力率計、4はφと位相計。',
 57:'作業人数を付したネットワーク工程表と、各作業を配置した山崩し図。数字と作業名は原図参照。',
 58:'イベント1～11の工程表。A4、B4、C9、D5、E10、F7、G7、H6、I4、J5、K8、L3日。5から6へダミー。',
 62:'収益線y=xと原価曲線、固定原価の切片ア、損失側イと利益側ウを示す利益図表。',
 73:'引込用2案、送出し用2案についてZCT、CB、ケーブルシールド接地線の経路を比較する公式図選択肢1～4。'},
 2025:{1:'電圧10 Vの電源へ2 μFと4 μFのコンデンサを並列接続。',
 2:'一次コイルにスイッチと電源、二次コイルに誘導起電力e₂を生じる環状鉄心。',
 3:'交流ブリッジ。左上20 Ω、右上R、左下40 Ωと20 mH、右下80 ΩとL。上下間に検流計。',
 4:'内部抵抗Raの電流計へ分流器Rsを並列接続。',
 5:'三相短絡試験の直線グラフ。界磁電流80 Aで電機子電流500 A。',
 6:'有効電力P一定で力率をcos θ₁からcos θ₂へ改善し、無効電力差Qを示すベクトル図。',
 31:'3回線スポットネットワーク受電図。高圧側ア、変圧器二次側イ、その下の母線直前ウの機器を問う。',
 51:'梁せい1000又は800 mmのRC梁に円形貫通孔を設けた公式図選択肢1～4。孔径・孔位置・間隔は原図参照。',
 57:'工程表。A4、B2、C3、D2、E5、F3、G1、H1日。2→3、3→4にダミー。'}}

def clean(s):
 # Preserve line boundaries: joining "dB/m" with the next "2 分岐器" would
 # silently turn the next item number into a square-metre unit.
 s=re.sub(r'[ \t\u3000]*\n[ \t\u3000]*','\n',s).strip()
 for a,b in [('L E D','LED'),('J I S','JIS'),('I V','IV'),('U P S','UPS'),('D S R','DSR'),('R P R','RPR'),('U F R','UFR'),('O V G R','OVGR'),('P F','PF'),('C B','CB'),('L A N','LAN'),('U T P','UTP'),('P o E','PoE'),('S P D','SPD'),('I P','IP'),('k v a r','kvar'),('d B','dB'),('c m','cm'),('l x','lx'),('l m','lm'),('m2','m²'),('m3','m³')]:s=s.replace(a,b)
 return s

def repair(y,qs):
 q={v['number']:v for v in qs}
 if y==2026:
  q[1]['question']='図に示す電極板の面積がA＝0.4 m²の平行板コンデンサに，比誘電率εᵣ＝4の誘電体があるとき，このコンデンサの静電容量の値〔F〕として，正しいものはどれか。ただし，誘電体の厚さd＝2 mm，真空の誘電率はε₀〔F/m〕とし，コンデンサの端効果は無視するものとする。'
  q[1]['choices']=['3.2ε₀〔F〕','20ε₀〔F〕','800ε₀〔F〕','5000ε₀〔F〕']
  q[4]['question']='内部抵抗rᵥ，最大目盛が1 Vの電圧計に，直列抵抗器Rₘ₁，Rₘ₂を図のように接続して測定範囲を拡大した。b及びcの端子で測定した場合のそれぞれの電圧計の最大指示値Vb及びVcの値〔V〕の組合せとして，適当なものはどれか。（各選択肢はVb／Vcの順）'
  q[6]['question']='図に示す低圧コンデンサがある。この回路において，電圧V＝200 V，容量性リアクタンスXC＝5 Ωのときの回路の全無効電力の値〔kvar〕として，正しいものはどれか。'
  q[18]['question']='架空送電線における支持点間の電線のたるみの近似値D〔m〕及び電線の実長の近似値L〔m〕を求める式の組合せとして，適当なものはどれか。ただし，各記号は次のとおりとし，電線支持点の高低差はないものとする。S：径間〔m〕，T：電線の最低点の水平張力〔N〕，W：電線の単位長さ当たりの重量〔N/m〕。（各選択肢はたるみD／実長Lの順）'
  q[18]['choices']=['D=WS²/(3T)，L=S+3D²/(8S)','D=WS²/(8T)，L=S+8D²/(3S)','D=WS²/(3T)，L=S+8D²/(3S)','D=WS²/(8T)，L=S+3D²/(8S)']
  q[47]['question']='盛土工事を行うために地山を掘削した時の，ほぐした土量が840 m³であった。この土量を用いて造成できる盛土の量〔m³〕として，正しいものはどれか。ただし，ほぐした土量の変化率L，及び締め固めた土量の変化率Cは次のとおりとする。L＝ほぐした土量／地山の土量＝1.2，C＝締め固めた土量／地山の土量＝0.9。'
  q[53]['choices']=['図1：varh／無効電力計','図2：Wh／電力量計','図3：cos φ／力率計','図4：φ／位相計']
  q[73]['choices']=['図1：引込用ケーブル（左上）','図2：引込用ケーブル（右上）','図3：送出し用ケーブル（左下）','図4：送出し用ケーブル（右下）']
 else:
  q[1]['question']='図に示す回路において，電圧V＝10 Vを加えたとき，静電容量C₁＝2 μF，C₂＝4 μFのコンデンサに蓄えられる合計のエネルギーWの値〔J〕として，正しいものはどれか。'
  q[1]['choices']=['3×10⁻⁵ J','6×10⁻⁵ J','3×10⁻⁴ J','6×10⁻⁴ J']
  q[2]['question']='図に示すスイッチSを投入したとき，環状鉄心の一次コイルの電流i₁〔A〕が0.1 msの間に0.4 A変化し，二次コイルに誘導起電力e₂〔V〕が2 V発生した。このときの相互インダクタンスMの値〔mH〕として，正しいものはどれか。ただし，漏れ磁束はないものとする。'
  q[6]['question']='図に示すように有効電力Pが1200 kW，力率cos θ₁が0.6の三相負荷がある。この負荷に並列に進相コンデンサを接続したところ，力率cos θ₂は0.8に改善された。このときの進相コンデンサの容量Qの値〔kvar〕として，正しいものはどれか。'
  q[12]['choices'][0]=q[12]['choices'][0].removesuffix('1')
  q[12]['choices'][1]='Y−△始動法の始動時には，全電圧始動時の1/3の電流が流れる。'
  q[12]['choices'][2]='Y−△始動法の始動時には，各相の固定子巻線に定格電圧の1/3の電圧が加わる。'
  q[14]['question']='水力発電に用いる水車に関する次の記述のうち，空欄に当てはまる語句の組合せとして，適当なものはどれか。「ぺルトン水車の［ア］内には，負荷に応じて使用流量を調整するための［イ］が設けられる。」（各選択肢はア／イの順）'
  q[51]['choices']=['図1（最上段）','図2（上から2段目）','図3（上から3段目）','図4（最下段）']
  q[57]['question']=q[57]['question'].replace('ただし，内','ただし，○内')
  q[70]['question']='架線工事における緊線弛度dの測定方法に関する次の記述に該当する用語として，適当なものはどれか。「支持点A及びBから垂直に下ろした線上で，弛度dに等しい点A₀及びB₀を定め，A₀及びB₀点の見通し線上に電線の接線を観測する弛度観測法」'

def official_answers(page):
 # Answer table cells contain single numeric spans, aligned by column and row.
 cells=[]
 for b in page.get_text('dict')['blocks']:
  for line in b.get('lines',[]):
   for s in line['spans']:
    if re.fullmatch(r'\d{1,2}',s['text'].strip()):
     x0,y0,x1,y1=s['bbox'];cells.append((float((x0+x1)/2),float((y0+y1)/2),int(s['text'])))
 result={}
 # Number cells are paired with a value exactly one row below (roughly 22 points).
 for x,y,n in cells:
  candidates=[(yy-y,a) for xx,yy,a in cells if abs(xx-x)<2 and 15<yy-y<27 and 1<=a<=5]
  if candidates:result[n]=min(candidates)[1]
 # Rows of answers can themselves look like number rows. The genuine number grid
 # is identified by its wider 1..89 sequence and the first occurrence wins.
 result={}
 for x,y,n in sorted(cells,key=lambda c:c[1]):
  candidates=[(yy-y,a) for xx,yy,a in cells if abs(xx-x)<2 and 15<yy-y<27 and 1<=a<=5]
  if candidates and n not in result:result[n]=min(candidates)[1]
 return result

audit=[]
for year in [2026,2025]:
 source=json.loads((BASE/f'draft-{year}.json').read_text(encoding='utf-8-sig'))
 pdf=Path(f'.cache/sekou-1denki/r{year-2018:02}_1dg_mondai.pdf');doc=fitz.open(pdf)
 assert hashlib.sha256(pdf.read_bytes()).hexdigest()==source['questionSha256']
 answers=official_answers(doc[-1]);assert len(answers)==89,(year,len(answers),answers)
 explanations={}
 for line in (BASE/f'explanations-{year}.txt').read_text(encoding='utf8').splitlines():
  if line.strip():
   n,topic,*reasons=line.split('|');explanations[int(n)]=(topic,reasons)
 assert set(explanations)==set(range(1,90))
 for q in source['questions']:
  q['question']=clean(q['question']);q['choices']=[clean(c) for c in q['choices']]
 repair(year,source['questions'])
 for q in source['questions']:
  n=q['number']; topic,reasons=explanations[n]
  assert answers[n]==q['officialAnswerNumbers'][0],(year,n,answers[n],q['officialAnswerNumbers'])
  assert len(q['choices'])==len(reasons)==(5 if 55<=n<=60 else 4),(year,n)
  assert all(c and r for c,r in zip(q['choices'],reasons))
  category=('電気工学等（必須）' if n<=6 else '電気工学等（選択）' if n<=12 else '電気設備（選択）' if n<=44 else '関連分野（選択）' if n<=52 else '施工管理法（必須）' if n<=54 else '施工管理法・応用能力（必須）' if n<=60 else '施工管理法（必須）' if n<=67 else '施工管理法（選択）' if n<=76 else '法規（選択）')
  q.update(category=category,topic=topic,choiceExplanations=reasons,
    explanation=f'公式正答は{answers[n]}。{reasons[answers[n]-1]}',
    isCalculation=n<=6 or (year==2026 and n in [18,25,39,47,57,58]) or (year==2025 and n in [34,57,58]))
  q['officialReferenceUrls']={
    (2025,27):['https://dl.mitsubishielectric.co.jp/dl/fa/document/catalog/pmd/ym-c-y-0692/y0692d1503.pdf'],
    (2025,66):['https://jsite.mhlw.go.jp/gifu-roudoukyoku/content/contents/002184633.pdf'],
    (2025,81):['https://www.safety-kinki.meti.go.jp/electric/jikayou/jikayoudennkikousakubutu.html'],
    (2025,82):['https://www.pref.ehime.jp/uploaded/attachment/39902.pdf'],
    (2026,80):['https://www.safety-kinki.meti.go.jp/electric/accident/jiko-houkoku.html'],
  }.get((year,n),[])
  if n in FIGURES[year]:
   page,box=FIGURES[year][n]; assert page==q['pdfPage']
   dest=Path(f'public/questions/denki1/{year}/q{n}-official-figure.png');dest.parent.mkdir(parents=True,exist_ok=True)
   doc[page-1].get_pixmap(matrix=fitz.Matrix(2,2),clip=fitz.Rect(box)).save(dest)
   q.update(imageUrl='/'+str(dest.relative_to('public')).replace('\\','/'),figureDescription=ALTS[year][n])
  audit.append(dict(year=year,number=n,pdfPage=q['pdfPage'],officialAnswerNumber=answers[n],answerPdfPage=len(doc),choiceCount=len(reasons),figureCrop=FIGURES[year].get(n)))
 source.update(examDate='2026-07-12' if year==2026 else '2025-07-13',
   transcriptionNote='ルビ・改行・空白を整理。数式の添字・分数を文字化。図選択肢には位置と文字説明を付加。原図は必要部分のみ切出し。',
   lawNote='法令・規程に関する設問と解説は当該試験の出題時点に基づく。現在の実務への適用は現行規定を確認。')
 (OUT/f'{year}-annual.json').write_text(json.dumps(source,ensure_ascii=False,indent=2)+'\n',encoding='utf8',newline='\n')
(BASE/'source-check.json').write_text(json.dumps(dict(sourceBranch='origin/ops/source-pdfs-20261104',verifiedQuestions=178,officialAnswerMatches=178,method='PDF末尾の正答表のセル位置による全問照合。本文は非ルビ文字列と比較し数式・図を目視補正。',records=audit),ensure_ascii=False,indent=2)+'\n',encoding='utf8',newline='\n')
print('Built 178 questions; official answer cell matches 178/178.')
