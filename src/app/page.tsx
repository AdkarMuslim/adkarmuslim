import AdkarIndexPage from "./adkar/page";
import type { Metadata } from "next";
import JsonLd from "../components/JsonLd";
import { arSeoMeta } from "../lib/ar-seo-meta";
import { buildBreadcrumbJsonLd, buildWebPageJsonLd } from "../lib/seo";

export const metadata: Metadata = arSeoMeta({
  title: "الرئيسية",
  description:
    "منصة عربية مجانية: أذكار يومية مع عداد، القرآن والتلاوة، تفسير صوتي، أدعية مأثورة، حديث نبوي، ومواقيت الصلاة — AdkarMuslim.com",
  path: "/",
});

export default function Home() {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([{ name: "الرئيسية", path: "/" }]);
  const webPageJsonLd = buildWebPageJsonLd({
    path: "/",
    name: "أذكار المسلم",
    description:
      "منصة عربية مجانية: أذكار يومية مع عداد، القرآن والتلاوة، تفسير صوتي، أدعية مأثورة، حديث نبوي، ومواقيت الصلاة — AdkarMuslim.com",
  });

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={webPageJsonLd} />
      <AdkarIndexPage />
    </>
  );
}
