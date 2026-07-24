'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { WeatherData } from '@/lib/weather';

const DEFAULT_CITY_COUNT = 7;

function getBgClasses(main: string): string {
  const map: Record<string, string> = {
    Clear: 'from-amber-500/10 via-blue-500/5 to-transparent',
    Clouds: 'from-slate-400/10 via-blue-400/5 to-transparent',
    Rain: 'from-blue-600/10 via-slate-500/5 to-transparent',
    Drizzle: 'from-blue-400/10 via-slate-400/5 to-transparent',
    Thunderstorm: 'from-purple-600/10 via-blue-700/5 to-transparent',
    Snow: 'from-blue-100/10 via-white/5 to-transparent',
    Mist: 'from-gray-400/10 via-gray-500/5 to-transparent',
    Fog: 'from-gray-400/10 via-gray-500/5 to-transparent',
    Haze: 'from-gray-400/10 via-gray-500/5 to-transparent',
  };
  return map[main] || 'from-blue-500/10 via-gray-500/5 to-transparent';
}

export default function WeatherWidget() {
  const [weatherList, setWeatherList] = useState<WeatherData[]>([]);
  const [cityIndex, setCityIndex] = useState(0);

  const loadWeather = useCallback(async () => {
    try {
      let visitorCity: string | null = null;

      try {
        const geoRes = await fetch('/api/geolocation');
        if (geoRes.ok) {
          const geoData = await geoRes.json();
          visitorCity = geoData.city;
        }
      } catch {
        // geolocation failed silently
      }

      const params = new URLSearchParams();
      if (visitorCity) {
        params.set('visitorCity', visitorCity);
      }

      const res = await fetch(`/api/weather?${params.toString()}`);
      if (!res.ok) return;
      const data: WeatherData[] = await res.json();
      setWeatherList(data);
    } catch {
      // silently fail — widget shows placeholder
    }
  }, []);

  useEffect(() => {
    loadWeather();

    const interval = setInterval(() => {
      setCityIndex((prev) => {
        if (weatherList.length === 0) return 0;
        return (prev + 1) % weatherList.length;
      });
    }, 6000);

    return () => clearInterval(interval);
  }, [loadWeather, weatherList.length]);

  if (weatherList.length === 0) {
    return (
      <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl px-6 py-5 w-full max-w-[340px] shadow-lg shadow-black/10">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-3 w-3 rounded-full bg-white/10 animate-pulse" />
          <div className="h-3 bg-white/10 rounded w-24 animate-pulse" />
        </div>
        <div className="flex gap-4">
          <div className="h-14 bg-white/10 rounded-xl w-20 animate-pulse" />
          <div className="flex-1 space-y-2">
            <div className="h-3 bg-white/10 rounded w-full animate-pulse" />
            <div className="h-3 bg-white/10 rounded w-3/4 animate-pulse" />
            <div className="h-3 bg-white/10 rounded w-1/2 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  const weather = weatherList[cityIndex];
  if (!weather) return null;

  const bg = getBgClasses(weather.weatherMain);
  const totalDots = weatherList.length;

  return (
    <div
      className={`bg-gradient-to-br ${bg} backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl w-full max-w-[340px] shadow-lg shadow-black/10 overflow-hidden`}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={weather.city}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="px-6 py-5"
        >
          {/* Header */}
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
            <svg
              className="w-3.5 h-3.5 text-emerald-400"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
            </svg>
            <span className="text-[11px] font-semibold uppercase tracking-widest text-white/50">
              Clima ao Vivo
            </span>
            <span className="ml-auto text-[11px] font-bold uppercase tracking-wider text-white/80">
              {weather.city}
            </span>
          </div>

          {/* Content: two columns */}
          <div className="flex gap-5">
            {/* Left: temp + icon */}
            <div className="flex flex-col items-center justify-center min-w-[90px]">
              <span className="text-4xl leading-none mb-1">{weather.icon}</span>
              <span className="text-4xl font-extrabold text-white tracking-tight">
                {weather.temp}°
              </span>
              <span className="text-[11px] text-white/40 capitalize mt-0.5">
                {weather.description}
              </span>
            </div>

            {/* Right: data grid */}
            <div className="flex-1 grid grid-cols-2 gap-x-4 gap-y-2.5 text-xs">
              <div>
                <span className="block text-[10px] uppercase tracking-widest text-white/35 font-medium mb-0.5">
                  Sensação
                </span>
                <span className="text-white/80 font-semibold">
                  {weather.feelsLike}°C
                </span>
              </div>
              <div>
                <span className="block text-[10px] uppercase tracking-widest text-white/35 font-medium mb-0.5">
                  Umidade
                </span>
                <span className="text-white/80 font-semibold">
                  {weather.humidity}%
                </span>
              </div>
              <div>
                <span className="block text-[10px] uppercase tracking-widest text-white/35 font-medium mb-0.5">
                  Vento
                </span>
                <span className="text-white/80 font-semibold">
                  {weather.windSpeed} km/h
                </span>
              </div>
              <div>
                <span className="block text-[10px] uppercase tracking-widest text-white/35 font-medium mb-0.5">
                  Mín / Máx
                </span>
                <span className="text-white/80 font-semibold">
                  {weather.tempMin}° / {weather.tempMax}°
                </span>
              </div>
            </div>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center gap-1.5 mt-4 pt-3 border-t border-white/10">
            {Array.from({ length: Math.min(totalDots, 8) }).map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === cityIndex
                    ? 'bg-emerald-400 w-4'
                    : 'bg-white/20 w-1.5'
                }`}
              />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
