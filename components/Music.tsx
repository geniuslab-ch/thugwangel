import {getTranslations} from 'next-intl/server';
import AudioPlayer from './AudioPlayer';
import SectionHeading from './SectionHeading';
import {site, tracks} from '@/lib/site';

export default async function Music() {
  const t = await getTranslations('Music');
  return (
    <section id="music" aria-labelledby="music-title" className="relative py-24 md:py-32 bg-ink/50">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <SectionHeading kicker={t('kicker')} title={t('title')} id="music-title" />
          <p className="max-w-xs text-mist">{t('intro')}</p>
        </div>
        <AudioPlayer tracks={tracks} artist={site.name} />
      </div>
    </section>
  );
}
