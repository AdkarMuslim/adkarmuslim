import type { Metadata } from "next";
import type { ReactNode } from "react";
import JsonLd from "../../../components/JsonLd";
import { arSeoMeta } from "../../../lib/ar-seo-meta";
import { buildArticleJsonLd, buildBreadcrumbJsonLd, buildWebPageJsonLd } from "../../../lib/seo";

const CANONICAL = "/adkar/salat";
const DESC =
  "أذكار بعد الصلاة مكتوبة كاملة: أذكار السجود والجلوس بعد السلام من الفرائض، مع عداد تفاعلي ضمن حصن المسلم. مراجعة سريعة على AdkarMuslim.";

export const metadata: Metadata = arSeoMeta({
  title: "أذكار بعد الصلاة",
  absoluteTitle: "أذكار بعد الصلاة مكتوبة كاملة - AdkarMuslim",
  description: DESC,
  path: CANONICAL,
  ogType: "article",
});

export default function SalatLayout({ children }: { children: ReactNode }) {
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "الرئيسية", path: "/" },
    { name: "الأذكار", path: "/adkar" },
    { name: "أذكار بعد الصلاة", path: CANONICAL },
  ]);
  const webPageJsonLd = buildWebPageJsonLd({
    path: CANONICAL,
    name: "أذكار بعد الصلاة",
    description: DESC,
  });
  const articleJsonLd = buildArticleJsonLd({
    path: CANONICAL,
    headline: "أذكار بعد الصلاة",
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
