import Image from 'next/image';
import {getTranslations} from 'next-intl/server';
import SectionHeading from './SectionHeading';
import {photos} from '@/lib/site';

export default async function About() {
  const t = await getTranslations('About');
  const facts = [
    [t('factGenre'), t('factGenreValue')],
    [t('factBase'), t('factBaseValue')],
    [t('factLang'), t('factLangValue')],
    [t('factStatus'), t('factStatusValue')]
  ];
  const p = photos[1];

  return (
    <section id="about" aria-labelledby="about-title" className="relative py-24 md:py-36">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 md:grid-cols-12 md:px-8">
        <div className="md:col-span-5 relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] md:rounded-[3rem] rotate-[-2deg]">
            <Image quality={60} src={p.src} alt={p.alt} fill sizes="(max-width: 768px) 90vw, 40vw" className="object-cover object-[30%_30%]" />
            <div className="absolute inset-0 ring-1 ring-inset ring-moon/10 rounded-[inherit]" />
          </div>
          <div aria-hidden className="absolute -bottom-6 -right-2 md:-right-8 rounded-full bg-moon px-5 py-3 font-display text-xs font-black uppercase tracking-widest text-night rotate-[6deg] animate-float">
            CH ✦ EN
          </div>
        </div>

        <div className="md:col-span-7 md:pl-8 flex flex-col justify-center">
          <SectionHeading kicker={t('kicker')} title={t('title')} id="about-title" />
          <div className="mt-8 space-y-5 text-lg leading-relaxed text-mist max-w-xl">
            <p className="text-moon">{t('p1')}</p>
            <p>{t('p2')}</p>
            <p>{t('p3')}</p>
          </div>
          <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line max-w-xl">
            {facts.map(([k, v]) => (
              <div key={k} className="bg-night p-4 md:p-5">
                <dt className="text-xs uppercase tracking-[0.2em] text-violet">{k}</dt>
                <dd className="mt-1 text-sm md:text-base font-semibold text-moon">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
