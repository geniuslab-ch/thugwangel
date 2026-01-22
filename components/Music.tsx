'use client';

import { useTranslations } from 'next-intl';
import AudioPlayer from './AudioPlayer';

export default function Music() {
  const t = useTranslations('Navigation');

  // INSTRUCTIONS FOR USER:
  // To add your own music files:
  // 1. Prepare your MP3 files.
  // 2. Place them in the 'public/music/' folder.
  // 3. Update the 'tracks' list below:
  //    - title: The name of the song.
  //    - artist: The artist name (e.g., Thugwangel).
  //    - src: The path to the file (e.g., '/music/filename.mp3').

  const tracks = [
    {
      title: "Demo Track 1",
      artist: "Thugwangel",
      src: "/music/demo_track_1.mp3"
    },
    {
        title: "Demo Track 2",
        artist: "Thugwangel",
        src: "/music/demo_track_2.mp3"
    }
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
