import { Amiri } from "next/font/google";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ContentPageFooter from "../../../components/ContentPageFooter";
import JsonLd from "../../../components/JsonLd";
import QuranMushafView from "../../../components/QuranMushafView";
import SurahRecitationPicker from "../../../components/SurahRecitationPicker";
import { arSeoMeta } from "../../../lib/ar-seo-meta";
import { quranMushafFont } from "../../../lib/quran-font";
import { getConfiguredQuranApiReciterId, getQuranApiChapter } from "../../../lib/quranapi";
import { buildArticleJsonLd, buildBreadcrumbJsonLd, buildWebPageJsonLd } from "../../../lib/seo";

const amiri = Amiri({ subsets: ["arabic"], weight: ["400", "700"] });

function surahMetaDescription(surahName: string, surahNumber: number): string {
  return surahName
    ? `اقرأ سورة ${surahName} كاملة بخط واضح، غيّر القارئ، واستمع للتلاوة. رابط مباشر لتفسير هذه السورة صوتياً على أذكار المسلم.`
    : `السورة ${surahNumber} من القرآن الكريم — قراءة آيات، تلاوة، وتفسير صوتي.`;
}

export async function generateMetadata({
  params,
}: {
  params: { surah: string };
}): Promise<Metadata> {
  const surahNumber = Number(params.surah);
  if (!Number.isFinite(surahNumber) || surahNumber < 1 || surahNumber > 114) {
    return arSeoMeta({
      title: "القرآن الكريم",
      description:
        "رابط السورة غير صحيح على أذكار المسلم. ارجع إلى فهرس القرآن أو اختر سورة من القائمة.",
      path: `/quran/${params.surah}`,
      index: false,
    });
  }
  const chapter = await getQuranApiChapter(surahNumber);
  const surahName = chapter?.surahNameArabicLong ?? "";
  const title = surahName ? `سورة ${surahName}` : `سورة ${surahNumber}`;
  const description = surahMetaDescription(surahName, surahNumber);

  return arSeoMeta({
    title,
    description,
    path: `/quran/${surahNumber}`,
    ogType: "article",
  });
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
  const description = surahMetaDescription(chapter.surahNameArabicLong, surahNumber);
  const path = `/quran/${surahNumber}`;

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "الرئيسية", path: "/" },
    { name: "القرآن الكريم", path: "/quran" },
    { name: chapter.surahNameArabicLong, path },
  ]);
  const webPageJsonLd = buildWebPageJsonLd({
    path,
    name: chapter.surahNameArabicLong,
    description,
  });
  const articleJsonLd = buildArticleJsonLd({
    path,
    headline: chapter.surahNameArabicLong,
    description,
  });

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={webPageJsonLd} />
      <JsonLd data={articleJsonLd} />
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

          <p className="mt-3 text-sm leading-relaxed text-white/65">
            اقرأ نص السورة كاملاً هنا، واختر قارئاً مختلفاً أو استمع للتلاوة. للتفسير الصوتي لهذه السورة استخدم
            الرابط أسفل المشغّل.
          </p>

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

          <ContentPageFooter
            primaryLink={{ href: "/quran", label: "فهرس السور" }}
            related={[
              { href: `/quran/tafsir?surah=${surahNumber}`, label: "تفسير هذه السورة" },
              { href: "/adkar", label: "الأذكار" },
              { href: "/duaa", label: "الأدعية" },
            ]}
          />
        </section>
      </main>
    </>
  );
}
