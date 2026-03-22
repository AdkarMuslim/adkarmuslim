import type { Metadata } from "next";
import type { ReactNode } from "react";
import { arSeoMeta } from "../../../lib/ar-seo-meta";

export const metadata: Metadata = arSeoMeta({
  title: "أذكار الحج والعمرة",
  description:
    "تلبية وأدعية وأذكار مناسك الحج والعمرة مختصرة ومرتبة، لتسهيل المراجعة في الرحلة المباركة.",
  path: "/adkar/hajj-umrah",
});

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
