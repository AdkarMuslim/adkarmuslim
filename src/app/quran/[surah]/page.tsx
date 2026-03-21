import { Amiri } from "next/font/google";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import QuranMushafView from "../../../components/QuranMushafView";
import SurahRecitationPicker from "../../../components/SurahRecitationPicker";
import { quranMushafFont } from "../../../lib/quran-font";
import { getConfiguredQuranApiReciterId, getQuranApiChapter } from "../../../lib/quranapi";

const amiri = Amiri({ subsets: ["arabic"], weight: ["400", "700"] });

export async function generateMetadata({
  params,
}: {
  params: { surah: string };
}): Promise<Metadata> {
  const surahNumber = Number(params.surah);
  if (!Number.isFinite(surahNumber) || surahNumber < 1 || surahNumber > 114) {
    return { title: "القرآن الكريم" };
  }
  const chapter = await getQuranApiChapter(surahNumber);
  const title = chapter?.surahNameArabicLong
    ? `سورة ${chapter.surahNameArabicLong}`
    : `سورة ${surahNumber}`;
  return {
    title,
    description: "قراءة آيات السورة والاستماع لتلاوتها مع رابط مباشر إلى التفسير الصوتي.",
    alternates: {
      canonical: `/quran/${surahNumber}`,
    },
  };
}

export default async function QuranSurahPage({
  params,
}: {
  params: { surah: string };
}) {
  const surahNumber = Number(params.surah);
  if (!Number.isFinite(surahNumber) || surahNumber < 1 || surahNumber > 114) {
    notFound();
  }

  const chapter = await getQuranApiChapter(surahNumber);
  if (!chapter) notFound();

  const serverDefaultReciterId = getConfiguredQuranApiReciterId();

  return (
    <main className="mx-auto w-full max-w-4xl px-3 pb-28 sm:px-4">
      <section className="glass-panel ring-accent/0 p-5 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h1 className={`text-2xl font-bold text-white sm:text-3xl ${amiri.className}`}>
              {chapter.surahNameArabicLong}
            </h1>
            <div className="mt-1 text-[11px] text-white/55">{chapter.totalAyah} آية</div>
          </div>

          <Link
            href="/quran"
            className="focus-ring inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 hover:bg-white/10"
          >
            القرآن الكريم
          </Link>
        </div>

        <SurahRecitationPicker
          audio={chapter.audio}
          serverDefaultReciterId={serverDefaultReciterId}
        />

        <Link
          href={`/quran/tafsir?surah=${surahNumber}`}
          className="mt-4 inline-flex items-center rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 transition hover:bg-white/10"
        >
          تفسير هذه السورة (صوت)
        </Link>

        <QuranMushafView
          arabic={chapter.arabic1}
          english={chapter.english}
          mushafFontClassName={quranMushafFont.className}
        />
      </section>
    </main>
  );
}
