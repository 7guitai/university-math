"""Independent exact checks of supplemental article and PDF numerical results.
Development check: Python 3 + SymPy. Proofs also require editorial review.
"""
import sympy as s
M=s.Matrix
I=s.I
z,t=s.symbols('z t', real=True)
count=0
def eq(actual,expected,label):
    global count
    delta=actual-expected
    ok=all(s.simplify(x)==0 for x in delta) if isinstance(delta,s.MatrixBase) else s.simplify(delta)==0
    assert ok, (label,actual,expected)
    count+=1
def check(condition,label):
    global count
    assert condition,label
    count+=1
def char(A,poly,label):
    p=A.charpoly()
    eq(p.as_expr().subs(p.gen,z),poly,label)
def pinv(A,P,label):
    eq(A*P*A,A,label+' APA');eq(P*A*P,P,label+' PAP')
    eq((A*P).H,A*P,label+' Hermite AP');eq((P*A).H,P*A,label+' Hermite PA')
    eq(P,A.pinv(),label+' independently computed pseudoinverse')
def ls(A,b,x,error,label):
    r=A*x-b;eq(A.H*r,s.zeros(A.cols,1),label+' orthogonal residual')
    eq((r.H*r)[0],error,label+' squared residual')
def ode(A,x,x0,label,B=None):
    eq(x.diff(t),A*x+(s.zeros(A.rows,1) if B is None else B),label+' differential equation')
    eq(x.subs(t,0),x0,label+' initial value')

# 17: determinants, adjugates and Schur calculations
for A,det in [(M([[2,1,0],[1,2,1],[0,1,2]]),4),(M([[3,1,0],[1,2,1],[0,1,2]]),7),
              (M([[2,0,1],[0,3,1],[1,1,2]]),7),(M([[3,0,1],[0,2,2],[1,2,4]]),10)]:
    eq(A.det(),det,'17 determinant')
eq(M([[2,1,0],[1,2,1],[0,1,2]]).adjugate(),M([[3,-2,1],[-2,4,-2],[1,-2,3]]),'17 adjugate')
A=M([[3,1],[2,1]]);eq(A.inv(),M([[1,-1],[-2,3]]),'17 inverse')
eq(A*M([1,2]),M([5,4]),'17 Cramer substitution')
eq(M([[3,0,1],[0,2,2],[1,2,4]])*M([1,2,1]),M([4,6,9]),'17 Schur solution')

# 18: parameters and consistency at every singular boundary
p=s.symbols('p')
A=M([[1,1,1],[1,p,1],[1,1,p]])
eq(A.det(),(p-1)**2,'18 det');eq(A.subs(p,1).rank(),1,'18 rank drop to one')
pdfA=M([[2,1,1],[2,p,1],[2,1,p]])
eq(pdfA.subs(p,1).rank(),1,'18 PDF rank drop to one')
beta,alpha,gamma=s.symbols('beta alpha gamma')
eq(pdfA.subs(p,1)*M([(beta-alpha-gamma)/2,alpha,gamma]),M([beta,beta,beta]),'18 PDF full exceptional solution')
b1,b2,b3=s.symbols('b1 b2 b3');b=M([b1,b2,b3])
x=M([b1-(b2-b1)/(p-1)-(b3-b1)/(p-1),(b2-b1)/(p-1),(b3-b1)/(p-1)])
eq(A*x,b,'18 general solution')
for offset,b,right in [(1,M([2,3,0]),-1),(2,M([2,4,0]),-2),(-2,M([1,3,0]),2),(-3,M([3,5,0]),3)]:
    A=M([[1,1,0],[1,p,0],[0,0,p+offset]])
    eq(A.det(),(p-1)*(p+offset),'18/32 exceptional values')
    eq(A.subs(p,1).rank(),2,'18/32 coefficient rank inconsistent')
    eq(A.subs(p,1).row_join(b).rank(),3,'18/32 augmented rank inconsistent')
    eq(A.subs(p,right).rank(),2,'18/32 consistent exceptional rank')
    eq(A.subs(p,right).row_join(b).rank(),2,'18/32 consistent augmented rank')
    q=(b[1]-b[0])/(p-1);eq(A*M([b[0]-q,q,0]),b,'18/32 regular solution')
eq(M([[1,1,0],[1,-2,0],[0,0,0]])*M([s.Rational(8,3),-s.Rational(2,3),7]),M([2,4,0]),'18 PDF exceptional solution')
A=M([[1,0],[0,1],[1,2]]);eq(A.H*M([-1,-2,1]),s.zeros(2,1),'18 left null basis')
A=s.diag(1,1,0)
eq((A*s.diag(1,1,0)).rank(),2,'18 rank upper bound');eq((A*s.diag(0,1,1)).rank(),1,'18 rank lower bound')

