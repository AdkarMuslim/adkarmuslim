import type { Metadata } from "next";
import type { ReactNode } from "react";
import { arSeoMeta } from "../../../lib/ar-seo-meta";

export const metadata: Metadata = arSeoMeta({
  title: "أدعية الأنبياء",
  description:
    "أدعية الأنبياء عليهم السلام الواردة في القرآن، بعرض واضح مع عداد وترتيب للتأمل والحفظ.",
  path: "/duaa/anbiya",
});

export default function Layout({ children }: { children: ReactNode }) {
  return children;
}
