import Link from "next/link";
import type { Metadata } from "next";
import ContentPageFooter from "../../../components/ContentPageFooter";
import JsonLd from "../../../components/JsonLd";
import SeoContentArticle from "../../../components/SeoContentArticle";
import { arSeoMeta } from "../../../lib/ar-seo-meta";
import { buildArticleJsonLd, buildBreadcrumbJsonLd, buildWebPageJsonLd } from "../../../lib/seo";

const PATH = "/adkar/fadl-adhkar-sabah";
const DESC =
  "فضل أذكار الصباح في السنة: أهمية الذكر بعد الفجر، وربطه بالحفظ والبركة، مع روابط لأذكار الصباح المكتوبة على أذكار المسلم.";

export const metadata: Metadata = arSeoMeta({
  title: "فضل أذكار الصباح",
  absoluteTitle: "فضل أذكار الصباح في السنة — دليل مختصر | AdkarMuslim",
  description: DESC,
  path: PATH,
  ogType: "article",
});

export default function FadlAdhkarSabahPage() {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "الرئيسية", path: "/" },
    { name: "الأذكار", path: "/adkar" },
    { name: "فضل أذكار الصباح", path: PATH },
  ]);
  const webPageJsonLd = buildWebPageJsonLd({
    path: PATH,
    name: "فضل أذكار الصباح",
    description: DESC,
  });
  const articleJsonLd = buildArticleJsonLd({
    path: PATH,
    headline: "فضل أذكار الصباح",
    description: DESC,
  });

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={webPageJsonLd} />
      <JsonLd data={articleJsonLd} />
      <SeoContentArticle
        title="فضل أذكار الصباح"
        footer={
          <ContentPageFooter
            primaryLink={{ href: "/adkar", label: "فهرس الأذكار" }}
            related={[
              { href: "/adkar/sabah", label: "أذكار الصباح المكتوبة" },
              { href: "/adkar/massa", label: "أذكار المساء" },
              { href: "/duaa/jawami3", label: "جوامع الدعاء" },
            ]}
            peerHub={{ href: "/duaa", label: "الأدعية" }}
          />
        }
      >
        <p>
          أذكار الصباح جُمعت في السنة من أذكار وأدعية ينطق بها المسلم في بداية نهاره، قرباً من الله وتذكيراً
          واستعاذة. هذا المقال تذكيرٌ بفضل الذكر لا يغني عن الاطلاع على{" "}
          <Link href="/adkar/sabah">صفحة أذكار الصباح</Link> لقراءة النصوص كاملة مع العدّ.
        </p>

        <h2>مكانة الذكر في بداية النهار</h2>
        <p>
          شرع الإسلام أذكاراً مخصّصة لأوقات من اليوم؛ وصباح المسلم بعد صلاة الفجر فرصة يتجدّد فيها القلب
          بالذكر قبل انشغال النهار. الالتزام بها عادةٌ يحبّها الله، وتربط العبد بالتسبيح والاستغفار والدعاء
          بصيغٍ ثابتة عن النبي <span className="text-white/55">ﷺ</span>.
        </p>

        <h2>أثرها على القلب واليوم</h2>
        <p>
          الذكر ليس مجرد تكرار بلا معنى؛ المتعمّد يجمع بين اللسان والقلب قدر استطاعته. مراجعة{" "}
          <Link href="/adkar/kaif-tuqra-adhkar">كيف تقرأ الأذكار</Link> تساعد على الاستمرار بطريقة صحيحة
          ومريحة.
        </p>
        <ul>
          <li>تثبيت العبد على التوحيد والاستعاذة من الشر.</li>
          <li>ملء الفراغ الصباحي بما ينفع الآخرة قبل الشواغل.</li>
          <li>ربط يومك بما حفظته من السنة خطوة بخطوة.</li>
        </ul>

        <h2>بعد الصباح: أذكار المساء</h2>
        <p>
          يكمل المسلم يومه بأذكار المساء؛ راجع{" "}
          <Link href="/adkar/fadl-adhkar-masaa">فضل أذكار المساء</Link> و{" "}
          <Link href="/adkar/massa">أذكار المساء المكتوبة</Link> لمواصلة الحصن اليومي.
        </p>

        <h3>خلاصة</h3>
        <p className="text-white/60">
          المحتوى للتذكير العام؛ للأحكام التفصيلية والحالات الخاصة يرجى الرجوع لأهل العلم المعتبرين.
        </p>
      </SeoContentArticle>
    </>
  );
}
