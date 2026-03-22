"use client";

import Link from "next/link";

export type ContentPageFooterLink = { href: string; label: string };

type Props = {
  /** فهرس القسم؛ في صفحات الفهرس غالباً «الرئيسية» */
  primaryLink: ContentPageFooterLink;
  /** صفحتان إلى ثلاث ذات صلة */
  related: ContentPageFooterLink[];
  /** ربط الأذكار ↔ الأدعية في صفحات المحتوى */
  peerHub?: ContentPageFooterLink;
};

/**
 * تذييل موحّد للروابط الداخلية (SEO): فهرس القسم → صفحات قريبة → (قسم نظير) → الرئيسية إن لزم.
 */
export default function ContentPageFooter({ primaryLink, related, peerHub }: Props) {
  const rel = related.slice(0, 3);
  const home: ContentPageFooterLink = { href: "/", label: "الرئيسية" };

  const items: ContentPageFooterLink[] = [primaryLink, ...rel];
  if (peerHub) items.push(peerHub);
  if (primaryLink.href !== home.href) items.push(home);

  return (
    <footer
      className="mt-8 border-t border-white/10 pt-5 text-sm leading-relaxed text-white/55"
      aria-label="روابط ذات صلة"
    >
      <p className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
        {items.map((l, i) => (
          <span key={`${l.href}-${l.label}-${i}`} className="inline-flex items-center gap-1.5">
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
