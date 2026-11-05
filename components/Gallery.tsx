import Image from 'next/image';
import {getTranslations} from 'next-intl/server';
import {photos} from '@/lib/site';
import SectionHeading from './SectionHeading';

/** Native scroll-snap gallery: swipe on mobile, no JS. Add more photos in lib/site.ts */
export default async function Gallery() {
  const t = await getTranslations('Gallery');
  return (
    <section id="gallery" aria-labelledby="gallery-title" className="py-24 md:py-32 bg-ink/50 overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mb-10 flex items-end justify-between">
          <SectionHeading kicker={t('kicker')} title={t('title')} id="gallery-title" />
          <span className="text-xs uppercase tracking-[0.25em] text-mist md:hidden">{t('swipe')} →</span>
        </div>
      </div>
      <div className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 md:px-[max(2rem,calc((100vw-80rem)/2+2rem))] pb-4">
        {photos.map((p, n) => (
          <figure key={p.src} className={`relative shrink-0 snap-center overflow-hidden rounded-3xl ${p.h > p.w ? 'w-[78vw] md:w-[30rem] aspect-[2/3]' : 'w-[86vw] md:w-[40rem] aspect-square'}`}>
            <Image src={p.src} alt={p.alt} fill sizes="(max-width: 768px) 86vw, 40rem" className="object-cover" />
            <figcaption className="absolute bottom-4 left-5 font-mono text-xs text-moon/80">KYX—NYX / {String(n + 1).padStart(2, '0')}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
