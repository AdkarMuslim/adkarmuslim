"use client";

import ContentPageFooter from "../../components/ContentPageFooter";
import { useEffect, useMemo, useState } from "react";

type Timings = {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
};

type SourceMode = "geo" | "city";
type PrayerMethodOption = {
  id: number;
  label: string;
  latitude?: number;
  longitude?: number;
};

const STORAGE_KEY = "am_prayer_times_v1";
const CALCULATIONS_URL =
  "https://raw.githubusercontent.com/itsSamBz/Islamic-Api/main/Prayer_Times_Calculations.json";

const FALLBACK_METHODS: PrayerMethodOption[] = [
  { id: 0, label: "Jafari (Shia Ithna-Ashari)" },
  { id: 1, label: "Karachi (University of Islamic Sciences)" },
  { id: 2, label: "ISNA" },
  { id: 3, label: "Muslim World League" },
  { id: 4, label: "Umm Al-Qura (Makkah)" },
  { id: 5, label: "Egyptian General Authority" },
  { id: 7, label: "Tehran" },
  { id: 8, label: "Gulf Region" },
  { id: 9, label: "Kuwait" },
  { id: 10, label: "Qatar" },
  { id: 11, label: "Singapore" },
  { id: 12, label: "France" },
  { id: 13, label: "Turkey" },
  { id: 14, label: "Russia" },
  { id: 15, label: "Moonsighting Committee" },
  { id: 16, label: "Dubai" },
  { id: 17, label: "JAKIM (Malaysia)" },
  { id: 18, label: "Tunisia" },
  { id: 19, label: "Algeria" },
  { id: 20, label: "Kemenag (Indonesia)" },
  { id: 21, label: "Morocco" },
  { id: 22, label: "Portugal" },
  { id: 23, label: "Jordan" },
];

type CalculationApiShape = {
  data?: Record<
    string,
    {
      id?: number;
      name?: string;
      location?: { latitude?: number; longitude?: number };
    }
  >;
};

function parseLooseJson(raw: string): CalculationApiShape | null {
  // Tolerate known formatting issues in the upstream file (Arabic decimal separator + trailing commas).
  const normalized = raw
    .replace(/٫/g, ".")
    .replace(/,\s*([}\]])/g, "$1");
  try {
    return JSON.parse(normalized) as CalculationApiShape;
  } catch {
    return null;
  }
}

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

function toRad(v: number): number {
  return (v * Math.PI) / 180;
}

function haversineKm(aLat: number, aLon: number, bLat: number, bLon: number): number {
  const R = 6371;
  const dLat = toRad(bLat - aLat);
  const dLon = toRad(bLon - aLon);
  const x =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(aLat)) * Math.cos(toRad(bLat)) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(x));
}

function getNearestMethodId(
  lat: number,
  lon: number,
  methods: PrayerMethodOption[],
  fallback = 3,
): number {
  const candidates = methods.filter(
    (m) => Number.isFinite(m.latitude) && Number.isFinite(m.longitude),
  );
  if (!candidates.length) return fallback;
  let best = candidates[0];
  let bestDistance = haversineKm(
    lat,
    lon,
    Number(best.latitude),
    Number(best.longitude),
  );
  for (const m of candidates.slice(1)) {
    const d = haversineKm(lat, lon, Number(m.latitude), Number(m.longitude));
    if (d < bestDistance) {
      bestDistance = d;
      best = m;
    }
  }
  return best.id;
}

