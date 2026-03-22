"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useId, useState } from "react";

type SearchBarProps = {
  className?: string;
  /** Placeholder أقصر على الموبايل */
  placeholder?: string;
  /** حقل أعلى قليلاً على الشاشات الصغيرة */
  size?: "default" | "comfortable";
};

export default function SearchBar({
  className,
  placeholder = "ابحث في الأذكار والقرآن...",
  size = "default",
}: SearchBarProps) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const inputId = useId();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = q.trim();
    if (!trimmed) return;
    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
  };

  const h = size === "comfortable" ? "h-11 min-h-[2.75rem]" : "h-10 min-h-10";
  /** في RTL الأيقونة على inline-end (يسار الشاشة) → مسافة pe */
  const padIcon = size === "comfortable" ? "pe-12" : "pe-11";

  return (
    <form onSubmit={onSubmit} className={className}>
      <label className="sr-only" htmlFor={inputId}>
        بحث
      </label>
      <div className="relative">
        <input
          id={inputId}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={placeholder}
          className={`glass-panel ${h} w-full rounded-xl border border-white/15 bg-white/[0.07] px-3 ${padIcon} text-sm text-white/95 placeholder:text-white/45 outline-none ring-1 ring-white/5 transition focus:border-accent/40 focus:ring-2 focus:ring-accent/25`}
          autoComplete="off"
          enterKeyHint="search"
          inputMode="search"
        />
        <button
          type="submit"
          aria-label="بحث"
          className="absolute end-2 top-1/2 -translate-y-1/2 rounded-lg p-2 text-accent/90 hover:bg-accent/15 hover:text-accent"
        >
          <Search className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </form>
  );
}

