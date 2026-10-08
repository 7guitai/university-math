# 線形代数・全16章のレビュー依頼

対象版：2026-10-08（2026-10-07のClaudeレビューを反映）。工学部向けの入門から応用までの16章を作成しました。

公開サイトの入口：https://university-math-crj.pages.dev/linear-algebra/

## Claudeへの依頼文

以下のサイトを実際に開き、全16章の本文・図・確認問題・演習問題PDF・解答PDFをレビューしてください。リンクを開けなかった場合は、そのURLと未確認の範囲を記載し、確認したと推測しないでください。

対象は「ベクトル・行列の計算、連立方程式、空間と写像、固有値と分解、射影と近似、二次形式、SVD、線形の動的システム」の学習コースです。線形代数全般の専門書を網羅することは目的にしていません。

各指摘を「重大な誤り／条件不足・誤解の恐れ／説明改善／表示・導線」に分け、URL・節・該当箇所・理由・具体的な修正案を示してください。PDFはファイル名・問題番号も記載してください。問題がない章についても、確認できた範囲を明記してください。

確認してほしい点：

- 数式・数値・途中式・図が一致しているか。解答を問題の式に代入して確認できるか。
- 零ベクトル、非零条件、実数／複素数、行列のサイズ、正則性、一次独立などの前提が不足していないか。
- 重複固有値と固有空間の次元、対角化可能性を区別しているか。
- 射影と残差、最小二乗の出力と係数の一意性、薄いQRの行列サイズが正確か。
- 二次形式の対称部分、正定値と半正定値、エネルギーの係数と単位が正確か。
- SVDの長方形行列、零特異値、低ランク近似、擬似逆、最小ノルム解の説明が正確か。
- 連続時間の実部と離散時間の絶対値、漸近安定と境界の違い、初期条件が正確か。
- 初学者が前提の章から順に進めるか。スマートフォンで本文・図・数式・PDFリンクを読めるか。

## 全記事とPDF

章番号とPDFの管理番号は異なります。各章から対応する問題・解答を開けます。

