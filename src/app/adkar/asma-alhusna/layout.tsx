import type { Metadata } from "next";
import type { ReactNode } from "react";
import JsonLd from "../../../components/JsonLd";
import { ADKAR_ROUTES } from "../../../lib/seo-route-presets";
import { buildSectionSeoLayout } from "../../../lib/section-seo";

const seo = buildSectionSeoLayout(ADKAR_ROUTES["asma-alhusna"]);

export const metadata: Metadata = seo.metadata;

export default function AsmaAlhusnaLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <JsonLd data={seo.breadcrumbJsonLd} />
      <JsonLd data={seo.webPageJsonLd} />
      <JsonLd data={seo.articleJsonLd} />
      {children}
    </>
  );
}
