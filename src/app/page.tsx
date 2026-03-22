import AdkarIndexPage from "./adkar/page";
import type { Metadata } from "next";
import JsonLd from "../components/JsonLd";
import { arSeoMeta } from "../lib/ar-seo-meta";
import { buildBreadcrumbJsonLd, buildWebPageJsonLd } from "../lib/seo";

/** عنوان الصفحة الرئيسية لـ Google/المشاركة — تجنّب «الرئيسية» فقط؛ استعمل وصفاً غنياً بالكلمات المفتاحية */
export const metadata: Metadata = arSeoMeta({
  title: "أذكار المسلم",
  absoluteTitle:
    "أذكار المسلم | أذكار يومية، قرآن كريم، أدعية، حديث نبوي ومواقيت صلاة — منصة إسلامية مجانية على الإنترنت",
  description:
    "أذكار المسلم: أذكار صباح ومساء مع عداد، المصحف والتلاوة، تفسير صوتي، أدعية مأثورة، صحيح البخاري ومسلم، مواقيت الصلاة. عربي، مجاني، مناسب للجوال — AdkarMuslim.com",
  path: "/",
});

export default function Home() {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([{ name: "أذكار المسلم", path: "/" }]);
  const webPageJsonLd = buildWebPageJsonLd({
    path: "/",
    name: "أذكار المسلم | أذكار، قرآن، أدعية، حديث ومواقيت صلاة",
    description:
      "أذكار المسلم: أذكار صباح ومساء مع عداد، المصحف والتلاوة، تفسير صوتي، أدعية مأثورة، صحيح البخاري ومسلم، مواقيت الصلاة. عربي، مجاني — AdkarMuslim.com",
  });

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={webPageJsonLd} />
      <AdkarIndexPage />
    </>
  );
}
