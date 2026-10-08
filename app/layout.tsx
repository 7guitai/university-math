import type { Metadata } from "next";
import Link from "next/link";
import "katex/dist/katex.min.css";
import "./globals.css";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: SITE.name, template: `%s | ${SITE.name}` },
  description: SITE.description,
  alternates: { canonical: SITE.url + "/" },
  openGraph: { siteName: SITE.name, locale: "ja_JP", type: "website", url: SITE.url + "/" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@400;700&family=Zen+Kaku+Gothic+New:wght@400;700&display=swap"
        />
      </head>
      <body className="min-h-screen">
        <header className="border-b border-[var(--rule)]">
          <div className="mx-auto flex max-w-5xl flex-col gap-2 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
            <Link href="/" className="whitespace-nowrap text-lg font-bold tracking-wide">
              おちゃノート<span className="ml-1 text-[var(--sub)]">工学数学</span>
            </Link>
            <nav className="-mx-1 flex gap-5 overflow-x-auto whitespace-nowrap px-1 text-sm">
              <Link href="/linear-algebra/" className="hover:underline">線形代数</Link>
              <Link href="/calculus/" className="hover:underline">微分積分</Link>
              <Link href="/complex/" className="hover:underline">複素関数</Link>
              <Link href="/pdf/" className="font-bold hover:underline">演習PDF</Link>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="mt-24 border-t border-[var(--rule)]">
          <div className="mx-auto max-w-5xl px-5 py-8 text-sm text-[var(--sub)]">
            <p>
              演習PDFは個人の学習・授業の予習復習に自由に使えます。再配布や販売はご遠慮ください。
            </p>
            <p className="mt-2">
              <a href={SITE.parent} className="underline">ochanote.com に戻る</a>
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
