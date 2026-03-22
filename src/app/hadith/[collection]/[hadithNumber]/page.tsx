import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JsonLd from "../../../../components/JsonLd";
import {
  getHadithCollection,
  getHadithCollectionMeta,
  isHadithCollectionId,
} from "../../../../lib/hadith";
import { arSeoMeta } from "../../../../lib/ar-seo-meta";
import { buildArticleJsonLd, buildBreadcrumbJsonLd, buildWebPageJsonLd } from "../../../../lib/seo";

const HADITH_INDEX_LABEL = "الحديث النبوي";

function invalidHadithCollectionMeta(collectionSlug: string, hadithNumberSegment: string): Metadata {
  return arSeoMeta({
    title: "الحديث النبوي",
    absoluteTitle: "الحديث النبوي - أذكار المسلم",
    description:
      "رابط الحديث أو كتاب الحديث غير صحيح على أذكار المسلم. ارجع إلى صفحة كتب الحديث النبوي أو اختر حديثاً من القائمة.",
    path: `/hadith/${collectionSlug}/${hadithNumberSegment}`,
    index: false,
  });
}

function invalidHadithNumberMeta(
  collectionSlug: string,
  hadithNumberSegment: string,
  bookTitle: string,
): Metadata {
  return arSeoMeta({
    title: `حديث — ${bookTitle}`,
    description:
      "رقم الحديث غير صحيح. ارجع إلى صفحة الكتاب أو اختر رقماً من القائمة على أذكار المسلم.",
    path: `/hadith/${collectionSlug}/${hadithNumberSegment}`,
    index: false,
  });
}

export async function generateMetadata({
  params,
}: {
  params: { collection: string; hadithNumber: string };
}): Promise<Metadata> {
  if (!isHadithCollectionId(params.collection)) {
    return invalidHadithCollectionMeta(params.collection, params.hadithNumber);
  }
  const meta = getHadithCollectionMeta(params.collection);
  const hadithNo = Number.parseInt(params.hadithNumber, 10);
  if (!Number.isFinite(hadithNo)) {
    return invalidHadithNumberMeta(params.collection, params.hadithNumber, meta.title);
  }
  const label = hadithNo;
  return arSeoMeta({
    title: `حديث ${label} — ${meta.title}`,
    description: `نص الحديث رقم ${label} من ${meta.title} بصياغة مقروءة؛ تنقّل سريع للأحاديث المجاورة على أذكار المسلم.`,
    path: `/hadith/${params.collection}/${params.hadithNumber}`,
    ogType: "article",
  });
}

export default async function HadithDetailPage({
  params,
}: {
  params: { collection: string; hadithNumber: string };
}) {
  if (!isHadithCollectionId(params.collection)) notFound();
  const collection = params.collection;
  const hadithNumber = Number.parseInt(params.hadithNumber, 10);
  if (!Number.isFinite(hadithNumber)) notFound();

  const all = await getHadithCollection(collection);
  const hadith = all.find((h) => h.hadith_number === hadithNumber);
  if (!hadith) notFound();

  const meta = getHadithCollectionMeta(collection);
  const path = `/hadith/${collection}/${hadith.hadith_number}`;
  const description = `نص الحديث رقم ${hadith.hadith_number} من ${meta.title} بصياغة مقروءة؛ تنقّل سريع للأحاديث المجاورة على أذكار المسلم.`;
  const headline = `حديث ${hadith.hadith_number} — ${meta.title}`;

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "الرئيسية", path: "/" },
    { name: HADITH_INDEX_LABEL, path: "/hadith" },
    { name: meta.title, path: `/hadith/${collection}` },
    { name: `حديث ${hadith.hadith_number}`, path },
  ]);
  const webPageJsonLd = buildWebPageJsonLd({
    path,
    name: headline,
    description,
  });
  const articleJsonLd = buildArticleJsonLd({
    path,
    headline,
    description,
  });

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={webPageJsonLd} />
      <JsonLd data={articleJsonLd} />
      <main className="mx-auto w-full max-w-4xl px-3 pb-28 sm:px-4">
        <section className="glass-panel ring-accent/0 p-5 sm:p-7">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold text-white">حديث {hadith.hadith_number}</h1>
              <div className="mt-1 text-xs text-white/55">{meta.title}</div>
            </div>
            <Link href={`/hadith/${collection}`} className="text-sm text-accent hover:underline">
              {meta.title}
            </Link>
          </div>

          <p className="mb-4 text-sm leading-relaxed text-white/65">
            فيما يلي نص الحديث رقم {hadith.hadith_number} من {meta.title} كما عُرض في الموقع للقراءة والمراجعة.
            للعودة إلى قائمة الأحاديث استخدم رابط الكتاب أعلاه.
          </p>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="whitespace-pre-line text-lg leading-9 text-white/95">{hadith.text}</p>
          </div>
        </section>
      </main>
    </>
  );
}
