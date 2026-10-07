"""Verify numerical examples across the 16 article and exercise sets with exact arithmetic.

Development dependency: Python 3 + SymPy (pip install sympy).
No dependency on SymPy is introduced into the website or Cloudflare build.
"""
from sympy import Matrix as M, Rational as R, symbols, sqrt, eye, diag, exp, cos, simplify, I

checks = 0

def equal(actual, expected, label):
    global checks
    if isinstance(actual, M):
        valid = actual.shape == expected.shape and all(simplify(v) == 0 for v in actual - expected)
    else:
        valid = simplify(actual - expected) == 0
    assert valid, f'{label}: {actual} != {expected}'
    checks += 1

def vector(*values):
    return M(values)

def solve_check(a, b, x, label):
    equal(a*x, b, label)

def diagonalization(a, p, d, label):
    assert p.det() != 0, label
    equal(p.inv()*a*p, d, label)

def projection(x, q, expected, label):
    p = q*q.T*x
    equal(q.T*q, eye(q.cols), label + ': orthonormal')
    equal(p, expected, label + ': projection')
    equal(q.T*(x-p), M.zeros(q.cols, 1), label + ': residual')
    equal((q*q.T)**2, q*q.T, label + ': idempotent')

def least_squares(a, b, c, error, label):
    residual = b-a*c
    equal(a.T*residual, M.zeros(a.cols,1), label + ': normal equation')
    equal(residual.dot(residual), error, label + ': squared error')
    # For any perturbation h, the objective increases by ||Ah||^2.
    h = M(symbols('h0:'+str(a.cols), real=True))
    equal((residual-a*h).dot(residual-a*h), error+(a*h).dot(a*h), label + ': global minimum')

def ode(a, x, x0, label):
    equal(x.diff(t), a*x, label + ': differential equation')
    equal(x.subs(t,0), x0, label + ': initial value')

t = symbols('t', real=True)
k = symbols('k', integer=True, nonnegative=True)
x, y = symbols('x y', real=True)

# Chapter 1, article and la-02: zero-vector exception is addressed in prose.
a,b=vector(1,2),vector(3,-1)
equal(a+b,vector(4,1),'vectors PDF sum');equal(2*a-b,vector(-1,5),'vectors PDF subtraction')
equal(a.norm(),sqrt(5),'vectors PDF norm');equal((a/sqrt(5)).norm(),1,'vectors normalization')
u,v,w=vector(1,1),vector(2,0),vector(1,-1)
equal(u.dot(v)/(u.norm()*v.norm()),1/sqrt(2),'vectors angle');equal(u.dot(w),0,'vectors orthogonality')
equal(vector(4,-3).dot(vector(2,1)),5,'vectors work');equal(vector(4,-3).dot(vector(-2,-1)),-5,'vectors reverse work')
equal(vector(2,1)+vector(-1,2),vector(1,3),'vectors article sum');equal(2*vector(2,1)-vector(-1,2),vector(5,0),'vectors article subtraction');equal(vector(3,4).dot(vector(2,0)),6,'vectors article work')

