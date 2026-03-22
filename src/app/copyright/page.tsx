import type { Metadata } from "next";
import JsonLd from "../../components/JsonLd";
import LegalArticle from "../../components/LegalArticle";
import { arSeoMeta } from "../../lib/ar-seo-meta";
import { buildBreadcrumbJsonLd, buildWebPageJsonLd, SITE_NAME, SITE_URL } from "../../lib/seo";

const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || "contact@adkarmuslim.com";

export const metadata: Metadata = arSeoMeta({
  title: "حقوق النشر والعلامة",
  description: `حقوق النشر والعلامة التجارية لـ ${SITE_NAME} وAdkarMuslim.com — الاستخدام، الاقتباس، والتواصل.`,
  path: "/copyright",
});

export default function CopyrightPage() {
  const year = new Date().getFullYear();
  const breadcrumb = buildBreadcrumbJsonLd([
    { name: "الرئيسية", path: "/" },
    { name: "حقوق النشر", path: "/copyright" },
  ]);
  const webPage = buildWebPageJsonLd({
    path: "/copyright",
    name: "حقوق النشر",
    description: `حقوق النشر لموقع ${SITE_NAME}.`,
  });

  return (
    <>
      <JsonLd data={breadcrumb} />
      <JsonLd data={webPage} />
      <LegalArticle title="حقوق النشر">
        <h2 className="text-lg font-semibold text-white/90">الملكية الفكرية</h2>
        <p>
          محتوى التصميم، التنسيق، الشعار (إن وُجد)، والبرمجة الخاصة بموقع{" "}
          <strong className="text-white/90">{SITE_NAME}</strong> على النطاق{" "}
          <strong className="text-white/90">AdkarMuslim.com</strong> محمي وفق القوانين المعمول بها. جميع
          الحقوق محفوظة © {year}.
        </p>
        <p>
          النصوص القرآنية والأدعية والأذكار والأحاديث المعروضة هي من المصادر الشرعية المعروفة؛ نسعى
          لذكر المصدر عند الحاجة. أي خطأ غير مقصود يُرجى الإبلاغ عنه عبر{" "}
          <a href="/contact" className="text-accent underline-offset-2 hover:underline">
            اتصل بنا
          </a>
          .
        </p>

        <h2 className="pt-4 text-lg font-semibold text-white/90">إشعار انتهاك حقوق النشر (DMCA)</h2>
        <p>
          إذا كنت تعتقد أن مادة على {SITE_URL} تنتهك حقوقك، أرسل إلينا رسالة واضحة إلى البريد أدناه،
          مع ذكر «دعم قانوني» أو «copyright» في عنوان الرسالة، وتضمين — قدر الإمكان — ما يلي:
        </p>
        <ol className="list-decimal space-y-2 pr-5 text-white/70">
          <li>توقيعك (إلكتروني أو واضح) بصفتك مالك الحق أو مفوّضاً عنه.</li>
          <li>تحديد العمل المحمي الذي تدّعي انتهاكه.</li>
          <li>رابط أو وصف دقيق للمادة على موقعنا.</li>
          <li>بيانات التواصل معك (بريد، هاتف إن أمكن).</li>
          <li>تأكيد حسن النية بأن الاستخدام غير مصرّح به.</li>
          <li>تأكيد صحة المعلومات تحت مسؤوليتك.</li>
        </ol>
        <p className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
          البريد:{" "}
          <a href={`mailto:${CONTACT_EMAIL}?subject=copyright`} className="font-medium text-accent hover:underline">
            {CONTACT_EMAIL}
          </a>
        </p>
      </LegalArticle>
    </>
  );
}
