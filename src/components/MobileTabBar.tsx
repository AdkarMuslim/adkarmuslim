"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpenText, Home, Sparkles } from "lucide-react";
import type { ReactNode } from "react";
import { useMemo } from "react";

type Tab = { href: string; label: string; icon: ReactNode };

export default function MobileTabBar() {
  const pathname = usePathname();

  const tabs: Tab[] = useMemo(
    () => [
      { href: "/", label: "الرئيسية", icon: <Home className="h-5 w-5" aria-hidden="true" /> },
      { href: "/quran", label: "القرآن", icon: <BookOpenText className="h-5 w-5" aria-hidden="true" /> },
      { href: "/adkar", label: "الأذكار", icon: <Sparkles className="h-5 w-5" aria-hidden="true" /> },
    ],
    []
  );

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 pb-[env(safe-area-inset-bottom)]">
      <div className="glass-panel mx-3 mb-3 flex items-stretch justify-between gap-1 px-2 py-2">
        {tabs.map((t) => {
          const active = pathname === t.href;
          return (
            <Link
              key={t.href}
              href={t.href}
              className={[
                "flex min-w-0 flex-1 flex-col items-center justify-center gap-1 rounded-2xl px-1 py-2 text-[11px] transition",
                active ? "bg-white/8 text-accent ring-1 ring-accent/20" : "text-white/70 hover:bg-white/5",
              ].join(" ")}
            >
              <span className={active ? "text-accent" : "text-white/70"}>{t.icon}</span>
              <span className={active ? "text-accent" : "text-white/70"}>{t.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
