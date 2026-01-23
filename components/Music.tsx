'use client';

import { useTranslations } from 'next-intl';
import AudioPlayer from './AudioPlayer';

export default function Music() {
  const t = useTranslations('Navigation');

  // INSTRUCTIONS FOR USER:
  // To add your own music files:
  // 1. Prepare your MP3 files.
  // 2. Place them in the 'public/music/' folder.
  // 3. Rename your files to match the paths below (e.g., track_01.mp3, track_02.mp3...), OR update the code below to match your filenames.
  //
  // NOTE: If the file is too large to commit (e.g., >100MB, or >50MB depending on settings),
  // you might need to use Git LFS or host them externally.
  // For a standard website, MP3s should be around 3-10MB.

  const tracks = [
    { title: "Cheating Cheating Lior", artist: "Thugwangel", src: "/music/track_01.mp3" },
    { title: "Digital Maze", artist: "Thugwangel", src: "/music/track_02.mp3" },
    { title: "Paisa 247", artist: "Thugwangel", src: "/music/track_03.mp3" },
    { title: "Rack 12", artist: "Thugwangel", src: "/music/track_04.mp3" },
    { title: "Rhyme Gring", artist: "Thugwangel", src: "/music/track_05.mp3" },
    { title: "Too Late To", artist: "Thugwangel", src: "/music/track_06.mp3" }, // Fixed "To late to" typo -> "Too Late To" (assumption, looks like a typo)
    { title: "The M", artist: "Thugwangel", src: "/music/track_07.mp3" },
    { title: "Silent Observer", artist: "Thugwangel", src: "/music/track_08.mp3" },
    { title: "Shopify Song", artist: "Thugwangel", src: "/music/track_09.mp3" },
    { title: "Onward", artist: "Thugwangel", src: "/music/track_10.mp3" },
    { title: "Come To Me", artist: "Thugwangel", src: "/music/track_11.mp3" },
  ];

  return (
    <section id="music" className="py-20 bg-black/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-accent uppercase tracking-widest">{t('music')}</h2>

        <div className="flex flex-col items-center justify-center">
            <p className="text-gray-400 mb-8 text-center max-w-2xl">
                Listen to the latest tracks directly from the source.
            </p>

            <AudioPlayer tracks={tracks} />

             <div className="mt-12 text-center">
                <p className="text-xs text-gray-500 uppercase tracking-widest">
                    Exclusive Web Player
                </p>
            </div>
        </div>
      </div>
    </section>
  );
}
