import {getTranslations} from 'next-intl/server';
import {Link} from '@/i18n/routing';
import {site} from '@/lib/site';

export default async function Footer() {
  const t = await getTranslations('Footer');
  const n = await getTranslations('Nav');
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-line bg-night pb-28 md:pb-10 pt-16 overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <p aria-hidden className="font-display font-black leading-none tracking-tighter text-[22vw] md:text-[15vw] text-outline opacity-25 select-none -mb-[3vw]">
          KYX—NYX
        </p>
        <div className="mt-10 grid gap-10 md:grid-cols-3 border-t border-line pt-10">
          <div>
            <p className="font-display font-black text-lg">KYX<span className="text-violet">—</span>NYX</p>
            <p className="mt-2 text-sm text-mist">{t('tagline')}</p>
            <p className="mt-1 text-xs text-mist/70">{t('formerly')}</p>
          </div>
          <div className="text-sm">
            <p className="mb-3 text-xs uppercase tracking-[0.2em] text-violet">{t('booking')}</p>
            <a href={`mailto:${site.email}`} className="text-moon hover:text-glow break-all">{site.email}</a>
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-mist">
              <Link href="/booking" className="hover:text-moon">{n('bookLong')}</Link>
              <Link href="/press-kit" className="hover:text-moon">{n('epk')}</Link>
            </div>
          </div>
          {site.socials.length > 0 && (
            <ul className="flex flex-wrap gap-3 md:justify-end self-start">
              {site.socials.map((s) => (
                <li key={s.url}>
                  <a href={s.url} target="_blank" rel="noopener me" className="inline-block rounded-full border border-line px-4 py-2 text-xs uppercase tracking-[0.15em] text-mist hover:text-moon hover:border-violet">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
        <p className="mt-10 text-xs text-mist/60">© {year} {site.name}. {t('rights')}</p>
      </div>
    </footer>
  );
}
