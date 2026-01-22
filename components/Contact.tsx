'use client';

import { useTranslations } from 'next-intl';

export default function Contact() {
  const t = useTranslations('Contact');

  return (
    <section id="contact" className="py-20 bg-black/50 border-t border-primary/10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-accent uppercase tracking-widest">{t('title')}</h2>

        <form className="space-y-6">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">{t('name')}</label>
                <input type="text" id="name" className="w-full bg-background border border-white/10 rounded-md py-3 px-4 text-white focus:outline-none focus:border-primary transition-colors" />
            </div>
             <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">{t('email')}</label>
                <input type="email" id="email" className="w-full bg-background border border-white/10 rounded-md py-3 px-4 text-white focus:outline-none focus:border-primary transition-colors" />
            </div>
             <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">{t('message')}</label>
                <textarea id="message" rows={4} className="w-full bg-background border border-white/10 rounded-md py-3 px-4 text-white focus:outline-none focus:border-primary transition-colors"></textarea>
            </div>

            <button type="submit" className="w-full bg-accent text-black font-bold py-4 rounded-md hover:bg-white transition-colors tracking-widest uppercase">
                {t('send')}
            </button>
        </form>
      </div>
    </section>
  );
}
