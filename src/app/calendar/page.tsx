import type { Metadata } from "next";
import ComingSoonCard from "../../components/ComingSoonCard";
import { arSeoMeta } from "../../lib/ar-seo-meta";

export const metadata: Metadata = arSeoMeta({
  title: "التقويم الهجري",
  description:
    "قريباً: تقويم هجري مع مناسبات إسلامية داخل أذكار المسلم — عرض واضح للجوال. الصفحة قيد التطوير.",
  path: "/calendar",
  index: false,
});

export default function CalendarPage() {
  return (
    <ComingSoonCard
      title="التقويم الهجري"
      description="عرض اليوم هجرياً مع مناسبات إسلامية (رمضان، العيدين، المولد...) وتصميم جميل."
    />
  );
}

