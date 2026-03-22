import type { Metadata } from "next";
import type { ReactNode } from "react";
import { arSeoMeta } from "../../../lib/ar-seo-meta";

export const metadata: Metadata = arSeoMeta({
  title: "أذكار الأذان والإقامة",
  description:
    "الدعاء والذكر عند سماع الأذان والإقامة وفق السنة النبوية، بصياغة واضحة للحفظ والمراجعة.",
  path: "/adkar/athan",
});

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
