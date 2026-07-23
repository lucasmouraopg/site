'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DURATION = 2000;

function WhiteBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Subtle radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(59,130,246,0.04)_0%,_transparent_70%)]" />

      {/* Floating thin lines */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"
          style={{
            width: '130%',
            left: '-15%',
            top: `${18 + i * 16}%`,
            rotate: `${-1.5 + i * 0.6}deg`,
          }}
          initial={{ x: '-25%', opacity: 0 }}
          animate={{ x: '8%', opacity: 0.5 }}
          transition={{
            duration: 3.5 + i * 0.5,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
            delay: i * 0.2,
          }}
        />
      ))}

      {/* Floating circles */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={`c-${i}`}
          className="absolute rounded-full border border-gray-100"
          style={{
            width: `${70 + i * 50}px`,
            height: `${70 + i * 50}px`,
            right: `${8 + i * 16}%`,
            top: `${22 + i * 10}%`,
          }}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: [0.8, 1.05, 0.8], opacity: [0, 0.25, 0] }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.7,
          }}
        />
      ))}
    </div>
  );
}

export default function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const pct = Math.min((elapsed / DURATION) * 100, 100);
      setProgress(pct);

      if (pct < 100) {
        requestAnimationFrame(tick);
      }
    };

    requestAnimationFrame(tick);

    const timer = setTimeout(() => setIsVisible(false), DURATION);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white"
        >
          <WhiteBackground />

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10"
          >
            {/* Glow behind logo */}
            <motion.div
              className="absolute -inset-10 rounded-full bg-blue-500/5 blur-2xl"
              animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            />
            <img
              src="/assets/images/logo/logo-lucas.png"
              alt="Lucas Mourão"
              className="relative w-[280px] md:w-[320px] h-auto"
            />
          </motion.div>

          {/* Progress bar + percentage */}
          <div className="relative z-10 mt-10 flex flex-col items-center gap-2">
            <div className="w-48 h-[3px] bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#1E3A5F] to-[#3B82F6] rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-[11px] font-mono tabular-nums text-gray-400">
              {Math.round(progress)}%
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
