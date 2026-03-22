"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function SearchBar({ className }: { className?: string }) {
  const router = useRouter();
  const [q, setQ] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = q.trim();
    if (!trimmed) return;
    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
  };

  return (
    <form onSubmit={onSubmit} className={className}>
      <label className="sr-only" htmlFor="global-search">
        بحث
      </label>
      <div className="relative">
        <input
          id="global-search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="ابحث في الأذكار والقرآن..."
          className="glass-panel h-10 w-full rounded-xl border border-white/10 bg-white/5 px-4 pr-11 text-sm text-white/90 placeholder:text-white/40 outline-none transition focus:ring-0"
          autoComplete="off"
        />
        <button
          type="submit"
          aria-label="بحث"
          className="absolute left-2 top-1/2 -translate-y-1/2 rounded-lg p-2 text-white/60 hover:bg-white/10 hover:text-white/90"
        >
          <Search className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </form>
  );
}

