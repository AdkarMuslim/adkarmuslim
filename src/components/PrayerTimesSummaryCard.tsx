"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type Timings = {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
};

function parseHHMMToDate(hhmm: string, baseDate = new Date()): Date | null {
  const m = hhmm.match(/^(\d{1,2}):(\d{2})/);
  if (!m) return null;
  const d = new Date(baseDate);
  d.setHours(Number(m[1]), Number(m[2]), 0, 0);
  return d;
}

function formatRemaining(ms: number): string {
  const total = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export default function PrayerTimesSummaryCard() {
  const [timings, setTimings] = useState<Timings | null>(null);
  const [nextLabel, setNextLabel] = useState<string>("تحديث قريب");
  const [countdown, setCountdown] = useState<string>("--:--:--");

  const ordered = useMemo(
    () =>
      timings
        ? [
            { label: "الفجر", time: timings.Fajr },
            { label: "الظهر", time: timings.Dhuhr },
            { label: "العصر", time: timings.Asr },
            { label: "المغرب", time: timings.Maghrib },
            { label: "العشاء", time: timings.Isha },
            { label: "الشروق", time: timings.Sunrise },
          ]
        : [
            { label: "الفجر", time: "—" },
            { label: "الظهر", time: "—" },
            { label: "العصر", time: "—" },
            { label: "المغرب", time: "—" },
            { label: "العشاء", time: "—" },
            { label: "الشروق", time: "—" },
          ],
    [timings],
  );

  useEffect(() => {
    const fetchByCoords = async (lat: number, lon: number) => {
      const res = await fetch(
        `https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lon}&method=4&school=0`,
      );
      const json = (await res.json()) as any;
      if (!res.ok || json?.code !== 200) throw new Error("timings error");
      setTimings(json.data.timings);
    };

    const fallbackMakkah = () => {
      // Makkah fallback when user denies location permission.
      void fetchByCoords(21.4225, 39.8262).catch(() => {
        // keep placeholders
      });
    };

    if (!navigator.geolocation) {
      fallbackMakkah();
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        void fetchByCoords(pos.coords.latitude, pos.coords.longitude).catch(fallbackMakkah);
      },
      () => fallbackMakkah(),
      { enableHighAccuracy: true, timeout: 10000 },
    );
  }, []);

  useEffect(() => {
    if (!timings) return;
    const tick = () => {
      const now = new Date();
      const slots = [
        { label: "الفجر", date: parseHHMMToDate(timings.Fajr, now) },
        { label: "الشروق", date: parseHHMMToDate(timings.Sunrise, now) },
        { label: "الظهر", date: parseHHMMToDate(timings.Dhuhr, now) },
        { label: "العصر", date: parseHHMMToDate(timings.Asr, now) },
        { label: "المغرب", date: parseHHMMToDate(timings.Maghrib, now) },
        { label: "العشاء", date: parseHHMMToDate(timings.Isha, now) },
      ].filter((x): x is { label: string; date: Date } => Boolean(x.date));

      let next = slots.find((s) => s.date.getTime() > now.getTime());
      if (!next && slots.length) {
        next = { ...slots[0], date: new Date(slots[0].date.getTime() + 24 * 60 * 60 * 1000) };
      }
      if (!next) return;
      setNextLabel(next.label);
      setCountdown(formatRemaining(next.date.getTime() - now.getTime()));
    };
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [timings]);

  return (
    <div className="glass-card p-5">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs text-white/55">أوقات الصلاة</div>
          <div className="mt-1 text-lg font-bold">{nextLabel}</div>
        </div>
        <div className="text-xs text-white/55">العدّ التنازلي: {countdown}</div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        {ordered.map((p) => (
          <div key={p.label} className="glass-panel flex flex-col justify-center p-3">
            <div className="text-[11px] text-white/55">{p.label}</div>
            <div className="mt-1 text-sm font-semibold text-white/90">{p.time}</div>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <Link
          href="/prayer-times"
          className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/85 transition hover:bg-white/10"
        >
          عرض التفاصيل
        </Link>
      </div>
    </div>
  );
}