# Chapters 2-5, la-03 through la-06.
a=M([[2,1],[0,1]]);b=M([[1,0],[1,1]])
equal(a*vector(1,2),vector(4,2),'matrices article');equal(a*b,M([[3,1],[1,1]]),'matrices AB');equal(b*a,M([[2,1],[2,2]]),'matrices BA')
a=M([[1,2],[0,1]]);b=M([[2,0],[1,1]])
equal(a*b,M([[4,2],[1,1]]),'matrices PDF AB');equal(b*a,M([[2,4],[1,3]]),'matrices PDF BA');equal(a*vector(2,-1),vector(0,-1),'matrices PDF vector')
rot=M([[0,-1],[1,0]]);equal(rot*vector(2,1),vector(-1,2),'rotation');equal(rot**2,-eye(2),'rotation twice');equal(rot**4,eye(2),'rotation full turn')
c=M([[1,1],[1,-1]])
for inp,out in [(vector(3,1),vector(4,2)),(vector(5,2),vector(7,3)),(vector(4,2),vector(6,2))]:solve_check(c, out, inp,'sensor')
equal(c.inv(),c/2,'sensor inverse')
solve_check(M([[1,1],[2,-1]]),vector(3,0),vector(1,2),'systems article')
solve_check(M([[2,1],[1,-1]]),vector(7,2),vector(3,1),'systems PDF')
dependent=M([[1,2],[2,4]])
equal(dependent.rank(),1,'systems coefficient rank');equal(dependent.row_join(vector(3,6)).rank(),1,'systems consistent rank');equal(dependent.row_join(vector(3,7)).rank(),2,'systems inconsistent rank')
solve_check(dependent,vector(3,6),vector(3-2*t,t),'systems infinite solutions')
equal(M([[1,1],[2,2]]).row_join(vector(1,3)).rank(),2,'systems PDF inconsistent')
solve_check(M([[1,1,1],[1,-1,0]]),vector(2,0),vector(t,t,2-2*t),'systems PDF free variable')
g=M([[2,-1],[-1,2]])
solve_check(g,vector(1,0),vector(R(2,3),R(1,3)),'circuit article');solve_check(g,vector(2,0),vector(R(4,3),R(2,3)),'circuit PDF')
a=M([[2,1],[1,1]]);equal(a.inv(),M([[1,-1],[-1,2]]),'inverse article');solve_check(a,vector(3,2),vector(1,1),'inverse article recovery')
a=M([[3,1],[2,1]]);equal(a.inv(),M([[1,-1],[-2,3]]),'inverse PDF');solve_check(a,vector(7,5),vector(2,1),'inverse PDF recovery')
solve_check(dependent,vector(0,0),vector(-2,1),'inverse singular kernel')
a=M([[1,0],[0,1],[0,0]]);left=M([[1,0,0],[0,1,0]])
equal(left*a,eye(2),'left inverse');equal(a*left,diag(1,1,0),'left inverse not two-sided')
for a,d,label in [(M([[2,1],[1,3]]),5,'article area'),(M([[1,2,0],[0,3,1],[0,0,2]]),6,'article triangular'),(M([[2,1],[4,3]]),2,'article row addition'),(M([[3,1],[2,2]]),4,'PDF area'),(M([[2,1,0],[0,-1,3],[0,0,4]]),-8,'PDF triangular'),(M([[6,6],[3,1]]),-12,'PDF row swap and scaling'),(rot,1,'rotation determinant'),(diag(1,-1),-1,'reflection determinant')]:equal(a.det(),d,label)
equal(diag(2,R(1,2)).det(),1,'determinant does not determine lengths');equal((diag(2,R(1,2))*vector(1,0)).norm(),2,'changed length')

# Chapters 6-8, la-07 through la-09.
u,v=vector(1,0,1),vector(0,1,1)
equal(2*u-v,vector(2,-1,1),'span article');equal(u+v,vector(1,1,2),'span PDF');equal(M.hstack(u,v).rank(),2,'independent plane basis');equal(M.hstack(u,v,u+v).rank(),2,'dependent spanning set')
equal(M.hstack(u,v,vector(0,0,1)).rank(),3,'outside plane')
p=M([[1,1],[1,-1]])
equal(p.inv()*vector(4,2),vector(3,1),'basis article');equal(p.inv()*vector(6,2),vector(4,2),'basis PDF')
a=M([[1,2,0],[0,0,1],[1,2,1]])
equal(a.rank(),2,'rank-nullity rank');equal(len(a.nullspace()),1,'rank-nullity nullity');solve_check(a,vector(0,0,0),vector(-2,1,0),'nullspace basis')
assert a.rref()[1] == (0,2);checks+=1
a=M([[2,1],[1,2]])
diagonalization(a,p,diag(3,1),'basis change');equal(a*vector(4,2),vector(10,8),'map in standard coordinates');equal(p*vector(9,1),vector(10,8),'map in alternate coordinates')
a=M([[1,0,1],[0,1,1]])
equal(a.rank(),2,'surjective map');solve_check(a,vector(0,0),vector(-1,-1,1),'map kernel')
p_in=diag(2,1);q_out=diag(1,3)
equal(q_out.inv()*eye(2)*p_in,diag(2,R(1,3)),'different input output bases');equal(p_in*vector(1,3),q_out*vector(2,1),'same physical vector')

