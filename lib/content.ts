import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { SUBJECT_ORDER, type SubjectKey } from "./site";

export type ArticleMeta = {
  subject: SubjectKey;
  slug: string;
  title: string;
  description: string;
  order: number;
  updated: string;
  pdf?: { problems: string; solutions: string; count: number };
};

const ROOT = path.join(process.cwd(), "content");

export function getArticles(subject?: SubjectKey): ArticleMeta[] {
  const subjects = subject ? [subject] : SUBJECT_ORDER;
  const list: ArticleMeta[] = [];
  for (const s of subjects) {
    const dir = path.join(ROOT, s);
    if (!fs.existsSync(dir)) continue;
    for (const file of fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"))) {
      const { data } = matter(fs.readFileSync(path.join(dir, file), "utf8"));
      list.push({ subject: s, slug: file.replace(/\.mdx$/, ""), ...(data as Omit<ArticleMeta, "subject" | "slug">) });
    }
  }
  return list.sort((a, b) =>
    a.subject === b.subject ? a.order - b.order : SUBJECT_ORDER.indexOf(a.subject) - SUBJECT_ORDER.indexOf(b.subject)
  );
}

export function getArticle(subject: SubjectKey, slug: string) {
  const file = path.join(ROOT, subject, `${slug}.mdx`);
  const { data, content } = matter(fs.readFileSync(file, "utf8"));
  return { meta: { subject, slug, ...(data as Omit<ArticleMeta, "subject" | "slug">) } as ArticleMeta, content };
}
