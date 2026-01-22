'use client';

import {Link, usePathname, useRouter} from '@/i18n/routing';
import {useTranslations} from 'next-intl';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navigation() {
  const t = useTranslations('Navigation');
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen(!isOpen);

  const changeLanguage = (locale: string) => {
    router.replace(pathname, {locale: locale as any});
  };

  const navLinks = [
    { name: t('home'), href: '/' },
    { name: t('bio'), href: '#bio' },
    { name: t('music'), href: '#music' },
    { name: t('videos'), href: '#videos' },
    { name: t('gallery'), href: '#gallery' },
    { name: t('contact'), href: '#contact' },
  ];

  return (
    <nav className="fixed w-full z-50 bg-background/90 backdrop-blur-sm border-b border-primary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold tracking-tighter text-foreground">
              THUG<span className="text-primary">WANGEL</span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="hover:text-primary transition-colors px-3 py-2 rounded-md text-sm font-medium uppercase tracking-widest"
                >
                  {link.name}
                </Link>
              ))}
              <div className="flex space-x-2 ml-4 border-l pl-4 border-white/20">
                <button onClick={() => changeLanguage('en')} className="hover:text-primary transition-colors text-sm font-bold">EN</button>
                <button onClick={() => changeLanguage('fr')} className="hover:text-primary transition-colors text-sm font-bold">FR</button>
              </div>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-background border-b border-primary/20">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-primary/20 hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
             <div className="flex space-x-4 px-3 py-2 mt-4 border-t border-white/10">
                <button onClick={() => {changeLanguage('en'); setIsOpen(false)}} className="font-bold">EN</button>
                <button onClick={() => {changeLanguage('fr'); setIsOpen(false)}} className="font-bold">FR</button>
              </div>
          </div>
        </div>
      )}
    </nav>
  );
}
