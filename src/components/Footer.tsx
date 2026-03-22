import Link from "next/link";
import { SITE_NAME, SITE_URL } from "../lib/seo";

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
    <footer className="mx-auto mt-12 w-full max-w-6xl px-4 pb-8 pt-6 lg:mt-16 lg:pb-10">
      <div className="glass-panel ring-accent/0 px-4 py-6 sm:px-6">
        <nav
          className="flex flex-col gap-4 border-b border-white/10 pb-6 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-x-8 sm:gap-y-3"
          aria-label="تذييل الموقع"
        >
          {footerLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group text-center text-sm text-white/80 transition hover:text-accent sm:text-right"
            >
              <span className="font-medium">{item.labelAr}</span>
              <span className="mt-0.5 block text-[11px] text-white/45 group-hover:text-white/55 sm:inline sm:mt-0 sm:mr-2">
                {item.labelEn}
              </span>
            </Link>
          ))}
        </nav>

        <div className="pt-5 text-center">
          <p className="text-xs text-white/50">
            © {year} {SITE_NAME} —{" "}
            <a
              href={SITE_URL}
              className="text-white/65 underline-offset-2 transition hover:text-accent hover:underline"
            >
              AdkarMuslim.com
            </a>
          </p>
          <p className="mx-auto mt-2 max-w-xl text-[11px] leading-relaxed text-white/40">
            محتوى ديني للتذكير والاستفادة؛ يرجى الرجوع لأهل العلم للفتاوى والأحكام.
          </p>
        </div>
      </div>
    </footer>
  );
}
