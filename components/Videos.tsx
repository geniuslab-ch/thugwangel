'use client';

import {useState} from 'react';
import {useTranslations} from 'next-intl';
import {site, videos} from '@/lib/site';
import SectionHeading from './SectionHeading';
import {track} from '@/lib/track';

/** Lite YouTube: thumbnail first, iframe only on tap (big win for Core Web Vitals on mobile). */
function LiteVideo({id, label, play}: {id: string; label: string; play: string}) {
  const [on, setOn] = useState(false);
  return (
    <div className="group relative aspect-video overflow-hidden rounded-2xl md:rounded-3xl border border-line bg-ink">
      {on ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={label}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        <button onClick={() => { setOn(true); track('video_play', {video_id: id}); }} className="absolute inset-0 h-full w-full" aria-label={`${play} — ${label}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover opacity-70 grayscale transition duration-700 group-hover:grayscale-0 group-hover:opacity-90 group-hover:scale-105" />
          <span className="absolute inset-0 bg-gradient-to-t from-night/90 via-night/20 to-transparent" />
          <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-violet text-night shadow-[0_0_50px_-5px_var(--violet)] transition-transform group-hover:scale-110">
            <svg viewBox="0 0 24 24" className="h-6 w-6 translate-x-0.5" fill="currentColor"><path d="M7 4v16l13-8z" /></svg>
          </span>
          <span className="absolute bottom-4 left-5 font-display text-sm font-bold uppercase tracking-widest">{label}</span>
        </button>
      )}
    </div>
  );
}

export default function Videos() {
  const t = useTranslations('Videos');
  return (
    <section id="videos" aria-labelledby="videos-title" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading kicker={t('kicker')} title={t('title')} id="videos-title" className="mb-12" />
        <div className="grid gap-5 md:grid-cols-2 md:gap-6">
          {videos.map((v, n) => (
            <div key={v.id} className={n % 2 === 1 ? 'md:translate-y-12' : ''}>
              <LiteVideo id={v.id} label={`${t('label')} ${String(n + 1).padStart(2, '0')}`} play={t('play')} />
            </div>
          ))}
        </div>
        {site.youtubeChannel && (
          <div className="mt-20 text-center">
            <a href={site.youtubeChannel} target="_blank" rel="noopener me" className="inline-block rounded-full border border-line px-7 py-3 text-sm font-bold uppercase tracking-[0.18em] hover:border-violet">
              {t('channel')} ↗
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
