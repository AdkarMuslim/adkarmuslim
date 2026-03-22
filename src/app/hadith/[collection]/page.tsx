import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JsonLd from "../../../components/JsonLd";
import {
  getHadithCollection,
  getHadithCollectionMeta,
  isHadithCollectionId,
} from "../../../lib/hadith";
import { arSeoMeta } from "../../../lib/ar-seo-meta";
import { buildBreadcrumbJsonLd, buildWebPageJsonLd } from "../../../lib/seo";

const PAGE_SIZE = 30;

const HADITH_INDEX_LABEL = "الحديث النبوي";

function invalidHadithCollectionMeta(collectionSlug: string): Metadata {
  return arSeoMeta({
    title: "الحديث النبوي",
    absoluteTitle: "الحديث النبوي - أذكار المسلم",
    description:
      "رابط كتاب الحديث غير صحيح على أذكار المسلم. ارجع إلى صفحة كتب الحديث النبوي أو اختر صحيح البخاري أو صحيح مسلم.",
    path: `/hadith/${collectionSlug}`,
    index: false,
  });
}

export async function generateMetadata({
  params,
}: {
  params: { collection: string };
}): Promise<Metadata> {
  if (!isHadithCollectionId(params.collection)) {
    return invalidHadithCollectionMeta(params.collection);
  }
  const meta = getHadithCollectionMeta(params.collection);
  return arSeoMeta({
    title: meta.title,
    description: `تصفح أحاديث ${meta.title} برقم الحديث: نص واضح، ترقيم دقيق، وتنقّل سهل بين الصفحات على أذكار المسلم.`,
    path: `/hadith/${params.collection}`,
  });
}

export default async function HadithCollectionPage({
  params,
  searchParams,
}: {
  params: { collection: string };
  searchParams?: { page?: string };
}) {
  if (!isHadithCollectionId(params.collection)) notFound();
  const collection = params.collection;
  const meta = getHadithCollectionMeta(collection);

  const pageDescription = `تصفح أحاديث ${meta.title} برقم الحديث: نص واضح، ترقيم دقيق، وتنقّل سهل بين الصفحات على أذكار المسلم.`;
  const path = `/hadith/${collection}`;

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "الرئيسية", path: "/" },
    { name: HADITH_INDEX_LABEL, path: "/hadith" },
    { name: meta.title, path },
  ]);
  const webPageJsonLd = buildWebPageJsonLd({
    path,
    name: meta.title,
    description: pageDescription,
  });

  const all = await getHadithCollection(collection);
  if (!all.length) {
    return (
      <>
        <JsonLd data={breadcrumbJsonLd} />
        <JsonLd data={webPageJsonLd} />
        <main className="mx-auto w-full max-w-4xl px-3 pb-28 sm:px-4">
          <section className="glass-panel p-5 sm:p-7">
            <h1 className="text-2xl font-bold text-white">{meta.title}</h1>
            <p className="mt-3 text-sm leading-relaxed text-white/65">
              هذه الصفحة مخصّصة لعرض أحاديث {meta.title} برقم كل حديث لتسهيل المراجعة. إذا لم يُحمَّل النص،
              جرّب لاحقاً أو تأكد من الاتصال.
            </p>
            <p className="mt-3 text-sm text-white/60">تعذّر تحميل الأحاديث حالياً.</p>
          </section>
        </main>
      </>
    );
  }

  const page = Math.max(1, Number.parseInt(searchParams?.page ?? "1", 10) || 1);
  const totalPages = Math.max(1, Math.ceil(all.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * PAGE_SIZE;
  const items = all.slice(start, start + PAGE_SIZE);

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={webPageJsonLd} />
      <main className="mx-auto w-full max-w-4xl px-3 pb-28 sm:px-4">
        <section className="glass-panel ring-accent/0 p-5 sm:p-7">
          <div className="flex items-center justify-between gap-3">
            <h1 className="text-2xl font-bold text-white sm:text-3xl">{meta.title}</h1>
            <Link href="/hadith" className="text-sm text-accent hover:underline">
              كتب الحديث
            </Link>
          </div>

          <p className="mt-3 text-sm leading-relaxed text-white/65">
            هنا أحاديث {meta.title} مرتّبة برقم الحديث لتسهيل الرجوع والاقتباس. انقر على أي رقم لقراءة النص
            كاملاً والتنقّل بين الأحاديث المجاورة.
          </p>

          <div className="mt-2 text-xs text-white/55">
            صفحة {currentPage} / {totalPages} — إجمالي الأحاديث: {all.length}
          </div>

          <div className="mt-5 space-y-3">
            {items.map((h) => (
              <Link
                key={h.hadith_number}
                href={`/hadith/${collection}/${h.hadith_number}`}
                className="block rounded-2xl border border-white/10 bg-white/5 p-4 hover:bg-white/10"
              >
                <div className="text-xs text-white/55">حديث {h.hadith_number}</div>
                <p className="mt-2 line-clamp-3 text-base leading-8 text-white/90">{h.text}</p>
              </Link>
            ))}
          </div>

          <div className="mt-5 flex items-center justify-between gap-2">
            <Link
              href={`/hadith/${collection}?page=${Math.max(1, currentPage - 1)}`}
              className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/80 hover:bg-white/10"
            >
              الصفحة السابقة
            </Link>
            <Link
              href={`/hadith/${collection}?page=${Math.min(totalPages, currentPage + 1)}`}
              className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/80 hover:bg-white/10"
            >
              الصفحة التالية
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
