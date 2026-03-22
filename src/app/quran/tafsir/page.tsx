import { Amiri } from "next/font/google";
import Link from "next/link";
import type { Metadata } from "next";
import JsonLd from "../../../components/JsonLd";
import TafsirPageClient from "../../../components/TafsirPageClient";
import { getAllTafsirData } from "../../../lib/tafsirapi";
import { getQuranApiSurahList } from "../../../lib/quranapi";
import { QURAN_CHILD_PAGES } from "../../../lib/seo-route-presets";
import { buildQuranChildSeoLayout } from "../../../lib/section-seo";

const amiri = Amiri({ subsets: ["arabic"], weight: ["400", "700"] });

const seo = buildQuranChildSeoLayout(QURAN_CHILD_PAGES.tafsir);

export const metadata: Metadata = seo.metadata;

export default async function TafsirPage({
  searchParams,
}: {
  /** Next.js 14: كائن عادي — ليس Promise (هاد الشكل كان يخربط بعض أدوات البناء) */
  searchParams: { surah?: string | string[] };
}) {
  const [tafsir, surahs] = await Promise.all([getAllTafsirData(), getQuranApiSurahList()]);
  const raw = searchParams?.surah;
  const surahParam = Array.isArray(raw) ? raw[0] : raw;
  const defaultSurah = Math.min(114, Math.max(1, Number(surahParam) || 1));
  return (
    <>
      <JsonLd data={seo.breadcrumbJsonLd} />
      <JsonLd data={seo.webPageJsonLd} />
      <JsonLd data={seo.articleJsonLd} />
      <main className="mx-auto w-full max-w-4xl px-3 pb-28 sm:px-4">
        <section className="glass-panel ring-accent/0 p-5 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <h1 className={`text-2xl font-bold text-white sm:text-3xl ${amiri.className}`}>
            تفسير القرآن
          </h1>
          <Link
            href="/quran"
            className="focus-ring inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 hover:bg-white/10"
          >
            القرآن الكريم
          </Link>
        </div>

        <p className="mt-3 text-sm leading-relaxed text-white/65">
          تفسير القرآن صوتياً: اختر السورة والمقطع المتاح للاستماع بترتيب واضح. للمصحف المكتوب راجع{" "}
          <Link href="/quran" className="text-accent underline-offset-2 hover:underline">
            القرآن الكريم
          </Link>
          .
        </p>

        <TafsirPageClient
          surahs={surahs.map((s, i) => ({ id: i + 1, name: s.surahNameArabicLong }))}
          sourceName={tafsir.sourceName}
          segmentsBySurah={tafsir.segmentsBySurah}
          defaultSurahId={defaultSurah}
        />
        </section>
      </main>
    </>
  );
}
