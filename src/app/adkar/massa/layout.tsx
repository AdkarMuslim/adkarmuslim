import type { Metadata } from "next";
import type { ReactNode } from "react";
import JsonLd from "../../../components/JsonLd";
import { arSeoMeta } from "../../../lib/ar-seo-meta";
import { buildArticleJsonLd, buildBreadcrumbJsonLd, buildWebPageJsonLd } from "../../../lib/seo";

const CANONICAL = "/adkar/massa";
const DESC =
  "أذكار المساء مكتوبة كاملة في حصن المسلم: أوراد بعد العصر والمغرب مع عداد تفاعلي ونصوص واضحة من السنة. مراجعة يومية مريحة على AdkarMuslim.";

export const metadata: Metadata = arSeoMeta({
  title: "أذكار المساء",
  absoluteTitle: "أذكار المساء مكتوبة كاملة - AdkarMuslim",
  description: DESC,
  path: CANONICAL,
  ogType: "article",
});

export default function MassaLayout({ children }: { children: ReactNode }) {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "الرئيسية", path: "/" },
    { name: "الأذكار", path: "/adkar" },
    { name: "أذكار المساء", path: CANONICAL },
  ]);
  const webPageJsonLd = buildWebPageJsonLd({
    path: CANONICAL,
    name: "أذكار المساء",
    description: DESC,
  });
  const articleJsonLd = buildArticleJsonLd({
    path: CANONICAL,
    headline: "أذكار المساء",
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
