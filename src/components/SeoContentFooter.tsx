import Link from "next/link";

type Props = {
  section: "adkar" | "duaa";
  /** روابط داخلية ذات صلة (أنكر عربي وصفي) */
  related?: Array<{ href: string; label: string }>;
};

/**
 * تذييل موحّد للروابط الداخلية (SEO) في صفحات الأذكار والأدعية.
 */
export default function SeoContentFooter({ section, related = [] }: Props) {
  const indexHref = section === "adkar" ? "/adkar" : "/duaa";
  const indexLabel = section === "adkar" ? "فهرس الأذكار" : "فهرس الأدعية";
  const otherSection = section === "adkar" ? { href: "/duaa", label: "الأدعية" } : { href: "/adkar", label: "الأذكار" };

  const items = [
    ...related,
    { href: "/", label: "الرئيسية" },
    { href: indexHref, label: indexLabel },
    otherSection,
  ];

  return (
    <footer className="mt-8 border-t border-white/10 pt-5 text-sm leading-relaxed text-white/55">
      <p className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
        {items.map((l, i) => (
          <span key={`${i}-${l.href}`} className="inline-flex items-center gap-1.5">
            {i > 0 ? <span className="text-white/25" aria-hidden>|</span> : null}
            <Link href={l.href} className="text-accent underline-offset-2 hover:underline">
              {l.label}
            </Link>
          </span>
        ))}
      </p>
    </footer>
  );
}