# 19: intersections, joins and projections
B=M([[1,0],[0,1],[1,1]]);C=M([[1,0],[1,1],[0,1]])
eq(B.row_join(C).rank(),3,'19 sum rank');eq(B.row_join(-C).nullspace()[0],M([0,1,0,1]),'19 intersection coefficients')
eq(M([[1,0,1],[0,1,1],[1,1,0]]).det(),-2,'19 combined basis')
for c in [-2,3]:
    P=M([[1,c],[0,0]]);eq(P*P,P,'19 idempotent');eq(P*M([-c,1]),s.zeros(2,1),'19 kernel')
    eq(P.rank(),P.trace(),'19 rank trace');check(P!=P.H,'19 oblique not orthogonal')
eq(M([[1,0,1],[-1,0,0],[0,1,0]]).det(),-1,'19 PDF sum basis')

# 20–22: characteristic/minimal polynomials and CH powers
A=M([[2,1,0],[0,2,0],[0,0,3]])
char(A,(z-2)**2*(z-3),'20 characteristic');eq(3-(A-2*s.eye(3)).rank(),1,'20 geometric multiplicity')
eq(A.trace(),7,'20 trace');eq(((A.trace())**2-(A*A).trace())/2,16,'20 coefficient s2');eq(A.det(),12,'20 determinant')
E12=M([[0,1],[0,0]]);E21=E12.T;E11=s.diag(1,0)
eq((E12*E21*E11).trace(),1,'20 cyclic trace counterexample first order')
eq((E12*E11*E21).trace(),0,'20 cyclic trace counterexample swapped order')
for d,e,off in [(4,-1,2),(3,1,5),(1,-1,2)]:
    A=M([[d,off,0],[0,d,0],[0,0,e]])
    char(A,(z-d)**2*(z-e),'20 triangular characteristic');eq(3-(A-d*s.eye(3)).rank(),1,'20 defect')
for A,roots in [(M([[2,1],[1,2]]),(3,1)),(M([[3,1],[0,2]]),(3,2)),(M([[0,-2],[1,3]]),(2,1))]:
    u,v=roots;eq(A*A-(u+v)*A+u*v*s.eye(2),s.zeros(2),'21 CH')
    for k in range(0,7):
        a=(u**k-v**k)/s.Rational(u-v);bb=(u*v**k-v*u**k)/s.Rational(u-v)
        eq(A**k,a*A+bb*s.eye(2),'21 general power')
    eq(A.inv(),((u+v)*s.eye(2)-A)/(u*v),'21 inverse')
for value,off in [(2,1),(3,2)]:
    A=M([[value,off],[0,value]]);N=A-value*s.eye(2)
    for k in range(1,7):eq(A**k,value**k*s.eye(2)+k*value**(k-1)*N,'21 repeated-root power')
A=M([[1,1,0],[0,1,0],[0,0,2]]);Z=s.zeros(3)
eq(A**3-4*A**2+5*A-2*s.eye(3),Z,'21 cubic CH')
eq(A.inv(),(A**2-4*A+5*s.eye(3))/2,'21 cubic inverse')
check((A-s.eye(3))*(A-2*s.eye(3))!=Z,'22 lower degree fails')
eq((A-s.eye(3))**2*(A-2*s.eye(3)),Z,'22 minimal annihilation')
char(s.diag(4,4,4,-2),(z-4)**3*(z+2),'22 characteristic repeats')
for value in [1,2,3]:
    R=M([[0,-value],[value,0]]);eq(R**2,-value**2*s.eye(2),'20/22 real irreducible polynomial')
for u,v in [(2,3),(1,2),(3,4)]:
    A=M([[u,2],[0,v]]);E=(v*s.eye(2)-A)/(v-u);F=(A-u*s.eye(2))/(v-u)
    eq(E**2,E,'22/32 spectral idempotence');eq(F**2,F,'22/32 second idempotence');eq(E*F,s.zeros(2),'22/32 orthogonal algebraic projections')
    for k in [0,1,2,5]:eq(A**k,u**k*E+v**k*F,'22/32 spectral powers')

