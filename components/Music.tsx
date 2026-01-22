'use client';

import { useTranslations } from 'next-intl';

export default function Music() {
  const t = useTranslations('Navigation');

  // INSTRUCTIONS FOR USER:
  // To add your own Apple Music songs/albums:
  // 1. Go to your song/album on music.apple.com
  // 2. Click the three dots (...) -> Share -> Copy Embed Code
  // 3. Extract the 'src' URL from the code (starts with https://embed.music.apple.com...)
  // 4. Update the 'embedUrl' in the list below.

  const musicItems = [
    {
      id: 1,
      title: "Latest Release",
      // Placeholder ID. Replace with your actual Apple Music Embed URL.
      embedUrl: "https://embed.music.apple.com/us/album/illmatic/868691276?i=868691281",
      height: "175"
    },
    {
        id: 2,
        title: "Top Hit",
        // Placeholder ID.
        embedUrl: "https://embed.music.apple.com/us/album/ready-to-die-the-remaster/204669326?i=204669330",
        height: "175"
    }
  ];

  return (
    <section id="music" className="py-20 bg-black/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-accent uppercase tracking-widest">{t('music')}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center">
            {musicItems.map((item) => (
                <div key={item.id} className="w-full max-w-md bg-primary/5 border border-primary/20 p-4 rounded-lg">
                    <h3 className="text-xl font-bold text-white mb-4 text-center">{item.title}</h3>
                    <div className="w-full overflow-hidden rounded-md">
                        <iframe
                            allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
                            frameBorder="0"
                            height={item.height}
                            style={{width: '100%', maxWidth: '660px', overflow: 'hidden', background: 'transparent'}}
                            sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
                            src={item.embedUrl}>
                        </iframe>
                    </div>
                </div>
            ))}
        </div>

         <div className="mt-12 text-center">
            <a href="https://music.apple.com" target="_blank" rel="noopener noreferrer" className="inline-block px-8 py-3 border border-accent text-accent hover:bg-accent hover:text-black transition-colors font-bold tracking-widest uppercase text-sm">
                Stream on Apple Music
            </a>
        </div>
      </div>
    </section>
  );
}
