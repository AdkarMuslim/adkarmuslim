"use client";

import { useCallback, useEffect, useState } from "react";

const iconBtn =
  "focus-ring inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/75 transition hover:bg-white/10 hover:text-white";

type ShareToolbarProps = {
  /** رابط مطلق للصفحة (مثلاً https://www.adkarmuslim.com/...) */
  url: string;
  /** عنوان قصير يظهر في المشاركة */
  title: string;
  className?: string;
};

/** أيقونات SVG فقط — بدون lucide-react لتفادي مشاكل vendor-chunks في التطوير */
function IconCopy({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
    </svg>
  );
}

function IconCheck({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

function IconShare({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98" />
    </svg>
  );
}

function IconTwitter({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function IconFacebook({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function IconSend({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
    </svg>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.148-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.514-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

/**
 * شريط مشاركة: نسخ الرابط، Web Share، واتساب، X، فيسبوك، تيليغرام.
 * (بدون lucide-react — يقلّل أخطاء vendor-chunks مع Next.js محلياً)
 */
export default function ShareToolbar({ url, title, className = "" }: ShareToolbarProps) {
  const [copied, setCopied] = useState(false);
  const [canNativeShare, setCanNativeShare] = useState(false);

  useEffect(() => {
    setCanNativeShare(typeof navigator !== "undefined" && typeof navigator.share === "function");
  }, []);

  const textForSocial = `${title}\n${url}`;

  const copyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  }, [url]);

  const nativeShare = useCallback(async () => {
    try {
      await navigator.share({ title, text: textForSocial, url });
    } catch {
      // cancelled أو غير مدعوم
    }
  }, [title, textForSocial, url]);

  const waHref = `https://wa.me/?text=${encodeURIComponent(textForSocial)}`;
  const xHref = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
  const fbHref = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
  const tgHref = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;

  return (
    <div
      className={`mt-5 border-t border-white/10 pt-4 ${className}`}
      role="region"
      aria-label="مشاركة الصفحة"
    >
      <div className="mb-3 text-xs font-medium text-white/50">مشاركة</div>
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={copyLink}
          className={iconBtn}
          aria-label={copied ? "تم نسخ الرابط" : "نسخ الرابط"}
          title={copied ? "تم النسخ" : "نسخ الرابط"}
        >
          {copied ? (
            <IconCheck className="h-4 w-4 text-emerald-400" />
          ) : (
            <IconCopy className="h-4 w-4 text-accent" />
          )}
        </button>

        {canNativeShare ? (
          <button
            type="button"
            onClick={nativeShare}
            className={iconBtn}
            aria-label="مشاركة عبر الجهاز"
            title="مشاركة"
          >
            <IconShare className="h-4 w-4 text-accent" />
          </button>
        ) : null}

        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          className={iconBtn}
          aria-label="مشاركة على واتساب"
          title="واتساب"
        >
          <WhatsAppIcon className="h-4 w-4 text-emerald-400" />
        </a>

        <a
          href={xHref}
          target="_blank"
          rel="noopener noreferrer"
          className={iconBtn}
          aria-label="مشاركة على X"
          title="X (تويتر)"
        >
          <IconTwitter className="h-4 w-4 text-accent" />
        </a>

        <a
          href={fbHref}
          target="_blank"
          rel="noopener noreferrer"
          className={iconBtn}
          aria-label="مشاركة على فيسبوك"
          title="فيسبوك"
        >
          <IconFacebook className="h-4 w-4 text-accent" />
        </a>

        <a
          href={tgHref}
          target="_blank"
          rel="noopener noreferrer"
          className={iconBtn}
          aria-label="مشاركة على تيليغرام"
          title="تيليغرام"
        >
          <IconSend className="h-4 w-4 text-accent" />
        </a>
      </div>
    </div>
  );
}
