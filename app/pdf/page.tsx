import Link from "next/link";
import type { Metadata } from "next";
import { getArticles } from "@/lib/content";
import { SUBJECTS } from "@/lib/site";
import { SubjectTag } from "@/components/SubjectTag";

export const metadata: Metadata = {
  title: "演習PDF一覧",
  description: "線形代数・微分積分・複素関数の演習問題と解答PDFの一覧。",
};

export default function PdfIndex() {
  const list = getArticles().filter((a) => a.pdf);
  return (
    <div className="mx-auto max-w-4xl px-5 py-12">
      <h1 className="text-3xl font-bold">演習PDF一覧</h1>
      <p className="mt-4 leading-relaxed text-[var(--sub)]">
        すべて無料です。対応する解説記事を読んでから解くと、つまずいた箇所を戻って確認できます。
      </p>
      <div className="mt-10 overflow-x-auto">
        <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b-2 border-[var(--ink)]">
              <th className="py-2 pr-4">科目</th>
              <th className="py-2 pr-4">テーマ</th>
              <th className="py-2 pr-4">問題</th>
              <th className="py-2">解答</th>
            </tr>
          </thead>
          <tbody>
            {list.map((a) => (
              <tr key={a.slug} className="border-b border-[var(--rule)]">
                <td className="py-3 pr-4"><SubjectTag subject={a.subject} /></td>
                <td className="py-3 pr-4">
                  <Link href={`/${a.subject}/${a.slug}/`} className="hover:underline">{a.title}</Link>
                </td>
                <td className="py-3 pr-4">
                  <a href={a.pdf!.problems} download className="font-bold underline" style={{ color: SUBJECTS[a.subject].color }}>
                    {a.pdf!.count}問
                  </a>
                </td>
                <td className="py-3">
                  <a href={a.pdf!.solutions} download className="underline">解答</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
