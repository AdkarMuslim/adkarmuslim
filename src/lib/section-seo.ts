import type { Metadata } from "next";

import { arSeoMeta } from "./ar-seo-meta";
import { buildArticleJsonLd, buildBreadcrumbJsonLd, buildWebPageJsonLd } from "./seo";

export type SectionSeoInput = {
  path: string;
  title: string;
  absoluteTitle: string;
  description: string;
  breadcrumbName: string;
  section: "adkar" | "duaa";
  /** للصفحات الفهرسية استخدم website */
  ogType?: "website" | "article";
};

export function buildSectionSeoLayout(input: SectionSeoInput): {
  metadata: Metadata;
  breadcrumbJsonLd: ReturnType<typeof buildBreadcrumbJsonLd>;
  webPageJsonLd: ReturnType<typeof buildWebPageJsonLd>;
  articleJsonLd: ReturnType<typeof buildArticleJsonLd>;
} {
  const metadata = arSeoMeta({
    title: input.title,
    absoluteTitle: input.absoluteTitle,
    description: input.description,
    path: input.path,
    ogType: input.ogType ?? "article",
  });
  const sectionLabel = input.section === "adkar" ? "الأذكار" : "الأدعية";
  const sectionPath = input.section === "adkar" ? "/adkar" : "/duaa";
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "الرئيسية", path: "/" },
    { name: sectionLabel, path: sectionPath },
    { name: input.breadcrumbName, path: input.path },
  ]);
  const webPageJsonLd = buildWebPageJsonLd({
    path: input.path,
    name: input.title,
    description: input.description,
  });
  const articleJsonLd = buildArticleJsonLd({
    path: input.path,
    headline: input.breadcrumbName,
    description: input.description,
  });
  return { metadata, breadcrumbJsonLd, webPageJsonLd, articleJsonLd };
}

/** صفحات فهرس (مستويان فقط): الرئيسية → القسم — بدون Article */
export function buildTwoLevelSeoLayout(input: {
  path: string;
  title: string;
  absoluteTitle: string;
  description: string;
  breadcrumbName: string;
}): {
  metadata: Metadata;
  breadcrumbJsonLd: ReturnType<typeof buildBreadcrumbJsonLd>;
  webPageJsonLd: ReturnType<typeof buildWebPageJsonLd>;
} {
  const metadata = arSeoMeta({
    title: input.title,
    absoluteTitle: input.absoluteTitle,
    description: input.description,
    path: input.path,
    ogType: "website",
  });
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "الرئيسية", path: "/" },
    { name: input.breadcrumbName, path: input.path },
  ]);
  const webPageJsonLd = buildWebPageJsonLd({
    path: input.path,
    name: input.title,
    description: input.description,
  });
  return { metadata, breadcrumbJsonLd, webPageJsonLd };
}

/** فرع تحت القرآن: الرئيسية → القرآن → الصفحة (مثل التفسير الصوتي) */
export function buildQuranChildSeoLayout(input: {
  path: string;
  title: string;
  absoluteTitle: string;
  description: string;
  breadcrumbName: string;
}): {
  metadata: Metadata;
  breadcrumbJsonLd: ReturnType<typeof buildBreadcrumbJsonLd>;
  webPageJsonLd: ReturnType<typeof buildWebPageJsonLd>;
  articleJsonLd: ReturnType<typeof buildArticleJsonLd>;
} {
  const metadata = arSeoMeta({
    title: input.title,
    absoluteTitle: input.absoluteTitle,
    description: input.description,
    path: input.path,
    ogType: "article",
  });
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "الرئيسية", path: "/" },
    { name: "القرآن الكريم", path: "/quran" },
    { name: input.breadcrumbName, path: input.path },
  ]);
  const webPageJsonLd = buildWebPageJsonLd({
    path: input.path,
    name: input.title,
    description: input.description,
  });
  const articleJsonLd = buildArticleJsonLd({
    path: input.path,
    headline: input.breadcrumbName,
    description: input.description,
  });
  return { metadata, breadcrumbJsonLd, webPageJsonLd, articleJsonLd };
}
