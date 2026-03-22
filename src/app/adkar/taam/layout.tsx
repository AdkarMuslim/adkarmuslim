import type { Metadata } from "next";
import type { ReactNode } from "react";
import { arSeoMeta } from "../../../lib/ar-seo-meta";

export const metadata: Metadata = arSeoMeta({
  title: "أذكار الطعام والشراب",
  description:
    "بسم الله وأذكار قبل وبعد الأكل والشرب والضيافة من السنة، مع تذكير بالآداب الإسلامية وعداد بسيط.",
  path: "/adkar/taam",
});

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
