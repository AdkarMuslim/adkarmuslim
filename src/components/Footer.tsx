import Link from "next/link";
import { SITE_NAME, SITE_URL } from "../lib/seo";

/** محاور المحتوى — روابط قصيرة لتسهيل الاكتشاف دون إثقال التذييل */
const contentHubLinks: Array<{ href: string; label: string }> = [
  { href: "/quran", label: "القرآن" },
  { href: "/quran/tafsir", label: "التفسير" },
  { href: "/adkar", label: "الأذكار" },
  { href: "/duaa", label: "الأدعية" },
  { href: "/hadith", label: "الحديث" },
  { href: "/prayer-times", label: "المواقيت" },
];

const footerLinks: Array<{ href: string; labelAr: string; labelEn: string }> = [
  { href: "/contact", labelAr: "اتصل بنا", labelEn: "Contact us" },
  { href: "/about", labelAr: "من نحن", labelEn: "About us" },
  { href: "/copyright", labelAr: "حقوق النشر", labelEn: "Copyright" },
  { href: "/privacy", labelAr: "سياسة الخصوصية", labelEn: "Privacy Policy" },
  { href: "/terms", labelAr: "شروط الاستخدام", labelEn: "Terms of Use" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mx-auto mt-8 w-full max-w-6xl px-3 pb-6 pt-4 sm:mt-12 sm:px-4 sm:pb-8 sm:pt-6 lg:mt-16 lg:pb-10">
      <div className="glass-panel ring-accent/0 px-3 py-3 sm:px-5 sm:py-5">
        <nav
          className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 border-b border-white/10 pb-3 sm:gap-x-5 sm:pb-4"
          aria-label="محاور المحتوى"
        >
          {contentHubLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-1.5 py-0.5 text-center text-[11px] text-white/75 transition hover:bg-white/5 hover:text-accent sm:text-xs"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <nav
          className="mt-3 grid grid-cols-2 gap-x-3 gap-y-1.5 border-b border-white/10 pb-3 sm:mt-4 sm:flex sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-x-8 sm:gap-y-2 sm:pb-5"
          aria-label="تذييل الموقع"
        >
          {footerLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group rounded-lg px-1 py-1 text-center text-xs text-white/80 transition hover:bg-white/5 hover:text-accent sm:px-0 sm:py-0 sm:text-right sm:text-sm"
            >
              <span className="font-medium leading-tight">{item.labelAr}</span>
              <span className="hidden text-[11px] text-white/45 group-hover:text-white/55 lg:mr-2 lg:inline">
                {item.labelEn}
              </span>
            </Link>
          ))}
        </nav>

        <div className="pt-3 text-center sm:pt-4">
          <p className="text-[11px] text-white/50 sm:text-xs">
            © {year} {SITE_NAME} —{" "}
            <a
              href={SITE_URL}
              className="text-white/65 underline-offset-2 transition hover:text-accent hover:underline"
            >
              AdkarMuslim.com
            </a>
          </p>
          <p className="mx-auto mt-1.5 max-w-xl text-[10px] leading-snug text-white/38 sm:mt-2 sm:text-[11px] sm:leading-relaxed sm:text-white/40">
            محتوى ديني للتذكير والاستفادة؛ يرجى الرجوع لأهل العلم للفتاوى والأحكام.
          </p>
        </div>
      </div>
    </footer>
  );
}
