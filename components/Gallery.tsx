'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function Gallery() {
  const t = useTranslations('Navigation');

  // INSTRUCTIONS FOR USER:
  // To add your own gallery images:
  // 1. Prepare 12 images.
  // 2. Name them gallery_01.jpg, gallery_02.jpg, ..., gallery_12.jpg.
  // 3. Place them in the 'public/images/' folder.

  // Generating the array of images
  const images = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    src: `/images/gallery_${String(i + 1).padStart(2, '0')}.jpg`,
    alt: `Thugwangel Gallery Image ${i + 1}`
  }));

  return (
    <section id="gallery" className="py-20 bg-background border-t border-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-accent uppercase tracking-widest">Gallery</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((item) => (
                <div key={item.id} className="relative aspect-square bg-gray-900 border border-primary/20 rounded-lg overflow-hidden group">
                     {/* Using unoptimized here to simplify local file handling if they are large or user replaces them frequently without rebuild */}
                     <Image
                        src={item.src}
                        alt={item.alt}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                        unoptimized
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                        <span className="text-accent text-sm uppercase tracking-widest">View</span>
                     </div>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
}
