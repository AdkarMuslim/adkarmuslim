import type { Metadata } from "next";
import JsonLd from "../../components/JsonLd";
import LegalArticle from "../../components/LegalArticle";
import { buildBreadcrumbJsonLd, buildWebPageJsonLd, SITE_NAME, SITE_URL } from "../../lib/seo";

export const metadata: Metadata = {
  title: "من نحن",
  description: `تعريف بموقع ${SITE_NAME} (AdkarMuslim.com) وأهدافه.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  const breadcrumb = buildBreadcrumbJsonLd([
    { name: "الرئيسية", path: "/" },
    { name: "من نحن", path: "/about" },
  ]);
  const webPage = buildWebPageJsonLd({
    path: "/about",
    name: "من نحن",
    description: `تعريف بموقع ${SITE_NAME}.`,
  });

  return (
    <>
      <JsonLd data={breadcrumb} />
      <JsonLd data={webPage} />
      <LegalArticle title="من نحن">
        <p>
          <strong className="text-white/90">{SITE_NAME}</strong> ({SITE_URL}) منصّة ويب تهدف إلى تسهيل
          تلاوة ومراجعة <strong className="text-white/90">الأذكار</strong>، وقراءة{" "}
          <strong className="text-white/90">القرآن الكريم</strong> مع التلاوة، والاطّلاع على{" "}
          <strong className="text-white/90">أدعية</strong> و<strong className="text-white/90">أحاديث</strong>{" "}
          منتقاة، و<strong className="text-white/90">مواقيت الصلاة</strong>، في واجهة عربية وبسيطة قدر
          الإمكان.
        </p>
        <p>
          نسعى لعرض المحتوى باحترام للنص الشرعي واللغة العربية، مع تجربة مناسبة للهاتف والحاسوب. المحتوى
          المعروض للتذكير والفائدة العامة، ولا يغني عن طلب العلم من جهاته المعتبرة عند الحاجة.
        </p>
        <p className="text-white/60">
          قد نحدّث الصفحات أو الميزات مع الوقت دون إشعار مسبق؛ يُرجى مراجعة{" "}
          <a href="/terms" className="text-accent underline-offset-2 hover:underline">
            شروط الاستخدام
          </a>{" "}
          و
          <a href="/privacy" className="text-accent underline-offset-2 hover:underline">
            {" "}
            سياسة الخصوصية
          </a>
          .
        </p>
      </LegalArticle>
    </>
  );
}
