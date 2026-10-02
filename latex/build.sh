#!/usr/bin/env bash
# 演習PDFをビルドして public/pdf/ に置く
# 使い方: npm run pdf  （XeLaTeX が必要。Overleaf ではコンパイラを XeLaTeX に設定）
set -euo pipefail
cd "$(dirname "$0")"
mkdir -p build ../public/pdf
export TEXINPUTS="$(pwd)/common//:"
for f in src/*.tex; do
  name=$(basename "$f" .tex)
  echo "▶ $name"
  latexmk -xelatex -interaction=nonstopmode -halt-on-error -outdir=build "$f" >/dev/null
  cp "build/$name.pdf" "../public/pdf/$name.pdf"
done
echo "完了：public/pdf/ に $(ls src/*.tex | wc -l | tr -d ' ') 個のPDF"
