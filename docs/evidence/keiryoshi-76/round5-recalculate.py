"""Source-condition recomputation for round 5; not a semantic proof of explanations.
Run from repo root. No runtime/application code is changed by this evidence script.
"""
import math,json,csv,hashlib
from fractions import Fraction as F
from pathlib import Path
E=Path('docs/evidence/keiryoshi-76')
qs={(q['subject'],q['qNumber']):q for p in Path('data/questions/keiryoshi').glob('2025-*.json') for q in json.loads(p.read_text())}
rows=[]
def check(s,n,derivation,value,choices):
    # Values are calculated first from source conditions. Compare to all five
    # offered quantities only afterwards, then check the official key.
    idx=min(range(5),key=lambda i:abs(value-choices[i]))
    q=qs[s,n];assert str(idx+1)==q['officialAnswerNumber'],(s,n,value,idx)
    rows.append(dict(subject=s,qNumber=n,derivation=derivation,value=float(value),offeredValues=choices,nearestChoice=idx+1,officialAnswer=q['officialAnswerNumber']))
check('一基',2,'|A∪B|最小=max(143,170)、200−170',200-max(143,170),[0,27,30,57,113])
check('一基',3,'a³+b³ mod6 = (4³+3³) mod6',(4**3+3**3)%6,[1,2,3,4,5])
check('一基',4,'log(5/14)=1−2log2−log7、最初の桁ceil(44.7)',math.ceil(-100*(1-2*.301-.845)),[45,46,47,48,49])
check('一基',8,'f′よりa=3,b=2、積分a/3−b/2+c=4からc=4',3+2+(4-3/3+2/2),[4,6,8,9,10])
check('一基',11,'Aを選びBを除く場合は残り4人から2人、全体6人から3人',math.comb(4,2)/math.comb(6,3),[.4,1/3,.3,.25,.2])
check('一基',12,'2枚の表枚数分布P(0,1,2)=(1,2,1)/4',sum(k*math.comb(2,k)/4 for k in range(3)),[1.25,1,.75,.5,.25])
check('一基',19,'同数からの比2^(−t/2+t/30)=1/2を解く',1/(F(1,2)-F(1,30)),[1,2,3,4,5])
check('一基',21,'最大波長hc/仕事関数をnmへ',6.6e-34*3e8/(5.1*1.6e-19)*1e9,[24,120,240,480,960])
check('一基',24,'ρQ、時間h→s',800*90/3600,[20,410,1200,32000,72000])
check('環物',8,'斜面角Bの余弦=(AB²+BC²−AC²)/(2AB·BC)、N=mgcosB',10*(13**2+15**2-7**2)/(2*13*15),[7*math.sqrt(3)/13,13*math.sqrt(3)/15,13/3,115/13,26/3])
check('環物',9,'逆向き力5 kg×(10+1·2)m/s÷3s',5*(10+1*2)/3,[5,10,15,20,25])
check('環物',11,'実線x=1山→破線x=4山、6秒で3m、λ=4m',4/(3/6),[2,4,6,8,10])
tau=(-900+math.sqrt(900**2+4*(340**2-15**2)*2500))/(2*(340**2-15**2))
sy=30-15*tau; dist=math.hypot(40,sy); nx=40/dist;ny=-sy/dist
assert abs(dist-340*tau)<1e-10
freq=100*(340-20*nx)/(340-15*ny)
# Independent finite-difference check: vary reception time and solve retarded
# emission times. Observed f = f_source * dt_emission/dt_reception.
def emission_time(t):
    lo=t-1;hi=t
    for _ in range(70):
        mid=(lo+hi)/2
        residual=340*(t-mid)-math.hypot(-40+20*t, -30+15*mid)
        if residual>0:lo=mid
        else:hi=mid
    return (lo+hi)/2
