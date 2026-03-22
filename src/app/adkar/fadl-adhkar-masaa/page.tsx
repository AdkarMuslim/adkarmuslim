import Link from "next/link";
import type { Metadata } from "next";
import ContentPageFooter from "../../../components/ContentPageFooter";
import JsonLd from "../../../components/JsonLd";
import SeoContentArticle from "../../../components/SeoContentArticle";
import { arSeoMeta } from "../../../lib/ar-seo-meta";
import { buildArticleJsonLd, buildBreadcrumbJsonLd, buildWebPageJsonLd } from "../../../lib/seo";

const PATH = "/adkar/fadl-adhkar-masaa";
const DESC =
  "فضل أذكار المساء: أهمية الذكر عند أول الليل وقبل النوم، وارتباطها بالحفظ والطمأنينة، مع روابط لأذكار المساء على أذكار المسلم.";

export const metadata: Metadata = arSeoMeta({
  title: "فضل أذكار المساء",
  absoluteTitle: "فضل أذكار المساء في السنة — دليل مختصر | AdkarMuslim",
  description: DESC,
  path: PATH,
  ogType: "article",
});

export default function FadlAdhkarMasaaPage() {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "الرئيسية", path: "/" },
    { name: "الأذكار", path: "/adkar" },
    { name: "فضل أذكار المساء", path: PATH },
  ]);
  const webPageJsonLd = buildWebPageJsonLd({
    path: PATH,
    name: "فضل أذكار المساء",
    description: DESC,
  });
  const articleJsonLd = buildArticleJsonLd({
    path: PATH,
    headline: "فضل أذكار المساء",
    description: DESC,
  });

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={webPageJsonLd} />
      <JsonLd data={articleJsonLd} />
      <SeoContentArticle
        title="فضل أذكار المساء"
        footer={
          <ContentPageFooter
            primaryLink={{ href: "/adkar", label: "فهرس الأذكار" }}
            related={[
              { href: "/adkar/massa", label: "أذكار المساء المكتوبة" },
              { href: "/adkar/sabah", label: "أذكار الصباح" },
              { href: "/adkar/nawm", label: "أذكار النوم" },
            ]}
            peerHub={{ href: "/duaa", label: "الأدعية" }}
          />
        }
      >
        <p>
          أذكار المساء تغلق يوم المسلم بذكر الله واستعاذة من سوء الختام، كما تمهّد للنوم بطمأنينة. لقراءة
          النصوص كاملة مع العدّ، افتح{" "}
          <Link href="/adkar/massa">صفحة أذكار المساء</Link>.
        </p>

        <h2>لماذا يخصّص الشرع ذكراً للمساء؟</h2>
        <p>
          اليوم ينقسم إلى أوقات؛ والمساء وقت تلتقي فيه نهاية الأعمال مع حاجة النفس إلى التوبة والشكر.
          الأذكار المسائية تذكّر العبد بنعم الله وتستره، وتعيد ترتيب القلب قبل الليل.
        </p>

        <h2>الربط بين المساء والنوم</h2>
        <p>
          كثيرٌ من أذكار المساء يواصلها المسلم حتى{" "}
          <Link href="/adkar/nawm">أذكار النوم</Link>. الجمع بينهما عادةٌ تسهّل الاستمرار دون قطع.
        </p>
        <ul>
          <li>الذكر بعد العصر والمغرب فرصة قبل انشغال الليل.</li>
          <li>التدرّب على العدّ يساعد على إتمام الأذكار دون إرهاق.</li>
          <li>مراجعة <Link href="/adkar/kaif-tuqra-adhkar">كيف تقرأ الأذكار</Link> يقلّل التشوّش أول الأمر.</li>
        </ul>

        <h2>مع أذكار الصباح</h2>
        <p>
          الصباح والمساء يكمل أحدهما الآخر في «حصن اليوم». اطّلع أيضاً على{" "}
          <Link href="/adkar/fadl-adhkar-sabah">فضل أذكار الصباح</Link> و{" "}
          <Link href="/adkar/sabah">أذكار الصباح المكتوبة</Link>.
        </p>

        <h3>تنبيه</h3>
        <p className="text-white/60">
          هذا النص إرشادي؛ لا يُعدّ فتوى. استشر عالماً موثوقاً عند السؤال عن وقت معيّن أو ركن من الأذكار.
        </p>
      </SeoContentArticle>
    </>
  );
}
