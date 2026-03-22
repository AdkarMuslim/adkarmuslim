import type { Metadata } from "next";
import JsonLd from "../../components/JsonLd";
import { INDEX_PAGES } from "../../lib/seo-route-presets";
import { buildTwoLevelSeoLayout } from "../../lib/section-seo";
import { buildFaqJsonLd } from "../../lib/seo";

const seo = buildTwoLevelSeoLayout(INDEX_PAGES.prayerTimes);

export const metadata: Metadata = seo.metadata;

export default function PrayerTimesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const faqJsonLd = buildFaqJsonLd([
    {
      question: "كيف يتم تحديد طريقة الحساب الأنسب تلقائيا؟",
      answer:
        "يتم تحليل موقع المستخدم عبر GPS ثم اختيار أقرب طريقة حساب جغرافيا من طرق الحساب المعتمدة.",
    },
    {
      question: "هل يمكن تغيير طريقة الحساب يدويا؟",
      answer: "نعم، يمكنك اختيار طريقة حساب مختلفة من القائمة وسيتم تحديث الأوقات مباشرة.",
    },
    {
      question: "ماذا لو تم رفض إذن الموقع؟",
      answer:
        "يمكنك إدخال المدينة والدولة يدويا وسيتم جلب مواقيت الصلاة وفق الإعدادات المختارة.",
    },
  ]);

  return (
    <>
      <JsonLd data={seo.breadcrumbJsonLd} />
      <JsonLd data={seo.webPageJsonLd} />
      <JsonLd data={faqJsonLd} />
      {children}
    </>
  );
}
