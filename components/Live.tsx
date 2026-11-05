import {getTranslations} from 'next-intl/server';
import {Link} from '@/i18n/routing';
import SectionHeading from './SectionHeading';

export const EVENT_KEYS = ['festival', 'club', 'showcase', 'cultural', 'private', 'corporate'] as const;

export async function EventGrid() {
  const t = await getTranslations('Live');
  return (
    <ul className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
      {EVENT_KEYS.map((k, n) => (
        <li key={k} className="group relative bg-night p-6 md:p-8 transition-colors hover:bg-ink-2">
          <span className="font-mono text-xs text-violet">{String(n + 1).padStart(2, '0')}</span>
          <h3 className="mt-6 font-display text-xl font-black uppercase">{t(`events.${k}.title`)}</h3>
          <p className="mt-2 text-sm text-mist">{t(`events.${k}.text`)}</p>
          <span aria-hidden className="absolute right-6 top-6 text-2xl text-violet opacity-0 transition-opacity group-hover:opacity-100">✦</span>
        </li>
      ))}
    </ul>
  );
}

export default async function Live() {
  const t = await getTranslations('Live');
  return (
    <section id="live" aria-labelledby="live-title" className="relative py-24 md:py-36 overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-violet/15 blur-[120px]" />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="mb-12 grid gap-6 md:grid-cols-2 md:items-end">
          <SectionHeading kicker={t('kicker')} title={t('title')} id="live-title" />
          <p className="text-lg text-mist md:pl-10">{t('intro')}</p>
        </div>
        <EventGrid />
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link href="/booking" className="inline-flex items-center justify-center gap-3 rounded-full bg-violet px-8 py-4 text-sm font-bold uppercase tracking-[0.18em] text-night hover:bg-glow">
            {t('cta')} →
          </Link>
          <Link href="/press-kit" className="inline-flex items-center justify-center rounded-full border border-moon/30 px-8 py-4 text-sm font-bold uppercase tracking-[0.18em] hover:bg-moon hover:text-night">
            {t('ctaEpk')}
          </Link>
        </div>
      </div>
    </section>
  );
}