export default function PrayerTimesPage() {
  const [timings, setTimings] = useState<Timings | null>(null);
  const [timezone, setTimezone] = useState<string>("");
  const [method, setMethod] = useState<number>(3);
  const [methods, setMethods] = useState<PrayerMethodOption[]>(FALLBACK_METHODS);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [mode, setMode] = useState<SourceMode>("geo");
  const [city, setCity] = useState<string>("Casablanca");
  const [country, setCountry] = useState<string>("Morocco");
  const [nextLabel, setNextLabel] = useState<string>("--");
  const [countdown, setCountdown] = useState<string>("--:--:--");
  const [locationLabel, setLocationLabel] = useState<string>("");

  const ordered = useMemo(
    () =>
      timings
        ? [
            { key: "Fajr", label: "الفجر", time: timings.Fajr },
            { key: "Sunrise", label: "الشروق", time: timings.Sunrise },
            { key: "Dhuhr", label: "الظهر", time: timings.Dhuhr },
            { key: "Asr", label: "العصر", time: timings.Asr },
            { key: "Maghrib", label: "المغرب", time: timings.Maghrib },
            { key: "Isha", label: "العشاء", time: timings.Isha },
          ]
        : [],
    [timings],
  );

  useEffect(() => {
    const fetchMethods = async () => {
      try {
        const res = await fetch(CALCULATIONS_URL, { cache: "force-cache" });
        const raw = await res.text();
        const json = parseLooseJson(raw);
        if (!json) return;
        const items = Object.values(json?.data ?? {})
          .map((x) => ({
            id: Number(x?.id ?? NaN),
            label: String(x?.name ?? "").trim(),
            latitude:
              typeof x?.location?.latitude === "number" ? x.location.latitude : undefined,
            longitude:
              typeof x?.location?.longitude === "number" ? x.location.longitude : undefined,
          }))
          .filter((x) => Number.isFinite(x.id) && x.id >= 0 && x.id <= 23 && x.label.length > 0)
          .sort((a, b) => a.id - b.id);
        if (items.length > 0) setMethods(items);
      } catch {
        // Keep fallback methods when external source fails.
      }
    };
    void fetchMethods();
  }, []);

  const persist = (partial?: Partial<{ mode: SourceMode; city: string; country: string; method: number }>) => {
    try {
      const payload = {
        mode,
        city,
        country,
        method,
        ...partial,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // ignore
    }
  };

  async function fetchByGeo(lat: number, lon: number, selectedMethod = method) {
    setLoading(true);
    setError("");
    try {
      const url = `https://api.aladhan.com/v1/timings?latitude=${encodeURIComponent(String(lat))}&longitude=${encodeURIComponent(String(lon))}&method=${selectedMethod}&school=0`;
      const res = await fetch(url);
      const json = (await res.json()) as any;
      if (!res.ok || json?.code !== 200) throw new Error("API error");
      setTimings(json.data.timings);
      setTimezone(String(json.data.meta?.timezone ?? ""));
      setLocationLabel(`GPS (${lat.toFixed(3)}, ${lon.toFixed(3)})`);
      setMode("geo");
      persist({ mode: "geo", method: selectedMethod });
    } catch {
      setError("تعذّر جلب أوقات الصلاة عبر GPS. جرّب الإدخال اليدوي.");
    } finally {
      setLoading(false);
    }
  }

  async function fetchByCity(selectedCity = city, selectedCountry = country, selectedMethod = method) {
    setLoading(true);
    setError("");
    try {
      const url = `https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(selectedCity)}&country=${encodeURIComponent(selectedCountry)}&method=${selectedMethod}&school=0`;
      const res = await fetch(url);
      const json = (await res.json()) as any;
      if (!res.ok || json?.code !== 200) throw new Error("API error");
      setTimings(json.data.timings);
      setTimezone(String(json.data.meta?.timezone ?? ""));
      setLocationLabel(`${selectedCity}, ${selectedCountry}`);
      setMode("city");
      persist({
        mode: "city",
        city: selectedCity,
        country: selectedCountry,
        method: selectedMethod,
      });
    } catch {
      setError("تعذّر جلب أوقات الصلاة للمدينة المحددة.");
    } finally {
      setLoading(false);
    }
  }

  function detectByGeo() {
    if (!navigator.geolocation) {
      setError("المتصفح لا يدعم GPS.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const autoMethod = getNearestMethodId(
          pos.coords.latitude,
          pos.coords.longitude,
          methods,
          method,
        );
        setMethod(autoMethod);
        void fetchByGeo(pos.coords.latitude, pos.coords.longitude, autoMethod);
      },
      () => {
        setError("تم رفض إذن الموقع. استعمل الإدخال اليدوي.");
      },
      { enableHighAccuracy: true, timeout: 12000 },
    );
  }

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as Partial<{
          mode: SourceMode;
          city: string;
          country: string;
          method: number;
        }>;
        if (saved.city) setCity(saved.city);
        if (saved.country) setCountry(saved.country);
        if (saved.method) setMethod(saved.method);
        if (saved.mode) setMode(saved.mode);
        if (saved.mode === "city" && saved.city && saved.country) {
          void fetchByCity(saved.city, saved.country, saved.method ?? 3);
          return;
        }
      }
    } catch {
      // ignore
    }
    detectByGeo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    <main className="mx-auto w-full max-w-4xl px-3 pb-28 sm:px-4">
      <section className="glass-panel ring-accent/0 p-5 sm:p-7">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-white sm:text-3xl">أوقات الصلاة</h1>
            <p className="mt-1 text-sm text-white/60">بحسب موقعك الحالي أو مدينة تختارها يدويا.</p>
          </div>
          <button
            type="button"
            onClick={detectByGeo}
            className="rounded-xl border border-accent/25 bg-accent/10 px-3 py-2 text-xs text-accent hover:bg-accent/15"
          >
            تحديد موقعي (GPS)
          </button>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="text-xs text-white/55">الموقع</div>
            <div className="mt-1 text-sm text-white/85">{locationLabel || "—"}</div>
            <div className="mt-1 text-xs text-white/50">{timezone || ""}</div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="text-xs text-white/55">الصلاة القادمة</div>
            <div className="mt-1 text-sm font-semibold text-accent">{nextLabel}</div>
            <div className="mt-1 text-lg font-bold">{countdown}</div>
          </div>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-1">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
            <label className="mb-1 block text-xs text-white/55">طريقة الحساب</label>
            <select
              value={method}
              onChange={(e) => setMethod(Number.parseInt(e.target.value, 10))}
              className="w-full rounded-xl border border-white/10 bg-[#0a0a1a]/80 px-3 py-2 text-sm text-white/90"
            >
              {methods.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="mb-2 text-sm text-white/70">إدخال يدوي (fallback)</div>
          <div className="grid gap-2 sm:grid-cols-2">
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="City (e.g. Casablanca)"
              className="rounded-xl border border-white/10 bg-[#0a0a1a]/80 px-3 py-2 text-sm text-white/90"
            />
            <input
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="Country (e.g. Morocco)"
              className="rounded-xl border border-white/10 bg-[#0a0a1a]/80 px-3 py-2 text-sm text-white/90"
            />
          </div>
          <button
            type="button"
            onClick={() => void fetchByCity()}
            className="mt-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/85 hover:bg-white/10"
          >
            جلب الأوقات للمدينة
          </button>
          {mode === "city" ? <div className="mt-2 text-xs text-accent">وضع المدينة اليدوي مفعل.</div> : null}
        </div>

        {error ? <div className="mt-4 rounded-xl border border-rose-400/30 bg-rose-500/10 p-3 text-sm text-rose-200">{error}</div> : null}
        {loading ? <div className="mt-4 text-sm text-white/60">جاري تحميل أوقات الصلاة...</div> : null}

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {ordered.map((p) => (
            <div key={p.key} className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-xs text-white/55">{p.label}</div>
              <div className="mt-1 text-lg font-bold text-white">{p.time}</div>
            </div>
          ))}
        </div>

        <ContentPageFooter
          primaryLink={{ href: "/", label: "الرئيسية" }}
          related={[
            { href: "/quran", label: "القرآن الكريم" },
            { href: "/adkar", label: "الأذكار" },
            { href: "/hadith", label: "الحديث النبوي" },
          ]}
        />
      </section>
    </main>
  );
}