# 23–24: Jordan chains, all powers and differential equation checks
for value,off,top in [(2,1,1),(3,2,1)]:
    A=M([[value,off,top],[0,value,1],[0,0,value]]);N=A-value*s.eye(3);v3=M([0,0,1]);v2=N*v3;v1=N*v2
    P=M.hstack(v1,v2,v3);J=M([[value,1,0],[0,value,1],[0,0,value]])
    check(P.det()!=0,'23 Jordan basis independent');eq(A*P,P*J,'23 chain matrix equality');eq(N**3,s.zeros(3),'23 nilpotence');check(N**2!=s.zeros(3),'23 index exactly 3')
for sizes in [(3,2),(3,2,1),(3,1),(2,2,1)]:
    blocks=[s.zeros(q) for q in sizes]
    for B in blocks:
        for i in range(B.rows-1):B[i,i+1]=1
    N=s.diag(*blocks);dims=[0]+[N.rows-(N**k).rank() for k in range(1,5)]
    for k in range(1,4):eq(dims[k]-dims[k-1],sum(q>=k for q in sizes),'23 kernel increments')
N=M([[0,1,0],[0,0,1],[0,0,0]])
for k in range(2,7):eq((2*s.eye(3)+N)**k,2**k*s.eye(3)+k*2**(k-1)*N+s.binomial(k,2)*2**(k-2)*N**2,'23 third order powers')
for decay in [1,2,3]:ode(-decay*s.eye(3)+N,s.exp(-decay*t)*M([t*t/2,t,1]),M([0,0,1]),'23/24/32 Jordan ODE')
N=M([[0,2,0],[0,0,1],[0,0,0]])
ode(-s.eye(3)+N,s.exp(-t)*M([t*t,t,1]),M([0,0,1]),'32 PDF Jordan ODE')
eq(s.diag(2,1,1).inv()*(-s.eye(3)+N)*s.diag(2,1,1),M([[-1,1,0],[0,-1,1],[0,0,-1]]),'32 PDF Jordan basis')
ode(s.diag(-1,-2),M([1-s.exp(-t),(1-s.exp(-2*t))/2]),s.zeros(2,1),'24 constant input',M([1,1]))
ode(s.diag(-2,-4),M([1-s.exp(-2*t),(1-s.exp(-4*t))/4]),s.zeros(2,1),'24 PDF input',M([2,1]))
for off in [1,2]:ode(M([[0,off],[0,0]]),M([off*t*t/2,t]),s.zeros(2,1),'24 singular input',M([0,1]))
ode(M([[-2,-3],[3,-2]]),s.exp(-2*t)*M([s.cos(3*t),s.sin(3*t)]),M([1,0]),'24 rotation')
ss=s.symbols('s')
J=M([[-1,2],[0,-1]]);eq((ss*s.eye(2)-J)*M([[1/(ss+1),2/(ss+1)**2],[0,1/(ss+1)]]),s.eye(2),'24 resolvent')
A=M([[0,1],[0,0]]);B=A.T;eq((s.eye(2)+A)*(s.eye(2)+B),M([[2,1],[1,1]]),'24 noncommuting product')

# 25–26: complex inner products, Hermite spectra, exact 4-point DFT
for x,y in [(M([1,I]),M([I,1])),(M([1,2*I]),M([2*I,1]))]:eq((x.H*y)[0],0,'25 complex orthogonal')
for q1,q2 in [(M([1,I])/s.sqrt(2),M([1,-I])/s.sqrt(2)),(M([1,-I])/s.sqrt(2),M([-I,1])/s.sqrt(2))]:
    eq(M.hstack(q1,q2).H*M.hstack(q1,q2),s.eye(2),'25 complex orthonormal')
for sign in [1,-1]:
    q=M([1,sign*I])/s.sqrt(2);P=q*q.H;eq(P**2,P,'25 projection');eq(P.H,P,'25 Hermite projection')
ls(M([1,I]),M([1,1]),M([(1-I)/2]),1,'25 article LS')
ls(M([1,-I,1]),M([1,1,0]),M([(1+I)/3]),s.Rational(4,3),'32 article LS')
ls(M([1,I,1]),M([0,1,1]),M([(1-I)/3]),s.Rational(4,3),'25 PDF LS')
ls(M([1,2*I,1]),M([1,0,1]),M([s.Rational(1,3)]),s.Rational(4,3),'32 PDF LS')
eq(s.re(2*s.conjugate(1-I))/2,1,'25 peak phasor power')
U=M([[1,1],[-I,I]])/s.sqrt(2)
for center,off in [(2,1),(3,2)]:
    H=M([[center,off*I],[-off*I,center]]);eq(U.H*H*U,s.diag(center+off,center-off),'26 Hermite spectrum')
