'use client';

import { useTranslations } from 'next-intl';

export default function Videos() {
  const t = useTranslations('Navigation');

  const videoItems = [
    {
        id: 1,
        title: "Latest Visuals I",
        embedUrl: "https://www.youtube.com/embed/caw4j4-tW_0?si=grdcC9J4CvoHWanX"
    },
    {
        id: 2,
        title: "Latest Visuals II",
        embedUrl: "https://www.youtube.com/embed/dC9V6jDHkmQ?si=0YZaD4EmyT4ZdhCQ"
    },
    {
        id: 3,
        title: "Latest Visuals III",
        embedUrl: "https://www.youtube.com/embed/6xzEoAtL-JA?si=bd9T4ewt7mmYWe2n"
    },
    {
        id: 4,
        title: "Latest Visuals IV",
        embedUrl: "https://www.youtube.com/embed/qX7zkkMJxs4?si=5sIhxq-1YlY3xjKC"
    }
  ];

  return (
    <section id="videos" className="py-20 bg-background border-t border-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-accent uppercase tracking-widest">{t('videos')}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {videoItems.map((item) => (
                <div key={item.id} className="w-full">
                     <div className="aspect-video bg-gray-900 border border-primary/20 rounded-lg overflow-hidden relative">
                         <iframe
                            width="100%"
                            height="100%"
                            src={item.embedUrl}
                            title={item.title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                            className="absolute inset-0"
                         ></iframe>
                     </div>
                     <h3 className="mt-4 text-xl font-bold text-white text-center">{item.title}</h3>
                </div>
            ))}
        </div>

         <div className="mt-12 text-center">
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="inline-block px-8 py-3 bg-primary text-white hover:bg-white hover:text-black transition-colors font-bold tracking-widest uppercase text-sm">
                Subscribe on YouTube
            </a>
        </div>
      </div>
    </section>
  );
}
