import { Amiri } from "next/font/google";
import Link from "next/link";
import type { Metadata } from "next";
import JsonLd from "../../../components/JsonLd";
import TafsirPageClient from "../../../components/TafsirPageClient";
import { getAllTafsirData } from "../../../lib/tafsirapi";
import { getQuranApiSurahList } from "../../../lib/quranapi";
import { arSeoMeta } from "../../../lib/ar-seo-meta";
import { buildBreadcrumbJsonLd, buildWebPageJsonLd } from "../../../lib/seo";

const amiri = Amiri({ subsets: ["arabic"], weight: ["400", "700"] });

export const metadata: Metadata = arSeoMeta({
  title: "تفسير القرآن الصوتي",
  description:
    "استمع لتفسير مقاطع من سور القرآن: اختر السورة والمقطع المتاح، بتجربة عربية بسيطة وواضحة.",
  path: "/quran/tafsir",
});

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
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "الرئيسية", path: "/" },
    { name: "القرآن الكريم", path: "/quran" },
    { name: "تفسير القرآن الصوتي", path: "/quran/tafsir" },
  ]);
  const webPageJsonLd = buildWebPageJsonLd({
    path: "/quran/tafsir",
    name: "تفسير القرآن الصوتي",
    description:
      "استمع لتفسير مقاطع من سور القرآن: اختر السورة والمقطع المتاح، بتجربة عربية بسيطة وواضحة.",
  });

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={webPageJsonLd} />
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

        <p className="mt-2 text-sm text-white/60">
          اختر سورة للاستماع لتفسيرها الصوتي.
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
