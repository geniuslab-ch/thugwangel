import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['en', 'fr', 'de', 'it'],
  defaultLocale: 'en',
  localePrefix: 'always',
  // Localised slugs: each language gets URLs in its own language (SEO + trust)
  pathnames: {
    '/': '/',
    '/booking': {
      en: '/booking',
      fr: '/reservation',
      de: '/buchung',
      it: '/prenotazione'
    },
    '/press-kit': {
      en: '/press-kit',
      fr: '/dossier-de-presse',
      de: '/pressemappe',
      it: '/cartella-stampa'
    }
  }
});

export type Locale = (typeof routing.locales)[number];
export type AppPathname = keyof typeof routing.pathnames;

export const {Link, redirect, usePathname, useRouter, getPathname} =
  createNavigation(routing);
