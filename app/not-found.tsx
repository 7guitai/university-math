import Link from "next/link";
export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-24">
      <h1 className="text-2xl font-bold">ページが見つかりません</h1>
      <p className="mt-4">URLが変わった可能性があります。<Link href="/" className="underline">トップ</Link>から記事を探してください。</p>
    </div>
  );
}
