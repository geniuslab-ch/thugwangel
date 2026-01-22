'use client';

import { useTranslations } from 'next-intl';

export default function Bio() {
  const t = useTranslations('Bio');

  return (
    <section id="bio" className="py-20 bg-background relative border-t border-primary/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-accent uppercase tracking-widest">{t('title')}</h2>
        <div className="prose prose-invert mx-auto">
          <p className="text-lg md:text-xl leading-relaxed text-gray-300">
            {t('content')}
          </p>
          <p className="mt-4 text-lg md:text-xl leading-relaxed text-gray-300">
             {t('extra')}
          </p>
        </div>
      </div>
    </section>
  );
}
