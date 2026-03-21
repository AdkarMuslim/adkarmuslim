"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { BookOpenText, CircleDot, Home, Menu, Sparkles, X } from "lucide-react";
import type { ReactNode } from "react";
import { useMemo, useState } from "react";

type Tab = { href: string; label: string; icon: ReactNode };

export default function MobileTabBar() {
  const pathname = usePathname();
  const [moreOpen, setMoreOpen] = useState(false);

  const tabs: Tab[] = useMemo(
    () => [
      { href: "/", label: "الرئيسية", icon: <Home className="h-5 w-5" aria-hidden="true" /> },
      { href: "/quran", label: "القرآن", icon: <BookOpenText className="h-5 w-5" aria-hidden="true" /> },
      { href: "/adkar", label: "الأذكار", icon: <Sparkles className="h-5 w-5" aria-hidden="true" /> },
      { href: "/tasbih", label: "المسبحة", icon: <CircleDot className="h-5 w-5" aria-hidden="true" /> },
      { href: "__more__", label: "المزيد", icon: <Menu className="h-5 w-5" aria-hidden="true" /> },
    ],
    []
  );

  const drawerLinks: Array<{ href: string; label: string }> = [
    { href: "/prayer-times", label: "أوقات الصلاة" },
    { href: "/qibla", label: "اتجاه القبلة" },
    { href: "/calendar", label: "التقويم الهجري" },
    { href: "/favorites", label: "المفضلة" },
    { href: "/settings", label: "الإعدادات" },
    { href: "/duaa", label: "الأدعية" },
  ];

  return (
    <>
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50">
        <div className="glass-panel mx-3 mb-3 flex items-center justify-between px-2 py-2">
          {tabs.map((t) => {
            const active = t.href !== "__more__" && pathname === t.href;
            const isMore = t.href === "__more__";

            return isMore ? (
              <button
                key={t.label}
                type="button"
                onClick={() => setMoreOpen(true)}
                className="flex flex-1 flex-col items-center justify-center gap-1 rounded-2xl px-1 py-2 text-[11px] text-white/70 transition hover:bg-white/5"
                aria-label="فتح المزيد"
              >
                <span className={active ? "text-accent" : "text-white/70"}>{t.icon}</span>
                <span className="text-white/70">{t.label}</span>
              </button>
            ) : (
              <Link
                key={t.href}
                href={t.href}
                className={[
                  "flex flex-1 flex-col items-center justify-center gap-1 rounded-2xl px-1 py-2 text-[11px] transition",
                  active ? "bg-white/8 text-accent ring-accent/20 ring-1" : "text-white/70 hover:bg-white/5",
                ].join(" ")}
              >
                <span className={active ? "text-accent" : "text-white/70"}>{t.icon}</span>
                <span className={active ? "text-accent" : "text-white/70"}>{t.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      <AnimatePresence>
        {moreOpen && (
          <motion.div
            className="fixed inset-0 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              type="button"
              aria-label="إغلاق"
              className="absolute inset-0 bg-black/50"
              onClick={() => setMoreOpen(false)}
            />

            <motion.aside
              initial={{ x: 24, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 24, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="absolute bottom-3 left-3 right-3 lg:left-auto lg:w-[420px] bg-transparent"
            >
              <div className="glass-panel relative overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/20 text-accent">
                      م
                    </span>
                    <div>
                      <div className="text-sm font-semibold text-white/90">المزيد</div>
                      <div className="text-xs text-white/50">وصول سريع للصفحات</div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setMoreOpen(false)}
                    className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5"
                    aria-label="إغلاق"
                  >
                    <X className="h-4 w-4 text-accent" aria-hidden="true" />
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-1 px-3 pb-4">
                  {drawerLinks.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      onClick={() => setMoreOpen(false)}
                      className="rounded-2xl px-4 py-3 text-sm text-white/75 transition hover:bg-white/5 hover:text-white"
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