fd=100*(emission_time(4.00001)-emission_time(3.99999))/.00002
assert abs(freq-fd)<1e-6
check('環物',13,'340τ=√[40²+(30−15τ)²]を解き、放射→受信方向へ両速度を射影。別法dt放射/dt受信とも一致',freq,[87,90,93,100,103])
check('環物',14,'赤660nm·1m/0.2mm=3.3mm、青2.2mm、共通周期6.6mm、±10mm内',2*math.floor(10/6.6)+1,[1,2,3,4,5])
check('環物',18,'pV^(5/3)一定、理想気体よりT2/T1=(p2/p1)^(2/5)、K→℃',400*(100/3200)**F(2,5)-273,[-173,-73,-23,27,127])
check('環物',19,'放熱0.9·300·0.5(100−T)=500·4.2(T−20)',(0.9*300*.5*100+500*4.2*20)/(0.9*300*.5+500*4.2),[25,30,35,40,45])
# R2 arrow is right to left; define U=Vright−Vleft.
u=(F(1,1)+F(4,3))/(F(1,1)+F(1,2)+F(1,3))
assert (u-1)+u/2+(u-4)/3==0
check('環物',23,'右−左=U、3枝KCL (U−1)/1+U/2+(U−4)/3=0、矢印電流U/2',u/2,[-10/11,-3/11,3/5,7/11,12/13])
check('環化',6,'2^(−t/12)=0.1、指定log2=0.30',12/.30,[20,30,40,50,60])
check('環化',7,'Cu2+1molあたり2molのH+を放出、NaOH0.1×0.008mol',.1*.008/(2*.020),[.01,.02,.04,.06,.08])
check('環化',9,'CaF2生成を逆転+1228、昇華178、解離159、電離590+1145、電子付加2×−328',1228+178+159+590+1145-2*328,[188,516,1500,2644,2972])
check('環化',15,'電気量0.10×600C、Ni2+は2電子、質量=(Q/2F)·58.7',(.10*10*60)/(2*9.65e4)*58.7,[.018,.027,.036,.054,.091])
check('環化',17,'[H+]=Kw/[OH−]、指定log2=0.30から11.70',-math.log10(1e-14/.005),[10.7,11.2,11.7,12.3,12.8])
check('環化',19,'炭素骨格直鎖:1/2ブタノール、分岐:2メチル1/2プロパノール。2ブタノールのみ不斉',4-1,[1,2,3,4,5])
water=[6*4/2,3*6/2,2*6/2,3*2/2];assert water==[12,9,6,3];assert qs['環化',21]['officialAnswerNumber']=='1'
check('環化',22,'式量122.4=0.9·16+n·18でn=6、水60mol÷6×0.9',1080/18/((122.4-.9*16)/18)*.9,[.9,1,9,10,54])
check('環濃',2,'NH3必要量0.60×17g、質量分率0.28と密度0.90で体積へ',.6*17/.28/.90,[.41,36,41,24,.36])
check('環濃',12,'C=100×1/100、矩形公差を√3=1.73で割り独立合成',100/100*math.hypot(.01/1.73,.01/(100*1.73)),[.020,.017,.010,.0083,.0058])
check('環濃',18,'NaCl0.351/58.5mol、AgNO3全量は滴定100mLの10倍、式量170',1.17*.3/58.5*10*170/10.5*100,[100,99,98,97,96])
check('環音',5,'点源距離2倍で二乗音圧1/4、線源1/2、無相関和',73+10*math.log10(.25+.5),[68,70,72,74,76])
levels=[85,88,79,73,72,60]; corrections=[-16.1,-8.6,-3.2,0,1.2,1.0]
check('環音',7,'表6帯域をA補正した二乗音圧の総和',10*math.log10(sum(10**((a+b)/10) for a,b in zip(levels,corrections))),[67,72,77,82,87])
check('環音',8,'W=1mW→LW=90dB、室定数Sα/(1−α)、Lp=LW+10log(4/R)',90+10*math.log10(4/(100*.05/(1-.05))),[83,85,87,89,91])
check('環音',10,'80dB→p=20μPa·10^4、出力2mVをPaで割り20log',20*math.log10(.002/(20e-6*10**(80/20))),[-20,-34,-40,-74,-92])
check('環音',17,'追加40kgで1mm: k=40g/0.001、ω²=k/(M+40)',40*9.8/.001/(2*math.pi*7)**2-40,[163,250,326,996,9960])
check('環音',21,'伝達率1/|1−r²|=1/2、r²=3、m=3k/ω²',3*1.3e6/(2*math.pi*100)**2,[4.2,10,26,420,1000])
check('環音',22,'A距離4→16m・C距離4→8m、Bの二乗音圧比A0.9/C0.1',80+10*math.log10(.9*(4/16)+.1*(4/8)),[72,75,78,80,82])
check('環音',23,'加速度実効値0.02、基準1e−5、16Hz鉛直補正−6dB',20*math.log10(.02/1e-5)-6,[60,63,66,69,72])
check('計質',2,'独立成分の分散和→平方根',math.sqrt(sum(v**2 for v in [1.1,1.6,5.7,10,21])),[7.9,24,39,48,580])
check('計質',5,'本尺12mm、矢印に一致する副尺13区間×0.05mm',12+13*.05,[10.65,12.65,30.65,38,38.65])
check('計質',7,'同じ液面差p=ρgh、比ではg,h相殺',13/1,[2,6.5,9.8,13,26])
check('計質',10,'一次遅れ振幅比1.41/2=1/√(1+(10τ)²)',math.sqrt((2/1.41)**2-1)/10,[.01,.1,1,10,100])
check('計質',14,'I=V/Rの感度係数1/R,−V/R²で各標準不確かさ0.0001を合成、mAへ',math.hypot(.0001,.0001)*1000,[.01,.1,.14,.2,1000])
check('計質',16,'A校正後Bへ、表示=50·gB/gA',50*9.794/9.804,[50.10,50.05,50,49.95,49.90])
# Additional numerical/symbolic checks, outside nearest-scalar-choice format.
additional=[]
def extra(s,n,derivation,value):
    additional.append(dict(subject=s,qNumber=n,derivation=derivation,result=value,officialAnswer=qs[s,n]['officialAnswerNumber']))
