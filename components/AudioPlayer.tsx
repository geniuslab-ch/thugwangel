'use client';

import {useEffect, useRef, useState} from 'react';
import {useTranslations} from 'next-intl';
import {track as trackEvent} from '@/lib/track';

interface Track { title: string; src: string }

const fmt = (s: number) => (!isFinite(s) ? '0:00' : `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`);

export default function AudioPlayer({tracks, artist}: {tracks: Track[]; artist: string}) {
  const t = useTranslations('Music');
  const audio = useRef<HTMLAudioElement>(null);
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [dur, setDur] = useState(0);
  const [muted, setMuted] = useState(false);
  const current = tracks[i];

  useEffect(() => {
    const a = audio.current;
    if (!a) return;
    if (playing) a.play().catch(() => setPlaying(false));
    else a.pause();
  }, [playing, i]);

  useEffect(() => { if (audio.current) audio.current.muted = muted; }, [muted]);

  const select = (n: number) => {
    setI(n);
    setTime(0);
    setPlaying(true);
    trackEvent('play_track', {track: tracks[n].title});
  };
  const next = () => select((i + 1) % tracks.length);
  const prev = () => {
    if (audio.current && audio.current.currentTime > 3) audio.current.currentTime = 0;
    else select((i - 1 + tracks.length) % tracks.length);
  };
  const toggle = () => {
    if (!playing) trackEvent('play_track', {track: current.title});
    setPlaying(!playing);
  };
  const pct = dur ? (time / dur) * 100 : 0;

  return (
    <div className="grid overflow-hidden rounded-[2rem] border border-line bg-ink/80 backdrop-blur md:grid-cols-[1.1fr_1fr]">
      <audio
        ref={audio}
        src={current.src}
        preload="none"
        onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDur(e.currentTarget.duration)}
        onEnded={next}
      />

      {/* Deck */}
      <div className="relative flex flex-col justify-between gap-8 p-6 md:p-10 border-b md:border-b-0 md:border-r border-line overflow-hidden">
        <div aria-hidden className={`pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-violet/30 blur-3xl transition-opacity duration-700 ${playing ? 'opacity-100' : 'opacity-40'}`} />

        <div className="relative flex items-center gap-5">
          {/* vinyl */}
          <div className={`relative h-24 w-24 md:h-32 md:w-32 shrink-0 rounded-full bg-[repeating-radial-gradient(circle,#1d1729_0_2px,#0c0912_2px_4px)] ring-1 ring-line ${playing ? 'animate-spin-slow' : ''}`} style={{animationDuration: '4s'}}>
            <div className="absolute inset-[34%] rounded-full bg-gradient-to-br from-violet to-ember" />
            <div className="absolute inset-[47%] rounded-full bg-night" />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] uppercase tracking-[0.25em] text-violet">{t('nowPlaying')} · {String(i + 1).padStart(2, '0')}/{tracks.length}</p>
            <h3 className="mt-2 font-display text-xl md:text-3xl font-black uppercase leading-tight line-clamp-2 break-words">{current.title}</h3>
            <p className="mt-1 text-sm text-mist">{artist}</p>
          </div>
        </div>

        <div className="relative">
          <input
            type="range"
            className="range w-full"
            min={0}
            max={dur || 0}
            step={0.1}
            value={time}
            aria-label={t('seek')}
            style={{['--p' as string]: `${pct}%`}}
            onChange={(e) => {
              const v = Number(e.target.value);
              if (audio.current) audio.current.currentTime = v;
              setTime(v);
            }}
          />
          <div className="mt-1 flex justify-between font-mono text-xs text-mist"><span>{fmt(time)}</span><span>{fmt(dur)}</span></div>

          <div className="mt-6 flex items-center justify-between">
            <button onClick={() => setMuted(!muted)} aria-label={muted ? t('unmute') : t('mute')} className="h-11 w-11 rounded-full text-mist hover:text-moon text-lg">
              {muted ? '🔇' : '🔊'}
            </button>
            <div className="flex items-center gap-4">
              <button onClick={prev} aria-label={t('prev')} className="h-12 w-12 rounded-full border border-line text-moon hover:border-violet">
                <svg viewBox="0 0 24 24" className="mx-auto h-5 w-5" fill="currentColor"><path d="M6 5h2v14H6zM20 5v14L9 12z" /></svg>
              </button>
              <button onClick={toggle} aria-label={playing ? t('pause') : t('play')} className="h-16 w-16 rounded-full bg-violet text-night shadow-[0_0_40px_-5px_var(--violet)] hover:bg-glow transition-colors">
                {playing
                  ? <svg viewBox="0 0 24 24" className="mx-auto h-6 w-6" fill="currentColor"><path d="M6 5h4v14H6zM14 5h4v14h-4z" /></svg>
                  : <svg viewBox="0 0 24 24" className="mx-auto h-6 w-6 translate-x-0.5" fill="currentColor"><path d="M7 4v16l13-8z" /></svg>}
              </button>
              <button onClick={next} aria-label={t('next')} className="h-12 w-12 rounded-full border border-line text-moon hover:border-violet">
                <svg viewBox="0 0 24 24" className="mx-auto h-5 w-5" fill="currentColor"><path d="M16 5h2v14h-2zM4 5l11 7-11 7z" /></svg>
              </button>
            </div>
            <span className="w-11" />
          </div>
        </div>
      </div>

      {/* Tracklist */}
      <div className="p-3 md:p-5">
        <p className="px-3 pb-3 pt-2 text-[11px] uppercase tracking-[0.25em] text-mist">{t('playlist')}</p>
        <ol className="max-h-[360px] md:max-h-[440px] overflow-y-auto no-scrollbar">
          {tracks.map((tr, n) => {
            const active = n === i;
            return (
              <li key={tr.src}>
                <button
                  onClick={() => (active ? toggle() : select(n))}
                  className={`flex w-full items-center gap-4 rounded-xl px-3 py-3.5 text-left transition-colors ${active ? 'bg-violet/15 text-moon' : 'text-mist hover:bg-moon/5 hover:text-moon'}`}
                >
                  <span className="w-6 font-mono text-xs opacity-60">{String(n + 1).padStart(2, '0')}</span>
                  <span className="flex-1 truncate font-semibold">{tr.title}</span>
                  {active && playing && (
                    <span className="flex h-4 items-end gap-[3px]" aria-hidden>
                      {[0, 1, 2, 3].map((b) => <span key={b} className="eq-bar w-[3px] h-full bg-violet rounded-full" style={{animationDelay: `${b * 0.15}s`}} />)}
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