# Chapters 9-11, la-01 and la-10/11.
p=M([[1,1],[1,-1]]);a=M([[2,1],[1,2]])
diagonalization(a,p,diag(3,1),'eigenbasis')
for power in range(8):equal(a**power,M([[3**power+1,3**power-1],[3**power-1,3**power+1]])/2,'power formula')
a=M([[4,-2],[1,1]]);p2=M([[1,2],[1,1]])
diagonalization(a,p2,diag(2,3),'eigen PDF diagonalization')
a=M([[-1,2],[2,-1]]);sol=vector(exp(t)+exp(-3*t),exp(t)-exp(-3*t));ode(a,sol,vector(2,0),'eigen PDF unstable initial value')
a=M([[0,1],[-2,-3]]);lam=symbols('lam');equal(a.charpoly(lam).as_expr(),lam**2+3*lam+2,'second-order characteristic equation')
equal(rot.charpoly(lam).as_expr(),lam**2+1,'complex rotation eigenvalues');solve_check(rot,I*vector(1,-I),vector(1,-I),'complex eigenvector')
a=M([[3,1],[0,2]]);p2=M([[1,-1],[0,1]])
diagonalization(a,p2,diag(3,2),'diagonalization PDF');equal(a**2,M([[9,5],[0,4]]),'diagonalization PDF power')
equal(len((M([[2,1],[0,2]])-2*eye(2)).nullspace()),1,'defective eigenspace');equal(len((2*eye(2)-2*eye(2)).nullspace()),2,'repeated diagonal eigenspace')
transition=M([[R(8,10),R(1,10)],[R(2,10),R(9,10)]])
stationary=vector(R(1,3),R(2,3));mode=vector(1,-1)
equal(transition*stationary,stationary,'stationary distribution');equal(transition*mode,R(7,10)*mode,'transient eigenmode')
for power in range(8):equal(transition**power*vector(1,0),stationary+R(2,3)*R(7,10)**power*mode,'Markov response')
q=p/sqrt(2);equal(q.T*q,eye(2),'orthogonal matrix')
diagonalization(M([[2,1],[1,2]]),q,diag(3,1),'symmetric article');diagonalization(M([[4,2],[2,4]]),q,diag(6,2),'symmetric PDF');equal(q.T*vector(2,0),vector(sqrt(2),sqrt(2)),'orthogonal coordinates')
diagonalization(g,q,diag(1,3),'vibration stiffness modes')

# Chapters 12-13, la-12 and la-13.
qline=vector(1,1)/sqrt(2)
projection(vector(3,1),qline,vector(2,2),'projection article');projection(vector(4,0),qline,vector(2,2),'projection PDF')
for a1,a2,expected in [(vector(1,1,0),vector(1,0,1),vector(1,-1,2)/sqrt(6)),(vector(1,0,1),vector(0,1,1),vector(-1,2,1)/sqrt(6))]:
 q1=a1/a1.norm();u2=a2-q1.dot(a2)*q1;q2=u2/u2.norm();equal(q2,expected,'Gram-Schmidt');equal(q1.dot(q2),0,'Gram-Schmidt orthogonality');equal(q2.norm(),1,'Gram-Schmidt unit norm')
projection(vector(2,3,4),M([[1,0],[0,1],[0,0]]),vector(2,3,0),'plane projection')
equal((4-t)**2+t*t,2*(t-2)**2+8,'closest line point')
a=M([[1,0],[1,1],[1,2]])
least_squares(a,vector(1,2,2),vector(R(7,6),R(1,2)),R(1,6),'least-squares article')
least_squares(a,vector(1,1,3),vector(R(2,3),1),R(2,3),'least-squares PDF line')
least_squares(M([[1],[1],[1]]),vector(1,2,6),vector(3),14,'least-squares PDF constant')
least_squares(M.ones(2,2),vector(1,3),vector(t,2-t),2,'least-squares nonunique coefficients')
a=M([[1,0],[0,1],[1,0]]);q=M.hstack(vector(1,0,1)/sqrt(2),vector(0,1,0));rr=diag(sqrt(2),1)
equal(q*rr,a,'thin QR reconstruction');equal(q.T*q,eye(2),'thin QR orthonormal');equal(rr.inv()*q.T*vector(1,2,3),vector(2,2),'QR solve');least_squares(a,vector(1,2,3),vector(2,2),2,'QR residual')

