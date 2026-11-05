import type {MetadataRoute} from 'next';
import {routing, type AppPathname} from '@/i18n/routing';
import {alternates, url} from '@/lib/seo';

const pages: {href: AppPathname; priority: number; changeFrequency: 'weekly' | 'monthly'}[] = [
  {href: '/', priority: 1, changeFrequency: 'weekly'},
  {href: '/booking', priority: 0.9, changeFrequency: 'monthly'},
  {href: '/press-kit', priority: 0.7, changeFrequency: 'monthly'}
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return pages.flatMap((p) =>
    routing.locales.map((locale) => ({
      url: url(locale, p.href),
      lastModified: now,
      changeFrequency: p.changeFrequency,
      priority: p.priority,
      alternates: {languages: Object.fromEntries(Object.entries(alternates(locale, p.href).languages).filter(([k]) => k.includes('-') || k === 'x-default'))}
    }))
  );
}
