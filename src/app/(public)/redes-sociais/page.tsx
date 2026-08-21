'use client';

import Link from 'next/link';
import { useEffect, useRef, useCallback } from 'react';
import { motion } from 'motion/react';

const allReels = [
  'https://www.instagram.com/reel/DbBBoERRstz/',
  'https://www.instagram.com/reel/DbDkxpIxOg0/',
  'https://www.instagram.com/reel/Da8s9YkPYoi/',
];

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

export default function RedesSociaisPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  const reprocessWithDelay = useCallback(() => {
    requestAnimationFrame(() => processEmbeds());
    setTimeout(processEmbeds, 500);
    setTimeout(processEmbeds, 1500);
    setTimeout(processEmbeds, 3000);
  }, []);

  useEffect(() => {
    ensureScriptLoaded().then(() => reprocessWithDelay());
  }, [reprocessWithDelay]);

  return (
    <section className="py-16 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-8"
        >
          ← Voltar
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Redes Sociais</h1>
        <p className="text-gray-500 mb-10">Acompanhe nossos reels e conteúdos nas redes sociais.</p>

        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allReels.map((url, index) => (
            <motion.div
              key={url}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
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
      </div>
    </section>
  );
}
