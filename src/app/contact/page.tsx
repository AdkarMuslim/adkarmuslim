import type { Metadata } from "next";
import JsonLd from "../../components/JsonLd";
import LegalArticle from "../../components/LegalArticle";
import { buildBreadcrumbJsonLd, buildWebPageJsonLd } from "../../lib/seo";
import { SITE_NAME, SITE_URL } from "../../lib/seo";

const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || "contact@adkarmuslim.com";

export const metadata: Metadata = {
  title: "اتصل بنا",
  description: `طرق التواصل مع ${SITE_NAME}.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const breadcrumb = buildBreadcrumbJsonLd([
    { name: "الرئيسية", path: "/" },
    { name: "اتصل بنا", path: "/contact" },
  ]);
  const webPage = buildWebPageJsonLd({
    path: "/contact",
    name: "اتصل بنا",
    description: `طرق التواصل مع ${SITE_NAME}.`,
  });

  return (
    <>
      <JsonLd data={breadcrumb} />
      <JsonLd data={webPage} />
      <LegalArticle title="اتصل بنا">
        <p>
          لأي استفسار بخصوص <strong className="text-white/90">{SITE_NAME}</strong> أو اقتراح تحسين، يمكنك
          مراسلتنا عبر البريد الإلكتروني:
        </p>
        <p className="rounded-2xl border border-accent/25 bg-accent/10 px-4 py-3 text-center">
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-base font-semibold text-accent underline-offset-2 hover:underline"
          >
            {CONTACT_EMAIL}
          </a>
        </p>
        <p className="text-white/55">
          يُفضّل ذكر <strong className="text-white/75">موضوع الرسالة</strong> بوضوح (مثلاً: خطأ في نص،
          اقتراح ميزة، مشكلة تقنية). نحاول الرد عند التوفيق، دون التزام بمدة محددة.
        </p>
        <p className="text-white/50">
          الموقع:{" "}
          <a href={SITE_URL} className="text-accent underline-offset-2 hover:underline">
            {SITE_URL.replace(/^https?:\/\//, "")}
          </a>
        </p>
      </LegalArticle>
    </>
  );
}
