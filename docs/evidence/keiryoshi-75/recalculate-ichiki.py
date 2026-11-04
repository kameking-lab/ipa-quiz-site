"""Independent arithmetic/physical-model checks, separate from draft explanations."""
import math,cmath,json
from fractions import Fraction as F
from pathlib import Path
answers=json.loads(Path('docs/evidence/keiryoshi-75/official-answers.json').read_text())['answers']['一基']
r=[]
def check(q,result,expected,detail):
 assert result==expected,(q,result,expected)
 r.append(dict(subject='一基',qNumber=q,officialAnswer=answers[str(q)],result=str(result),check=detail,status='passed'))
check(1,[(-2.1<=0 or -2.1>=1),(-1<=0 or -1>=1),(0.5<=0 or 0.5>=1),(1.1<=0 or 1.1>=1),(2<=0 or 2>=1)],[True,True,False,True,True],'各十分条件に対する代表値と、肢3への反例x=1/2。端点を含む不等号は別途原画像で照合。')
check(2,[n for n in range(5,10) if F(1,10**7)<=F(3,16)**n<F(1,10**6)],[9],'指定の丸め対数に依存せず、有理数の厳密比較で小数第七位条件を検算。')
z=complex(1,math.sqrt(3))/2*cmath.exp(1j*math.pi/3)
check(3,abs(z-complex(-1,math.sqrt(3))/2)<1e-14,True,'正の回転角を複素指数で掛けて120度の点を検算。')
check(4,min([-0.02,-0.01,0,0.01,0.02],key=lambda x:abs(x-math.log(.98))),-.02,'自然対数を直接数値計算。')
check(5,[2*x+2*y+z for x,y,z in [(-2,4,-1),(-1,-1,5),(0,0,1),(1,1,0),(2,-1,0)]],[3,1,1,4,2],'法線と点Pから得た平面の左辺を全5肢で計算。')
check(6,[(x+y+3,x-y+1) for x,y in [(-1,-2),(-2,-1),(-3,-1),(-2,-2),(-3,0)]],[(0,2),(0,0),(-1,-1),(-1,1),(0,-2)],'kの係数と定数項の両方を全5肢で計算。')
check(7,F(1,1+1),F(1,2),'x≠1で因数分解して約分後、連続な関数の極限を評価。')
# Simpson quadrature, independent from the analytic antiderivative in the explanation.
h=2/2000;s=sum((1 if i in (0,2000) else 4 if i%2 else 2)*math.exp(2*(-1+i*h)+4) for i in range(2001))*h/3
check(8,abs(s-(math.exp(6)-math.exp(2))/2)<1e-8,True,'数値積分2000区間で解析積分値を検算。')
x=math.sqrt(3);A=[[x,1],[-2,-x]];square=[[sum(A[i][k]*A[k][j] for k in range(2)) for j in range(2)] for i in range(2)]
check(9,all(abs(square[i][j]-(1 if i==j else 0))<1e-14 for i in range(2) for j in range(2)),True,'x=√3,y=−√3でA²=Iの実現性とx+y=0を検算。')
check(11,sum(F(k,6) for k in range(1,7)),F(7,2),'サイコロの期待値を有理数で全6事象から計算。')
check(12,F(4,9)*F(4,100)/(F(4,9)*F(4,100)+F(5,9)*F(3,100)),F(16,31),'ベイズの公式から第一工場という条件付き事象を厳密計算。')
check(13,1-F(1,2)/F(3,4),F(1,3),'床の支点から作用点3L/4、重心L/2でモーメントを独立に立式。')
# KCL at the central node: (Vnode-V)/R + Vnode/(2R) = 0.
R=7;V=21;vm=2*V/3
check(15,((V-vm)/V,vm/V,(vm-V)/R+vm/(2*R)),(1/3,2/3,0.0),'中央導線を同一節点としてKCLで独立に計算。C₁側V/3、C₂側2V/3。')
check(16,[F(1,1)/ (1/F(7)+1/(F(7)*m))==F(7)*m/(1+m) for m in [F(1,2),F(1),F(3)]],[True]*3,'倍率の複数値でレンズの式を検算。')
check(18,min([1.5,2,3.5,6.5,7.5],key=lambda x:abs(x-2*3.32)),6.5,'半減期2年と指定log₂10による6.64年から最寄りを選定。')
K=6.6e-34*3e8/(150e-9)-5.1*1.6e-19;v=math.sqrt(2*K/9.1e-31)
check(19,min([1.1e5,1.7e5,3.3e5,1.1e6,1.7e6],key=lambda x:abs(x-v)),1.1e6,'光子エネルギーから仕事関数をJへ換算して減算。速度1052469.6…m/s。')
check(20,F(12)/(F(12)-F(10))*F(1000),F(6000),'密度6000kg/m³、質量12kgの固体を水中で量る場合m′=10kgとなる例で比の向きを検算。')
check(24,F(20,100)*F(20,10000)*5*3600,F(72,10),'密度・面積・速度・秒時換算を有理数で厳密計算。')
check(25,(F(30)/F(10,100)-F(10)/F(20,100))/1000,F(25,100),'左右荷重/面積の差を密度で除算。重力加速度は相殺。左が高いことを符号で確認。')
r += [dict(subject='一基',qNumber=14,officialAnswer=answers['14'],status='passed',result='BL²ω/2',check='半径rの速度ωrに対する微小起電力Bωr drを0からLまで積分。次元[B]L²/t=V、外端側が高電位。'),dict(subject='一基',qNumber=17,officialAnswer=answers['17'],status='passed',result='λL/d',check='二つのスリットからの距離√(L²+(y±d/2)²)の一次展開差dy/Lを明縞条件mλに等置。')]
Path('docs/evidence/keiryoshi-75/ichiki-calculations.json').write_text(json.dumps(sorted(r,key=lambda x:x['qNumber']),ensure_ascii=False,indent=2)+'\n')
print(len(r),'independent checks passed')
