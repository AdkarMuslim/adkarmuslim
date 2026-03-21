import Link from "next/link";
import { Sparkles } from "lucide-react";
import type { Metadata } from "next";
import JsonLd from "../../components/JsonLd";
import { buildBreadcrumbJsonLd, buildWebPageJsonLd } from "../../lib/seo";

export const metadata: Metadata = {
  title: "الأدعية",
  description: "أدعية مختارة: جوامع الدعاء، الأدعية القرآنية، وأدعية الأنبياء.",
  alternates: {
    canonical: "/duaa",
  },
};

export default function DuaaPage() {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "الرئيسية", path: "/" },
    { name: "الأدعية", path: "/duaa" },
  ]);
  const webPageJsonLd = buildWebPageJsonLd({
    path: "/duaa",
    name: "الأدعية",
    description: "أدعية مختارة: جوامع الدعاء، الأدعية القرآنية، وأدعية الأنبياء.",
  });

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={webPageJsonLd} />
      <section className="mx-auto w-full max-w-6xl px-4">
        <div className="glass-panel p-5 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white sm:text-3xl">الأدعية</h1>
            <p className="mt-2 text-sm text-white/60">تصفح فئات الأدعية المختارة.</p>
          </div>
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/20 text-accent">
            <Sparkles className="h-5 w-5" />
          </span>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <Link href="/duaa/jawami3" className="glass-card p-5 transition hover:-translate-y-1">
            <div className="text-xs text-white/55">فئة الأدعية</div>
            <div className="mt-1 text-lg font-semibold text-white">جوامع الدعاء</div>
            <div className="mt-3 text-sm text-white/60">أدعية جامعة من السنة.</div>
          </Link>

          <Link href="/duaa/quranic" className="glass-card p-5 transition hover:-translate-y-1">
            <div className="text-xs text-white/55">فئة الأدعية</div>
            <div className="mt-1 text-lg font-semibold text-white">الأدعية القرآنية</div>
            <div className="mt-3 text-sm text-white/60">أدعية من آيات القرآن الكريم.</div>
          </Link>

          <Link href="/duaa/anbiya" className="glass-card p-5 transition hover:-translate-y-1">
            <div className="text-xs text-white/55">فئة الأدعية</div>
            <div className="mt-1 text-lg font-semibold text-white">أدعية الأنبياء</div>
            <div className="mt-3 text-sm text-white/60">أدعية الأنبياء من القرآن الكريم.</div>
          </Link>
        </div>
        </div>
      </section>
    </>
  );
}

