import Link from "next/link";
import type { Metadata } from "next";
import ContentPageFooter from "../../../components/ContentPageFooter";
import JsonLd from "../../../components/JsonLd";
import SeoContentArticle from "../../../components/SeoContentArticle";
import { arSeoMeta } from "../../../lib/ar-seo-meta";
import { buildArticleJsonLd, buildBreadcrumbJsonLd, buildWebPageJsonLd } from "../../../lib/seo";

const PATH = "/duaa/afdal-awqat-duaa";
const DESC =
  "أفضل أوقات الدعاء في السنة: السجود، آخر ساعة يوم الجمعة، الثلث الأخير من الليل، وبين الأذان والإقامة — مع روابط لأدعية مأثورة على أذكار المسلم.";

export const metadata: Metadata = arSeoMeta({
  title: "أفضل أوقات الدعاء",
  absoluteTitle: "أفضل أوقات الدعاء في السنة — دليل مختصر | AdkarMuslim",
  description: DESC,
  path: PATH,
  ogType: "article",
});

export default function AfdalAwqatDuaaPage() {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "الرئيسية", path: "/" },
    { name: "الأدعية", path: "/duaa" },
    { name: "أفضل أوقات الدعاء", path: PATH },
  ]);
  const webPageJsonLd = buildWebPageJsonLd({
    path: PATH,
    name: "أفضل أوقات الدعاء",
    description: DESC,
  });
  const articleJsonLd = buildArticleJsonLd({
    path: PATH,
    headline: "أفضل أوقات الدعاء",
    description: DESC,
  });

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={webPageJsonLd} />
      <JsonLd data={articleJsonLd} />
      <SeoContentArticle
        title="أفضل أوقات الدعاء"
        footer={
          <ContentPageFooter
            primaryLink={{ href: "/duaa", label: "فهرس الأدعية" }}
            related={[
              { href: "/duaa/jawami3", label: "جوامع الدعاء" },
              { href: "/duaa/quranic", label: "الأدعية القرآنية" },
              { href: "/prayer-times", label: "مواقيت الصلاة" },
            ]}
            peerHub={{ href: "/adkar", label: "الأذكار" }}
          />
        }
      >
        <p>
          الدعاء عبادةٌ يشرعها الله في كل وقت، وبعض الأوقات ازداد فيها فضل الاستجابة بذكرٍ في السنة. هذا
          الملخّص يساعدك على اغتنام الفرص دون أن يتحوّل الأمر إلى تعقيد؛ ولأدعية جاهزة راجع{" "}
          <Link href="/duaa/jawami3">جوامع الدعاء</Link> و<Link href="/duaa/quranic">الأدعية القرآنية</Link>.
        </p>

        <h2>في الصلاة: السجود</h2>
        <p>
          من أقرب ما يكون العبد من ربه وهو ساجد؛ فحريٌ بالمسلم أن يكثر من الدعاء في سجوده بصيغٍ مأثورة أو
          بما يعبر عن حاجته بلغته، مع حسن الأدب مع الله.
        </p>

        <h2>آخر الليل</h2>
        <p>
          الثلث الأخير من الليل وقتٌ ينزل فيه الرحمة وفيه يُستجاب للداعي بحسب مشيئة الله. من استطاع قياماً
          ولو قليلاً مع الوتر أو دعاء، فقد اغتنم وقتاً مباركاً. يمكنك الجمع بين ذلك و{" "}
          <Link href="/adkar/nawm">أذكار النوم</Link> لتنظيم نومك وعبادتك.
        </p>

        <h2>يوم الجمعة</h2>
        <p>
          لساعةٍ في الجمعة خصوصيةٌ عند أهل العلم؛ فاغتنم الجمعة بالصلاة على النبي <span className="text-white/55">ﷺ</span>{" "}
          والدعاء خاصة قبل انصراف الناس من الخطبة والصلاة، دون تضييق الوقت على نفسك بتحديدٍ لا يثبت عنك.
        </p>

        <h2>بين الأذان والإقامة</h2>
        <p>
          الدعاء عند سماع الأذان وبينه وبين الإقامة من الأوقات التي نُصّ على فضلها؛ ربطٌ جميل بين{" "}
          <Link href="/prayer-times">مواقيت الصلاة</Link> وقلبك.
        </p>

        <h3>خاتمة</h3>
        <p className="text-white/60">
          الأوقات المذكورة فضائلٌ لا تعني أن الدعاء في غيرها مردود؛ الله قريبٌ يجيب داعيه. للمسائل
          الدقيقة راجع عالماً موثوقاً.
        </p>
      </SeoContentArticle>
    </>
  );
}
