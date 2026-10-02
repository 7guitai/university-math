# AGENTS.md — math.ochanote.com

工学部向け数学（線形代数・微分積分・複素関数）の解説と演習PDF配布サイト。
Next.js 15 静的エクスポート + MDX + KaTeX + Tailwind v4。PDF は XeLaTeX。

## コマンド
- 依存インストール: `npm install`
- 開発サーバー: `npm run dev`
- 本番ビルド: `npm run build`（出力は `out/`）
- 演習PDF: `npm run pdf`（`latex/src/*.tex` → `public/pdf/`、XeLaTeX が必要）

## 作業ルール
- 作業後は必ず `npm run build` が通ることを確認する。
- 記事は `content/<linear-algebra|calculus|complex>/<slug>.mdx`。雛形は `templates/article.mdx`。
- frontmatter の `pdf` のパスと `public/pdf/` の実ファイル名を必ず一致させる。
- PDF は `latex/src/<la|ca|cx>-NN-problems.tex` と `-solutions.tex` の対で作る。共通スタイルは `latex/common/ochamath.sty` を使い、独自にプリアンブルを増やさない。
- 生成した PDF は `public/pdf/` ごとコミットする（Cloudflare Pages 側に TeX がないため）。
- 虚数単位は `j`。フェーザの大きさは最大値で統一。
- MDX の本文で `{` `}` `<` は数式の中以外で使わない（MDX の構文と衝突する）。
- `<Box>` の中に数式を書くときは、開始タグの直後と終了タグの直前に空行を入れる。
- 問題は自作か改題のみ。教科書・過去問の転載はしない。
- 数式・数値を書いたら必ず検算し、解答PDFと記事の答えが一致しているか確認する。

## やってはいけないこと
- `.env` や認証情報をコミットしない。
- `wrangler pages deploy` やリモートへの `git push` はユーザーの指示があるときだけ実行する。
