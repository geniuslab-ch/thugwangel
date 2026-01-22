'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function Bio() {
  const t = useTranslations('Bio');

  return (
    <section id="bio" className="py-20 bg-background relative border-t border-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-accent uppercase tracking-widest">{t('title')}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/*
              IMAGE INSTRUCTIONS:
              1. Add your photo to the 'public/images' folder.
              2. Rename it to 'artist.png' (or change the src below).
              3. Adjust width/height if necessary.
            */}
            <div className="relative aspect-[3/4] w-full max-w-md mx-auto justify-self-center md:justify-self-end border-2 border-primary/20 rounded-lg overflow-hidden shadow-2xl shadow-primary/10">
                <Image
                    src="/images/artist.png"
                    alt="Thugwangel"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                />
            </div>

            <div className="prose prose-invert prose-lg text-center md:text-left">
                <p className="text-lg md:text-xl leading-relaxed text-gray-300">
                    {t('content')}
                </p>
                <p className="mt-4 text-lg md:text-xl leading-relaxed text-gray-300">
                    {t('extra')}
                </p>
            </div>
        </div>
      </div>
    </section>
  );
}
