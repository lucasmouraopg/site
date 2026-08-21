'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import WeatherWidget from '@/components/ui/WeatherWidget';
import { socialLinks, siteLinks } from '@/data/site-config';
import SocialIcon from '@/components/ui/SocialIcon';

export default function Footer() {
  return (
    <footer className="relative bg-gray-900 text-white overflow-hidden">
      {/* Background: Animated waves */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute"
          style={{ bottom: '-5%', left: '-25%', width: '150%', transform: 'perspective(500px) rotateX(28deg)', transformOrigin: 'center bottom' }}
          initial={{ x: '-6%', opacity: 0 }}
          animate={{ x: ['0%', '-6%', '3%', '-4%', '0%'], opacity: 0.7 }}
          transition={{ x: { duration: 16, repeat: Infinity, ease: 'easeInOut' }, opacity: { duration: 1.5, ease: 'easeOut' } }}
        >
          <svg viewBox="0 0 1600 200" preserveAspectRatio="none" className="w-full h-[140px] md:h-[200px] block">
            <path d="M0,0 C200,60 400,5 600,45 C800,85 1000,15 1200,55 C1400,90 1550,30 1600,50 L1600,200 L0,200 Z" fill="rgba(59,130,246,0.10)" />
          </svg>
        </motion.div>
        <motion.div
          className="absolute"
          style={{ bottom: '-10%', left: '-25%', width: '150%', transform: 'perspective(500px) rotateX(34deg)', transformOrigin: 'center bottom' }}
          initial={{ x: '-6%', opacity: 0 }}
          animate={{ x: ['0%', '-6%', '3%', '-4%', '0%'], opacity: 0.8 }}
          transition={{ x: { duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }, opacity: { duration: 1.5, delay: 0.2, ease: 'easeOut' } }}
        >
          <svg viewBox="0 0 1600 200" preserveAspectRatio="none" className="w-full h-[120px] md:h-[180px] block">
            <path d="M0,0 C250,65 500,10 750,50 C1000,85 1250,20 1600,55 L1600,200 L0,200 Z" fill="rgba(96,165,250,0.09)" />
          </svg>
        </motion.div>
        <motion.div
          className="absolute"
          style={{ bottom: '-15%', left: '-25%', width: '150%', transform: 'perspective(500px) rotateX(40deg)', transformOrigin: 'center bottom' }}
          initial={{ x: '-6%', opacity: 0 }}
          animate={{ x: ['0%', '-6%', '3%', '-4%', '0%'], opacity: 0.85 }}
          transition={{ x: { duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }, opacity: { duration: 1.5, delay: 0.4, ease: 'easeOut' } }}
        >
          <svg viewBox="0 0 1600 200" preserveAspectRatio="none" className="w-full h-[100px] md:h-[160px] block">
            <path d="M0,0 C300,50 600,105 900,60 C1100,30 1350,90 1600,70 L1600,200 L0,200 Z" fill="rgba(255,255,255,0.07)" />
          </svg>
        </motion.div>

        {/* Foam particles */}
        {[
          { x: 10, y: 72, s: 4, d: 5.0, dl: 0 },
          { x: 25, y: 78, s: 3, d: 4.5, dl: 0.4 },
          { x: 42, y: 70, s: 4, d: 5.5, dl: 0.8 },
          { x: 58, y: 76, s: 3, d: 4.2, dl: 0.2 },
          { x: 72, y: 73, s: 4, d: 5.2, dl: 0.6 },
          { x: 88, y: 77, s: 3, d: 4.8, dl: 1.0 },
        ].map((p, i) => (
          <motion.div
            key={`footer-foam-${i}`}
            className="absolute rounded-full bg-white"
            style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.s, height: p.s }}
            animate={{ y: [0, -10, 0, 6, 0], opacity: [0, 0.5, 0.3, 0.5, 0] }}
            transition={{ duration: p.d, repeat: Infinity, ease: 'easeInOut', delay: p.dl }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main content: Social (left) | Logo (center) | Weather (right) */}
        <div className="py-12 border-b border-gray-800 flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* Lado Esquerdo: Redes + Botão */}
          <div className="text-center md:text-left">
            <h4 className="text-lg font-semibold mb-4">Redes Sociais</h4>
            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors duration-300"
                >
                  <SocialIcon platform={link.platform} className="w-5 h-5" />
                </a>
              ))}
            </div>
            <a
              href={siteLinks.canalDaBaixada}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-6 px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300 hover:scale-105 hover:shadow-lg uppercase tracking-wide"
            >
              Canal da Baixada
            </a>
          </div>

          {/* Centro: Logo */}
          <div className="flex justify-center shrink-0">
            <Image
              src="/assets/images/logo/logo-lucas.png"
              alt="Lucas Mourão"
              width={180}
              height={50}
              className="h-auto"
              style={{ width: '120px', transform: 'scale(1.5)' }}
            />
          </div>

          {/* Lado Direito: Clima ao Vivo */}
          <div className="flex justify-center md:justify-end w-full md:w-auto">
            <WeatherWidget />
          </div>

        </div>

        {/* Bottom bar: Copyright + Legal */}
        {/* Adicionados: md:flex-row md:justify-between md:text-left */}
        <div className="py-6 flex flex-col md:flex-row items-center md:justify-between gap-4 text-center md:text-left">
          <p className="text-gray-500 text-sm">
            © 2026 Lucas Mourão. Todos os direitos reservados.
          </p>
          <div className="flex gap-6">
            <Link
              href="/privacidade"
              className="text-gray-400 hover:text-white transition-colors text-base"
            >
              Política de Privacidade
            </Link>
            <Link
              href="/termos"
              className="text-gray-400 hover:text-white transition-colors text-base"
            >
              Termos de Uso
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}