'use client';

import { useTranslations } from 'next-intl';

export default function Music() {
  const t = useTranslations('Navigation');

  return (
    <section id="music" className="py-20 bg-black/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-accent uppercase tracking-widest">{t('music')}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
                <div key={item} className="bg-primary/5 border border-primary/20 p-4 rounded-lg">
                    <div className="aspect-square bg-gray-900 rounded-md mb-4 flex items-center justify-center text-gray-500 relative overflow-hidden group">
                        <span className="z-10">Spotify Embed Placeholder</span>
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-1">Track Title {item}</h3>
                    <p className="text-gray-400 text-sm">Latest Release</p>
                </div>
            ))}
        </div>

         <div className="mt-12 text-center">
            <a href="#" className="inline-block px-8 py-3 border border-accent text-accent hover:bg-accent hover:text-black transition-colors font-bold tracking-widest uppercase text-sm">
                Stream on Spotify
            </a>
        </div>
      </div>
    </section>
  );
}
