import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getHadithCollection,
  getHadithCollectionMeta,
  isHadithCollectionId,
} from "../../../../lib/hadith";

export async function generateMetadata({
  params,
}: {
  params: { collection: string; hadithNumber: string };
}): Promise<Metadata> {
  if (!isHadithCollectionId(params.collection)) return { title: "الحديث" };
  const hadithNo = Number.parseInt(params.hadithNumber, 10);
  const meta = getHadithCollectionMeta(params.collection);
  return {
    title: `حديث ${Number.isFinite(hadithNo) ? hadithNo : params.hadithNumber} - ${meta.title}`,
    description: `قراءة نص حديث من ${meta.title} مع ترقيم واضح وسهولة الانتقال بين الأحاديث.`,
    alternates: {
      canonical: `/hadith/${params.collection}/${params.hadithNumber}`,
    },
  };
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
  return (
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

        <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
          <p className="whitespace-pre-line text-lg leading-9 text-white/95">{hadith.text}</p>
        </div>
      </section>
    </main>
  );
}

