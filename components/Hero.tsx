'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export default function Hero() {
  const t = useTranslations('Hero');

  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-primary/20 to-black z-0" />

      {/* Abstract shapes or placeholder for artist image */}
      <div className="absolute inset-0 z-0 opacity-20">
         <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl filter mix-blend-screen animate-pulse" />
         <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent rounded-full blur-3xl filter mix-blend-screen animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 text-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-4 text-white"
        >
          THUG<span className="text-primary">WANGEL</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-xl md:text-2xl text-accent font-light tracking-widest uppercase"
        >
          {t('tagline')}
        </motion.p>
      </div>
    </section>
  );
}
