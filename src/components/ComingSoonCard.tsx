import { ReactNode } from "react";

export default function ComingSoonCard({
  title,
  description,
  rightSlot,
}: {
  title: string;
  description?: string;
  rightSlot?: ReactNode;
}) {
  return (
    <section className="mx-auto w-full max-w-3xl px-4">
      <div className="glass-card p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-white sm:text-2xl">{title}</h1>
            {description ? (
              <p className="mt-2 text-sm text-white/65 leading-relaxed">
                {description}
              </p>
            ) : null}
          </div>
          {rightSlot ? <div>{rightSlot}</div> : null}
        </div>

        <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
          قيد التحضير: سنضيف المحتوى والميزات بالتدريج (قراءة، ترجمة، تفضيل، وواجهة تفاعلية).
        </div>
      </div>
    </section>
  );
}

