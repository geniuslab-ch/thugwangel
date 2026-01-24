'use client';

import { useTranslations } from 'next-intl';

export default function Contact() {
  const t = useTranslations('Contact');

  return (
    <section id="contact" className="py-20 bg-black/50 border-t border-primary/10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-accent uppercase tracking-widest">{t('title')}</h2>

        <div className="flex flex-col items-center space-y-8">
            <p className="text-gray-300 text-lg md:text-xl text-center max-w-2xl">
                {t('content') || "For bookings, features, and inquiries, please reach out directly via email."}
            </p>

            <a
                href="mailto:info@thug-angel.ch"
                className="inline-flex items-center justify-center bg-accent text-black font-bold py-4 px-12 rounded-md hover:bg-white transition-all transform hover:scale-105 tracking-widest uppercase shadow-lg shadow-accent/20"
            >
                info@thug-angel.ch
            </a>

            <div className="pt-8 border-t border-white/10 w-full max-w-md text-center">
                <p className="text-sm text-gray-500 uppercase tracking-widest mb-4">Follow on Social Media</p>
                {/* Social icons could go here if provided, keeping it simple for now */}
            </div>
        </div>
      </div>
    </section>
  );
}
