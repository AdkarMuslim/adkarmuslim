import type { Metadata } from "next";

const SITE = "أذكار المسلم";

/**
 * Metadata عربية موحّدة: canonical، Open Graph، Twitter، وفهرسة اختيارية.
 * - بدون `absoluteTitle`: العنوان يُكمَّل بقالب الجذر «… | أذكار المسلم».
 * - مع `absoluteTitle`: عنوان ثابت كما هو (مثلاً لإضافة - AdkarMuslim).
 */
export function arSeoMeta(opts: {
  title: string;
  description: string;
  path: string;
  /** افتراضي: فهرسة مفعّلة. عطّلها لصفحات «قريباً» أو حساسة. */
  index?: boolean;
  /** يتجاوز قالب العنوان في layout الجذر */
  absoluteTitle?: string;
  /** OG type: article للصفحات ذات المحتوى الطويل */
  ogType?: "website" | "article";
}): Metadata {
  const allowIndex = opts.index !== false;
  const displayTitle = opts.absoluteTitle ?? `${opts.title} | ${SITE}`;

  return {
    title: opts.absoluteTitle ? { absolute: opts.absoluteTitle } : opts.title,
    description: opts.description,
    alternates: {
      canonical: opts.path,
    },
    robots: allowIndex
      ? { index: true, follow: true, googleBot: { index: true, follow: true } }
      : { index: false, follow: true, googleBot: { index: false, follow: true } },
    openGraph: {
      type: opts.ogType === "article" ? "article" : "website",
      locale: "ar_MA",
      url: opts.path,
      siteName: SITE,
      title: displayTitle,
      description: opts.description,
    },
    twitter: {
      card: "summary_large_image",
      title: displayTitle,
      description: opts.description,
    },
  };
}

const SITE_EN = "AdkarMuslim";

/**
 * صفحة 404: بدون canonical (الرابط الفعلي قد يكون خاطئاً) — noindex فقط.
 */
export function notFound404Metadata(): Metadata {
  const displayTitle = `الصفحة غير موجودة - ${SITE_EN}`;
  const description =
    "الصفحة التي طلبتها غير موجودة على AdkarMuslim.com. يمكنك العودة للرئيسية أو تصفّح الأذكار والقرآن والأدعية ومواقيت الصلاة.";
  return {
    title: { absolute: displayTitle },
    description,
    robots: {
      index: false,
      follow: true,
      googleBot: { index: false, follow: true },
    },
    openGraph: {
      type: "website",
      locale: "ar_MA",
      siteName: SITE,
      title: displayTitle,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: displayTitle,
      description,
    },
  };
}
