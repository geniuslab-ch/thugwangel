import {regions} from '@/lib/site';

export default function Marquee({words = regions}: {words?: string[]}) {
  const row = [...words, ...words];
  return (
    <div className="relative border-y border-line bg-ink py-4 overflow-hidden" aria-hidden>
      <div className="flex w-max animate-marquee gap-8 whitespace-nowrap">
        {row.map((w, i) => (
          <span key={i} className="flex items-center gap-8 font-display text-sm md:text-base font-bold uppercase tracking-[0.2em] text-mist">
            {w} <span className="text-violet">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
