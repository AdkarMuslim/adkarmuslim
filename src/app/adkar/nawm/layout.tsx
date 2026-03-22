import type { Metadata } from "next";
import type { ReactNode } from "react";
import JsonLd from "../../../components/JsonLd";
import { arSeoMeta } from "../../../lib/ar-seo-meta";
import { buildArticleJsonLd, buildBreadcrumbJsonLd, buildWebPageJsonLd } from "../../../lib/seo";

const CANONICAL = "/adkar/nawm";
const DESC =
  "أذكار النوم مكتوبة كاملة: آيات وأدعية قبل النوم في حصن المسلم، مع عداد بسيط يساعدك على الثبات. تجربة هادئة على AdkarMuslim.";

export const metadata: Metadata = arSeoMeta({
  title: "أذكار النوم",
  absoluteTitle: "أذكار النوم مكتوبة كاملة - AdkarMuslim",
  description: DESC,
  path: CANONICAL,
  ogType: "article",
});

export default function NawmLayout({ children }: { children: ReactNode }) {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "الرئيسية", path: "/" },
    { name: "الأذكار", path: "/adkar" },
    { name: "أذكار النوم", path: CANONICAL },
  ]);
  const webPageJsonLd = buildWebPageJsonLd({
    path: CANONICAL,
    name: "أذكار النوم",
    description: DESC,
  });
  const articleJsonLd = buildArticleJsonLd({
    path: CANONICAL,
    headline: "أذكار النوم",
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
