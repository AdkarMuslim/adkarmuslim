import Link from "next/link";
import type { Metadata } from "next";
import { getHadithCollectionMeta } from "../../lib/hadith";
import JsonLd from "../../components/JsonLd";
import { INDEX_PAGES } from "../../lib/seo-route-presets";
import { buildTwoLevelSeoLayout } from "../../lib/section-seo";

const COLLECTIONS = ["bukhari", "muslim"] as const;

const seo = buildTwoLevelSeoLayout(INDEX_PAGES.hadith);

export const metadata: Metadata = seo.metadata;

export default function HadithCollectionsPage() {
  return (
    <>
      <JsonLd data={seo.breadcrumbJsonLd} />
      <JsonLd data={seo.webPageJsonLd} />
      <main className="mx-auto w-full max-w-4xl px-3 pb-28 sm:px-4">
        <section className="glass-panel ring-accent/0 p-5 sm:p-7">
        <h1 className="text-2xl font-bold text-white sm:text-3xl">الحديث النبوي</h1>
        <p className="mt-3 text-sm leading-relaxed text-white/65">
          صحيح البخاري وصحيح مسلم: أحاديث مكتوبة كاملة برقم الحديث لتسهيل البحث والمراجعة. للقرآن والأذكار راجع{" "}
          <Link href="/quran" className="text-accent underline-offset-2 hover:underline">
            المصحف
          </Link>{" "}
          و{" "}
          <Link href="/adkar" className="text-accent underline-offset-2 hover:underline">
            الأذكار
          </Link>
          .
        </p>
        <p className="mt-2 text-sm text-white/55">اختر الكتاب أدناه.</p>

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

