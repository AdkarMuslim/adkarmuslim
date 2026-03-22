import type { Metadata } from "next";
import type { ReactNode } from "react";
import JsonLd from "../../../components/JsonLd";
import { arSeoMeta } from "../../../lib/ar-seo-meta";
import { buildArticleJsonLd, buildBreadcrumbJsonLd, buildWebPageJsonLd } from "../../../lib/seo";

const CANONICAL = "/adkar/sabah";
const DESC =
  "أذكار الصباح مكتوبة كاملة في حصن المسلم اليومي: آيات وأذكار من السنة مع عداد تفاعلي وترجمة تسهّل المراجعة بعد الفجر. محتوى عربي واضح على AdkarMuslim.";

export const metadata: Metadata = arSeoMeta({
  title: "أذكار الصباح",
  absoluteTitle: "أذكار الصباح مكتوبة كاملة - AdkarMuslim",
  description: DESC,
  path: CANONICAL,
  ogType: "article",
});

export default function SabahLayout({ children }: { children: ReactNode }) {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "الرئيسية", path: "/" },
    { name: "الأذكار", path: "/adkar" },
    { name: "أذكار الصباح", path: CANONICAL },
  ]);
  const webPageJsonLd = buildWebPageJsonLd({
    path: CANONICAL,
    name: "أذكار الصباح",
    description: DESC,
  });
  const articleJsonLd = buildArticleJsonLd({
    path: CANONICAL,
    headline: "أذكار الصباح",
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
