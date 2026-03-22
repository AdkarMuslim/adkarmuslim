/**
 * الدومين النهائي (www) — يطابق التوجيه من apex؛ يُستخدم للـ sitemap و JSON-LD و canonical عبر metadataBase.
 */
export const CANONICAL_SITE_ORIGIN = "https://www.adkarmuslim.com";

export const SITE_URL = CANONICAL_SITE_ORIGIN;
export const SITE_NAME = "أذكار المسلم";

/**
 * صورة معاينة المشاركة (Open Graph) — واتساب، فيسبوك، تيليغرام، X.
 *
 * **المقاس الموصى به للغلاف:** `1200 × 630` بكسل (نسبة ~1.91:1)، PNG أو JPG، أقل من ~8MB.
 * **الحد الأدنى المقبول:** حوالي `200 × 200` (المعاينة تكون أصغر).
 *
 * 1. صمّم الغلاف بهذا المقاس وضعه في: `public/og-share.png`
 * 2. غيّر `OG_SHARE_IMAGE_PATH` و `OG_SHARE_IMAGE_SIZE` أدناه ليطابق ملفك.
 *
 * إلى حين ذلك نستخدم `logo.png` الموجود.
 */
export const OG_SHARE_IMAGE_PATH = "/og-share.png" as const;
export const OG_SHARE_IMAGE_SIZE = { width: 1200, height: 630 } as const;

export function getOgShareImages(): Array<{ url: string; width: number; height: number; alt: string }> {
  return [
    {
      url: OG_SHARE_IMAGE_PATH,
      width: OG_SHARE_IMAGE_SIZE.width,
      height: OG_SHARE_IMAGE_SIZE.height,
      alt: `${SITE_NAME} — AdkarMuslim.com`,
    },
  ];
}

/** يحوّل https://adkarmuslim.com → https://www.adkarmuslim.com */
function normalizeAdkarApexToWww(u: URL): URL {
  if (u.hostname.toLowerCase() === "adkarmuslim.com") {
    return new URL(`${u.pathname}${u.search}${u.hash}`, CANONICAL_SITE_ORIGIN);
  }
  return u;
}

/**
 * `metadataBase` في layout: حلّ الروابط النسبية في metadata (canonical، OG، إلخ).
 * - **إنتاج Vercel** (`VERCEL_ENV=production`): دائماً `https://www.adkarmuslim.com` — بدون اختلاط مع apex أو localhost.
 * - **بريفيو Vercel**: دومين الـ deployment المؤقت.
 * - **تطوير محلي** (`npm run dev`): localhost أو env.
 *
 * ملاحظة: مسارات `/_next/static` للـ CSS/JS لا تُبنى من metadataBase؛ تبقى نسبية لنفس الـ origin.
 */
export function getMetadataBaseUrl(): URL {
  const fallback = new URL(CANONICAL_SITE_ORIGIN);

  if (process.env.NODE_ENV === "production") {
    if (process.env.VERCEL_ENV === "preview" && process.env.VERCEL_URL) {
      return new URL(`https://${process.env.VERCEL_URL}`);
    }
    // إنتاج Vercel + `next start` محليًا: www ثابت
    return fallback;
  }

  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (raw) {
    try {
      const u = new URL(raw);
      const host = u.hostname.toLowerCase();
      const isLocal =
        host === "localhost" ||
        host === "127.0.0.1" ||
        host === "[::1]" ||
        host.endsWith(".localhost");
      if (!isLocal) {
        return normalizeAdkarApexToWww(u);
      }
      return u;
    } catch {
      // ignore invalid URL
    }
  }

  if (process.env.VERCEL_URL) {
    return new URL(`https://${process.env.VERCEL_URL}`);
  }

  return fallback;
}

export function buildBreadcrumbJsonLd(
  items: Array<{ name: string; path: string }>,
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

export function buildWebPageJsonLd(input: {
  path: string;
  name: string;
  description: string;
}): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    url: `${SITE_URL}${input.path}`,
    name: input.name,
    description: input.description,
    inLanguage: "ar",
    isPartOf: {
      "@type": "WebSite",
      "@id": `${SITE_URL}#website`,
      url: SITE_URL,
      name: SITE_NAME,
    },
  };
}

/** مقال/صفحة محتوى للأذكار — يكمّل WebPage ولا يستبدل canonical */
export function buildArticleJsonLd(input: {
  path: string;
  headline: string;
  description: string;
}): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    url: `${SITE_URL}${input.path}`,
    headline: input.headline,
    description: input.description,
    inLanguage: "ar",
    author: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}${input.path}`,
    },
  };
}

export function buildFaqJsonLd(
  items: Array<{ question: string; answer: string }>,
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
