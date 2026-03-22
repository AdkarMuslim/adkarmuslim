import type { Metadata } from "next";

const SITE = "أذكار المسلم";

/**
 * Metadata عربية موحّدة: canonical، Open Graph، Twitter، وفهرسة اختيارية.
 * العنوان في `metadata.title` يُكمَّل تلقائياً بقالب الجذر: «… | أذكار المسلم».
 */
export function arSeoMeta(opts: {
  title: string;
  description: string;
  path: string;
  /** افتراضي: فهرسة مفعّلة. عطّلها لصفحات «قريباً» أو حساسة. */
  index?: boolean;
}): Metadata {
  const allowIndex = opts.index !== false;
  const ogTitle = `${opts.title} | ${SITE}`;

  return {
    title: opts.title,
    description: opts.description,
    alternates: {
      canonical: opts.path,
    },
    robots: allowIndex
      ? { index: true, follow: true, googleBot: { index: true, follow: true } }
      : { index: false, follow: true, googleBot: { index: false, follow: true } },
    openGraph: {
      type: "website",
      locale: "ar_MA",
      url: opts.path,
      siteName: SITE,
      title: ogTitle,
      description: opts.description,
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: opts.description,
    },
  };
}
