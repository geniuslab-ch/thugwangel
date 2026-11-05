'use client';

import {useEffect, useState} from 'react';
import {useTranslations} from 'next-intl';
import {Link, usePathname} from '@/i18n/routing';
import {track} from '@/lib/track';

/** Mobile-only booking bar that appears after the hero. Hidden on the booking page itself. */
export default function StickyBook() {
  const t = useTranslations('Sticky');
  const pathname = usePathname();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener('scroll', onScroll, {passive: true});
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (pathname === '/booking') return null;

  return (
    <div
      className={`no-print fixed inset-x-3 z-30 md:hidden transition-all duration-500 ${show ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0 pointer-events-none'}`}
      style={{bottom: 'calc(env(safe-area-inset-bottom) + 12px)'}}
    >
      <div className="flex items-center justify-between gap-3 rounded-full border border-line bg-ink/90 p-1.5 pl-5 backdrop-blur-xl shadow-[0_10px_40px_-10px_rgba(157,92,255,.6)]">
        <span className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-mist">
          <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet opacity-75" /><span className="relative inline-flex h-2 w-2 rounded-full bg-violet" /></span>
          {t('text')}
        </span>
        <Link href="/booking" onClick={() => track('booking_cta_click', {location: 'sticky'})} className="rounded-full bg-violet px-5 py-3 text-xs font-bold uppercase tracking-[0.15em] text-night">
          {t('cta')}
        </Link>
      </div>
    </div>
  );
}
