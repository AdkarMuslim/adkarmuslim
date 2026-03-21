import type { Metadata } from "next";
import JsonLd from "../../components/JsonLd";
import { buildBreadcrumbJsonLd, buildFaqJsonLd, buildWebPageJsonLd } from "../../lib/seo";

export const metadata: Metadata = {
  title: "مواقيت الصلاة",
  description:
    "مواقيت الصلاة حسب موقعك أو المدينة، مع اختيار طريقة الحساب الأنسب تلقائيا.",
  alternates: {
    canonical: "/prayer-times",
  },
};

export default function PrayerTimesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "الرئيسية", path: "/" },
    { name: "مواقيت الصلاة", path: "/prayer-times" },
  ]);
  const webPageJsonLd = buildWebPageJsonLd({
    path: "/prayer-times",
    name: "مواقيت الصلاة",
    description: "مواقيت الصلاة حسب موقعك أو المدينة، مع اختيار طريقة الحساب الأنسب تلقائيا.",
  });
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
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={webPageJsonLd} />
      <JsonLd data={faqJsonLd} />
      {children}
    </>
  );
}