A=M([[1,1],[0,2]]);check(A.H*A!=A*A.H,'26 nonnormal but diagonalizable')
F=M(4,4,lambda k,n:I**(-k*n)/2);eq(F.H*F,s.eye(4),'26 DFT unitary')
S=M(4,4,lambda n,m:int(m==(n-1)%4))
eq(F*S*F.H,s.diag(1,-I,-1,I),'26 shift spectrum')
eq(F*(s.eye(4)+S)*F.H,s.diag(2,1-I,0,1+I),'26 article circulant')
eq(F*(2*s.eye(4)+S+S.H)*F.H,s.diag(4,2,0,2),'26 PDF circulant')
eq(F*M([1,0,-1,0]),M([0,1,0,1]),'26 PDF DFT')

# 27–28: quadratic identities, constrained extrema, QR and pseudoinverses
x1,x2,x3=s.symbols('x1 x2 x3',real=True);x=M([x1,x2,x3])
for a,b,bound in [(2,2,s.Rational(2,3)),(3,2,s.Rational(3,5))]:
    H=M([[a,1,0],[1,b,1],[0,1,p]]);d=b-s.Rational(1,a)
    eq(H.det(),(a*b-1)*p-a,'27 principal determinant')
    eq((x.T*H*x)[0],a*(x1+x2/a)**2+d*(x2+x3/d)**2+(p-bound)*x3*x3,'27 complete squares')
eq(M([[2,1,0],[1,2,1],[0,1,s.Rational(2,3)]])*M([1,-2,3]),s.zeros(3,1),'27 semidefinite kernel')
H=s.diag(0,-2,1);check(all(H[:k,:k].det()>=0 for k in [1,2,3]) and H[1,1]<0,'27 PSD counterexample')
Q=M([[1/s.sqrt(2),0],[-1/s.sqrt(2),0],[0,1]])
eq(Q.T*s.diag(1,2,5)*Q,s.diag(s.Rational(3,2),5),'27 constrained Rayleigh')
H=M([[3,1],[1,2]]);b=M([2,1]);v=M([s.Rational(3,5),s.Rational(1,5)])
eq(H*v,b,'27 minimizer');eq(-(b.T*v)[0],-s.Rational(7,5),'27 minimum')
A=M([[4,1],[2,3]]);L=M([[1,0],[s.Rational(1,2),1]]);R=M([[4,1],[0,s.Rational(5,2)]])
eq(L*R,A,'28 LU');eq(A*M([1,2]),M([6,8]),'28 LU solution')
A=M([[1,0],[1,1],[0,1]]);Q=M.hstack(M([1,1,0])/s.sqrt(2),M([-1,1,2])/s.sqrt(6));R=M([[s.sqrt(2),1/s.sqrt(2)],[0,s.sqrt(s.Rational(3,2))]])
eq(Q*R,A,'28 QR reconstruction');eq(Q.T*Q,s.eye(2),'28 QR orthogonal')
ls(A,M([1,2,2]),M([s.Rational(2,3),s.Rational(5,3)]),s.Rational(1,3),'28 article QR')
ls(A,M([2,1,0]),M([s.Rational(5,3),-s.Rational(1,3)]),s.Rational(1,3),'28 PDF QR')
for A,b in [(M([[1,1],[2,2]]),M([1,0])),(M([[2,2],[1,1]]),M([0,1]))]:
    P=A.T/10;pinv(A,P,'28 rank-one');ls(A,b,M([s.Rational(1,10)]*2),s.Rational(4,5),'28 rank-one LS')
pinv(s.diag(3,0),s.diag(s.Rational(1,3),0),'28 diagonal')
A=M([[1,2],[0,3]]);B=s.diag(2,4);X=M([[1,3],[2,4]])
vec=lambda X:M([X[i,j] for j in range(X.cols) for i in range(X.rows)])
eq(vec(A*X*B),M([10,12,44,48]),'28 vectorization numeric')
eq(vec(A*X*B),s.kronecker_product(B.T,A)*vec(X),'28 vectorization identity')

# 29: exact control ranks, PBH exceptional inputs/outputs and transfer functions
for a,b in [(2,3),(6,5)]:
    A=M([[0,1],[-a,-b]]);B=M([0,1]);C=M([[1,0]])
    eq(M.hstack(B,A*B).det(),-1,'29 controllability');eq(C.col_join(C*A),s.eye(2),'29 observability')
    eq((C*(ss*s.eye(2)-A).inv()*B)[0],1/(ss**2+b*ss+a),'29 transfer')
    v=M([1,p]);eq(M.hstack(v,A*v).det(),-(p*p+b*p+a),'29 parameter input')
    C=M([[1,p]]);eq(C.col_join(C*A).det(),1-b*p+a*p*p,'29 parameter output')
