import type { Metadata } from "next";
import Link from "next/link";
import { searchSite } from "../../lib/search-index";

export const metadata: Metadata = {
  title: "بحث",
  description: "البحث في أقسام أذكار المسلم.",
  robots: { index: false, follow: true },
};

type Props = {
  searchParams: Record<string, string | string[] | undefined>;
};

export default function SearchPage({ searchParams }: Props) {
  const raw = searchParams.q;
  const q = typeof raw === "string" ? raw : Array.isArray(raw) ? raw[0] ?? "" : "";
  const results = searchSite(q);

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-8">
      <h1 className="text-xl font-semibold text-white/95">نتائج البحث</h1>
      {q.trim() ? (
        <p className="mt-2 text-sm text-white/55">
          «{q.trim()}» — {results.length} نتيجة
        </p>
      ) : (
        <p className="mt-2 text-sm text-white/55">أدخل كلمة في شريط البحث أعلاه.</p>
      )}

      <ul className="mt-6 space-y-2">
        {results.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="glass-panel block rounded-xl border border-white/10 px-4 py-3 text-white/90 transition hover:border-accent/40 hover:text-accent"
            >
              <span className="font-medium">{item.title}</span>
            </Link>
          </li>
        ))}
      </ul>

      {q.trim() && results.length === 0 ? (
        <p className="mt-8 text-center text-sm text-white/50">لا توجد نتائج. جرّب كلمات أخرى.</p>
      ) : null}
    </div>
  );
}
