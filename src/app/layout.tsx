import type { Metadata, Viewport } from "next";
import { Tajawal } from "next/font/google";
import Script from "next/script";

import "./globals.css";
import Footer from "../components/Footer";
import JsonLd from "../components/JsonLd";
import MobileHeader from "../components/MobileHeader";
import MobileTabBar from "../components/MobileTabBar";
import Navbar from "../components/Navbar";
import { getMetadataBaseUrl, getOgShareImages, SITE_NAME, SITE_URL } from "../lib/seo";

/** Google Analytics 4 — عرّف `NEXT_PUBLIC_GA_ID` في Vercel أو استخدم القيمة الافتراضية */
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID ?? "G-HKEVSJXW74";

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["400", "500", "700"],
});

/** انظر `getMetadataBaseUrl` — الإنتاج دائماً www.adkarmuslim.com (canonical) إلا إن وُضع دومين حقيقي (ليس localhost). */

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0a1a",
};

export const metadata: Metadata = {
  metadataBase: getMetadataBaseUrl(),
  title: {
    default: "أذكار المسلم - AdkarMuslim.com",
    template: "%s | أذكار المسلم",
  },
  description:
    "AdkarMuslim.com — أذكار يومية (صباح، مساء، صلاة)، القرآن والتلاوة، تفسير صوتي، أدعية مأثورة، صحيح البخاري ومسلم، مواقيت الصلاة. عربي، مجاني، مناسب للجوال.",
  keywords: [
    "أذكار المسلم",
    "أذكار الصباح والمساء",
    "القرآن الكريم",
    "تفسير القرآن صوتي",
    "مواقيت الصلاة",
    "أوقات الصلاة",
    "الأدعية المأثورة",
    "صحيح البخاري",
    "صحيح مسلم",
    "الرقية الشرعية",
    "أسماء الله الحسنى",
    "AdkarMuslim",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ar_MA",
    url: "/",
    siteName: "أذكار المسلم",
    title: "أذكار المسلم - AdkarMuslim.com",
    description:
      "أذكار يومية مع عداد، قرآن وتلاوة، تفسير صوتي، أدعية، حديث نبوي، مواقيت صلاة — منصة عربية مجانية.",
    images: getOgShareImages(),
  },
  twitter: {
    card: "summary_large_image",
    title: "أذكار المسلم - AdkarMuslim.com",
    description:
      "أذكار، قرآن، تفسير صوتي، أدعية، حديث، مواقيت صلاة — AdkarMuslim.com",
    images: getOgShareImages().map((img) => img.url),
  },
  robots: {
    index: true,
    follow: true,
  },
  /**
   * أيقونة التبويب (favicon) ≠ شعار الهيدر:
   * Next.js يولّد `<link rel="icon">` تلقائياً من الملفات التالية (أولوية أقوى من metadata.icons):
   * - `src/app/icon.png` — حدّث هاد الملف أو استبدله (مربّع، مثلاً 32×32 أو أكبر)
   * - `src/app/apple-icon.png` — أيقونة «إضافة للشاشة الرئيسية» على iOS
   * شعار الهيدر الكبير: `public/logo.png` في Navbar / MobileHeader
   * نسخ احتياطي في public: `favicon.png`, `apple-touch-icon.png`
   */
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const globalJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}#organization`,
        name: SITE_NAME,
        url: SITE_URL,
        logo: `${SITE_URL}/logo.png`,
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}#website`,
        url: SITE_URL,
        name: SITE_NAME,
        inLanguage: "ar",
        publisher: { "@id": `${SITE_URL}#organization` },
        potentialAction: {
          "@type": "SearchAction",
          target: `${SITE_URL}/search?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };

  const loadGa = process.env.NODE_ENV === "production" && Boolean(GA_MEASUREMENT_ID);

  return (
    <html lang="ar" dir="rtl" className="dark" suppressHydrationWarning>
      <body className={`${tajawal.className} antialiased min-h-screen w-full min-w-0`}>
        {loadGa ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}');
              `}
            </Script>
          </>
        ) : null}
        <JsonLd data={globalJsonLd} />
        <Navbar />
        <MobileHeader />
        {/* مساحة للهيدر المتحرك: موبايل = شعار + بحث (~7rem)؛ ديسكتوب = ناف واحد */}
        <div className="relative flex min-h-screen w-full min-w-0 flex-col pb-24 pt-[calc(7.75rem+env(safe-area-inset-top,0px))] lg:pt-24">
          <div className="flex-1">{children}</div>
          <Footer />
        </div>
        <MobileTabBar />
      </body>
    </html>
  );
}