extra('環化',21,'各分子のH原子数/2×物質量、水はア12>イ9>ウ6>エ3',water)
extra('一基',9,'第1列(1,−1)、第2列=(−3,4)+(1,−1)=(−2,3)。2入力を各5候補へ代入',[[1,-2],[-1,3]])
for k,v in qs['一基',9]['choices'].items():
    m=json.loads(v.replace('−','-'))
    satisfied=[m[0][0],m[1][0]]==[1,-1] and [-m[0][0]+m[0][1],-m[1][0]+m[1][1]]==[-3,4]
    assert satisfied==(k=='オ')
extra('一基',16,'V=1,C=1で節点電位0,1/3,2/3、容量1/3倍の電荷ではなくQ2=3×2/3',dict(Q1=1/3,Q2=2))
extra('計質',15,'横10区間に3周期、周期=10·0.010/3秒、山谷8区間×1V',dict(frequencyHz=3/(10*.010),peakToPeakV=8))
extra('管理',16,'各因子の最大値と現行第2水準を図から独立転記',dict(optimum='A1B2C3D1E2F1G3H2',gain=sum(max(v)-v[1] for v in [[11,9],[10,12,8],[9,10,11],[12,9,9],[8,13,9],[11,9,10],[8,10,12],[10,11,9]])))
assert additional[-1]['result']['gain']==10
extra('管理',19,'(~5&15)+1=11、7+11=18、18&15=2',dict(complement=format((~5&15)+1,'04b'),seven=format(7,'04b'),result=format((7+11)&15,'04b')))
extra('計質',21,'独立3測定、係数1,−1/2,−1/2からσ/σx=√(1+1/4+1/4)',math.sqrt(1+.25+.25))
extra('計質',24,'基準タンク器差=表示−真値、真値20.10−(−0.10)=20.20、メーター器差0%',dict(trueL=20.10-(-.10),errorPercent=(20.20-(20.10-(-.10)))/(20.10-(-.10))*100))
# Re-encode hand-reviewed visual traces with provenance and current content hashes.
figures=json.loads((E/'figure-crops.json').read_text()); bykey={(f['subject'],f['qNumber']):f for f in figures}
traces=list(csv.DictReader((E/'round5-figure-traces.tsv').open(),delimiter='\t'))
assert len(traces)==len(bykey)==len(figures)==73
seen=set()
for r in traces:
    r['qNumber']=int(r['qNumber']); key=r['subject'],r['qNumber'];seen.add(key);q=qs[key];f=bykey[key]
    r.update(pdf=f['sourcePdfUrl'].split('/')[-1],pdfPage=f['pdfPage'],sourceSha256=f['sourceSha256'],image=f['image'],imageSha256=f['imageSha256'],officialAnswer=q['officialAnswerNumber'],reviewedChoiceKeys=list(q['choiceExplanations']),explanationsSha256=hashlib.sha256(json.dumps([q['explanation'],q['choiceExplanations']],ensure_ascii=False,sort_keys=True).encode()).hexdigest())
assert seen==set(bykey)
# Explicit nets transcribed from official page 19. Each physical terminal
# belongs to exactly one net; geometric crossings without dots are not joins.
wiring={}
for diagram in range(1,6):
    nets=[]
    for port in ['E','M']:
        series=(diagram==2 and port=='E') or (diagram==3 and port=='M') or diagram==4
        if diagram==5:
            groups=[['amp.'+port+'+','cell1.'+port+'+'],['amp.'+port+'−','cell2.'+port+'+'],['cell1.'+port+'−','cell2.'+port+'−']]
        elif series:
            groups=[['amp.'+port+'+','cell1.'+port+'+'],['cell1.'+port+'−','cell2.'+port+'+'],['amp.'+port+'−','cell2.'+port+'−']]
        else:
            groups=[['amp.'+port+sign,'cell1.'+port+sign,'cell2.'+port+sign] for sign in ['+','−']]
        nets.extend(groups)
    terminals=[t for net in nets for t in net]
    assert len(terminals)==len(set(terminals))==12
    assert all(len({t.split('.')[1][0] for t in net})==1 for net in nets)
    wiring['figure'+str(diagram)]=nets
result=dict(scope='73画像73問の全体解説73件・全365肢。図は線/端子/方向/寸法、構造式は結合順と立体配置、表は全行全列を目視追跡。数値は上の式で独立計算。著者による再点検であり第三者レビューではない。',counts=dict(images=73,questions=73,choiceExplanations=365,numericalNearestChoiceChecks=len(rows),additionalChecks=len(additional)),doppler=dict(travelTime=tau,emissionY=sy,direction=[nx,ny],observedHz=freq,finiteDifferenceHz=fd),calculations=rows,additionalCalculations=additional,loadCellTerminalNets=wiring,figureReviews=traces,otherSymbolicReviews=json.loads((E/'round5-symbolic-checks.json').read_text()))
(E/'round5-recalculation-and-traces.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n')
print(json.dumps(result['counts']))
