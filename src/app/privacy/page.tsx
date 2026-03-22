import type { Metadata } from "next";
import JsonLd from "../../components/JsonLd";
import LegalArticle from "../../components/LegalArticle";
import { arSeoMeta } from "../../lib/ar-seo-meta";
import { buildBreadcrumbJsonLd, buildWebPageJsonLd, SITE_NAME, SITE_URL } from "../../lib/seo";

const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || "contact@adkarmuslim.com";

export const metadata: Metadata = arSeoMeta({
  title: "سياسة الخصوصية",
  description: `سياسة الخصوصية لـ ${SITE_NAME} (AdkarMuslim.com): البيانات، الكوكيز، والاستخدامات — شفافية وبساطة.`,
  path: "/privacy",
});

export default function PrivacyPage() {
  const breadcrumb = buildBreadcrumbJsonLd([
    { name: "الرئيسية", path: "/" },
    { name: "سياسة الخصوصية", path: "/privacy" },
  ]);
  const webPage = buildWebPageJsonLd({
    path: "/privacy",
    name: "سياسة الخصوصية",
    description: `سياسة الخصوصية لموقع ${SITE_NAME}.`,
  });

  return (
    <>
      <JsonLd data={breadcrumb} />
      <JsonLd data={webPage} />
      <LegalArticle title="سياسة الخصوصية">
        <p>
          نلتزم في <strong className="text-white/90">{SITE_NAME}</strong> ({SITE_URL}) باحترام خصوصيتك.
          توضّح هذه الصفحة — باختصار — ما الذي قد يُجمع أو يُخزَّن عند استخدام الموقع.
        </p>

        <h2 className="text-lg font-semibold text-white/90">الموافقة</h2>
        <p>
          باستخدامك للموقع، فإنك تقر بقراءة هذه السياسة. إن لم توافق، يُرجى التوقف عن الاستخدام.
        </p>

        <h2 className="text-lg font-semibold text-white/90">البيانات المحلية (المتصفح)</h2>
        <p>
          قد يخزّن الموقع بعض الإعدادات أو تقدّمك في الأذكار (مثل العداد) داخل{" "}
          <strong className="text-white/90">متصفحك فقط</strong> (localStorage). لا نرسل هذه البيانات
          تلقائياً إلى خوادمنا كجزء من تسجيل حساب — الموقع لا يفرض إنشاء حساب لاستخدامه الأساسي.
        </p>

        <h2 className="text-lg font-semibold text-white/90">الاستضافة والسجلات</h2>
        <p>
          عند زيارة الموقع، قد تسجّل شركة الاستضافة (مثل Vercel) بيانات تقنية معيارية مثل عنوان IP
          تقريبي، نوع المتصفح، وقت الطلب، وصفحة الإحالة. تُستخدم غالباً لأمن الخدمة وإصلاح الأعطال
          وإحصاءات مجمّعة، وليس لتحديد هويتك بشكل مباشر في أغلب الحالات.
        </p>

        <h2 className="text-lg font-semibold text-white/90">الخطوط والمحتوى الخارجي</h2>
        <p>
          قد نحمّل خطوطاً عربية عبر خدمات مثل Google Fonts لتحسين العرض. قد يطّلع مزوّد الخط على طلب
          الشبكة وفق سياساته. كما قد يُستدعى محتوى من واجهات برمجية خارجية (مثل نصوص القرآن) عند تصفح
          الصفحات المعنية؛ تخضع تلك الطلبات لسياسات الأطراف المعنية.
        </p>

        <h2 className="text-lg font-semibold text-white/90">ملفات تعريف الارتباط (Cookies)</h2>
        <p>
          قد نستخدم ملفات cookies أو تقنيات مشابهة لضمان عمل الموقع أو للتحليلات إن فُعّلت لاحقاً. يمكنك
          تقييد الـ cookies من إعدادات متصفحك.
        </p>

        <h2 className="text-lg font-semibold text-white/90">التواصل</h2>
        <p>
          لأسئلة الخصوصية:{" "}
          <a href={`mailto:${CONTACT_EMAIL}?subject=privacy`} className="text-accent hover:underline">
            {CONTACT_EMAIL}
          </a>{" "}
          أو صفحة{" "}
          <a href="/contact" className="text-accent hover:underline">
            اتصل بنا
          </a>
          .
        </p>
      </LegalArticle>
    </>
  );
}
