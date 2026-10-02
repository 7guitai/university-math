import Link from "next/link";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";
import rehypeKatex from "rehype-katex";
import { getArticle, getArticles } from "@/lib/content";
import { SUBJECTS, SITE, type SubjectKey } from "@/lib/site";
import { mdxComponents } from "@/components/Mdx";
import { SubjectTag } from "@/components/SubjectTag";
import { PdfLinks } from "@/components/PdfLinks";

export const dynamicParams = false;
export function generateStaticParams() {
  return getArticles().map((a) => ({ subject: a.subject, slug: a.slug }));
}

type P = { params: Promise<{ subject: string; slug: string }> };

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { subject, slug } = await params;
  const { meta } = getArticle(subject as SubjectKey, slug);
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: `${SITE.url}/${subject}/${slug}/` },
    openGraph: { title: meta.title, description: meta.description, type: "article" },
  };
}

export default async function ArticlePage({ params }: P) {
  const { subject, slug } = await params;
  const { meta, content } = getArticle(subject as SubjectKey, slug);
  const s = SUBJECTS[meta.subject];
  return (
    <article className="mx-auto max-w-[44rem] px-5 py-12">
      <nav className="text-sm text-[var(--sub)]">
        <Link href="/" className="hover:underline">トップ</Link>
        <span className="mx-2">/</span>
        <Link href={`/${subject}/`} className="hover:underline">{s.name}</Link>
      </nav>
      <div className="mt-6"><SubjectTag subject={meta.subject} /></div>
      <h1 className="mt-3 text-2xl font-bold leading-snug sm:text-3xl">{meta.title}</h1>
      <p className="mt-3 text-sm text-[var(--sub)]">更新日 {meta.updated}</p>

      <div className="article mt-10">
        <MDXRemote
          source={content}
          components={mdxComponents}
          options={{ mdxOptions: { remarkPlugins: [remarkMath, remarkGfm], rehypePlugins: [rehypeKatex] } }}
        />
      </div>

      {meta.pdf && (
        <section className="mt-16 border-2 border-[var(--ink)] bg-white p-6">
          <h2 className="text-lg font-bold">この記事の演習</h2>
          <p className="mt-2 text-sm leading-relaxed text-[var(--sub)]">
            A4で印刷して手で解くのがおすすめです。解答PDFには途中式まで載せています。
          </p>
          <div className="mt-5"><PdfLinks pdf={meta.pdf} /></div>
        </section>
      )}
    </article>
  );
}
