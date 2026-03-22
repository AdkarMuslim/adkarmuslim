import Image from "next/image";
import Link from "next/link";

/**
 * النافبار الكبير مخفي على الموبايل (lg:block فقط) — هاد الشريط يعرض الشعار.
 */
export default function MobileHeader() {
  return (
    <header className="lg:hidden fixed left-0 right-0 top-0 z-40 border-b border-white/10 bg-[#0a0a1a]/85 backdrop-blur-md supports-[backdrop-filter]:bg-[#0a0a1a]/70">
      <div className="mx-auto flex min-h-14 max-w-6xl items-center justify-center px-3 pb-1 pt-[max(0.25rem,env(safe-area-inset-top))]">
        <Link
          href="/"
          className="flex shrink-0 items-center justify-center"
          aria-label="أذكار المسلم — الرئيسية"
        >
          <Image
            src="/logo.png"
            alt="أذكار المسلم"
            width={800}
            height={512}
            className="h-10 w-auto max-h-10 max-w-[min(85vw,280px)] object-contain object-center"
            sizes="280px"
            priority
          />
        </Link>
      </div>
    </header>
  );
}
