import Image from 'next/image';
import {getTranslations} from 'next-intl/server';
import {Link} from '@/i18n/routing';
import {site} from '@/lib/site';

export default async function Hero() {
  const t = await getTranslations('Hero');

  return (
    <section id="home" className="relative min-h-[100svh] overflow-hidden flex flex-col">
      {/* portrait, duotone */}
      <div className="absolute inset-0 md:left-[38%]">
        <Image
          src={site.portrait}
          alt="Kyx-Nyx — female rap artist based in Switzerland"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 62vw"
          className="object-cover object-[60%_20%] grayscale contrast-125"
        />
        <div className="absolute inset-0 bg-violet-deep mix-blend-multiply opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-t from-night via-night/40 to-night/10" />
        <div className="absolute inset-0 hidden md:block bg-gradient-to-r from-night via-night/30 to-transparent" />
      </div>

      {/* eclipse */}
      <div aria-hidden className="pointer-events-none absolute -left-24 top-[16%] h-[70vw] w-[70vw] max-h-[620px] max-w-[620px] md:left-[24%] md:top-[12%]">
        <div className="eclipse h-full w-full rounded-full animate-spin-slow opacity-70" />
        <div className="absolute inset-0 rounded-full bg-violet/30 blur-[90px]" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-end px-5 pb-14 pt-28 md:px-8 md:pb-20">
        <p className="reveal mb-5 inline-flex w-fit items-center gap-3 rounded-full border border-line bg-night/40 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.25em] text-moon backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-ember" />
          {t('eyebrow')}
        </p>

        <h1 className="reveal font-display font-black uppercase leading-[0.82] tracking-[-0.04em]" style={{animationDelay: '120ms'}}>
          <span className="sr-only">Kyx-Nyx — </span>
          <span aria-hidden className="block text-[26vw] md:text-[13vw] lg:text-[11.5rem]">Kyx</span>
          <span aria-hidden className="block text-[26vw] md:text-[13vw] lg:text-[11.5rem] text-outline pl-[8vw] md:pl-[6vw]">Nyx</span>
          <span className="sr-only">{t('eyebrow')}</span>
        </h1>

        <div className="reveal mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between" style={{animationDelay: '280ms'}}>
          <div className="max-w-md">
            <p className="font-serif text-2xl md:text-3xl italic leading-snug text-moon">{t('tagline')}</p>
            <p className="mt-2 text-xs uppercase tracking-[0.25em] text-mist">{t('aka')}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/booking" className="group inline-flex items-center justify-center gap-3 rounded-full bg-violet px-7 py-4 text-sm font-bold uppercase tracking-[0.18em] text-night transition-all hover:bg-glow hover:gap-5">
              {t('ctaBook')} <span aria-hidden>→</span>
            </Link>
            <Link href={{pathname: '/', hash: 'music'}} className="inline-flex items-center justify-center gap-3 rounded-full border border-moon/40 px-7 py-4 text-sm font-bold uppercase tracking-[0.18em] text-moon transition-colors hover:bg-moon hover:text-night">
              <span aria-hidden>▶</span> {t('ctaListen')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
