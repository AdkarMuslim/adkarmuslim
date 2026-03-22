import Image from "next/image";
import Link from "next/link";

import SearchBar from "./SearchBar";

/**
 * شريط الموبايل: شعار + شريط بحث واضح (الناف الكبير مخفي حتى lg).
 */
export default function MobileHeader() {
  return (
    <header className="lg:hidden fixed left-0 right-0 top-0 z-40 border-b border-white/10 bg-[#0a0a1a]/92 shadow-[0_4px_24px_rgba(0,0,0,0.35)] backdrop-blur-md supports-[backdrop-filter]:bg-[#0a0a1a]/78">
      <div className="mx-auto max-w-6xl px-3 pb-2.5 pt-[max(0.35rem,env(safe-area-inset-top))]">
        <div className="flex flex-col gap-2.5">
          <div className="flex min-h-12 items-center justify-center">
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
                className="h-16 w-auto max-h-16 max-w-[min(94vw,320px)] object-contain object-center sm:h-[3.25rem] sm:max-h-[3.25rem]"
                sizes="(max-width:640px) 320px, 340px"
                priority
              />
            </Link>
          </div>
          <SearchBar
            size="comfortable"
            placeholder="ابحث: أذكار، قرآن، دعاء..."
            className="w-full min-w-0"
          />
        </div>
      </div>
    </header>
  );
}
