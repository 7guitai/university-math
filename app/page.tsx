import Link from "next/link";
import katex from "katex";
import { getArticles } from "@/lib/content";
import { SUBJECTS, SUBJECT_ORDER } from "@/lib/site";
import { PdfLinks } from "@/components/PdfLinks";

const euler = katex.renderToString(String.raw`e^{j\omega t}=\cos\omega t+j\sin\omega t`, {
  displayMode: true,
  output: "html",
});


function PhasorFigure() {
  // 角度 θ=50° の回転ベクトルと、その実部（cos 波）への射影
  const r = 70, cx = 90, cy = 110, th = (50 * Math.PI) / 180;
  const px = cx + r * Math.cos(th), py = cy - r * Math.sin(th);
  const wave = Array.from({ length: 121 }, (_, i) => {
    const t = (i / 120) * 2 * Math.PI;
    return `${200 + (i / 120) * 220},${cy - r * Math.sin(t + th)}`;
  }).join(" ");
  return (
    <svg viewBox="0 0 440 220" className="h-auto w-full" role="img" aria-label="複素平面上を回るベクトルと、その成分が描く正弦波">
      <line x1={cx - 85} y1={cy} x2={cx + 85} y2={cy} stroke="var(--sub)" strokeWidth="1" />
      <line x1={cx} y1={cy - 85} x2={cx} y2={cy + 85} stroke="var(--sub)" strokeWidth="1" />
      <text x={cx + 78} y={cy + 16} fontSize="12" fill="var(--sub)">Re</text>
      <text x={cx + 6} y={cy - 74} fontSize="12" fill="var(--sub)">Im</text>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--ink)" strokeWidth="1.5" />
      <line x1={cx} y1={cy} x2={px} y2={py} stroke="var(--c-cx)" strokeWidth="3" />
      <circle cx={px} cy={py} r="5" fill="var(--c-cx)" />
      <line x1={px} y1={py} x2={200} y2={py} stroke="var(--c-cx)" strokeWidth="1" strokeDasharray="4 4" />
      <line x1={200} y1={cy} x2={425} y2={cy} stroke="var(--sub)" strokeWidth="1" />
      <polyline points={wave} fill="none" stroke="var(--ink)" strokeWidth="2" />
      <circle cx={200} cy={py} r="4" fill="var(--c-cx)" />
      <text x={cx + 18} y={cy - 8} fontSize="13" fill="var(--c-cx)" fontStyle="italic">ωt</text>
      <text x={428} y={cy + 16} fontSize="12" fill="var(--sub)" textAnchor="end">t</text>
    </svg>
  );
}

export default function Home() {
  const articles = getArticles();
  return (
    <>
      <section className="graph-paper border-b border-[var(--rule)]">
        <div className="mx-auto grid max-w-5xl gap-10 px-5 py-16 sm:py-24 lg:grid-cols-[1fr_24rem] lg:items-center">
          <div>
          <h1 className="max-w-2xl text-3xl font-bold leading-snug sm:text-5xl sm:leading-tight">
            工学部の数学を、
            <br />
            回路と信号の言葉で。
          </h1>
          <div
            className="mt-10 inline-block max-w-full overflow-x-auto bg-white/80 px-6 py-2 text-xl sm:text-3xl"
            dangerouslySetInnerHTML={{ __html: euler }}
          />
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-[var(--sub)]">
            電気系では虚数単位を i ではなく j と書きます（i は電流に使うため）。このサイトの記号もそれに合わせています。
          </p>
          <p className="mt-8 max-w-xl leading-relaxed">
            線形代数・微分積分・複素関数を、「工学のどこで使うか」から解説します。各記事には演習問題と解答のPDFが付いています。
          </p>
          </div>
          <figure className="bg-white/80 p-4">
            <PhasorFigure />
            <figcaption className="mt-2 text-xs leading-relaxed text-[var(--sub)]">
              回る矢印の高さを時間に沿って描くと正弦波になる。交流回路の計算はこの矢印の計算です。
            </figcaption>
          </figure>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-5">
        {SUBJECT_ORDER.map((key) => {
          const s = SUBJECTS[key];
          const list = articles.filter((a) => a.subject === key);
          return (
            <section key={key} className="border-b border-[var(--rule)] py-12 sm:grid sm:grid-cols-[14rem_1fr] sm:gap-10">
              <div>
                <h2 className="text-2xl font-bold" style={{ color: s.color }}>
                  <Link href={`/${key}/`} className="hover:underline">{s.name}</Link>
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-[var(--sub)]">{s.lead}</p>
              </div>
              <ul className="mt-6 space-y-8 sm:mt-0">
                {list.map((a) => (
                  <li key={a.slug}>
                    <Link href={`/${a.subject}/${a.slug}/`} className="text-lg font-bold hover:underline">
                      {a.title}
                    </Link>
                    <p className="mt-1 text-sm leading-relaxed text-[var(--sub)]">{a.description}</p>
                    {a.pdf && (
                      <div className="mt-3">
                        <PdfLinks pdf={a.pdf} compact />
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </>
  );
}
