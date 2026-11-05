import {getTranslations, setRequestLocale} from 'next-intl/server';
import type {Metadata} from 'next';
import type {Locale} from '@/i18n/routing';
import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import About from '@/components/About';
import Music from '@/components/Music';
import Videos from '@/components/Videos';
import Gallery from '@/components/Gallery';
import Live from '@/components/Live';
import JsonLd from '@/components/JsonLd';
import {artistSchema, graph, pageMetadata, webPageSchema, websiteSchema} from '@/lib/seo';

type Props = {params: Promise<{locale: Locale}>};

export async function generateMetadata({params}: Props): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'Meta'});
  return pageMetadata({locale, href: '/', title: t('homeTitle'), description: t('homeDescription'), ogAlt: t('ogAlt')});
}

export default async function Home({params}: Props) {
  const {locale} = await params;
  setRequestLocale(locale);
  const t = await getTranslations({locale, namespace: 'Meta'});

  return (
    <main id="main">
      <JsonLd
        data={graph([
          websiteSchema(locale),
          webPageSchema({locale, href: '/', name: t('homeTitle'), description: t('homeDescription')}),
          artistSchema(t('homeDescription'))
        ])}
      />
      <Hero />
      <Marquee words={['Kyx-Nyx', 'Melodic rap', 'Swiss-based', 'English lyrics', 'Alternative hip-hop', 'Live & bookings', 'Cinematic', 'Dark & emotional']} />
      <About />
      <Music />
      <Videos />
      <Gallery />
      <Live />
      <Marquee />
    </main>
  );
}