A=M([[0,1],[-2,-3]]);eq((M([[1,1]])*(ss*s.eye(2)-A).inv()*M([0,1]))[0],1/(ss+2),'29 cancelled pole')
for a,b in [(-1,2),(-2,1),(-3,2)]:
    A=s.diag(a,b);B=M([1,1]);C=M([[1,0]])
    eq(M.hstack(B,A*B).rank(),2,'29/32 reachable hidden mode')
    eq(C.col_join(C*A).rank(),1,'29/32 hidden mode')
    eq((C*(ss*s.eye(2)-A).inv()*B)[0],1/(ss-a),'29/32 visible transfer')

# 30: generalized modes, weighted normalization and both first/second order responses
for scale in [2,3]:
    mass=s.diag(scale**2,1);K=M([[2*scale**2,-scale],[-scale,2]])
    H=s.diag(s.Rational(1,scale),1)*K*s.diag(s.Rational(1,scale),1)
    eq(H,M([[2,-1],[-1,2]]),'30 weighted Hermite transform')
    V=M([[1,1],[scale,-scale]])/s.sqrt(2*scale**2)
    eq(V.T*mass*V,s.eye(2),'30 weighted normalization');eq(K*V,mass*V*s.diag(1,3),'30 generalized eigen equation')
    response=M([(s.exp(-t)+s.exp(-3*t))/2,s.Rational(scale,2)*(s.exp(-t)-s.exp(-3*t))])
    eq(mass*response.diff(t)+K*response,s.zeros(2,1),'30 RC equation');eq(response.subs(t,0),M([1,0]),'30 RC initial')
    response=M([(s.cos(t)+s.cos(s.sqrt(3)*t))/2,s.Rational(scale,2)*(s.cos(t)-s.cos(s.sqrt(3)*t))])
    eq(mass*response.diff(t,2)+K*response,s.zeros(2,1),'30 oscillator equation');eq(response.diff(t).subs(t,0),s.zeros(2,1),'30 oscillator initial velocity')
for mass,K,expected in [(s.diag(2,4),s.diag(6,8),s.diag(3,2)),(s.diag(3,2),s.diag(12,6),s.diag(4,3)),(s.diag(3,2),s.diag(6,8),s.diag(2,4))]:
    eq(mass.inv()*K,expected,'30/32 diagonal generalized eigenvalues')

# 31: Lyapunov matrices, positivity and Sylvester vectorization
for A,P,det in [(M([[-1,1],[0,-2]]),M([[s.Rational(1,2),s.Rational(1,6)],[s.Rational(1,6),s.Rational(1,3)]]),s.Rational(5,36)),
                (M([[-2,1],[0,-3]]),M([[s.Rational(1,4),s.Rational(1,20)],[s.Rational(1,20),s.Rational(11,60)]]),s.Rational(13,300))]:
    eq(A.T*P+P*A,-s.eye(2),'31 continuous Lyapunov');eq(P.det(),det,'31 positivity determinant');check(P[0,0]>0 and P.det()>0,'31 positive definite')
A=s.diag(-1,-3);P=s.diag(s.Rational(1,2),s.Rational(1,6));eq(A.T*P+P*A,-s.eye(2),'31 continuous diagonal')
for A,P in [(s.diag(s.Rational(1,2),s.Rational(1,3)),s.diag(s.Rational(4,3),s.Rational(9,8))),
             (s.diag(s.Rational(1,3),s.Rational(1,2)),s.diag(s.Rational(9,8),s.Rational(4,3)))]:eq(A.T*P*A-P,-s.eye(2),'31 discrete Lyapunov')
A=s.diag(1,2);B=s.diag(3,4);X=M([[1,2],[3,4]]);C=M([[4,10],[15,24]])
eq(A*X+X*B,C,'31 Sylvester')
eq((s.kronecker_product(s.eye(2),A)+s.kronecker_product(B.T,s.eye(2)))*vec(X),vec(C),'31 Sylvester Kronecker')
eq(2*(-s.Rational(1,4))+(-s.Rational(1,4))*2,-1,'31 unstable scalar solution')
print(f'PASS: {count} independent exact checks of entrance-exam examples and exercise answers')
