import Link from "next/link";
import { Sparkles } from "lucide-react";
import type { Metadata } from "next";
import JsonLd from "../../components/JsonLd";
import { INDEX_PAGES } from "../../lib/seo-route-presets";
import { buildTwoLevelSeoLayout } from "../../lib/section-seo";

const seo = buildTwoLevelSeoLayout(INDEX_PAGES.duaa);

export const metadata: Metadata = seo.metadata;

export default function DuaaPage() {
  return (
    <>
      <JsonLd data={seo.breadcrumbJsonLd} />
      <JsonLd data={seo.webPageJsonLd} />
      <section className="mx-auto w-full max-w-6xl px-4">
        <div className="glass-panel p-5 sm:p-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-white sm:text-3xl">الأدعية</h1>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                أدعية مأثورة مكتوبة كاملة من القرآن والسنة: تصفح{" "}
                <Link href="/duaa/jawami3" className="text-accent underline-offset-2 hover:underline">
                  جوامع الدعاء
                </Link>
                ، أو{" "}
                <Link href="/duaa/quranic" className="text-accent underline-offset-2 hover:underline">
                  الأدعية القرآنية
                </Link>
                ، أو{" "}
                <Link href="/duaa/anbiya" className="text-accent underline-offset-2 hover:underline">
                  أدعية الأنبياء
                </Link>{" "}
                مع عداد يسهّل الحفظ على AdkarMuslim.
              </p>
              <p className="mt-2 text-sm text-white/55">اختر البطاقة أدناه للبدء.</p>
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
