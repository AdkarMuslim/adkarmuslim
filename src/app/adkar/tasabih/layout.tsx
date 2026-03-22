import type { Metadata } from "next";
import type { ReactNode } from "react";
import { arSeoMeta } from "../../../lib/ar-seo-meta";

export const metadata: Metadata = arSeoMeta({
  title: "التسبيح والتهليل",
  description:
    "أذكار التسبيح والتهليل والتحميد بعد الصلاة وفي أوقات النهار، مع عداد تفاعلي للمراجعة.",
  path: "/adkar/tasabih",
});

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
