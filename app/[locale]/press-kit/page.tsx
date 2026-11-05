import Image from 'next/image';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import type {Metadata} from 'next';
import type {Locale} from '@/i18n/routing';
import {Link} from '@/i18n/routing';
import JsonLd from '@/components/JsonLd';
import CopyButton from '@/components/CopyButton';
import PrintButton from '@/components/PrintButton';
import {artistSchema, breadcrumbSchema, graph, pageMetadata, webPageSchema, websiteSchema} from '@/lib/seo';
import {photos, site} from '@/lib/site';

type Props = {params: Promise<{locale: Locale}>};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'Meta'});
  return pageMetadata({locale, href: '/press-kit', title: t('epkTitle'), description: t('epkDescription'), ogAlt: t('ogAlt')});
}

export default async function PressKit({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations({locale, namespace: 'Epk'});
  const m = await getTranslations({locale, namespace: 'Meta'});
  const n = await getTranslations({locale, namespace: 'Nav'});
  const a = await getTranslations({locale, namespace: 'About'});

  const facts: [string, React.ReactNode][] = [
    [t('factName'), site.name],
    [t('factAka'), 'Thug-W-Angel · TwA · Thugwangel'],
    [t('factGenre'), t('factGenreValue')],
    [t('factBase'), a('factBaseValue')],
    [t('factLang'), t('factLangValue')],
    [t('factContact'), <a key="e" href={`mailto:${site.email}`} className="text-glow underline underline-offset-4 break-all">{site.email}</a>]
  ];
  const long = [t('long1'), t('long2'), t('long3')];

  return (
    <main id="main" className="pt-24 md:pt-32 pb-20">
      <JsonLd
        data={graph([
          websiteSchema(locale),
          webPageSchema({locale, href: '/press-kit', name: m('epkTitle'), description: m('epkDescription'), type: 'ProfilePage'}),
          breadcrumbSchema(locale, [{name: n('home'), href: '/'}, {name: n('epk'), href: '/press-kit'}]),
          artistSchema(t('short'))
        ])}
      />
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <nav aria-label="Breadcrumb" className="no-print mb-8 text-xs uppercase tracking-[0.2em] text-mist">
          <Link href="/" className="hover:text-moon">{n('home')}</Link> <span className="mx-2 text-violet">/</span> <span className="text-moon">{n('epk')}</span>
        </nav>

        <header className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between border-b border-line pb-10">
          <div>
            <h1 className="font-display text-[clamp(1.75rem,8.2vw,4.5rem)] hyphens-auto break-words font-black uppercase leading-[0.95] tracking-tight">{t('h1')}</h1>
            <p className="mt-5 max-w-xl text-lg text-mist">{t('intro')}</p>
          </div>
          <PrintButton label={t('print')} />
        </header>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_1.5fr]">
          <section aria-labelledby="facts">
            <h2 id="facts" className="mb-5 text-xs font-bold uppercase tracking-[0.3em] text-violet">{t('factsTitle')}</h2>
            <dl className="divide-y divide-line rounded-3xl border border-line">
              {facts.map(([k, v]) => (
                <div key={k} className="grid grid-cols-[8.5rem_1fr] gap-4 p-4 md:p-5">
                  <dt className="text-xs uppercase tracking-[0.15em] text-mist pt-0.5">{k}</dt>
                  <dd className="font-semibold">{v}</dd>
                </div>
              ))}
            </dl>
          </section>

          <div className="space-y-10">
            <section aria-labelledby="short">
              <div className="mb-4 flex items-center justify-between gap-4">
                <h2 id="short" className="text-xs font-bold uppercase tracking-[0.3em] text-violet">{t('shortTitle')}</h2>
                <CopyButton text={t('short')} label={t('copy')} done={t('copied')} />
              </div>
              <p className="font-serif text-2xl md:text-3xl italic leading-snug">{t('short')}</p>
            </section>
            <section aria-labelledby="long">
              <div className="mb-4 flex items-center justify-between gap-4">
                <h2 id="long" className="text-xs font-bold uppercase tracking-[0.3em] text-violet">{t('longTitle')}</h2>
                <CopyButton text={long.join('\n\n')} label={t('copy')} done={t('copied')} />
              </div>
              <div className="space-y-4 text-lg text-mist">{long.map((p, i) => <p key={i}>{p}</p>)}</div>
            </section>
          </div>
        </div>

        <section aria-labelledby="photos" className="mt-20">
          <h2 id="photos" className="font-display text-3xl md:text-5xl font-black uppercase">{t('photosTitle')}</h2>
          <p className="mt-3 text-mist">{t('photosNote')}</p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {photos.map((p) => (
              <figure key={p.src} className="overflow-hidden rounded-3xl border border-line bg-ink">
                <div className={`relative ${p.h > p.w ? 'aspect-[2/3]' : 'aspect-square'}`}>
                  <Image src={p.src} alt={p.alt} fill sizes="(max-width: 640px) 100vw, 50vw" className="object-cover" />
                </div>
                <figcaption className="flex items-center justify-between gap-4 p-4">
                  <span className="text-xs text-mist">© {site.name}</span>
                  <a href={p.press} download className="no-print rounded-full bg-violet px-5 py-2.5 text-xs font-bold uppercase tracking-[0.15em] text-night hover:bg-glow">
                    {t('download')} ↓
                  </a>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="mt-20 rounded-[2rem] border border-violet/40 bg-violet/10 p-8 md:p-12 text-center">
          <h2 className="font-display text-2xl md:text-4xl font-black uppercase">{t('contactTitle')}</h2>
          <a href={`mailto:${site.email}`} className="mt-4 inline-block text-xl md:text-2xl text-glow underline underline-offset-4 break-all">{site.email}</a>
          <div className="no-print mt-8">
            <Link href="/booking" className="inline-flex rounded-full bg-violet px-8 py-4 text-sm font-bold uppercase tracking-[0.18em] text-night hover:bg-glow">{n('bookLong')} →</Link>
          </div>
        </section>
      </div>
    </main>
  );
}
