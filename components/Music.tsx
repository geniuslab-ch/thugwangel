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
    { title: "Song 1", artist: "Thugwangel", src: "/music/track_01.mp3" },
    { title: "Song 2", artist: "Thugwangel", src: "/music/track_02.mp3" },
    { title: "Song 3", artist: "Thugwangel", src: "/music/track_03.mp3" },
    { title: "Song 4", artist: "Thugwangel", src: "/music/track_04.mp3" },
    { title: "Song 5", artist: "Thugwangel", src: "/music/track_05.mp3" },
    { title: "Song 6", artist: "Thugwangel", src: "/music/track_06.mp3" },
    { title: "Song 7", artist: "Thugwangel", src: "/music/track_07.mp3" },
    { title: "Song 8", artist: "Thugwangel", src: "/music/track_08.mp3" },
    { title: "Song 9", artist: "Thugwangel", src: "/music/track_09.mp3" },
    { title: "Song 10", artist: "Thugwangel", src: "/music/track_10.mp3" },
    { title: "Song 11", artist: "Thugwangel", src: "/music/track_11.mp3" },
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
