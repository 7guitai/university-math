# math.ochanote.com — おちゃノート 工学数学

工学部向けの線形代数・微分積分・複素関数の解説と、演習PDF（問題・解答）を配布する静的サイト。
Next.js（静的エクスポート）+ MDX + KaTeX + Tailwind CSS v4、PDF は XeLaTeX で作成。

## ローカルで動かす

```bash
npm install
npm run dev          # http://localhost:3000
```

## 記事を追加する

1. `templates/article.mdx` を `content/<科目>/<slug>.mdx` にコピー
   - 科目フォルダ：`linear-algebra` / `calculus` / `complex`
2. frontmatter の `title`, `description`, `order`, `pdf` を書き換える
3. 本文で使える部品
   - `<Box kind="def|thm|ex|note" title="...">…</Box>` 定義・定理・例題・注意の枠
   - `<Answer>…</Answer>` クリックで開く解答
   - 数式は `$...$`（インライン）と `$$...$$`（別行立て）
   - 中身に数式を書くときは、`<Box>` の直後と `</Box>` の直前に空行を入れる

トップページ・科目ページ・PDF一覧・sitemap.xml には自動で反映されます。

## 演習PDFを作る

```
latex/
  common/ochamath.sty   共通スタイル（色・ヘッダー・問題番号・解答枠）
  src/xx-NN-problems.tex
  src/xx-NN-solutions.tex
  build.sh              src/*.tex をビルドして public/pdf/ に出力
```

```bash
npm run pdf          # XeLaTeX が必要（TeX Live / MacTeX）
```

- 科目色：線形代数 `2F5DA8` / 微分積分 `2E7D5B` / 複素関数 `7A4BA8`（`\subjectcolor{...}`）
- 問題側だけ `\namelinetrue` で学籍番号・氏名欄が出ます
- `\problem[小見出し]`、`\workspace{50mm}`（解答スペース）、`ans` 環境、`\point{...}`
- Overleaf で使う場合：`ochamath.sty` を同じプロジェクトに入れ、コンパイラを **XeLaTeX** に設定
- 命名規則：`la`=線形代数、`ca`=微分積分、`cx`=複素関数

**PDF は Git に含めてデプロイします**（Cloudflare Pages のビルド環境には TeX がないため）。

## Cloudflare Pages にデプロイ（math.ochanote.com）

1. このフォルダを GitHub リポジトリに push
2. Cloudflare ダッシュボード → Workers & Pages → 作成 → Pages → Git に接続
3. ビルド設定
   - フレームワーク：Next.js (Static HTML Export)
   - ビルドコマンド：`npm run build`
   - 出力ディレクトリ：`out`
   - 環境変数：`NODE_VERSION` = `22`
   - 本番ブランチ：`main`
   - ルートディレクトリ：空欄（このリポジトリ直下にサイトを配置）
4. デプロイ後、プロジェクトの「カスタムドメイン」で `math.ochanote.com` を追加
   - ochanote.com の DNS が Cloudflare にあれば CNAME は自動で作られます
   - 別の DNS サービスなら、`math` → `<プロジェクト名>.pages.dev` の CNAME を手動で追加

## Codexで更新する

GitHub リポジトリ：`7guitai/university-math`。Cloudflare Pages の Git 連携を一度設定すると、`main` への push でサイトが自動公開されます。

Codexでこのリポジトリを選び、「この記事を追加して」「この解説を修正して」のように更新内容を指示してください。Codexは `AGENTS.md` に従って修正し、演習を変更した場合は `npm run pdf` でPDFを再生成し、`npm run build` で確認します。GitHubへの反映まで希望する場合は「GitHubへの反映まで」と指示してください。PRで反映する場合は、`main` へのマージ後に本番が更新されます。

`.github/workflows/build.yml` は、PRと `main` へのpushで依存のインストールとビルドを確認します。このチェックはCloudflareのビルドとは独立しています。Cloudflare側の公開可否はPagesのデプロイ結果で確認してください。

PDFはGitHubに含め、Cloudflare側では生成しません。`node_modules/`、`.next/`、`out/`、`latex/build/` はGitHubに含めません。定期的な記事追加を行う場合は、更新対象・頻度・公開方法を決めてから別途設定します。

## 公開後にやること

- Google Search Console に `https://math.ochanote.com` を URL プレフィックスで登録し、`/sitemap.xml` を送信
- ochanote.com 本体のヘッダーやフッターから math.ochanote.com へリンク
- 本体と同じ GA4 プロパティに、サブドメイン用のデータストリームを追加（任意）

## 著作権について

問題は自作または改題のみ。教科書・過去問をそのまま載せない。