# Chapters 14-15, la-14 and la-15.
a=M([[2,1],[1,2]]);z=qline # Verify transformed expression symbolically.
xx=vector(x,y);basis=M([[1,1],[1,-1]])/sqrt(2);coords=basis.T*xx
equal((xx.T*a*xx)[0],3*coords[0]**2+coords[1]**2,'quadratic orthogonal diagonalization')
b=M([[1,3],[0,1]]);s=(b+b.T)/2;equal((xx.T*b*xx)[0],(xx.T*s*xx)[0],'symmetric part');equal((vector(1,-1).T*s*vector(1,-1))[0],-1,'indefinite quadratic form')
minimum=a.inv()*vector(1,0);equal(minimum,vector(R(2,3),-R(1,3)),'quadratic minimizer');equal((minimum.T*a*minimum)[0]-2*minimum[0],-R(2,3),'quadratic minimum')
equal(3*x*x+2*x*y+2*y*y,3*(x+y/3)**2+R(5,3)*y*y,'quadratic square completion')
equal((vector(R(1,100),0).T*g*vector(R(1,100),0))[0]/2,R(1,10000),'spring energy')
a=M.ones(2,2);equal(basis*diag(2,0)*basis.T,a,'SVD reconstruction')
assert (a.T*a).eigenvals()=={4:1,0:1};checks+=1
for a,b,solution in [(M([[3,0,0],[0,2,0]]),vector(6,4),vector(2,2,0)),(M([[4,0,0],[0,2,0]]),vector(8,6),vector(2,3,0))]:
 plus=a.pinv();equal(plus*b,solution,'minimum norm pseudoinverse');equal(a*plus*a,a,'Penrose reconstruction');equal(plus*a*plus,plus,'Penrose inverse reconstruction');equal((a*plus).T,a*plus,'Penrose output symmetry');equal((plus*a).T,plus*a,'Penrose input symmetry');equal(solution.dot(vector(0,0,1)),0,'minimum norm orthogonal to kernel')
equal((diag(3,1)-diag(3,0)).norm(),1,'rank-one approximation error')
d=diag(1,R(1,1000));equal(d.inv()*vector(0,R(1,1000)),vector(0,1),'noise amplification article');equal(d.inv()*vector(0,R(2,1000)),vector(0,2),'noise amplification PDF')

# Chapter 16, la-16: initial values and ODE/recurrence independently checked.
a=M([[-3,1],[1,-3]]);sol=vector((exp(-2*t)+exp(-4*t))/2,(exp(-2*t)-exp(-4*t))/2)
ode(a,sol,vector(1,0),'decay modes')
ode(M([[-1,1],[0,-1]]),vector(t*exp(-t),exp(-t)),vector(0,1),'stable defective system')
ode(M([[0,1],[0,0]]),vector(t,1),vector(0,1),'unstable zero eigenvalue boundary')
ode(diag(-1,-2),vector(2*exp(-t),exp(-2*t)),vector(2,1),'dynamic PDF diagonal system')
b=diag(R(1,2),-R(1,2));discrete=vector(2*R(1,2)**k,(-R(1,2))**k)
equal(discrete.subs(k,k+1),b*discrete,'discrete recurrence');equal(discrete.subs(k,0),vector(2,1),'discrete initial value')
oscillation=vector((cos(t)+cos(sqrt(3)*t))/2,(cos(t)-cos(sqrt(3)*t))/2)
equal(oscillation.diff(t,2),-g*oscillation,'coupled vibration equation');equal(oscillation.subs(t,0),vector(1,0),'vibration displacement');equal(oscillation.diff(t).subs(t,0),vector(0,0),'vibration velocity')
print(f'PASS: {checks} exact mathematical checks across all 16 chapters and exercise sets')