| 章 | 記事 | 問題PDF | 解答PDF |
| --- | --- | --- | --- |
| 1 | [ベクトルと内積 — 力の合成から、向きの違いを測る計算へ](https://university-math-crj.pages.dev/linear-algebra/vectors/) | [問題](https://university-math-crj.pages.dev/pdf/la-02-problems.pdf) | [解答](https://university-math-crj.pages.dev/pdf/la-02-solutions.pdf) |
| 2 | [行列と線形変換 — 複数の入力をまとめて変換する](https://university-math-crj.pages.dev/linear-algebra/matrices/) | [問題](https://university-math-crj.pages.dev/pdf/la-03-problems.pdf) | [解答](https://university-math-crj.pages.dev/pdf/la-03-solutions.pdf) |
| 3 | [連立方程式と掃き出し法 — 解の数まで見分ける](https://university-math-crj.pages.dev/linear-algebra/linear-systems/) | [問題](https://university-math-crj.pages.dev/pdf/la-04-problems.pdf) | [解答](https://university-math-crj.pages.dev/pdf/la-04-solutions.pdf) |
| 4 | [逆行列と正則性 — 元に戻せる変換の条件](https://university-math-crj.pages.dev/linear-algebra/inverse-matrices/) | [問題](https://university-math-crj.pages.dev/pdf/la-05-problems.pdf) | [解答](https://university-math-crj.pages.dev/pdf/la-05-solutions.pdf) |
| 5 | [行列式 — 面積の倍率と、つぶれる変換を見分ける](https://university-math-crj.pages.dev/linear-algebra/determinants/) | [問題](https://university-math-crj.pages.dev/pdf/la-06-problems.pdf) | [解答](https://university-math-crj.pages.dev/pdf/la-06-solutions.pdf) |
| 6 | [ベクトル空間と部分空間 — 作れるベクトルの範囲を知る](https://university-math-crj.pages.dev/linear-algebra/vector-spaces/) | [問題](https://university-math-crj.pages.dev/pdf/la-07-problems.pdf) | [解答](https://university-math-crj.pages.dev/pdf/la-07-solutions.pdf) |
| 7 | [基底と次元 — 座標と自由度を数える](https://university-math-crj.pages.dev/linear-algebra/basis-dimension/) | [問題](https://university-math-crj.pages.dev/pdf/la-08-problems.pdf) | [解答](https://university-math-crj.pages.dev/pdf/la-08-solutions.pdf) |
| 8 | [線形写像と基底変換 — 同じ変換を違う座標で表す](https://university-math-crj.pages.dev/linear-algebra/linear-maps/) | [問題](https://university-math-crj.pages.dev/pdf/la-09-problems.pdf) | [解答](https://university-math-crj.pages.dev/pdf/la-09-solutions.pdf) |
| 9 | [固有値・固有ベクトル — 連立微分方程式を「ばらばらに」解く道具](https://university-math-crj.pages.dev/linear-algebra/eigenvalues/) | [問題](https://university-math-crj.pages.dev/pdf/la-01-problems.pdf) | [解答](https://university-math-crj.pages.dev/pdf/la-01-solutions.pdf) |
| 10 | [対角化 — 混ざった計算を独立な成分に分ける](https://university-math-crj.pages.dev/linear-algebra/diagonalization/) | [問題](https://university-math-crj.pages.dev/pdf/la-10-problems.pdf) | [解答](https://university-math-crj.pages.dev/pdf/la-10-solutions.pdf) |
| 11 | [対称行列と直交対角化 — 長さを保つ座標で分解する](https://university-math-crj.pages.dev/linear-algebra/symmetric-matrices/) | [問題](https://university-math-crj.pages.dev/pdf/la-11-problems.pdf) | [解答](https://university-math-crj.pages.dev/pdf/la-11-solutions.pdf) |
| 12 | [直交射影と正規直交化 — 成分を取り出し、残りを測る](https://university-math-crj.pages.dev/linear-algebra/orthogonal-projection/) | [問題](https://university-math-crj.pages.dev/pdf/la-12-problems.pdf) | [解答](https://university-math-crj.pages.dev/pdf/la-12-solutions.pdf) |
| 13 | [最小二乗法 — ぴったり解けない方程式に最良の近似を求める](https://university-math-crj.pages.dev/linear-algebra/least-squares/) | [問題](https://university-math-crj.pages.dev/pdf/la-13-problems.pdf) | [解答](https://university-math-crj.pages.dev/pdf/la-13-solutions.pdf) |
| 14 | [二次形式と正定値 — エネルギーの形を固有値で読む](https://university-math-crj.pages.dev/linear-algebra/quadratic-forms/) | [問題](https://university-math-crj.pages.dev/pdf/la-14-problems.pdf) | [解答](https://university-math-crj.pages.dev/pdf/la-14-solutions.pdf) |
| 15 | [特異値分解 — 長方形行列の伸縮と情報の欠落を読む](https://university-math-crj.pages.dev/linear-algebra/singular-value-decomposition/) | [問題](https://university-math-crj.pages.dev/pdf/la-15-problems.pdf) | [解答](https://university-math-crj.pages.dev/pdf/la-15-solutions.pdf) |
| 16 | [線形システムとモード — 時間変化と安定性を読み解く](https://university-math-crj.pages.dev/linear-algebra/dynamical-systems/) | [問題](https://university-math-crj.pages.dev/pdf/la-16-problems.pdf) | [解答](https://university-math-crj.pages.dev/pdf/la-16-solutions.pdf) |

## 作成時の検証

- 全16章、各4問、計64問。問題・解答PDFは計32本、各2ページ。
- 例題・演習は `scripts/verify-linear-algebra.py` で有理数と記号計算を使い、210項目を検算。
- `npm run pdf` でXeLaTeXから生成。`npm run build` で静的エクスポート。
- `npm run verify:site` で、書き出された全23ページ・396本の内部リンク・全36本のPDF・sitemapを確認。GitHub Actionsにもこの検査を追加。
- 既存の微分積分・複素関数も含め、開発サーバーの全23ページを幅1280・390・360pxで確認（計69表示）。数式エラー・横はみ出し・画像の未読込なし。
- 全36本のサイト内PDFを取得し、HTTP 200とPDF形式を確認。線形代数の全64ページを画像化し、既存の固有値演習の改ページを修正。

これらの検証は、文章の教育的な質やすべての解釈を保証するものではありません。独立したレビューの指摘をもとに修正します。

2026-10-07のレビューに対する対応は [review-fixes-2026-10-08.md](review-fixes-2026-10-08.md) を参照してください。
