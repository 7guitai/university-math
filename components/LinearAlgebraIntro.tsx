import Link from "next/link";
import type { ArticleMeta } from "@/lib/content";
import { LINEAR_ALGEBRA_GROUPS, LINEAR_ALGEBRA_LESSONS } from "@/lib/linear-algebra";
import { PdfLinks } from "@/components/PdfLinks";

export function LinearAlgebraIntro({ articles }: { articles: ArticleMeta[] }) {
  const available = new Map(articles.map((a) => [a.slug, a]));
  return <section className="mt-8 space-y-10" aria-label="線形代数の学び方">
    <div className="border-l-4 border-[var(--c-la)] bg-white p-5 sm:p-6">
      <h2 className="text-xl font-bold">ベクトルから、工学で使える線形代数へ</h2>
      <p className="mt-3 leading-relaxed">高校数学から学ぶ基礎16章と、電気系の大学院入試に向けた補充16章。全{LINEAR_ALGEBRA_LESSONS.length}章に、定理・例題・確認問題・印刷できる演習と解答を用意しました。</p>
      <p className="mt-3 text-sm leading-relaxed text-[var(--sub)]">基礎では成分の読み方から近似と動的システムへ進みます。補充では3次以上の行列、証明、文字パラメータ、複素線形代数を詳しく学び、回路・制御・信号へつなげます。</p>
      <Link href="/linear-algebra/vectors/" className="mt-5 inline-block border-2 border-[var(--c-la)] px-4 py-3 font-bold text-[var(--c-la)] hover:bg-[var(--paper)]">第1章「ベクトルと内積」から始める →</Link>
    </div>
    <nav aria-label="目的から選ぶ" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {[ ["foundations", "基礎計算を固めたい", "第1〜8章"], ["modes", "固有値と工学の基礎", "第9〜16章"], ["exam-algebra", "院試の計算・証明", "第17〜24章"], ["exam-complex", "電気系の複素計算と応用", "第25〜32章"] ].map(([id, title, range]) => <a key={id} href={"#" + id} className="border border-[var(--rule)] p-4 hover:bg-white"><span className="block text-xs text-[var(--sub)]">{range}</span><span className="mt-2 block font-bold">{title} ↓</span></a>)}
    </nav>
    <aside className="border-l-4 border-[var(--c-la)] bg-white p-5">
      <h2 className="text-lg font-bold">電気系の院試に向けて</h2>
      <p className="mt-3 text-sm leading-relaxed">基礎を一通り学んだ方は第17章から。まず階数・空間・固有値の証明を固め、複素内積とHermite行列へ進みます。制御が出題されるなら第29・31章、容量や質量のあるモデルなら第30章、信号の周波数分解なら第26章を重点的に学んでください。</p>
      <p className="mt-3 text-sm leading-relaxed text-[var(--sub)]">標準的な線形代数と電気系の接続を広く扱います。受験先の公式範囲・過去問との照合は別途必要です。掲載問題はすべて自作で、特定大学の過去問を再現したものではありません。</p>
      <Link href="/linear-algebra/entrance-exam-practice/" className="mt-4 inline-block font-bold text-[var(--c-la)] underline">範囲の対応表と60分の総合演習へ →</Link>
    </aside>
    {LINEAR_ALGEBRA_GROUPS.map((group) => <section key={group.id} id={group.id} className="scroll-mt-6">
      <h2 className="text-xl font-bold">{group.title}</h2>
      <ol className="mt-4 space-y-4">
        {LINEAR_ALGEBRA_LESSONS.filter((a) => a.group === group.id).map((lesson) => {
          const article = available.get(lesson.slug);
          if (!article) return null;
          const number = LINEAR_ALGEBRA_LESSONS.indexOf(lesson) + 1;
          return <li key={lesson.slug} className="border border-[var(--rule)] bg-white p-5">
            <p className="text-xs font-bold text-[var(--c-la)]">第{number}章</p>
            <Link href={"/linear-algebra/" + lesson.slug + "/"} className="mt-2 block text-lg font-bold hover:underline">{article.title}</Link>
            <p className="mt-2 text-sm leading-relaxed text-[var(--sub)]">{lesson.goal}</p>
            {article.pdf && <div className="mt-4"><PdfLinks pdf={article.pdf} compact /></div>}
          </li>;
        })}
      </ol>
    </section>)}
    <aside className="border border-[var(--rule)] p-5">
      <h2 className="font-bold">演習の進め方</h2>
      <p className="mt-2 text-sm leading-relaxed text-[var(--sub)]">例題を手で追い、本文の確認問題を解いてから、演習PDFに進みましょう。解答では途中式と検算を確認できます。PDFの管理番号と章番号は異なるため、各章のリンクから開いてください。</p>
    </aside>
  </section>;
}
