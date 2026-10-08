export const SITE = {
  name: "おちゃノート 工学数学",
  url: "https://university-math-crj.pages.dev",
  parent: "https://ochanote.com",
  description:
    "工学部で使う線形代数・微分積分・複素関数を、回路や信号の例で解説。演習問題と解答のPDFを無料で配布しています。",
};

export type SubjectKey = "linear-algebra" | "calculus" | "complex";

export const SUBJECTS: Record<
  SubjectKey,
  { name: string; short: string; lead: string; color: string }
> = {
  "linear-algebra": {
    name: "線形代数",
    short: "線形",
    lead: "ベクトルと行列で、連立方程式や多入力のシステムをまとめて扱います。固有値からは、回路の時定数や振動のモードが読み取れます。",
    color: "var(--c-la)",
  },
  calculus: {
    name: "微分積分",
    short: "微積",
    lead: "近似・変化率・蓄積の数学。線形化や小信号近似、エネルギー計算の土台になります。",
    color: "var(--c-ca)",
  },
  complex: {
    name: "複素関数",
    short: "複素",
    lead: "交流回路はフェーザ、信号はフーリエ・ラプラス変換。どれも複素数の計算に帰着します。",
    color: "var(--c-cx)",
  },
};

export const SUBJECT_ORDER: SubjectKey[] = ["linear-algebra", "calculus", "complex"];
