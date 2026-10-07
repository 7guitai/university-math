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
  }
];
