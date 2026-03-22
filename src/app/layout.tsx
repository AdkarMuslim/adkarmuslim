import type { Metadata, Viewport } from "next";
import { Tajawal } from "next/font/google";

import "./globals.css";
import Footer from "../components/Footer";
import JsonLd from "../components/JsonLd";
import MobileHeader from "../components/MobileHeader";
import MobileTabBar from "../components/MobileTabBar";
import Navbar from "../components/Navbar";
import { SITE_NAME, SITE_URL } from "../lib/seo";

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["400", "500", "700"],
});

/** Production: set NEXT_PUBLIC_SITE_URL=https://adkarmuslim.com in Vercel env for correct canonical/OG on custom domain. */
function siteMetadataBase(): URL {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) {
    try {
      return new URL(fromEnv);
    } catch {
      // fall through
    }
  }
  if (process.env.VERCEL_URL) {
    return new URL(`https://${process.env.VERCEL_URL}`);
  }
  return new URL("https://adkarmuslim.com");
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0a1a",
};

export const metadata: Metadata = {
  metadataBase: siteMetadataBase(),
  title: {
    default: "أذكار المسلم - AdkarMuslim.com",
    template: "%s | أذكار المسلم",
  },
  description: "مرافق إسلامي شامل: أذكار، قرآن، أدعية، حديث، وأوقات الصلاة بتجربة حديثة.",
  keywords: [
    "أذكار المسلم",
    "أذكار الصباح والمساء",
    "القرآن الكريم",
    "تفسير القرآن",
    "مواقيت الصلاة",
    "الأدعية",
    "الحديث",
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
    description: "مرافق إسلامي شامل: أذكار، قرآن، تفسير، ومواقيت الصلاة.",
    images: [
      { url: "/logo.png", width: 800, height: 512, alt: "AdkarMuslim" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "أذكار المسلم - AdkarMuslim.com",
    description: "أذكار، قرآن، أدعية، حديث، ومواقيت الصلاة.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
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
          target: `${SITE_URL}/?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };

  return (
    <html lang="ar" dir="rtl" className="dark" suppressHydrationWarning>
      <body className={`${tajawal.className} antialiased min-h-screen w-full min-w-0`}>
        <JsonLd data={globalJsonLd} />
        <Navbar />
        <MobileHeader />
        {/* مساحة للهيدر المتحرك: موبايل = شعار + بحث (~7rem)؛ ديسكتوب = ناف واحد */}
        <div className="relative flex min-h-screen w-full min-w-0 flex-col pb-24 pt-[calc(7.25rem+env(safe-area-inset-top,0px))] lg:pt-24">
          <div className="flex-1">{children}</div>
          <Footer />
        </div>
        <MobileTabBar />
      </body>
    </html>
  );
}
