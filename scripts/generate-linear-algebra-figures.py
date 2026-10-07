"""Regenerate the eight linear-algebra SVG diagrams.
Development only: install numpy and matplotlib, and set MATH_JAPANESE_FONT
if Noto Sans CJK is not installed at the default Linux font path.
"""
import os
from pathlib import Path
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib.font_manager import FontProperties
from matplotlib.patches import Polygon
import numpy as np
r=Path(__file__).resolve().parent.parent / 'public/figures/linear-algebra';r.mkdir(parents=True,exist_ok=True)
font=FontProperties(fname=os.environ.get('MATH_JAPANESE_FONT', '/usr/share/fonts/opentype/noto/NotoSansCJK-Regular.ttc'))
plt.rcParams.update({'svg.fonttype':'path','font.size':11,'axes.edgecolor':'#667085','axes.labelcolor':'#334155','xtick.color':'#475569','ytick.color':'#475569'})
blue='#2f5da8';green='#2e7d5b';purple='#7a4ba8'
def setup(title,xlim,ylim,equal=True,xlabel='x',ylabel='y'):
 fig,ax=plt.subplots(figsize=(6.4,5.2));ax.set_xlim(*xlim);ax.set_ylim(*ylim)
 if equal:ax.set_aspect('equal',adjustable='box')
 ax.set_title(title,fontproperties=font,pad=14);ax.set_xlabel(xlabel,fontproperties=font);ax.set_ylabel(ylabel,fontproperties=font)
 ax.axhline(0,color='#64748b',lw=.8);ax.axvline(0,color='#64748b',lw=.8);ax.grid(alpha=.18);return fig,ax
def save(fig,ax,name):
 handles,labels=ax.get_legend_handles_labels()
 if handles:ax.legend(prop=font,loc='upper center',bbox_to_anchor=(.5,-.2),framealpha=.95)
 fig.tight_layout();fig.savefig(r/name,format='svg',metadata={'Date':None,'Creator':'おちゃノート 工学数学'});plt.close(fig)
 p=r/name;p.write_text('\n'.join(line.rstrip() for line in p.read_text().splitlines())+'\n')
def arrow(ax,end,color,label,start=(0,0)):
 ax.annotate('',xy=end,xytext=start,arrowprops=dict(arrowstyle='->',color=color,lw=2));ax.plot([],[],color=color,label=label)
fig,ax=setup('90度回転：長さと直角を保つ',(-1.5,1.5),(-.5,1.6))
for points,c,label in [([(0,0),(1,0),(1,1),(0,1)],blue,'元の単位正方形'),([(0,0),(0,1),(-1,1),(-1,0)],green,'回転後の正方形')]:
 ax.add_patch(Polygon(points,facecolor=c,alpha=.13));p=np.array(points+[points[0]]);ax.plot(p[:,0],p[:,1],color=c,label=label)
arrow(ax,(1,0),blue,'e1');arrow(ax,(0,1),green,'Re1');save(fig,ax,'rotation.svg')
fig,ax=setup('行列式5：単位正方形の面積が5倍',(-.5,3.8),(-.5,4.8))
for points,c,label in [([(0,0),(1,0),(1,1),(0,1)],green,'元の面積1'),([(0,0),(2,1),(3,4),(1,3)],blue,'変換後の面積5')]:
 p=np.array(points+[points[0]]);ax.fill(p[:,0],p[:,1],color=c,alpha=.15);ax.plot(p[:,0],p[:,1],color=c,label=label)
arrow(ax,(2,1),blue,'第1列 (2,1)');arrow(ax,(1,3),purple,'第2列 (1,3)');save(fig,ax,'determinant-area.svg')
fig,ax=setup('基底を選ぶ：x = 3p1 + p2',(-.7,4.8),(-1.5,4))
arrow(ax,(1,1),blue,'p1 = (1,1)');arrow(ax,(1,-1),green,'p2 = (1,−1)');arrow(ax,(4,2),purple,'x = (4,2)')
ax.plot([0,3,4],[0,3,2],'--',color='#64748b',label='3p1 の先に p2 を足す');ax.scatter([3,4],[3,2],color='#64748b',s=25);save(fig,ax,'basis.svg')
fig,ax=setup('直交射影：残差は直線に直交する',(-.5,4),(-.5,3.5))
a=np.linspace(-.5,3.5,100);ax.plot(a,a,color=blue,label='部分空間 y = x');arrow(ax,(3,1),purple,'x = (3,1)');arrow(ax,(2,2),green,'射影 p = (2,2)')
ax.plot([2,3],[2,1],'--',color=purple,label='残差 r = (1,−1)');ax.scatter([2,3],[2,1],c=[green,purple]);save(fig,ax,'projection.svg')
fig,ax=setup('最小二乗：縦の残差の2乗和を最小にする',(-.3,2.4),(.5,2.7),False,'測定位置 x','測定値 y')
x=np.arange(3);b=np.array([1,2,2]);pred=7/6+x/2;xx=np.linspace(-.2,2.2,100);ax.plot(xx,7/6+xx/2,color=blue,label='近似直線 y = 7/6 + x/2');ax.scatter(x,b,color=purple,label='測定データ',zorder=3)
for t,y,p in zip(x,b,pred):ax.plot([t,t],[y,p],color=green,lw=2)
ax.plot([],[],color=green,label='縦の残差');save(fig,ax,'least-squares.svg')
fig,ax=setup('二次形式：x^TAx = 1 の等高線',(-1.25,1.25),(-1.25,1.25))
t=np.linspace(0,2*np.pi,400);z1=np.cos(t)/np.sqrt(3);z2=np.sin(t);x=(z1+z2)/np.sqrt(2);y=(z1-z2)/np.sqrt(2)
ax.plot(x,y,color=blue,label='A = [[2,1],[1,2]]');ax.plot([-1/np.sqrt(6),1/np.sqrt(6)],[-1/np.sqrt(6),1/np.sqrt(6)],color=green,lw=2,label='短軸：固有値3、半径1/√3');ax.plot([-1/np.sqrt(2),1/np.sqrt(2)],[1/np.sqrt(2),-1/np.sqrt(2)],color=purple,lw=2,label='長軸：固有値1、半径1');save(fig,ax,'quadratic-form.svg')
fig,ax=setup('特異値：単位円が横3・縦1の楕円へ',(-3.5,3.5),(-1.6,1.6))
ax.plot(np.cos(t),np.sin(t),'--',color=green,label='入力の単位円');ax.plot(3*np.cos(t),np.sin(t),color=blue,label='diag(3,1)による出力');save(fig,ax,'singular-values.svg')
fig,ax=setup('初期値 (1,0) からの減衰応答',(0,3),(-.03,1.08),False,'時間 t [s]','状態 x1, x2')
t=np.linspace(0,3,400);ax.plot(t,.5*(np.exp(-2*t)+np.exp(-4*t)),color=blue,label='x1 = (exp(-2t) + exp(-4t))/2');ax.plot(t,.5*(np.exp(-2*t)-np.exp(-4*t)),color=green,label='x2 = (exp(-2t) − exp(-4t))/2');save(fig,ax,'time-response.svg')
print('8 SVG figures generated')
