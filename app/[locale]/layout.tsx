import {NextIntlClientProvider, hasLocale} from 'next-intl';
import {getTranslations, setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import localFont from 'next/font/local';
import type {Metadata, Viewport} from 'next';
import {routing, type Locale} from '@/i18n/routing';
import {site} from '@/lib/site';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import StickyBook from '@/components/StickyBook';
import Analytics from '@/components/Analytics';
import '../globals.css';

// Self-hosted fonts (no third-party request, better CWV + privacy)
const unbounded = localFont({src: '../fonts/unbounded-latin-wght-normal.woff2', variable: '--font-unbounded', weight: '200 900', display: 'swap'});
const manrope = localFont({src: '../fonts/manrope-latin-wght-normal.woff2', variable: '--font-manrope', weight: '200 800', display: 'swap'});
const instrument = localFont({
  src: [
    {path: '../fonts/instrument-serif-latin-400-normal.woff2', weight: '400', style: 'normal'},
    {path: '../fonts/instrument-serif-latin-400-italic.woff2', weight: '400', style: 'italic'}
  ],
  variable: '--font-instrument',
  display: 'swap'
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export const viewport: Viewport = {
  themeColor: '#07060a',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover'
};

export async function generateMetadata({params}: {params: Promise<{locale: string}>}): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale: locale as Locale, namespace: 'Meta'});
  return {
    metadataBase: new URL(site.url),
    title: {default: t('homeTitle'), template: `%s | ${site.name}`},
    description: t('homeDescription'),
    applicationName: site.name,
    authors: [{name: site.name}],
    creator: site.name,
    category: 'music',
    keywords: ['Kyx-Nyx', 'Thug-W-Angel', 'TwA', 'Thugwangel', 'female rapper Switzerland', 'rappeuse suisse', 'Rapperin Schweiz', 'English rap', 'melodic rap', 'hip-hop booking Switzerland'],
    robots: {index: true, follow: true, googleBot: {index: true, follow: true, 'max-image-preview': 'large'}},
    icons: {icon: '/favicon.ico', apple: '/icon.png'},
    ...(process.env.NEXT_PUBLIC_GSC_VERIFICATION
      ? {verification: {google: process.env.NEXT_PUBLIC_GSC_VERIFICATION}}
      : {})
  };
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <html lang={`${locale}-CH`} className={`${unbounded.variable} ${instrument.variable} ${manrope.variable}`}>
      <body className="grain antialiased">
        <NextIntlClientProvider>
          <Navigation />
          {children}
          <Footer />
          <StickyBook />
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
