'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const DURATION = 2000;

function WaveLayer({
  d,
  fill,
  opacity,
  duration,
  delay,
  top,
  rotateX,
}: {
  d: string;
  fill: string;
  opacity: number;
  duration: number;
  delay: number;
  top: string;
  rotateX: number;
}) {
  return (
    <motion.div
      className="absolute"
      style={{
        top,
        left: '-25%',
        width: '150%',
        transform: `perspective(500px) rotateX(${rotateX}deg)`,
        transformOrigin: 'center bottom',
      }}
      initial={{ x: '-12%', opacity: 0 }}
      animate={{ x: ['0%', '-12%', '5%', '-8%', '0%'], opacity }}
      transition={{
        x: { duration, repeat: Infinity, ease: 'easeInOut', delay },
        opacity: { duration: 1.2, delay: 0.1 + delay * 0.15, ease: 'easeOut' },
      }}
    >
      <svg
        viewBox="0 0 1600 250"
        preserveAspectRatio="none"
        className="w-full h-[220px] md:h-[320px] block"
      >
        <path d={d} fill={fill} />
      </svg>
    </motion.div>
  );
}

function FoamParticles() {
  const particles = [
    { x: 10, y: 25, size: 5, dur: 4.5, delay: 0 },
    { x: 22, y: 45, size: 4, dur: 5.2, delay: 0.3 },
    { x: 35, y: 30, size: 6, dur: 3.8, delay: 0.6 },
    { x: 48, y: 50, size: 3, dur: 5.0, delay: 0.9 },
    { x: 60, y: 35, size: 5, dur: 4.2, delay: 0.2 },
    { x: 73, y: 48, size: 4, dur: 4.8, delay: 0.5 },
    { x: 85, y: 28, size: 5, dur: 5.5, delay: 0.8 },
    { x: 15, y: 55, size: 3, dur: 4.0, delay: 1.1 },
    { x: 40, y: 60, size: 4, dur: 5.8, delay: 0.4 },
    { x: 65, y: 55, size: 6, dur: 4.4, delay: 0.7 },
    { x: 78, y: 62, size: 3, dur: 5.1, delay: 1.0 },
    { x: 92, y: 40, size: 4, dur: 4.6, delay: 0.1 },
  ];

  return (
    <>
      {particles.map((p, i) => (
        <motion.div
          key={`foam-${i}`}
          className="absolute rounded-full bg-white"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -15, 0, 10, 0],
            opacity: [0, 0.7, 0.4, 0.7, 0],
          }}
          transition={{
            duration: p.dur,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: p.delay,
          }}
        />
      ))}
    </>
  );
}

function BeachWaves() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Radial glow — very visible */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(59,130,246,0.10)_0%,_transparent_60%)]" />

      {/* Wave layers — intense, spread across full screen */}
      <WaveLayer
        d="M0,0 C200,55 400,5 600,45 C800,85 1000,15 1200,50 C1400,85 1550,25 1600,40 L1600,250 L0,250 Z"
        fill="rgba(59,130,246,0.12)"
        opacity={0.8}
        duration={12}
        delay={0}
        top="0%"
        rotateX={18}
      />
      <WaveLayer
        d="M0,0 C250,65 500,10 750,50 C1000,85 1250,20 1600,45 L1600,250 L0,250 Z"
        fill="rgba(59,130,246,0.15)"
        opacity={0.85}
        duration={10}
        delay={0.3}
        top="8%"
        rotateX={22}
      />
      <WaveLayer
        d="M0,0 C300,70 500,5 750,55 C1000,95 1250,15 1600,60 L1600,250 L0,250 Z"
        fill="rgba(96,165,250,0.14)"
        opacity={0.85}
        duration={8}
        delay={0.6}
        top="16%"
        rotateX={28}
      />
      <WaveLayer
        d="M0,0 C200,40 450,95 700,50 C950,10 1200,85 1600,45 L1600,250 L0,250 Z"
        fill="rgba(255,255,255,0.12)"
        opacity={0.9}
        duration={7}
        delay={0.9}
        top="25%"
        rotateX={32}
      />
      <WaveLayer
        d="M0,0 C300,50 550,105 800,60 C1050,20 1300,90 1600,55 L1600,250 L0,250 Z"
        fill="rgba(255,255,255,0.18)"
        opacity={0.9}
        duration={6}
        delay={1.2}
        top="35%"
        rotateX={36}
      />
      <WaveLayer
        d="M0,0 C250,60 500,115 750,70 C1000,30 1300,100 1600,65 L1600,250 L0,250 Z"
        fill="rgba(255,255,255,0.22)"
        opacity={0.95}
        duration={5}
        delay={1.5}
        top="45%"
        rotateX={40}
      />

      {/* Foam particles */}
      <FoamParticles />
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
          <BeachWaves />

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
            <Image
              src="/assets/images/logo/logo-lucas.png"
              alt="Lucas Mourão"
              width={320}
              height={80}
              priority
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
