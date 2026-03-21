import AdkarIndexPage from "./adkar/page";
import type { Metadata } from "next";
import JsonLd from "../components/JsonLd";
import { buildBreadcrumbJsonLd, buildWebPageJsonLd } from "../lib/seo";

export const metadata: Metadata = {
  title: "الرئيسية",
  description: "أذكار المسلم: الأذكار، القرآن الكريم، الأدعية، الحديث، ومواقيت الصلاة.",
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([{ name: "الرئيسية", path: "/" }]);
  const webPageJsonLd = buildWebPageJsonLd({
    path: "/",
    name: "الرئيسية",
    description: "أذكار المسلم: الأذكار، القرآن الكريم، الأدعية، الحديث، ومواقيت الصلاة.",
  });

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={webPageJsonLd} />
      <AdkarIndexPage />
    </>
  );
}
