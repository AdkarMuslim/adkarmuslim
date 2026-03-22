import { Amiri } from "next/font/google";
import Link from "next/link";
import type { Metadata } from "next";
import JsonLd from "../../components/JsonLd";
import { quranMushafFont } from "../../lib/quran-font";
import { getQuranApiSurahList } from "../../lib/quranapi";
import { INDEX_PAGES } from "../../lib/seo-route-presets";
import { buildTwoLevelSeoLayout } from "../../lib/section-seo";

const amiri = Amiri({ subsets: ["arabic"], weight: ["400", "700"] });

const seo = buildTwoLevelSeoLayout(INDEX_PAGES.quran);

export const metadata: Metadata = seo.metadata;

export default async function QuranPage() {
  const surahs = await getQuranApiSurahList();
  return (
    <>
      <JsonLd data={seo.breadcrumbJsonLd} />
      <JsonLd data={seo.webPageJsonLd} />
      <main className="mx-auto w-full max-w-4xl px-3 pb-28 sm:px-4">
        <section className="glass-panel ring-accent/0 p-5 sm:p-7">
        <h1 className={`text-2xl font-bold text-white sm:text-3xl ${amiri.className}`}>
          القرآن الكريم
        </h1>

        <p className="mt-3 text-sm leading-relaxed text-white/65">
          القرآن الكريم مكتوب كاملاً هنا: اختر سورة لعرض آياتها والاستماع للتلاوة، ثم انتقل لتفسير صوتي عند الحاجة.
          للأذكار والأدعية راجع{" "}
          <Link href="/adkar" className="text-accent underline-offset-2 hover:underline">
            الأذكار
          </Link>{" "}
          و{" "}
          <Link href="/duaa" className="text-accent underline-offset-2 hover:underline">
            الأدعية
          </Link>
          .
        </p>

        <Link
          href="/quran/tafsir"
          className="mt-4 inline-flex items-center rounded-2xl border border-accent/30 bg-accent/10 px-4 py-2.5 text-sm font-medium text-accent transition hover:bg-accent/20"
        >
          تفسير القرآن (صوت)
        </Link>

        <div className="mt-6 grid gap-3">
          {surahs.map((s, index) => {
            const no = index + 1;
            return (
              <Link
                key={`${s.surahName}-${no}`}
                href={`/quran/${no}`}
                className="block rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div
                      className={`text-lg font-semibold text-white ${quranMushafFont.className} quran-mushaf`}
                    >
                      <span className="inline-block text-right leading-relaxed">
                        {s.surahNameArabicLong}
                      </span>
                    </div>
                    <div className="mt-1 text-[11px] text-white/55">
                      عدد الآيات: {s.totalAyah}
                    </div>
                  </div>
                  <div className="shrink-0 rounded-full bg-white/5 px-3 py-1 text-xs font-bold text-accent ring-1 ring-white/10">
                    {no}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
        </section>
      </main>
    </>
  );
}
