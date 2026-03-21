import type { Metadata } from "next";
import { Tajawal } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import MobileTabBar from "../components/MobileTabBar";
import JsonLd from "../components/JsonLd";
import { SITE_NAME, SITE_URL } from "../lib/seo";

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://adkarmuslim.com"),
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
    description: "مرافق إسلامي شامل: أذكار، قرآن، أدعية، حديث، وأوقات الصلاة.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "أذكار المسلم" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "أذكار المسلم - AdkarMuslim.com",
    description: "أذكار، قرآن، أدعية، حديث، ومواقيت الصلاة.",
    images: ["/twitter-image"],
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
    <html
      lang="ar"
      dir="rtl"
      className="dark"
      suppressHydrationWarning
    >
      <body className={`${tajawal.className} antialiased min-h-screen w-full min-w-0`}>
        <JsonLd data={globalJsonLd} />
        <Navbar />
        <div className="relative min-h-screen w-full min-w-0 pb-24 pt-24">
          {children}
        </div>
        <MobileTabBar />
      </body>
    </html>
  );
}
