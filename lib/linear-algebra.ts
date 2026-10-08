export const LINEAR_ALGEBRA_GROUPS = [
  {
    "id": "foundations",
    "title": "1. ベクトルと行列の計算"
  },
  {
    "id": "spaces",
    "title": "2. 空間・基底・線形写像"
  },
  {
    "id": "modes",
    "title": "3. 固有値と分解"
  },
  {
    "id": "applications",
    "title": "4. 近似・エネルギー・動的システム"
  },
  {
    "id": "exam-algebra",
    "title": "5. 院試補充：行列計算と部分空間"
  },
  {
    "id": "exam-spectral",
    "title": "6. 院試補充：固有値・多項式・Jordan"
  },
  {
    "id": "exam-complex",
    "title": "7. 電気系の複素線形代数と信号"
  },
  {
    "id": "exam-optimization",
    "title": "8. 院試補充：二次形式と行列分解"
  },
  {
    "id": "exam-applications",
    "title": "9. 状態方程式・制御・回路の発展"
  },
  {
    "id": "exam-practice",
    "title": "10. 院試の総合演習"
  }
] as const;

export const LINEAR_ALGEBRA_LESSONS = [
  {
    "slug": "vectors",
    "title": "ベクトルと内積 — 力の合成から、向きの違いを測る計算へ",
    "group": "foundations",
    "goal": "成分・長さ・角度から直交の意味をつかむ",
    "prerequisites": []
  },
  {
    "slug": "matrices",
    "title": "行列と線形変換 — 複数の入力をまとめて変換する",
    "group": "foundations",
    "goal": "行列の積を変換の合成として理解する",
    "prerequisites": [
      "vectors"
    ]
  },
  {
    "slug": "linear-systems",
    "title": "連立方程式と掃き出し法 — 解の数まで見分ける",
    "group": "foundations",
    "goal": "解が一つ・無数・なしを区別する",
    "prerequisites": [
      "matrices"
    ]
  },
  {
    "slug": "inverse-matrices",
    "title": "逆行列と正則性 — 元に戻せる変換の条件",
    "group": "foundations",
    "goal": "変換を元に戻せる条件を見分ける",
    "prerequisites": [
      "linear-systems"
    ]
  },
  {
    "slug": "determinants",
    "title": "行列式 — 面積の倍率と、つぶれる変換を見分ける",
    "group": "foundations",
    "goal": "面積倍率と正則性を結びつける",
    "prerequisites": [
      "matrices",
      "inverse-matrices"
    ]
  },
  {
    "slug": "vector-spaces",
    "title": "ベクトル空間と部分空間 — 作れるベクトルの範囲を知る",
    "group": "spaces",
    "goal": "部分空間・像・核を例から理解する",
    "prerequisites": [
      "vectors",
      "linear-systems"
    ]
  },
  {
    "slug": "basis-dimension",
    "title": "基底と次元 — 座標と自由度を数える",
    "group": "spaces",
    "goal": "座標の選び方と階数を整理する",
    "prerequisites": [
      "vector-spaces",
      "linear-systems"
    ]
  },
  {
    "slug": "linear-maps",
    "title": "線形写像と基底変換 — 同じ変換を違う座標で表す",
    "group": "spaces",
    "goal": "基底を変えて同じ写像を表す",
    "prerequisites": [
      "basis-dimension",
      "inverse-matrices"
    ]
  },
  {
    "slug": "eigenvalues",
    "title": "固有値・固有ベクトル — 連立微分方程式を「ばらばらに」解く道具",
    "group": "modes",
    "goal": "変換の特別な方向を求める",
    "prerequisites": [
      "determinants",
      "linear-systems"
    ]
  },
  {
    "slug": "diagonalization",
    "title": "対角化 — 混ざった計算を独立な成分に分ける",
    "group": "modes",
    "goal": "行列の累乗を独立な成分で計算する",
    "prerequisites": [
      "eigenvalues",
      "linear-maps"
    ]
  },
  {
    "slug": "symmetric-matrices",
    "title": "対称行列と直交対角化 — 長さを保つ座標で分解する",
    "group": "modes",
    "goal": "直交した固有ベクトルで振動を分ける",
    "prerequisites": [
      "diagonalization",
      "vectors"
    ]
  },
  {
    "slug": "orthogonal-projection",
    "title": "直交射影と正規直交化 — 成分を取り出し、残りを測る",
    "group": "applications",
    "goal": "最も近いベクトルと直交基底を求める",
    "prerequisites": [
      "vectors",
      "basis-dimension"
    ]
  },
  {
    "slug": "least-squares",
    "title": "最小二乗法 — ぴったり解けない方程式に最良の近似を求める",
    "group": "applications",
    "goal": "誤差を最小にする近似を求める",
    "prerequisites": [
      "orthogonal-projection",
      "linear-systems"
    ]
  },
  {
    "slug": "quadratic-forms",
    "title": "二次形式と正定値 — エネルギーの形を固有値で読む",
    "group": "applications",
    "goal": "エネルギーの正負と最小値を調べる",
    "prerequisites": [
      "symmetric-matrices"
    ]
  },
  {
    "slug": "singular-value-decomposition",
    "title": "特異値分解 — 長方形行列の伸縮と情報の欠落を読む",
    "group": "applications",
    "goal": "長方形行列の変換・近似・逆算を理解する",
    "prerequisites": [
      "symmetric-matrices",
      "least-squares"
    ]
  },
  {
    "slug": "dynamical-systems",
    "title": "線形システムとモード — 時間変化と安定性を読み解く",
    "group": "applications",
    "goal": "連続時間と離散時間の安定性を見分ける",
    "prerequisites": [
      "diagonalization",
      "symmetric-matrices"
    ]
  },
  {
    "slug": "determinant-methods",
    "title": "行列式の計算法とブロック行列 — 余因子から回路の消去へ",
    "group": "exam-algebra",
    "goal": "余因子・随伴行列・クラメルの公式・Schur補行列を、成立条件と3次の計算で理解する",
    "prerequisites": [
      "determinants",
      "inverse-matrices"
    ]
  },
  {
    "slug": "parameter-rank",
    "title": "文字パラメータと階数 — 解が変わる境界を漏れなく調べる",
    "group": "exam-algebra",
    "goal": "零になるピボットを場合分けし、拡大係数行列・階数不等式で解の条件を証明する",
    "prerequisites": [
      "linear-systems",
      "basis-dimension",
      "determinant-methods"
    ]
  },
  {
    "slug": "subspace-sums",
    "title": "部分空間の和・共通部分・直和 — 次元公式を証明して使う",
    "group": "exam-algebra",
    "goal": "共通部分の基底を連立式で求め、次元公式・直和・不変部分空間を整理する",
    "prerequisites": [
      "vector-spaces",
      "basis-dimension",
      "linear-maps"
    ]
  },
  {
    "slug": "characteristic-polynomial",
    "title": "特性多項式と固有値の重複 — 3次以上の行列を読む",
    "group": "exam-spectral",
    "goal": "相似不変量・代数的重複度・幾何的重複度を区別して対角化を判定する",
    "prerequisites": [
      "eigenvalues",
      "diagonalization",
      "subspace-sums"
    ]
  },
  {
    "slug": "cayley-hamilton",
    "title": "ケーリー・ハミルトンの定理 — 累乗・逆行列・漸化式を短くする",
    "group": "exam-spectral",
    "goal": "随伴行列から定理を証明し、高次の累乗・逆行列・数列を低次の式へ還元する",
    "prerequisites": [
      "characteristic-polynomial",
      "determinant-methods"
    ]
  },
  {
    "slug": "minimal-polynomial",
    "title": "最小多項式 — 対角化とジョルダンブロックを一つの式で捉える",
    "group": "exam-spectral",
    "goal": "零化多項式の最小次数、整除性、体による対角化条件とスペクトル射影を証明する",
    "prerequisites": [
      "cayley-hamilton",
      "characteristic-polynomial"
    ]
  },
  {
    "slug": "jordan-form",
    "title": "ジョルダン標準形 — 固有ベクトルが足りない行列の基底を作る",
    "group": "exam-spectral",
    "goal": "一般化固有ベクトルの連鎖と核の次元から、ブロックサイズと変換行列を求める",
    "prerequisites": [
      "minimal-polynomial",
      "parameter-rank"
    ]
  },
  {
    "slug": "matrix-functions",
    "title": "行列指数関数とレゾルベント — 入力のある状態方程式を解く",
    "group": "exam-spectral",
    "goal": "Jordanブロック・畳み込み・複素共役モード・安定境界を、微分と代入で確かめる",
    "prerequisites": [
      "jordan-form",
      "dynamical-systems",
      "cayley-hamilton"
    ]
  },
  {
    "slug": "complex-inner-products",
    "title": "複素ベクトルの内積 — フェーザと複素最小二乗を正しく扱う",
    "group": "exam-complex",
    "goal": "共役転置・Cauchy–Schwarz・複素正規直交化・射影・正規方程式を導く",
    "prerequisites": [
      "orthogonal-projection",
      "least-squares"
    ]
  },
  {
    "slug": "hermitian-unitary",
    "title": "Hermite行列・ユニタリ行列・DFT — 複素モードを直交分解する",
    "group": "exam-complex",
    "goal": "スペクトル定理・正規行列・離散Fourier基底・巡回行列の固有値を結びつける",
    "prerequisites": [
      "complex-inner-products",
      "symmetric-matrices",
      "minimal-polynomial"
    ]
  },
  {
    "slug": "quadratic-forms-advanced",
    "title": "二次形式の一般論 — 主小行列式・慣性・Rayleigh商",
    "group": "exam-optimization",
    "goal": "3次以上の正定値判定、半正定値の条件、合同変換、制約付き最大最小を証明して使う",
    "prerequisites": [
      "quadratic-forms",
      "hermitian-unitary",
      "determinant-methods"
    ]
  },
  {
    "slug": "rank-factorizations",
    "title": "LU・QR・擬似逆行列 — 正確な解法と誤差の増幅を分ける",
    "group": "exam-optimization",
    "goal": "ピボット付きLU・QR最小二乗・SVD擬似逆・条件数・Kronecker積の役割を整理する",
    "prerequisites": [
      "singular-value-decomposition",
      "complex-inner-products",
      "parameter-rank"
    ]
  },
  {
    "slug": "control-linear-algebra",
    "title": "可制御性・可観測性 — 入力で動く状態と出力で見える状態",
    "group": "exam-applications",
    "goal": "Kalman階数条件・PBH判定・状態変換・隠れたモードを、2次の具体例で導く",
    "prerequisites": [
      "matrix-functions",
      "parameter-rank",
      "subspace-sums"
    ]
  },
  {
    "slug": "generalized-eigenvalues",
    "title": "一般化固有値問題 — 容量・質量を残したままモードを求める",
    "group": "exam-applications",
    "goal": "正定値の重み付き内積、Hermite問題への変換、回路の減衰モードを求める",
    "prerequisites": [
      "hermitian-unitary",
      "quadratic-forms-advanced",
      "dynamical-systems"
    ]
  },
  {
    "slug": "lyapunov-equations",
    "title": "リアプノフ方程式 — エネルギーから安定性を証明する",
    "group": "exam-applications",
    "goal": "連続・離散時間の行列方程式、正定値解の存在、固有値和による一意性を導く",
    "prerequisites": [
      "matrix-functions",
      "quadratic-forms-advanced",
      "rank-factorizations"
    ]
  },
  {
    "slug": "entrance-exam-practice",
    "title": "電気系院試の総合演習 — 計算・証明・回路と制御をつなぐ",
    "group": "exam-practice",
    "goal": "自作の総合問題を時間を決めて解き、条件・途中式・検算を含む答案へ仕上げる",
    "prerequisites": [
      "parameter-rank",
      "jordan-form",
      "hermitian-unitary",
      "control-linear-algebra",
      "generalized-eigenvalues",
      "lyapunov-equations"
    ]
  }
];
