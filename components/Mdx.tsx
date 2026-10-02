import type { ReactNode } from "react";

const LABEL = { def: "定義", thm: "定理", ex: "例題", note: "工学ではここに注意" } as const;

export function Box({ kind, title, children }: { kind: keyof typeof LABEL; title?: string; children: ReactNode }) {
  return (
    <aside className={`box box-${kind}`}>
      <p className="box-title">{title ? `${LABEL[kind]}　${title}` : LABEL[kind]}</p>
      <div>{children}</div>
    </aside>
  );
}

export function Answer({ children }: { children: ReactNode }) {
  return (
    <details className="answer">
      <summary>解答を見る</summary>
      <div>{children}</div>
    </details>
  );
}

export const mdxComponents = { Box, Answer };
