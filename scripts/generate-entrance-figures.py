"""Development only: NumPy, Matplotlib and a Japanese font; see README."""
from pathlib import Path
import os
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib.font_manager import FontProperties
import numpy as np

root=Path(__file__).resolve().parent.parent/'public/figures/linear-algebra'
font=FontProperties(fname=os.environ.get('MATH_JAPANESE_FONT','/usr/share/fonts/opentype/noto/NotoSansCJK-Regular.ttc'))
plt.rcParams.update({'svg.fonttype':'path','svg.hashsalt':'ochamath-entrance','font.size':11})
blue='#2f5da8'; green='#2e7d5b'; purple='#7a4ba8'
def save(fig,name):
    fig.tight_layout()
    fig.savefig(root/name,format='svg',metadata={'Date':None,'Creator':'おちゃノート 工学数学'})
    plt.close(fig)
    path=root/name
    path.write_text('\n'.join(line.rstrip() for line in path.read_text().splitlines())+'\n')

fig,ax=plt.subplots(figsize=(8,2.5));ax.axis('off');ax.set_xlim(-.5,6.5);ax.set_ylim(-.8,.8)
labels=[r'$v_3=(0,0,1)^T$',r'$v_2=(1,1,0)^T$',r'$v_1=(1,0,0)^T$',r'$0$']
for x,label in zip([0,2,4,6],labels):ax.text(x,0,label,ha='center',va='center',bbox={'facecolor':'white','edgecolor':blue,'pad':10})
for x in [0,2,4]:
    ax.annotate('',xy=(x+1.48,0),xytext=(x+.52,0),arrowprops={'arrowstyle':'->','color':green,'lw':2})
    ax.text(x+1,.3,r'$N=A-2I$',ha='center',color=green)
ax.set_title('一般化固有ベクトル：Nを掛けるたびに連鎖を一段戻る',fontproperties=font)
save(fig,'jordan-chain.svg')

fig,axes=plt.subplots(1,2,figsize=(7,3.5))
for ax,values,title,xlabel in [(axes[0],[1,0,-1,0],'4点の信号 x','時刻の添字 n'),(axes[1],[0,1,0,1],'正規化DFT Fx','周波数の添字 k')]:
    markers,stems,base=ax.stem(range(4),values);plt.setp(stems,color=blue);plt.setp(markers,color=blue)
    ax.set_xticks(range(4));ax.set_ylim(-1.3,1.3);ax.grid(alpha=.2)
    ax.set_title(title,fontproperties=font);ax.set_xlabel(xlabel,fontproperties=font)
fig.suptitle('ノルム2乗は変換の前後で2：Parsevalの等式',fontproperties=font)
save(fig,'dft-four-points.svg')

fig,ax=plt.subplots(figsize=(5.5,5));theta=np.linspace(0,2*np.pi,400)
ax.plot(.5*np.cos(theta),np.sin(theta),color=blue,label=r'$x^TMx=1,\ M=\mathrm{diag}(4,1)$')
for end,color,label in [(np.array([1,2])/np.sqrt(8),green,r'$v_1=(1,2)^T/\sqrt{8}$'),(np.array([1,-2])/np.sqrt(8),purple,r'$v_3=(1,-2)^T/\sqrt{8}$')]:
    ax.annotate('',xy=end,xytext=(0,0),arrowprops={'arrowstyle':'->','lw':2,'color':color});ax.plot([],[],color=color,label=label)
ax.set_aspect('equal');ax.set_xlim(-.75,.75);ax.set_ylim(-1.15,1.15);ax.grid(alpha=.2)
ax.set_xlabel('x1');ax.set_ylabel('x2');ax.legend(loc='upper center',bbox_to_anchor=(.5,-.15),fontsize=10)
ax.set_title('M内積では直交：通常の角度は直角でない',fontproperties=font)
save(fig,'weighted-modes.svg')

fig,ax=plt.subplots(figsize=(5.8,5.5));xx,yy=np.meshgrid(np.linspace(-1.9,1.9,250),np.linspace(-1.9,1.9,250))
V=.5*xx**2+xx*yy/3+yy**2/3
curves=ax.contour(xx,yy,V,levels=[.15,.5,1],colors=[green,blue,purple]);ax.clabel(curves,inline=True)
times=np.linspace(0,5,150)
for x0,y0 in [(1.5,1),(-1.5,-1),(1,-1.5),(-1,1.5)]:
    x=np.exp(-times)*x0+(np.exp(-times)-np.exp(-2*times))*y0;y=np.exp(-2*times)*y0
    ax.plot(x,y,color='#475569',lw=1.5);ax.annotate('',xy=(x[12],y[12]),xytext=(x[4],y[4]),arrowprops={'arrowstyle':'->','color':'#475569'})
ax.set_aspect('equal');ax.set_xlim(-1.9,1.9);ax.set_ylim(-1.9,1.9);ax.grid(alpha=.15);ax.set_xlabel('x1');ax.set_ylabel('x2')
ax.set_title('Vの等高線と軌道：時間とともに内側へ',fontproperties=font)
save(fig,'lyapunov-energy.svg')
print('4 entrance-exam SVG figures generated')
