import type { Metadata } from "next";
import type { ReactNode } from "react";
import { arSeoMeta } from "../../../lib/ar-seo-meta";

export const metadata: Metadata = arSeoMeta({
  title: "أدعية للميت",
  description:
    "أدعية وأذكار للميت والاستغفار له والرحمة، من السنة، بعرض مرتب للمراجعة عند الفقد أو زيارة القبر.",
  path: "/adkar/mayit",
});

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
