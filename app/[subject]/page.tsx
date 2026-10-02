import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getArticles } from "@/lib/content";
import { SUBJECTS, SUBJECT_ORDER, type SubjectKey } from "@/lib/site";
import { PdfLinks } from "@/components/PdfLinks";

export const dynamicParams = false;
export function generateStaticParams() {
  return SUBJECT_ORDER.map((subject) => ({ subject }));
}

type P = { params: Promise<{ subject: string }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { subject } = await params;
  const s = SUBJECTS[subject as SubjectKey];
  return { title: `${s.name}の解説と演習`, description: s.lead };
}

export default async function SubjectPage({ params }: P) {
  const { subject } = await params;
  const s = SUBJECTS[subject as SubjectKey];
  if (!s) notFound();
  const list = getArticles(subject as SubjectKey);
  return (
    <div className="mx-auto max-w-3xl px-5 py-12">
      <h1 className="text-3xl font-bold" style={{ color: s.color }}>{s.name}</h1>
      <p className="mt-4 leading-relaxed text-[var(--sub)]">{s.lead}</p>
      <ol className="mt-10 space-y-10">
        {list.map((a) => (
          <li key={a.slug} className="border-t border-[var(--rule)] pt-6">
            <Link href={`/${subject}/${a.slug}/`} className="text-xl font-bold hover:underline">{a.title}</Link>
            <p className="mt-2 text-sm leading-relaxed text-[var(--sub)]">{a.description}</p>
            {a.pdf && <div className="mt-4"><PdfLinks pdf={a.pdf} compact /></div>}
          </li>
        ))}
      </ol>
    </div>
  );
}
