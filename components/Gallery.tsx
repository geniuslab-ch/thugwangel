'use client';

// import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export default function Gallery() {
  // const t = useTranslations('Navigation');

  // Generating the array of images
  // Filter out images 8, 9, 10 as requested
  const excludedIds = [8, 9, 10];
  const images = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    src: `/images/pix_${String(i + 1).padStart(2, '0')}.png`,
    alt: `Thugwangel Gallery Image ${i + 1}`
  })).filter(img => !excludedIds.includes(img.id));

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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

  const handleNext = () => {
      setCurrentIndex((prev) => {
          const nextIndex = prev + 1;
          // Loop logic: if we go past valid start indices, reset to 0
          if (nextIndex > images.length - itemsPerView) return 0;
          return nextIndex;
      });
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => {
        const nextIndex = prev - 1;
        if (nextIndex < 0) return Math.max(0, images.length - itemsPerView);
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
                            className="flex-shrink-0 px-2 cursor-pointer"
                            style={{ width: `${100 / itemsPerView}%` }}
                            onClick={() => setSelectedImage(item.src)}
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
                                <div className="absolute inset-0 bg-black/0 group-hover/item:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover/item:opacity-100">
                                    <span className="text-white bg-black/50 px-3 py-1 rounded-full text-sm backdrop-blur-sm border border-white/20">Expand</span>
                                </div>
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

            {/* Dots Indicators - limited to valid start positions to avoid too many dots if list is long */}
            <div className="flex justify-center mt-8 gap-2 flex-wrap px-4">
                {Array.from({ length: Math.max(1, images.length - itemsPerView + 1) }).map((_, idx) => (
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

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
                onClick={() => setSelectedImage(null)}
            >
                <button
                    onClick={() => setSelectedImage(null)}
                    className="absolute top-4 right-4 text-white hover:text-accent p-2 z-50"
                >
                    <X size={40} />
                </button>

                <div className="relative w-full h-full max-w-5xl max-h-[90vh] flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
                    <Image
                        src={selectedImage}
                        alt="Gallery Fullscreen"
                        fill
                        className="object-contain"
                        unoptimized
                    />
                </div>
            </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
