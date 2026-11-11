'use client';

import {useState} from 'react';
import {useTranslations} from 'next-intl';
import {site} from '@/lib/site';
import {track} from '@/lib/track';

const TYPES = ['festival', 'club', 'showcase', 'cultural', 'private', 'corporate', 'other'] as const;
const AUD = ['a', 'b', 'c', 'd'] as const;

/**
 * Booking form.
 * - If NEXT_PUBLIC_BOOKING_ENDPOINT is set (Formspree / Web3Forms / Getform URL), posts JSON there.
 * - Otherwise opens the visitor's email app with a pre-filled, structured request (works with zero setup).
 * Fires GA4 `generate_lead` on success (= the key KPI: qualified booking requests).
 */
export default function BookingForm() {
  const t = useTranslations('Form');
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'mailto' | 'error'>('idle');
  const endpoint = process.env.NEXT_PUBLIC_BOOKING_ENDPOINT;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    if (fd.get('_gotcha')) return; // honeypot
    const data = Object.fromEntries(fd.entries()) as Record<string, string>;
    delete data._gotcha;
    const typeLabel = data.eventType ? t(`types.${data.eventType as (typeof TYPES)[number]}`) : '';
    const audLabel = data.audience ? t(`audienceOptions.${data.audience as (typeof AUD)[number]}`) : '';
    const leadParams = {event_type: data.eventType, audience: data.audience, event_location: data.eventLocation};

    if (endpoint) {
      setState('sending');
      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: {'Content-Type': 'application/json', Accept: 'application/json'},
          body: JSON.stringify({...data, eventType: typeLabel, audience: audLabel, _subject: `Booking request — ${data.eventName} (${data.eventDate})`})
        });
        if (!res.ok) throw new Error(String(res.status));
        setState('sent');
        track('generate_lead', {...leadParams, method: 'form'});
        e.currentTarget?.reset();
      } catch {
        setState('error');
      }
      return;
    }

    const lines = [
      `${t('eventName')}: ${data.eventName}`,
      `${t('eventDate')}: ${data.eventDate}`,
      `${t('eventLocation')}: ${data.eventLocation}`,
      `${t('eventType')}: ${typeLabel}`,
      `${t('audience')}: ${audLabel}`,
      `${t('duration')}: ${data.duration}`,
      data.budget ? `${t('budget')}: ${data.budget}` : null,
      '',
      `${t('name')}: ${data.name}`,
      data.organisation ? `${t('organisation')}: ${data.organisation}` : null,
      `${t('email')}: ${data.email}`,
      data.phone ? `${t('phone')}: ${data.phone}` : null,
      '',
      data.message
    ].filter((l): l is string => l !== null);
    const subject = `Booking request — ${data.eventName} (${data.eventDate})`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;
    setState('mailto');
    track('generate_lead', {...leadParams, method: 'mailto'});
  }

  if (state === 'sent') {
    return (
      <div className="rounded-3xl border border-violet/40 bg-violet/10 p-8 text-center" role="status">
        <p className="font-display text-2xl font-black uppercase">✦</p>
        <p className="mt-3 text-lg">{t('success')}</p>
      </div>
    );
  }

  const L = ({htmlFor, children, req}: {htmlFor: string; children: React.ReactNode; req?: boolean}) => (
    <label htmlFor={htmlFor} className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-mist">
      {children}{req && <span className="text-violet" aria-label={t('required')}> *</span>}
    </label>
  );

  return (
    <form onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2" noValidate={false}>
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      <div className="sm:col-span-2"><L htmlFor="eventName" req>{t('eventName')}</L><input id="eventName" name="eventName" required className="field" /></div>
      <div><L htmlFor="eventDate" req>{t('eventDate')}</L><input id="eventDate" name="eventDate" type="date" required className="field" /></div>
      <div><L htmlFor="eventLocation" req>{t('eventLocation')}</L><input id="eventLocation" name="eventLocation" required className="field" autoComplete="address-level2" /></div>
      <div>
        <L htmlFor="eventType" req>{t('eventType')}</L>
        <select id="eventType" name="eventType" required defaultValue="" className="field">
          <option value="" disabled>{t('choose')}</option>
          {TYPES.map((k) => <option key={k} value={k}>{t(`types.${k}`)}</option>)}
        </select>
      </div>
      <div>
        <L htmlFor="audience" req>{t('audience')}</L>
        <select id="audience" name="audience" required defaultValue="" className="field">
          <option value="" disabled>{t('choose')}</option>
          {AUD.map((k) => <option key={k} value={k}>{t(`audienceOptions.${k}`)}</option>)}
        </select>
      </div>
      <div><L htmlFor="duration" req>{t('duration')}</L><input id="duration" name="duration" required placeholder={t('durationPlaceholder')} className="field" /></div>
      <div><L htmlFor="budget">{t('budget')}</L><input id="budget" name="budget" className="field" placeholder="CHF" /></div>

      <div className="sm:col-span-2 mt-2 h-px bg-line" />

      <div><L htmlFor="name" req>{t('name')}</L><input id="name" name="name" required autoComplete="name" className="field" /></div>
      <div><L htmlFor="organisation">{t('organisation')}</L><input id="organisation" name="organisation" autoComplete="organization" className="field" /></div>
      <div><L htmlFor="email" req>{t('email')}</L><input id="email" name="email" type="email" required autoComplete="email" inputMode="email" className="field" /></div>
      <div><L htmlFor="phone">{t('phone')}</L><input id="phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" className="field" /></div>
      <div className="sm:col-span-2"><L htmlFor="message">{t('message')}</L><textarea id="message" name="message" rows={5} className="field resize-y" /></div>

      <label className="sm:col-span-2 flex min-h-11 cursor-pointer items-start gap-3 py-2 text-sm text-mist">
        <input type="checkbox" required className="mt-0.5 h-6 w-6 shrink-0 accent-[var(--violet)]" />
        <span>{t('consent')}</span>
      </label>

      <div className="sm:col-span-2">
        <button type="submit" disabled={state === 'sending'} className="w-full rounded-full bg-violet py-4 text-sm font-bold uppercase tracking-[0.2em] text-night transition-colors hover:bg-glow disabled:opacity-60">
          {state === 'sending' ? t('sending') : `${t('submit')} →`}
        </button>
        {state === 'mailto' && <p className="mt-4 text-sm text-glow" role="status">{t('mailtoNote')}</p>}
        {state === 'error' && <p className="mt-4 text-sm text-ember" role="alert">{t('error')} <a className="underline" href={`mailto:${site.email}`}>{site.email}</a></p>}
      </div>
    </form>
  );
}
