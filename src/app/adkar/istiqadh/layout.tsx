import type { Metadata } from "next";
import type { ReactNode } from "react";
import JsonLd from "../../../components/JsonLd";
import { arSeoMeta } from "../../../lib/ar-seo-meta";
import { buildArticleJsonLd, buildBreadcrumbJsonLd, buildWebPageJsonLd } from "../../../lib/seo";

const CANONICAL = "/adkar/istiqadh";
const DESC =
  "أذكار الاستيقاظ مكتوبة كاملة: ما يُقال عند اليقظة من النوم وفق السنة، مع عداد واضح لحصن المسلم صباحاً. AdkarMuslim.";

export const metadata: Metadata = arSeoMeta({
  title: "أذكار الاستيقاظ",
  absoluteTitle: "أذكار الاستيقاظ مكتوبة كاملة - AdkarMuslim",
  description: DESC,
  path: CANONICAL,
  ogType: "article",
});

export default function IstiqadhLayout({ children }: { children: ReactNode }) {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "الرئيسية", path: "/" },
    { name: "الأذكار", path: "/adkar" },
    { name: "أذكار الاستيقاظ", path: CANONICAL },
  ]);
  const webPageJsonLd = buildWebPageJsonLd({
    path: CANONICAL,
    name: "أذكار الاستيقاظ",
    description: DESC,
  });
  const articleJsonLd = buildArticleJsonLd({
    path: CANONICAL,
    headline: "أذكار الاستيقاظ",
    description: DESC,
  });

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={webPageJsonLd} />
      <JsonLd data={articleJsonLd} />
      {children}
    </>
  );
}
