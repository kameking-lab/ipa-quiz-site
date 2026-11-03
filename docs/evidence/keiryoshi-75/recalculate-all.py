"""Independent models/arithmetic from the rendered round-75 conditions.

Uses stdlib. Does not derive numerical results from the explanations. Numeric
choices below were read from the official pages. Symbolic cases use equations,
limits, dimensions or independent numerical examples. This is author checking,
not an independent reviewer PASS.
"""
import hashlib,json,math
from fractions import Fraction as F
from pathlib import Path
E=Path('docs/evidence/keiryoshi-75')
answers=json.loads((E/'official-answers.json').read_text())['answers'];r=[]
def check(s,n,result,expected,detail,choice=None):
 assert result==expected,(s,n,result,expected)
 if choice is not None:assert int(answers[s][str(n)])==choice,(s,n,choice)
 r.append(dict(subject=s,qNumber=n,officialAnswer=answers[s][str(n)],result=str(result),check=detail,status='passed'))
def nearest(s,n,value,options,detail):
 i=min(range(5),key=lambda i:abs(value-options[i]))
 check(s,n,options[i],options[int(answers[s][str(n)])-1],detail+f' 計算値={value:.12g}',i+1)
check('環化',6,6.626e-34*3e8/(1.602e-19*500e-9)>0,True,'E(eV)=hc/(eλ)。EeをJとする次元照合、λを2倍にするとEが半分。',3)
nearest('環化',7,1.2*1000*.60/20,[15,18,30,36,60],'溶液1Lの質量からHFの質量、物質量を順に算出。')
check('環化',8,1e-11/(10**(-2))**2==1e-7,True,'pH12、pOH2。Ksp=[Mg²⁺][OH⁻]²から残留濃度1e−7。',2)
nearest('環化',15,3.17*(180/18)/((180/18)+(17.1/342)),[2.29,2.61,2.89,3.03,3.15],'ラウール則と溶媒のモル分率。')
check('環化',18,(12*F(1,6)+2*F(1,2)+3)/3,F(2),'原図の正六角柱6原子の1/3という指定を適用。',1)
nearest('環化',19,1.6/44*22400,[350,630,700,810,1600],'固体1cm³を基準に体積比を算出。')
check('環化',20,round(28.8/(.8*28+.2*32)*8300*300/10),249000,'体積分率=モル分率、平均モル質量28.8、nRT/V。',5)
for ma,mb in [(1,1),(2,1),(1,3)]:
 va=2*mb/(ma+mb);vb=(mb-ma)/(ma+mb)
 assert abs(.5*ma*va**2+.5*mb*vb**2-.5*mb)<1e-12
check('環物',6,4*F(2)*F(1)/(F(2)+1)**2,F(8,9),'運動量・反発係数から両物体の速度を求め弾性時エネルギー保存を検算。等質量だけ全移行。e=0の残存全エネルギー比Mb/(Ma+Mb)。',2)
nearest('環物',7,10/math.sqrt(20/9.8),[1.4,4.9,7,9.8,14],'水平着地は最高点。鉛直運動から飛行時間、水平距離から速さ。')
check('環物',8,2*(1-F(2,3)),F(2,3),'N=mgcosθ−mv²/r=0とエネルギー保存を代入。',4)
nearest('環物',9,-6.67e-11*3e6/(10**2*9.8),[-2e-7,-4e-7,-2e-6,-4e-6,-2e-5],'上方への引力は下向き重力を減らす。t→kgを換算。')
check('環物',10,(F(3)*2/(2+3)+F(2)*2/(2+3),F(2)*F(3)*2/(2+3)-F(3)*F(2)*2/(2+3)),(F(2),F(0)),'a=2,b=3,mg=2で張力和とモーメント差を検算。腕は反対側。',1)
nearest('環物',11,340*(1-F(8,9))/(1+F(8,9))*3.6,[30,45,72,105,120],'移動する観測者の通過前後周波数比から速度を解く。')
check('環物',12,[b/a for a in [F(1,4),F(1,2)] for b in [F(3,4),F(1)]],[F(3),F(4),F(3,2),F(2)],'A基本振動とB第2共鳴の全開閉組合せを列挙。比4はA片閉・B両開。λB=l。',2)
check('環物',13,(F(8,2)*F(2,4)),F(2),'a=8π,b=4πとすればT=1/4,λ=1/2,v=2。位相の2π増分から定義照合。',1)
check('環物',15,math.asin(1/1.5)<math.pi/4,True,'臨界角41.81°より斜面入射角45°が大きい。反射方向は鉛直下。',1)
check('環物',16,F(1,1000)*F(1,2),F(1,2000),'溝間隔1/Nと一次の光路差d sinθ。N=1000,sinθ=1/2で検算。',4)
check('環物',17,2*(F(2*10+3*20,5)-10),3*(20-F(2*10+3*20,5)),'熱容量2,3・温度10,20で温度16、両熱量12。',1)
nearest('環物',18,.5*.020*500**2,[500,600,1000,2500,5000],'質量20gをkgに換算し運動エネルギーを算出。')
check('環物',19,round(2*6.21e-21/(3*1.38e-23)),300,'単原子1粒子の並進エネルギー3kT/2。3He・4Heで同温度。',4)
ratios=[]
for c1,c2 in [(1,2),(1,3),(3,7)]:
 v=5;initial=(c1+c2)*v*v/2;middle=(c2-c1)*v
 # Final outer nodes shorted; middle-node net charge is conserved.
 vm=middle/(c1+c2);final=(c1+c2)*vm*vm/2
 ratio=(initial-final)/initial
 assert abs(ratio-4*c1*c2/(c1+c2)**2)<1e-12 and 0<ratio<1
 ratios.append(ratio)
