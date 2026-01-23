'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Gallery() {
  const t = useTranslations('Navigation');

  // Generating the array of images
  const images = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    src: `/images/gallery_${String(i + 1).padStart(2, '0')}.jpg`,
    alt: `Thugwangel Gallery Image ${i + 1}`
  }));

  const [currentIndex, setCurrentIndex] = useState(0);
  // Default to 1 item per view for mobile, will adjust based on screen size in logic below if needed,
  // but for a simple slider, showing one prominent image or a few is good.
  // Let's go with a responsive carousel that shows 1 on mobile, 2 on tablet, 3 on desktop?
  // Or just a simple single slide for maximum impact as requested ("slider instead of grid").
  // Often artists prefer a large single slider or a partial view.
  // Let's implement a "center mode" style slider or just a simple one.

  // Responsive items per view
  const [itemsPerView, setItemsPerView] = useState(1);

  useEffect(() => {
    const handleResize = () => {
        if (window.innerWidth >= 1024) setItemsPerView(3);
        else if (window.innerWidth >= 768) setItemsPerView(2);
        else setItemsPerView(1);
    };

    handleResize(); // Init
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // To allow infinite scroll feeling, we might need more complex logic,
  // but let's stick to a simple scroll first.
  // Actually, standard carousel behavior usually loops.

  const handleNext = () => {
      setCurrentIndex((prev) => {
          const nextIndex = prev + 1;
          // If we reach the end where we can't show 'itemsPerView' fully,
          // we typically either loop back to 0 or stop.
          // Let's loop back to 0 for a continuous feel
          if (nextIndex > images.length - itemsPerView) return 0;
          return nextIndex;
      });
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => {
        const nextIndex = prev - 1;
        if (nextIndex < 0) return images.length - itemsPerView;
        return nextIndex;
    });
  };

  return (
    <section id="gallery" className="py-20 bg-background border-t border-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-accent uppercase tracking-widest">Gallery</h2>

        <div className="relative group">

            {/* Slider Container */}
            <div className="overflow-hidden">
                <div
                    className="flex transition-transform duration-500 ease-out"
                    style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
                >
                    {images.map((item) => (
                        <div
                            key={item.id}
                            className="flex-shrink-0 px-2"
                            style={{ width: `${100 / itemsPerView}%` }}
                        >
                            <div className="relative aspect-[3/4] md:aspect-square bg-gray-900 border border-primary/20 rounded-lg overflow-hidden group/item">
                                <Image
                                    src={item.src}
                                    alt={item.alt}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover/item:scale-105"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    unoptimized
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation Buttons */}
            <button
                onClick={handlePrev}
                className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-4 md:-translate-x-12 bg-black/50 hover:bg-primary/80 text-white p-3 rounded-full backdrop-blur-sm border border-white/10 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 z-10"
                aria-label="Previous Slide"
            >
                <ChevronLeft size={24} />
            </button>

            <button
                onClick={handleNext}
                className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-4 md:translate-x-12 bg-black/50 hover:bg-primary/80 text-white p-3 rounded-full backdrop-blur-sm border border-white/10 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 z-10"
                aria-label="Next Slide"
            >
                <ChevronRight size={24} />
            </button>

            {/* Dots Indicators */}
            <div className="flex justify-center mt-8 gap-2">
                {Array.from({ length: images.length - itemsPerView + 1 }).map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                            idx === currentIndex ? 'bg-accent' : 'bg-gray-700 hover:bg-gray-500'
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                    />
                ))}
            </div>

        </div>
      </div>
    </section>
  );
}
