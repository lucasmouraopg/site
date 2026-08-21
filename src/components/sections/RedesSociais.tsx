'use client';

import { useEffect, useRef, useCallback, useState, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { socialLinks, instagramReels as allReels } from '@/data/site-config';
import SocialIcon from '@/components/ui/SocialIcon';

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } };
  }
}

function processEmbeds() {
  if (window.instgrm?.Embeds) {
    window.instgrm.Embeds.process();
  }
}

function ensureScriptLoaded(): Promise<void> {
  return new Promise((resolve) => {
    if (document.getElementById('instagram-embed-script')) {
      processEmbeds();
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.id = 'instagram-embed-script';
    script.src = 'https://www.instagram.com/embed.js';
    script.async = true;
    script.onload = () => {
      processEmbeds();
      resolve();
    };
    script.onerror = () => resolve();
    document.body.appendChild(script);
  });
}

export default function RedesSociais() {
  const reelsContainerRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<MutationObserver | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    setIsDesktop(mq.matches); // eslint-disable-line react-hooks/set-state-in-effect

    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const visibleReels = useMemo(() => isDesktop ? allReels : [allReels[0]], [isDesktop]);

  const reprocessWithDelay = useCallback(() => {
    requestAnimationFrame(() => {
      processEmbeds();
    });
    setTimeout(processEmbeds, 500);
    setTimeout(processEmbeds, 1500);
    setTimeout(processEmbeds, 3000);
  }, []);

  useEffect(() => {
    const container = reelsContainerRef.current;
    if (!container) return;

    ensureScriptLoaded().then(() => {
      reprocessWithDelay();
    });

    observerRef.current = new MutationObserver(() => {
      reprocessWithDelay();
    });

    observerRef.current.observe(container, {
      childList: true,
      subtree: true,
      attributes: true,
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, [reprocessWithDelay, visibleReels]);

  return (
    <section id="redes-sociais" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 1. Titulo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 uppercase text-center">
            Redes Sociais
          </h2>
        </motion.div>

        {/* 2. Reels — only visible reels exist in DOM */}
        <div ref={reelsContainerRef} className="w-full max-w-full overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-12"
          >
            <div className={isDesktop ? 'grid grid-cols-3 gap-6' : 'flex justify-center'}>
              {visibleReels.map((url, index) => (
                <motion.div
                  key={url}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex justify-center w-full max-w-full overflow-hidden"
                >
                  <blockquote
                    className="instagram-media w-full max-w-full overflow-hidden"
                    data-instgrm-permalink={url}
                    data-instgrm-version="14"
                    style={{
                      maxWidth: '320px',
                      width: '100%',
                      minWidth: 0,
                    }}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* CTA Button */}
        <div className="text-center mb-12">
          <Link
            href="/redes-sociais"
            className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            Veja todos os reels
          </Link>
        </div>

        {/* 3. Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-8"
        >
          <p className="text-gray-900 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight">
            Já deixou seu like? 👍
          </p>
        </motion.div>

        {/* 4. Links das redes sociais */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-2 gap-4 sm:flex sm:flex-wrap sm:justify-center sm:gap-6 max-w-lg sm:max-w-none mx-auto"
        >
          {socialLinks.map((link) => (
            <a
              key={link.platform}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-3 sm:px-6 sm:py-4 bg-gray-50 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-all duration-300 group"
            >
              <span className="text-gray-600 group-hover:text-blue-600 transition-colors">
                <SocialIcon platform={link.platform} className="w-6 h-6 sm:w-8 sm:h-8" />
              </span>
              <span className="font-semibold text-gray-700 group-hover:text-blue-600 transition-colors">
                {link.platform}
              </span>
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
