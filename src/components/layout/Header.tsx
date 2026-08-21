'use client';

import { useState, useEffect } from 'react';
import { socialLinks } from '@/data/site-config';
import SocialIcon from '@/components/ui/SocialIcon';

const menuItems = [
  { label: 'Início', href: '/#home' },
  { label: 'Biografia', href: '/#biografia' },
  { label: 'Praia Grande', href: '/#praia-grande' },
  { label: 'Galeria', href: '/#galeria' },
  { label: 'Redes Sociais', href: '/#redes-sociais' },
  { label: 'Agenda', href: '/#agenda' },
  { label: 'Contato', href: '/#newsletter' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isDrawerOpen]);

  const scrollToSection = (href: string) => {
    setIsDrawerOpen(false);
    if (href.startsWith('/')) {
      window.location.href = href; // eslint-disable-line react-hooks/immutability
      return;
    }
    const selector = href.replace(/^\//, '');
    setTimeout(() => {
      const element = document.querySelector(selector);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 300);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lg'
            : 'bg-transparent'
        }`}
      >
        {/* Main bar */}
        <div
          className={`border-b transition-all duration-300 ${
            isScrolled
              ? 'bg-white/95 border-gray-200'
              : 'bg-gray-950/60 backdrop-blur-sm border-transparent'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="w-full flex justify-between items-center h-12">
              {/* LEFT: Social icons (mobile) / Nav links (desktop) */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-3 lg:hidden">
                  {socialLinks.map((link) => (
                    <a
                      key={link.platform}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.platform}
                      className={`transition-colors duration-200 ${
                        isScrolled
                          ? 'text-gray-500 hover:text-blue-600'
                          : 'text-white/70 hover:text-white'
                      }`}
                    >
                      <SocialIcon platform={link.platform} className="w-4 h-4" />
                    </a>
                  ))}
                </div>

                <nav className="hidden lg:flex items-center gap-1">
                  {menuItems.map((item) => (
                    <button
                      key={item.href}
                      onClick={() => scrollToSection(item.href)}
                      className={`px-3 py-1 text-xs font-bold uppercase tracking-wider transition-colors duration-200 rounded ${
                        isScrolled
                          ? 'text-gray-600 hover:text-blue-600'
                          : 'text-white/80 hover:text-white'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </nav>
              </div>

              {/* RIGHT: Hamburger (mobile) / Social icons (desktop) */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsDrawerOpen(true)}
                  className={`lg:hidden p-2 rounded-lg transition-colors ${
                    isScrolled
                      ? 'text-gray-700 hover:bg-gray-100'
                      : 'text-white hover:bg-white/10'
                  }`}
                  aria-label="Abrir menu"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>

                <div className="hidden lg:flex items-center gap-3">
                  {socialLinks.map((link) => (
                    <a
                      key={link.platform}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.platform}
                      className={`transition-colors duration-200 ${
                        isScrolled
                          ? 'text-gray-500 hover:text-blue-600'
                          : 'text-white/70 hover:text-white'
                      }`}
                    >
                      <SocialIcon platform={link.platform} className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ===== SIDE DRAWER ===== */}
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 lg:hidden ${
          isDrawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsDrawerOpen(false)}
      />

      {/* Drawer panel */}
      <div
        className={`fixed inset-y-0 right-0 w-72 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${
          isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Close button */}
        <div className="flex justify-end p-4">
          <button
            onClick={() => setIsDrawerOpen(false)}
            className="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            aria-label="Fechar menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Nav links */}
        <nav className="px-4 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.href}
              onClick={() => scrollToSection(item.href)}
              className="block w-full text-left px-4 py-3 text-base font-extrabold uppercase tracking-wide text-gray-800 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Social icons inside drawer */}
        <div className="px-4 mt-8 border-t border-gray-100 pt-6">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Siga-nos</p>
          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.platform}
                className="text-gray-500 hover:text-blue-600 transition-colors"
              >
                <SocialIcon platform={link.platform} className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
