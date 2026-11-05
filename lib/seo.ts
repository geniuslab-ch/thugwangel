import type {Metadata} from 'next';
import {getPathname, routing, type AppPathname, type Locale} from '@/i18n/routing';
import {site, tracks} from './site';

const ogLocale: Record<Locale, string> = {en: 'en_CH', fr: 'fr_CH', de: 'de_CH', it: 'it_CH'};

/** Absolute URL of an internal route in a given locale (uses localised slugs). */
export function url(locale: Locale, href: AppPathname = '/') {
  return site.url + getPathname({locale, href});
}

/** hreflang alternates for every language + x-default */
export function alternates(locale: Locale, href: AppPathname) {
  const languages: Record<string, string> = {};
  for (const l of routing.locales) languages[`${l}-CH`] = url(l, href);
  // generic language codes for searchers outside CH
  for (const l of routing.locales) languages[l] = url(l, href);
  languages['x-default'] = url(routing.defaultLocale, href);
  return {canonical: url(locale, href), languages};
}

export function pageMetadata(opts: {
  locale: Locale;
  href: AppPathname;
  title: string;
  description: string;
  ogAlt: string;
}): Metadata {
  const {locale, href, title, description, ogAlt} = opts;
  return {
    title: {absolute: title},
    description,
    alternates: alternates(locale, href),
    openGraph: {
      type: 'website',
      siteName: site.name,
      title,
      description,
      url: url(locale, href),
      locale: ogLocale[locale],
      alternateLocale: routing.locales.filter((l) => l !== locale).map((l) => ogLocale[l]),
      images: [{url: site.ogImage, width: 1200, height: 630, alt: ogAlt}]
    },
    twitter: {card: 'summary_large_image', title, description, images: [site.ogImage]}
  };
}

/* ---------------- schema.org ---------------- */

export const ARTIST_ID = `${site.url}/#artist`;
const WEBSITE_ID = `${site.url}/#website`;

export function artistSchema(description: string) {
  return {
    // MusicGroup explicitly covers solo musicians; Person adds gender/language signals.
    '@type': ['MusicGroup', 'Person'],
    '@id': ARTIST_ID,
    name: site.name,
    alternateName: site.alternateNames,
    url: site.url,
    image: site.url + site.portrait,
    description,
    genre: site.genres,
    gender: 'Female',
    knowsLanguage: ['en', 'fr'],
    homeLocation: {
      '@type': 'Place',
      name: site.countryName,
      address: {'@type': 'PostalAddress', addressCountry: site.country}
    },
    areaServed: {'@type': 'Country', name: site.countryName},
    email: `mailto:${site.email}`,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'booking',
      email: site.email,
      areaServed: site.country,
      availableLanguage: ['English', 'French', 'German', 'Italian']
    },
    ...(site.socials.length ? {sameAs: site.socials.map((s) => s.url)} : {}),
    track: tracks.map((t) => ({
      '@type': 'MusicRecording',
      name: t.title,
      byArtist: {'@id': ARTIST_ID}
    }))
  };
}

export function graph(nodes: object[]) {
  return {'@context': 'https://schema.org', '@graph': nodes};
}

export function websiteSchema(locale: Locale) {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: site.url,
    name: site.name,
    alternateName: site.alternateNames,
    inLanguage: locale,
    publisher: {'@id': ARTIST_ID}
  };
}

export function webPageSchema(opts: {
  locale: Locale;
  href: AppPathname;
  name: string;
  description: string;
  type?: string;
}) {
  const u = url(opts.locale, opts.href);
  return {
    '@type': opts.type || 'WebPage',
    '@id': `${u}#webpage`,
    url: u,
    name: opts.name,
    description: opts.description,
    inLanguage: opts.locale,
    isPartOf: {'@id': WEBSITE_ID},
    about: {'@id': ARTIST_ID},
    ...(opts.type === 'ProfilePage' ? {mainEntity: {'@id': ARTIST_ID}} : {}),
    primaryImageOfPage: site.url + site.ogImage
  };
}

export function breadcrumbSchema(locale: Locale, items: {name: string; href: AppPathname}[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: url(locale, it.href)
    }))
  };
}
