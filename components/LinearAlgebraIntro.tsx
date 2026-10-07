import Link from "next/link";

export function LinearAlgebraIntro() {
  return (
    <section className="mt-8 space-y-6" aria-label="線形代数の学び方">
      <div className="border-l-4 border-[var(--c-la)] bg-white p-5 sm:p-6">
        <h2 className="text-xl font-bold">ベクトルから、工学で使える線形代数へ</h2>
        <p className="mt-3 leading-relaxed">
          高校数学のベクトルや連立方程式を学んだ方に向けて、計算の手順と意味をつなげて説明します。
          最初の記事は、成分の読み方から始めます。微分方程式の知識は必要ありません。
        </p>
        <ul className="mt-4 list-disc space-y-1 pl-5 text-sm leading-relaxed text-[var(--sub)]">
          <li>ベクトル・行列の計算を自分で確かめられる</li>
          <li>答えの意味を図や言葉で説明できる</li>
          <li>力・回路・信号の問題を数式で表せる</li>
        </ul>
        <Link
          href="/linear-algebra/vectors/"
          className="mt-5 inline-block border-2 border-[var(--c-la)] px-4 py-3 font-bold text-[var(--c-la)] hover:bg-[var(--paper)]"
        >
          最初の記事「ベクトルと内積」へ →
        </Link>
      </div>
      <div>
        <h2 className="text-lg font-bold">これからの学習順</h2>
        <p className="mt-2 text-sm leading-relaxed text-[var(--sub)]">
          基礎から順に記事を追加します。読める記事にはリンクがあります。
        </p>
        <ol className="mt-4 grid gap-3 sm:grid-cols-2">
          <li className="border border-[var(--rule)] bg-white p-4">
            <p className="text-xs font-bold text-[var(--c-la)]">01 · 基礎</p>
            <Link href="/linear-algebra/vectors/" className="mt-1 block font-bold underline">ベクトルと内積</Link>
            <p className="mt-2 text-sm text-[var(--sub)]">成分、合成、長さ、角度、直交</p>
          </li>
          {[
            ["02", "行列と線形変換", "変換とその合成を行列で表す"],
            ["03", "連立方程式と掃き出し法", "解の求め方と、解の種類を見分ける方法"],
            ["04", "逆行列と正則性", "変換を元に戻せる条件"],
          ].map(([number, title, description]) => (
            <li key={number} className="border border-[var(--rule)] p-4">
              <p className="text-xs text-[var(--sub)]">{number} · 準備中</p>
              <p className="mt-1 font-bold">{title}</p>
              <p className="mt-2 text-sm text-[var(--sub)]">{description}</p>
            </li>
          ))}
        </ol>
      </div>
      <aside className="border border-[var(--rule)] p-5">
        <h2 className="font-bold">工学での使い道を先に見たい方へ</h2>
        <p className="mt-2 text-sm leading-relaxed text-[var(--sub)]">
          行列・行列式・微分方程式に触れたことがある方は、固有値の記事から、
          結合したシステムを独立な成分に分ける考え方を見てみましょう。
        </p>
        <Link href="/linear-algebra/eigenvalues/" className="mt-3 inline-block font-bold text-[var(--c-la)] underline">
          固有値・固有ベクトルの使い道を見る →
        </Link>
      </aside>
    </section>
  );
}