check('環物',20,len(set(ratios)),3,'原図の＋の向きは直列加算。中間節点の電荷保存から終状態エネルギーを求め、初期との差を抵抗消費として独立計算。容量比依存、RとVには非依存。',3)
check('環物',21,(F(1,1)**-2-4*F(2)**-2,1+F(4,2)),(F(0),F(3)),'x=1で電場相殺、電位は同符号の和。外側には相殺点なし。',2)
# Solve KCL directly for each proposed X (no series/parallel reduction).
def solve(a,b):
 a=[list(map(float,row))+[float(y)] for row,y in zip(a,b)];n=len(b)
 for i in range(n):
  d=a[i][i];a[i]=[v/d for v in a[i]]
  for j in range(n):
   if i!=j:
    d=a[j][i];a[j]=[x-d*y for x,y in zip(a[j],a[i])]
 return [row[-1] for row in a]
outs=[]
for x in [1,4,8,12,16]:
 a=[[1/x+1/8+1/6,-1/6,0,0],[-1/6,1/6+1/6+1/2,-1/2,0],[0,-1/2,1/2+1/2+1,-1],[0,0,-1,2]]
 outs.append(solve(a,[3/x,0,0,0])[-1])
check('環物',22,min(range(5),key=lambda i:abs(outs[i]-.025))+1,5,'原図の全4節点KCLをガウス消去。各候補XのVout='+str(outs),5)
check('環物',23,3*((7+2)-7),6,'正の電荷を高電位へ準静的に運ぶ例で外力仕事QΔV>0を検算。',4)
nearest('環物',25,1e-7*(3e8)**2/(90e6*4),[10,13,25,50,100],'失われた質量kg、水の熱容量gで単位を統一。')
check('環濃',2,F(184)-F(92,46)*62,F(60),'NO2からのNO3換算量124mg/Lを総量から差し引く。',2)
check('環濃',5,F(1,2)*F(3,5),F(3,10),'同一光路でA=εcl、cを半分にするとA半分。',4)
check('環濃',7,F(100,2)/F(100,1),F(1,2),'m/zはz=2で半分。2倍とする肢5が誤り。',5)
check('環濃',12,F(20*40,200+20*40),F(4,5),'分配比は有機相/水相。水相残留分と有機相抽出分の物質収支。',2)
nearest('環濃',18,4.76+math.log10((.1*.02)/(.2*.01)),[4.3,4.5,4.8,5.1,5.3],'酸と塩の物質量は各2mmol、混合後の比は1。')
# Numerical integration of a sine over one period checks RMS and rectified mean.
v=[math.sin(2*math.pi*(i+.5)/100000) for i in range(100000)]
rms=math.sqrt(sum(x*x for x in v)/len(v));rect=sum(abs(x) for x in v)/len(v)
check('環音',2,abs(rms/rect-math.pi/(2*math.sqrt(2)))<1e-8,True,'波形率=実効値/整流平均値を100000点で数値積分。波高率は別定義。',2)
check('環音',4,round(10*math.log10(2)),3,'パワー2倍は約3dB。6dBではない。',2)
check('環音',5,abs(10*math.log10(10**7-10**6)-69.542425)<1e-6,True,'全70dB・背景60dBの例でエネルギー差を確認。',1)
check('環音',6,20*math.log10(10),20.0,'音圧比10のレベル差20dB。10logではない。',1)
nearest('環音',8,90-63+10*math.log10(10/5),[21,24,27,30,33],'透過側エネルギー収支。面積比の向きS/Aを検算。')
nearest('環音',9,72-.5-1.5+10*math.log10(10),[78,80,82,84,86],'二補正は減算、面積項は加算。')
nearest('環音',10,20*math.log10((1/10**(-20/20))/(20e-6)),[74,94,114,120,134],'基準1V/Paの感度からPa、基準20μPaでレベルへ換算。')
check('環音',16,abs(math.sqrt(sum(((math.sin(2*math.pi*(i+.5)/10000)-math.cos(2*math.pi*(i+.5)/10000))/3)**2 for i in range(10000))/10000)-F(1,3))<1e-12,True,'A=1,ω=3の速度実効値を1周期数値積分しA/ωを確認。',5)
check('環音',17,(.4/(2*1))>(.2/(2*1)),True,'m=1,k=100でcのみを0.2→0.4にすると包絡減衰率c/(2m)が増す。減衰固有振動数の変化は微小。',4)
nearest('環音',18,20*(2*math.pi*(80/2))**2,[3.2e4,1.3e4,3.2e6,1.3e6,3.2e7],'T=1/|1−r²|=1/3の物理的解r=2、fn=40Hz。')
nearest('環音',19,10*math.log10(10**7-10**6+10**6.5),[65,68,71,74,77],'機械単体のエネルギーを分離して新しい背景と再合成。')
nearest('環音',20,80-10*math.log10(2)-(80-45-10)/9,[65,68,71,74,77],'表面波は振幅r^−1/2。10R0での差からAR0を決定。')
weighted=[20*math.log10(2*math.pi*2*.0002/1e-5)-3,20*math.log10(2*math.pi*4*.0004/1e-5),20*math.log10(2*math.pi*8*.0001/1e-5),20*math.log10(.014/1e-5)-6,20*math.log10(.02/1e-5)-12]
check('環音',21,min(range(5),key=lambda i:abs(weighted[i]-60))+1,2,'速度→加速度、cm→m、鉛直感覚補正を各肢に適用。概算レベル='+str(weighted),2)
freq={32:1,34:1,36:1,37:1,38:3,39:3,40:8,41:6,42:3,43:8,44:6,45:9,46:6,47:6,48:6,49:12,50:5,51:3,52:5,53:2,54:2,55:1,56:1,58:1}
values=sorted([x for x,n in freq.items() for _ in range(n)],reverse=True);assert len(values)==100
nearest('環音',22,values[9],[45,49,52,53,58],'ヒストグラム全100度数を展開して超過側10番目を取得。')
check('環音',23,(.1*9.8,90/(360*100),450/(360*500)),(.9800000000000001,.0025,.0025),'DC感度の出力と位相からの遅れ時間を別々に計算。',3)
xs=[1,2,3,4,5];ys=[2.1,3.9,6.2,7.8,10.1];b=sum(x*y for x,y in zip(xs,ys))/sum(x*x for x in xs)
res=sum((y-b*x)**2 for x,y in zip(xs,ys))
check('管理',9,len(xs)-1,4,'原点回帰の設計行列は1列、ランク1、残差自由度n−1。',4)
check('管理',14,abs(sum(x*(y-b*x) for x,y in zip(xs,ys)))<1e-12,True,'5組の独立な試行データで正規方程式Σx(y−bx)=0を検算。',2)
check('管理',15,F(3,2)**2/F(4),F(9,16),'β=3/2,σ²=4なら校正後分散σ²/β²=16/9=1/η。繰返し分散推定には真値は不要。',2)
check('管理',16,(F(2)**2/F(3))/(F(1)**2/F(3)),F(4),'同分散で傾き2倍のSN比は4倍。',5)
nearest('管理',18,math.ceil(math.log2(5001)),[10,11,12,13,14],'端点を含め5001値を必要とする場合でも最小13bit。')
nearest('管理',20,F(400,32-27),[16,31,66,80,85],'直近400hの故障5回でMTBF80h。')
nearest('計質',2,math.sqrt(4.1**2+6.7**2+13.9**2),[14,15,16,25,260],'無相関・感度係数1の不確かさ伝ぱ。')
nearest('計質',5,(91.3-91.3)-(101.3-101.3),[10,1,0,-1,-10],'大気開放の2地点で絶対圧10kPa低下・差圧は両地点0。')
check('計質',9,all(abs(2*(1-math.exp(-t/.5))-y)<.01 for t,y in zip([.1,.2,.5,1,1.5,2],[.36,.66,1.26,1.73,1.90,1.96])),True,'τ=.5sを全6時刻へ代入し表の全値と比較。',2)
nearest('計質',10,.005*2+.001*2,[.005,.007,.010,.012,.020],'reading成分と2digits成分を加算。')
nearest('計質',14,(100/2/math.sqrt(2))**2/50,[200,100,70.7,50,25],'正弦波の電圧実効値から平均消費電力を算出。')
nearest('計質',15,16/10**(.6),[4,8,10,12,14],'減衰量は10log(Pin/Pout)で定義。')
check('計質',16,103-(100+104)/2,1,'A真値100,B真値101、直線ドリフト0,2,4なら観測A100,B103,A104。式2だけ質量差+1を復元。',2)
nearest('計質',21,1.996*9.807/9.797,[1.995,1.996,1.997,1.998,1.999],'同じ質量の力検出は重力に比例、増加方向。')
check('計質',23,(500*10/1000,2000*10/1000,.5*10,1*10,1.5*10),(5.0,20.0,5.0,10,15.0),'3級の公差表の目量倍数をt・kgへ換算。',4)
covered={(x['subject'],x['qNumber']) for x in r}
for p in Path('data/questions/keiryoshi').glob('2024-*.json'):
 if 'ichiki' in p.name:continue
 for q in json.loads(p.read_text()):
  if q.get('isCalculation'):assert (q['subject'],q['qNumber']) in covered,(p,q['qNumber'])
(E/'calculations.json').write_text(json.dumps(r,ensure_ascii=False,indent=2)+'\n')
print(len(r),'independent arithmetic/model checks passed (plus ichiki script)')
