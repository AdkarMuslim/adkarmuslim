"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpenText, HandHeart, Home, Library, Sparkles } from "lucide-react";
import type { ReactNode } from "react";
import { useMemo } from "react";

type Tab = { href: string; label: string; icon: ReactNode };

function isTabActive(href: string, pathname: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function MobileTabBar() {
  const pathname = usePathname();

  const tabs: Tab[] = useMemo(
    () => [
      { href: "/", label: "الرئيسية", icon: <Home className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" /> },
      { href: "/quran", label: "القرآن", icon: <BookOpenText className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" /> },
      { href: "/adkar", label: "الأذكار", icon: <Sparkles className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" /> },
      { href: "/duaa", label: "الأدعية", icon: <HandHeart className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" /> },
      { href: "/hadith", label: "الحديث", icon: <Library className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" /> },
    ],
    []
  );

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 pb-[env(safe-area-inset-bottom)]">
      <div className="glass-panel mx-2 mb-2 flex items-stretch justify-between gap-0.5 px-1 py-1.5 sm:mx-3 sm:mb-3 sm:gap-1 sm:px-2 sm:py-2">
        {tabs.map((t) => {
          const active = isTabActive(t.href, pathname);
          return (
            <Link
              key={t.href}
              href={t.href}
              className={[
                "flex min-w-0 flex-1 flex-col items-center justify-center gap-0.5 rounded-xl px-0.5 py-1.5 text-[9px] transition sm:gap-1 sm:rounded-2xl sm:px-1 sm:py-2 sm:text-[10px]",
                active ? "bg-white/8 text-accent ring-1 ring-accent/20" : "text-white/70 hover:bg-white/5",
              ].join(" ")}
            >
              <span className={active ? "text-accent" : "text-white/70"}>{t.icon}</span>
              <span className={`truncate text-center leading-tight ${active ? "text-accent" : "text-white/70"}`}>
                {t.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
