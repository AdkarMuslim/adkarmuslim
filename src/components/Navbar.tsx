import Image from "next/image";
import Link from "next/link";
import SearchBar from "./SearchBar";

const links: Array<{ href: string; label: string }> = [
  { href: "/", label: "الرئيسية" },
  { href: "/quran", label: "القرآن" },
  { href: "/quran/tafsir", label: "تفسير القرآن" },
  { href: "/adkar", label: "الأذكار" },
  { href: "/duaa", label: "الأدعية" },
  { href: "/hadith", label: "الحديث" },
  { href: "/prayer-times", label: "مواقيت الصلاة" },
];

export default function Navbar() {
  return (
    <header className="hidden lg:block">
      <div className="fixed left-0 right-0 top-0 z-50">
        <div className="mx-auto max-w-6xl px-4 pt-4">
          <div className="glass-panel ring-accent/0 flex items-center justify-between px-4 py-3">
            <Link
              href="/"
              className="flex shrink-0 items-center"
              aria-label="أذكار المسلم"
            >
              {/* مصدر 800×512 — شعار أفقي ذهبي، ارتفاع ~56px */}
              <Image
                src="/logo.png"
                alt="أذكار المسلم"
                width={800}
                height={512}
                className="h-14 w-auto max-h-14 max-w-[min(100%,320px)] shrink-0 object-contain object-right"
                sizes="(max-width: 1280px) 200px, 280px"
                priority
              />
            </Link>

            <nav className="flex items-center gap-1">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="rounded-xl px-2 py-2 text-sm text-white/70 transition hover:bg-white/5 hover:text-white"
                >
                  {l.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <div className="w-[420px]">
                <SearchBar />
              </div>
            </div>

          </div>
        </div>
      </div>
    </header>
  );
}

