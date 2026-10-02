import type { ArticleMeta } from "@/lib/content";

export function PdfLinks({ pdf, compact = false }: { pdf: NonNullable<ArticleMeta["pdf"]>; compact?: boolean }) {
  const btn =
    "inline-flex items-center gap-2 border-2 border-[var(--ink)] px-4 py-2 font-bold transition-colors hover:bg-[var(--ink)] hover:text-white";
  return (
    <div className={`flex flex-wrap gap-3 ${compact ? "text-sm" : ""}`}>
      <a className={btn} href={pdf.problems} download>
        演習問題PDF（{pdf.count}問）
      </a>
      <a className={`${btn} border-dashed`} href={pdf.solutions} download>
        解答PDF
      </a>
    </div>
  );
}
