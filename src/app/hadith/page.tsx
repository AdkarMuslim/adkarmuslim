import Link from "next/link";
import type { Metadata } from "next";
import { getHadithCollectionMeta } from "../../lib/hadith";
import JsonLd from "../../components/JsonLd";
import { arSeoMeta } from "../../lib/ar-seo-meta";
import { buildBreadcrumbJsonLd, buildWebPageJsonLd } from "../../lib/seo";

const COLLECTIONS = ["bukhari", "muslim"] as const;

export const metadata: Metadata = arSeoMeta({
  title: "الحديث النبوي الشريف",
  description:
    "صحيح البخاري وصحيح مسلم: تصفح الأحاديث برقم الحديث، اقرأ النص بوضوح، وتنقّل بين الصحيحين بسهولة.",
  path: "/hadith",
});

export default function HadithCollectionsPage() {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "الرئيسية", path: "/" },
    { name: "الحديث", path: "/hadith" },
  ]);
  const webPageJsonLd = buildWebPageJsonLd({
    path: "/hadith",
    name: "الحديث النبوي الشريف",
    description:
      "صحيح البخاري وصحيح مسلم: تصفح الأحاديث برقم الحديث، اقرأ النص بوضوح، وتنقّل بين الصحيحين بسهولة.",
  });

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={webPageJsonLd} />
      <main className="mx-auto w-full max-w-4xl px-3 pb-28 sm:px-4">
        <section className="glass-panel ring-accent/0 p-5 sm:p-7">
        <h1 className="text-2xl font-bold text-white sm:text-3xl">الحديث</h1>
        <p className="mt-2 text-sm text-white/60">اختر كتاب الحديث الذي تريد قراءته.</p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {COLLECTIONS.map((id) => {
            const meta = getHadithCollectionMeta(id);
            return (
              <Link
                key={id}
                href={`/hadith/${id}`}
                className="glass-card p-5 transition hover:-translate-y-1"
              >
                <div className="text-xs text-white/55">كتب الحديث</div>
                <div className="mt-1 text-lg font-semibold text-white">{meta.title}</div>
              </Link>
            );
          })}
        </div>
        </section>
      </main>
    </>
  );
}

