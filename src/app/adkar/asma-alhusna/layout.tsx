import type { Metadata } from "next";
import type { ReactNode } from "react";
import { arSeoMeta } from "../../../lib/ar-seo-meta";

export const metadata: Metadata = arSeoMeta({
  title: "أسماء الله الحسنى",
  description:
    "أسماء الله الحسنى مع الذكر والتأمل، منظّم لحفظ الأسماء والدعاء بها وفهم معانيها باختصار.",
  path: "/adkar/asma-alhusna",
});

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
