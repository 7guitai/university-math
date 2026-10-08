import Link from "next/link";
import { LINEAR_ALGEBRA_LESSONS as lessons } from "@/lib/linear-algebra";

export function LinearAlgebraPrerequisites({ slug }: { slug: string }) {
  const index = lessons.findIndex((a) => a.slug === slug);
  if (index < 0) return null;
  const lesson = lessons[index];
  return <aside className="mt-6 border-l-4 border-[var(--c-la)] bg-white p-4 text-sm">
    <p className="font-bold text-[var(--c-la)]">第{index + 1}章 / 全{lessons.length}章</p>
    <p className="mt-2 leading-relaxed">{lesson.goal}</p>
    {lesson.prerequisites.length > 0 && <p className="mt-3 leading-loose text-[var(--sub)]">先に確認：{lesson.prerequisites.map((slug, i) => {
      const previous = lessons.find((a) => a.slug === slug)!;
      return <span key={slug}>{i > 0 && " ・ "}<Link className="underline" href={"/linear-algebra/" + slug + "/"}>{previous.title}</Link></span>;
    })}</p>}
  </aside>;
}

export function LinearAlgebraNavigation({ slug }: { slug: string }) {
  const index = lessons.findIndex((a) => a.slug === slug);
  if (index < 0) return null;
  const previous = lessons[index - 1], next = lessons[index + 1];
  return <>
    <nav aria-label="章の移動" className="mt-10 grid gap-4 sm:grid-cols-2">
      {previous && <Link rel="prev" href={"/linear-algebra/" + previous.slug + "/"} className="border border-[var(--rule)] bg-white p-5 hover:border-[var(--c-la)]">
        <span className="block text-xs text-[var(--sub)]">← 前の章</span>
        <span className="mt-2 block font-bold">{previous.title}</span>
      </Link>}
      {next && <Link rel="next" href={"/linear-algebra/" + next.slug + "/"} className={"border border-[var(--rule)] bg-white p-5 hover:border-[var(--c-la)]" + (!previous ? " sm:col-start-2" : "")}>
        <span className="block text-xs text-[var(--sub)]">次の章 →</span>
        <span className="mt-2 block font-bold">{next.title}</span>
      </Link>}
    </nav>
    <Link href="/linear-algebra/" className="mt-4 inline-block text-sm font-bold text-[var(--c-la)] underline">全16章の学習順に戻る</Link>
  </>;
}
