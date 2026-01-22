'use client';

import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('Footer');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black py-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <span className="text-xl font-bold tracking-tighter text-white">THUG<span className="text-primary">WANGEL</span></span>
        </div>
        <div className="text-gray-500 text-sm">
          &copy; {currentYear} Thugwangel. {t('copyright')}
        </div>
      </div>
    </footer>
  );
}
