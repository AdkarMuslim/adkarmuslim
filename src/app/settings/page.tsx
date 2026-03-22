import type { Metadata } from "next";
import ComingSoonCard from "../../components/ComingSoonCard";
import { arSeoMeta } from "../../lib/ar-seo-meta";

export const metadata: Metadata = arSeoMeta({
  title: "الإعدادات",
  description:
    "قريباً: لغة، خط عربي، مواقيت الصلاة، والصوت — تخصيص تجربتك في أذكار المسلم. الصفحة قيد الإعداد.",
  path: "/settings",
  index: false,
});

export default function SettingsPage() {
  return (
    <ComingSoonCard
      title="الإعدادات"
      description="اختيار اللغة، مقاس الخط العربي، طريقة حساب أوقات الصلاة، وتفضيلات الصوت."
    />
  );
}

