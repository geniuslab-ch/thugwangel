'use client';

import {Link, usePathname, useRouter, type Locale} from '@/i18n/routing';
import {useLocale, useTranslations} from 'next-intl';
import {useEffect, useState} from 'react';
import {routing} from '@/i18n/routing';
import {track} from '@/lib/track';

export default function Navigation() {
  const t = useTranslations('Nav');
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, {passive: true});
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const anchors = [
    {hash: 'about', label: t('about')},
    {hash: 'music', label: t('music')},
    {hash: 'videos', label: t('videos')},
    {hash: 'live', label: t('live')}
  ];

  const switchTo = (l: Locale) => {
    setOpen(false);
    router.replace(pathname, {locale: l});
  };

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[80] focus:bg-moon focus:text-night focus:px-4 focus:py-2 focus:rounded-full">
        {t('skip')}
      </a>
      <nav
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled || open ? 'bg-night/80 backdrop-blur-xl border-b border-line' : 'bg-transparent border-b border-transparent'
        }`}
        style={{paddingTop: 'env(safe-area-inset-top)'}}
      >
        <div className="mx-auto flex h-16 md:h-20 max-w-7xl items-center justify-between px-5 md:px-8">
          <Link href="/" className="font-display text-lg md:text-xl font-black tracking-tight" onClick={() => setOpen(false)} aria-label="Kyx-Nyx — home">
            KYX<span className="text-violet">—</span>NYX
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {anchors.map((a) => (
              <Link key={a.hash} href={{pathname: '/', hash: a.hash}} className="text-[13px] uppercase tracking-[0.2em] text-mist hover:text-moon transition-colors">
                {a.label}
              </Link>
            ))}
            <Link href="/press-kit" className="text-[13px] uppercase tracking-[0.2em] text-mist hover:text-moon transition-colors">
              {t('epk')}
            </Link>
            <div className="flex items-center gap-1 border-l border-line pl-6" aria-label={t('language')}>
              {routing.locales.map((l) => (
                <button
                  key={l}
                  onClick={() => switchTo(l)}
                  aria-current={l === locale ? 'true' : undefined}
                  className={`h-8 w-8 rounded-full text-[11px] font-bold uppercase transition-colors ${l === locale ? 'bg-moon text-night' : 'text-mist hover:text-moon'}`}
                >
                  {l}
                </button>
              ))}
            </div>
            <Link
              href="/booking"
              onClick={() => track('booking_cta_click', {location: 'nav'})}
              className="rounded-full bg-violet px-5 py-2.5 text-[13px] font-bold uppercase tracking-[0.15em] text-night hover:bg-glow transition-colors"
            >
              {t('book')}
            </Link>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <Link
              href="/booking"
              onClick={() => track('booking_cta_click', {location: 'nav_mobile'})}
              className="rounded-full bg-violet px-4 py-2 text-xs font-bold uppercase tracking-[0.15em] text-night"
            >
              {t('book')}
            </Link>
            <button
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? t('close') : t('menu')}
              className="relative h-11 w-11 rounded-full border border-line"
            >
              <span className={`absolute left-1/2 top-1/2 h-px w-5 -translate-x-1/2 bg-moon transition-transform duration-300 ${open ? 'rotate-45' : '-translate-y-[4px]'}`} />
              <span className={`absolute left-1/2 top-1/2 h-px w-5 -translate-x-1/2 bg-moon transition-transform duration-300 ${open ? '-rotate-45' : 'translate-y-[4px]'}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile full-screen menu */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-40 lg:hidden bg-night transition-opacity duration-500 ${open ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
        aria-hidden={!open}
      >
        <div className="pointer-events-none absolute -right-24 top-24 h-80 w-80 rounded-full bg-violet/25 blur-3xl" />
        <div className="flex h-full flex-col justify-between px-6 pb-10 pt-28">
          <ul className="space-y-2">
            {[...anchors.map((a) => ({...a, href: {pathname: '/' as const, hash: a.hash}})), {hash: 'epk', label: t('epk'), href: '/press-kit' as const}].map((a, i) => (
              <li key={a.hash} style={{transitionDelay: open ? `${80 + i * 50}ms` : '0ms'}} className={`transition-all duration-500 ${open ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                <Link href={a.href} onClick={() => setOpen(false)} tabIndex={open ? 0 : -1} className="flex items-baseline gap-4 py-2 font-display text-4xl font-black uppercase tracking-tight">
                  <span className="font-sans text-xs text-violet">0{i + 1}</span>
                  {a.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="space-y-6">
            <Link href="/booking" onClick={() => { setOpen(false); track('booking_cta_click', {location: 'menu'}); }} tabIndex={open ? 0 : -1} className="block w-full rounded-full bg-violet py-4 text-center font-bold uppercase tracking-[0.2em] text-night">
              {t('bookLong')}
            </Link>
            <div className="flex justify-center gap-2">
              {routing.locales.map((l) => (
                <button key={l} onClick={() => switchTo(l)} tabIndex={open ? 0 : -1} className={`h-11 w-11 rounded-full text-xs font-bold uppercase border ${l === locale ? 'bg-moon text-night border-moon' : 'border-line text-mist'}`}>
                  {l}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
