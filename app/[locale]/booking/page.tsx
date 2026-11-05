import {getTranslations, setRequestLocale} from 'next-intl/server';
import type {Metadata} from 'next';
import type {Locale} from '@/i18n/routing';
import {Link} from '@/i18n/routing';
import {EventGrid} from '@/components/Live';
import BookingForm from '@/components/BookingForm';
import Marquee from '@/components/Marquee';
import JsonLd from '@/components/JsonLd';
import {artistSchema, breadcrumbSchema, graph, pageMetadata, webPageSchema, websiteSchema} from '@/lib/seo';
import {regions, site} from '@/lib/site';

type Props = {params: Promise<{locale: Locale}>};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'Meta'});
  return pageMetadata({locale, href: '/booking', title: t('bookingTitle'), description: t('bookingDescription'), ogAlt: t('ogAlt')});
}

export default async function BookingPage({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations({locale, namespace: 'Booking'});
  const m = await getTranslations({locale, namespace: 'Meta'});
  const n = await getTranslations({locale, namespace: 'Nav'});

  const why = [1, 2, 3, 4].map((i) => ({title: t(`why${i}Title`), text: t(`why${i}Text`)}));
  const faq = [1, 2, 3, 4, 5].map((i) => ({q: t(`faq.q${i}`), a: t(`faq.a${i}`)}));

  return (
    <main id="main" className="pt-24 md:pt-32">
      <JsonLd
        data={graph([
          websiteSchema(locale),
          webPageSchema({locale, href: '/booking', name: m('bookingTitle'), description: m('bookingDescription')}),
          breadcrumbSchema(locale, [{name: n('home'), href: '/'}, {name: n('bookLong'), href: '/booking'}]),
          artistSchema(m('homeDescription'))
        ])}
      />

      {/* Intro */}
      <section className="relative mx-auto max-w-7xl px-5 md:px-8 pb-16 md:pb-24 overflow-x-clip">
        <div aria-hidden className="pointer-events-none absolute -right-20 -top-10 h-96 w-96 rounded-full bg-violet/25 blur-[100px]" />
        <nav aria-label="Breadcrumb" className="mb-8 text-xs uppercase tracking-[0.2em] text-mist">
          <Link href="/" className="hover:text-moon">{n('home')}</Link> <span className="mx-2 text-violet">/</span> <span className="text-moon">{n('book')}</span>
        </nav>
        <h1 className="relative max-w-5xl font-display text-[clamp(1.9rem,9vw,4.5rem)] leading-[0.98] hyphens-auto break-words font-black uppercase tracking-tight text-balance">
          {t('h1')}
        </h1>
        <p className="relative mt-8 max-w-2xl text-lg md:text-xl text-mist">{t('intro')}</p>
        <a href="#form" className="relative mt-8 inline-flex items-center gap-3 rounded-full bg-violet px-8 py-4 text-sm font-bold uppercase tracking-[0.18em] text-night hover:bg-glow">
          {t('formTitle')} ↓
        </a>
      </section>

      <Marquee />

      {/* Why */}
      <section className="mx-auto max-w-7xl px-5 md:px-8 py-20 md:py-28">
        <h2 className="mb-10 font-display text-3xl md:text-5xl font-black uppercase">{t('whyTitle')}</h2>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {why.map((w, i) => (
            <li key={i} className="rounded-3xl border border-line bg-ink p-6">
              <span className="font-serif text-4xl italic text-glow">0{i + 1}</span>
              <h3 className="mt-4 font-bold text-lg">{w.title}</h3>
              <p className="mt-2 text-sm text-mist">{w.text}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Events */}
      <section className="mx-auto max-w-7xl px-5 md:px-8 pb-20 md:pb-28">
        <h2 className="mb-10 font-display text-3xl md:text-5xl font-black uppercase">{t('eventsTitle')}</h2>
        <EventGrid />
      </section>

      {/* Regions + process */}
      <section className="mx-auto grid max-w-7xl gap-12 px-5 md:px-8 pb-20 md:pb-28 md:grid-cols-2">
        <div>
          <h2 className="font-display text-3xl md:text-4xl font-black uppercase">{t('regionsTitle')}</h2>
          <p className="mt-4 text-mist text-lg">{t('regionsText')}</p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {regions.map((r) => <li key={r} className="rounded-full border border-line px-4 py-2 text-sm">{r}</li>)}
          </ul>
        </div>
        <div>
          <h2 className="font-display text-3xl md:text-4xl font-black uppercase">{t('processTitle')}</h2>
          <ol className="mt-6 space-y-4">
            {[t('step1'), t('step2'), t('step3')].map((s, i) => (
              <li key={i} className="flex gap-5 rounded-2xl border border-line p-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-violet font-display font-black text-night">{i + 1}</span>
                <span className="self-center">{s}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Form */}
      <section id="form" aria-labelledby="form-title" className="relative bg-ink/60 border-y border-line py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 md:px-8 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <h2 id="form-title" className="font-display text-4xl md:text-5xl font-black uppercase">{t('formTitle')}</h2>
            <p className="mt-4 text-mist">{t('intro')}</p>
            <a href={`mailto:${site.email}`} className="mt-6 inline-block break-all text-glow underline underline-offset-4">{site.email}</a>
            <div className="mt-6">
              <Link href="/press-kit" className="text-sm uppercase tracking-[0.18em] text-mist hover:text-moon">{n('epk')} →</Link>
            </div>
          </div>
          <BookingForm />
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-4xl px-5 md:px-8 py-20 md:py-28">
        <h2 className="mb-8 font-display text-3xl md:text-5xl font-black uppercase">{t('faqTitle')}</h2>
        <div className="divide-y divide-line border-y border-line">
          {faq.map((f, i) => (
            <details key={i} className="group py-5" open={i === 0}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-semibold">
                {f.q}
                <span className="text-2xl text-violet transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-mist">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}
