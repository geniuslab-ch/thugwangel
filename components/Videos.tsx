'use client';

import { useTranslations } from 'next-intl';

export default function Videos() {
  const t = useTranslations('Navigation');

  return (
    <section id="videos" className="py-20 bg-background border-t border-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-accent uppercase tracking-widest">{t('videos')}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2].map((item) => (
                <div key={item} className="aspect-video bg-gray-900 border border-primary/20 rounded-lg flex items-center justify-center text-gray-500 relative overflow-hidden group">
                     <span className="z-10">YouTube Video Placeholder</span>
                     <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
            ))}
        </div>

         <div className="mt-12 text-center">
            <a href="#" className="inline-block px-8 py-3 bg-primary text-white hover:bg-white hover:text-black transition-colors font-bold tracking-widest uppercase text-sm">
                Subscribe on YouTube
            </a>
        </div>
      </div>
    </section>
  );
}
