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
  return <nav aria-label="章の移動" className="mt-10 grid gap-4 sm:grid-cols-2">
    <Link href={previous ? "/linear-algebra/" + previous.slug + "/" : "/linear-algebra/"} className="border border-[var(--rule)] bg-white p-5 hover:border-[var(--c-la)]">
      <span className="block text-xs text-[var(--sub)]">← {previous ? "前の章" : "学習順を見る"}</span>
      <span className="mt-2 block font-bold">{previous?.title ?? "線形代数の全16章"}</span>
    </Link>
    <Link href={next ? "/linear-algebra/" + next.slug + "/" : "/linear-algebra/"} className="border border-[var(--rule)] bg-white p-5 hover:border-[var(--c-la)]">
      <span className="block text-xs text-[var(--sub)]">{next ? "次の章" : "全章を振り返る"} →</span>
      <span className="mt-2 block font-bold">{next?.title ?? "線形代数の全16章"}</span>
    </Link>
  </nav>;
}
