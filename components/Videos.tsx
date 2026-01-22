'use client';

import { useTranslations } from 'next-intl';

export default function Videos() {
  const t = useTranslations('Navigation');

  // INSTRUCTIONS FOR USER:
  // To add your own YouTube videos:
  // 1. Go to your video on YouTube.
  // 2. Click Share -> Embed.
  // 3. Copy the 'src' URL (e.g., https://www.youtube.com/embed/VIDEO_ID).
  // 4. Update the 'embedUrl' in the list below.

  const videoItems = [
    {
        id: 1,
        title: "Latest Visuals",
        // Placeholder. Replace with your video ID.
        embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" // Rick Roll - Classic placeholder that is guaranteed to work
    },
    {
        id: 2,
        title: "Live Performance",
        // Placeholder.
        embedUrl: "https://www.youtube.com/embed/5qap5aO4i9A" // lofi hip hop radio - beats to relax/study to (always live or available)
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
